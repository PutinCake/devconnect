// 📄 /app/api/follow/route.ts

import { followUser, unfollowUser } from "@/lib/db/follow"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { followerId, followingId, action } = await req.json()

    if (!followerId || !followingId || !action) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      )
    }

    if (action === "follow") {
      const follow = await followUser(followerId, followingId)
      return NextResponse.json(follow)
    } else if (action === "unfollow") {
      const unfollow = await unfollowUser(followerId, followingId)
      return NextResponse.json(unfollow)
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (err) {
    console.error("POST /api/follow error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
