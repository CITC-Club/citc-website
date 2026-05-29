import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { BRAND } from "@/lib/brand";
import { resolveMediaUrl } from "@/lib/media";
import type { Event } from "@/types";

interface HeroProps {
  featuredEvent: Event | null;
  recentEvents: Event[];
  memberCount: number;
  eventCount: number;
}

export default function Hero({
  featuredEvent,
  recentEvents,
  memberCount,
  eventCount,
}: HeroProps) {
  const galleryEvents = recentEvents.filter((e) => e.image).slice(0, 3);

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 px-3 sm:px-4 bg-white dark:bg-citc-navy overflow-hidden">
      <div className="site-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <p className="inline-block text-sm font-semibold tracking-wide text-citc-blue uppercase">
              {BRAND.tagline}
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[2.75rem] font-bold tracking-tight text-citc-navy dark:text-white leading-tight text-balance max-w-4xl mx-auto lg:mx-0">
              {SITE_CONFIG.fullName}
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              A student-led tech club at NCIT. Workshops, hackathons, and projects run by
              students who learn together and build together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-citc-blue text-white font-semibold rounded-lg hover:bg-citc-blue/90 transition-colors"
              >
                Join the Club
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-citc-navy dark:text-white font-medium border border-slate-200 dark:border-white/15 rounded-lg hover:border-citc-blue/40 transition-colors"
              >
                See Events
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0 w-full sm:max-w-md">
              <Link
                href="/team"
                className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-4 text-center hover:border-citc-blue/30 transition-colors"
              >
                <p className="text-3xl font-bold text-citc-blue tabular-nums leading-none">
                  {memberCount}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  Members
                </p>
              </Link>
              <Link
                href="/events"
                className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-4 text-center hover:border-citc-blue/30 transition-colors"
              >
                <p className="text-3xl font-bold text-citc-blue tabular-nums leading-none">
                  {eventCount}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  Events
                </p>
              </Link>
            </div>
          </div>

          {galleryEvents.length > 0 && (
            <div className="space-y-4">
              {featuredEvent?.image && (
                <Link
                  href={`/events/${featuredEvent.id}`}
                  className="block relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg group"
                >
                  <img
                    src={resolveMediaUrl(featuredEvent.image)}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/media/og-team.avif";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-citc-navy/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-xs font-medium text-citc-blue-muted uppercase tracking-wider mb-1">
                      Latest event
                    </p>
                    <p className="text-white font-semibold text-lg line-clamp-2">
                      {featuredEvent.title}
                    </p>
                  </div>
                </Link>
              )}
              {galleryEvents.length > 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {galleryEvents.slice(1).map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 group"
                    >
                      <img
                        src={resolveMediaUrl(event.image)}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/media/og-team.avif";
                        }}
                      />
                      <div className="absolute inset-0 bg-citc-navy/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
