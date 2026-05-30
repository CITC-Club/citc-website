import type {Metadata} from 'next';
import {db} from '@/db';
import {events} from '@/db/schema';
import {eq} from 'drizzle-orm';
import {notFound} from 'next/navigation';
import {createPageMetadata} from '@/lib/seo';
import EventDetailsClient from './EventDetailsClient';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {id} = await params;
  const [event] = await db.select().from(events).where(eq(events.id, id));
  if (!event) {
    return {title: 'Event not found | CITC'};
  }

  const plain = event.description
      .replace(/[#*_`[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);

  return createPageMetadata({
    title: event.title,
    description: plain || `${event.title} — ${event.date} at ${event.location}`,
    path: `/events/${event.id}`,
    ogImagePath: `/events/${event.id}/opengraph-image`,
  });
}

export default async function EventDetailsPage({params}: PageProps) {
  const {id} = await params;
  const [event] = await db.select().from(events).where(eq(events.id, id));
  if (!event) notFound();
  return <EventDetailsClient event={event} />;
}
