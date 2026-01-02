import React, { useState } from 'react';
import { DOMAINS } from '../constants';
import { GridNode } from './GridNode';
import { DiagnosticTerminal } from './DiagnosticTerminal';
import { UserManual } from './UserManual';
import { SystemGraph } from './SystemGraph';
import { Domain, YoniState, DiagnosticResult } from '../types';
import { BrainCircuit, Activity, BookOpen, User, LogOut, FileText, Grid, Network } from 'lucide-react';

interface SystemInterfaceProps {
    onExit: () => void;
}

type ViewMode = 'GRID' | 'GRAPH';

export const SystemInterface: React.FC<SystemInterfaceProps> = ({ onExit }) => {
  const [selectedState, setSelectedState] = useState<YoniState | null>(null);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('GRID');

  // When diagnostic completes
  const handleDiagnosis = (result: DiagnosticResult) => {
    setDiagnosticResult(result);
    // Find the state object
    let foundState: YoniState | null = null;
    let foundDomain: Domain | null = null;

    DOMAINS.forEach(d => {
      const s = d.states.find(st => st.id === result.stateId);
      if (s) {
        foundState = s;
        foundDomain = d;
      }
    });

    if (foundState) {
      setSelectedState(foundState);
      // Automatically switch to Graph view on diagnosis for better "Coordinate" context
      setViewMode('GRAPH');
    }
    setShowDiagnostic(false);
  };

  // Helper to find domain for a state
  const getDomainForState = (stateId: number) => DOMAINS.find(d => d.states.some(s => s.id === stateId));

  const selectedDomain = selectedState ? getDomainForState(selectedState.id) : null;

  return (
    <div className="min-h-screen flex flex-col text-gray-300 overflow-hidden relative selection:bg-purple-900 selection:text-white animate-in fade-in duration-1000">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent" />
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-gray-800 bg-black/80 backdrop-blur-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onExit} title="Return to Home">
            <BrainCircuit className="text-purple-500" />
            <div>
              <h1 className="text-lg font-bold tracking-widest text-white font-serif-display">84 YONIS</h1>
              <p className="text-[10px] uppercase tracking-wider text-gray-500">Consciousness Operating System V1.0</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
                onClick={() => setShowManual(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
                <FileText size={14} />
                Protocol
            </button>
            <div className="h-4 w-px bg-gray-800 hidden sm:block"></div>
            <button 
                onClick={onExit}
                className="hidden sm:flex text-gray-600 hover:text-gray-400 text-xs uppercase tracking-widest items-center gap-2"
            >
                <LogOut size={12} />
                Exit System
            </button>
            <button 
                onClick={() => setShowDiagnostic(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-purple-500/30 hover:border-purple-500 text-purple-400 text-xs font-bold uppercase tracking-widest transition-all rounded"
            >
                <Activity size={14} />
                Run Diagnostic
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full p-4 gap-6 h-[calc(100vh-80px)]">
        
        {/* Left: The Matrix/Grid OR Graph */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs uppercase text-gray-500 tracking-widest flex items-center gap-2">
                System Map 
                <span className="text-gray-600">|</span> 
                {viewMode === 'GRID' ? '7 Domains × 12 States' : 'Coordinate Space (X/Y)'}
              </h2>
              
              {/* View Toggle */}
              <div className="flex bg-gray-900 rounded p-1 border border-gray-800">
                <button 
                    onClick={() => setViewMode('GRID')}
                    className={`p-1.5 rounded transition-all ${viewMode === 'GRID' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    title="Grid View"
                >
                    <Grid size={14} />
                </button>
                <button 
                    onClick={() => setViewMode('GRAPH')}
                    className={`p-1.5 rounded transition-all ${viewMode === 'GRAPH' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    title="Graph View"
                >
                    <Network size={14} />
                </button>
              </div>
           </div>
           
           <div className="flex-1 overflow-hidden flex flex-col relative">
             {viewMode === 'GRID' ? (
                /* GRID VIEW */
                <div className="overflow-y-auto pr-2 custom-scrollbar pb-20">
                    <div className="space-y-6">
                    {DOMAINS.map((domain) => (
                        <div key={domain.id} className="relative">
                        {/* Domain Header */}
                        <div className="flex items-baseline justify-between mb-2 pl-1 border-l-2 border-gray-800">
                            <div className="ml-3">
                            <span className={`text-sm font-bold tracking-wider ${domain.color}`}>{domain.id}. {domain.name}</span>
                            <span className="ml-2 text-xs text-gray-500 hidden sm:inline">— {domain.subtitle}</span>
                            </div>
                        </div>
                        
                        {/* Grid */}
                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1">
                            {domain.states.map((state) => (
                            <GridNode 
                                key={state.id}
                                state={state}
                                domainColor={domain.color}
                                isActive={selectedState?.id === state.id}
                                isDiagnosed={diagnosticResult?.stateId === state.id}
                                onClick={() => setSelectedState(state)}
                            />
                            ))}
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
             ) : (
                 /* GRAPH VIEW */
                 <SystemGraph 
                    selectedState={selectedState} 
                    onSelectState={setSelectedState} 
                    diagnosedStateId={diagnosticResult?.stateId}
                 />
             )}
           </div>
        </div>

        {/* Right: Info Panel */}
        <div className="w-full lg:w-[400px] flex flex-col gap-4 h-full">
            {/* Context Panel */}
            <div className="flex-1 bg-gray-900/30 border border-gray-800 p-6 relative overflow-hidden flex flex-col">
              
              {!selectedState ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                  <BookOpen size={48} className="mb-4" />
                  <p className="text-sm font-mono">Select a node to inspect system parameters.</p>
                  <p className="text-xs mt-2 text-purple-400">Or run diagnostic to find your coordinates.</p>
                </div>
              ) : (
                <>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 p-2 opacity-20">
                    <div className="text-[100px] leading-none font-bold font-serif-display select-none">
                      {selectedState.id}
                    </div>
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="mb-6">
                      <div className={`text-xs uppercase font-bold tracking-widest mb-1 ${selectedDomain?.color}`}>
                         Domain {selectedDomain?.id}: {selectedDomain?.name}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white font-serif-display mb-2">
                        {selectedState.name}
                      </h2>
                      <div className="h-0.5 w-12 bg-gray-700 my-4" />
                      <p className="text-gray-300 leading-relaxed font-light text-lg">
                        {selectedState.description}
                      </p>
                    </div>

                    {/* Diagnostic Result specific content */}
                    {diagnosticResult && diagnosticResult.stateId === selectedState.id && (
                       <div className="mt-auto bg-black/50 border border-emerald-900/50 p-4 rounded-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                          <div className="flex items-center gap-2 mb-2 text-emerald-500 text-xs font-bold uppercase tracking-widest">
                            <User size={12} />
                            Diagnostic Analysis
                          </div>
                          <p className="text-sm text-gray-300 mb-4 italic">
                            "{diagnosticResult.analysis}"
                          </p>
                          <div className="text-xs text-emerald-400 font-mono border-l-2 border-emerald-500 pl-3 py-1">
                            <span className="block font-bold mb-1 text-emerald-600">DIRECTIVE:</span>
                            {diagnosticResult.recommendation}
                          </div>
                       </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Stats / Footer Quote */}
            <div className="h-auto p-4 border border-gray-800 bg-black/40 text-center">
              <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">System Status</p>
              <p className="text-xs text-gray-400 font-mono">
                "Most humans oscillate between 37–55. Very few stably cross 61."
              </p>
            </div>
        </div>

      </main>

      {/* Diagnostic Modal */}
      {showDiagnostic && (
        <DiagnosticTerminal 
          onDiagnoseComplete={handleDiagnosis}
          onCancel={() => setShowDiagnostic(false)}
        />
      )}

      {/* Manual Modal */}
      {showManual && (
        <UserManual onClose={() => setShowManual(false)} />
      )}

    </div>
  );
};