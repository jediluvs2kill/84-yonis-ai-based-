import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Map, Zap, Target } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden font-mono selection:bg-emerald-900">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      
      {/* Radial Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className={`relative z-10 max-w-5xl px-6 w-full flex flex-col items-center text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Top Label */}
        <div className="mb-6 flex items-center gap-2 text-emerald-600/60 text-[10px] uppercase tracking-[0.3em] font-bold">
            <Terminal size={12} />
            <span>System Ready // V1.0</span>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-serif-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 mb-6 tracking-tight drop-shadow-2xl">
          84 YONIS
        </h1>

        {/* Subtitle / Philosophy */}
        <div className="flex flex-col gap-2 md:gap-4 text-xs md:text-sm text-gray-400 mb-12 tracking-widest max-w-2xl font-light mx-auto">
          <p>
            <span className="text-emerald-500/70 mr-2">[1]</span> BIOLOGY IS A RENDERING LAYER.
          </p>
          <p>
            <span className="text-emerald-500/70 mr-2">[2]</span> KARMA IS THE STATE TRANSITION LOGIC.
          </p>
          <p>
             <span className="text-emerald-500/70 mr-2">[3]</span> CONSCIOUSNESS IS THE OPERATING SYSTEM.
          </p>
        </div>

        {/* System Protocol Visualization */}
        <div className="w-full mb-16">
            <div className="flex items-center justify-center gap-4 mb-8 opacity-40">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-500"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Initialization Protocol</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-500"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left">
                
                {/* Step 1 */}
                <div className="group relative border border-gray-800 bg-gray-900/30 p-6 hover:border-emerald-500/40 hover:bg-gray-900/60 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-4 right-4 text-[40px] leading-none font-bold text-gray-800/30 group-hover:text-emerald-900/40 transition-colors select-none">01</div>
                    <div className="flex flex-col items-start gap-4 relative z-10">
                        <div className="p-2 rounded bg-black border border-gray-800 group-hover:border-emerald-500 group-hover:text-emerald-400 transition-colors">
                            <Map size={18} />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-200 mb-2 group-hover:text-emerald-400 transition-colors">Topography Analysis</h3>
                            <p className="text-[11px] leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors">
                                Navigate the 84 Yonis across 7 hierarchical domains. <br/>
                                <span className="text-gray-600 mt-1 block text-[10px]">Y-Axis: Depth | X-Axis: Complexity</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="group relative border border-gray-800 bg-gray-900/30 p-6 hover:border-purple-500/40 hover:bg-gray-900/60 transition-all duration-500 hover:-translate-y-1">
                     <div className="absolute top-4 right-4 text-[40px] leading-none font-bold text-gray-800/30 group-hover:text-purple-900/40 transition-colors select-none">02</div>
                     <div className="flex flex-col items-start gap-4 relative z-10">
                        <div className="p-2 rounded bg-black border border-gray-800 group-hover:border-purple-500 group-hover:text-purple-400 transition-colors">
                            <Zap size={18} />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-200 mb-2 group-hover:text-purple-400 transition-colors">Diagnostic Heuristics</h3>
                            <p className="text-[11px] leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors">
                                Engage the AI Oracle to triangulate your operating state using psycholinguistic pattern matching.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="group relative border border-gray-800 bg-gray-900/30 p-6 hover:border-amber-500/40 hover:bg-gray-900/60 transition-all duration-500 hover:-translate-y-1">
                    <div className="absolute top-4 right-4 text-[40px] leading-none font-bold text-gray-800/30 group-hover:text-amber-900/40 transition-colors select-none">03</div>
                    <div className="flex flex-col items-start gap-4 relative z-10">
                        <div className="p-2 rounded bg-black border border-gray-800 group-hover:border-amber-500 group-hover:text-amber-400 transition-colors">
                            <Target size={18} />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-200 mb-2 group-hover:text-amber-400 transition-colors">Evolution Vector</h3>
                            <p className="text-[11px] leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors">
                                Receive precise directives to exhaust current karma and transition to the next hierarchy.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={onEnter}
          className="group relative px-10 py-4 bg-transparent border border-emerald-900/50 hover:border-emerald-500 text-emerald-500 hover:text-emerald-400 transition-all duration-300 uppercase tracking-[0.2em] text-xs font-bold overflow-hidden"
        >
          <div className="absolute inset-0 bg-emerald-900/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 flex items-center gap-3">
             Initialize System
             <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
        
        {/* Footer Status */}
        <div className="mt-20 text-[10px] text-gray-700 font-mono">
           Architecture: Ancient Rishi × Systems Engineering
        </div>

      </div>
    </div>
  );
};