import { describe, it, expect } from 'vitest';
import { migrateToLatest, CURRENT_VERSION } from '@/utils/migration';
import { Trip } from '@/types/trip';

describe('Data Migration', () => {
  const mockTrip: Trip = {
    id: '1',
    destination: 'Paris',
    content: 'Nice trip',
    createdAt: '2026-06-12',
  };

  it('should migrate legacy (v0 - raw array) data to current version envelope', () => {
    const legacyData: Trip[] = [mockTrip];
    const result = migrateToLatest(legacyData);

    expect(result.version).toBe(CURRENT_VERSION);
    expect(result.data).toEqual(legacyData);
  });

  it('should pass through already versioned envelope data', () => {
    const versionedData = {
      version: CURRENT_VERSION,
      data: [mockTrip],
    };
    const result = migrateToLatest(versionedData);

    expect(result).toEqual(versionedData);
  });
});
