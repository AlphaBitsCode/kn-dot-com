import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SandBatteryExperiment: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isTimelineOpen, setIsTimelineOpen] = useState(false);

    useEffect(() => {
        document.title = "Interactive Sand Battery | Kent Nguyen";

        // Simple placeholder canvas drawing to indicate it's a real canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.fillStyle = "#e5e7eb"; // Tailwind gray-200
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#9ca3af"; // Tailwind gray-400
                ctx.font = "30px Inter, sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("Interactive WebGL Canvas Ready", canvas.width / 2, canvas.height / 2);
            }
        }
    }, []);

    // Placeholder images for the gallery
    const galleryImages = [
        { id: 1, caption: "Initial Concept Drawings", bg: "bg-blue-100" },
        { id: 2, caption: "First Prototype Assembly", bg: "bg-orange-100" },
        { id: 3, caption: "Heating Coil Integration", bg: "bg-red-100" },
        { id: 4, caption: "Insulation Layers Applied", bg: "bg-gray-200" },
        { id: 5, caption: "Final Deployment Setup", bg: "bg-green-100" },
        { id: 6, caption: "Active Heat Retention Testing", bg: "bg-yellow-100" },
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
                        Explore the inner workings of the sand battery technology. This interactive experiment lets you simulate charging, discharging, and thermal retention.
                    </p>
                </div>

                {/* Canvas Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold font-heading border-b border-gray-200 pb-2">Simulation Engine</h2>
                    <div className="w-full aspect-video bg-gray-200 border-2 border-dashed border-gray-400 rounded-xl relative overflow-hidden shadow-inner group">
                        <canvas
                            ref={canvasRef}
                            width={1920}
                            height={1080}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay for "coming soon" or interactive placeholder */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/10 opacity-100 transition-opacity duration-300 pointer-events-none">
                            <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172v-5.172L8 4z" />
                            </svg>
                            <span className="bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                                WebGL Canvas Placeholder
                            </span>
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

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isTimelineOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="py-8 relative border-l-2 border-amber-500 ml-3 space-y-10">

                            {/* Timeline Item 1 */}
                            <div className="relative pl-8">
                                <div className="absolute w-4 h-4 bg-amber-500 rounded-full -left-[9px] top-1.5 border-4 border-white shadow-sm transition-transform duration-300 hover:scale-125"></div>
                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-amber-700 transition-colors">Invention & Conceptualization</h3>
                                <time className="text-sm font-semibold text-amber-600 mb-2 block">2022 - 2023</time>
                                <p className="text-gray-600">The core concept of utilizing abundant sand and graphite for high-capacity thermal storage was developed. Initial physics models and material tests were conducted to validate sustained heat retention properties up to 800&deg;C.</p>
                            </div>

                            {/* Timeline Item 2 */}
                            <div className="relative pl-8">
                                <div className="absolute w-4 h-4 bg-amber-500 rounded-full -left-[9px] top-1.5 border-4 border-white shadow-sm transition-transform duration-300 hover:scale-125"></div>
                                <h3 className="font-bold text-lg text-gray-900">Prototyping & Iteration</h3>
                                <time className="text-sm font-semibold text-amber-600 mb-2 block">Late 2023</time>
                                <p className="text-gray-600">Small-scale physical prototypes were constructed to refine the structural integrity of the stainless steel core shell and optimize the integration of the heating elements and extraction pipes.</p>
                            </div>

                            {/* Timeline Item 3 */}
                            <div className="relative pl-8 bg-amber-50/50 p-4 rounded-r-lg -mt-4 border border-amber-100/50">
                                <div className="absolute w-5 h-5 bg-green-500 rounded-full -left-[11px] top-5 border-4 border-white shadow-md animate-pulse"></div>
                                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                    USPTO Patent Approval
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Approved</span>
                                </h3>
                                <time className="text-sm font-semibold text-green-600 mb-2 block">October 29, 2024</time>
                                <p className="text-gray-700">The United States Patent and Trademark Office officially issued Patent No. US 12,130,086 B1 for the "Thermal Storage Batteries and Thermal Storage Battery Systems".</p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-2">
                        <h2 className="text-2xl font-bold font-heading">Project Gallery</h2>
                        <p className="text-gray-500 mt-1">Visual documentation of the sand battery from initial schematics to the finalized physical deployment.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                        {galleryImages.map((img) => (
                            <div key={img.id} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white aspect-[4/3] flex flex-col cursor-pointer ring-1 ring-gray-900/5 hover:ring-amber-500/50">
                                {/* Visual Placeholder */}
                                <div className={`flex-1 ${img.bg} flex items-center justify-center p-6 text-center transition-transform duration-700 group-hover:scale-110`}>
                                    <svg className="w-12 h-12 text-gray-400/50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                {/* Overlay Gradient for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Caption Bar */}
                                <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 border-t border-gray-100 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="font-semibold text-gray-800 text-sm text-center">{img.caption}</p>
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
