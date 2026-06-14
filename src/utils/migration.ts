import { Trip } from '@/types/trip';

export const CURRENT_VERSION = 2;

// Generic envelope structure
export type Envelope<T, V extends number> = { version: V; data: T };

// Concrete type for current Trip data
export type VersionedTripEnvelope = Envelope<Trip[], 2>;

/**
 * Migration logic for Trip[] data.
 */
export function migrateToLatest(payload: unknown): VersionedTripEnvelope {
  // 1. Identify if it's already an envelope
  if (isVersionedEnvelope(payload)) {
    const envelope = payload as Envelope<unknown[], number>;
    // If future versions are added, perform sequential migrations here
    if (envelope.version === 1) {
      return {
        version: CURRENT_VERSION,
        data: migrateV1ToV2(envelope.data as Record<string, unknown>[]),
      };
    }
    return payload as VersionedTripEnvelope;
  }

  // 2. Assume Legacy (v0) - Upgrade directly to current version envelope
  // v0 -> v1 -> v2
  const v1Data = (payload as Record<string, unknown>[]) || [];
  const v2Data = migrateV1ToV2(v1Data);

  return {
    version: CURRENT_VERSION,
    data: v2Data,
  };
}

function migrateV1ToV2(v1Data: Record<string, unknown>[]): Trip[] {
  return v1Data.map((t) => ({
    id: (t.id as string) || Date.now().toString() + Math.random(),
    prompt: (t.destination as string) || '',
    title: (t.destination as string) || 'Untitled Trip',
    content: (t.content as string) || '',
    createdAt: (t.createdAt as string) || new Date().toLocaleDateString(),
    start: undefined,
    stop: undefined,
  }));
}

function isVersionedEnvelope(payload: unknown): payload is Envelope<unknown, number> {
  return (
    typeof payload === 'object' && payload !== null && 'version' in payload && 'data' in payload
  );
}
