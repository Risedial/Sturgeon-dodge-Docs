# Decision Tree: Key, GPS Key Tag, or Dealer Plate — Lost Item Response
**File:** key-plate-lost-response.md
**Status:** [COMPLETE]
**Cross-references:** key-plate-sign-in.md, key-plate-sign-out.md

---

## Trigger
A vehicle key set, GPS key tag, or dealer plate is reported missing or cannot be located by the employee who signed it out.

## Responsible Role
Lot Manager (coordinates response); Employee who last signed the item out (financially responsible)

---

## Decision Tree

START
│
├── !! FIRST ACTION — BEFORE DECLARING ANYTHING LOST !!
│   Check the GPS key tag tracking system to determine the item's physical location.
│   ROLE: Lot Manager or reporting employee
│   NOTE: Every key set has a GPS-enabled tag attached. The GPS tag may reveal the item's
│         location without any further search. This step is mandatory — do NOT skip it.
│         Cost to reprogram a GPS tag if it is confirmed lost: $25.
│
├── Q: Does the GPS key tag location data show the item in a known, accessible location?
│   │
│   ├── YES:
│   │   │
│   │   ├── ACTION: Dispatch to retrieve item from GPS-indicated location
│   │   │   ROLE: Lot Manager or Lot Attendant
│   │   │
│   │   └── THEN: Item retrieved → employee returns item to Key Cafe and signs it in →
│   │             LOG: employee name + timestamp
│   │             [OUTCOME A: Item located via GPS; retrieved; returned through Key Cafe;
│   │              no financial penalty; no loss]
│   │
│   └── NO (GPS location is inconclusive, unavailable, or item not retrievable from GPS location):
│       │
│       ├── STEP 1 — Identify the responsible employee from the Key Cafe log
│       │   ROLE: Lot Manager
│       │   ACTION: Pull the Key Cafe sign-out log — identify the employee who last signed
│       │           out this item and the date/time of sign-out
│       │   RESULT: That employee is the financially responsible party. This determination
│       │           is final. "I gave it to someone else" is not a valid defense — the Key
│       │           Cafe log is the only evidence that matters.
│       │
│       ├── STEP 2 — Conduct immediate physical search
│       │   ROLE: Lot Manager + Employee who last signed the item out
│       │   Search locations in this order:
│       │   1. The vehicle the item was signed out for (check interior, cup holders, visor)
│       │   2. Reception desk / front counter
│       │   3. Service desk
│       │   4. Break room
│       │   5. Employee's personal workspace or desk
│       │
│       ├── Q: Is the item found during the physical search?
│       │   │
│       │   ├── YES:
│       │   │   │
│       │   │   ├── ACTION: Return item to Key Cafe immediately; log the return
│       │   │   │   ROLE: Employee who signed the item out (or Lot Manager if employee
│       │   │   │         is unavailable)
│       │   │   │   LOG: employee name + timestamp of return
│       │   │   │
│       │   │   └── THEN: No financial penalty applied — item was found and returned
│       │   │             through Key Cafe correctly
│       │   │             [OUTCOME B: Item found during physical search; returned through
│       │   │              Key Cafe; no penalty; no financial impact]
│       │   │
│       │   └── NO (item not found after GPS check + full physical search):
│       │       │
│       │       ├── STEP 3 — Formally notify General Manager
│       │       │   ROLE: Lot Manager
│       │       │   CHANNEL: Direct conversation (in-person preferred)
│       │       │   SAY: "[Item type — dealer plate / GPS key tag / vehicle key set] is
│       │       │         confirmed lost. Last signed out by [Employee Name] on [date and
│       │       │         time per Key Cafe log]. GPS check completed — inconclusive.
│       │       │         Physical search completed — not found. Ready to initiate the
│       │       │         financial deduction process."
│       │       │
│       │       ├── STEP 4 — Initiate financial deduction per penalty schedule
│       │       │   ROLE: General Manager authorizes; Finance / Payroll processes deduction
│       │       │   against the responsible employee (last signer per Key Cafe log)
│       │       │   │
│       │       │   ├── DEALER PLATE LOST:
│       │       │   │   Penalty: $500
│       │       │   │   Charged to: Employee who last signed it out (Key Cafe log)
│       │       │   │   Enforcement: CONFIRMED PRECEDENT — an employee (Charlie) paid this
│       │       │   │               full $500 penalty. It was not forgiven.
│       │       │   │
│       │       │   ├── GPS KEY TAG LOST (separated from key set or lost independently):
│       │       │   │   Penalty: $25 (cost to reprogram replacement tag)
│       │       │   │   Charged to: Employee who lost the tag
│       │       │   │   Enforcement: ENFORCED
│       │       │   │
│       │       │   └── VEHICLE KEY SET LOST:
│       │       │       Penalty: ~50% of full key set replacement cost
│       │       │       Charged to: Employee who lost the keys
│       │       │       Enforcement: ENFORCED
│       │       │       NOTE: Exact replacement cost varies by vehicle model — Lot Manager
│       │       │             confirms actual cost at time of loss [NEEDS_INPUT]
│       │       │
│       │       └── STEP 5 — Replacement or reprogram
│       │           │
│       │           ├── DEALER PLATE:
│       │           │   ACTION: Contact the relevant authority to obtain a replacement
│       │           │           dealer plate [NEEDS_INPUT — exact replacement contact and
│       │           │           process not specified in source material]
│       │           │   ROLE: General Manager or Lot Manager
│       │           │
│       │           ├── GPS KEY TAG:
│       │           │   ACTION: Arrange reprogram of replacement GPS tag — $25 charge
│       │           │           processed against responsible employee
│       │           │   ROLE: Lot Manager coordinates; Finance processes charge
│       │           │
│       │           └── VEHICLE KEY SET:
│       │               ACTION: Order replacement key set from appropriate supplier —
│       │                       ~50% of replacement cost charged to responsible employee
│       │               ROLE: Lot Manager or Service Department coordinates order
│       │               THEN: New item enters Key Cafe system → available for sign-out
│       │                     [OUTCOME C: Item confirmed lost; financial deduction initiated;
│       │                      replacement/reprogram ordered; responsible employee notified]

