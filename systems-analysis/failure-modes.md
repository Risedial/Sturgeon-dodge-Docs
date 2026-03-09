# Failure Modes
**Phase:** 2 — Systems Analysis
**Status:** [COMPLETE]
**Source:** knowledge/ files (all 12)
**Date:** 2026-03-09

---

## Overview

This file identifies every failure mode — conditions under which the Edmonton Office lot operations system breaks down or produces a bad outcome. Each failure mode is documented with its trigger, detection method, consequence if undetected, recovery path, and prevention standard.

Status tags:
- `CONFIRMED` — failure explicitly described in knowledge files (real incident occurred)
- `POTENTIAL` — logically inferred failure mode; not explicitly described in source
- `AMBIGUOUS` — source material is unclear

---

## FM-01: Vehicle Delivered in Ship Mode

```
FAILURE MODE: Ship Mode Delivery
TRIGGER: A vehicle in factory transport state (battery disconnected, software in
         low-power/transport mode) is delivered to a customer before battery
         reconnection, software reset, and PDI are completed.
DETECTION: Customer reports vehicle failure the next day. Vehicle stops operating
           and must be recovered. Or: lot staff observe vehicle in ship mode at
           time of delivery attempt and intervene.
CONSEQUENCE: Customer is stranded when vehicle battery dies. Vehicle must be towed
             back to dealership. Full preparation process must be repeated: detail
             ($275 confirmed) + tow cost (unspecified) + complete rework of PDI and
             preparation. Severe damage to customer relationship.
RECOVERY: (1) Tow vehicle back to dealership. (2) Reconnect battery and perform
          software reset. (3) Complete full PDI. (4) Complete full detail. (5)
          Redeliver to customer. (6) Absorb tow cost and rework cost.
PREVENTION: Ship Mode Protocol enforced without exception — ALL three steps before
            any other action: battery reconnection + software reset + PDI complete.
            (knowledge/compliance-requirements.md, Section 2;
            knowledge/vehicle-statuses-and-transitions.md, Rule 2)
STATUS_TAG: CONFIRMED
```

> **CONFIRMED REAL INCIDENT:** This occurred at the Edmonton Office. Vehicle delivered in ship mode. Battery died next day. Required tow back. Cost: $275 (detail rework) + tow cost.

---

## FM-02: Vehicle Without Identification Sits Idle for Extended Period (Kia Incident)

```
FAILURE MODE: Unidentified Vehicle Paralysis
TRIGGER: A vehicle arrives on or remains on the lot without a stock-in tag or any
         status signage. No formal record of arrival, status, or destination is
         created or communicated to lot staff.
DETECTION: During morning lot walk, lot staff encounter a vehicle with no identification
           and no one knows its status. Or: management notices vehicle has not moved
           or been processed for an extended period.
CONSEQUENCE: All decisions about the vehicle are indefinitely deferred. No staff member
             takes any action because no staff member can determine what action is
             correct. Vehicle sits idle generating zero revenue. In the confirmed
             incident, this lasted 6 weeks.
RECOVERY: (1) Identify the vehicle through VIN lookup in Airtable. (2) Determine its
          correct status based on STOCK HOLDER, Airtable status, and physical
          condition. (3) Apply correct signage immediately. (4) Route through
          appropriate process (PDI, detail, zone placement).
PREVENTION: Stock-in tag placed on every vehicle immediately upon arrival. Morning lot
            walk checks every vehicle for signage. Any untagged vehicle flagged and
            tagged before other action. (knowledge/signage-and-tagging-standards.md,
            Sections 1, 5; knowledge/daily-operations-workflow.md, Section 1)
STATUS_TAG: CONFIRMED
```

> **CONFIRMED REAL INCIDENT:** A Kia sat on the Edmonton Office lot for 6 weeks with no identification signage. No staff member could determine its status. Total paralysis for 6 weeks.

---

## FM-03: PDI Non-Compliance Pushes Stellantis Below Fine Threshold

