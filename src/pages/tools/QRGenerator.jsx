import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Download, Copy, Check, Settings2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff00"); // transparent default
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "cedars-tech-qr.png";
    link.click();
  };

  return (
    <div className="h-screen w-full bg-[#010214] text-slate-200 flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans relative">
      
      {/* Background gradient glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      {/* Back Button */}
      <Link to="/tools" className="absolute top-5 left-5 z-50 w-10 h-10 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 transition-all backdrop-blur-md">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      </Link>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md flex flex-col space-y-4">
        
        {/* Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-5 shadow-2xl shadow-black/50 flex flex-col space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
            <span>QR Generator</span>
            <Settings2 className="w-3 h-3 text-slate-400" />
          </div>

          {/* Input */}
          <input 
            type="text"
            placeholder="https://cedarstech.info"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-slate-950/50 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition text-sm"
          />

          {/* QR Preview */}
          <div className="flex justify-center items-center min-h-[220px] rounded-xl bg-slate-950/30 border border-slate-800/40 relative overflow-hidden p-4">
            <AnimatePresence mode="wait">
              {text ? (
                <motion.div 
                  key="qr"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="rounded-xl p-2 shadow-lg shadow-indigo-500/20 bg-white"
                >
                  <QRCodeCanvas
                    id="qr-code"
                    value={text}
                    size={size}
                    bgColor={bgColor === "#ffffff00" ? "#ffffff" : bgColor}
                    fgColor={fgColor}
                    level="H"
                    includeMargin={false}
                  />
                </motion.div>
              ) : (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-500 text-xs italic">Awaiting input...</motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          {text && (
            <div className="flex flex-col space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Foreground</label>
                  <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-6 rounded border-0 cursor-pointer"/>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Background</label>
                  <input type="color" value={bgColor === "#ffffff00" ? "#ffffff" : bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-6 rounded border-0 cursor-pointer"/>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Density</span>
                  <span className="text-indigo-400 font-mono">{size}px</span>
                </div>
                <input type="range" min="120" max="280" step="10" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full h-1 rounded-lg accent-indigo-500"/>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 mt-2">
            <button 
              onClick={copyToClipboard} 
              disabled={!text} 
              className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${
                text ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Link Copied" : "Copy URL"}</span>
            </button>
            <button 
              onClick={downloadQRCode} 
              disabled={!text} 
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white hover:bg-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4"/>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-3 opacity-40 text-[8px] tracking-widest text-slate-400">
          Cedars Tech
        </div>

      </motion.div>
    </div>
  );
}