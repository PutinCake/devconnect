// lib/db/user.ts

import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"

// 查询单个用户
export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  })
}

// 更新用户资料
export async function updateUser(userId: string, data: {
  name?: string
  bio?: string
  skills?: string[]
  avatarUrl?: string
}) {
  return prisma.user.update({
    where: { id: userId },
    data,
  })
}

// 查用户 by email
export async function getUserByLogin(login: string) {
  return prisma.user.findUnique({
    where: { login },
  })
}

// 创建用户
export async function createUser(data: {
  login: string
  password: string
}) {
  const hashedPassword = await hash(data.password, 10)

  return prisma.user.create({
    data: {
      login: data.login,
      password: hashedPassword,
    },
  })
}

export async function updateUserProfile(login: string, data: {
  name: string;
  email: string;
  avatarUrl: string;
}) {
  return prisma.user.update({
    where: { login },
    data: {
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl,
    },
  });
}
