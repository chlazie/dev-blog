"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "@/lib/validation/Auth";
import { account } from "@/lib/appwrite/appwrite";
import { handleOAuthLogin } from "@/lib/appwrite/authActions";
import { AppwriteException } from "appwrite";
import Link from "next/link";
import AuthCard from "./AuthCard";

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (data: any) => {
    setError(null);
    setSuccess(null);
    try {
      await account.create("unique()", data.email, data.password, data.name || "");
      await account.createEmailPasswordSession(data.email, data.password);
      setSuccess("🎉 Welcome to Devhood! Your account is ready!");
      console.log("✅ Signed up successfully!");
    } catch (err: unknown) {
      if (err instanceof AppwriteException) setError(err.message);
      else if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred.");
      console.error("❌ Signup failed:", err);
    }
  };

  return (
    <AuthCard title="Join Devhood 🏡" subtitle="Create your account and start building!">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center font-medium">{success}</p>}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name (optional)</label>
          <input
            type="text"
            {...register("name")}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message as string}</p>}
        </div>

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

        {/* Confirm password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
          />
          {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message as string}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-400 text-white rounded-lg hover:opacity-90 transition font-medium"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="h-px flex-grow bg-gray-300 dark:bg-gray-700" />
          <span className="text-xs text-gray-500 dark:text-gray-400">or</span>
          <div className="h-px flex-grow bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* OAuth */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            className="w-full flex items-center justify-center gap-3 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin("github")}
            className="w-full flex items-center justify-center gap-3 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>

        {/* Login link */}
        <div className="pt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-500 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignupForm;
