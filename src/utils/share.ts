import LZString from 'lz-string';
import { Trip } from '@/types/trip';
import { CURRENT_VERSION, migrateToLatest } from './migration';

export function generateShareUrl(trip: Trip): string {
  // Wrap data in versioned envelope
  const payload = {
    version: CURRENT_VERSION,
    data: [trip],
  };
  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(payload));
  return `${window.location.origin}${window.location.pathname}?payload=${compressed}`;
}

export function parseShareUrl(): Trip[] | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const payload = params.get('payload');
  if (!payload) return null;

  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(payload);
    if (!decompressed) return null;
    const rawData = JSON.parse(decompressed);

    // Use migration utility to normalize to current version
    const versioned = migrateToLatest(rawData);
    return versioned.data;
  } catch (e) {
    console.error('Decompression failed', e);
    return null;
  }
}
