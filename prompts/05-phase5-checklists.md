# SESSION PROMPT — Phase 5: Checklists
# Sturgeon Dodge Edmonton Office Lot Operations SOP Project

---

## MANDATORY FIRST STEPS — DO THESE BEFORE ANYTHING ELSE

Read the following files in this exact order. Do not skip any file. Do not begin the STATE CHECK until all reads are complete.

1. Read `CLAUDE.md` — all rules, conventions, quality gates, domain glossary.
2. Read `EXECUTION_PLAN.md` — read the Phase 5 meta-prompt in Section 4 in full.
3. Read `prompts/state.json` — the shared state file.
4. Read these SOP files (all 5):
   - `sops/master-sop.md`
   - `sops/team-lot.md`
   - `sops/team-sales.md`
   - `sops/team-service.md`
   - `sops/team-management.md`
5. Read these knowledge files:
   - `knowledge/vehicle-statuses-and-transitions.md`
   - `knowledge/signage-and-tagging-standards.md`
   - `knowledge/compliance-requirements.md`
   - `knowledge/key-cafe-protocol.md`
   - `knowledge/zone-definitions.md`
6. Read the Phase 4 report: `sops/_PHASE_4_REPORT.md`

All reads must complete before you proceed.

---

## STATE CHECK — ABORT IF PREREQUISITES ARE NOT MET

After reading `prompts/state.json`, check:

**Required:** `phases.phase_4.status` must be `"complete"` OR `"complete_with_issues"`

If `phases.phase_4.status` is NOT one of those values:
- **STOP immediately.**
- Do not create any files.
- Output: "ABORT: Phase 4 is not marked complete in prompts/state.json. Phase 4 (SOP Generation) must be completed using prompts/04-phase4-sop-generation.md before Phase 5 can begin."
- Take no further action.

If the prerequisite is met, continue.

**Before writing any files, update `prompts/state.json`:**
- Set `phases.phase_5.status` to `"in_progress"`
- Set `phases.phase_5.started_at` to today's date (YYYY-MM-DD)
- Set `last_updated` to today's date

---

## YOUR TASK — PHASE 5: CHECKLISTS

Execute the Phase 5 meta-prompt exactly as written in Section 4 of `EXECUTION_PLAN.md`. The requirements below are authoritative.

### What You Must Produce

Create the following 9 files. The `checklists/` directory must be created if it does not exist.

**File 1:** `checklists/vehicle-audit-new.md`
**File 2:** `checklists/vehicle-audit-flr.md`
**File 3:** `checklists/vehicle-audit-sold.md`
**File 4:** `checklists/vehicle-audit-bnd.md`
**File 5:** `checklists/vehicle-audit-recon.md`
**File 6:** `checklists/morning-lot-walk-checklist.md`
**File 7:** `checklists/pdi-completion-checklist.md`
**File 8:** `checklists/key-plate-accountability-checklist.md`
**File 9:** `checklists/_PHASE_5_REPORT.md` (completion report — written last)

### Source Constraint

All checklist criteria must be derived from the `sops/` files and relevant `knowledge/` files only. Do not re-read original source documents.

---

## CHECKLIST WRITING RULES — APPLY TO ALL 8 FILES

**Binary only.** Every checklist item is answered Yes or No. There are no partial answers, no subjective assessments, no "mostly," no "acceptable."

**No subjective language.** Do not write "Is the car clean enough?" Write "Is the vehicle free of visible dirt, dust, and debris on all exterior panels?" The test must be pass/fail without requiring judgment.

**Every No has a Failure Action.** For every item that can fail (answer = No), specify the exact step to take. Failure Actions must be specific and actionable — not "fix it" or "handle appropriately."

**Failure Actions specify who.** Every Failure Action must name the ROLE responsible for executing it.

**Format for each checklist item:**
```
[ ] [Item description, phrased as a Yes/No question]
    YES: Continue
    NO — Failure Action: [ROLE: who] [exact step to take]
```

---

## FILE SPECIFICATIONS

### File 1: `checklists/vehicle-audit-new.md`

**For:** Vehicles with category NEW (KM ≤ 1,000) that have not yet reached front-line status.
**Used by:** Lot Attendant or Lot Manager during morning walk or arrival processing.

