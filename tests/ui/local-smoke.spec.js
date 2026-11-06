const { test, expect } = require('@playwright/test');

test('локальная smoke-проверка браузера и взаимодействия', async ({ page }) => {
  await page.setContent(`
    <html>
      <head>
        <title>Playwright Test Page</title>
      </head>
      <body>
        <h1>Playwright Test Page</h1>
        <p>Локальная страница для smoke-проверки Playwright.</p>
        <button id="click-me" type="button">Click me</button>
        <p id="click-result"></p>
        <script>
          document.querySelector('#click-me').addEventListener('click', () => {
            document.querySelector('#click-result').textContent = 'Button clicked';
          });
        </script>
      </body>
    </html>
  `);

  await expect(page.getByRole('heading', { name: 'Playwright Test Page' })).toBeVisible();
  await expect(page.getByText('Локальная страница для smoke-проверки Playwright.')).toBeVisible();

  const button = page.getByRole('button', { name: 'Click me' });
  await expect(button).toBeVisible();
  await button.click();
  await expect(page.getByText('Button clicked')).toBeVisible();
});
