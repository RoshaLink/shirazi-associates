<script setup lang="ts">
const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { root } = useReveal()

type Post = { slug: string; title: string; excerpt: string; date: string; readTime: string; body: string[] }
const posts = computed<Post[]>(() =>
  (tm('insights.items') as any[]).map(p => ({
    slug: rt(p.slug),
    title: rt(p.title),
    excerpt: rt(p.excerpt),
    date: rt(p.date),
    readTime: rt(p.readTime),
    body: (p.body as any[]).map(rt)
  }))
)

const post = computed(() => posts.value.find(p => p.slug === route.params.slug))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useHead(() => ({
  title: `${post.value?.title} — ${t('firm')}`,
  meta: [{ name: 'description', content: post.value?.excerpt }]
}))

// -u-ca-gregory pins the Gregorian calendar for fa-IR — the site uses
// Gregorian years throughout (see the footer copyright), and Intl's fa-IR
// default is the Solar Hijri calendar, which would read inconsistently here.
const dateFormatter = computed(() => new Intl.DateTimeFormat(locale.value === 'fa' ? 'fa-IR-u-ca-gregory' : 'en-CA', {
  year: 'numeric', month: 'long', day: 'numeric'
}))
</script>

<template>
  <main v-if="post" id="main" ref="root">
    <PageHero
      :eyebrow="t('insights.hero.eyebrow')"
      :heading="post.title"
    />

    <div class="meta reveal">
      <time :datetime="post.date">{{ dateFormatter.format(new Date(post.date)) }}</time>
      <span>·</span>
      <span>{{ post.readTime }}</span>
    </div>

    <article class="post-body reveal">
      <p v-for="(p, i) in post.body" :key="i">{{ p }}</p>
    </article>

    <p class="disclaimer reveal">{{ t('footer.legal') }}</p>

    <NuxtLink class="back reveal" :to="localePath('/insights')">
      <ArrowRight class="back-arrow" />
      <span>{{ t('nav.insights') }}</span>
    </NuxtLink>
  </main>
</template>

<style scoped>
.meta {
  padding: 0 var(--pad);
  margin-bottom: clamp(28px, 4vw, 48px);
  display: flex;
  align-items: center;
  gap: var(--s2);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--accent-2);
}

.post-body {
  padding: 0 var(--pad) clamp(40px, 5vw, 64px);
  max-width: 68ch;
  display: flex;
  flex-direction: column;
  gap: var(--s4);
  color: var(--ink);
  font-size: 17px;
  line-height: 1.8;
  border-bottom: 1px solid var(--line);
}
html[dir="rtl"] .post-body { line-height: 2.1; }

.disclaimer {
  padding: clamp(28px, 4vw, 48px) var(--pad) 0;
  max-width: 60ch;
  color: var(--ink-3);
  font-size: 13px;
  line-height: 1.6;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: var(--s5) var(--pad) clamp(56px, 8vw, 104px);
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}
.back-arrow { transform: scaleX(-1); }
html[dir="rtl"] .back-arrow { transform: none; }
</style>
