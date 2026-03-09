# Batch 1 of 2 — PARALLEL (SEND FIRST, ALONE)

Execute @prompts/04-phase4-sop-generation.md with these modifications:

Before writing any files, update `prompts/state.json` as specified in the original prompt:
- Set `phases.phase_4.status` to `"in_progress"`
- Set `phases.phase_4.started_at` to today's date (YYYY-MM-DD)
- Set `last_updated` to today's date

Complete all mandatory first steps exactly as specified in the original prompt.

Create ONLY this file:
- `sops/master-sop.md`

Do NOT create any files outside this list.
Do NOT write the completion report.
Do NOT update the state file to "complete."

After writing the file, stop and output:
"Batch 1 of 2 complete. Files created: sops/master-sop.md. When all batches confirm complete, send batch-FINAL-SOLO.md."
