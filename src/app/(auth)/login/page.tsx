// app/login/page.tsx
import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-background dark:bg-gray-950">
      <LoginForm />
    </main>
  );
}
