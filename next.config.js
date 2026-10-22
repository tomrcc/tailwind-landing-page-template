// CloudCannon builds a static export; other hosts (e.g. Vercel) keep the server build and image optimisation.
const staticExport = process.env.CLOUDCANNON_STATIC_EXPORT === "true";

/** @type {import('next').NextConfig} */
const nextConfig = staticExport
  ? { output: "export", images: { unoptimized: true } }
  : {};

module.exports = nextConfig;
