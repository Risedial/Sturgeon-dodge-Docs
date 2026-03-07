# PROMPT 03: BUILD HTML SHELL

| Field | Value |
|---|---|
| **Parallel Group** | A |
| **Depends on** | 01 |
| **Unblocks** | 99 |
| **Writes to** | `knowledge-audit.html` (project root) |
| **Estimated output** | ~700–900 lines (complete HTML+CSS+JS, QUESTIONS array empty) |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `CLAUDE.md` — read first, before all others
2. `split-prompts/01-split-this-prompt/state.json` — check in Step 2
3. `ALIGN THE PROJECT/01-split-this-prompt.md` — the full specification for the HTML file

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Check `split-prompts/01-split-this-prompt/state.json`:

**If `prompts.01.status` is `"pending"` or `"failed"`:**
STOP. Tell the user exactly:
> "Prompt 01 (initialize-state) must complete before this prompt can run.
> Please send prompt 01 in a fresh chat first."

**If `prompts.01.status` is `"in_progress"`:**
STOP. Tell the user exactly:
> "Prompt 03 cannot start — prompt 01 (initialize-state) is currently running in another chat.
> Wait for that chat to complete, then re-send this prompt in a new chat."

**If `prompts.03.status` is `"complete"`:**
STOP. Tell the user exactly:
> "Prompt 03 has already been completed. knowledge-audit.html shell already exists. Proceed to prompt 99."

**If `prompts.01.status` is `"complete"` AND `prompts.03.status` is NOT `"complete"`:**
Update `split-prompts/01-split-this-prompt/state.json` in a single Write operation:
- `prompts.03.status` → `"in_progress"`
- `prompts.03.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting prompt 03: BUILD HTML SHELL."

---

## STEP 3 — TASK

### Context
This prompt builds the complete self-contained HTML shell for `knowledge-audit.html` — the knowledge audit questionnaire tool for the Sturgeon Dodge Edmonton Office Lot Operations SOP project. The final file must work offline via `file://` protocol with no external dependencies. This prompt produces everything except the QUESTIONS data array, which is injected in prompt 99. The placeholder `const QUESTIONS = [];` must be present on its own line so prompt 99 can locate and replace it.

### Role and Constraints (from CLAUDE.md)
All project rules apply. Personnel are referenced by role title. Zone names are canonical. This HTML file is a tool for internal use at the dealership — professional, clean styling appropriate for a business operations tool.

### Instructions

Read `ALIGN THE PROJECT/01-split-this-prompt.md` completely before writing any code. That file contains the full specification. Follow it exactly for every detail of styling, behavior, and structure. The instructions below summarize key requirements and add implementation constraints; they do not replace the spec.

1. Create `knowledge-audit.html` at the project root. The file must:
   - Be completely self-contained: all CSS in a `<style>` tag in `<head>`, all JavaScript in a `<script>` tag before `</body>`
   - Have zero external dependencies: no CDN links, no external stylesheets, no web fonts, no external scripts
   - Work when opened via `file://` protocol in Chrome, Firefox, or Edge
   - Be responsive: usable on both desktop (≥768px) and mobile (<768px) screen widths
   - Use system font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

2. The page contains exactly 4 views. Only one view is visible at a time. Views are shown/hidden by a `showView(viewName)` JavaScript function that sets `display: none` on all views and `display: block` on the target. No page reloads. View names (used as `id` attributes): `view-intro`, `view-questionnaire`, `view-review`, `view-output`.

3. Implement VIEW 1 (INTRO) per the spec:
   - h1: "Sturgeon Dodge — Knowledge File Audit"
   - h2: "Edmonton Office Lot Operations SOP Project"
   - Intro paragraph (exact text in spec)
   - Stats grid: Total Questions, NEEDS_INPUT (orange badge), AMBIGUOUS (yellow badge), ASSUMPTION/VERIFY (blue/purple badge) — values populated by JavaScript from QUESTIONS array
   - File breakdown list: each knowledge filename + count of questions for that file — populated by JavaScript
   - "Start Audit →" button (primary blue): navigates to VIEW 2 at the first unanswered question
   - "Resume Progress →" button (secondary): shown ONLY if localStorage has saved answers; navigates to VIEW 2 at the last saved `currentIndex`
   - Progress line: shown only if localStorage has saved data — "Progress: [X] of [N] answered"

