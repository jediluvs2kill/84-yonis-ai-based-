import React, { useState } from 'react';
import { DOMAINS } from '../constants';
import { YoniState, Domain } from '../types';

interface SystemGraphProps {
  selectedState: YoniState | null;
  onSelectState: (state: YoniState) => void;
  diagnosedStateId: number | undefined;
}

export const SystemGraph: React.FC<SystemGraphProps> = ({ 
  selectedState, 
  onSelectState,
  diagnosedStateId 
}) => {
  const [hoveredState, setHoveredState] = useState<YoniState | null>(null);

  // Helper to map coordinates
  // Y-Axis: Domain ID (1 at bottom, 7 at top)
  const getY = (domainId: number) => {
    // Invert Y for SVG (0 is top)
    // We have 7 domains. 
    // Domain 1 should be at 100% height - padding
    // Domain 7 should be at 0% height + padding
    const step = 100 / 6; // 6 intervals between 7 points
    const normalizedPos = (domainId - 1) * step;
    return 100 - normalizedPos; // Percentage string
  };

  // X-Axis: State Index (0-11) (Left to Right)
  const getX = (stateIndex: number) => {
     // 12 states, 11 intervals
     const step = 100 / 11;
     return stateIndex * step;
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-950/50 border border-gray-800 relative overflow-hidden group">
        
        {/* Graph Header / Legend */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none select-none bg-black/40 p-2 rounded backdrop-blur-sm border border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300">Coordinate Space</h3>
            <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] text-gray-400">Diagnosed Position</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white border border-gray-600"></div>
                    <span className="text-[10px] text-gray-400">Selected Node</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500/50"></div>
                    <span className="text-[10px] text-gray-400">Human Population Density</span>
                </div>
            </div>
        </div>

        {/* Tooltip */}
        {hoveredState && (
            <div 
                className="absolute z-50 pointer-events-none bg-gray-900 border border-gray-600 p-3 rounded shadow-2xl max-w-[200px]"
                style={{
                    left: `${getX((hoveredState.id - 1) % 12)}%`,
                    top: `${getY(Math.ceil(hoveredState.id / 12))}%`,
                    transform: 'translate(15px, -50%)' 
                }}
            >
                <div className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">ID: {hoveredState.id}</div>
                <div className="text-xs font-bold text-white mb-1">{hoveredState.name}</div>
                <div className="text-[10px] text-gray-300 leading-tight">{hoveredState.description}</div>
            </div>
        )}

        <div className="flex-1 relative w-full h-full p-8 md:p-12">
            {/* Axis Labels */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold whitespace-nowrap origin-center select-none">
                Depth of Awareness (Y)
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold whitespace-nowrap select-none">
                Complexity of Experience (X)
            </div>

            {/* SVG Render Layer */}
            <svg className="w-full h-full overflow-visible">
                {/* 
                    HUMAN DENSITY HEATMAP 
                    "Brightest cluster around Y=4, X=4–7"
                    Domain 4 Y-pos, States 3-8 X-pos
                */}
                <defs>
                    <radialGradient id="humanDensity" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="rgb(249 115 22 / 0.3)" />
                        <stop offset="100%" stopColor="rgb(249 115 22 / 0)" />
                    </radialGradient>
                </defs>
                <ellipse 
                    cx={`${getX(5)}%`} 
                    cy={`${getY(4.5)}%`} 
                    rx="30%" 
                    ry="15%" 
                    fill="url(#humanDensity)" 
                    className="animate-pulse duration-[4000ms]"
                />

                {/* Background Grid Lines (Horizontal - Domains) */}
                {DOMAINS.map((domain) => (
                    <g key={`grid-y-${domain.id}`}>
                        <line 
                            x1="0%" 
                            y1={`${getY(domain.id)}%`} 
                            x2="100%" 
                            y2={`${getY(domain.id)}%`} 
                            stroke="#555" 
                            strokeWidth="1" 
                            strokeDasharray="4 4"
                            opacity="0.4"
                        />
                        <text 
                            x="-15" 
                            y={`${getY(domain.id)}%`} 
                            fill="currentColor" 
                            className={`text-[9px] ${domain.color} font-bold font-mono tracking-wider`}
                            alignmentBaseline="middle"
                            textAnchor="end"
                            fontSize="9"
                        >
                            {domain.name}
                        </text>
                    </g>
                ))}

                 {/* Background Grid Lines (Vertical - Complexity) */}
                 {Array.from({ length: 12 }).map((_, i) => (
                    <line 
                        key={`grid-x-${i}`}
                        x1={`${getX(i)}%`} 
                        y1="0%" 
                        x2={`${getX(i)}%`} 
                        y2="100%" 
                        stroke="#444" 
                        strokeWidth="1" 
                        opacity="0.2"
                    />
                ))}

                {/* Data Points */}
                {DOMAINS.map((domain) => (
                    <g key={`domain-${domain.id}`}>
                        {domain.states.map((state, index) => {
                            const isSelected = selectedState?.id === state.id;
                            const isDiagnosed = diagnosedStateId === state.id;
                            
                            return (
                                <g 
                                    key={state.id} 
                                    className="cursor-pointer transition-all duration-300" 
                                    onClick={() => onSelectState(state)}
                                    onMouseEnter={() => setHoveredState(state)}
                                    onMouseLeave={() => setHoveredState(null)}
                                >
                                    
                                    {/* Connection Lines */}
                                    {index < 11 && (
                                        <line 
                                            x1={`${getX(index)}%`} 
                                            y1={`${getY(domain.id)}%`}
                                            x2={`${getX(index + 1)}%`}
                                            y2={`${getY(domain.id)}%`}
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            className={`opacity-40 hover:opacity-100 transition-opacity ${domain.color}`}
                                        />
                                    )}

                                    {/* Hover Target Area (Invisible larger circle for easier interaction) */}
                                    <circle
                                        cx={`${getX(index)}%`}
                                        cy={`${getY(domain.id)}%`}
                                        r="12"
                                        fill="transparent"
                                    />

                                    {/* The Node */}
                                    <circle
                                        cx={`${getX(index)}%`}
                                        cy={`${getY(domain.id)}%`}
                                        r={isSelected || isDiagnosed ? 6 : 3.5}
                                        className={`
                                            transition-all duration-300
                                            ${isSelected ? 'fill-white stroke-white' : 'fill-gray-400 stroke-gray-900'}
                                            hover:fill-emerald-400 hover:r-5 hover:stroke-emerald-900
                                        `}
                                        strokeWidth="1"
                                    />
                                    
                                    {/* Diagnosis Crosshair/Ring */}
                                    {isDiagnosed && (
                                        <>
                                            <circle
                                                cx={`${getX(index)}%`}
                                                cy={`${getY(domain.id)}%`}
                                                r="12"
                                                fill="none"
                                                stroke="#10b981"
                                                strokeWidth="1"
                                                className="animate-ping opacity-50"
                                            />
                                            <circle
                                                cx={`${getX(index)}%`}
                                                cy={`${getY(domain.id)}%`}
                                                r="8"
                                                fill="none"
                                                stroke="#10b981"
                                                strokeWidth="1"
                                            />
                                        </>
                                    )}
                                </g>
                            );
                        })}
                    </g>
                ))}
            </svg>
        </div>
    </div>
  );
};