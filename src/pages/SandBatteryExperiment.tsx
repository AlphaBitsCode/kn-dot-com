import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Zap, Wind, Square } from "lucide-react";
import { useSandBatterySimulation, OperationalState } from "../hooks/useSandBatterySimulation";

const TIMELINE_DATA = [
    {
        year: "2022",
        description: "Initial Conception & First Prototype",
        events: [
            {
                title: "Concept Origin",
                date: "Summer 2022",
                description: "Inspired by Finland's sand battery, Kent began exploring thermal energy storage for agricultural applications."
            },
            {
                title: "First Public Concept Discussion",
                date: "September 30, 2022",
                description: "Presented concept at private event: Using thermal storage to revolutionize energy-intensive agricultural practices."
            },
            {
                title: "First Working Proof-of-Concept",
                date: "October 2022",
                description: "Built at home using off-the-shelf consumer parts; 20kg fine white sand in stainless steel double-layer container; achieved 165°C internal while exterior remained safe at 40°C; output warm water at ~60°C via copper tube."
            },
            {
                title: "Field Research",
                date: "November 3, 2022",
                description: "Visited boutique tea factory and off-grid house to assess real-world applications replacing wood-furnace dryers."
            },
            {
                title: "Thermal Breakthrough",
                date: "November 4, 2022",
                description: "Core reached 150°C while exterior stayed at 28°C (cool to touch)—validating the heat isolation design."
            },
            {
                title: "Prototype Zero Completed",
                date: "December 2022",
                description: "\"Prototype Zero\" completed in balcony lab, establishing the baseline architecture for all future iterations."
            },
        ]
    },
    {
        year: "2023",
        description: "Industrial Scaling & Patent Filing",
        events: [
            {
                title: "Vietnamese Patent Filed",
                date: "August 15, 2023",
                description: "Vietnamese Patent Application No. 1-2023-05430 filed, defining key innovations: heat isolation valves and distributed heating elements in protective carbon-based tubes."
            },
            {
                title: "Industrial-Scale Prototype Success",
                date: "August 22, 2023",
                description: "First industrial-scale prototype successful: 800kg-2 tons of sand, reached 600°C, maintained heat for nearly 3 weeks."
            },
        ]
    },
    {
        year: "2024",
        description: "Commercial Units & USPTO Approval",
        events: [
            {
                title: "Sand Battery v2.0 Design",
                date: "Early 2024 (Q1-Q2)",
                description: "Designed and tested v2.0 (~250kWh capacity) with rotary dryer system for commercial applications."
            },
            {
                title: "USPTO Patent Application Filed",
                date: "April 1, 2024",
                description: "Formal USPTO patent application filed using Vietnamese application as priority document."
            },
            {
                title: "First Full-Size Commercial Unit",
                date: "June 27, 2024",
                description: "First full-size commercial unit completed: 5 tons of sand capacity."
            },
            {
                title: "USPTO Patent Granted",
                date: "October 29, 2024",
                description: "USPTO Patent Granted: US 12,130,086 B1 \"Thermal Storage Batteries and Thermal Storage Battery Systems for Drying Agricultural and Food Products\". Kent named inventor on the granted patent.",
                isMilestone: true
            }
        ]
    }
];

