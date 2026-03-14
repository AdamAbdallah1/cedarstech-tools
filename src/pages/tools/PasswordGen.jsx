import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Download } from "lucide-react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      const result = btoa(unescape(encodeURIComponent(input)));
      setEncoded(result);
      setError("");
    } catch {
      setError("Encoding Error");
      setEncoded("");
    }
  };

  const handleDecode = () => {
    try {
      const result = decodeURIComponent(escape(atob(input)));
      setDecoded(result);
      setError("");
    } catch {
      setError("Decoding Error");
      setDecoded("");
    }
  };

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadText = (text, filename) => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
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
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Base64 Encoder / Decoder</div>

          {/* Input */}
          <textarea
            placeholder="Paste text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 md:h-40 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition text-sm font-mono resize-none"
          />

          {/* Error */}
          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-between space-x-3">
            <button
              onClick={handleEncode}
              disabled={!input}
              className={`flex-1 py-2 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all ${input ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
            >
              Encode
            </button>
            <button
              onClick={handleDecode}
              disabled={!input}
              className={`flex-1 py-2 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all ${input ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
            >
              Decode
            </button>
          </div>

          {/* Encoded Output */}
          {encoded && (
            <div className="relative">
              <pre className="w-full p-3 rounded-xl bg-slate-950/30 border border-slate-800 text-white text-xs md:text-sm font-mono overflow-auto max-h-48">
                {encoded}
              </pre>
              <div className="flex justify-end mt-2 space-x-2">
                <button onClick={() => copyToClipboard(encoded)} className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button onClick={() => downloadText(encoded, "encoded.txt")} className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs hover:bg-slate-900">
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          )}

          {/* Decoded Output */}
          {decoded && (
            <div className="relative mt-3">
              <pre className="w-full p-3 rounded-xl bg-slate-950/30 border border-slate-800 text-white text-xs md:text-sm font-mono overflow-auto max-h-48">
                {decoded}
              </pre>
              <div className="flex justify-end mt-2 space-x-2">
                <button onClick={() => copyToClipboard(decoded)} className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button onClick={() => downloadText(decoded, "decoded.txt")} className="flex items-center space-x-1 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs hover:bg-slate-900">
                  <Download className="w-3 h-3" />
                  <span>Download</span>
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