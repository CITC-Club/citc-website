import { db } from "@/db";
import { members, teams } from "@/db/schema";
import { eq, desc, asc } from "drizzle-orm";
import Link from "next/link";
import { Plus } from "lucide-react";
import MembersTable from "./MembersTable";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const allMembers = await db
    .select()
    .from(members)
    .orderBy(desc(members.memberYear), asc(members.name));

  const allTeams = await db.select().from(teams).orderBy(desc(teams.year));
  const teamMap = new Map(allTeams.map((t) => [t.id, t.name]));

  const years = [...new Set(allMembers.map((m) => m.memberYear))].sort((a, b) => b - a);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Members</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage all club members across different years
          </p>
        </div>
        <Link
          href="/admin/members/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Member
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <MembersTable members={allMembers} teams={allTeams} teamMap={teamMap} years={years} />
      </div>
    </div>
  );
}
