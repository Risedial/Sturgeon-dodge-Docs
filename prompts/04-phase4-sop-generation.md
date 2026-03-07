# SESSION PROMPT — Phase 4: SOP Generation
# Sturgeon Dodge Edmonton Office Lot Operations SOP Project

---

## MANDATORY FIRST STEPS — DO THESE BEFORE ANYTHING ELSE

Read the following files in this exact order. Do not skip any file. Do not begin the STATE CHECK until all reads are complete.

1. Read `CLAUDE.md` — all rules, conventions, quality gates, domain glossary.
2. Read `EXECUTION_PLAN.md` — read the Phase 4 meta-prompt in Section 4 in full.
3. Read `prompts/state.json` — the shared state file.
4. Read all 12 knowledge files:
   - `knowledge/personnel-registry.md`
   - `knowledge/zone-definitions.md`
   - `knowledge/vehicle-statuses-and-transitions.md`
   - `knowledge/lot-placement-rules.md`
   - `knowledge/signage-and-tagging-standards.md`
   - `knowledge/key-cafe-protocol.md`
   - `knowledge/compliance-requirements.md`
   - `knowledge/financial-penalties.md`
   - `knowledge/daily-operations-workflow.md`
   - `knowledge/communication-and-escalation-protocols.md`
   - `knowledge/service-department-utilization.md`
   - `knowledge/external-vendors.md`
5. Read the titles/headers (not full content) of all 25 decision trees in `systems-analysis/decision-trees/` to understand what cross-reference targets are available.
6. Read phase reports: `knowledge/_PHASE_1_REPORT.md`, `systems-analysis/_PHASE_2_REPORT.md`, `systems-analysis/decision-trees/_PHASE_3A_REPORT.md`, `systems-analysis/decision-trees/_PHASE_3B_REPORT.md`

All reads must complete before you proceed.

---

## STATE CHECK — ABORT IF PREREQUISITES ARE NOT MET

After reading `prompts/state.json`, check:

**Required:**
- `phases.phase_1.status` must be `"complete"` OR `"complete_with_issues"`
- `phases.phase_2.status` must be `"complete"` OR `"complete_with_issues"`
- `phases.phase_3a.status` must be `"complete"` OR `"complete_with_issues"`
- `phases.phase_3b.status` must be `"complete"` OR `"complete_with_issues"`

If any prerequisite is NOT met:
- **STOP immediately.**
- Do not create any files.
- Output: "ABORT: Prerequisites not met in prompts/state.json. All of phase_1, phase_2, phase_3a, and phase_3b must be complete before Phase 4 can begin. Missing: [list which phases are not complete]."
- Take no further action.

If prerequisites are met, continue.

**Before writing any files, update `prompts/state.json`:**
- Set `phases.phase_4.status` to `"in_progress"`
- Set `phases.phase_4.started_at` to today's date (YYYY-MM-DD)
- Set `last_updated` to today's date

---

## YOUR TASK — PHASE 4: SOP GENERATION

Execute the Phase 4 meta-prompt exactly as written in Section 4 of `EXECUTION_PLAN.md`. The full content specifications for all 5 SOPs are there. The requirements below are authoritative.

### What You Must Produce

Create the following 6 files. The `sops/` directory must be created if it does not exist.

**File 1:** `sops/master-sop.md`
**File 2:** `sops/team-lot.md`
**File 3:** `sops/team-sales.md`
**File 4:** `sops/team-service.md`
**File 5:** `sops/team-management.md`
**File 6:** `sops/_PHASE_4_REPORT.md` (completion report — written last)

### Source Constraint

**You may only use information from `knowledge/` files.** Do not re-read `context-lot-walkthrough.md` or `LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md`. Do not re-read the systems analysis files for factual content (use them only for awareness of gaps flagged in their reports).

---

## SOP WRITING RULES — APPLY TO ALL 5 FILES

- **Reference decision trees; do not inline them.** When a branching scenario occurs in an SOP, write: "Follow → SEE: [filename].md" and continue. Do not reproduce the decision tree's content inside the SOP.
- **Zero ambiguous instructions.** Every instruction in every SOP must be specific and actionable.
- **Team SOPs are self-contained.** Each team SOP is written for that team's members only. A lot attendant reading `team-lot.md` must be able to do their entire job without reading any other team SOP.
- **Role titles as primary identifiers.** Use role titles throughout. Names only where confirmed: Jorja (Admin - Stock Tags), Giselle (Admin/Tech - Stock Tags + Service), Kevin (Sales Manager).
- **State penalties explicitly.** Where a rule has a financial penalty, state the amount and enforcement status.
- **Include communication templates.** Wherever a person must communicate something, write: who, to whom, on what channel, and exact language or template.
- **Canonical zone names only.** Cage, East Side Fence Line, West Side of Building, Overflow (Temporary).

