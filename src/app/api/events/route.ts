import { db } from "@/db";
import { events } from "@/db/schema";
import { isEventStatus } from "@/lib/event-status";
import { revalidateAfterEventChange } from "@/lib/revalidate";
import { resolveAcademicYear } from "@/lib/years";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.date || !body.time || !body.location || !body.description || !body.image) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const status = isEventStatus(body.status) ? body.status : "upcoming";

    const [event] = await db
      .insert(events)
      .values({
        id: body.id ?? `e${Date.now()}`,
        title: body.title,
        date: body.date,
        time: body.time,
        location: body.location,
        description: body.description,
        image: body.image,
        status,
        registrationLink: body.registrationLink,
        tags: body.tags,
        gallery: body.gallery,
        academicYear: resolveAcademicYear(
          typeof body.academicYear === "number" ? body.academicYear : undefined,
        ),
      })
      .returning();

    revalidateAfterEventChange(event.id);
    return Response.json(event, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return Response.json({ error: message }, { status: 500 });
  }
}
