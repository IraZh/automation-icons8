const { test, expect } = require('@playwright/test');

test('карточка Cat появляется после нажатия с задержкой', async ({ page }) => {
  await page.setContent(`
    <!doctype html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <title>Dynamic result</title>
      </head>
      <body>
        <button type="button" id="show-result">Показать результат</button>

        <section id="result-card" hidden>
          <h2>Cat</h2>
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect width='128' height='128' fill='%23f0f0f0'/%3E%3C/svg%3E"
            width="128"
            height="128"
            alt="Cat icon"
          >
        </section>

        <script>
          const showResultButton = document.querySelector('#show-result');
          const resultCard = document.querySelector('#result-card');

          showResultButton.addEventListener('click', () => {
            setTimeout(() => {
              resultCard.hidden = false;
            }, 500);
          });
        </script>
      </body>
    </html>
  `);

  const showResultButton = page.getByRole('button', { name: 'Показать результат' });
  const resultCard = page.locator('#result-card');
  const catImage = resultCard.getByRole('img', { name: 'Cat icon' });

  await expect(showResultButton).toBeVisible();
  await expect(resultCard).toBeHidden();

  await showResultButton.click();

  await expect(resultCard).toBeVisible();
  await expect(resultCard.getByText('Cat')).toBeVisible();
  await expect(catImage).toBeVisible();
});