Checklist items:
1. Is ship mode cleared? (battery reconnected, software reset performed)
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → reconnect battery, perform software reset, schedule PDI immediately via team chat to Service Department Lead; do not move vehicle to Cage or deliver to customer

2. Is the PDI scheduled or already complete? (check manufacturer system — verbal confirmation is not sufficient)
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → contact Service Department Lead via team chat. SAY: "PDI needed for [VIN]. Stellantis 2-day window is running."

3. Is the system status in Airtable set to "Pending PDI" (not "Recon" or any other status)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → correct Airtable status to "Pending PDI" immediately; document correction in team chat

4. Is the stock-in tag filled out and placed in the bottom-right corner of the windshield?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → obtain tag from Jorja or Giselle; place in bottom-right corner of windshield

5. Are all manufacturer and transport stickers removed from the vehicle?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → remove all stickers

6. Is all tape removed from the vehicle?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → remove all tape

7. Is the vehicle free of visible dirt, dust, and debris on all exterior panels?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → route vehicle to DHD for full detail ($60); notify DHD via [NEEDS_INPUT: DHD contact method]; document routing in team chat

---

### File 2: `checklists/vehicle-audit-flr.md`

**For:** Vehicles with category FLR (AVAILABLE or DEMO) currently in or being placed in the Cage.
**Used by:** Lot Attendant or Lot Manager during morning walk or placement check.

Checklist items:
1. Is PDI marked complete in the manufacturer system? (verbal confirmation not sufficient — check system)
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → remove vehicle from Cage immediately; route to Service Department Lead; SAY: "This vehicle needs PDI before it can be on the front line."

2. Is the vehicle free of visible dirt, dust, and debris on all exterior panels?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → route to DHD for full detail ($60)

3. Are all stickers removed?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → remove all stickers

4. Is all tape removed?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → remove all tape

5. Is the stock-in tag present in the bottom-right corner of the windshield?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → obtain tag from Jorja or Giselle; place in bottom-right corner of windshield

6. Is the vehicle facing outward (toward the street/customer-facing direction)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → reposition vehicle to face outward

7. Is there adequate spacing on both sides of the vehicle so that both doors can fully open?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → reposition vehicle

8. Is the vehicle parked in the correct Cage slot per placement priority rules (C01–C20)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → move to correct slot per → SEE: vehicle-placement-cage.md; document change in team chat

---

### File 3: `checklists/vehicle-audit-sold.md`

**For:** Vehicles with category SOLD (Airtable status = SIGNED DEAL or WHOLESALE|SOLD).
**Used by:** Lot Attendant or Lot Manager during morning walk.

Checklist items:
1. Is a sold sign present in the vehicle with the customer's name written on it?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → follow → SEE: sold-sign-missing-enforcement.md (3-strike protocol); if salesperson cannot be reached: obtain customer name from Sales Manager (Kevin), get sold sign from upstairs (Sharpies available), write customer name, place in vehicle

2. Is the vehicle parked in the East Side Fence Line or West Side of Building (NOT in the Cage or front line)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → move vehicle to East Side Fence Line (slots F1–F5); if East Side Fence Line full: West Side of Building; if both full: Overflow (Temporary) with destination annotation

3. Is PDI confirmed complete in the manufacturer system before vehicle is delivered to the customer?
   - YES: Continue (or not yet scheduled for delivery — no action)
   - NO and delivery is imminent — Failure Action: ROLE: Lot Manager → do NOT allow delivery; contact Service Department Lead immediately. SAY: "PDI for [VIN] must be completed before delivery. Stellantis requires it within 2 days of delivery." Route to → SEE: vehicle-pdi-compliance-deadline.md

---

### File 4: `checklists/vehicle-audit-bnd.md`

**For:** Vehicles with category BND (Airtable status = BOOKED|NOT DELIVERED).
**Used by:** Lot Attendant or Lot Manager during morning walk.

Checklist items:
1. Is a sold sign present in the vehicle with the customer's name written on it?
   - YES: Continue
   - NO — Failure Action: Same as SOLD audit item 1 above; follow → SEE: sold-sign-missing-enforcement.md

2. Is the vehicle parked in the East Side Fence Line or West Side of Building (NOT in the Cage)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → move to East Side Fence Line; if full → West Side of Building

