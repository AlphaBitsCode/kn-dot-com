
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TimelineItem {
  year: string;
  title: string;
  role: string;
  icon: string;
  description: string;
  achievements?: string[];
  thumbnailId?: string;
}

const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Removed activeIndex and setActiveIndex
  // const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const timelineData: TimelineItem[] = [
    {
      year: "2009–2011",
      title: "TGM",
      role: "Co-founder",
      icon: "🟢",
      description: "Founded by a group of NUS-Alumni, this company provided motivational training and published self-help books.",
      achievements: [
        "Grew to 100+ full-time staff across three major cities in Vietnam",
        "Spun off into four different companies after 2011"
      ],
      thumbnailId: "tgm"
    },
    {
      year: "2013–2017",
      title: "Silicon Straits",
      role: "CTO",
      icon: "⚙️",
      description: "Started as a Venture Capital fund. Silicon Straits Foundry, the product development arm co-founded by Kent, built web, mobile, and hardware products for startups and enterprises in Southeast Asia.",
      achievements: [
        "Grew team to around 100 people, 65 developers",
        "Operated from offices in Singapore and Ho Chi Minh City",
        "BOT for regional startups (Parcel Perform, 7-Eleven, Bluebird, MAUA)"
      ],
      thumbnailId: "sss"
    },
    {
      year: "2017",
      title: "Grab",
      role: "Head of Engineering Vietnam",
      icon: "🚖",
      description: "Led one of Grab's engineering centres, focusing on utility features and internal tools, after acqui-hired by Grab Holdings.",
      achievements: [
        "Managed the transition of an acquired team",
        "Established internal collaborations"
      ],
      thumbnailId: "grab"
    },
    {
      year: "2020–2023",
      title: "Anatics",
      role: "Co-founder",
      icon: "📊",
      description: "A boutique consulting firm focusing on Data and Business Intelligence, assisting Small and Medium-sized Enterprises (SMEs) with data consolidation and adopting modern BI tools.",
      achievements: [
        "Data/BI Consulting for SMEs in Vietnam during COVID",
        "Podcast series on Digital Transformation for businesses",
      ],
      thumbnailId: "anatics"
    },
    {
      year: "2023–2024",
      title: "Alternō",
      role: "Inventor & Founder",
      icon: "🔥",
      description: "Asia's first company focused on low-cost sand-based zero emission thermal energy storage (Sand Battery).",
      achievements: [
        "Invented Home-made Prototype in November 2022",
        "Received pre-seed investment in January 2023",
        "Raised a Seed round of $1.5M in April 2024"
      ],
      thumbnailId: "alterno"
    },
    {
      year: "2023–Now",
      title: "Alpha Bits",
      role: "AI Workflow Automation for Businesses",
      icon: "🤖",
      description: "Positioning as a one-stop technology partner and CTO-as-a-Service, Alpha Bits specialises in AI Workflow Automation and Digital Transformation for SMBs.",
      achievements: [
        "Business process automation",
        "ERP/CRM integration",
        "Scalable AI agents deployment"
      ],
      thumbnailId: "alphabits"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = document.querySelectorAll(".timeline-entry");
    timelineItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="timeline" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Career <span className="text-highlight">Journey</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center max-w-3xl mx-auto">
          Two decades of building, leading, and transforming tech companies
        </p>

        <div ref={sectionRef} className="max-w-4xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-entry animate-on-scroll relative mb-20 ${index % 2 === 0 ? "text-right" : "text-left"}`}
                  // Removed onClick
                >
                  <div
                    className={`flex items-center ${
                      index % 2 === 0 ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`w-1/2 px-6 ${
                        index % 2 === 0 ? "pr-16" : "pl-16"
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="mb-4 overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
                        {item.thumbnailId ? (
                          <div className="aspect-video bg-gray-100 dark:bg-gray-800 animate-pulse overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600">
                              {item.icon} {item.title}
                            </div>
                            {/* Placeholder for the ken burns effect images */}
                            <div className="timeline-thumbnail" data-thumbnail-id={item.thumbnailId}>
                            <img
                                src={`images/${
                                  item.thumbnailId === "tgm"
                                    ? "tgm.jpg"
                                    : item.thumbnailId === "sss"
                                    ? "sss_2.jpg"
                                    : item.thumbnailId === "grab"
                                    ? "grab_2.jpg"
                                    : item.thumbnailId === "anatics"
                                    ? "anatics_1.jpg"
                                    : item.thumbnailId === "alterno"
                                    ? "alterno_1.jpg"
                                    : item.thumbnailId === "alphabits"
                                    ? "alphabits_1.jpg"
                                    : ""
                                }`}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ) : (
                          <Skeleton className="aspect-video" />
                        )}
                      </div>

                      <div className="mb-2">
                        <span className="inline-block bg-highlight/10 text-highlight px-3 py-1 rounded-full text-sm font-medium">
                          {item.year}
                        </span>
                      </div>
                      <h3 className="flex items-center text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {index % 2 === 1 && (
                          <>
                            <span className="mr-2">{item.icon}</span>
                            {item.title}
                          </>
                        )}
                        {index % 2 === 0 && (
                          <>
                            {item.title}
                            <span className="ml-2">{item.icon}</span>
                          </>
                        )}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {item.role}
                      </p>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                      
                      {/* Always show achievements if present */}
                      {item.achievements && (
                        <div className="mt-4 text-sm">
                          <ul className={`list-disc ${index % 2 === 0 ? "text-right list-inside" : "pl-4"}`}>
                            {item.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-400 dark:text-gray-200">
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-highlight rounded-full border-4 border-white dark:border-gray-900 top-6"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden">
            <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className="timeline-entry animate-on-scroll timeline-item relative mb-12 pl-8"
                  // Removed onClick
                >
                  <div className="absolute -left-4 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 bg-highlight rounded-full text-white">
                      <span>{item.icon}</span>
                    </div>
                  </div>
                  
                  {/* Thumbnail */}
                  <div className="mb-4 overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
                    {item.thumbnailId ? (
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                        <img
                          src={`images/${
                            item.thumbnailId === "tgm"
                              ? "tgm.jpg"
                              : item.thumbnailId === "sss"
                              ? "sss_1.jpg"
                              : item.thumbnailId === "grab"
                              ? "grab_1.jpg"
                              : item.thumbnailId === "anatics"
                              ? "anatics_1.jpg"
                              : item.thumbnailId === "alterno"
                              ? "alterno_1.jpg"
                              : item.thumbnailId === "alphabits"
                              ? "alphabits_1.jpg"
                              : ""
                          }`}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Optionally, overlay icon/title as before */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600 pointer-events-none">
                          {item.icon} {item.title}
                        </div>
                      </div>
                    ) : (
                      <Skeleton className="aspect-video" />
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <span className="inline-block bg-highlight/10 text-highlight px-3 py-1 rounded-full text-sm font-medium">
                      {item.year}
                    </span>
                  </div>
                  
                  <h3
                    className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center"
                  >
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    {item.role}
                  </p>
                  
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                  
                  {/* Always show achievements if present */}
                  {item.achievements && (
                    <div className="mt-4 text-sm">
                      <ul className={`list-disc ${index % 2 === 0 ? "text-right list-inside" : "pl-4"}`}>
                        {item.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-700 dark:text-gray-300">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
