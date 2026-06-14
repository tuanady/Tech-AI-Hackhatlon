import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full bg-transparent relative z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-between">
        
        {/* Clean, High-Contrast Minimalist Brand Mark on Top Left */}
        <div className="text-sm font-bold tracking-[0.35em] text-neutral-900 select-none font-mono">
          <Link to="/">STARTARCH</Link>
        </div>

        <nav>
          <ul className="flex items-center gap-8 text-sm">
            <li><Link to="/about" className="hover:text-neutral-600">About Us</Link></li>
            <li><Link to="/how-it-works" className="hover:text-neutral-600">How It Works</Link></li>
            <li><Link to="/features" className="hover:text-neutral-600">Features</Link></li>
            <li><Link to="/technologies-used" className="hover:text-neutral-600">Technologies</Link></li>
            <li><Link to="/contact" className="hover:text-neutral-600">Contact Us</Link></li>
          </ul>
        </nav>

      </div>
    </header>
  )
}