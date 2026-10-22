# Phase 4: Visual editing

Site: Cruip "Simple" landing page template. Next.js 15.1.11 App Router, Tailwind 4, pnpm, `output: "export"`. `@cloudcannon/editable-regions` 0.0.22.

## Section census

Paths in **Binding plan** are relative to the region's scope: the block (`content_blocks.N`) inside page-builder blocks, the page file on the auth pages, and the data file inside a `@data[...]` component.

| Page | Section | Treatment | Binding plan | Data completeness | Justification |
| --- | --- | --- | --- | --- | --- |
| Home (and new landing pages) | Page sections | array (page builder) | `Blocks`: `data-editable="array" data-prop="content_blocks" data-component-key="_type"`; each block in `<div data-editable="array-item" data-component={_type}>` | All block values in `index.md` | — |
| Home | Hero | component + array + image + text | Registered `hero`. `avatars` array on the avatar row, each item a `div` array-item holding an image region (`data-prop-src="image"`, `data-prop-alt="alt"`); `title` h1, `description` p; `buttons` array on the button row, each `<a>` an array-item with `<editable-text data-prop="text">`; terminal `terminal.title` and `terminal.lines.0`…`5` by index | All in front matter. Button `href`/`style` are sidebar fields; the block re-renders on change | — |
| Home | Hero terminal lines | text (by index) | `terminal.lines.N` on each slot `<span>` | Six fixed slots | No array region: the slots are separated by `<br>` siblings and each has its own animation class, and the input disables add/remove |
| Home | Logo cloud | component + image (by index) | Registered `logo_cloud`; each slot's `<img>` is an image region `data-prop-src="logos.N.image"`, `data-prop-alt="logos.N.alt"` | Nine logos in front matter; positions in code | No array region: the nine slots sit in different positioned wrappers, not one container, and the input disables add/remove. Reorder in the sidebar |
| Home | Features | component + array + image + text | Registered `features`; `title` h2; planet `<img>` image region `data-prop-src="image"` `data-prop-alt="image_alt"`; `items` array on the grid, each `<article>` an array-item with `title` (span) and `description` (p) | Icon is a select; the block re-renders on change | — |
| Home | Testimonial | component + image + text | Registered `testimonial`; `<img>` image region `image`/`image_alt`; `quote` rich text (`data-type="text"`) on the quote `<span>`; `name` span; `<editable-text data-prop="role">` in the role link | `role_link` is a sidebar URL field | — |
| Home | CTA | component + text | Registered `cta`; `title` h2; `<editable-text data-prop="button.text">` in the button | `button.href` sidebar | — |
| Home | Decorative art (page illustration, stripes, planet overlay and tags, glows) | none | — | Not content (audit decision) | Decorative images in code, not editor content |
| All default-layout pages | Header | data-file + component + array | `<editable-component data-component="header" data-prop="@data[navigation]">` in the layout; `items` array on the `<ul>`, each `<li>` an array-item with `<editable-text data-prop="text">` | Logo is a fixed SVG; buttons' `href`/`style` sidebar | — |
| All default-layout pages | Footer | data-file + component + array | `<editable-component data-component="footer" data-prop="@data[footer]">` in the layout; `copyright` text; `columns` array on a `contents` wrapper (`data-direction="row"`), each column an array-item with `heading` h3 and a `links` array (`<editable-text data-prop="text">` per link); `social_heading` h3; `social` array on the icon `<ul>` | Watermark word renders through a CSS `attr()`; edited in the sidebar, re-renders live with the footer | Watermark: no text node to host a region (CSS `content`) |
| Sign in, Sign up, Reset password | Heading | text | `heading` h1 | — | — |
| Auth pages | Form fields | array + component + text | `fields` array on the field list with wrapper `data-component="auth-field"`; each field `div` an array-item with `data-component="auth-field"`; `label` text region on the `<label>` | `id`, `type`, `placeholder` are attributes, edited in the sidebar, re-rendered live by `auth-field` | — |
| Auth pages | Form buttons | text (by index) | `<editable-text data-prop="buttons.N.text">` in each button; `divider_text` on the "Or" divider | `style` sidebar (after rebuild) | No array region: the divider renders between buttons inside the same container, so the container isn't array-pure. CRUD in the sidebar |
| Auth pages | Link / text below the form | text | `<editable-text data-prop="footer_link.text">` in the link; `footer_text` rich text (`data-type="text"`) on the `<p>` | `footer_link.href` sidebar | — |
| Auth pages | Side panel terminal | data-file + text (by index) | `@data[auth].terminal.title`, `@data[auth].terminal.lines.N` on the slot spans | Six fixed slots | Primitive regions only: the panel is in the `(auth)` layout, which imports `data/auth.json`; nothing in it is computed |
| Auth pages | Logo header, background art | none | — | Not content | Fixed SVG logo and decorative image |
| All pages | `<title>`, meta description, `data/site.json` | sidebar-only | — | Page `title`/`description` and site defaults | Not rendered in the page body; no element to host a region |
| 404 | Built-in Next.js page | none | — | Not content (audit) | Next's built-in page, left as code |

