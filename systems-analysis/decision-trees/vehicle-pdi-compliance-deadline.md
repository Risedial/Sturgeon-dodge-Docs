# Decision Tree: Vehicle PDI Compliance Deadline Monitoring
**File:** vehicle-pdi-compliance-deadline.md
**Status:** [COMPLETE]
**Cross-references:**
- vehicle-pdi-routing.md (PDI routing — this tree runs in parallel with PDI routing)
- vehicle-arrival-new-standard.md (calls this tree)
- vehicle-arrival-ship-mode.md (calls this tree)
- vehicle-arrival-dealer-trade.md (calls this tree)

---

## Trigger
A vehicle has arrived at the Edmonton Office lot and requires PDI. This tree begins immediately upon vehicle arrival — the 2-day Stellantis PDI compliance clock is active from delivery date. This tree runs in parallel with vehicle-pdi-routing.md and monitors whether the deadline will be met.

## Responsible Role
Lot Manager / Operations Manager (primary monitor); Service Department Lead (escalation recipient Day 1); General Manager (escalation recipient Day 2)

---

## Critical Context

| Fact | Value |
|---|---|
| Current compliance rate | 80% |
| Compliance status | RED ZONE — fines and docking begin near this threshold |
| PDI deadline | 2 calendar days from delivery date to dealership |
| Clock start | Delivery date to dealership (not when processing begins, not when ship mode is cleared) |
| What constitutes PDI complete | Technician marks complete in manufacturer system — NOT verbal confirmation |
| Who monitors | Lot Manager checks daily |

---

## Decision Tree

```
START: Vehicle arrives on lot — PDI clock starts (delivery date = Day 0)
│
├── IMMEDIATE ACTION ON ARRIVAL: Record delivery date
│   ACTION: Record the vehicle's delivery date in Airtable.
│           Calculate the PDI deadline: delivery date + 2 calendar days.
│   ROLE: Lot Manager
│   EXAMPLE: Vehicle arrives Monday = Day 0.
│             PDI deadline = Wednesday (end of business).
│   NOTE: If vehicle arrived in ship mode, clock still started at delivery date —
│         not when ship mode was cleared.
│   → SEE: vehicle-pdi-routing.md (route vehicle to PDI now)
│   THEN: Continue daily monitoring below
│
├── DAILY CHECK: IS PDI COMPLETE? (Check each morning until resolved)
│   (PDI is complete only when technician has marked it in manufacturer system)
│   │
│   ├── YES — PDI confirmed complete in manufacturer system:
│   │   ACTION: Confirm with service technician that the system entry is made.
│   │   ACTION: Update Airtable to reflect PDI complete.
│   │   ACTION: Document in WhatsApp group.
│   │   ROLE: Lot Manager
│   │   CHANNEL: WhatsApp group
│   │   SAY: "PDI for [VIN] confirmed complete — marked in manufacturer system
│   │         on [DATE]. Compliance clock satisfied. Routing to detail."
│   │   NOTE: Verbal confirmation is NOT sufficient. System entry must be confirmed.
│   │   [TERMINAL — PDI complete, deadline satisfied, monitoring ends]
│   │
│   └── NO — PDI not yet complete: Continue to DAY CHECK below
│
├── DAY 1 CHECK: Has one calendar day passed since delivery date AND PDI is not complete?
│   │
│   ├── YES — Day 1, PDI still not complete:
│   │   ACTION: Notify Service Department Lead immediately.
│   │   ROLE: Lot Manager
│   │   CHANNEL: Direct communication (in-person or phone) + WhatsApp group
│   │   SAY: "PDI for [VIN] is now 1 day from its Stellantis deadline. Please
│   │         prioritize. Stock number: [STOCK#]. Vehicle is located at [zone/slot].
│   │         Deadline: [DATE]. We are at 80% PDI compliance — in the red zone."
│   │   ACTION: Document notification in WhatsApp group.
│   │   CHANNEL: WhatsApp group
│   │   SAY: "Day 1 PDI alert sent to [Service Department Lead name/role] for [VIN].
│   │         Deadline: [DATE]."
│   │   THEN: Continue monitoring — return to DAILY CHECK next morning
│   │
│   └── NO — Still Day 0 or Day 1 but not yet past: Continue monitoring
│
└── DAY 2 CHECK: Has the 2-day deadline been reached AND PDI is still not complete?
    │
    ├── YES — Day 2 reached, PDI still not marked complete:
    │   ACTION: Escalate to General Manager IMMEDIATELY.
    │   ROLE: Lot Manager
    │   CHANNEL: Direct communication (in-person — preferred) + WhatsApp group
    │   SAY: "PDI for [VIN] has hit its 2-day Stellantis deadline without completion.
    │         We are at risk of a compliance fine and potential docking. Stock number:
    │         [STOCK#]. Vehicle location: [zone/slot]. Delivery date: [DATE].
    │         Service has been notified [DATE OF DAY 1 NOTIFICATION]. Immediate
    │         action required."
    │   ACTION: Document escalation in WhatsApp group.
    │   CHANNEL: WhatsApp group
    │   SAY: "CRITICAL — PDI deadline reached for [VIN]. Escalated to General Manager.
    │         Stellantis compliance at risk. Awaiting resolution."
    │   ACTION: Continue to press service for immediate PDI completion.
    │   NOTE: Even after the deadline has passed, completing the PDI as soon as
    │         possible reduces further compliance rate damage. The vehicle must still
    │         be PDI'd even if the Stellantis window has been missed.
    │   THEN: Return to DAILY CHECK until PDI is confirmed complete
    │
    └── NO — Day 2 not yet reached: Continue monitoring via DAILY CHECK
```

