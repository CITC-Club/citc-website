import { db } from "@/db";
import { members } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [member] = await db
      .update(members)
      .set({
        name: body.name,
        type: body.type,
        title: body.title,
        department: body.department,
        email: body.email,
        photo: body.photo,
        memberYear: body.memberYear,
        teamId: body.teamId,
        collegeYear: body.collegeYear,
        socials: body.socials,
      })
      .where(eq(members.id, Number(id)))
      .returning();

    revalidatePath("/team");
    revalidatePath("/admin/members");
    return Response.json(member);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [member] = await db
    .select()
    .from(members)
    .where(eq(members.id, Number(id)));

  if (!member) {
    return Response.json({ error: "Member not found" }, { status: 404 });
  }
  return Response.json(member);
}
