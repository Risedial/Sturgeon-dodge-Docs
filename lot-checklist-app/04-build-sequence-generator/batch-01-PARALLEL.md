# Batch 1 of 5 — PARALLEL (SEND FIRST, ALONE)

Execute @lot-checklist-app/04-build-sequence-generator.md with these modifications:

Write the "in_progress" state update to `lot-checklist-app/state.json` exactly as specified in STEP 2 of the original prompt before creating any files.

Complete all mandatory first steps exactly as specified in the original prompt.

Create ONLY these files:
- `lot-checklist-app/build-sequence/state.json`
- `lot-checklist-app/build-sequence/README.md`
- `lot-checklist-app/build-sequence/01-project-scaffold.md`
- `lot-checklist-app/build-sequence/02-css-foundation.md`

Do NOT create any files outside this list.
Do NOT write any other build prompt files.
Do NOT run quality gates.
Do NOT update `lot-checklist-app/state.json` to "complete."

After writing the last file in this list, stop and output:
"Batch 1 of 5 complete. Files created: lot-checklist-app/build-sequence/state.json, lot-checklist-app/build-sequence/README.md, lot-checklist-app/build-sequence/01-project-scaffold.md, lot-checklist-app/build-sequence/02-css-foundation.md. When all batches confirm complete, send batch-FINAL-SOLO.md."
