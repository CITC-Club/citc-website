"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, History } from "lucide-react";
import EventCard from "@/components/EventCard";
import type { Event } from "@/types";

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

interface EventsClientProps {
  events: Event[];
}

export default function EventsClient({ events }: EventsClientProps) {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const years = [...new Set(events.map((e) => e.academicYear || 2025))].sort((a, b) => b - a);

  const filteredEvents = activeYear
    ? events.filter((e) => (e.academicYear || 2025) === activeYear)
    : events;

  const runningEvents = filteredEvents.filter((e) => e.status === "running");
  const upcomingEvents = filteredEvents.filter((e) => e.status === "upcoming");
  const pastEvents = filteredEvents.filter((e) => e.status === "past");

  const activeEvents = [...runningEvents, ...upcomingEvents];

  return (
    <div className="min-h-screen pt-40 pb-20 bg-white dark:bg-[#0f172a] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 dark:from-white dark:via-cyan-100 dark:to-cyan-200 mb-6">
            Events &amp; Workshops
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Join us in our upcoming events or take a look at what we&apos;ve accomplished so far.
          </p>
        </div>

        {years.length > 1 && (
          <div className="flex justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveYear(null)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!activeYear ? "bg-cyan-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
            >
              All Years
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeYear === year ? "bg-cyan-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        {activeEvents.length > 0 ? (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center min-w-max">
                <Calendar className="w-8 h-8 text-cyan-500" /> Running &amp; Upcoming
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            </div>
            <motion.div
              variants={gridContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {activeEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          </section>
        ) : (
          !pastEvents.length && (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400">No events found for this academic year.</p>
            </div>
          )
        )}

        {pastEvents.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
              <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-slate-600 dark:text-slate-400 text-center min-w-max">
                <History className="w-8 h-8" /> Past Events
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent" />
            </div>
            <motion.div
              variants={gridContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