---

## FILE SPECIFICATIONS

### File 1: `sops/master-sop.md` — Master Standard Operating Procedure

This is the comprehensive SOP covering all lot operations at the Edmonton Office. It is the authoritative reference document. Structure exactly as follows (numbered sections):

**Section 1 — Purpose and Scope**
- Purpose: eliminate decision fatigue for all lot, sales, service, and management staff at the Edmonton Office
- Scope: Edmonton Office lot only; Sturgeon/Legal (AB | STURGEON DODGE) is a separate location referenced only as non-prime vehicle destination

**Section 2 — Zone Map and Rules**
- One subsection per zone: Cage, East Side Fence Line, West Side of Building, Overflow (Temporary), Power Sport / Quad Corner, Auction Area, Staff Parking
- Each subsection: canonical name, purpose, slot count, what vehicles are allowed, what vehicles are prohibited, required vehicle conditions, capacity rules
- Include Cage-specific rules: facing direction, door spacing, max one empty stall, slot priority (C01–C20)

**Section 3 — Vehicle Lifecycle**
- All vehicle states and their transitions (reference `knowledge/vehicle-statuses-and-transitions.md`)
- State transition summary: arrival → Pending PDI → PDI In Progress → PDI Complete → Detailing → FLR → On Display → Sold → BND → Delivered
- Critical rule: new arrivals are NEVER assigned "Recon" status; they are "Pending PDI"

**Section 4 — Lot Placement Rules**
- Category definitions (NEW, FLR, SOLD, BND, RECON) with Airtable status triggers
- Override logic (BND/SOLD/RECON overrides NEW for placement category)
- Non-prime identification (STOCK HOLDER column)
- Cage slot priority, brand priority, body type priority
- East Side Fence Line fill order, West Side of Building fill order
- Overflow (Temporary) usage rules

**Section 5 — Signage Standards**
- All four vehicle signage types: sold sign, trade-in banner, customer vehicle sign, stock-in tag
- For each: when placed, who places, what content, where placed on vehicle
- Kia incident: include as the canonical example of what happens without proper signage (6 weeks, unknown status)
- Stock-in tag: white only (not yellow), bottom-right windshield, Jorja and Giselle create, lot team places

**Section 6 — Key Cafe Protocol** ← Do not shorten this section
- All transactions through Key Cafe only — no exceptions
- No peer-to-peer transfers — ever — for any reason
- Accountability agreement: required before any key/plate access; without it = no access
- Every transaction logged: employee name + timestamp
- GPS key tag: attached to all key sets, $25 to reprogram if lost
- Penalties: dealer plate $500 (enforced, confirmed precedent), key tag $25, keys ~50% replacement
- Enforcement logic: "You signed it out" = you are responsible until you check it back in through Key Cafe

**Section 7 — PDI Compliance**
- Stellantis 2-day window: final PDI must be completed within 2 calendar days of vehicle delivery
- Current compliance: 80% — entering the red zone where fines and docking begin
- Who performs PDI: service technician
- Who marks complete: same technician, in manufacturer system
- Ship mode: must clear ship mode (battery reconnect + software reset) before PDI; PDI before anything else
- Consequences of non-compliance: fines, potential docking (exact amounts [NEEDS_INPUT] from source material)
- Dealer trade PDI: same 2-day window applies even if the originating dealer already inspected the vehicle
- Pushback language for salesperson override attempts: "Stellantis requires final PDI within 2 days. We're at 80% compliance, in the red zone. It needs to go through."

**Section 8 — Daily Operations Overview**
- Morning lot walk: timing, duration, zone order, per-vehicle checks, task list generation, team chat documentation
- Ongoing policing: watch for staff parking, unauthorized vehicle movements, new arrivals not processed
- Task routing: PDI issues → Service Department Lead; sold signs → Sales team; vehicle movements → Lot team
- Staff vehicle inventory: maintain list of all staff vehicles (name, make, model, plate) to distinguish from inventory

