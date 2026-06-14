import React from 'react'

export default function Header() {
  return (
    <header className="w-full bg-transparent relative z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-between">
        
        {/* Clean, High-Contrast Minimalist Brand Mark on Top Left */}
        <div className="text-sm font-bold tracking-[0.35em] text-neutral-900 select-none font-mono">
          STARTARCH
        </div>

      </div>
    </header>
  )
}