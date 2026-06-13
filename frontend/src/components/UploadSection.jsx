import React, { useRef, useState } from 'react'
import { Box, FileCode, ShieldAlert, Activity } from 'lucide-react'
import axios from 'axios'

export default function UploadSection({ onAnalysisStart, onAnalysisComplete, onAnalysisError }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
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

    setIsUploading(true)
    const formData = new FormData()
    formData.append('research_paper', selectedFile)

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
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-xl font-bold tracking-[0.25em] text-white uppercase mb-2">
          INGESTION_TARGET
        </h2>
        <p className="text-xs text-gray-500 uppercase tracking-widest">
          Load standard research manifests into execution memory.
        </p>
      </div>

      {/* Upload Matrix Frame */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all duration-300 bg-[#0d0e11]/40 relative overflow-hidden ${
          isDragging
            ? 'border-cyan-400 bg-cyan-950/10 shadow-[0_0_40px_rgba(34,211,238,0.05)]'
            : 'border-[#232429] hover:border-gray-600 hover:bg-[#0d0e11]'
        }`}
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded border border-[#232429] flex items-center justify-center bg-[#070708]">
            <Box className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
          {isDragging ? 'RELEASE_TO_PARSE' : 'DRAG_AND_DROP_SOURCE_PDF'}
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-6">or click to mount target stream</p>
        <div className="text-[10px] font-mono tracking-widest text-gray-400 border border-[#232429] inline-block px-3 py-1 rounded bg-[#070708] uppercase">
          LIMIT // MAX_50MB_ARRAY
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Mounted Asset Data View */}
      {selectedFile && (
        <div className="mt-6 border border-cyan-500/20 bg-cyan-950/5 p-4 rounded-xl flex items-center gap-4 animate-fadeIn">
          <div className="w-10 h-10 border border-cyan-500/30 rounded flex items-center justify-center text-cyan-400 bg-cyan-950/20">
            <FileCode className="w-4 h-4" />
          </div>
          <div className="flex-grow overflow-hidden">
            <p className="text-xs font-bold text-white uppercase tracking-wider truncate">{selectedFile.name}</p>
            <p className="text-[10px] text-gray-500 font-mono mt-0.5 uppercase tracking-widest">
              SIZE_ARRAY // {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFile(null)
              if (fileInputRef.current) fileInputRef.current.value = ''
            }}
            className="text-gray-500 hover:text-white font-sans text-xs p-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Informational Parameter Block */}
      <div className="mt-6 border border-[#1c1d21] bg-[#0d0e11]/60 p-5 rounded-xl">
        <div className="flex gap-4">
          <ShieldAlert className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-2">SEQUENCE_FLOW_INSTRUCTIONS</h4>
            <ul className="text-[11px] text-gray-500 space-y-1.5 uppercase tracking-wide">
              <li>[01] Vector content validation extraction layers</li>
              <li>[02] Generative matrix challenge synthesis</li>
              <li>[03] Cross-coordinate environment validation tracking</li>
              <li>[04] Alpha consulting intelligence execution</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form Action Controls */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="flex-grow py-4 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 bg-cyan-400 text-black hover:bg-cyan-300 disabled:opacity-20 disabled:pointer-events-none transition-all duration-300 shadow-xl shadow-cyan-500/10"
        >
          {isUploading ? (
            <>
              <Activity className="w-4 h-4 animate-spin" />
              <span>COMPUTING_SEQUENCE_</span>
            </>
          ) : (
            <>
              <span>INITIALIZE_DECRYPTION_</span>
            </>
          )}
        </button>
        <button
          onClick={() => {
            setSelectedFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
          }}
          disabled={!selectedFile}
          className="px-6 rounded-xl font-bold text-xs tracking-widest uppercase border border-[#232429] bg-white/5 hover:bg-white/10 text-white disabled:opacity-20 transition-all duration-300"
        >
          WIPE
        </button>
      </div>
    </div>
  )
}