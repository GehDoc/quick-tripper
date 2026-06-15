import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateItinerary } from './ai';

describe('ai service', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should parse a valid JSON response from Hugging Face Router', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              title: 'Tokyo: City of Neon',
              start: 'Tokyo, Japan',
              stop: 'Kyoto, Japan',
              content: '[Open](https://maps.com)\n\n### Itinerary',
            }),
          },
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await generateItinerary({ apiKey: 'test-key', prompt: 'Trip to Japan' });

    expect(result.title).toBe('Tokyo: City of Neon');
    expect(result.start).toBe('Tokyo, Japan');
    expect(result.content).toContain('### Itinerary');
  });

  it('should extract JSON even if wrapped in markdown blocks', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content:
              'Here is your trip:\n```json\n{"title": "Tokyo: Trip", "start": "A, B, C", "stop": "D, E, F", "content": "test"}\n```',
          },
        },
      ],
    };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await generateItinerary({ apiKey: 'test-key', prompt: 'Trip' });

    expect(result.title).toBe('Tokyo: Trip');
    expect(result.start).toBe('A, B, C');
  });

  it('should throw an error if AI response is not valid JSON', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Not a JSON string',
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
      status: 401,
      json: () => Promise.resolve({ error: { message: 'Invalid API Key' } }),
    } as Response);

    await expect(generateItinerary({ apiKey: 'invalid-key', prompt: 'Trip' })).rejects.toThrow(
      'Invalid API Key',
    );
  });
});
