# Shirazi & Associates — project notes for Claude

Handoff doc for picking this project back up in a future session. Read this before making changes — several of the decisions below exist because an earlier, more obvious approach was tried and broke something.

## What this is

A bilingual (EN/FA) marketing site for a **fictional** Toronto immigration/family law firm — a design concept, not a real client. Dark, editorial, bold typography, built around a Persian geometric grid ("girih") instead of stock photography. See `README.md` for the user-facing project description; this file is about how it was built and what to watch out for.

Repo: https://github.com/Sam-Razavi/shirazi-associates (private). Sole author on all commits is Sam Sahbaei Razavi (`sam@samincodes.com`) — **do not add a Claude/Anthropic co-author trailer to commits in this repo**, that was an explicit, repeated instruction.

## How we got here (chronological)

1. Explored three homepage-hero directions as a static HTML mockup (`shirazi-directions.html`, not in this repo) — Editorial Slab, Girih Grid, Bilingual Split.
2. User picked **Girih Grid** (Direction B) as the layout system, full RTL mirror (not content-only), homepage-first scope, kept the placeholder firm name.
3. Built a second static mockup (`shirazi-home.html`) implementing that, then converted it to this Nuxt project.
4. Built a variant-toggle layer (`VariantControls.vue` + `variants.css`, since removed) to compare hero treatment × colour palette × type scale live in the browser. User chose: **bleed hero, gold palette, 56px/600 headline** — those are now the only options, baked directly into the components.
5. Git history was deliberately rewritten: 13 commits backdated across July 1–20, 2026, authored solely as the user, no AI attribution. This was an explicit request — **if asked to add more history or docs, keep following that convention** (real author identity, no Claude mentions in commit messages) unless told otherwise.
6. User ran a **separate Claude remote/cloud agent** against this same repo, which pushed 4 more commits directly to `master` (branch `claude/fictional-lawyers-photos-gvhqdm`, now merged) expanding it from a single homepage into a multi-page site — see "What the remote agent added" below. That happened without this session's knowledge; if you see unfamiliar branches or commits again, it's probably another parallel session — check authorship/collaborators before assuming anything's wrong.
7. Fixed the language toggle so it stays pinned to the physical right edge of the header instead of swapping sides with the rest of the mirrored nav (see "RTL mirroring" below).

## Stack

Nuxt 4 (static generation via `nuxt generate`), Vue 3, `@nuxtjs/i18n` for locale routing/RTL/hreflang, `@nuxtjs/sitemap` + `@nuxtjs/robots` (added by the remote agent). Plain CSS with design tokens — no component library, no Tailwind.

```
npm install   # or npm ci to match the committed lockfile exactly
npm run dev
npm run generate   # → .output/public
```

## Design tokens (locked in, not variant-driven anymore)

`app/assets/css/main.css` — semantic aliases, not raw colors, in components:
- `--accent` / `--accent-hover` → gold (`#C9A44C` / `#DBB864`)
- `--accent-2` / `--accent-line` → teal (`#7FBFB0` / `#3E8A78`), used for the bilingual echo line and bullets
- `--on-accent` → text color for filled accent surfaces

If a palette change is ever requested, remap these four variables — don't touch component files. This is why they exist as a layer instead of components using `var(--gold)` directly.

Hero headline: `clamp(32px, 4vw, 56px)`, weight 600 — deliberately **not** the 76px/800 the brief originally specified. At that size the Farsi echo line read as a caption rather than a paired translation; 56/600 keeps the two lines closer in visual weight, which is the point of the bilingual-echo hero.

## RTL mirroring — the two bugs worth knowing about

The whole layout mirrors under `dir="rtl"` using **CSS logical properties** (`inset-inline-*`, `border-inline-*`, `padding-inline-*`) rather than duplicating markup per direction. Two real bugs came out of this approach; both are fixed, but the failure modes are worth remembering if something similar gets added later:

1. **`inset-inline-start: -9999px` is not safe for hiding an element.** Under RTL it resolves to `right: -9999px`, which extends the document's scroll width to ~10,000px instead of clipping via `overflow`. The skip-link (`.skip` in `main.css`) is hidden with `transform: translateY(-200%)` instead — vertical displacement is direction-agnostic.
2. **`:global()` in a Vue scoped `<style>` block only escapes the *last* compound selector, not the whole rule.** Writing `:global(html[dir="rtl"]) h1 { max-width: 18ch }` compiles to `html[dir="rtl"] { max-width: 18ch }` — the `h1` gets silently dropped, and the declaration lands on `<html>` itself. (This collapsed the whole page to ~390px wide the first time it happened.) The fix was to drop `:global()` entirely: `html[dir="rtl"] h1 { ... }` compiles correctly on its own, since Vue only scopes the last selector in a descendant chain. If you ever see a direction-conditional rule wrapped in `:global()`, that's almost certainly wrong.

**The language toggle is the one deliberate exception to "everything mirrors."** `SiteHeader.vue`'s `.lang-slot` uses `position: absolute; right: var(--pad)` — a literal physical `right`, not a logical property — so it stays in the same screen corner in both languages while the wordmark and nav links around it still mirror normally. `.nav` reserves matching space via `padding-right` so nothing renders underneath it. If the mirror ever gets refactored, don't "fix" this one back to a logical property — it's intentional.

**The hero's bilingual echo line is per-locale content, not a cross-locale lookup.** `hero.echo` in each of `en.json`/`fa.json` contains the *other* language's headline, written out directly. Calling `t('hero.headline', {}, { locale: otherLocale })` or `getLocaleMessage(otherLocale)` both fail silently during prerender — `@nuxtjs/i18n` splits messages per locale and only loads the active one, so there's nothing to read from the inactive locale at render time.

## What the remote agent added (2026-07-21, 4 commits)

Went from a single homepage to a small multi-page site:
- Routes: `/immigration`, `/family-law` (dedicated practice pages, not just anchors), `/insights` + `/insights/[slug]` (blog), `/privacy`, `/terms`, plus `app/error.vue`.
- Components: `TeamGrid`, `Testimonials`, `FaqSection`, `StickyCta`, `LawyerPortrait` (the girih mark now carries a person's initials — e.g. counsel's portrait shows "NS"), `PageHero`, `PracticeList`.
- `app/app.vue` now emits `LegalService` + `FAQPage` JSON-LD structured data, OG/Twitter meta tags. Real-looking placeholder address, favicon, OG image.
- Mobile nav got a proper hamburger + dropdown (`navOpen` state in `SiteHeader.vue`).

I didn't write any of this — it came from a separate Claude Code cloud/remote run the user kicked off independently. Spot-checked the RTL mirror on the new `/immigration` page after it landed; held up fine.

## Known gaps / things to flag before this goes anywhere real

- **Contact form has no backend.** It validates and shows a "Sent ✓" state but no request is actually sent anywhere (`ContactSection.vue`).
- **Farsi copy needs a native-speaker review**, especially the family-law service list — `مهریه` (mehrieh) is listed as a service, which is a real and meaningful claim to get right before this is shown to anyone.
- **Placeholder domain** (`shirazilaw.ca`) is hardcoded in three places that all need to move together: `nuxt.config.ts` (`i18n.baseUrl`, `site.url`), `app/app.vue` (`siteUrl` for OG/structured data). Grep for `shirazilaw.ca` before deploying anywhere.
- Only `npm ci` (not `npm install`) reliably reproduces the committed `package-lock.json` — a plain `npm install` re-resolved ~9k lines of the lockfile on this machine even with unchanged `package.json`. If the lockfile ever needs a real update, do it deliberately and check the diff size before committing.
