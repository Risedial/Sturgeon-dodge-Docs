# Decision Tree: Vehicle PDI Routing
**File:** vehicle-pdi-routing.md
**Status:** [COMPLETE]
**Cross-references:**
- vehicle-arrival-new-standard.md (calls this tree at Q6)
- vehicle-arrival-ship-mode.md (calls this tree at Q6)
- vehicle-arrival-dealer-trade.md (calls this tree at Q7)
- vehicle-pdi-compliance-deadline.md (deadline monitoring — runs in parallel)
- vehicle-recon-routing.md (if PDI reveals mechanical issues)
- vehicle-detailing-routing.md (next step after PDI complete)

---

## Trigger
A vehicle has been determined to require PDI (new arrival, ship mode clearance complete, or dealer trade arrival). This tree governs the routing of that vehicle through the PDI process from initial handoff to technician confirmation of completion.

## Responsible Role
Lot Manager (routes vehicle, monitors); Service Technician (performs PDI, marks complete in system); Service Department Lead (escalation point if technician unavailable)

---

## Decision Tree

```
START: Vehicle is ready to be routed for PDI
│
├── STEP 1: COMMUNICATE PDI REQUEST TO SERVICE DEPARTMENT
│   ACTION: Lot Manager notifies service department of vehicle requiring PDI.
│   ROLE: Lot Manager
│   CHANNEL: Direct communication (in-person or phone) + WhatsApp group (for documentation)
│   SAY: "PDI required — [Year] [Make] [Model], stock number [STOCK#], VIN [VIN].
│         Delivery date: [DATE]. PDI deadline: [DATE + 2 calendar days].
│         Vehicle is located at [zone/slot]. Please schedule immediately."
│   → SEE: vehicle-pdi-compliance-deadline.md (start monitoring immediately)
│   THEN: Continue to Q1
│
├── Q1: IS A SERVICE TECHNICIAN AVAILABLE TO PERFORM PDI?
│   │
│   ├── NO — No technician available:
│   │   ACTION: Escalate immediately to Service Department Lead.
│   │   ROLE: Lot Manager
│   │   CHANNEL: Direct communication (in-person or phone)
│   │   SAY: "PDI needed for [VIN] — the 2-day Stellantis clock is running. No
│   │         technician is currently available. Who can I get this assigned to,
│   │         and when? We cannot let this deadline pass."
│   │   NOTE: The 2-day clock does NOT stop because no technician is available.
│   │         Urgency escalation applies immediately.
│   │   THEN: Return to Q1 once a technician is assigned. If deadline is at risk,
│   │         → SEE: vehicle-pdi-compliance-deadline.md for escalation protocol.
│   │
│   └── YES — Technician available: Continue to Q2
│
├── Q2: IS DELIVERY IMMINENT? (Customer is waiting or delivery date is today)
│   │
│   ├── YES — Delivery imminent:
│   │   ACTION: Request priority PDI processing from Service Department Lead.
│   │   ROLE: Lot Manager
│   │   CHANNEL: Direct communication
│   │   SAY: "PDI for [VIN] is urgent — delivery is imminent. Customer is waiting.
│   │         Please prioritize. Stock number: [STOCK#], location: [zone/slot]."
│   │   NOTE: Imminent delivery does NOT mean PDI can be skipped. The customer
│   │         waits if necessary. The PDI happens first.
│   │   THEN: Continue to Q3
│   │
│   └── NO — Standard scheduling: Continue to Q3
│
├── Q3: TECHNICIAN BEGINS PDI
│   ACTION: Technician physically performs the Pre-Delivery Inspection on the vehicle.
│   ROLE: Service Technician
│   NOTE: PDI must be performed by a service technician — not by a salesperson,
│         lot attendant, or any other role.
│   THEN: Continue to Q4
│
├── Q4: DID PDI REVEAL MECHANICAL ISSUES REQUIRING RECON WORK?
│   │
│   ├── YES — Mechanical issues found:
│   │   ACTION: Technician communicates findings to Lot Manager.
│   │   ROLE: Service Technician → Lot Manager
│   │   CHANNEL: Direct communication + WhatsApp group
│   │   SAY (Technician): "PDI on [VIN] found mechanical issues: [describe issues].
│   │                      Vehicle cannot be cleared for front line."
│   │   ACTION: Lot Manager updates Airtable status to IN RECON.
│   │   ACTION: Lot Attendant moves vehicle to West Side of Building (slots L1–L5).
│   │   CHANNEL: WhatsApp group
│   │   SAY (Lot Manager): "Vehicle [VIN] — PDI revealed mechanical issues.
│   │                       Moving to West Side of Building. Status: IN RECON.
│   │                       Recon required before front-line placement."
│   │   → SEE: vehicle-recon-routing.md
│   │   NOTE: Vehicle does NOT proceed to detailing or Cage until:
│   │         (1) Recon work is complete
│   │         (2) Vehicle is re-PDI'd
│   │         (3) Vehicle is fully detailed
│   │   [TERMINAL for this path — vehicle enters recon flow]
│   │
│   └── NO — No mechanical issues: Continue to Q5
│
├── Q5: TECHNICIAN MARKS PDI COMPLETE IN MANUFACTURER SYSTEM
│   ACTION: Service technician marks PDI complete in the manufacturer system.
│   ROLE: Service Technician
│   CRITICAL: This is the only action that constitutes "PDI complete."
│             - Verbal confirmation is NOT PDI complete.
│             - Physical inspection without system entry is NOT PDI complete.
│             - Stellantis tracks completion via the manufacturer system entry only.
│   THEN: Continue to Q6
│
├── Q6: CONFIRM SYSTEM ENTRY WITH TECHNICIAN
│   ACTION: Lot Manager verifies with technician that the manufacturer system
│           entry has been made.
│   ROLE: Lot Manager
│   CHANNEL: Direct communication
│   SAY: "Can you confirm PDI for [VIN] is marked complete in the manufacturer
│         system — not just the inspection done physically?"
│   │
│   ├── Technician confirms system entry is done: Continue to Q7
│   │
│   └── Technician has NOT entered it in the system:
│       ACTION: Request immediate system entry.
│       ROLE: Lot Manager
│       SAY: "Please mark it in the manufacturer system now. The Stellantis
│             compliance clock only stops when the system entry is made."
│       THEN: Return to Q6
│
├── Q7: UPDATE AIRTABLE
│   ACTION: Update vehicle record in Airtable to reflect PDI complete status.
│   ROLE: Lot Manager or Admin — Stock Tags (Jorja) / Admin/Tech (Giselle)
│   NOTE: Airtable update is in addition to — not a substitute for — the
│         manufacturer system entry.
│   THEN: Continue to Q8
│
└── Q8: NOTIFY LOT TEAM — PDI COMPLETE, ROUTE TO DETAILING
    ACTION: Lot Manager notifies lot team that PDI is confirmed complete and
            vehicle is ready to route to DHD for full detail.
    ROLE: Lot Manager
    CHANNEL: WhatsApp group
    SAY: "PDI confirmed complete for [VIN] ([Year] [Make] [Model]).
          Marked in manufacturer system. Please route to DHD for full detail.
          Location: [zone/slot]. DHD cost: $60."
    → SEE: vehicle-detailing-routing.md
    [TERMINAL — vehicle moves to detailing phase]
```

