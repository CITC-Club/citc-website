import { revalidatePath } from "next/cache";

/** Paths that show DB-backed public content. */
export function revalidatePublicContent() {
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/team");
}

export function revalidateAfterMemberChange() {
  revalidatePublicContent();
  revalidatePath("/admin/members");
}

export function revalidateAfterEventChange(eventId?: string) {
  revalidatePublicContent();
  revalidatePath("/admin/events");
  if (eventId) revalidatePath(`/events/${eventId}`);
}

export function revalidateAfterTeamChange() {
  revalidatePublicContent();
  revalidatePath("/admin/teams");
  revalidatePath("/admin/members");
}
