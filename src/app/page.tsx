import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import { db } from "@/db";
import { events, members } from "@/db/schema";
import { count } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [memberCountRow] = await db.select({ count: count() }).from(members);
  const [eventCountRow] = await db.select({ count: count() }).from(events);

  return (
    <>
      <Hero
        memberCount={memberCountRow?.count ?? 0}
        eventCount={eventCountRow?.count ?? 0}
      />
      <HomeAbout />
    </>
  );
}
