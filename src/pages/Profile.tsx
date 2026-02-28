import React, { useEffect } from "react";
import Footer from "@/components/Footer";

const Profile: React.FC = () => {
    useEffect(() => {
        document.title = "Profile | Kent Nguyen";

        const metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        metaDesc.content =
            "Kent Nguyen: Serial Tech Entrepreneur, Fractional CTO, and USPTO Patent Inventor. 20+ years building tech startups, ERPs, and AI solutions in Southeast Asia.";
        document.head.appendChild(metaDesc);

        const ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        ogTitle.content = "Profile | Kent Nguyen";
        document.head.appendChild(ogTitle);

        return () => {
            document.head.removeChild(metaDesc);
            document.head.removeChild(ogTitle);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#f4f5f6]">
            {/* Header */}
            <header className="bg-[#1e2328] text-white px-6 sm:px-12 pt-11 pb-9 border-b-4 border-[#0d7377]">
                <h1
                    className="text-4xl sm:text-[38px] font-extrabold leading-tight mb-1 tracking-tight"
                    style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                    Kent Nguyen
                </h1>
                <p
                    className="text-[13px] font-medium text-[#5db8b9] tracking-[3px] uppercase mb-3.5"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                >
                    Serial Tech Entrepreneur · Fractional CTO
                </p>
                <div
                    className="text-[12.5px] text-[#9ca3af] leading-relaxed"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                >
                    20+ years building tech startups, systems, ERPs, and AI solutions
                    across Southeast Asia
                    <br />
                    CEO of{" "}
                    <a
                        href="https://alphabits.team/?utm_source=kentnguyen&utm_medium=website&utm_content=profile_page&utm_campaign=personal_portfolio"
                        className="text-[#5db8b9] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Alpha Bits Technology
                    </a>{" "}
                    · USPTO Patent Inventor · Based in Vietnam
                </div>
            </header>

            {/* Contact Strip */}
            <div
                className="flex flex-wrap gap-x-7 gap-y-1.5 px-6 sm:px-12 py-3 bg-[#2d3239] text-[12px] text-[#bfc4cc] border-b border-[#4a5059]"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
                <a href="mailto:kent@alphabits.team" className="text-[#8fd4d5] hover:underline">
                    kent@alphabits.team
                </a>
                <span className="text-[#4a5059]">·</span>
                <span>+84 868 000 317</span>
                <span className="text-[#4a5059]">·</span>
                <a href="https://kentnguyen.com" className="text-[#8fd4d5] hover:underline">
                    kentnguyen.com
                </a>
                <span className="text-[#4a5059]">·</span>
                <a
                    href="https://www.linkedin.com/in/konductor/"
                    className="text-[#8fd4d5] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    linkedin.com/in/konductor
                </a>
                <span className="text-[#4a5059]">·</span>
                <a
                    href="https://github.com/kentnguyen"
                    className="text-[#8fd4d5] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    github.com/kentnguyen
                </a>
            </div>

            {/* Content */}
            <main
                className="max-w-[780px] mx-auto bg-white px-6 sm:px-12 py-8 sm:py-10"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
            >
                {/* Profile */}
                <Section title="Profile">
                    <p
                        className="text-[14.5px] text-[#3a3f47] leading-[1.7]"
                        style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                    >
                        Seasoned tech entrepreneur, inventor, and hands-on technology leader
                        with over two decades of experience across Southeast Asia.
                        Co-founded 10+ startups since 2009, led engineering at Grab Vietnam,
                        and served as a venture partner at Viet Capital Venture. Named
                        inventor on a USPTO patent for thermal energy storage technology.
                        Currently leading Alpha Bits Technology, building enterprise AI
                        solutions, ERP systems, and running AI workshops for founders.
                        Despite the leadership roles, Kent remains deeply technical —
                        writing code, architecting systems, and shipping products hands-on every day.
                    </p>
                </Section>

                {/* Career */}
                <Section title="Career">
                    <ul className="list-none">
                        <TimelineItem period="Present" title="CEO">
                            <span className="text-[#0a5c5f] font-semibold">
                                Alpha Bits Technology
                            </span>{" "}
                            — ERPs, blockchain platforms, digital transformation, Data/BI
                            dashboards, AI Agents, and Enterprise AI workshops.
                        </TimelineItem>
                        <TimelineItem period="2024" title="USPTO Patent Inventor">
                            US 12,130,086 B1 — Thermal Storage Batteries (Sand Battery),
                            assigned to Alterno Pte. Ltd., Singapore.
                        </TimelineItem>
                        <TimelineItem period="2018 – 2020" title="Tech Advisor & Venture Partner">
                            <span className="text-[#0a5c5f] font-semibold">
                                Viet Capital Venture
                            </span>
                        </TimelineItem>
                        <TimelineItem period="2017" title="Head of Engineering">
                            <span className="text-[#0a5c5f] font-semibold">
                                Grab Vietnam
                            </span>{" "}
                            — Joined via undisclosed acqui-hire deal.
                        </TimelineItem>
                        <TimelineItem
                            period="2013 – 2016"
                            title="CTO & Co-founder"
                        >
                            <span className="text-[#0a5c5f] font-semibold">
                                Silicon Straits & Silicon Straits Saigon
                            </span>{" "}
                            — Building ERP product teams. Led consulting engagements for{" "}
                            <strong className="text-[#3a3f47]">7-Eleven Vietnam</strong>,{" "}
                            <strong className="text-[#3a3f47]">BlueBird Taxi Indonesia</strong>
                            , and{" "}
                            <strong className="text-[#3a3f47]">vPost Singapore</strong>.
                        </TimelineItem>
                        <TimelineItem
                            period="2009 – Present"
                            title="Serial Tech Entrepreneur"
                            isLast
                        >
                            Co-founded 10+ tech startups across Southeast Asia.
                        </TimelineItem>
                    </ul>
                </Section>

                {/* Patent */}
                <Section title="Patent">
                    <div className="bg-[#e8f5ee] border-l-4 border-[#1b6b4a] px-5 py-4">
                        <div className="flex items-baseline justify-between gap-4">
                            <div
                                className="text-[18px] font-medium text-[#1b6b4a]"
                                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                            >
                                US 12,130,086 B1
                            </div>
                            <span className="text-[11.5px] text-[#3d7a5e]">October 29, 2024</span>
                        </div>
                        <div
                            className="text-[13.5px] font-semibold text-[#1a4d35] mt-1 leading-snug"
                            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                        >
                            Thermal Storage Batteries and Thermal Storage Battery Systems
                        </div>
                        <div className="text-[11.5px] text-[#3d7a5e] mt-1.5 leading-relaxed">
                            Assigned to Alterno Pte. Ltd., Singapore.{" "}
                            <a
                                href="/sand-battery-experiment"
                                className="text-[#1b6b4a] font-semibold hover:underline"
                            >
                                Learn more about the Sand Battery →
                            </a>
                        </div>
                    </div>
                </Section>

                {/* Current Focus */}
                <Section title="Current Focus">
                    <div className="grid grid-cols-1 sm:grid-cols-2 bg-[#d1d5db]" style={{ gap: "1px" }}>
                        <FocusItem label="AI & Automation">
                            Building AI Agents and enterprise AI workflow automation
                        </FocusItem>
                        <FocusItem label="Workshops">
                            AI Workshop for Solo Founders in Vietnam
                        </FocusItem>
                        <FocusItem label="IoT & Education">
                            Working on AI Edu IoT projects
                        </FocusItem>
                        <FocusItem label="Alpha Bits">
                            ERPs, Data/BI, digital transformation
                        </FocusItem>
                    </div>
                </Section>

                {/* Expertise */}
                <Section title="Expertise">
                    <div className="flex flex-wrap gap-[5px]">
                        {[
                            "AI / ML",
                            "ERP Systems",
                            "Cloud Architecture",
                            "Blockchain",
                            "IoT",
                            "Data / BI",
                            "Digital Transformation",
                            "Thermal Energy Storage",
                            "Startup Leadership",
                            "Fractional CTO",
                            "Solution Architecture",
                            "Team Building",
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="bg-[#f4f5f6] border border-[#d1d5db] px-[9px] py-[3px] text-[11px] font-medium text-[#4a5059] tracking-wide"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </Section>

            </main>

            {/* Footer */}
            <div className="max-w-[780px] mx-auto bg-white">
                <div className="px-6 sm:px-12 py-4 border-t border-[#d1d5db] flex flex-col sm:flex-row justify-between items-center text-[10.5px] text-[#9ca3af]">
                    <span>© 2026 Kent Nguyen</span>
                    <div className="flex gap-4 mt-1 sm:mt-0">
                        <a href="https://kentnguyen.com" className="text-[#0d7377] hover:underline">
                            kentnguyen.com
                        </a>
                        <a
                            href="https://alphabits.team/?utm_source=kentnguyen&utm_medium=website&utm_content=profile_footer&utm_campaign=personal_portfolio"
                            className="text-[#0d7377] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            alphabits.team
                        </a>
                        <a
                            href="https://github.com/kentnguyen"
                            className="text-[#0d7377] hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            github.com/kentnguyen
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Sub-components ── */

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
    title,
    children,
}) => (
    <section className="mb-7">
        <h2
            className="text-[10px] font-bold tracking-[2.5px] uppercase text-[#0d7377] mb-3 pb-1.5 border-b-[1.5px] border-[#e6f2f2]"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
            {title}
        </h2>
        {children}
    </section>
);

const TimelineItem: React.FC<{
    period: string;
    title: string;
    children: React.ReactNode;
    isLast?: boolean;
}> = ({ period, title, children, isLast }) => (
    <li
        className={`flex gap-5 py-2.5 ${isLast ? "" : "border-b border-[#f0f1f3]"}`}
    >
        <div
            className="flex-shrink-0 w-[105px] text-[11px] font-medium text-[#6b7280] pt-[3px]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
            {period}
        </div>
        <div>
            <h3 className="text-[13.5px] font-bold text-[#1e2328] mb-px">{title}</h3>
            <p className="text-[12.5px] text-[#6b7280] leading-normal">{children}</p>
        </div>
    </li>
);


const FocusItem: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => (
    <div className="bg-white px-3.5 py-3 text-[12.5px] text-[#3a3f47]">
        <div className="font-bold text-[#1e2328] text-[11.5px] uppercase tracking-wide mb-0.5">
            {label}
        </div>
        {children}
    </div>
);

export default Profile;
