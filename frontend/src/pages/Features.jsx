import React from 'react';
import MainLayout from '../components/MainLayout';
import { FileText, Users, Code, BarChart, TrendingUp, ArrowRight } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/80 backdrop-blur-lg border border-gray-200/80 rounded-3xl shadow-lg p-8 text-left">
    <div className="flex items-center text-purple-600 mb-4">
      {icon}
      <h3 className="text-2xl font-bold text-neutral-800 ml-3">{title}</h3>
    </div>
    <p className="text-neutral-600 leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    { icon: <FileText />, title: "Market Report", description: "Comprehensive TAM/SAM/SOM sizing matrix and localized regulatory roadmaps." },
    { icon: <Users />, title: "Co-Founder", description: "Semantic matching engine mapping cross-disciplinary researchers in parallel technical fields." },
    { icon: <Code />, title: "MVP Blueprint", description: "Full technical software/hardware build specifications and 90-day execution milestones." },
    { icon: <BarChart />, title: "Investor Deck", description: "Automated generation of the core fundraising narrative optimized for seed-stage rounds." },
    { icon: <TrendingUp />, title: "VC Pipeline", description: "Dynamically generated list of active VC funds investing in this specific vertical." },
    { icon: <ArrowRight />, title: "Next Steps", description: "Immediate go-to-market strategy, execution checklist, and university licensing instructions." }
  ];

  return (
    <MainLayout>
      <div className="text-neutral-800 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          The YES <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Verdict.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mt-6 mb-12">
          If your research successfully meets the viability threshold and receives the "YES Verdict," Startarch instantly generates a comprehensive "Founder's Toolkit" designed to accelerate your new venture.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
        </div>
      </div>
    </MainLayout>
  );
};

export default Features;
