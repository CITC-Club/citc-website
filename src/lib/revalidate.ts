import {revalidatePath} from 'next/cache';
import {memberProfilePath} from '@/lib/member-slug';
import type {Member} from '@/types';

/** Paths that show DB-backed public content. */
export function revalidatePublicContent() {
  revalidatePath('/');
  revalidatePath('/events');
  revalidatePath('/team', 'layout');
}

export function revalidateAfterMemberChange(
    member?: Pick<Member, 'name' | 'memberYear'>,
) {
  revalidatePublicContent();
  revalidatePath('/sitemap.xml');
  if (member) {
    revalidatePath(memberProfilePath(member));
    revalidatePath(`/team/${member.memberYear}`);
  }
  revalidatePath('/admin/members');
}

export function revalidateAfterEventChange(eventId?: string) {
  revalidatePublicContent();
  revalidatePath('/admin/events');
  if (eventId) revalidatePath(`/events/${eventId}`);
}

export function revalidateAfterTeamChange() {
  revalidatePublicContent();
  revalidatePath('/admin/teams');
  revalidatePath('/admin/members');
}
