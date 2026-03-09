# Batch 1 of 2 — PARALLEL (SEND FIRST, ALONE)

Execute @prompts/05-phase5-checklists.md with these modifications:

Before writing any files, update prompts/state.json as specified in the original prompt:
set phases.phase_5.status to "in_progress", set phases.phase_5.started_at to today's date, set last_updated to today's date.

Complete all mandatory first steps exactly as specified in the original prompt.

Create ONLY these files:
- checklists/vehicle-audit-new.md
- checklists/vehicle-audit-flr.md
- checklists/vehicle-audit-sold.md
- checklists/vehicle-audit-bnd.md

Do NOT create any files outside this list.
Do NOT write the completion report.
Do NOT update the state file to "complete."

After writing the last file in this list, stop and output:
"Batch 1 of 2 complete. Files created: checklists/vehicle-audit-new.md, checklists/vehicle-audit-flr.md, checklists/vehicle-audit-sold.md, checklists/vehicle-audit-bnd.md. When all batches confirm complete, send batch-FINAL-SOLO.md."
