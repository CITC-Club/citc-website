import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { BRAND } from "@/lib/brand";

interface HeroProps {
  memberCount: number;
  eventCount: number;
}

export default function Hero({ memberCount, eventCount }: HeroProps) {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-white dark:bg-citc-navy">
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 sm:gap-8 order-2 lg:order-1 text-center lg:text-left lg:py-4">
            <p className="text-sm font-semibold tracking-wide text-citc-blue uppercase">
              {BRAND.tagline}
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-5xl font-bold tracking-tight text-citc-navy dark:text-white leading-[1.15] text-balance">
              {SITE_CONFIG.fullName}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A student-led tech club at NCIT. Workshops, hackathons, and projects run by
              students who learn together and build together.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-citc-blue text-white font-semibold rounded-lg hover:bg-citc-blue/90 transition-colors"
              >
                Join the Club
                <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-citc-navy dark:text-white font-medium border border-slate-200 dark:border-white/15 rounded-lg hover:border-citc-blue/40 transition-colors"
              >
                See Events
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto lg:mx-0">
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

          <div className="order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg bg-slate-100 dark:bg-white/5">
              <img
                src="/media/og-team.avif"
                alt="CITC members at NCIT"
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
