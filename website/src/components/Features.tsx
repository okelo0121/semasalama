import { motion } from "framer-motion";
import { Shield, Languages, Zap, UserCheck, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    name: "AI Toxicity Detection",
    description: "State-of-the-art multilingual AI model trained to identify hate speech and abusive language.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    name: "GBV Contextual Analysis",
    description: "Specialized focus on African contexts and gender-based violence (GBV) patterns.",
    icon: Shield,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    name: "Multilingual Support",
    description: "Handles Swahili, Somali, Arabic, Luo, Kamba, and English with local slang dictionary fallback.",
    icon: Languages,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    name: "Interactive Blurring",
    description: "Content is blurred automatically. You choose when to reveal or re-blur sensitive posts.",
    icon: EyeOff,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    name: "Privacy Focused",
    description: "Analysis happens fast and respects your browsing privacy without tracking personal data.",
    icon: UserCheck,
    color: "text-cyan-600",
    bg: "bg-cyan-100",
  },
  {
    name: "Clean Interface",
    description: "Minimalist design that integrates seamlessly with X (Twitter) and Facebook.",
    icon: Eye,
    color: "text-pink-600",
    bg: "bg-pink-100",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Advanced Content Protection
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Sema Salama combines powerful AI with localized dictionaries to keep your digital space safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
            >
              <div className={cn("inline-flex items-center justify-center p-3 rounded-xl mb-6", feature.bg)}>
                <feature.icon className={cn("h-6 w-6", feature.color)} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.name}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}