---

## Escalation Summary

| Timing | Condition | Action | Role | Exact Language |
|---|---|---|---|---|
| Day 0 (arrival) | PDI clock starts | Record delivery date, route to PDI | Lot Manager | Route per vehicle-pdi-routing.md |
| Day 1 | PDI not complete | Notify Service Department Lead | Lot Manager | "PDI for [VIN] is now 1 day from its Stellantis deadline. Please prioritize." |
| Day 2 | PDI still not complete | Escalate to General Manager immediately | Lot Manager | "PDI for [VIN] has hit its 2-day Stellantis deadline without completion. We are at risk of a compliance fine and potential docking." |
| Any day | PDI complete | Confirm system entry, update Airtable, document, route to detail | Lot Manager | "PDI for [VIN] confirmed complete — marked in manufacturer system on [DATE]." |

---

## Terminal Outcomes

- **OUTCOME 1 — PDI complete within deadline:** PDI completed and marked in manufacturer system within 2 calendar days of delivery. Stellantis compliance maintained. Vehicle routes to detailing.
- **OUTCOME 2 — PDI complete but deadline missed:** PDI eventually completed and marked in system, but after the 2-day Stellantis deadline. Compliance rate drops for this vehicle. General Manager was notified at Day 2. Vehicle still routes to detailing.
- **OUTCOME 3 — Monitoring in progress:** Vehicle is within the 2-day window, PDI not yet complete. Day 1 notification may or may not have been sent. Monitoring continues.

---

## Notes

- **[CRITICAL] 80% compliance = red zone.** Every missed PDI pushes the rate lower and increases the likelihood of Stellantis fines and docking. As of the source walkthrough, the dealership is already at the threshold. There is no buffer.
- **[CRITICAL] Clock starts at delivery date, not processing start.** A vehicle that sat in the yard over a weekend before anyone noticed it is still subject to the 2-day window from when it was delivered — not from when it was processed. Day 0 = delivery date.
- **[CRITICAL] Verbal confirmation is not PDI complete.** The Stellantis tracking system counts only technician entries in the manufacturer system. "The tech looked at it" or "it's been through the shop" is not PDI complete.
- **[NEEDS_INPUT] Exact Stellantis fine amounts:** Dollar amounts for PDI non-compliance are not specified in source material. Exact threshold percentage at which fines begin is also unconfirmed (stated as "near" 80%). Confirm with management/manufacturer rep.
- **[NEEDS_INPUT] Service Department Lead name and contact:** Who is the specific Day 1 escalation target? Not confirmed in source material.
- **[NEEDS_INPUT] General Manager name and contact:** Who is the specific Day 2 escalation target? Not confirmed in source material. Owner/GM role is confirmed to exist; name not specified.
- **[ASSUMPTION] "End of business Day 2" as the deadline:** The 2-day window is interpreted as 2 full calendar days from delivery date (i.e., if delivery is Monday, deadline is end-of-business Wednesday). The exact cutoff time within Day 2 is not specified in source material.
