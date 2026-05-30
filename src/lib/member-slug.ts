import type {Member} from '@/types';

/** URL-safe slug from a display name (e.g. "Manash Dev Bhatta" → "manash-dev-bhatta"). */
export function memberSlugFromName(name: string): string {
  return name
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
}

export function memberProfilePath(
    member: Pick<Member, 'name' | 'memberYear'>,
): string {
  return `/team/${member.memberYear}/${memberSlugFromName(member.name)}`;
}

export function findMemberByYearAndSlug<
  T extends Pick<Member, 'id' | 'name' | 'memberYear'>,
>(members: T[], year: number, slug: string): T | undefined {
  const normalized = slug.toLowerCase();
  return members.find(
      (m) => m.memberYear === year && memberSlugFromName(m.name) === normalized,
  );
}
