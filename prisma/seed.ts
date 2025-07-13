// prisma/seed.ts
import { prisma } from "../src/lib/prisma"

async function main() {
  console.log("🌱 Starting seeding...")

  // 1️⃣ 清空表数据（可选，避免重复插入测试数据）
  await prisma.follower.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  console.log("✅ Cleared existing data.")

  // 2️⃣ 创建 User
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      skills: ["Next.js", "TypeScript"],
      bio: "Fullstack Developer from Wonderland.",
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      skills: ["React", "Node.js"],
      bio: "Backend Engineer from Builderland.",
    },
  })

  console.log("✅ Created users:", user1.id, user2.id)

  // 3️⃣ 创建 Post
  const post1 = await prisma.post.create({
    data: {
      title: "Alice's First Post",
      content: "Hello, this is Alice's first post on DevConnect!",
      authorId: user1.id,
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: "Bob's First Post",
      content: "Hi, Bob here. Excited to share my projects!",
      authorId: user2.id,
    },
  })

  console.log("✅ Created posts:", post1.id, post2.id)

  // 4️⃣ 创建关注关系
  const follow = await prisma.follower.create({
    data: {
      followerId: user1.id,   // Alice 关注 Bob
      followingId: user2.id,
    },
  })

  console.log("✅ Created follow relationship:", follow.id)

  console.log("🎉 Seeding completed!")
}

main()
  .then(() => {
    console.log("✅ All done! 🌱")
    process.exit(0)
  })
  .catch((err) => {
    console.error("❌ Seeding error:", err)
    process.exit(1)
  })
