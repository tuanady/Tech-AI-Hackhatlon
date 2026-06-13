import React from 'react'
import { Terminal } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-[#070708]/80 border-b border-[#1c1d21] backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded border border-[#2b2d35] flex items-center justify-center bg-[#0d0e11]">
            <Terminal className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-[0.3em] uppercase text-white">
              Startarch 
            </div>
            <p className="text-[10px] tracking-wider text-gray-500 uppercase mt-0.5 font-sans">Automated Research Decryption Platform</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 border border-[#1c1d21] bg-[#0d0e11] px-3 py-1.5 rounded text-[10px] tracking-widest text-gray-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            SYS_STATUS // NOMINAL
          </div>
        </div>
      </div>
    </header>
  )
}