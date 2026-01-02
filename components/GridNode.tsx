import React from 'react';
import { YoniState } from '../types';

interface GridNodeProps {
  state: YoniState;
  domainColor: string;
  isActive: boolean;
  isDiagnosed: boolean;
  onClick: () => void;
}

export const GridNode: React.FC<GridNodeProps> = ({ 
  state, 
  domainColor, 
  isActive, 
  isDiagnosed,
  onClick 
}) => {
  // Parsing the tailwind text color to a border/bg color logic for dynamic usage
  const baseBorder = `border-gray-800`;
  const activeBorder = `border-white`;
  const diagnosedGlow = `shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10 scale-110`;
  
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex items-center justify-center h-10 w-full sm:h-12 
        border transition-all duration-300 ease-out
        ${isActive ? activeBorder : baseBorder}
        ${isActive ? 'bg-gray-900' : 'bg-transparent hover:bg-gray-900'}
        ${isDiagnosed ? `${diagnosedGlow} border-emerald-400 bg-gray-800` : ''}
      `}
    >
      <div className={`text-[10px] sm:text-xs font-bold ${domainColor} opacity-70 group-hover:opacity-100`}>
        {state.id}
      </div>
      
      {/* Tooltip for desktop hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black border border-gray-700 p-2 text-xs text-center hidden group-hover:block z-50 pointer-events-none">
        <span className="block font-bold text-white mb-1">{state.name}</span>
        <span className="text-gray-400">{state.description}</span>
      </div>
    </button>
  );
};
