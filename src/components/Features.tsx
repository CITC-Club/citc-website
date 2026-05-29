"use client";

import { Lightbulb, Users, Telescope, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className: string;
  glowColor: string;
  variants: Variants;
}

function SpotlightCard({ children, className, glowColor, variants }: SpotlightCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring" as const, stiffness: 150, damping: 20 }}
      className={`relative overflow-hidden cursor-pointer ${className}`}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 transition-opacity duration-300 opacity-100 z-0"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 70, damping: 16 },
  },
};

export default function Features() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white"
            >
              Driven by <span className="text-gradient">Purpose.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-slate-600 dark:text-slate-400"
            >
              We are more than just a club. We are a movement to revolutionize tech culture at NCIT through three core pillars.
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <SpotlightCard
            variants={cardVariants}
            glowColor="rgba(6, 182, 212, 0.15)"
            className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group min-h-[320px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/10 transition-colors duration-500" />
            <div className="h-full flex flex-col justify-between space-y-12">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-cyan-500/10">
                <Lightbulb className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  Innovation
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg">
                  We foster a culture of creative thinking, encouraging students to turn their unique ideas into tangible projects. From hackathons to project demonstrations, we provide the platform.
                </p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            variants={cardVariants}
            glowColor="rgba(59, 130, 246, 0.15)"
            className="glass-card rounded-3xl p-8 relative overflow-hidden group min-h-[320px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="h-full flex flex-col justify-between space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/10">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  Collaboration
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Connect with like-minded peers, form teams, and work together on exciting tech challenges.
                </p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            variants={cardVariants}
            glowColor="rgba(16, 185, 129, 0.12)"
            className="md:col-span-3 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden group flex flex-col md:flex-row items-center gap-8 md:gap-16 min-h-[220px]"
          >
            <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="shrink-0 w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
              <Telescope className="w-10 h-10" />
            </div>
            <div className="text-center md:text-left flex-grow">
              <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                Growth &amp; Mentorship
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
                Accelerate your professional growth through hands-on workshops, expert mentorship, and real-world experience. We bridge the gap between academia and industry.
              </p>
            </div>
            <div className="ml-auto shrink-0">
              <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
