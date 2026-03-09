# Decision Tree: Vehicle Non-Prime Identification
**File:** vehicle-non-prime-identification.md
**Status:** [COMPLETE]
**Cross-references:** vehicle-status-unknown.md

---

## Trigger
Any time a vehicle is encountered on the Edmonton Office lot and its eligibility to be on this lot is unknown or in question. This tree is also the mandatory first check before any vehicle is placed in any zone — called from all vehicle arrival trees and from the morning lot walk when an unidentified vehicle is found.

## Responsible Role
Lot Attendant / Lot Manager (Lot Manager leads escalation steps)

---

## Decision Tree

START
│
├── MANDATORY FIRST ACTION: Open Airtable.
│   Navigate to: INVENTORY SYSTEMS > MASTER INVENTORY.
│   Locate the vehicle record by VIN or plate number.
│   ROLE: Lot Attendant / Lot Manager
│   │
│   ├── Q: Is the vehicle found in Airtable?
│   │   │
│   │   ├── NO — Vehicle cannot be located in Airtable by VIN or plate:
│   │   │   │
│   │   │   ACTION: Do NOT move the vehicle.
│   │   │   ROLE: Lot Manager
│   │   │   │
│   │   │   ACTION: Escalate to General Manager immediately.
│   │   │   ROLE: Lot Manager
│   │   │   CHANNEL: Direct conversation
│   │   │   SAY: "There is a vehicle on the lot that cannot be located in Airtable — [vehicle description / plate]. I cannot confirm its status or eligibility. I'm not moving it until you confirm what it is."
│   │   │   │
│   │   │   └── THEN: → SEE: vehicle-status-unknown.md
│   │   │       [TERMINAL OUTCOME 4]
│   │   │
│   │   └── YES — Vehicle record found in Airtable:
│   │       │
│   │       ACTION: Locate the STOCK HOLDER field in the vehicle record.
│   │       ROLE: Lot Attendant / Lot Manager
│   │       │
│   │       ├── Q: What is the value of the STOCK HOLDER field?
│   │       │   │
│   │       │   ├── STOCK HOLDER = "STURGEON DODGE":
│   │       │   │   │
│   │       │   │   ACTION: Vehicle is confirmed as belonging to the Edmonton Office lot.
│   │       │   │   ROLE: Lot Attendant / Lot Manager
│   │       │   │   │
│   │       │   │   └── THEN: → Return to normal processing pipeline. Route per vehicle status.
│   │       │   │       [TERMINAL OUTCOME 1]
│   │       │   │
│   │       │   ├── STOCK HOLDER = "NON PRIME DIVISION":
│   │       │   │   │
│   │       │   │   ACTION: Do NOT process this vehicle. Do NOT place it in any zone. Do NOT move it to any active area.
│   │       │   │   ROLE: Lot Manager
│   │       │   │   │
│   │       │   │   ACTION: Notify Sales Manager (Kevin) immediately.
│   │       │   │   ROLE: Lot Manager
│   │       │   │   CHANNEL: Direct conversation or WhatsApp group
│   │       │   │   SAY: "I found a non-prime vehicle on the lot — [vehicle description / VIN]. STOCK HOLDER shows NON PRIME DIVISION. I'm routing it to AB | STURGEON DODGE now."
│   │       │   │   │
│   │       │   │   ACTION: Arrange transport of the vehicle to AB | STURGEON DODGE.
│   │       │   │   ROLE: Lot Manager
│   │       │   │   │
│   │       │   │   ACTION: Document in WhatsApp group.
│   │       │   │   ROLE: Lot Manager
│   │       │   │   SAY: "Non-prime vehicle [description / VIN] identified on lot. Routed to AB | STURGEON DODGE on [date / time]. Kevin notified."
│   │       │   │   │
│   │       │   │   !! NO EXCEPTIONS — even if a manager says the vehicle is okay to stay: non-prime vehicles operate under different insurance and a different organizational structure. They are completely prohibited on the Edmonton Office lot under ALL circumstances. The lot manager must route the vehicle to AB | STURGEON DODGE regardless of any verbal instruction to the contrary.
│   │       │   │   │
│   │       │   │   └── THEN: → Vehicle leaves the Edmonton Office lot. No further processing on this lot.
│   │       │   │       [TERMINAL OUTCOME 2]
│   │       │   │
│   │       │   └── STOCK HOLDER = blank / empty / any value other than the two above:
│   │       │       │
│   │       │       ACTION: Do NOT move the vehicle.
│   │       │       ROLE: Lot Manager
│   │       │       │
│   │       │       ACTION: Escalate to General Manager immediately.
│   │       │       ROLE: Lot Manager
│   │       │       CHANNEL: Direct conversation
│   │       │       SAY: "I have a vehicle on the lot where the STOCK HOLDER field in Airtable is blank or shows an unrecognized value — [vehicle description / VIN]. I cannot confirm whether this vehicle is allowed on this lot. I'm not moving it until you confirm its STOCK HOLDER status."
│   │       │       │
│   │       │       └── THEN: → Hold vehicle in current position. Do not place, process, or route until General Manager confirms STOCK HOLDER value and provides direction.
│   │       │           [TERMINAL OUTCOME 3]

---

## Terminal Outcomes

- **Outcome 1 — Vehicle confirmed on correct lot:** STOCK HOLDER = "STURGEON DODGE". Vehicle is allowed on this lot. Return to normal processing pipeline.
- **Outcome 2 — Non-prime vehicle routed off lot:** STOCK HOLDER = "NON PRIME DIVISION". Vehicle transported to AB | STURGEON DODGE. Sales Manager (Kevin) notified. Documented in WhatsApp group. No further action on this lot.
- **Outcome 3 — Blank or unrecognized STOCK HOLDER:** Vehicle held in current position. General Manager escalated immediately for confirmation before any action is taken.
- **Outcome 4 — Vehicle not found in Airtable:** Vehicle held in current position. General Manager escalated. Passes to vehicle-status-unknown.md for full investigation.

---

## Notes

- **This is the canonical non-prime identification tree.** All other trees that require a non-prime check use `→ SEE: vehicle-non-prime-identification.md` rather than inlining this logic. Do not duplicate this tree in other files.
- **STOCK HOLDER is the ONLY field used for non-prime identification.** No other Airtable field, no visual inspection, no verbal confirmation from any staff member can substitute for checking the STOCK HOLDER field directly.
- **The no-exceptions rule is absolute.** Non-prime vehicles are managed under a different insurance policy and a completely different organizational structure (Division One / AB | STURGEON DODGE). There is no scenario — including a direct manager instruction — that permits a non-prime vehicle to remain on the Edmonton Office lot.
- [NEEDS_INPUT]: Exact transport arrangement process for routing a vehicle to AB | STURGEON DODGE — who arranges transport, what lead time is required, and who at Sturgeon Dodge receives the vehicle.
