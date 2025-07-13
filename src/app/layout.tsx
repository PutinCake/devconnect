// app/layout.tsx

import "./globals.css";
import ClientLayout from "@/app/components/ClientLayout";
import SessionProviderWrapper from "@/app/components/SessionProviderWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <ClientLayout>{children}</ClientLayout>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
