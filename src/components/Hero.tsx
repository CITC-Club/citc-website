import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import { BRAND } from "@/lib/brand";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[min(92vh,880px)] flex items-center">
      <div className="absolute inset-0" aria-hidden>
        <img
          src="/media/og-team.avif"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-[0.38] dark:opacity-[0.28]"
          fetchPriority="high"
        />
      </div>

      {/* Centered readability wash + blue corner accents */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_42%,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.82)_45%,rgba(255,255,255,0.35)_100%)] dark:bg-[radial-gradient(ellipse_85%_75%_at_50%_42%,rgba(5,10,24,0.97)_0%,rgba(5,10,24,0.88)_45%,rgba(5,10,24,0.45)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-citc-blue/40 via-transparent to-citc-blue/25 dark:from-citc-blue/45 dark:to-citc-blue/30"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 left-1/2 h-[min(80vw,600px)] w-[min(80vw,600px)] -translate-x-1/2 rounded-full bg-citc-blue/15 blur-3xl dark:bg-citc-blue/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-b from-transparent via-white/70 to-white sm:h-40 sm:via-white/80 dark:via-citc-navy/70 dark:to-citc-navy"
        aria-hidden
      />

      <div className="relative z-10 flex w-full justify-center site-container py-28 md:py-36">
        <div className="mx-auto w-full max-w-xl text-center sm:max-w-2xl lg:max-w-3xl">
          <div className="flex flex-col gap-4 sm:gap-5">
            <p className="text-sm font-semibold tracking-wide text-citc-blue uppercase">
              {BRAND.tagline}
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-5xl font-bold tracking-tight text-citc-navy dark:text-white leading-[1.15] text-balance mx-auto">
              {SITE_CONFIG.fullName}
            </h1>

            <p className="mx-auto max-w-prose text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              A student-led tech club at NCIT. Workshops, hackathons, and projects run by
              students who learn together and build together.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 grid w-full max-w-md mx-auto grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-lg">
            <Link
              href="/join"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-citc-blue px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-citc-blue/90 sm:px-8"
            >
              Join the Club
              <ArrowRight className="h-5 w-5 shrink-0" />
            </Link>
            <Link
              href="/events"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200/80 bg-white/75 px-6 py-3.5 font-medium text-citc-navy backdrop-blur-sm transition-colors hover:border-citc-blue/40 dark:border-white/20 dark:bg-white/10 dark:text-white sm:px-8"
            >
              See Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
