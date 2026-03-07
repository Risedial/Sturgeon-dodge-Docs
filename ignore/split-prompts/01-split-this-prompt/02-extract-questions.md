# PROMPT 02: EXTRACT QUESTIONS

| Field | Value |
|---|---|
| **Parallel Group** | A |
| **Depends on** | 01 |
| **Unblocks** | 99 |
| **Writes to** | `split-prompts/01-split-this-prompt/questions.json` |
| **Estimated output** | ~400–600 lines (JSON array of 60–70 question objects) |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `CLAUDE.md` — read first, before all others
2. `split-prompts/01-split-this-prompt/state.json` — check in Step 2
3. `knowledge/personnel-registry.md`
4. `knowledge/zone-definitions.md`
5. `knowledge/vehicle-statuses-and-transitions.md`
6. `knowledge/lot-placement-rules.md`
7. `knowledge/signage-and-tagging-standards.md`
8. `knowledge/key-cafe-protocol.md`
9. `knowledge/compliance-requirements.md`
10. `knowledge/financial-penalties.md`
11. `knowledge/daily-operations-workflow.md`
12. `knowledge/communication-and-escalation-protocols.md`
13. `knowledge/service-department-utilization.md`
14. `knowledge/external-vendors.md`
15. `knowledge/_PHASE_1_REPORT.md`

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
> "Prompt 02 cannot start — prompt 01 (initialize-state) is currently running in another chat.
> Wait for that chat to complete, then re-send this prompt in a new chat."

**If `prompts.02.status` is `"complete"`:**
STOP. Tell the user exactly:
> "Prompt 02 has already been completed. questions.json already exists. Proceed to prompt 99."

