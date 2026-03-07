# Sturgeon Dodge SOP Project — Session Prompt Guide

## How Many Sessions

This project runs in **8 Claude Code sessions**, one prompt file per session:

| Prompt File | Phase | Output |
|---|---|---|
| `01-phase1-knowledge-extraction.md` | Phase 1 | 12 knowledge files |
| `02-phase2-systems-analysis.md` | Phase 2 | 3 systems analysis files |
| `03a-phase3a-decision-trees-1-13.md` | Phase 3A | Decision trees 1–13 |
| `03b-phase3b-decision-trees-14-25.md` | Phase 3B | Decision trees 14–25 |
| `04-phase4-sop-generation.md` | Phase 4 | 5 SOP files |
| `05-phase5-checklists.md` | Phase 5 | 8 checklist files |
| `06-phase6-app-specification.md` | Phase 6 | 1 app spec file |
| `07-phase7-document-generation.md` | Phase 7 | 7 formatted output files |

Phase 3 is split into two sessions (3A and 3B) because 25 decision trees may exceed a single context window. Both must complete before Phase 4 can begin.

---

## How to Use These Prompts

1. Open a **new Claude Code session** (fresh chat — not a continuation of a prior session).
2. Set the working directory to: `c:\Users\abaut\Documents\Sturgeon dodge`
3. Copy the **entire contents** of the appropriate numbered prompt file.
4. Paste it as your first message.
5. Do not add any other text — the prompt is complete and self-contained.
6. Wait for the session to complete and write its report before starting the next session.

---

## Sequence Rules

- **Do not skip sessions.** Each session reads `state.json` to verify the prior session completed. If prerequisites are not met, the session will report this and stop.
- **Do not run two sessions simultaneously.** Sessions write to the same `state.json`.
- **Do not modify `state.json` manually** unless explicitly resetting a failed phase.
- **Always get user approval between sessions.** Each session ends with a completion report and stops. You must review the report and start the next session manually.

---

## State File

`prompts/state.json` is the shared state file. Every session:
1. Reads it to verify prerequisites are complete
2. Writes to it when the session completes

If a session fails mid-way, its phase status will remain `"in_progress"` in state.json. To re-run a failed session, manually change that phase's `"status"` back to `"pending"` and delete any partially-created files before restarting.

---

## Important Notes

- All sessions read `CLAUDE.md` and `EXECUTION_PLAN.md` at the start — these files contain the full project rules and phase meta-prompts.
- The working directory for all file operations is: `c:\Users\abaut\Documents\Sturgeon dodge`
- Phase 1 was partially started in a prior session (2 of 12 files were created). Prompt 01 will overwrite them and complete all 12 files from scratch to ensure consistency.
- Do not execute any prompt file in this current chat — they are for use in separate Claude Code sessions.
