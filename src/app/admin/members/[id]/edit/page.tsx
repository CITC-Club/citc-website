import { db } from "@/db";
import { members, teams } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import MemberForm from "../../MemberForm";

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

  return (
    <MemberForm
      teams={allTeams}
      member={{
        id: member.id,
        name: member.name,
        type: member.type,
        title: member.title,
        department: member.department,
        email: member.email,
        photo: member.photo,
        memberYear: member.memberYear,
        teamId: member.teamId,
        collegeYear: member.collegeYear,
        socials: member.socials,
      }}
    />
  );
}
