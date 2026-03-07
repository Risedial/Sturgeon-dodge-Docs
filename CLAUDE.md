# CLAUDE.md — Sturgeon Dodge Edmonton Office Lot Operations SOP Project
## Persistent Session Instructions — Read This File First, Every Session

---

## 1. Project Purpose

This project builds a complete, zero-ambiguity Standard Operating Procedure system for the **Sturgeon Dodge Edmonton Office lot**. The lot currently lacks standardized processes across every stage of the vehicle lifecycle — from arrival and PDI through display, sale, and delivery. The result is vehicles sitting in wrong zones, PDI compliance at 80% and falling, key/plate financial losses, sold vehicles with no signage, and a service department running at near-zero utilization despite $3,000/day in labor costs.

The output of this project eliminates decision fatigue for all lot, sales, service, and management staff. Every scenario has a pre-decided path. Every employee can operate with full autonomy using only the documented instructions and decision trees.

**Scope:** Edmonton Office lot only. Sturgeon/Legal (AB | STURGEON DODGE) is a separate location referenced only as the destination for non-prime vehicles.

---

## 2. Source Material Reference

| File | Type | Used In |
|---|---|---|
| `context-lot-walkthrough.md` | Primary source — lot walkthrough transcript | Phase 1 (read directly), all phases indirectly via knowledge/ files |
| `LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md` | Background context — automated placement engine spec | Phase 1 only (edge-case placement logic); NOT embedded in human SOPs |

**After Phase 1 is complete:** All downstream phases read `knowledge/` files only. Do not re-read the original source documents in Phases 2–7.

---

## 3. Architecture Diagram

```
SOURCE DOCUMENTS
    context-lot-walkthrough.md
    LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md (background context only)
         |
         v
PHASE 1: KNOWLEDGE EXTRACTION
    knowledge/ (12 structured files)
         |
         v
PHASE 2: SYSTEMS ANALYSIS
    systems-analysis/cause-effect-map.md
    systems-analysis/failure-modes.md
    systems-analysis/financial-impact-analysis.md
         |
         v
PHASE 3: DECISION TREES
    systems-analysis/decision-trees/ (25 files)
         |
         v
PHASE 4: SOP GENERATION
    sops/ (master + 4 team SOPs)
         |
         v
PHASE 5: CHECKLISTS
    checklists/ (8 files)
         |
         v
PHASE 6: APP SPECIFICATION
    app-spec/lot-checklist-app-requirements.md
         |
         v
PHASE 7: DOCUMENT GENERATION
    outputs/ (7 formatted documents)
```

---

## 4. Execution Rules

These rules are non-negotiable. Apply them in every phase, every file.

1. **No invented information.** Every fact, rule, process, role, number, or standard must trace to a `knowledge/` file (Phases 2–7) or to the source documents (Phase 1 only). If information is absent, mark it `[NEEDS_INPUT]`.

2. **Zero ambiguity.** Every decision branch must terminate in a specific, actionable outcome. Branches may never end in "use judgment," "assess the situation," "discuss with the team," or any equivalent.

3. **Role-based filtering.** Team SOPs (team-lot.md, team-sales.md, team-service.md, team-management.md) are self-contained for their audience. A lot attendant should never need to read the sales team SOP to do their job.

4. **Atomic decision trees.** One scenario per tree. When a tree references another scenario, use a cross-reference (→ SEE: [filename]) — do not inline the referenced tree's content.

5. **Binary checklists.** All checklist items are Yes / No only. No subjective assessments. Every No must have a specific Failure Action.

6. **Escalation chain preserved.** Every process has a failure path. If something cannot be resolved at the current level, the escalation target and exact communication are defined.

7. **Communication specifics.** Wherever a person must communicate something, state: who, to whom, on what channel, and what to say (exact language or template).

8. **Penalty enforcement.** State financial penalties explicitly wherever they apply. They are enforced — not theoretical. Confirmed precedents are noted where known.

