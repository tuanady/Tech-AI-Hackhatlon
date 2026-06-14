import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/50 bg-white/20 backdrop-blur-md mt-24 relative z-10">
      <div className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-10 text-xs">
          <div>
            <h4 className="font-bold uppercase tracking-wider text-neutral-400 mb-3.5">Explore</h4>
            <ul className="space-y-2 text-neutral-500 font-light">
              <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-neutral-400 mb-3.5">Learn More</h4>
            <ul className="space-y-2 text-neutral-500 font-light">
              <li><Link to="/features" className="hover:text-indigo-600 transition-colors">Features</Link></li>
              <li><Link to="/technologies-used" className="hover:text-indigo-600 transition-colors">Technologies</Link></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-bold uppercase tracking-wider text-neutral-400 mb-3.5">Connect</h4>
            <ul className="space-y-2 text-neutral-500 font-light">
              <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-200/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-neutral-400 font-light tracking-wide">
            © 2026 Startarch Corporation. Sovereign digital architecture framework active.
          </p>
          <div className="flex gap-6 text-[11px] tracking-wider text-neutral-400 font-semibold font-mono">
            <a href="#" className="hover:text-indigo-600 transition-colors">TW</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">LN</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">GH</a>
          </div>
        </div>
      </div>
    </footer>
  )
}