The census was written before any region attribute. Implementation matches it; no rows changed.

## Checklist

The host has no task tool in this run, so the checklist is kept here.

Setup (nextjs/visual-editing.md § Setup steps):

- [x] Baseline `out/*.html` copied before the first edit (gitignored `node_modules/.cache/`, deleted at the end)
- [x] `pnpm add @cloudcannon/editable-regions` (0.0.22)
- [x] `EditableRegions` root in `app/layout.tsx`, replacing the existing flex wrapper `div` (same classes), so the page's flex column keeps its children
- [x] `components/cloudcannon-editor.tsx` — gated, relative dynamic import of `app/cloudcannon/registerComponents.ts`
- [x] `app/cloudcannon/registerComponents.ts`; `componentMap.ts` adds `header`, `footer`, `auth-field` to the block map
- [x] `tsconfig.json` `moduleResolution: "bundler"` (see Decisions)

Infrastructure checklist:

- [x] `@cloudcannon/editable-regions` in `dependencies`
- [x] `output: "export"`
- [x] Exactly one `<EditableRegions>` in `app/layout.tsx`; it wraps every route's children, so the header, page and footer of both route groups
- n/a — Pages Router `_app`
- [x] `<CloudCannonEditor />` rendered in `app/layout.tsx`
- [x] Registration imported with a relative path inside the `inEditorMode` check
- [x] `"use client"` on `cloudcannon-editor.tsx`
- [x] No module under `pages/` (no `pages/`)
- [x] No `@cloudcannon/react-connector` / `CloudCannonConnect`
- [x] No client component imports `registerReactComponent` or the map at the top level. Verified in `out/`: the registration code is in a lazy chunk (`494.*.js`) that no page's HTML requests
- [x] `next build` passes

Universal completeness checklist (../visual-editing.md):

- [x] Editor enablement: `pages` has `visual`. `data` is data-editor only; its files are edited through `@data[...]` regions on the pages
- [x] Census coverage: every row has regions or a written reason
- [x] Array containers: avatars, hero buttons, features items, nav items, footer columns, links, social, auth fields. Bound by index instead (documented): hero/auth terminal lines, logo cloud, auth buttons
- [x] Per-loop census: each loop above has array + array-item + text/image regions on its visible fields. Social items have no visible text or image (icon from a select; re-rendered by the footer component). Click-outline check is a Phase 5 item
- [x] Nested editables in array items
- [x] Array path scope: relative paths inside every array-item; `@data[...]` only on the `editable-component` hosts and the auth terminal
- [x] Array container purity: footer columns use a `contents` wrapper split from the logo and social columns; auth buttons bound by index because of the divider
- [x] Image editables: avatars, logos, planet image, testimonial photo. No `srcset` in the output (`images.unoptimized`)
- [x] Child component labels: every visible label comes from content; hero/CTA arrow `->` is decoration in code
- [x] Shared partials backed by data: header `@data[navigation]`, footer `@data[footer]`, auth panel `@data[auth]`
- [x] Data file completeness: header and footer render only from their data files (plus the fixed logo)
- n/a — Cross-collection select wiring (no reference selects)
- [x] `_inputs` audit: every `data-prop` key has an input of a matching type (`quote` and `footer_text` are `html` with inline options, regions `data-type="text"`; `description` is `textarea`, span region)
- [x] Schema seed audit: `page-builder.md` and `auth.md` carry every wired key; block structure values carry every block key
- n/a — Markdown body (`@content`): page bodies are empty and not rendered
- n/a — Source editables: no hardcoded page text left; Next route files can't take them anyway
- [x] Conditional guards: images guarded on the path; optional headings, links and `footer_text` guarded; text regions take `null`
- [x] Inline vs block text: no block-level inputs
- [x] Component prop contract: every registered component takes its `data-prop` value spread as props
- n/a — Cross-collection editable guard
- [x] `<template>` blueprints: none needed. Every array sits inside a registered component that keeps the container when empty, or (auth fields) names the item component on the wrapper
- [x] Data file input config (Phase 2 `file_config`)

