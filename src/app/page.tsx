// This page will effectively be bypassed by the middleware.
// The middleware redirects / to /login or /app/barbershops based on auth state.
export default function RootPage() {
  return null;
}
