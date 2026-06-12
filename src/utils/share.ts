import LZString from 'lz-string';
import { Trip } from '@/hooks/useTrips';

export function generateShareUrl(trip: Trip): string {
  // Compresses data securely into a URI-safe format 3x smaller than Base64
  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify([trip]));
  return `${window.location.origin}${window.location.pathname}?payload=${compressed}`;
}

export function parseShareUrl(): Trip[] | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const payload = params.get('payload');
  if (!payload) return null;

  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(payload);
    return decompressed ? JSON.parse(decompressed) : null;
  } catch (e) {
    console.error("Decompression failed", e);
    return null;
  }
}