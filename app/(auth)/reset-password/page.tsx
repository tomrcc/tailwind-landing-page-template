import type { Metadata } from "next";
import AuthForm from "@/components/auth-form";
import { getEntry } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { data } = getEntry("pages", "reset-password");
  return { title: data.title, description: data.description };
}

export default function ResetPassword() {
  const { data } = getEntry("pages", "reset-password");
  return <AuthForm {...data} />;
}
