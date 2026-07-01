export default defineNuxtConfig({
  compatibilityDate: '2026-07-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n'],

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