```
FAILURE MODE: Stellantis PDI Compliance Rate Failure
TRIGGER: PDI is not completed within 2 calendar days of vehicle delivery, repeatedly
         across multiple vehicles. Compliance rate falls at or below the threshold
         where Stellantis applies financial penalties.
DETECTION: Stellantis compliance tracking system shows rate at or below threshold.
           Financial notification from Stellantis (fine or docking notice).
           Currently at 80% — already at the red zone.
CONSEQUENCE: Stellantis imposes financial fines on the dealership. Stellantis may
             dock manufacturer allocations or bonuses. Continued non-compliance makes
             recovery harder — each additional missed PDI compounds the rate decline.
             Exact fine amounts not specified in source material. [NEEDS_INPUT]
RECOVERY: (1) Immediately route all pending PDIs to service department for priority
          processing. (2) Stop entering new arrivals as RECON — use Pending PDI.
          (3) Communicate compliance status to all relevant roles. (4) Address
          Stellantis penalties. Rate recovery requires consistent PDI completion
          across all subsequent vehicles.
PREVENTION: All new arrivals routed to service for PDI within 2 days. New arrivals
            NEVER classified as RECON. PDI deadline tracked per vehicle.
            (knowledge/compliance-requirements.md, Section 1;
            knowledge/vehicle-statuses-and-transitions.md, Rule 1)
STATUS_TAG: CONFIRMED
```

> Note: Current rate is 80% — confirmed red zone status. Exact fine amounts unknown ([NEEDS_INPUT]).

---

## FM-04: Dealer Plate Lost — Accountability Chain Broken

```
FAILURE MODE: Dealer Plate Loss with Peer-to-Peer Transfer
TRIGGER: An employee signs out a dealer plate from Key Cafe, then passes it directly
         to a second employee without going through Key Cafe. The plate is subsequently
         lost by the second employee.
DETECTION: Plate is not returned to Key Cafe. Lot Manager or management notices plate
           is missing during Key Cafe audit. Employee reports plate missing.
CONSEQUENCE: $500 penalty applies to the last employee who signed the plate out
             through Key Cafe — regardless of who actually lost it. The correct
             responsible party (the second employee) cannot be held accountable
             because they never appear in the Key Cafe log. Financial loss + loss of
             a dealer plate from inventory.
RECOVERY: (1) Determine last signer from Key Cafe log. (2) Apply $500 penalty to
          that employee. (3) Investigate plate's last known location. (4) Report
          loss and initiate replacement. (5) Reinforce no peer-to-peer transfer rule
          with all staff.
PREVENTION: No peer-to-peer transfers — absolute rule. All plate transfers go through
            Key Cafe. Response to requests: "No — go back to Key Cafe, I'll check
            mine in, you sign it out." (knowledge/key-cafe-protocol.md, Section 4)
STATUS_TAG: CONFIRMED
```

> **CONFIRMED PRECEDENT:** Employee named Charlie [AMBIGUOUS — role unknown] paid the full $500 dealer plate penalty. This penalty is enforced — not theoretical.

---

## FM-05: New Vehicle Classified as RECON — Hidden from Sales Inventory

```
FAILURE MODE: RECON Misclassification of New Arrival
TRIGGER: A new vehicle arrival (KM ≤ 1,000) is entered into Airtable with status
         "IN RECON" instead of the correct approach (AVAILABLE / Pending PDI).
         This is the current default behavior at the Edmonton Office.
DETECTION: Sales staff cannot find the vehicle in their inventory view. Vehicle does
           not appear in sales system searches. Lot Manager or management audits
           Airtable and discovers vehicles with IN RECON status that should be Pending PDI.
CONSEQUENCE: Vehicle is invisible to sales staff. Cannot be sold. Days-in-stock
             accumulate invisibly — no urgency is created to process and sell it.
             PDI deadline may be missed (2-day window) because the vehicle does not
             appear as a new arrival requiring PDI. Compound effect if multiple
             vehicles are misclassified simultaneously.
RECOVERY: (1) Correct Airtable status immediately to AVAILABLE (Pending PDI).
          (2) Route vehicle to service for PDI — check if 2-day window is still
          open. (3) If 2-day window has passed, compliance rate is already affected.
PREVENTION: Critical Rule 1 — new arrivals are NEVER given RECON status. All lot
            and admin staff must know this rule. (knowledge/vehicle-statuses-and-
            transitions.md, Rule 1; knowledge/compliance-requirements.md, Section 5)
STATUS_TAG: CONFIRMED
```

