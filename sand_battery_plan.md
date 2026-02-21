# Implementation Plan: Interactive Sand Battery Canvas Improvements

Based on the requested logic for the HTML5 Canvas mockup, here is the detailed plan to improve `useSandBatterySimulation.ts` and `SandBatteryExperiment.tsx`.

## 1. Canvas Layers Redesign (Z-Index Enforcement)
Currently, layers are rendered, but we lack the internal piping network and correct layering. We will enforce this drawing order:
- **Layer 1 - Housing**: Draw outer shell and insulation layer.
- **Layer 2 - Sand Core**: Draw sand block with dynamic color mapping.
- **Layer 3 - Heating Elements**: Draw vertical rods glowing inside the sand.
- **Layer 4 - Piping Network (NEW)**: Implement an internal metal tube winding through the sand core connecting the inlet and outlet pipes.
- **Layer 5 - Airflow Particles**: Draw particles that specifically follow the path of the winding pipe network.

## 2. Airflow Particles & Pipe Pathing
- Update `updateParticles`: Instead of just adding `vx` to `x`, particles will move along a predefined curved or zigzag path (e.g., using sine waves or a set of waypoints) that represents the winding internal pipe.
- Adjust particle colors to smoothly transition from cold (blue) to hot (red) dynamically based on the current temperature of the section of the sand core they are traversing.

## 3. Discharging Temperature Logic
- The outlet temperature is currently hardcoded to display 200°C immediately upon discharge (`DISCHARGE_OUTLET_TEMP`). 
- **Action**: Update the readout to dynamically climb or fall. The output air temp will be calculated by how much heat it successfully extracts from the sand core (e.g., capping at 200°C dynamically as the core reaches ~300°C+).

## 4. Fix React UI State Synchronization (Critical Bug)
- **Issue**: `useSandBatterySimulation` currently stores `currentTemperature` and `operationalState` inside a `useRef`. React components do not re-render when a ref mutates, which means the external HTML UI controls and text readouts are frozen at their initial values (25°C, Standby).
- **Action**: Introduce a throttled `useState` mirroring mechanism inside the hook (updating ~5-10 times a second) so the React UI remains fully in sync with the 60FPS canvas simulation without causing performance drops.

## Next Steps
Once approved, I will refactor `src/hooks/useSandBatterySimulation.ts` to implement the new layering, winding pipe, particle math, and React synchronization.
