# Decision Tree: BND (Booked Not Delivered) Vehicle Handling
**File:** vehicle-bnd-handling.md
**Status:** [COMPLETE]
**Cross-references:** vehicle-pdi-routing.md, vehicle-sold-processing.md

---

## Trigger
A vehicle has Airtable status `BOOKED | NOT DELIVERED` — a deal has been signed on paper, but the vehicle has not yet been physically delivered to the customer.

## Responsible Role
Salesperson (communication and status update); Lot Attendant or Lot Manager (physical placement and signage)

---

## Decision Tree

START
│
├── Q: Has a deal been signed for a vehicle, but the vehicle has NOT yet been physically delivered to the customer?
│   │
│   └── YES — this vehicle is BND:
│       │
│       ├── STEP 1 — Communicate BND status immediately
│       │   ACTION: Salesperson communicates BND status to the lot team via team chat.
│       │   ROLE: Salesperson
│       │   CHANNEL: WhatsApp group
│       │   SAY: "Vehicle [VIN/stock number] is BND for [customer name]. Expected delivery: [date]."
│       │
│       ├── STEP 2 — Update Airtable immediately
│       │   ACTION: Set vehicle Airtable status to `BOOKED | NOT DELIVERED`.
│       │   ROLE: Salesperson or Admin
│       │
│       ├── STEP 3 — Place sold sign immediately
│       │   ACTION: Place sold sign inside vehicle with customer name written on sign using a Sharpie.
│       │   ROLE: Salesperson OR Lot Attendant (on request)
│       │   Supplies: Upstairs in the dealership building (sold signs and Sharpies co-located)
│       │
│       └── THEN: → Determine BND parking placement

---

## BND Parking Placement

START — Determine parking zone
│
├── Q: Is there an available slot in the East Side Fence Line (F1–F5)?
│   │
│   ├── YES:
│   │   │
│   │   ├── ACTION: Move vehicle to an available East Side Fence Line slot.
│   │   │   ROLE: Lot Attendant
│   │   │
│   │   └── THEN: → OUTCOME A
│   │
│   └── NO (East Side Fence Line is full — all F1–F5 occupied):
│       │
│       ├── Q: Is there an available slot in the West Side of Building (L1–L5)?
│       │   │
│       │   ├── YES:
│       │   │   │
│       │   │   ├── ACTION: Move vehicle to an available West Side of Building slot (BND overflow).
│       │   │   │   ROLE: Lot Attendant
│       │   │   │
│       │   │   └── THEN: → OUTCOME B
│       │   │
│       │   └── NO (West Side of Building is also full):
│       │       │
│       │       ├── ACTION: Move vehicle to Overflow (Temporary) at East Side Fence Line.
│       │       │   ROLE: Lot Attendant
│       │       │   Annotate: vehicle's destination zone = East Side Fence Line
│       │       │   CHANNEL: WhatsApp group
│       │       │   SAY: "BND vehicle [VIN/stock number] for [customer name] placed in Overflow — belongs in East Side Fence Line. Move when slot opens."
│       │       │
│       │       └── THEN: → OUTCOME C

---

## Pre-Delivery PDI Check

Before any BND vehicle is physically delivered to the customer:

START — Pre-delivery check
│
├── Q: Has PDI been confirmed complete in the manufacturer system?
│   │
│   ├── YES:
│   │   │
│   │   └── THEN: Proceed to delivery. → OUTCOME D (delivery may proceed)
│   │
│   └── NO (PDI is not yet complete):
│       │
│       ├── ACTION: Do NOT deliver vehicle to customer.
│       │   ROLE: Lot Manager
│       │
│       ├── ACTION: Contact Service Department Lead immediately. Request priority PDI.
│       │   ROLE: Lot Manager
│       │   CHANNEL: Direct contact (in person or phone) + WhatsApp group for documentation
│       │   SAY: "Vehicle [VIN/stock number] is BND for [customer name] with expected delivery [date]. PDI has not been completed. We need priority PDI before delivery can proceed."
│       │
│       └── → SEE: vehicle-pdi-routing.md (follow PDI routing tree; do not deliver until PDI is marked complete in manufacturer system)

---

## Exiting BND Status

START — Customer arrives for delivery
│
├── Q: Is PDI confirmed complete in the manufacturer system?
│   │
│   ├── YES:
│   │   │
│   │   ├── ACTION: Deliver vehicle to customer.
│   │   │   ROLE: Salesperson (leads delivery); Lot Attendant (retrieves vehicle from parking zone)
│   │   │
│   │   ├── ACTION: Update Airtable status to reflect delivery complete.
│   │   │   ROLE: Salesperson or Admin
│   │   │
│   │   └── THEN: → OUTCOME E (BND status resolved; vehicle delivered)
│   │
│   └── NO:
│       │
│       └── ACTION: Delay delivery. Follow PDI priority escalation.
│           ROLE: Lot Manager
│           → SEE: vehicle-pdi-routing.md

---

## Terminal Outcomes

- **Outcome A:** BND vehicle signed, status updated in Airtable, parked in East Side Fence Line. Awaiting delivery.
- **Outcome B:** BND vehicle signed, status updated in Airtable, parked in West Side of Building (BND overflow). Awaiting delivery.
- **Outcome C:** BND vehicle signed, status updated in Airtable, parked in Overflow (Temporary). Lot team notified via WhatsApp. Move to East Side Fence Line when slot opens.
- **Outcome D:** Pre-delivery PDI confirmed complete. Delivery may proceed.
- **Outcome E:** BND status resolved. Vehicle physically delivered to customer. Airtable updated.

---

## Notes

- BND status is triggered when a deal is booked/signed but delivery has not yet occurred. It is distinct from SOLD, which indicates delivery is complete or imminent without the ongoing hold.
- A vehicle may enter BND status while still in the Cage if the deal is signed before the vehicle is moved. In that case, move the vehicle out of the Cage immediately after deal signing — the Cage holds only FLR/NEW display vehicles.
- PDI is mandatory before delivery. No customer receives a vehicle that has not been PDI'd in the manufacturer system — this applies equally to BND vehicles regardless of how long they have been parked.
- [ASSUMPTION] If a BND vehicle has been held for an extended period and PDI was completed, re-inspection is not automatically required before delivery unless the vehicle has accumulated new issues during the holding period. This is an assumption — a clear rule for extended holds is not specified in source material.
