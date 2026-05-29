import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import Link from "next/link";
import { db } from "@/db";
import { events } from "@/db/schema";
import EventsTable from "./EventsTable";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const allEvents = await db.select().from(events).orderBy(desc(events.date));
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Events
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage club events, workshops, and competitions
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Event
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <EventsTable events={allEvents} />
      </div>
    </div>
  );
}
