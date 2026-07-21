<script setup lang="ts">
defineProps<{
  eyebrow: string
  heading: string
  lede?: string
}>()
</script>

<template>
  <div class="section-head reveal">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ heading }}</h1>
    <p v-if="lede" class="lede">{{ lede }}</p>
  </div>
</template>

<style scoped>
h1 {
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 600;
  letter-spacing: -.02em;
  max-width: 20ch;
}
html[dir="rtl"] h1 {
  font-size: clamp(26px, 3.2vw, 42px);
  letter-spacing: 0;
  max-width: 22ch;
}
.lede { margin-top: var(--s2); }
</style>
