# Phase 4: Visual editing

Site: Cruip "Simple" landing page template. Next.js 15.1.11 App Router, Tailwind 4, pnpm, `output: "export"`. `@cloudcannon/editable-regions` 0.0.22.

## Section census

Paths in **Binding plan** are relative to the region's scope: the block (`content_blocks.N`) inside page-builder blocks, the page file on the auth pages, and the data file inside a `@data[...]` component.

| Page | Section | Treatment | Binding plan | Data completeness | Justification |
| --- | --- | --- | --- | --- | --- |
| Home (and new landing pages) | Page sections | array (page builder) | `Blocks`: `data-editable="array" data-prop="content_blocks" data-component-key="_type"`; each block in `<div data-editable="array-item" data-component={_type}>` | All block values in `index.md` | — |
| Home | Hero | component + array + image + text | Registered `hero`. `avatars` array on the avatar row, each item a `div` array-item holding an image region (`data-prop-src="image"`, `data-prop-alt="alt"`); `title` h1, `description` p; `buttons` array on the button row, each button in a `div.flex` array-item (the styled `<a>` inside it) with `<editable-text data-prop="text">`; terminal `terminal.title` and `terminal.lines.0`…`5` by index | All in front matter. Button `href`/`style` are sidebar fields; the block re-renders on change | — |
| Home | Hero terminal lines | text (by index) | `terminal.lines.N` on each slot `<span>` | Six fixed slots | No array region: the slots are separated by `<br>` siblings and each has its own animation class, and the input disables add/remove |
| Home | Logo cloud | component + image (by index) | Registered `logo_cloud`; each slot's `<img>` is an image region `data-prop-src="logos.N.image"`, `data-prop-alt="logos.N.alt"` | Nine logos in front matter; positions in code | No array region: the nine slots sit in different positioned wrappers, not one container, and the input disables add/remove. Reorder in the sidebar |
| Home | Features | component + array + image + text | Registered `features`; `title` h2; planet `<img>` image region `data-prop-src="image"` `data-prop-alt="image_alt"`; `items` array on the grid, each `<article>` an array-item with `title` (span) and `description` (p) | Icon is a select; the block re-renders on change | — |
| Home | Testimonial | component + image + text | Registered `testimonial`; `<img>` image region `image`/`image_alt`; `quote` rich text (`data-type="text"`) on the quote `<span>`; `name` span; `<editable-text data-prop="role">` in the role link | `role_link` is a sidebar URL field | — |
| Home | CTA | component + text | Registered `cta`; `title` h2; `<editable-text data-prop="button.text">` in the button | `button.href` sidebar | — |
| Home | Decorative art (page illustration, stripes, planet overlay and tags, glows) | none | — | Not content (audit decision) | Decorative images in code, not editor content |
| All default-layout pages | Header | data-file + component + array | `<editable-component data-component="header" data-prop="@data[navigation]">` in the layout; `items` array on the `<ul>`, each `<li>` an array-item with `<editable-text data-prop="text">` | Logo is a fixed SVG; buttons' `href`/`style` sidebar | — |
| All default-layout pages | Footer | data-file + component + array | `<editable-component data-component="footer" data-prop="@data[footer]">` in the layout; `copyright` text; `columns` array on a `contents` wrapper (`data-direction="row"`), each column an array-item with `heading` h3 and a `links` array (`<editable-text data-prop="text">` per link); `social_heading` h3; `social` array on the icon `<ul>` | Watermark word renders through a CSS `attr()`; edited in the sidebar, re-renders live with the footer | Watermark: no text node to host a region (CSS `content`) |
| Sign in, Sign up, Reset password | Account form | component | `<editable-component data-component="auth-form" data-prop="@file[/content/pages/<slug>.md]">` in each auth route; the regions below sit inside it and resolve against that file | Every visible value in the page file | — |
| Auth pages | Heading | text | `heading` h1 | — | — |
| Auth pages | Form fields | array + component + text | `fields` array on the field list with wrapper `data-component="auth-field"`; each field `div` an array-item with `data-component="auth-field"`; `label` text region on the `<label>` | `id`, `type`, `placeholder` are attributes, edited in the sidebar, re-rendered live by `auth-field` | — |
| Auth pages | Form buttons | array + text | `buttons` array on the button list; each item a `div.space-y-3` array-item holding the "Or" divider (from the second item on) and the button, with `<editable-text data-prop="text">` | `style` and `divider_text` are edited in the sidebar and re-render live with `auth-form` | `divider_text` has no inline region: it renders inside each item, where a relative path resolves to the item, not the page |
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
- [x] Array containers: avatars, hero buttons, features items, nav items, footer columns, links, social, auth fields, auth buttons. Bound by index instead (documented): hero/auth terminal lines, logo cloud
- [x] Per-loop census: each loop above has array + array-item + text/image regions on its visible fields. Social items have no visible text or image (icon from a select; re-rendered by the footer component). Click-outline check is a Phase 5 item
- [x] Nested editables in array items
- [x] Array path scope: relative paths inside every array-item; `@data[...]` only on the `editable-component` hosts and the auth terminal
- [x] Array container purity: footer columns use a `contents` wrapper split from the logo and social columns; each auth button item carries its own divider, placed by the `auth-form` re-render
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
- [x] Registration wiring: every `componentMap` key appears as a `data-component` (`auth-form` on the auth routes)
- [x] Client-safe registered components: no `async`, `fs`, `server-only`, `next/headers` or `useRouter`; `next/link` only
- [x] Rich text hosts: `quote` and `footer_text` regions are the elements that receive `dangerouslySetInnerHTML`
- n/a — `<template>` blueprints (none)
- [x] Spread props: `<Block {...block} />`, `<Header {...navigation} />`, `<Footer {...footer} />`, `<AuthForm {...data} />`, `<AuthField {...field} />`
- [x] Block items, shared block map, registration keys match `_type`

