/** Default academic year when a record has no year set. */
export const DEFAULT_ACADEMIC_YEAR = 2025;

/** Unique years sorted newest first (e.g. member years, event academic years). */
export function sortYearsDesc(years: Iterable<number>): number[] {
  return [...new Set(years)].sort((a, b) => b - a);
}

export function resolveAcademicYear(year: number | null | undefined): number {
  return year ?? DEFAULT_ACADEMIC_YEAR;
}
