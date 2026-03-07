# SESSION PROMPT — Phase 3B: Decision Trees 14–25 (Operational, Personnel, Compliance)
# Sturgeon Dodge Edmonton Office Lot Operations SOP Project

---

## MANDATORY FIRST STEPS — DO THESE BEFORE ANYTHING ELSE

Read the following files in this exact order. Do not skip any file. Do not begin the STATE CHECK until all reads are complete.

1. Read `CLAUDE.md` — pay particular attention to: the Decision Tree Format (Section 5), canonical zone names (Section 4, Rule 9), and the 3-Strike Escalation definition in the glossary.
2. Read `EXECUTION_PLAN.md` — read the Phase 3 meta-prompt in Section 4 in full. The file-by-file specifications for all 25 trees are there.
3. Read `prompts/state.json` — the shared state file.
4. Read these knowledge files (in order):
   - `knowledge/key-cafe-protocol.md`
   - `knowledge/financial-penalties.md`
   - `knowledge/signage-and-tagging-standards.md`
   - `knowledge/communication-and-escalation-protocols.md`
   - `knowledge/daily-operations-workflow.md`
   - `knowledge/lot-placement-rules.md`
   - `knowledge/zone-definitions.md`
   - `knowledge/vehicle-statuses-and-transitions.md`
5. Read the Phase 3A report: `systems-analysis/decision-trees/_PHASE_3A_REPORT.md`
6. Scan the titles (not full content) of the 13 trees already created in Phase 3A to understand the cross-reference landscape:
   - `systems-analysis/decision-trees/vehicle-arrival-new-standard.md`
   - `systems-analysis/decision-trees/vehicle-arrival-ship-mode.md`
   - `systems-analysis/decision-trees/vehicle-arrival-dealer-trade.md`
   - `systems-analysis/decision-trees/vehicle-pdi-routing.md`
   - `systems-analysis/decision-trees/vehicle-pdi-compliance-deadline.md`
   - `systems-analysis/decision-trees/vehicle-detailing-routing.md`
   - `systems-analysis/decision-trees/vehicle-categorization.md`
   - `systems-analysis/decision-trees/vehicle-placement-cage.md`
   - `systems-analysis/decision-trees/vehicle-sold-processing.md`
   - `systems-analysis/decision-trees/vehicle-trade-in-processing.md`
   - `systems-analysis/decision-trees/vehicle-customer-on-lot.md`
   - `systems-analysis/decision-trees/vehicle-bnd-handling.md`
   - `systems-analysis/decision-trees/vehicle-recon-routing.md`

All reads must complete before you proceed.

---

## STATE CHECK — ABORT IF PREREQUISITES ARE NOT MET

After reading `prompts/state.json`, check:

**Required:**
- `phases.phase_1.status` must be `"complete"` OR `"complete_with_issues"`
- `phases.phase_2.status` must be `"complete"` OR `"complete_with_issues"`
- `phases.phase_3a.status` must be `"complete"` OR `"complete_with_issues"`

If any prerequisite is NOT met:
- **STOP immediately.**
- Do not create any files.
- Output: "ABORT: Prerequisites not met. Check prompts/state.json — phases phase_1, phase_2, and phase_3a must all be complete before Phase 3B can begin. Missing: [list which phases are not complete]."
- Take no further action.

If prerequisites are met, continue.

**Before writing any files, update `prompts/state.json`:**
- Set `phases.phase_3b.status` to `"in_progress"`
- Set `phases.phase_3b.started_at` to today's date (YYYY-MM-DD)
- Set `last_updated` to today's date

---

## YOUR TASK — PHASE 3B: DECISION TREES 14–25

This session creates the remaining 12 decision trees (trees 14–25) to complete the full set of 25. These trees cover non-vehicle operational scenarios: auction routing, non-prime identification, seasonal vehicles, unknown status, Key Cafe operations, staff parking enforcement, sold sign enforcement, the morning lot walk, and onboarding.

### What You Must Produce

**File 1:** `systems-analysis/decision-trees/vehicle-auction-routing.md`
**File 2:** `systems-analysis/decision-trees/vehicle-non-prime-identification.md`
**File 3:** `systems-analysis/decision-trees/vehicle-seasonal-power-sport.md`
**File 4:** `systems-analysis/decision-trees/vehicle-status-unknown.md`
**File 5:** `systems-analysis/decision-trees/key-plate-sign-out.md`
**File 6:** `systems-analysis/decision-trees/key-plate-sign-in.md`
**File 7:** `systems-analysis/decision-trees/key-plate-lost-response.md`
**File 8:** `systems-analysis/decision-trees/staff-parking-new-employee.md`
**File 9:** `systems-analysis/decision-trees/staff-parking-repeat-violation.md`
**File 10:** `systems-analysis/decision-trees/sold-sign-missing-enforcement.md`
**File 11:** `systems-analysis/decision-trees/morning-lot-walk.md`
**File 12:** `systems-analysis/decision-trees/accountability-agreement-onboarding.md`
**File 13:** `systems-analysis/decision-trees/_PHASE_3B_REPORT.md` (completion report — written last)