Pre-handoff sweep:

- [x] Census walk-through: every row implemented as written
- [x] Shared-UI table: header → `navigation.json` + component; footer columns → `footer.json` array; footer credits → `copyright` in `footer.json`; CTA → page-builder block (audit decision, not shared UI); share block, author card → not on this site; announcement bar → `banner.tsx` is unused, so no data file
- [x] Build grep (`grep -oE`): `index.html` has `data-component="header"`, `"footer"` and every block key; the auth pages have `auth-field` and `@data[auth].terminal.*`

## Build and parity

`pnpm build` passes. Against the pre-Phase 4 output, per page (`index`, `signin`, `signup`, `reset-password`, `404`): visible text, `href`, `src`, `alt`, `placeholder`, `type`, `id` and `data-watermark` are identical. The only new classes are on wrappers: avatar and hero button items (`flex`), the footer column wrapper (`contents`) and auth button items (`space-y-3`). The wrappers keep the same boxes: a `flex` item wrapper holds its child as the child was held before, and `space-y-3` on the auth items gives the same margins as the flat list. That follows from the CSS; I haven't compared screenshots. Added elements: a `div.flex` around each hero button, a `div.space-y-3` around each auth button (with the divider moved inside the second), an `editable-component` around each auth form, the `Blocks` array `div` and one `div` per block, two `editable-component` wrappers, and inline `editable-text` around link and button labels. None of these carries styles outside the editor. Production pages load no editor code; the root element's script is the `EditableRegions` component, which does nothing until the editor's runtime loads.

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
- `components/auth-form.tsx` (registered as `auth-form`), `components/auth-field.tsx` (new), `app/(auth)/layout.tsx` — regions
- `app/(auth)/{signin,signup,reset-password}/page.tsx` — `auth-form` wrapped in `editable-component` over the page file
- `app/css/style.css` — editor-only rules under `.cms-editor-active`

## Decisions and why

