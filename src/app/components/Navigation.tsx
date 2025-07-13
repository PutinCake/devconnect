// components/Navigation.tsx

"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.navbar}>
      <Link href="/dashboard" className={styles.navLink}>
        Dashboard
      </Link>
      <Link href="/post" className={styles.navLink}>
        Posts
      </Link>
      <Link href="/user" className={styles.navLink}>
        Users
      </Link>
    </nav>
  );
}
