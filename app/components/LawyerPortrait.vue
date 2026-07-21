<script setup lang="ts">
/**
 * Illustrated stand-in for a portrait photo, built from the firm's own
 * girih mark rather than stock photography. Tone picks an accent from the
 * existing palette so each person in the firm reads as distinct.
 */
const props = withDefaults(defineProps<{
  initials: string
  tone?: 'gold' | 'teal'
  size?: 'lg' | 'sm'
}>(), {
  tone: 'gold',
  size: 'lg'
})

const toneColor = computed(() => props.tone === 'teal' ? 'var(--teal-lt)' : 'var(--gold-hi)')
</script>

<template>
  <svg
    class="portrait-mark"
    :class="size"
    :style="{ '--tone': toneColor }"
    viewBox="0 0 300 340" fill="none" aria-hidden="true"
  >
    <rect x="40" y="40" width="220" height="220" class="ring-outer" />
    <rect x="40" y="40" width="220" height="220" class="ring-inner" transform="rotate(45 150 150)" />
    <circle cx="150" cy="150" r="110" class="ring-accent" />

    <path
      class="bust"
      d="M150 96a44 44 0 1 1 -.1 0Z
         M70 322c2-62 36-102 80-102s78 40 80 102Z"
    />
    <text x="150" y="166" text-anchor="middle" class="initials">{{ initials }}</text>
  </svg>
</template>

<style scoped>
.portrait-mark { width: 100%; height: auto; display: block; }
.ring-outer { stroke: var(--line-2); }
.ring-inner { stroke: var(--accent-line); opacity: .5; }
.ring-accent { stroke: var(--tone); opacity: .55; }

.bust {
  fill: var(--bg-lift);
  stroke: var(--line-2);
  stroke-width: 1.5;
}

.initials {
  font-family: inherit;
  font-size: 40px;
  font-weight: 700;
  fill: var(--tone);
  letter-spacing: .02em;
}

.portrait-mark.sm .initials { font-size: 46px; }
</style>
