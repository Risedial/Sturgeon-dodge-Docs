# Decision Tree: Morning Lot Walk
**File:** morning-lot-walk.md
**Status:** [COMPLETE]
**Cross-references:** vehicle-sold-processing.md, sold-sign-missing-enforcement.md, vehicle-status-unknown.md, vehicle-customer-on-lot.md, vehicle-categorization.md, vehicle-non-prime-identification.md, vehicle-pdi-compliance-deadline.md, vehicle-placement-cage.md, staff-parking-repeat-violation.md

---

## Trigger
The start of every operational day. Executed approximately 30 minutes after arriving at the lot, after any immediate fires are handled. This walk is mandatory — it cannot be skipped regardless of how busy the day is.

## Responsible Role
Lot Manager / Operations Manager (Scott [AMBIGUOUS]) or designated Lot Attendant if Lot Manager is absent.

---

## Decision Tree

START
│
├── STEP 1: Arrival and Timing
│   │
│   ACTION: Arrive at lot
│   ROLE: Lot Manager / Operations Manager
│   │
│   ├── Are there immediate fires (urgent issues that cannot wait)?
│   │   │
│   │   ├── YES:
│   │   │   │
│   │   │   ACTION: Handle immediate fires first — resolve before starting the walk
│   │   │   ROLE: Lot Manager / Operations Manager
│   │   │   │
│   │   │   └── THEN: → Begin morning lot walk when immediate issue is resolved
│   │   │
│   │   └── NO:
│   │       │
│   │       └── THEN: → Begin morning lot walk immediately (target: within 30 minutes of arrival)
│
├── STEP 2: Walk All Zones — In Order
│   │
│   Walk zones in this exact sequence. Do not skip any zone. Do not reorder.
│   │
│   ├── ZONE 1: Cage (all 20 slots — C01 through C20)
│   │   └── THEN: → Per-Vehicle Check (see Step 3) for every vehicle encountered
│   │
│   ├── ZONE 2: East Side Fence Line (all 5 slots — F1 through F5, plus any Overflow vehicles)
│   │   └── THEN: → Per-Vehicle Check (see Step 3) for every vehicle encountered
│   │
│   ├── ZONE 3: West Side of Building (all 5 slots — L1 through L5)
│   │   └── THEN: → Per-Vehicle Check (see Step 3) for every vehicle encountered
│   │
│   ├── ZONE 4: Overflow (Temporary) — all vehicles staged at East Side Fence Line area
│   │   └── THEN: → Per-Vehicle Check (see Step 3) for every vehicle encountered
│   │
│   ├── ZONE 5: Auction Area — all auction-bound vehicles
│   │   └── THEN: → Per-Vehicle Check (see Step 3) for every vehicle encountered
│   │
│   ├── ZONE 6: Power Sport / Quad Corner — all seasonal / specialty vehicles
│   │   └── THEN: → Per-Vehicle Check (see Step 3) for every vehicle encountered
│   │
│   └── ZONE 7: Staff Parking check — confirm no staff personal vehicles are on the lot
│       │
│       ├── Staff personal vehicle(s) found on lot:
│       │   │
│       │   ACTION: Identify owner using staff vehicle inventory list
│       │   ROLE: Lot Manager / Operations Manager
│       │   │
│       │   ├── Is this a new employee (first-time violation)?
│       │   │   └── THEN: → SEE: staff-parking-new-employee.md
│       │   │
│       │   └── Is this a known employee (repeat violation)?
│       │       └── THEN: → SEE: staff-parking-repeat-violation.md
│       │
│       └── No staff vehicles on lot:
│           │
│           └── THEN: → Record as PASS for Zone 7; proceed to Step 4
│
├── STEP 3: Per-Vehicle Check — Run This for Every Vehicle in Every Zone
│   │
│   For each vehicle encountered, run all 8 checks below. Record every failing check as a task.
│   │
│   ├── CHECK 1: Does the vehicle's zone match its status?
│   │   │
│   │   ├── YES — zone matches status:
│   │   │   └── THEN: → Proceed to Check 2
│   │   │
│   │   └── NO — vehicle is in the wrong zone:
│   │       │
│   │       ACTION: Flag vehicle for repositioning
│   │       ROLE: Lot Manager / Operations Manager
│   │       │
│   │       ├── Vehicle status is known → route to correct zone per status category
│   │       │   └── THEN: → SEE: vehicle-categorization.md for correct zone assignment
│   │       │
│   │       └── Vehicle status is unknown → identify before repositioning
│   │           └── THEN: → SEE: vehicle-status-unknown.md
│   │
│   ├── CHECK 2: Is the correct signage present?
│   │   │
│   │   ├── YES — all required signage is present and correct:
│   │   │   └── THEN: → Proceed to Check 3
│   │   │
│   │   └── NO — signage is missing or incorrect:
│   │       │
│   │       ├── Missing sold sign (vehicle is sold):
│   │       │   ACTION: Initiate 3-Strike enforcement
│   │       │   ROLE: Lot Manager / Operations Manager → TO: Sales Manager (Kevin)
│   │       │   └── THEN: → SEE: sold-sign-missing-enforcement.md
│   │       │
│   │       ├── Missing trade-in banner (vehicle is a trade-in):
│   │       │   ACTION: Obtain trade-in banner from upstairs supply area; place on vehicle
│   │       │   ROLE: Lot Attendant
│   │       │   CHANNEL: team chat (WhatsApp) → document: "Trade-in banner placed on [vehicle description]"
│   │       │   └── THEN: → Proceed to Check 3
│   │       │
│   │       ├── Missing customer vehicle sign:
│   │       │   ACTION: Create sign with text "Customer's car, picking up [date]"; place on or in vehicle
│   │       │   ROLE: Lot Attendant
│   │       │   └── THEN: → SEE: vehicle-customer-on-lot.md for full customer vehicle protocol
│   │       │
│   │       └── Missing stock-in tag (see Check 6 — handled separately)
│   │           └── THEN: → Proceed to Check 3
│   │
│   ├── CHECK 3: Is the vehicle clean (no visible dirt or debris)?
│   │   │
│   │   ├── YES — vehicle is clean:
│   │   │   └── THEN: → Proceed to Check 4
│   │   │
│   │   └── NO — vehicle is dirty:
│   │       │
│   │       ACTION: Add to task list — detailing needed
│   │       ROLE: Lot Manager / Operations Manager
│   │       CHANNEL: team chat (WhatsApp) → document: "Vehicle [stock number / description] needs detail — route to DHD or quick wash (Hughes)"
│   │       │
│   │       └── THEN: → Proceed to Check 4
│   │
│   ├── CHECK 4: Is the vehicle facing outward? (Cage vehicles only — skip for other zones)
│   │   │
│   │   ├── YES — facing outward:
│   │   │   └── THEN: → Proceed to Check 5
│   │   │
│   │   ├── NO — not facing outward (Cage vehicle):
│   │   │   │
│   │   │   ACTION: Reposition vehicle to face outward toward customers
│   │   │   ROLE: Lot Attendant
│   │   │   CHANNEL: team chat (WhatsApp) → document: "[Vehicle description] repositioned to face outward in Cage slot [slot number]"
│   │   │   │
│   │   │   └── THEN: → Proceed to Check 5
│   │   │
│   │   └── N/A — vehicle is not in the Cage:
│   │       └── THEN: → Proceed to Check 5
│   │
│   ├── CHECK 5: Is there adequate door-opening spacing? (Cage vehicles only — skip for other zones)
│   │   │
│   │   ├── YES — doors can fully open:
│   │   │   └── THEN: → Proceed to Check 6
│   │   │
│   │   ├── NO — doors cannot fully open (Cage vehicle):
│   │   │   │
│   │   │   ACTION: Reposition one or both vehicles to create adequate spacing
│   │   │   ROLE: Lot Attendant
│   │   │   CHANNEL: team chat (WhatsApp) → document: "Cage spacing corrected between [vehicle descriptions]"
│   │   │   │
│   │   │   └── THEN: → Proceed to Check 6
│   │   │
│   │   └── N/A — vehicle is not in the Cage:
│   │       └── THEN: → Proceed to Check 6
│   │
│   ├── CHECK 6: Is the stock-in tag present in the bottom-right corner of the windshield?
│   │   │
│   │   ├── YES — stock-in tag is present and correctly placed:
│   │   │   └── THEN: → Proceed to Check 7
│   │   │
│   │   └── NO — stock-in tag is missing:
│   │       │
│   │       ACTION: Flag vehicle for tagging — route to Admin — Stock Tags (Jorja) or Admin/Tech (Giselle)
│   │       ROLE: Lot Manager / Operations Manager
│   │       CHANNEL: direct or team chat (WhatsApp) → SAY: "Vehicle [stock number / description] is missing its stock-in tag. Can you create and hand one over so it can be placed?"
│   │       │
│   │       └── THEN: → Proceed to Check 7
│   │
│   ├── CHECK 7: Is there any unauthorized staff personal vehicle in this zone?
│   │   │
│   │   ├── NO — no unauthorized vehicles identified:
│   │   │   └── THEN: → Proceed to Check 8
│   │   │
│   │   └── YES — a staff personal vehicle is in this zone (not on the street):
│   │       │
│   │       ACTION: Identify owner using staff vehicle inventory list
│   │       ROLE: Lot Manager / Operations Manager
│   │       │
│   │       ├── New employee (first violation):
│   │       │   └── THEN: → SEE: staff-parking-new-employee.md
│   │       │
│   │       └── Known employee (repeat violation):
│   │           └── THEN: → SEE: staff-parking-repeat-violation.md
│   │
│   └── CHECK 8: Are there any PDI compliance gaps?
│       (Vehicle on front line without PDI; vehicle approaching or past 2-day PDI window)
│       │
│       ├── NO — no PDI gaps identified:
│       │   └── THEN: → Record all 8 checks as PASS for this vehicle; move to next vehicle
│       │
│       └── YES — PDI gap identified:
│           │
│           ├── Vehicle is on the Cage / front line without PDI complete:
│           │   │
│           │   ACTION: Remove vehicle from Cage immediately; route to service department for PDI
│           │   ROLE: Lot Manager / Operations Manager
│           │   CHANNEL: direct to Service Department Lead
│           │   SAY: "Vehicle [stock number], VIN [VIN] is on the front line without a completed PDI. This needs to be done today — we're at 80% compliance, in the red zone."
│           │   │
│           │   └── THEN: → SEE: vehicle-pdi-compliance-deadline.md for full deadline management
│           │
│           └── Vehicle is approaching or past the 2-day PDI window:
│               │
│               ACTION: Alert service department immediately with vehicle details and deadline
│               ROLE: Lot Manager / Operations Manager
│               CHANNEL: direct to Service Department Lead + team chat (WhatsApp) for documentation
│               SAY: "Vehicle [stock number], VIN [VIN] arrived on [arrival date]. PDI deadline is [arrival date + 2 days]. Current status: [status]. This needs priority processing."
│               │
│               └── THEN: → SEE: vehicle-pdi-compliance-deadline.md for full deadline management
│
└── STEP 4: Generate Task List and Post to Team Chat
    │
    After completing all zones:
    │
    ACTION: Compile all flagged items into a task list organized by responsible team
    ROLE: Lot Manager / Operations Manager
    CHANNEL: team chat (WhatsApp group)
    │
    Task list format — post to WhatsApp:
    │
    [MORNING LOT WALK — [date]]
    │
    LOT TEAM TASKS:
    - [Vehicle description] → [specific action: reposition / tag / detail / etc.]
    - [Additional items...]
    │
    SALES TEAM TASKS:
    - [Vehicle description] → sold sign missing — requested from Kevin per strike protocol
    - [Additional items...]
    │
    SERVICE TEAM TASKS:
    - [Vehicle description] → PDI needed by [date]; [stock number], VIN [VIN]
    - [Additional items...]
    │
    NO ISSUES: [zone name] — if a zone is clean, note it
    │
    ├── Are there vehicles needing PDI?
    │   └── YES:
    │       ACTION: Contact Service Department Lead directly (not just via WhatsApp)
    │       ROLE: Lot Manager / Operations Manager
    │       SAY: "I've posted the PDI needs in the group chat. [Vehicle list]. Please confirm receipt and prioritize."
    │
    ├── Are there missing sold signs?
    │   └── YES:
    │       └── THEN: → SEE: sold-sign-missing-enforcement.md (3-Strike Protocol already initiated in Check 2)
    │
    ├── Are there vehicles in the wrong zone?
    │   └── YES:
    │       ACTION: Lot team repositions vehicles to correct zones as identified
    │       ROLE: Lot Attendant
    │       CHANNEL: team chat (WhatsApp) → confirm repositioning complete: "[Vehicle description] moved from [wrong zone] to [correct zone]."
    │
    └── Walk complete — no outstanding items:
        │
        ACTION: Post to team chat: "Morning lot walk complete — all clear."
        ROLE: Lot Manager / Operations Manager
        CHANNEL: team chat (WhatsApp)
        │
        └── TERMINAL OUTCOME: Morning lot walk complete; all issues documented and routed.

