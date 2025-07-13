// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.css";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 虽然中间件保护了此路由，但再次检查是一种良好的实践
  if (!session || !session.user) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to your Dashboard, {user.name || "Developer"}!</h1>
      <p className={styles.subtitle}>Here&apos;s a summary of your profile.</p>

      <div className={styles.profileCard}>
        <Image
          src={user.image || "/default-avatar.png"} // 建议在 /public 目录放一个默认头像
          alt="Your Avatar"
          width={100}
          height={100}
          className={styles.avatar}
        />
        <div className={styles.profileInfo}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/profile/setup" className={styles.actionButton}>Edit Profile</Link>
        <Link href="/feed" className={styles.actionButton}>View Feed</Link>
      </div>
    </div>
  );
}