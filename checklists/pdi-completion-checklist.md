# PDI Completion Tracking Checklist
**Used by:** Lot Manager — review daily
**Purpose:** Track PDI completion compliance for all vehicles on the lot currently requiring PDI
**Compliance standard:** Stellantis requires final PDI within 2 calendar days of vehicle delivery to the dealership
**Current compliance rate:** 80% — RED ZONE (fines and docking begin at or near this level)

---

## Instructions

Maintain a per-vehicle tracking record for every vehicle currently on the lot that requires PDI but has not yet been confirmed complete. Update daily. Apply the status and required action from the Status Definitions table to each vehicle. Escalate immediately when a vehicle enters OVERDUE status — do not wait.

---

## Per-Vehicle Tracking Record

For each vehicle currently requiring PDI, record the following fields. Maintain one row per vehicle. Remove vehicles from this record only when PDI is confirmed marked complete in the manufacturer system.

| Field | Notes |
|---|---|
| VIN | Required — unique vehicle identifier |
| Vehicle Description | Year / Make / Model |
| Arrival Date | Date vehicle was delivered to the Edmonton Office lot (Day 0) |
| PDI Deadline | Arrival Date + 2 calendar days |
| PDI Status in Manufacturer System | Pending / In Progress / Complete — check system, do not rely on verbal confirmation |
| Today's Date | Enter today's date when reviewing |
| Days Remaining / Overdue | Calculate: PDI Deadline minus Today's Date (positive = days remaining; negative = days overdue) |
| Current Status | Assign from Status Definitions table below |

---

## Status Definitions and Required Actions

| Status | Condition | Required Action |
|---|---|---|
| ON TIME | Today's date is on or before the PDI deadline AND PDI is not yet marked complete in the manufacturer system | No escalation required — monitor daily. Confirm with Service Department Lead that PDI is scheduled. |
| COMPLETE | PDI is marked complete in the manufacturer system by the assigned technician | Verify the technician logged it in the manufacturer system (not just verbal). Remove vehicle from active tracking. Post in WhatsApp team chat: "PDI complete for [VIN] — removing from tracking." Update Airtable status as appropriate. |
| DAY 1 OVERDUE | PDI deadline has passed by exactly 1 day AND PDI is not marked complete in the manufacturer system | ROLE: Lot Manager → contact Service Department Lead immediately via WhatsApp team chat. SAY: "PDI for [VIN] is now overdue by 1 day. Stellantis compliance window has passed. Please prioritize this PDI today." Document the escalation in WhatsApp team chat. |
| DAY 2+ OVERDUE (CRITICAL) | PDI deadline has passed by 2 or more days AND PDI is not marked complete in the manufacturer system | ROLE: Lot Manager → escalate to General Manager immediately. SAY: "PDI for [VIN] is [X] days overdue. We are at risk of a Stellantis compliance fine and potential docking. This needs to be resolved today." Document the escalation in WhatsApp team chat. Simultaneously escalate to Service Department Lead via WhatsApp: "PDI for [VIN] is [X] days overdue — compliance critical. Please complete today and mark in manufacturer system." |

---

## Checklist Item — Per Vehicle

For each vehicle currently in this tracking record:

[ ] **Has the PDI been marked complete in the manufacturer system by the assigned technician?**
    YES: COMPLETE — remove from active tracking; update WhatsApp team chat; update Airtable as appropriate
    NO — apply the required action from the Status Definitions table above based on the vehicle's current status (ON TIME, DAY 1 OVERDUE, or DAY 2+ OVERDUE CRITICAL)

---

## Escalation Language Reference

**Day 1 Overdue — to Service Department Lead (WhatsApp):**
> "PDI for [VIN] is now overdue by 1 day. Stellantis compliance window has passed. Please prioritize this PDI today."

**Day 2+ Overdue — to General Manager (in person or direct message):**
> "PDI for [VIN] is [X] days overdue. We are at risk of a Stellantis compliance fine and potential docking. This needs to be resolved today."

**Day 2+ Overdue — to Service Department Lead (WhatsApp simultaneously):**
> "PDI for [VIN] is [X] days overdue — compliance critical. Please complete today and mark in manufacturer system."

---

## What "PDI Complete" Means

PDI is complete ONLY when:
1. A service technician has physically performed the full Pre-Delivery Inspection per Stellantis requirements
2. The technician has marked the PDI complete in the **manufacturer system** (not just Airtable, not just verbally)

PDI is NOT complete if:
- A technician checked the vehicle visually without logging it in the manufacturer system
- The PDI was performed at the factory or by the originating dealer (the final PDI at this location is still required)
- A salesperson says the vehicle is "good to go"
- Verbal confirmation was given to the Lot Manager without a manufacturer system entry

---

## Important Rules

- **No vehicle enters the Cage without PDI confirmed complete.** If a vehicle is in the Cage and PDI cannot be confirmed in the manufacturer system, remove it from the Cage immediately and route to service.
- **No vehicle is delivered to a customer without PDI confirmed complete.** If a customer is requesting delivery before PDI is done, expedite the PDI — do not skip it. The customer waits.
- **The 2-day window runs from the vehicle's original arrival date.** Ship mode clearance does not reset or extend the clock.
- **"Good to go" from a salesperson is not PDI confirmation.** Check the manufacturer system.

---

## Cross-References

- → SEE: vehicle-pdi-compliance-deadline.md (full PDI deadline decision tree)
- → SEE: vehicle-arrival-ship-mode.md (ship mode arrival — PDI clock still runs)
- → SEE: vehicle-arrival-dealer-trade.md (dealer trade PDI — same 2-day window applies)
