import { eq } from "drizzle-orm";
import { revalidateAfterMemberChange } from "@/lib/revalidate";
import { db } from "@/db";
import { members } from "@/db/schema";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
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
        photoThumb: body.photoThumb,
        photoVersion: body.photoVersion ?? 0,
        memberYear: body.memberYear,
        teamId: body.teamId,
        collegeYear: body.collegeYear,
        socials: body.socials,
      })
      .where(eq(members.id, Number(id)))
      .returning();

    revalidateAfterMemberChange(member);
    return Response.json(member);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return Response.json({ error: message }, { status: 500 });
  }
}
