<script setup lang="ts">
/**
 * The firm's mark: two squares at 45° (the girih eight-point star,
 * reduced to its construction lines) inside a circle.
 * Used at three scales — nav wordmark, hero panel, counsel portrait.
 */
withDefaults(defineProps<{ variant?: 'mark' | 'hero' | 'portrait' }>(), {
  variant: 'mark'
})
</script>

<template>
  <svg
    v-if="variant === 'mark'"
    width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true"
  >
    <rect x="1" y="1" width="18" height="18" stroke="var(--accent)" />
    <rect
      x="4.6" y="4.6" width="10.8" height="10.8"
      stroke="var(--accent-line)" transform="rotate(45 10 10)"
    />
  </svg>

  <svg
    v-else-if="variant === 'hero'"
    viewBox="0 0 200 200" fill="none" aria-hidden="true"
  >
    <rect x="30" y="30" width="140" height="140" stroke="var(--accent)" />
    <rect
      x="30" y="30" width="140" height="140"
      stroke="var(--accent-line)" transform="rotate(45 100 100)"
    />
    <circle cx="100" cy="100" r="70" stroke="var(--line-2)" />
    <circle cx="100" cy="100" r="26" stroke="var(--accent)" />
  </svg>

  <svg v-else viewBox="0 0 300 340" fill="none" aria-hidden="true">
    <rect x="40" y="40" width="220" height="220" stroke="var(--line-2)" />
    <rect
      x="40" y="40" width="220" height="220"
      stroke="var(--accent-line)" opacity=".55" transform="rotate(45 150 150)"
    />
    <circle cx="150" cy="150" r="110" stroke="var(--accent)" opacity=".5" />
    <circle cx="150" cy="150" r="52" stroke="var(--accent)" />
    <path d="M150 20v260M20 150h260" stroke="var(--line)" />
  </svg>
</template>
