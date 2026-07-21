<script setup lang="ts">
const { t, tm, rt } = useI18n()

type Testimonial = { quote: string; attribution: string }

const items = computed<Testimonial[]>(() =>
  (tm('testimonials.items') as any[]).map(i => ({
    quote: rt(i.quote),
    attribution: rt(i.attribution)
  }))
)
</script>

<template>
  <div class="section-head reveal">
    <p class="eyebrow">{{ t('testimonials.eyebrow') }}</p>
    <h2>{{ t('testimonials.heading') }}</h2>
  </div>

  <section class="grid">
    <blockquote v-for="item in items" :key="item.attribution" class="cell testimonial reveal">
      <p class="quote">{{ item.quote }}</p>
      <p class="attribution">{{ item.attribution }}</p>
    </blockquote>
  </section>
</template>

<style scoped>
.testimonial { margin: 0; gap: var(--s4); padding-block: clamp(32px, 4.5vw, 56px); }

.quote {
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink);
}
html[dir="rtl"] .quote { line-height: 2; }
.quote::before { content: "\201C"; color: var(--accent); }
.quote::after { content: "\201D"; color: var(--accent); }

.attribution {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-2);
}
</style>
