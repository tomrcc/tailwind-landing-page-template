# Phase 3: Content

Site: Cruip "Simple" landing page template. Next.js 15.1.11 App Router, Tailwind 4, pnpm, `output: "export"`.

Every visible value now lives in `content/pages/*.md` or `data/*.json`, and the routes read them at build time. Editable regions are not added; that is Phase 4.

## Checklist

The host has no task tool in this run, so the checklist is kept here.

Setup:

- [x] Baseline: `pnpm build` on the Phase 2 tree before any Phase 3 edit; `out/*.html` copied to a gitignored folder (`node_modules/.cache/cc-baseline/`, deleted at the end)
- [x] Content loader `lib/content.ts` (skill loader; `js-yaml` + `@types/js-yaml` added)

Review checklist (migrate-to-cloudcannon/content.md):

- [x] Front matter consistency: every page file carries every key of its schema; `_schema` set on all four
- [x] Defaults written into files: no component defaults exist; `style` and `type` values are explicit
- [x] Every key in the schema: checked by script against `.cloudcannon/schemas/*.md` (no missing, no extra keys)
- n/a — `draft` (none), dates (none)
- [x] Image paths: one convention, paths from the site root (`/images/…`)
- [x] Field naming: matches the Phase 2 shapes; no reserved keys
- n/a — mixed-type fields, string references, Markdown bodies (all page files have empty bodies)
- [x] Styled HTML: hero `<br class="max-lg:hidden">` stripped; testimonial `<em>` and signup `<a>` stored without classes, styled by the component
- [x] Page-builder content: extraction pattern per block; full field lists; no empty value over a rendered default (none exist)
- [x] YAML quoting: `#0` hrefs and HTML strings quoted
- [x] Null values: every component guards images (`image &&`), optional objects by an inner field (`footer_link?.text`, `button?.text`) and arrays (`?? []`)
- [x] One field per visual slot: no `a || b` fallbacks
- n/a — API-driven content (no fetches)
- [x] Settings in code → data files: `site`, `navigation`, `footer`, `auth`
- [x] Data files: valid JSON, at most 3 levels deep, lists are arrays with one shape per structure

Review checklist addendum:

- [x] Field completeness (CRITICAL): every block, form field, form button, nav item, footer column, link and social item checked by script against its structure `value` — no missing or extra keys
- [x] Fields the original page didn't pass: none; every value comes from the original JSX
- [x] No block-level HTML in front matter strings; the two HTML values are on `type: html` inputs
- [x] Arrays inside structure-value files are linked to `_structures` (Phase 2; `npx @cloudcannon/cli validate` passes)
- [x] Every visible value in a data file's consuming component lives in the data file — the footer's "Social" heading was hardcoded; it is now `social_heading`
- [x] This note records every structural change

Next.js (nextjs/content.md, nextjs/page-building.md):

- [x] Loader called only from route files (`app/(default)/[[...slug]]/page.tsx`, the three auth `page.tsx`); components get plain props
- [x] Catch-all in the `(default)` group with `generateStaticParams`; never empty (see Decisions)
- [x] `Blocks` renders only from `blockMap` and throws on an unknown `_type`
- [x] `componentMap` at `app/cloudcannon/componentMap.ts` spreads `blockMap`
- [x] Block components are client-safe: no `async`, no `node:fs`, data only from props
- [x] Data files imported as JSON by the component that renders them
- [x] `next/image` with string `src` has `width` and `height` everywhere
- [x] `generateMetadata` sets each page's title and description from front matter
- [x] JSX artifacts (`{" "}`, `&apos;`, `-&gt;`) stripped from extracted text

## Files

Content and data:

- `content/pages/index.md` — `page_builder`, 5 blocks: `hero`, `logo_cloud`, `features`, `testimonial`, `cta`
- `content/pages/signin.md`, `signup.md`, `reset-password.md` — `auth`
- `data/site.json`, `data/navigation.json`, `data/footer.json`, `data/auth.json`

Code:

- `lib/content.ts` — the skill's loader
- `app/(default)/[[...slug]]/page.tsx` — renders every `page_builder` file, `index` at `/`
- `app/(default)/page.tsx` — deleted; the catch-all renders `/`
- `app/(default)/layout.tsx` — server component; `AOS.init` moved to `components/aos-init.tsx`
- `app/(auth)/*/page.tsx` — read their entry, render `components/auth-form.tsx`
- `app/(auth)/layout.tsx` — terminal from `data/auth.json`
- `app/layout.tsx` — root metadata from `data/site.json`
- `app/cloudcannon/componentMap.ts` — `blockMap` and `componentMap`
- `components/blocks-renderer.tsx` — `Blocks`
- `components/blocks/{hero,logo-cloud,features,testimonial,cta}.tsx` — block components; replace `hero-home.tsx`, `business-categories.tsx`, `features-planet.tsx`, `large-testimonial.tsx`, `cta.tsx` (deleted)
- `components/terminal.tsx` — shared terminal panel for the hero and the auth layout
- `components/ui/button-styles.ts` — class map for `primary`, `secondary`, `dark`
- `components/ui/header.tsx`, `components/ui/footer.tsx` — read their data files
- `package.json`, `pnpm-lock.yaml` — `js-yaml`, `@types/js-yaml`

Cross-phase fixes:

