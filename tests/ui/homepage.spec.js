const { test, expect } = require('@playwright/test');

test('главная страница Icons8 загружается @real-site', async ({ page }) => {
  const response = await page.goto('/');

  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);
  await expect(page.locator('body')).toBeVisible();
});