---

## Terminal Outcomes

- **Outcome 1 — Walk complete, tasks routed:** All zones inspected, all issues documented in WhatsApp team chat, tasks assigned to Lot Team / Sales Team / Service Team respectively. Morning lot walk closed.
- **Outcome 2 — Walk complete, no issues:** All zones inspected, no issues found. Post "Morning lot walk complete — all clear" to WhatsApp team chat.
- **Outcome 3 — Immediate fires interrupted timing:** Immediate fires handled first; walk begun after resolution, within the same morning period. All outcomes above still apply.
- **Outcome 4 — Staff vehicle found on lot:** Vehicle owner identified; appropriate parking protocol initiated (→ SEE: staff-parking-new-employee.md or staff-parking-repeat-violation.md). Walk continues.
- **Outcome 5 — PDI compliance gap found:** Flagged vehicle removed from front line (if applicable); service department alerted with vehicle info and deadline (→ SEE: vehicle-pdi-compliance-deadline.md). Walk continues.
- **Outcome 6 — Unknown vehicle status found:** Vehicle status investigation initiated (→ SEE: vehicle-status-unknown.md). Walk continues; vehicle not moved until status is confirmed.

---

## Notes

**[ASSUMPTION]** Lot Manager / Operations Manager is the role that executes this walk. Source material references "Scott" by name in the daily operations context but role assignment is [AMBIGUOUS] — exact role title for Scott not confirmed.

**[ASSUMPTION]** When Lot Manager is absent, the walk is performed by a designated Lot Attendant. Source material does not explicitly define a designee; this is inferred from operational necessity.

**[NEEDS_INPUT]** Service Department Lead contact information — who specifically receives the direct PDI alert call is not confirmed in source material. Trees use "Service Department Lead [NEEDS_INPUT — contact TBD]."

**[NEEDS_INPUT]** Staff vehicle inventory list — whether this list exists and is current at time of walk execution. Source material confirms it was being compiled at the time of the walkthrough (Don / Alex [AMBIGUOUS] were building it). Its current status is unknown.

**[COMPLETE]** Walk documentation channel: WhatsApp group.
**[COMPLETE]** Walk timing: ~30 minutes after arrival, ~30 minutes duration.
**[COMPLETE]** End-of-day review: walk around all zones; photos sent into WhatsApp group chat.
