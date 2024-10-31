"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type OAuthProvider = "github" | "google";

export async function handleGithubAuth(provider: OAuthProvider) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: "http://localhost:3000/api/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}