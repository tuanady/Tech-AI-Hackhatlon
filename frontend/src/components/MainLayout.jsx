import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f7f7f9] text-neutral-800 flex flex-col relative overflow-x-hidden font-sans antialiased">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#e5e5ea_1px,transparent_1px),linear-gradient(to_bottom,#e5e5ea_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none" />
      <Header />
      <main className="flex-grow relative z-10 flex items-center">
        <div className="container mx-auto px-6 py-16 max-w-5xl w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