9. **Canonical zone names.** Use ONLY these names for zones — never abbreviations, never alternative names:
   - **Cage** (front-line display area, 20 slots)
   - **East Side Fence Line** (sold row / BND, 5 slots)
   - **West Side of Building** (recon / BND overflow, 5 slots)
   - **Overflow (Temporary)** (unlimited, temporary staging at East Side Fence Line)
   - Power Sport / Quad Corner (seasonal items only)
   - Auction Area
   - Staff Parking (street only)

10. **Personnel by role, not name.** Use role titles as primary identifiers. All individual names are currently [AMBIGUOUS] except: **Jorja** (Admin - Stock Tags), **Giselle** (Admin/Tech - Stock Tags + Service). Kevin is confirmed as the Sales Manager role name.

11. **Non-prime identification method.** Non-prime vehicles are identified via Airtable: `STOCK HOLDER` column = `"NON PRIME DIVISION"` → route to AB | STURGEON DODGE immediately. `STOCK HOLDER` = `"STURGEON DODGE"` → allowed on this lot.

12. **Do not re-read source documents in Phases 2–7.** The knowledge/ files are the single source of truth after Phase 1.

---

## 5. Conventions

### Status Tags
Use these tags inline in any file where content is uncertain, missing, or needs review:

| Tag | Meaning |
|---|---|
| `[COMPLETE]` | Section is finished, verified, ready |
| `[DRAFT]` | Written but not yet reviewed |
| `[NEEDS_INPUT]` | Information is missing from source material; a human must provide it before this section can be finalized |
| `[NEEDS_REVIEW]` | Content exists but accuracy needs confirmation |
| `[ASSUMPTION]` | Information was inferred from context; mark what was assumed |
| `[AMBIGUOUS]` | Source material is unclear or contradictory; two interpretations exist |
| `[VERIFY]` | A specific claim needs to be verified against source material before finalizing |

### Decision Tree Format

Every decision tree file must follow this structure:

```markdown
# Decision Tree: [Scenario Name]
**File:** [filename.md]
**Status:** [COMPLETE / DRAFT / NEEDS_INPUT]
**Cross-references:** [list any trees this tree references]

---

## Trigger
[What event or condition causes this tree to be activated]

## Responsible Role
[Who executes this tree]

---

## Decision Tree

START
│
├── Q: [First question — binary or categorical]
│   │
│   ├── YES / [Option A]:
│   │   │
│   │   ├── ACTION: [Specific, named action]
│   │   │   ROLE: [Who does it]
│   │   │   CHANNEL: [How they communicate it, if applicable]
│   │   │   SAY: "[Exact language if communication required]"
│   │   │
│   │   └── THEN: → [Next question or terminal outcome]
│   │
│   └── NO / [Option B]:
│       │
│       ├── ACTION: [Specific, named action]
│       │   ROLE: [Who does it]
│       │
│       └── THEN: → [Next question or terminal outcome or → SEE: other-tree.md]
│
└── [Continue branching until all paths terminate]

---

## Terminal Outcomes

List every possible end state of this tree:
- [Outcome 1]: [Description]
- [Outcome 2]: [Description]

---

## Notes
[Any caveats, [NEEDS_INPUT] items, or [AMBIGUOUS] flags]
```

### Cross-Reference Syntax
To reference another decision tree from within a tree or SOP:
```
→ SEE: vehicle-pdi-routing.md
→ SEE: key-plate-lost-response.md
```

### File Naming Convention
- All lowercase, words separated by hyphens
- No spaces, no underscores, no special characters
- Examples: `vehicle-arrival-ship-mode.md`, `team-lot.md`, `pdi-completion-checklist.md`

### Personnel Reference Convention
```
[Role Title] (confirmed name or [AMBIGUOUS])
```
Examples:
- Sales Manager (Kevin)
- Shop Foreman ([AMBIGUOUS])
- Admin - Stock Tags (Jorja)
- Admin/Tech - Stock Tags + Service (Giselle)

---

## 6. File Reading Order

At the start of any session, read in this order:

1. `CLAUDE.md` (this file)
2. `EXECUTION_PLAN.md`
3. Any `_PHASE_N_REPORT.md` files (completion reports from prior phases)
4. Files specified in the current phase's meta-prompt

---

## 7. Quality Gates

Before marking any phase complete, verify ALL of the following:

