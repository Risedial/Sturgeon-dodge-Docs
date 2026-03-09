# Decision Tree: Sold Sign Missing — Enforcement
**File:** sold-sign-missing-enforcement.md
**Status:** COMPLETE
**Cross-references:** vehicle-sold-processing.md

---

## Trigger
A vehicle is identified as sold (Airtable status: `SIGNED DEAL` or `WHOLESALE | SOLD`) during the morning lot walk or at any point during operations, and no sold sign is present inside the vehicle. The sold sign must show the customer's name written in Sharpie and must be placed visibly inside the vehicle immediately when the vehicle is sold.

## Responsible Role
Lot Manager / Operations Manager

---

## Decision Tree

START
│
├── Q: Is a sold sign with the customer's name visibly placed inside the vehicle?
│   │
│   ├── YES:
│   │   └── OUTCOME: Compliant. No action required.
│   │       END
│   │
│   └── NO (sold sign is missing or present but blank — no customer name):
│       │
│       ├── ACTION: Confirm the vehicle's sold status in Airtable before proceeding.
│       │   ROLE: Lot Manager / Operations Manager
│       │   CHECK: Airtable MASTER INVENTORY → Airtable status = SIGNED DEAL
│       │          or WHOLESALE | SOLD
│       │
│       └── THEN: → Q: Is Airtable status confirmed as SIGNED DEAL or WHOLESALE | SOLD?
│                   │
│                   ├── NO (Airtable status does not confirm vehicle as sold):
│                   │   └── OUTCOME: Vehicle is not sold — no sold sign required.
│                   │              If status is unclear, → SEE: vehicle-status-unknown.md
│                   │       END
│                   │
│                   └── YES (vehicle is confirmed sold — sold sign is missing):
│                       │
│                       ├── Q: Has a sold sign request already been made to the
│                       │      Sales Manager (Kevin) for this vehicle today?
│                       │   │
│                       │   ├── NO (first request — Strike 1):
│                       │   │   │
│                       │   │   ├── ACTION: Initiate Strike 1 — polite, helpful request.
│                       │   │   │   ROLE: Lot Manager / Operations Manager
│                       │   │   │   CHANNEL: Direct conversation (in-person or phone)
│                       │   │   │            OR WhatsApp group
│                       │   │   │   SAY: "Hey, Kevin, do you mind getting your guys to
│                       │   │   │         put a sold sign in there?"
│                       │   │   │
│                       │   │   ├── ACTION: Log Strike 1 in WhatsApp group with vehicle
│                       │   │   │          identifier and timestamp.
│                       │   │   │   ROLE: Lot Manager / Operations Manager
│                       │   │   │   CHANNEL: WhatsApp group
│                       │   │   │   SAY: "Sold sign missing — [Vehicle Stock#/Description].
│                       │   │   │         Strike 1 request sent to Kevin at [time]."
│                       │   │   │
│                       │   │   └── THEN: Wait a reasonable amount of time for the sales
│                       │   │           team to place the sign. If sign is placed → END.
│                       │   │           If sign is not placed → return to this tree
│                       │   │           (Strike 2 branch below).
│                       │   │           END (pending)
│                       │   │
│                       │   └── YES (a prior request was already made — proceed to
│                       │          Strike 2 or Strike 3):
│                       │       │
│                       │       └── Q: Has Strike 2 already been issued for this vehicle?
│                       │           │
│                       │           ├── NO (Strike 1 was issued, no response — Strike 2):
│                       │           │   │
│                       │           │   ├── ACTION: Initiate Strike 2 — reminder with
│                       │           │   │          slightly more emphasis.
│                       │           │   │   ROLE: Lot Manager / Operations Manager
│                       │           │   │   CHANNEL: Direct conversation (in-person or
│                       │           │   │            phone) OR WhatsApp group
│                       │           │   │   SAY: "Hey, Kevin, do you mind?"
│                       │           │   │
│                       │           │   │   NOTE: Same request as Strike 1, but tone
│                       │           │   │         conveys this is a second ask — not a
│                       │           │   │         first. No elaboration needed.
│                       │           │   │
│                       │           │   ├── ACTION: Log Strike 2 in WhatsApp group.
│                       │           │   │   ROLE: Lot Manager / Operations Manager
│                       │           │   │   CHANNEL: WhatsApp group
│                       │           │   │   SAY: "Sold sign still missing — [Vehicle
│                       │           │   │         Stock#/Description]. Strike 2 issued
│                       │           │   │         to Kevin at [time]."
│                       │           │   │
│                       │           │   └── THEN: Wait a reasonable amount of time for
│                       │           │           the sales team to place the sign.
│                       │           │           If sign is placed → END.
│                       │           │           If sign is not placed → return to this
│                       │           │           tree (Strike 3 branch below).
│                       │           │           END (pending)
│                       │           │
│                       │           └── YES (Strike 2 was issued, no response — Strike 3):
│                       │               │
│                       │               ├── ACTION: Initiate Strike 3 — direct
│                       │               │          accountability conversation.
│                       │               │   ROLE: Lot Manager / Operations Manager
│                       │               │   CHANNEL: Direct, in-person conversation
│                       │               │            (preferred — not text or chat)
│                       │               │   SAY: "Kev, killing me, buddy. Can you just
│                       │               │         tell me the stuff and I'll do it,
│                       │               │         because we have to be organized."
│                       │               │
│                       │               │   EXPECTED RESPONSE FROM SALES MANAGER (Kevin):
│                       │               │   "No, no, buddy, I'm coming down myself.
│                       │               │    I'll do it myself."
│                       │               │
│                       │               ├── ACTION: Log Strike 3 in WhatsApp group.
│                       │               │   ROLE: Lot Manager / Operations Manager
│                       │               │   CHANNEL: WhatsApp group
│                       │               │   SAY: "Sold sign still missing — [Vehicle
│                       │               │         Stock#/Description]. Strike 3 issued
│                       │               │         to Kevin at [time]. In-person."
│                       │               │
│                       │               └── THEN: → Q: Does Sales Manager (Kevin) place
│                       │                           the sign (personally or by directing
│                       │                           sales staff)?
│                       │                       │
│                       │                       ├── YES:
│                       │                       │   └── OUTCOME: Compliant after Strike 3.
│                       │                       │              Log resolution in WhatsApp:
│                       │                       │              "Sold sign placed —
│                       │                       │               [Vehicle Stock#]. Resolved
│                       │                       │               after Strike 3 at [time]."
│                       │                       │       END
│                       │                       │
│                       │                       └── NO (sign still not placed after
│                       │                               Strike 3):
│                       │                           │
│                       │                           ├── OUTCOME: Escalation path after
│                       │                           │          Strike 3 failure is
│                       │                           │          not specified in source
│                       │                           │          material. [NEEDS_INPUT]
│                       │                           │
│                       │                           ├── ACTION: As interim measure,
│                       │                           │          escalate to Owner /
│                       │                           │          General Manager.
│                       │                           │   ROLE: Lot Manager / Operations
│                       │                           │          Manager
│                       │                           │   CHANNEL: Direct conversation
│                       │                           │   SAY: "Sold sign for [Vehicle
│                       │                           │         Stock#] has been missing
│                       │                           │         through three requests to
│                       │                           │         Kevin. Still not placed.
│                       │                           │         I need your direction."
│                       │                           │
│                       │                           └── ACTION: Log in WhatsApp group.
│                       │                               ROLE: Lot Manager / Operations
│                       │                                      Manager
│                       │                               CHANNEL: WhatsApp group
│                       │                               SAY: "Sold sign missing for
│                       │                                     [Vehicle Stock#] — Strike 3
│                       │                                     issued, no result. Escalated
│                       │                                     to GM at [time]."
│                       │                               END

---

## Terminal Outcomes

- **Outcome A — Compliant (no action):** Vehicle already has sold sign with customer name. No action required.
- **Outcome B — Not sold (no sign required):** Airtable confirms vehicle is not sold. No sold sign needed. Route to vehicle-status-unknown.md if status is unclear.
- **Outcome C — Resolved at Strike 1:** Sales team placed the sign after the first polite request.
- **Outcome D — Resolved at Strike 2:** Sales team placed the sign after the reminder.
- **Outcome E — Resolved at Strike 3:** Sales Manager (Kevin) placed the sign himself (or directed staff) after the direct accountability conversation.
- **Outcome F — Escalated beyond Strike 3:** Sign still not placed after all three strikes. Escalated to Owner / General Manager. [NEEDS_INPUT — formal action not defined in source material]

---

## Notes

- **Supplies location:** Sold signs and Sharpies are kept upstairs in the dealership building. If the sales team says they cannot find supplies, they must go upstairs to retrieve them.
- **Timing requirement:** The sold sign must be placed **immediately when a vehicle is sold** — not at end of day, not when paperwork finalizes, not at delivery. If a vehicle was sold and has no sign, the 3-strike protocol begins immediately upon discovery.
- **Who can place the sign:** The salesperson who completed the deal, OR the lot team when directed via team chat or by the Sales Manager (Kevin).
- **Content requirement:** Customer name must be written on the sign with a Sharpie. A blank sold sign does not satisfy the requirement.
- **Strike 3 language is exact and confirmed in source material.** Do NOT paraphrase, soften, or modify these three SAY statements. The escalation progression relies on the specific phrasing as confirmed.
- **The expected response to Strike 3** ("No, no, buddy, I'm coming down myself. I'll do it myself.") is confirmed in source material as the typical outcome. This is the expected self-correction pattern.
- **Escalation path after Strike 3 failure** is not specified in source material. The interim escalation to Owner / General Manager in this tree is constructed from general escalation logic. Confirm with management. [NEEDS_INPUT]
- **The 3-strike protocol is directed at Sales Manager (Kevin)** — not at individual salespersons. The Sales Manager is the accountability point for his team's compliance.
