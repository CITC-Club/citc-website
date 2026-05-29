import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

const tiles = [
  {
    href: "/events",
    layout: "md:col-start-1 md:row-start-1 md:row-span-2",
    eyebrow: "Workshops",
    title: "Multi-day sessions in the lab",
    body: "Embedded systems, IoT, and web builds. Recent workshops ran in NCIT Room 125.",
    cta: "Past events",
    featured: true,
    image: "/event/003/IoTExpo2082.png",
  },
  {
    href: "/events",
    layout: "md:col-start-2 md:col-span-2 md:row-start-1",
    eyebrow: "Competitions",
    title: "Club-run contests",
    body: "Structured challenges like Prompt to Image with real judging and prizes.",
    cta: "See results",
    featured: false,
  },
  {
    href: "/team",
    layout: "md:col-start-2 md:row-start-2",
    eyebrow: "People",
    title: "Students who organize it",
    body: "Mentors, executives, and advisors from comp eng who book the room and run the night.",
    cta: "Meet the team",
    featured: false,
  },
  {
    href: "/join",
    layout: "md:col-start-3 md:row-start-2",
    eyebrow: "Join",
    title: "Open to NCIT students",
    body: "Show up for the next workshop or competition. No prior club membership required.",
    cta: "Sign up",
    featured: false,
  },
] as const;

export default function HomeAbout() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-white text-citc-navy dark:border-white/10 dark:bg-citc-navy dark:text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-35"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,82,204,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,82,204,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-citc-blue/10 blur-3xl dark:bg-citc-blue/20"
        aria-hidden
      />

      <div className="relative site-container py-20 md:py-28">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-citc-blue">
            Since {SITE_CONFIG.foundingDate} · NCIT
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-balance md:text-4xl">
            Build skills outside the timetable
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
            {SITE_CONFIG.name} is run by computer engineering students. You show up to make
            something, not to sit through another slide deck.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:grid-rows-2 md:gap-4 md:min-h-[26rem] lg:min-h-[28rem]">
          {tiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className={`group relative flex h-full min-h-[11rem] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-citc-blue/40 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-citc-blue/50 dark:hover:bg-white/[0.07] md:p-7 ${tile.layout}`}
            >
              {tile.featured && tile.image ? (
                <>
                  <img
                    src={tile.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.12] transition-opacity group-hover:opacity-[0.18] dark:opacity-20 dark:group-hover:opacity-25"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/92 to-slate-50/55 dark:from-citc-navy dark:via-citc-navy/88 dark:to-citc-navy/45"
                    aria-hidden
                  />
                </>
              ) : null}

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wider text-citc-blue">
                  {tile.eyebrow}
                </p>
                <h3
                  className={`mt-2 font-bold text-citc-navy dark:text-white ${tile.featured ? "text-xl md:text-2xl" : "text-lg"}`}
                >
                  {tile.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-[0.9375rem]">
                  {tile.body}
                </p>
              </div>

              <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-citc-blue transition-colors group-hover:text-citc-navy dark:group-hover:text-white">
                {tile.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-500">
          Questions?{" "}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="font-medium text-citc-blue transition-colors hover:text-citc-navy dark:hover:text-white"
          >
            {SITE_CONFIG.email}
          </a>
        </p>
      </div>
    </section>
  );
}
