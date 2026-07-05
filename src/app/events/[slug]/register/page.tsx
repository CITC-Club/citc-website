import type {Metadata} from 'next';
import {db} from '@/db';
import {events} from '@/db/schema';
import {notFound} from 'next/navigation';
import {createPageMetadata} from '@/lib/seo';
import {eventSlugFromTitle, eventPath} from '@/lib/event-slug';
import RegisterClient from './RegisterClient';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function findEventBySlug(slug: string) {
  const allEvents = await db.select().from(events);
  return allEvents.find(
      (e) => eventSlugFromTitle(e.title) === slug.toLowerCase(),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {slug} = await params;
  const event = await findEventBySlug(slug);
  if (!event) {
    return {title: 'Event not found | CITC'};
  }

  return createPageMetadata({
    title: `Register for ${event.title} | CITC`,
    description: `Register for ${event.title} - Computer Engineering Innovation & Tech Club (CITC)`,
    path: `${eventPath(event)}/register`,
  });
}

export default async function EventRegisterPage({params}: PageProps) {
  const {slug} = await params;
  const event = await findEventBySlug(slug);
  if (!event) notFound();

  return <RegisterClient event={event} />;
}
