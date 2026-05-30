import {type NextRequest, NextResponse} from 'next/server';
import {createProxySupabaseClient} from '@/utils/supabase/proxy';

export async function proxy(request: NextRequest) {
  const {supabase, supabaseResponse} = createProxySupabaseClient(request);
  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith('/api/') && !user) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/api/:path*'],
};
