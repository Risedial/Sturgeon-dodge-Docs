# Decision Tree: New Vehicle Arrival — Standard (Not Ship Mode)
**File:** vehicle-arrival-new-standard.md
**Status:** [COMPLETE]
**Cross-references:**
- vehicle-arrival-ship-mode.md (ship mode redirect)
- vehicle-pdi-routing.md (PDI routing after arrival)
- vehicle-pdi-compliance-deadline.md (2-day deadline monitoring)
- vehicle-detailing-routing.md (post-PDI detail routing)
- vehicle-placement-cage.md (Cage placement after detail)
- vehicle-non-prime-identification.md (non-prime routing — Phase 3B)

---

## Trigger
A new vehicle (factory transport, KM ≤ 1,000) arrives at the Edmonton Office lot and is NOT in ship mode (battery is connected, software is in normal operating state).

## Responsible Role
Lot Manager / Operations Manager (primary); Lot Attendant (assists with physical steps)

---

## Decision Tree

```
START: New vehicle arrives on lot
│
├── Q1: IS THIS VEHICLE IN SHIP MODE?
│   (Is the battery disconnected? Is software in low-power/transport mode?)
│   │
│   ├── YES:
│   │   └── ACTION: STOP. Do not process this vehicle under this tree.
│   │       ROLE: Lot Manager
│   │       → SEE: vehicle-arrival-ship-mode.md
│   │       [This tree handles non-ship-mode arrivals ONLY]
│   │
│   └── NO: Continue to Q2
│
├── Q2: CHECK AIRTABLE — STOCK HOLDER field
│   Open Airtable → INVENTORY SYSTEMS → MASTER INVENTORY → locate vehicle by VIN
│   │
│   ├── STOCK HOLDER = "NON PRIME DIVISION":
│   │   ACTION: Do NOT process vehicle on this lot.
│   │   ROLE: Lot Manager
│   │   CHANNEL: WhatsApp group (document action taken)
│   │   SAY: "Vehicle [VIN] confirmed NON PRIME DIVISION. Routing to AB | STURGEON DODGE immediately."
│   │   → SEE: vehicle-non-prime-identification.md
│   │   [TERMINAL — vehicle leaves this lot]
│   │
│   └── STOCK HOLDER = "STURGEON DODGE": Continue to Q3
│
├── Q3: DOES VEHICLE HAVE A VIN?
│   │
│   ├── NO:
│   │   ACTION: Hold vehicle in place. Flag for Lot Manager manual review.
│   │   ROLE: Lot Manager
│   │   CHANNEL: WhatsApp group
│   │   SAY: "Vehicle arrived without VIN. Holding for manual verification before any processing."
│   │   [Do not move vehicle or enter it in any system until VIN is confirmed]
│   │   THEN: Resume this tree from Q3 once VIN is confirmed
│   │
│   └── YES: Continue to Q4
│
├── Q4: SET VEHICLE STATUS IN AIRTABLE
│   ACTION: Set Airtable status to AVAILABLE (Pending PDI).
│   ROLE: Lot Manager or Admin — Stock Tags (Jorja) / Admin/Tech (Giselle)
│   CRITICAL: NEVER use status "IN RECON" for a new arrival.
│             RECON status hides the vehicle from the sales inventory system.
│             Sales staff cannot see or sell a vehicle with IN RECON status.
│   NOTE: The 2-day Stellantis PDI clock starts NOW — from this vehicle's
│         delivery date to the dealership, NOT from when paperwork is finalized.
│   THEN: Continue to Q5
│
├── Q5: OBTAIN STOCK-IN TAG
│   ACTION: Contact Admin — Stock Tags (Jorja) or Admin/Tech (Giselle) to fill out
│           a white stock-in tag for this vehicle.
│   ROLE: Lot Attendant or Lot Manager (requests tag); Jorja or Giselle (fills tag)
│   CHANNEL: In-person at Admin desk or via WhatsApp
│   SAY: "New vehicle arrived — [Year] [Make] [Model], VIN [VIN]. Need a stock-in tag."
│   ACTION: Once tag is received, place it in the bottom-right corner of the windshield.
│   ROLE: Lot Attendant
│   THEN: Continue to Q6
│
├── Q6: ROUTE VEHICLE TO PDI
│   ACTION: Notify service department of new arrival requiring PDI.
│   ROLE: Lot Manager
│   CHANNEL: Direct communication (in-person or phone) + WhatsApp group for documentation
│   SAY: "New vehicle arrived for PDI — stock number [STOCK#], VIN [VIN].
│         Arrival date [DATE]. PDI deadline: [DATE + 2 calendar days].
│         Please schedule immediately."
│   → SEE: vehicle-pdi-routing.md (for full PDI routing procedure)
│   → SEE: vehicle-pdi-compliance-deadline.md (for 2-day deadline monitoring)
│   THEN: Continue to Q7 (monitoring — runs in parallel with PDI)
│
├── Q7: MONITOR PDI DEADLINE
│   → SEE: vehicle-pdi-compliance-deadline.md
│   [Run deadline monitoring in parallel while vehicle is in service for PDI]
│   THEN: Wait for PDI COMPLETE confirmation from technician
│
├── Q8: PDI COMPLETE — CONFIRMED IN MANUFACTURER SYSTEM?
│   (Verbal "done" from technician is NOT sufficient. Technician must have marked
│    PDI complete in the manufacturer system.)
│   │
│   ├── NO (not yet marked in system):
│   │   ACTION: Follow up with Service Department Lead.
│   │   ROLE: Lot Manager
│   │   CHANNEL: Direct communication
│   │   SAY: "Can you confirm PDI for [VIN] is marked complete in the manufacturer system?
│   │         We need the system entry, not just the physical inspection being done."
│   │   THEN: Return to Q8
│   │
│   └── YES (marked complete in manufacturer system): Continue to Q9
│
├── Q9: DID PDI REVEAL ANY MECHANICAL ISSUES?
│   │
│   ├── YES — Mechanical issues found:
│   │   ACTION: Update Airtable status to IN RECON.
│   │   ACTION: Move vehicle to West Side of Building (slots L1–L5).
│   │   ROLE: Lot Attendant (physical move); Lot Manager (Airtable update)
│   │   CHANNEL: WhatsApp group
│   │   SAY: "Vehicle [VIN] — PDI revealed mechanical issues. Moving to West Side of Building
│   │         for recon. Status updated to IN RECON."
│   │   → SEE: vehicle-recon-routing.md
│   │   NOTE: Vehicle does NOT return to this tree until recon is complete, re-PDI'd, and
│   │         detailed. At that point, resume from Q10.
│   │
│   └── NO — PDI complete, no mechanical issues: Continue to Q10
│
├── Q10: ROUTE VEHICLE TO DHD FOR DETAIL
│   → SEE: vehicle-detailing-routing.md
│   ACTION: Contact DHD to schedule full detail for this vehicle.
│   ROLE: Lot Manager or Lot Attendant
│   CHANNEL: Direct contact with DHD
│   SAY: "Vehicle for full detail — [Year] [Make] [Model], VIN [VIN], located at [zone/slot].
│         Cost: $60. Please confirm turnaround."
│   THEN: Wait for DHD to confirm vehicle is ready and return it
│
├── Q11: DOES VEHICLE PASS DETAIL INSPECTION ON RETURN FROM DHD?
│   Check: No visible dirt or debris on any exterior panel, no stickers, no tape.
│   │
│   ├── NO — Vehicle fails inspection:
│   │   ACTION: Do NOT accept vehicle. Return to DHD for redo.
│   │   ROLE: Lot Manager or Lot Attendant
│   │   SAY: "This vehicle is not ready — [specific issue: describe what is wrong].
│   │         Please redo it."
│   │   THEN: Return to Q11 once DHD brings vehicle back again
│   │
│   └── YES — Vehicle passes inspection: Continue to Q12
│
├── Q12: CONFIRM STOCK-IN TAG IS PRESENT
│   (Stock-in tag must be in bottom-right corner of windshield before Cage placement)
│   │
│   ├── Tag NOT present:
│   │   ACTION: Obtain replacement tag from Jorja or Giselle. Place in bottom-right
│   │           corner of windshield before proceeding.
│   │   ROLE: Lot Attendant
│   │   THEN: Continue to Q13
│   │
│   └── Tag present: Continue to Q13
│
└── Q13: PLACE VEHICLE IN CAGE
    → SEE: vehicle-placement-cage.md (for slot assignment rules)
    │
    ├── Cage slot available:
    │   ACTION: Move vehicle to assigned Cage slot per slot priority rules.
    │   ROLE: Lot Attendant
    │   ENSURE: Vehicle is facing outward; doors can fully open; stock-in tag visible
    │   CHANNEL: WhatsApp group (document placement)
    │   SAY: "Vehicle [VIN] ([Year] [Make] [Model]) placed in Cage slot [SLOT#].
    │         PDI complete. Fully detailed. Stock-in tag placed."
    │   [TERMINAL — vehicle is now on display, available for sale]
    │
    └── Cage is full (all 20 slots occupied):
        ACTION: Place vehicle in Overflow (Temporary).
        ROLE: Lot Attendant
        ANNOTATE: Mark vehicle with destination annotation: "→ Cage"
        Physical location: East Side Fence Line area
        CHANNEL: WhatsApp group
        SAY: "Vehicle [VIN] PDI complete and detailed. Cage full — staging in
              Overflow (Temporary) at East Side Fence Line. Destination: Cage.
              Will move when Cage slot opens."
        ACTION: When any Cage slot opens, move vehicle immediately.
        [TERMINAL — vehicle is in Overflow pending Cage slot]
```

