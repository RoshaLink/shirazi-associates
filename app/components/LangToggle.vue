<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="lang" role="group" :aria-label="t('nav.langGroup')">
    <NuxtLink
      :to="switchLocalePath('en')"
      lang="en"
      :aria-current="locale === 'en' ? 'true' : undefined"
      :class="{ active: locale === 'en' }"
    >EN</NuxtLink>
    <NuxtLink
      :to="switchLocalePath('fa')"
      lang="fa"
      :aria-current="locale === 'fa' ? 'true' : undefined"
      :class="{ active: locale === 'fa' }"
    >فا</NuxtLink>
  </div>
</template>

<style scoped>
.lang {
  display: flex;
  border: 1px solid var(--line-2);
  border-radius: 2px;
  overflow: hidden;
}
.lang a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  min-width: 48px;
  padding: 0 14px;
  text-decoration: none;
  color: var(--ink-2);
  font-family: var(--font-en);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .1em;
  transition: background var(--dur) var(--ease-out), color var(--dur) var(--ease-out);
}
.lang a:last-child {
  font-family: var(--font-fa);
  font-size: 14px;
  letter-spacing: 0;
}
.lang a.active { background: var(--accent); color: var(--on-accent); }
</style>
