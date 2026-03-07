# SESSION PROMPT — Phase 1: Knowledge Extraction
# Sturgeon Dodge Edmonton Office Lot Operations SOP Project

---

## MANDATORY FIRST STEPS — DO THESE BEFORE ANYTHING ELSE

Read the following files in this exact order. Do not skip any file. Do not begin the task section until all four reads are complete.

1. Read `CLAUDE.md` — project rules, conventions, quality gates, and the domain glossary. These rules apply to every file you create.
2. Read `EXECUTION_PLAN.md` — project architecture, all phase descriptions, and the Phase 1 meta-prompt in Section 4.
3. Read `prompts/state.json` — the shared state file that tracks project progress across sessions.
4. Read `context-lot-walkthrough.md` — primary source document (lot walkthrough transcript).
5. Read `LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md` — background context document (automated placement engine spec).

All five reads must complete before you proceed to the STATE CHECK section.

---

## STATE CHECK — READ THIS BEFORE TOUCHING ANY FILES

After reading `prompts/state.json`, verify the following:

**Prerequisite:** `phase_1` prerequisite_phases is empty `[]` — Phase 1 has no prerequisites. You may always proceed.

**Current state note:** Phase 1 was partially started in a prior session. The files `knowledge/personnel-registry.md` and `knowledge/zone-definitions.md` may already exist. **Treat them as incomplete and overwrite them.** All 12 knowledge files must be created in this session to ensure consistency. A phase is only valid if all 12 files were produced in the same quality-gated run.

**Before writing any files, update `prompts/state.json`:**
- Set `phases.phase_1.status` to `"in_progress"`
- Set `phases.phase_1.started_at` to today's date (YYYY-MM-DD format)
- Set `last_updated` to today's date

---

## YOUR TASK — PHASE 1: KNOWLEDGE EXTRACTION

Execute the Phase 1 meta-prompt exactly as written in Section 4 of `EXECUTION_PLAN.md`. The full content specifications for all 12 files are there. The summary below defines what you must produce and the non-negotiable rules that apply.

### What You Must Produce

Create the following 13 files. The `knowledge/` directory must be created if it does not exist.

**File 1:** `knowledge/personnel-registry.md`
**File 2:** `knowledge/zone-definitions.md`
**File 3:** `knowledge/vehicle-statuses-and-transitions.md`
**File 4:** `knowledge/lot-placement-rules.md`
**File 5:** `knowledge/signage-and-tagging-standards.md`
**File 6:** `knowledge/key-cafe-protocol.md`
**File 7:** `knowledge/compliance-requirements.md`
**File 8:** `knowledge/financial-penalties.md`
**File 9:** `knowledge/daily-operations-workflow.md`
**File 10:** `knowledge/communication-and-escalation-protocols.md`
**File 11:** `knowledge/service-department-utilization.md`
**File 12:** `knowledge/external-vendors.md`
**File 13:** `knowledge/_PHASE_1_REPORT.md` (completion report — written last)

### Non-Negotiable Rules for Every File You Create

- **No invented information.** Every fact must trace to `context-lot-walkthrough.md` or `LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md`. If information is absent from the source documents, mark it `[NEEDS_INPUT]`.
- **Tag all uncertainties.** Use `[AMBIGUOUS]` for unclear or contradictory source material. Use `[ASSUMPTION]` for logical inferences. Use `[VERIFY]` for claims that need confirmation.
- **Canonical zone names only.** Use exactly: `Cage`, `East Side Fence Line`, `West Side of Building`, `Overflow (Temporary)`. No abbreviations, no alternates.
- **Role titles as primary identifiers.** Use role titles, not personal names, as the primary identifier for every person. Exception: Jorja (Admin - Stock Tags), Giselle (Admin/Tech - Stock Tags + Service), Kevin (Sales Manager) are confirmed names and may be used.
- **No technical automation content.** `LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md` is background context only. Use it to understand placement logic for edge cases. Do not include n8n workflows, Airtable formulas, automation triggers, or API details in any knowledge file.
- **Kia incident must appear in `signage-and-tagging-standards.md`.** This is the confirmed real incident: a vehicle sat on the lot for 6 weeks with no identification because no signage was applied. Include it.
- **Ship mode delivery failure must appear in `compliance-requirements.md`.** This is the confirmed real incident: a vehicle was delivered to a customer in ship mode, the battery died the next day, required a tow back and complete rework.

### Key Content Requirements By File

**`vehicle-statuses-and-transitions.md`** must include:
- All states: Ship Mode, Pending PDI, PDI In Progress, PDI Complete, Detailing, Front-Line Ready, On Display (Front Line), Sold, Book-Not-Delivered (BND), Trade-In, Customer Vehicle, Recon, Dealer Trade Incoming, Auction Bound, Non-Prime / Division One
- State transition diagram (text-based)
- Critical rule: new arrivals NEVER get "recon" status — they get "Pending PDI"

