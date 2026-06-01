import {db} from '@/db';
import {events} from '@/db/schema';
import {eq} from 'drizzle-orm';
import {isEventStatus} from '@/lib/event-status';
import {revalidateAfterEventChange} from '@/lib/revalidate';
import {resolveAcademicYear} from '@/lib/years';

export async function PUT(
    request: Request,
    {params}: { params: Promise<{ id: string }> },
) {
  try {
    const {id} = await params;
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
          status: isEventStatus(body.status) ? body.status : 'upcoming',
          registrationLink: body.registrationLink,
          tags: body.tags,
          gallery: body.gallery,
          academicYear: resolveAcademicYear(
          typeof body.academicYear === 'number' ? body.academicYear : undefined,
          ),
        })
        .where(eq(events.id, id))
        .returning();

    revalidateAfterEventChange(event);
    return Response.json(event);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return Response.json({error: message}, {status: 500});
  }
}
