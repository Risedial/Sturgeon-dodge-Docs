# Decision Tree: Vehicle Status Unknown
**File:** vehicle-status-unknown.md
**Status:** [COMPLETE]
**Cross-references:** vehicle-non-prime-identification.md, vehicle-categorization.md, vehicle-sold-processing.md, vehicle-trade-in-processing.md, vehicle-customer-on-lot.md

---

## Trigger
A vehicle is found on the Edmonton Office lot and no staff member can immediately determine what it is — whether it is active inventory, a sold vehicle awaiting delivery, a trade-in, or a customer's personal vehicle. The vehicle has no visible identification signage and its status cannot be determined at a glance.

## Responsible Role
Lot Manager (leads investigation); Lot Attendant (assists with physical checks)

---

## Decision Tree

START
│
!! CRITICAL: Do NOT move this vehicle until its status is confirmed. Moving an unidentified vehicle may interfere with a customer delivery, a pending deal, or a customer's personal property.
│
├── INVESTIGATION STEP 1: Check Airtable by VIN or plate number.
│   ROLE: Lot Attendant / Lot Manager
│   ACTION: Open Airtable. Navigate to INVENTORY SYSTEMS > MASTER INVENTORY. Search by VIN (located on dash through windshield) or plate number.
│   │
│   ├── Q: Is the vehicle found in Airtable?
│   │   │
│   │   ├── YES — Vehicle record found:
│   │   │   │
│   │   │   ACTION: Check the STOCK HOLDER field.
│   │   │   ROLE: Lot Attendant / Lot Manager
│   │   │   │
│   │   │   ├── Q: STOCK HOLDER = "NON PRIME DIVISION"?
│   │   │   │   │
│   │   │   │   └── YES:
│   │   │   │       → SEE: vehicle-non-prime-identification.md
│   │   │   │       [TERMINAL OUTCOME 6]
│   │   │   │
│   │   │   └── STOCK HOLDER = "STURGEON DODGE" (vehicle is Edmonton Office inventory):
│   │   │       │
│   │   │       ACTION: Determine the vehicle's Airtable status.
│   │   │       ROLE: Lot Attendant / Lot Manager
│   │   │       │
│   │   │       ├── Airtable status indicates vehicle is AVAILABLE or DEMO (active inventory):
│   │   │       │   │
│   │   │       │   ACTION: Confirm vehicle is not yet tagged. Obtain stock-in tag from Admin — Stock Tags (Jorja) or Admin/Tech (Giselle). Place tag in bottom-right corner of windshield.
│   │   │       │   ROLE: Lot Attendant
│   │   │       │   │
│   │   │       │   └── THEN: → Route per vehicle's category and status.
│   │   │       │       → SEE: vehicle-categorization.md
│   │   │       │       [TERMINAL OUTCOME 1]
│   │   │       │
│   │   │       ├── Airtable status indicates vehicle is SIGNED DEAL or WHOLESALE | SOLD (sold vehicle):
│   │   │       │   │
│   │   │       │   ACTION: Obtain sold sign from supplies (upstairs, with Sharpies). Write customer name on sign with Sharpie.
│   │   │       │   ROLE: Lot Attendant
│   │   │       │   │
│   │   │       │   ACTION: Place sold sign visibly inside vehicle.
│   │   │       │   ROLE: Lot Attendant
│   │   │       │   │
│   │   │       │   ACTION: Move vehicle to East Side Fence Line.
│   │   │       │   ROLE: Lot Attendant
│   │   │       │   │
│   │   │       │   ACTION: Document in WhatsApp group.
│   │   │       │   ROLE: Lot Manager
│   │   │       │   SAY: "Unidentified vehicle resolved — [description / VIN] confirmed as SOLD ([customer name]). Sold sign placed. Moved to East Side Fence Line."
│   │   │       │   │
│   │   │       │   └── THEN: → Vehicle correctly identified and repositioned.
│   │   │       │       [TERMINAL OUTCOME 2]
│   │   │       │
│   │   │       ├── Airtable status indicates vehicle is IN RECON, INCOMING, WHOLESALE, or CHASE (recon vehicle):
│   │   │       │   │
│   │   │       │   ACTION: Confirm stock-in tag is present. If absent, obtain from Admin — Stock Tags (Jorja) or Admin/Tech (Giselle) and place in bottom-right windshield.
│   │   │       │   ROLE: Lot Attendant
│   │   │       │   │
│   │   │       │   ACTION: Move vehicle to West Side of Building.
│   │   │       │   ROLE: Lot Attendant
│   │   │       │   │
│   │   │       │   └── THEN: → Route per recon process.
│   │   │       │       → SEE: vehicle-categorization.md
│   │   │       │       [TERMINAL OUTCOME 1]
│   │   │       │
│   │   │       └── Airtable status indicates vehicle is BOOKED | NOT DELIVERED (BND):
│   │   │           │
│   │   │           ACTION: Confirm stock-in tag is present. If absent, obtain and place.
│   │   │           ROLE: Lot Attendant
│   │   │           │
│   │   │           ACTION: Move vehicle to East Side Fence Line per BND routing.
│   │   │           ROLE: Lot Attendant
│   │   │           │
│   │   │           └── THEN: → Route per BND handling.
│   │   │               → SEE: vehicle-categorization.md
│   │   │               [TERMINAL OUTCOME 1]
│   │   │
│   │   └── NO — Vehicle NOT found in Airtable:
│   │       │
│   │       └── THEN: → Proceed to INVESTIGATION STEP 2.
│   │
│   INVESTIGATION STEP 2: Check the Key Cafe log.
│   ROLE: Lot Manager
│   ACTION: Go to Key Cafe (3rd floor, by Jorja's desk). Check the sign-out log for this vehicle's key set. Is a key signed out for a vehicle matching this description?
│   │
│   ├── YES — A key is signed out for a vehicle matching this description:
│   │   │
│   │   ACTION: Contact the employee who signed out the key.
│   │   ROLE: Lot Manager
│   │   CHANNEL: Direct conversation or phone
│   │   SAY: "There's a vehicle on the lot that I can't identify — [description]. The key is signed out to you. What is this vehicle?"
│   │   │
│   │   ├── Employee identifies the vehicle as inventory, a customer's car, or a trade-in:
│   │   │   │
│   │   │   └── THEN: → Return to Airtable with updated information and re-run from STEP 1, or route per the employee's confirmed identification.
│   │   │       [TERMINAL OUTCOME — return to correct branch above]
│   │   │
│   │   └── Employee cannot identify the vehicle or does not respond:
│   │       │
│   │       └── THEN: → Proceed to INVESTIGATION STEP 3.
│   │
│   └── NO — No key signed out for this vehicle in Key Cafe log:
│       │
│       └── THEN: → Proceed to INVESTIGATION STEP 3.
│
│   INVESTIGATION STEP 3: Ask Sales Manager (Kevin) if anyone recognizes the vehicle.
│   ROLE: Lot Manager
│   CHANNEL: Direct conversation or WhatsApp group
│   SAY: "There is a vehicle on the lot I cannot identify — [description / plate]. It's not in Airtable and there's no key signed out for it. Does anyone recognize this vehicle? What is it?"
│   │
│   ├── Sales Manager or a staff member identifies the vehicle:
│   │   │
│   │   ├── Identified as a customer's personal vehicle:
│   │   │   │
│   │   │   ACTION: Place customer vehicle sign on/in vehicle.
│   │   │   ROLE: Lot Attendant
│   │   │   CONTENT: "Customer's car, picking up [date]"
│   │   │   │
│   │   │   ACTION: Notify the relevant salesperson responsible for the customer.
│   │   │   ROLE: Lot Manager
│   │   │   CHANNEL: Direct conversation or WhatsApp group
│   │   │   SAY: "I've found [customer's vehicle — description]. Customer sign is placed. Confirm pickup date with me so the sign is correct."
│   │   │   │
│   │   │   └── THEN: → SEE: vehicle-customer-on-lot.md for full customer vehicle handling.
│   │   │       [TERMINAL OUTCOME 4]
│   │   │
│   │   ├── Identified as a trade-in:
│   │   │   │
│   │   │   ACTION: Place trade-in banner on vehicle immediately.
│   │   │   ROLE: Lot Attendant
│   │   │   (Supplies location: upstairs, same location as sold signs)
│   │   │   │
│   │   │   ACTION: Assess vehicle condition to determine routing.
│   │   │   ROLE: Lot Manager
│   │   │   │
│   │   │   └── THEN: → SEE: vehicle-trade-in-processing.md for full trade-in routing.
│   │   │       [TERMINAL OUTCOME 3]
│   │   │
│   │   └── Identified as inventory (but not yet in Airtable):
│   │       │
│   │       ACTION: Escalate to Admin — Stock Tags (Jorja) or Admin/Tech (Giselle) to create an Airtable record for the vehicle.
│   │       ROLE: Lot Manager
│   │       CHANNEL: Direct conversation or WhatsApp group
│   │       SAY: "There is a vehicle on the lot — [description] — that is inventory but has no Airtable record. Can you create the record now? I'm holding the vehicle until it's in the system."
│   │       │
│   │       └── THEN: → Once Airtable record exists, return to INVESTIGATION STEP 1.
│   │           [TERMINAL OUTCOME — loops back to Step 1 with new record]
│   │
│   └── Nobody can identify the vehicle after all three investigation steps:
│       │
│       ACTION: Do NOT move the vehicle. Leave it in its current position.
│       ROLE: Lot Manager
│       │
│       ACTION: Escalate to General Manager immediately.
│       ROLE: Lot Manager
│       CHANNEL: Direct conversation
│       SAY: "There is a vehicle on the lot that I cannot identify after checking Airtable, Key Cafe, and asking the sales team. [Description / plate / any visible details]. I've left it in place and I need your direction before I move it."
│       │
│       └── THEN: → Vehicle remains in current position until General Manager provides confirmed direction. No further action without GM sign-off.
│           [TERMINAL OUTCOME 5]

---

## Terminal Outcomes

- **Outcome 1 — Vehicle confirmed as inventory:** Found in Airtable (STURGEON DODGE), stock-in tag placed, routed to correct zone per status and vehicle-categorization.md.
- **Outcome 2 — Vehicle confirmed as sold:** Found in Airtable with sold status, sold sign placed with customer name, moved to East Side Fence Line, documented in WhatsApp group.
- **Outcome 3 — Vehicle confirmed as trade-in:** Identified through investigation, trade-in banner placed immediately, routed per vehicle-trade-in-processing.md.
- **Outcome 4 — Vehicle confirmed as customer's personal vehicle:** Identified through investigation, customer sign placed with pickup date, relevant salesperson notified, routed per vehicle-customer-on-lot.md.
- **Outcome 5 — Vehicle completely unidentifiable:** All three investigation steps exhausted. Vehicle held in place. General Manager escalated for direction. No action taken without GM sign-off.
- **Outcome 6 — Vehicle confirmed as non-prime:** STOCK HOLDER = "NON PRIME DIVISION" found in Airtable. Routed per vehicle-non-prime-identification.md.

---

## Notes

- **THE KIA INCIDENT — confirmed real event at the Edmonton Office lot:** A Kia sat on the Edmonton Office lot for **6 weeks** with no identification signage of any kind. During those 6 weeks, no staff member could determine whether it was inventory, a sold vehicle, a trade-in, or a customer's personal car. No one moved it, processed it, or made any decision about it. The vehicle sat completely idle for 6 weeks. Zero revenue was generated from it. This tree exists to prevent this from ever happening again. Any vehicle without identification must be investigated immediately — not left in place indefinitely.
- **Do not move before confirming:** Moving an unidentified vehicle can interfere with a pending customer delivery, a BND hold, or a customer's personal property. Hold in place through the entire investigation before moving.
- **Investigation steps are sequential:** Complete Step 1 (Airtable) before going to Step 2 (Key Cafe) before going to Step 3 (Sales Manager). Do not skip steps.
- [NEEDS_INPUT]: If a vehicle identified through this tree as "customer's personal vehicle" has been on the lot for an extended period without anyone noticing — is there a financial liability or customer notification requirement? Not specified in source material.
- [ASSUMPTION]: "Ask Sales Manager (Kevin)" in Step 3 also implies that Sales Manager may broadcast to the full sales team via WhatsApp group to ask if anyone recognizes the vehicle. The tree routes through Kevin as the single point of contact for the sales team.
