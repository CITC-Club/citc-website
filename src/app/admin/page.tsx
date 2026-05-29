import { db } from "@/db";
import { members, events, teams } from "@/db/schema";
import { count, desc } from "drizzle-orm";
import Link from "next/link";
import { Users, Calendar, Layers, Sparkles, ArrowRight, UserPlus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [memberCount] = await db.select({ count: count() }).from(members);
  const [eventCount] = await db.select({ count: count() }).from(events);
  const [teamCount] = await db.select({ count: count() }).from(teams);

  const recentMembers = await db
    .select()
    .from(members)
    .orderBy(desc(members.createdAt))
    .limit(5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Overview of your CITC website content and metrics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Members */}
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden">
          <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Total Members
              </p>
              <h3 className="text-3xl font-extrabold text-slate-950 dark:text-white mt-2 tracking-tight">
                {memberCount.count}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 shadow-sm border border-cyan-100/50 dark:border-cyan-900/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-405 dark:text-slate-500">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
              Active
            </span>
            <span>registered portal users</span>
          </div>
        </div>

        {/* Card 2: Events */}
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden">
          <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/10 dark:group-hover:bg-rose-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Total Events
              </p>
              <h3 className="text-3xl font-extrabold text-slate-950 dark:text-white mt-2 tracking-tight">
                {eventCount.count}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0 shadow-sm border border-rose-100/50 dark:border-rose-900/30">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-405 dark:text-slate-500">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-semibold text-[10px]">
              All-time
            </span>
            <span>workshops & seminars</span>
          </div>
        </div>

        {/* Card 3: Teams */}
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden">
          <div className="absolute right-0 top-0 -mt-4 -mr-4 w-24 h-24 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/10 dark:group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Active Teams
              </p>
              <h3 className="text-3xl font-extrabold text-slate-950 dark:text-white mt-2 tracking-tight">
                {teamCount.count}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-sm border border-amber-100/50 dark:border-amber-900/30">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-405 dark:text-slate-500">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-semibold text-[10px]">
              Tiers
            </span>
            <span>divisions managed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Members Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                Recent Members
              </h2>
            </div>
            <div className="p-3 space-y-1">
              {recentMembers.map((m) => {
                const avatarGradients: Record<string, string> = {
                  Executive: "from-cyan-400 to-blue-500 text-white",
                  Faculty: "from-purple-400 to-indigo-500 text-white",
                  Mentor: "from-emerald-400 to-teal-500 text-white",
                  Patron: "from-amber-400 to-orange-500 text-white",
                };
                const bgClass = avatarGradients[m.type] || "from-slate-400 to-slate-500 text-white";

                return (
                  <Link
                    key={m.id}
                    href={`/admin/members/${m.id}/edit`}
                    className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all duration-200 group"
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${bgClass} flex items-center justify-center text-xs font-bold shrink-0 shadow-sm`}>
                      {m.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                        {m.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>Year {m.memberYear}</span>
                        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {m.type}
                        </span>
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:translate-x-0.5 group-hover:text-slate-550 dark:group-hover:text-slate-400 transition-all opacity-0 group-hover:opacity-100" />
                  </Link>
                );
              })}
              {recentMembers.length === 0 && (
                <div className="text-center py-12 text-slate-400 dark:text-slate-650 flex flex-col items-center justify-center gap-2">
                  <Users className="w-8 h-8 text-slate-300 dark:text-slate-700" />
                  <p className="text-sm">No members registered yet</p>
                </div>
              )}
            </div>
          </div>
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10">
            <Link
              href="/admin/members/new"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
            >
              <UserPlus className="w-4 h-4" /> Add New Member
            </Link>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              Quick Actions
            </h2>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <Link
              href="/admin/members/new"
              className="flex flex-col justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-cyan-500/30 hover:bg-cyan-50/10 dark:hover:bg-cyan-950/10 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-3 border border-cyan-100/50 dark:border-cyan-900/20 group-hover:scale-105 transition-transform shrink-0">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">New Member</h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-normal">
                  Register a member under a team and year
                </p>
              </div>
            </Link>

            <Link
              href="/admin/events/new"
              className="flex flex-col justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-rose-500/30 hover:bg-rose-50/10 dark:hover:bg-rose-950/10 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-3 border border-rose-100/50 dark:border-rose-900/20 group-hover:scale-105 transition-transform shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">New Event</h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-normal">
                  Publish workshops, contests, or seminars
                </p>
              </div>
            </Link>

            <Link
              href="/admin/teams"
              className="flex flex-col justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-amber-500/30 hover:bg-amber-50/10 dark:hover:bg-amber-950/10 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3 border border-amber-100/50 dark:border-amber-900/20 group-hover:scale-105 transition-transform shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Manage Teams</h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-normal">
                  Configure team tiers for academic years
                </p>
              </div>
            </Link>

            <Link
              href="/admin/members"
              className="flex flex-col justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-indigo-500/30 hover:bg-indigo-50/10 dark:hover:bg-indigo-950/10 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 border border-indigo-100/50 dark:border-indigo-900/20 group-hover:scale-105 transition-transform shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Browse Registry</h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-normal">
                  Search, filter, edit, or delete members
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
