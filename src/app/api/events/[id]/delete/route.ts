import {db} from '@/db';
import {events} from '@/db/schema';
import {eq} from 'drizzle-orm';
import {revalidateAfterEventChange} from '@/lib/revalidate';
import {redirect} from 'next/navigation';

export async function POST(
    _request: Request,
    {params}: { params: Promise<{ id: string }> },
) {
  const {id} = await params;
  await db.delete(events).where(eq(events.id, id));
  revalidateAfterEventChange(id);
  redirect('/admin/events?flash=deleted');
}