4. Implement VIEW 2 (QUESTIONNAIRE) per the spec:
   - Sticky top bar: left = "Q[current] of [total]", center = progress bar (width% = answered/total × 100), right = "✓ Saved" / "Saving..." indicator + "View All →" link to VIEW 3
   - Question card: max-width 680px, margin auto, all fields as specified (category badge, file tag, section label, question text, context box, current value box, answer options, navigation row, jump-to dropdown)
   - Answer options in order: (a) one row per item in `options[]`, (b) "✏️  Other — I'll specify:" with text input revealed on selection, (c) "🗑️  Remove this content completely from the file" (red text), (d) "✅  No change needed — current value is confirmed correct" (green text), (e) "⏭️  Skip for now — I'll come back to this" (gray italic)
   - Radio button rows: full-width clickable label wrapping the row. On hover: border #9CA3AF, bg #F9FAFB. On selected: border #2563EB, bg #EFF6FF.
   - Category badge colors: NEEDS_INPUT = #F97316 orange; AMBIGUOUS = #EAB308 yellow with dark text; ASSUMPTION = #3B82F6 blue; VERIFY = #8B5CF6 purple; NEEDS_REVIEW = #6B7280 gray
   - "Next →" button becomes "Review Answers →" on the last question if answered
   - Jump-to dropdown: options grouped by `<optgroup label="knowledge/[filename]">`, each option = "Q[id] — [first 60 chars of question text]..."

5. Implement VIEW 3 (REVIEW) per the spec:
   - Header: "Review Your Answers"
   - Summary bar: "[X] answered · [Y] skipped · [Z] total"
   - Filter tabs: All | Needs Answer | By File | By Category — pill style, default active = All
   - Question list rows: Q ID (monospace, 48px), category badge (small), file name (muted small), question text (flex-grow, truncated on desktop), answer summary (right-aligned, 120px max), Edit button
   - Answer summary colors: option/other = blue; remove = red "Remove completely"; nochange = green "No change needed"; skip = gray "Skipped"; unanswered = orange "— Not answered"
   - Bottom sticky action bar: "← Back to Questions" + "Generate Prompt →" (primary, navigates to VIEW 4) + note about skipped exclusion

6. Implement VIEW 4 (OUTPUT) per the spec:
   - Header: "Claude Code Update Prompt"
   - Instruction paragraph
   - Stats line: "[X] updates · [Y] removals · [Z] confirmations · [W] questions skipped"
   - Textarea: full width, min-height 500px, monospace 13px, readonly, background #F8FAFC, contains generated prompt
   - "📋 Copy to Clipboard" button: uses `navigator.clipboard.writeText()` with fallback to `document.execCommand('copy')`. Changes to "✓ Copied!" for 2 seconds then reverts.
   - "⬇️ Download .txt" button: Blob + temp anchor, filename = "knowledge-audit-prompt-[YYYY-MM-DD].txt"
   - Skipped questions warning (shown only if any skipped): orange box per spec
   - "← Back to Review" text link

7. Implement localStorage per the spec:
   - Key: `"sd-knowledge-audit-v1"`
   - Auto-save: debounced — save 800ms after last answer change
   - Saved object structure: `{ savedAt, currentIndex, answers: { "Q001": { type, value }, ... } }`
   - On page load: restore answers and currentIndex from localStorage if key exists
   - "✓ Saved" indicator: appears immediately after save, fades out after 2 seconds

8. Implement `generatePrompt()` per the spec. The function must produce the exact output format defined in `ALIGN THE PROJECT/01-split-this-prompt.md` under "GENERATED PROMPT FORMAT". Key points:
   - Only non-skip answers are included
   - Working directory line must be: `WORKING DIRECTORY: c:\Users\abaut\Documents\Sturgeon dodge`
   - Each answered question produces one ITEM block with fields: File, Section, Question, Answer, Action, Instruction
   - Action values: UPDATE (type=option or type=other), REMOVE (type=remove), CONFIRM (type=nochange)
   - Instruction text is constructed per the Action type as specified

