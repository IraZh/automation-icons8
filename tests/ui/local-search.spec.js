const { test, expect } = require('@playwright/test');

test('локальный поиск и открытие иконки Cat', async ({ page }) => {
  // Учебная страница имитирует поиск Icons8 без обращений к внешним сайтам.
  await page.setContent(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Local icon search</title>
      </head>
      <body>
        <label for="icon-search">Search icons...</label>
        <input
          id="icon-search"
          type="text"
          data-test="search-input"
          placeholder="Search icons..."
        >

        <a
          data-test="grid-icon"
          href="/icon/120341/cat"
          hidden
        >
          Cat
        </a>

        <section data-icon="120341" hidden>
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
          const catCard = document.querySelector('[data-test="grid-icon"]');
          const iconPanel = document.querySelector('[data-icon="120341"]');

          searchInput.addEventListener('input', () => {
            catCard.hidden = searchInput.value.trim().toLowerCase() !== 'cat';
          });

          catCard.addEventListener('click', (event) => {
            event.preventDefault();
            iconPanel.hidden = false;
          });
        </script>
      </body>
    </html>
  `);

  const searchInput = page.locator('[data-test="search-input"]');
  const catCard = page.locator('[data-test="grid-icon"][href="/icon/120341/cat"]');
  const iconPanel = page.locator('[data-icon="120341"]');
  const catImage = iconPanel.locator('img.app-preview__image-origin[alt="Cat icon"]');

  await expect(searchInput).toBeVisible();
  await expect(catCard).toBeHidden();

  await searchInput.fill('cat');

  await expect(catCard).toBeVisible();
  await catCard.click();

  await expect(iconPanel).toBeVisible();
  await expect(catImage).toBeVisible();
});
