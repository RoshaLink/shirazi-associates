<script setup lang="ts">
/**
 * Nuxt renders error.vue as a replacement root, not nested inside app.vue's
 * NuxtPage — so the header/footer chrome has to be included explicitly here,
 * and this page needs its own lang/dir head tags rather than inheriting them.
 */
const { t } = useI18n()
const localePath = useLocalePath()
const { root } = useReveal()

const localeHead = useLocaleHead()
useHead(() => ({
  ...localeHead.value,
  title: `${t('notFound.heading')} — ${t('firm')}`
}))

function goHome() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div>
    <a class="skip" href="#main">{{ t('skip') }}</a>
    <SiteHeader />

    <main id="main" ref="root">
      <section class="not-found reveal">
        <p class="eyebrow">{{ t('notFound.eyebrow') }}</p>
        <h1>{{ t('notFound.heading') }}</h1>
        <p class="lede">{{ t('notFound.body') }}</p>
        <div class="cta">
          <button type="button" class="btn btn-primary" @click="goHome">
            {{ t('notFound.ctaPrimary') }}
          </button>
          <NuxtLink class="btn btn-ghost" :to="{ path: localePath('/'), hash: '#contact' }">
            {{ t('notFound.ctaSecondary') }}
          </NuxtLink>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.not-found {
  padding: clamp(72px, 12vw, 160px) var(--pad);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--s4);
}
h1 {
  font-size: clamp(30px, 4vw, 48px);
  font-weight: 600;
  letter-spacing: -.02em;
  max-width: 18ch;
}
html[dir="rtl"] h1 {
  font-size: clamp(25px, 3.2vw, 40px);
  letter-spacing: 0;
  max-width: 20ch;
}
.lede { max-width: 52ch; }
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s3);
  margin-top: var(--s2);
}
</style>
