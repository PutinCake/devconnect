// 📄 /app/api/post/route.ts

import { getRecentPosts, createPost } from "@/lib/db/post"
import { NextResponse } from "next/server"

export async function GET() {
  //export async function GET(req: Request) {
  //console.log(req.url) 
  const posts = await getRecentPosts()
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  try {
    const { title, content, authorId, coverImage } = await req.json()

    const post = await createPost({
      title,
      content,
      authorId,
      coverImage,
    })

    return NextResponse.json(post)
  } catch (err) {
    console.error("POST /api/post error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
