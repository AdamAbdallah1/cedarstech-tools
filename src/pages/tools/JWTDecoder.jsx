import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, Check, FileJson } from "lucide-react";

export default function JWTDecoder() {
  const [jwt, setJwt] = useState("");
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const decodeJWT = () => {
    try {
      const parts = jwt.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT");

      const decode = (str) =>
        JSON.stringify(JSON.parse(atob(str)), null, 2);

      setDecoded({
        header: decode(parts[0]),
        payload: decode(parts[1]),
        signature: parts[2],
      });
      setError("");
    } catch (e) {
      setDecoded(null);
      setError("Invalid JWT string");
    }
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="h-screen w-full bg-[#010214] text-slate-200 flex items-center justify-center p-4 md:p-8 font-sans relative">
      <Link
        to="/tools"
        className="absolute top-5 left-5 z-50 w-10 h-10 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md flex flex-col space-y-4"
      >
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 shadow-2xl flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <FileJson className="w-4 h-4 text-indigo-400" />
            <span>JWT Decoder</span>
          </div>

          <textarea
            placeholder="Paste your JWT here..."
            value={jwt}
            onChange={(e) => setJwt(e.target.value)}
            className="w-full h-28 p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            onClick={decodeJWT}
            disabled={!jwt}
            className={`py-2 rounded-xl font-semibold text-xs uppercase tracking-widest ${
              jwt
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            Decode JWT
          </button>

          {decoded && (
            <div className="space-y-3">
              {["header", "payload"].map((part) => (
                <div
                  key={part}
                  className="relative bg-slate-950/30 border border-slate-800 p-3 rounded-xl overflow-auto max-h-40"
                >
                  <pre className="text-xs font-mono text-white whitespace-pre-wrap">
                    {decoded[part]}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(decoded[part])}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-indigo-400"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
              <div className="bg-slate-950/30 border border-slate-800 p-2 rounded-xl text-xs text-slate-400 truncate">
                Signature: {decoded.signature}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}