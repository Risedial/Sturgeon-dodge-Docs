# Decision Tree: Vehicle Categorization
**File:** vehicle-categorization.md
**Status:** [COMPLETE]
**Cross-references:**
- vehicle-non-prime-identification.md (non-prime routing — Phase 3B)
- vehicle-placement-cage.md (NEW and FLR vehicles after categorization)
- vehicle-sold-processing.md (SOLD vehicles after categorization)
- vehicle-bnd-handling.md (BND vehicles after categorization)
- vehicle-recon-routing.md (RECON vehicles after categorization)
- vehicle-auction-routing.md (Auction Bound vehicles — Phase 3B)

---

## Trigger
Any vehicle on the lot or arriving on the lot requires a placement category assignment. This tree is executed: (1) when a vehicle first arrives, (2) when a vehicle's Airtable status changes, or (3) during the morning lot walk when a vehicle's category needs to be confirmed or re-evaluated.

## Responsible Role
Lot Manager / Operations Manager (primary — makes final category determination); Lot Attendant (executes physical placement after category is assigned)

---

## Decision Tree

```
START: Vehicle requires category determination
│
├── STEP 1: CHECK AIRTABLE — STOCK HOLDER field FIRST (before any other check)
│   Open Airtable → INVENTORY SYSTEMS → MASTER INVENTORY → locate vehicle by VIN
│   │
│   ├── STOCK HOLDER = "NON PRIME DIVISION":
│   │   ACTION: STOP. Do not assign a placement category.
│   │           Do not place vehicle anywhere on this lot.
│   │   ROLE: Lot Manager
│   │   CHANNEL: WhatsApp group
│   │   SAY: "Vehicle [VIN] confirmed NON PRIME DIVISION. Routing to AB | STURGEON DODGE immediately."
│   │   → SEE: vehicle-non-prime-identification.md
│   │   [TERMINAL — vehicle leaves this lot; no placement category assigned]
│   │
│   └── STOCK HOLDER = "STURGEON DODGE": Continue to STEP 2
│
├── STEP 2: CHECK KM READING (odometer)
│   │
│   ├── KM ≤ 1,000:
│   │   INITIAL CATEGORY = NEW
│   │   → Continue to STEP 3 (check for override)
│   │
│   └── KM > 1,000:
│       INITIAL CATEGORY = not NEW
│       → Continue to STEP 4 (determine category from Airtable status)
│
├── STEP 3: OVERRIDE CHECK — applies to vehicles initially classified as NEW (KM ≤ 1,000)
│   Check Airtable STATUS field:
│   │
│   ├── STATUS = "BOOKED | NOT DELIVERED":
│   │   OVERRIDE: Category = BND (BND overrides NEW)
│   │   ROLE: Lot Manager
│   │   → Continue to STEP 5 (confirm category and route)
│   │
│   ├── STATUS = "SIGNED DEAL":
│   │   OVERRIDE: Category = SOLD (SOLD overrides NEW)
│   │   ROLE: Lot Manager
│   │   → Continue to STEP 5 (confirm category and route)
│   │
│   ├── STATUS = "IN RECON":
│   │   OVERRIDE: Category = RECON (RECON overrides NEW)
│   │   ROLE: Lot Manager
│   │   [NOTE: A new vehicle arriving on lot should NEVER be placed in RECON status.
│   │   This override only applies if the vehicle was already in RECON before this
│   │   categorization check — e.g., PDI revealed mechanical issues.]
│   │   → Continue to STEP 5 (confirm category and route)
│   │
│   ├── STATUS = "VOID | IN STOCK":
│   │   OVERRIDE: Category = FLR (FLR overrides NEW when status is VOID | IN STOCK)
│   │   ROLE: Lot Manager
│   │   → Continue to STEP 5 (confirm category and route)
│   │
│   └── STATUS = any other value (AVAILABLE, DEMO, or no overriding status):
│       Category remains: NEW
│       → Continue to STEP 5 (confirm category and route)
│
├── STEP 4: DETERMINE CATEGORY FROM AIRTABLE STATUS (for vehicles with KM > 1,000)
│   Check Airtable STATUS field:
│   │
│   ├── STATUS = "AVAILABLE" or "DEMO":
│   │   Category = FLR (Front-Line Ready)
│   │   → Continue to STEP 5
│   │
│   ├── STATUS = "SIGNED DEAL" or "WHOLESALE | SOLD":
│   │   Category = SOLD
│   │   → Continue to STEP 5
│   │
│   ├── STATUS = "BOOKED | NOT DELIVERED":
│   │   Category = BND
│   │   → Continue to STEP 5
│   │
│   ├── STATUS = "IN RECON", "INCOMING", "WHOLESALE", or "CHASE":
│   │   Category = RECON
│   │   → Continue to STEP 5
│   │
│   └── STATUS = none of the above / unrecognized:
│       ACTION: Hold vehicle in place. Flag for Lot Manager review.
│       ROLE: Lot Manager
│       CHANNEL: WhatsApp group
│       SAY: "Vehicle [VIN/stock number] has unrecognized Airtable status: [status value].
│             Holding for manual review. Do not move vehicle until category is confirmed."
│       [NEEDS_INPUT — resolve status with management before proceeding]
│       [TERMINAL — resume from STEP 4 once status is clarified]
│
└── STEP 5: CONFIRM CATEGORY AND ROUTE TO APPROPRIATE NEXT STEP
    │
    ├── Category = NEW:
    │   ACTION: Confirm vehicle has completed PDI and full detail.
    │   │
    │   ├── PDI and detail complete → stock-in tag placed → route to Cage
    │   │   → SEE: vehicle-placement-cage.md
    │   │
    │   └── PDI and/or detail NOT complete → route through PDI → detail flow first
    │       → SEE: vehicle-pdi-routing.md
    │
    ├── Category = FLR:
    │   ACTION: Confirm vehicle has completed PDI and full detail.
    │   │
    │   ├── PDI and detail complete → stock-in tag placed → route to Cage
    │   │   → SEE: vehicle-placement-cage.md
    │   │
    │   └── PDI and/or detail NOT complete → route through PDI → detail flow first
    │       → SEE: vehicle-pdi-routing.md
    │
    ├── Category = SOLD:
    │   ACTION: Confirm sold sign with customer name is placed.
    │           Route to East Side Fence Line.
    │   → SEE: vehicle-sold-processing.md
    │
    ├── Category = BND:
    │   ACTION: Confirm sold sign with customer name is placed.
    │           Route to East Side Fence Line.
    │   → SEE: vehicle-bnd-handling.md
    │
    └── Category = RECON:
        ACTION: Route to West Side of Building.
        → SEE: vehicle-recon-routing.md
```

