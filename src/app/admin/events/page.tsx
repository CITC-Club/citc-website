import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { events } from "@/db/schema";
import EventsTable from "@/app/admin/events/EventsTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPrimaryButton from "@/components/admin/AdminPrimaryButton";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const allEvents = await db.select().from(events).orderBy(desc(events.date));

  return (
    <div>
      <AdminPageHeader
        title="Events"
        description="Workshops, competitions, and club activities shown on the public site."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events" },
        ]}
        action={
          <AdminPrimaryButton href="/admin/events/new" icon={<Plus className="w-4 h-4" />}>
            Add event
          </AdminPrimaryButton>
        }
      />

      <div className="bg-white dark:bg-clay-light rounded-2xl border border-stone/60 overflow-hidden shadow-sm">
        <EventsTable events={allEvents} />
      </div>
    </div>
  );
}
