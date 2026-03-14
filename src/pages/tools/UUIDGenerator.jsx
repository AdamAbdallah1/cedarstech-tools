import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, RefreshCw, Download } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function UUIDGenerator() {
  const [uuid, setUUID] = useState(uuidv4());
  const [copied, setCopied] = useState(false);

  const generateUUID = () => {
    setUUID(uuidv4());
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadUUID = () => {
    const blob = new Blob([uuid], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "uuid.txt";
    link.click();
  };

  return (
    <div className="h-screen w-full bg-[#010214] text-slate-200 flex items-center justify-center p-4 md:p-8 font-sans relative">
      
      {/* Back Button */}
      <Link to="/tools" className="absolute top-6 left-6 z-50 w-10 h-10 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all backdrop-blur-md">
        <ArrowLeft className="w-4 h-4" />
      </Link>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md flex flex-col space-y-6">

        {/* Main Card */}
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800/60 rounded-2xl p-6 shadow-2xl shadow-black/50 flex flex-col space-y-4">

          {/* Header */}
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">UUID Generator</div>

          {/* UUID Display */}
          <div className="flex items-center justify-between bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-sm font-mono text-white shadow-inner">
            <span className="break-all select-all">{uuid}</span>
            <motion.button onClick={generateUUID} whileTap={{ scale: 0.9 }} className="ml-2 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-shadow shadow-sm">
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4 space-x-3">
            <button
              onClick={copyToClipboard}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all ${
                copied ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy UUID"}</span>
            </button>

            <button
              onClick={downloadUUID}
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white hover:bg-slate-900 text-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-center mt-4 opacity-40 text-[8px] tracking-widest text-slate-400">
          Precision Lab Edition
        </div>

      </motion.div>
    </div>
  );
}