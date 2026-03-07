Read CLAUDE.md before starting.

Then read all 12 knowledge files in full, in this order:
- knowledge/personnel-registry.md
- knowledge/zone-definitions.md
- knowledge/vehicle-statuses-and-transitions.md
- knowledge/lot-placement-rules.md
- knowledge/signage-and-tagging-standards.md
- knowledge/key-cafe-protocol.md
- knowledge/compliance-requirements.md
- knowledge/financial-penalties.md
- knowledge/daily-operations-workflow.md
- knowledge/communication-and-escalation-protocols.md
- knowledge/service-department-utilization.md
- knowledge/external-vendors.md

Also read: knowledge/_PHASE_1_REPORT.md

Your task is to build a single self-contained HTML file at the project root named knowledge-audit.html. This file is a questionnaire tool for a human to audit and correct all uncertain, ambiguous, or missing information across the 12 knowledge files. It has zero external dependencies — all CSS and JavaScript are inline in the single file.

---

STEP 1: BUILD THE QUESTION LIST

While reading each knowledge file, collect every item that requires human input. Specifically, extract:
- Every [NEEDS_INPUT] tagged item — missing information a human must provide
- Every [AMBIGUOUS] tagged item — two or more interpretations exist
- Every [ASSUMPTION] tagged item — content was inferred and needs verification
- Every [VERIFY] tagged item — a specific claim needs confirmation
- Every [NEEDS_REVIEW] tagged item — accuracy needs checking

Cross-reference your extracted list against knowledge/_PHASE_1_REPORT.md to ensure every item flagged in that report is included. If the report lists an item not found tagged in the files, include it as a question anyway.

For each extracted item, create a question object with these fields:

  id          — "Q001", "Q002", etc. (sequential, zero-padded to 3 digits, across all files)
  category    — one of: NEEDS_INPUT | AMBIGUOUS | ASSUMPTION | VERIFY | NEEDS_REVIEW
  file        — e.g. "knowledge/personnel-registry.md"
  section     — the section heading in that file where this item appears
  question    — a clear, specific, answerable question (e.g. "What is the correct name for the Admin - Stock Tags role?")
  context     — one sentence explaining why this matters and what impact the answer has on downstream files
  currentValue — what the file currently says, or "None — no value recorded" if it is a pure NEEDS_INPUT gap
  options     — array of 2–5 pre-defined specific answer choices (see rules below)

Rules for options[]:
- For AMBIGUOUS items: the two competing values are the first two options (e.g. ["Jorja", "Georgia"])
- For NEEDS_INPUT numeric gaps: provide realistic range options (e.g. ["Under $500 per vehicle", "$500–$2,000 per vehicle", "$2,000–$5,000 per vehicle", "More than $5,000 per vehicle"])
- For NEEDS_INPUT yes/no questions: options = ["Yes", "No"]
- For NEEDS_INPUT name/title gaps: provide plausible role titles or names mentioned anywhere in the source material
- For VERIFY items: options = [the current value (labeled "Correct as written"), the most plausible alternative]
- All options must be specific — no generic placeholders like "Option A", "TBD", or "Value 1"
- Keep each option under 80 characters
- Do NOT include "Other", "Remove completely", "No change", or "Skip" in the options array — these are added automatically by the HTML for every question

One question per tagged item. Do not combine multiple items into one question.

---

STEP 2: BUILD THE HTML FILE

Create knowledge-audit.html at the project root. Requirements:
- Completely self-contained (no CDN, no external files, no web fonts)
- Works when opened via file:// protocol in any modern browser
- Responsive (usable on both desktop and mobile screen widths)
- System font stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- Clean, professional styling. High contrast. Generous padding. Large click targets.

The page has four views. Only one view is visible at a time. View transitions are managed by JavaScript show/hide (display: none / display: block). No page reloads.

---

VIEW 1 — INTRO

