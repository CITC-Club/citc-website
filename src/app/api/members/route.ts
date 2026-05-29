import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { members } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const [member] = await db
      .insert(members)
      .values({
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
      .returning();

    revalidatePath("/team");
    revalidatePath("/admin/members");
    return Response.json(member, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error";
    return Response.json({ error: message }, { status: 500 });
  }
}