> Confirmed: This is the current default behavior at the Edmonton Office. Most new arrivals are entered as RECON.

---

## FM-06: Vehicle Skips Detailing — Delivered Without Full Detail

```
FAILURE MODE: Skipped Detail Before Delivery
TRIGGER: A vehicle is delivered to a customer without completing the required full
         detail (DHD — $60 per vehicle). This may occur due to time pressure, sales
         pressure, or oversight.
CONSEQUENCE: Vehicle is not in acceptable delivery condition. Customer receives a
             vehicle that has not been properly prepared. A complete redo of the
             detail is required after the fact. Confirmed cost: $275 rework.
             Customer satisfaction is compromised.
RECOVERY: (1) Retrieve vehicle from customer (or arrange for redo at customer
          location). (2) Complete full detail — $275 rework cost confirmed. (3)
          Return vehicle to customer. Who bears the $275 cost is not specified
          in source material. [NEEDS_INPUT]
PREVENTION: FLR conditions require full detail before Cage placement and before
            delivery. Detail is not optional. (knowledge/zone-definitions.md,
            Section 1; knowledge/compliance-requirements.md, Section 4)
STATUS_TAG: CONFIRMED
```

> **CONFIRMED REAL INCIDENT:** A vehicle was delivered without being detailed. Full redo cost: $275.

---

## FM-07: Sold Sign Missing → Wrong Vehicle Moved or Resold Attempt

```
FAILURE MODE: Missing Sold Sign — Vehicle Disposition Error
TRIGGER: A vehicle is sold but no sold sign with the customer's name is placed in the
         vehicle. Lot team does not know the vehicle's status.
DETECTION: Lot team discovers unsigned vehicle in wrong zone. Customer arrives for
           pickup and vehicle is not in expected location. Morning lot walk identifies
           vehicle in Cage that should have been moved to East Side Fence Line.
CONSEQUENCE: Risk of lot team moving a sold vehicle to an incorrect zone, displacing
             it from where it needs to be for customer pickup. Risk of a salesperson
             attempting to show or sell the vehicle again. Customer pickup confusion.
RECOVERY: (1) Apply 3-strike escalation protocol to Sales Manager (Kevin). (2) Place
          sold sign with customer name immediately once sales team responds. (3)
          Verify vehicle's zone placement is correct for sold/BND status.
PREVENTION: Sold sign placed immediately when vehicle is sold — by salesperson or lot
            team on request. 3-strike escalation enforced.
            (knowledge/signage-and-tagging-standards.md, Section 2)
STATUS_TAG: POTENTIAL
```

---

## FM-08: Key Set Lost — Vehicle Security Compromised

```
FAILURE MODE: Lost Key Set
TRIGGER: An employee signs out a key set from Key Cafe but does not return it. Key
         is left in a vehicle, lost off-premises, or otherwise misplaced.
DETECTION: Key is not returned to Key Cafe. Log shows key signed out but not checked
           back in. Vehicle cannot be accessed because key is missing.
CONSEQUENCE: (~50% of replacement cost) financial penalty charged to last signer.
             GPS key tag must be reprogrammed ($25) if tag is also lost. Vehicle
             cannot be moved or delivered until replacement key is obtained. Vehicle
             security risk if key is lost off-premises.
RECOVERY: (1) Identify last signer from Key Cafe log. (2) Apply penalty. (3) Attempt
          to locate key. (4) If unrecoverable, obtain replacement key. (5) Reprogram
          GPS key tag ($25). (6) Assess vehicle security risk.
PREVENTION: Sign keys back in immediately when done. GPS tag must remain attached.
            "You signed it out" = liability. (knowledge/key-cafe-protocol.md,
            Sections 3, 6, 7)
STATUS_TAG: POTENTIAL
```

