import {db} from '@/db';
import {events} from '@/db/schema';
import {isEventStatus} from '@/lib/event-status';
import {revalidateAfterEventChange} from '@/lib/revalidate';
import {resolveAcademicYear} from '@/lib/years';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const missing: string[] = [];
    if (!body.title?.trim()) missing.push('title');
    if (!body.date?.trim()) missing.push('date');
    if (!body.time?.trim()) missing.push('time');
    if (!body.location?.trim()) missing.push('location');
    if (!body.description?.trim()) missing.push('description');
    if (!body.image?.trim()) missing.push('cover image');

    if (missing.length > 0) {
      return Response.json(
          {
            error: `Missing required fields: ${missing.join(', ')}`,
          },
          {status: 400},
      );
    }

    const status = isEventStatus(body.status) ? body.status : 'upcoming';

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
          typeof body.academicYear === 'number' ? body.academicYear : undefined,
          ),
        })
        .returning();

    revalidateAfterEventChange(event);
    return Response.json(event, {status: 201});
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error';
    return Response.json({error: message}, {status: 500});
  }
}
