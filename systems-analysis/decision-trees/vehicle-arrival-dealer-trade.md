# Decision Tree: Vehicle Arrival — Dealer Trade
**File:** vehicle-arrival-dealer-trade.md
**Status:** [COMPLETE]
**Cross-references:**
- vehicle-arrival-ship-mode.md (if dealer trade arrives in ship mode)
- vehicle-pdi-routing.md (PDI routing)
- vehicle-pdi-compliance-deadline.md (2-day deadline monitoring)
- vehicle-detailing-routing.md (post-PDI detail)
- vehicle-placement-cage.md (Cage placement — if FLR after PDI)
- vehicle-sold-processing.md (if vehicle is sold at time of arrival — rare)
- vehicle-non-prime-identification.md (non-prime routing — Phase 3B)

---

## Trigger
A vehicle arrives at the Edmonton Office lot as a dealer trade — transported from another dealership. This includes vehicles that the originating dealer claims are "already inspected" or "ready to go."

## Responsible Role
Lot Manager / Operations Manager (primary); Service Technician (PDI — mandatory); Lot Attendant (physical steps)

---

## !! NON-NEGOTIABLE RULE !!

> The Edmonton Office MUST perform its own final PDI on EVERY dealer trade — regardless of what the originating dealer certifies.
>
> Reason: This is a Stellantis manufacturer requirement. The 2-day PDI window applies from the moment the vehicle arrives at the Edmonton Office, not from when the originating dealer did their inspection. The other dealer's certification is irrelevant to our compliance.
>
> Current compliance rate: 80% — we are in the red zone where fines and docking begin. Every skipped dealer trade PDI makes this worse.

---

## Decision Tree

