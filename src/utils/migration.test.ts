import { describe, it, expect } from 'vitest';
import { migrateToLatest } from '@/utils/migration';

describe('Data Migration', () => {
  it('should migrate legacy (v0 - raw array) data to v2 envelope', () => {
    const legacyData = [
      {
        id: '1',
        destination: 'Paris',
        content: 'Nice trip',
        createdAt: '2026-06-12',
      },
    ];
    const result = migrateToLatest(legacyData);

    expect(result.version).toBe(2);
    expect(result.data[0].title).toBe('Paris');
    expect(result.data[0].prompt).toBe('Paris');
    expect(result.data[0].content).toBe('Nice trip');
  });

  it('should migrate v1 envelope to v2 envelope', () => {
    const v1Data = {
      version: 1,
      data: [
        {
          id: '1',
          destination: 'Tokyo',
          content: 'Amazing food',
          createdAt: '2026-06-12',
        },
      ],
    };
    const result = migrateToLatest(v1Data);

    expect(result.version).toBe(2);
    expect(result.data[0].title).toBe('Tokyo');
    expect(result.data[0].prompt).toBe('Tokyo');
  });

  it('should pass through v2 envelope data', () => {
    const v2Data = {
      version: 2,
      data: [
        {
          id: '1',
          prompt: 'User input',
          title: 'AI Title',
          content: 'Trip content',
          createdAt: '2026-06-12',
        },
      ],
    };
    const result = migrateToLatest(v2Data);

    expect(result.version).toBe(2);
    expect(result.data).toEqual(v2Data.data);
  });
});
