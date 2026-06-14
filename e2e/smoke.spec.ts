import { test, expect } from '@playwright/test';

test('homepage should have correct branding and show EmptyState', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Quick-tripper')).toBeVisible();
  await expect(page.getByText('No active itineraries loaded')).toBeVisible();
});
