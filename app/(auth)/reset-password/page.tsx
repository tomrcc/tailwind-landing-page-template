import type { Metadata } from "next";
import AuthForm from "@/components/auth-form";
import { getEntry } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { data } = getEntry("pages", "reset-password");
  return { title: data.title, description: data.description };
}

export default function ResetPassword() {
  const { data } = getEntry("pages", "reset-password");
  return (
    <editable-component
      data-component="auth-form"
      data-prop="@file[/content/pages/reset-password.md]"
    >
      <AuthForm {...data} />
    </editable-component>
  );
}
