# Decision Tree: Vehicle Placement — Cage
**File:** vehicle-placement-cage.md
**Status:** [COMPLETE]
**Cross-references:**
- vehicle-categorization.md (category must be confirmed before this tree is used)
- vehicle-detailing-routing.md (detail must be complete before Cage placement)
- vehicle-pdi-routing.md (PDI must be complete before Cage placement)
- vehicle-bnd-handling.md (BND vehicles do NOT go to Cage)
- vehicle-sold-processing.md (SOLD vehicles do NOT go to Cage)

---

## Trigger
A vehicle has been confirmed as category NEW or FLR, has completed PDI (marked in manufacturer system), has completed full detail, and has a stock-in tag placed in the bottom-right corner of the windshield. The vehicle is ready for Cage placement.

## Responsible Role
Lot Attendant (executes physical placement); Lot Manager / Operations Manager (determines slot assignment and confirms all conditions are met before placement)

---

## Decision Tree

```
START: Vehicle ready for Cage placement (PDI complete + fully detailed + stock-in tag placed)
│
├── PRE-CHECK 1: CONFIRM ALL CAGE CONDITIONS ARE MET
│   Verify ALL of the following before moving vehicle into any Cage slot:
│   - [ ] PDI marked complete in manufacturer system (not just verbal — confirmed in system)
│   - [ ] Full detail complete — no visible dirt, no stickers, no tape anywhere on vehicle
│   - [ ] Stock-in tag placed in bottom-right corner of windshield (white tag)
│   - [ ] Vehicle category is NEW or FLR (confirmed via vehicle-categorization.md)
│   │
│   ├── ANY CONDITION NOT MET:
│   │   ACTION: Do not place vehicle in Cage. Route to correct step first.
│   │   ROLE: Lot Manager
│   │   │
│   │   ├── PDI not complete → SEE: vehicle-pdi-routing.md
│   │   ├── Detail not complete → SEE: vehicle-detailing-routing.md
│   │   ├── Stock-in tag missing → contact Admin — Stock Tags (Jorja) or Admin/Tech
│   │   │   (Giselle) for tag; place tag before proceeding
│   │   └── Category not NEW or FLR → SEE: vehicle-categorization.md
│   │
│   └── ALL CONDITIONS MET: Continue to Q1
│
├── Q1: ARE THERE ANY OPEN SLOTS IN THE CAGE (out of 20 fixed slots C01–C20)?
│   │
│   ├── NO — ALL 20 SLOTS ARE OCCUPIED:
│   │   │
│   │   ├── Q1a: ARE ALL CAGE VEHICLES CORRECTLY PLACED?
│   │   │   (Is there any vehicle in the Cage that should not be there — wrong category,
│   │   │   not PDI'd, not detailed, wrong status?)
│   │   │   │
│   │   │   ├── YES — a vehicle in the Cage should be moved:
│   │   │   │   ACTION: Identify vehicle to be moved. Confirm its correct zone.
│   │   │   │           Move it to the correct zone first. Then place the new vehicle in the
│   │   │   │           vacated slot using slot rules below.
│   │   │   │   ROLE: Lot Manager
│   │   │   │   CHANNEL: WhatsApp group
│   │   │   │   SAY: "Moving [VIN] out of Cage to [correct zone] — incorrect placement.
│   │   │   │         Replacing with [new VIN]."
│   │   │   │   THEN: Proceed to Q2 (slot assignment)
│   │   │   │
│   │   │   └── NO — all 20 Cage vehicles are correctly placed:
│   │   │       ACTION: Place vehicle in Overflow (Temporary). Label with
│   │   │               destination annotation: "Belongs in Cage."
│   │   │               Stage physically at East Side Fence Line area.
│   │   │       ROLE: Lot Attendant
│   │   │       CHANNEL: WhatsApp group
│   │   │       SAY: "Vehicle [VIN/stock number] placed in Overflow (Temporary) — destination
│   │   │             Cage. Will move to Cage when slot opens."
│   │   │       THEN: Monitor Cage daily. When any slot opens, move vehicle from
│   │   │             Overflow (Temporary) to Cage immediately.
│   │   │       [TERMINAL — this placement event ends; resume when Cage slot opens]
│   │   │
│   └── YES — at least one Cage slot is open: Continue to Q2
│
├── Q2: DETERMINE CORRECT SLOT FOR THIS VEHICLE
│   Apply slot rules in the following priority order:
│   │
│   ├── SLOT C01 — IS THIS SLOT EMPTY?
│   │   │
│   │   ├── YES:
│   │   │   ├── Is this vehicle a Compass or Wrangler, AND category = NEW?
│   │   │   │   ├── YES: Place vehicle in C01. → PROCEED TO PHYSICAL PLACEMENT (Q3)
│   │   │   │   └── NO: Leave C01 empty. Do not fill C01 with any other vehicle.
│   │   │   │           Continue to C02–C03 assessment.
│   │   │   └── NO (C01 is occupied): Continue to C02–C03 assessment.
│   │   │
│   ├── SLOTS C02–C03 — ARE THESE SLOTS EMPTY (either or both)?
│   │   │
│   │   ├── YES (one or both empty):
│   │   │   ├── Is this vehicle a NEW SUV (NOT a Durango)?
│   │   │   │   ├── YES: Place in C02 or C03 (lowest numbered open slot first).
│   │   │   │   │       → PROCEED TO PHYSICAL PLACEMENT (Q3)
│   │   │   │   └── NO NEW non-Durango SUV available:
│   │   │   │       ├── Is this vehicle a NEW Van or Truck?
│   │   │   │       │   ├── YES: Place in C02 or C03 as fallback.
│   │   │   │       │   │       → PROCEED TO PHYSICAL PLACEMENT (Q3)
│   │   │   │       │   └── NO: Leave C02–C03 for qualifying vehicles.
│   │   │   │       │           Continue to C04–C07 assessment.
│   │   │   └── NO (both occupied): Continue to C04–C07 assessment.
│   │   │
│   ├── SLOTS C04–C07 — ARE ANY OF THESE SLOTS EMPTY?
│   │   │
│   │   ├── YES (one or more empty):
│   │   │   ├── Is this vehicle category NEW?
│   │   │   │   ├── YES: Place in the lowest-numbered open C04–C07 slot.
│   │   │   │   │       → PROCEED TO PHYSICAL PLACEMENT (Q3)
│   │   │   │   └── NO (vehicle is FLR): Continue to C12–C13 assessment.
│   │   │   └── NO (all occupied): Continue to C12–C13 assessment.
│   │   │
│   ├── SLOTS C12–C13 — ARE ANY OF THESE SLOTS EMPTY?
│   │   │
│   │   ├── YES (one or both empty):
│   │   │   ├── Is this vehicle a Truck (NEW or FLR)?
│   │   │   │   ├── YES: Place in C12 or C13 (lowest numbered open slot first).
│   │   │   │   │       → PROCEED TO PHYSICAL PLACEMENT (Q3)
│   │   │   │   └── NO: Vehicle not a truck — fallback applies.
│   │   │   │       Is any other NEW or FLR vehicle available and no better slot applies?
│   │   │   │       ├── YES: Place in C12 or C13 as fallback.
│   │   │   │       │       → PROCEED TO PHYSICAL PLACEMENT (Q3)
│   │   │   │       └── NO: Continue to remainder slots.
│   │   │   └── NO (both occupied): Continue to remainder slots.
│   │   │
│   └── SLOTS C08–C11, C14–C20 (11 REMAINDER SLOTS) — ANY OPEN?
│       │
│       ├── YES:
│       │   ACTION: Apply brand and body type sort to determine exact slot.
│       │   Sort order within remainder slots:
│       │     1st: Brand priority — Jeep (1), Ram (2), Chrysler (3), Dodge (4), others (5)
│       │     2nd: Body type priority — SUV (1), Van (2), Truck (3), Sedan (4)
│       │     3rd: Year — newer year gets higher-priority slot
│       │     4th: Days-in-stock — highest days-in-stock (oldest) gets higher-priority slot
│       │   Place vehicle in the slot determined by this sort order.
│       │   → PROCEED TO PHYSICAL PLACEMENT (Q3)
│       │
│       └── NO — all 20 slots occupied and all correctly placed:
│           ACTION: Place in Overflow (Temporary) with destination = Cage annotation.
│           → SEE: Overflow handling in Q1 above
│           [TERMINAL — Overflow placement]
│
├── Q3: PHYSICAL PLACEMENT IN ASSIGNED SLOT
│   │
│   ACTION: Move vehicle to assigned Cage slot.
│   ROLE: Lot Attendant
│   │
│   ├── VERIFY FACING DIRECTION:
│   │   Vehicle must face outward toward customers.
│   │   If not facing outward: reposition before completing placement.
│   │
│   ├── VERIFY DOOR SPACING:
│   │   Confirm both doors can fully open on both sides of the vehicle.
│   │   If doors cannot open fully: adjust spacing before completing placement.
│   │   (Move adjacent vehicles if necessary to create adequate spacing)
│   │
│   └── VERIFY STOCK-IN TAG IS VISIBLE:
│       Confirm white stock-in tag is in bottom-right windshield corner.
│       If missing: do not complete placement. Obtain tag first.
│
└── Q4: POST-PLACEMENT CHECK — CAGE FULLNESS
    │
    ACTION: After placement, confirm Cage status.
    ROLE: Lot Manager
    │
    ├── CAGE HAS MORE THAN ONE EMPTY STALL:
    │   ACTION: Immediately identify the next vehicle to fill the empty stall(s).
    │   ROLE: Lot Manager
    │   CHANNEL: WhatsApp group
    │   SAY: "Cage has [number] empty stall(s). Identifying FLR/NEW inventory to fill.
    │         [VIN/stock number] to be moved in next."
    │   THEN: Execute additional placements until Cage has no more than 1 empty stall.
    │
    └── CAGE HAS 0 OR 1 EMPTY STALLS:
        ACTION: Placement complete. No further action required.
        ROLE: Lot Manager
        CHANNEL: WhatsApp group (document placement)
        SAY: "Vehicle [VIN/stock number] placed in Cage slot [slot number]. Cage status:
              [full / 1 empty stall from recent sale]."
        [TERMINAL — placement complete]
```