```
START: Dealer trade vehicle arrives at Edmonton Office lot
│
├── Q1: IS THIS VEHICLE IN SHIP MODE?
│   (Is the battery disconnected? Is software in low-power/transport mode?)
│   │
│   ├── YES:
│   │   ACTION: Do not process this vehicle further until ship mode is cleared.
│   │   ROLE: Lot Manager
│   │   → SEE: vehicle-arrival-ship-mode.md
│   │   NOTE: Ship mode steps must complete before PDI. PDI clock still starts
│   │         at delivery date to this dealership — not after ship mode is cleared.
│   │   THEN: Return to this tree at Q2 once ship mode is cleared.
│   │
│   └── NO: Continue to Q2
│
├── Q2: CHECK AIRTABLE — STOCK HOLDER field
│   Open Airtable → INVENTORY SYSTEMS → MASTER INVENTORY → locate vehicle by VIN
│   │
│   ├── STOCK HOLDER = "NON PRIME DIVISION":
│   │   ACTION: Do NOT process vehicle on this lot.
│   │   ROLE: Lot Manager
│   │   CHANNEL: WhatsApp group
│   │   SAY: "Dealer trade [VIN] confirmed NON PRIME DIVISION. Routing to AB | STURGEON DODGE immediately."
│   │   → SEE: vehicle-non-prime-identification.md
│   │   [TERMINAL — vehicle leaves this lot]
│   │
│   └── STOCK HOLDER = "STURGEON DODGE": Continue to Q3
│
├── Q3: IS SALESPERSON OR ORIGINATING DEALER CLAIMING "IT'S ALREADY INSPECTED,
│       IT'S GOOD TO GO, PDI IS NOT NEEDED"?
│   │
│   ├── YES — Someone claims PDI can be skipped:
│   │   ACTION: Refuse. PDI will be performed regardless.
│   │   ROLE: Lot Manager
│   │   CHANNEL: Direct conversation (in-person or phone)
│   │   SAY: "Stellantis requires a final PDI at the receiving dealership within
│   │         2 days of delivery. We're at 80% compliance, in the red zone. It
│   │         needs to go through service. The other dealer's inspection does not
│   │         satisfy our final PDI requirement."
│   │   IF SALESPERSON CONTINUES PUSHING:
│   │   ACTION: Escalate to Sales Manager (Kevin).
│   │   CHANNEL: WhatsApp group + direct conversation
│   │   SAY: "Kevin — [Salesperson name] is asking to skip final PDI on dealer trade
│   │         [VIN]. Stellantis requires the receiving dealership to perform final PDI
│   │         within 2 days. We are in the red zone at 80% compliance. PDI will happen."
│   │   THEN: Continue to Q4 regardless — PDI is not skippable
│   │
│   └── NO — No pushback: Continue to Q4
│
├── Q4: RECORD DELIVERY DATE AND SET PDI CLOCK
│   CRITICAL: The Stellantis 2-day PDI window starts TODAY — from the vehicle's
│             delivery date to this dealership. NOT from the originating dealer's
│             inspection date. NOT from when paperwork is completed. Starts NOW.
│   ACTION: Record delivery date in Airtable. Communicate to service department.
│   ROLE: Lot Manager
│   → SEE: vehicle-pdi-compliance-deadline.md (begin deadline monitoring immediately)
│   THEN: Continue to Q5
│
├── Q5: SET VEHICLE STATUS IN AIRTABLE
│   ACTION: Set Airtable status to AVAILABLE (per vehicle-statuses-and-transitions.md:
│           dealer trades use AVAILABLE on arrival, same as standard new vehicle).
│   ROLE: Lot Manager or Admin — Stock Tags (Jorja) / Admin/Tech (Giselle)
│   CRITICAL: NEVER use "IN RECON" for a dealer trade. Recon status hides the vehicle
│             from the sales inventory system.
│   THEN: Continue to Q6
│
├── Q6: OBTAIN AND PLACE STOCK-IN TAG
│   ACTION: Contact Jorja or Giselle for a white stock-in tag.
│   ROLE: Lot Attendant or Lot Manager (requests); Jorja or Giselle (fills tag)
│   CHANNEL: In-person or WhatsApp
│   SAY: "Dealer trade arrived — [Year] [Make] [Model], VIN [VIN]. Need stock-in tag."
│   ACTION: Place completed tag in bottom-right corner of windshield.
│   ROLE: Lot Attendant
│   THEN: Continue to Q7
│
├── Q7: ROUTE VEHICLE TO PDI (MANDATORY — NO EXCEPTIONS)
│   ACTION: Notify service department. Request immediate PDI scheduling.
│   ROLE: Lot Manager
│   CHANNEL: Direct communication (in-person or phone) + WhatsApp group
│   SAY: "Dealer trade arrived for MANDATORY final PDI — stock number [STOCK#],
│         VIN [VIN]. Arrived from [Originating dealer name if known].
│         Delivery date [DATE]. PDI deadline: [DATE + 2 calendar days].
│         Please schedule immediately."
│   → SEE: vehicle-pdi-routing.md (full PDI procedure)
│   → SEE: vehicle-pdi-compliance-deadline.md (deadline monitoring — active now)
│   THEN: Wait for PDI confirmation
│
├── Q8: PDI COMPLETE — CONFIRMED IN MANUFACTURER SYSTEM?
│   (Verbal "done" from technician is NOT sufficient.)
│   │
│   ├── NO — Not yet marked in system:
│   │   ACTION: Follow up with Service Department Lead.
│   │   ROLE: Lot Manager
│   │   CHANNEL: Direct communication
│   │   SAY: "Can you confirm PDI for dealer trade [VIN] is marked complete in the
│   │         manufacturer system? We need the system entry confirmed."
│   │   THEN: Return to Q8
│   │
│   └── YES — Confirmed in manufacturer system: Continue to Q9
│
├── Q9: DID PDI REVEAL ANY MECHANICAL ISSUES?
│   │
│   ├── YES — Mechanical issues found:
│   │   ACTION: Update Airtable status to IN RECON.
│   │   ACTION: Move vehicle to West Side of Building (slots L1–L5).
│   │   ROLE: Lot Attendant (physical move); Lot Manager (Airtable update)
│   │   CHANNEL: WhatsApp group
│   │   SAY: "Dealer trade [VIN] — PDI revealed mechanical issues.
│   │         Moving to West Side of Building. Status: IN RECON."
│   │   → SEE: vehicle-recon-routing.md
│   │   NOTE: Vehicle does not continue in this tree until recon complete,
│   │         re-PDI'd, and detailed. Resume from Q10 at that point.
│   │
│   └── NO — PDI complete, no mechanical issues: Continue to Q10
│
├── Q10: ROUTE VEHICLE TO DHD FOR FULL DETAIL
│   ACTION: Contact DHD to schedule full detail. Cost: $60.
│   ROLE: Lot Manager or Lot Attendant
│   CHANNEL: Direct contact with DHD
│   SAY: "Vehicle for full detail — [Year] [Make] [Model], VIN [VIN],
│         located at [zone/slot]. Cost: $60. Please confirm turnaround."
│   → SEE: vehicle-detailing-routing.md
│   THEN: Wait for DHD to return vehicle
│
├── Q11: DOES VEHICLE PASS DETAIL INSPECTION ON RETURN?
│   Check: No visible dirt/debris, no stickers, no tape on any exterior surface.
│   │
│   ├── NO — Vehicle fails inspection:
│   │   ACTION: Do NOT accept. Return to DHD for redo.
│   │   ROLE: Lot Manager or Lot Attendant
│   │   SAY: "This vehicle is not ready — [specific issue]. Please redo it."
│   │   THEN: Return to Q11
│   │
│   └── YES — Vehicle passes inspection: Continue to Q12
│
├── Q12: WHAT IS THE VEHICLE'S CURRENT AIRTABLE STATUS?
│   │
│   ├── AVAILABLE or DEMO (Front-Line Ready):
│   │   ACTION: Confirm stock-in tag is present in bottom-right corner of windshield.
│   │   If tag missing: obtain from Jorja/Giselle and place it.
│   │   → SEE: vehicle-placement-cage.md
│   │   [Route to Cage placement — TERMINAL for FLR path]
│   │
│   ├── SIGNED DEAL or WHOLESALE | SOLD (vehicle was already sold):
│   │   → SEE: vehicle-sold-processing.md
│   │   [Route to sold processing — TERMINAL for sold path]
│   │
│   └── BOOKED | NOT DELIVERED (vehicle is BND):
│       → SEE: vehicle-bnd-handling.md
│       [Route to BND handling — TERMINAL for BND path]
```

