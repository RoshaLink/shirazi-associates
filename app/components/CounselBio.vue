<script setup lang="ts">
const { t, tm, rt } = useI18n()
const credentials = computed(() => (tm('counsel.credentials') as any[]).map(rt))
const initials = computed(() => t('counsel.name').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase())
const photo = publicAsset('/photos/nasrin-shirazi.jpg')
</script>

<template>
  <section id="counsel" class="counsel">
    <div class="portrait">
      <LawyerPortrait :initials="initials" :photo="photo" tone="gold" size="lg" />
    </div>

    <div class="bio">
      <p class="eyebrow">{{ t('counsel.eyebrow') }}</p>
      <h2>{{ t('counsel.name') }}</h2>
      <blockquote>{{ t('counsel.quote') }}</blockquote>
      <p class="lede">{{ t('counsel.body') }}</p>
      <ul class="credentials">
        <li v-for="c in credentials" :key="c">{{ c }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.counsel {
  display: grid;
  grid-template-columns: 1fr;
  border-block: 1px solid var(--line);
}
@media (min-width: 900px) {
  .counsel { grid-template-columns: 5fr 7fr; }
}

.portrait {
  position: relative;
  min-height: clamp(320px, 42vw, 520px);
  border-inline-end: 1px solid var(--line);
  background:
    linear-gradient(180deg, rgba(62, 138, 120, .10), transparent 55%),
    var(--bg-lift);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}
.portrait :deep(svg) {
  width: 82%;
  margin-bottom: -14%;
  opacity: .9;
}

.bio {
  padding: clamp(36px, 5vw, 72px) var(--pad);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--s5);
}
.bio h2 { font-size: clamp(26px, 3.2vw, 42px); }
html[dir="rtl"] .bio h2 { font-size: clamp(22px, 2.6vw, 34px); }

blockquote {
  margin: 0;
  padding-inline-start: var(--s5);
  border-inline-start: 1px solid var(--accent);
  font-size: clamp(17px, 1.8vw, 21px);
  line-height: 1.65;
  color: var(--ink);
}
html[dir="rtl"] blockquote { line-height: 2; }

.credentials {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s3);
  margin: 0;
  padding: var(--s5) 0 0;
  border-top: 1px solid var(--line);
}
.credentials li {
  list-style: none;
  font-size: 13px;
  color: var(--ink-2);
  border: 1px solid var(--line-2);
  border-radius: 2px;
  padding: 8px 14px;
}
</style>
