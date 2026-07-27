<script setup lang="ts">
const { t, tm, rt } = useI18n()

type FaqItem = { question: string; answer: string }

const items = computed<FaqItem[]>(() =>
  (tm('faq.items') as any[]).map(i => ({
    question: rt(i.question),
    answer: rt(i.answer)
  }))
)
</script>

<template>
  <div class="section-head reveal">
    <p class="eyebrow">{{ t('faq.eyebrow') }}</p>
    <h2>{{ t('faq.heading') }}</h2>
  </div>

  <section class="faq">
    <details v-for="item in items" :key="item.question" class="faq-item reveal">
      <summary>{{ item.question }}</summary>
      <p class="answer">{{ item.answer }}</p>
    </details>
  </section>
</template>

<style scoped>
.faq { border-bottom: 1px solid var(--line); }

.faq-item {
  padding: var(--s5) var(--pad);
  border-bottom: 1px solid var(--line);
  transition: background var(--dur) var(--ease-out);
}
.faq-item:last-child { border-bottom: 0; }
.faq-item:hover { background: var(--bg-lift); }

summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s4);
  font-size: clamp(16px, 1.6vw, 19px);
  font-weight: 600;
}
summary::-webkit-details-marker { display: none; }
summary::after {
  content: "+";
  flex: none;
  color: var(--accent);
  font-size: 20px;
  line-height: 1;
  transition: transform var(--dur) var(--ease-out);
}
.faq-item[open] summary::after { transform: rotate(45deg); }

.answer {
  margin-top: var(--s4);
  max-width: 62ch;
  color: var(--ink-2);
  font-size: 15px;
  line-height: 1.7;
}
html[dir="rtl"] .answer { line-height: 2; }
</style>
