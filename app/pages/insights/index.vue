<script setup lang="ts">
const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()
const { root } = useReveal()

useHead(() => ({
  title: `${t('insights.hero.heading')} — ${t('firm')}`,
  meta: [{ name: 'description', content: t('insights.hero.lede') }]
}))

type Post = { slug: string; title: string; excerpt: string; date: string; readTime: string }
const posts = computed<Post[]>(() =>
  (tm('insights.items') as any[]).map(p => ({
    slug: rt(p.slug),
    title: rt(p.title),
    excerpt: rt(p.excerpt),
    date: rt(p.date),
    readTime: rt(p.readTime)
  }))
)

// -u-ca-gregory pins the Gregorian calendar for fa-IR — the site uses
// Gregorian years throughout (see the footer copyright), and Intl's fa-IR
// default is the Solar Hijri calendar, which would read inconsistently here.
const dateFormatter = computed(() => new Intl.DateTimeFormat(locale.value === 'fa' ? 'fa-IR-u-ca-gregory' : 'en-CA', {
  year: 'numeric', month: 'long', day: 'numeric'
}))
const formatDate = (iso: string) => dateFormatter.value.format(new Date(iso))
</script>

<template>
  <main id="main" ref="root">
    <PageHero
      :eyebrow="t('insights.hero.eyebrow')"
      :heading="t('insights.hero.heading')"
      :lede="t('insights.hero.lede')"
    />

    <section class="posts">
      <NuxtLink
        v-for="post in posts" :key="post.slug"
        class="post reveal"
        :to="localePath(`/insights/${post.slug}`)"
      >
        <div class="meta">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span>·</span>
          <span>{{ post.readTime }}</span>
        </div>
        <h2>{{ post.title }}</h2>
        <p>{{ post.excerpt }}</p>
        <span class="more">
          {{ t('nav.insights') }}
          <ArrowRight />
        </span>
      </NuxtLink>
    </section>
  </main>
</template>

<style scoped>
.posts {
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 1px solid var(--line);
}
@media (min-width: 700px) {
  .posts { grid-template-columns: 1fr 1fr; }
}

.post {
  display: flex;
  flex-direction: column;
  gap: var(--s3);
  padding: clamp(28px, 4vw, 48px) var(--pad);
  border-bottom: 1px solid var(--line);
  border-inline-end: 1px solid var(--line);
  color: inherit;
  text-decoration: none;
  transition: background var(--dur) var(--ease-out);
}
@media (min-width: 700px) {
  .post:nth-child(2n) { border-inline-end: 0; }
}
.post:hover { background: var(--bg-lift); }

.meta {
  display: flex;
  align-items: center;
  gap: var(--s2);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--accent-2);
}

.post h2 { font-size: clamp(19px, 2.1vw, 24px); }
.post p { color: var(--ink-2); font-size: 15px; line-height: 1.65; }
html[dir="rtl"] .post p { line-height: 1.9; }

.more {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: var(--s2);
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
}
.more :deep(svg) { transition: transform var(--dur) var(--ease-out); }
.post:hover .more :deep(svg) { transform: translateX(4px); }
html[dir="rtl"] .more :deep(svg) { transform: scaleX(-1); }
html[dir="rtl"] .post:hover .more :deep(svg) { transform: scaleX(-1) translateX(4px); }
</style>
