
import React, { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TimelineItem {
  year: string;
  title: string;
  role: string;
  icon: string;
  description: string;
  achievements?: string[];
  thumbnailId?: string;
  link?: string; // Add link property
}

const getImageName = (thumbnailId: string | undefined, isDesktop: boolean) => {
  if (!thumbnailId) return "";
  switch (thumbnailId) {
    case "tgm":
      return "tgm.jpg";
    case "anideo":
      return "anideo.jpg";
      case "sss":
      return isDesktop ? "sss_2.jpg" : "sss_1.jpg";
    case "grab":
      return isDesktop ? "grab_2.jpg" : "grab_1.jpg";
    case "spartan":
      return "spartan_pos1.jpg";
    case "anatics":
      return "anatics_1.jpg";
    case "alterno":
      return "alterno_1.jpg";
    case "alphabits":
      return "alphabits_1.jpg";
    case "op3n":
      return "op3n.jpg";
    case "vcam":
      return "vcam_turkey.jpg";
    case "alphablock":
      return isDesktop ? "alphablock_1.jpg" : "alphablock_2.jpg";
    default:
      return "";
  }
};

interface TimelineItemCardProps {
  item: TimelineItem;
  index: number;
  isDesktop: boolean;
}

const TimelineItemCard: React.FC<TimelineItemCardProps> = ({ item, index, isDesktop }) => {
  const alignment = isDesktop ? (index % 2 === 0 ? "text-right" : "text-left") : "";
  const justify = isDesktop ? (index % 2 === 0 ? "justify-end" : "justify-start") : "";
  const px = isDesktop ? (index % 2 === 0 ? "pr-16" : "pl-16") : "";
  const ulClass = index % 2 === 0 ? "text-right list-inside" : "pl-4";
  const imageName = getImageName(item.thumbnailId, isDesktop);

  return (
    <div
      className={`timeline-entry animate-on-scroll relative mb-${isDesktop ? "20" : "12"} ${alignment} ${isDesktop ? "" : "timeline-item pl-8"}`}
    >
      {isDesktop ? (
        <div className={`flex items-center ${justify}`}>
          <div className={`w-1/2 px-6 ${px}`}>
            {/* Thumbnail */}
            <div className="mb-4 overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
              {item.thumbnailId ? (
                <div className={`aspect-video bg-gray-100 dark:bg-gray-800 ${isDesktop ? "animate-pulse" : ""} overflow-hidden relative`}>
                  <div className="timeline-thumbnail" data-thumbnail-id={item.thumbnailId}>
                    <img
                      src={`images/${imageName}`}
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
            {item.link && (
              <a href={item.link} className="text-blue-500 hover:underline">
                Learn more
              </a>
            )}
            {item.achievements && (
              <div className="mt-4 text-sm">
                <ul className={`list-disc ${ulClass}`}>
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
      ) : (
        <>
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
                  src={`images/${imageName}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {item.role}
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {item.description}
          </p>
          {item.link && (
            <a href={item.link} className="text-blue-500 hover:underline">
              Learn more
            </a>
          )}
          {item.achievements && (
            <div className="mt-4 text-sm">
              <ul className={`list-disc ${ulClass.replace("text-right", "text-gray-700 dark:text-gray-300")}`}>
                {item.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      {/* Timeline dot for desktop */}
      {isDesktop && (
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-highlight rounded-full border-4 border-white dark:border-gray-900 top-6"></div>
      )}
    </div>
  );
};

const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const timelineData: TimelineItem[] = [
    {
      year: "2009–2011",
      title: "TGM",
      role: "Co-founder",
      icon: "🟢",
      description: "Founded by a group of Vietnamese NUS-Alumni, TGM provided motivational training and published best-selling self-help books until today.",
      achievements: [
        "Grew to 100+ full-time staff across three major cities in Vietnam",
        "Spun off into four different companies after 2011"
      ],
      thumbnailId: "tgm"
    },
    {
      year: "2011–2012",
      title: "Anideo",
      role: "Co-founder, Mobile Developer",
      icon: "📱",
      description: "A mobile development lab co-founded by an ex-Facebook cofounder. This is where I learnt advanced iOS development and Ruby backend development.",
      achievements: [
        "Built and launched several mobile apps",
        "Hands-on experience with advanced iOS and Ruby backend technologies"
      ],
      thumbnailId: "anideo"
    },
    {
      year: "2013–2017",
      title: "The Silicon Straits mafia",
      role: "Group CTO & Co-Founder & Jack-of-all-Trades",
      icon: "🧑🏻‍💻",
      description: "Started as a Venture Capital fund. Silicon Straits Foundry, the product development arm co-founded by Kent, built web, mobile, and hardware products for startups and enterprises in Southeast Asia.",
      achievements: [
        "Grew team to 100+ full-time staff, 65 developers",
        "Operated from offices in Singapore and Ho Chi Minh City",
        "BOT for regional startups (vPost, Parcel Perform, 7-Eleven, Bluebird, and more)"
      ],
      thumbnailId: "sss"
    },
    {
      year: "2016–2018",
      title: "Spartan Vietnam",
      role: "Country Manager",
      icon: "🏷️",
      description: "Supplier of Android POS equipments for retail shops businesses in Vietnam.",
      achievements: [
        "Supplier of 7-Eleven POS equipments",
        "Import/Export of Android POS equipments, from Taiwan, Singapore",
        "Distributor of POS accessories (QR Code Scanner, Cash Register, Printer, etc.)",
        "2nd Level Technical Support team for 7-Eleven POS equipments",
      ],
      thumbnailId: "spartan"
    },
    {
      year: "2017",
      title: "Grab `Taxi`",
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
      year: "2018–2021",
      title: "Viet Capital Asset Management (VCAM)",
      role: "Venture Partner",
      icon: "💵",
      description: "Venture Capital arm of Viet Capital Conglomerate.",
      achievements: [
        "Technical Due Diligence of startups",
        "Pre-deal & Post-deal Technical Support",
        "Residence Technical Advisor for startup founders",
        "Built initial VCAM Fund Management platform (Fund Certificates)"
      ],
      thumbnailId: "vcam"
    },
    {
      year: "2020–2023",
      title: "Anatics",
      role: "Co-founder",
      icon: "📊",
      description: "A boutique consulting firm focusing on Data and Business Intelligence, assisting Small and Medium-sized Enterprises (SMEs) with data consolidation and adopting modern BI tools. Portfolio incluedes Highlands, Vascara, SieuViet Group, and more.",
      achievements: [
        "Data/BI Consulting for SMEs in Vietnam during pandemic",
        "Build Data Platform & BI Dashboards for SMEs in Vietnam",
        "Podcast series on Digital Transformation for businesses",
      ],
      thumbnailId: "anatics",
      link: "https://anatics.io" // Updated link
    },
    {
      year: "2020–2022",
      title: "OP3N LLC (USA)",
      role: "CTO & Product Lead",
      icon: "🎬",
      description: "Tailored NFT Platform for Entertainment & Music",
      achievements: [
        "NFT Platform & Smart contract Development",
        "Built-Operate-Tranfer Model for remote development team (20+), during pandemic",
      ],
      thumbnailId: "op3n"
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
      role: "Founder",
      icon: "🤖",
      description: "Positioning as a one-stop technology partner and CTO-as-a-Service, Alpha Bits specialises in AI Workflow Automation and Digital Transformation for SMBs.",
      achievements: [
        "AI Workflow Automation",
        "Data Platform / BI Dashboards",
        "IoT Solutions for Smart Farms & Factories",
        "NodeRED Training Courses",
      ],
      thumbnailId: "alphabits",
      link: "https://alphabits.team/" // Updated link
    },
    {
      year: "2025–Now",
      title: "Alpha Block",
      role: "Founder",
      icon: "🌱",
      description: "Alpha Block is an AIoT EdTech company building modular smart farming kits that make growing food fun, educational, and accessible for all ages. Combining sensors, cameras, automation, and AI-powered insights, Alpha Block turns indoor farming into an interactive learning experience — ideal for homes, schools, and innovation labs. Currently looking for funding.",
      achievements: [
        "Developed modular smart farming kits for education and home use",
        "Integrated sensors, cameras, and automation for interactive learning",
        "Promoting accessible and fun food growing experiences"
      ],
      thumbnailId: "alphablock",
      link: "https://www.thealphablock.com" // Updated link
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

  return (
    <section id="timeline" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Career <span className="text-highlight">in Tech</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 text-center max-w-3xl mx-auto">
          Two decades of building, leading, and transforming tech companies
        </p>
        <div ref={sectionRef} className="max-w-4xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              {timelineData.map((item, index) => (
                <TimelineItemCard key={index} item={item} index={index} isDesktop={true} />
              ))}
            </div>
          </div>
          {/* Mobile Timeline */}
          <div className="lg:hidden">
            <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
              {timelineData.map((item, index) => (
                <TimelineItemCard key={index} item={item} index={index} isDesktop={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
