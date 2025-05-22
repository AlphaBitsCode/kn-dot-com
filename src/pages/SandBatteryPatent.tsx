
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SandBatteryPatent: React.FC = () => {
  useEffect(() => {
    document.title = "Sand Battery Patent Download | Kent Nguyen";
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="text-gray-600 dark:text-gray-400 hover:text-highlight flex items-center mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to homepage
        </Link>
      </div>
      
      <div className="container mx-auto px-4 flex-grow flex flex-col items-center justify-center py-12">
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Thermal Storage Batteries and Thermal Storage Battery Systems
          </h1>
          
          <h2 className="text-xl text-highlight font-medium mb-6">
            US Patent No. 12,130,086 B1
          </h2>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              This patent document describes a thermal storage battery system designed to store energy as heat. 
              The system is particularly configured for applications such as drying agricultural and food products. 
              It provides a way to convert electrical energy from various sources, including solar, wind, and the grid, 
              into thermal energy for storage.
            </p>
            
            <h3 className="text-lg font-medium mt-6 mb-2">Key details about the patent:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Patent Number:</strong> US 12,130,086 B1</li>
              <li><strong>Issue Date:</strong> October 29, 2024</li>
              <li><strong>Assignee:</strong> Alterno Pte. Ltd., Singapore</li>
              <li><strong>Inventors:</strong> Nam Quoc Nguyen et al.</li>
            </ul>
            
            <p className="mb-4">
              The thermal storage battery system detailed in the patent includes essential components such as 
              a battery core shell (often made of stainless steel), a thermal storage material mixture primarily 
              composed of sand and graphite, heating elements to generate heat, and a heat extraction pipe to 
              retrieve the stored thermal energy. Various thermal insulation layers are used to enclose the core 
              and retain heat efficiently.
            </p>
            
            <p className="mb-6">
              This technology is described as offering several advantages over conventional energy storage methods, 
              including sustained, long-term energy storage and reduced environmental impact. The system can store 
              heat at high temperatures, potentially up to 800°C, making it suitable for diverse industrial, 
              commercial, agricultural, and household uses beyond just drying, such as general process heat, 
              space heating, and water heating. Its use of abundant, low-cost materials like sand is also highlighted.
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              className="bg-highlight hover:bg-highlight/90 text-white"
            >
              <a 
                href="/USPTO.12-130086-B1.pdf" 
                download 
                className="flex items-center"
              >
                <FileDown className="mr-2 h-5 w-5" /> 
                Download Patent PDF
              </a>
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
            For comprehensive information on the design, components, operation, and various 
            potential applications described, please access the full patent document.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SandBatteryPatent;
