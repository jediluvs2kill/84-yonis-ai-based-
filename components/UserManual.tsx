import React from 'react';
import { X, Map, Zap, Target, ArrowUpRight } from 'lucide-react';

interface UserManualProps {
  onClose: () => void;
}

export const UserManual: React.FC<UserManualProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[85vh] font-mono selection:bg-white/20">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/20">
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">System Protocol // Manual</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-gray-400 text-sm custom-scrollbar">
          
          {/* Section 1 */}
          <section className="space-y-3">
             <h3 className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-b border-gray-800 pb-2">
                <Map size={14} className="text-emerald-500" /> 
                01. Topography Analysis
             </h3>
             <p className="leading-relaxed text-gray-400">
                The interface renders the <strong>84 Yonis</strong> (States of Consciousness) across <strong>7 Domains</strong>. 
                <span className="block mt-2 pl-4 border-l border-gray-700 text-gray-500 text-xs">
                Y-Axis: Depth of Awareness (Tamas → Liberated)<br/>
                X-Axis: Complexity of Experience (Simple → Nuanced)
                </span>
             </p>
             <p className="text-xs text-gray-500">
                <strong>Action:</strong> Click any node in the grid to inspect its parameters, specific suffering loops, and exit criteria.
             </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
             <h3 className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-b border-gray-800 pb-2">
                <Zap size={14} className="text-purple-500" /> 
                02. Diagnostic Heuristics
             </h3>
             <p className="leading-relaxed">
                The core utility is the <strong>AI Diagnostic Mode</strong>. It uses psycholinguistic pattern matching to triangulate your current operating state.
             </p>
             <div className="bg-gray-900/50 p-3 border border-gray-800 rounded text-xs font-mono text-gray-300">
                "I feel anxious about my career path and constantly compare myself to others..."
                <div className="mt-2 text-purple-400 flex items-center gap-1">
                    <ArrowUpRight size={12} /> Result: State 52 (Status Anxiety)
                </div>
             </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
             <h3 className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 border-b border-gray-800 pb-2">
                <Target size={14} className="text-amber-500" /> 
                03. Evolution Vector
             </h3>
             <p className="leading-relaxed">
                Diagnosis is not the destination. It is the coordinates.
                Once identified, read the <strong>Directive</strong> provided by the Oracle. 
                Your objective is to exhaust the karma of the current state to permit a transition to the next hierarchy.
             </p>
             <p className="text-emerald-500/80 text-xs uppercase tracking-wider font-bold">
                Goal: Transcend Domain 5 (Identity) -> Enter Domain 6 (Wisdom).
             </p>
          </section>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-black/50 flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
                Initialize
            </button>
        </div>

      </div>
    </div>
  );
};
