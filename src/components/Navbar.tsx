"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          if (!isMobileMenuOpen) setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
  ];

  const getIsActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 py-4"
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            layout
            transition={{ type: "spring" as const, stiffness: 200, damping: 25 }}
            className={`mx-auto max-w-7xl relative transition-all duration-300 border border-black/[0.03] dark:border-white/[0.03] ${isMobileMenuOpen ? "rounded-[2.5rem]" : "rounded-full"} ${isScrolled || isMobileMenuOpen ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl px-6 py-3" : "bg-white/30 dark:bg-slate-950/20 backdrop-blur-md px-4 py-2 sm:px-6"}`}
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <div className={`relative flex items-center justify-center transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "w-10 h-10" : "w-12 h-12"}`}>
                  <img src="/CITCLOGOW.webp" alt="CITC" width="480" height="209" className="w-full h-full object-contain dark:hidden" fetchPriority="high" />
                  <img src="/CITC_LOGOD.webp" alt="CITC" width="480" height="209" className="w-full h-full object-contain hidden dark:block" fetchPriority="high" />
                </div>
              </Link>

              <div className="hidden md:flex items-center bg-black/5 dark:bg-white/[0.03] rounded-full px-1.5 py-1 border border-black/5 dark:border-white/[0.05]">
                {navLinks.map((link) => {
                  const active = getIsActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300"
                    >
                      {active && (
                        <motion.span
                          layoutId="active-pill"
                          className="absolute inset-0 bg-rose-50 dark:bg-rose-500/10 rounded-full"
                          transition={{ type: "spring" as const, stiffness: 350, damping: 25 }}
                        />
                      )}
                      <span className={`relative z-10 transition-colors duration-300 ${active ? "text-rose-600 dark:text-rose-400 font-semibold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                        {link.name}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="hidden md:flex items-center gap-4">
                <ThemeToggle />
                <Link
                  href="/join"
                  className="group relative px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-full overflow-hidden hover:bg-slate-800 dark:hover:bg-cyan-50 transition-colors"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  <span className="relative flex items-center gap-2">
                    Join Club <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              <div className="flex md:hidden items-center gap-3">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all active:scale-90"
                >
                  {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
                <ThemeToggle />
              </div>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring" as const, stiffness: 200, damping: 22 }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="flex flex-col space-y-6 px-4 py-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-xl font-bold transition-all ${getIsActive(link.href) ? "text-rose-600 dark:text-rose-500 translate-x-1" : "text-slate-700 dark:text-slate-300 hover:translate-x-1"}`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="pt-8 border-t border-rose-100 dark:border-rose-900/10">
                      <Link
                        href="/join"
                        className="flex items-center justify-center px-8 py-4 bg-rose-600 text-white font-bold rounded-2xl shadow-xl shadow-rose-500/20 w-fit min-w-[200px]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Join Club Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[45] bg-black/10 backdrop-blur-[4px] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
