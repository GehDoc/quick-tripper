import { test, expect } from '@playwright/test';

test('golden path - generate trip', async ({ page }) => {
  await page.goto('/');
  // Mock API
  await page.route('https://router.huggingface.co/v1/chat/completions', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        choices: [
          {
            message: {
              content: '# Golden Trip\nThis is a mocked itinerary.',
            },
          },
        ],
      }),
    }),
  );

  // Enter API Key
  await page.getByPlaceholder('HuggingFace API Token').fill('dummy-key');
  // Enter Destination
  await page.getByPlaceholder('Ex: A 4-day hike').fill('Swiss Alps');
  // Send
  await page.locator('.join').getByRole('button').click(); // Send icon button within join component

  // Verify
  await expect(page.getByText('Golden Trip')).toBeVisible();
});