const SandBatteryExperiment: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);

    // Initialize the sand battery simulation
    const simulation = useSandBatterySimulation(canvasRef);

    useEffect(() => {
        document.title = "Interactive Sand Battery | Kent Nguyen";

        const metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        metaDesc.content = "Interactive thermodynamic simulation of the patented Sand Battery by Alterno. Watch sand heat up to 600°C and understand the thermal storage system.";
        document.head.appendChild(metaDesc);

        const metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        metaKeywords.content = "sand battery, thermal energy storage, Alterno, Kent Nguyen, interactive simulation, patent 12130086";
        document.head.appendChild(metaKeywords);

        const ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        ogTitle.content = "Interactive Sand Battery Simulation";
        document.head.appendChild(ogTitle);

        const ogDesc = document.createElement("meta");
        ogDesc.setAttribute("property", "og:description");
        ogDesc.content = "Interactive thermodynamic simulation of the patented Sand Battery by Alterno.";
        document.head.appendChild(ogDesc);

        return () => {
            document.head.removeChild(metaDesc);
            document.head.removeChild(metaKeywords);
            document.head.removeChild(ogTitle);
            document.head.removeChild(ogDesc);
        };
    }, []);

    // Real project images from /public/images/sb
    const galleryImages = [
        { id: 1, src: "/images/sb/2022-11-10_18_36_02.jpg.jpg", date: "Nov 10, 2022" },
        { id: 2, src: "/images/sb/IMG_20221203_135117.jpg", date: "Dec 3, 2022" },
        { id: 3, src: "/images/sb/IMG_20221222_172515.jpg", date: "Dec 22, 2022" },
        { id: 4, src: "/images/sb/IMG_20230319_085507.jpg", date: "Mar 19, 2023" },
        { id: 5, src: "/images/sb/IMG_20230511_090215.jpg", date: "May 11, 2023" },
        { id: 6, src: "/images/sb/IMG_20230512_185619.jpg", date: "May 12, 2023" },
        { id: 7, src: "/images/sb/IMG_20230516_083432.jpg", date: "May 16, 2023" },
        { id: 8, src: "/images/sb/1689252322332-techplanter.jpg", date: "Jul 13, 2023" },
        { id: 9, src: "/images/sb/FB_IMG_1692369070267.jpg", date: "Aug 18, 2023" },
        { id: 10, src: "/images/sb/2023-09-08-12-36-03-104.jpg", date: "Sep 8, 2023" },
        { id: 11, src: "/images/sb/IMG_20231127_164139.jpg", date: "Nov 27, 2023" },
        { id: 12, src: "/images/sb/2024-02-22 15.01.38.jpg", date: "Feb 22, 2024" },
        { id: 13, src: "/images/sb/IMG_20240426_103006.jpg", date: "Apr 26, 2024" },
        { id: 14, src: "/images/sb/IMG_20240516_080317.jpg", date: "May 16, 2024" },
        { id: 15, src: "/images/sb/IMG_20240529_092152.jpg", date: "May 29, 2024" },
        { id: 16, src: "/images/sb/IMG_20240627_142913.jpg", date: "Jun 27, 2024" },
        { id: 17, src: "/images/sb/img_4066 (1).jpg", date: "Jul 4, 2024" },
        { id: 18, src: "/images/sb/z5101650071413_a18d7861f8387178ca615a5bff70d122.jpg", date: "Jul 15, 2024" },
        { id: 19, src: "/images/sb/baotuoitre_pincat.jpg", date: "Press Day" },
        { id: 20, src: "/images/sb/IMG_20250521_162020.jpg", date: "May 21, 2025" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 py-16 px-4">
            <div className="max-w-5xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                        Interactive Sand Battery
                    </h1>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                        Watch the sand battery heat up to 600°C with glowing heating elements, discharge hot air at 200°C with animated airflow, and cool down naturally when stopped. Use the controls below to simulate thermal behavior.
                    </p>
                </div>

                {/* Video Introduction Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold font-heading border-b border-gray-200 pb-2">What is Sand Battery?</h2>
                        <p className="text-gray-500 mt-2 text-sm">A brief introduction to the technology behind our thermal energy storage system.</p>
                    </div>

                    <div className="w-full aspect-video bg-gray-900 rounded-sm border border-gray-900/10 overflow-hidden flex items-center justify-center">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/Gxygg8v30OE?autoplay=1"
                            title="What is Sand Battery?"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="w-full h-full object-cover"
                        ></iframe>
                    </div>
                </div>

                {/* Canvas Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold font-heading border-b border-gray-200 pb-2">Thermal Simulation</h2>
                        <p className="text-gray-500 mt-2 text-sm">Interactive cross-section visualization of the sand battery's thermal behavior.</p>
                    </div>

                    <div className="w-full aspect-video bg-white rounded-sm overflow-hidden border border-gray-200">
                        <canvas
                            ref={canvasRef}
                            width={1920}
                            height={1080}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Control Panel */}
                    <div className="bg-white rounded-sm p-6 border border-gray-200">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={simulation.actions.startCharging}
                                className={`flex items-center gap-3 px-6 py-4 rounded-sm font-bold text-lg transition-colors duration-200 ${simulation.state.operationalState === 'CHARGING'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-amber-500 text-white hover:bg-amber-600'
                                    }`}
                            >
                                <Zap size={24} className={simulation.state.operationalState === 'CHARGING' ? 'animate-pulse' : ''} />
                                <span>Charge</span>
                            </button>

                            <button
                                onClick={simulation.actions.startDischarging}
                                disabled={simulation.state.currentTemperature < 50}
                                className={`flex items-center gap-3 px-6 py-4 rounded-sm font-bold text-lg transition-colors duration-200 ${simulation.state.operationalState === 'DISCHARGING'
                                    ? 'bg-green-500 text-white'
                                    : simulation.state.currentTemperature < 50
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                            >
                                <Wind size={24} className={simulation.state.operationalState === 'DISCHARGING' ? 'animate-spin' : ''} />
                                <span>Discharge</span>
                            </button>

                            <button
                                onClick={simulation.actions.stop}
                                className={`flex items-center gap-3 px-6 py-4 rounded-sm font-bold text-lg transition-colors duration-200 ${simulation.state.operationalState === 'COOLING' || simulation.state.operationalState === 'STOPPED'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-500 text-white hover:bg-gray-600'
                                    }`}
                            >
                                <Square size={24} />
                                <span>Stop</span>
                            </button>
                        </div>

                        {/* Status indicator */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${simulation.state.operationalState === 'CHARGING' ? 'bg-amber-500 animate-pulse' :
                                        simulation.state.operationalState === 'DISCHARGING' ? 'bg-blue-500 animate-pulse' :
                                            simulation.state.operationalState === 'COOLING' ? 'bg-red-500 animate-pulse' :
                                                'bg-gray-400'
                                        }`}></div>
                                    <span className="text-gray-600 font-medium">Status: </span>
                                    <span className={`font-bold ${simulation.state.operationalState === 'CHARGING' ? 'text-amber-600' :
                                        simulation.state.operationalState === 'DISCHARGING' ? 'text-blue-600' :
                                            simulation.state.operationalState === 'COOLING' ? 'text-red-600' :
                                                'text-gray-600'
                                        }`}>
                                        {simulation.state.operationalState === 'CHARGING' ? 'Heating to 600°C' :
                                            simulation.state.operationalState === 'DISCHARGING' ? 'Discharging hot air' :
                                                simulation.state.operationalState === 'COOLING' ? 'Cooling down' :
                                                    'Standby'}
                                    </span>
                                </div>
                                <div className="text-gray-400">|</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600 font-medium">Core Temp: </span>
                                    <span className={`font-bold ${simulation.state.currentTemperature < 100 ? 'text-blue-600' :
                                        simulation.state.currentTemperature < 300 ? 'text-amber-600' :
                                            'text-red-600'
                                        }`}>
                                        {Math.round(simulation.state.currentTemperature)}°C
                                    </span>
                                </div>
                                <div className="text-gray-400">|</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600 font-medium">Output Air: </span>
                                    <span className={`font-bold ${simulation.state.outputTemperature > 100 ? 'text-red-600' :
                                        simulation.state.outputTemperature > 50 ? 'text-amber-600' :
                                            'text-gray-600'
                                        }`}>
                                        {Math.round(simulation.state.outputTemperature)}°C
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Collapsed Timeline Section */}
                <div className="space-y-4">
                    <div
                        className="flex items-center justify-between cursor-pointer border-b border-gray-200 pb-2 group"
                        onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                    >
                        <h2 className="text-2xl font-bold font-heading group-hover:text-amber-600 transition-colors">
                            Development Timeline
                        </h2>
                        <button className="text-gray-500 group-hover:text-amber-600 transition-colors p-1 rounded-full hover:bg-gray-200">
                            {isTimelineOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                        </button>
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isTimelineOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="py-8 relative border-l-2 border-amber-500/30 ml-3">
                            {TIMELINE_DATA.map((yearGroup) => (
                                <div key={yearGroup.year} className="mb-10 last:mb-0">
                                    {/* Year Node */}
                                    <div className="relative pl-8 mb-6 group">
                                        <div className="absolute w-4 h-4 bg-white border-4 border-amber-500 rounded-full -left-[9px] top-1 z-10 transition-transform duration-300"></div>
                                        <h3 className="font-heading text-2xl font-bold text-gray-900 leading-none">{yearGroup.year}</h3>
                                        <p className="text-sm font-medium text-amber-600 mt-1">{yearGroup.description}</p>
                                    </div>

                                    {/* Events for the year */}
                                    <div className="space-y-4">
                                        {yearGroup.events.map((event, eventIndex) => (
                                            <div
                                                key={eventIndex}
                                                className={`relative pl-8 group transition-colors duration-300 ${event.isMilestone
                                                    ? "bg-amber-50/60 hover:bg-amber-100/60 p-5 rounded-r-sm border border-amber-200/50"
                                                    : "hover:bg-gray-50 p-3 rounded-sm border border-transparent hover:border-gray-200"
                                                    }`}
                                            >
                                                {/* Event Node */}
                                                <div className={`absolute transition-transform duration-300 z-10 ${event.isMilestone
                                                    ? "w-5 h-5 bg-green-500 rounded-full -left-[11px] top-6 border-4 border-white"
                                                    : "w-3 h-3 bg-amber-400 rounded-full -left-[7px] top-5 border-2 border-white group-hover:bg-amber-500"
                                                    }`}></div>

                                                <h4 className="font-bold text-lg text-gray-900 flex flex-wrap items-center gap-2">
                                                    {event.title}
                                                    {event.isMilestone && (
                                                        <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                                            Approved
                                                        </span>
                                                    )}
                                                </h4>
                                                <time className={`text-sm font-semibold mb-2 block ${event.isMilestone ? "text-green-600" : "text-amber-600/80"}`}>
                                                    {event.date}
                                                </time>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-2">
                        <h2 className="text-2xl font-bold font-heading">Project Gallery</h2>
                        <p className="text-gray-500 mt-1">Visual documentation of the sand battery from initial schematics to the finalized physical deployment.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
                        {galleryImages.map((img) => (
                            <div key={img.id} className="group relative rounded-sm overflow-hidden bg-white aspect-square flex flex-col cursor-pointer ring-1 ring-gray-200 hover:ring-gray-300 transition-colors duration-300">
                                <div className="flex-1 w-full h-full relative overflow-hidden bg-gray-50 flex items-center justify-center">
                                    <img
                                        src={img.src}
                                        alt={img.date}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                {/* Subtle overlay interaction */}
                                <div className="absolute inset-0 bg-gray-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                {/* Date Bar */}
                                <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-sm p-3 border-t border-gray-100 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center">
                                    <p className="text-sm text-gray-700 font-semibold tracking-wide">{img.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="pt-12 pb-8 text-center border-t border-gray-200">
                    <a
                        href="/sand-battery-patent-download"
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                    >
                        &larr; Back to Patent Information
                    </a>
                </div>

            </div>
        </div>
    );
};

export default SandBatteryExperiment;
