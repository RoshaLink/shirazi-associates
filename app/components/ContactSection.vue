<script setup lang="ts">
const { t, tm, rt } = useI18n()

const matterOptions = computed(() => (tm('contact.form.matterOptions') as any[]).map(rt))

const form = reactive({ name: '', contact: '', matter: '', message: '' })
const touched = reactive<Record<string, boolean>>({ name: false, contact: false })
const sent = ref(false)

const errors = computed(() => ({
  name: form.name.trim() === '',
  contact: form.contact.trim() === ''
}))

/** Validate on blur, not on keystroke — errors appear once, below the field. */
const showError = (field: 'name' | 'contact') => touched[field] && errors.value[field]

function submit() {
  touched.name = true
  touched.contact = true
  if (errors.value.name || errors.value.contact) {
    const first = errors.value.name ? 'f-name' : 'f-contact'
    document.getElementById(first)?.focus()
    return
  }
  // Frontend-only mockup: no endpoint is wired up.
  sent.value = true
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="pitch">
      <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
      <h2>{{ t('contact.heading') }}</h2>
      <p class="lede">{{ t('contact.lede') }}</p>

      <div class="direct">
        <a href="tel:+14165550142">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M3 4c0-.6.4-1 1-1h2l1.4 3.2-1.6 1.2a10 10 0 004.8 4.8l1.2-1.6L15 12v2c0 .6-.4 1-1 1A11 11 0 013 4z"
              stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"
            />
          </svg>
          <span dir="ltr">+1 (416) 555-0142</span>
        </a>
        <a href="mailto:hello@shirazilaw.ca">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <rect x="2" y="4" width="14" height="10" stroke="currentColor" stroke-width="1.3" />
            <path d="M2 5l7 5 7-5" stroke="currentColor" stroke-width="1.3" />
          </svg>
          <span dir="ltr">hello@shirazilaw.ca</span>
        </a>
      </div>
    </div>

    <form novalidate @submit.prevent="submit">
      <div class="field" :class="{ invalid: showError('name') }">
        <label for="f-name">{{ t('contact.form.name') }}</label>
        <input
          id="f-name" v-model="form.name" type="text" autocomplete="name"
          :aria-invalid="showError('name')"
          :aria-describedby="showError('name') ? 'e-name' : undefined"
          @blur="touched.name = true"
        >
        <p v-if="showError('name')" id="e-name" class="error">
          {{ t('contact.form.nameError') }}
        </p>
      </div>

      <div class="field" :class="{ invalid: showError('contact') }">
        <label for="f-contact">{{ t('contact.form.contact') }}</label>
        <input
          id="f-contact" v-model="form.contact" type="text" autocomplete="email"
          :aria-invalid="showError('contact')"
          aria-describedby="h-contact"
          @blur="touched.contact = true"
        >
        <p id="h-contact" class="hint">{{ t('contact.form.contactHint') }}</p>
        <p v-if="showError('contact')" class="error">
          {{ t('contact.form.contactError') }}
        </p>
      </div>

      <div class="field">
        <label for="f-matter">{{ t('contact.form.matter') }}</label>
        <select id="f-matter" v-model="form.matter">
          <option v-for="opt in matterOptions" :key="opt" :value="opt">{{ opt }}</option>
        </select>
      </div>

      <div class="field">
        <label for="f-msg">{{ t('contact.form.message') }}</label>
        <textarea id="f-msg" v-model="form.message" rows="4" aria-describedby="h-msg" />
        <p id="h-msg" class="hint">{{ t('contact.form.messageHint') }}</p>
      </div>

      <button class="btn btn-primary" type="submit" :disabled="sent">
        {{ sent ? t('contact.form.sent') : t('contact.form.submit') }}
      </button>

      <p class="disclaimer">{{ t('contact.form.disclaimer') }}</p>
    </form>
  </section>
</template>

<style scoped>
.contact { display: grid; grid-template-columns: 1fr; }
@media (min-width: 900px) {
  .contact { grid-template-columns: 1fr 1fr; }
}

.pitch {
  padding: clamp(48px, 7vw, 104px) var(--pad);
  border-inline-end: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--s5);
  background:
    linear-gradient(180deg, rgba(14, 14, 13, .75), rgba(14, 14, 13, .93) 70%, var(--bg) 100%),
    url('/photos/toronto-skyline.jpg') center / cover no-repeat;
}
.pitch h2 { font-size: clamp(28px, 3.6vw, 48px); max-width: 16ch; }
html[dir="rtl"] .pitch h2 { font-size: clamp(23px, 3vw, 38px); }

.direct { display: flex; flex-direction: column; gap: var(--s4); margin-top: var(--s2); }
.direct a {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  font-size: 17px;
  text-decoration: none;
  transition: color var(--dur) var(--ease-out);
}
.direct a:hover { color: var(--accent); }
.direct a svg { flex: none; color: var(--accent); }

form {
  padding: clamp(48px, 7vw, 104px) var(--pad);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: var(--s5);
}

.field { display: flex; flex-direction: column; gap: var(--s2); }
.field label {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-2);
  letter-spacing: .02em;
}
.hint { font-size: 12px; color: var(--ink-3); line-height: 1.5; }

input, select, textarea {
  background: var(--bg-lift);
  color: var(--ink);
  border: 1px solid var(--ink-3);
  border-radius: 2px;
  padding: 14px 16px;
  min-height: 52px;
  font-family: inherit;
  font-size: 16px;
  transition: border-color var(--dur) var(--ease-out);
}
textarea { min-height: 120px; resize: vertical; line-height: 1.6; }
input:hover, select:hover, textarea:hover { border-color: var(--ink-2); }
input:focus, select:focus, textarea:focus { border-color: var(--accent-line); }
input::placeholder, textarea::placeholder { color: var(--ink-3); }

.invalid input, .invalid select, .invalid textarea { border-color: var(--danger); }
.error { font-size: 13px; color: var(--danger); }

.disclaimer {
  font-size: 13px;
  color: var(--ink-3);
  line-height: 1.6;
  max-width: 46ch;
}
</style>
