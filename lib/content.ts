import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export type Entry = { slug: string; data: Record<string, any>; body: string };

export function getEntries(collection: string): Entry[] {
  const dir = path.join(process.cwd(), "content", collection);
  return readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const raw = readFileSync(path.join(dir, file), "utf8");
      const [, front = "", body = raw] = raw.match(FRONTMATTER) ?? [];
      return {
        slug: file.replace(/\.mdx?$/, ""),
        data: (yaml.load(front) ?? {}) as Record<string, any>,
        body,
      };
    });
}

export function getEntry(collection: string, slug: string): Entry {
  const entry = getEntries(collection).find((e) => e.slug === slug);
  if (!entry) throw new Error(`Missing content/${collection}/${slug}`);
  return entry;
}
