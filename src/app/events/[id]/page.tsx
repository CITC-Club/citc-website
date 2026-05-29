import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EventDetailsClient from "./EventDetailsClient";

export const dynamic = "force-dynamic";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [event] = await db.select().from(events).where(eq(events.id, id));
  if (!event) notFound();
  return <EventDetailsClient event={event} />;
}
