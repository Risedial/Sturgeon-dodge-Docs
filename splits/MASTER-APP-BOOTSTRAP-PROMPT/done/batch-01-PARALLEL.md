# Batch 1 of 4 — PARALLEL (SEND FIRST, ALONE)

Execute @MASTER-APP-BOOTSTRAP-PROMPT.md with these modifications:

Complete Steps 1 and 2 exactly as specified in the original prompt (read CLAUDE.md, META-SPLIT-PROMPT.md, app-spec/lot-checklist-app-requirements.md; run all 7 WebFetch calls and compile APPLE_SPEC).

Then complete Step 3 exactly as specified: create the folder `lot-checklist-app/` and write these two files only:

Create ONLY these files:
- lot-checklist-app/README.md
- lot-checklist-app/state.json

Do NOT create any files outside this list.
Do NOT create any micro-prompt files (01-blueprint.md, 02-styling-spec.md, 03-implementation-plan.md, 04-build-sequence-generator.md).
Do NOT run Step 4 or Step 5.
Do NOT update state.json to mark prompt 00 complete.

After writing both files, stop and output:
"Batch 1 of 4 complete. Files created: lot-checklist-app/README.md, lot-checklist-app/state.json. When all batches confirm complete, send batch-FINAL-SOLO.md."
