import React from 'react';
import MainLayout from '../components/MainLayout';

const StatCard = ({ value, label, description }) => (
  <div className="bg-white/80 backdrop-blur-lg border border-gray-200/80 rounded-3xl shadow-lg p-8 text-left">
    <div className="text-6xl font-bold text-neutral-800">{value}</div>
    <div className="text-sm font-semibold text-neutral-500 mt-2 uppercase tracking-widest">{label}</div>
    <p className="text-neutral-600 mt-4">{description}</p>
  </div>
);

const About = () => {
  return (
    <MainLayout>
      <div className="text-neutral-800 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          The "Death Valley"
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"> of Research.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mt-6 mb-12">
          At Startarch, our mission is to bridge the "Death Valley" of research by solving the massive inefficiencies inherent in academic commercialization. Currently, a staggering 90% of academic research stalls in the lab, failing to reach the market where it could make a real-world impact. This friction is largely driven by the traditional Technology Transfer Office (TTO) process, which averages a cycle time of over eighteen months. As a result of these systemic bottlenecks, more than $3T+ in unrealized intellectual property commercialization is left behind and lost. We are here to change that narrative, scale your efforts, and unlock the true value of your academic innovation.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StatCard value="90%" label="Scale" description="of academic research stalls in the lab" />
          <StatCard value="18+" label="Friction" description="months average TTO cycle time" />
          <StatCard value="$3T+" label="Lost Value" description="unrealized IP commercialization" />
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
