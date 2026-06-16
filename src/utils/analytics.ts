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
  TRIP_PLANNED: 'trip_planned',
  TRIP_SHARED: 'trip_shared',
  TRIP_EXPORTED: 'trip_exported',
  TRIP_DELETED: 'trip_deleted',
};