3. Is the expected delivery date communicated to the lot team (documented in team chat)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → contact Sales Manager (Kevin) via team chat. SAY: "What is the expected delivery date for [VIN/customer name]? We need this documented."

4. Is PDI confirmed complete in the manufacturer system?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → route to Service Department Lead; do not deliver until PDI is marked complete in manufacturer system

---

### File 5: `checklists/vehicle-audit-recon.md`

**For:** Vehicles with category RECON (Airtable status = IN RECON, INCOMING, WHOLESALE, or CHASE).
**Used by:** Lot Attendant or Lot Manager during morning walk.

Checklist items:
1. Is the Airtable system status correct for a RECON vehicle (IN RECON — not "Pending PDI" unless it is a new arrival whose PDI revealed mechanical issues)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → correct Airtable status; if uncertain what status to apply → SEE: vehicle-categorization.md

2. Is the vehicle parked in the West Side of Building (slots L1–L5)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → move vehicle to West Side of Building

3. Is a stock-in tag present on the vehicle windshield?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → obtain from Jorja or Giselle; place on windshield

4. Is there an active work order or recon task assigned to this vehicle in the service department?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → contact Service Department Lead immediately via team chat. SAY: "No work order assigned for RECON vehicle [VIN]. Please assign."

5. If RECON is complete: is PDI also confirmed complete in the manufacturer system?
   - YES (or RECON not yet complete — skip): Continue
   - NO and RECON is complete — Failure Action: ROLE: Lot Manager → route to service for PDI immediately; vehicle stays in West Side of Building until PDI is marked complete; do not move to Cage

6. If both RECON and PDI are complete: is full detail (DHD) also complete before moving to Cage?
   - YES (or not yet at this stage — skip): Continue
   - NO and both RECON and PDI are complete — Failure Action: ROLE: Lot Attendant → route to DHD for full detail ($60) before placing in Cage

---

### File 6: `checklists/morning-lot-walk-checklist.md`

**For:** Daily mandatory morning lot walk.
**Used by:** Lot Manager (or General Manager if Lot Manager is absent).
**Timing:** ~30 minutes after arriving at lot, after handling immediate fires.
**Duration:** ~30 minutes.

**Lot-Level Checks (before starting zone walk):**

1. Are there any staff vehicles currently parked on the lot (not on the street)?
   - YES — Failure Action: ROLE: Lot Manager → identify driver; if first-time offense: follow → SEE: staff-parking-new-employee.md; if repeat offense: follow → SEE: staff-parking-repeat-violation.md
   - NO: Continue

2. Is the staff vehicle list up to date (name, make, model, plate for all current staff on file)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → update list immediately; document in management records

**Zone Walk — Cage (C01–C20):**

3. Is every vehicle in the Cage an FLR or NEW category vehicle (no SOLD, BND, or RECON vehicles in the Cage)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → move incorrectly placed vehicle to correct zone per its status; reference → SEE: vehicle-categorization.md

4. Does every Cage vehicle have the correct signage (stock-in tag in bottom-right windshield)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → obtain tag from Jorja or Giselle; place in bottom-right windshield

5. Is every Cage vehicle PDI'd and fully detailed?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → remove vehicle from Cage immediately; route to service (PDI) or DHD (detail) as appropriate; do not return to Cage until both are confirmed complete

6. Are all Cage vehicles facing outward with adequate door-opening spacing?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → reposition vehicle(s)

7. Is there a maximum of one empty Cage stall (if a vehicle was just sold)?
   - YES: Continue (or no empty stalls — also fine)
   - NO (more than one empty stall) — Failure Action: ROLE: Lot Manager → identify next vehicle to fill gap; run placement per → SEE: vehicle-placement-cage.md

**Zone Walk — East Side Fence Line (F1–F5):**

8. Does every vehicle in the East Side Fence Line have the correct signage for its status (sold sign, BND sign, or FLR sedan tag)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → route sign placement task to appropriate team via team chat

9. Is every vehicle in this zone correctly categorized for this zone (SOLD, BND, or FLR sedan overflow only)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Attendant → move vehicle to correct zone per → SEE: vehicle-categorization.md

**Zone Walk — West Side of Building (L1–L5):**

10. Is every vehicle in the West Side of Building correctly categorized (BND overflow, RECON, or SOLD overflow only)?
    - YES: Continue
    - NO — Failure Action: ROLE: Lot Attendant → move vehicle to correct zone

