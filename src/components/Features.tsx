"use client";

import { Lightbulb, Users, Telescope, ArrowUpRight } from "lucide-react";

export default function Features() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Driven by <span className="text-gradient">Purpose.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              We are more than just a club. We are a movement to revolutionize tech culture at NCIT through three core pillars.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group min-h-[320px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="h-full flex flex-col justify-between space-y-12">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-cyan-500/10">
                <Lightbulb className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                  Innovation
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-lg">
                  We foster a culture of creative thinking, encouraging students to turn their unique ideas into tangible projects. From hackathons to project demonstrations, we provide the platform.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 relative overflow-hidden group min-h-[320px]">
            <div className="h-full flex flex-col justify-between space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/10">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  Collaboration
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Connect with like-minded peers, form teams, and work together on exciting tech challenges.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden group flex flex-col md:flex-row items-center gap-8 md:gap-16 min-h-[220px]">
            <div className="shrink-0 w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
              <Telescope className="w-10 h-10" />
            </div>
            <div className="text-center md:text-left flex-grow">
              <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                Growth &amp; Mentorship
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
                Accelerate your professional growth through hands-on workshops, expert mentorship, and real-world experience. We bridge the gap between academia and industry.
              </p>
            </div>
            <div className="ml-auto shrink-0">
              <button
                type="button"
                className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white transition-colors hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black"
                aria-label="Learn more about growth and mentorship"
              >
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
