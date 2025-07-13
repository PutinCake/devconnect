"use client";

import { useSession, signOut } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>MySite Logo</div>

      {status === "authenticated" && session.user && (
        <DropdownMenu>
          <DropdownMenuTrigger className={styles.userTrigger}>
            {session.user.name}
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="avatar"
                width={40}
                height={40}
                className={styles.avatar}
              />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                signOut({ callbackUrl: "/login" });
              }}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
