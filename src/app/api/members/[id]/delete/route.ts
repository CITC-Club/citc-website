import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { members } from "@/db/schema";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await db.delete(members).where(eq(members.id, Number(id)));
  revalidatePath("/team");
  revalidatePath("/admin/members");
  redirect("/admin/members");
}