**Section 9 — Escalation Protocol**
- 3-Strike system with exact language from `knowledge/communication-and-escalation-protocols.md`
- Escalation targets by role: lot attendant → lot manager → sales manager → general manager
- Document all escalations in team chat

**Section 10 — Financial Penalties**
- Table format: Item | Penalty Amount | Who Pays | Enforcement Status | Notes
- All penalties from `knowledge/financial-penalties.md`

**Section 11 — Cross-Reference Index**
- Full list of all 25 decision trees, formatted as:
  - Tree number | Filename | Scenario description
- Every tree listed — this is the navigation index for the entire decision tree library

---

### File 2: `sops/team-lot.md` — Lot Team SOP

Audience: Lot attendants / lot team staff. This document is complete and self-contained for this role. Lot team members should not need to read any other team SOP to do their job.

Include ONLY what the lot team does. Do not include sales, service, or management responsibilities.

Sections (in order):
1. **Your Role** — what the lot team is responsible for; what the lot team does NOT do (no PDI, no sales decisions, no customer pricing)
2. **Morning Lot Walk** — how to execute; reference: → SEE: morning-lot-walk.md; what to do with findings (generate task list, post in team chat)
3. **Vehicle Arrival Processing** — when a vehicle arrives: check for ship mode first (→ SEE: vehicle-arrival-ship-mode.md if yes; → SEE: vehicle-arrival-new-standard.md if no); dealer trade (→ SEE: vehicle-arrival-dealer-trade.md)
4. **Stock-In Tags** — who gives you the tags (Jorja or Giselle); when to place (after PDI and detail); where to place (bottom-right corner of windshield); what color (white — never yellow); every vehicle on lot must have one
5. **Vehicle Movement and Placement** — Cage rules (→ SEE: vehicle-placement-cage.md); zone placement by status; facing direction (outward); door spacing; do not move any vehicle without confirming status with salesperson first
6. **Signage Duties** — placing sold signs (when requested by sales team; supplies upstairs with Sharpies; write customer name); trade-in banners (on receipt of trade-in); customer vehicle signs (when a customer car is on lot)
7. **Key Cafe Responsibilities** — all sign-outs and sign-ins through Key Cafe; never accept a key/plate from a coworker; never hand off a key/plate to a coworker; accountability agreement must be on file (→ SEE: key-plate-sign-out.md; → SEE: key-plate-sign-in.md)
8. **Detailing Coordination** — route vehicles to DHD when PDI is complete; $60 per vehicle; inspect vehicle when it returns; how to return substandard work; after DHD completes: place stock-in tag → route to Cage (→ SEE: vehicle-detailing-routing.md)
9. **Reporting Issues** — all findings documented in team chat; escalation for sold signs missing (→ SEE: sold-sign-missing-enforcement.md); escalation for unknown vehicles (→ SEE: vehicle-status-unknown.md)

---

### File 3: `sops/team-sales.md` — Sales Team SOP

Audience: Sales staff and Sales Manager (Kevin). This document covers only what the sales team is responsible for regarding lot operations. Sales staff should not need to read any other team SOP to meet their lot-facing obligations.

Sections (in order):
1. **Your Lot Responsibilities** — what the sales team owes to lot operations; what happens when these are not met
2. **Sold Sign Responsibility** — placed IMMEDIATELY when a vehicle is sold; do not wait, do not ask the lot team to do it first; supplies: upstairs with Sharpies; write the customer's name on the sign; place in the vehicle window
3. **Vehicle Status Communication** — when a deal is signed: communicate to lot team via team chat — vehicle VIN/stock number, customer name, expected delivery date, whether a trade-in is involved
4. **BND Vehicle Communication** — when a deal is signed but delivery is not immediate: communicate expected delivery date to lot team via team chat (→ SEE: vehicle-bnd-handling.md)
5. **PDI Cooperation** — never tell the lot team or service to skip PDI; never represent a vehicle as "good to go" to bypass the inspection; if a customer is pushing for immediate delivery: "We need to complete the PDI — it's a Stellantis requirement. We're at 80% compliance, in the red zone. I'll get it prioritized." Do not deliver the vehicle until PDI is confirmed complete in manufacturer system.
6. **Staff Parking** — all sales staff park on the street — no exceptions; this includes the Sales Manager; if the lot is blocked: park on the nearest available street and walk
7. **Trade-In Handoff** — when receiving a trade-in: notify lot team via team chat immediately with vehicle description and initial condition assessment; lot team places trade-in banner; do not park trade-in in Cage
8. **Accountability Agreement** — every sales staff member must sign before any key/plate access; without it: no keys, no plates, no test drives using dealership vehicles

