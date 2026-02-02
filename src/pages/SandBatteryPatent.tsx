
import React, { useEffect } from "react";

const SandBatteryPatent: React.FC = () => {
  useEffect(() => {
    document.title = "Sand Battery Patent Download | Kent Nguyen";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-gray-900">Thermal Storage Batteries and Thermal Storage Battery Systems</h1>

        <div className="border-l-2 border-gray-300 pl-6 mb-8">
          <h2 className="font-heading text-lg font-semibold text-gray-900 mb-1">
            US Patent No. <a href="/USPTO.12-130086-B1.pdf" download className="underline hover:text-gray-700 transition-colors">12,130,086 B1</a>
          </h2>
          <p className="text-gray-600">October 29, 2024</p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="border-l-2 border-gray-300 pl-6">
            <p className="text-gray-600">This patent document describes a thermal storage battery system designed to store energy as heat. The system is particularly configured for applications such as drying agricultural and food products. It provides a way to convert electrical energy from various sources, including solar, wind, and the grid, into thermal energy for storage.</p>
          </div>

          <div className="border-l-2 border-gray-300 pl-6">
            <p className="text-gray-600">The thermal storage battery system detailed in the patent includes essential components such as a battery core shell (often made of stainless steel), a thermal storage material mixture primarily composed of sand and graphite, heating elements to generate heat, and a heat extraction pipe to retrieve the stored thermal energy. Various thermal insulation layers are used to enclose the core and retain heat efficiently.</p>
          </div>

          <div className="border-l-2 border-gray-300 pl-6">
            <p className="text-gray-600">This technology is described as offering several advantages over conventional energy storage methods, including sustained, long-term energy storage and reduced environmental impact. The system can store heat at high temperatures, potentially up to 800°C, making it suitable for diverse industrial, commercial, agricultural, and household uses beyond just drying, such as general process heat, space heating, and water heating. Its use of abundant, low-cost materials like sand is also highlighted.</p>
          </div>
        </div>

        <div className="border-l-2 border-gray-300 pl-6 mb-12">
          <h3 className="font-heading text-lg font-semibold text-gray-900 mb-3">Key details about the patent:</h3>
          <ul className="text-gray-600 space-y-2">
            <li><strong>Patent Number:</strong> US 12,130,086 B1</li>
            <li><strong>Issue Date:</strong> October 29, 2024</li>
            <li><strong>Assignee:</strong> Alterno Pte. Ltd., Singapore</li>
            <li><strong>Inventors:</strong> Nguyen et al.</li>
          </ul>
        </div>

        <div className="border-l-2 border-gray-300 pl-6 mb-8">
          <a
            href="/USPTO.12-130086-B1.pdf"
            download
            className="inline-block font-heading text-base font-semibold text-gray-900 underline hover:text-gray-700 transition-colors"
          >
            Download Full Document (PDF)
          </a>
        </div>

        <hr className="my-12 border-gray-300" />

        <h2 className="font-heading text-2xl font-bold mb-8 text-gray-900">Sand Battery Saga - Stories by Kent Nguyen</h2>

        <a
          href="https://blog.kentnguyen.com/tag/sandbattery/?utm_source=web&utm_campaign=uspto&utm_medium=7104"
          target="_blank"
          rel="noopener noreferrer"
          className="block border-l-2 border-gray-300 pl-6 hover:border-gray-400 transition-colors"
        >
          <img src="/images/sand_battery_uspto.jpg" alt="Sand Battery" className="mb-4 rounded" />
          <span className="text-gray-600 underline">Read full story</span>
        </a>
      </div>
    </div>
  );
};

export default SandBatteryPatent;
