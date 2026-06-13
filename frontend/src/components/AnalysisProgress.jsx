import React, { useState, useEffect } from 'react'
import { Cpu, Search, Layers, RefreshCw, Activity } from 'lucide-react'

export default function AnalysisProgress({ fileId }) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [systemDots, setSystemDots] = useState('>>>')

  const ambientLogs = [
    { text: "MOUNTING CORE ENGINE EXTRACTOR INTERFACE", icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { text: "PARSING RAW CONTENT BLOCKS & METHODS SCHEMAS", icon: <Layers className="w-4 h-4 text-gray-400" /> },
    { text: "CROSS-COMPILING MULTI-AGENT PROBLEM TARGET ARRAYS", icon: <RefreshCw className="w-4 h-4 text-amber-500" /> },
    { text: "QUERYING TAVILY ENGINES FOR GLOBAL MARKET TELEMETRY", icon: <Search className="w-4 h-4 text-emerald-400" /> },
    { text: "EXECUTING AI-CONSULTANT DUE-DILIGENCE DEPLOYMENTS", icon: <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" /> }
  ]

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setSystemDots(prev => (prev.length >= 6 ? '>>>' : prev + '>'))
    }, 400)
    return () => clearInterval(dotInterval)
  }, [])

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setCurrentMessage(prev => (prev < ambientLogs.length - 1 ? prev + 1 : prev))
    }, 4500)
    return () => clearInterval(msgInterval)
  }, [ambientLogs.length])

  return (
    <div className="max-w-xl mx-auto min-h-[400px] flex flex-col items-center justify-center text-center px-6">
      
      <style>{`
        @keyframes radarPulse {
          0% { transform: scale(0.95); opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes tacticalScan {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
      
      {/* Tactical Center-Ring Radar Loop */}
      <div className="relative mb-12">
        <div className="absolute inset-0 rounded-full border border-cyan-500" style={{ animation: 'radarPulse 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite' }} />
        <div className="absolute inset-0 rounded-full border border-cyan-400/40" style={{ animation: 'radarPulse 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite', animationDelay: '0.6s' }} />
        <div className="relative w-16 h-16 rounded border border-cyan-500/30 bg-[#0d0e11] flex items-center justify-center shadow-2xl">
          <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* Dynamic Console Feed */}
      <div className="w-full space-y-4">
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-white flex items-center justify-center gap-2">
          <span>PROCESSING_PIPELINE_FLOW</span>
          <span className="text-cyan-400 font-mono">{systemDots}</span>
        </div>

        {/* Console Print Out Box */}
        <div className="bg-[#0d0e11] border border-[#1c1d21] rounded-lg px-4 py-3.5 max-w-md mx-auto flex items-center gap-3 shadow-inner">
          <div className="flex-shrink-0 animate-spin [animation-duration:6s]">
            {ambientLogs[currentMessage].icon}
          </div>
          <p className="text-[10px] font-mono tracking-widest text-gray-300 text-left uppercase truncate select-none">
            {ambientLogs[currentMessage].text}
          </p>
        </div>
      </div>

      {/* Line Indicator Element */}
      <div className="w-40 h-[1px] bg-gray-800 rounded-full mt-10 overflow-hidden relative">
        <div 
          className="absolute top-0 bottom-0 w-12 bg-cyan-400" 
          style={{ animation: 'tacticalScan 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }} 
        />
      </div>

      <p className="text-[9px] tracking-widest text-gray-600 font-mono uppercase mt-4">
        LOG_STREAM_CONNECTED // THREAD_01
      </p>
    </div>
  )
}