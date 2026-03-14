import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check } from "lucide-react";

export default function URLTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("encode"); // encode or decode
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const processURL = () => {
    try {
      let result = "";
      if (mode === "encode") {
        result = encodeURIComponent(text);
      } else {
        result = decodeURIComponent(text);
      }
      setOutput(result);
      setError("");
    } catch (e) {
      setOutput("");
      setError("Invalid input for decoding");
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="h-screen w-full bg-[#010214] text-slate-200 flex items-center justify-center p-4 md:p-8 font-sans relative">

      {/* Back Button */}
      <Link to="/tools" className="absolute top-5 left-5 z-50 w-10 h-10 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all backdrop-blur-md">
        <ArrowLeft className="w-4 h-4" />
      </Link>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md flex flex-col space-y-4">

        {/* Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-5 shadow-2xl shadow-black/50 flex flex-col space-y-4">

          {/* Header */}
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">URL Encoder / Decoder</div>

          {/* Input */}
          <textarea
            placeholder='Enter text or URL...'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 md:h-40 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition text-sm font-mono resize-none"
          />

          {/* Mode Toggle */}
          <div className="flex justify-center space-x-3">
            {["encode", "decode"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all ${
                  mode === m ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                }`}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>

          {/* Process Button */}
          <button
            onClick={processURL}
            disabled={!text}
            className={`py-2 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all ${text ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
          >
            Process
          </button>

          {/* Error */}
          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          {/* Output */}
          {output && (
            <div className="relative">
              <pre className="w-full p-3 rounded-xl bg-slate-950/30 border border-slate-800 text-white text-xs md:text-sm font-mono overflow-auto max-h-64">
                {output}
              </pre>

              <div className="flex justify-end mt-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-center mt-2 opacity-40 text-[8px] tracking-widest text-slate-400">
          Precision Lab Edition
        </div>

      </motion.div>
    </div>
  );
}