# Decision Tree: Vehicle Recon Routing
**File:** vehicle-recon-routing.md
**Status:** [COMPLETE]
**Cross-references:** vehicle-pdi-routing.md, vehicle-detailing-routing.md, vehicle-placement-cage.md, vehicle-arrival-new-standard.md

---

## Trigger
A vehicle has been determined to require mechanical reconditioning work before it can be offered for retail sale. This determination is typically made after a PDI reveals mechanical issues, or when a trade-in is assessed and found to need mechanical work (not detailing only).

## Responsible Role
Lot Manager (routing decision and Airtable update); Service Department Lead (authorizes and assigns RECON work); Lot Attendant (physical placement)

---

## Decision Tree

START
│
├── Q: What is the source of the vehicle entering RECON?
│   │
│   ├── PDI revealed mechanical issues (vehicle was already in PDI process):
│   │   │
│   │   ├── ACTION: Confirm with Service Department Lead that mechanical work is required.
│   │   │   ROLE: Lot Manager
│   │   │   CHANNEL: Direct contact (in person or phone)
│   │   │   SAY: "PDI for [VIN/stock number] has revealed [issue description]. Does this require RECON work?"
│   │   │
│   │   └── THEN: → RECON AUTHORIZATION CHECK
│   │
│   ├── Trade-in received — mechanical work needed (not detailing only):
│   │   │
│   │   ├── ACTION: Confirm with Service Department Lead that mechanical work is required.
│   │   │   ROLE: Lot Manager
│   │   │   CHANNEL: Direct contact (in person or phone)
│   │   │   SAY: "Trade-in [VIN/stock number] requires mechanical work: [describe issue]. Please authorize RECON."
│   │   │
│   │   └── THEN: → RECON AUTHORIZATION CHECK
│   │
│   └── New vehicle arrival — vehicle is flagged as needing work:
│       │
│       ├── CRITICAL CHECK: Is this a NEW vehicle (KM ≤ 1,000) that simply has not had its PDI yet?
│       │   │
│       │   ├── YES — vehicle has NOT had PDI yet:
│       │   │   │
│       │   │   ├── ACTION: Do NOT assign RECON status. Do NOT route to West Side of Building as RECON.
│       │   │   │   ROLE: Lot Manager
│       │   │   │
│       │   │   ├── ACTION: Assign "Pending PDI" status. Route through standard new arrival process.
│       │   │   │   ROLE: Lot Manager
│       │   │   │
│       │   │   └── → SEE: vehicle-arrival-new-standard.md
│       │   │       (RECON status for new arrivals hides the vehicle from the sales inventory system — this is a compliance failure)
│       │   │
│       │   └── NO — vehicle has had PDI and PDI revealed issues that require mechanical work:
│       │       │
│       │       └── THEN: → RECON AUTHORIZATION CHECK

---

## RECON Authorization Check

│
├── Q: Has the Service Department Lead authorized the RECON work?
│   │
│   ├── YES:
│   │   │
│   │   └── THEN: → RECON PLACEMENT
│   │
│   └── NO (Service Department Lead has not yet confirmed authorization):
│       │
│       ├── ACTION: Hold vehicle in current location until authorization is received. Do not move to West Side of Building yet.
│       │   ROLE: Lot Manager
│       │
│       ├── ACTION: Follow up with Service Department Lead.
│       │   ROLE: Lot Manager
│       │   CHANNEL: Direct contact + WhatsApp group
│       │   SAY: "Waiting on RECON authorization for [VIN/stock number]. Please confirm so we can update Airtable and move the vehicle."
│       │
│       └── THEN: Hold until authorization received → loop back to authorization check

---

## RECON Placement

