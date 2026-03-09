# Cause-Effect Map
**Phase:** 2 — Systems Analysis
**Status:** [COMPLETE]
**Source:** knowledge/ files (all 12)
**Date:** 2026-03-09

---

## Overview

This file maps every identified cause-and-effect pattern across the Edmonton Office lot operations. Each entry traces from a root cause to its downstream effects, with severity, category, and prevention standard documented. Cascading relationships between patterns are noted where they exist.

---

## Pattern 1: New Vehicle Miscategorized as RECON Instead of Pending PDI

```
CAUSE: A new vehicle arriving on the lot is entered into Airtable with status "IN RECON"
       instead of being held as "Pending PDI" (Airtable: AVAILABLE or equivalent).
EFFECT: Vehicle disappears from the sales inventory system. Sales staff cannot see it,
        cannot sell it, and its days-in-stock accumulate invisibly. Revenue is delayed
        for every day the vehicle remains hidden.
SEVERITY: HIGH
CATEGORY: FINANCIAL / OPERATIONAL
EXAMPLE: Source material confirms this is the current default at the Edmonton Office —
         most new arrivals are entered as RECON. (knowledge/compliance-requirements.md,
         Section 5)
PREVENTION: Critical Rule — new arrivals NEVER receive RECON status. New arrivals are
            Pending PDI only. (knowledge/vehicle-statuses-and-transitions.md, Rule 1)
```

**Cascading effect:** A hidden vehicle misses its 2-day PDI window because no one
knows it exists → PDI non-compliance rate drops → Stellantis fines/docking triggered.
→ SEE: Pattern 3 (PDI skipped → compliance rate drops)

---

## Pattern 2: Vehicle Delivered in Ship Mode

```
CAUSE: A vehicle in factory transport state (battery disconnected, software in low-power
       mode) is placed on the front line or delivered to a customer without being fully
       cleared (battery reconnected + software reset + PDI completed).
EFFECT: Vehicle battery fails within hours of delivery. Customer is stranded. Vehicle
        must be towed back. Full rework required: detail ($275) + tow cost + complete
        rework of the preparation process. Customer trust is severely damaged.
SEVERITY: HIGH
CATEGORY: FINANCIAL / OPERATIONAL
EXAMPLE: CONFIRMED REAL INCIDENT — vehicle delivered in ship mode, died the next day,
         required tow back. Cost: $275 (skipped detail rework) + tow cost.
         (knowledge/compliance-requirements.md, Section 2;
         knowledge/financial-penalties.md)
PREVENTION: Ship Mode Protocol — ALL three steps must complete before any other action:
            (1) battery reconnected, (2) software reset, (3) PDI complete.
            (knowledge/compliance-requirements.md, Section 2)
```

---

## Pattern 3: PDI Skipped Due to Salesperson Pressure ("It's Good to Go")

```
CAUSE: A salesperson tells lot/service staff that a vehicle "doesn't need PDI" or
       "it's good to go," and the staff member complies without completing the mandatory
       PDI and marking it in the manufacturer system.
EFFECT: (a) Stellantis PDI compliance rate drops — currently at 80%, the red zone
        where fines and docking begin. Each skipped PDI pushes the rate lower.
        (b) Vehicle is placed on front line or delivered without PDI — compliance
        failure. (c) Potential undetected mechanical issues reach the customer.
SEVERITY: HIGH
CATEGORY: COMPLIANCE / FINANCIAL
EXAMPLE: Compliance rate is currently 80% — entering the red zone. The current
         default of entering new arrivals as RECON means PDI tracking is poor.
         (knowledge/compliance-requirements.md, Section 1)
PREVENTION: Salesperson override resistance protocol: respond with "Stellantis requires
            final PDI within 2 days. We're at 80% compliance, in the red zone. It
            needs to go through." PDI is never optional.
            (knowledge/communication-and-escalation-protocols.md, Section 1)
```

**Cascading effect:** Skipped PDI + vehicle on front line = Cage compliance failure.
→ SEE: Pattern 9 (no morning lot walk → non-compliant vehicles not caught)

---

## Pattern 4: Sold Vehicle Has No Sign → Status Confusion

```
CAUSE: A vehicle is sold but no sold sign with the customer's name is placed in the
       vehicle immediately. This happens when the salesperson does not place the sign
       and no escalation occurs.
EFFECT: Lot team cannot visually identify which vehicles are sold. Risk of moving a
        sold vehicle to the wrong zone, placing another vehicle in its slot, or
        attempting to resell it. Confusion compounds as more sold vehicles accumulate
        without signs.
SEVERITY: HIGH
CATEGORY: OPERATIONAL
EXAMPLE: The 3-strike escalation protocol exists precisely because this is a recurring
         pattern requiring structured escalation. (knowledge/signage-and-tagging-standards.md,
         Section 2; knowledge/communication-and-escalation-protocols.md, Section 3)
PREVENTION: Sold sign placed immediately when vehicle is sold — by the salesperson or
            lot team on request. 3-strike escalation protocol enforced.
            (knowledge/signage-and-tagging-standards.md, Section 2)
```

