import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { members, teams } from "@/db/schema";
import MemberForm from "@/app/admin/members/MemberForm";

export const dynamic = "force-dynamic";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [member] = await db
    .select()
    .from(members)
    .where(eq(members.id, Number(id)));

  if (!member) notFound();

  const allTeams = await db.select().from(teams).orderBy(teams.year);

  return <MemberForm teams={allTeams} member={member} />;
}
