<script setup lang="ts">
const props = defineProps<{
  eyebrow: string
  heading: string
  lede?: string
  image?: string
}>()

const style = computed(() => props.image ? { '--hero-image': `url(${props.image})` } : {})
</script>

<template>
  <div class="section-head reveal" :class="{ 'has-image': !!image }" :style="style">
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

/* Dark scrim keeps text AA-legible over a photo without a separate overlay
   element — same two-layer background trick as HeroSection's gradients. */
.has-image {
  background:
    linear-gradient(180deg, rgba(14, 14, 13, .55), rgba(14, 14, 13, .93) 75%, var(--bg) 100%),
    var(--hero-image) center / cover no-repeat;
  padding-block: clamp(72px, 11vw, 152px) clamp(48px, 7vw, 88px);
}
</style>
