import { readFileSync } from 'node:fs'

// Blog slugs come from the same i18n content the pages render, so the
// sitemap can't silently miss a post — insights/[slug].vue is a dynamic
// route the crawler can't enumerate on its own.
const insightSlugs = (
  JSON.parse(readFileSync(new URL('./i18n/locales/en.json', import.meta.url), 'utf-8')).insights?.items ?? []
).map((item: { slug: string }) => item.slug)

// GitHub Pages serves this repo from a /shirazi-associates/ subpath (not a custom
// domain), so every route, asset, and public/ file needs that prefix. Left as '/'
// for local dev; the deploy workflow sets NUXT_APP_BASE_URL=/shirazi-associates/
// for `nuxt generate`.
const baseURL = process.env.NUXT_APP_BASE_URL ?? '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  // site.url/i18n.baseUrl below are the bare origin only — @nuxtjs/sitemap and
  // @nuxtjs/i18n both build absolute URLs by prepending this to route paths that
  // the router has *already* prefixed with `app.baseURL`. Including the
  // /shirazi-associates path here too doubles it (confirmed by generating and
  // grepping the output — canonical/sitemap URLs came out as .../shirazi-associates/
  // shirazi-associates/...). If this ever moves to a custom domain, update this
  // alongside app/app.vue's siteUrl (which, unlike these, is NOT combined with an
  // already-prefixed path, so it keeps the full origin+base).
  site: {
    url: 'https://roshalink.github.io'
  },

  // The `github-pages` nitro preset writes .nojekyll and prerenders /404.html.
  nitro: {
    preset: 'github-pages'
  },

  sitemap: {
    urls: () => insightSlugs.flatMap((slug: string) => [
      `/insights/${slug}`,
      `/fa/insights/${slug}`
    ])
  },

  css: ['~/assets/css/main.css'],

  i18n: {
    // /            -> English
    // /fa          -> Farsi
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    // Required for absolute hreflang alternates. Bare origin — see site.url comment
    // above for why the /shirazi-associates path doesn't belong here too.
    baseUrl: 'https://roshalink.github.io',
    locales: [
      { code: 'en', language: 'en-CA', dir: 'ltr', name: 'English', file: 'en.json' },
      { code: 'fa', language: 'fa-IR', dir: 'rtl', name: 'فارسی',   file: 'fa.json' }
    ],
    bundle: { optimizeTranslationDirective: false },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      redirectOn: 'root',
      alwaysRedirect: false
    }
  },

  app: {
    baseURL,
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        // Files in public/ aren't touched by the router's auto-prefixing, so these
        // need baseURL joined in by hand or they 404 under the /shirazi-associates path.
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` },
        { rel: 'apple-touch-icon', href: `${baseURL}apple-touch-icon.png` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap'
        }
      ]
    }
  }
})
