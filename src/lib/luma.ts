const LUMA_EVENT_ID_PATTERN = /(?:^|[/?#&=])(evt-[A-Za-z0-9]+)/;

export function getLumaEventId(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = url.match(LUMA_EVENT_ID_PATTERN);
  if (!match) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (host !== 'luma.com' && host !== 'lu.ma' && !host.endsWith('.lu.ma')) {
      return null;
    }
  } catch {
    return null;
  }

  return match[1] ?? null;
}
