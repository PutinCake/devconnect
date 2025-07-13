// src/app/components/ClientLayout.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "../layout.module.css";
import { useState, useRef, useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      {isAuthenticated && (
        <>
          <header className={styles.header}>
            <div className={styles.logo}>DevConnect</div>
            {session.user && (
              <div className={styles.userInfo} ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={styles.userButton}
                >
                  <span className={styles.userName}>
                    {session.user.name || session.user.email}
                  </span>
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt="User Avatar"
                      className={styles.avatar}
                    />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className={styles.dropdown}>
                    <Link href="/profile/edit" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                      Edit Profile
                    </Link>
                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </header>
          <nav className={styles.navbar}>
            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
            <Link href="/feed" className={styles.navLink}>Feed</Link>
          </nav>
        </>
      )}
      <main className={isAuthenticated ? styles.mainContent : styles.fullScreenContent}>
        {children}
      </main>
    </>
  );
}