import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateItinerary } from './ai';

describe('ai service', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should parse a valid JSON response from Gemini', async () => {
    const mockResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: JSON.stringify({
                  title: 'Tokyo Adventure',
                  start: 'Tokyo',
                  stop: 'Kyoto',
                  content: '# Day 1: Arrive in Tokyo',
                }),
              },
            ],
          },
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await generateItinerary({ apiKey: 'test-key', prompt: 'Trip to Japan' });

    expect(result.title).toBe('Tokyo Adventure');
    expect(result.start).toBe('Tokyo');
    expect(result.content).toContain('Day 1');
  });

  it('should throw an error if Gemini response is not valid JSON', async () => {
    const mockResponse = {
      candidates: [
        {
          content: {
            parts: [
              {
                text: 'Not a JSON string',
              },
            ],
          },
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    await expect(
      generateItinerary({ apiKey: 'test-key', prompt: 'Trip to Japan' }),
    ).rejects.toThrow('Invalid response format from AI.');
  });

  it('should throw an error if API response is not ok', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: () => Promise.resolve({ error: { message: 'Invalid API Key' } }),
    } as Response);

    await expect(generateItinerary({ apiKey: 'invalid-key', prompt: 'Trip' })).rejects.toThrow(
      'Invalid API Key',
    );
  });
});
