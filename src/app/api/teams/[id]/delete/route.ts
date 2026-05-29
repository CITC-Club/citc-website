import { db } from "@/db";
import { teams, members } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await db.delete(members).where(eq(members.teamId, id));
  await db.delete(teams).where(eq(teams.id, id));

  revalidatePath("/team");
  revalidatePath("/admin/teams");
  revalidatePath("/admin/members");
  redirect("/admin/teams");
}
