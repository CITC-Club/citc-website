import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { members } from "@/db/schema";
import { createClient } from "@/utils/supabase/server";
import AdminShell from "./AdminShell";
import QueryProvider from "@/components/providers/QueryProvider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const adminEmail = session.user.email;
  const [adminMember] = adminEmail
    ? await db
        .select()
        .from(members)
        .where(eq(members.email, adminEmail))
        .limit(1)
    : [];

  return (
    <AdminShell
      adminName={adminMember?.name ?? "Administrator"}
      adminEmail={adminEmail ?? "admin@citc.com"}
      adminPhoto={adminMember?.photoThumb ?? null}
      adminPhotoVersion={adminMember?.photoVersion ?? 0}
    >
      <QueryProvider>{children}</QueryProvider>
    </AdminShell>
  );
}
