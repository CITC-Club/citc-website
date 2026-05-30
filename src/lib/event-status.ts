import type { EventStatus } from "@/types";

const EVENT_STATUSES: EventStatus[] = ["upcoming", "past", "running"];

export function isEventStatus(value: unknown): value is EventStatus {
  return (
    typeof value === "string" &&
    EVENT_STATUSES.includes(value as EventStatus)
  );
}
