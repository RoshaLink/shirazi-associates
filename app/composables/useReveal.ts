/**
 * Staggered scroll reveal. Adds `.in` to every `.reveal` inside the
 * given root as it enters the viewport, offsetting siblings by 60ms so
 * a row of cells arrives in sequence rather than all at once.
 *
 * Honours prefers-reduced-motion by revealing everything immediately.
 */
export function useReveal() {
  const root = ref<HTMLElement | null>(null)

  onMounted(() => {
    const targets = Array.from(
      (root.value ?? document).querySelectorAll<HTMLElement>('.reveal')
    )

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      targets.forEach(el => el.classList.add('in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter(e => e.isIntersecting)
          .forEach((entry, i) => {
            setTimeout(() => entry.target.classList.add('in'), i * 60)
            observer.unobserve(entry.target)
          })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    targets.forEach(el => observer.observe(el))
    onBeforeUnmount(() => observer.disconnect())
  })

  return { root }
}
