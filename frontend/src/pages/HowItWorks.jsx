import React from 'react';
import MainLayout from '../components/MainLayout';
import { ArrowRight } from 'lucide-react';

const StepCard = ({ number, title, description }) => (
  <div className="bg-white/80 backdrop-blur-lg border border-gray-200/80 rounded-3xl shadow-lg p-6 text-center">
    <div className="text-sm font-semibold text-neutral-500 mb-2">0{number}</div>
    <h3 className="text-2xl font-bold text-neutral-800 mb-3">{title}</h3>
    <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const HowItWorks = () => {
  const steps = [
    { number: 1, title: "Ingest", description: "Finetuned Gemma 4 model via Pioneer to extract semantic meaning from academic paper." },
    { number: 2, title: "Distill", description: "Google AI Studio distills innovation into core business problem statements." },
    { number: 3, title: "Analyze", description: "Tavily agent crawls the web for an 11-point market intelligence matrix." },
    { number: 4, title: "Finetune", description: "Finetuned GLiNER2-base-v1 model to identify potential bottlenecks." },
    { number: 5, title: "Verdict", description: "Venture consulting agent calculates a final threshold score." }
  ];

  return (
    <MainLayout>
      <div className="text-neutral-800 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Agentic Linear <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Pipeline.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mt-6 mb-12">
          Our platform utilizes a highly structured, five-step AI-driven process known as the "Agentic Linear Pipeline" to evaluate the commercial viability of your academic papers.
        </p>
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <StepCard {...step} />
              {index < steps.length - 1 && <ArrowRight className="w-8 h-8 text-neutral-400" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HowItWorks;
