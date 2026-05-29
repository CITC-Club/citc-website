import { count, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { members, teams } from "@/db/schema";
import TeamsManager from "./TeamsManager";

export const dynamic = "force-dynamic";

export default async function TeamsPage() {
  const allTeams = await db.select().from(teams).orderBy(desc(teams.year));
  const memberCounts = await db
    .select({ teamId: members.teamId, count: count() })
    .from(members)
    .groupBy(members.teamId);

  const countMap = new Map(memberCounts.map((c) => [c.teamId, c.count]));
  const years = [...new Set(allTeams.map((t) => t.year))].sort((a, b) => b - a);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Teams
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage teams for each academic year
          </p>
        </div>
      </div>

      <TeamsManager teams={allTeams} countMap={countMap} years={years} />
    </div>
  );
}
