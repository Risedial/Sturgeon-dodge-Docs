# Decision Tree: Vehicle Trade-In Processing
**File:** vehicle-trade-in-processing.md
**Status:** [COMPLETE]
**Cross-references:**
- vehicle-non-prime-identification.md (non-prime check on trade-in — Phase 3B)
- vehicle-recon-routing.md (trade-ins needing mechanical work)
- vehicle-detailing-routing.md (trade-ins needing detail only before retail)
- vehicle-auction-routing.md (auction-bound trade-ins — Phase 3B)
- vehicle-arrival-new-standard.md (if trade-in is front-line ready, adapt for used vehicle flow)
- vehicle-sold-processing.md (this tree is triggered from sold processing when trade-in is present)

---

## Trigger
A customer has surrendered a vehicle as part of a deal. The trade-in vehicle has physically arrived on the Edmonton Office lot. This tree is executed immediately when the vehicle arrives — not when the deal is finalized, not at the end of the day.

## Responsible Role
Lot Attendant (immediate trade-in banner placement and physical staging); Lot Manager / Operations Manager (condition assessment and routing decision)

---

## Decision Tree

```
START: Trade-in vehicle arrives on lot from customer
│
├── IMMEDIATE ACTION: PLACE TRADE-IN BANNER ON VEHICLE IMMEDIATELY
│   │
│   ACTION: Go upstairs to retrieve a trade-in banner (stored with sold signs).
│           Place the trade-in banner on the vehicle immediately — before any assessment,
│           before any movement, before any other action.
│           Banner reads: "TRADE IN"
│   ROLE: Lot Attendant
│   CHANNEL: WhatsApp group (document arrival)
│   SAY: "Trade-in received — [make/model/year, description if known]. Banner placed.
│         Standing by for Lot Manager routing decision."
│   │
│   [If trade-in banner is NOT placed immediately, the vehicle cannot be distinguished
│   from inventory, BND vehicles, or customer vehicles. This creates the same paralysis
│   as the Kia incident — 6 weeks of inaction because no one knew what the vehicle was.]
│   │
│   └── Continue to STEP 1
│
├── STEP 1: CHECK AIRTABLE — STOCK HOLDER field
│   Open Airtable → INVENTORY SYSTEMS → MASTER INVENTORY → locate vehicle by VIN
│   (If VIN not yet in Airtable: hold vehicle in place with trade-in banner until VIN
│    can be confirmed and entered. Do not route vehicle until STOCK HOLDER is verified.)
│   │
│   ├── STOCK HOLDER = "NON PRIME DIVISION":
│   │   ACTION: Do NOT process vehicle on this lot. Do not route to DHD, RECON, or Cage.
│   │   ROLE: Lot Manager
│   │   CHANNEL: WhatsApp group
│   │   SAY: "Trade-in [VIN] confirmed NON PRIME DIVISION. Routing to AB | STURGEON DODGE
│   │         immediately. Trade-in banner remains on vehicle."
│   │   → SEE: vehicle-non-prime-identification.md
│   │   [TERMINAL — vehicle leaves this lot]
│   │
│   ├── STOCK HOLDER = "STURGEON DODGE": Continue to STEP 2
│   │
│   └── VIN not found in Airtable / STOCK HOLDER blank:
│       ACTION: Hold vehicle with trade-in banner in place.
│               Contact Lot Manager and Admin — Stock Tags (Jorja) or Admin/Tech (Giselle).
│       ROLE: Lot Attendant
│       CHANNEL: WhatsApp group
│       SAY: "Trade-in vehicle [description — make/model/year] not found in Airtable.
│             VIN: [VIN if readable]. Holding with trade-in banner. Need STOCK HOLDER
│             confirmation before routing."
│       THEN: Resume from STEP 1 once VIN and STOCK HOLDER are confirmed.
│       [TERMINAL pending resolution]
│
├── STEP 2: LOT MANAGER ASSESSES TRADE-IN CONDITION
│   │
│   ACTION: Lot Manager physically inspects trade-in vehicle.
│   ROLE: Lot Manager
│   │
│   Assess:
│   - Exterior condition (paint, body panels, glass)
│   - Interior condition (upholstery, dashboard, odors)
│   - Mechanical condition (any obvious mechanical issues — does it start/run normally?)
│   - Overall condition relative to retail-readiness
│   │
│   └── Continue to Q1 (routing decision based on assessment)
│
├── Q1: WHAT ROUTING DOES THIS TRADE-IN REQUIRE?
│   │
│   ├── AUCTION-BOUND (vehicle is not suitable for retail — condition too poor,
│   │   management decision, or explicitly routed to auction):
│   │   │
│   │   ACTION: Move vehicle to Auction Area immediately.
│   │           Trade-in banner must remain on vehicle.
│   │           Update Airtable routing as appropriate.
│   │   ROLE: Lot Attendant (physical move); Lot Manager (decision)
│   │   CHANNEL: WhatsApp group
│   │   SAY: "Trade-in [VIN / description] — routed to Auction Area. Trade-in banner in
│   │         place. Auction Area slot: [location]."
│   │   → SEE: vehicle-auction-routing.md (Phase 3B)
│   │   [TERMINAL for this tree — Auction routing tree governs next steps]
│   │
│   ├── NEEDS MECHANICAL WORK (vehicle has mechanical issues that must be resolved
│   │   before it can be detailed or offered for retail sale):
│   │   │
│   │   ACTION: Move vehicle to West Side of Building.
│   │           Set Airtable status = IN RECON.
│   │           Trade-in banner must remain on vehicle.
│   │           Notify Service Department Lead of incoming RECON vehicle.
│   │   ROLE: Lot Attendant (physical move); Lot Manager (decision and service notification)
│   │   CHANNEL: Direct communication with Service Department Lead + WhatsApp group
│   │   SAY (to service): "Trade-in [VIN] arriving at West Side of Building — IN RECON.
│   │                       Needs mechanical assessment and work before detail.
│   │                       Stock number: [stock number]."
│   │   SAY (WhatsApp): "Trade-in [VIN] — mechanical work required — moved to West Side
│   │                    of Building, status: IN RECON. Service notified."
│   │   → SEE: vehicle-recon-routing.md
│   │   [TERMINAL for this tree — Recon routing tree governs next steps]
│   │
│   ├── NEEDS DETAIL ONLY (vehicle is mechanically sound but needs full detail
│   │   before it can be offered for retail sale):
│   │   │
│   │   ACTION: Route vehicle to DHD for full detail ($60).
│   │           Trade-in banner must remain on vehicle through detailing.
│   │   ROLE: Lot Attendant (physical routing); Lot Manager (decision)
│   │   CHANNEL: Direct communication with DHD + WhatsApp group
│   │   SAY (DHD): "Trade-in vehicle — full detail required. VIN: [VIN]. Location: [current
│   │               location on lot]. Please contact us for vehicle pickup/dropoff."
│   │   SAY (WhatsApp): "Trade-in [VIN] — detail only — routed to DHD. No mechanical
│   │                    issues. Cost: $60."
│   │   THEN: After DHD detail → Q2 (post-detail assessment for retail routing)
│   │
│   └── FRONT-LINE READY CONDITION (vehicle is in exceptional condition — mechanical
│       and cosmetic — and can be processed directly for retail after PDI and detail):
│       │
│       ACTION: Confirm PDI requirement applies (used vehicle PDI — check if applicable).
│               Route through full PDI + detail + stock-in tag flow before Cage placement.
│       ROLE: Lot Manager
│       CHANNEL: WhatsApp group
│       SAY: "Trade-in [VIN] — front-line ready condition. Routing through PDI + DHD
│             detail + stock-in tag before Cage placement."
│       → SEE: vehicle-pdi-routing.md (for PDI step)
│       → SEE: vehicle-detailing-routing.md (for detail step)
│       → SEE: vehicle-placement-cage.md (for Cage placement after PDI + detail + tag)
│       [TERMINAL for this tree — PDI/detail/placement trees govern next steps]
│
└── Q2: POST-DETAIL ASSESSMENT — AFTER DHD COMPLETES DETAIL ON TRADE-IN
    (Only reached if routed to DHD for detail in Q1)
    │
    ├── Q2a: DOES VEHICLE PASS POST-DETAIL INSPECTION?
    │   (Same inspection criteria as standard detailing — no dirt, no stickers, no tape,
    │   clean interior)
    │   │
    │   ├── NO — vehicle fails inspection:
    │   │   ACTION: Return to DHD for redo.
    │   │   ROLE: Lot Manager or Lot Attendant
    │   │   CHANNEL: Direct communication with DHD
    │   │   SAY: "This trade-in is not ready — [specific issue]. Please redo it."
    │   │   THEN: Re-inspect when DHD returns vehicle. Resume Q2a.
    │   │
    │   └── YES — vehicle passes inspection: Continue to Q2b
    │
    └── Q2b: AFTER DETAIL — DOES VEHICLE NEED PDI BEFORE CAGE PLACEMENT?
        │
        [NOTE: For used trade-ins, PDI requirement depends on whether a PDI is required
        under dealership standards for used retail inventory. Source material does not
        specify a separate used-vehicle PDI requirement. Apply same standard as applicable.]
        [NEEDS_INPUT — does the Edmonton Office require PDI for all used retail vehicles,
        or only for new vehicles and dealer trades?]
        │
        ├── PDI REQUIRED (apply same 2-day window tracking if applicable):
        │   ACTION: Route to service for PDI before Cage placement.
        │   → SEE: vehicle-pdi-routing.md
        │
        └── PDI NOT REQUIRED FOR USED RETAIL:
            ACTION: Place stock-in tag on vehicle (bottom-right windshield, white).
                    Route to Cage placement.
            ROLE: Lot Attendant
            → SEE: vehicle-placement-cage.md
            [TERMINAL for this tree — placement tree governs next steps]
```

