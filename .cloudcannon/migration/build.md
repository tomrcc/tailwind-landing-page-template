# Phase 5: Build and test

Site: Cruip "Simple" landing page template. Next.js 15.1.11 App Router, Tailwind 4, pnpm 10.15.1, `output: "export"`.

No files changed in this phase. Every check passed as Phase 4 left the site.

## Checklist

The host has no task tool in this run, so the checklist is kept here.

Shared (migrate-to-cloudcannon/build.md):

- [x] Full build: deleted `.next/` and `out/`, ran `pnpm build` (the `build` script, `next build`). Passes. Routes: `/[[...slug]]` (builds `/`), `/signin`, `/signup`, `/reset-password`, `/api/hello`, `/_not-found`
- [x] Regions in the output (counts below); every wired type appears
- [x] `npx @cloudcannon/cli validate`: valid — `cloudcannon.config.yml`, the five structure-value files, `.cloudcannon/initial-site-settings.json`
- [x] Collection URLs match the build (table below)
- [x] Schema keys resolve: `_schema` values `page_builder` (index) and `auth` (signin, signup, reset-password), and `add_options[0].schema: page_builder`, are all keys under `pages.schemas`. `data` files set no `_schema`
- n/a — Search index: none on the site
- [x] Schema round-trip: every page file already holds every key of its schema (checked by script: no missing, no extra), so filling defaults writes nothing new and the scratch build equals the normal one. The site has no list pages
- [x] Hand off: below

Next.js (migrate-to-cloudcannon/nextjs/build.md):

- [x] Export settings: `output: "export"`, `images: { unoptimized: true }`; `trailingSlash`, `basePath`, `distDir` unset; no `rewrites`, `redirects`, `headers`
- [x] Clean build (above)
- [x] Every page in the output: `out/index.html`, `signin.html`, `signup.html`, `reset-password.html`, `404.html`, plus `out/api/hello`. The catch-all lists one `page_builder` file (`index`), and builds one page
- [x] Region counts with the HTML-only grep
- [x] Images load: every `<img src>` in `out/*.html` resolves to a file under `out/` (25 paths: `/images/*` from content, `/_next/static/media/*` from static imports)
- n/a — Base path
- [x] Build command: `build` runs `next build`, the only step; `build_command: pnpm build`
- [x] `output_path: out`; `node_version` unset (see Decisions)

Extra:

- [x] `CI=true pnpm install --frozen-lockfile`: lockfile in sync (CloudCannon's `pnpm i` runs the same check under CI)

## Region counts

`grep -hoE 'data-editable="[a-z_-]+'` per page, plus custom elements:

- `index.html`: 30 text, 17 image, 10 array, 40 array-item, 19 `editable-text`, 2 `editable-component`, 1 `_dynamic` (the `EditableRegions` root)
- `signin.html`: 10 text, 1 array, 2 array-item, 2 `editable-text`
- `signup.html`: 14 text, 1 array, 4 array-item, 2 `editable-text`
- `reset-password.html`: 9 text, 1 array, 1 array-item, 1 `editable-text`

Same as the Phase 4 counts.

## URL check

`pages`, `url: /[slug]`, `trailingSlash` off:

- `content/pages/index.md` → `/` → `out/index.html`
- `content/pages/signin.md` → `/signin` → `out/signin.html`
- `content/pages/signup.md` → `/signup` → `out/signup.html`
- `content/pages/reset-password.md` → `/reset-password` → `out/reset-password.html`

`data` has `disable_url`.

## Build settings

`.cloudcannon/initial-site-settings.json`:

- `ssg: nextjs`, `mode: hosted`
- `build.install_command: pnpm i`
- `build.build_command: pnpm build`
- `build.output_path: out`
- `build.preserved_paths: node_modules/,.next/`
- `build.node_version`: unset

## Decisions and why

- **No code or config changes.** The build, validate and every output check passed on the Phase 4 tree.
- **`node_version` stays unset.** The site has no `.nvmrc`, `.node-version` or `engines`, so the skill's rule gives no value. CloudCannon's 10 March 2026 changelog lists Node 22 as the Build Configuration default, which meets Next 15's minimum (18.18). The local build ran on Node 24.20.0, not 22. Handoff check 1 covers the hosted build.
- **pnpm on CloudCannon.** CloudCannon preinstalls pnpm, but its docs don't give the version. The lockfile is v9 (`pnpm@10.15.1` in `packageManager`), which needs pnpm 9 or later. Left as is; handoff check 1 shows whether the install works.
- **Handoff keeps only checks the editor or hosting can answer.** Build, validate, URLs, region counts and image paths are done here. Phase 4's ten checks are kept, with the header check replaced by an inline edit plus a save check, and two added: the hosted build and a new Landing page.

## Open questions

1. Pin Node in `.nvmrc` (with `node_version: "file"`)? Default: no; CloudCannon's default Node 22 builds Next 15.
2. `out/api/hello` is a file with no extension, served by CloudCannon with whatever type it guesses. Delete the demo route? Default: keep (audit decision).

## Handoff

Folder: `/Users/tomrichardson/Dev/work/skills-work/regression-tests/next/tailwind-landing-page-template`
Remote: `origin git@work:tomrcc/tailwind-landing-page-template.git`

Nothing is committed. Commit and push the working tree yourself, then confirm the CloudCannon site is connected to `tomrcc/tailwind-landing-page-template` before testing.

Done locally, no need to repeat: clean `pnpm build` passes, `npx @cloudcannon/cli validate` passes, every collection file's URL matches its built page, region counts and image paths checked in `out/`.

Checks, one per step:

1. Did the first CloudCannon build succeed? (yes/no; if no, paste the first error line from the build log)
2. Open the Pages collection, then "Home - Simple" in the Visual Editor. Does clicking a hero avatar open the image picker for that avatar? (yes/no)
3. In the sidebar, open Page sections > Hero > Buttons > "Start Free Trial" and change Style. Does the button's colour change on the page before you save? (yes/no)
4. In the Testimonial, select a few words of the quote and click the italic button in the text toolbar. Does the italic show on the page? (yes/no)
5. Edit the hero heading. Do the hero and the CTA section near the bottom still show at full opacity afterwards? (yes/no)
6. In the footer "Company" column, use the add control to add a link. Does a new link row appear on the page? (yes/no)
7. Click into the header's "Login" button text and type a character. Does the button text change? (yes/no)
8. Click Save. Does the Save changes modal list `navigation.json`? (yes/no, or paste the file names it lists)
9. Open "Sign Up - Simple" in the Visual Editor. Click into the "Register" button label and type. Does the text change without the page reloading? (yes/no)
10. Click into the "Email" field label and type. Does the caret stay in the label? (yes/no)
11. In the sidebar, open Form fields > "Email" and change Placeholder. Does the input's grey placeholder text change before you save? (yes/no)
12. On any of the four pages, does an error message appear in the Visual Editor? (no, or paste its first line)
13. In the Pages collection, click + Add > Landing page, set a title, add one Page section, and save. After the build finishes, does reopening that file in the Visual Editor show the new page rather than the home page? (yes/no)

Reply with the answers by number, plus anything that behaved oddly (page, what you clicked, what happened).