Content:
- h1: "Sturgeon Dodge — Knowledge File Audit"
- h2: "Edmonton Office Lot Operations SOP Project"
- Paragraph: "This tool covers every uncertain or missing piece of information across the 12 knowledge files. Answer each question to align the files with confirmed operational facts. Your progress saves automatically in your browser — you can close and return at any time."
- Stats grid (2-column on desktop, 1-column on mobile):
    Total Questions: [N]
    NEEDS_INPUT: [N]    (orange badge)
    AMBIGUOUS: [N]      (yellow badge)
    ASSUMPTION/VERIFY: [N]  (blue/purple badge)
- File breakdown: a list showing each knowledge filename and how many questions it has
- Buttons:
    "Start Audit →" (primary blue) — navigates to VIEW 2 at the first unanswered question
    "Resume Progress →" (secondary, shown ONLY if localStorage has saved answers) — navigates to VIEW 2 at the last unanswered question
- If localStorage has saved data: show "Progress: [X] of [N] answered" below the buttons

---

VIEW 2 — QUESTIONNAIRE

Top bar (sticky, full width):
- Left: "Q[current] of [total]"
- Center: progress bar — width% = (answered count / total count) × 100. "Answered" = any response except skip.
- Right: "✓ Saved" or "Saving..." auto-updating indicator, plus a "View All →" text link to VIEW 3

Question card (centered, max-width: 680px, margin: auto):

  1. Category badge (pill):
       NEEDS_INPUT  → background #F97316 (orange), white text
       AMBIGUOUS    → background #EAB308 (yellow), dark text
       ASSUMPTION   → background #3B82F6 (blue), white text
       VERIFY       → background #8B5CF6 (purple), white text
       NEEDS_REVIEW → background #6B7280 (gray), white text

  2. File tag: small pill "knowledge/[filename]" — light gray background, muted text, monospace font

  3. Section label: "Section: [section name]" — small, muted color

  4. Question text: 18px, font-weight 600, color #111827

  5. Context box: background #F3F4F6, border-left 3px solid #9CA3AF, padding 12px, font-size 14px, color #374151

  6. Current value box (only shown if currentValue is not "None — no value recorded"):
       Label: "Current value in file:"
       Value displayed in monospace, background #EFF6FF, border 1px solid #BFDBFE, padding 8px, border-radius 4px

  7. Answer options — radio buttons, each option is a full-width clickable row (label wraps entire row):
       padding: 12px 16px, border: 2px solid #E5E7EB, border-radius: 8px, margin-bottom: 8px
       On hover: border-color #9CA3AF, background #F9FAFB
       On selected: border-color #2563EB, background #EFF6FF

       Rows, in order:
         a) One row per item in options[] — plain text label, value = the option string
         b) "✏️  Other — I'll specify:" — selecting this reveals a text input (full width, 100% of card) immediately below the options list. The input placeholder is "Type your answer here...". The typed value is the answer.
         c) "🗑️  Remove this content completely from the file" — text color #DC2626 (red)
         d) "✅  No change needed — current value is confirmed correct" — text color #16A34A (green)
         e) "⏭️  Skip for now — I'll come back to this" — text color #6B7280 (gray), font-style italic

  8. Navigation row (below options):
       "← Previous" button — disabled on Q001
       "Q[N] of [total]" counter (centered)
       "Next →" button — on the last question, if answered, label becomes "Review Answers →" and navigates to VIEW 3

  9. Jump-to dropdown: "Jump to question:" select element. Options are grouped by file using <optgroup label="knowledge/[filename]">. Each option text: "Q[id] — [first 60 chars of question text]...". Changing selection navigates immediately.

---

VIEW 3 — REVIEW

Header: "Review Your Answers"
Summary bar: "[X] answered · [Y] skipped · [Z] total"

Filter tabs (pill-style, horizontal scroll on mobile): All | Needs Answer | By File | By Category
Default active: All

