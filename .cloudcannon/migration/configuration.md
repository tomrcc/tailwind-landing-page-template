# Phase 2: Configuration

Site: Cruip "Simple" landing page template. Next.js 15.1.11 App Router, Tailwind 4, pnpm.

## Checklist

The host has no task tool in this run, so the checklist is kept here.

Setup:

- [x] JSON schemas downloaded to `.cloudcannon/migration/*.schema.json`, gitignored
- [x] `next.config.js`: `output: "export"`, `images: { unoptimized: true }`
- [x] First export build — fails on `app/api/hello/route.ts`; fixed with `dynamic = "force-static"` (see Decisions)
- [x] Baseline from `configure generate --auto --initial-site-settings --ssg nextjs`, then reviewed

Shared checklist (cloudcannon-configuration/configuration.md):

- [x] Structures — four rules: every array and object input linked with a full `_structures.` path or `[*]`; previews on every structure value; nested objects have preview icons. Rule 1 (every value key present in content) applies when Phase 3 writes the files.
- [x] `npx @cloudcannon/cli validate` passes (config, 5 structure-value files, initial site settings)
- [x] `cloudcannon.config.yml` exists and is valid YAML
- [x] Build settings nested under `build`
- [x] `pnpm build` alone produces the complete output
- [x] `.cloudcannon/README.md` written
- [x] `collections_config` has `pages` and `data` (the audit's 2 collections)
- [x] No defunct keys; no collection over `app/`, `components/` or the repo root
- [x] No single-file collection
- [x] `collection_groups`: Pages, Site settings
- [x] `pages` has `url: /[slug]`; `data` has `disable_url: true`
- [x] Computed URL = built path for every planned file (see URL check)
- [x] Index page schema: home uses `page_builder`, auth pages use `auth`
- [x] Every input explicit; every select has options; developer keys hidden (`_schema`)
- [x] Icon fields are selects with `value_key: id` and named values (`allow_create` left off — see Decisions)
- [x] Enum keys inside structure values (`icon`, `style`, `type`, `platform`) each have an input on that structure value
- [x] No numeric values on text inputs
- [x] `file_config` in array form
- [x] `paths.uploads` is `public/images`, where the site keeps images
- [x] `_enabled_editors`: pages `[visual, data]`; data `[data]`
- [x] Styled HTML handled (hero `<br>`, testimonial `<em>` — see Decisions)
- [x] No `type: markdown` inputs; no YAML anchors
- [x] Selects use `_select_data` (closed, code-owned sets); no data-file-backed selects
- [x] Like-shaped lists in data files are arrays backed by structures (see Decisions on ids)
- [x] `add_options` offers only Landing page; it has `new_preview_url: /`
- [x] Every key a file uses is in its schema (schemas list every field; Phase 3 writes files to them)
- [x] `_schema` values: `page_builder`, `auth` — both keys under `pages.schemas`
- [x] Page builder schema exists (5 block types)
- n/a — `draft` fields, Markdown tables, `_snippets`, data-backed multiselects, `markdown` toolbars

Next.js checklist (cloudcannon-configuration/nextjs/configuration.md):

- [x] `"ssg": "nextjs"`; `output_path: "out"`; build command has no `next export`
- [x] `output: "export"`; `images.unoptimized`
- [x] No collection over `app/` or `pages/`
- [x] Hard-coded routes: `pages` keeps Add on because `app/(default)/[slug]/page.tsx` builds new files; auth and home schemas are off the Add menu
- [x] `url` has no `.html`
- [x] `paths.static: public`, uploads under it
- [x] Every data file is JSON

## Build

`pnpm build` (Next 15.1.11, webpack) succeeds after the two `next.config` keys and `force-static`. Output:

```
out/404.html
out/index.html
out/reset-password.html
out/signin.html
out/signup.html
out/api/hello
```

## URL check

`pages` has `url: /[slug]` (`trailingSlash` unset). Content files don't exist yet; Phase 3 creates them. Planned file → computed URL → built path:

- `content/pages/index.md` → `/` → `out/index.html`
- `content/pages/signin.md` → `/signin` → `out/signin.html`
- `content/pages/signup.md` → `/signup` → `out/signup.html`
- `content/pages/reset-password.md` → `/reset-password` → `out/reset-password.html`
- New pages `content/pages/<slug>.md` → `/<slug>` → `out/<slug>.html`, built by `app/(default)/[slug]/page.tsx`

Phase 3 re-runs this check against the real files.

## Files

- `cloudcannon.config.yml` — collections, data_config, `_select_data`, shared `_structures`, `file_config` for the four data files
- `.cloudcannon/initial-site-settings.json` — from the CLI, unchanged: `pnpm i`, `pnpm build`, `out`, `preserved_paths`
- `.cloudcannon/schemas/page-builder.md`, `.cloudcannon/schemas/auth.md`
- `components/blocks/{hero,logo_cloud,features,testimonial,cta}.cloudcannon.structure-value.yml`
- `.cloudcannon/README.md` — editor guide
- `next.config.js` — `output`, `images`
- `app/api/hello/route.ts` — `export const dynamic = "force-static"`
- `.gitignore` — `.cloudcannon/migration/*.schema.json`

## Shapes Phase 3 writes to

Block `_type` values (and `blockMap` keys): `hero`, `logo_cloud`, `features`, `testimonial`, `cta`.

- `hero`: `avatars[] {image, alt}`, `title`, `description`, `buttons[] {text, href, style}`, `terminal {title, lines[6]}`
- `logo_cloud`: `logos[9] {image, alt}`
- `features`: `title`, `image`, `image_alt`, `items[] {icon, title, description}`
- `testimonial`: `image`, `image_alt`, `quote` (HTML, `<em>` only), `name`, `role`, `role_link`
- `cta`: `title`, `button {text, href}`

Page files:

- `index.md`: `_schema: page_builder`, `title`, `description`, `content_blocks`
- `signin.md`, `signup.md`, `reset-password.md`: `_schema: auth`, `title`, `description`, `heading`, `fields[] {id, label, type, placeholder}`, `buttons[] {text, style}`, `divider_text`, `footer_link {text, href}`, `footer_text` (HTML). Every file carries every key; unused ones are empty.

Data files (`data/*.json`, imported by the component):

- `site.json`: `title`, `description`
- `navigation.json`: `items[] {text, href, style}`
- `footer.json`: `copyright`, `watermark`, `columns[] {heading, links[] {text, href}}`, `social[] {platform, href}`
- `auth.json`: `terminal {title, lines[6]}`

Select values (`_select_data`):

- `button_styles`: `primary` (blue), `secondary` (white), `dark`
- `feature_icons`: `dashboard`, `check`, `target`, `code`, `dashed_circle`, `power` — in the order of the six current features
- `field_types`: `email`, `password`, `text`
- `social_platforms`: `twitter`, `medium`, `github`

Image values are paths from the site root: `/images/avatar-01.jpg`.

## Decisions and why

- **`force-static` on `app/api/hello/route.ts`.** Next 15.1.11 refuses any `GET` route handler under `output: "export"` unless it exports `dynamic = "force-static"` (or `"error"`), a `revalidate` of `false` or above 0, or `generateStaticParams`. It doesn't check whether the handler reads the request. The handler stays (audit default) and exports to `out/api/hello`.
- **One `pages` collection, two schemas, no `default`.** `page_builder` (Landing page) and `auth` (Account page). Every file sets `_schema`, so `default` would be unused. Only Landing page is on the Add button; it previews at `/`, the only page with the `(default)` layout.
- **`pages` keeps Add on** although home and the auth pages have hard-coded routes, because new landing pages build through `app/(default)/[slug]/page.tsx`. Its `generateStaticParams` must leave out `index`, `signin`, `signup` and `reset-password`.
- **Flat collection.** Glob `*.md`, `disable_add_folder`, `create.path` from the title. Subfolders would need `[full_slug]` and a catch-all route.
- **Structure values co-located in `components/blocks/`**, named by `_type`. Five block types, so the split approach. Phase 3 puts the block components in the same folder; the site's components live at the root `components/`, not `app/components/`.
- **Shared sub-structures in the main config:** `images` (avatars, logos), `buttons` (hero buttons, header nav), `form_buttons`, `form_fields`, `feature_items`, `links`, `footer_columns`, `social_links`. `buttons` and `form_buttons` are separate because form buttons have no link.
- **One `button_styles` list for every button.** Header, hero and auth buttons pick from Blue, White, Dark. Phase 3 renders all three in each place from one class map, so no option is a dead choice. The arrow after hero and CTA primary buttons stays in code.
- **CTA keeps one `button {text, href}`**, always blue, per the audit's block shape.
- **Fixed-slot arrays** (logo cloud ×9, terminal lines ×6) have `disable_add` and `disable_remove`. New blocks seed them with the current logos and lines, since an empty fixed array couldn't be filled.
- **Other new-block values are empty**; no component has a default to copy.
- **Icon selects without `allow_create`.** The icons are an SVG map in code; a typed name would render nothing. Ids name the glyph, not the feature, so editors can reuse them.
- **Hero heading stored as plain text.** The `<br className="max-lg:hidden" />` is responsive layout, so it is stripped (content.md § Styled HTML). Phase 3 may use `text-balance` or a max width to keep the two-line look.
- **Testimonial quote is `type: html` with italic only.** It holds `<em>` without classes; the component styles `em` with `text-gray-500`. The curly quotes are rendered by the component, not stored. No editor stylesheet is needed.
- **Signup terms line is `footer_text`, `type: html`** with link, bold and italic. Links are stored without classes; the component styles `a` inside it.
- **`divider_text`** holds the visible "Or" between the signup buttons. The audit's `auth` schema didn't list it; it is visible text, so it is a field.
- **`form_fields.id` is an editable text field** with `unique_on: id`, because editors adding a field need a unique id for the label. Autocomplete and `required` stay in code.
- **`auth.json` uses `terminal {title, lines}`**, the same shape as the hero's `terminal`. The audit named these `panel_title` and `panel_lines`; one shape lets one terminal component render both.
- **Data files keep object roots** (`navigation.json` is `{items: [...]}`). The lists are links and columns, not records referenced by id, so they carry no `id`/`slug`.
- **All four data files are in `data_config`.** Phase 4 binds the header, footer and auth panel as `@data[...]`; `site` is listed so all shared settings behave the same.
- **`data` collection** has `disable_add`, `disable_add_folder` and `disable_file_actions`: the four files are fixed and each is imported by name.
- **`timezone: Etc/UTC`.** The CLI wrote the machine's zone. The site has no dates, so it has no effect.
- **`node_version` unset.** No `.nvmrc`, `.node-version` or `engines`; Next 15 needs Node 18.18 or later.
- **`build_command: pnpm build`, `install_command: pnpm i`** — the CLI's pnpm equivalents of `npm run build`.
- **Page `title`/`description` inputs are on the `pages` collection.** Block structure values define their own `title`/`description`, which win.

## For Phase 3

- Every `select` must change the render: `style` on buttons, `icon` on features, `type` on form fields, `platform` on social links.
- Guard every image with `image &&` and every optional object by an inner field (`footer_link?.text`); empty keys arrive as `null`.
- Footer watermark: render `watermark` without building a class from it (audit § 6).
- `next/image` with string paths needs `width`/`height`; the logo sizes stay in code by index.
- Avatar alt texts are mismatched today ("Avatar 01" twice); migrate them as they are.

## Open questions

1. Timezone: none is set and there are no date fields. Default: `Etc/UTC`.
2. Button styles: should every button offer Blue, White and Dark, or should each place keep only the styles it uses now? Default: all three everywhere.
3. Editors can add form fields to the account pages, though the forms send nothing. Lock the field list instead? Default: editable.
4. Node version: none is pinned. Pin one (for example 22) in `.nvmrc`? Default: leave unset.
