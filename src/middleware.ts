// Middleware is intentionally permissive: Keystatic will handle its own
// authentication and write operations using KEYSTATIC_SECRET or GitHub
// integration. Removing custom admin pages and APIs simplifies the flow.
export async function onRequest(context, next) {
  return next();
}
