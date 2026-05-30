import type {Member, Team} from '@/types';

/** Display order: advisors → mentors → executive committee */
export function getTeamDisplayOrder(teamId: string): number {
  if (teamId === 't_patron' || teamId.startsWith('t_patron')) return 0;
  if (teamId === 't_faculty' || teamId.startsWith('t_faculty')) return 1;
  if (teamId.includes('mentor')) return 2;
  if (teamId.startsWith('t_exec')) return 3;
  return 99;
}

export function sortTeamsForDisplay(teams: Team[]): Team[] {
  return [...teams].sort((a, b) => {
    const order = getTeamDisplayOrder(a.id) - getTeamDisplayOrder(b.id);
    if (order !== 0) return order;
    return a.name.localeCompare(b.name);
  });
}

/** Higher college year first, then alphabetical by name */
export function sortMembersBySeniorityAndName(members: Member[]): Member[] {
  return [...members].sort((a, b) => {
    const yearA = a.collegeYear ?? 0;
    const yearB = b.collegeYear ?? 0;
    if (yearB !== yearA) return yearB - yearA;
    return a.name.localeCompare(b.name);
  });
}
