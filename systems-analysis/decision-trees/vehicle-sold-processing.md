# Decision Tree: Vehicle Sold Processing
**File:** vehicle-sold-processing.md
**Status:** [COMPLETE]
**Cross-references:**
- vehicle-trade-in-processing.md (if trade-in is part of the deal)
- vehicle-bnd-handling.md (if deal is booked but delivery has not yet occurred)
- vehicle-pdi-routing.md (PDI must be confirmed complete before delivery to customer)
- vehicle-placement-cage.md (Cage slot freed up when sold vehicle is moved out)

---

## Trigger
A vehicle sale has been completed — the deal has been signed. This tree is activated the moment a sale is confirmed, regardless of when the customer will take physical delivery.

## Responsible Role
Salesperson (immediate sold sign placement and communication); Lot Manager / Operations Manager (zone movement and compliance verification); Lot Attendant (physical vehicle movement)

---

## Decision Tree

```
START: Sale completed — deal signed for vehicle [VIN/stock number]
│
├── IMMEDIATE ACTION 1: PLACE SOLD SIGN — DO THIS FIRST, BEFORE ANYTHING ELSE
│   │
│   ACTION: Go upstairs to get a sold sign and a Sharpie.
│           Write the customer's full name on the sold sign.
│           Place the signed sold sign visibly inside the vehicle.
│   ROLE: Salesperson (primary) — salesperson places sign immediately
│         OR Salesperson requests lot team to place sign via team chat
│   CHANNEL: If requesting lot team → WhatsApp group
│   SAY (if requesting lot team): "Hey, please go put a sold sign in [VIN / stock number /
│         vehicle description]. Customer name: [CUSTOMER NAME]."
│   │
│   ├── SOLD SIGN NOT PLACED WITHIN REASONABLE TIME:
│   │   ACTION: Lot Manager initiates 3-strike escalation protocol directed at
│   │           Sales Manager (Kevin).
│   │   Strike 1 — ROLE: Lot Manager → CHANNEL: Direct or WhatsApp
│   │             SAY: "Hey, Kevin, do you mind getting your guys to put a sold sign in there?"
│   │   Strike 2 — ROLE: Lot Manager → CHANNEL: Direct or WhatsApp
│   │             SAY: "Hey, Kevin, do you mind?"
│   │   Strike 3 — ROLE: Lot Manager → CHANNEL: Direct, in-person preferred
│   │             SAY: "Kev, killing me, buddy. Can you just tell me the stuff and I'll do
│   │                   it, because we have to be organized."
│   │   EXPECTED RESULT: Sales Manager places sign himself.
│   │
│   └── SOLD SIGN PLACED: Continue to IMMEDIATE ACTION 2
│
├── IMMEDIATE ACTION 2: COMMUNICATE DEAL DETAILS TO LOT TEAM
│   │
│   ACTION: Notify lot team of the sale via team chat.
│   ROLE: Salesperson
│   CHANNEL: WhatsApp group
│   SAY: "Deal signed for [VIN / stock number]. Customer name: [CUSTOMER NAME].
│         Expected delivery: [DATE]. Trade-in: [YES — [make/model/year description] /
│         NO]."
│   │
│   └── Continue to Q1
│
├── Q1: IS THERE A TRADE-IN INVOLVED IN THIS DEAL?
│   │
│   ├── YES:
│   │   ACTION: Process trade-in simultaneously and independently from sold vehicle.
│   │   ROLE: Lot Attendant
│   │   → SEE: vehicle-trade-in-processing.md
│   │   [Trade-in processing runs in parallel — do not delay sold vehicle processing
│   │   while waiting for trade-in processing to complete]
│   │   THEN: Continue to Q2
│   │
│   └── NO: Continue to Q2
│
├── Q2: MOVE SOLD VEHICLE OUT OF CAGE (if currently in Cage)
│   │
│   ├── IS VEHICLE CURRENTLY IN THE CAGE?
│   │   │
│   │   ├── NO (vehicle is not in Cage — e.g., it was in Overflow or elsewhere):
│   │   │   Continue to Q3 (zone placement for sold vehicle)
│   │   │
│   │   └── YES (vehicle is in Cage):
│   │       ACTION: Move vehicle out of Cage immediately.
│   │               The Cage is for display-ready inventory only — sold vehicles
│   │               do not remain in the Cage.
│   │       ROLE: Lot Attendant
│   │       THEN: Notify Lot Manager that a Cage slot has opened.
│   │       CHANNEL: WhatsApp group
│   │       SAY: "Vehicle [VIN/stock number] moved out of Cage — sold. Slot [C-number]
│   │             now open."
│   │       → SEE: vehicle-placement-cage.md (Lot Manager will fill vacated Cage slot)
│   │       THEN: Continue to Q3
│
├── Q3: PLACE SOLD VEHICLE IN EAST SIDE FENCE LINE (first priority zone)
│   │
│   ├── IS THERE AN OPEN SLOT IN EAST SIDE FENCE LINE (F1–F5)?
│   │   │
│   │   ├── YES:
│   │   │   ACTION: Move sold vehicle to East Side Fence Line. Park in lowest-numbered
│   │   │           open slot (F1 first, then F2, etc.).
│   │   │           Sold sign with customer name must remain visible in vehicle.
│   │   │   ROLE: Lot Attendant
│   │   │   CHANNEL: WhatsApp group
│   │   │   SAY: "Vehicle [VIN/stock number] — [CUSTOMER NAME] — placed in East Side
│   │   │         Fence Line slot [F-number]."
│   │   │   → Continue to Q5 (PDI confirmation before delivery)
│   │   │
│   │   └── NO — East Side Fence Line is full (all F1–F5 occupied):
│   │       Continue to Q4 (overflow routing)
│
├── Q4: EAST SIDE FENCE LINE FULL — ROUTE TO OVERFLOW
│   │
│   ├── IS THERE AN OPEN SLOT IN WEST SIDE OF BUILDING (L1–L5)?
│   │   (West Side of Building accepts SOLD overflow in third-priority fill order)
│   │   │
│   │   ├── YES:
│   │   │   ACTION: Move sold vehicle to West Side of Building. Park in lowest-numbered
│   │   │           open slot (L1 first, then L2, etc.).
│   │   │           Sold sign with customer name must remain visible in vehicle.
│   │   │   ROLE: Lot Attendant
│   │   │   CHANNEL: WhatsApp group
│   │   │   SAY: "Vehicle [VIN/stock number] — [CUSTOMER NAME] — placed in West Side of
│   │   │         Building slot [L-number]. East Side Fence Line was full."
│   │   │   → Continue to Q5 (PDI confirmation before delivery)
│   │   │
│   │   └── NO — West Side of Building also full:
│   │       ACTION: Place vehicle in Overflow (Temporary) at East Side Fence Line area.
│   │               Label with destination annotation: "Belongs in East Side Fence Line —
│   │               SOLD — [CUSTOMER NAME]."
│   │       ROLE: Lot Attendant
│   │       CHANNEL: WhatsApp group
│   │       SAY: "Vehicle [VIN/stock number] — [CUSTOMER NAME] — placed in Overflow
│   │             (Temporary). East Side Fence Line and West Side of Building both full.
│   │             Will move to correct zone when slot opens."
│   │       THEN: Monitor daily. Move to East Side Fence Line or West Side of Building
│   │             immediately when a slot opens.
│   │       → Continue to Q5 (PDI confirmation before delivery)
│
└── Q5: CONFIRM PDI COMPLETE BEFORE DELIVERY DATE
    │
    ACTION: Before the customer takes physical delivery, confirm PDI is marked complete
            in the manufacturer system.
    ROLE: Lot Manager
    │
    ├── PDI NOT YET COMPLETE:
    │   ACTION: Route vehicle to service for PDI immediately.
    │           Notify salesperson of PDI requirement.
    │   ROLE: Lot Manager
    │   CHANNEL: Direct communication with Service Department Lead + WhatsApp group
    │   SAY (to service): "Vehicle [VIN/stock number] is sold with delivery date [DATE].
    │                      PDI must be completed before delivery. Please prioritize."
    │   SAY (to salesperson): "PDI for [VIN] is not yet complete. Vehicle cannot be
    │                           delivered until PDI is done. Customer delivery must wait."
    │   → SEE: vehicle-pdi-routing.md
    │   [Vehicle cannot be released to customer until PDI is confirmed in manufacturer system]
    │
    └── PDI COMPLETE (confirmed in manufacturer system):
        ACTION: Confirm vehicle is ready for customer delivery.
                Confirm vehicle has sold sign with customer name.
                Confirm vehicle has been fully detailed.
        ROLE: Lot Manager
        CHANNEL: WhatsApp group
        SAY: "Vehicle [VIN/stock number] — [CUSTOMER NAME] — confirmed ready for delivery.
              PDI complete, detail complete, sold sign in place."
        [TERMINAL — vehicle is ready for customer pickup/delivery]
```

