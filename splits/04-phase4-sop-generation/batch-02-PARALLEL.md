# Batch 2 of 2 — PARALLEL (send after Batch 1 confirms complete)

Execute @prompts/04-phase4-sop-generation.md with these modifications:

Files already created in prior batches — do NOT recreate:
- `sops/master-sop.md`

Skip the "in_progress" state update — Batch 1 already wrote it. If state.json shows "in_progress", that is correct. Proceed.

Complete all mandatory first steps exactly as specified in the original prompt.

Create ONLY these files:
- `sops/team-lot.md`
- `sops/team-sales.md`
- `sops/team-service.md`
- `sops/team-management.md`

Do NOT create any files outside this list.
Do NOT write the completion report.
Do NOT update the state file to "complete."

After writing the last file in this list, stop and output:
"Batch 2 of 2 complete. Files created: sops/team-lot.md, sops/team-sales.md, sops/team-service.md, sops/team-management.md. When all batches confirm complete, send batch-FINAL-SOLO.md."
