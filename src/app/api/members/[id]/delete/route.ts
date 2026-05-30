import { eq } from "drizzle-orm";
import { revalidateAfterMemberChange } from "@/lib/revalidate";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { members } from "@/db/schema";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await db.delete(members).where(eq(members.id, Number(id)));
  revalidateAfterMemberChange();
  redirect("/admin/members?flash=deleted");
}
