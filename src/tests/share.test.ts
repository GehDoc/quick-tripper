import { describe, it, expect } from 'vitest';
import { parseShareUrl } from '../utils/share';

describe('Share Utility', () => {
  it('should return null if no payload is present in URL', () => {
    // Mock window location if necessary or rely on undefined check in util
    expect(parseShareUrl()).toBeNull();
  });
});
