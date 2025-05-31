// app/login/page.tsx
import LoginForm from "@/components/module/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to Your Account",
  description: "Access your account and continue your journey with us.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <LoginForm />
    </div>
  );
}