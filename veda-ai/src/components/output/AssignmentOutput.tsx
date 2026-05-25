"use client";

import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const DifficultyLabel = ({ level }: { level: 'Easy' | 'Moderate' | 'Challenging' }) => {
  const colors = {
    'Easy': 'text-green-600',
    'Moderate': 'text-amber-500',
    'Challenging': 'text-red-500'
  };
  return <span className={`font-semibold ${colors[level]}`}>[{level}]</span>;
};

export function AssignmentOutput() {
  const paperRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPDF = async () => {
    if (!paperRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(paperRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('assignment.pdf');
    } catch (error) {
      console.error('Error generating PDF', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-[#1C1C1E] rounded-3xl shadow-xl flex flex-col w-full">
      {/* Dark AI Chat Banner */}
      <div className="text-white p-6 md:p-8 relative">
        <p className="text-sm md:text-[15px] font-medium leading-relaxed mb-6 max-w-3xl">
          Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:
        </p>
        <Button 
          variant="outline" 
          className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-5 flex items-center gap-2 border-none font-semibold w-fit"
          onClick={handleDownloadPDF}
          disabled={isExporting}
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Generating PDF...' : 'Download as PDF'}
        </Button>
      </div>

      {/* Printed Paper Card Wrapper */}
      <div className="px-2 pb-2 md:px-3 md:pb-3 w-full">
        <div 
          ref={paperRef}
          className="bg-white p-8 md:p-12 shadow-sm rounded-2xl w-full mx-auto min-h-[1100px]"
        >
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-xl md:text-2xl font-bold mb-1">Delhi Public School, Sector-4, Bokaro</h1>
              <h2 className="text-lg md:text-xl font-semibold mb-1">Subject: English</h2>
              <h3 className="text-md md:text-lg font-medium">Class: 5th</h3>
            </div>

            <div className="flex justify-between text-sm md:text-base font-medium mb-6">
              <p>Time Allowed: 45 minutes</p>
              <p>Maximum Marks: 20</p>
            </div>

            <p className="text-sm md:text-base italic mb-6">All questions are compulsory unless stated otherwise.</p>

            <div className="space-y-2 mb-8 text-sm md:text-base">
              <p>Name: ______________________</p>
              <p>Roll Number: ______________________</p>
              <p>Class: 5th Section: ______________________</p>
            </div>

            <div className="text-center mb-6">
              <h4 className="text-lg font-bold">Section A</h4>
            </div>

            <div className="mb-6">
              <h5 className="font-bold text-base md:text-lg mb-1">Short Answer Questions</h5>
              <p className="text-sm italic text-gray-600 mb-6">Attempt all questions. Each question carries 2 marks</p>

              <ol className="list-decimal pl-5 space-y-4 text-sm md:text-base leading-relaxed">
                <li><DifficultyLabel level="Easy" /> Define electroplating. Explain its purpose. [2 Marks]</li>
                <li><DifficultyLabel level="Moderate" /> What is the role of a conductor in the process of electrolysis? [2 Marks]</li>
                <li><DifficultyLabel level="Easy" /> Why does a solution of copper sulfate conduct electricity? [2 Marks]</li>
                <li><DifficultyLabel level="Moderate" /> Describe one example of the chemical effect of electric current in daily life. [2 Marks]</li>
                <li><DifficultyLabel level="Moderate" /> Explain why electric current is said to have chemical effects. [2 Marks]</li>
                <li><DifficultyLabel level="Challenging" /> How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved. [2 Marks]</li>
                <li><DifficultyLabel level="Challenging" /> What happens at the cathode and anode during the electrolysis of water? Name the gases evolved. [2 Marks]</li>
                <li><DifficultyLabel level="Easy" /> Mention the type of current used in electroplating and justify why it is used. [2 Marks]</li>
                <li><DifficultyLabel level="Moderate" /> What is the importance of electric current in the field of metallurgy? [2 Marks]</li>
                <li><DifficultyLabel level="Challenging" /> Explain with a chemical equation how copper is deposited during the electroplating of an object. [2 Marks]</li>
              </ol>
            </div>
            
            <div className="mb-8">
              <p className="font-bold underline">End of Question Paper</p>
            </div>
            
            <hr className="my-8 border-gray-300" />
            
            <div>
              <h4 className="text-lg font-bold mb-4">Answer Key:</h4>
              <ol className="list-decimal pl-5 space-y-3 text-sm md:text-base text-gray-700 leading-relaxed">
                <li>Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. Its purpose is to prevent corrosion, improve appearance, or increase thickness.</li>
                <li>A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.</li>
                <li>Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.</li>
                <li>An example is the electroplating of silver on jewelry to prevent tarnishing.</li>
                <li>Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.</li>
                <li>Sodium hydroxide is formed at the cathode during brine electrolysis as water gains electrons:<br/>2H2O + 2e- → H2 + 2OH-<br/>Na+ + OH- → NaOH (in solution)</li>
                <li>At the cathode: water is reduced to hydrogen gas and hydroxide ions.<br/>At the anode: water is oxidized to oxygen gas and hydrogen ions.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
