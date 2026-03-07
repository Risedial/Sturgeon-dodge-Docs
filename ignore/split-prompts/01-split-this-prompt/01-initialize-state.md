# PROMPT 01: INITIALIZE STATE

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL (no group — runs first) |
| **Depends on** | none |
| **Unblocks** | 02, 03 |
| **Writes to** | `split-prompts/01-split-this-prompt/state.json`, `split-prompts/01-split-this-prompt/README.md` |
| **Estimated output** | ~150 lines |

---

## STEP 1 — READ CONTEXT FILES

Read this file before doing anything else:

1. `CLAUDE.md` — read first, before all others

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Check `split-prompts/01-split-this-prompt/state.json`:

- If the file does not exist: proceed — this prompt creates it.
- If the file exists and `prompts.01.status` is `"complete"`: STOP. Tell the user:
  > "Prompt 01 has already been completed. state.json and README.md already exist. Proceed directly to sending prompts 02 and 03 simultaneously."
- If the file exists and `prompts.01.status` is `"in_progress"`: STOP. Tell the user:
  > "Prompt 01 is already in progress in another chat. Wait for that chat to complete, then check state.json."
- Otherwise: proceed.

Then tell the user:
> "Gate passed. Starting prompt 01: INITIALIZE STATE."

---

## STEP 3 — TASK

### Context
This is the initialization step for decomposing the knowledge-audit.html build task. The target prompt (`ALIGN THE PROJECT/01-split-this-prompt.md`) requires reading 12 knowledge files and building a self-contained HTML questionnaire. That work is split across 4 micro-prompts. This prompt creates the tracking infrastructure those prompts depend on.

### Instructions

1. Confirm the folder `split-prompts/01-split-this-prompt/` exists at the project root. If it does not exist, create it.

2. Write `split-prompts/01-split-this-prompt/state.json` with exactly this content (replace `[TIMESTAMP]` with the current ISO 8601 timestamp):

```json
{
  "target_prompt": "ALIGN THE PROJECT/01-split-this-prompt.md",
  "decomposed_by": "META-SPLIT-PROMPT",
  "created": "[TIMESTAMP]",
  "last_updated": "[TIMESTAMP]",
  "overall_status": "pending",
  "prompts": {
    "01": {
      "label": "initialize-state",
      "status": "pending",
      "parallel_group": null,
      "depends_on": [],
      "unblocks": ["02", "03"],
      "input_files": [],
      "output_files": [
        "split-prompts/01-split-this-prompt/state.json",
        "split-prompts/01-split-this-prompt/README.md"
      ],
      "started_at": null,
      "completed_at": null,
      "notes": ""
    },
    "02": {
      "label": "extract-questions",
      "status": "pending",
      "parallel_group": "A",
      "depends_on": ["01"],
      "unblocks": ["99"],
      "input_files": [
        "CLAUDE.md",
        "knowledge/personnel-registry.md",
        "knowledge/zone-definitions.md",
        "knowledge/vehicle-statuses-and-transitions.md",
        "knowledge/lot-placement-rules.md",
        "knowledge/signage-and-tagging-standards.md",
        "knowledge/key-cafe-protocol.md",
        "knowledge/compliance-requirements.md",
        "knowledge/financial-penalties.md",
        "knowledge/daily-operations-workflow.md",
        "knowledge/communication-and-escalation-protocols.md",
        "knowledge/service-department-utilization.md",
        "knowledge/external-vendors.md",
        "knowledge/_PHASE_1_REPORT.md"
      ],
      "output_files": [
        "split-prompts/01-split-this-prompt/questions.json"
      ],
      "started_at": null,
      "completed_at": null,
      "notes": "Expected ~60-70 question objects. Reads all 12 knowledge files + phase 1 report."
    },
    "03": {
      "label": "build-html-shell",
      "status": "pending",
      "parallel_group": "A",
      "depends_on": ["01"],
      "unblocks": ["99"],
      "input_files": [
        "CLAUDE.md",
        "ALIGN THE PROJECT/01-split-this-prompt.md"
      ],
      "output_files": [
        "knowledge-audit.html"
      ],
      "started_at": null,
      "completed_at": null,
      "notes": "Builds complete HTML+CSS+JS shell with const QUESTIONS = []; placeholder. Does NOT read knowledge files."
    },
    "99": {
      "label": "inject-questions-and-finalize",
      "status": "pending",
      "parallel_group": null,
      "depends_on": ["02", "03"],
      "unblocks": [],
      "input_files": [
        "split-prompts/01-split-this-prompt/questions.json",
        "knowledge-audit.html"
      ],
      "output_files": [
        "knowledge-audit.html"
      ],
      "started_at": null,
      "completed_at": null,
      "notes": "Uses Edit tool to replace const QUESTIONS = []; with the full array from questions.json."
    }
  }
}
```