11. Does every RECON vehicle have an active work order assigned?
    - YES: Continue
    - NO — Failure Action: ROLE: Lot Manager → contact Service Department Lead immediately

**Zone Walk — Overflow (Temporary):**

12. Does every vehicle in Overflow have a destination zone annotation?
    - YES: Continue
    - NO — Failure Action: ROLE: Lot Manager → determine correct destination; annotate in Airtable and team chat

**Zone Walk — Auction Area:**

13. Are all vehicles in the Auction Area correctly designated as auction-bound in Airtable?
    - YES: Continue
    - NO — Failure Action: ROLE: Lot Manager → investigate vehicle status; if not auction-bound, route to correct zone → SEE: vehicle-status-unknown.md

**Zone Walk — Power Sport / Quad Corner:**

14. Does the Power Sport / Quad Corner contain only power sport vehicles, boats, or seasonal Hysen units (no retail vehicles)?
    - YES: Continue
    - NO — Failure Action: ROLE: Lot Attendant → move retail vehicle to correct zone per its status immediately

**End of Walk:**

15. Has a task list been generated from all identified issues and posted in team chat?
    - YES: Walk complete
    - NO — Failure Action: ROLE: Lot Manager → compile task list from all findings; post in team chat with tasks grouped by responsible team (Lot, Sales, Service)

---

### File 7: `checklists/pdi-completion-checklist.md`

**For:** Tracking PDI completion compliance for all vehicles on the lot.
**Used by:** Lot Manager — review daily.
**Format:** Per-vehicle tracking table plus action guide by status.

**Per-Vehicle Tracking Table:**
For each vehicle currently on the lot requiring PDI, record:
- VIN
- Vehicle description (year/make/model)
- Delivery date to Edmonton Office lot
- PDI deadline (delivery date + 2 calendar days)
- PDI status in manufacturer system (Pending / In Progress / Complete)
- Today's date vs. deadline

**Status Definitions and Required Actions:**

| Status | Condition | Required Action |
|---|---|---|
| ON TIME | Today ≤ PDI deadline AND PDI not yet complete | No action — monitor. Confirm PDI is scheduled with service. |
| COMPLETE | PDI marked complete in manufacturer system | Verify technician logged it in system (not just verbal). Close monitoring for this vehicle. Update team chat. |
| DAY 1 OVERDUE | PDI deadline has passed by 1 day, PDI not complete | ROLE: Lot Manager → contact Service Department Lead immediately. SAY: "PDI for [VIN] is now overdue by 1 day. Stellantis compliance window has passed. Please prioritize today." Document in team chat. |
| DAY 2+ OVERDUE (CRITICAL) | PDI deadline has passed by 2+ days, PDI not complete | ROLE: Lot Manager → escalate to General Manager immediately. SAY: "PDI for [VIN] is [X] days overdue. We are at risk of a Stellantis compliance fine and potential docking." Document in team chat. Escalate to service department simultaneously. |

**Checklist item for each vehicle:**
1. Has the PDI been marked complete in the manufacturer system by the assigned technician?
   - YES: Remove from active tracking; update team chat
   - NO — apply action from status table above based on days from delivery

---

### File 8: `checklists/key-plate-accountability-checklist.md`

**For:** Any sign-out or sign-in of a key or dealer plate; periodic audits.
**Used by:** Lot Manager, anyone handling Key Cafe transactions.

**Sign-Out Checks (before issuing any key or plate):**

1. Is the employee's signed accountability agreement on file?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → STOP. Do not issue the key or plate. SAY: "I can't issue keys or plates until you've signed the accountability agreement. See [Sales Manager/General Manager] to complete that before returning."

2. Is this sign-out being conducted through Key Cafe (not a peer-to-peer handoff)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → redirect employee to Key Cafe. If someone is trying to hand you a key/plate to pass along: SAY: "You need to check it out through Key Cafe yourself — I can't accept it from you."

3. Is the transaction being logged with the employee's name and timestamp?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → log the transaction before releasing the item; do not release the item until it is logged

4. Is the requested item currently available (not signed out to another employee)?
   - YES: Continue
   - NO — Failure Action: ROLE: requesting employee → do not request the item from the other employee peer-to-peer; either wait for it to be returned through Key Cafe, OR contact the employee who has it and ask them to return it through Key Cafe first

