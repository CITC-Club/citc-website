"use client";

import { memo } from "react";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isRunning = event.status === "running";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-citc-navy border border-slate-200 dark:border-white/10 shadow-sm transition-colors hover:border-citc-blue/30">
      <Link href={`/events/${event.id}`} className="block h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <MediaImage
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-citc-navy/80 to-transparent" />

          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isRunning
                ? "bg-citc-blue text-white"
                : "bg-slate-800/80 text-white backdrop-blur-sm"
            }`}
          >
            {event.status}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {event.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2 py-1 rounded-md bg-citc-blue-muted text-citc-blue dark:bg-citc-blue/20 dark:text-citc-blue-muted border border-citc-blue/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold text-citc-navy dark:text-white mb-2 line-clamp-2 group-hover:text-citc-blue transition-colors">
              {event.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
              {event.description.replace(/[#*_\[\]()~`>]/g, "").substring(0, 150)}
            </p>
          </div>

          <div className="mt-auto space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4 text-citc-blue" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4 text-citc-blue" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <MapPin className="w-4 h-4 text-citc-blue" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </Link>

      {isRunning && event.registrationLink && (
        <div className="px-6 pb-6 mt-auto">
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-citc-blue px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-citc-blue/90 relative z-10"
          >
            Register Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};

export default memo(EventCard);