---

## Terminal Outcomes

- **Outcome A — Category = NEW, PDI+detail complete:** Vehicle confirmed NEW; routed to Cage via vehicle-placement-cage.md.
- **Outcome B — Category = NEW, PDI/detail incomplete:** Vehicle confirmed NEW; routed through PDI and detail flow first.
- **Outcome C — Category = FLR, PDI+detail complete:** Vehicle confirmed FLR; routed to Cage via vehicle-placement-cage.md.
- **Outcome D — Category = FLR, PDI/detail incomplete:** Vehicle confirmed FLR; routed through PDI and detail flow first.
- **Outcome E — Category = SOLD:** Vehicle confirmed SOLD; routed to East Side Fence Line via vehicle-sold-processing.md.
- **Outcome F — Category = BND:** Vehicle confirmed BND; routed to East Side Fence Line via vehicle-bnd-handling.md.
- **Outcome G — Category = RECON:** Vehicle confirmed RECON; routed to West Side of Building via vehicle-recon-routing.md.
- **Outcome H — NON PRIME DIVISION:** Vehicle confirmed non-prime; exits this lot immediately via vehicle-non-prime-identification.md.
- **Outcome I — Unrecognized status:** Vehicle held in place; Lot Manager manually resolves status before categorization resumes.

---

## Notes

- **STOCK HOLDER check is always STEP 1 — no exceptions.** A vehicle must be confirmed as "STURGEON DODGE" before any categorization decision is made. This prevents non-prime vehicles from being accidentally processed on this lot.
- **KM ≤ 1,000 is the NEW category trigger, regardless of Airtable status** — UNLESS an override applies (BND, SOLD, RECON, FLR override statuses take precedence over the KM rule).
- **New vehicles arriving on the lot must NEVER be given "RECON" status.** If a new arrival's status is "IN RECON" in Airtable, this is a misclassification error that must be corrected immediately. New arrivals are "Pending PDI" — Airtable status should be AVAILABLE. [ASSUMPTION: Airtable entry for new arrivals should be corrected to AVAILABLE immediately upon arrival, before PDI begins]
- **RECON override for NEW applies only post-PDI.** A new vehicle that arrives and needs PDI is "Pending PDI" (AVAILABLE in Airtable). It only moves to RECON category if PDI reveals mechanical issues requiring reconditioning work.
