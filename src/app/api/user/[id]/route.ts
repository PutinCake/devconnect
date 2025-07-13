// 📄 /app/api/user/[id]/route.ts

import { getUserById, updateUser } from "@/lib/db/user"
import { NextResponse } from "next/server"

export async function GET(req: Request, context: { params: { id: string } }) {
  const { params } = context

  const user = await getUserById(params.id)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { params } = context

  try {
    const data = await req.json()

    const updatedUser = await updateUser(params.id, {
      name: data.name,
      bio: data.bio,
      skills: Array.isArray(data.skills) ? data.skills : [],
      avatarUrl: data.avatarUrl,
    })

    return NextResponse.json(updatedUser)
  } catch (err) {
    console.error("PATCH /api/user/:id error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
