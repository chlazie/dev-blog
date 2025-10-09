"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
  const { signIn, signInWithGoogle, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // if already logged in, jump to dashboard
  if (user) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error", err);
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">Log in to DevHood</h2>

        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block text-sm">
            <span className="text-sm">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full border px-3 py-2 rounded bg-gray-50 dark:bg-gray-800"
            />
          </label>

          <label className="block text-sm">
            <span className="text-sm">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full border px-3 py-2 rounded bg-gray-50 dark:bg-gray-800"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded font-medium hover:opacity-95"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        <div className="space-y-2">
          <button
            onClick={() => signInWithGoogle()}
            className="w-full border py-2 rounded flex items-center justify-center gap-2"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
