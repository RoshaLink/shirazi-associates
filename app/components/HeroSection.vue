<script setup lang="ts">
const { t, locale } = useI18n()

/**
 * The echo renders the headline in the *other* language, so the bilingual
 * gesture works in both directions — Farsi is never permanently the guest.
 *
 * Each locale file carries its own `hero.echo` rather than the component
 * reaching across locales: i18n splits messages per locale and loads them
 * on demand, so the inactive locale simply isn't there to read from.
 */
const otherLocale = computed(() => (locale.value === 'en' ? 'fa' : 'en'))
const echo = computed(() => t('hero.echo'))
</script>

<template>
  <section class="grid hero">
    <div class="cell type span-2 reveal">
      <p class="eyebrow">{{ t('hero.eyebrow') }}</p>
      <h1>{{ t('hero.headline') }}</h1>
      <p class="echo" :lang="otherLocale" :dir="otherLocale === 'fa' ? 'rtl' : 'ltr'">
        {{ echo }}
      </p>
      <p class="lede">{{ t('hero.lede') }}</p>
      <div class="cta">
        <a class="btn btn-primary" href="#contact">{{ t('hero.ctaPrimary') }}</a>
        <a class="btn btn-ghost" href="#practice">{{ t('hero.ctaSecondary') }}</a>
      </div>
    </div>

    <div class="cell art reveal">
      <GirihMark variant="hero" />
    </div>
  </section>
</template>

<style scoped>
.type {
  gap: var(--s5);
  padding-block: clamp(48px, 7vw, 96px);
}
h1 {
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 600;
  letter-spacing: -.02em;
  max-width: 16ch;
}
html[dir="rtl"] h1 {
  font-size: clamp(26px, 3.2vw, 44px);
  letter-spacing: 0;
  max-width: 18ch;
}

/* Echo line: Farsi under an English headline, English under a Farsi one.
   Each direction needs its own type treatment. */
.echo {
  text-align: start;
  color: var(--accent-2);
  font-family: var(--font-fa);
  font-size: clamp(19px, 2.2vw, 30px);
  font-weight: 500;
  line-height: 1.9;
}
html[dir="rtl"] .echo {
  font-family: var(--font-en);
  font-size: clamp(18px, 2vw, 26px);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -.02em;
}

.cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s3);
  margin-top: var(--s2);
}

/* Bleed treatment: the mark is scaled past its cell and cropped at the
   page edge. The clip lives on the hero section, whose box is exactly the
   page width — letting it spill to `body` instead produces real
   horizontal scroll, since an absolute/overflowing descendant still
   extends the document's scroll width. */
.hero { overflow: hidden; }

.art {
  align-items: center;
  justify-content: center;
  min-height: 300px;
  overflow: visible;
  position: relative;
  background: radial-gradient(120% 110% at 70% 18%, rgba(62, 138, 120, .11), transparent 62%);
}
.art :deep(svg) {
  width: min(150%, 560px);
  transform: translateX(22%);
  opacity: .55;
}
/* Crop off the opposite edge when the layout mirrors. */
html[dir="rtl"] .art :deep(svg) { transform: translateX(-22%); }
</style>
