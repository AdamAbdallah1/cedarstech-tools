import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check } from "lucide-react";

export default function TimestampConv() {
  const [epoch, setEpoch] = useState("");
  const [date, setDate] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEpochChange = (e) => {
    const val = e.target.value;
    setEpoch(val);
    const ts = parseInt(val);
    if (!isNaN(ts)) {
      setDate(new Date(ts * 1000).toISOString());
    } else {
      setDate("");
    }
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    setDate(val);
    const parsed = Date.parse(val);
    if (!isNaN(parsed)) {
      setEpoch(Math.floor(parsed / 1000));
    } else {
      setEpoch("");
    }
  };

  const copyToClipboard = async () => {
    if (!epoch && !date) return;
    const text = epoch ? epoch.toString() : date;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="h-screen w-full bg-[#010214] text-slate-200 flex items-center justify-center p-4 md:p-8 font-sans relative">

      {/* Back Button */}
      <Link to="/tools" className="absolute top-5 left-5 z-50 w-10 h-10 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all backdrop-blur-md">
        <ArrowLeft className="w-4 h-4" />
      </Link>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md flex flex-col space-y-6">

        {/* Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl shadow-black/50 flex flex-col space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest text-center">Timestamp Converter</h2>

          {/* Epoch Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-slate-400 text-xs uppercase tracking-widest">Epoch (seconds)</label>
            <input 
              type="number" 
              value={epoch} 
              onChange={handleEpochChange} 
              placeholder="1609459200" 
              className="w-full p-2 rounded-xl bg-slate-950/50 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          {/* Date Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-slate-400 text-xs uppercase tracking-widest">ISO Date</label>
            <input 
              type="text" 
              value={date} 
              onChange={handleDateChange} 
              placeholder="2021-01-01T00:00:00Z" 
              className="w-full p-2 rounded-xl bg-slate-950/50 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          {/* Copy Button */}
          <button 
            onClick={copyToClipboard}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all ${
              copied ? "bg-green-600 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied" : "Copy Value"}</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-4 opacity-40 text-[8px] tracking-widest text-slate-400">
          Precision Lab Edition
        </div>
      </motion.div>
    </div>
  );
}