---

## FM-09: Non-Prime Vehicle Retained on Lot — Insurance Exposure

```
FAILURE MODE: Non-Prime Vehicle on Edmonton Office Lot
TRIGGER: A vehicle with Airtable STOCK HOLDER = "NON PRIME DIVISION" is brought to
         or retained at the Edmonton Office lot, either accidentally or because the
         STOCK HOLDER check was not performed.
DETECTION: Morning lot walk identifies vehicle that does not appear in Edmonton Office
           inventory. Airtable lookup reveals STOCK HOLDER = NON PRIME DIVISION.
CONSEQUENCE: Vehicle is on the lot under incorrect insurance coverage. Edmonton Office
             insurance does not cover non-prime vehicles. Any incident involving the
             vehicle (damage, theft, accident) while on this lot may be uninsured.
             Has occurred once or twice in dealership history.
RECOVERY: (1) Immediately verify STOCK HOLDER in Airtable. (2) If confirmed non-prime,
          remove vehicle from Edmonton Office lot immediately. (3) Transport to
          AB | STURGEON DODGE. (4) Document the incident.
PREVENTION: STOCK HOLDER check is the FIRST step before any placement decision for
            every vehicle. No exceptions. (knowledge/lot-placement-rules.md, Step 1)
STATUS_TAG: CONFIRMED
```

> Confirmed: Has occurred once or twice in dealership history.

---

## FM-10: Service Department Chronically Underutilized — Daily Financial Loss

```
FAILURE MODE: Service Department Underutilization
TRIGGER: Internal vehicle work (PDIs, inspections, mechanical prep) is not formally
         routed to the service department. Service department serves only external
         customers, of which there are few on any given day.
DETECTION: Service Department Lead observes idle technicians. Management reviews
           daily labor cost against revenue generation. On walkthrough day: 1 external
           customer against $3,000/day cost.
CONSEQUENCE: $3,000/day labor cost is not offset by sufficient revenue-generating
             activity. Financial loss accumulates daily. Technicians are idle while
             vehicles on the lot wait for PDI, creating a compliance risk simultaneously.
RECOVERY: Route all internal vehicle work to service immediately. Every new arrival
          PDI, every dealer trade PDI, every mechanical inspection becomes a service
          department workload item.
PREVENTION: Mandatory routing of all internal vehicle work through service department.
            Lot Manager communicates every new arrival to service with stock number,
            VIN, and deadline. (knowledge/service-department-utilization.md, Section 4;
            knowledge/daily-operations-workflow.md, Section 4)
STATUS_TAG: CONFIRMED
```

---

## FM-11: Morning Lot Walk Skipped — Compliance Issues Go Undetected

```
FAILURE MODE: Morning Lot Walk Omission
TRIGGER: The mandatory daily morning lot walk is skipped due to busy morning, urgent
         fires, or neglect. No vehicle-by-vehicle zone and signage check is performed.
DETECTION: Issues accumulate through the day and become visible when staff encounter
           them operationally — a vehicle in the wrong zone causes confusion, a PDI
           deadline is missed, a sold vehicle is moved incorrectly.
CONSEQUENCE: All compliance issues present at start-of-day go undetected and unrouted.
             PDI deadlines approach without escalation. Signage gaps persist. Staff
             vehicles remain on the lot. The longer the walk is skipped, the more
             issues compound.
RECOVERY: Conduct immediate lot walk as soon as the skip is identified. Generate task
          list and route all issues. Prioritize PDI deadlines above all others.
PREVENTION: Morning lot walk is mandatory — not optional or skippable. Conducted
            ~30 minutes after arriving, every operational day.
            (knowledge/daily-operations-workflow.md, Section 1)
STATUS_TAG: POTENTIAL
```