---

## Terminal Outcomes

- **OUTCOME 1 — PDI complete, vehicle routes to detailing:** Technician performed PDI, no mechanical issues, PDI marked complete in manufacturer system, Airtable updated. Lot team notified. Vehicle routes to DHD for full detail.
- **OUTCOME 2 — Mechanical issues found, vehicle in RECON:** PDI revealed mechanical issues. Vehicle moved to West Side of Building with IN RECON status. Vehicle-recon-routing.md takes over. Vehicle returns to this flow after recon complete and re-PDI'd.
- **OUTCOME 3 — Awaiting technician assignment:** No technician available. Escalation to Service Department Lead is in progress. 2-day clock is running. Monitoring via vehicle-pdi-compliance-deadline.md.

---

## Notes

- **[CRITICAL] System entry ≠ verbal confirmation.** The Stellantis compliance system tracks PDI completions by technician entries in the manufacturer system. A verbal "it's done" does not satisfy the Stellantis requirement and will not be counted in compliance tracking.
- **[CRITICAL] 2-day clock does not pause.** Technician unavailability, backlog, or other delays do not pause the Stellantis deadline. Escalation to Service Department Lead is immediate when a technician cannot be assigned.
- **[NEEDS_INPUT] Service Department Lead name and contact:** Who is the specific escalation point for PDI routing? Not confirmed in source material.
- **[NEEDS_INPUT] Manufacturer system name:** The system where technicians mark PDI complete is referred to as "the manufacturer system" throughout. The exact system name (Stellantis system, DealerSocket, CDK, etc.) is not specified in source material. Confirm before finalizing.
- **[NEEDS_INPUT] Airtable PDI status label:** The exact Airtable field/value used to indicate "PDI Complete" is not specified in source material (source notes there is "nothing in Airtable to see" PDI in progress). Confirm what is updated when PDI is done.
- **[ASSUMPTION] Re-PDI after recon:** This tree assumes that a vehicle which enters RECON after a failed PDI must be re-PDI'd before it can continue. This is consistent with compliance requirements but is an inference — not explicitly stated for all recon scenarios.
