import {eq} from 'drizzle-orm';
import {redirect} from 'next/navigation';
import {db} from '@/db';
import {members} from '@/db/schema';
import {getMemberThumbnailUrl} from '@/lib/media';
import {SITE_CONFIG} from '@/lib/site-config';
import {createServerSupabaseClient} from '@/utils/supabase/server';
import AdminShell from './AdminShell';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const adminEmail = user.email;
  const [adminMember] = adminEmail ?
    await db
        .select()
        .from(members)
        .where(eq(members.email, adminEmail))
        .limit(1) :
    [];

  return (
    <AdminShell
      adminName={adminMember?.name ?? 'Administrator'}
      adminEmail={adminEmail ?? SITE_CONFIG.email}
      adminPhoto={
        adminMember ? getMemberThumbnailUrl(adminMember) || null : null
      }
      adminPhotoVersion={adminMember?.photoVersion ?? 0}
    >
      {children}
    </AdminShell>
  );
}