Page builder checklist:

- [x] Array wrapper: `data-editable="array" data-prop="content_blocks" data-component-key="_type"` in `Blocks`
- [x] Block items: `data-editable="array-item"` and `data-component={_type}` on a `div` around each block
- [x] Widget nested editables
- [x] Sub-arrays in widgets (avatars, buttons, items)
- [x] UI component variants: one `Terminal` for hero and auth panel; one button style map
- [x] Component keys match the discriminator: `hero`, `logo_cloud`, `features`, `testimonial`, `cta`
- [x] All block types registered
- [x] Build output has `data-component-key`, `data-component=`, `data-editable="array-item"`

Next.js completeness checklist:

- [x] Collection and data file config
- [x] Regions inside the root: the root is the top `div` in `<body>`; every route renders inside it
- [x] Registration wiring: every `componentMap` key appears as a `data-component`
- [x] Client-safe registered components: no `async`, `fs`, `server-only`, `next/headers` or `useRouter`; `next/link` only
- [x] Rich text hosts: `quote` and `footer_text` regions are the elements that receive `dangerouslySetInnerHTML`
- n/a — `<template>` blueprints (none)
- [x] Spread props: `<Block {...block} />`, `<Header {...navigation} />`, `<Footer {...footer} />`, `<AuthField {...field} />`
- [x] Block items, shared block map, registration keys match `_type`

Pre-handoff sweep:

- [x] Census walk-through: every row implemented as written
- [x] Shared-UI table: header → `navigation.json` + component; footer columns → `footer.json` array; footer credits → `copyright` in `footer.json`; CTA → page-builder block (audit decision, not shared UI); share block, author card → not on this site; announcement bar → `banner.tsx` is unused, so no data file
- [x] Build grep (`grep -oE`): `index.html` has `data-component="header"`, `"footer"` and every block key; the auth pages have `auth-field` and `@data[auth].terminal.*`

## Build and parity

`pnpm build` passes. Against the pre-Phase 4 output, per page (`index`, `signin`, `signup`, `reset-password`, `404`): visible text, `href`, `src`, `alt`, `placeholder`, `type`, `id` and `data-watermark` are identical. The only class changes are the six avatar wrappers (`flex`) and the footer column wrapper (`contents`). Added elements: the `Blocks` array `div` and one `div` per block, two `editable-component` wrappers, and inline `editable-text` around link and button labels. None of these carries styles outside the editor. Production pages load no editor code; the root element's script is the `EditableRegions` component, which does nothing until the editor's runtime loads.

Region counts in `out/` (`grep -oE`): `index.html` 30 text, 19 `editable-text`, 17 image, 10 array, 40 array-item, 2 `editable-component`; `signup.html` 14 text, 2 `editable-text`, 1 array, 4 array-item.

## Files

- `package.json`, `pnpm-lock.yaml` — `@cloudcannon/editable-regions`
- `tsconfig.json` — `moduleResolution: "bundler"`
- `app/layout.tsx` — `EditableRegions` root, `CloudCannonEditor`
- `components/cloudcannon-editor.tsx` — gated registration import and form guards
- `app/cloudcannon/registerComponents.ts`, `app/cloudcannon/componentMap.ts`
- `components/blocks-renderer.tsx` — array and array-item wrappers
- `components/blocks/{hero,logo-cloud,features,testimonial,cta}.tsx`, `components/terminal.tsx` — regions
- `app/(default)/layout.tsx` — header and footer in `editable-component`, data imported here
- `components/ui/header.tsx`, `components/ui/footer.tsx` — take their data file as props; regions
- `components/auth-form.tsx`, `components/auth-field.tsx` (new), `app/(auth)/layout.tsx` — regions
- `app/css/style.css` — editor-only rules under `.cms-editor-active`