---

## Pattern 5: Vehicle Sits Without Identification → Operational Paralysis (Kia Incident)

```
CAUSE: A vehicle arrives on the lot without a stock-in tag or any status signage. No
       one documents its arrival, status, or destination.
EFFECT: No staff member can determine whether the vehicle is inventory, a sold unit,
        a trade-in, a customer vehicle, or something else. All decisions about the
        vehicle halt. No one moves it, processes it, or generates revenue from it.
        Paralysis lasts until someone investigates and establishes its status.
SEVERITY: HIGH
CATEGORY: OPERATIONAL / FINANCIAL
EXAMPLE: CONFIRMED REAL INCIDENT — a Kia sat on the Edmonton Office lot for 6 weeks
         with no identification. No staff member could determine its status. It sat
         completely idle for 6 weeks generating zero revenue.
         (knowledge/signage-and-tagging-standards.md, Section 5)
PREVENTION: Stock-in tag placed on every vehicle immediately upon arrival. Morning lot
            walk checks every vehicle for signage. Any untagged vehicle is flagged and
            tagged before any other action. (knowledge/signage-and-tagging-standards.md,
            Section 1; knowledge/daily-operations-workflow.md, Section 1)
```

---

## Pattern 6: Dealer Plate Transferred Peer-to-Peer → Accountability Chain Broken

```
CAUSE: An employee who has a dealer plate signed out passes it directly to another
       employee without returning it to Key Cafe and having the second employee sign
       it out properly.
EFFECT: The Key Cafe record still shows the first employee as responsible for the
        plate. If the plate is subsequently lost, the first employee is charged the
        $500 penalty — even though they no longer have the plate and the second
        employee is actually responsible. The $500 penalty becomes unenforceable
        against the correct party.
SEVERITY: HIGH
CATEGORY: FINANCIAL
EXAMPLE: The no peer-to-peer transfer rule exists because this failure mode was
         identified as a specific vulnerability. Charlie [AMBIGUOUS — role unknown]
         paid the $500 penalty in a confirmed precedent.
         (knowledge/key-cafe-protocol.md, Section 4)
PREVENTION: No peer-to-peer transfers — absolute rule. Exact response when asked:
            "No — go back to Key Cafe, I'll check mine in, you sign it out."
            (knowledge/key-cafe-protocol.md, Section 4)
```

---

## Pattern 7: Key Not Returned to Key Cafe → Lost Key + Security Risk

```
CAUSE: An employee signs out a key set but does not return it to Key Cafe immediately
       when done. Key is left in a vehicle, taken home, or misplaced.
EFFECT: Key is lost. Replacement cost charged to the last signer (~50% of replacement
        cost, varies by vehicle model). Vehicle security is compromised — unknown
        person may have access to the vehicle. GPS key tag may also be lost ($25
        reprogram cost).
SEVERITY: HIGH
CATEGORY: FINANCIAL / SAFETY
EXAMPLE: The GPS key tag penalty ($25) is actively enforced. Key replacement penalty
         (~50% of cost) is actively enforced. (knowledge/financial-penalties.md;
         knowledge/key-cafe-protocol.md, Section 7)
PREVENTION: Keys signed back in immediately when done. GPS key tags remain attached at
            all times. "You signed it out" = liability until signed back in.
            (knowledge/key-cafe-protocol.md, Sections 3, 6)
```

---

## Pattern 8: Internal Vehicle Work Not Routed to Service → Underutilization + Compliance Failure

```
CAUSE: PDIs, inspections, or mechanical work for lot vehicles are handled informally
       or skipped, rather than being formally routed through the service department.
EFFECT: (a) Service department sits at or near 1-customer utilization against
        $3,000/day labor cost — overhead not justified. (b) PDI is not completed
        within 2-day Stellantis window → compliance rate drops → fines/docking.
        (c) Technicians are idle while vehicles sit unprocessed.
SEVERITY: HIGH
CATEGORY: FINANCIAL / COMPLIANCE
EXAMPLE: On the day of the walkthrough, the service department served only 1 customer
         against a $3,000/day cost base. PDI compliance rate is 80% — red zone.
         (knowledge/service-department-utilization.md, Section 1)
PREVENTION: All internal vehicle work routed to service department — PDI for every new
            arrival and dealer trade within 2 days. Lot Manager routes directly to
            Service Department Lead with stock number, VIN, and deadline.
            (knowledge/service-department-utilization.md, Section 4;
            knowledge/daily-operations-workflow.md, Section 4)
```