---

## FM-12: New Employee Not Informed of Rules → Unintentional Violations

```
FAILURE MODE: Onboarding Rule Gap
TRIGGER: A new employee begins work without being informed of key operational rules:
         staff parking on street, Key Cafe sign-out requirements, sold sign protocol,
         Accountability Agreement requirement.
DETECTION: New employee parks on lot. New employee attempts to take a key or plate
           without signing out through Key Cafe. New employee is unaware of sold sign
           placement obligation.
CONSEQUENCE: Unintentional rule violations by a new employee who genuinely did not
             know the rules. If penalties apply (plate lost), the new employee bears
             the financial consequence despite not being informed. Sets a bad
             precedent if not addressed correctly.
RECOVERY: Address kindly — this is an education moment, not a discipline moment.
          "Hey, welcome aboard. All sales have to park on the street — limited space,
          landlord parking, big trucks coming through."
PREVENTION: Accountability Agreement must be signed before any key/plate access.
            Parking rule communicated on first day. All operational rules included
            in onboarding. (knowledge/key-cafe-protocol.md, Section 5;
            knowledge/communication-and-escalation-protocols.md, Section 4)
STATUS_TAG: POTENTIAL
```

---

## FM-13: Vehicle Placed in Wrong Zone — Misaligned Status and Location

```
FAILURE MODE: Incorrect Zone Placement
TRIGGER: A vehicle is placed in a zone that does not match its status. Examples:
         a RECON vehicle placed in the Cage; a BND vehicle placed in the West Side
         of Building when East Side Fence Line has open slots; a NEW vehicle placed
         in West Side of Building as RECON.
DETECTION: Morning lot walk identifies vehicle whose zone does not match its Airtable
           status or category. Airtable audit shows vehicle status does not match
           physical location.
CONSEQUENCE: For RECON in Cage: compliance failure, non-display-ready vehicle in
             customer-facing area. For NEW as RECON in West Side: vehicle hidden from
             sales, PDI deadline missed. For BND misplaced: delivery confusion.
RECOVERY: (1) Identify correct zone for vehicle status. (2) Move vehicle to correct
          zone. (3) Update any relevant Airtable status fields if incorrect.
PREVENTION: Zone assignment rules are absolute — each status maps to exactly one zone.
            Morning lot walk cross-checks physical placement against Airtable status.
            (knowledge/lot-placement-rules.md, Step 3)
STATUS_TAG: POTENTIAL
```

---

## FM-14: Peer-to-Peer Key Transfer — Misattributed Accountability

```
FAILURE MODE: Key Set Peer-to-Peer Transfer
TRIGGER: Same mechanism as FM-04 (Dealer Plate), applied to vehicle key sets. Employee
         A has keys signed out, passes directly to Employee B without Key Cafe.
DETECTION: Key Cafe log shows Employee A still has the keys checked out. Employee A
           reports they gave the keys to Employee B. If keys are lost, Employee A
           bears the penalty despite Employee B being responsible.
CONSEQUENCE: Key replacement cost (~50% of replacement cost) applied to wrong employee.
             GPS key tag reprogram ($25) if tag is also lost. Vehicle security risk.
             Cannot enforce accountability on the correct person.
RECOVERY: (1) Apply penalty to Employee A (last Key Cafe signer). (2) Reinforce
          no peer-to-peer transfer rule.
PREVENTION: No peer-to-peer transfers — absolute rule for keys and plates.
            (knowledge/key-cafe-protocol.md, Section 4)
STATUS_TAG: POTENTIAL
```

---

## FM-15: Customer Vehicle Moved or Processed Incorrectly

