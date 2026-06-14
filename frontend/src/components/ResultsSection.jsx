import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { 
  RotateCcw, Download, Compass, ShieldCheck, Users, 
  BarChart3, ArrowUpRight, Briefcase, Landmark, 
  FileCheck, Shield, HelpCircle, Activity, Sparkles, Award, Binary, ArrowRight, Clock, Target, Rocket, Milestone, AlertTriangle
} from 'lucide-react'

export default function ResultsSection({ data, onReset }) {
  const problemsList = data?.problems || []
  const [activeProblemIdx, setActiveProblemIdx] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    if (activeProblemIdx >= problemsList.length && problemsList.length > 0) {
      setActiveProblemIdx(0)
    }
  }, [problemsList, activeProblemIdx])

  const activeProblem = problemsList[activeProblemIdx] || null

  const ensureString = (val) => {
    if (!val) return ""
    if (typeof val === 'string') return val
    if (Array.isArray(val)) return val.join('\n\n')
    try {
      return JSON.stringify(val, null, 2)
    } catch {
      return String(val)
    }
  }

  const getDynamicSidebarData = (index, problemTitle) => {
  const cleanTitle = problemTitle ? problemTitle.toUpperCase() : "VECTOR_NODE"
  
  const contentMatrix = [
    {
      // Tab 1 Data Structure Matrix
      timeline: [
        { phase: "Days 01 - 30", title: "Asset Seeding & IP Sealing", desc: "Freeze core research source matrices and file dynamic utility patent protection wrappers immediately." },
        { phase: "Days 31 - 60", title: "Alpha Sandbox Deployment", desc: "Deploy minimum transactional container sandboxes to isolate targeted operational workflows cleanly." },
        { phase: "Days 61 - 90", title: "Pilot Launch Triggers", desc: "Onboard 3-5 cornerstone design clients, trigger pricing models, and structure operational data charts." }
      ],
      milestones: [
        { status: "✓", title: "Milestone 1 // Technology Lock", desc: "Converting document payload records into clean product matrices.", iconStyle: "bg-neutral-50 text-neutral-400" },
        { status: "→", title: "Milestone 2 // Compliance Pre-Check", desc: "Opening validation dialog queues with regional industry controllers.", iconStyle: "bg-indigo-50 text-indigo-600 font-bold animate-pulse" },
        { status: "-", title: "Milestone 3 // Contract Lock", desc: "Signing pilot intent agreements across verified distribution targets.", iconStyle: "bg-neutral-50 text-neutral-300" }
      ],
      hires: [
        { role: "1x Principal AI/System Architect", tag: "H1 Lock", tagStyle: "bg-indigo-50 text-indigo-600" },
        { role: "1x Regulatory & Quality Assurance Lead", tag: "H1 Lock", tagStyle: "bg-purple-50 text-purple-600" },
        { role: "1x Full-Stack Product Deployer", tag: "H2 Pipeline", tagStyle: "bg-neutral-100 text-neutral-500" }
      ]
    },
    {
      // Tab 2 Data Structure Matrix
      timeline: [
        { phase: "Days 01 - 30", title: "Material / Protocol Validation", desc: "Run secondary safety simulations using verified baseline parameters derived from the payload data." },
        { phase: "Days 31 - 60", title: "Hardware-in-the-Loop Emulation", desc: "Build out functional emulation modeling layers to stress test capacity constraints under simulated loads." },
        { phase: "Days 61 - 90", title: "Enterprise Field Integration", desc: "Ship initial customized prototype blocks to strategic anchor partners for isolated, closed-loop testing." }
      ],
      milestones: [
        { status: "✓", title: "Milestone 1 // Simulation Approval", desc: "Passing cross-validation baseline metrics across all simulated edge cases.", iconStyle: "bg-neutral-50 text-neutral-400" },
        { status: "→", title: "Milestone 2 // Lab Demo Clearance", desc: "Securing internal safety clear sign-offs on physical component interaction loops.", iconStyle: "bg-indigo-50 text-indigo-600 font-bold animate-pulse" },
        { status: "-", title: "Milestone 3 // Pilot Token Allocation", desc: "Allocating strategic development quotas to corporate fast-track takers.", iconStyle: "bg-neutral-50 text-neutral-300" }
      ],
      hires: [
        { role: "1x Lead Deep-Tech Research Scientist", tag: "Immediate", tagStyle: "bg-emerald-50 text-emerald-600" },
        { role: "1x Embedded Firmware/HIL Engineer", tag: "H1 Lock", tagStyle: "bg-indigo-50 text-indigo-600" },
        { role: "1x Strategic Industrial Partnerships Director", tag: "H2 Pipeline", tagStyle: "bg-amber-50 text-amber-600" }
      ]
    },
    {
      // Tab 3 Data Structure Matrix
      timeline: [
        { phase: "Days 01 - 30", title: "SDK Blueprinting & Schema Lock", desc: "Synthesize extracted paper parameters into clean developer-facing schema files and SDK interfaces." },
        { phase: "Days 31 - 60", title: "Private Developer Beta Launch", desc: "Deploy private API endpoints to an invite-only cohort of 50 sector engineers to measure response latency." },
        { phase: "Days 61 - 90", title: "Venture Node Monetization", desc: "Open commercial token billing cycles, enable automated self-serve dashboards, and go live on standard registries." }
      ],
      milestones: [
        { status: "✓", title: "Milestone 1 // Protocol Integration", desc: "Mapping core academic math directly to functional programming modules.", iconStyle: "bg-neutral-50 text-neutral-400" },
        { status: "→", title: "Milestone 2 // Sandbox Stress Pass", desc: "Surviving simulated traffic surge patterns up to 10x projected launch baselines.", iconStyle: "bg-indigo-50 text-indigo-600 font-bold animate-pulse" },
        { status: "-", title: "Milestone 3 // Ecosystem Marketplace Go", desc: "Securing listings inside target cross-cloud network distribution systems.", iconStyle: "bg-neutral-50 text-neutral-300" }
      ],
      hires: [
        { role: "1x DevRel Engineering Director", tag: "H1 Lock", tagStyle: "bg-purple-50 text-purple-600" },
        { role: "1x Senior Infrastructure Security Lead", tag: "Immediate", tagStyle: "bg-rose-50 text-rose-600" },
        { role: "1x Growth / Product Marketing Manager", tag: "H2 Pipeline", tagStyle: "bg-neutral-100 text-neutral-500" }
      ]
    }
  ]

  // Safe fallback to prevent out-of-bounds index errors
  return contentMatrix[index] || contentMatrix[0]
}

