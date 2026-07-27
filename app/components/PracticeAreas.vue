<script setup lang="ts">
const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

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
      <PracticeList :items="immigrationItems" />
      <NuxtLink class="more" :to="localePath('/immigration')">
        <span>{{ t('practice.immigration.cta') }}</span>
        <ArrowRight />
      </NuxtLink>
    </div>

    <div class="cell practice reveal">
      <h3>{{ t('practice.family.title') }}</h3>
      <PracticeList :items="familyItems" />
      <NuxtLink class="more" :to="localePath('/family-law')">
        <span>{{ t('practice.family.cta') }}</span>
        <ArrowRight />
      </NuxtLink>
    </div>

    <div class="cell practice reveal">
      <h3>{{ t('practice.overlap.title') }}</h3>
      <p class="lede overlap">{{ t('practice.overlap.body') }}</p>
    </div>
  </section>
</template>

<style scoped>
.practice {
  gap: var(--s5);
  padding-block: clamp(36px, 5vw, 64px);
  transition: background var(--dur) var(--ease-out);
}
.practice:hover { background: var(--bg-lift); }
h3 { font-size: clamp(22px, 2.4vw, 30px); }

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
