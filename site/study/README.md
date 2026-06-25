# Book-by-Book Studies & Greater Principles

How the study section of the site is built and how to add to it. This is **presentation**: the polished, public version of the character work whose source lives in `AI interpretations/Haiku/`. See the root [README.md](../../README.md) for the source-versus-site rule.

## What is here

- **`study/index.html`** — a grid of all 66 books. A book is a clickable link with an accent dot **only if it has a finished study**; every other book is a plain, dotless label.
- **`study/book.html`** — a single template. It reads `?book=<slug>` from the URL and renders that book from the JSON. There is one HTML file for all books, not one per book.
- **`principles/index.html`** — the Greater Principles section: an accordion of the cross-Scripture principles, built from the same JSON.
- **`data/book-studies.json`** — all of the content for the above. This is the file you edit.

Currently **Genesis** is the only finished study.

## The data file: `data/book-studies.json`

Two top-level keys: `books` and `principles`.

```jsonc
{
  "books": {
    "genesis": {
      "title": "Genesis",
      "subtitle": "One-line description shown under the title.",
      "summary": [ "Paragraph 1.", "Paragraph 2." ],
      "evidence": [
        { "kind": "Genesis 1:1-31", "point": "A quotable evidential point. 'kind' (the reference) is optional." }
      ],
      "lessons": [
        { "title": "Short lesson heading", "text": "What this book teaches about God, in depth." }
      ],
      "principles": [
        { "id": "reverential-questioning", "text": "How THIS book contributes to that principle." }
      ],
      "context": [
        {
          "title": "A difficult passage",
          "problem": "Why it appears harsh on the surface.",
          "context": "The fuller setting that changes how it reads.",
          "shows": "What it actually shows about God's character."
        }
      ]
    }
  },
  "principles": {
    "reverential-questioning": {
      "title": "God Invites Reverential Questioning, Not Blind Obedience",
      "text": "The principle, stated once.",
      "examples": [
        { "book": "Genesis", "text": "Abraham questions the justice of destroying Sodom." }
      ]
    }
  }
}
```

### How the two halves connect

- `books.<slug>.principles[].id` must match a key in the top-level `principles` object.
- On a book page, each listed principle shows the **shared** title and text from `principles`, plus that book's own `text` ("This book contributes: ...").
- On the principles page, each principle lists its `examples`. If an example's `book` matches a finished study (its slug exists in `books`), the book name becomes a link to that study.

This makes the linking **bidirectional**: a book points out to the principles it demonstrates, and a principle points back to the books that demonstrate it.

## The four tabs on a book page

| Tab | Data key | What it is |
|---|---|---|
| **Summary & Evidence** | `summary`, `evidence` | A whole-book overview, then quotable evidential points. Evidence is *raw material to quote*, not a second summary; keep points factual and short, with verse references where helpful. |
| **Lessons About God** | `lessons` | The character lessons, written with the depth and quality of the source summaries in `AI interpretations/Haiku/`, refined for a general reader. |
| **Living Principles** | `principles` | The cross-Scripture principles this book contributes to, each linking out to the Greater Principles section. |
| **Proper Context** | `context` | An honest acknowledgement of the passages in this book that can make God look harsh, each set in its full context. Sourced from `AI interpretations/Haiku/proper-context.md`. Books with no entries show a friendly placeholder. |

## The Greater Principles section (`principles/index.html`)

- Renders every entry in the top-level `principles` object as a native `<details>` accordion.
- Visiting `principles/index.html?book=<slug>` opens and highlights the principles that book helps demonstrate, and shows a short banner. The "See how this book fits the greater principles" link on each book page uses this.
- Linking to `principles/index.html#<principle-id>` opens that specific principle. The principle titles on a book page use this.

The content source for these principles is `AI interpretations/Haiku/broader-concepts.md` (the single source of truth). The JSON here is the **presentation copy**, rewritten for the web; it is not auto-generated from that file.

## How to add or update a book study

1. **Do the content work first** in the source folders (`raw_text/`, then `AI interpretations/Haiku/<book>.md`). The site only presents finished thinking.
2. **Add the book to `data/book-studies.json`** under `books.<slug>`, following the shape above. The slug is the lower-cased, hyphenated book name (`song-of-solomon`, `1-kings`); it is produced by `slugifyBookName` in `script.js`.
3. **Reuse principle ids** from the top-level `principles` object. If the book reveals a genuinely new principle, add it there first (matching what is in `broader-concepts.md`), then reference it.
4. **Add any difficult passages** to that book's `context` array, drawing on `proper-context.md`.
5. **Light the dot in `study/index.html`.** Change that book from a plain `<span class="book-item">Name</span>` to a linked `<a class="book-item available" href="book.html?book=<slug>">Name</a>`. The `available` class is what shows the accent dot, so only ever use it on books that genuinely have a study.
6. **Validate and preview.** Run `python3 -c "import json; json.load(open('site/data/book-studies.json'))"` to check the JSON parses, then `./serve` and open the book.

## Conventions

All prose here follows the site-wide rules: **British spelling**, **no em dashes** (`—`) in prose, and **Bible quotations kept verbatim**. See [../../essays/WRITING-GUIDE.md](../../essays/WRITING-GUIDE.md).
