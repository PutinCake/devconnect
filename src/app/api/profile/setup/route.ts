// /app/api/profile/setup/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { updateUserProfile } from "@/lib/db/user";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    // email 不再从 body 中获取，以提高安全性
    const { name, avatarUrl } = body;

    if (!name || !avatarUrl) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await updateUserProfile(session.user.email, { name, email: session.user.email, avatarUrl });

    return NextResponse.json({ message: "Profile updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
