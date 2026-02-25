import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Calendar, MapPin, Clock, Target, Zap, Users, ArrowRight, Loader2 } from "lucide-react";

const AiWorkshopForFounders: React.FC = () => {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = "AI Workshop for Solo Founders in Vietnam | Kent Nguyen";

        const updateMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
            let meta = document.querySelector(`meta[${selector}="${attrValue}"]`);
            let originalContent = null;
            let created = false;

            if (meta) {
                originalContent = meta.getAttribute("content");
                meta.setAttribute("content", content);
            } else {
                meta = document.createElement("meta");
                meta.setAttribute(attrName, attrValue);
                meta.setAttribute("content", content);
                document.head.appendChild(meta);
                created = true;
            }
            return { meta, originalContent, created };
        };

        const desc = updateMetaTag("name", "name", "description", "In-person AI workshop for solo founders and expat entrepreneurs in Ho Chi Minh City and Da Nang. Build AI-powered business systems in one day — no code required.");
        const ogTitle = updateMetaTag("property", "property", "og:title", "AI Workshop for Solo Founders in Vietnam");
        const ogDesc = updateMetaTag("property", "property", "og:description", "In-person AI workshop for solo founders and expat entrepreneurs in Ho Chi Minh City and Da Nang. Build AI-powered business systems in one day — no code required.");
        const ogImage = updateMetaTag("property", "property", "og:image", "https://www.kentnguyen.com/images/workshop/workshop_3.jpg");

        return () => {
            document.title = originalTitle;

            const restoreOrRemove = (op: { meta: Element | null, originalContent: string | null, created: boolean }) => {
                if (op.created && op.meta && op.meta.parentNode) {
                    op.meta.parentNode.removeChild(op.meta);
                } else if (op.meta && op.originalContent !== null) {
                    op.meta.setAttribute("content", op.originalContent);
                }
            };

            restoreOrRemove(desc);
            restoreOrRemove(ogTitle);
            restoreOrRemove(ogDesc);
            restoreOrRemove(ogImage);
        };
    }, []);

    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formCity, setFormCity] = useState("hcmc");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Client-side: reject +alias emails immediately
        const emailLower = formEmail.toLowerCase();
        const [localPart] = emailLower.split("@");
        if (localPart.includes("+")) {
            setError("Email aliases (e.g. you+alias@domain.com) are not accepted. Please use your primary email.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/workshop-notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: formName, email: formEmail, city: formCity }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                setError(data.error || "Something went wrong. Please try again.");
            } else {
                setSubmitted(true);
            }
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    const workshopImages = [
        "/images/workshop/workshop_1.jpg",
        "/images/workshop/workshop_2.jpg",
        "/images/workshop/workshop_3.jpg",
    ];

    const heroImage = useMemo(
        () => workshopImages[Math.floor(Math.random() * workshopImages.length)],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const features = [
        {
            title: "Hands-On AI Building",
            description: "No slides-only theory. You'll leave with real AI automations configured for your specific operations in Vietnam.",
            icon: <Zap className="text-amber-500" size={24} />
        },
        {
            title: "Small, Curated Cohort",
            description: "Private event with exactly 30 seats. Connect with other driven expat and local solo founders.",
            icon: <Users className="text-amber-500" size={24} />
        },
        {
            title: "No-Code Systems",
            description: "Build SOPs, landing pages, and workflows using Lovable.dev, Stitch, and AI Studio — zero coding required.",
            icon: <Target className="text-amber-500" size={24} />
        },
        {
            title: "Reclaim Your Time",
            description: "Every framework taught is designed to give you back 5-10 hours a week, so you can focus on growth.",
            icon: <Clock className="text-amber-500" size={24} />
        }
    ];

    const builds = [
        "Turn a rough business idea into a validated product brief with market research, competitor analysis, and a go-to-market outline — all in under 30 minutes.",
        "Create a clickable product prototype or a polished landing page without writing a single line of code.",
        "Go live with a professional landing page for your product or service — built, designed, and published in under an hour.",
        "Build a content engine that drafts 30 days of social media posts, email sequences, and ad copy in your brand voice.",
        "Set up an automated invoice processor that reads receipts, extracts data, and logs everything into your spreadsheet.",
        "Create an AI screening flow that filters CVs and schedules interviews — no more manual sorting.",
        "Deploy a customer FAQ bot connected to your knowledge base to handle routine queries automatically."
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 py-16 px-4">
            <div className="max-w-5xl mx-auto space-y-16">

                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-2">
                        In-Person Only
                    </div>
                    <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
                        AI Workshop for <span className="text-amber-600">Solo Founders</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        One focused morning. Walk in with questions about AI — walk out with real automations running your operations. Built specifically for solo founders and expat entrepreneurs scaling in Vietnam.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-sm border border-gray-200 shadow-sm w-full sm:w-auto text-left">
                            <div className="bg-amber-100 p-3 rounded-full">
                                <MapPin className="text-amber-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Ho Chi Minh City</h3>
                                <p className="text-sm text-gray-500">March 2026</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-sm border border-gray-200 shadow-sm w-full sm:w-auto text-left">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <MapPin className="text-blue-600" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Da Nang</h3>
                                <p className="text-sm text-gray-500">April 2026</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emphasized Image Section */}
                <div className="w-full aspect-video md:aspect-[21/9] bg-gray-200 rounded-sm overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm relative group">
                    <img
                        src={heroImage}
                        alt="Founders collaborating at an AI workshop"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900/10 pointer-events-none"></div>
                </div>

                {/* Value Proposition Grid */}
                <div>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold font-heading">Built for Founders Who Wear Every Hat</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            One focused day to install the AI operating layer your business in Vietnam has been missing.
                            No tech background needed. Just practical tools you'll use every single day.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-sm border border-gray-200 hover:border-amber-200 transition-colors">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What You'll Build */}
                <div className="bg-white border border-gray-200 p-8 md:p-12 rounded-sm">
                    <h2 className="text-3xl font-bold font-heading mb-8">What You'll Build in One Morning</h2>
                    <div className="space-y-4">
                        {builds.map((build, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                                <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={24} />
                                <p className="text-lg text-gray-700">{build}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Before & After */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-100 p-8 rounded-sm border border-gray-200">
                        <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                            <span className="bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">B</span>
                            Before the Workshop
                        </h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex gap-3">
                                <span className="text-gray-400 font-bold">•</span>
                                Spend 2+ hours a day drafting social media posts.
                            </li>
                            <li className="flex gap-3">
                                <span className="text-gray-400 font-bold">•</span>
                                Manually reply to every customer inquiry.
                            </li>
                            <li className="flex gap-3">
                                <span className="text-gray-400 font-bold">•</span>
                                Update spreadsheets by hand from receipts and invoices.
                            </li>
                            <li className="flex gap-3">
                                <span className="text-gray-400 font-bold">•</span>
                                Feel overwhelmed wearing every hat in your business while navigating a foreign market.
                            </li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 p-8 rounded-sm border border-amber-200">
                        <h3 className="text-xl font-bold mb-6 text-amber-900 flex items-center gap-2">
                            <span className="bg-amber-200 text-amber-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">A</span>
                            After the Workshop
                        </h3>
                        <ul className="space-y-4 text-amber-800">
                            <li className="flex gap-3">
                                <span className="text-amber-400 font-bold">•</span>
                                AI drafts your posts — you just review and hit publish (15 min).
                            </li>
                            <li className="flex gap-3">
                                <span className="text-amber-400 font-bold">•</span>
                                A chatbot answers 80% of questions while you sleep.
                            </li>
                            <li className="flex gap-3">
                                <span className="text-amber-400 font-bold">•</span>
                                Receipts get scanned, parsed, and logged automatically.
                            </li>
                            <li className="flex gap-3">
                                <span className="text-amber-400 font-bold">•</span>
                                You focus on growth and customers, not the grind.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Instructor & Call to Action */}
                <div className="border-t border-gray-200 pt-16 grid md:grid-cols-5 gap-12">
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold font-heading mb-4">About the Instructor</h3>
                        <p className="text-gray-600 mb-4">
                            <strong>Kent Nguyen</strong> is a veteran Serial Entrepreneur who uses AI every single day — not as a gimmick, but as his actual team. He runs his businesses with 10+ AI tools handling everything from content creation to bookkeeping to customer support.
                        </p>
                        <p className="text-gray-600">
                            Having worked with thousands of solo founders, Kent knows exactly which tools matter and which ones are just hype. This workshop focuses entirely on pragmatic, leverage-creating tools for founders bridging the gap in Vietnam.
                        </p>
                    </div>
                    <div className="md:col-span-3 bg-gray-900 text-white p-8 rounded-sm shadow-xl">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-6">
                                <CheckCircle2 className="text-green-400 mb-4" size={48} />
                                <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                                <p className="text-gray-300 max-w-xs">
                                    Check your inbox — a confirmation is on its way. We'll ping you with dates and early-bird pricing when they're confirmed.
                                </p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold mb-2">Seats are limited and fill fast.</h3>
                                <p className="text-gray-300 mb-6 text-sm">
                                    Join the waitlist — we'll send you dates, venue, and early-bird pricing the moment they're confirmed.
                                </p>
                                <form id="workshop-waitlist-form" onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="ws-name" className="block text-sm font-medium text-gray-300 mb-1">Your name</label>
                                        <input
                                            id="ws-name"
                                            type="text"
                                            placeholder="Jane Smith"
                                            value={formName}
                                            onChange={e => setFormName(e.target.value)}
                                            className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="ws-email" className="block text-sm font-medium text-gray-300 mb-1">Your email <span className="text-amber-400">*</span></label>
                                        <input
                                            id="ws-email"
                                            type="email"
                                            placeholder="you@example.com"
                                            required
                                            value={formEmail}
                                            onChange={e => setFormEmail(e.target.value)}
                                            className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="ws-city" className="block text-sm font-medium text-gray-300 mb-1">Preferred city</label>
                                        <select
                                            id="ws-city"
                                            value={formCity}
                                            onChange={e => setFormCity(e.target.value)}
                                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                                        >
                                            <option value="hcmc">Ho Chi Minh City — March 2026</option>
                                            <option value="danang">Da Nang — April 2026</option>
                                        </select>
                                    </div>
                                    {error && (
                                        <p className="text-red-400 text-sm">{error}</p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-700 disabled:cursor-not-allowed text-gray-900 font-bold py-4 px-8 rounded-sm transition-colors text-base"
                                    >
                                        {loading ? (
                                            <><Loader2 className="animate-spin" size={18} /> Sending…</>
                                        ) : (
                                            <>Notify Me When Spots Open <ArrowRight size={18} /></>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AiWorkshopForFounders;