---

## Terminal Outcomes

- **Outcome A — Item Located via GPS:** GPS key tag tracking revealed the item's location. Item was retrieved and returned through Key Cafe. No financial penalty. No loss declared.
- **Outcome B — Item Found During Physical Search:** GPS was inconclusive, but systematic physical search located the item. Item returned through Key Cafe. No financial penalty. No loss declared.
- **Outcome C — Item Confirmed Lost:** GPS check and full physical search completed — item not found. General Manager formally notified. Financial deduction initiated against the last signer (per Key Cafe log). Replacement or reprogram ordered. Applicable penalties: dealer plate $500, GPS key tag $25, vehicle keys ~50% of replacement cost.

---

## Notes

**[CRITICAL RULE — GPS CHECK IS MANDATORY FIRST STEP]:** Do not declare a key set lost, initiate a penalty, or begin any formal process until the GPS key tag has been checked. The tag may reveal the item's location immediately, eliminating all further steps. Skipping this step is a procedural failure.

**[CRITICAL RULE — KEY CAFE LOG IS THE ONLY EVIDENCE]:** The last person to sign an item out through Key Cafe owns financial liability for that item until it is signed back in. No alternative defense is accepted:
- "I gave it to [name]" — not a valid defense
- "I don't know where it is" — penalty still applies
- "I only had it for a few minutes" — penalty still applies
Confirmed precedent: Charlie (role [AMBIGUOUS]) lost a dealer plate and paid the full $500 penalty. It was not forgiven or reduced.

**[NEEDS_INPUT]:** The exact contact and process for replacing a lost dealer plate is not specified in source material. This must be confirmed with management before this outcome can be fully executed.

**[NEEDS_INPUT]:** Exact key replacement costs vary by vehicle model. The "~50%" figure is the portion charged to the responsible employee, but the base cost from which this is calculated varies. Lot Manager should confirm the actual replacement cost at the time of each incident.

**[ASSUMPTION]:** "Finance / Payroll processes deduction" — the specific administrative mechanism for deducting financial penalties from employee pay is assumed to be through payroll. The exact administrative process is not specified in source material.
