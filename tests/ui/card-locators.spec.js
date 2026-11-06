const { test, expect } = require('@playwright/test');

test('поиск карточки Cat по атрибуту и точному названию', async ({ page }) => {
  await page.setContent(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Local icon cards</title>
      </head>
      <body>
        <a data-test="grid-icon" data-icon="120341" href="/icon/120341/cat">
          <span data-test="grid-icon-title">Cat</span>
        </a>
        <a data-test="grid-icon" data-icon="120342" href="/icon/120342/cat-face">
          <span data-test="grid-icon-title">Cat Face</span>
        </a>
        <a data-test="grid-icon" data-icon="120353" href="/icon/120353/dog">
          <span data-test="grid-icon-title">Dog</span>
        </a>
      </body>
    </html>
  `);

  const allCards = page.locator('[data-test="grid-icon"]');
  await expect(allCards).toHaveCount(3);

  const catByIconId = page.locator('[data-test="grid-icon"][data-icon="120341"]');
  const catByExactTitle = allCards.filter({
    has: page.locator('[data-test="grid-icon-title"]', { hasText: /^Cat$/ }),
  });

  await expect(catByIconId).toHaveCount(1);
  await expect(catByExactTitle).toHaveCount(1);

  const hrefFoundByIconId = await catByIconId.getAttribute('href');
  const hrefFoundByTitle = await catByExactTitle.getAttribute('href');
  expect(hrefFoundByIconId).toBe(hrefFoundByTitle);

  await expect(catByIconId.locator('[data-test="grid-icon-title"]')).toHaveText('Cat');
  await expect(catByIconId).toHaveAttribute('data-icon', '120341');
  await expect(catByIconId).toHaveAttribute('href', '/icon/120341/cat');

  const catFaceCard = allCards.filter({
    has: page.locator('[data-test="grid-icon-title"]', { hasText: /^Cat Face$/ }),
  });
  const catFaceMatchingExactCatTitle = catFaceCard.filter({
    has: page.locator('[data-test="grid-icon-title"]', { hasText: /^Cat$/ }),
  });

  await expect(catFaceCard).toHaveCount(1);
  await expect(catFaceMatchingExactCatTitle).toHaveCount(0);
});
