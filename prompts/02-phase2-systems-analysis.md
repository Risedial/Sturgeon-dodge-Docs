# SESSION PROMPT — Phase 2: Systems Analysis
# Sturgeon Dodge Edmonton Office Lot Operations SOP Project

---

## MANDATORY FIRST STEPS — DO THESE BEFORE ANYTHING ELSE

Read the following files in this exact order. Do not skip any file. Do not begin the STATE CHECK until all reads are complete.

1. Read `CLAUDE.md` — project rules, conventions, quality gates, domain glossary.
2. Read `EXECUTION_PLAN.md` — project architecture and the Phase 2 meta-prompt in Section 4.
3. Read `prompts/state.json` — the shared state file. You will check prerequisites here.
4. Read all 12 knowledge files in this order:
   - `knowledge/vehicle-statuses-and-transitions.md`
   - `knowledge/zone-definitions.md`
   - `knowledge/lot-placement-rules.md`
   - `knowledge/financial-penalties.md`
   - `knowledge/compliance-requirements.md`
   - `knowledge/personnel-registry.md`
   - `knowledge/signage-and-tagging-standards.md`
   - `knowledge/key-cafe-protocol.md`
   - `knowledge/daily-operations-workflow.md`
   - `knowledge/communication-and-escalation-protocols.md`
   - `knowledge/service-department-utilization.md`
   - `knowledge/external-vendors.md`

All reads must complete before you proceed.

---

## STATE CHECK — ABORT IF PREREQUISITES ARE NOT MET

After reading `prompts/state.json`, check:

**Required:** `phases.phase_1.status` must equal `"complete"` OR `"complete_with_issues"`.

If `phases.phase_1.status` is `"pending"` or `"in_progress"`:
- **STOP immediately.**
- Do not create any files.
- Output this message to the user: "ABORT: Phase 1 is not marked complete in prompts/state.json. Phase 1 must be completed using prompts/01-phase1-knowledge-extraction.md in a separate session before Phase 2 can begin."
- Take no further action.

If the prerequisite is met, continue to the task section.

Also read `knowledge/_PHASE_1_REPORT.md` and note any `[NEEDS_INPUT]` or `[AMBIGUOUS]` items from Phase 1. If Phase 1 has unresolved `[NEEDS_INPUT]` items in files that Phase 2 depends on, note them but continue — do not block Phase 2 for them. Tag your outputs `[NEEDS_INPUT]` wherever the same gaps affect Phase 2 content.

**Before writing any files, update `prompts/state.json`:**
- Set `phases.phase_2.status` to `"in_progress"`
- Set `phases.phase_2.started_at` to today's date (YYYY-MM-DD)
- Set `last_updated` to today's date

---

## YOUR TASK — PHASE 2: SYSTEMS ANALYSIS

Execute the Phase 2 meta-prompt exactly as written in Section 4 of `EXECUTION_PLAN.md`. The full content specifications for all 3 files are there. The requirements below are authoritative.

### What You Must Produce

Create the following 4 files. The `systems-analysis/` directory must be created if it does not exist.

**File 1:** `systems-analysis/cause-effect-map.md`
**File 2:** `systems-analysis/failure-modes.md`
**File 3:** `systems-analysis/financial-impact-analysis.md`
**File 4:** `systems-analysis/_PHASE_2_REPORT.md` (completion report — written last)

### Source Constraint

**You may only use information from the 12 `knowledge/` files.** Do not re-read `context-lot-walkthrough.md` or `LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md`. The knowledge files are the single source of truth for all downstream phases.

---

### File 1: `systems-analysis/cause-effect-map.md`

Map every identified cause-and-effect pattern from the knowledge files. Use systems thinking — look for cascading failures, feedback loops, and compounding problems.

Format each entry exactly as:
```
CAUSE: [what triggers the pattern]
EFFECT: [what results]
SEVERITY: [HIGH / MEDIUM / LOW]
CATEGORY: [FINANCIAL / COMPLIANCE / OPERATIONAL / SAFETY]
EXAMPLE: [real incident from knowledge files if available]
PREVENTION: [the standard/rule that prevents this]
```

**Minimum required patterns to map** (add more if identified in knowledge files):
1. New vehicle miscategorized as RECON instead of Pending PDI → hidden from sales inventory → days lost waiting for a sale
2. Vehicle delivered in ship mode → battery failure next day → tow + rework
3. PDI skipped because salesperson said "it's good to go" → Stellantis compliance rate drops → fines/docking
4. Sold vehicle has no sign → status confusion → lot team cannot identify vehicle → wrong vehicle moved
5. Vehicle sits without identification → nobody knows status → paralysis (Kia incident: 6 weeks)
6. Dealer plate transferred peer-to-peer → no log → employee accountability lost → $500 penalty becomes unenforceable
7. Key not returned to Key Cafe → lost key → replacement cost + vehicle security risk
8. Internal vehicle work not routed to service → service department underutilized → $3,000/day overhead not justified
9. No morning lot walk → non-compliant vehicles not caught → problems compound → harder to fix
10. Staff parking on lot → lot space consumed → customer vehicles blocked → unprofessional appearance
11. Stock-in tag not placed → vehicle not confirmed processed → unknown processing state
12. Enforcement not consistent → staff treat rules as optional → standards degrade over time

---

### File 2: `systems-analysis/failure-modes.md`

Identify every failure mode — conditions under which the system breaks down or produces a bad outcome.

