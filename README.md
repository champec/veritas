# Veritas

> A re-examination of who God actually is.

Veritas is a long-term writing and publishing project. Working book by book through the Bible, it asks one question of every story: **what does this actually reveal about the character of God?** The work gathers that evidence, draws out the larger principles that run through the whole of Scripture, and presents the result as essays, book-by-book studies, and (over time) books, videos, and talks.

This repository holds two very different kinds of thing, and keeping them apart is the most important idea in the whole project.

---

## The one rule: source is separate from site

There are two halves to this repository, and they never mix.

| | **The source / workspace** | **The site** |
|---|---|---|
| **Where** | everything *outside* `site/` | the `site/` folder only |
| **Purpose** | thinking, reading, writing, working out the ideas | presenting the finished ideas to the public |
| **Focus** | the *content* | the *presentation* |
| **Form** | raw transcripts, notes, drafts, summaries, books | a polished static website |
| **Audience** | us, and the AI models we work with | readers, editors, publishers, the world |

The `site/` folder is a **standalone, self-contained website**. It can be lifted out and deployed on its own and it owns its own polished copy of any text it shows. It does **not** read from `raw_text/`, `books/`, or `AI interpretations/` at runtime. Those folders are the workshop; `site/` is the shop window.

When we work on **content**, we live in the source folders and focus only on getting the ideas and the writing right. When we work on **presentation**, we move into `site/` and focus only on how things look and read. A finished piece is consciously *copied across and re-polished* for the site, never linked or auto-pulled.

---

## Repository map

```
veritas/
├── README.md                     ← you are here: master overview + index
├── website-plan.txt              The original plan for the site
├── serve, serve-site.sh          Local preview server for the site (see below)
│
│   ── THE SOURCE / WORKSPACE (content) ──────────────────────────────
│
├── raw_text/textfiles/           Raw Bible-series transcripts, book by book
│                                 (##-bookname.txt, the rawest source layer)
├── books/                        Full source books, chapter by chapter
│   ├── conversations-about-god/
│   └── servants-or-friends/
├── Picture-of-God-Book/          A book in progress (concept + drafts)
├── grahams-dessertation.txt/     Dissertation source chapters
├── essays/                       Essay source + the writing guide
│   └── WRITING-GUIDE.md          How every essay is written (read this)
├── AI interpretations/Haiku/     The character-study working notes
│   ├── WORKFLOW.md               How we extract principles from the source
│   ├── broader-concepts.md       SINGLE SOURCE OF TRUTH for the principles
│   ├── proper-context.md         Difficult passages, set in context
│   ├── biblical-interpretation.md
│   └── <book>.md                 Per-book character summaries
│
│   ── THE SITE (presentation) ───────────────────────────────────────
│
└── site/                         The standalone public website
    ├── README.md                 Site architecture + design principles
    ├── study/README.md           How book-by-book studies are built + updated
    ├── essays/README.md          How essays are structured + added
    └── ... (see site/README.md)
```

---

## The two workflows

### 1. Content workflow (the workshop)

How raw material becomes understood ideas. This is documented in full in **[AI interpretations/Haiku/WORKFLOW.md](AI%20interpretations/Haiku/WORKFLOW.md)**. In short:

1. Read the **books** in `books/` for background and vocabulary only.
2. Work through the **Bible-series transcripts** in `raw_text/textfiles/`, book by book, asking of each story: *what kind of person must God be if He acted this way?*
3. Capture per-book findings in `AI interpretations/Haiku/<book>.md`.
4. Fold confirmed findings into the principles in **`broader-concepts.md`** (the single source of truth for God's-character principles).
5. Send genuinely difficult, "this makes God look harsh" passages to **`proper-context.md`**, where each is set in its full context.

Nothing here is written for public consumption. It is working material.

### 2. Presentation workflow (the shop window)

How understood ideas become published pages in `site/`. Each medium has its own guide:

- **Essays** — written in three reading levels (Normal / Advanced / Beginner). Prose rules live in **[essays/WRITING-GUIDE.md](essays/WRITING-GUIDE.md)**; the on-site structure and how to add one live in **[site/essays/README.md](site/essays/README.md)**.
- **Book-by-book studies** — data-driven pages with four tabs (Summary & Evidence, Lessons About God, Living Principles, Proper Context). See **[site/study/README.md](site/study/README.md)**.
- **Greater Principles** — a standalone section presenting the principles from `broader-concepts.md`, cross-linked with the book studies. See **[site/study/README.md](site/study/README.md)**.
- **Everything else** (home, about, books, videos, events, testimonials) and the overall design system. See **[site/README.md](site/README.md)**.

---

## Guiding principles (the content)

The actual principles about God's character are not summarised here on purpose; they have one home and one home only: **`AI interpretations/Haiku/broader-concepts.md`**. As of now there are thirteen, each stated as a single trait of God's character (for example *God Invites Reverential Questioning*, *God Values Freedom*, *God Is Gracious to His Enemies*), each backed by concrete examples gathered book by book.

Two ground rules govern all of this work:

- **Character, not commentary.** Every observation answers *what does this show about the kind of person God is?* No general life lessons, no abstract theology, no speculation beyond what the text supports.
- **Context before conclusions.** Difficult stories are never explained in isolation. Read before, after, backward, forward, and compare similar stories first. Weak explanations ("they deserved it", "God must punish sin", "God is sovereign") are not accepted.

---

## Design principles (the site)

The full design system is in [site/README.md](site/README.md). The essentials:

- **The writing is the star.** Restrained, generous whitespace, looks like a serious publisher rather than a blog.
- **Static, no build step.** Plain HTML, CSS, and one JavaScript file. Drop `site/` into Vercel and it works.
- **Serif body (EB Garamond), sans headings (Inter), oxblood accent (`#6B1A25`).** Light and dark modes.
- **Reusable, shared chrome.** Header, navigation, and footer are defined once and injected into every page, so there is one place to change them.
- **Honest about progress.** Sections without content say so rather than hiding.

---

## Writing conventions (everywhere on the site)

These apply to all public prose. The full guide is in [essays/WRITING-GUIDE.md](essays/WRITING-GUIDE.md).

- **British spelling throughout** (realise, colour, centre, defence, favour). This is spelling only, not a "British voice".
- **No em dash** (`—`) in prose. Use a comma, full stop, colon, or brackets instead. Normal hyphens in compound words are fine. (The only allowed `—` is the `Page Title — Veritas` separator in the HTML `<title>`.)
- **Bible quotations stay verbatim**, exactly as in their source translation, even where the spelling differs.

---

## Running the site locally

From the repo root:

```bash
./serve          # serves site/ at http://127.0.0.1:8000
./serve 3000     # or on a custom port
```

After editing CSS, hard-refresh the browser (Ctrl+Shift+R) to clear the cache. Full details and deployment notes are in [site/README.md](site/README.md).

---

## For a new editor, writer, publisher, or AI model

Start here, then read in this order:

1. This file, for the shape of the whole project and the source-vs-site rule.
2. [site/README.md](site/README.md) — how the public site is built and styled.
3. [essays/WRITING-GUIDE.md](essays/WRITING-GUIDE.md) — the prose rules for everything published.
4. [site/study/README.md](site/study/README.md) and [site/essays/README.md](site/essays/README.md) — how to add and update the two main kinds of page.
5. [AI interpretations/Haiku/WORKFLOW.md](AI%20interpretations/Haiku/WORKFLOW.md) and [AI interpretations/Haiku/broader-concepts.md](AI%20interpretations/Haiku/broader-concepts.md) — how the ideas are produced and where they are kept.