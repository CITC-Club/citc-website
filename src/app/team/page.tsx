import { db } from "@/db";
import { teams, members } from "@/db/schema";
import { eq } from "drizzle-orm";
import TeamClient from "./TeamClient";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const allTeams = await db.select().from(teams).orderBy(teams.year);
  const allMembers = await db
    .select()
    .from(members)
    .orderBy(members.name);

  const teamData = { teams: allTeams, members: allMembers };
  return <TeamClient teamData={teamData} />;
}