**Cascading effect:** Internal work not routed to service → PDI deadlines missed →
compliance drops → Pattern 3 fines triggered AND Pattern 5 vehicles sit unprocessed.

---

## Pattern 9: No Morning Lot Walk → Non-Compliant Vehicles Not Caught → Problems Compound

```
CAUSE: The morning lot walk is skipped (due to a busy morning, urgent fires, or
       neglect). Non-compliant vehicles, wrong-zone placements, missing signage, and
       PDI deadline violations go undetected.
EFFECT: Issues that would be caught and corrected in 30 minutes accumulate across the
        day. By the time they are noticed, the correction effort is greater. Missing
        PDI deadlines move from "at risk" to "missed." Sold vehicles without signs
        accumulate. Staff vehicles on the lot go unaddressed.
SEVERITY: HIGH
CATEGORY: OPERATIONAL / COMPLIANCE
EXAMPLE: The morning lot walk is documented as mandatory — not skippable.
         (knowledge/daily-operations-workflow.md, Section 1)
PREVENTION: Morning lot walk is mandatory, every operational day, ~30 minutes after
            arriving. Covers all 7 zones. Every vehicle. No zone skipped.
            (knowledge/daily-operations-workflow.md, Section 1)
```

---

## Pattern 10: Staff Vehicle Parked on Lot → Space Consumed + Unprofessional Appearance

```
CAUSE: A staff member parks their personal vehicle on the dealership lot rather than
       on the street, either because they were not informed of the rule (new employee)
       or because they believe an exception applies.
EFFECT: A lot slot is occupied by a non-inventory vehicle. Customers see a non-display
        vehicle. Large transport trucks cannot maneuver freely. The lot appears less
        professional. Standards degrade if not corrected — other staff observe that
        parking on the lot has no consequence.
SEVERITY: MEDIUM
CATEGORY: OPERATIONAL
EXAMPLE: Referenced incident: Chris's son (new employee) parked on the lot because
         nobody told him the rules. Correct response: welcoming, informative, not
         confrontational. (knowledge/zone-definitions.md, Section 7;
         knowledge/communication-and-escalation-protocols.md, Section 4)
PREVENTION: Staff park on street only — no exceptions. New employee orientation
            includes parking rule. Owner/GM sets standard by personally parking on the
            street. (knowledge/zone-definitions.md, Section 7)
```

---

## Pattern 11: Stock-In Tag Not Placed → Vehicle Processing State Unknown

```
CAUSE: A vehicle arrives on the lot and is not tagged with a white stock-in tag in the
       bottom-right corner of the windshield. This happens when: (a) Admin — Stock Tags
       (Jorja) or Admin/Tech (Giselle) did not fill out the tag, or (b) the lot team
       did not place the tag, or (c) the tag was not handed off.
EFFECT: No staff member can confirm whether the vehicle has been formally processed.
        It cannot be confidently placed in a zone. If found during a lot walk, it must
        be routed for tagging before any other action. At the time of the walkthrough,
        the stock-in tag process was NOT active — retroactive tagging of all vehicles
        was required.
SEVERITY: HIGH
CATEGORY: OPERATIONAL
EXAMPLE: The stock-in tag process was not active at time of walkthrough. All vehicles
         needed retroactive tagging. (knowledge/signage-and-tagging-standards.md,
         Section 1 — Current Status)
PREVENTION: Stock-in tag placed on every vehicle immediately upon arrival by the lot
            team, using tags filled by Admin — Stock Tags (Jorja) / Admin/Tech (Giselle).
            Morning lot walk checks for tags on every vehicle.
            (knowledge/signage-and-tagging-standards.md, Section 1)
```

**Cascading effect:** Untagged vehicles → unknown processing state → potential
misplacement in zones → Pattern 5 (paralysis).

---

## Pattern 12: Enforcement Not Consistent → Staff Treat Rules as Optional

```
CAUSE: A rule (sold sign placement, Key Cafe sign-out, stock-in tagging, staff parking)
       is stated once but not enforced consistently day-to-day. When violations occur
       without consequence, staff interpret the rule as optional or aspirational.
EFFECT: Standards degrade progressively. Each unenforced violation signals to all
        staff that the rule is not serious. Over time, even previously compliant staff
        begin to deviate. Recovery requires more intensive effort than initial
        enforcement would have required.
SEVERITY: HIGH
CATEGORY: OPERATIONAL
EXAMPLE: The lot walk is documented as the enforcement mechanism: "Inspect what you
         expect. Standards only hold through daily, consistent enforcement — not
         one-time announcements."
         (knowledge/communication-and-escalation-protocols.md, Section 7;
         knowledge/daily-operations-workflow.md, Section 3)
PREVENTION: Daily morning lot walk enforces all standards every day. Documentation in
            WhatsApp creates accountability trail. 3-strike protocols (sold signs) and
            financial penalties (keys, plates) are enforced — not theoretical.
            (knowledge/daily-operations-workflow.md, Sections 1, 3)
```

