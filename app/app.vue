<script setup lang="ts">
const { t, tm, rt, locale } = useI18n()

/**
 * useLocaleHead supplies lang + dir (read from the locale definitions in
 * nuxt.config) plus canonical and hreflang alternate links — so the Farsi
 * pages are discoverable as translations rather than duplicate content.
 */
const localeHead = useLocaleHead()

// Same domain nuxt.config.ts's i18n.baseUrl already uses for hreflang —
// swap both together if this ever moves off GitHub Pages.
const siteUrl = 'https://roshalink.github.io/shirazi-associates'
const ogImage = `${siteUrl}/og-image.png`

/**
 * One site-wide LegalService schema, since the firm identity/address/staff
 * don't vary by page — same reasoning as centralizing title/OG/Twitter meta
 * here rather than per-page. FAQPage is a near-free addition since faq.items
 * already has the exact question/answer shape schema.org wants.
 */
const structuredData = computed(() => {
  const employees = [
    { name: t('counsel.name'), jobTitle: 'Lawyer' },
    ...(tm('team.members') as any[]).map(m => ({ name: rt(m.name), jobTitle: rt(m.title) }))
  ]
  const faqItems = tm('faq.items') as any[]

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: t('firm'),
      url: siteUrl,
      image: ogImage,
      telephone: '+1-416-555-0142',
      email: 'hello@shirazilaw.ca',
      address: {
        '@type': 'PostalAddress',
        streetAddress: t('footer.addressStructured.streetAddress'),
        addressLocality: t('footer.addressStructured.addressLocality'),
        addressRegion: t('footer.addressStructured.addressRegion'),
        postalCode: t('footer.addressStructured.postalCode'),
        addressCountry: t('footer.addressStructured.addressCountry')
      },
      areaServed: 'Ontario, Canada',
      knowsLanguage: ['en', 'fa'],
      employee: employees
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: rt(item.question),
        acceptedAnswer: { '@type': 'Answer', text: rt(item.answer) }
      }))
    }
  ]
})

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
    ],
    script: structuredData.value.map(data => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(data)
    }))
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
