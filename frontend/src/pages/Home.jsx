import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import UploadSection from '../components/UploadSection';
import ResultsSection from '../components/ResultsSection';
import AnalysisProgress from '../components/AnalysisProgress';

const Home = () => {
  const [analysisState, setAnalysisState] = useState({
    status: 'idle', // idle, loading, completed, error
    data: null,
    error: null,
    fileId: null
  });

  const handleAnalysisStart = (fileId) => {
    setAnalysisState({
      status: 'loading',
      data: null,
      error: null,
      fileId
    });
  };

  const handleAnalysisComplete = (results) => {
    setAnalysisState({
      status: 'completed',
      data: results,
      error: null,
      fileId: analysisState.fileId
    });
  };

  const handleAnalysisError = (error) => {
    setAnalysisState({
      status: 'error',
      data: null,
      error,
      fileId: null
    });
  };

  const handleReset = () => {
    setAnalysisState({
      status: 'idle',
      data: null,
      error: null,
      fileId: null
    });
  };

  return (
    <MainLayout>
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
        <div className="max-w-xl mx-auto">
          <div className="bg-white border border-neutral-200/80 p-8 rounded-[24px] shadow-xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-200 flex items-center justify-center text-red-500 mx-auto mb-4 font-semibold">
              !
            </div>
            <h3 className="text-lg font-medium text-neutral-900 tracking-tight">Compilation Fault</h3>
            <p className="text-sm text-neutral-500 mt-2 font-light leading-relaxed">{analysisState.error}</p>
            <button 
              onClick={handleReset}
              className="mt-8 px-6 py-3 rounded-full text-xs font-medium tracking-wider uppercase bg-neutral-950 hover:bg-neutral-800 text-white transition-all duration-300"
            >
              Return to Workspace
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
