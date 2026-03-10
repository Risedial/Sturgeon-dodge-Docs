# Batch 3 of 4 — PARALLEL (send after Batch 1 confirms complete)

Execute @MASTER-APP-BOOTSTRAP-PROMPT.md with these modifications:

Files already created in Batch 1 — do NOT recreate:
- lot-checklist-app/README.md
- lot-checklist-app/state.json

Skip the folder creation in Step 3 — Batch 1 already wrote those files. If lot-checklist-app/state.json exists, that is correct. Proceed.

Complete Steps 1 and 2 exactly as specified in the original prompt (read CLAUDE.md, META-SPLIT-PROMPT.md, app-spec/lot-checklist-app-requirements.md; run all 7 WebFetch calls and compile APPLE_SPEC — this file embeds the APPLE_SPEC values, so all web fetches are required).

Then proceed to Step 4 and create ONLY this file:
- lot-checklist-app/02-styling-spec.md

Do NOT create any files outside this list.
Do NOT create 01-blueprint.md, 03-implementation-plan.md, or 04-build-sequence-generator.md.
Do NOT run Step 5.
Do NOT update state.json.

After writing the file, stop and output:
"Batch 3 of 4 complete. Files created: lot-checklist-app/02-styling-spec.md. When all batches confirm complete, send batch-FINAL-SOLO.md."
