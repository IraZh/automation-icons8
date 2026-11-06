const { test, expect } = require('@playwright/test');

test('локальный поиск Cat показывает подходящие иконки и открывает Cat', async ({ page }) => {
  // Эта страница имитирует поиск Icons8 полностью локально.
  await page.setContent(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Local icon search results</title>
      </head>
      <body>
        <label for="icon-search">Search icons...</label>
        <input
          id="icon-search"
          type="text"
          data-test="search-input"
          placeholder="Search icons..."
        >

        <div id="icon-results">
          <a data-test="grid-icon" data-icon="120341" href="/icon/120341/cat">
            <span data-test="grid-icon-title">Cat</span>
          </a>
          <a data-test="grid-icon" data-icon="120342" href="/icon/120342/cat-face">
            <span data-test="grid-icon-title">Cat Face</span>
          </a>
          <a data-test="grid-icon" data-icon="120353" href="/icon/120353/dog">
            <span data-test="grid-icon-title">Dog</span>
          </a>
        </div>

        <section data-test="icon-preview" data-icon="120341" hidden>
          <img
            class="app-preview__image-origin"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect width='128' height='128' fill='%23f0f0f0'/%3E%3C/svg%3E"
            width="128"
            height="128"
            alt="Cat icon"
          >
        </section>

        <script>
          const searchInput = document.querySelector('[data-test="search-input"]');
          const iconCards = [...document.querySelectorAll('[data-test="grid-icon"]')];
          const catCard = document.querySelector('[data-test="grid-icon"][href="/icon/120341/cat"]');
          const catPreview = document.querySelector('[data-test="icon-preview"][data-icon="120341"]');

          searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();

            for (const card of iconCards) {
              const title = card.querySelector('[data-test="grid-icon-title"]').textContent;
              card.hidden = !title.toLowerCase().includes(query);
            }
          });

          catCard.addEventListener('click', (event) => {
            event.preventDefault();
            catPreview.hidden = false;
          });
        </script>
      </body>
    </html>
  `);

  const searchInput = page.locator('[data-test="search-input"]');
  const iconCards = page.locator('[data-test="grid-icon"]');
  const catCard = iconCards.filter({
    has: page.locator('[data-test="grid-icon-title"]', { hasText: /^Cat$/ }),
  });
  const catFaceCard = iconCards.filter({
    has: page.locator('[data-test="grid-icon-title"]', { hasText: /^Cat Face$/ }),
  });
  const dogCard = iconCards.filter({
    has: page.locator('[data-test="grid-icon-title"]', { hasText: /^Dog$/ }),
  });

  await expect(searchInput).toBeVisible();
  await expect(iconCards).toHaveCount(3);
  await expect(catCard).toBeVisible();
  await expect(catFaceCard).toBeVisible();
  await expect(dogCard).toBeVisible();

  await searchInput.fill('cat');

  await expect(catCard).toBeVisible();
  await expect(catFaceCard).toBeVisible();
  await expect(dogCard).toBeHidden();

  await catCard.click();

  const catPreview = page.locator('[data-test="icon-preview"][data-icon="120341"]');
  await expect(catPreview).toBeVisible();
  await expect(catPreview.locator('img.app-preview__image-origin[alt="Cat icon"]')).toBeVisible();
});
