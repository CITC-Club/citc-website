import type { MetadataRoute } from "next";
import { db } from "@/db";
import { events, members } from "@/db/schema";
import { memberProfilePath } from "@/lib/member-slug";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/team`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/join`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const allEvents = await db.select({ id: events.id, updatedAt: events.updatedAt }).from(events);
  const eventRoutes: MetadataRoute.Sitemap = allEvents.map((e) => ({
    url: `${base}/events/${e.id}`,
    lastModified: e.updatedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const allMembers = await db
    .select({
      name: members.name,
      memberYear: members.memberYear,
      updatedAt: members.updatedAt,
    })
    .from(members);

  const memberYears = [...new Set(allMembers.map((m) => m.memberYear))];
  const yearRoutes: MetadataRoute.Sitemap = memberYears.map((year) => ({
    url: `${base}/team/${year}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const memberRoutes: MetadataRoute.Sitemap = allMembers.map((m) => ({
    url: `${base}${memberProfilePath(m)}`,
    lastModified: m.updatedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...yearRoutes, ...memberRoutes, ...eventRoutes];
}
