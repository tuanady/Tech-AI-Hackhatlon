import React, { useState } from 'react'
import { Download, RotateCcw, ChevronDown, CheckCircle2, Layers, Binary, LineChart, Award } from 'lucide-react'

export default function ResultsSection({ data, onReset }) {
  const [expandedSections, setExpandedSections] = useState({
    extraction: true,
    problems: true,
    market: true,
    verdict: true,
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn px-2">
      
      {/* Alabaster Layout Accent Success Card Banner */}
      <div className="mb-10 bg-white/70 border border-white shadow-[0_20px_48px_rgba(15,23,42,0.03)] backdrop-blur-xl p-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-wider text-neutral-800 uppercase">
                Analysis Compilation Matrix Terminal Complete
              </div>
              <p className="text-neutral-500 text-xs font-light mt-1">
                Source Document Payload: <span className="text-neutral-900 font-medium font-mono">{data?.fileName || 'payload_manifest.pdf'}</span>
              </p>
            </div>
          </div>
          <div className="sm:text-right text-[11px] tracking-wide text-neutral-400 uppercase font-mono border-t sm:border-t-0 border-neutral-100 pt-3 sm:pt-0">
            <div>Compilation Timestamp</div>
            <div className="text-neutral-700 font-sans mt-0.5 font-light">{data?.timestamp || 'Just now'}</div>
          </div>
        </div>
      </div>

      {/* Control Actions Row Elements */}
      <div className="flex flex-wrap gap-4 mb-10">
        <button onClick={onReset} className="py-3 px-6 rounded-full font-medium text-xs tracking-wider uppercase flex items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 transition-all shadow-md shadow-neutral-950/10">
          <RotateCcw className="w-3.5 h-3.5" />
          Reinitialize Pipeline
        </button>
        <button className="py-3 px-6 rounded-full font-medium text-xs tracking-wider uppercase border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 transition-all shadow-sm">
          <Download className="w-3.5 h-3.5 mr-2 inline" />
          Download Telemetry
        </button>
      </div>

      {/* Elegant Architectural Collapsible Content Stacks */}
      <div className="space-y-4">
        
        {/* Module Segment 1: Extraction Metrics */}
        <div className="border border-neutral-200/60 bg-white/40 shadow-sm backdrop-blur-xl rounded-2xl p-6">
          <button onClick={() => toggleSection('extraction')} className="w-full flex items-center justify-between text-left group">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-neutral-600 shadow-inner group-hover:bg-neutral-200/50 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest text-neutral-800 uppercase">01 // Content Extraction Manifest</h3>
                <p className="text-[11px] text-neutral-400 font-light mt-0.5 font-mono">Schema extraction integrity metrics</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${expandedSections.extraction ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.extraction && (
            <div className="mt-6 pt-6 border-t border-neutral-200/60 text-sm text-neutral-600 font-light leading-relaxed animate-fadeIn">
              Advanced model workflows parsed target document matrices to extract critical parameters, verifying methodology, figures, and technical abstract arrays.
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white border border-neutral-200/60 p-4 rounded-xl text-center shadow-sm">
                  <p className="text-2xl font-normal text-neutral-900 font-mono tracking-tight">42</p>
                  <p className="text-[9px] tracking-wider text-neutral-400 mt-1 uppercase font-medium">Pages Read</p>
                </div>
                <div className="bg-white border border-neutral-200/60 p-4 rounded-xl text-center shadow-sm">
                  <p className="text-2xl font-normal text-neutral-900 font-mono tracking-tight">8</p>
                  <p className="text-[9px] tracking-wider text-neutral-400 mt-1 uppercase font-medium">Segments</p>
                </div>
                <div className="bg-white border border-neutral-200/60 p-4 rounded-xl text-center shadow-sm">
                  <p className="text-2xl font-normal text-neutral-900 font-mono tracking-tight">156</p>
                  <p className="text-[9px] tracking-wider text-neutral-400 mt-1 uppercase font-medium">References</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Module Segment 2: Problem Matrices */}
        <div className="border border-neutral-200/60 bg-white/40 shadow-sm backdrop-blur-xl rounded-2xl p-6">
          <button onClick={() => toggleSection('problems')} className="w-full flex items-center justify-between text-left group">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-neutral-600 shadow-inner group-hover:bg-neutral-200/50 transition-colors">
                <Binary className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest text-neutral-800 uppercase">02 // Problem Vector Coordinates</h3>
                <p className="text-[11px] text-neutral-400 font-light mt-0.5 font-mono">Isolated system constraints and frictions</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${expandedSections.problems ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.problems && (
            <div className="mt-6 pt-6 border-t border-neutral-200/60 space-y-3 animate-fadeIn">
              {[
                { title: 'Data Scalability and Casings Challenge', industry: 'Enterprise Infrastructure' },
                { title: 'Privacy-First Network Architectures', industry: 'Decentralized FinTech' },
                { title: 'Real-Time Interface Inefficiencies', industry: 'Industrial Smart Edge IoT' },
              ].map((problem, idx) => (
                <div key={idx} className="bg-white border border-neutral-200/40 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wide">{problem.title}</h4>
                    <p className="text-[11px] text-neutral-500 font-light mt-1">Target Venture Matrix: <span className="text-indigo-600 font-normal">{problem.industry}</span></p>
                  </div>
                  <span className="text-[9px] tracking-widest font-mono uppercase bg-neutral-50 border border-neutral-200/60 px-2.5 py-1 rounded-md text-neutral-500 text-center sm:text-left flex-shrink-0">
                    Node Vector #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Module Segment 3: Market Telemetry */}
        <div className="border border-neutral-200/60 bg-white/40 shadow-sm backdrop-blur-xl rounded-2xl p-6">
          <button onClick={() => toggleSection('market')} className="w-full flex items-center justify-between text-left group">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-neutral-600 shadow-inner group-hover:bg-neutral-200/50 transition-colors">
                <LineChart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest text-neutral-800 uppercase">03 // Market Positioning Index</h3>
                <p className="text-[11px] text-neutral-400 font-light mt-0.5 font-mono">Macroeconomic indices & target velocity indicators</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${expandedSections.market ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.market && (
            <div className="mt-6 pt-6 border-t border-neutral-200/60 animate-fadeIn">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="bg-white border border-neutral-200/60 p-4 rounded-xl shadow-sm">
                  <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-medium">Market TAM</p>
                  <p className="text-base font-semibold text-neutral-900 mt-1 font-mono">$4.2B</p>
                </div>
                <div className="bg-white border border-neutral-200/60 p-4 rounded-xl shadow-sm">
                  <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-medium">CAGR Delta</p>
                  <p className="text-base font-semibold text-neutral-900 mt-1 font-mono">23.5%</p>
                </div>
                <div className="bg-white border border-neutral-200/60 p-4 rounded-xl shadow-sm">
                  <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-medium">Active Competitors</p>
                  <p className="text-base font-semibold text-neutral-900 mt-1 font-mono">12 Nodes</p>
                </div>
                <div className="bg-white border border-neutral-200/60 p-4 rounded-xl shadow-sm">
                  <p className="text-[10px] text-neutral-400 tracking-wider uppercase font-medium">Alpha Region</p>
                  <p className="text-base font-semibold text-neutral-900 mt-1 font-mono">APAC</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Module Segment 4: Consulting Review */}
        <div className="border border-indigo-200/80 bg-gradient-to-b from-indigo-50/10 via-white/80 to-white/80 shadow-[0_24px_50px_rgba(79,70,229,0.02)] backdrop-blur-xl rounded-2xl p-6">
          <button onClick={() => toggleSection('verdict')} className="w-full flex items-center justify-between text-left group">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner group-hover:bg-indigo-100/60 transition-colors">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest text-indigo-900 uppercase">04 // Due Diligence Review Verdict</h3>
                <p className="text-[11px] text-indigo-500/80 font-light mt-0.5 font-mono">Strategic capital scaling and action logic</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-indigo-400 transition-transform duration-300 ${expandedSections.verdict ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.verdict && (
            <div className="mt-6 pt-6 border-t border-indigo-100 animate-fadeIn">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold tracking-widest uppercase border border-emerald-200 px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-mono">
                  Ecosystem Evaluation // Acceleration Recommended
                </span>
              </div>
              <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide mb-2">Operational Action Directive: PURSUE // DEVELOP</h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-light font-sans">
                Based on comprehensive market analysis and research findings, this problem presents a significant market opportunity with strong tailwinds. The identified solution aligns well with emerging market trends and has potential for substantial ROI. Recommended to move forward with prototype development.
              </p>
              
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-neutral-100 pt-5">
                <div>
                  <p className="text-[10px] tracking-wider text-neutral-400 uppercase font-medium">Confidence Core</p>
                  <p className="text-base font-semibold text-neutral-900 font-mono mt-1">92%</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-wider text-neutral-400 uppercase font-medium">Feasibility Scale</p>
                  <p className="text-base font-semibold text-neutral-900 font-mono mt-1">88%</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-wider text-neutral-400 uppercase font-medium">Expected Alpha</p>
                  <p className="text-base font-semibold text-neutral-900 font-mono mt-1">9.5x</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}