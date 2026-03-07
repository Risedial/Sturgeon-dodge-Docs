# SESSION PROMPT — Phase 3A: Decision Trees 1–13 (Vehicle Lifecycle)
# Sturgeon Dodge Edmonton Office Lot Operations SOP Project

---

## MANDATORY FIRST STEPS — DO THESE BEFORE ANYTHING ELSE

Read the following files in this exact order. Do not skip any file. Do not begin the STATE CHECK until all reads are complete.

1. Read `CLAUDE.md` — pay particular attention to: the Decision Tree Format (Section 5), canonical zone names (Section 4, Rule 9), and the Cross-Reference Syntax.
2. Read `EXECUTION_PLAN.md` — read the Phase 3 meta-prompt in Section 4 in full. The file-by-file specifications for all 25 trees are there.
3. Read `prompts/state.json` — the shared state file.
4. Read these knowledge files (in order):
   - `knowledge/vehicle-statuses-and-transitions.md`
   - `knowledge/zone-definitions.md`
   - `knowledge/lot-placement-rules.md`
   - `knowledge/communication-and-escalation-protocols.md`
   - `knowledge/key-cafe-protocol.md`
   - `knowledge/compliance-requirements.md`
   - `knowledge/financial-penalties.md`
   - `knowledge/signage-and-tagging-standards.md`
5. Read these systems analysis files:
   - `systems-analysis/failure-modes.md`
   - `systems-analysis/cause-effect-map.md`

All reads must complete before you proceed.

---

## STATE CHECK — ABORT IF PREREQUISITES ARE NOT MET

After reading `prompts/state.json`, check:

**Required:**
- `phases.phase_1.status` must be `"complete"` OR `"complete_with_issues"`
- `phases.phase_2.status` must be `"complete"` OR `"complete_with_issues"`

If either prerequisite is NOT met:
- **STOP immediately.**
- Do not create any files.
- Output: "ABORT: Prerequisites not met. Check prompts/state.json — phases phase_1 and phase_2 must both be complete before Phase 3A can begin. Missing: [list which phases are not complete]."
- Take no further action.

If prerequisites are met, continue.

**Before writing any files, update `prompts/state.json`:**
- Set `phases.phase_3a.status` to `"in_progress"`
- Set `phases.phase_3a.started_at` to today's date (YYYY-MM-DD)
- Set `last_updated` to today's date

---

## YOUR TASK — PHASE 3A: DECISION TREES 1–13

Create `systems-analysis/decision-trees/` directory if it does not exist. Create the 13 decision tree files listed below plus a partial report.

This session covers trees 1–13 only. Trees 14–25 are covered in the next session (`03b-phase3b-decision-trees-14-25.md`). Do not create any Phase 3B files in this session.

### What You Must Produce

**File 1:** `systems-analysis/decision-trees/vehicle-arrival-new-standard.md`
**File 2:** `systems-analysis/decision-trees/vehicle-arrival-ship-mode.md`
**File 3:** `systems-analysis/decision-trees/vehicle-arrival-dealer-trade.md`
**File 4:** `systems-analysis/decision-trees/vehicle-pdi-routing.md`
**File 5:** `systems-analysis/decision-trees/vehicle-pdi-compliance-deadline.md`
**File 6:** `systems-analysis/decision-trees/vehicle-detailing-routing.md`
**File 7:** `systems-analysis/decision-trees/vehicle-categorization.md`
**File 8:** `systems-analysis/decision-trees/vehicle-placement-cage.md`
**File 9:** `systems-analysis/decision-trees/vehicle-sold-processing.md`
**File 10:** `systems-analysis/decision-trees/vehicle-trade-in-processing.md`
**File 11:** `systems-analysis/decision-trees/vehicle-customer-on-lot.md`
**File 12:** `systems-analysis/decision-trees/vehicle-bnd-handling.md`
**File 13:** `systems-analysis/decision-trees/vehicle-recon-routing.md`
**File 14:** `systems-analysis/decision-trees/_PHASE_3A_REPORT.md` (partial completion report — written last)

---

## DECISION TREE FORMAT — MANDATORY FOR EVERY FILE

Every decision tree file must use the exact format defined in CLAUDE.md Section 5 (Decision Tree Format). Reproduce it faithfully. Key requirements:

