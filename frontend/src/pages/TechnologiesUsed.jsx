import React from 'react';
import MainLayout from '../components/MainLayout';

const TechCard = ({ number, title, description, logo }) => (
  <div className="text-left">
    <div className="bg-white/80 backdrop-blur-lg border border-gray-200/80 rounded-3xl shadow-lg p-8 mb-6 flex items-center justify-center aspect-square">
      <img src={logo} alt={`${title} logo`} className="max-h-24 max-w-full" />
    </div>
    <div className="text-sm font-semibold text-neutral-500 mb-2">0{number}</div>
    <h3 className="text-3xl font-bold text-neutral-800 mb-3">{title}</h3>
    <p className="text-neutral-600 leading-relaxed">{description}</p>
  </div>
);

const TechnologiesUsed = () => {
  const technologies = [
    { number: 1, title: "Pioneer", description: "Adaptive inference infrastructure for business synthesis and automated reporting.", logo: "/pioneer-logo.png" },
    { number: 2, title: "Tavily", description: "AI-native search engine for real-time web scraping and market data retrieval.", logo: "/tavily-logo.png" },
    { number: 3, title: "Google AI", description: "Semantic processing backbone running Gemma 4 to extract innovation kernels from dense PDFs.", logo: "/google-ai-logo.png" },
    { number: 4, title: "Aikido", description: "DevSecOps platform securing code, cloud, and runtime with Autofix, SAST, SCA, and more.", logo: "/aikido-logo.png" }
  ];

  return (
    <MainLayout>
      <div className="text-neutral-800 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          The Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Stack.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mt-6 mb-12">
          The robust capabilities of our automated commercialization engine are powered by our state-of-the-art "Intelligence Stack".
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {technologies.map(tech => <TechCard key={tech.number} {...tech} />)}
        </div>
      </div>
    </MainLayout>
  );
};

export default TechnologiesUsed;