## Decisions and why

- **Header and footer are registered components fed from the layout.** Both have computed output (button style classes, social icons, the watermark attribute), so a primitive-only header or footer would show sidebar changes only after a rebuild. The layout imports `navigation.json` and `footer.json` and wraps each in `<editable-component data-prop="@data[...]">`, per nextjs/visual-editing-reference.md § Registered components.
- **Footer `border` defaults to `true`.** The editor re-renders the footer with the data file's keys only, so a prop passed by the layout would be lost on the first edit. The `(default)` layout was the only caller, and it passed `true`. `data-literal-prop-border` was the alternative; it isn't used because in 0.0.22 the literal key parsing looks wrong (see the feedback file).
- **Terminal lines, logo cloud and auth buttons are bound by index**, not array regions. Terminal and logo slots are fixed-length with add/remove disabled, and their elements aren't array-pure siblings. The auth divider sits between buttons in the same container. Editors reorder and add these in the sidebar.
- **Auth fields are an array with a wrapper `data-component="auth-field"`.** The field `type`, `id` and `placeholder` are input attributes, so the field re-renders as a component; new fields render through it without a `<template>`.
- **`Terminal` takes `dataProp`** (`terminal` in the hero, `@data[auth].terminal` in the auth layout), so one component serves both scopes.
- **`EditableRegions` replaces the root layout's flex `div`** with the same classes. A wrapper inside it would have taken `main`'s place as the flex item and broken `grow`.
- **Avatar items are `div.flex` wrappers around the image.** An element can't be both the array item and the image region; `flex` keeps the image box the same as when it was the flex item.
- **Editor-only CSS** in `app/css/style.css`: AOS elements forced visible (re-rendered blocks lose `aos-animate`), terminal lines held visible (they fade on a 10s loop), and a minimum box on empty arrays. All under `.cms-editor-active`, so the live site is unchanged.
- **Form guards in the editor.** In editor mode `CloudCannonEditor` sets `noValidate` on forms, cancels `submit`, and cancels the default action of clicks on form labels, so clicking into a button or label region doesn't submit the form or move focus to the input. Nothing runs outside the editor.
- **`moduleResolution: "bundler"`.** The template's `"node"` ignores package `exports`, so TypeScript couldn't find `@cloudcannon/editable-regions/react` or its JSX types for `editable-*` elements, and `next build` failed type checking. `"bundler"` is what `create-next-app` writes today; the build and the parity check pass with it.
- **`CloudCannonEditor` lives in `components/`**, the site's components folder, not `app/components/`. It imports `../app/cloudcannon/registerComponents`.
- **Page `title`/`description` and `data/site.json` stay sidebar-only.** They render only in `<head>`.

## Open questions

1. The footer's top border is now always on (it was on for every page that has a footer). Fine? Default: yes.
2. In the editor, form labels and buttons don't act as form controls (no submit, no focus jump). Fine? Default: yes; the live site is unchanged.
3. In the editor, terminal lines stay visible instead of looping their fade. Fine? Default: yes.

## For Phase 5: checks only the Visual Editor can answer

Open `index.md` (Landing page) or an Account page in the Visual Editor.

1. Home: does clicking a hero avatar open the image picker for that avatar? (yes/no)
2. Home: change a hero button's Style in the sidebar — does the button's colour change without saving? (yes/no)
3. Home: in the Testimonial, select a few words of the quote and press italic — does the italic show and save? (yes/no)
4. Home: do the hero and CTA show at full opacity after editing the hero title? (yes/no)
5. Home: does the header show an edit control (outline or button) when you hover it? (yes/no)
6. Home: in the footer, does adding a link to the "Company" column add a row on the page? (yes/no)
7. Sign up: click into the "Register" button label and type — does the text change without the page reloading? (yes/no)
8. Sign up: click into the "Email" label and type — does the caret stay in the label? (yes/no)
9. Sign up: change the Email field's Placeholder in the sidebar — does the input's grey placeholder text change without saving? (yes/no)
10. Any error card on any of the four pages? (paste the first line if yes)
