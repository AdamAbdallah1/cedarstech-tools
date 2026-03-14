import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, Check, Shield, Fingerprint } from "lucide-react";
import md5 from "js-md5";

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState({});
  const [copyStatus, setCopyStatus] = useState(null); // Tracks which specific hash was copied

  const generateHashes = useCallback(async (input) => {
    if (!input) {
      setHashes({});
      return;
    }
    const enc = new TextEncoder();
    const buffer = enc.encode(input);

    const hashBuffer = async (algo) => {
      const digest = await crypto.subtle.digest(algo, buffer);
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };

    setHashes({
      md5: md5(input),
      sha1: await hashBuffer("SHA-1"),
      sha256: await hashBuffer("SHA-256"),
      sha512: await hashBuffer("SHA-512"),
    });
  }, []);

  // Auto-generate as you type for a "live" feel
  useEffect(() => {
    generateHashes(text);
  }, [text, generateHashes]);

  const copyToClipboard = async (val, type) => {
    await navigator.clipboard.writeText(val);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="h-screen w-full bg-[#010214] text-slate-200 flex items-center justify-center p-4 overflow-hidden relative font-sans">
      
      {/* Back Button */}
      <Link
        to="/tools"
        className="absolute top-6 left-6 z-50 w-10 h-10 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-slate-800/60 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">Hash Engine v2</span>
            </div>
            <Fingerprint className="w-3 h-3 text-slate-700" />
          </div>

          {/* Input Area */}
          <div className="relative group mb-6">
            <textarea
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste data to hash..."
              className="w-full p-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-indigo-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all resize-none placeholder:text-slate-700"
            />
          </div>

          {/* Results Grid */}
          <div className="space-y-3">
            <AnimatePresence>
              {Object.entries(hashes).map(([type, val]) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="group relative bg-slate-950/40 border border-slate-800/50 p-3 rounded-xl flex flex-col space-y-1 transition-all hover:border-indigo-500/30"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">{type}</span>
                    <button
                      onClick={() => copyToClipboard(val, type)}
                      className="text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      {copyStatus === type ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="text-[11px] font-mono text-slate-300 truncate pr-6">
                    {val}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {!text && (
              <div className="py-10 text-center border-2 border-dashed border-slate-800/50 rounded-2xl">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">Waiting for input stream...</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col items-center opacity-30">
          <p className="text-[9px] uppercase tracking-[0.4em] font-medium text-slate-400 italic">Cedars Tech Labs</p>
        </div>
      </motion.div>
    </div>
  );
}