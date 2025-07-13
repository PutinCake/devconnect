// /app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { getUserByLogin } from "@/lib/db/user";
import { compare } from "bcrypt";

// ✅ 显式导出 authOptions
export const authOptions: AuthOptions = {
  providers: [
    // Credentials 登录
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await getUserByLogin(credentials.email);

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.login,
          email: user.email,
        };
      },
    }),

    // Google 登录
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // GitHub 登录
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      if (session.user && token.picture) {
        session.user.image = token.picture as string;
      }
      return session;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        let avatar: string | null = null;
        const p = profile as Record<string, unknown>;

        if (account.provider === "google") {
          avatar = p.picture as string;
        } else if (account.provider === "github") {
          avatar = p.avatar_url as string;
        }

        token.picture = avatar;
      }

      return token;
    },
  },
};

// ✅ 显式注册
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
