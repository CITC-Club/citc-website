import { db } from "@/db";
import { events } from "@/db/schema";
import { desc } from "drizzle-orm";
import EventsClient from "./EventsClient";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const allEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.date));

  return <EventsClient events={allEvents} />;
}
