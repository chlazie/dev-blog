// src/lib/appwrite/authActions.ts
import { account } from "./appwrite";

export const handleOAuthLogin = async (provider: "google" | "github") => {
  try {
    await account.createOAuth2Session(
      provider,
      `${window.location.origin}/dashboard`, // success redirect
      `${window.location.origin}/login` // failure redirect
    );
  } catch (err) {
    console.error("OAuth login failed:", err);
  }
};
