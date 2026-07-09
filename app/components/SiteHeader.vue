<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <header class="nav">
    <NuxtLink class="wordmark" :to="localePath('/')">
      <GirihMark variant="mark" />
      <span>{{ t('firm') }}</span>
    </NuxtLink>

    <div class="nav-right">
      <nav class="nav-links" :aria-label="t('nav.aria')">
        <a href="#practice">{{ t('nav.immigration') }}</a>
        <a href="#practice">{{ t('nav.family') }}</a>
        <a href="#counsel">{{ t('nav.about') }}</a>
        <a href="#contact">{{ t('nav.contact') }}</a>
      </nav>
      <LangToggle />
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

@media (max-width: 900px) {
  .nav-links { display: none; }
}
</style>
