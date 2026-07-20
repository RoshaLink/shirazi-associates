<script setup lang="ts">
const { t } = useI18n()

/**
 * useLocaleHead supplies lang + dir (read from the locale definitions in
 * nuxt.config) plus canonical and hreflang alternate links — so the Farsi
 * pages are discoverable as translations rather than duplicate content.
 */
const localeHead = useLocaleHead()

useHead(() => ({
  ...localeHead.value,
  title: t('meta.title'),
  meta: [
    ...(localeHead.value.meta ?? []),
    { name: 'description', content: t('meta.description') }
  ]
}))
</script>

<template>
  <div>
    <a class="skip" href="#main">{{ t('skip') }}</a>
    <SiteHeader />
    <NuxtPage />
    <SiteFooter />
  </div>
</template>