Question list (full width, scrollable):
  Each row (border-bottom, padding 12px):
    - Q ID in monospace, muted, 48px fixed width
    - Category badge (small version, same colors as VIEW 2)
    - File name in muted small text
    - Question text (flex-grow, truncate at 1 line with ellipsis on desktop; wraps on mobile)
    - Answer summary (right-aligned, truncated at 120px):
        If type=option or type=other: blue text, the value
        If type=remove: red text, "Remove completely"
        If type=nochange: green text, "No change needed"
        If type=skip: gray text, "Skipped"
        If not answered: orange text, "— Not answered"
    - "Edit" button (small, secondary) → navigates to VIEW 2 at that question index

Bottom action bar (sticky):
  "← Back to Questions" (secondary)
  "Generate Prompt →" (primary blue) → navigates to VIEW 4 and regenerates the prompt
  Note: "Only answered questions are included in the generated prompt. Skipped questions are excluded."

---

VIEW 4 — OUTPUT

Header: "Claude Code Update Prompt"
Instruction: "Copy the prompt below and paste it into a new Claude Code session. Claude will read your answers and apply each change to the knowledge/ files."

Stats line: "[X] updates · [Y] removals · [Z] confirmations · [W] questions skipped (not included)"

Textarea:
  - Full width, min-height: 500px, font-family: monospace, font-size: 13px, background: #F8FAFC, border: 1px solid #CBD5E1, padding: 16px, border-radius: 8px
  - readonly attribute (cannot be edited by user)
  - Contains the generated prompt (see GENERATED PROMPT FORMAT below)

Button row:
  "📋 Copy to Clipboard" (primary blue, large)
    On click: copies textarea content using navigator.clipboard.writeText()
    Button text changes to "✓ Copied!" for 2 seconds, then reverts
  "⬇️ Download .txt" (secondary)
    On click: creates a Blob with the prompt text and triggers download
    Filename: "knowledge-audit-prompt-[YYYY-MM-DD].txt" using today's date

Skipped questions warning (shown only if any skipped):
  Orange box: "⚠️ [N] questions were skipped. They are not included in this prompt. Return to the questionnaire to answer them, then click 'Generate Prompt →' in the Review view."

"← Back to Review" text link

---

LOCALSTORAGE

Key: "sd-knowledge-audit-v1"
Auto-save: debounced — save 800ms after last answer change.
Saved object:
{
  "savedAt": "[ISO 8601 timestamp]",
  "currentIndex": [integer — last question the user was on],
  "answers": {
    "Q001": { "type": "option",   "value": "Jorja" },
    "Q002": { "type": "other",    "value": "The user typed this free-form answer" },
    "Q003": { "type": "remove" },
    "Q004": { "type": "nochange" },
    "Q005": { "type": "skip" }
  }
}
On page load: if key exists, restore all answers and currentIndex. Show "Resume Progress →" on VIEW 1.
"✓ Saved" indicator: appears immediately after each save completes, then fades out after 2 seconds.

---

GENERATED PROMPT FORMAT

The textarea in VIEW 4 must contain a string built by generatePrompt(). Only questions with a non-skip answer are included. Produce this exact format, substituting real values:

You are updating the knowledge/ files for the Sturgeon Dodge Edmonton Office Lot Operations SOP project.

BEFORE MAKING ANY CHANGES:
1. Read CLAUDE.md in full — all project rules apply.
2. Read each knowledge/ file listed below before editing it.
3. Make ONLY the changes listed in this prompt. Do not change anything else.

AFTER ALL CHANGES ARE APPLIED:
- For each item with action UPDATE or REMOVE: change the inline tag ([NEEDS_INPUT], [AMBIGUOUS], [ASSUMPTION], [VERIFY], [NEEDS_REVIEW]) on that item to [COMPLETE]. If no tag is present, no tag change is needed.
- Open knowledge/_PHASE_1_REPORT.md and move each resolved item from the [NEEDS_INPUT] or [AMBIGUOUS] lists into a new section called "## Resolved Items (YYYY-MM-DD)". List the item and the resolution.

