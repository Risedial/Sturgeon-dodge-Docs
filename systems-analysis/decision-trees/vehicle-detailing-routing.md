# Decision Tree: Vehicle Detailing Routing
**File:** vehicle-detailing-routing.md
**Status:** [COMPLETE]
**Cross-references:**
- vehicle-pdi-routing.md (trigger — PDI must be complete before detailing begins)
- vehicle-placement-cage.md (next step after detailing complete)
- vehicle-categorization.md (used to confirm vehicle category before placement)

---

## Trigger
A vehicle's PDI has been marked complete in the manufacturer system by a service technician. The vehicle now requires full detail before it can be placed in the Cage or delivered to a customer.

## Responsible Role
Lot Manager / Operations Manager (primary); Lot Attendant (assists with physical staging and inspection)

---

## Decision Tree

```
START: PDI marked complete in manufacturer system — vehicle needs detailing
│
├── Q1: HAS PDI BEEN CONFIRMED COMPLETE IN THE MANUFACTURER SYSTEM?
│   (Verbal confirmation is NOT sufficient — technician must have marked it in the system)
│   │
│   ├── NO:
│   │   ACTION: Do not route vehicle to DHD. Return vehicle to service department.
│   │   ROLE: Lot Manager
│   │   CHANNEL: Direct communication with Service Department Lead + WhatsApp group
│   │   SAY: "PDI for [VIN/stock number] has not been marked complete in the manufacturer
│   │         system. Vehicle cannot proceed to detailing until PDI is recorded. Please
│   │         complete and mark in system."
│   │   THEN: Wait for PDI to be confirmed in manufacturer system. Resume this tree from Q1.
│   │
│   └── YES: Continue to Q2
│
├── Q2: DOES THE VEHICLE REQUIRE A FULL DETAIL OR ONLY A QUICK WASH?
│   │
│   ├── FULL DETAIL REQUIRED (new vehicle completing PDI; used vehicle; any vehicle
│   │   flagged as needing full detail; trade-in going to retail):
│   │   │
│   │   └── Continue to Q3 (DHD routing)
│   │
│   └── QUICK WASH ONLY (vehicle has been detailed or is brand new but exterior is
│       lightly soiled — minor surface dirt only):
│       │
│       ACTION: Route vehicle to Hughes for quick wash.
│       ROLE: Lot Attendant
│       CHANNEL: WhatsApp group (document routing)
│       SAY: "Vehicle [VIN/stock number] routed to Hughes — quick wash. Exterior lightly
│             soiled only. No full detail required."
│       THEN: After Hughes returns vehicle → Q6 (post-detail inspection)
│
├── Q3: ROUTE VEHICLE TO DHD FOR FULL DETAIL
│   │
│   ACTION: Contact DHD and communicate vehicle details.
│   ROLE: Lot Manager or Lot Attendant
│   CHANNEL: Direct communication with DHD
│   COMMUNICATE: Vehicle location on lot, VIN, stock number, expected turnaround requirement
│   │
│   ACTION: Document DHD routing in WhatsApp group.
│   ROLE: Lot Manager
│   CHANNEL: WhatsApp group
│   SAY: "Vehicle [VIN/stock number] routed to DHD for full detail. Cost: $60. PDI confirmed
│         complete."
│   │
│   └── THEN: Wait for DHD to complete detail and return vehicle → Q4
│
├── Q4: HAS DHD RETURNED THE VEHICLE?
│   │
│   ├── NO:
│   │   ACTION: Allow DHD to complete work. Monitor for return.
│   │   ROLE: Lot Manager
│   │   [No further action until vehicle is returned]
│   │
│   └── YES: Continue to Q5 (physical inspection)
│
├── Q5: INSPECT RETURNED VEHICLE — DOES IT MEET ALL FLR DETAIL STANDARDS?
│   Check ALL of the following simultaneously:
│   - Exterior panels: free of all visible dirt and debris
│   - All manufacturer/transport stickers: removed completely
│   - All tape: removed completely (seals, labels, protective wrap)
│   - Interior: clean (no debris, no residue)
│   │
│   ├── NO — vehicle fails inspection on any item:
│   │   ACTION: Do NOT accept the vehicle. Return to DHD immediately.
│   │   ROLE: Lot Manager or Lot Attendant
│   │   CHANNEL: Direct communication with DHD
│   │   SAY: "This vehicle is not ready — [state specific issue: e.g., sticker still on
│   │         rear door / tape residue on hood / dirt on passenger side panels]. Please redo it."
│   │   THEN: Return to Q4 when DHD brings vehicle back again
│   │
│   └── YES — vehicle passes all inspection criteria: Continue to Q6
│
├── Q6: PLACE STOCK-IN TAG ON VEHICLE
│   │
│   ACTION: Confirm Admin — Stock Tags (Jorja) or Admin/Tech (Giselle) has prepared
│           a stock-in tag for this vehicle.
│   ROLE: Lot Attendant
│   │
│   ├── STOCK-IN TAG NOT YET PREPARED:
│   │   ACTION: Notify Admin — Stock Tags (Jorja) or Admin/Tech (Giselle) to prepare tag.
│   │   ROLE: Lot Attendant
│   │   CHANNEL: Direct communication or WhatsApp group
│   │   SAY: "Need stock-in tag for [VIN/stock number] — vehicle just completed detail
│   │         and is ready for Cage placement."
│   │   THEN: Wait for tag. Proceed to next step once tag is received.
│   │
│   └── STOCK-IN TAG READY:
│       ACTION: Place stock-in tag on vehicle — bottom-right corner of windshield.
│               White tag. No exceptions to placement location.
│       ROLE: Lot Attendant
│       THEN: Continue to Q7
│
└── Q7: ROUTE VEHICLE TO CAGE PLACEMENT
    │
    ACTION: Vehicle is now detail-complete, PDI-complete, and tagged. Route to Cage.
    ROLE: Lot Attendant
    → SEE: vehicle-placement-cage.md
    [TERMINAL — this tree is complete; vehicle proceeds to Cage placement]
```

