# knowledge-audit.html — Execution Guide

## Overview
- Total prompts: 4
- Minimum parallel chat sessions needed: 2 (step 2 runs 02 and 03 simultaneously)
- Output folder: split-prompts/01-split-this-prompt/
- Final output: knowledge-audit.html (project root)

## Execution Sequence

### Step 1 — Run First (no dependencies)
Send prompt **01** in a fresh chat. Wait for it to complete before doing anything else.

### Step 2 — Parallel Group A (send simultaneously in separate chats)
After prompt 01 shows `"complete"` in state.json, send these two prompts each in their own fresh chat **at the same time**:
- **02** — extract-questions (reads all 12 knowledge files → writes questions.json)
- **03** — build-html-shell (builds full HTML+CSS+JS → writes knowledge-audit.html with empty QUESTIONS)

### Step 3 — Final Assembly (sequential, runs last)
After **both** 02 and 03 show `"complete"` in state.json:
- Send prompt **99** — inject-questions-and-finalize

Prompt 99 edits knowledge-audit.html in place, injecting the full QUESTIONS array from questions.json.

## How to Use state.json
- state.json lives at: `split-prompts/01-split-this-prompt/state.json`
- Every prompt reads it before starting and updates it when done
- If a prompt tells you to stop, check state.json for the blocking prompt's status
- Do not manually edit state.json unless a prompt has failed and you need to reset it

## Resetting a Failed Prompt
If a prompt fails mid-execution, manually set its `status` back to `"pending"` in state.json,
then re-send it in a fresh chat.

## Verification After Prompt 99 Completes
1. `knowledge-audit.html` exists at the project root
2. Open it via `file://` in any modern browser — all 4 views render
3. VIEW 1 shows a non-zero "Total Questions" count
4. Clicking "Start Audit →" shows the first question with a colored category badge
5. VIEW 4 "Generate Prompt →" produces a formatted Claude prompt in the textarea
