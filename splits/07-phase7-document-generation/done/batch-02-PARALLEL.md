# Batch 2 of 3 — PARALLEL

Execute @prompts/07-phase7-document-generation.md with these modifications:

Files already created in prior batches — do NOT recreate:
- `outputs/master-sop.md`
- `outputs/team-lot.md`
- `outputs/team-sales.md`

Skip the "in_progress" state update — Batch 1 already wrote it. If state.json shows "in_progress", that is correct. Proceed.

Complete all mandatory first steps exactly as specified in the original prompt.

Create ONLY these files:
- `outputs/team-service.md`
- `outputs/team-management.md`

Do NOT create any files outside this list.
Do NOT write the completion report.
Do NOT update the state file to "complete."

After writing the last file in this list, stop and output:
"Batch 2 of 3 complete. Files created: outputs/team-service.md, outputs/team-management.md. When all batches confirm complete, send batch-FINAL-SOLO.md."
