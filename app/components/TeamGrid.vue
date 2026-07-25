<script setup lang="ts">
const { t, tm, rt } = useI18n()

type Member = { name: string; title: string; body: string; tone: 'gold' | 'teal'; credentials: string[]; photo: string }

// Matches team.members' order in both locale files (asset paths aren't
// translatable content, so they live here rather than in the i18n JSON).
const photos = ['/photos/aram-kiani.jpg', '/photos/leila-farrokhzad.jpg']

const members = computed<Member[]>(() =>
  (tm('team.members') as any[]).map((m, i) => ({
    name: rt(m.name),
    title: rt(m.title),
    body: rt(m.body),
    tone: rt(m.tone) as 'gold' | 'teal',
    credentials: (m.credentials as any[]).map(rt),
    photo: photos[i]
  }))
)

const initials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
</script>

<template>
  <div class="section-head reveal">
    <p class="eyebrow">{{ t('team.eyebrow') }}</p>
    <h2>{{ t('team.heading') }}</h2>
  </div>

  <section class="team">
    <article v-for="member in members" :key="member.name" class="member reveal">
      <div class="thumb">
        <LawyerPortrait :initials="initials(member.name)" :photo="member.photo" :tone="member.tone" size="sm" />
      </div>
      <div class="info">
        <h3>{{ member.name }}</h3>
        <p class="title">{{ member.title }}</p>
        <p class="body">{{ member.body }}</p>
        <ul class="credentials">
          <li v-for="c in member.credentials" :key="c">{{ c }}</li>
        </ul>
      </div>
    </article>
  </section>
</template>

<style scoped>
.team {
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 1px solid var(--line);
}
@media (min-width: 700px) {
  .team { grid-template-columns: 1fr 1fr; }
}

.member {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: var(--s5);
  padding: clamp(24px, 3.5vw, 40px) var(--pad);
  border-bottom: 1px solid var(--line);
  border-inline-end: 1px solid var(--line);
}
@media (min-width: 700px) {
  .member:nth-child(2n) { border-inline-end: 0; }
}
.member:last-child,
.member:nth-last-child(2):nth-child(odd) { border-bottom: 0; }

.thumb { align-self: start; }

.info h3 { font-size: clamp(18px, 2vw, 22px); }

.title {
  margin-top: var(--s1);
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-2);
}

.body {
  margin-top: var(--s3);
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.7;
}
html[dir="rtl"] .body { line-height: 2; }

.credentials {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s2);
  margin: 0;
  padding: var(--s4) 0 0;
}
.credentials li {
  list-style: none;
  font-size: 12px;
  color: var(--ink-2);
  border: 1px solid var(--line-2);
  border-radius: 2px;
  padding: 6px 10px;
}
</style>