---

## Terminal Outcomes

- **Outcome A — Trade-in routed to Auction Area:** Vehicle assessed as auction-bound; banner placed; moved to Auction Area; auction-routing.md governs next steps.
- **Outcome B — Trade-in routed to West Side of Building (RECON):** Vehicle needs mechanical work; banner remains; moved to West Side of Building with IN RECON status; service notified; recon-routing.md governs next steps.
- **Outcome C — Trade-in routed to DHD for detail, then retail:** Vehicle mechanically sound; routed to DHD for full detail ($60); post-detail inspection completed; stock-in tag placed; Cage placement via vehicle-placement-cage.md.
- **Outcome D — Trade-in front-line ready, routed through PDI + detail + Cage:** Vehicle in exceptional condition; routed through full PDI and detail flow before Cage placement.
- **Outcome E — Trade-in confirmed NON PRIME DIVISION:** Airtable STOCK HOLDER = NON PRIME DIVISION; vehicle exits Edmonton Office lot immediately; routed to AB | STURGEON DODGE.
- **Outcome F — Trade-in held pending VIN / STOCK HOLDER confirmation:** VIN not in Airtable or STOCK HOLDER field blank; vehicle held with trade-in banner until confirmed.

---

## Notes

- **Trade-in banner is placed IMMEDIATELY** — before condition assessment, before any movement, before any routing decision. The banner is the first action, always.
- **Trade-in banner supplies:** Stored upstairs with sold signs.
- **Trade-in banner content:** "TRADE IN" — no additional writing required on the banner itself.
- **STOCK HOLDER check is mandatory for trade-ins.** A trade-in could potentially be a non-prime vehicle. The STOCK HOLDER field must be confirmed before any routing decision is made.
- **DHD is the only full-detail vendor.** Cost: $60. Trade-ins routed to DHD follow the same post-detail inspection protocol as new vehicles.
- [NEEDS_INPUT]: Whether a PDI is required for used-vehicle trade-ins before Cage placement. Source material specifies the 2-day PDI window for new vehicles and dealer trades but does not explicitly address used-vehicle PDI requirements for trade-ins.
- [NEEDS_INPUT]: Who makes the final auction vs. retail vs. RECON routing decision — is this the Lot Manager alone, or does Sales Manager (Kevin) or another role need to approve the routing decision for trade-ins?
