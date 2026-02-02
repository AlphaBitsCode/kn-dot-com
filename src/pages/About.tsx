
import React, { useEffect } from "react";

const About: React.FC = () => {
  useEffect(() => {
    document.title = "About | Kent Nguyen";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-gray-900">Kent Nguyen</h1>

        <div className="space-y-8">
          <div className="border-l-2 border-gray-300 pl-6">
            <h2 className="font-heading text-lg font-semibold text-gray-900 mb-1">Serial Tech Entrepreneur</h2>
            <p className="text-gray-600">Co-Founded 10+ tech startups in S.E.A since 2009.</p>
          </div>

          <div className="border-l-2 border-gray-300 pl-6">
            <h2 className="font-heading text-lg font-semibold text-gray-900 mb-1">Tech Advisor, Venture Partner</h2>
            <p className="text-gray-600">Viet Capital Venture, 2018-2020.</p>
          </div>

          <div className="border-l-2 border-gray-300 pl-6">
            <h2 className="font-heading text-lg font-semibold text-gray-900 mb-1">Head of Engineering, Grab Vietnam, 2017</h2>
            <p className="text-gray-600">Undisclosed Acqui-hire deal by Grab.</p>
          </div>

          <div className="border-l-2 border-gray-300 pl-6">
            <h2 className="font-heading text-lg font-semibold text-gray-900 mb-1">Technology Consultant & Solution Architect</h2>
            <p className="text-gray-600">Led several ERP teams of 7-Eleven VN, BlueBird Taxi ID, vPost SG, 2013-2016.</p>
          </div>

          <div className="border-l-2 border-gray-300 pl-6">
            <h2 className="font-heading text-lg font-semibold text-gray-900 mb-1">USPTO Patent-author, 2024</h2>
            <p className="text-gray-600">on Thermal Energy Storage Solution 12-130086-B1.</p>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-bold mt-16 mb-8 text-gray-900">What I do-ing</h2>

        <div className="space-y-6">
          <div className="border-l-2 border-gray-300 pl-6">
            <h3 className="font-heading text-base font-semibold text-gray-900 mb-1">CEO, Alpha Bits Technology</h3>
            <p className="text-gray-600 text-sm">Built ERPs Teams, Blockchain platforms, Digital Transformation projects, Data/BI dashboards...</p>
          </div>

          <div className="border-l-2 border-gray-300 pl-6">
            <p className="text-gray-600">Working on AI Edu IoT projects.</p>
          </div>

          <div className="border-l-2 border-gray-300 pl-6">
            <p className="text-gray-600">Building AI Agents and Enterprise AI workshops.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
