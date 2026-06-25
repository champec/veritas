# Veritas — Site

The standalone public website. Static HTML, CSS, and one JavaScript file. **No build step.** Drop the `site/` folder into Vercel and it works.

This folder is self-contained. It owns its own polished copy of every piece of text it shows and never reads from the source folders (`raw_text/`, `books/`, `AI interpretations/`) at runtime. See the root [README.md](../README.md) for the source-versus-site rule that governs the whole project.

## Section guides

This file covers the overall architecture and design system. Two sections have their own detailed guides:

- **[study/README.md](study/README.md)** — the book-by-book studies and the Greater Principles section: the JSON data model, the four tabs, and how to add or update a book.
- **[essays/README.md](essays/README.md)** — how essays are structured (the three reading levels) and how to add a new one.

Prose rules for everything on the site live in [../essays/WRITING-GUIDE.md](../essays/WRITING-GUIDE.md).

## Local preview

From the repo root:

```bash
./serve
```

Then open `http://127.0.0.1:8000/`.

To use a different port, pass it as the first argument:

```bash
./serve 3000
```

The server is idempotent: if a Veritas server is already running on the port it just tells you and exits. After editing CSS, **hard-refresh the browser (Ctrl+Shift+R)** to clear the cache.

## Structure

```
site/
├── index.html               Home page
├── about.html               About the project
├── styles.css               Global styles + design tokens
├── script.js                Shared chrome, theme, tabs, data-driven renderers
├── data/
│   └── book-studies.json    All book-study + principles content (data-driven)
├── study/
│   ├── index.html           The 66-book grid
│   ├── book.html            One template, rendered per book from JSON (?book=slug)
│   └── README.md            How studies are built + updated
├── essays/
│   ├── index.html           Essay listing
│   ├── the-god-who-stooped.html
│   └── README.md            How essays are structured + added
├── principles/
│   └── index.html           Greater Principles (built from the same JSON)
├── books/index.html         Scaffolded
├── videos/index.html        Scaffolded
├── events/index.html        Scaffolded
└── testimonials/index.html  Scaffolded
```

## Design principles

- **The writing is the star.** Restrained layout, generous whitespace, the feel of a serious publisher rather than a blog.
- **Static and dependency-free.** No framework, no bundler, no build. Plain HTML, one stylesheet, one script.
- **Reusable over repeated.** Shared chrome and shared component patterns (see below) mean one place to change a thing, not ten.
- **Data-driven where content repeats.** Book studies and principles are rendered from `data/book-studies.json`, so adding a book is a data edit, not a new page.
- **Honest about progress.** Sections without content say "in progress" rather than hiding.
- **Accessible and responsive.** Reads well on phone and desktop; tabs use real `role="tab"` semantics; the accordion uses native `<details>`.

## Design tokens

Defined as CSS variables at the top of `styles.css`.

| Token | Value |
|---|---|
| Body font | EB Garamond (serif) |
| Heading font | Inter (sans-serif) |
| Accent | `#6B1A25` (oxblood red), used sparingly |
| Light bg | `#faf8f5` |
| Dark bg | `#110e0b` |

Light/dark mode is a `data-theme` attribute on `<html>`, toggled by `script.js` and remembered in `localStorage`.

## Shared chrome (header, nav, footer)

Every page contains only two placeholders:

```html
<div data-site-header></div>
...
<div data-site-footer></div>
```

`renderSiteChrome()` in `script.js` replaces them on load with the full header (logo, navigation, theme toggle, mobile hamburger) and footer. **To change the navigation or footer, edit `renderSiteChrome()` once;** every page updates. Nav links carry a `data-section` attribute and the current section is highlighted automatically based on the URL path. Links are built with a computed root prefix so the same markup works at any folder depth.

## Reusable component patterns

- **Tabs (pill style).** Two flavours share one look: `book-tabs` / `book-tab` on the study pages and `article-tabs` / `article-tab` on essays. Active tab gets the accent fill. Wired up by `setupBookTabs` and `setupArticleTabs`.
- **Cards.** `evidence-card`, `lesson-card`, `principle-card`, and `context-card` share padding, border, and radius for a consistent feel.
- **Accordion.** The Greater Principles page uses native `<details>` / `<summary>` (`principle-entry`) with a `+` / `−` marker, so it needs no extra JavaScript to open and close.

When adding something new, prefer extending an existing pattern over inventing a one-off.

## JavaScript (`script.js`)

One small file, no dependencies, organised as:

- **Theme** — `getPreferred`, `applyTheme`, `toggleTheme`.
- **Chrome** — `getSiteRootPrefix`, `renderSiteChrome`.
- **Helpers** — `slugifyBookName`, `createTextElement`.
- **Renderers** — `renderParagraphs`, `renderCards`, `renderPrincipleCards`, `renderContextCards`, `renderPrinciplesList`.
- **Tabs** — `setActiveBookTab` / `setupBookTabs`, `setActiveArticleTab` / `setupArticleTabs`.
- **Page setups** — `setupBookDetailPage` (study/book.html), `setupPrinciplesPage` (principles/index.html).
- **Bootstrap** — a single `DOMContentLoaded` handler runs the chrome, theme, nav highlight, and page setups.

After editing, validate with `node --check site/script.js`.

## Deployment (Vercel)

1. Connect the repo to Vercel.
2. Set the **Root Directory** to `site/`.
3. Framework preset: **Other** (static).
4. Deploy.

No environment variables required.

