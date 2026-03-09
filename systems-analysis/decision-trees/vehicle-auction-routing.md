# Decision Tree: Vehicle Auction Routing
**File:** vehicle-auction-routing.md
**Status:** [COMPLETE]
**Cross-references:** vehicle-trade-in-processing.md, vehicle-categorization.md, vehicle-recon-routing.md, vehicle-non-prime-identification.md, morning-lot-walk.md

---

## Trigger
A vehicle is being considered for or routed to auction. This tree activates when:
- A trade-in is assessed as not viable for retail sale
- A RECON vehicle is assessed as not economically viable to recondition for retail sale
- Management makes a decision to route any vehicle to auction
- A vehicle is found in or near the Auction Area and its status is unknown

## Responsible Role
Lot Manager / Operations Manager (executes placement and documentation)
Sales Manager (Kevin) or General Manager (makes auction routing decision for trade-ins and RECON vehicles)

---

## Decision Tree

START
│
├── Q: Is the vehicle already confirmed as auction-bound (management has made the decision)?
│   │
│   ├── YES:
│   │   │
│   │   ├── ACTION: Update Airtable — mark vehicle as auction-bound in the notes/status field
│   │   │   ROLE: Lot Manager / Operations Manager
│   │   │
│   │   ├── ACTION: Move vehicle to Auction Area immediately
│   │   │   ROLE: Lot Attendant
│   │   │
│   │   ├── ACTION: Document placement in team chat
│   │   │   ROLE: Lot Manager / Operations Manager
│   │   │   CHANNEL: WhatsApp group
│   │   │   SAY: "[Vehicle: Year/Make/Model, Stock #] has been moved to Auction Area per management direction. Airtable updated."
│   │   │
│   │   └── TERMINAL: Vehicle correctly placed in Auction Area → END
│   │
│   └── NO (vehicle needs an auction/retail routing decision):
│       │
│       ├── Q: Is this vehicle a trade-in?
│       │   │
│       │   ├── YES:
│       │   │   │
│       │   │   └── → SEE: vehicle-trade-in-processing.md for routing decision
│       │   │       [The trade-in routing decision (auction vs. retail vs. RECON) is made within that tree]
│       │   │       Once confirmed auction-bound, return to this tree at ACTION: Update Airtable above.
│       │   │
│       │   └── NO:
│       │       │
│       │       ├── Q: Is this vehicle in RECON and being assessed for viability?
│       │       │   │
│       │       │   ├── YES:
│       │       │   │   │
│       │       │   │   └── → SEE: vehicle-recon-routing.md for RECON-to-auction routing decision
│       │       │   │       Once confirmed auction-bound, return to this tree at ACTION: Update Airtable above.
│       │       │   │
│       │       │   └── NO (management decision, no prior routing tree):
│       │       │       │
│       │       │       ├── ACTION: Confirm auction decision verbally with Sales Manager (Kevin) or General Manager before any action
│       │       │       │   ROLE: Lot Manager / Operations Manager
│       │       │       │   CHANNEL: Direct conversation
│       │       │       │   SAY: "Before I move [vehicle description] to the Auction Area, I need confirmation this is the right call. Is this vehicle going to auction?"
│       │       │       │
│       │       │       ├── Q: Is auction routing confirmed?
│       │       │       │   │
│       │       │       │   ├── YES:
│       │       │       │   │   │
│       │       │       │   │   ├── ACTION: Update Airtable — mark vehicle as auction-bound
│       │       │       │   │   │   ROLE: Lot Manager / Operations Manager
│       │       │       │   │   │
│       │       │       │   │   ├── ACTION: Move vehicle to Auction Area
│       │       │       │   │   │   ROLE: Lot Attendant
│       │       │       │   │   │
│       │       │       │   │   ├── ACTION: Document in team chat
│       │       │       │   │   │   ROLE: Lot Manager / Operations Manager
│       │       │       │   │   │   CHANNEL: WhatsApp group
│       │       │       │   │   │   SAY: "[Vehicle: Year/Make/Model, Stock #] confirmed auction-bound by [Sales Manager/GM]. Moved to Auction Area. Airtable updated."
│       │       │       │   │   │
│       │       │       │   │   └── TERMINAL: Vehicle correctly placed in Auction Area → END
│       │       │       │   │
│       │       │       │   └── NO (auction was an error — vehicle returns to pipeline):
│       │       │       │       │
│       │       │       │       ├── ACTION: Do not move vehicle to Auction Area
│       │       │       │       │   ROLE: Lot Manager / Operations Manager
│       │       │       │       │
│       │       │       │       ├── ACTION: Determine correct status and route accordingly
│       │       │       │       │   ROLE: Lot Manager / Operations Manager
│       │       │       │       │
│       │       │       │       └── → SEE: vehicle-categorization.md to determine correct zone and routing
│       │       │       │           TERMINAL: Vehicle returned to processing pipeline → END
│       │       │       │
│       │       │       └── [Decision pending — vehicle does not move until confirmed]
│       │
└── Q: Was the vehicle found in the Auction Area but its auction status is uncertain?
    │
    ├── YES:
    │   │
    │   ├── ACTION: Do NOT move the vehicle until status is confirmed
    │   │   ROLE: Lot Attendant
    │   │
    │   ├── ACTION: Report to Lot Manager immediately
    │   │   ROLE: Lot Attendant
    │   │   CHANNEL: Direct or WhatsApp group
    │   │   SAY: "There's a [vehicle description] in the Auction Area. I don't know if it's confirmed for auction. Can you verify?"
    │   │
    │   ├── ACTION: Check Airtable for vehicle status
    │   │   ROLE: Lot Manager / Operations Manager
    │   │
    │   ├── Q: Does Airtable confirm auction-bound status?
    │   │   │
    │   │   ├── YES:
    │   │   │   │
    │   │   │   └── TERMINAL: Vehicle correctly in Auction Area. No action needed. Document in team chat. → END
    │   │   │
    │   │   └── NO (Airtable shows different status OR vehicle is unrecognized):
    │   │       │
    │   │       └── → SEE: vehicle-status-unknown.md to determine vehicle's actual status
    │   │           Once status confirmed, return to appropriate routing tree.
    │   │           TERMINAL: Vehicle routed based on confirmed status → END
    │   │
    └── [Continue from previous branches as applicable]