3. Write `split-prompts/01-split-this-prompt/README.md` with exactly this content:

```markdown
# knowledge-audit.html — Execution Guide

## Overview
- Total prompts: 4
- Minimum parallel chat sessions needed: 2 (step 2 runs 02 and 03 simultaneously)
- Output folder: split-prompts/01-split-this-prompt/
- Final output: knowledge-audit.html (project root)

## Execution Sequence

### Step 1 — Run First (no dependencies)
Send prompt 01 in a fresh chat. Wait for it to complete before doing anything else.

### Step 2 — Parallel Group A (send simultaneously in separate chats)
After prompt 01 shows "complete" in state.json, send these two prompts each in their own fresh chat at the same time:
- 02 — extract-questions (reads all 12 knowledge files → writes questions.json)
- 03 — build-html-shell (builds full HTML+CSS+JS → writes knowledge-audit.html with empty QUESTIONS)

### Step 3 — Final Assembly (sequential, runs last)
After both 02 and 03 show "complete" in state.json:
- Send prompt 99 — inject-questions-and-finalize

Prompt 99 edits knowledge-audit.html in place, injecting the full QUESTIONS array from questions.json.

## How to Use state.json
- state.json lives at: split-prompts/01-split-this-prompt/state.json
- Every prompt reads it before starting and updates it when done
- If a prompt tells you to stop, check state.json for the blocking prompt's status
- Do not manually edit state.json unless a prompt has failed and you need to reset it

## Resetting a Failed Prompt
If a prompt fails mid-execution, manually set its status back to "pending" in state.json,
then re-send it in a fresh chat.

## Verification After Prompt 99 Completes
1. knowledge-audit.html exists at the project root
2. Open it via file:// in any modern browser — all 4 views render
3. VIEW 1 shows a non-zero "Total Questions" count
4. Clicking "Start Audit →" shows the first question with a colored category badge
5. VIEW 4 "Generate Prompt →" produces a formatted Claude prompt in the textarea
```

---

## STEP 4 — SUCCESS CRITERIA

Verify each item before proceeding to Step 5:

- [ ] Folder `split-prompts/01-split-this-prompt/` exists
- [ ] `split-prompts/01-split-this-prompt/state.json` exists and contains all 4 prompt entries (01, 02, 03, 99)
- [ ] All 4 prompts have `"status": "pending"` in state.json
- [ ] `split-prompts/01-split-this-prompt/README.md` exists and contains the execution sequence section

---

## STEP 5 — POST-EXECUTION

After all success criteria pass, update `split-prompts/01-split-this-prompt/state.json` in a single Write operation:
- `prompts.01.status` → `"complete"`
- `prompts.01.completed_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- `overall_status` → `"in_progress"`

Then tell the user:
> **Prompt 01 complete.**
> Created: split-prompts/01-split-this-prompt/state.json, split-prompts/01-split-this-prompt/README.md
>
> **Next steps:**
> You can now send the following prompts simultaneously in separate chats:
> - 02 — extract-questions
> - 03 — build-html-shell
