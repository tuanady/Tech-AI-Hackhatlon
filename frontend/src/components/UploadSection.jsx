import React, { useRef, useState } from 'react'
import { Plus, FileText, ArrowRight, Compass } from 'lucide-react'
import axios from 'axios'

export default function UploadSection({ onAnalysisStart, onAnalysisComplete, onAnalysisError }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [domain, setDomain] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files[0] && files[0].type === 'application/pdf') {
      setSelectedFile(files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !domain.trim()) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('research_paper', selectedFile)
    formData.append('domain', domain.trim())

    try {
      // 1. Kick off the animated loading view state instantly
      onAnalysisStart('loading')
      
      // 2. Perform the direct data fetch request block
      const response = await axios.post('http://localhost:5000/analyze-paper', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      // 3. Complete the cycle by feeding the actual dataset forward
      onAnalysisComplete({
        ...response.data,
        timestamp: new Date().toLocaleString()
      })

    } catch (error) {
      onAnalysisError(error.response?.data?.error || 'Failed to analyze paper. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto relative px-2">
      {/* Dynamic Liquid Aura Bubble Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none -z-10 overflow-visible opacity-90">
        <style>{`
          @keyframes fluidBlobAnimation {
            0%, 100% { border-radius: 45% 55% 70% 30% / 45% 50% 50% 55%; transform: translate(0, 0) scale(1) rotate(0deg); }
            33% { border-radius: 65% 35% 55% 45% / 55% 40% 60% 45%; transform: translate(20px, -30px) scale(1.08) rotate(30deg); }
            66% { border-radius: 50% 50% 35% 65% / 45% 55% 40% 55%; transform: translate(-25px, 20px) scale(0.92) rotate(-30deg); }
          }
        `}</style>
        <div className="w-full h-full bg-gradient-to-tr from-[#cbd5e1] via-[#fae8ff] to-[#dbeafe] filter blur-[70px]" style={{ animation: 'fluidBlobAnimation 8s ease-in-out infinite alternate' }} />
      </div>

      <div className="mb-14 text-center">
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 mb-4 leading-[1.2]">
          Turn vision into <span className="font-normal italic bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">venture.</span>
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 font-light max-w-sm mx-auto leading-relaxed">
          Map academic payloads into live structural venture blueprints instantaneously.
        </p>
      </div>

      <div className="bg-white/80 border border-white shadow-[0_32px_64px_rgba(0,0,0,0.05)] backdrop-blur-2xl rounded-[32px] p-6 sm:p-10 space-y-6">
        <div className="space-y-2.5">
          <label className="block text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase pl-1">Target Interest Domain</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral-400"><Compass className="w-4 h-4" /></div>
            <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="e.g., Electric Vehicles" className="w-full bg-neutral-50/50 border border-neutral-200 text-neutral-900 rounded-2xl pl-11 pr-4 py-4 text-sm font-light focus:outline-none focus:border-indigo-500" />
          </div>
        </div>

        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className="border border-dashed rounded-2xl p-12 text-center cursor-pointer border-neutral-200 hover:bg-neutral-50">
          <Plus className="w-4 h-4 mx-auto text-neutral-400 mb-2" />
          <h3 className="text-sm font-medium text-neutral-800">Mount research payload</h3>
          <input ref={fileInputRef} type="file" accept=".pdf" onChange={(e) => setSelectedFile(e.target.files[0])} className="hidden" />
          {selectedFile && <p className="text-xs text-indigo-600 mt-2 font-mono font-bold">{selectedFile.name}</p>}
        </div>
      </div>

      <button onClick={handleUpload} disabled={!selectedFile || !domain.trim() || isUploading} className="w-full mt-8 py-4 rounded-full font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 bg-neutral-950 text-white hover:bg-neutral-800 transition-all shadow-xl">
        <span>Compile Architecture</span>
      </button>
    </div>
  )
}