WORKING DIRECTORY: c:\Users\abaut\Documents\Sturgeon dodge

SUMMARY: [X] total changes — [Y] updates, [Z] removals, [W] no-change confirmations
Generated: [YYYY-MM-DD at HH:MM]

---

[For each answered (non-skip) question, output one block in this exact format:]

ITEM [Q-ID]
File: [knowledge/filename]
Section: [section name]
Question: [question text]
Answer: [the user's selected option text, or the user's typed text if type=other, or "REMOVE COMPLETELY" if type=remove, or "NO CHANGE NEEDED" if type=nochange]
Action: [UPDATE | REMOVE | CONFIRM]
Instruction: [
  If action=UPDATE: "In [filename], find [describe the current content precisely — the exact phrase, label, or table cell to locate]. Replace it with: [the answer value]. If there is a [NEEDS_INPUT] / [AMBIGUOUS] / [ASSUMPTION] tag on this item, change it to [COMPLETE]."
  If action=REMOVE: "In [filename], remove [describe the specific content to remove — the sentence, row, or section]. If removing this content leaves a section or table empty, remove the section header as well."
  If action=CONFIRM: "In [filename], no edit to the content is needed. The current value is confirmed correct. Change the [NEEDS_INPUT] / [AMBIGUOUS] / [VERIFY] tag on this item to [COMPLETE]."
]

---

[Repeat for every answered question]

SKIPPED: [N] questions were not answered and are excluded from this prompt. Re-run knowledge-audit.html to answer them.

---

JAVASCRIPT IMPLEMENTATION NOTES

- Define QUESTIONS as a const array in the <script> tag. Every question object from Step 1 must be in this array. Do not truncate or omit any.
- answers = {} object in memory, synced to/from localStorage
- setAnswer(id, answerObj) — updates answers[id] and schedules a debounced save
- getAnswer(id) — returns answers[id] or null
- getAnsweredCount() — counts entries in answers where type !== "skip"
- getProgress() — returns { answered, skipped, unanswered, total }
- showView(viewName) — hides all views, shows the named one
- navigateTo(index) — sets currentIndex, renders the question at that index in VIEW 2
- renderQuestion(index) — populates VIEW 2 DOM with question data and restores any saved answer
- generatePrompt() — iterates QUESTIONS, skips type=skip, builds the prompt string per the format above
- copyToClipboard() — navigator.clipboard.writeText(promptText).catch(() => fallback with document.execCommand('copy'))
- downloadTxt() — Blob + temporary anchor element, filename includes today's date

---

STEP 3: WRITE THE FILE

Write the complete knowledge-audit.html to the project root. The QUESTIONS array must contain one entry for every item extracted in Step 1. Do not omit, summarize, or merge any questions.

After writing the file, output this summary:

  File created: knowledge-audit.html
  Total questions: [N]
  By category: NEEDS_INPUT=[N], AMBIGUOUS=[N], ASSUMPTION=[N], VERIFY=[N], NEEDS_REVIEW=[N]
  By file:
    personnel-registry.md: [N]
    zone-definitions.md: [N]
    vehicle-statuses-and-transitions.md: [N]
    lot-placement-rules.md: [N]
    signage-and-tagging-standards.md: [N]
    key-cafe-protocol.md: [N]
    compliance-requirements.md: [N]
    financial-penalties.md: [N]
    daily-operations-workflow.md: [N]
    communication-and-escalation-protocols.md: [N]
    service-department-utilization.md: [N]
    external-vendors.md: [N]

  Open knowledge-audit.html in your browser to begin the audit.
  Progress saves automatically. When complete, copy the generated prompt from the Output view and paste it into a new Claude Code session to apply all changes to the knowledge/ files.
