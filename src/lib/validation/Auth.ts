// src/lib/validation/auth.ts
import { z } from "zod";

// Define a schema for the log-in form
export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

// Define a schema for the sign-up form
export const registerFormSchema = z.object({
  name: z.string().optional(), // Name is optional for Appwrite
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // This will attach the error to the confirmPassword field
});

// Infer the TypeScript types from the schemas for use in your components
export type TLoginFormSchema = z.infer<typeof loginFormSchema>;
export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;
