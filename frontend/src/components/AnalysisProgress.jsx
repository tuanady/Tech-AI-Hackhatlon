import React, { useState, useEffect } from 'react'
import { Sparkles, Cpu, Layers, RefreshCw, Search, Activity } from 'lucide-react'

export default function AnalysisProgress({ fileId }) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [systemDots, setSystemDots] = useState('...')

  const ambientLogs = [
    { text: "MOUNTING CORE DATA EXTRACTOR AGENT INTERFACE...", icon: <Cpu className="w-4 h-4 text-indigo-500" /> },
    { text: "PARSING RAW CONTENT BLOCKS & SCIENTIFIC SCHEMAS...", icon: <Layers className="w-4 h-4 text-neutral-500" /> },
    { text: "DISPATCHING CO-FOUNDER SPIDER TO GOOGLE SCHOLAR...", icon: <RefreshCw className="w-4 h-4 text-purple-500" /> },
    { text: "QUERYING INFRASTRUCTURE INDEXES FOR MARKET TELEMETRY...", icon: <Search className="w-4 h-4 text-cyan-500" /> },
    { text: "DEPLOYING AUTONOMOUS STARTARCH STRATEGY CONSULTANTS...", icon: <Activity className="w-4 h-4 text-emerald-500 animate-pulse" /> }
  ]

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setSystemDots(prev => (prev.length >= 3 ? '.' : prev + '.'))
    }, 500)
    return () => clearInterval(dotInterval)
  }, [])

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setCurrentMessage(prev => (prev < ambientLogs.length - 1 ? prev + 1 : prev))
    }, 4500)
    return () => clearInterval(msgInterval)
  }, [ambientLogs.length])

  return (
    <div className="max-w-xl mx-auto min-h-[380px] flex flex-col items-center justify-center text-center px-6 animate-fadeIn relative">
      <style>{`
        @keyframes subtleScale {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.12); opacity: 0.8; }
        }
        @keyframes dynamicLinear {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
      
      <div className="relative mb-10">
        <div className="absolute -inset-4 rounded-full border border-neutral-200 bg-white/40 shadow-sm" style={{ animation: 'subtleScale 3s ease-in-out infinite' }} />
        <div className="relative w-14 h-14 rounded-full border border-neutral-200/80 bg-white flex items-center justify-center shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 animate-pulse" />
        </div>
      </div>

      <div className="w-full space-y-4 relative z-10">
        <div className="text-sm font-medium tracking-wide text-neutral-800">
          Synthesizing Venture Intelligence{systemDots}
        </div>

        <div className="bg-white/70 border border-white shadow-[0_12px_32px_rgba(0,0,0,0.03)] backdrop-blur-md rounded-2xl px-6 py-4 max-w-sm mx-auto flex items-center gap-4 transition-all duration-300">
          <div className="flex-shrink-0">{ambientLogs[currentMessage].icon}</div>
          <p className="text-xs text-neutral-600 font-light text-left tracking-wide select-none leading-relaxed">
            {ambientLogs[currentMessage].text}
          </p>
        </div>
      </div>

      <div className="w-36 h-[3px] bg-neutral-200/60 rounded-full mt-10 overflow-hidden relative">
        <div className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ animation: 'dynamicLinear 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite' }} />
      </div>
    </div>
  )
}