**`lot-placement-rules.md`** must include:
- Non-prime identification: check Airtable STOCK HOLDER column — "NON PRIME DIVISION" = send to Legal (AB | STURGEON DODGE); "STURGEON DODGE" = allowed on this lot
- Category definitions: NEW (KM ≤ 1,000), FLR (AVAILABLE or DEMO), SOLD (SIGNED DEAL or WHOLESALE|SOLD), BND (BOOKED|NOT DELIVERED), RECON (IN RECON, INCOMING, WHOLESALE, CHASE)
- Slot fill rules for Cage (C01–C20), East Side Fence Line (F1–F5), West Side of Building (L1–L5)
- Brand priority: Jeep (1), Ram (2), Chrysler (3), Dodge (4), all others (5)
- Body type priority: SUV (1), Van (2), Truck (3), Sedan (4)

**`key-cafe-protocol.md`** must include:
- No peer-to-peer transfers — exact language: "No — go back to Key Cafe, I'll check mine in, you sign it out"
- GPS key tag cost: $25 to reprogram
- Dealer plate lost penalty: $500 (enforced — confirmed precedent)
- Accountability agreement requirement: must be signed before any key/plate access

**`financial-penalties.md`** must include a table with: item, penalty amount, who pays, enforcement status, notes

---

## QUALITY GATES — VERIFY BEFORE WRITING THE REPORT

Before writing `knowledge/_PHASE_1_REPORT.md`, confirm every item below. If any item fails, fix it before marking the phase complete.

- [ ] All 12 knowledge files exist in the `knowledge/` directory
- [ ] No file contains invented information (every fact traces to a source document)
- [ ] All ambiguities are tagged with `[AMBIGUOUS]`, `[NEEDS_INPUT]`, `[ASSUMPTION]`, or `[VERIFY]`
- [ ] Canonical zone names used throughout all 12 files (Cage, East Side Fence Line, West Side of Building, Overflow (Temporary))
- [ ] All personnel referenced by role title (names only where confirmed: Jorja, Giselle, Kevin)
- [ ] Kia incident documented in `knowledge/signage-and-tagging-standards.md`
- [ ] Ship mode delivery failure documented in `knowledge/compliance-requirements.md`
- [ ] Non-prime identification method (STOCK HOLDER column) in `knowledge/lot-placement-rules.md`
- [ ] All financial penalties documented with enforcement status in `knowledge/financial-penalties.md`
- [ ] Stock-in tag process documented (Jorja + Giselle fill, lot team places, bottom-right windshield, white color) in `knowledge/signage-and-tagging-standards.md`
- [ ] No technical automation content (no n8n, no Airtable formulas, no API details) in any file
- [ ] `LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md` content used only for placement logic understanding, not copied into files

---

## COMPLETION REPORT

After all quality gates pass, write `knowledge/_PHASE_1_REPORT.md` using the Phase Completion Report template from Section 8 of `CLAUDE.md`. The report must include:
- List of all 12 files created with their status (COMPLETE / DRAFT / NEEDS_INPUT)
- Quality gate checklist (all items from above, checked or unchecked)
- All `[NEEDS_INPUT]` items found (file, section, what is missing)
- All `[AMBIGUOUS]` items found (file, section, what is unclear)
- Notes for Phase 2 (anything the next session should know)

---

## STATE UPDATE — WRITE THIS AFTER THE REPORT IS COMPLETE

After writing `knowledge/_PHASE_1_REPORT.md`, update `prompts/state.json` with the following changes:

```
phases.phase_1.status = "complete"
phases.phase_1.completed_at = [today's date, YYYY-MM-DD]
phases.phase_1.files_confirmed_created = [list all 13 files including the report]
phases.phase_1.quality_gates_passed = true
phases.phase_1.needs_input_items = [list any [NEEDS_INPUT] items found, as strings]
phases.phase_1.ambiguous_items = [list any [AMBIGUOUS] items found, as strings]
last_updated = [today's date, YYYY-MM-DD]
```

If quality gates did NOT all pass, set:
```
phases.phase_1.status = "complete_with_issues"
phases.phase_1.quality_gates_passed = false
phases.phase_1.notes = [description of which gates failed and why]
```

---

## STOP

After writing the state.json update, **stop completely**. Do not begin Phase 2. Do not read any Phase 2 files. Do not take any further action.

Output a final message to the user that says:
- Phase 1 is complete
- How many files were created
- How many `[NEEDS_INPUT]` items were found
- How many `[AMBIGUOUS]` items were found
- That `prompts/state.json` has been updated
- That Phase 2 can now be started using `prompts/02-phase2-systems-analysis.md` in a new Claude Code session
