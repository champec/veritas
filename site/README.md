# Veritas — Site

Static site. No build step. Drop the `site/` folder into Vercel and it works.

## Structure

```
site/
├── index.html               Home page
├── about.html               About the project
├── styles.css               Global styles
├── script.js                Theme toggle + nav behaviour
├── study/
│   └── index.html           66 book-by-book exploration
├── essays/
│   ├── index.html           Essay listing
│   └── the-god-who-stooped.html
├── books/index.html         Scaffolded
├── videos/index.html        Scaffolded
├── events/index.html        Scaffolded
└── testimonials/index.html  Scaffolded
```

## Design tokens

| Token | Value |
|---|---|
| Body font | EB Garamond |
| Heading font | Inter |
| Accent | `#6B1A25` (oxblood red) |
| Light bg | `#faf8f5` |
| Dark bg | `#110e0b` |

## Deployment (Vercel)

1. Connect the repo to Vercel.
2. Set the **Root Directory** to `site/`.
3. Framework preset: **Other** (static).
4. Deploy.

No environment variables required.