Format each entry exactly as:
```
FAILURE MODE: [name]
TRIGGER: [what causes it]
DETECTION: [how it would be noticed]
CONSEQUENCE: [what happens if undetected]
RECOVERY: [what must happen to correct it]
PREVENTION: [the specific rule/process that prevents it]
STATUS_TAG: [CONFIRMED / POTENTIAL / AMBIGUOUS]
```

Use:
- `CONFIRMED` for failures explicitly described in the knowledge files (Kia incident, ship mode delivery, $500 plate penalty, 80% compliance rate)
- `POTENTIAL` for logically inferred failure modes not explicitly described
- `AMBIGUOUS` for failure modes where source material is unclear

**Both of these CONFIRMED failures must appear:**
1. Kia incident — vehicle sat 6 weeks with no identification, no one knew its status
2. Ship mode delivery — vehicle delivered to customer in ship mode, battery died next day, required tow back and complete rework

---

### File 3: `systems-analysis/financial-impact-analysis.md`

Produce a comprehensive financial impact analysis. All dollar amounts must trace to `knowledge/financial-penalties.md`. Do not invent figures.

Structure the document in four sections:

**Section A — Direct Costs (known amounts):**
- Dealer plate lost: $500 per occurrence
- GPS key tag reprogram: $25 per occurrence
- Keys lost: ~50% of replacement cost
- DHD full detail: $60 per vehicle
- Service department daily labor: ~$3,000/day (9 staff)
- Stellantis non-compliance: fines/docking — mark `[NEEDS_INPUT]` for exact amounts (not specified in source material)

**Section B — Indirect Costs (estimate basis and reasoning required):**
- Vehicle days-in-stock delay from wrong categorization (hidden from inventory)
- PDI rework cost when process is skipped
- Management time spent correcting avoidable issues
- Customer satisfaction impact from mis-delivered vehicles
For each: provide an estimate basis and reasoning. Mark estimates as `[ASSUMPTION]`.

**Section C — Opportunity Costs:**
- Service department running at 1-customer utilization vs. full capacity
- Revenue impact of vehicles not on front line due to missing PDI/detail/tags
For each: provide reasoning. Mark estimates as `[ASSUMPTION]`.

**Section D — Cost Prevention Analysis:**
Produce a table with columns: Process | Financial Risk Prevented | Frequency Estimate | Annual Risk Exposure
Include one row per major operational process from the knowledge files. Mark frequency estimates as `[ASSUMPTION]`.

---

## QUALITY GATES — VERIFY BEFORE WRITING THE REPORT

Before writing `systems-analysis/_PHASE_2_REPORT.md`, confirm every item below. Fix any failure before marking the phase complete.

- [ ] All 3 systems analysis files exist in `systems-analysis/`
- [ ] No file contains information that cannot be traced to a `knowledge/` file
- [ ] Kia incident appears in `failure-modes.md` with STATUS_TAG: CONFIRMED
- [ ] Ship mode delivery failure appears in `failure-modes.md` with STATUS_TAG: CONFIRMED
- [ ] Service department underutilization documented in `financial-impact-analysis.md` with the $3,000/day figure
- [ ] PDI compliance at 80% documented in `financial-impact-analysis.md` with red zone context
- [ ] All dollar amounts in `financial-impact-analysis.md` trace to `knowledge/financial-penalties.md`
- [ ] All invented or estimated figures are tagged `[ASSUMPTION]`
- [ ] Missing figures are tagged `[NEEDS_INPUT]` (not fabricated)
- [ ] Canonical zone names used throughout all 3 files
- [ ] Personnel referenced by role title (names only where confirmed)
- [ ] `cause-effect-map.md` contains all 12 minimum required patterns plus any additional patterns identified

---

## COMPLETION REPORT

After all quality gates pass, write `systems-analysis/_PHASE_2_REPORT.md` using the Phase Completion Report template from Section 8 of `CLAUDE.md`. The report must include:
- List of all 3 files created with their status
- Quality gate checklist (all items above, checked or unchecked)
- All `[NEEDS_INPUT]` items found
- All `[AMBIGUOUS]` items found
- All `[ASSUMPTION]` items and their basis
- Notes for Phase 3 (anything the next session should know)

---

## STATE UPDATE — WRITE THIS AFTER THE REPORT IS COMPLETE

After writing `systems-analysis/_PHASE_2_REPORT.md`, update `prompts/state.json`:

```
phases.phase_2.status = "complete"
phases.phase_2.completed_at = [today's date, YYYY-MM-DD]
phases.phase_2.files_confirmed_created = [list all 4 files including the report]
phases.phase_2.quality_gates_passed = true
phases.phase_2.needs_input_items = [list any [NEEDS_INPUT] items found]
phases.phase_2.ambiguous_items = [list any [AMBIGUOUS] items found]
last_updated = [today's date, YYYY-MM-DD]
```

If quality gates did NOT all pass:
```
phases.phase_2.status = "complete_with_issues"
phases.phase_2.quality_gates_passed = false
phases.phase_2.notes = [description of which gates failed and why]
```

---

## STOP

After updating state.json, **stop completely**. Do not begin Phase 3. Do not read any decision tree files.

Output a final message to the user:
- Phase 2 is complete
- How many files were created
- How many `[NEEDS_INPUT]` items were found
- How many `[AMBIGUOUS]` or `[ASSUMPTION]` items were found
- That `prompts/state.json` has been updated
- That Phase 3A can now be started using `prompts/03a-phase3a-decision-trees-1-13.md` in a new Claude Code session