---

## Misplacement Correction — Vehicle Found Outside Auction Area

**Trigger:** During morning lot walk, a confirmed auction-bound vehicle is found outside the Auction Area (e.g., in Cage, East Side Fence Line, or West Side of Building).

START
│
├── ACTION: Identify vehicle as auction-bound via Airtable or signage
│   ROLE: Lot Manager / Operations Manager
│
├── ACTION: Move vehicle to Auction Area immediately — do not allow it to remain in a retail zone
│   ROLE: Lot Attendant
│
├── ACTION: Document in team chat
│   ROLE: Lot Manager / Operations Manager
│   CHANNEL: WhatsApp group
│   SAY: "[Vehicle: Year/Make/Model, Stock #] was found in [zone]. It is auction-bound. Moved to Auction Area."
│
└── TERMINAL: Auction-bound vehicle corrected to Auction Area → END

---

## Terminal Outcomes

1. **Correctly placed in Auction Area:** Vehicle confirmed auction-bound, Airtable updated, physically moved to Auction Area, documented in team chat.
2. **Returned to processing pipeline:** Auction routing was an error; vehicle status re-evaluated via vehicle-categorization.md and routed correctly.
3. **Status unknown — escalated:** Vehicle found in Auction Area with no confirmed status; routed to vehicle-status-unknown.md for investigation.
4. **Misplaced auction vehicle corrected:** Auction-bound vehicle found in wrong zone during lot walk; immediately moved to Auction Area and documented.

---

## Notes

- **[ASSUMPTION]:** The auction routing decision (whether a vehicle goes to auction) is made by Sales Manager (Kevin) or General Manager — not by the Lot Manager independently. The Lot Manager executes the placement and documentation but does not make the business decision. This is inferred from role definitions in source material; explicit confirmation recommended.
- **Auction Area prohibition:** Auction-bound vehicles must NEVER be placed in the Cage, East Side Fence Line, or West Side of Building under any circumstances. These are retail zones. Auction vehicles in retail zones create confusion and may be inadvertently offered to customers.
- **Airtable note:** Auction Bound does not have a specific dedicated Airtable status label per the source material. The status is tracked via notes field or management tracking. [NEEDS_INPUT: Confirm exact Airtable field/value used to mark auction-bound vehicles.]
