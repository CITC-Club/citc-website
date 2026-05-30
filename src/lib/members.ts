import {eq} from 'drizzle-orm';
import {db} from '@/db';
import {members, teams} from '@/db/schema';
import {findMemberByYearAndSlug, memberSlugFromName} from '@/lib/member-slug';
import type {Member, Team} from '@/types';

export async function getAllMembers(): Promise<Member[]> {
  return db.select().from(members).orderBy(members.name);
}

export async function getMemberByYearAndSlug(
    year: number,
    slug: string,
): Promise<Member | null> {
  const rows = await db
      .select()
      .from(members)
      .where(eq(members.memberYear, year));
  return findMemberByYearAndSlug(rows, year, slug) ?? null;
}

export async function getMemberWithTeam(
    year: number,
    slug: string,
): Promise<{ member: Member; team: Team | null } | null> {
  const member = await getMemberByYearAndSlug(year, slug);
  if (!member) return null;

  const [team] = await db
      .select()
      .from(teams)
      .where(eq(teams.id, member.teamId))
      .limit(1);

  return {member, team: team ?? null};
}

export function getMemberSlugsForYear(
    memberList: Pick<Member, 'name' | 'memberYear'>[],
    year: number,
): string[] {
  return memberList
      .filter((m) => m.memberYear === year)
      .map((m) => memberSlugFromName(m.name));
}