---

## Pattern 13: Trade-In Arrives Without Banner → Status Ambiguity

```
CAUSE: A vehicle received from a customer as a trade-in is not immediately tagged with
       a trade-in banner. It sits on the lot looking like inventory.
EFFECT: Staff cannot distinguish the trade-in from retail inventory. It may be moved
        to a display zone, mistakenly offered for sale in its current condition, or
        overlooked for routing to DHD (detail), West Side of Building (RECON), or
        Auction Area.
SEVERITY: MEDIUM
CATEGORY: OPERATIONAL
EXAMPLE: Trade-in banner placement is documented as "immediate when received."
         (knowledge/signage-and-tagging-standards.md, Section 3)
PREVENTION: Trade-in banner placed by lot team immediately when customer's trade-in
            vehicle arrives. (knowledge/signage-and-tagging-standards.md, Section 3)
```

---

## Pattern 14: Dealer Trade PDI Not Performed → Same Risks as Standard PDI Skip

```
CAUSE: A dealer trade arrives from another dealership with documentation indicating
       it has been "already inspected." Lot or service staff accept the originating
       dealer's certification and skip the Edmonton Office's own final PDI.
EFFECT: Same consequences as any skipped PDI: Stellantis compliance rate drops.
        The 2-day PDI window still applies from the moment the vehicle arrives at the
        Edmonton Office, regardless of what any other dealer has certified.
SEVERITY: HIGH
CATEGORY: COMPLIANCE / FINANCIAL
EXAMPLE: The rule exists explicitly because this failure mode is anticipated — dealers
         may pressure staff to accept their certification.
         (knowledge/compliance-requirements.md, Section 1 — Dealer Trade PDI Rule;
         knowledge/vehicle-statuses-and-transitions.md, Rule 3)
PREVENTION: Dealer trades require the Edmonton Office's own final PDI regardless of
            originating dealer's certification. No exceptions. 2-day window applies
            from arrival at Edmonton Office.
            (knowledge/compliance-requirements.md, Section 1)
```

---

## Pattern 15: Non-Prime Vehicle Placed on Lot → Insurance Exposure

```
CAUSE: A vehicle with Airtable STOCK HOLDER = "NON PRIME DIVISION" is brought onto
       the Edmonton Office lot — either because the non-prime check was not performed,
       or because someone overrode the protocol.
EFFECT: The vehicle is on the lot under incorrect insurance coverage. The Edmonton
        Office insurance does not cover non-prime vehicles. Any incident (damage, theft,
        accident) involving that vehicle while on this lot may not be covered.
SEVERITY: HIGH
CATEGORY: COMPLIANCE / FINANCIAL
EXAMPLE: Has happened once or twice in the dealership's history.
         (knowledge/compliance-requirements.md, Section 6)
PREVENTION: Non-prime identification check (STOCK HOLDER field in Airtable) is the
            FIRST step before any placement decision, for every vehicle.
            (knowledge/lot-placement-rules.md, Step 1)
```

---

## Pattern 16: Cage Slot Left Empty When FLR Inventory Is Available

```
CAUSE: A vehicle is sold or moved and the resulting open Cage slot is not filled
       promptly, even though Front-Line Ready inventory exists.
EFFECT: Customer-facing display capacity drops below 20 slots. A vehicle that could
        be sold sits in a holding zone rather than in front of customers.
SEVERITY: MEDIUM
CATEGORY: FINANCIAL / OPERATIONAL
EXAMPLE: The Cage must be full at all times — maximum 1 empty stall, only if that
         vehicle was just sold. (knowledge/zone-definitions.md, Section 1 — Capacity
         Rules)
PREVENTION: Lot team checks for available FLR inventory whenever a Cage slot opens.
            Fill slot immediately. (knowledge/lot-placement-rules.md, Step 3;
            knowledge/daily-operations-workflow.md, Section 3)
```

---

## Cascading Failure Chains Summary

| Chain | Patterns Involved | End Consequence |
|---|---|---|
| New arrival hidden → PDI missed → fines | Pattern 1 → Pattern 3 → Pattern 8 | Stellantis fines + docking |
| Ship mode not cleared → customer failure | Pattern 2 | Tow + rework + customer damage |
| Untagged vehicle → unknown status → paralysis | Pattern 11 → Pattern 5 | Weeks of idle, zero revenue |
| No enforcement → standards degrade | Pattern 12 → Patterns 4, 6, 7, 9, 10, 11 | Systemic operational breakdown |
| No morning walk → compliance gaps compound | Pattern 9 → Patterns 3, 4, 5 | Multiple simultaneous failures undetected |

---
