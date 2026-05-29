import Link from "next/link";
import { ArrowRight, Cpu, Users, Wrench } from "lucide-react";

const pillars = [
  {
    icon: Wrench,
    title: "Hands-on learning",
    description:
      "Workshops and build sessions on web, embedded systems, AI, and more.",
  },
  {
    icon: Users,
    title: "Student community",
    description:
      "Connect with peers across college years who share your interest in tech.",
  },
  {
    icon: Cpu,
    title: "Real projects",
    description:
      "Hackathons, club projects, and competitions you can join and learn from.",
  },
];

export default function HomeAbout() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-citc-navy/50 border-t border-slate-200 dark:border-white/5">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-citc-navy dark:text-white mb-3">
            What we do
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            CITC is the home for computer engineering students who want to build skills
            outside the classroom. Event photos and schedules live on the Events page.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-citc-navy p-6 text-center md:text-left"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-citc-blue-muted dark:bg-citc-blue/20 text-citc-blue mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-citc-navy dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-citc-blue font-semibold hover:underline"
          >
            Browse all events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
