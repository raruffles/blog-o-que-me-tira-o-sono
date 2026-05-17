// Compatibility stub for @keystatic/astro internal import.
// Previously used to inject client-side overrides. Keeping a minimal
// no-op file avoids Vite resolution errors while leaving Keystatic UI untouched.
if (typeof document !== 'undefined') {
  // No-op: intentionally empty to satisfy import resolution.
}
