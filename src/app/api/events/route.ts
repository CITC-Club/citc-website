import { db } from "@/db";
import { events } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.date || !body.time || !body.location || !body.description || !body.image) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const id = `e${Date.now()}`;

    const [event] = await db
      .insert(events)
      .values({
        id,
        title: body.title,
        date: body.date,
        time: body.time,
        location: body.location,
        description: body.description,
        image: body.image,
        status: body.status || "upcoming",
        registrationLink: body.registrationLink,
        tags: body.tags,
        gallery: body.gallery,
        academicYear: body.academicYear,
      })
      .returning();

    revalidatePath("/events");
    revalidatePath("/admin/events");
    return Response.json(event, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return Response.json({ error: message }, { status: 500 });
  }
}
