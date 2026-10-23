import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onGoHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen bg-[#09090F] flex items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="glass-panel p-10 max-w-md w-full rounded-2xl border border-purple-500/20 bg-[#0F0E1C] shadow-2xl">
        <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300 font-mono mb-3">
          404
        </div>

        <h1 className="text-xl font-bold text-white mb-2 font-display">
          Page Not Found
        </h1>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          The requested page or resource could not be found. Return to Ubaid Khatri's portfolio homepage or visit the admin portal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
