import { readFileSync } from 'node:fs'

// Blog slugs come from the same i18n content the pages render, so the
// sitemap can't silently miss a post — insights/[slug].vue is a dynamic
// route the crawler can't enumerate on its own.
const insightSlugs = (
  JSON.parse(readFileSync(new URL('./i18n/locales/en.json', import.meta.url), 'utf-8')).insights?.items ?? []
).map((item: { slug: string }) => item.slug)

export default defineNuxtConfig({
  compatibilityDate: '2026-07-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  // Required by @nuxtjs/sitemap/@nuxtjs/robots. Swap for the real domain
  // alongside i18n.baseUrl and app/app.vue's siteUrl below.
  site: {
    url: 'https://shirazilaw.ca'
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
    // Required for absolute hreflang alternates. Swap for the real domain.
    baseUrl: 'https://shirazilaw.ca',
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
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
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
