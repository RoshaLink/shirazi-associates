<script setup lang="ts">
const { t, tm, rt } = useI18n()
const { root } = useReveal()

useHead(() => ({
  title: `${t('privacy.hero.heading')} — ${t('firm')}`,
  meta: [{ name: 'description', content: t('privacy.hero.lede') }]
}))

type Section = { heading: string; body: string[] }
const sections = computed<Section[]>(() =>
  (tm('privacy.sections') as any[]).map(s => ({
    heading: rt(s.heading),
    body: (s.body as any[]).map(rt)
  }))
)
</script>

<template>
  <main id="main" ref="root">
    <PageHero
      :eyebrow="t('privacy.hero.eyebrow')"
      :heading="t('privacy.hero.heading')"
      :lede="t('privacy.hero.lede')"
    />

    <p class="updated reveal">{{ t('privacy.updated') }}</p>

    <section class="legal-body">
      <article v-for="section in sections" :key="section.heading" class="section reveal">
        <h2>{{ section.heading }}</h2>
        <p v-for="(p, i) in section.body" :key="i">{{ p }}</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.updated {
  padding: 0 var(--pad);
  margin-bottom: clamp(28px, 4vw, 48px);
  color: var(--ink-3);
  font-size: 13px;
}

.legal-body { border-bottom: 1px solid var(--line); }
.section {
  padding: clamp(28px, 4vw, 48px) var(--pad);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: var(--s3);
  max-width: 68ch;
}
.section:last-child { border-bottom: 0; padding-bottom: clamp(56px, 8vw, 104px); }
.section h2 { font-size: clamp(19px, 2vw, 23px); }
.section p { color: var(--ink-2); font-size: 15px; line-height: 1.75; }
html[dir="rtl"] .section p { line-height: 2; }
</style>