---

## Terminal Outcomes

- **OUTCOME 1 — Vehicle in Cage:** Vehicle completed PDI, detail, and tagging. Placed in Cage slot per priority rules. Available for sale on display.
- **OUTCOME 2 — Vehicle in Overflow (Temporary):** Vehicle completed PDI, detail, and tagging. Cage full at time of placement. Staged in Overflow at East Side Fence Line with "→ Cage" destination annotation. Moves to Cage when slot opens.
- **OUTCOME 3 — Vehicle in RECON (West Side of Building):** PDI revealed mechanical issues. Vehicle moved to West Side of Building with IN RECON status. Will rejoin this flow at Q10 after recon complete and re-PDI'd.
- **OUTCOME 4 — Vehicle routed to AB | STURGEON DODGE:** STOCK HOLDER = "NON PRIME DIVISION" confirmed. Vehicle leaves Edmonton Office lot immediately.
- **OUTCOME 5 — Vehicle held pending VIN confirmation:** No VIN on vehicle at arrival. Held in place until VIN confirmed, then processing resumes.

---

## Notes

- **[CRITICAL] Clock starts at delivery date:** The Stellantis 2-day PDI window begins when the vehicle is delivered to the dealership — NOT when processing starts, NOT when paperwork is completed. Day 0 = delivery date.
- **[CRITICAL] NEVER use "IN RECON" for new arrivals:** This hides the vehicle from the sales inventory system. The only correct status for a new arrival awaiting PDI is AVAILABLE (Pending PDI). This is a confirmed failure mode at the Edmonton Office (see: failure-modes.md FM-05).
- **[AMBIGUOUS] DHD vs. DHG:** Source material uses "DHG" in the walkthrough transcript and "DHD" in CLAUDE.md. Both refer to the same primary detailing vendor ($60/vehicle). CLAUDE.md canonical name is "DHD" — used throughout this tree. Verify vendor name before finalizing.
- **[NEEDS_INPUT] Stock-in tag exact fields:** Fields confirmed as Year, Make, Model. Full field list should be confirmed with Jorja or Giselle before finalizing.
- **[NEEDS_INPUT] Service Department Lead contact:** Who is the specific contact at service for PDI routing requests? Channel: direct communication + WhatsApp. Contact name unconfirmed.
