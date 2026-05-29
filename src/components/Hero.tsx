"use client";

import { ArrowRight, Code2, Users, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 90, damping: 18 },
  },
};

const badgeVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 px-3 sm:px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />

      <div className="container relative z-10 mx-auto px-3 sm:px-4">
        <motion.div
          className="flex flex-col items-center text-center space-y-6 sm:space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={badgeVariants}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-cyan-100/50 dark:bg-cyan-950/30 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-sm flex-wrap justify-center cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="font-semibold">Innovate. Connect. Transform.</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] flex flex-col gap-2"
          >
            <span className="flex items-center gap-4 flex-wrap justify-center">
              <span>Computer Engineering Innovation</span>
              <motion.img
                src="/&nobg.webp"
                alt="&"
                width="240"
                height="280"
                className="w-12 md:w-16 lg:w-20 shrink-0"
                fetchPriority="high"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring" as const, stiffness: 200, damping: 10 }}
              />
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 relative py-2">
              Tech Club
              <span className="absolute -inset-1 bg-cyan-500/20 blur-2xl -z-10 opacity-50" />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Join the premier student community at NCIT. Where lines of code turn into
            <span className="text-slate-900 dark:text-slate-200 font-medium"> innovation</span> and students become
            <span className="text-slate-900 dark:text-slate-200 font-medium"> leaders</span>.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link href="/join">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-white text-slate-900 font-bold rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 transition-shadow hover:shadow-cyan-500/10"
              >
                <span className="relative flex items-center gap-2">
                  Join the Club <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <Link href="/events">
              <motion.button
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 text-slate-900 dark:text-white font-medium hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-2 group"
              >
                Explore Events
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-cyan-100 dark:group-hover:bg-cyan-500/20 transition-colors">
                  <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 pt-12 border-t border-slate-200 dark:border-white/5 w-full max-w-4xl"
          >
            {[
              { label: "Active Members", value: "15+", icon: Users },
              { label: "Events Hosted", value: "3+", icon: Calendar },
              { label: "Projects Built", value: "3+", icon: Code2 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <stat.icon className="w-6 h-6 text-slate-500 transition-colors group-hover:text-cyan-500 mb-2" />
                <span className="text-3xl font-bold text-slate-900 dark:text-white transition-transform duration-300">
                  {stat.value}
                </span>
                <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
