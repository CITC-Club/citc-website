import { asc, desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { members, teams } from "@/db/schema";
import MembersTable from "@/app/admin/members/MembersTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPrimaryButton from "@/components/admin/AdminPrimaryButton";
import { sortYearsDesc } from "@/lib/years";

export const dynamic = "force-dynamic";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ team?: string; year?: string }>;
}) {
  const params = await searchParams;

  const allMembers = await db
    .select()
    .from(members)
    .orderBy(desc(members.memberYear), asc(members.name));

  const allTeams = await db.select().from(teams).orderBy(desc(teams.year));
  const teamMap = new Map(allTeams.map((t) => [t.id, t.name]));

  const years = sortYearsDesc(allMembers.map((m) => m.memberYear));

  const initialTeam = params.team || null;
  const initialYear = params.year ? Number(params.year) : null;

  return (
    <div>
      <AdminPageHeader
        title="Members"
        description="Search and filter by year or team. Add members after teams are set up for that year."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Members" },
        ]}
        action={
          <AdminPrimaryButton href="/admin/members/new" icon={<Plus className="w-4 h-4" />}>
            Add member
          </AdminPrimaryButton>
        }
      />

      <div className="bg-white dark:bg-clay-light rounded-2xl border border-stone/60 overflow-hidden shadow-sm">
        <MembersTable
          members={allMembers}
          teams={allTeams}
          teamMap={teamMap}
          years={years}
          initialTeam={initialTeam}
          initialYear={initialYear}
        />
      </div>
    </div>
  );
}