```
FAILURE MODE: Customer Personal Vehicle Misidentification
TRIGGER: A customer's personal vehicle is on the lot for service or pickup, but no
         customer vehicle sign ("Customer's car, picking up [date]") has been placed.
         Staff treat the vehicle as inventory, trade-in, or auction-bound.
DETECTION: Staff attempt to move, detail, or tag the vehicle as inventory. Customer
           arrives and vehicle is not where expected. Morning lot walk identifies
           vehicle with no identification that, upon investigation, belongs to a
           customer.
CONSEQUENCE: Customer's vehicle is incorrectly processed, moved, or damaged. Customer
             trust and satisfaction severely damaged. Potential liability for any
             damage. Legal/insurance implications if vehicle is damaged while being
             treated as dealership property.
RECOVERY: (1) Identify vehicle as customer-owned. (2) Place customer sign immediately.
          (3) Return vehicle to correct location. (4) Assess any damage. (5) Communicate
          with customer about any changes to their vehicle.
PREVENTION: Customer vehicle sign placed immediately when vehicle arrives.
            Morning lot walk checks every unidentified vehicle.
            (knowledge/signage-and-tagging-standards.md, Section 4)
STATUS_TAG: POTENTIAL
```

---

## FM-16: Trade-In Not Routed Correctly → Delayed Sale or Auction Opportunity Lost

```
FAILURE MODE: Trade-In Misrouting
TRIGGER: A trade-in vehicle is received from a customer but is not immediately
         assessed and routed to the correct next step: DHD (detail only), West Side
         of Building (RECON — needs mechanical work), or Auction Area (auction-bound).
DETECTION: Trade-in vehicle sits without movement for days. No routing decision has
           been recorded or communicated. Vehicle lacks a trade-in banner.
CONSEQUENCE: Vehicle sits idle. Revenue opportunity delayed (if retail-routable) or
             auction opportunity missed (if auction-bound). Days-in-stock accumulate
             on a vehicle that should be moving through a process.
RECOVERY: (1) Place trade-in banner immediately if not done. (2) Assess condition.
          (3) Route: detail-only to DHD; mechanical work to West Side of Building
          (RECON); auction-bound to Auction Area. (4) Update Airtable accordingly.
PREVENTION: Trade-in banner placed and routing decision made immediately when
            trade-in arrives. No trade-in sits without routing.
            (knowledge/signage-and-tagging-standards.md, Section 3;
            knowledge/vehicle-statuses-and-transitions.md — Trade-In state)
STATUS_TAG: POTENTIAL
```

---

## Failure Mode Summary Table

| ID | Failure Mode | Status Tag | Severity |
|---|---|---|---|
| FM-01 | Ship Mode Delivery | CONFIRMED | HIGH |
| FM-02 | Unidentified Vehicle Paralysis (Kia Incident) | CONFIRMED | HIGH |
| FM-03 | Stellantis PDI Compliance Rate Failure | CONFIRMED | HIGH |
| FM-04 | Dealer Plate Lost — Accountability Chain Broken | CONFIRMED | HIGH |
| FM-05 | RECON Misclassification of New Arrival | CONFIRMED | HIGH |
| FM-06 | Skipped Detail Before Delivery | CONFIRMED | MEDIUM |
| FM-07 | Missing Sold Sign — Vehicle Disposition Error | POTENTIAL | MEDIUM |
| FM-08 | Lost Key Set | POTENTIAL | MEDIUM |
| FM-09 | Non-Prime Vehicle on Lot — Insurance Exposure | CONFIRMED | HIGH |
| FM-10 | Service Department Chronic Underutilization | CONFIRMED | HIGH |
| FM-11 | Morning Lot Walk Omission | POTENTIAL | HIGH |
| FM-12 | Onboarding Rule Gap | POTENTIAL | MEDIUM |
| FM-13 | Incorrect Zone Placement | POTENTIAL | MEDIUM |
| FM-14 | Key Set Peer-to-Peer Transfer | POTENTIAL | MEDIUM |
| FM-15 | Customer Vehicle Misidentification | POTENTIAL | HIGH |
| FM-16 | Trade-In Misrouting | POTENTIAL | MEDIUM |

---
