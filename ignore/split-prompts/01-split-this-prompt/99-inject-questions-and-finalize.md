# PROMPT 99: INJECT QUESTIONS AND FINALIZE

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL |
| **Depends on** | 02, 03 |
| **Unblocks** | none |
| **Writes to** | `knowledge-audit.html` (project root — edits in place) |
| **Estimated output** | ~400–600 lines (the QUESTIONS array replacement only) |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `CLAUDE.md` — read first, before all others
2. `split-prompts/01-split-this-prompt/state.json` — check in Step 2
3. `split-prompts/01-split-this-prompt/questions.json` — the question objects to inject
4. `knowledge-audit.html` — the HTML shell to edit

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Check `split-prompts/01-split-this-prompt/state.json`:

**If `prompts.02.status` is `"in_progress"`:**
STOP. Tell the user exactly:
> "Prompt 99 cannot start — prompt 02 (extract-questions) is currently running in another chat.
> Wait for that chat to complete, then re-send this prompt in a new chat."

**If `prompts.02.status` is `"pending"` or `"failed"`:**
STOP. Tell the user exactly:
> "Prompt 02 (extract-questions) must complete before this prompt can run.
> Please send prompt 02 in a fresh chat first."

**If `prompts.03.status` is `"in_progress"`:**
STOP. Tell the user exactly:
> "Prompt 99 cannot start — prompt 03 (build-html-shell) is currently running in another chat.
> Wait for that chat to complete, then re-send this prompt in a new chat."

**If `prompts.03.status` is `"pending"` or `"failed"`:**
STOP. Tell the user exactly:
> "Prompt 03 (build-html-shell) must complete before this prompt can run.
> Please send prompt 03 in a fresh chat first."

**If `prompts.99.status` is `"complete"`:**
STOP. Tell the user exactly:
> "Prompt 99 has already been completed. knowledge-audit.html is finalized. Open it in a browser to verify."

**If both `prompts.02.status` AND `prompts.03.status` are `"complete"`:**
Update `split-prompts/01-split-this-prompt/state.json` in a single Write operation:
- `prompts.99.status` → `"in_progress"`
- `prompts.99.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting prompt 99: INJECT QUESTIONS AND FINALIZE."

---

## STEP 3 — TASK

### Context
This is the final assembly step for building `knowledge-audit.html` — the self-contained questionnaire tool for the Sturgeon Dodge Edmonton Office Lot Operations SOP project. Prompt 02 extracted all tagged uncertain items from the 12 knowledge files and stored them as JSON question objects. Prompt 03 built the complete HTML+CSS+JS shell with an empty `const QUESTIONS = [];` placeholder. This prompt injects the question data into the shell to produce the final working file.

### Role and Constraints (from CLAUDE.md)
All project rules apply. Do not add, remove, or modify any question objects from questions.json. Do not alter any HTML structure, CSS, or JavaScript logic from knowledge-audit.html. The only change is replacing the QUESTIONS array placeholder with the real data.

### Instructions

1. Read `split-prompts/01-split-this-prompt/questions.json`. Confirm it is a valid JSON array containing question objects. Count the total number of question objects.

2. Read `knowledge-audit.html`. Locate the exact line:
   ```
   const QUESTIONS = [];
   ```
   This line appears in the `<script>` section. It is the injection point.

3. Using the Edit tool, replace the exact string `const QUESTIONS = [];` with:
   ```
   const QUESTIONS = [CONTENT];
   ```
   Where `CONTENT` is the full JSON array content from `questions.json` (all question objects, comma-separated, exactly as they appear in questions.json but without the outer `[` and `]` brackets — those come from the replacement string itself).

   The replacement must produce valid JavaScript. After injection, the line in knowledge-audit.html must read:
   ```javascript
   const QUESTIONS = [
     { "id": "Q001", ... },
     { "id": "Q002", ... },
     ...
   ];
   ```

4. After the Edit operation, read `knowledge-audit.html` and verify:
   - The file no longer contains the string `const QUESTIONS = [];` (empty array)
   - The file now contains `const QUESTIONS = [` followed by question objects
   - The QUESTIONS array contains the same number of objects as questions.json
   - The file has no external dependencies (no `src="http`, no `href="http`, no CDN URLs)
   - The file is a single self-contained HTML document

5. Do not modify any other part of knowledge-audit.html. The HTML structure, CSS, all JavaScript functions, and all view layouts must remain exactly as written by prompt 03.

### Output Specification

**File to modify:** `knowledge-audit.html` (at the project root)
**Change:** Replace `const QUESTIONS = [];` with `const QUESTIONS = [<all question objects from questions.json>];`
**Result:** A complete, working, self-contained HTML questionnaire tool

---

## STEP 4 — SUCCESS CRITERIA

Verify each item before proceeding to Step 5:

- [ ] `knowledge-audit.html` no longer contains the string `const QUESTIONS = [];`
- [ ] `knowledge-audit.html` contains `const QUESTIONS = [` followed by at least one question object
- [ ] The number of question objects in the QUESTIONS array equals the number of objects in questions.json
- [ ] The file contains no external resource URLs (no CDN links, no external scripts, no external stylesheets)
- [ ] The file structure is intact: `<!DOCTYPE html>`, `<html>`, `<head>` with `<style>`, `<body>` with 4 view divs, `<script>` with QUESTIONS and all functions
- [ ] `const QUESTIONS` ends with `];` (properly closed array and statement)

---

## STEP 5 — POST-EXECUTION

After all success criteria pass, update `split-prompts/01-split-this-prompt/state.json` in a single Write operation:
- `prompts.99.status` → `"complete"`
- `prompts.99.completed_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- `overall_status` → `"complete"`

Then tell the user:
> **Prompt 99 complete.**
> Modified: knowledge-audit.html — QUESTIONS array injected with [N] questions
>
> **All prompts complete. knowledge-audit.html is ready.**
>
> To use it:
> 1. Open knowledge-audit.html in Chrome, Firefox, or Edge via File > Open (file:// protocol)
> 2. VIEW 1 shows the total question count and a breakdown by file
> 3. Click "Start Audit →" to begin answering questions
> 4. Progress saves automatically in your browser — you can close and return at any time
> 5. When done, click "Generate Prompt →" in the Review view, then copy the output and paste it into a new Claude Code session to apply all changes to the knowledge/ files
