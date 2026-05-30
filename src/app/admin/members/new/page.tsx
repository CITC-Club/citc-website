import { db } from "@/db";
import { teams } from "@/db/schema";
import MemberForm from "@/app/admin/members/MemberForm";

export const dynamic = "force-dynamic";

export default async function NewMemberPage() {
  const allTeams = await db.select().from(teams).orderBy(teams.year);
  return <MemberForm teams={allTeams} />;
}
