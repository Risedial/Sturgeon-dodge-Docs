# Lot Checklist App — Build System

## Overview
- Total micro-prompts: 4
- Estimated parallel sessions needed: 3 (prompts 01, 02, 03 run after 00; prompt 04 runs after all three complete)
- Output folder: `lot-checklist-app/`
- App type: Mobile HTML app (single-file or minimal multi-file, offline-first)
- Design system: Apple iOS / HIG — Liquid Glass aesthetic

## Execution Sequence

### Step 1 — Run First (no dependencies)
Send `00-initialize.md` in a fresh chat. Wait for completion.

### Step 2 — Parallel Group A (send simultaneously in 3 separate chats)
After Step 1 completes:
- `01-blueprint.md` — App blueprint (screens, navigation, data model)
- `02-styling-spec.md` — Apple HIG styling specification
- `03-implementation-plan.md` — Technical implementation plan

### Step 3 — Sequential (run after ALL of Step 2 completes)
Send `04-build-sequence-generator.md` in a fresh chat after 01, 02, and 03 all show `complete` in state.json.
This prompt reads the three output files and generates the full sequence of atomic build prompts.

## How to Use state.json
- `state.json` lives at: `lot-checklist-app/state.json`
- Every prompt reads it before starting and updates it when done
- Do not manually edit state.json unless a prompt has failed and you need to reset it to `pending`

## Resetting a Failed Prompt
Set the failed prompt's `status` back to `"pending"` in state.json, then re-send it in a fresh chat.
