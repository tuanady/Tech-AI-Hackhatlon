import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader, FileText, Users, BrainCircuit, Briefcase, Award, GitCommit, Database, Search } from 'lucide-react';

const analysisSteps = [
  { text: "Extracting core content from research paper...", duration: 8000, icon: <FileText className="w-5 h-5 text-blue-500" /> },
  { text: "Parsing scientific schemas and data tables...", duration: 7000, icon: <Database className="w-5 h-5 text-blue-500" /> },
  { text: "Initializing Smart Co-Founder Matcher...", duration: 6000, icon: <Users className="w-5 h-5 text-purple-500" /> },
  { text: "Executing academic query for potential co-founders...", duration: 9000, icon: <Search className="w-5 h-5 text-purple-500" /> },
  { text: "Generating core problem statement blueprints...", duration: 10000, icon: <BrainCircuit className="w-5 h-5 text-indigo-500" /> },
  { text: "Spawning concurrent worker threads...", duration: 6000, icon: <GitCommit className="w-5 h-5 text-gray-500" /> },
  { text: "Querying market data sources for each problem vector...", duration: 12000, icon: <Briefcase className="w-5 h-5 text-orange-500" /> },
  { text: "Gemini is mapping web data to dashboard architecture...", duration: 10000, icon: <Loader className="w-5 h-5 text-orange-500 animate-spin" /> },
  { text: "Consulting Agent is running venture due diligence...", duration: 10000, icon: <Award className="w-5 h-5 text-teal-500" /> },
  { text: "Resolving and stacking analysis vectors...", duration: 6000, icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
  { text: "Compiling final blueprint matrix...", duration: 6000, icon: <CheckCircle className="w-5 h-5 text-green-500" /> }
];

export default function AnalysisProgress({ fileId }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < analysisSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, analysisSteps[currentStep].duration);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const step = analysisSteps[currentStep];

  return (
    <div className="max-w-2xl mx-auto min-h-[420px] flex flex-col items-center justify-center text-center px-4">
      <div className="w-full bg-white/80 backdrop-blur-lg border border-gray-200/80 rounded-3xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">Analyzing Your Document</h2>
        <p className="text-gray-500 mb-8">Our AI agents are hard at work. Here's what's happening:</p>
        
        <div className="h-32 flex flex-col justify-center items-center w-full">
          <div 
            key={currentStep} 
            className="flex flex-col items-center animate-fadeIn w-full"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              {step.icon}
            </div>
            <span className="font-medium text-gray-700 text-lg text-center px-4">
              {step.text}
            </span>
          </div>
        </div>

        {/* Overall Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-8">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${((currentStep + 1) / analysisSteps.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">{`Step ${currentStep + 1} of ${analysisSteps.length}`}</p>
      </div>
    </div>
  );
}