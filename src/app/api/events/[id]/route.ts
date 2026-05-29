import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [event] = await db
      .update(events)
      .set({
        title: body.title,
        date: body.date,
        time: body.time,
        location: body.location,
        description: body.description,
        image: body.image,
        status: body.status,
        registrationLink: body.registrationLink,
        tags: body.tags,
        gallery: body.gallery,
      })
      .where(eq(events.id, id))
      .returning();

    revalidatePath("/events");
    revalidatePath(`/events/${id}`);
    revalidatePath("/admin/events");
    return Response.json(event);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.id, id));

  if (!event) {
    return Response.json({ error: "Event not found" }, { status: 404 });
  }
  return Response.json(event);
}