### All Phases
- [ ] All required files for this phase exist in the correct directory
- [ ] No file uses invented information (everything traces to a source)
- [ ] All ambiguities are tagged ([AMBIGUOUS], [NEEDS_INPUT], [ASSUMPTION], [VERIFY])
- [ ] Canonical zone names used throughout (Cage, East Side Fence Line, West Side of Building, Overflow Temporary)
- [ ] Personnel referenced by role title (names only where confirmed)

### Phase 1 — Knowledge Extraction
- [ ] All 12 knowledge files exist
- [ ] Kia incident documented in signage-and-tagging-standards.md
- [ ] Ship mode delivery failure documented in compliance-requirements.md
- [ ] Non-prime identification method documented in lot-placement-rules.md (STOCK HOLDER column)
- [ ] All financial penalties documented with enforcement status in financial-penalties.md
- [ ] Stock-in tag process documented (Jorja + Giselle fill, lot team places, bottom-right windshield, white)

### Phase 2 — Systems Analysis
- [ ] Kia incident appears in failure-modes.md
- [ ] Ship mode delivery failure appears in failure-modes.md
- [ ] Service department underutilization documented with $3,000/day figure
- [ ] PDI compliance at 80% documented with red zone context

### Phase 3 — Decision Trees
- [ ] All 25 decision tree files exist
- [ ] Every branch in every tree terminates in a defined action
- [ ] No branch ends in "use judgment" or equivalent
- [ ] Non-prime tree checks STOCK HOLDER column correctly
- [ ] Ship mode tree requires PDI before any other step
- [ ] Key Cafe trees enforce no peer-to-peer transfers
- [ ] Sold sign tree uses 3-strike language exactly as specified

### Phase 4 — SOPs
- [ ] All 5 SOP files exist
- [ ] Master SOP has complete cross-reference index to all 25 trees
- [ ] Each team SOP is self-contained for that role
- [ ] PDI 2-day window and 80% compliance in both master and service SOP
- [ ] Penalty table in master SOP

### Phase 5 — Checklists
- [ ] All 8 checklist files exist
- [ ] All items are binary Yes/No
- [ ] Every No has a specific Failure Action
- [ ] FLR checklist requires PDI complete before front line placement
- [ ] Morning walk checklist covers all 7 zones

### Phase 6 — App Spec
- [ ] Product requirements doc exists
- [ ] No technical architecture content
- [ ] Matches the 5 vehicle audit checklists exactly
- [ ] Phase 1 and Phase 2 feature sets are distinct and sequenced
- [ ] No Telegram integration included

### Phase 7 — Document Generation
- [ ] All 7 output files exist
- [ ] Consistent formatting applied across all documents
- [ ] Critical rules are bolded
- [ ] "NEVER DO THIS" callouts present for confirmed failure scenarios

---

## 8. Phase Completion Report Template

After completing each phase, create a file named `_PHASE_N_REPORT.md` in the phase's output directory (e.g., `knowledge/_PHASE_1_REPORT.md`).

```markdown
# Phase [N] Completion Report
**Phase:** [Phase name]
**Date completed:** [date]
**Status:** [COMPLETE / PARTIAL — see issues below]

---

## Files Created
- [list every file created, with status COMPLETE / DRAFT / NEEDS_INPUT]

---

## Quality Gate Results
- [ ] [Each quality gate item — check if passed]

---

## [NEEDS_INPUT] Items
List every item that requires human input before it can be finalized:
- File: [filename], Section: [section name], Issue: [what information is missing]

---

## [AMBIGUOUS] Items
List every ambiguity encountered:
- File: [filename], Section: [section name], Ambiguity: [what is unclear]

---

## Notes for Next Phase
[Any information the next phase's session should be aware of]
```

---

## 9. Domain Glossary

All domain-specific terms from the source documents. Reference this glossary when writing any file.

