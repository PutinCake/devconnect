// src/app/page.tsx
import LoginPage from "./login/page"; // 导入 LoginPage 组件

/**
 * 应用的根页面，现在直接显示登录表单。
 */
export default function HomePage() {
  // 直接渲染 LoginPage 组件
  return <LoginPage />;
}