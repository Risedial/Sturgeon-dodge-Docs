# Decision Tree: New Vehicle Arrival — Ship Mode
**File:** vehicle-arrival-ship-mode.md
**Status:** [COMPLETE]
**Cross-references:**
- vehicle-arrival-new-standard.md (standard arrival — called from this tree after ship mode is cleared)
- vehicle-pdi-routing.md (PDI routing)
- vehicle-pdi-compliance-deadline.md (2-day deadline monitoring)

---

## Trigger
A new vehicle arrives at the Edmonton Office lot with battery disconnected and/or software in low-power/transport mode (factory ship mode). This tree is also activated when vehicle-arrival-new-standard.md Q1 returns YES.

## Responsible Role
Lot Manager / Operations Manager (primary); Service Technician (battery reconnection, software reset, PDI)

---

## !! NEVER-SKIP WARNING !!

> **CONFIRMED REAL INCIDENT — This happened at the Edmonton Office.**
>
> A vehicle was delivered to a customer while still in ship mode. The battery was disconnected. The PDI had not been performed.
>
> **What happened:** The car died the next day after delivery — the customer was stranded. The vehicle had to be towed back to the dealership. Cost: $275 (full detail rework) + tow cost (unspecified) + complete rework of the entire preparation process. The customer experienced a failed delivery and had to wait for the entire process to be redone.
>
> **This is why ship mode cannot be skipped under any circumstances.**

---

## Decision Tree

```
START: Vehicle arrives in ship mode (battery disconnected / software in transport state)
│
├── MANDATORY STEP 1: CONFIRM SHIP MODE STATUS
│   ACTION: Verify that the vehicle is in ship mode — battery is disconnected,
│           software is in low-power/transport mode.
│   ROLE: Lot Manager (confirms) / Service Technician (technical assessment)
│   NOTE: If ship mode is not confirmed and vehicle was incorrectly flagged,
│         → SEE: vehicle-arrival-new-standard.md
│   THEN: Continue to MANDATORY STEP 2
│
├── MANDATORY STEP 2: RECONNECT BATTERY
│   ACTION: Service technician physically reconnects the vehicle battery.
│   ROLE: Service Technician
│   NOTE: This step MUST happen before any other step. No other action is taken
│         while battery is disconnected.
│   CONFIRM: Battery is reconnected and vehicle is responding normally.
│   THEN: Continue to MANDATORY STEP 3
│
├── MANDATORY STEP 3: PERFORM SOFTWARE RESET
│   ACTION: Service technician performs the manufacturer-specified software reset procedure.
│   ROLE: Service Technician
│   NOTE: Software reset is required to clear the transport/low-power state.
│         This is a separate step from battery reconnection — both are required.
│   CONFIRM: Software reset is complete and ship mode is cleared.
│   THEN: Continue to MANDATORY STEP 4
│
├── MANDATORY STEP 4: CONFIRM SHIP MODE CLEARED
│   ACTION: Confirm that ship mode is fully cleared before any other step.
│   ROLE: Service Technician (confirms to Lot Manager)
│   CHANNEL: Direct communication
│   SAY: "Ship mode cleared on [VIN] — battery reconnected and software reset complete."
│   THEN: Continue to Q1
│
├── Q1: CHECK AIRTABLE — STOCK HOLDER field
│   Open Airtable → INVENTORY SYSTEMS → MASTER INVENTORY → locate vehicle by VIN
│   │
│   ├── STOCK HOLDER = "NON PRIME DIVISION":
│   │   ACTION: Do NOT process vehicle on this lot.
│   │   ROLE: Lot Manager
│   │   CHANNEL: WhatsApp group
│   │   SAY: "Vehicle [VIN] confirmed NON PRIME DIVISION. Routing to AB | STURGEON DODGE immediately."
│   │   → SEE: vehicle-non-prime-identification.md
│   │   [TERMINAL — vehicle leaves this lot]
│   │
│   └── STOCK HOLDER = "STURGEON DODGE": Continue to Q2
│
├── Q2: SALESPERSON OR ANYONE ELSE SAYS "IT'S FINE, JUST DELIVER IT" OR
│       "WE DON'T NEED PDI, JUST SEND IT"?
│   │
│   ├── YES — Someone is pushing to skip PDI:
│   │   ACTION: Refuse. Do not deliver or place on front line.
│   │   ROLE: Lot Manager
│   │   CHANNEL: Direct (in-person or phone)
│   │   SAY: "Stellantis requires PDI within 2 days of delivery. This vehicle is in
│   │         ship mode. It cannot be delivered or placed on front line until ship
│   │         mode is cleared and PDI is complete."
│   │   IF PUSHBACK CONTINUES:
│   │   ACTION: Escalate to Sales Manager (Kevin).
│   │   ROLE: Lot Manager
│   │   CHANNEL: WhatsApp group + direct conversation
│   │   SAY: "Kevin — [Salesperson name] is asking to deliver [VIN] before PDI is
│   │         complete. This vehicle was in ship mode. PDI is mandatory per Stellantis.
│   │         We are at 80% compliance in the red zone. I need your support."
│   │   THEN: Continue to Q3 regardless of pushback — PDI is not skippable
│   │
│   └── NO — No pushback: Continue to Q3
│
├── Q3: NOTE THE PDI CLOCK START TIME
│   CRITICAL: The Stellantis 2-day PDI window starts at the vehicle's DELIVERY DATE
│             to the dealership — NOT at the time ship mode was cleared, NOT when
│             the battery was reconnected, NOT when any paperwork was completed.
│   ACTION: Record delivery date in Airtable and communicate to service department.
│   ROLE: Lot Manager
│   → SEE: vehicle-pdi-compliance-deadline.md (begin monitoring immediately)
│   THEN: Continue to Q4
│
├── Q4: SET VEHICLE STATUS IN AIRTABLE
│   ACTION: Set Airtable status to AVAILABLE (Pending PDI).
│   ROLE: Lot Manager or Admin — Stock Tags (Jorja) / Admin/Tech (Giselle)
│   CRITICAL: NEVER use "IN RECON" for a new arrival. Using RECON status hides the
│             vehicle from the sales inventory system.
│   THEN: Continue to Q5
│
├── Q5: OBTAIN AND PLACE STOCK-IN TAG
│   ACTION: Contact Jorja or Giselle for a white stock-in tag.
│   ROLE: Lot Attendant or Lot Manager (requests); Jorja or Giselle (fills tag)
│   CHANNEL: In-person or WhatsApp
│   SAY: "New vehicle — ship mode cleared, needs stock-in tag: [Year] [Make] [Model], VIN [VIN]."
│   ACTION: Place completed tag in bottom-right corner of windshield.
│   ROLE: Lot Attendant
│   THEN: Continue to Q6
│
├── Q6: ROUTE VEHICLE TO PDI
│   ACTION: Notify service department. Request immediate PDI scheduling.
│   ROLE: Lot Manager
│   CHANNEL: Direct communication (in-person or phone) + WhatsApp group
│   SAY: "New vehicle needs PDI — ship mode just cleared. Stock number [STOCK#],
│         VIN [VIN]. Arrival date [DATE]. PDI deadline: [DATE + 2 calendar days].
│         Reminder: clock started at delivery date, not today. Please schedule immediately."
│   → SEE: vehicle-pdi-routing.md (full PDI procedure)
│   → SEE: vehicle-pdi-compliance-deadline.md (deadline monitoring — begin now)
│   THEN: Continue to standard PDI flow
│
└── Q7: PDI COMPLETE AND SHIP MODE FULLY RESOLVED?
    (Once PDI is confirmed complete in manufacturer system)
    │
    ├── NO — PDI not yet complete or ship mode issue persists:
    │   ACTION: Do NOT place vehicle on front line or arrange delivery.
    │   → SEE: vehicle-pdi-compliance-deadline.md (monitor deadline)
    │   THEN: Return to Q7
    │
    └── YES — PDI confirmed complete in manufacturer system:
        ACTION: Continue to standard vehicle processing flow.
        → SEE: vehicle-arrival-new-standard.md (resume from Q10 — detailing step)
        [TERMINAL for this tree — standard flow takes over]
```