---

### File 4: `sops/team-service.md` — Service Department SOP

Audience: Service Department Lead, Shop Foreman, Technicians (all confirmed names are [AMBIGUOUS] except Giselle who has a dual role). This document covers only the service department's lot-facing responsibilities.

Sections (in order):
1. **Your Role in Lot Operations** — the service department performs PDIs and executes recon work; this work justifies the $3,000/day combined labor overhead; underutilization is a direct financial loss
2. **PDI Execution**
   - Who performs: service technician
   - What PDI involves: full pre-delivery inspection per Stellantis requirements
   - What "PDI complete" means: the technician has marked it complete in the manufacturer system — verbal confirmation to the lot manager is NOT sufficient; it must be in the system
   - 2-day window: PDI must be marked complete within 2 calendar days of vehicle delivery to the dealership; current compliance rate = 80% (red zone)
   - Monitoring: if a PDI has not been completed by end of Day 1, escalate within the service department to ensure it is completed on Day 2
3. **Ship Mode Vehicles** — if a vehicle arrives in ship mode: battery reconnect and software reset must be completed before PDI begins; PDI must still be completed within the original 2-day window from delivery date
4. **Dealer Trade PDI** — same 2-day window applies even if the originating dealer conducted their own inspection; the Edmonton Office must complete its own final PDI
5. **PDI Failure Routing** — if PDI reveals mechanical issues: do not return vehicle to Cage; update Airtable status to IN RECON; move vehicle to West Side of Building; assign a recon work order; notify lot team (→ SEE: vehicle-recon-routing.md)
6. **Internal Vehicle Work Prioritization** — all PDIs, inspections, and internal vehicle work come through this department; prioritize to maximize utilization and justify overhead; do not turn away internal work
7. **Communication with Lot Team** — when PDI is marked complete in manufacturer system: notify Lot Manager via team chat immediately. SAY: "PDI complete for [VIN]. Ready for detail and tagging."
8. **Detailing Coordination** — service coordinates with DHD for detailing; route vehicle to DHD after PDI is confirmed complete; notify lot team when vehicle returns from DHD
9. **Giselle's Dual Role** — Giselle (Admin/Tech) creates stock-in tags (with Jorja) AND performs technician work; her administrative duties do not exempt her from PDI assignment if needed

---

### File 5: `sops/team-management.md` — Management SOP

Audience: General Manager, Lot Manager, Sales Manager (Kevin). This document covers management's operational duties and enforcement responsibilities.

Sections (in order):
1. **Enforcement Philosophy** — standards only hold through daily, consistent enforcement; one announcement does not create a standard; "inspect what you expect" is the operating principle; management must be present and visible in enforcement
2. **Daily Oversight Responsibilities**
   - Lot Manager: mandatory morning lot walk (→ SEE: morning-lot-walk.md); generate and distribute task list; ongoing lot policing throughout the day
   - Sales Manager (Kevin): ensure sold signs are placed immediately; ensure sales team communicates delivery dates; address staff parking violations from sales staff
   - General Manager: final escalation point; reviews compliance issues; enforces financial penalties
3. **Staff Vehicle Inventory**
   - Compile and maintain a list of all staff personal vehicles: employee name, make, model, plate number
   - This list is the tool that lets the lot team identify which vehicles on the lot belong to staff vs. customers vs. inventory
   - Update whenever a staff member changes their vehicle; review at least monthly
4. **Financial Accountability**
   - All financial penalties in `knowledge/financial-penalties.md` are enforced — they are not warnings
   - Dealer plate: $500 per lost plate — confirmed precedent, one employee has paid this penalty
   - Key tag: $25 per lost tag — enforced
   - Keys: ~50% of replacement cost — enforced
   - When a penalty is triggered: identify responsible employee via Key Cafe log; initiate formal notification; process financial deduction per HR/payroll process [NEEDS_INPUT: confirm exact HR deduction process]
5. **PDI Compliance Ownership**
   - Management owns recovery from 80% to 100% compliance
   - If a PDI passes Day 1 without completion: Lot Manager escalates to Service Department Lead immediately
   - If a PDI passes Day 2 without completion: Lot Manager escalates to General Manager immediately
   - General Manager escalates to service department and documents the incident
