import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Key, 
  QrCode, 
  FileJson, 
  Fingerprint, 
  MessageSquare, 
  ArrowUpRight, 
  Droplet, 
  Clock, 
  Lock 
} from "lucide-react";

const tools = [
  { 
    name: "QR Generator", 
    path: "/tools/QRGenerator", 
    icon: <QrCode className="w-5 h-5" />, 
    desc: "Instant vector codes.",
    color: "from-purple-500 to-pink-500" 
  },
  { 
    name: "JSON Formatter", 
    path: "/tools/JSONFormatter", 
    icon: <FileJson className="w-5 h-5" />, 
    desc: "Prettify and validate JSON.",
    color: "from-orange-400 to-red-500" 
  },
  { 
    name: "UUID Generator", 
    path: "/tools/UUIDGenerator", 
    icon: <Fingerprint className="w-5 h-5" />, 
    desc: "Generate V4 UUIDs.",
    color: "from-green-400 to-emerald-600" 
  },
  { 
    name: "WhatsApp Link", 
    path: "/tools/WhatsAppLinkGen", 
    icon: <MessageSquare className="w-5 h-5" />, 
    desc: "Create click-to-chat links.",
    color: "from-emerald-400 to-teal-500" 
  },
  { 
    name: "Base64 Tool", 
    path: "/tools/Base64Tool", 
    icon: <Key className="w-5 h-5" />, 
    desc: "Encode/decode Base64 safely.",
    color: "from-blue-400 to-indigo-500" 
  },
  { 
    name: "URL Tool", 
    path: "/tools/URLTool", 
    icon: <Key className="w-5 h-5" />, 
    desc: "Encode/decode URLs.",
    color: "from-indigo-400 to-purple-500" 
  },
  { 
    name: "Color Picker", 
    path: "/tools/ColorPicker", 
    icon: <Droplet className="w-5 h-5" />, 
    desc: "Pick and copy color codes.",
    color: "from-pink-500 to-red-500" 
  },
  { 
    name: "Timestamp", 
    path: "/tools/TimestampConv", 
    icon: <Clock className="w-5 h-5" />, 
    desc: "Convert epoch timestamps.",
    color: "from-emerald-400 to-lime-500" 
  },
  { 
    name: "JWT Decoder", 
    path: "/tools/JWTDecoder", 
    icon: <Lock className="w-5 h-5" />, 
    desc: "Decode JWT tokens safely.",
    color: "from-yellow-400 to-orange-500" 
  },
  { 
    name: "Hash Generator", 
    path: "/tools/HashGenerator", 
    icon: <Key className="w-5 h-5" />, 
    desc: "Generate MD5/SHA hashes.",
    color: "from-red-400 to-pink-500" 
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Tools() {
  return (
    <div className="h-screen w-full bg-[#030712] text-slate-200 overflow-hidden relative flex flex-col items-center justify-center py-4 md:py-8">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[80px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-[80px]" />
      </div>

      <main className="relative z-10 w-full max-w-6xl px-6 flex flex-col justify-between h-full max-h-[900px]">
        
        <header className="text-center mb-4 md:mb-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block px-3 py-0.5 mb-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-md text-[9px] font-bold tracking-[0.2em] text-indigo-400 uppercase"
          >
            Cedars Tech
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-2 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            Refined Utilities.
          </h1>
          <p className="text-slate-500 text-[11px] md:text-sm max-w-md mx-auto leading-tight">
            Professional developer toolkit. Fast, private, and precise.
          </p>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 w-full flex-grow content-center"
        >
          {tools.map((tool, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02 }} className="h-full">
              <Link
                to={tool.path}
                className="group relative block h-full p-3 md:p-5 rounded-xl border border-slate-800 bg-slate-900/20 hover:bg-slate-800/40 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${tool.color}`} />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg mb-3 flex items-center justify-center bg-gradient-to-br ${tool.color} shadow-lg shadow-black/20 group-hover:shadow-indigo-500/20 transition-all`}>
                    {tool.icon}
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xs md:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                        {tool.name}
                      </h3>
                      <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-white transition-all" />
                    </div>
                    
                    <p className="hidden sm:block text-[10px] text-slate-500 line-clamp-1 group-hover:text-slate-400 transition-colors">
                      {tool.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <footer className="mt-4 md:mt-8 text-center">
            <div className="h-px w-8 bg-slate-800 mx-auto mb-2" />
            <p className="text-[9px] text-slate-700 uppercase tracking-[0.4em]">@ cedars Tech</p>
        </footer>
      </main>
    </div>
  );
}