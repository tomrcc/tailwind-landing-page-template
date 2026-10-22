import type { ComponentType } from "react";
import Hero from "@/components/blocks/hero";
import LogoCloud from "@/components/blocks/logo-cloud";
import Features from "@/components/blocks/features";
import Testimonial from "@/components/blocks/testimonial";
import Cta from "@/components/blocks/cta";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AuthField from "@/components/auth-field";
import AuthForm from "@/components/auth-form";

// Keys are the `_type` values in content_blocks.
export const blockMap: Record<string, ComponentType<any>> = {
  hero: Hero,
  logo_cloud: LogoCloud,
  features: Features,
  testimonial: Testimonial,
  cta: Cta,
};

export const componentMap: Record<string, ComponentType<any>> = {
  ...blockMap,
  header: Header,
  footer: Footer,
  "auth-field": AuthField,
  "auth-form": AuthForm,
};
