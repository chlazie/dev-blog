"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/lib/validation/Auth";
import { account } from "@/lib/appwrite/appwrite";
import { handleOAuthLogin } from "@/lib/appwrite/authActions";
import { AppwriteException } from "appwrite";
import Link from "next/link";
import AuthCard from "./AuthCard";
import { Github, Globe } from "lucide-react";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      await account.createEmailPasswordSession(data.email, data.password);
      console.log("✅ Logged in successfully!");
      // router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof AppwriteException) setError(err.message);
      else if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred.");
      console.error("❌ Login failed:", err);
    }
  };

  return (
    <AuthCard title="Welcome back to Devhood 👋" subtitle="Log in to your account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message as string}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password.message as string}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-400 text-white rounded-lg hover:opacity-90 transition font-medium"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="h-px flex-grow bg-gray-300 dark:bg-gray-700" />
          <span className="text-xs text-gray-500 dark:text-gray-400">or</span>
          <div className="h-px flex-grow bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* OAuth buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            className="w-full flex items-center justify-center gap-3 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Globe/>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin("github")}
            className="w-full flex items-center justify-center gap-3 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Github/>
            Continue with GitHub
          </button>
        </div>

        {/* Sign up link */}
        <div className="pt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Not registered yet?{" "}
            <Link href="/signup" className="text-indigo-500 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
};

export default LoginForm;
