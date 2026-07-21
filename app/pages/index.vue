<script setup lang="ts">
const { root } = useReveal()
</script>

<template>
  <main id="main" ref="root">
    <HeroSection />
    <FactsGrid />
    <PracticeAreas />
    <ProcessSteps />
    <CounselBio />
    <TeamGrid />
    <Testimonials />
    <FaqSection />
    <ContactSection />
  </main>
</template>