6. **3-Strike Escalation Management**
   - Management is both the enforcer (uses 3-strike language to push compliance) and the recipient of escalation (when a Lot Attendant has used all 3 strikes)
   - At Strike 3 escalation from lot team: Sales Manager or General Manager intervenes directly
   - Do not wait for a fourth strike — act at the point of escalation
7. **Non-Prime Vehicle Response**
   - If a non-prime vehicle is identified on the lot: General Manager is notified immediately
   - Vehicle is moved to AB | STURGEON DODGE immediately; do not leave it on the Edmonton Office lot
   - (→ SEE: vehicle-non-prime-identification.md)
8. **New Employee Onboarding Protocol**
   - Accountability agreement signed on Day 1 — before any key or plate access
   - Key Cafe training on Day 1
   - Parking rules explained on Day 1 with welcoming tone (→ SEE: staff-parking-new-employee.md)
   - (→ SEE: accountability-agreement-onboarding.md)
9. **Key Cafe Oversight**
   - Confirm all employees have signed accountability agreements (maintain the signed file)
   - Review Key Cafe logs when any item is lost or reported missing
   - Audit Key Cafe log periodically to ensure no peer-to-peer transfers are occurring

---

## QUALITY GATES — VERIFY BEFORE WRITING THE REPORT

Before writing `sops/_PHASE_4_REPORT.md`, confirm every item below.

- [ ] All 5 SOP files exist in `sops/`
- [ ] Master SOP Section 11 contains a complete cross-reference index listing all 25 decision trees
- [ ] Each team SOP is self-contained for its audience (a person in that role should not need another team's SOP)
- [ ] No SOP inlines decision tree content (all branching scenarios reference `→ SEE: filename.md`)
- [ ] PDI 2-day window and 80% compliance figure appear in both `master-sop.md` and `team-service.md`
- [ ] Penalty table in `master-sop.md` matches `knowledge/financial-penalties.md`
- [ ] Sold sign 3-strike language in `master-sop.md` and `team-sales.md` matches `knowledge/communication-and-escalation-protocols.md` exactly
- [ ] Canonical zone names used throughout all 5 files
- [ ] Personnel referenced by role title (Jorja, Giselle, Kevin only as confirmed names)
- [ ] No invented information — all facts trace to `knowledge/` files
- [ ] Ship mode rules appear in all relevant SOPs (master, lot team, service)
- [ ] Non-prime identification (STOCK HOLDER column) referenced in master SOP
- [ ] No technical automation content (no n8n, no Airtable formulas)
- [ ] All gaps tagged `[NEEDS_INPUT]`, all inferences tagged `[ASSUMPTION]`

---

## COMPLETION REPORT

After all quality gates pass, write `sops/_PHASE_4_REPORT.md` using the Phase Completion Report template from CLAUDE.md Section 8. Include:
- List of all 5 SOP files with their status
- Quality gate checklist
- All `[NEEDS_INPUT]` items
- All `[AMBIGUOUS]` items
- Notes for Phase 5 (anything the next session should know)

---

## STATE UPDATE — WRITE THIS AFTER THE REPORT IS COMPLETE

After writing `sops/_PHASE_4_REPORT.md`, update `prompts/state.json`:

```
phases.phase_4.status = "complete"
phases.phase_4.completed_at = [today's date, YYYY-MM-DD]
phases.phase_4.files_confirmed_created = [list all 6 files including report]
phases.phase_4.quality_gates_passed = true
phases.phase_4.needs_input_items = [list any [NEEDS_INPUT] items]
phases.phase_4.ambiguous_items = [list any [AMBIGUOUS] items]
last_updated = [today's date, YYYY-MM-DD]
```

If quality gates did NOT all pass:
```
phases.phase_4.status = "complete_with_issues"
phases.phase_4.quality_gates_passed = false
phases.phase_4.notes = [description of which gates failed]
```

---

## STOP

After updating state.json, **stop completely**. Do not begin Phase 5. Do not read any checklist files.

Output a final message to the user:
- Phase 4 is complete
- All 5 SOPs are created (list their filenames)
- How many `[NEEDS_INPUT]` items were found
- That `prompts/state.json` has been updated
- That Phase 5 can now be started using `prompts/05-phase5-checklists.md` in a new Claude Code session
