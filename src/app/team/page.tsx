import type { Metadata } from "next";
import { db } from "@/db";
import { teams, members } from "@/db/schema";
import { createPageMetadata } from "@/lib/seo";
import TeamClient from "./TeamClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Meet the Team | CITC",
  description:
    "Meet CITC mentors, executives, and advisors at Nepal College of Information Technology. Browse rosters by academic year.",
  path: "/team",
  ogImagePath: "/team/opengraph-image",
});

export default async function TeamPage() {
  const allTeams = await db
    .select()
    .from(teams)
    .orderBy(teams.year);
  const allMembers = await db
    .select()
    .from(members)
    .orderBy(members.name);

  const teamData = { teams: allTeams, members: allMembers };
  return <TeamClient teamData={teamData} />;
}