---

## DECISION TREE FORMAT — MANDATORY FOR EVERY FILE

Every decision tree file must use the exact format defined in CLAUDE.md Section 5. Key requirements:

- **File header:** Title, File name, Status tag, Cross-references list
- **Trigger section:** What event activates this tree
- **Responsible Role section:** Who executes this tree
- **Decision Tree section:** Full branching with ASCII tree characters (│ ├── └── →)
- **Terminal Outcomes section:** Numbered list of every possible end state
- **Notes section:** Any `[NEEDS_INPUT]`, `[AMBIGUOUS]`, or `[ASSUMPTION]` items

**Every branch must terminate in a specific, actionable outcome. No branch may end in:**
- "Use judgment"
- "Assess the situation"
- "Discuss with manager"
- Any equivalent phrase

**Every action must specify:** ACTION, ROLE, and where communication is required: CHANNEL and SAY (exact language).

**Cross-reference syntax:** `→ SEE: filename.md`

---

## DOMAIN FACTS — APPLY THROUGHOUT ALL 12 TREES

- **Non-prime check:** Airtable STOCK HOLDER = "NON PRIME DIVISION" → route to AB | STURGEON DODGE immediately; "STURGEON DODGE" → allowed
- **Key Cafe:** All sign-outs and sign-ins through Key Cafe only — zero peer-to-peer transfers
- **Penalties:** Dealer plate = $500 (enforced, confirmed precedent); GPS key tag = $25 to reprogram; keys = ~50% replacement
- **Accountability agreement:** Must be signed before any key/plate access — without it, the employee cannot take a plate or drive a dealership vehicle
- **GPS key tag:** Check GPS location before declaring a key tag lost ($25 to reprogram)
- **Staff parking:** Street only — zero exceptions including managers and General Manager
- **3-Strike language:** Must match exactly as documented in `knowledge/communication-and-escalation-protocols.md`
- **Canonical zones:** Cage, East Side Fence Line, West Side of Building, Overflow (Temporary)

---

## FILE-BY-FILE SPECIFICATIONS

Read the full specification for each tree from the Phase 3 meta-prompt in EXECUTION_PLAN.md Section 4. What follows are the critical decision points and non-negotiable rules.

### Tree 14: `vehicle-auction-routing.md`
Scenario: A vehicle is being routed to auction.
Critical rules:
- What determines auction-bound: condition assessment (trade-in, recon vehicle that is not worth reconditioning), or management decision
- Placement: Auction Area ONLY — never Cage, never East Side Fence Line, never West Side of Building
- Signage: auction vehicles must be clearly identified (mark as auction-bound in Airtable)
- If vehicle is mistakenly placed outside the Auction Area: identify immediately during morning walk → move to Auction Area immediately → document in team chat
- Terminal outcomes: vehicle correctly placed in Auction Area, or vehicle returned to processing pipeline if auction decision was an error

### Tree 15: `vehicle-non-prime-identification.md`
Scenario: A vehicle on the lot may be non-prime (Division One).
Critical rules:
- This is the canonical tree for all non-prime checks across the project — other trees reference this one
- Identification method: check Airtable STOCK HOLDER field (not any other field)
- STOCK HOLDER = "NON PRIME DIVISION": vehicle must leave this lot immediately → route to AB | STURGEON DODGE; notify Sales Manager (Kevin)
- STOCK HOLDER = "STURGEON DODGE": vehicle is allowed on this lot; return to normal processing
- STOCK HOLDER = blank or unknown: escalate to General Manager immediately; do not move vehicle until confirmed
- Non-prime vehicles operate under different insurance and a different organizational structure — this is why they cannot be on the Edmonton Office lot under any circumstances
- No exceptions — even if a manager says it's okay, non-prime vehicles must be routed off the lot

