<script setup lang="ts">
const { t, locale } = useI18n()

/**
 * useLocaleHead supplies lang + dir (read from the locale definitions in
 * nuxt.config) plus canonical and hreflang alternate links — so the Farsi
 * pages are discoverable as translations rather than duplicate content.
 */
const localeHead = useLocaleHead()

// Same placeholder domain nuxt.config.ts's i18n.baseUrl already uses for
// hreflang — swap both together for the real domain.
const siteUrl = 'https://shirazilaw.ca'
const ogImage = `${siteUrl}/og-image.png`

useHead(() => {
  const canonical = localeHead.value.link?.find(l => l.rel === 'canonical')?.href ?? siteUrl

  return {
    ...localeHead.value,
    title: t('meta.title'),
    meta: [
      ...(localeHead.value.meta ?? []),
      { name: 'description', content: t('meta.description') },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: t('meta.title') },
      { property: 'og:description', content: t('meta.description') },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: ogImage },
      { property: 'og:locale', content: locale.value === 'fa' ? 'fa_IR' : 'en_CA' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: t('meta.title') },
      { name: 'twitter:description', content: t('meta.description') },
      { name: 'twitter:image', content: ogImage }
    ]
  }
})
</script>

<template>
  <div>
    <a class="skip" href="#main">{{ t('skip') }}</a>
    <SiteHeader />
    <NuxtPage />
    <SiteFooter />
  </div>
</template>
