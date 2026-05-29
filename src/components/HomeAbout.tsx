import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";

const activities = [
  {
    label: "01",
    title: "Workshops in the lab",
    body: "Multi-day builds on embedded systems, IoT, and web. Recent runs filled NCIT Room 125.",
  },
  {
    label: "02",
    title: "Club-run competitions",
    body: "Contests like Prompt to Image: structured prompts, real judging, prizes for NCIT students.",
  },
  {
    label: "03",
    title: "Projects between semesters",
    body: "Hackathons and build nights when you want a team, not another solo assignment.",
  },
];

export default function HomeAbout() {
  return (
    <section className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-citc-navy">
      <div className="site-container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div className="max-w-lg">
            <p className="text-sm font-semibold text-citc-blue">
              Student club · NCIT · Since {SITE_CONFIG.foundingDate}
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-citc-navy dark:text-white md:text-3xl">
              Build skills outside the timetable.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {SITE_CONFIG.name} is run by computer engineering students who organize the
              sessions, find mentors, and keep the room booked. You show up to make something,
              not to sit through slides.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/join"
                className="inline-flex items-center justify-center rounded-lg bg-citc-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-citc-navy/90 dark:bg-white dark:text-citc-navy dark:hover:bg-white/90"
              >
                Join the club
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-citc-navy transition-colors hover:border-citc-blue dark:border-white/20 dark:text-white dark:hover:border-citc-blue/50"
              >
                See what we ran
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center justify-center px-2 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-citc-blue dark:text-slate-400"
              >
                Meet the team
              </Link>
            </div>
          </div>

          <ul className="border-t border-slate-200 dark:border-white/10 lg:border-t-0 lg:border-l lg:pl-12">
            {activities.map((item, index) => (
              <li
                key={item.label}
                className={`py-6 ${index === 0 ? "pt-0 lg:pt-0" : ""} ${
                  index < activities.length - 1
                    ? "border-b border-slate-200 dark:border-white/10"
                    : ""
                }`}
              >
                <span className="font-mono text-xs font-medium tabular-nums text-citc-blue">
                  {item.label}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-citc-navy dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
