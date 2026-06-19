import { test, expect } from '@playwright/test';

test('golden path - generate trip', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle'); // Ensure page is fully loaded and stable
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

  // Enter API Key
  await page.getByPlaceholder('HF Token').fill('hf_dummy-key');

  // Enter Prompt (Textarea)
  const promptTextarea = page.getByPlaceholder('Ex: From Paris to Mont Saint-Michel...');
  await expect(promptTextarea).toBeVisible(); // Explicitly wait for visibility
  await promptTextarea.fill('Swiss Alps');

  // Send
  await page.getByRole('button', { name: 'Plan Trip' }).click();

  // Verify Heading (Rendered in Navigator) - Using .first() or specific role to avoid ambiguity
  await expect(page.getByRole('heading', { name: 'Golden Trip' })).toBeVisible();

  // Verify Content
  await expect(page.getByText('This is a mocked itinerary.')).toBeVisible();
});
