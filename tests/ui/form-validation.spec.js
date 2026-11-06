const { test, expect } = require('@playwright/test');

test('проверка формы поиска и сообщения об ошибке', async ({ page }) => {
  await page.setContent(`
    <!doctype html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <title>Локальная форма поиска</title>
      </head>
      <body>
        <form id="icon-search-form">
          <label for="icon-name">Название иконки</label>
          <input id="icon-name" name="iconName" type="text">
          <p id="validation-error" role="alert" hidden>Введите название иконки</p>
          <button type="submit">Найти</button>
        </form>

        <p id="search-result" role="status" hidden></p>

        <script>
          const searchForm = document.querySelector('#icon-search-form');
          const iconNameInput = document.querySelector('#icon-name');
          const validationError = document.querySelector('#validation-error');
          const searchResult = document.querySelector('#search-result');

          searchForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const iconName = iconNameInput.value.trim();
            if (!iconName) {
              validationError.hidden = false;
              searchResult.hidden = true;
              searchResult.textContent = '';
              return;
            }

            validationError.hidden = true;
            searchResult.textContent = \`Найдена иконка: \${iconName}\`;
            searchResult.hidden = false;
          });
        </script>
      </body>
    </html>
  `);

  const iconNameInput = page.getByLabel('Название иконки');
  const findButton = page.getByRole('button', { name: 'Найти' });
  const validationError = page.getByText('Введите название иконки');
  const searchResult = page.locator('#search-result');

  await findButton.click();

  await expect(validationError).toBeVisible();
  await expect(searchResult).toBeHidden();

  await iconNameInput.fill('Cat');
  await findButton.click();

  await expect(validationError).toBeHidden();
  await expect(searchResult).toBeVisible();
  await expect(searchResult).toHaveText('Найдена иконка: Cat');

  await page.screenshot({ path: 'artifacts/form-validation.png', fullPage: true });
});
