import { test, expect } from '@playwright/test';

test('homepage should have correct branding and show EmptyState', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /Quick-tripper/i })).toBeVisible();
  // Ensure EmptyState is visible, allowing for layout shifts
  const emptyStateLocator = page.getByText('No trips planned yet');
  await expect(emptyStateLocator).toBeVisible({ timeout: 10000 }); // Increase timeout and rely on toBeVisible's implicit scroll
});