---

## Terminal Outcomes

- **Outcome A — Vehicle placed in specific Cage slot (C01–C20):** All pre-conditions met; slot assignment rules applied; vehicle physically placed facing outward with adequate door spacing and stock-in tag visible.
- **Outcome B — Vehicle placed in Overflow (Temporary), Cage full:** All 20 Cage slots occupied with correctly placed vehicles; vehicle staged at East Side Fence Line with destination annotation = Cage; to be moved when Cage slot opens.
- **Outcome C — Pre-condition not met, vehicle held:** PDI, detail, or stock-in tag requirement not met; vehicle held and routed to correct upstream step before this tree resumes.
- **Outcome D — Incorrectly placed Cage vehicle moved out, new vehicle placed in vacated slot:** An existing Cage vehicle was identified as incorrectly placed; moved to correct zone; new vehicle placed in vacated slot.

---

## Notes

- **C01 stays empty if no Compass or Wrangler (NEW) is available.** Do not fill C01 with any other vehicle type or category.
- **C02–C03: Durango is excluded from the SUV preference.** A Durango does not qualify as the preferred SUV for C02–C03. Use the Van or Truck fallback instead.
- **Maximum 1 empty stall permitted in the Cage at any time** — and only if that vehicle was just sold. If a sold vehicle creates a gap and FLR/NEW inventory is available, fill the gap immediately.
- **Sedans are the lowest body type priority** and are the first to overflow out of the Cage when capacity is reached. Overflowed sedans route to East Side Fence Line.
- **Days-in-stock tiebreaker:** When two vehicles compete for the same slot and all other sort criteria are equal, the vehicle with the highest days-in-stock (longest time on the lot) gets the higher-priority Cage slot.
- [ASSUMPTION]: The slot number annotation (C01–C20) is tracked by the Lot Manager but not necessarily marked physically on the ground. The priority order governs slot selection decisions.
