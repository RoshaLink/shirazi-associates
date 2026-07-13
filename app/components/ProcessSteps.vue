<script setup lang="ts">
const { t, tm, rt } = useI18n()

type Step = { title: string; body: string }

const steps = computed<Step[]>(() =>
  (tm('process.steps') as any[]).map(s => ({
    title: rt(s.title),
    body: rt(s.body)
  }))
)

/** Always Latin numerals, in both locales — they read as index markers, not prose. */
const number = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div class="section-head reveal">
    <p class="eyebrow">{{ t('process.eyebrow') }}</p>
    <h2>{{ t('process.heading') }}</h2>
  </div>

  <section class="grid">
    <div v-for="(step, i) in steps" :key="step.title" class="cell step reveal">
      <span class="n">{{ number(i) }}</span>
      <h3>{{ step.title }}</h3>
      <p>{{ step.body }}</p>
    </div>
  </section>
</template>

<style scoped>
.step { gap: var(--s4); padding-block: clamp(32px, 4.5vw, 56px); }

.n {
  font-family: var(--font-en);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .16em;
  color: var(--accent-2);
  font-variant-numeric: tabular-nums;
}

h3 { font-size: clamp(19px, 2vw, 24px); }

p {
  color: var(--ink-2);
  font-size: 15px;
  line-height: 1.7;
}
html[dir="rtl"] p { line-height: 2; }
</style>