### Tree 16: `vehicle-seasonal-power-sport.md`
Scenario: A power sport delivery, boat delivery, or Hysen unit arrives.
Critical rules:
- Correct placement: Power Sport / Quad Corner — the dead-space zone where regular vehicles cannot park (doors cannot open in this space for regular vehicles)
- Timing of Hysen units: post-snow-melt, seasonal — not year-round
- What is prohibited in Power Sport / Quad Corner: retail vehicles of any kind, under any circumstances
- Last usable position: the edge position from which you can still exit the zone
- If regular vehicle is found in Power Sport / Quad Corner: move immediately to appropriate zone based on vehicle status → SEE: vehicle-categorization.md

### Tree 17: `vehicle-status-unknown.md`
Scenario: A vehicle is on the lot and nobody knows what it is — inventory, sold, trade-in, or customer.
Critical rules:
- This tree exists because of the Kia incident (6 weeks on lot with no identification — nobody knew its status). Reference this incident explicitly in the Notes section of the file.
- Investigation steps in order:
  1. Check Airtable by VIN/plate — can this vehicle be matched to an inventory record?
  2. If matched: determine status and route accordingly
  3. If not matched in Airtable: check Key Cafe log — is a key signed out for this vehicle?
  4. Ask Sales Manager (Kevin) — does anyone recognize this vehicle?
- Possible outcomes (each is a terminal branch):
  - Vehicle is inventory → place stock-in tag → route correctly per status
  - Vehicle is sold → place sold sign with customer name → move to East Side Fence Line
  - Vehicle is trade-in → place trade-in banner → assess condition → route appropriately
  - Vehicle is a customer vehicle → place "Customer's car, picking up [date]" sign → notify relevant salesperson
  - Vehicle is non-prime → SEE: vehicle-non-prime-identification.md
- If ALL investigation steps fail and vehicle cannot be identified: escalate to General Manager immediately. Do not move the vehicle until General Manager provides direction.

### Tree 18: `key-plate-sign-out.md`
Scenario: An employee needs to sign out a key or dealer plate.
Critical rules:
- Go to Key Cafe only — no exceptions, no workarounds
- Accountability agreement must be on file before any sign-out is permitted
  - If agreement NOT on file → STOP. Do not issue key/plate. ROLE: Lot Manager → SAY: "You need to sign the accountability agreement before I can issue any keys or plates. See [Sales Manager/GM] to complete that."
- Log transaction: employee name + timestamp — every transaction, no exceptions
- If requested item is signed out to another employee: do NOT ask that employee to hand it over peer-to-peer. ROLE: requesting employee → ACTION: wait for item to be checked back in through Key Cafe, OR contact the employee who has it and ask them to check it in through Key Cafe
- If requesting employee cannot wait: escalate to Lot Manager to determine priority

### Tree 19: `key-plate-sign-in.md`
Scenario: An employee returns a key or dealer plate.
Critical rules:
- Return to Key Cafe only — no peer-to-peer handoffs ever
- Log transaction: employee name + timestamp
- If someone approaches you and asks you to return their key/plate for them: "No — you need to check it in yourself through Key Cafe. I can't accept it from you."
- This rule applies even if the person is in a hurry or is a manager — no exceptions
- Employee is responsible for the item until THEY check it in through Key Cafe — responsibility does not transfer person-to-person

### Tree 20: `key-plate-lost-response.md`
Scenario: A key, GPS key tag, or dealer plate is reported lost.
Critical rules:
- First action: check GPS location of the key tag before declaring anything lost — the GPS key tag may reveal the item's location ($25 to reprogram if actually lost)
- Identify who last signed it out: check Key Cafe log — that employee is financially responsible
- Penalties: dealer plate = $500, GPS key tag = $25 to reprogram, keys = ~50% of replacement cost
- Immediate search steps: search the vehicle it was signed out for, check common areas (reception desk, service desk, break room)
- If found: return through Key Cafe, log the return, no penalty
- If not found after search: formal notification to General Manager; financial deduction process initiated against the responsible employee
- Replacement/reprogram process: GPS key tag — $25 charged to responsible employee; dealer plate — contact relevant authority for replacement, $500 charged to responsible employee; keys — replace and charge ~50% cost to responsible employee

### Tree 21: `staff-parking-new-employee.md`
Scenario: A new employee has parked on the lot — first-time violation.
Critical rules:
- Tone: welcoming, never confrontational, never blame-framing — this is treated as an orientation matter, not a discipline matter
- Exact language to use: "Hey, welcome aboard. All sales staff have to park on the street — we have limited space, there's landlord parking, and big trucks come through during the day. It's standard for everyone here."
- Do not add: warnings, notes in personnel file, or escalation language for a first offense
- Document in team chat: a simple note "Reminded [name/role] about street parking — first day." This is for pattern tracking only, not disciplinary.
- After conversation: direct the employee to move their vehicle to street parking
- Terminal outcome: employee parks on street; no escalation

