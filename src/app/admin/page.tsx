import { db } from "@/db";
import { members, events, teams } from "@/db/schema";
import { count, desc } from "drizzle-orm";
import Link from "next/link";
import { Users, Calendar, Layers, Plus, ArrowUpRight } from "lucide-react";

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

  const recentEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.createdAt))
    .limit(5);

  const stats = [
    {
      label: "Total Members",
      value: memberCount.count,
      icon: Users,
      href: "/admin/members",
      color: "bg-cyan-500",
      bg: "bg-cyan-50 dark:bg-cyan-900/20",
    },
    {
      label: "Active Events",
      value: eventCount.count,
      icon: Calendar,
      href: "/admin/events",
      color: "bg-rose-500",
      bg: "bg-rose-50 dark:bg-rose-900/20",
    },
    {
      label: "Teams",
      value: teamCount.count,
      icon: Layers,
      href: "/admin/teams",
      color: "bg-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color.split("-")[1]}-600 dark:text-${stat.color.split("-")[1]}-400`} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/members/new"
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-200 dark:border-cyan-900/30 hover:bg-cyan-100 dark:hover:bg-cyan-900/20 transition-colors"
            >
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <span className="text-sm font-medium text-cyan-700 dark:text-cyan-400">Add Member</span>
            </Link>
            <Link
              href="/admin/events/new"
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-colors"
            >
              <div className="w-10 h-10 bg-rose-500/10 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <span className="text-sm font-medium text-rose-700 dark:text-rose-400">Add Event</span>
            </Link>
            <Link
              href="/admin/teams"
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-colors"
            >
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Manage Teams</span>
            </Link>
            <Link
              href="/"
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="w-10 h-10 bg-slate-500/10 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-400">View Site</span>
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Recent Members</h2>
          <div className="space-y-4">
            {recentMembers.map((m) => (
              <Link
                key={m.id}
                href={`/admin/members/${m.id}/edit`}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{m.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{m.memberYear} · {m.type}</p>
                </div>
              </Link>
            ))}
            {recentMembers.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No members yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Recent Events</h2>
        <div className="space-y-4">
          {recentEvents.map((e) => (
            <Link
              key={e.id}
              href={`/admin/events/${e.id}/edit`}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-14 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                {e.image && (
                  <img src={e.image} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{e.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{e.date} · {e.status}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                e.status === "running" ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" :
                e.status === "upcoming" ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400" :
                "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}>
                {e.status}
              </span>
            </Link>
          ))}
          {recentEvents.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-4">No events yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
