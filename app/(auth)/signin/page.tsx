import type { Metadata } from "next";
import AuthForm from "@/components/auth-form";
import { getEntry } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { data } = getEntry("pages", "signin");
  return { title: data.title, description: data.description };
}

export default function SignIn() {
  const { data } = getEntry("pages", "signin");
  return (
    <editable-component
      data-component="auth-form"
      data-prop="@file[/content/pages/signin.md]"
    >
      <AuthForm {...data} />
    </editable-component>
  );
}
