import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { resolveMediaUrl } from "@/lib/media";
import type { Event } from "@/types";

interface HomeEventsProps {
  events: Event[];
}

export default function HomeEvents({ events }: HomeEventsProps) {
  if (events.length === 0) return null;

  return (
    <section id="events" className="py-20 md:py-28 bg-slate-50 dark:bg-citc-navy/80 border-t border-slate-200 dark:border-white/5">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-citc-navy dark:text-white">
              Recent events
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Real workshops and competitions from our club, with photos and details from each event.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-citc-blue font-semibold hover:underline w-fit"
          >
            View all events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-citc-navy border border-slate-200 dark:border-white/10 shadow-sm hover:border-citc-blue/30 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/5">
                <img
                  src={resolveMediaUrl(event.image)}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex flex-wrap gap-2">
                  {event.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-0.5 rounded-md bg-citc-blue-muted text-citc-blue dark:bg-citc-blue/20 dark:text-citc-blue-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-citc-navy dark:text-white line-clamp-2 group-hover:text-citc-blue transition-colors">
                  {event.title}
                </h3>
                <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-auto">
                  <Calendar className="w-4 h-4 text-citc-blue shrink-0" />
                  {event.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
