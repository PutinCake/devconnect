// lib/db/post.ts
import { prisma } from "@/lib/prisma"

// 查询最近的 Post（含作者）
export async function getRecentPosts(limit = 10) {
  return prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  })
}

// 创建 Post
export async function createPost(data: {
  title: string
  content: string
  coverImage?: string
  authorId: string
}) {
  return prisma.post.create({
    data,
  })
}
