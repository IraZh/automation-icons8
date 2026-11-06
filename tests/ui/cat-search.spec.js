const { test, expect } = require('@playwright/test');

test('поиск Cat и открытие иконки на Icons8 @real-site', async ({ page }) => {
  await page.goto('/icons');

  const searchInput = page.locator('[data-test="search-input"]');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('cat');

  const firstIconCard = page.locator('[data-test="grid-icon"]').first();
  await expect(firstIconCard).toBeVisible();

  const catIconCard = page.locator('[data-test="grid-icon"][href="/icon/120341/cat"]');
  await expect(catIconCard).toBeVisible();
  await catIconCard.click();

  const selectedIcon = page.locator('[data-icon="120341"]');
  await expect(selectedIcon).toBeVisible();
  await expect(
    selectedIcon.locator('img.app-preview__image-origin[alt="Cat icon"]'),
  ).toBeVisible();
});
