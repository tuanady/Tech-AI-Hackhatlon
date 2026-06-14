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
    if (files && files[0]) {
      const file = files[0]
      if (file.type === 'application/pdf') {
        setSelectedFile(file)
      } else {
        alert('Please upload a PDF file')
      }
    }
  }

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type === 'application/pdf') {
        setSelectedFile(file)
      } else {
        alert('Please upload a PDF file')
      }
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    if (!domain.trim()) {
      alert('Please specify your target interest domain vector.')
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append('research_paper', selectedFile)
    formData.append('domain', domain.trim())

    try {
      onAnalysisStart('processing')
      
      const response = await axios.post(
        'http://localhost:5000/analyze-paper',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setTimeout(() => {
        onAnalysisComplete({
          fileName: selectedFile.name,
          message: response.data.message,
          timestamp: new Date().toLocaleString()
        })
      }, 2000)

    } catch (error) {
      onAnalysisError(error.response?.data?.error || 'Failed to analyze paper. Please try again.')
    } finally {
      setIsUploading(false)
      setSelectedFile(null)
      setDomain('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto relative px-2">
      
      {/* High-definition Vibrant Animated Jiggling Liquid Aura Bubble */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none -z-10 overflow-visible opacity-90">
        <style>{`
          @keyframes fluidBlobAnimation {
            0%, 100% { border-radius: 45% 55% 70% 30% / 45% 50% 50% 55%; transform: translate(0, 0) scale(1) rotate(0deg); }
            33% { border-radius: 65% 35% 55% 45% / 55% 40% 60% 45%; transform: translate(20px, -30px) scale(1.08) rotate(30deg); }
            66% { border-radius: 50% 50% 35% 65% / 45% 55% 40% 55%; transform: translate(-25px, 20px) scale(0.92) rotate(-30deg); }
          }
        `}</style>
        <div 
          className="w-full h-full bg-gradient-to-tr from-[#cbd5e1] via-[#fae8ff] to-[#dbeafe] filter blur-[70px]"
          style={{ animation: 'fluidBlobAnimation 8s ease-in-out infinite alternate' }}
        />
      </div>

      {/* Main Editorial Header Copy */}
      <div className="mb-14 text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 mb-4 leading-[1.2]">
          Turn vision into <span className="font-normal italic bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">venture.</span>
        </h2>
        <p className="text-sm sm:text-base text-neutral-500 font-light max-w-sm mx-auto leading-relaxed">
          Map academic payloads into live structural venture blueprints instantaneously.
        </p>
      </div>

      {/* High-Contrast Luxury Frosted Card Frame */}
      <div className="bg-white/80 border border-white shadow-[0_32px_64px_rgba(15,23,42,0.06)] backdrop-blur-2xl rounded-[32px] p-6 sm:p-10 space-y-6 relative z-10">
        
        {/* Input Vector: Interested Domain */}
        <div className="space-y-2.5">
          <label className="block text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase pl-1">
            Target Interest Domain
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-indigo-600 transition-colors">
              <Compass className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g., Electric Vehicles, Aerospace and Drones, FinTech"
              className="w-full bg-neutral-50/50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 rounded-2xl pl-11 pr-4 py-4 text-sm font-light tracking-wide focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300"
            />
          </div>
        </div>

        {/* Upload Action Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 relative group ${
            isDragging
              ? 'border-indigo-600 bg-indigo-50/30'
              : 'border-neutral-200/80 bg-neutral-50/30 hover:border-neutral-400 hover:bg-neutral-50'
          }`}
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Plus className="w-4 h-4 text-neutral-500 group-hover:text-neutral-800 transition-colors" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-neutral-800 mb-1">
            {isDragging ? 'Release document array' : 'Mount research payload'}
          </h3>
          <p className="text-xs text-neutral-400 font-light mb-4">Drag & drop source PDF vector or browse</p>
          <div className="text-[10px] tracking-wider text-neutral-500 font-bold bg-white border border-neutral-200/60 inline-block px-3 py-1 rounded-full uppercase shadow-sm">
            PDF Limit 50MB
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Mounted File Overlay Display */}
        {selectedFile && (
          <div className="border border-neutral-200 bg-white p-4 rounded-xl flex items-center gap-4 shadow-sm animate-fadeIn">
            <div className="w-10 h-10 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-700 bg-neutral-50">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex-grow overflow-hidden">
              <p className="text-xs font-semibold text-neutral-800 truncate">{selectedFile.name}</p>
              <p className="text-[10px] text-neutral-400 font-mono mt-0.5 uppercase tracking-wide">
                SIZE_MATRIX // {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              className="text-neutral-400 hover:text-neutral-900 text-xs px-2.5 py-1.5 rounded-lg hover:bg-neutral-50 transition-all font-medium border border-transparent hover:border-neutral-200"
            >
              Wipe
            </button>
          </div>
        )}
      </div>

      {/* Form Bottom Control Switches */}
      <div className="mt-8 flex gap-4 relative z-10">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || !domain.trim() || isUploading}
          className="flex-grow py-4 rounded-full font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 bg-neutral-950 text-white hover:bg-neutral-800 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 shadow-xl"
        >
          {isUploading ? (
            <span>Processing structural layout...</span>
          ) : (
            <>
              <span>Compile Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
        <button
          onClick={() => {
            setSelectedFile(null)
            setDomain('')
            if (fileInputRef.current) fileInputRef.current.value = ''
          }}
          disabled={!selectedFile && !domain}
          className="px-8 rounded-full font-medium text-xs tracking-wider uppercase border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 disabled:opacity-30 transition-all duration-300"
        >
          Clear
        </button>
      </div>
    </div>
  )
}