| Term | Definition |
|---|---|
| **Airtable** | The inventory management database used to track vehicle records. Base: INVENTORY SYSTEMS, Table: MASTER INVENTORY. |
| **Auction Area** | A zone on the lot designated for vehicles routed to auction. Vehicles here are not available for sale and must not be placed in retail zones. |
| **Auction Bound** | Vehicle status indicating the vehicle is being routed to auction rather than sold through the dealership. |
| **BND / Booked Not Delivered** | A vehicle with an active deal that has not yet been physically delivered to the buyer. Airtable status: `BOOKED | NOT DELIVERED`. Parked at East Side Fence Line or West Side of Building. |
| **Brand Priority** | Placement sort order by make: Jeep (1), Ram (2), Chrysler (3), Dodge (4), all others (5). Lower number = higher-priority slot. |
| **Body Type Priority** | Placement sort order by body type within a brand tier: SUV (1), Van (2), Truck (3), Sedan (4). Sedans overflow first. |
| **Cage** | The front-line display area of the lot. 20 fixed slots (C01–C20). Holds NEW and FLR vehicles only. All vehicles in the Cage must be PDI'd, detailed, tagged, facing outward, with adequate door-opening spacing. |
| **Category** | The computed placement classification assigned by the placement system: NEW, FLR, SOLD, BND, or RECON. Different from Airtable inventory status. |
| **Customer Vehicle** | A customer's personal vehicle that is on the lot for any reason (service, pickup, etc.). Must have a sign: "Customer's car, picking up [date]". |
| **Dealer Trade** | A vehicle arriving from another dealership. Requires final PDI + detail before placement, even if the originating dealer says it's already inspected. |
| **DHD** | The primary external detailing vendor. Provides full vehicle detail. Cost: $60 per vehicle. |
| **Division One** | → See: Non-Prime. Division One / non-prime / stockholder vehicles are completely prohibited on the Edmonton Office lot. |
| **East Side Fence Line** | The fence line along the right side of the building. 5 fixed slots (F1–F5). Holds SOLD, BND, and FLR sedan overflow. Also referred to in legacy naming as "Sold Row" or "FENCE" in the placement system. |
| **Edmonton Office** | The physical dealership lot this SOP system covers. Airtable stock location: `AB | EDMONTON OFFICE`. All SOPs in this project apply to this location only. |
| **FLR / Frontline Ready** | A vehicle that is available for sale and properly prepared for display in the Cage. Airtable status: `AVAILABLE` or `DEMO`. Requires: PDI complete, fully detailed, no stickers, no tape, stock-in tag placed. |
| **GPS Key Tag** | A GPS-enabled tag attached to every key set. Cost to reprogram if lost: $25. Must remain attached at all times. |
| **Giselle** | Admin/Tech — dual role: creates stock-in tags (with Jorja) AND performs service/technician work. |
| **Jorja** | Admin — Stock Tags. Fills out stock-in tags and hands them to the lot team for placement. |
| **Key Cafe** | The centralized key and dealer plate management system. All sign-outs and sign-ins are logged here with employee name and timestamp. Key Cafe is the single source of truth for all key/plate custody. |
| **Kevin** | Sales Manager role name. Confirmed in source material. |
| **Legal / Sturgeon** | The Sturgeon Dodge location (Airtable: `AB | STURGEON DODGE`). Non-prime vehicles are routed here from the Edmonton Office. |
| **LOOSE / Overflow (Temporary)** | Unlimited overflow staging. Used when all fixed slots in the appropriate zone are full. Vehicles are labeled with a destination zone annotation and physically staged at the East Side Fence Line until a permanent slot opens. |
| **Morning Lot Walk** | The mandatory daily physical inspection of every zone and every vehicle on the lot. Executed ~30 minutes after arriving. Duration: ~30 minutes. Output: task list routed to relevant teams. |
| **NEW** | Placement category for vehicles with KM ≤ 1,000, treated as a new unit for slot priority regardless of Airtable status. Subject to override if Airtable status is BOOKED|NOT DELIVERED, SIGNED DEAL, or IN RECON. |
| **Non-Prime / Division One** | Vehicles identified via Airtable `STOCK HOLDER` = `"NON PRIME DIVISION"`. Completely prohibited on the Edmonton Office lot. Route immediately to AB | STURGEON DODGE. Different insurance, different operation. |
| **PDI / Pre-Delivery Inspection** | The mandatory inspection performed by a service technician before a vehicle can be placed on the front line or delivered to a customer. Must be completed within 2 days of vehicle arrival at the dealership (Stellantis requirement). |
| **PDI Complete** | The state after a technician has performed the PDI and marked it complete in the manufacturer system. |
| **Pending PDI** | The correct system status for a new vehicle that has arrived but not yet been inspected. NEVER use "Recon" for new arrivals — this hides them from sales inventory. |
| **Power Sport / Quad Corner** | A dead-space zone where regular vehicles cannot park (doors cannot open). Used for power sport deliveries, boat deliveries, and seasonal Hysen units (post-snow-melt). |
| **RECON / Reconditioning** | A vehicle undergoing preparation work (mechanical repair, etc.) before it can be offered for sale. Airtable status: `IN RECON`, `INCOMING`, `WHOLESALE`, or `CHASE`. Parked at West Side of Building. NEVER applied to new arrivals — new arrivals are Pending PDI. |
| **Ship Mode** | Factory transport state. Battery is disconnected, software is in low-power mode. Must be cleared (battery reconnected, software reset performed) AND PDI completed before any other step. A vehicle in ship mode may not be placed on the front line or delivered to a customer. |
| **Sold Sign** | A sign placed immediately when a vehicle is sold. Supplies location: upstairs, with Sharpies. Customer name written on the sign. Placed in the vehicle. |
| **Staff Vehicle Inventory** | A compiled list of all staff personal vehicles (employee name, make, model, plate number). Used to identify which vehicles on the lot belong to staff vs. inventory vs. customers. Maintained by management. |
| **Stellantis** | The manufacturer (Chrysler/Jeep/Ram/Dodge parent company). Tracks PDI compliance. Requires final PDI within 2 days of delivery. Current compliance: 80% — entering the red zone where fines and docking begin. |
| **Stock-In Tag** | A white identification tag placed on every vehicle that enters the lot. Filled out by Jorja and Giselle, handed to the lot team, placed by the lot team in the bottom-right corner of the windshield. Not yellow (yellow looks like AutoWorld). Every vehicle on the lot must have one. |
| **STOCK HOLDER** | An Airtable field used to identify non-prime vehicles. Values: `STURGEON DODGE` (allowed on this lot) or `NON PRIME DIVISION` (must be routed to AB | STURGEON DODGE immediately). |
| **Sturgeon Dodge** | The dealership name. This SOP project covers the Edmonton Office lot only. |
| **Trade-In** | A vehicle received from a customer as part of a deal. Must receive a trade-in banner immediately. Routed based on condition: detail → DHD; mechanical work → West Side of Building (RECON); auction-bound → auction area. |
| **Trade-In Banner** | A banner placed on a trade-in vehicle immediately upon receipt. Distinguishes it from inventory, sold vehicles, and customer vehicles. |
| **West Side of Building** | The parking area along the left side of the building. 5 fixed slots (L1–L5). Holds BND overflow, RECON vehicles, and SOLD overflow. Also referred to in legacy naming as "LEFT" in the placement system. |
| **VIN** | Vehicle Identification Number. Unique identifier for each vehicle. Required field in Airtable — vehicles without a VIN are excluded from placement. |
| **3-Strike Escalation** | The communication protocol for enforcing missing sold signs (or similar compliance failures): Strike 1 = polite request; Strike 2 = reminder with slightly more emphasis; Strike 3 = direct accountability statement. Expected outcome at Strike 3: self-correction. |
| **$500 Dealer Plate Penalty** | Financial penalty charged to the employee who last signed out a dealer plate if it is lost. Enforced — confirmed precedent (one employee paid this penalty). |
| **$25 Key Tag Penalty** | Cost to reprogram a GPS key tag if lost. Charged to the employee responsible. |
| **80% Compliance** | The current Stellantis PDI compliance rate at the Edmonton Office. This is the "red zone" — fines and docking begin below a threshold near this level. |
| **2-Day PDI Window** | The Stellantis requirement: final PDI must be completed within 2 calendar days of vehicle delivery to the dealership. Applies to all new vehicles and all dealer trades. |