**If `prompts.01.status` is `"complete"` AND `prompts.02.status` is NOT `"complete"`:**
Update `split-prompts/01-split-this-prompt/state.json` in a single Write operation:
- `prompts.02.status` → `"in_progress"`
- `prompts.02.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting prompt 02: EXTRACT QUESTIONS."

---

## STEP 3 — TASK

### Context
This prompt is part of building `knowledge-audit.html` — a self-contained questionnaire tool for the Sturgeon Dodge Edmonton Office Lot Operations SOP project. The HTML tool requires a QUESTIONS array containing one object for every uncertain, ambiguous, or missing item across the 12 knowledge files. This prompt extracts those items and writes them to `questions.json` for injection into the HTML shell in prompt 99.

### Role and Constraints (from CLAUDE.md)
- No invented information. Every question object must trace to a tagged item in a knowledge file or to a listed item in `_PHASE_1_REPORT.md`.
- Tag `[NEEDS_INPUT]` in files with `[AMBIGUOUS]` items if they appear only in the report — use the report's description.
- Personnel referenced by role title. Confirmed names: Jorja (Admin - Stock Tags), Giselle (Admin/Tech - Stock Tags + Service), Kevin (Sales Manager).
- Canonical zone names: Cage, East Side Fence Line, West Side of Building, Overflow (Temporary), Power Sport / Quad Corner, Auction Area, Staff Parking.

### Instructions

1. While reading each knowledge file, collect every item that carries one of these inline tags: `[NEEDS_INPUT]`, `[AMBIGUOUS]`, `[ASSUMPTION]`, `[VERIFY]`, `[NEEDS_REVIEW]`. Record the file name and the section heading where each tagged item appears.

2. After reading all 12 knowledge files, read `knowledge/_PHASE_1_REPORT.md`. Cross-reference its listed [NEEDS_INPUT] and [AMBIGUOUS] items against your collected list. Add any items listed in the report that were NOT found as inline tags in the files. Use category `NEEDS_INPUT` for report-only items unless the report labels them differently.

3. De-duplicate: if an item appears both as an inline tag and in the report, include it once. Use the more informative description.

4. For each collected item, create a question object with these exact fields:

   - `id` — sequential string, zero-padded to 3 digits: `"Q001"`, `"Q002"`, etc. Number across all files combined, ordered by file in the reading sequence (personnel-registry first, external-vendors last, report items appended last).
   - `category` — exactly one of: `"NEEDS_INPUT"`, `"AMBIGUOUS"`, `"ASSUMPTION"`, `"VERIFY"`, `"NEEDS_REVIEW"`
   - `file` — relative path from project root, e.g. `"knowledge/personnel-registry.md"`
   - `section` — the section heading in the file where the item appears (e.g. `"## Staff Registry"`)
   - `question` — a clear, specific, answerable question (e.g. `"What is the correct spelling of the Admin - Stock Tags employee's name?"`)
   - `context` — one sentence explaining why this matters and what downstream files depend on the answer
   - `currentValue` — what the file currently says at that tag, or `"None — no value recorded"` if it is a pure gap
   - `options` — array of 2–5 specific answer strings (see rules below)

5. Rules for `options[]`:
   - For `AMBIGUOUS` items: the two competing values are the first two options (e.g. `["Jorja", "Georgia"]`)
   - For `NEEDS_INPUT` numeric gaps: provide realistic range options drawn from context in the source files (e.g. `["Under $500 per vehicle", "$500–$2,000 per vehicle", "$2,000–$5,000 per vehicle", "More than $5,000 per vehicle"]`)
   - For `NEEDS_INPUT` yes/no questions: options = `["Yes", "No"]`
   - For `NEEDS_INPUT` name/title gaps: provide plausible role titles or names mentioned anywhere in CLAUDE.md or the knowledge files
   - For `VERIFY` items: options = `[the current value labeled as "Correct as written", the most plausible alternative]`
   - For `ASSUMPTION` items: options = `[the assumed value labeled as "Assumption is correct", the most plausible alternative]`
   - All options must be specific — no generic placeholders like "Option A", "TBD", or "Unknown"
   - Each option must be under 80 characters
   - Do NOT include "Other", "Remove completely", "No change", or "Skip" — these are added automatically by the HTML

6. One question per tagged item. Do not combine multiple tagged items into one question.

### Output Specification

**File to create:** `split-prompts/01-split-this-prompt/questions.json`
**Format:** JSON
**Required structure:**

```json
[
  {
    "id": "Q001",
    "category": "AMBIGUOUS",
    "file": "knowledge/personnel-registry.md",
    "section": "## Staff Registry",
    "question": "What is the correct spelling of the Admin - Stock Tags employee's name?",
    "context": "CLAUDE.md specifies 'Jorja' but source material uses 'Georgia' — all downstream SOPs, checklists, and decision trees use this name.",
    "currentValue": "Jorja (in CLAUDE.md) / Georgia (in source material)",
    "options": ["Jorja", "Georgia"]
  },
  {
    "id": "Q002",
    ...
  }
]
```

The array must contain one entry per extracted item. Do not omit, summarize, or merge any items.

---

## STEP 4 — SUCCESS CRITERIA

Verify each item before proceeding to Step 5:

- [ ] `split-prompts/01-split-this-prompt/questions.json` exists at the specified path
- [ ] The file contains a valid JSON array (starts with `[`, ends with `]`)
- [ ] Every object in the array has all 8 required fields: `id`, `category`, `file`, `section`, `question`, `context`, `currentValue`, `options`
- [ ] IDs are sequential starting at Q001 with no gaps
- [ ] `options` array for every question contains 2–5 entries, each under 80 characters
- [ ] No question uses invented information — every item traces to a tagged line in a knowledge file or a listed item in `_PHASE_1_REPORT.md`
- [ ] No option value is "Other", "Remove completely", "No change", "Skip", "TBD", "Option A", or any equivalent placeholder

---

## STEP 5 — POST-EXECUTION

After all success criteria pass, update `split-prompts/01-split-this-prompt/state.json` in a single Write operation:
- `prompts.02.status` → `"complete"`
- `prompts.02.completed_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- If prompts 01, 02, AND 03 are all `"complete"`: set `overall_status` → `"in_progress"` (it will already be in_progress, leave unchanged unless all are complete, in which case leave it as `"in_progress"` since 99 is still pending)

Then tell the user:
> **Prompt 02 complete.**
> Created: split-prompts/01-split-this-prompt/questions.json
> Total questions extracted: [N]
> By category: NEEDS_INPUT=[N], AMBIGUOUS=[N], ASSUMPTION=[N], VERIFY=[N], NEEDS_REVIEW=[N]
>
> **Next steps:**
> Wait for prompt 03 (build-html-shell) to also show "complete" in state.json.
> Once both 02 and 03 are complete, send prompt 99 (inject-questions-and-finalize) in a fresh chat.
