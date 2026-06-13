import React, { useState } from 'react'
import { Download, RotateCcw, ChevronDown } from 'lucide-react'

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
    <div className="max-w-4xl mx-auto">
      {/* Alert Banner Container */}
      <div className="mb-10 border border-cyan-500/30 bg-cyan-950/5 p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              DECRYPTION_SUCCESSFUL // CORE_DUMP
            </div>
            <p className="text-gray-400 text-xs mt-2 uppercase tracking-wide">
              TARGET_FILE // <span className="text-white font-mono">{data?.fileName}</span>
            </p>
          </div>
          <div className="sm:text-right font-mono text-[10px] tracking-widest text-gray-500 uppercase">
            <div>SYSTEM_TIMESTAMP</div>
            <div className="text-gray-300 font-sans mt-1 text-xs font-medium">{data?.timestamp}</div>
          </div>
        </div>
      </div>

      {/* Operational Controls */}
      <div className="flex gap-4 mb-10">
        <button onClick={onReset} className="py-3 px-5 rounded font-bold text-xs tracking-widest uppercase flex items-center gap-2 bg-white text-black hover:bg-gray-200 transition-all">
          <RotateCcw className="w-3.5 h-3.5" />
          NEW_STREAM
        </button>
        <button className="py-3 px-5 rounded font-bold text-xs tracking-widest uppercase border border-[#232429] bg-white/5 text-white hover:bg-white/10 transition-all">
          <Download className="w-3.5 h-3.5 mr-2 inline" />
          EXPORT_REPORT
        </button>
      </div>

      {/* Collapsible Node Stack */}
      <div className="space-y-3">
        
        {/* Section 1 */}
        <div className="border border-[#1c1d21] bg-[#0d0e11]/50 rounded-xl p-5">
          <button onClick={() => toggleSection('extraction')} className="w-full flex items-center justify-between text-left">
            <div className="flex items-center gap-4">
              <div className="text-xs font-bold font-mono tracking-wider text-gray-500 bg-[#070708] border border-[#1c1d21] px-2.5 py-1 rounded">01_</div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Content Extraction Manifest</h3>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.extraction ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.extraction && (
            <div className="mt-5 pt-5 border-t border-[#1c1d21] text-xs text-gray-400 leading-relaxed font-light uppercase tracking-wide">
              Advanced AI has successfully extracted all key sections from your research paper including abstract, methodology, findings, and conclusions.
              <div className="mt-5 grid grid-cols-3 gap-4">
                <div className="bg-[#070708] border border-[#1c1d21] p-4 rounded text-center">
                  <p className="text-xl font-bold text-white font-mono">42</p>
                  <p className="text-[9px] tracking-widest text-gray-500 mt-1 uppercase">PAGES_READ</p>
                </div>
                <div className="bg-[#070708] border border-[#1c1d21] p-4 rounded text-center">
                  <p className="text-xl font-bold text-white font-mono">8</p>
                  <p className="text-[9px] tracking-widest text-gray-500 mt-1 uppercase">SEGMENTS</p>
                </div>
                <div className="bg-[#070708] border border-[#1c1d21] p-4 rounded text-center">
                  <p className="text-xl font-bold text-white font-mono">156</p>
                  <p className="text-[9px] tracking-widest text-gray-500 mt-1 uppercase">REFS_PARSED</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2 */}
        <div className="border border-[#1c1d21] bg-[#0d0e11]/50 rounded-xl p-5">
          <button onClick={() => toggleSection('problems')} className="w-full flex items-center justify-between text-left">
            <div className="flex items-center gap-4">
              <div className="text-xs font-bold font-mono tracking-wider text-gray-500 bg-[#070708] border border-[#1c1d21] px-2.5 py-1 rounded">02_</div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Problem Statements Node Matrix</h3>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.problems ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.problems && (
            <div className="mt-5 pt-5 border-t border-[#1c1d21] space-y-2">
              {[
                { title: 'Data Scalability Challenge', industry: 'Healthcare Tech' },
                { title: 'Privacy-First Architecture', industry: 'FinTech' },
                { title: 'Real-Time Processing', industry: 'IoT' },
              ].map((problem, idx) => (
                <div key={idx} className="bg-[#070708] border border-[#1c1d21] p-4 rounded flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{problem.title}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">CONTEXT_TARGET // <span className="text-cyan-400">{problem.industry}</span></p>
                  </div>
                  <span className="text-[9px] tracking-widest font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400">
                    VECTOR_#{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3 */}
        <div className="border border-[#1c1d21] bg-[#0d0e11]/50 rounded-xl p-5">
          <button onClick={() => toggleSection('market')} className="w-full flex items-center justify-between text-left">
            <div className="flex items-center gap-4">
              <div className="text-xs font-bold font-mono tracking-wider text-gray-500 bg-[#070708] border border-[#1c1d21] px-2.5 py-1 rounded">03_</div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Market Positioning Telemetry</h3>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${expandedSections.market ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.market && (
            <div className="mt-5 pt-5 border-t border-[#1c1d21]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#070708] border border-[#1c1d21] p-4 rounded">
                  <p className="text-[9px] text-gray-500 tracking-widest uppercase">MARKET_TAM</p>
                  <p className="text-sm font-bold text-white font-mono mt-1">$4.2B</p>
                </div>
                <div className="bg-[#070708] border border-[#1c1d21] p-4 rounded">
                  <p className="text-[9px] text-gray-500 tracking-widest uppercase">CAGR_INDEX</p>
                  <p className="text-sm font-bold text-white font-mono mt-1">23.5%</p>
                </div>
                <div className="bg-[#070708] border border-[#1c1d21] p-4 rounded">
                  <p className="text-[9px] text-gray-500 tracking-widest uppercase">COMPETITORS</p>
                  <p className="text-sm font-bold text-white font-mono mt-1">12_NODES</p>
                </div>
                <div className="bg-[#070708] border border-[#1c1d21] p-4 rounded">
                  <p className="text-[9px] text-gray-500 tracking-widest uppercase">ALPHA_REGION</p>
                  <p className="text-sm font-bold text-white font-mono mt-1">APAC</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 4 */}
        <div className="border border-cyan-500/30 bg-gradient-to-b from-[#0a0f14] to-[#070708] rounded-xl p-5 shadow-2xl shadow-cyan-500/[0.02]">
          <button onClick={() => toggleSection('verdict')} className="w-full flex items-center justify-between text-left">
            <div className="flex items-center gap-4">
              <div className="text-xs font-bold font-mono tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-2.5 py-1 rounded">04_</div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400">Autonomous Consulting Evaluation</h3>
            </div>
            <ChevronDown className={`w-4 h-4 text-cyan-500 transition-transform ${expandedSections.verdict ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.verdict && (
            <div className="mt-5 pt-5 border-t border-cyan-500/10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[9px] font-bold tracking-widest uppercase bg-cyan-400 text-black px-2 py-0.5 rounded font-mono">
                  ALPHA_POTENTIAL_CONFIRMED
                </span>
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Recommendation Matrix: PURSUE // DEVELOP</p>
              <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wide font-light">
                Based on comprehensive market analysis and research findings, this problem presents a significant market opportunity with strong tailwinds. The identified solution aligns well with emerging market trends and has potential for substantial ROI. Recommended to move forward with prototype development.
              </p>
              
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#1c1d21] pt-4">
                <div>
                  <p className="text-[9px] tracking-widest text-gray-500 uppercase">CONFIDENCE_CORE</p>
                  <p className="text-base font-bold text-white font-mono mt-1">92%</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-widest text-gray-500 uppercase">FEASIBILITY_SCALE</p>
                  <p className="text-base font-bold text-white font-mono mt-1">88%</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-widest text-gray-500 uppercase">EXPECTED_ALPHA</p>
                  <p className="text-base font-bold text-white font-mono mt-1">95%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}