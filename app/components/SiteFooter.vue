<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer>
    <div class="foot-grid">
      <div>
        <span class="wordmark">
          <GirihMark variant="mark" />
          <span>{{ t('firm') }}</span>
        </span>
      </div>

      <div>
        <h4>{{ t('footer.practice') }}</h4>
        <ul>
          <li><NuxtLink :to="localePath('/immigration')">{{ t('nav.immigration') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/family-law')">{{ t('nav.family') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4>{{ t('footer.firmCol') }}</h4>
        <ul>
          <li><NuxtLink :to="{ path: localePath('/'), hash: '#counsel' }">{{ t('nav.about') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/insights')">{{ t('nav.insights') }}</NuxtLink></li>
          <li><NuxtLink :to="{ path: localePath('/'), hash: '#contact' }">{{ t('nav.contact') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4>{{ t('footer.legalCol') }}</h4>
        <ul>
          <li><NuxtLink :to="localePath('/privacy')">{{ t('nav.privacy') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/terms')">{{ t('nav.terms') }}</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h4>{{ t('footer.office') }}</h4>
        <ul>
          <li class="plain">{{ t('footer.address') }}</li>
          <li><a href="tel:+14165550142" dir="ltr">+1 (416) 555-0142</a></li>
        </ul>
      </div>
    </div>

    <div class="foot-base">
      <span>{{ t('footer.copyright') }}</span>
      <span>{{ t('footer.legal') }}</span>
    </div>
  </footer>
</template>

<style scoped>
footer { padding: clamp(56px, 7vw, 88px) var(--pad) var(--s7); }

.foot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--s7);
  padding-bottom: var(--s7);
  border-bottom: 1px solid var(--line);
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 16px;
}

h4 {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--s4);
}

ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: var(--s3); }
ul a {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 32px;
  font-size: 14px;
  color: var(--ink-2);
  text-decoration: none;
  transition: color var(--dur) var(--ease-out);
}
ul a:hover { color: var(--ink); }
ul a::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: 8px;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--dur) var(--ease-out);
}
ul a:hover::after { transform: scaleX(1); }
.plain { font-size: 14px; color: var(--ink-2); line-height: 1.7; }

.foot-base {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--s4);
  padding-top: var(--s5);
  font-size: 13px;
  color: var(--ink-3);
  line-height: 1.7;
}
</style>
