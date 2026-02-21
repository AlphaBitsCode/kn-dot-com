
import React, { useEffect } from "react";

const SandBatteryIcon: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    {/* Battery outer shell */}
    <rect x="40" y="40" width="120" height="140" rx="8" fill="none" stroke="#6b7280" strokeWidth="3" />

    {/* Battery terminals */}
    <rect x="70" y="30" width="20" height="15" fill="#6b7280" />
    <rect x="110" y="30" width="20" height="15" fill="#6b7280" />

    {/* Sand representation */}
    <path d="M45 140 Q50 130 60 135 Q70 128 80 134 Q90 125 100 132 Q110 126 120 133 Q130 129 140 136 Q145 132 155 138 L155 170 Q150 165 140 168 Q130 162 120 166 Q110 160 100 164 Q90 158 80 162 Q70 156 60 160 Q50 154 45 158 Z" fill="#d4a373" opacity="0.7" />
    <path d="M45 155 Q50 148 60 152 Q70 145 80 150 Q90 142 100 148 Q110 144 120 150 Q130 146 140 152 Q145 148 155 154 L155 175 Q150 170 140 173 Q130 168 120 172 Q110 166 100 170 Q90 164 80 168 Q70 162 60 166 Q50 160 45 164 Z" fill="#c9a067" opacity="0.8" />

    {/* Heat waves */}
    <path d="M50 100 Q55 95 60 100 Q65 105 70 100" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
    <path d="M65 85 Q70 80 75 85 Q80 90 85 85" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
    <path d="M80 95 Q85 90 90 95 Q95 100 100 95" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
    <path d="M95 80 Q100 75 105 80 Q110 85 115 80" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
    <path d="M110 92 Q115 87 120 92 Q125 97 130 92" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
    <path d="M125 78 Q130 73 135 78 Q140 83 145 78" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />

    {/* Heating element coil */}
    <path d="M60 115 Q70 110 80 115 Q90 120 100 115 Q110 110 120 115 Q130 120 140 115" fill="none" stroke="#dc2626" strokeWidth="2" opacity="0.5" />
    <path d="M60 122 Q70 117 80 122 Q90 127 100 122 Q110 117 120 122 Q130 127 140 122" fill="none" stroke="#dc2626" strokeWidth="2" opacity="0.5" />
  </svg>
);

const SandBatteryPatent: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Sand Battery Patent Download | Kent Nguyen";

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

    const desc = updateMetaTag("name", "name", "description", "Download USPTO Patent No. 12,130,086 B1. This patent describes a thermal storage battery system designed to store energy as heat, particularly configured for applications such as drying agricultural and food products.");
    const keywords = updateMetaTag("name", "name", "keywords", "sand battery patent, US 12,130,086 B1, Alterno patent, Kent Nguyen inventor, thermal storage technology patent");
    const ogTitle = updateMetaTag("property", "property", "og:title", "Sand Battery Patent Download");
    const ogDesc = updateMetaTag("property", "property", "og:description", "Download USPTO Patent No. 12,130,086 B1. This patent describes a thermal storage battery system designed to store energy as heat, particularly configured for applications such as drying agricultural and food products.");
    const ogImage = updateMetaTag("property", "property", "og:image", "https://www.kentnguyen.com/images/sand_battery_uspto.jpg");
    const ogUrl = updateMetaTag("property", "property", "og:url", "https://kentnguyen.com/sand-battery-patent-download");

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
      restoreOrRemove(keywords);
      restoreOrRemove(ogTitle);
      restoreOrRemove(ogDesc);
      restoreOrRemove(ogImage);
      restoreOrRemove(ogUrl);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-gray-900">Thermal Storage Batteries and Thermal Storage Battery Systems</h1>

        {/* Understand Sand Battery teaser */}
        <div className="border-l-2 border-green-500 pl-6 mb-8">
          <a href="/sand-battery-experiment" className="flex items-center gap-6 group hover:bg-gray-100 p-4 -ml-4 rounded-lg transition-colors">
            <div className="w-20 h-20 flex-shrink-0">
              <SandBatteryIcon />
            </div>
            <div>
              <span className="font-heading text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                Understand Sand Battery
              </span>
              <span className="block mt-1 text-sm text-green-600 font-medium">Explore Interactive Experiment &rarr;</span>
            </div>
          </a>
        </div>

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
      </div>
    </div>
  );
};

export default SandBatteryPatent;
