"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-transform duration-200 ease-out ${
          !isVisible ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="site-container">
          <div
            className={`w-full relative transition-[border-radius,background-color,box-shadow,padding] duration-200 border border-black/[0.03] dark:border-white/[0.03] ${isMobileMenuOpen ? "rounded-[2.5rem]" : "rounded-full"} ${isScrolled || isMobileMenuOpen ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl px-6 py-3" : "bg-white/30 dark:bg-slate-950/20 backdrop-blur-md px-4 py-2 sm:px-6"}`}
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <div className={`relative flex items-center justify-center transition-[width,height] duration-200 ${isScrolled || isMobileMenuOpen ? "w-10 h-10" : "w-12 h-12"}`}>
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
                      className="relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200"
                    >
                      {active && (
                        <span className="absolute inset-0 bg-citc-blue-muted dark:bg-citc-blue/20 rounded-full" />
                      )}
                      <span className={`relative z-10 transition-colors duration-200 ${active ? "text-citc-blue font-semibold" : "text-slate-600 dark:text-slate-400 hover:text-citc-navy dark:hover:text-white"}`}>
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
                  className="px-6 py-2.5 bg-citc-blue text-white font-semibold rounded-full hover:bg-citc-blue/90 transition-colors"
                >
                  <span className="relative flex items-center gap-2">
                    Join Club <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>

              <div className="flex md:hidden items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  aria-expanded={isMobileMenuOpen}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
                <ThemeToggle />
              </div>
            </div>

            {isMobileMenuOpen && (
              <div className="md:hidden">
                <div className="flex flex-col space-y-6 px-4 py-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-xl font-bold transition-colors ${getIsActive(link.href) ? "text-citc-blue" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-8 border-t border-slate-200 dark:border-white/10">
                    <Link
                      href="/join"
                      className="flex items-center justify-center px-8 py-4 bg-citc-blue text-white font-bold rounded-xl w-fit min-w-[200px] hover:bg-citc-blue/90 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join Club Now
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[45] bg-black/10 backdrop-blur-[4px] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        />
      )}
    </>
  );
}
