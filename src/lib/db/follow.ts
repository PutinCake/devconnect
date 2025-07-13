// lib/db/follow.ts

import { prisma } from "@/lib/prisma"

// 关注用户
export async function followUser(followerId: string, followingId: string) {
  return prisma.follower.create({
    data: {
      followerId,
      followingId,
    },
  })
}

// 取消关注
export async function unfollowUser(followerId: string, followingId: string) {
  return prisma.follower.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  })
}

// 查询我关注了谁
export async function getFollowing(userId: string) {
  return prisma.follower.findMany({
    where: { followerId: userId },
    include: { following: true },
  })
}

// 查询我的粉丝
export async function getFollowers(userId: string) {
  return prisma.follower.findMany({
    where: { followingId: userId },
    include: { follower: true },
  })
}

// 查询我是否关注了某用户
export async function isFollowing(followerId: string, followingId: string) {
  const follow = await prisma.follower.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  })

  return !!follow
}