<script setup lang="ts">
const { t, tm, rt } = useI18n()

const immigrationItems = computed(() => (tm('practice.immigration.items') as any[]).map(rt))
const familyItems = computed(() => (tm('practice.family.items') as any[]).map(rt))
</script>

<template>
  <div id="practice" class="section-head reveal">
    <p class="eyebrow">{{ t('practice.eyebrow') }}</p>
    <h2>{{ t('practice.heading') }}</h2>
  </div>

  <section class="grid">
    <div class="cell practice reveal">
      <h3>{{ t('practice.immigration.title') }}</h3>
      <ul>
        <li v-for="item in immigrationItems" :key="item">{{ item }}</li>
      </ul>
      <a class="more" href="#contact">
        <span>{{ t('practice.immigration.cta') }}</span>
        <ArrowRight />
      </a>
    </div>

    <div class="cell practice reveal">
      <h3>{{ t('practice.family.title') }}</h3>
      <ul>
        <li v-for="item in familyItems" :key="item">{{ item }}</li>
      </ul>
      <a class="more" href="#contact">
        <span>{{ t('practice.family.cta') }}</span>
        <ArrowRight />
      </a>
    </div>

    <div class="cell practice reveal">
      <h3>{{ t('practice.overlap.title') }}</h3>
      <p class="lede overlap">{{ t('practice.overlap.body') }}</p>
    </div>
  </section>
</template>

<style scoped>
.practice { gap: var(--s5); padding-block: clamp(36px, 5vw, 64px); }
h3 { font-size: clamp(22px, 2.4vw, 30px); }

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--s3);
  color: var(--ink-2);
  font-size: 15px;
}
li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  line-height: 1.6;
}
html[dir="rtl"] li { line-height: 1.9; }

/* diamond bullet — the girih square, at 6px */
li::before {
  content: "";
  flex: none;
  width: 6px;
  height: 6px;
  margin-top: .55em;
  border: 1px solid var(--accent-line);
  transform: rotate(45deg);
}

.overlap { font-size: 15px; }

.more {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  margin-top: var(--s2);
  color: var(--accent);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: color var(--dur) var(--ease-out);
}
.more:hover { color: var(--accent-hover); }
.more :deep(svg) { transition: transform var(--dur) var(--ease-out); }
.more:hover :deep(svg) { transform: translateX(4px); }
html[dir="rtl"] .more :deep(svg) { transform: scaleX(-1); }
html[dir="rtl"] .more:hover :deep(svg) { transform: scaleX(-1) translateX(4px); }
</style>
