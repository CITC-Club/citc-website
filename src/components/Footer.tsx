import { Mail, MapPin, ArrowRight } from "lucide-react";
import { Github, Linkedin, Facebook, Instagram } from "./Icons";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Our Team", path: "/team" },
  { name: "Join Club", path: "/join" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#020617] pt-24 pb-12 overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-5 pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          <div className="space-y-8">
            <div className="group inline-block">
              <div className="flex items-center gap-3">
                <div className="relative w-40 h-40">
                  <img src="/CITCLOGOW.webp" alt="CITC" width="480" height="209" className="w-full h-full object-contain dark:hidden" />
                  <img src="/CITC_LOGOD.webp" alt="CITC" width="480" height="209" className="w-full h-full object-contain hidden dark:block" />
                </div>
              </div>
              <p className="text-[18px] font-mono font-bold tracking-[0.2em] text-cyan-600 dark:text-rose-500 uppercase">
                EST. 2025
              </p>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Fostering a culture of innovation and excellence in computer engineering at NCIT. Join us to transform ideas into reality.
            </p>
            <div className="flex items-center gap-3">
              {Object.entries(SITE_CONFIG.social).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-600 transition-all duration-300 border border-slate-200 dark:border-white/5 shadow-sm"
                    aria-label={platform}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-900 dark:text-white mb-8 border-l-2 border-rose-500 pl-4">
              Navigation
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all flex items-center gap-2 group w-fit"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-slate-900 dark:text-white mb-8 border-l-2 border-rose-500 pl-4">
              Get in Touch
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-slate-400 group">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/5 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors border border-cyan-500/10 dark:border-cyan-500/20">
                  <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address</span>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-slate-700 dark:text-slate-200 hover:text-rose-500 dark:hover:text-rose-400 transition-colors font-medium"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 text-slate-400 group">
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 dark:bg-orange-500/5 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors border border-orange-500/10 dark:border-orange-500/20">
                  <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Our Location</span>
                  <span className="text-slate-700 dark:text-slate-200 font-medium leading-tight">
                    NCIT, Balkumari,<br />Lalitpur, Nepal
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-slate-500 dark:text-slate-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} CITC. Crafted for Innovation.
          </p>
        </div>
      </div>
    </footer>
  );
}
