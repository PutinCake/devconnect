import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    /**
     * The `authorized` callback is where you decide if a user is authorized.
     * `token` is the decoded JWT. It's null if the user is not logged in
     * or the token is invalid.
     *
     * Returning `true` allows the request to proceed.
     * Returning `false` triggers a redirect to the `signIn` page.
     */
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/login", // 如果用户未认证，重定向到登录页
  },
});

// `matcher` 定义了哪些路径需要被这个中间件保护
export const config = {
  matcher: [
    "/dashboard/:path*", // 保护所有 dashboard 下的路径
    "/profile/:path*",   // 保护所有 profile 下的路径
  ],
};