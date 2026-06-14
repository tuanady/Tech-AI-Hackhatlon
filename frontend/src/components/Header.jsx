import React from 'react'

export default function Header() {
  return (
    <header className="bg-white/60 border-b border-neutral-200/60 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-5 max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-base font-semibold tracking-[0.3em] text-neutral-900 select-none uppercase">
            STARTARCH
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">System Ready</span>
        </div>
      </div>
    </header>
  )
}