---

## Terminal Outcomes

- **OUTCOME 1 — Ship mode cleared, PDI complete, standard flow resumed:** Battery reconnected, software reset performed, ship mode confirmed clear. PDI completed by technician and marked in manufacturer system. Processing continues under vehicle-arrival-new-standard.md from the detailing step onward.
- **OUTCOME 2 — Non-prime vehicle routed off lot:** STOCK HOLDER = "NON PRIME DIVISION" confirmed during Q1. Vehicle leaves Edmonton Office lot immediately.
- **OUTCOME 3 — Vehicle held pending PDI (in-progress):** Ship mode cleared, vehicle in service for PDI, deadline monitoring active. Will resolve to Outcome 1 once PDI marked complete.

---

## Notes

- **[CRITICAL — CONFIRMED INCIDENT]** A vehicle was delivered to a customer in ship mode. The battery died the next day. The vehicle required a tow back to the dealership. Total cost: $275 (detail rework) + tow cost. This is documented in failure-modes.md FM-01 and compliance-requirements.md Section 2. This protocol exists specifically because this incident occurred.
- **[CRITICAL] PDI clock ≠ ship mode clearance time.** The Stellantis 2-day window starts at delivery date. A vehicle that arrived yesterday in ship mode has used one of its two days even while ship mode is being cleared today.
- **[CRITICAL] Step order is non-negotiable:** Battery reconnect → software reset → PDI. These three steps must happen in this exact sequence. No step substitutes for another.
- **[AMBIGUOUS] DHD vs. DHG:** See vehicle-arrival-new-standard.md Notes. Same vendor, name to be confirmed.
- **[NEEDS_INPUT] Service Department Lead contact:** Who receives the PDI routing call? Name unconfirmed.
- **[NEEDS_INPUT] Exact Stellantis fine amounts:** Exact dollar penalties for PDI non-compliance are not specified in source material. Confirm with management before finalizing financial references.
