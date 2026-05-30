import type { InferSelectModel } from "drizzle-orm";
import type { events, members, teams } from "@/db/schema";

/** Row types inferred from Drizzle schema — keep in sync automatically. */
export type Team = InferSelectModel<typeof teams>;
export type Member = InferSelectModel<typeof members>;
export type Event = InferSelectModel<typeof events>;
export type EventStatus = Event["status"];

export type Socials = NonNullable<Member["socials"]>;

/** Payload for `/team` client view. */
export interface TeamData {
  teams: Team[];
  members: Member[];
}
