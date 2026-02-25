import React, { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, MapPin, Clock, Target, Zap, Users, ArrowRight, Loader2, Calendar } from "lucide-react";

/* ─── Scroll-reveal hook ─────────────────────────────────────── */
function useReveal(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

/* ─── Parallax hook ─────────────────────────────────────────── */
function useParallax(speed = 0.3) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
            el.style.transform = `translateY(${offset}px)`;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [speed]);
    return ref;
}

/* ─── Reveal wrapper ─────────────────────────────────────────── */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
    children, delay = 0, className = ""
}) => {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

/* ─── Component ─────────────────────────────────────────────── */
const AiWorkshopForFounders: React.FC = () => {

    /* SEO */
    useEffect(() => {
        const originalTitle = document.title;
        document.title = "AI Workshop for Solo Founders in Vietnam | Kent Nguyen";
        const updateMeta = (sel: string, name: string, val: string, content: string) => {
            let m = document.querySelector<HTMLMetaElement>(`meta[${sel}="${val}"]`);
            let orig: string | null = null; let created = false;
            if (m) { orig = m.getAttribute("content"); m.setAttribute("content", content); }
            else { m = document.createElement("meta"); m.setAttribute(name, val); m.setAttribute("content", content); document.head.appendChild(m); created = true; }
            return { m, orig, created };
        };
        const d = updateMeta("name", "name", "description", "In-person AI workshop for solo founders and expat entrepreneurs in Ho Chi Minh City and Da Nang.");
        const ot = updateMeta("property", "property", "og:title", "AI Workshop for Solo Founders in Vietnam");
        const od = updateMeta("property", "property", "og:description", "Build AI-powered business systems in one morning — no code required.");
        const oi = updateMeta("property", "property", "og:image", "https://www.kentnguyen.com/images/workshop/workshop_3.jpg");
        return () => {
            document.title = originalTitle;
            [d, ot, od, oi].forEach(({ m, orig, created }) => {
                if (created && m?.parentNode) m.parentNode.removeChild(m);
                else if (m && orig !== null) m.setAttribute("content", orig);
            });
        };
    }, []);

    /* Form state */
    const [formName, setFormName] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formCity, setFormCity] = useState("hcmc");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const [localPart] = formEmail.toLowerCase().split("@");
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

    /* Random hero image */
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

    const parallaxRef = useParallax(0.18);

    const features = [
        { title: "Hands-On Building", desc: "No slides-only theory. Walk out with real AI automations configured for your business.", icon: <Zap size={20} /> },
        { title: "Small Cohort", desc: "Private event with exactly 30 seats. Connect with driven founders across Vietnam.", icon: <Users size={20} /> },
        { title: "Zero Code Required", desc: "Build SOPs, landing pages, and workflows using Lovable.dev, Stitch, and AI Studio.", icon: <Target size={20} /> },
        { title: "Reclaim Your Time", desc: "Every framework taught gives you back 5–10 hours a week to focus on growth.", icon: <Clock size={20} /> },
    ];

    const builds = [
        "Turn a rough idea into a validated product brief with market research and go-to-market outline — under 30 minutes.",
        "Create a clickable prototype or polished landing page without writing a single line of code.",
        "Build a content engine that drafts 30 days of posts, email sequences, and ad copy in your brand voice.",
        "Set up an automated invoice processor that reads receipts and logs everything into your spreadsheet.",
        "Create an AI screening flow that filters CVs and schedules interviews — no more manual sorting.",
        "Deploy a customer FAQ bot connected to your knowledge base to handle routine queries automatically.",
    ];

    return (
        <div className="bg-white text-gray-900 overflow-x-hidden">

            {/* ── HERO ────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center bg-[#fafaf9]">
                {/* Subtle ambient blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-amber-100 rounded-full blur-[100px] opacity-60" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-50 rounded-full blur-[80px] opacity-80" />
                </div>

                <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-28 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — text */}
                    <div className="space-y-8 z-10">
                        <div
                            className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                            style={{ animation: "fadeUp 0.6s ease both" }}
                        >
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                            In-Person Only · Vietnam 2026
                        </div>

                        <h1
                            className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.0] text-gray-900"
                            style={{ animation: "fadeUp 0.7s 0.1s ease both" }}
                        >
                            AI Workshop<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
                                for Founders
                            </span>
                        </h1>

                        <p
                            className="text-lg text-gray-500 leading-relaxed max-w-xl"
                            style={{ animation: "fadeUp 0.7s 0.2s ease both" }}
                        >
                            One focused morning. Walk in with questions — walk out with real automations
                            running your operations. Built for solo founders and expat entrepreneurs scaling in Vietnam.
                        </p>

                        <div
                            className="flex flex-wrap gap-3"
                            style={{ animation: "fadeUp 0.7s 0.3s ease both" }}
                        >
                            {[
                                { city: "Ho Chi Minh City", date: "March 2026", color: "amber" },
                                { city: "Da Nang", date: "April 2026", color: "blue" },
                            ].map(({ city, date, color }) => (
                                <div
                                    key={city}
                                    className="flex items-center gap-2.5 bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-2.5 hover:border-amber-300 transition-colors"
                                >
                                    <MapPin size={14} className={color === "amber" ? "text-amber-500" : "text-blue-500"} />
                                    <div>
                                        <div className="text-sm font-semibold text-gray-800">{city}</div>
                                        <div className="text-xs text-gray-400">{date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="flex gap-4 text-sm text-gray-400"
                            style={{ animation: "fadeUp 0.7s 0.4s ease both" }}
                        >
                            {["9:30 AM – 12:00 PM", "English", "30 seats only"].map(tag => (
                                <span key={tag} className="flex items-center gap-1.5">
                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — portrait image with parallax */}
                    <div
                        className="relative hidden lg:flex justify-end"
                        style={{ animation: "fadeIn 1s 0.3s ease both" }}
                    >
                        <div className="relative w-[370px]">
                            {/* Glow shadow behind card */}
                            <div className="absolute -inset-6 bg-amber-100 rounded-3xl blur-2xl opacity-70" />
                            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl shadow-gray-200/80">
                                <div ref={parallaxRef} className="will-change-transform">
                                    <img
                                        src={heroImage}
                                        alt="AI Workshop for Founders"
                                        className="w-full object-cover"
                                        style={{ height: "500px", objectPosition: "center top" }}
                                    />
                                </div>
                            </div>
                            {/* Floating chips */}
                            <div className="absolute -bottom-4 -left-8 bg-white border border-gray-200 shadow-lg rounded-2xl px-4 py-3">
                                <div className="text-2xl font-black text-amber-500">30</div>
                                <div className="text-xs text-gray-400 mt-0.5">seats only</div>
                            </div>
                            <div className="absolute -top-4 -right-5 bg-white border border-gray-200 shadow-lg rounded-2xl px-4 py-3">
                                <Calendar size={14} className="text-amber-500 mb-1" />
                                <div className="text-xs font-bold text-gray-700">2 cities</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* bottom blurred fade into next section */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </section>

            {/* ── FEATURES ─────────────────────────────────────── */}
            <section className="relative py-28 px-6 lg:px-12 bg-white">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-amber-50 rounded-full blur-[80px]" />
                </div>

                <div className="max-w-6xl mx-auto">
                    <Reveal className="text-center mb-20">
                        <p className="text-amber-600 text-xs font-bold tracking-widest uppercase mb-4">The Workshop</p>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 tracking-tight">
                            Built for Founders Who<br />Wear Every Hat
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            One focused morning to install the AI operating layer your business in Vietnam has been missing.
                        </p>
                    </Reveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map(({ title, desc, icon }, i) => (
                            <Reveal key={title} delay={i * 80} className="h-full">
                                <div className="group h-full bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100 cursor-default">
                                    <div className="w-10 h-10 bg-amber-100 border border-amber-200 rounded-xl flex items-center justify-center text-amber-600 mb-5 group-hover:bg-amber-200 transition-colors">
                                        {icon}
                                    </div>
                                    <h3 className="text-gray-900 font-bold text-sm mb-2">{title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
            </section>

            {/* ── WHAT YOU'LL BUILD ─────────────────────────────── */}
            <section className="relative py-28 px-6 lg:px-12 bg-gray-50">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

                <div className="max-w-6xl mx-auto relative z-20">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">

                        {/* Sticky left column */}
                        <Reveal>
                            <div className="lg:sticky lg:top-32">
                                <p className="text-amber-600 text-xs font-bold tracking-widest uppercase mb-4">What You'll Build</p>
                                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 tracking-tight leading-tight">
                                    One morning.<br />
                                    <span className="text-gray-400">Six systems.</span>
                                </h2>
                                <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                                    No laptop? No problem — everything is browser-based. Every system you build is yours to keep and deploy immediately.
                                </p>
                                <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-md">
                                    <img
                                        src="/images/workshop/workshop_2.jpg"
                                        alt="Workshop participants"
                                        className="w-full object-cover"
                                        style={{ height: "300px", objectPosition: "center 20%" }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <div className="text-xs text-white/80 font-medium">Past workshop cohort — HCMC</div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Build list */}
                        <div className="space-y-3">
                            {builds.map((build, i) => (
                                <Reveal key={i} delay={i * 55}>
                                    <div className="group flex gap-4 items-start bg-white hover:bg-amber-50/60 border border-gray-200 hover:border-amber-200 rounded-xl p-5 transition-all duration-300 shadow-sm hover:shadow-md">
                                        <div className="flex-shrink-0 w-6 h-6 bg-amber-100 border border-amber-200 rounded-full flex items-center justify-center mt-0.5">
                                            <CheckCircle2 size={13} className="text-amber-600" />
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">{build}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BEFORE / AFTER ──────────────────────────────── */}
            <section className="relative py-28 px-6 lg:px-12 bg-white overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent" />
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-amber-50 rounded-full blur-[60px]" />
                </div>

                <div className="max-w-6xl mx-auto">
                    <Reveal className="text-center mb-16">
                        <p className="text-amber-600 text-xs font-bold tracking-widest uppercase mb-4">The Transformation</p>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">Before & After</h2>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Before */}
                        <Reveal delay={0}>
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 lg:p-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-black text-gray-500">B</div>
                                    <h3 className="text-base font-bold text-gray-500">Before the Workshop</h3>
                                </div>
                                <ul className="space-y-5">
                                    {[
                                        "2+ hours a day drafting social media posts manually.",
                                        "Manually replying to every customer inquiry.",
                                        "Updating spreadsheets by hand from receipts.",
                                        "Overwhelmed wearing every hat in a foreign market.",
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                                            <span className="text-gray-300 mt-0.5 flex-shrink-0">—</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>

                        {/* After */}
                        <Reveal delay={100}>
                            <div className="relative bg-amber-50 border border-amber-200 rounded-2xl p-8 lg:p-10 overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-xs font-black text-amber-700">A</div>
                                    <h3 className="text-base font-bold text-amber-800">After the Workshop</h3>
                                </div>
                                <ul className="space-y-5">
                                    {[
                                        "AI drafts your posts — you review and hit publish in 15 min.",
                                        "A chatbot answers 80% of questions while you sleep.",
                                        "Receipts get scanned, parsed, and logged automatically.",
                                        "You focus on growth and customers — not the grind.",
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-amber-800/80 text-sm leading-relaxed">
                                            <CheckCircle2 size={15} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
            </section>

            {/* ── INSTRUCTOR + FORM ────────────────────────────── */}
            <section className="relative py-28 px-6 lg:px-12 bg-gray-50">
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-amber-100 rounded-full blur-[80px] opacity-60" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-5 gap-16 items-start">

                        {/* Instructor */}
                        <div className="lg:col-span-2">
                            <Reveal>
                                <p className="text-amber-600 text-xs font-bold tracking-widest uppercase mb-4">Instructor</p>
                                <div className="relative w-24 h-24 mb-5">
                                    <img
                                        src="/images/workshop/workshop_1.jpg"
                                        alt="Kent Nguyen at workshop"
                                        className="w-24 h-24 rounded-2xl object-cover object-top border border-gray-200 shadow-md"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-50" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-1">Kent Nguyen</h3>
                                <p className="text-amber-600 text-sm font-semibold mb-4">Serial Entrepreneur · AI Practitioner</p>
                                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                                    Kent runs multiple businesses with 10+ AI tools handling everything from content to bookkeeping to customer support — not as a gimmick, but as his actual operating team.
                                </p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Having worked with thousands of founders, Kent focuses entirely on pragmatic, leverage-creating tools for the Vietnam market.
                                </p>
                            </Reveal>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-3">
                            <Reveal delay={100}>
                                <div className="relative bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-xl shadow-gray-100 overflow-hidden">
                                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

                                    {submitted ? (
                                        <div className="flex flex-col items-center justify-center text-center py-10">
                                            <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mb-5">
                                                <CheckCircle2 size={30} className="text-green-500" />
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-3">You're on the list!</h3>
                                            <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
                                                A confirmation email is on its way. We'll notify you the moment dates, venue, and early-bird pricing are confirmed.
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-2xl font-black text-gray-900 mb-1">Seats fill fast.</h3>
                                            <p className="text-gray-400 text-sm mb-7">
                                                Join the waitlist — we'll send dates, venue, and early-bird pricing the moment they're confirmed.
                                            </p>

                                            <form id="workshop-waitlist-form" onSubmit={handleSubmit} className="space-y-4">
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="ws-name" className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">Your name</label>
                                                        <input
                                                            id="ws-name"
                                                            type="text"
                                                            placeholder="Jane Smith"
                                                            value={formName}
                                                            onChange={e => setFormName(e.target.value)}
                                                            className="w-full bg-gray-50 text-gray-900 placeholder-gray-300 border border-gray-200 focus:border-amber-400 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="ws-city" className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">Preferred city</label>
                                                        <select
                                                            id="ws-city"
                                                            value={formCity}
                                                            onChange={e => setFormCity(e.target.value)}
                                                            className="w-full bg-gray-50 text-gray-900 border border-gray-200 focus:border-amber-400 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                                                        >
                                                            <option value="hcmc">Ho Chi Minh City — Mar 2026</option>
                                                            <option value="danang">Da Nang — Apr 2026</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="ws-email" className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wide">
                                                        Email <span className="text-amber-500 normal-case font-normal">*</span>
                                                    </label>
                                                    <input
                                                        id="ws-email"
                                                        type="email"
                                                        placeholder="you@yourcompany.com"
                                                        required
                                                        value={formEmail}
                                                        onChange={e => setFormEmail(e.target.value)}
                                                        className="w-full bg-gray-50 text-gray-900 placeholder-gray-300 border border-gray-200 focus:border-amber-400 focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                                                    />
                                                    <p className="text-gray-300 text-xs mt-1.5">Primary addresses only — no aliases or temp emails.</p>
                                                </div>

                                                {error && (
                                                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                                                        <p className="text-red-600 text-sm">{error}</p>
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-200 active:scale-[0.98] text-sm"
                                                >
                                                    {loading ? (
                                                        <><Loader2 className="animate-spin" size={16} /> Sending…</>
                                                    ) : (
                                                        <>Notify Me When Spots Open <ArrowRight size={16} /></>
                                                    )}
                                                </button>
                                            </form>
                                        </>
                                    )}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── keyframes ── */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default AiWorkshopForFounders;
