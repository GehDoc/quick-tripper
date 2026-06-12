import { Trip } from '@/types/trip';

export const CURRENT_VERSION = 1;

// Generic envelope structure
export type Envelope<T, V extends number> = { version: V; data: T };

// Concrete type for current Trip data
export type VersionedTripEnvelope = Envelope<Trip[], 1>;

/**
 * Migration logic for Trip[] data.
 */
export function migrateToLatest(payload: unknown): VersionedTripEnvelope {
  // 1. Identify if it's already an envelope
  if (isVersionedEnvelope(payload)) {
    // If future versions are added, perform sequential migrations here
    return payload;
  }

  // 2. Assume Legacy (v0) - Upgrade directly to current version envelope
  return {
    version: CURRENT_VERSION,
    data: payload as Trip[],
  };
}

function isVersionedEnvelope(payload: unknown): payload is VersionedTripEnvelope {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'version' in payload &&
    (payload as { version: unknown }).version === 1
  );
}
