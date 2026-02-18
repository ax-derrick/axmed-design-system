// Mock for @sentry/nextjs in Storybook (Vite)
// Provides no-op stubs for Sentry methods used in helpers.ts
export const captureException = () => {}
export const captureMessage = () => {}
export const init = () => {}
export const setUser = () => {}
export const setTag = () => {}
export const setExtra = () => {}
export const withScope = (cb: (scope: unknown) => void) => cb({})
export default { captureException, captureMessage, init, setUser, setTag, setExtra, withScope }