- `cloudcannon.config.yml` — `social_heading` input on `data/footer.json`
- `.cloudcannon/README.md` — footer line mentions the social heading

## Build

`pnpm build` succeeds. Routes: `/[[...slug]]` (builds `/`), `/signin`, `/signup`, `/reset-password`, `/api/hello`, `/_not-found`.

A temporary `content/pages/zz-test-landing.md` (one `cta` block) built `out/zz-test-landing.html` with its own `<title>`, Header and Footer; the file was deleted after.

## Parity check

Compared baseline and new `out/*.html` for `index`, `signin`, `signup`, `reset-password`, `404`: visible text, `<title>`, meta description, every `href` and `aria-label`, every image (file name with hash stripped, `alt`, `width`, `height`), every input (`id`, `type`, `placeholder`, `autocomplete`, `required`) and label `for`.

- All identical, except a whitespace artifact of the text extraction around the testimonial quote: the quote is now `“<span>…</span>”` and the extractor replaces tags with spaces. The raw HTML has no added whitespace.
- Images now load from `/images/<name>` instead of `/_next/static/media/<name>.<hash>`; same files.
- Class differences, all expected: footer watermark uses `content-[attr(data-watermark)]` with `data-watermark="Simple"`; the quote's `em` and the signup links are styled from the parent (`[&_em]:…`, `[&_a]:…`); single-button forms have `space-y-3` on the button wrapper; the hero's secondary button has `group`; the hero `<br class="max-lg:hidden">` is gone. The generated CSS contains each new rule.

## URL check

`pages` has `url: /[slug]`:

- `content/pages/index.md` → `/` → `out/index.html`
- `content/pages/signin.md` → `/signin` → `out/signin.html`
- `content/pages/signup.md` → `/signup` → `out/signup.html`
- `content/pages/reset-password.md` → `/reset-password` → `out/reset-password.html`
- New `page_builder` files → `/<slug>` → `out/<slug>.html` (tested above)

## Decisions and why

- **Optional catch-all `app/(default)/[[...slug]]/page.tsx` replaces `app/(default)/page.tsx`.** The audit planned home at `(default)/page.tsx` plus `(default)/[slug]`. Today `index` is the only `page_builder` file, so `[slug]`'s `generateStaticParams` would be empty, and Next 15.1.11 fails an export build on an empty list. The optional catch-all always lists `index` (as `slug: []`), so the build passes with no extra page. New landing pages still get the `(default)` layout. The collection `url` is unchanged.
- **The catch-all lists files by schema** (`_schema: page_builder`), so the auth pages stay with their `(auth)` routes.
- **`Blocks` has no wrapper elements.** It renders each block in a `Fragment`, matching the original DOM. Phase 4 adds the array and array-item wrappers.
- **Block components live in `components/blocks/`**, beside their structure-value files, with kebab-case file names (`logo-cloud.tsx`); `blockMap` keys are the `_type` values.
- **Button style maps:** one map (`buttonStyles`) for hero and form buttons; the header uses the same map with a flat `dark` (its original look). Each place renders all three styles. The arrow after the label shows on `primary` hero buttons and on the CTA button.
- **Hero buttons get spacing by position** (`mb-4 sm:mb-0` except the last, `sm:ml-4` except the first), which reproduces the original two buttons and works for any count.
- **Hero heading has no line break.** Below `lg` the `<br>` was hidden anyway. At `lg` and up, the 60px heading in a column at most 1104px wide should wrap after "you're" on its own, the break the `<br>` forced. That is estimated from the font size, not checked in a browser. No `text-balance` added, since it would move the break.
- **Terminal panel is one component** for the hero block and the auth layout; the six slots keep their own animation class and separators, so lines map to slots by index.
- **Logo cloud keeps nine fixed slots in code**; `logos[n]` fills slot n with that slot's size.
- **Testimonial quote marks are outside the HTML.** The component renders `“`, the stored HTML, then `”`, so the field holds only the quote.
- **Footer watermark** renders through `data-watermark` and `content: attr(data-watermark)`, so the word comes from `footer.json` while the class stays fixed.
- **Footer "Social" heading is a field** (`social_heading`). It is visible text; Phase 2's shape left it in code.
- **Form inputs:** `required` on every field and `autocomplete="on"` on password fields stay in code (Phase 2 decision).
- **Arrays are not filtered.** Components guard each item's contents (`avatar?.image`, `logo?.image`) instead of dropping items, so Phase 4 array editables keep item positions equal to array indexes.
- **AOS init is a client component** (`components/aos-init.tsx`) rendered in the now-server `(default)` layout, per the audit.
- **Decorative images stay static imports** (stripes, planet overlay and tags, `auth-bg.svg`).

## Open questions

1. Home is rendered by the optional catch-all instead of its own `app/(default)/page.tsx`. Fine, or would you rather add a second sample landing page so a plain `[slug]` route works? Default: optional catch-all, no extra page.
2. The header's Dark button is flat grey while the form's Dark button is a gradient, as in the original. Unify them? Default: keep both looks.
3. The footer "Social" heading is now editable. Keep it, or leave it in code? Default: editable (`social_heading`).
4. The hero heading's desktop line break now comes from natural wrapping. If it breaks somewhere other than after "you're" on a wide screen, is that acceptable? Default: accept it; no responsive markup goes back into the content.