- **File header:** Title, File name, Status tag, Cross-references list
- **Trigger section:** What event activates this tree
- **Responsible Role section:** Who executes this tree
- **Decision Tree section:** Full branching structure with ASCII tree characters (│ ├── └── →)
- **Terminal Outcomes section:** Numbered list of every possible end state
- **Notes section:** Any `[NEEDS_INPUT]`, `[AMBIGUOUS]`, or `[ASSUMPTION]` items

**Every branch must terminate in a specific, actionable outcome. No branch may end in:**
- "Use judgment"
- "Assess the situation"
- "Discuss with manager"
- "Handle appropriately"
- Any equivalent phrase

**Every action in the tree must specify:**
- ACTION: what to do
- ROLE: who does it
- CHANNEL: how they communicate (where communication is required)
- SAY: exact language (where communication is required)

**Cross-reference syntax:** `→ SEE: filename.md` (never inline the referenced tree's content)

---

## DOMAIN FACTS — APPLY THROUGHOUT ALL 13 TREES

These are non-negotiable constants. Apply them to every tree without exception.

- **PDI window:** 2 calendar days from vehicle delivery to dealership — currently at 80% compliance (red zone, fines and docking begin near this level)
- **Non-prime check:** Airtable STOCK HOLDER column = "NON PRIME DIVISION" → route to AB | STURGEON DODGE immediately; "STURGEON DODGE" → allowed on this lot
- **Stock-in tags:** Bottom-right corner of windshield, white color, created by Jorja or Giselle, handed to lot team, placed by lot team
- **Sold sign:** Supplies upstairs with Sharpies, write customer name on sign, place immediately when vehicle is sold
- **Key Cafe:** All sign-outs and sign-ins through Key Cafe only — no peer-to-peer transfers ever
- **Penalties:** Dealer plate lost = $500 (enforced, confirmed precedent); GPS key tag = $25 to reprogram; keys = ~50% replacement cost
- **Ship mode:** Battery disconnected → must reconnect battery + perform software reset + complete PDI before ANY other step; vehicle may not be placed on front line or delivered to customer while in ship mode
- **DHD:** Only detailing vendor; $60 per vehicle for full detail
- **Staff parking:** Street only — zero exceptions, including managers and the General Manager
- **Canonical zones:** Cage (20 slots, C01–C20), East Side Fence Line (5 slots, F1–F5), West Side of Building (5 slots, L1–L5), Overflow (Temporary)

---

## FILE-BY-FILE SPECIFICATIONS

Read the full specification for each tree from the Phase 3 meta-prompt in EXECUTION_PLAN.md Section 4. What follows are the critical decision points and non-negotiable rules for each tree. These supplement (do not replace) the full EXECUTION_PLAN.md specifications.

### Tree 1: `vehicle-arrival-new-standard.md`
Scenario: A new vehicle (NOT in ship mode) arrives at the Edmonton Office lot.
Critical rules:
- First branch: IS THIS VEHICLE IN SHIP MODE? → YES → STOP, redirect to `vehicle-arrival-ship-mode.md`. This tree handles NO only.
- Correct system status to enter: "Pending PDI" — NEVER "Recon" for new arrivals
- Non-prime check is mandatory (check Airtable STOCK HOLDER before any other processing)
- PDI 2-day clock starts at the vehicle's delivery date to the dealership — not when paperwork is done
- Post-PDI routing: → DHD for detail → stock-in tag placement → Cage placement
- Terminal outcomes must include: vehicle in Cage (Pending PDI → PDI complete → detailed → tagged → Cage), vehicle held for non-prime routing, vehicle in Overflow if Cage full

### Tree 2: `vehicle-arrival-ship-mode.md`
Scenario: A new vehicle arrives with battery disconnected (ship mode).
Critical rules:
- MANDATORY STEP ORDER: reconnect battery → perform software reset → confirm ship mode cleared → THEN route to PDI
- PDI 2-day clock starts at delivery date — NOT at the time ship mode is cleared
- The ship mode delivery incident must appear in the Notes: vehicle was delivered to a customer in ship mode, battery died the next day, required tow back and complete rework — this is why ship mode cannot be skipped
- No vehicle in ship mode may be placed on front line or delivered to customer
- Include explicit branch: "Salesperson says 'it's fine, just deliver it'" → ROLE: Lot Manager → SAY: "Stellantis requires PDI within 2 days of delivery. This vehicle is in ship mode. It cannot be delivered or placed on front line until ship mode is cleared and PDI is complete."

### Tree 3: `vehicle-arrival-dealer-trade.md`
Scenario: A vehicle arrives as a dealer trade from another dealership.
Critical rules:
- Even if the originating dealer claims it was already inspected, the Edmonton Office must still perform its own final PDI
- Include explicit branch: "Salesperson says 'it's good to go, the other dealer already did the inspection'" → ROLE: Lot Manager → SAY: "Stellantis requires a final PDI at the receiving dealership within 2 days of delivery. We're at 80% compliance, in the red zone. It needs to go through service."
- PDI 2-day window: same as new vehicles — 2 calendar days from delivery date
- Route after PDI: → DHD detail → stock-in tag → Cage (if FLR) or East Side Fence Line (if sold)

### Tree 4: `vehicle-pdi-routing.md`
Scenario: A vehicle is ready to be routed for PDI.
Critical rules:
- Who performs PDI: service technician
- Who marks PDI complete: same technician, in the manufacturer system
- What "PDI complete" means operationally: technician has entered completion in manufacturer system — not just verbal confirmation
- If technician unavailable: escalate to Service Department Lead immediately; note 2-day clock is running
- If PDI reveals mechanical issues: vehicle status → IN RECON, move vehicle to West Side of Building; do not return to Cage until recon complete, re-PDI'd, and detailed
- Post-PDI-complete: notify lot team → lot team places stock-in tag → lot team routes to DHD → lot team places in Cage

### Tree 5: `vehicle-pdi-compliance-deadline.md`
Scenario: Monitoring whether the 2-day Stellantis PDI window will be met.
Critical rules:
- Clock starts: delivery date to the dealership (not when processing begins, not when ship mode is cleared)
- Who monitors: Lot Manager checks daily
- Day 1 (PDI not yet complete): notify Service Department Lead. Exact language: "PDI for [VIN] is now 1 day from its Stellantis deadline. Please prioritize."
- Day 2 (PDI still not complete — CRITICAL): escalate to General Manager immediately. SAY: "PDI for [VIN] has hit its 2-day Stellantis deadline without completion. We are at risk of a compliance fine and potential docking."
- PDI complete: confirm technician has marked it in manufacturer system (verbal confirmation is not sufficient); update Airtable; close monitoring for this vehicle
- Current context: 80% compliance — fines and docking begin near this threshold

### Tree 6: `vehicle-detailing-routing.md`
Scenario: A vehicle needs detailing.
Critical rules:
- Trigger: PDI marked complete in manufacturer system
- Vendor: DHD only, $60 per vehicle for full detail
- What lot team communicates to DHD: vehicle location, VIN, expected turnaround
- When vehicle returns from DHD: inspect immediately — is vehicle free of visible dirt/debris on all exterior panels? Are all stickers removed? Is all tape removed?
- If returned vehicle fails inspection: do not accept; return to DHD. ROLE: Lot Manager or Lot Attendant. SAY: "This vehicle is not ready — [specific issue]. Please redo it."
- After DHD confirms completion and vehicle passes inspection: lot team places stock-in tag (bottom-right windshield, white) → route to Cage placement

### Tree 7: `vehicle-categorization.md`
Scenario: Determining which placement category a vehicle belongs to.
Critical rules:
- Categories and their Airtable status triggers:
  - NEW: KM ≤ 1,000 (regardless of any other status)
  - FLR: Airtable status = AVAILABLE or DEMO
  - SOLD: Airtable status = SIGNED DEAL or WHOLESALE|SOLD
  - BND: Airtable status = BOOKED|NOT DELIVERED
  - RECON: Airtable status = IN RECON, INCOMING, WHOLESALE, or CHASE
- Override logic (apply in this order):
  - A vehicle with KM ≤ 1,000 AND status BOOKED|NOT DELIVERED → category = BND (BND overrides NEW)
  - A vehicle with KM ≤ 1,000 AND status SIGNED DEAL → category = SOLD (SOLD overrides NEW)
  - A vehicle with KM ≤ 1,000 AND status IN RECON → category = RECON (RECON overrides NEW)
  - A vehicle with KM ≤ 1,000 AND no overriding status → category = NEW
- Non-prime check: always check STOCK HOLDER field before assigning category. If STOCK HOLDER = "NON PRIME DIVISION" → route to `vehicle-non-prime-identification.md` before any placement

### Tree 8: `vehicle-placement-cage.md`
Scenario: Placing a vehicle in the Cage (front-line display area, 20 slots C01–C20).
Critical rules:
- Slot assignment rules (in priority order):
  - C01: Compass or Wrangler, NEW category only
  - C02–C03: NEW SUV (not Durango); fallback = VAN or TRUCK if no NEW SUV available
  - C04–C07: remaining NEW vehicles
  - C12–C13: trucks preferred (NEW or FLR)
  - C08–C11, C14–C20: remaining NEW + FLR mixed
- Brand sort order within priority groups: Jeep (1st), Ram (2nd), Chrysler (3rd), Dodge (4th), all others (5th)
- Body type sort within brand tier: SUV (1st), Van (2nd), Truck (3rd), Sedan (4th); sedans overflow first
- If Cage is full: place vehicle in Overflow (Temporary); annotate with destination = Cage; vehicle physically stages at East Side Fence Line until a Cage slot opens
- Facing direction: all Cage vehicles must face outward
- Door spacing: all Cage vehicles must have sufficient spacing that both doors can fully open
- Stock-in tag: must be present (bottom-right windshield) before vehicle is placed in Cage
- Maximum empty stalls: one — if Cage has more than one empty stall after a vehicle is sold or moved, fill gap immediately

### Tree 9: `vehicle-sold-processing.md`
Scenario: A vehicle has just been sold (deal signed).
Critical rules:
- Immediate action 1: sold sign placed immediately — supplies upstairs with Sharpies, customer name written on sign
- Immediate action 2: vehicle moved out of Cage to East Side Fence Line
- If East Side Fence Line full (all 5 slots F1–F5 occupied): move to West Side of Building SOLD overflow
- If West Side of Building also full: move to Overflow (Temporary) with destination annotation
- If trade-in involved: → SEE: vehicle-trade-in-processing.md
- Communicate delivery timeline to lot team: ROLE: Salesperson → CHANNEL: team chat → SAY: "Deal signed for [VIN/stock number]. Customer name: [name]. Expected delivery: [date]. Trade-in: [yes/no, description if yes]."
- PDI must be confirmed complete before delivery (even for a sold vehicle)

### Tree 10: `vehicle-trade-in-processing.md`
Scenario: A trade-in vehicle is received from a customer.
Critical rules:
- Immediate action: trade-in banner placed on vehicle immediately upon receipt
- Non-prime check: check Airtable STOCK HOLDER before routing — if "NON PRIME DIVISION" → SEE: vehicle-non-prime-identification.md
- Condition assessment branches:
  - Needs detailing only → route to DHD ($60)
  - Needs mechanical work → move to West Side of Building, status = IN RECON → SEE: vehicle-recon-routing.md
  - Auction-bound → move to Auction Area → SEE: vehicle-auction-routing.md (tree 14, Phase 3B)
  - Front-line ready condition → process through standard detail + PDI flow → SEE: vehicle-arrival-new-standard.md (adapting for used vehicle)

### Tree 11: `vehicle-customer-on-lot.md`
Scenario: A customer's personal vehicle is on the lot for any reason.
Critical rules:
- Immediate action: sign placed on vehicle immediately — content: "Customer's car, picking up [date]"
- Where to park: East Side Fence Line if space available; if Fence full → designated customer area if available
- Who is responsible for ensuring sign is placed: Lot Attendant or Lot Manager during morning walk
- If vehicle is on lot with no sign and nobody knows what it is → SEE: vehicle-status-unknown.md

### Tree 12: `vehicle-bnd-handling.md`
Scenario: A vehicle has status Booked Not Delivered (BND) — deal is in progress, vehicle not yet physically delivered.
Critical rules:
- BND = Airtable status BOOKED|NOT DELIVERED
- Signage: sold sign with customer name placed immediately
- Placement: East Side Fence Line if space available → West Side of Building overflow if Fence full
- Triggers BND status: deal signed, delivery not yet occurred
- Exits BND status: physical delivery to customer
- Communication: ROLE: Salesperson → CHANNEL: team chat → SAY: "Vehicle [VIN/stock number] is BND for [customer name]. Expected delivery: [date]."
- PDI must be complete before physical delivery

### Tree 13: `vehicle-recon-routing.md`
Scenario: A vehicle needs reconditioning (mechanical work, not just detailing).
Critical rules:
- What qualifies as RECON vs. detailing: RECON = mechanical work required; detailing only = route to DHD, not RECON
- Placement: West Side of Building (slots L1–L5)
- Airtable status when in RECON: IN RECON
- Who authorizes RECON work: Service Department Lead
- If PDI reveals recon work needed: vehicle stays in West Side of Building until RECON complete AND re-PDI'd AND detailed
- After RECON complete: route to → PDI → DHD detail → stock-in tag → Cage placement
- New arrivals: a new vehicle that needs work is NOT "RECON" — it is "Pending PDI"; only after PDI reveals mechanical issues does it move to RECON status

---

## QUALITY GATES — VERIFY BEFORE WRITING THE REPORT

Before writing `systems-analysis/decision-trees/_PHASE_3A_REPORT.md`, confirm every item below.

- [ ] All 13 decision tree files exist in `systems-analysis/decision-trees/`
- [ ] Every tree uses the exact format from CLAUDE.md Section 5
- [ ] Every branch in every tree terminates in a defined, specific action
- [ ] No branch ends in "use judgment," "discuss with manager," or any equivalent
- [ ] Every action specifies ROLE, and where communication is required: CHANNEL and SAY
- [ ] Cross-references use the format `→ SEE: filename.md` and never inline referenced tree content
- [ ] All domain facts applied correctly (PDI window, non-prime check, ship mode steps, Key Cafe rules, DHD as only vendor)
- [ ] Canonical zone names used throughout (Cage, East Side Fence Line, West Side of Building, Overflow (Temporary))
- [ ] Non-prime check appears in all trees where a vehicle's origin/category is determined
- [ ] Ship mode tree (Tree 2) includes the delivery incident as a note
- [ ] Ship mode tree includes explicit pushback language for salesperson override attempts
- [ ] Dealer trade tree (Tree 3) includes explicit pushback language for "it's good to go" scenarios
- [ ] PDI compliance tree (Tree 5) includes Day 1 and Day 2 escalation with exact language
- [ ] Cage placement tree (Tree 8) includes all slot priority rules
- [ ] Terminal Outcomes section present in every tree
- [ ] Notes section present in every tree (may be empty if no issues)
- [ ] All gaps marked `[NEEDS_INPUT]`; all inferences marked `[ASSUMPTION]`

---

## COMPLETION REPORT

After all quality gates pass, write `systems-analysis/decision-trees/_PHASE_3A_REPORT.md` using the Phase Completion Report template from CLAUDE.md Section 8. Label it "Phase 3A — Decision Trees 1–13". The report must include:
- List of all 13 tree files with their status
- Quality gate checklist
- All `[NEEDS_INPUT]` items
- All `[AMBIGUOUS]` items
- Notes for Phase 3B (what the next session should be aware of)

---

## STATE UPDATE — WRITE THIS AFTER THE REPORT IS COMPLETE

After writing `_PHASE_3A_REPORT.md`, update `prompts/state.json`:

```
phases.phase_3a.status = "complete"
phases.phase_3a.completed_at = [today's date, YYYY-MM-DD]
phases.phase_3a.files_confirmed_created = [list all 14 files including the report]
phases.phase_3a.quality_gates_passed = true
phases.phase_3a.needs_input_items = [list any [NEEDS_INPUT] items]
phases.phase_3a.ambiguous_items = [list any [AMBIGUOUS] items]
last_updated = [today's date, YYYY-MM-DD]
```

If quality gates did NOT all pass:
```
phases.phase_3a.status = "complete_with_issues"
phases.phase_3a.quality_gates_passed = false
phases.phase_3a.notes = [description of which gates failed]
```

---

## STOP

After updating state.json, **stop completely**. Do not create any trees beyond the 13 listed above. Do not begin Phase 3B. Do not read any SOP files.

Output a final message to the user:
- Phase 3A is complete
- Trees 1–13 are created (list their filenames)
- How many `[NEEDS_INPUT]` items were found
- That `prompts/state.json` has been updated
- That Phase 3B can now be started using `prompts/03b-phase3b-decision-trees-14-25.md` in a new Claude Code session
