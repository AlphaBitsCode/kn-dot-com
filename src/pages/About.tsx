
import React, { useEffect } from "react";
import Footer from "@/components/Footer";

const About: React.FC = () => {
  useEffect(() => {
    document.title = "About | Kent Nguyen";

    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = "Kent Nguyen: Serial Tech Entrepreneur, Tech Advisor, and Solution Architect. Co-founder of Alpha Bits and Inventor of the Alterno Sand Battery.";
    document.head.appendChild(metaDesc);

    const ogTitle = document.createElement("meta");
    ogTitle.setAttribute("property", "og:title");
    ogTitle.content = "About | Kent Nguyen";
    document.head.appendChild(ogTitle);

    return () => {
      document.head.removeChild(metaDesc);
      document.head.removeChild(ogTitle);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 dark:text-white">
            Kent Nguyen
          </h1>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Serial Tech Entrepreneur
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Co-Founded 10+ tech startups in S.E.A since 2009.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Tech Advisor, Venture Partner
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Viet Capital Venture, 2018-2020.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Head of Engineering, Grab Vietnam, 2017
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Undisclosed Acqui-hire deal by Grab.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Technology Consultant & Solution Architect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Led several ERP teams of 7-Eleven VN, BlueBird Taxi ID, vPost SG, 2013-2016.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              USPTO Patent-author, 2024
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              on Thermal Energy Storage Solution{" "}
              <a
                href="/sand-battery-patent-download"
                className="text-highlight hover:underline"
              >
                12-130086-B1
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              What I do-ing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              CEO,{" "}
              <a
                href="https://alphabits.team/?utm_source=kentnguyen&utm_medium=website&utm_content=about_page&utm_campaign=personal_portfolio"
                className="text-highlight hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alpha Bits Technology
              </a>
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              Built ERPs Teams, Blockchain platforms, Digital Transformation projects, Data/BI dashboards...
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              Working on AI Edu IoT projects.
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Building AI Agents and Enterprise AI workshops.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
