# Дизайн-система лендингов «ДесмосАвто»

## Основа

Дизайн-система общая для трёх отдельных гипотез: согласование допработ, контроль владельца и снижение телефонной нагрузки. Цветовой язык единый, но офферы, формы и сценарии лендингов не смешиваются в общий CRM-продукт.

Система построена в три уровня: primitive brand tokens, semantic tokens и component tokens. Компоненты используют component/semantic tokens, а не локальные hex-значения или Tailwind utility colors вроде `slate-*`, `sky-*`, `emerald-*`.

## Primitive Tokens

Утверждённая бренд-палитра:

- `--color-brand-primary`: `#0F2747` — логотип, навигация, header, footer, hero и крупные деловые блоки.
- `--color-brand-secondary`: `#1F5FA6` — основные CTA, кнопки, карточки, инфографика и вторичные action-состояния.
- `--color-brand-accent`: `#00B7C6` — точечные highlights, иконки, status markers, micro-CTA и графики.
- `--color-brand-neutral`: `#F3F5F7` — фон страниц, спокойные секции, фоны карточек и документов.

Технические нейтрали:

- `--color-tech-white`: белый для читаемости на Primary/Secondary и для поверхностей.
- `--color-tech-black`: чёрный только для технических теней.

## Semantic Tokens

Фоны:

- `--color-bg-page`
- `--color-bg-section`
- `--color-bg-surface`
- `--color-bg-hero`
- `--color-bg-footer`

Текст:

- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-inverse`
- `--color-text-muted`
- `--color-text-inverse-muted`

Бордеры:

- `--color-border-default`
- `--color-border-strong`
- `--color-border-inverse`

Действия:

- `--color-action-primary-bg`
- `--color-action-primary-text`
- `--color-action-primary-hover`
- `--color-action-secondary-bg`
- `--color-action-secondary-text`
- `--color-action-secondary-hover`

Акценты и статусы:

- `--color-highlight`
- `--color-icon-accent`
- `--color-status-active`
- `--color-chart-accent`

Hover/focus-состояния создаются через `color-mix()` и прозрачность поверх brand tokens. Новые брендовые оттенки не добавляются.

## Component Tokens

Liquid Glass:

- `--glass-surface` — базовый полупрозрачный слой для навигации и плавающих контролов.
- `--glass-surface-strong` — более плотный слой для browser chrome, topbar и form panels на тёмном фоне.
- `--glass-surface-inverse` — тёмный стеклянный слой поверх брендового hero.
- `--glass-border`, `--glass-border-muted` — световая кромка и сдержанный разделитель.
- `--glass-highlight` — верхний линзовый блик.
- `--glass-shadow`, `--glass-shadow-strong` — мягкая глубина для плавающих элементов.
- `--glass-blur`, `--glass-saturation` — единые значения blur/saturation для backdrop-filter.

Кнопки:

- `--button-primary-bg`
- `--button-primary-text`
- `--button-primary-hover-bg`

Карточки:

- `--card-bg`
- `--card-border`

Header/footer:

- `--header-bg`
- `--header-text`
- `--footer-bg`
- `--footer-text`

Формы:

- `--form-border`
- `--form-focus-ring`

## Компоненты

Header:

- Использует `ds-header`, `ds-nav-link`, `--header-bg` и `--header-text`.
- Это главный Liquid Glass-слой: sticky, полупрозрачный, с backdrop-filter, световой кромкой и плотным fallback.

Hero:

- Использует Primary через `--color-bg-hero`.
- CTA использует `primary-button` и action tokens.
- Accent допускается только как тонкий highlight, не как большая заливка.
- Hero-CTA и kicker могут быть стеклянными, потому что это плавающие action/control элементы поверх контента.

Cards и bento:

- Используют `card`, `ds-feature-card`, `ds-step-card`, `--card-bg` и `--card-border`.
- Иконки используют `ds-icon-chip` и accent/secondary semantic tokens.
- Смысловые карточки остаются читаемыми content surfaces. Для них допускаются световые кромки, hover-depth и мягкая material-полировка, но не сильная прозрачность.

Forms:

- `ds-form-card`, `form-input`, `radio-card`, `ds-form-message`, `ds-field-error`.
- Ошибки и успехи не вводят новые красные/зелёные цвета; они различаются текстом, бордером, поверхностью и иконкой в рамках бренд-палитры.
- Inputs и radio-card получают glass-like highlight, но сохраняют плотный фон для контраста и доступности.

Mockups/status:

- `ds-status-pill`, `ds-status-dot`, `ds-mock-action`, `ds-phone-frame`, `ds-mock-card`.
- Статусы используют Accent и Secondary дозированно.
- Стекло применяется к topbar, browser address, phone topbar, action buttons, status pills и floating panels — там, где в интерфейсе есть ощущение контролов поверх содержимого.

Footer:

- Использует `ds-footer`, `--footer-bg` и `--footer-text`.

## Правила Применения

- Новые страницы начинают с `--color-bg-page`.
- Крупные брендовые блоки используют `--color-bg-hero` или `--color-bg-footer`.
- Кнопки используют action tokens.
- Акценты используют highlight/icon/status tokens и не становятся основным текстом.
- Карточки используют card tokens.
- Не добавлять локальные hex-значения в компоненты.
- Не использовать прямые Tailwind palette utilities для цвета.
- Не добавлять случайные синие, бирюзовые, серые оттенки или градиенты.
- Не смешивать три гипотезы в одну CRM-страницу.
- Все интерактивные элементы сохраняют touch target от `44px`.
- На 375px не должно быть горизонтального скролла.
- Liquid Glass не применяется бездумно ко всему контенту: навигация, CTA, pills, mockup controls и плавающие панели — да; длинный текст, bento-карточки и форма заявки — только плотная material-поверхность.
- Для `prefers-reduced-transparency` и браузеров без `backdrop-filter` обязательны плотные fallback-фоны.
