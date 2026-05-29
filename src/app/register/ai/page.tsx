"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Countdown from "@/components/Countdown";
import ThemeToggle from "@/components/ThemeToggle";

interface TallyWindow extends Window {
  Tally?: { loadEmbeds: () => void };
}

export default function AIRegistrationPage() {
  const TARGET_DATE = new Date("2026-01-29T10:00:00+05:45").getTime();
  const isExpired = Date.now() >= TARGET_DATE;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => {
      if (typeof window !== "undefined" && (window as TallyWindow).Tally) {
        (window as TallyWindow).Tally?.loadEmbeds();
      }
    };
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden py-12 sm:py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      <div className="absolute inset-0 bg-grid opacity-10 dark:opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 dark:from-cyan-500/3 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border border-cyan-400/40 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-medium shadow-lg"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            AI Image Prompting Competition
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent px-2 drop-shadow-lg">
              {!isExpired ? "Physical Round starts in" : "The Arena is Open"}
            </h1>
          </div>

          {!isExpired && (
            <div className="py-4">
              <Countdown targetDate={TARGET_DATE} description="Starts on 26 Jan 2026, Thursday · 10:00 NPT" />
            </div>
          )}

          {isExpired && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto pt-8"
            >
              <div className="backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl overflow-hidden">
                <div className="max-w-2xl mx-auto">
                  <iframe
                    data-tally-src="https://tally.so/embed/KYVEEg?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                    loading="lazy"
                    width="100%"
                    height="645"
                    title="AI Prompt Second Round"
                    className="dark:[color-scheme:dark] transition-colors duration-300"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
