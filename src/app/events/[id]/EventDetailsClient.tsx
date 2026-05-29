"use client";

import { Calendar, MapPin, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Event } from "@/types";

interface EventDetailsClientProps {
  event: Event;
}

export default function EventDetailsClient({ event }: EventDetailsClientProps) {
  const isRunning = event.status === "running";

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white dark:bg-[#0f172a] transition-colors duration-300">
      <div className="h-10" />
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent" />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 container mx-auto">
          <Link href="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            {event.tags?.map((tag) => (
              <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-100 backdrop-blur-md border border-cyan-500/30">
                {tag}
              </span>
            ))}
            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${isRunning ? "bg-red-500 text-white animate-pulse" : "bg-slate-700 text-slate-200"}`}>
              {event.status}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12">
          <div className="order-1 lg:order-2 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-white/10 sticky top-24 shadow-sm dark:shadow-none">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Event Details</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Date</p>
                    <p className="text-slate-900 dark:text-slate-200 font-semibold">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Time</p>
                    <p className="text-slate-900 dark:text-slate-200 font-semibold">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Location</p>
                    <p className="text-slate-900 dark:text-slate-200 font-semibold">{event.location}</p>
                  </div>
                </div>
              </div>

              {isRunning && event.registrationLink && (
                <div className="mt-8">
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 dark:bg-cyan-500 px-6 py-4 text-white font-bold transition-all hover:bg-cyan-700 dark:hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1"
                  >
                    Register Now <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="order-2 lg:order-1 lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">
                About the Event
              </h2>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {event.description}
                </ReactMarkdown>
              </div>
            </div>

            {event.gallery && event.gallery.length > 0 && (
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Event Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.gallery.map((img, index) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden group">
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
