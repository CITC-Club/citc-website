import {db} from '@/db';
import {events} from '@/db/schema';
import {eq} from 'drizzle-orm';
import {absoluteUrl} from '@/lib/seo';
import {resolveMediaUrl} from '@/lib/media';
import {renderOgImage} from '@/lib/og-image';

export const alt = 'CITC event';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;
  const [event] = await db.select().from(events).where(eq(events.id, id));

  if (!event) {
    return renderOgImage({
      title: 'CITC Event',
      label: 'Events',
    });
  }

  const imagePath = resolveMediaUrl(event.image);
  const imageUrl = imagePath ? absoluteUrl(imagePath) : null;

  return renderOgImage({
    title: event.title,
    subtitle: `${event.date} · ${event.location}`,
    label: 'CITC Event',
    imageUrl,
  });
}
