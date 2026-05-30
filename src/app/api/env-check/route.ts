import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    supabaseUrlExists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseUrlLength: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
    supabaseUrlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 15) || "",
    supabaseKeyExists: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    supabaseKeyLength: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.length || 0,
    databaseUrlExists: !!process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
  });
}