const currentSidebarData = getDynamicSidebarData(activeProblemIdx, activeProblem?.title)

  // Native Client Report Generator
  const handleDownloadReport = () => {
    if (!activeProblem) return
    setIsDownloading(true)

    const timestamp = new Date().toLocaleString()
    const content = `======================================================================
STARTARCH VENTURE INTELLIGENCE BRIEFING & ACTION REPORT
======================================================================
Generated on : ${timestamp}
Source File  : ${data?.fileName || 'payload_blueprint.pdf'}
Target Node  : VECTOR_NODE_0${activeProblemIdx + 1} // ${activeProblem.title}

----------------------------------------------------------------------
1. SCORING MATRIX & VC AUDIT VERDICT
----------------------------------------------------------------------
Verdict Decision    : ${activeProblem.verdict?.recommendation || 'PURSUE // ACCELERATE'}
Market Readiness    : ${activeProblem.verdict?.scorecard?.market_readiness || 85}/100
Defensive IP Edge   : ${activeProblem.verdict?.scorecard?.competitive_advantage || 78}/100
Regulatory Track    : ${activeProblem.verdict?.scorecard?.regulatory_feasibility || 90}/100
Scale Velocity      : ${activeProblem.verdict?.scorecard?.scalability_velocity || 88}/100

Executive Summary Rationale:
${activeProblem.verdict?.summary || 'Venture validation filters approved.'}

======================================================================
END OF TELEMETRY DATA SHEET // STARTARCH COMMERCIALIZATION ENGINE
======================================================================`

    const element = document.createElement("a")
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' })
    element.href = URL.createObjectURL(file)
    element.download = `STARTARCH_Venture_Report_Node_0${activeProblemIdx + 1}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    
    setTimeout(() => setIsDownloading(false), 800)
  }

  const handleGeneratePitchDeck = async () => {
    try {
      const response = await fetch("http://localhost:5000/generate-pitchdeck");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "AI_Pitch_Deck.pptx";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  if (problemsList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 px-4 animate-fadeIn">
        <div className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-400 mx-auto mb-4 animate-spin">
          <Activity className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-medium text-neutral-800 tracking-wider uppercase">Awaiting Target Vector Mapping</h3>
      </div>
    )
  }

  return (
    <div className="max-w-[1400px] mx-auto animate-fadeIn px-4 pb-24 relative z-10">
      
      {/* Success Alert Header Banner */}
      <div className="mb-10 bg-white/70 border border-white shadow-[0_24px_50px_rgba(0,0,0,0.02)] backdrop-blur-xl p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold tracking-wider text-neutral-800 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Venture Intelligence Pipeline Concluded
          </div>
          <p className="text-neutral-500 text-xs font-light mt-1.5">
            Source Payload File: <span className="text-neutral-900 font-medium font-mono">{data?.fileName || 'payload_blueprint.pdf'}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleDownloadReport}
            disabled={isDownloading}
            className="py-2.5 px-5 rounded-full font-medium text-xs tracking-wider uppercase flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/10"
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Structuring Report...' : 'Download GTM Blueprint'}
          </button>
          <button onClick={onReset} className="py-2.5 px-5 rounded-full font-medium text-xs tracking-wider uppercase flex items-center gap-2 border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 transition-all">
            <RotateCcw className="w-3.5 h-3.5" /> Start Over
          </button>
        </div>
      </div>

      {/* 🧭 TAB NAVIGATION SELECTOR BAR */}
      <div className="mb-8 space-y-3">
        <label className="block text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase pl-1">
          Select Problem Vector Coordinate (Tabs)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {problemsList.map((prob, idx) => (
            <button
              key={idx}
              onClick={() => setActiveProblemIdx(idx)}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between min-h-[100px] ${
                activeProblemIdx === idx
                  ? 'border-neutral-900 bg-white shadow-md ring-1 ring-neutral-900'
                  : 'border-neutral-200/60 bg-white/40 hover:bg-white hover:border-neutral-400'
              }`}
            >
              <div className="text-[9px] font-bold font-mono tracking-widest text-neutral-400 uppercase">VECTOR_NODE_0{idx + 1}</div>
              <h4 className="text-xs font-semibold text-neutral-900 mt-2 line-clamp-2 uppercase tracking-wide">{prob.title}</h4>
            </button>
          ))}
        </div>
      </div>

      {activeProblem && (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Core Layout Dashboard (75% width) */}
          <div className="w-full lg:w-3/4 space-y-8">
            
            {/* Executive Sentence Focus Callout */}
            <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase font-mono mb-2 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Selected Coordinate Intent</div>
              <h3 className="text-xl font-normal tracking-tight text-neutral-900 mb-3 uppercase">{activeProblem.title}</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed italic">{activeProblem.statement}</p>
              <div className="mt-4 pt-4 border-t border-neutral-100 text-[10px] font-mono uppercase tracking-widest text-neutral-400">Vertical Ingestion Scope // <span className="text-neutral-800 font-sans font-medium">{activeProblem.industry}</span></div>
            </div>

            {/* 🚀 THE 12 CORES CONTAINER GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 prose-sm max-w-none">
              
              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <Compass className="w-4 h-4 text-indigo-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">01 // Macro Demand Need</h5>
                <div className="text-xs text-neutral-700 font-light mt-2 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4">
                  <ReactMarkdown>{ensureString(activeProblem.need_for_product_service)}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <HelpCircle className="w-4 h-4 text-purple-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">02 // Specific Friction Target</h5>
                <div className="text-xs text-neutral-700 font-light mt-2 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4">
                  <ReactMarkdown>{ensureString(activeProblem.the_need_being_solved)}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <Users className="w-4 h-4 text-blue-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">03 // Client Persona Profile</h5>
                <div className="text-xs text-neutral-700 font-light mt-2 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4">
                  <ReactMarkdown>{ensureString(activeProblem.target_customer)}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <BarChart3 className="w-4 h-4 text-emerald-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">04 // Total Addressable Market</h5>
                <div className="text-xs text-neutral-800 font-bold mt-2 font-mono"><ReactMarkdown>{ensureString(activeProblem.TAM || '$4.2B')}</ReactMarkdown></div>
                <div className="text-[11px] text-neutral-500 font-light mt-2 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4"><ReactMarkdown>{ensureString(activeProblem.market_size_and_growth)}</ReactMarkdown></div>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <ArrowUpRight className="w-4 h-4 text-cyan-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">05 // Vertical CAGR Velocity</h5>
                <div className="text-xs text-neutral-800 font-bold mt-2 font-mono"><ReactMarkdown>{ensureString(activeProblem.growth_rates || '23.5%')}</ReactMarkdown></div>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <Briefcase className="w-4 h-4 text-amber-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">06 // Core Competitor Nodes</h5>
                <ul className="text-xs text-neutral-700 font-light mt-2 space-y-1.5">
                  {Array.isArray(activeProblem.top_competitors) ? activeProblem.top_competitors.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5 truncate"><span className="w-1 h-1 bg-neutral-400 rounded-full" /> {c}</li>
                  )) : <li className="italic text-neutral-400">{activeProblem.top_competitors || 'None identified'}</li>}
                </ul>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <Landmark className="w-4 h-4 text-indigo-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">07 // Venture Capital Matching</h5>
                <ul className="text-xs text-neutral-700 font-light mt-2 space-y-1.5">
                  {Array.isArray(activeProblem.Potential_VC_investors) ? activeProblem.Potential_VC_investors.map((v, i) => (
                    <li key={i} className="flex items-center gap-1.5 truncate"><span className="w-1 h-1 bg-neutral-400 rounded-full" /> {v}</li>
                  )) : <li className="italic text-neutral-400">{activeProblem.Potential_VC_investors || 'None identified'}</li>}
                </ul>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <Activity className="w-4 h-4 text-rose-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">08 // Recent Capital Deployments</h5>
                <div className="text-xs text-neutral-700 font-light mt-2 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4">
                  <ReactMarkdown>{ensureString(activeProblem.recent_funding_activities)}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <FileCheck className="w-4 h-4 text-red-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">09 // Statutory Compliance Track</h5>
                <div className="text-xs text-neutral-700 font-light mt-2 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4">
                  <ReactMarkdown>{ensureString(activeProblem.licensing_and_regulations)}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <Shield className="w-4 h-4 text-teal-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">10 // IP Defensive Strategies</h5>
                <div className="text-xs text-neutral-700 font-light mt-2 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4">
                  <ReactMarkdown>{ensureString(activeProblem.ip_check)}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <Briefcase className="w-4 h-4 text-orange-500 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">11 // Monetization Inception</h5>
                <div className="text-xs text-neutral-700 font-light mt-2 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4">
                  <ReactMarkdown>{ensureString(activeProblem.business_model_suggestion)}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-white/60 border border-neutral-200/60 p-5 rounded-2xl shadow-sm hover:bg-white transition-all">
                <Users className="w-4 h-4 text-stone-600 mb-3" />
                <h5 className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-mono">12 // Strategic Alliance Verticals</h5>
                <ul className="text-xs text-neutral-700 font-light mt-2 space-y-1.5">
                  {Array.isArray(activeProblem.potential_partner_organizations) ? activeProblem.potential_partner_organizations.map((o, i) => (
                    <li key={i} className="flex items-center gap-1.5 truncate"><span className="w-1 h-1 bg-neutral-400 rounded-full" /> {o}</li>
                  )) : <li className="italic text-neutral-400">{activeProblem.potential_partner_organizations || 'None identified'}</li>}
                </ul>
              </div>

            </div>

            {/* Academic Co-Founders Scholar Matrix */}
            <div className="border border-neutral-200/60 bg-white/40 shadow-sm backdrop-blur-xl rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner"><Users className="w-4 h-4" /></div>
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-neutral-800 uppercase">03 // Parallel Scholar Co-Founders Matrix</h3>
                </div>
              </div>
              {data?.co_founders && data.co_founders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.co_founders.map((founder, idx) => (
                    <div key={idx} className="bg-white border border-neutral-200/60 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:border-indigo-300 transition-all">
                      <div><h4 className="text-sm font-semibold text-neutral-800">{founder.name}</h4><p className="text-xs text-neutral-500 font-light mt-1">{founder.affiliation}</p></div>
                      <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap gap-1.5">
                        {founder.interests?.map((interest, i) => <span key={i} className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">{interest}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : <div className="text-xs text-neutral-400 font-light p-2 italic">No concurrent references extracted.</div>}
            </div>

            {/* Core Pydantic Scorecard & Strategic Verdict Container */}
            <div className="border border-indigo-200/80 bg-gradient-to-b from-indigo-50/10 via-white/80 to-white/80 shadow-sm backdrop-blur-xl rounded-3xl p-6 space-y-6">
              <div className="flex items-center gap-4 border-b border-indigo-100/50 pb-4"><Award className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-indigo-900 uppercase">04 // Venture Evaluation Verdict: {activeProblem.verdict?.recommendation || 'YES'}</h3>
                </div>
              </div>
              {activeProblem.verdict?.scorecard && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(activeProblem.verdict.scorecard).map(([key, val]) => (
                    <div key={key} className="bg-white border border-neutral-200/60 p-4 rounded-xl text-center shadow-sm">
                      <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider block mb-1">{key.replace('_', ' ')}</span>
                      <span className="text-xl font-semibold text-neutral-900">{val}/100</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Executive Justification Rationale</h4>
                <div className="text-xs text-neutral-600 leading-relaxed font-light"><ReactMarkdown>{ensureString(activeProblem.verdict?.summary || "Strategic validation filters approved.")}</ReactMarkdown></div>
              </div>
            </div>

          </div>

          {/* 🚀 FIXED RIGHT COLUMN: OPERATIONAL STRATEGY SIDEBAR (25% width - Packed to scale length perfectly) */}
          <div className="w-full lg:w-1/4 space-y-4">   
            
            {/* MOCK DATA FOR NOW */}

            {/* Sidebar Card 1: Dynamic 90-Day MVP Timeline */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-neutral-800 pb-2 border-b border-neutral-100">
                <Clock className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold tracking-widest uppercase font-mono">90-Day MVP Timeline</h4>
            </div>

            <div className="space-y-4 relative pl-4 border-l border-neutral-100">
                {currentSidebarData.timeline.map((step, i) => (
                <div key={i} className="relative">
                    <div className={`absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full ${i === 0 ? 'bg-indigo-600 shadow-sm' : 'bg-neutral-300'}`} />
                    <span className="text-[9px] font-bold font-mono text-indigo-600 uppercase tracking-wider block">{step.phase}</span>
                    <span className="text-xs font-semibold text-neutral-900 block mt-0.5">{step.title}</span>
                    <p className="text-[11px] text-neutral-500 font-light mt-1 leading-normal">{step.desc}</p>
                </div>
                ))}
            </div>
            </div>

            {/* Sidebar Card 2: Dynamic GTM Milestone Checkpoints */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-neutral-800 pb-2 border-b border-neutral-100">
                <Milestone className="w-4 h-4 text-purple-600" />
                <h4 className="text-xs font-bold tracking-widest uppercase font-mono">GTM Strategic Milestones</h4>
            </div>
            <div className="space-y-3">
                {currentSidebarData.milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-2.5">
                    <div className={`w-4 h-4 rounded border border-neutral-300 mt-0.5 flex items-center justify-center text-[10px] font-bold ${m.iconStyle}`}>{m.status}</div>
                    <div>
                    <span className="text-xs font-medium text-neutral-800 block">{m.title}</span>
                    <span className="text-[11px] text-neutral-400 font-light block mt-0.5">{m.desc}</span>
                    </div>
                </div>
                ))}
            </div>
            </div>

            {/* 🆕 Sidebar Card 3: Venture Venture Vulnerability & Headwinds Shield */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-neutral-800 pb-2 border-b border-neutral-100">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold tracking-widest uppercase font-mono">Vulnerability Radar</h4>
              </div>
              <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-xl">
                <span className="text-[10px] font-bold font-mono uppercase text-amber-800 block">Incumbent Aggression</span>
                <p className="text-[11px] text-amber-700 font-light mt-1 leading-normal">Incumbents hold deep balance sheet advantages. Focus initial market positioning strictly on high-friction niche targets.</p>
              </div>
              <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-xl">
                <span className="text-[10px] font-bold font-mono uppercase text-rose-800 block">Regulatory Scaling Squeeze</span>
                <p className="text-[11px] text-rose-700 font-light mt-1 leading-normal">Fast-track compliance paths face timing friction points. Kick off pre-audit assessments in Month 1.</p>
              </div>
            </div>

            {/* Sidebar Card 4: VC Pipeline Preview */}
            <div className="bg-neutral-900 border border-neutral-950 rounded-3xl p-5 text-white space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-neutral-400 pb-2 border-b border-neutral-800">
                <Target className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold tracking-widest uppercase font-mono">Matched VC Targets</h4>
              </div>
              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                Primary matched fund layers synced dynamically to this target problem vector:
              </p>
              <div className="space-y-1.5 pt-1">
                {Array.isArray(activeProblem.Potential_VC_investors) ? activeProblem.Potential_VC_investors.slice(0, 3).map((v, i) => (
                  <div key={i} className="text-xs font-mono text-neutral-200 bg-neutral-800/60 px-3 py-2 rounded-xl border border-neutral-800/40 truncate">
                    ⚡ {v}
                  </div>
                )) : <div className="text-xs text-neutral-500 italic">Parsing fund parameters...</div>}
              </div>
            </div>

            {/* 🆕 Sidebar Card 5: Team Inception Layout */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-neutral-800 pb-2 border-b border-neutral-100">
                <Users className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold tracking-widest uppercase font-mono">Immediate Core Hires</h4>
            </div>
            <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Critical human capital allocations required to transition technical validation assets:
            </p>
            <div className="space-y-2">
                <div className="flex justify-between items-center bg-neutral-50/50 p-2.5 rounded-xl border border-neutral-100">
                <span className="text-xs font-medium text-neutral-800">1x Principal AI/System Architect</span>
                <span className="text-[10px] font-mono text-indigo-600 uppercase font-bold bg-indigo-50 px-2 py-0.5 rounded">H1 Lock</span>
                </div>
                <div className="flex justify-between items-center bg-neutral-50/50 p-2.5 rounded-xl border border-neutral-100">
                <span className="text-xs font-medium text-neutral-800">1x Regulatory & Quality Assurance Lead</span>
                <span className="text-[10px] font-mono text-purple-600 uppercase font-bold bg-purple-50 px-2 py-0.5 rounded">H1 Lock</span>
                </div>
                <div className="flex justify-between items-center bg-neutral-50/50 p-2.5 rounded-xl border border-neutral-100">
                <span className="text-xs font-medium text-neutral-800">1x Full-Stack Product Deployer</span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold bg-neutral-100 px-2 py-0.5 rounded">H2 Pipeline</span>
                </div>
            </div>
            </div>

            {/* 🆕 Sidebar Card 7: Exit Horizon Analysis */}
            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100/50 border border-neutral-200/80 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-neutral-800 pb-2 border-b border-neutral-100">
                <Rocket className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold tracking-widest uppercase font-mono">Exit Strategy Index</h4>
            </div>
            <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Target liquidity event parameters and strategic corporate acquirer verticals for this specific asset class:
            </p>
            <div className="space-y-3">
                <div>
                <span className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-wider block">Target Horizon</span>
                <span className="text-xs font-semibold text-neutral-900 mt-0.5 block">5 - 7 Year M&A Liquidity Window</span>
                </div>
                <div>
                <span className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-wider block">Primary Acquirer Profiles</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                    <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-lg bg-white border border-neutral-200 text-neutral-600">Tier-1 Tech Conglomerates</span>
                    <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-lg bg-white border border-neutral-200 text-neutral-600">Sovereign Cloud Operators</span>
                    <span className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-lg bg-white border border-neutral-200 text-neutral-600">Defense System Integrators</span>
                </div>
                </div>
            </div>
            </div>

            {/* 🆕 Sidebar Card 6: Seed Valuation & Cap Table Forecasts */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-neutral-800 pb-2 border-b border-neutral-100">
                <Landmark className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold tracking-widest uppercase font-mono">Venture Cap Engineering</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block">Target Raise</span>
                <span className="text-sm font-semibold text-neutral-900 mt-1 block font-mono">$1.5M</span>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block">Target Pool</span>
                <span className="text-sm font-semibold text-neutral-900 mt-1 block font-mono">10% ESOP</span>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block">Est. Runway</span>
                <span className="text-sm font-semibold text-neutral-900 mt-1 block font-mono">18 Mos</span>
                </div>
                <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider block">Dilution Cap</span>
                <span className="text-sm font-semibold text-neutral-900 mt-1 block font-mono">15% SAFE</span>
                </div>
            </div>
            </div>

            {/* 🆕 Sidebar Card: AI Pitch Deck Builder */}
            {/* 🆕 Sidebar Card: AI Pitch Deck Builder */}
            <div className="bg-black border border-neutral-950 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-white pb-2 border-b border-neutral-800">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <h4 className="text-xs font-bold tracking-widest uppercase font-mono">
                  AI Pitch Deck Builder
                </h4>
              </div>

              <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                Transform research papers, patents, and technical breakthroughs into
                investor-ready startup narratives and pitch decks.
              </p>

              <div className="space-y-2">
                <div className="flex justify-between items-center bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-xs font-medium text-neutral-100">
                    Auto-Generate Investor Deck
                  </span>
                  <span className="text-[10px] font-mono text-violet-400 uppercase font-bold bg-violet-950/50 px-2 py-0.5 rounded">
                    AI CORE
                  </span>
                </div>

                <div className="flex justify-between items-center bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-xs font-medium text-neutral-100">
                    Research → Startup Mapping
                  </span>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold bg-indigo-950/50 px-2 py-0.5 rounded">
                    VENTURE
                  </span>
                </div>

                <div className="flex justify-between items-center bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-xs font-medium text-neutral-100">
                    Market & TAM Analysis
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold bg-emerald-950/50 px-2 py-0.5 rounded">
                    INSIGHTS
                  </span>
                </div>
              </div>

              <button
                onClick={handleGeneratePitchDeck}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold hover:opacity-90 transition"
              >
                Generate Pitch Deck →
              </button>
            </div>

          </div>

        </div>
      )}
    </div>
  )
}