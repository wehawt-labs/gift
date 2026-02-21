/**
 * Type declarations for Lemon Squeezy's lemon.js script.
 * This script is loaded via <Script> and exposes `window.LemonSqueezy`.
 */

interface LemonSqueezyUrlMethods {
  /**
   * Opens a checkout URL in the Lemon Squeezy overlay.
   */
  Open: (url: string) => void;
  /**
   * Closes the currently open checkout overlay.
   */
  Close: () => void;
}

interface LemonSqueezyEventHandler {
  Setup: (options: {
    eventHandler: (event: { event: string; data?: unknown }) => void;
  }) => void;
}

interface LemonSqueezyInstance {
  Url: LemonSqueezyUrlMethods;
  /**
   * Refreshes lemon.js listeners (useful after dynamic DOM updates).
   */
  Refresh: () => void;
}

declare global {
  interface Window {
    LemonSqueezy?: LemonSqueezyInstance;
    createLemonSqueezy?: () => void;
  }
}

export {};
