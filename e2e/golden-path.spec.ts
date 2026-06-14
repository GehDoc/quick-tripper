import { test, expect } from '@playwright/test';

test('golden path - generate trip', async ({ page }) => {
  await page.goto('/');
  // Mock API
  await page.route('**/models/gemini-1.5-flash:generateContent?key=dummy-key', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: JSON.stringify({
                    title: 'Golden Trip',
                    start: 'Zurich',
                    stop: 'Interlaken',
                    content: '# Golden Trip\nThis is a mocked itinerary.',
                  }),
                },
              ],
            },
          },
        ],
      }),
    }),
  );

  // Enter API Key
  await page.getByPlaceholder('Gemini API Key').fill('dummy-key');
  // Enter Destination
  await page.getByPlaceholder(/Ex: A 4-day hike itinerary/i).fill('Swiss Alps');
  // Send
  await page.getByRole('button', { name: /Generate Itinerary/i }).click();

  // Verify
  await expect(page.getByRole('heading', { name: 'Golden Trip' }).first()).toBeVisible();
});
