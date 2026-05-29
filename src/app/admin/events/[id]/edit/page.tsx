import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { events } from "@/db/schema";
import EventForm from "../../EventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [event] = await db.select().from(events).where(eq(events.id, id));

  if (!event) notFound();

  return <EventForm event={event} />;
}
