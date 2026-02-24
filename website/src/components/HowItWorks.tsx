import { motion } from "framer-motion";
import { Download, ToggleLeft, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "1. Install Extension",
    description: "Add Sema Salama to your Chrome browser from the Web Store in just one click.",
    icon: Download,
  },
  {
    title: "2. Automatic Scan",
    description: "As you browse X or Facebook, our AI automatically scans text for harmful patterns.",
    icon: ShieldCheck,
  },
  {
    title: "3. Interactive Control",
    description: "Harmful content is blurred. Click the warning label to reveal content or hide it again.",
    icon: ToggleLeft,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Simple setup, powerful protection. Here's how Sema Salama keeps you safe.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 transition-transform">
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}