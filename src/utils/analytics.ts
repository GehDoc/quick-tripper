/**
 * Utility to track custom events with Umami Analytics.
 * Events are only tracked if the Umami script is loaded.
 */

interface Umami {
  track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
}

declare global {
  interface Window {
    umami?: Umami;
  }
}

export const trackEvent = (
  eventName: string,
  eventData?: Record<string, string | number | boolean>,
) => {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, eventData);
  }
};

export const ANALYTICS_EVENTS = {
  TRIP_GENERATION_SUCCESS: 'trip_generation_success',
  TRIP_SHARED: 'trip_shared',
  TRIP_EXPORTED: 'trip_exported',
  TRIP_DELETED: 'trip_deleted',
  TRIP_GENERATION_STARTED: 'trip_generation_started',
  TRIP_GENERATION_FAILED: 'trip_generation_failed',
};
