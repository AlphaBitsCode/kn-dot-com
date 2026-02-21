import { useRef, useEffect, useCallback, useState } from 'react';

export type OperationalState = 'CHARGING' | 'DISCHARGING' | 'STOPPED' | 'COOLING';

export interface SimulationState {
  operationalState: OperationalState;
  currentTemperature: number;
  targetTemperature: number;
  outputTemperature: number;
  isHeating: boolean;
  isFanRunning: boolean;
}

export interface UseSandBatterySimulationReturn {
  state: SimulationState;
  actions: {
    startCharging: () => void;
    startDischarging: () => void;
    stop: () => void;
  };
}

// Physical constants
const ROOM_TEMP = 25;
const MAX_TEMP = 600;
const HEATING_RATE = 48; // °C per second
const TARGET_FPS = 60;
const FRAME_TIME = 1000 / TARGET_FPS;

// Particle system
interface Particle {
  progress: number;
  speed: number;
  x: number;
  y: number;
  life: number;
  maxLife: number;
  temperature: number;
  size: number;
  xOffset: number;
  yOffset: number;
}

const PARTICLE_COUNT = 150;
const MOBILE_PARTICLE_COUNT = 60;
const FAN_ROTATION_SPEED = 0.15; // radians per frame

// Color interpolation helper
function interpolateColor(color1: string, color2: string, factor: number): string {
  const hex = (c: string) => parseInt(c.slice(1), 16);
  const r1 = (hex(color1) >> 16) & 255;
  const g1 = (hex(color1) >> 8) & 255;
  const b1 = hex(color1) & 255;
  const r2 = (hex(color2) >> 16) & 255;
  const g2 = (hex(color2) >> 8) & 255;
  const b2 = hex(color2) & 255;

  const f = Math.max(0, Math.min(1, factor));
  const r = Math.round(r1 + (r2 - r1) * f);
  const g = Math.round(g1 + (g2 - g1) * f);
  const b = Math.round(b1 + (b2 - b1) * f);

  return `rgb(${r}, ${g}, ${b})`;
}

// Temperature to color mapping for sand core
function temperatureToColor(temp: number): string {
  const stops = [
    { temp: 25, color: '#D4A373' },
    { temp: 200, color: '#E8B87A' },
    { temp: 400, color: '#F59E0B' },
    { temp: 600, color: '#EF4444' }
  ];

  for (let i = 0; i < stops.length - 1; i++) {
    if (temp >= stops[i].temp && temp <= stops[i + 1].temp) {
      const factor = (temp - stops[i].temp) / (stops[i + 1].temp - stops[i].temp);
      return interpolateColor(stops[i].color, stops[i + 1].color, factor);
    }
  }
  return stops[stops.length - 1].color;
}

// Particle color based on temperature
function particleTemperatureToColor(temp: number): string {
  if (temp < 50) return 'rgba(59, 130, 246, 0.8)'; // blue-500
  if (temp < 100) return 'rgba(147, 197, 253, 0.8)'; // blue-300
  if (temp < 150) return 'rgba(251, 191, 36, 0.8)'; // amber-400
  return 'rgba(239, 68, 68, 0.8)'; // red-500
}

function getPipePos(progress: number, layout: any): { x: number, y: number } {
  const { centerX, centerY, batteryWidth, shellThickness, insulationThickness } = layout;

  const coreStartX = centerX - batteryWidth / 2 + shellThickness + insulationThickness;
  const coreEndX = centerX + batteryWidth / 2 - shellThickness - insulationThickness;
  const coreWidth = coreEndX - coreStartX;

  if (progress <= 0) {
    const x = coreStartX + progress * coreWidth;
    return { x, y: centerY };
  }
  if (progress >= 1) {
    const x = coreEndX + (progress - 1) * coreWidth;
    return { x, y: centerY };
  }

  // Inside the core: horizontal spiral loop
  const loops = 5;
  const angle = progress * Math.PI * 2 * loops;

  // Dampen the spiral amplitude near the ends so it smoothly joins the straight pipes
  const dampenStartX = Math.sin(Math.min(1, progress * 4) * Math.PI / 2);
  const dampenEndX = Math.sin(Math.min(1, (1 - progress) * 4) * Math.PI / 2);
  const dampen = Math.min(dampenStartX, dampenEndX);

  const coilRadiusX = 25 * dampen;
  const coilRadiusY = 160 * dampen;

  const x = coreStartX + progress * coreWidth + Math.sin(angle) * coilRadiusX;
  const y = centerY + Math.cos(angle) * coilRadiusY;

  return { x, y };
}