---

## Terminal Outcomes

- **Outcome A — Vehicle placed in East Side Fence Line, ready for delivery:** Sold sign placed; vehicle moved from Cage to East Side Fence Line; PDI confirmed complete. Standard successful outcome.
- **Outcome B — Vehicle placed in West Side of Building (SOLD overflow):** East Side Fence Line full; vehicle placed in West Side of Building SOLD overflow position; PDI confirmed complete before delivery.
- **Outcome C — Vehicle placed in Overflow (Temporary):** Both East Side Fence Line and West Side of Building full; vehicle staged in Overflow (Temporary) with sold sign and destination annotation; to be moved when slot opens.
- **Outcome D — PDI not yet complete, delivery held:** Vehicle sold but PDI not confirmed; vehicle cannot be released to customer; routed to service for priority PDI; salesperson informed.
- **Outcome E — 3-strike escalation for missing sold sign:** Sold sign not placed; Lot Manager escalates through 3-strike protocol to Sales Manager (Kevin); sign is placed after escalation.
- **Outcome F — Trade-in processing initiated in parallel:** Deal includes trade-in; trade-in processing initiated simultaneously via vehicle-trade-in-processing.md.

---

## Notes

- **Sold sign is placed IMMEDIATELY when the deal is signed** — not when the customer picks up the vehicle, not at the end of the day. The moment the sale is confirmed, the sign goes in the vehicle.
- **Supplies location:** Sold signs and Sharpies are kept upstairs in the dealership building.
- **PDI must be confirmed in the manufacturer system before delivery.** A verbal "it's been done" is not sufficient. The technician's entry in the manufacturer system is the only valid confirmation.
- **Deal signed ≠ BND.** If the deal is signed and the vehicle is awaiting delivery (not yet physically delivered to the customer), this is BND status — route to vehicle-bnd-handling.md for ongoing handling until delivery occurs. This tree covers the initial sold processing; BND tree governs the vehicle during the waiting period.
- [NEEDS_INPUT: If the customer picks up the vehicle same-day, is BND processing skipped entirely? Source material does not specify this edge case.]
