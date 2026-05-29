import { db } from "@/db";
import { teams } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const [team] = await db
      .insert(teams)
      .values({ id: body.id, name: body.name, year: body.year })
      .returning();
    revalidatePath("/admin/teams");
    revalidatePath("/team");
    return Response.json(team, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return Response.json({ error: message }, { status: 500 });
  }
}
