import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.delete(events).where(eq(events.id, id));
  revalidatePath("/events");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}
