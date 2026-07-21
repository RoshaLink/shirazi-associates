<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navOpen = ref(false)
const headerEl = ref<HTMLElement | null>(null)

function closeNav() { navOpen.value = false }

function onDocPointerDown(e: MouseEvent) {
  if (navOpen.value && headerEl.value && !headerEl.value.contains(e.target as Node)) closeNav()
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && navOpen.value) closeNav()
}

onMounted(() => {
  // mousedown (not click) so this fires before the toggle button's own click
  // handler swaps the hamburger/close icon via v-if — otherwise the DOM patch
  // races the containment check and the button's own click closes the menu
  // it just opened.
  document.addEventListener('mousedown', onDocPointerDown)
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocPointerDown)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header ref="headerEl" class="nav">
    <NuxtLink class="wordmark" :to="localePath('/')">
      <GirihMark variant="mark" />
      <span>{{ t('firm') }}</span>
    </NuxtLink>

    <div class="nav-right">
      <nav id="primary-nav" class="nav-links" :class="{ open: navOpen }" :aria-label="t('nav.aria')">
        <NuxtLink :to="localePath('/immigration')" @click="closeNav">{{ t('nav.immigration') }}</NuxtLink>
        <NuxtLink :to="localePath('/family-law')" @click="closeNav">{{ t('nav.family') }}</NuxtLink>
        <NuxtLink :to="{ path: localePath('/'), hash: '#counsel' }" @click="closeNav">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink :to="{ path: localePath('/'), hash: '#contact' }" @click="closeNav">{{ t('nav.contact') }}</NuxtLink>
      </nav>
      <LangToggle />
      <button
        type="button"
        class="nav-toggle"
        aria-controls="primary-nav"
        :aria-expanded="navOpen"
        :aria-label="navOpen ? t('nav.toggleClose') : t('nav.toggleOpen')"
        @click="navOpen = !navOpen"
      >
        <svg v-if="!navOpen" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" stroke-width="1.4" />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="1.4" />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s5);
  padding: 18px var(--pad);
  background: rgba(14, 14, 13, .88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}
.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -.01em;
  text-decoration: none;
}
html[dir="rtl"] .wordmark { letter-spacing: 0; }

.nav-right { display: flex; align-items: center; gap: var(--s6); }
.nav-links { display: flex; gap: var(--s6); font-size: 14px; color: var(--ink-2); }
.nav-links a { text-decoration: none; transition: color var(--dur) var(--ease-out); }
.nav-links a:hover { color: var(--ink); }

.nav-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ink);
  cursor: pointer;
}

@media (max-width: 900px) {
  .nav-toggle { display: inline-flex; }

  .nav-links {
    display: none;
    position: absolute;
    inset-inline: 0;
    top: 100%;
    flex-direction: column;
    gap: var(--s4);
    padding: var(--s5) var(--pad);
    background: var(--bg-lift);
    border-bottom: 1px solid var(--line);
  }
  .nav-links.open { display: flex; }
}
</style>
