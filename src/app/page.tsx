import Hero from "@/components/Hero";
import HomeEvents from "@/components/HomeEvents";
import { db } from "@/db";
import { events, members } from "@/db/schema";
import { count, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const recentEvents = await db
    .select()
    .from(events)
    .orderBy(desc(events.date))
    .limit(3);

  const [memberCountRow] = await db.select({ count: count() }).from(members);
  const [eventCountRow] = await db.select({ count: count() }).from(events);

  return (
    <>
      <Hero
        featuredEvent={recentEvents[0] ?? null}
        recentEvents={recentEvents}
        memberCount={memberCountRow?.count ?? 0}
        eventCount={eventCountRow?.count ?? 0}
      />
      <HomeEvents events={recentEvents} />
    </>
  );
}
