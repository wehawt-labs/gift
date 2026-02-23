/**
 * Type declarations for Lemon Squeezy's lemon.js script.
 * This script is loaded via <Script> and exposes `window.LemonSqueezy`.
 */

interface LemonSqueezyUrlMethods {
  /**
   * Opens a checkout URL in the Lemon Squeezy overlay.
   */
  Open: (url: string) => void
  /**
   * Closes the currently open checkout overlay.
   */
  Close: () => void
}

interface LemonSqueezyInstance {
  Url: LemonSqueezyUrlMethods
  /**
   * Refreshes lemon.js listeners (useful after dynamic DOM updates).
   */
  Refresh: () => void
}

interface Window {
  LemonSqueezy?: LemonSqueezyInstance
  createLemonSqueezy?: () => void
}
