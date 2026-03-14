import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, Check, Palette, Fingerprint } from "lucide-react";

export default function ColorPicker() {
  const [color, setColor] = useState("#6366f1");
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="h-screen w-full bg-[#010214] text-slate-200 flex items-center justify-center p-4 md:p-6 font-sans relative overflow-hidden">

      {/* Dynamic Ambient Glow */}
      <div 
        className="absolute inset-0 transition-colors duration-700 opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
      />

      {/* Back Button */}
      <Link 
        to="/tools" 
        className="absolute top-4 left-4 md:top-6 md:left-6 z-50 w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all backdrop-blur-md"
      >
        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-sm md:max-w-md z-10"
      >
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800/60 rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative flex flex-col items-center space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between w-full mb-6 px-1">
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-indigo-400" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">Chroma Engine</span>
            </div>
            <Fingerprint className="w-3 h-3 text-slate-700" />
          </div>

          {/* Color Picker */}
          <div className="relative group">
            <div 
              className="absolute -inset-3 md:-inset-4 rounded-full opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-40"
              style={{ backgroundColor: color }}
            />
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-3 md:border-4 border-slate-800 bg-slate-950 cursor-pointer appearance-none transition-transform hover:scale-105 active:scale-95 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none"
            />
          </div>

          {/* Color Info */}
          <div className="w-full flex flex-col space-y-2 md:space-y-3">
            <div className="flex items-center justify-between bg-slate-950/50 border border-slate-800/50 rounded-xl md:rounded-2xl p-3 md:p-4 transition-all hover:bg-slate-950/80">
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Hex</span>
                <span className="text-sm md:text-lg font-mono text-white">{color.toUpperCase()}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(color.toUpperCase())}
                className="p-1 md:p-2 text-slate-500 hover:text-indigo-400 transition-colors rounded"
              >
                <Copy className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between bg-slate-950/50 border border-slate-800/50 rounded-xl md:rounded-2xl p-3 md:p-4">
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-tighter">RGB</span>
                <span className="text-xs md:text-sm font-mono text-slate-300">{hexToRgb(color)}</span>
              </div>
              <div 
                className="w-5 h-5 md:w-6 md:h-6 rounded-lg border border-slate-700" 
                style={{ backgroundColor: color }} 
              />
            </div>
          </div>

          {/* Copy Button */}
          <button 
            onClick={() => copyToClipboard(color.toUpperCase())}
            className="w-full group relative flex items-center justify-center space-x-2 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-[9px] md:text-[10px] uppercase tracking-[0.15em] overflow-hidden transition-all active:scale-95"
          >
            <div className="absolute inset-0 bg-indigo-600 group-hover:bg-indigo-500 transition-colors rounded-xl md:rounded-2xl" />
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div 
                  key="check" 
                  initial={{ y: 10, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  exit={{ y: -10, opacity: 0 }}
                  className="relative flex items-center space-x-2 text-white"
                >
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Copied</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="copy" 
                  initial={{ y: 10, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  exit={{ y: -10, opacity: 0 }}
                  className="relative flex items-center space-x-2 text-white"
                >
                  <Copy className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Copy Hex</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center mt-6 md:mt-8 space-y-1 opacity-30 text-[7px] md:text-[8px] tracking-[0.3em] text-slate-400">
          <div className="h-px w-8 bg-slate-700" />
          <p>Cedars Tech Precision Lab</p>
        </div>
      </motion.div>
    </div>
  );
}