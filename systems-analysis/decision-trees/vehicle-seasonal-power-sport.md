# Decision Tree: Seasonal / Power Sport Vehicle Placement
**File:** vehicle-seasonal-power-sport.md
**Status:** [COMPLETE]
**Cross-references:** vehicle-categorization.md

---

## Trigger
One of two situations:
1. A power sport delivery, boat delivery, or Hysen unit arrives on the Edmonton Office lot.
2. A regular retail vehicle is found parked in the Power Sport / Quad Corner at any time (morning lot walk or ongoing lot policing).

## Responsible Role
Lot Attendant / Lot Manager

---

## Decision Tree

START
│
├── Q: What triggered this tree?
│   │
│   ├── OPTION A: A power sport delivery, boat delivery, or Hysen unit has arrived:
│   │   │
│   │   ├── Q: Is this a Hysen unit?
│   │   │   │
│   │   │   ├── YES — Hysen unit:
│   │   │   │   │
│   │   │   │   Q: Has snow melted this season (is it post-snow-melt timing)?
│   │   │   │   │
│   │   │   │   ├── YES — Post-snow-melt (seasonal timing is correct):
│   │   │   │   │   │
│   │   │   │   │   └── THEN: → Continue to PLACEMENT STEPS below.
│   │   │   │   │
│   │   │   │   └── NO — Snow has not yet melted / season is not appropriate:
│   │   │   │       │
│   │   │   │       ACTION: Do NOT place the Hysen unit in the Power Sport / Quad Corner at this time. Hysen units are seasonal — post-snow-melt only.
│   │   │   │       ROLE: Lot Manager
│   │   │   │       │
│   │   │   │       ACTION: Escalate to Sales Manager (Kevin) for alternate storage direction.
│   │   │   │       ROLE: Lot Manager
│   │   │   │       CHANNEL: Direct conversation or WhatsApp group
│   │   │   │       SAY: "A Hysen unit has arrived but it's not post-snow-melt yet. Power Sport / Quad Corner is seasonal. What's the alternate storage plan?"
│   │   │   │       │
│   │   │   │       └── THEN: → Wait for Sales Manager direction. Do not place unit on lot until direction is confirmed.
│   │   │   │           [TERMINAL OUTCOME 3]
│   │   │   │
│   │   │   └── NO — Power sport delivery or boat delivery (not a Hysen unit):
│   │   │       │
│   │   │       └── THEN: → Continue to PLACEMENT STEPS below.
│   │   │
│   │   │
│   │   PLACEMENT STEPS (for all confirmed deliveries where timing permits):
│   │   │
│   │   Q: Is there available space in the Power Sport / Quad Corner? (Zone has not reached the last usable exit position.)
│   │   │
│   │   ├── YES — Space available:
│   │   │   │
│   │   │   ACTION: Move delivery to Power Sport / Quad Corner.
│   │   │   ROLE: Lot Attendant
│   │   │   │
│   │   │   ACTION: Ensure the access lane remains clear. Vehicles must be positioned so that the last usable exit position in the zone is preserved — someone must always be able to exit the zone.
│   │   │   ROLE: Lot Attendant
│   │   │   │
│   │   │   ACTION: Document arrival in WhatsApp group.
│   │   │   ROLE: Lot Manager
│   │   │   SAY: "[Delivery description — type and unit] placed in Power Sport / Quad Corner on [date]."
│   │   │   │
│   │   │   └── THEN: → Placement complete.
│   │   │       [TERMINAL OUTCOME 1]
│   │   │
│   │   └── NO — Zone is at capacity (last usable exit position is occupied):
│   │       │
│   │       ACTION: Do NOT place delivery in Power Sport / Quad Corner. Zone is full.
│   │       ROLE: Lot Manager
│   │       │
│   │       ACTION: Escalate to Sales Manager (Kevin) for alternate holding direction.
│   │       ROLE: Lot Manager
│   │       CHANNEL: Direct conversation or WhatsApp group
│   │       SAY: "Power Sport / Quad Corner is at capacity. [Delivery description] cannot be placed here. What is the alternate storage plan?"
│   │       │
│   │       └── THEN: → Wait for Sales Manager direction before placing delivery anywhere.
│   │           [TERMINAL OUTCOME 4]
│   │
│   └── OPTION B: A regular retail vehicle is found parked in Power Sport / Quad Corner:
│       │
│       ACTION: This vehicle must be moved immediately. A regular vehicle in the Power Sport / Quad Corner is a placement error. Regular vehicles cannot operate normally in this zone (doors cannot open). The zone must remain clear for power sport, boat, and Hysen deliveries.
│       ROLE: Lot Attendant / Lot Manager
│       │
│       ACTION: Identify the vehicle's status before moving it.
│       ROLE: Lot Attendant
│       → SEE: vehicle-categorization.md (to determine the correct destination zone based on vehicle status)
│       │
│       ACTION: Move the vehicle to the correct zone per its categorized status.
│       ROLE: Lot Attendant
│       │
│       ACTION: Document in WhatsApp group.
│       ROLE: Lot Manager
│       SAY: "[Vehicle description] found in Power Sport / Quad Corner — placement error. Moved to [correct zone] on [date / time]."
│       │
│       └── THEN: → Vehicle placed in correct zone. Power Sport / Quad Corner cleared.
│           [TERMINAL OUTCOME 2]

---

## Terminal Outcomes

- **Outcome 1 — Delivery placed in Power Sport / Quad Corner:** Power sport, boat, or Hysen unit (post-snow-melt) moved to Power Sport / Quad Corner with exit lane preserved. Documented in WhatsApp group.
- **Outcome 2 — Misplaced regular vehicle relocated:** Regular retail vehicle found in Power Sport / Quad Corner identified, categorized, and moved to correct zone. Documented in WhatsApp group.
- **Outcome 3 — Hysen unit held pending season:** Hysen unit arrived before post-snow-melt timing. Not placed. Sales Manager (Kevin) escalated for alternate storage direction.
- **Outcome 4 — Zone at capacity:** Delivery cannot be placed in Power Sport / Quad Corner. Sales Manager (Kevin) escalated for alternate holding direction.

---

## Notes

- **Power Sport / Quad Corner is dead space:** Regular vehicles cannot be parked here because doors cannot open due to proximity to walls or structures. This zone exists precisely because it is unusable for retail vehicles — it is the correct space for power sport deliveries and seasonal items because these do not require door clearance.
- **Hysen units are strictly seasonal:** Post-snow-melt timing is the trigger for Hysen unit placement. They are not stored here year-round. The seasonal boundary is weather and business-condition dependent.
- **Last usable exit position:** When placing deliveries, preserve the last position from which a vehicle can still exit the zone. Never block the only exit path.
- **No retail vehicles — no exceptions:** Under no circumstances may a retail vehicle (NEW, FLR, SOLD, BND, RECON, or any inventory vehicle) be placed in the Power Sport / Quad Corner for any reason, including temporary holding.
- [NEEDS_INPUT]: Exact capacity of Power Sport / Quad Corner — number of power sport / boat units that can be staged simultaneously before the last usable exit position is reached. Source confirms the zone exists but does not specify exact unit count.
- [ASSUMPTION]: "Last usable exit position" is interpreted as the furthest position in the zone from which a vehicle or equipment can still be driven or moved out without requiring another unit to be relocated first. This may need physical verification on the lot.