**Sign-In Checks (before accepting any returned key or plate):**

5. Is the item being returned directly to Key Cafe (not handed to a coworker to return)?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → redirect employee. SAY: "You need to return it through Key Cafe yourself — you're responsible for it until you check it in there."

6. Is the return transaction being logged with the employee's name and timestamp?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → log the return transaction before marking item as available; do not mark available until logged

**Periodic Audit Checks (run at start of each day or when any item cannot be located):**

7. Does the Key Cafe log account for all items that should currently be signed out?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → reconcile log; identify any unlogged transactions; document discrepancy in team chat; escalate to General Manager if any item cannot be accounted for

8. Are all GPS key tags physically attached to their key sets?
   - YES: Continue
   - NO — Failure Action: ROLE: Lot Manager → check GPS location of the tag before declaring it lost; if located: retrieve and reattach; if not located after GPS check: initiate → SEE: key-plate-lost-response.md; $25 reprogram cost applies

---

## QUALITY GATES — VERIFY BEFORE WRITING THE REPORT

Before writing `checklists/_PHASE_5_REPORT.md`, confirm every item below.

- [ ] All 8 checklist files exist in `checklists/`
- [ ] Every checklist item is phrased as a binary Yes/No question
- [ ] No checklist item contains subjective language (no "enough," "acceptable," "appropriate")
- [ ] Every item that can fail (answer = No) has a specific Failure Action
- [ ] Every Failure Action names the ROLE responsible for executing it
- [ ] FLR checklist (file 2) requires PDI to be confirmed complete before front-line placement
- [ ] RECON checklist (file 5) requires PDI AND detail to both be confirmed complete before moving to Cage
- [ ] Morning walk checklist (file 6) covers all 7 zones: Cage, East Side Fence Line, West Side of Building, Overflow (Temporary), Auction Area, Power Sport / Quad Corner, and the lot-level staff parking check
- [ ] PDI tracking checklist (file 7) includes Day 1 Overdue and Day 2+ Overdue (CRITICAL) escalation paths with exact language
- [ ] Key Cafe checklist (file 8) covers sign-out, sign-in, and periodic audit scenarios
- [ ] GPS key tag check (check GPS before declaring lost) in key plate accountability checklist
- [ ] Stock-in tag placement requirement (bottom-right windshield, white, from Jorja or Giselle) in vehicle audit checklists
- [ ] Canonical zone names used throughout all 8 files
- [ ] Personnel referenced by role (Jorja, Giselle, Kevin only as confirmed names)
- [ ] All checklist items trace to SOP content — no invented criteria
- [ ] All gaps marked `[NEEDS_INPUT]`

---

## COMPLETION REPORT

After all quality gates pass, write `checklists/_PHASE_5_REPORT.md` using the Phase Completion Report template from CLAUDE.md Section 8. Include:
- List of all 8 checklist files with their status
- Quality gate checklist
- All `[NEEDS_INPUT]` items
- All `[AMBIGUOUS]` items
- Notes for Phase 6 (anything the app spec session should know)

---

## STATE UPDATE — WRITE THIS AFTER THE REPORT IS COMPLETE

After writing `checklists/_PHASE_5_REPORT.md`, update `prompts/state.json`:

```
phases.phase_5.status = "complete"
phases.phase_5.completed_at = [today's date, YYYY-MM-DD]
phases.phase_5.files_confirmed_created = [list all 9 files including report]
phases.phase_5.quality_gates_passed = true
phases.phase_5.needs_input_items = [list any [NEEDS_INPUT] items]
phases.phase_5.ambiguous_items = [list any [AMBIGUOUS] items]
last_updated = [today's date, YYYY-MM-DD]
```

If quality gates did NOT all pass:
```
phases.phase_5.status = "complete_with_issues"
phases.phase_5.quality_gates_passed = false
phases.phase_5.notes = [description of which gates failed]
```

---

## STOP

After updating state.json, **stop completely**. Do not begin Phase 6. Do not read any app spec files.

Output a final message to the user:
- Phase 5 is complete
- All 8 checklists are created (list their filenames)
- How many `[NEEDS_INPUT]` items were found
- That `prompts/state.json` has been updated
- That Phase 6 can now be started using `prompts/06-phase6-app-specification.md` in a new Claude Code session
