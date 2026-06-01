import type {Event} from '@/types';

/** URL-safe slug from an event title (e.g. "IoT Workshop" → "iot-workshop"). */
export function eventSlugFromTitle(title: string): string {
  return title
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
}

/** Public path for an event detail page. */
export function eventPath(event: Pick<Event, 'title'>): string {
  return `/events/${eventSlugFromTitle(event.title)}`;
}

/** Find an event by matching its title-derived slug. */
export function findEventBySlug<T extends Pick<Event, 'id' | 'title'>>(
    events: T[],
    slug: string,
): T | undefined {
  const normalized = slug.toLowerCase();
  return events.find(
      (e) => eventSlugFromTitle(e.title) === normalized,
  );
}