export function useSandBatterySimulation(canvasRef: React.RefObject<HTMLCanvasElement>): UseSandBatterySimulationReturn {
  const [uiState, setUiState] = useState<SimulationState>({
    operationalState: 'STOPPED',
    currentTemperature: ROOM_TEMP,
    targetTemperature: ROOM_TEMP,
    outputTemperature: ROOM_TEMP,
    isHeating: false,
    isFanRunning: false
  });

  const stateRef = useRef<SimulationState>({
    operationalState: 'STOPPED',
    currentTemperature: ROOM_TEMP,
    targetTemperature: ROOM_TEMP,
    outputTemperature: ROOM_TEMP,
    isHeating: false,
    isFanRunning: false
  });

  const particlesRef = useRef<Particle[]>([]);
  const fanRotationRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);
  const isMobileRef = useRef(false);
  const lastUiUpdateRef = useRef<number>(0);

  // Canvas context ref
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Layout measurements
  const layoutRef = useRef({
    centerX: 960,
    centerY: 540,
    batteryWidth: 400,
    batteryHeight: 500,
    shellThickness: 8,
    insulationThickness: 40,
    sandCoreWidth: 304,
    sandCoreHeight: 404,
    // Inlet and Outlet now aligned directly to centerY
    inletPipeY: 540,
    outletPipeY: 540,
    pipeLength: 150,
    fanRadius: 40
  });

  // Initialize particles
  const initParticles = useCallback(() => {
    const count = isMobileRef.current ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;
    particlesRef.current = [];
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(true));
    }
  }, []);

  const createParticle = useCallback((randomStart = false): Particle => {
    const layout = layoutRef.current;

    // progress represents position mapping cleanly onto math
    const coreWidth = layout.sandCoreWidth - layout.insulationThickness * 2;
    const speed = (4 + Math.random() * 2.5) / coreWidth;

    // Start at inlet
    let startProgress = -(layout.pipeLength + 50) / coreWidth;
    if (randomStart) {
      const totalLength = (layout.pipeLength * 2 + layout.batteryWidth) / coreWidth;
      startProgress += Math.random() * totalLength;
    }

    return {
      progress: startProgress,
      speed: speed,
      x: 0,
      y: 0,
      life: 0,
      maxLife: 200 + Math.random() * 100,
      temperature: ROOM_TEMP,
      size: 4 + Math.random() * 4,
      xOffset: (Math.random() - 0.5) * 8,
      yOffset: (Math.random() - 0.5) * 16
    };
  }, []);

  // Drawing functions
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Light gray background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);

    // Grid pattern
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }, []);

  const drawBatteryShell = useCallback((ctx: CanvasRenderingContext2D) => {
    const layout = layoutRef.current;
    const { centerX, centerY, batteryWidth, batteryHeight } = layout;

    const x = centerX - batteryWidth / 2;
    const y = centerY - batteryHeight / 2;

    const gradient = ctx.createLinearGradient(x, y, x + batteryWidth, y);
    gradient.addColorStop(0, '#d1d5db');
    gradient.addColorStop(0.2, '#f3f4f6');
    gradient.addColorStop(0.5, '#e5e7eb');
    gradient.addColorStop(0.8, '#d1d5db');
    gradient.addColorStop(1, '#9ca3af');

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, batteryWidth, batteryHeight);

    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, batteryWidth, batteryHeight);
  }, []);

  const drawInsulationLayer = useCallback((ctx: CanvasRenderingContext2D) => {
    const layout = layoutRef.current;
    const { centerX, centerY, shellThickness, batteryWidth, batteryHeight } = layout;

    const x = centerX - batteryWidth / 2 + shellThickness;
    const y = centerY - batteryHeight / 2 + shellThickness;
    const width = batteryWidth - shellThickness * 2;
    const height = batteryHeight - shellThickness * 2;

    ctx.fillStyle = '#fef3c7'; // Light theme yellow/beige
    ctx.fillRect(x, y, width, height);

    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
  }, []);

  const drawSandCore = useCallback((ctx: CanvasRenderingContext2D, temperature: number) => {
    const layout = layoutRef.current;
    const { centerX, centerY, shellThickness, insulationThickness, batteryWidth, batteryHeight } = layout;

    const x = centerX - batteryWidth / 2 + shellThickness + insulationThickness;
    const y = centerY - batteryHeight / 2 + shellThickness + insulationThickness;
    const width = batteryWidth - (shellThickness + insulationThickness) * 2;
    const height = batteryHeight - (shellThickness + insulationThickness) * 2;

    const sandColor = temperatureToColor(temperature);
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, Math.max(width, height) / 2
    );
    gradient.addColorStop(0, sandColor);
    gradient.addColorStop(0.7, temperatureToColor(temperature * 0.8));
    gradient.addColorStop(1, temperatureToColor(temperature * 0.6));

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, height);

    ctx.fillStyle = `rgba(0, 0, 0, ${0.05 + temperature / 6000})`;
    const dotSize = 2;
    const dotSpacing = 15;
    for (let dotX = x; dotX < x + width; dotX += dotSpacing) {
      for (let dotY = y; dotY < y + height; dotY += dotSpacing) {
        ctx.beginPath();
        ctx.arc(dotX + Math.random() * 5, dotY + Math.random() * 5, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.strokeStyle = `rgba(0, 0, 0, ${0.1 + temperature / 3000})`;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
  }, []);

  const drawHeatingRods = useCallback((ctx: CanvasRenderingContext2D, temperature: number, isHeating: boolean) => {
    const layout = layoutRef.current;
    const { centerX, centerY, shellThickness, insulationThickness, batteryWidth, batteryHeight } = layout;

    const x = centerX - batteryWidth / 2 + shellThickness + insulationThickness;
    const y = centerY - batteryHeight / 2 + shellThickness + insulationThickness;
    const width = batteryWidth - (shellThickness + insulationThickness) * 2;
    const height = batteryHeight - (shellThickness + insulationThickness) * 2;

    const rodCount = 8;
    const rodWidth = 12;
    const rodSpacing = width / (rodCount + 1);

    const glowIntensity = isHeating
      ? 0.6 + (temperature / MAX_TEMP) * 0.4 + Math.sin(Date.now() / 200) * 0.1
      : (temperature / MAX_TEMP) * 0.3;

    for (let i = 1; i <= rodCount; i++) {
      const rodX = x + rodSpacing * i - rodWidth / 2;

      if (glowIntensity > 0.1) {
        const glowGradient = ctx.createRadialGradient(
          rodX + rodWidth / 2, centerY, 0,
          rodX + rodWidth / 2, centerY, rodWidth * 5
        );
        const glowColor = temperature > 300
          ? `rgba(239, 68, 68, ${glowIntensity * 0.6})`
          : `rgba(245, 158, 11, ${glowIntensity * 0.6})`;
        glowGradient.addColorStop(0, glowColor);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glowGradient;
        ctx.fillRect(
          rodX - rodWidth * 4,
          centerY - height / 2,
          rodWidth * 9,
          height
        );
      }

      const rodGradient = ctx.createLinearGradient(rodX, y, rodX, y + height);
      if (temperature > 400 && isHeating) {
        rodGradient.addColorStop(0, '#fca5a5');
        rodGradient.addColorStop(0.5, '#ef4444');
        rodGradient.addColorStop(1, '#b91c1c');
      } else if (temperature > 200 || isHeating) {
        rodGradient.addColorStop(0, '#fde047');
        rodGradient.addColorStop(0.5, '#f59e0b');
        rodGradient.addColorStop(1, '#b45309');
      } else {
        rodGradient.addColorStop(0, '#9ca3af');
        rodGradient.addColorStop(0.5, '#6b7280');
        rodGradient.addColorStop(1, '#4b5563');
      }

      ctx.fillStyle = rodGradient;
      ctx.fillRect(rodX, y, rodWidth, height);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(rodX + 2, y, 3, height);
    }
  }, []);

  const drawInternalPipe = useCallback((ctx: CanvasRenderingContext2D, temperature: number) => {
    const layout = layoutRef.current;

    ctx.beginPath();
    for (let p = 0; p <= 1; p += 0.002) {
      const pos = getPipePos(p, layout);
      if (p === 0) {
        ctx.moveTo(pos.x, pos.y);
      } else {
        ctx.lineTo(pos.x, pos.y);
      }
    }

    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Core heat radiating onto pipe
    if (temperature > 100) {
      ctx.strokeStyle = `rgba(239, 68, 68, ${Math.min(0.6, temperature / 600)})`;
      ctx.lineWidth = 26;
      ctx.stroke();
    }

    // Pipe highlight
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 6;
    ctx.stroke();
  }, []);

  const drawInletPipe = useCallback((ctx: CanvasRenderingContext2D) => {
    const layout = layoutRef.current;
    const { centerX, inletPipeY, pipeLength, batteryWidth } = layout;

    const pipeWidth = 36;
    const startX = centerX - batteryWidth / 2 - pipeLength;
    const endX = centerX - batteryWidth / 2;

    ctx.fillStyle = '#60a5fa'; // Light theme blue
    ctx.fillRect(startX, inletPipeY - pipeWidth / 2, pipeLength, pipeWidth);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(startX, inletPipeY - pipeWidth / 2, pipeLength, 8);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.moveTo(endX - 20, inletPipeY - 10);
    ctx.lineTo(endX - 5, inletPipeY);
    ctx.lineTo(endX - 20, inletPipeY + 10);
    ctx.fill();

    ctx.fillStyle = '#1e3a8a';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${ROOM_TEMP}°C IN`, startX + pipeLength / 2, inletPipeY - 30);
  }, []);

  const drawOutletPipe = useCallback((ctx: CanvasRenderingContext2D, outputTemperature: number) => {
    const layout = layoutRef.current;
    const { centerX, outletPipeY, pipeLength, batteryWidth } = layout;

    const pipeWidth = 36;
    const startX = centerX + batteryWidth / 2;
    const endX = centerX + batteryWidth / 2 + pipeLength;

    const pipeColor = outputTemperature > 100 ? '#ef4444' : (outputTemperature > 50 ? '#f97316' : '#9ca3af');

    ctx.fillStyle = pipeColor;
    ctx.fillRect(startX, outletPipeY - pipeWidth / 2, pipeLength, pipeWidth);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(startX, outletPipeY - pipeWidth / 2, pipeLength, 8);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.moveTo(startX + 15, outletPipeY - 10);
    ctx.lineTo(startX + 30, outletPipeY);
    ctx.lineTo(startX + 15, outletPipeY + 10);
    ctx.fill();

    ctx.fillStyle = '#7f1d1d';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(outputTemperature)}°C OUT`, startX + pipeLength / 2, outletPipeY - 30);
  }, []);

  const drawFan = useCallback((ctx: CanvasRenderingContext2D, isRunning: boolean, rotation: number) => {
    const layout = layoutRef.current;
    const { centerX, inletPipeY, pipeLength, batteryWidth, fanRadius } = layout;

    // Shift fan to the LEFT (inlet) side of the battery, before the cold air pipe
    const fanX = centerX - batteryWidth / 2 - pipeLength - fanRadius - 20;
    const fanY = inletPipeY;

    ctx.fillStyle = '#d1d5db';
    ctx.beginPath();
    ctx.arc(fanX, fanY, fanRadius + 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ebf8ff'; // Slightly blueish for cold air inlet
    ctx.beginPath();
    ctx.arc(fanX, fanY, fanRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(fanX, fanY);
    ctx.rotate(rotation);

    const bladeCount = 4;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      ctx.save();
      ctx.rotate(angle);

      ctx.fillStyle = isRunning ? '#60a5fa' : '#d1d5db'; // Blue tint when running
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(fanRadius * 0.7, -fanRadius * 0.4, fanRadius * 0.9, 0);
      ctx.quadraticCurveTo(fanRadius * 0.7, fanRadius * 0.4, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();

    ctx.fillStyle = '#9ca3af';
    ctx.beginPath();
    ctx.arc(fanX, fanY, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4b5563';
    ctx.beginPath();
    ctx.arc(fanX, fanY, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#374151';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(isRunning ? 'FAN ON' : 'FAN OFF', fanX, fanY + fanRadius + 25);
  }, []);

  const drawAirParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    const state = stateRef.current;
    if (state.operationalState !== 'DISCHARGING') return;

    particlesRef.current.forEach(particle => {
      ctx.fillStyle = particleTemperatureToColor(particle.temperature);
      ctx.globalAlpha = particle.life / particle.maxLife;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }, []);

  const drawHeatShimmer = useCallback((ctx: CanvasRenderingContext2D) => {
    const layout = layoutRef.current;
    const { centerX, outletPipeY, pipeLength, batteryWidth } = layout;
    const state = stateRef.current;

    if (state.operationalState !== 'DISCHARGING' || state.outputTemperature < 50) return;

    const shimmerX = centerX + batteryWidth / 2 + pipeLength;
    const shimmerY = outletPipeY;
    const time = Date.now() / 150;

    ctx.save();
    for (let i = 0; i < 4; i++) {
      const waveY = shimmerY + 30 + i * 18 + Math.sin(time + i) * 8;
      const alpha = (1 - i / 4) * 0.4;

      ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
      ctx.lineWidth = 3;
      ctx.beginPath();

      for (let x = 0; x < 70; x += 5) {
        const y = waveY + Math.sin(time * 2 + x / 15 + i) * (4 + i);
        if (x === 0) ctx.moveTo(shimmerX + x, y);
        else ctx.lineTo(shimmerX + x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }, []);

  const drawTemperatureDisplay = useCallback((ctx: CanvasRenderingContext2D) => {
    const state = stateRef.current;
    const temp = Math.round(state.currentTemperature);
    const outTemp = Math.round(state.outputTemperature);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 10;
    ctx.roundRect(50, 80, 260, 140, 16);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.roundRect(50, 80, 260, 140, 16);
    ctx.stroke();

    const tempColor = temp < 100 ? '#3b82f6' : temp < 300 ? '#f59e0b' : '#ef4444';
    ctx.fillStyle = tempColor;
    ctx.font = 'bold 52px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${temp}°C`, 70, 145);

    const stateColors = {
      'CHARGING': { bg: '#fef3c7', text: '#d97706', label: 'HEATING' },
      'DISCHARGING': { bg: '#dbeafe', text: '#2563eb', label: 'DISCHARGING' },
      'COOLING': { bg: '#f3f4f6', text: '#6b7280', label: 'COOLING' },
      'STOPPED': { bg: '#f3f4f6', text: '#6b7280', label: 'STANDBY' }
    };

    const stateInfo = stateColors[state.operationalState];
    ctx.fillStyle = stateInfo.bg;
    ctx.beginPath();
    ctx.roundRect(70, 160, 110, 28, 8);
    ctx.fill();

    ctx.fillStyle = stateInfo.text;
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(stateInfo.label, 125, 178);

    if (state.operationalState === 'CHARGING' || state.operationalState === 'COOLING') {
      ctx.fillStyle = '#6b7280';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Target: ${state.targetTemperature}°C`, 70, 205);
    } else if (state.operationalState === 'DISCHARGING') {
      ctx.fillStyle = '#b91c1c';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Output Air: ${outTemp}°C`, 70, 205);
    }
  }, []);

  const updatePhysics = useCallback((deltaTime: number) => {
    const state = stateRef.current;
    const deltaSeconds = deltaTime / 1000;

    switch (state.operationalState) {
      case 'CHARGING':
        const tempDiff = state.targetTemperature - state.currentTemperature;
        const heatingRate = HEATING_RATE * (0.2 + tempDiff / MAX_TEMP);
        state.currentTemperature = Math.min(
          state.targetTemperature,
          state.currentTemperature + heatingRate * deltaSeconds
        );
        if (state.currentTemperature >= state.targetTemperature - 1) {
          state.operationalState = 'STOPPED';
          state.isHeating = false;
        }
        state.outputTemperature = Math.max(ROOM_TEMP, state.outputTemperature - 5 * deltaSeconds);
        break;

      case 'DISCHARGING':
        state.currentTemperature = Math.max(
          ROOM_TEMP,
          state.currentTemperature - 3 * deltaSeconds
        );
        // Calculate dynamic extraction temperature (e.g. max 200, based on core heat)
        const targetOutput = Math.min(200, ROOM_TEMP + (state.currentTemperature - ROOM_TEMP) * 0.7);
        state.outputTemperature += (targetOutput - state.outputTemperature) * 0.1;
        break;

      case 'COOLING':
        const coolingFactor = Math.exp(-deltaSeconds * 0.1);
        const targetDiff = state.currentTemperature - state.targetTemperature;
        state.currentTemperature = state.targetTemperature + targetDiff * coolingFactor;
        if (state.currentTemperature <= state.targetTemperature + 1) {
          state.currentTemperature = state.targetTemperature;
          state.operationalState = 'STOPPED';
        }
        state.outputTemperature = Math.max(ROOM_TEMP, state.outputTemperature - 5 * deltaSeconds);
        break;

      case 'STOPPED':
        if (state.currentTemperature > ROOM_TEMP) {
          const naturalCooling = (state.currentTemperature - ROOM_TEMP) * 0.005 * deltaSeconds;
          state.currentTemperature = Math.max(ROOM_TEMP, state.currentTemperature - naturalCooling);
        }
        state.outputTemperature = Math.max(ROOM_TEMP, state.outputTemperature - 5 * deltaSeconds);
        break;
    }
  }, []);

  const updateParticles = useCallback((deltaTime: number) => {
    const state = stateRef.current;
    const layout = layoutRef.current;
    const { pipeLength, sandCoreWidth, insulationThickness } = layout;

    if (state.operationalState !== 'DISCHARGING') return;

    particlesRef.current.forEach(particle => {
      particle.progress += particle.speed;
      const pos = getPipePos(particle.progress, layout);
      particle.x = pos.x + particle.xOffset;
      particle.y = pos.y + particle.yOffset;
      particle.life++;

      const coreWidth = sandCoreWidth - insulationThickness * 2;
      const maxProgress = 1 + (pipeLength + 80) / coreWidth;

      if (particle.life > particle.maxLife || particle.progress > maxProgress) {
        Object.assign(particle, createParticle());
      }

      if (particle.progress <= 0) {
        particle.temperature = ROOM_TEMP;
      } else if (particle.progress > 0 && particle.progress <= 1) {
        particle.temperature = ROOM_TEMP + (state.currentTemperature - ROOM_TEMP) * particle.progress * 0.8;
      } else {
        particle.temperature = state.outputTemperature;
      }
    });
  }, [createParticle]);

  const updateFanRotation = useCallback((deltaTime: number) => {
    const state = stateRef.current;
    if (state.isFanRunning) {
      fanRotationRef.current += FAN_ROTATION_SPEED * (deltaTime / FRAME_TIME) * Math.PI * 2;
    }
  }, []);

  const animate = useCallback((currentTime: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = currentTime;
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    const ctx = ctxRef.current;
    const canvas = canvasRef.current;

    if (!ctx || !canvas) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    updatePhysics(deltaTime);
    updateParticles(deltaTime);
    updateFanRotation(deltaTime);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply strict canvas layering from plan
    drawBackground(ctx, canvas.width, canvas.height); // BG
    drawInletPipe(ctx); // Layer 1 Base Pipes
    drawBatteryShell(ctx); // Layer 1 Shell
    drawInsulationLayer(ctx); // Layer 1 Insulation
    drawSandCore(ctx, stateRef.current.currentTemperature); // Layer 2 Sand
    drawHeatingRods(ctx, stateRef.current.currentTemperature, stateRef.current.isHeating); // Layer 3 Rods
    drawInternalPipe(ctx, stateRef.current.currentTemperature); // Layer 4 Piping
    drawOutletPipe(ctx, stateRef.current.outputTemperature); // Outlet Pip
    drawFan(ctx, stateRef.current.isFanRunning, fanRotationRef.current);
    drawAirParticles(ctx); // Layer 5 Particles
    drawHeatShimmer(ctx);
    drawTemperatureDisplay(ctx);

    // Sync React UI State throttle ~15FPS to prevent re-render lagging
    if (currentTime - lastUiUpdateRef.current > 66) {
      setUiState({ ...stateRef.current });
      lastUiUpdateRef.current = currentTime;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [canvasRef, updatePhysics, updateParticles, updateFanRotation,
    drawBackground, drawInletPipe, drawBatteryShell, drawInsulationLayer,
    drawSandCore, drawHeatingRods, drawInternalPipe, drawOutletPipe, drawFan,
    drawAirParticles, drawHeatShimmer, drawTemperatureDisplay]);

  const startCharging = useCallback(() => {
    const state = stateRef.current;
    if (state.operationalState === 'CHARGING') return;
    state.operationalState = 'CHARGING';
    state.targetTemperature = MAX_TEMP;
    state.isHeating = true;
    state.isFanRunning = false;
  }, []);

  const startDischarging = useCallback(() => {
    const state = stateRef.current;
    if (state.operationalState === 'DISCHARGING') return;
    state.operationalState = 'DISCHARGING';
    state.isHeating = false;
    state.isFanRunning = true;

    // Jump start particles so we don't start with empty pipes
    const count = isMobileRef.current ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;
    particlesRef.current = [];
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(true));
    }
  }, [createParticle]);

  const stop = useCallback(() => {
    const state = stateRef.current;
    state.operationalState = 'COOLING';
    state.targetTemperature = ROOM_TEMP;
    state.isHeating = false;
    state.isFanRunning = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    isMobileRef.current = window.innerWidth < 768;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;
    initParticles();
    lastTimeRef.current = 0;
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [canvasRef, initParticles, animate]);

  return {
    state: uiState,
    actions: { startCharging, startDischarging, stop }
  };
}
