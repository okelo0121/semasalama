import { Shield, Mail, Twitter, Facebook, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white pt-24 pb-16 mt-16 overflow-hidden">
      {/* Wave Shape Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 flex justify-center">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[50px] md:h-[100px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
      {/*...rest of footer...*/}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
        <span className="text-[15vw] font-black tracking-tighter whitespace-nowrap text-white">
          SEMA SALAMA
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6 text-white">
              <img src="/logo.png" alt="Sema Salama Logo" className="h-8 w-8 object-contain" />
              <span className="font-bold text-2xl tracking-tight">Sema Salama</span>
            </div>
            <p className="text-brand-light/80 max-w-sm mb-6">
              Empowering users to navigate the digital world safely through advanced
              AI-powered toxicity detection and content filtering.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Project</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/features" className="hover:text-accent transition-colors text-brand-light/90">Features</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors text-brand-light/90">Mission</Link></li>
              <li><a href="https://chrome.google.com/webstore" className="hover:text-accent transition-colors text-brand-light/90">Web Store</a></li>
              <li><a href="#" className="hover:text-accent transition-colors text-brand-light/90">Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/contact" className="hover:text-accent transition-colors text-brand-light/90">Contact Us</Link></li>
              <li><a href="#" className="hover:text-accent transition-colors text-brand-light/90">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors text-brand-light/90">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors text-brand-light/90">Help Center</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-brand-light/80">
          <p>&copy; {new Date().getFullYear()} Sema Salama. All rights reserved.</p>
          <div className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
            <Mail className="h-4 w-4" />
            <span>hello@semasalama.org</span>
          </div>
        </div>
      </div>
    </footer>
  );
}