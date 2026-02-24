import { motion } from "framer-motion";
import { Heart, Globe, Users, Shield } from "lucide-react";

export default function About() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
              Our Mission for a Safer Internet
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Sema Salama (Swahili for "Speak Safely") was created to address the
              growing challenge of online harassment and gender-based violence in
              digital spaces, particularly within African contexts.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-1 p-2 bg-red-50 rounded-lg">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Empathy-First Tech</h4>
                  <p className="text-slate-600 text-sm">We build tools that protect victims without silencing voices.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 p-2 bg-blue-50 rounded-lg">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Localized Context</h4>
                  <p className="text-slate-600 text-sm">Our AI understands slang and cultural nuances that global models miss.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 p-2 bg-emerald-50 rounded-lg">
                  <Users className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Community Driven</h4>
                  <p className="text-slate-600 text-sm">Developed with input from GBV advocates and safety experts.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 lg:mt-0 relative"
          >
            <div className="aspect-square relative rounded-3xl bg-slate-100 overflow-hidden shadow-xl border border-slate-200 p-8 flex flex-col justify-center items-center text-center">
               <div className="h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                 <Shield className="h-12 w-12" />
               </div>
               <h3 className="text-2xl font-bold mb-2">Speak Safely</h3>
               <p className="text-slate-500 font-medium">Protecting digital spaces across the continent.</p>
               <div className="mt-8 flex flex-wrap justify-center gap-2">
                 {["Swahili", "Somali", "Arabic", "Luo", "Kamba", "English"].map(lang => (
                   <span key={lang} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 uppercase tracking-wider">{lang}</span>
                 ))}
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}