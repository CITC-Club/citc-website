import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { members, teams } from "@/db/schema";
import { revalidateAfterTeamChange } from "@/lib/revalidate";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const [row] = await db
    .select({ count: count() })
    .from(members)
    .where(eq(members.teamId, id));

  if ((row?.count ?? 0) > 0) {
    return Response.json(
      {
        error:
          "This team still has members. Reassign or delete those members first.",
        code: "team_has_members",
      },
      { status: 400 },
    );
  }

  await db.delete(teams).where(eq(teams.id, id));
  revalidateAfterTeamChange();

  return Response.json({ ok: true });
}