- **Header and footer are registered components fed from the layout.** Both have computed output (button style classes, social icons, the watermark attribute), so a primitive-only header or footer would show sidebar changes only after a rebuild. The layout imports `navigation.json` and `footer.json` and wraps each in `<editable-component data-prop="@data[...]">`, per nextjs/visual-editing-reference.md § Registered components.
- **Footer `border` defaults to `true`.** The editor re-renders the footer with the data file's keys only, so a prop passed by the layout would be lost on the first edit. The `(default)` layout was the only caller, and it passed `true`. `data-literal-prop-border` was the alternative; it isn't used because in 0.0.22 the literal key parsing looks wrong (see the feedback file).
- **Terminal lines and logo cloud are bound by index**, not array regions. Both are fixed-length with add/remove disabled, and their elements aren't array-pure siblings (`<br>` separators, separately positioned slots). Editors reorder them in the sidebar.
- **Auth fields are an array with a wrapper `data-component="auth-field"`.** The field `type`, `id` and `placeholder` are input attributes, so the field re-renders as a component; new fields render through it without a `<template>`.
- **Account form is one registered component over the page file.** `auth-form` is wrapped in `<editable-component data-prop="@file[/content/pages/<slug>.md]">` in each auth route, so any change to the page re-renders the form: button styles update live, and new or moved buttons get their divider in the right place. In 0.0.22 source an `@file[...]` prop is an absolute file listener, and the component receives that file's front matter as props (`realizeAPIValue`). Nesting the fields under one key was the alternative; it would change the schema and every auth file. `data-prop=""` would also render, but without edit controls.
- **Auth buttons are an array whose items hold the divider.** Each item is a `div.space-y-3` holding the "Or" divider (from the second item on) and the button. The list is array-pure and has on-page add, remove and reorder, and the spacing matches the flat list (Tailwind `space-y` margins). `divider_text` is sidebar-only: inside an item a relative path resolves to the item.
- **Array items never carry computed attributes.** A re-render updates an array item's children but not the item element's own attributes (`EditableArrayItem._update` → `updateTree` on its children). Hero buttons therefore sit in a `div.flex` item with the styled `<a>` inside. The header, footer, features, fields and auth button items have only static attributes on the item element.
- **`Terminal` takes `dataProp`** (`terminal` in the hero, `@data[auth].terminal` in the auth layout), so one component serves both scopes.
- **`EditableRegions` replaces the root layout's flex `div`** with the same classes. A wrapper inside it would have taken `main`'s place as the flex item and broken `grow`.
- **Avatar items are `div.flex` wrappers around the image.** An element can't be both the array item and the image region; `flex` keeps the image box the same as when it was the flex item.
- **Editor-only CSS** in `app/css/style.css`: AOS elements forced visible and clickable (`aos.css` sets `opacity: 0` and `pointer-events: none` on `[data-aos]` until `aos-animate`, which re-rendered blocks lose), terminal lines held visible (they fade on a 10s loop), and a minimum box on empty arrays. All under `.cms-editor-active`, so the live site is unchanged.
- **Form guards in the editor.** In editor mode `CloudCannonEditor` adds capturing document listeners that cancel `invalid`, `submit`, and the default action of clicks inside form labels, so clicking into a button or label region doesn't validate or submit the form or move focus to the input. They are document listeners because a re-render resets the form's own attributes. Nothing runs outside the editor.
- **`moduleResolution: "bundler"`.** The template's `"node"` ignores package `exports`, so TypeScript couldn't find `@cloudcannon/editable-regions/react` or its JSX types for `editable-*` elements, and `next build` failed type checking. `"bundler"` is what `create-next-app` writes today; the build and the parity check pass with it.
- **`CloudCannonEditor` lives in `components/`**, the site's components folder, not `app/components/`. It imports `../app/cloudcannon/registerComponents`.
- **Page `title`/`description` and `data/site.json` stay sidebar-only.** They render only in `<head>`.

## Open questions

1. The footer's top border is now always on (it was on for every page that has a footer). Fine? Default: yes.
2. In the editor, form labels and buttons don't act as form controls (no validation, no submit, no focus jump). Fine? Default: yes; the live site is unchanged.
3. In the editor, terminal lines stay visible instead of looping their fade. Fine? Default: yes.
4. The "Or" text between account-form buttons is edited in the sidebar only (it updates live). Fine? Default: yes.

## For Phase 5: checks only the Visual Editor can answer

Open the page named in each question in the Visual Editor.

1. Home: does clicking the hero heading put a caret in it? (yes/no)
2. Home: after editing the hero heading, does clicking the "Create your next project with Simple" heading put a caret in it? (yes/no)
3. Home: change the first hero button's Style to Dark in the sidebar. Does the button turn dark without saving? (yes/no)
4. Home: in the Testimonial, select a few words of the quote and press italic. Does the italic show and save? (yes/no)
5. Home: does the header show an edit control (outline or button) when you hover over it? (yes/no)
6. Sign up: hover over the "Register" button. Is there an add control that adds a third button on the page? (yes/no)
7. Sign up: change the "Continue with GitHub" button's Style to Blue in the sidebar. Does it turn blue without saving? (yes/no)
8. Sign up: click into the "Register" button label and type. Does the text change without the page reloading? (yes/no)
9. Sign up: click into the "Email" label and type. Does the caret stay in the label? (yes/no)
10. Any error card on any of the four pages? (paste the first line if yes)