START — RECON authorized
│
├── STEP 1 — Update Airtable
│   ACTION: Set Airtable status to `IN RECON`.
│   ROLE: Lot Manager or Admin
│
├── STEP 2 — Physical placement
│   │
│   ├── Q: Is there an available slot in the West Side of Building (L1–L5)?
│   │   │
│   │   ├── YES:
│   │   │   │
│   │   │   ├── ACTION: Move vehicle to an available West Side of Building slot.
│   │   │   │   ROLE: Lot Attendant
│   │   │   │
│   │   │   └── THEN: → OUTCOME A (vehicle in RECON, placed in West Side of Building)
│   │   │
│   │   └── NO (all L1–L5 slots occupied):
│   │       │
│   │       ├── ACTION: Move vehicle to Overflow (Temporary) at East Side Fence Line.
│   │       │   ROLE: Lot Attendant
│   │       │   Annotate: vehicle's destination zone = West Side of Building
│   │       │   CHANNEL: WhatsApp group
│   │       │   SAY: "RECON vehicle [VIN/stock number] placed in Overflow — belongs in West Side of Building. Move when slot opens."
│   │       │
│   │       └── THEN: → OUTCOME B (vehicle in RECON, placed in Overflow pending West Side slot)
│
└── STEP 3 — Service Department begins RECON work
    ACTION: Service Department Lead assigns technician to RECON work.
    ROLE: Service Department Lead

---

## RECON Completion and Return to Retail Flow

When RECON work is complete:

START — RECON work completed
│
├── Q: Has the Service Department Lead confirmed RECON work is complete?
│   │
│   ├── YES:
│   │   │
│   │   ├── STEP 1: → SEE: vehicle-pdi-routing.md
│   │   │   (Vehicle must be re-PDI'd after RECON work — this is a full PDI, not just a sign-off)
│   │   │
│   │   └── THEN (after re-PDI complete): → STEP 2
│   │
│   └── NO — RECON work is not yet complete:
│       │
│       └── ACTION: Vehicle remains in West Side of Building. No action taken.
│           ROLE: Lot Manager (monitor daily during morning lot walk)
│           CHANNEL: WhatsApp group
│           SAY: "RECON vehicle [VIN/stock number] still in progress. Daily check: update expected completion date."
│
├── STEP 2 (after re-PDI complete): → SEE: vehicle-detailing-routing.md
│   (Vehicle must be detailed after RECON and re-PDI — route to DHD, $60)
│
└── STEP 3 (after detail complete):
    │
    ├── ACTION: Lot team places stock-in tag in bottom-right corner of windshield.
    │   ROLE: Lot Attendant
    │   Tag color: white (not yellow)
    │
    ├── ACTION: Update Airtable status to reflect vehicle is now Front-Line Ready.
    │   ROLE: Lot Manager or Admin
    │
    └── → SEE: vehicle-placement-cage.md
        (Vehicle is now eligible for Cage placement following standard slot rules)

---

## Terminal Outcomes

- **Outcome A:** Vehicle status updated to `IN RECON` in Airtable. Vehicle physically placed in West Side of Building (L1–L5). Service Department Lead has authorized work. RECON work in progress.
- **Outcome B:** Vehicle status updated to `IN RECON` in Airtable. Vehicle physically placed in Overflow (Temporary) pending a West Side of Building slot. Lot team notified via WhatsApp. Move to West Side of Building when slot opens.
- **Outcome C (new arrival blocked):** New vehicle (KM ≤ 1,000) that has not yet had PDI is redirected to standard new arrival process as "Pending PDI." RECON status is NOT applied.
- **Outcome D (RECON complete — retail ready):** RECON work done → re-PDI complete → detail complete → stock-in tag placed → vehicle placed in Cage per slot priority rules. Vehicle is now FLR.

---

## Notes

- **Critical rule:** New vehicle arrivals (KM ≤ 1,000) that have not yet had a PDI are NEVER assigned RECON status. Assigning RECON to a new arrival hides the vehicle from the sales inventory system. Use "Pending PDI" for all new arrivals awaiting first PDI.
- The return-to-retail path after RECON is always: RECON complete → re-PDI (mandatory) → DHD detail ($60) → stock-in tag → Cage placement. No shortcut in this chain is permitted.
- RECON work is authorized by the Service Department Lead — not the Lot Manager acting alone and not the salesperson.
- [NEEDS_INPUT] Maximum duration a vehicle may remain in RECON before a management escalation is required. Source material does not specify a RECON time limit.
- [ASSUMPTION] The re-PDI after RECON completion is treated as a full PDI under the same 2-day Stellantis deadline from the perspective of the re-inspection requirement. This assumption is made because no separate tracking rule for post-RECON PDIs is specified in source material.
