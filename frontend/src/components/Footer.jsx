import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1d21] bg-[#070708] mt-24 relative z-10 font-mono">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-6 mb-10 text-[11px]">
          <div>
            <h4 className="font-bold uppercase tracking-widest text-gray-400 mb-3">PRODUCT_STREAMS</h4>
            <ul className="space-y-1.5 text-gray-600 uppercase tracking-wide font-light">
              <li><a href="#" className="hover:text-cyan-400 transition">Telemetry</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-gray-400 mb-3">SYSTEM_NODES</h4>
            <ul className="space-y-1.5 text-gray-600 uppercase tracking-wide font-light">
              <li><a href="#" className="hover:text-cyan-400 transition">About_OS</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Contact_Vector</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-gray-400 mb-3">COMPLIANCE</h4>
            <ul className="space-y-1.5 text-gray-600 uppercase tracking-wide font-light">
              <li><a href="#" className="hover:text-cyan-400 transition">Encryption</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#1c1d21] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            © 2024 VentureForge. Architecture array initialized.
          </p>
          <div className="flex gap-6 text-[10px] tracking-widest text-gray-500 uppercase font-bold">
            <a href="#" className="hover:text-cyan-400 transition">TW</a>
            <a href="#" className="hover:text-cyan-400 transition">LN</a>
            <a href="#" className="hover:text-cyan-400 transition">GH</a>
          </div>
        </div>
      </div>
    </footer>
  )
}