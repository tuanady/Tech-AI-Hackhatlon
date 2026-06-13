import React, { useState } from 'react'
import Header from './components/Header'
import UploadSection from './components/UploadSection'
import ResultsSection from './components/ResultsSection'
import AnalysisProgress from './components/AnalysisProgress'
import Footer from './components/Footer'

function App() {
  const [analysisState, setAnalysisState] = useState({
    status: 'idle', // idle, loading, completed, error
    data: null,
    error: null,
    fileId: null
  })

  const handleAnalysisStart = (fileId) => {
    setAnalysisState({
      status: 'loading',
      data: null,
      error: null,
      fileId
    })
  }

  const handleAnalysisComplete = (results) => {
    setAnalysisState({
      status: 'completed',
      data: results,
      error: null,
      fileId: analysisState.fileId
    })
  }

  const handleAnalysisError = (error) => {
    setAnalysisState({
      status: 'error',
      data: null,
      error,
      fileId: null
    })
  }

  const handleReset = () => {
    setAnalysisState({
      status: 'idle',
      data: null,
      error: null,
      fileId: null
    })
  }

  return (
    <div className="min-h-screen bg-[#070708] text-[#e4e4e7] flex flex-col relative overflow-x-hidden font-mono antialiased selection:bg-cyan-500/20 selection:text-cyan-400">
      
      {/* Dynamic Tactical Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#121316] via-[#070708] to-[#020203]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1f2025_1px,transparent_1px),linear-gradient(to_bottom,#1f2025_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03]" />

      <Header />
      
      <main className="flex-grow relative z-10">
        <div className="container mx-auto px-6 py-16">
          {analysisState.status === 'idle' && (
            <UploadSection 
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisError={handleAnalysisError}
            />
          )}

          {analysisState.status === 'loading' && (
            <AnalysisProgress fileId={analysisState.fileId} />
          )}

          {analysisState.status === 'completed' && (
            <ResultsSection 
              data={analysisState.data}
              onReset={handleReset}
            />
          )}

          {analysisState.status === 'error' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-[#0b0c0e] border border-red-500/30 p-8 rounded-xl shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                <div className="flex items-start gap-4">
                  <div className="text-xl text-red-500 font-bold font-sans">(!)_</div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-red-400">CRITICAL_SYSTEM_FAULT</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed bg-red-950/20 border border-red-900/30 p-3 rounded font-mono break-all">{analysisState.error}</p>
                  </div>
                </div>
                <button 
                  onClick={handleReset}
                  className="mt-8 w-full py-3.5 rounded border border-red-500/40 hover:bg-red-500/10 text-red-400 text-xs tracking-widest uppercase font-bold transition-all duration-300"
                >
                  Reinitialize Pipeline
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App