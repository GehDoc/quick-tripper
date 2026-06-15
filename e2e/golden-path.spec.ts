import { test, expect } from '@playwright/test';

test('golden path - generate trip', async ({ page }) => {
  await page.goto('/');

  // Mock Hugging Face API (OpenAI compatible)
  await page.route('**/v1/chat/completions', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        choices: [
          {
            message: {
              content: JSON.stringify({
                title: 'Golden Trip',
                start: 'Zurich',
                stop: 'Interlaken',
                content: '### Golden Trip\nThis is a mocked itinerary.',
              }),
            },
          },
        ],
      }),
    }),
  );

  // Enter API Key (Restored Hugging Face placeholder)
  await page.getByPlaceholder('HuggingFace API Token').fill('hf_dummy-key');

  // Enter Prompt (Textarea)
  await page.getByPlaceholder(/Ex: A 4-day hike itinerary/i).fill('Swiss Alps');

  // Send
  await page.getByRole('button', { name: /Generate Itinerary/i }).click();

  // Verify Heading (Rendered in Navigator) - Using .first() or specific role to avoid ambiguity
  await expect(page.getByRole('heading', { name: 'Golden Trip' })).toBeVisible();

  // Verify Content
  await expect(page.getByText('This is a mocked itinerary.')).toBeVisible();
});
