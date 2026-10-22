import type { Metadata } from "next";
import Blocks from "@/components/blocks-renderer";
import { getEntries, getEntry } from "@/lib/content";

type Props = { params: Promise<{ slug?: string[] }> };

// Optional catch-all so the list always holds index: under `output: "export"`
// an empty generateStaticParams fails the build. Account pages keep their (auth) routes.
export function generateStaticParams() {
  return getEntries("pages")
    .filter(({ data }) => data._schema === "page_builder")
    .map(({ slug }) => ({ slug: slug === "index" ? [] : [slug] }));
}

async function entryFor(params: Props["params"]) {
  const { slug } = await params;
  return getEntry("pages", slug?.[0] ?? "index");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await entryFor(params);
  return { title: data.title, description: data.description };
}

export default async function Page({ params }: Props) {
  const { data } = await entryFor(params);
  return <Blocks blocks={data.content_blocks ?? []} />;
}
