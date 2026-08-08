/**
 * Files in public/ (photos, favicon, etc.) aren't touched by the router's
 * baseURL prefixing the way component/asset imports are — a literal
 * `/photos/x.jpg` resolves against the site root, not the GitHub Pages
 * /shirazi-associates/ subpath, and 404s. Same issue nuxt.config.ts's
 * favicon/apple-touch-icon links hit; this is the equivalent fix for
 * public/ paths referenced from components. Always call from a component
 * setup (or elsewhere with an active Nuxt app instance) since it reads
 * runtime config.
 */
export function publicAsset(path: string) {
  const { app } = useRuntimeConfig()
  return app.baseURL.replace(/\/$/, '') + path
}
