# UI-автотесты Icons8

Учебный проект UI-автотестов на JavaScript с Playwright Test. Конфигурация использует установленный Google Chrome в видимом режиме.

## Требования

- Node.js (рекомендуется актуальная LTS-версия)
- npm
- Google Chrome

## Установка

В корневой папке проекта выполните:

```bash
npm install
```

Текущая конфигурация запускает установленный Google Chrome (`channel: 'chrome'`), поэтому установка браузера Playwright командой `npx playwright install` для неё не требуется. Если переключить проект на Chromium, поставляемый с Playwright, установите его командой:

```bash
npx playwright install chromium
```

## Запуск локальных тестов

Команда `npm test` запускает все локальные тесты и исключает тесты с тегом `@real-site`:

```bash
npm test
```

Например, тест `form-validation.spec.js` создаёт HTML-страницу прямо в браузере и проверяет поведение формы: сообщение при пустом вводе, его исчезновение после ввода `Cat` и текст результата `Найдена иконка: Cat`.

**Это не полноценный E2E-тест реального сайта Icons8.** Тест работает только с локальной HTML-страницей через `page.setContent()` и не обращается к Icons8.

Скриншот результата: [artifacts/form-validation.png](artifacts/form-validation.png).

## Запуск тестов реального сайта

Тесты `homepage.spec.js` и `cat-search.spec.js` помечены тегом `@real-site`. Чтобы запустить только их, выполните:

```bash
npm run test:icons8
```

Эти тесты обращаются к реальному сайту Icons8. Они могут завершиться ошибкой, если сайт или сеть недоступны из текущего окружения.

## Интерактивный режим

```bash
npm run test:ui
```

Эта команда открывает Playwright UI для всего набора тестов, включая тесты `@real-site`.

## Структура проекта

```text
artifacts/
└── form-validation.png
tests/
└── ui/
    ├── card-locators.spec.js
    ├── cat-search.spec.js
    ├── dynamic-elements.spec.js
    ├── form-validation.spec.js
    ├── homepage.spec.js
    ├── local-search-results.spec.js
    ├── local-search.spec.js
    └── local-smoke.spec.js
playwright.config.js
package.json
```
