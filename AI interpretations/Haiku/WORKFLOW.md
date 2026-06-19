# AI Interpretation Workflow

## Purpose
Extract core principles about **God's character** from the source materials, documenting only what is clearly supported with concrete examples from the texts. The goal is not to collect general Bible lessons, moral applications, or abstract theological ideas. The goal is always: **What does this story show about the kind of person God is?** No speculation, extrapolation, or baseless claims.

**Important:** Final interpretation documents should not mention the teacher/source by name. The subject is God's character, not the teacher. Use the source materials as a guide, but write conclusions as text-supported observations about God.

**Process Overview:**
1. First, the AI reads the books in `/books/` for background understanding only
2. Then, when commanded, the AI and user work collaboratively through the Bible-series recordings from `/raw_text/textfiles/`
3. Only the collaborative process produces summaries and updates to `broader-concepts.md`

## Workflow Steps

### Phase 1: Background Understanding from Books Folder

**1. Read the Books for Orientation Only**
- Read through the books in `/books/` folder (currently: Conversations About God, Servants or Friends)
- Use these books to understand Maxwell's general framework and vocabulary
- This phase is for AI understanding only
- Do not create files, summaries, principles, or edits from this phase unless the user specifically asks

**2. Hold Principles Tentatively**
- Use the books as background while reading the Bible series
- Do not turn background understanding into claims unless the Bible-series text being discussed explicitly supports it
- Do not add to `broader-concepts.md` from background reading alone

### Phase 2: Collaborative Bible Series Process

**3. Read Bible Series Book (when commanded by user)**
- Read from `/raw_text/textfiles/` (book-by-book Bible series)
- A single biblical book may span more than one audio/text file
- Before moving to the next biblical book, check whether the next numbered raw file continues the same book
- If it is a continuation, read it as part of the same biblical book summary
- Identify how that biblical book illustrates, challenges, or expands the developing principles about **God's character**
- For each story, ask: **What kind of person must God be if He acted this way?**
- Note new examples and stories

**4. Present Takeaways to User**
- Show takeaways for how this biblical book reveals God's character
- Offer only character-based insights, not general life lessons or abstract principles
- Clearly distinguish what is explicit in the text from what is only a possible inference
- Do not mention the teacher/source by name in final written summaries unless the user specifically asks
- Wait for user approval

**5. Rename & Create Summary (if approved)**
- Rename raw text files after reading/approval, if they are not already named properly
- Use number-first naming so files stay in biblical order
  - Single file: `##-bookname.txt` (example: `01-genesis.txt`)
  - Multiple files for one biblical book: `##-bookname-01.txt`, `##-bookname-02.txt`, etc.
  - Example: `02-exodus-01.txt`, `02-exodus-02.txt`
- Create markdown file: `bookname.md` with the biblical book's stories and lessons

### Phase 3: Update Broader Concepts Only After Approval
Review whether new findings should:


**Option A: Add to Existing Principle**
- Find which of the 3 principles the examples support
- Add new examples and stories to that principle
- Ensure consistency with existing examples

**Option B: Create New Principle**
- Only if the teaching cannot fit into existing principles
- Must have multiple concrete examples supporting it
- Must be something Maxwell explicitly teaches about God's character, not inferred
- **Principle titles must be broad, unique, and stated as a single character trait about God** (for example: "God Values Freedom", "God Is Gracious to His Enemies", "God Is Gentle With His Failing Children")
  - The title states *what kind of person God is*, not the mechanism or the example
  - Do not bake the example into the title (e.g. not "God values freedom and does not control how His gifts are used" — the gifts detail belongs in the examples section)
  - Each principle must be truly distinct from every other principle; do not create overlapping or near-duplicate titles
  - All specific stories, mechanisms, and supporting detail go in the details/examples section beneath the broad title

**Option C: Update Existing Principle**
- If new examples strengthen or clarify an existing principle
- If the principle needs revision based on new evidence

**Option D: Add to Proper Context File**
- If the story is difficult and appears, on the surface, to make God look harsh, severe, arbitrary, vengeful, or like the kind of person Satan accused Him of being, add it to `proper-context.md`
- This file is for commonly misunderstood stories that require the full context before drawing conclusions about God's character
- Do not explain difficult stories in isolation. Read before, after, backward, forward, and compare similar stories before forming a conclusion
- Use existing broader concepts for light, but do not force them onto the text
- Look for the specific goal of the intervention: what God was preserving, revealing, preventing, or making possible
- Distinguish temporary interventions from the final consequence of sin. The final consequence is not arbitrary punishment but God letting go those who reject love; dramatic earlier interventions must therefore be explained by their specific context and purpose
- Do not use weak explanations such as:
  - "God gave them many chances"
  - "God was long-suffering before punishing"
  - "God needed to punish sin"
  - "They deserved it"
  - "God is sovereign, so He can do it"
- A proper-context explanation must show how God's action is consistent with love, trustworthiness, freedom, and His desire to save
- If the context is not yet clear, list the story as "to explore" rather than forcing an explanation

### 5. Report to User
Present:
- Summary of book findings
- Which broader concepts were affected/updated
- New examples added
- Any new principles created (if applicable)

---

## Core Principles

The actual principles about God's character are **not** stored in this workflow guide. They live in `broader-concepts.md`, which is the single source of truth for the cumulative principles and their supporting examples. This file only describes the process for producing and updating them.

---

## Files Structure
- **Books (general principles):** `/books/`
  - Conversations About God
  - Servants or Friends
  - More to be added
  - These establish the foundational general principles
  
- **Bible Series (book-by-book):** `/raw_text/textfiles/##-bookname.txt`
  - Recordings going through each book of the Bible
  - A biblical book may span several recordings/files
  - Example single file: `01-genesis.txt`
  - Example multiple files: `02-exodus-01.txt`, `02-exodus-02.txt`
  - These expand and test the general principles
  
- **Biblical book summaries:** `/AI interpretations/Haiku/bookname.md`
  - One file per biblical book (genesis.md, exodus.md, leviticus.md, etc.)
  - Shows how that book illustrates God's character
  
- **General concepts (cumulative):** `/AI interpretations/Haiku/broader-concepts.md`
  - Principles that appear across multiple sources (books + Bible series)
  - Supported by concrete examples from both sources
  
- **Proper context file:** `/AI interpretations/Haiku/proper-context.md`
  - Difficult stories that appear harsh or severe on the surface
  - Records the fuller context needed before drawing conclusions about God's character
  - Avoids weak explanations like “God gave them chances” or “God needed to punish sin”
  
- **Workflow guide:** `/AI interpretations/Haiku/WORKFLOW.md` (this file)

---

## Key Discipline
- **No extrapolation**: Only what Maxwell explicitly teaches
- **Character focus only**: Every takeaway must answer what the story shows about the kind of person God is
- **No generic lessons**: Do not record general Bible principles, moral lessons, or abstract theological claims unless they directly reveal God's character
- **Do not name the teacher/source in final docs**: The final documents are about God's character, not about the human teacher
- **Difficult stories require proper context**: Never explain severe actions merely by saying God gave chances, waited a long time, punished sin, or had authority. Those are not character explanations.
- **Concrete examples**: Every principle backed by specific stories with references
- **No theoretical claims**: If it can't be demonstrated from the texts, don't include it
- **User approval first**: Never create book summary without user confirmation of takeaways