### Tree 22: `staff-parking-repeat-violation.md`
Scenario: A known employee (any seniority level, including managers) parks on the lot after having already been told the rule.
Critical rules:
- Zero exceptions — rule applies equally to: lot attendants, sales staff, Sales Manager (Kevin), any other manager, the General Manager
- The General Manager himself has parked on the street and walked a block when the lot was blocked — reference this as evidence the rule is universal
- Approach: direct and matter-of-fact — not aggressive, not passive, not apologetic
- Do NOT use the same welcoming-orientation framing as a first offense
- Document in team chat: "Spoke with [name/role] about lot parking — second+ occurrence."
- First repeat (second violation): Direct conversation → direct to move vehicle → document in team chat
- Second repeat (third+ violation): Escalate to Sales Manager (Kevin). CHANNEL: direct or team chat. SAY: "I've spoken to [name] about lot parking twice now. It's still happening. Can you address it?"
- Third repeat (ongoing): Escalate to General Manager. CHANNEL: direct conversation. SAY: "Lot parking has been an ongoing issue with [name] after multiple conversations. I need your support to enforce it."
- In all cases: enforce the rule, document the pattern, escalate through the chain

### Tree 23: `sold-sign-missing-enforcement.md`
Scenario: A sold vehicle on the lot has no sold sign.
Critical rules:
- Who notices: Lot Attendant or Lot Manager during morning walk or ongoing lot policing
- Who is responsible for fixing: Sales team (the salesperson who made the sale, or Sales Manager)
- 3-Strike Protocol — exact language required:
  - **Strike 1** (first time noticing for this vehicle): ROLE: Lot Manager/Attendant → TO: Salesperson responsible → CHANNEL: direct conversation or team chat → SAY: "Hey [Name], do you mind getting your guys to put a sold sign in [vehicle description]?"
  - **Strike 2** (if no action after reasonable time — 15-30 minutes): ROLE: Lot Manager/Attendant → TO: same person → SAY: "Hey [Name], do you mind?" (same polite tone, slightly more emphasis)
  - **Strike 3** (still no action): ROLE: Lot Manager/Attendant → TO: same person → SAY: "[Name], killing me, buddy. Can you just tell me the stuff and I'll do it, because we have to be organized."
  - Expected outcome at Strike 3: self-correction — salesperson comes down themselves and places the sign
- Supplies location: upstairs with Sharpies
- What to write on the sign: customer's name
- If salesperson cannot be reached after Strike 3: lot team may place the sign after confirming the customer name with the Sales Manager (Kevin). ROLE: Lot Attendant → TO: Sales Manager → SAY: "I can't reach [salesperson]. What's the customer name for [vehicle description] so I can put the sold sign in?"
- After sign is placed: document in team chat

### Tree 24: `morning-lot-walk.md`
Scenario: Executing the mandatory daily morning lot walk.
Critical rules:
- Timing: ~30 minutes after arriving at the lot, after handling any immediate fires (not the very first thing, but within the first 30 minutes of the workday)
- Duration: ~30 minutes
- This walk is mandatory — it is not optional and cannot be skipped
- Physical walk of all zones in order: Cage → East Side Fence Line → West Side of Building → Overflow (Temporary) → Auction Area → Power Sport / Quad Corner
- Per-vehicle check at every vehicle encountered:
  1. Does the vehicle's zone match its status?
  2. Is the correct signage present? (sold sign, trade-in banner, customer sign, stock-in tag)
  3. Is the vehicle clean (no visible dirt/debris)?
  4. Is the vehicle facing outward (Cage only)?
  5. Is there adequate door-opening spacing (Cage only)?
  6. Is the stock-in tag present in bottom-right windshield?
  7. Is there any staff personal vehicle on the lot?
  8. Are there any PDI compliance gaps (vehicle approaching or past 2-day window)?
- After completing the walk: generate task list from all identified issues
- Document task list in team chat: ROLE: Lot Manager → CHANNEL: team chat → format tasks by responsible team (Lot, Sales, Service)
- Route tasks: vehicles needing PDI → contact Service Department Lead; sold signs missing → follow `sold-sign-missing-enforcement.md`; vehicles in wrong zone → move per relevant decision tree
- Output: team chat post with all outstanding tasks assigned to responsible teams

