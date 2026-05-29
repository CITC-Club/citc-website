import { Mail, MapPin } from "lucide-react";
import { Github, Linkedin, Facebook, Instagram } from "./Icons";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { BRAND } from "@/lib/brand";

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
    <footer className="border-t border-slate-200 dark:border-white/5 bg-white dark:bg-citc-navy pt-12 pb-8 sm:pt-16 sm:pb-10">
      <div className="site-container">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-5">
            <Link href="/" className="inline-block">
              <img
                src="/CITCLOGOW.webp"
                alt={SITE_CONFIG.name}
                width={480}
                height={209}
                className="h-10 w-auto sm:h-12 dark:hidden"
              />
              <img
                src="/CITC_LOGOD.webp"
                alt={SITE_CONFIG.name}
                width={480}
                height={209}
                className="h-10 w-auto sm:h-12 hidden dark:block"
              />
            </Link>
            <p className="text-sm font-semibold text-citc-blue">
              {BRAND.tagline}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              {SITE_CONFIG.description}
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {Object.entries(SITE_CONFIG.social).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-citc-blue hover:text-white transition-colors border border-slate-200 dark:border-white/10"
                    aria-label={platform}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-citc-navy dark:text-white mb-4">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-citc-blue transition-colors flex items-center min-h-11 sm:min-h-0"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-citc-navy dark:text-white mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-citc-blue-muted dark:bg-citc-blue/20 flex items-center justify-center shrink-0 border border-citc-blue/10">
                  <Mail className="w-4 h-4 text-citc-blue" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Email
                  </span>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-sm sm:text-base text-slate-700 dark:text-slate-200 hover:text-citc-blue transition-colors font-medium break-all"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-citc-blue-muted dark:bg-citc-blue/20 flex items-center justify-center shrink-0 border border-citc-blue/10">
                  <MapPin className="w-4 h-4 text-citc-blue" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Location
                  </span>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-snug">
                    NCIT, Balkumari, Lalitpur, Nepal
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/5 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            <span className="block sm:inline">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}.
            </span>{" "}
            <span className="block sm:inline mt-1 sm:mt-0">{BRAND.tagline}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
