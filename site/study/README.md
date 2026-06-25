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
| **Summary & Evidence** | `summary`, `evidence` | A whole-book overview, then quotable evidential points. Evidence is *raw material to quote*, not a second summary; keep points factual and short, with verse references where helpful. See **Selecting evidence points** below. |
| **Lessons About God** | `lessons` | The character lessons, written with the depth and quality of the source summaries in `AI interpretations/Haiku/`, refined for a general reader. |
| **Living Principles** | `principles` | The cross-Scripture principles this book contributes to, each linking out to the Greater Principles section. |
| **Proper Context** | `context` | An honest acknowledgement of the passages in this book that can make God look harsh, each set in its full context. Sourced from `AI interpretations/Haiku/proper-context.md`. Books with no entries show a friendly placeholder. |

## Writing Proper Context entries

Every difficult passage has a surface reading that makes God appear arbitrary, cruel, or disproportionate. The goal of a Proper Context entry is not to explain it away but to ask honestly: **which reading of this story fits the largest number of other things we know about God from Scripture?**

The approach:

1. **State the surface problem plainly.** Do not soften it. The problem field should describe the passage the way a sceptic would. If it does not make God look genuinely difficult, it is not a hard enough reading.

2. **Test both main theories explicitly.** For any difficult story there are usually two obvious theories: (a) this is what God is like when crossed, and (b) this is an emergency measure by a God whose ordinary character is loving and patient. Both must be tested honestly against other evidence in Scripture. The questions to ask of Theory A: does this picture of God cohere with how He behaves elsewhere? Does Jesus behave this way? Does God repeat this? What does the aftermath show? The theory that explains the most facts across the most books is the more likely correct one.

3. **Look at the aftermath.** A key test of any difficult divine action is whether it achieved what God most desires: free, genuine trust and love. The Flood was followed by the Tower of Babel, built in fear. The destruction of Sodom did not root out rebellion elsewhere. This pattern across Scripture confirms that even when God uses overwhelming force, it does not win what He is after, which is why it is clearly not His chosen method and He does not repeat it.

4. **Reference other parts of Scripture, especially the Gospels.** Jesus is the clearest picture of God's character. When He refuses to call fire on a Samaritan village, or weeps over Jerusalem, or eats with sinners, He is showing what the Father is like. Difficult Old Testament passages should always be read against that portrait.

5. **Be honest about what cannot be fully explained.** Not every Proper Context entry needs to resolve the problem completely. What it must do is make a serious case for which reading is more consistent with the weight of biblical evidence, and acknowledge where genuine difficulty remains. Pretending the difficulty is not real damages trust; refusing to engage with the evidence for God's character is dishonest in the other direction.

The `shows` field should state what the entry, taken as a whole, reveals about God's character: not a defence of a specific action, but an observation about the kind of person who could plausibly have done it, read in the light of everything else.

## Selecting evidence points

Evidence points answer one question: **what kind of person must God be if He acted this way?** Every point should make a specific, observable claim about God's character, grounded in a named moment in the text.

### What makes a good evidence point

- **God does something unexpected or counter-intuitive.** He seeks rather than sentences, provides rather than punishes, grieves rather than rages. The surprise is the point.
- **The text records God's inner life.** Words like *grieved*, *sorry*, *loved*, *delighted*, *wept* are primary evidence. They are not just colour; they are data.
- **God chooses a harder path when an easier one was available.** If He could have done the thing more cheaply and chose not to, that choice reveals character.
- **God acts graciously toward someone who has not earned it.** A deceiver met with faithful presence. A murderer warned and then protected.
- **A moment establishes the context for everything else.** God clothing Adam and Eve before sending them out, or limiting the adversary to a single tree, sets up how to read everything that follows.

### What does NOT belong in evidence

- **Plot summary.** "Jacob wrestles through the night and is renamed Israel" is a narrative beat. Unless the point answers *what does this show about God*, it is summary in disguise.
- **Human responses to God.** Abraham's faith, Joseph's forgiveness, David's courage — these are interesting but they say something about the human, not directly about God. The human response can be mentioned as context, but the point should still land on God's character.
- **Difficult passages.** The Flood, Babel, Sodom, the conquest of Canaan — these are precisely the passages readers will find troubling. They belong in the **Proper Context** tab, not in Evidence. Putting them in Evidence without adequate framing endorses the surface reading. The Proper Context tab exists for exactly this reason.
- **Theological abstractions.** "Faith here is confidence in the kind of person God is" is an interpretation rather than an observation. Evidence points should be grounded in what the text shows happening, not in what we conclude from it.

### The source material

Before selecting evidence for a book, read both:
1. **`raw_text/textfiles/<book>.txt`** — the source lectures. Note what Maxwell calls out as significant about God's character, what questions he raises, and which moments he describes as key.
2. **The opening of the *next* book's text file.** Maxwell regularly revisited the previous book at the start of the next lecture, and often his most pointed character observations about a book come in that retrospective. For Genesis, the Exodus opening is essential; for Exodus, the Leviticus opening; and so on.

After reading both, cross-check with `AI interpretations/Haiku/<book>.md` for the working summary.

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