### Tree 25: `accountability-agreement-onboarding.md`
Scenario: Onboarding a new employee who needs access to keys and dealer plates.
Critical rules:
- Accountability agreement must be signed BEFORE any key or plate access is granted — no exceptions, no grace period
- What the agreement covers: financial responsibility for lost items (plate $500, key tag $25, keys ~50%), Key Cafe compliance (all transactions through Key Cafe only, no peer-to-peer), custody chain requirements (responsible until checked back in through Key Cafe)
- Without signing: employee cannot take a dealer plate, cannot drive a dealership vehicle, cannot continue with duties that require key/plate access
- Key Cafe training is part of onboarding: show employee the Key Cafe system, demonstrate sign-out and sign-in process, explain that every transaction is logged with their name and timestamp
- Who conducts onboarding: Lot Manager or designated trainer
- Terminal outcomes: agreement signed → Key Cafe training complete → employee has access; OR agreement NOT signed → employee has no access until signed

---

## QUALITY GATES — VERIFY BEFORE WRITING THE REPORT

Before writing `systems-analysis/decision-trees/_PHASE_3B_REPORT.md`:

- [ ] All 12 decision tree files exist in `systems-analysis/decision-trees/`
- [ ] Every tree uses the exact format from CLAUDE.md Section 5
- [ ] Every branch in every tree terminates in a defined, specific action
- [ ] No branch ends in "use judgment," "discuss with manager," or any equivalent
- [ ] Every action specifies ROLE, and where required: CHANNEL and exact SAY language
- [ ] Cross-references use `→ SEE: filename.md` syntax
- [ ] Kia incident is explicitly referenced in `vehicle-status-unknown.md` Notes section
- [ ] Key Cafe trees (18, 19, 20) enforce zero peer-to-peer transfers
- [ ] Key tag GPS check step appears in `key-plate-lost-response.md` before declaring item lost
- [ ] All three penalty amounts are correct in `key-plate-lost-response.md`: plate $500, tag $25, keys ~50%
- [ ] `sold-sign-missing-enforcement.md` uses exact 3-Strike language from knowledge file
- [ ] Staff parking trees (21, 22) use exactly the right tone: Tree 21 = welcoming/orientation; Tree 22 = direct/matter-of-fact
- [ ] Repeat violation tree (22) states the rule applies to all seniority levels including managers and GM
- [ ] Non-prime tree (15) uses STOCK HOLDER field (not any other field) for identification
- [ ] Non-prime tree (15) has explicit branch for blank/unknown STOCK HOLDER → escalate to GM
- [ ] Morning walk tree (24) covers all 6 zones in order
- [ ] Onboarding tree (25) states no access before agreement is signed — no exceptions
- [ ] All gaps marked `[NEEDS_INPUT]`; all inferences marked `[ASSUMPTION]`

---

## COMPLETION REPORT

After all quality gates pass, write `systems-analysis/decision-trees/_PHASE_3B_REPORT.md` using the Phase Completion Report template from CLAUDE.md Section 8. Label it "Phase 3B — Decision Trees 14–25". Include:
- List of all 12 tree files with their status
- Quality gate checklist
- All `[NEEDS_INPUT]` items
- All `[AMBIGUOUS]` items
- Combined note for Phase 4: summary of the full 25-tree set (any issues Phase 4 should know about)

---

## STATE UPDATE — WRITE THIS AFTER THE REPORT IS COMPLETE

After writing `_PHASE_3B_REPORT.md`, update `prompts/state.json`:

```
phases.phase_3b.status = "complete"
phases.phase_3b.completed_at = [today's date, YYYY-MM-DD]
phases.phase_3b.files_confirmed_created = [list all 13 files including report]
phases.phase_3b.quality_gates_passed = true
phases.phase_3b.needs_input_items = [list any [NEEDS_INPUT] items]
phases.phase_3b.ambiguous_items = [list any [AMBIGUOUS] items]
last_updated = [today's date, YYYY-MM-DD]
```

If quality gates did NOT all pass:
```
phases.phase_3b.status = "complete_with_issues"
phases.phase_3b.quality_gates_passed = false
phases.phase_3b.notes = [description of which gates failed]
```

---

## STOP

After updating state.json, **stop completely**. Do not begin Phase 4. Do not read any SOP files.

Output a final message to the user:
- Phase 3B is complete
- Trees 14–25 are created (list their filenames)
- The full 25-tree decision tree set is now complete
- How many `[NEEDS_INPUT]` items were found across 3B
- That `prompts/state.json` has been updated
- That Phase 4 can now be started using `prompts/04-phase4-sop-generation.md` in a new Claude Code session
