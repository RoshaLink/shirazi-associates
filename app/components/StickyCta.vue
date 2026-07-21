<script setup lang="ts">
const { t } = useI18n()

const pastHero = ref(false)
const nearContact = ref(false)
const visible = computed(() => pastHero.value && !nearContact.value)

let heroObserver: IntersectionObserver | null = null
let contactObserver: IntersectionObserver | null = null

onMounted(() => {
  const heroCta = document.getElementById('hero-cta')
  const contact = document.getElementById('contact')

  if (heroCta) {
    heroObserver = new IntersectionObserver(
      ([entry]) => { pastHero.value = !entry.isIntersecting },
      { threshold: 0 }
    )
    heroObserver.observe(heroCta)
  }

  if (contact) {
    contactObserver = new IntersectionObserver(
      ([entry]) => { nearContact.value = entry.isIntersecting },
      { threshold: 0 }
    )
    contactObserver.observe(contact)
  }
})

onBeforeUnmount(() => {
  heroObserver?.disconnect()
  contactObserver?.disconnect()
})
</script>

<template>
  <div class="sticky-cta" :class="{ visible }">
    <a class="btn btn-primary" href="#contact">{{ t('hero.ctaPrimary') }}</a>
  </div>
</template>

<style scoped>
.sticky-cta {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  padding: var(--s4) var(--pad);
  padding-bottom: max(var(--s4), env(safe-area-inset-bottom));
  background: rgba(14, 14, 13, .88);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--line);
  opacity: 0;
  transform: translateY(100%);
  pointer-events: none;
  transition: opacity var(--dur) var(--ease-out), transform var(--dur) var(--ease-out);
}
.sticky-cta.visible {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.sticky-cta .btn { width: 100%; max-width: 360px; }
</style>
