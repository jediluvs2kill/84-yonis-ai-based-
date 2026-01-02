import React, { useState, useRef, useEffect } from 'react';
import { diagnoseConsciousness } from '../services/gemini';
import { DiagnosticResult } from '../types';
import { Loader2, Terminal, ArrowRight } from 'lucide-react';

interface DiagnosticTerminalProps {
  onDiagnoseComplete: (result: DiagnosticResult) => void;
  onCancel: () => void;
}

export const DiagnosticTerminal: React.FC<DiagnosticTerminalProps> = ({ onDiagnoseComplete, onCancel }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "> SYSTEM_INIT...",
    "> LOADING_84_YONIS_DATABASE...",
    "> CONNECTED_TO_ORACLE...",
    "> WAITING_FOR_SUBJECT_INPUT..."
  ]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setLogs(prev => [...prev, `> USER_INPUT: "${input}"`, "> RUNNING_HEURISTICS...", "> CALCULATING_KARMA_VECTOR..."]);

    try {
      const result = await diagnoseConsciousness(input);
      setLogs(prev => [...prev, `> IDENTIFIED_STATE: [${result.stateId}]`, "> DOWNLOADING_PACKET..."]);
      
      // Artificial delay for dramatic effect
      setTimeout(() => {
        onDiagnoseComplete(result);
      }, 800);
      
    } catch (error) {
      setLogs(prev => [...prev, "> ERROR: SYSTEM_FAILURE. RETRY."]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-black border border-green-900 shadow-[0_0_50px_rgba(0,255,0,0.1)] flex flex-col h-[600px] font-mono">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-green-900 bg-green-950/10">
          <div className="flex items-center gap-2 text-green-500">
            <Terminal size={18} />
            <span className="text-sm tracking-widest font-bold">DIAGNOSTIC_MODE_V1.0</span>
          </div>
          <button onClick={onCancel} className="text-green-700 hover:text-green-400 text-xs uppercase hover:underline">
            [Abort Sequence]
          </button>
        </div>

        {/* Logs Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-2 text-sm">
          {logs.map((log, i) => (
            <div key={i} className={`${log.startsWith('> USER') ? 'text-white' : 'text-green-500/80'}`}>
              {log}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-green-500/80 animate-pulse">
              <Loader2 size={14} className="animate-spin" />
              <span>PROCESSING_CONSCIOUSNESS_STREAM</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-green-900 bg-black">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Describe your current mental state, your recurring fears, or your deepest desire..."
              className="w-full bg-gray-900/50 border border-green-900/50 text-green-100 p-4 pr-12 h-32 resize-none focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 text-sm placeholder-green-800"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute bottom-4 right-4 p-2 bg-green-900 text-green-100 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded"
            >
              <ArrowRight size={16} />
            </button>
          </form>
          <div className="mt-2 text-[10px] text-green-800 flex justify-between">
            <span>PRESS ENTER TO SUBMIT</span>
            <span>SYSTEMS_REALISM_ENABLED</span>
          </div>
        </div>

      </div>
    </div>
  );
};
