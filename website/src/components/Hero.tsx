import { motion } from "framer-motion";
import { ShieldAlert, Zap, Globe, Smartphone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-emerald-50 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
            Multilingual AI Protection
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            Browse Safely with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
              Sema Salama
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
            Detect and blur harmful content in real-time. Our AI-powered extension
            protects you from GBV, harassment, and abusive language across the web.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl"
            >
              Get Extension Free
            </a>
            <div className="flex items-center space-x-2 px-6 py-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <span className="text-slate-600 font-medium">App coming soon</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-4">
            <div className="bg-slate-50 rounded-lg p-8 text-left space-y-6">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-slate-200 flex-shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                  <div className="p-4 bg-white border border-red-100 rounded-lg relative overflow-hidden">
                    <div className="blur-sm opacity-50">This is a simulation of harmful content that would be detected and blurred by our advanced AI system to ensure your online safety.</div>
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-md">
                      <div className="flex items-center space-x-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full">
                        <ShieldAlert className="h-4 w-4 text-red-600" />
                        <span className="text-xs font-bold text-red-700">GBV-Harassment Detected — Click to Reveal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}