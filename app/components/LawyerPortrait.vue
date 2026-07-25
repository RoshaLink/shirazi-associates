<script setup lang="ts">
/**
 * Frames a portrait in the firm's own girih mark. Falls back to an
 * illustrated bust + initials when no photo is supplied, so this still
 * works as a stand-in before a real photo exists for someone.
 */
const props = withDefaults(defineProps<{
  initials: string
  photo?: string
  tone?: 'gold' | 'teal'
  size?: 'lg' | 'sm'
}>(), {
  tone: 'gold',
  size: 'lg'
})

const toneColor = computed(() => props.tone === 'teal' ? 'var(--teal-lt)' : 'var(--gold-hi)')
const clipId = `portrait-clip-${useId()}`
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

    <template v-if="photo">
      <clipPath :id="clipId">
        <circle cx="150" cy="150" r="106" />
      </clipPath>
      <image
        :href="photo" x="44" y="44" width="212" height="212"
        preserveAspectRatio="xMidYMid slice"
        :clip-path="`url(#${clipId})`"
      />
    </template>
    <template v-else>
      <path
        class="bust"
        d="M150 96a44 44 0 1 1 -.1 0Z
           M70 322c2-62 36-102 80-102s78 40 80 102Z"
      />
      <text x="150" y="166" text-anchor="middle" class="initials">{{ initials }}</text>
    </template>
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