---

## Terminal Outcomes

- **Outcome A — Vehicle successfully detailed and routed to Cage placement:** PDI confirmed complete → routed to DHD → full detail completed → inspection passed → stock-in tag placed → routed to Cage. This is the standard successful outcome.
- **Outcome B — Vehicle rejected and returned to DHD:** DHD returned vehicle but it failed the post-detail inspection. Vehicle sent back to DHD for redo. Tree resumes at Q4 after redo.
- **Outcome C — Vehicle routed to Hughes (quick wash):** Vehicle was brand new or previously detailed with only light exterior soiling. Quick wash at Hughes sufficient. Post-wash inspection applied (Q6) before stock-in tag and Cage placement.
- **Outcome D — Vehicle held pending PDI confirmation:** PDI not yet marked in manufacturer system. Vehicle held until PDI is confirmed. Detailing cannot begin.

---

## Notes

- **DHD is the only vendor for full detail.** Cost: $60 per vehicle. No alternative full-detail vendor is used at the Edmonton Office.
- **Hughes** is used only when a vehicle has been detailed or is brand new with a lightly soiled exterior. A Hughes wash alone does not meet the full detail standard for front-line placement when a full detail is truly required.
- **Turnaround time from DHD varies by vehicle condition.** No consistent turnaround time is guaranteed. [NEEDS_INPUT — turnaround SLA if one exists]
- **Stock-in tag placement is mandatory before Cage placement.** A vehicle without a stock-in tag in the bottom-right windshield corner is not cleared for the Cage.
- **Do not skip post-detail inspection.** A vehicle delivered without complete detailing resulted in a $275 rework cost (confirmed incident). The post-detail inspection at the dealership prevents this from recurring.
