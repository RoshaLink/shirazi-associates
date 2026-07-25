<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()
const { root } = useReveal()

useHead(() => ({
  title: `${t('immigrationPage.hero.heading')} — ${t('firm')}`,
  meta: [{ name: 'description', content: t('immigrationPage.hero.lede') }]
}))

const intro = computed(() => (tm('immigrationPage.intro') as any[]).map(rt))

type Service = { title: string; body: string[] }
const services = computed<Service[]>(() =>
  (tm('immigrationPage.services') as any[]).map(s => ({
    title: rt(s.title),
    body: (s.body as any[]).map(rt)
  }))
)
</script>

<template>
  <main id="main" ref="root">
    <PageHero
      :eyebrow="t('immigrationPage.hero.eyebrow')"
      :heading="t('immigrationPage.hero.heading')"
      :lede="t('immigrationPage.hero.lede')"
      image="/photos/scales-of-justice.jpg"
    />

    <section class="intro reveal">
      <p v-for="(p, i) in intro" :key="i">{{ p }}</p>
    </section>

    <section class="services">
      <article v-for="service in services" :key="service.title" class="service reveal">
        <h2>{{ service.title }}</h2>
        <p v-for="(p, i) in service.body" :key="i">{{ p }}</p>
      </article>
    </section>

    <section class="cta reveal">
      <h2>{{ t('immigrationPage.cta.heading') }}</h2>
      <p>{{ t('immigrationPage.cta.body') }}</p>
      <NuxtLink class="btn btn-primary" :to="{ path: localePath('/'), hash: '#contact' }">
        {{ t('immigrationPage.cta.button') }}
      </NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.intro {
  padding: 0 var(--pad) clamp(28px, 4vw, 48px);
  display: flex;
  flex-direction: column;
  gap: var(--s4);
  max-width: 68ch;
  border-bottom: 1px solid var(--line);
  padding-bottom: clamp(40px, 5vw, 64px);
  color: var(--ink-2);
  font-size: 16px;
  line-height: 1.75;
}
html[dir="rtl"] .intro { line-height: 2; }

.services { border-bottom: 1px solid var(--line); }
.service {
  padding: clamp(32px, 4.5vw, 56px) var(--pad);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: var(--s3);
  max-width: 68ch;
}
.service:last-child { border-bottom: 0; }
.service h2 { font-size: clamp(20px, 2.2vw, 26px); }
.service p { color: var(--ink-2); font-size: 15px; line-height: 1.7; }
html[dir="rtl"] .service p { line-height: 2; }

.cta {
  padding: clamp(56px, 8vw, 104px) var(--pad);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--s4);
}
.cta h2 { font-size: clamp(26px, 3vw, 38px); max-width: 18ch; }
.cta p { color: var(--ink-2); max-width: 48ch; }
</style>
