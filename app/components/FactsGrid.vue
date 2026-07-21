<script setup lang="ts">
const { tm, rt } = useI18n()

type Fact = { label: string; value: string; note: string }

const facts = computed<Fact[]>(() =>
  (tm('facts') as any[]).map(f => ({
    label: rt(f.label),
    value: rt(f.value),
    note: rt(f.note)
  }))
)
</script>

<template>
  <section class="grid">
    <div v-for="fact in facts" :key="fact.label" class="cell fact reveal">
      <small>{{ fact.label }}</small>
      <strong>{{ fact.value }}</strong>
      <span>{{ fact.note }}</span>
    </div>
  </section>
</template>

<style scoped>
small {
  display: block;
  font-family: var(--font-en);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--s3);
}
html[dir="rtl"] small {
  font-family: var(--font-fa);
  letter-spacing: .04em;
}

strong {
  display: block;
  font-size: clamp(24px, 2.8vw, 36px);
  font-weight: 700;
  letter-spacing: -.02em;
}
html[dir="rtl"] strong {
  font-size: clamp(21px, 2.4vw, 30px);
  letter-spacing: 0;
}

span {
  display: block;
  margin-top: var(--s3);
  font-size: 15px;
  color: var(--ink-2);
  line-height: 1.65;
}
html[dir="rtl"] span { line-height: 2; }

@media (min-width: 900px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
  .grid > .cell:nth-child(3n) { border-inline-end: 1px solid var(--line); }
  .grid > .cell:nth-child(4n),
  .grid > .cell:last-child { border-inline-end: 0; }
}
</style>
