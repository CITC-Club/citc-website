import { db } from "@/db";
import { members, events, teams } from "@/db/schema";
import { count, desc } from "drizzle-orm";
import Link from "next/link";

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
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Overview of your CITC website content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{memberCount.count}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total Members</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{eventCount.count}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total Events</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{teamCount.count}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Teams</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Recent Members</h2>
          </div>
          <div className="p-2">
            {recentMembers.map((m) => (
              <Link
                key={m.id}
                href={`/admin/members/${m.id}/edit`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{m.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{m.memberYear} &middot; {m.type}</p>
                </div>
              </Link>
            ))}
            {recentMembers.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-6">No members yet</p>
            )}
          </div>
          <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/admin/members/new"
              className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700"
            >
              + Add Member
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-2">
            <Link
              href="/admin/members/new"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-sm text-slate-900 dark:text-white">Add new member</span>
              <span className="text-xs text-slate-400 ml-auto">Create</span>
            </Link>
            <Link
              href="/admin/events/new"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-sm text-slate-900 dark:text-white">Create new event</span>
              <span className="text-xs text-slate-400 ml-auto">Create</span>
            </Link>
            <Link
              href="/admin/teams"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-sm text-slate-900 dark:text-white">Manage teams &amp; years</span>
              <span className="text-xs text-slate-400 ml-auto">Manage</span>
            </Link>
            <Link
              href="/admin/members"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-sm text-slate-900 dark:text-white">View all members</span>
              <span className="text-xs text-slate-400 ml-auto">Browse</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