---

## Terminal Outcomes

- **OUTCOME 1 — Vehicle in Cage (FLR):** PDI complete, detail complete, stock-in tag placed. Vehicle placed in Cage per slot priority rules. Available for sale.
- **OUTCOME 2 — Vehicle in East Side Fence Line (SOLD):** Vehicle arrived already sold. Sold sign placed. Moved to East Side Fence Line or overflow.
- **OUTCOME 3 — Vehicle in RECON (West Side of Building):** PDI revealed mechanical issues. Vehicle in West Side of Building with IN RECON status. Rejoins flow at Q10 after recon.
- **OUTCOME 4 — Vehicle routed to AB | STURGEON DODGE:** STOCK HOLDER = "NON PRIME DIVISION". Vehicle leaves Edmonton Office lot.
- **OUTCOME 5 — Vehicle in ship mode processing:** Vehicle arrived in ship mode. Ship mode tree activated. Returns to this tree at Q2 after ship mode is cleared.

---

## Notes

- **[CRITICAL] No dealer's inspection substitutes for Edmonton Office final PDI.** This is a Stellantis requirement, not an internal preference. The 2-day window applies from arrival at this dealership.
- **[CRITICAL] 80% compliance context:** Every skipped dealer trade PDI drops the compliance rate further. Fines and docking begin near this threshold.
- **[NEEDS_INPUT] Service Department Lead contact:** Who receives PDI routing requests? Name and contact method unconfirmed.
- **[NEEDS_INPUT] Originating dealer communication protocol:** Is there a standard process for notifying the originating dealer that their vehicle has arrived and final PDI is being performed? Not specified in source material.
- **[AMBIGUOUS] DHD vs. DHG:** Primary detailing vendor name discrepancy between walkthrough transcript and CLAUDE.md. Using "DHD" per CLAUDE.md canonical name. Verify before finalizing.
