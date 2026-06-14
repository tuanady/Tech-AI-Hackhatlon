import React from 'react';
import MainLayout from '../components/MainLayout';

const Contact = () => {
  return (
    <MainLayout>
      <div className="text-neutral-800 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Turn Vision into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Venture.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mt-6">
          Are you ready to bypass the traditional hurdles of the technology transfer process and turn your academic breakthroughs into a thriving business? Commercialize your research at Startarch today and unlock the true potential of your intellectual property.
        </p>
        <button className="mt-8 px-8 py-4 rounded-full font-bold text-white bg-neutral-800 hover:bg-neutral-700 transition-all duration-300">
          Contact Us
        </button>
      </div>
    </MainLayout>
  );
};

export default Contact;