9. Implement all JavaScript functions listed in the spec:
   - `setAnswer(id, answerObj)` — updates answers[id], schedules debounced save
   - `getAnswer(id)` — returns answers[id] or null
   - `getAnsweredCount()` — counts entries where type !== "skip"
   - `getProgress()` — returns `{ answered, skipped, unanswered, total }`
   - `showView(viewName)` — hides all views, shows named one
   - `navigateTo(index)` — sets currentIndex, renders question at that index in VIEW 2
   - `renderQuestion(index)` — populates VIEW 2 DOM with question data, restores saved answer
   - `generatePrompt()` — builds the complete prompt string
   - `copyToClipboard()` — with fallback
   - `downloadTxt()` — Blob + anchor, dated filename

10. The QUESTIONS constant must appear exactly as:
    ```javascript
    const QUESTIONS = [];
    ```
    This exact string (on its own line, no trailing space after the semicolon, no preceding characters on that line) is the injection point for prompt 99. Do not put any other content on that line.

### Output Specification

**File to create:** `knowledge-audit.html` (at the project root: `c:\Users\abaut\Documents\Sturgeon dodge\knowledge-audit.html`)
**Format:** HTML (single self-contained file)
**Required structure:**
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sturgeon Dodge — Knowledge File Audit</title>
  <style>
    /* All CSS inline here */
  </style>
</head>
<body>
  <!-- VIEW 1: view-intro -->
  <div id="view-intro"> ... </div>

  <!-- VIEW 2: view-questionnaire -->
  <div id="view-questionnaire" style="display:none"> ... </div>

  <!-- VIEW 3: view-review -->
  <div id="view-review" style="display:none"> ... </div>

  <!-- VIEW 4: view-output -->
  <div id="view-output" style="display:none"> ... </div>

  <script>
    const QUESTIONS = [];

    // All JavaScript functions here
  </script>
</body>
</html>
```

---

## STEP 4 — SUCCESS CRITERIA

Verify each item before proceeding to Step 5:

- [ ] `knowledge-audit.html` exists at the project root
- [ ] File contains no external script src, no external link rel="stylesheet", no CDN URLs
- [ ] `const QUESTIONS = [];` appears on its own line in the `<script>` section
- [ ] All 4 view div IDs are present: `view-intro`, `view-questionnaire`, `view-review`, `view-output`
- [ ] All 10 JavaScript functions are defined: `setAnswer`, `getAnswer`, `getAnsweredCount`, `getProgress`, `showView`, `navigateTo`, `renderQuestion`, `generatePrompt`, `copyToClipboard`, `downloadTxt`
- [ ] localStorage key `"sd-knowledge-audit-v1"` is used (not any other key name)
- [ ] Category badge colors match spec exactly: NEEDS_INPUT=#F97316, AMBIGUOUS=#EAB308, ASSUMPTION=#3B82F6, VERIFY=#8B5CF6, NEEDS_REVIEW=#6B7280
- [ ] Answer option rows (e) "Skip" and (c) "Remove" and (d) "No change" are present in the renderQuestion output
- [ ] No `[NEEDS_INPUT]` placeholder text in the file — the HTML shell is complete except for the QUESTIONS array

---

## STEP 5 — POST-EXECUTION

After all success criteria pass, update `split-prompts/01-split-this-prompt/state.json` in a single Write operation:
- `prompts.03.status` → `"complete"`
- `prompts.03.completed_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> **Prompt 03 complete.**
> Created: knowledge-audit.html (shell — QUESTIONS array is empty, to be injected by prompt 99)
>
> **Next steps:**
> Wait for prompt 02 (extract-questions) to also show "complete" in state.json.
> Once both 02 and 03 are complete, send prompt 99 (inject-questions-and-finalize) in a fresh chat.
