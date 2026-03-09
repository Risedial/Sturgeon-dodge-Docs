# Decision Tree: Staff Parking — Repeat Violation
**File:** staff-parking-repeat-violation.md
**Status:** [COMPLETE]
**Cross-references:** staff-parking-new-employee.md

---

## Trigger
An employee's vehicle is found parked on the dealership lot (not on the street) AND the employee has already been informed of the street-parking rule. This includes:
- A new employee who was informed under the new-employee protocol (→ SEE: staff-parking-new-employee.md) and has parked on the lot again
- Any employee who knew the rule and parked on the lot

## Responsible Role
Lot Manager / Operations Manager

---

## Decision Tree

START
│
├── Q: Is the employee's vehicle parked on the dealership lot (not on the street)?
│   │
│   ├── NO:
│   │   └── OUTCOME: No violation. No action required.
│   │       END
│   │
│   └── YES:
│       │
│       ├── Q: Has this employee been informed of the street-parking rule at least once
│       │      before today?
│       │   │
│       │   ├── NO (first-time violation, employee is new and uninformed):
│       │   │   └── THEN: → SEE: staff-parking-new-employee.md
│       │   │
│       │   └── YES (employee knew the rule — this is a repeat violation):
│       │       │
│       │       ├── ACTION: Document the repeat violation immediately before approaching.
│       │       │   ROLE: Lot Manager / Operations Manager
│       │       │   CHANNEL: WhatsApp group
│       │       │   SAY: "Repeat parking violation — [Employee Name/Role] parked on
│       │       │         lot on [date]. Previously informed on [date of prior
│       │       │         notification]. Addressing now."
│       │       │
│       │       ├── ACTION: Approach the employee directly, in person.
│       │       │   ROLE: Lot Manager / Operations Manager
│       │       │   CHANNEL: In-person
│       │       │   SAY: "Hey — just a reminder, all staff have to park on the street.
│       │       │         We talked about this. Can you move it now?"
│       │       │
│       │       └── THEN: → Q: Does the employee move their vehicle to the street?
│       │                   │
│       │                   ├── YES:
│       │                   │   │
│       │                   │   └── THEN: → Q: Is this the second or more repeat violation
│       │                   │                  for this employee?
│       │                   │               │
│       │                   │               ├── NO (first repeat, now resolved):
│       │                   │               │   └── OUTCOME: Violation resolved. Update
│       │                   │               │              WhatsApp log: "Vehicle moved.
│       │                   │               │              Resolved."
│       │                   │               │       END
│       │                   │               │
│       │                   │               └── YES (pattern of repeat violations):
│       │                   │                   │
│       │                   │                   ├── ACTION: Escalate to Sales Manager (Kevin)
│       │                   │                   │          regardless of compliance today.
│       │                   │                   │   ROLE: Lot Manager / Operations Manager
│       │                   │                   │   CHANNEL: Direct conversation
│       │                   │                   │   SAY: "[Employee Name/Role] has parked on
│       │                   │                   │         the lot multiple times after being
│       │                   │                   │         told. They moved it today but this
│       │                   │                   │         is becoming a pattern. Your call on
│       │                   │                   │         next steps."
│       │                   │                   │
│       │                   │                   └── OUTCOME: Documented pattern escalated to
│       │                   │                              Sales Manager (Kevin).
│       │                   │                       END
│       │                   │
│       │                   └── NO (employee refuses to move vehicle after reminder):
│       │                       │
│       │                       ├── ACTION: Escalate immediately to Sales Manager (Kevin).
│       │                       │   ROLE: Lot Manager / Operations Manager
│       │                       │   CHANNEL: Direct conversation (in-person or phone)
│       │                       │   SAY: "[Employee Name/Role] parked on the lot again
│       │                       │         after being told. I've reminded them and they
│       │                       │         haven't moved it. I need you to address this
│       │                       │         directly."
│       │                       │
│       │                       ├── ACTION: If Sales Manager (Kevin) is unavailable,
│       │                       │          escalate to Owner / General Manager.
│       │                       │   ROLE: Lot Manager / Operations Manager
│       │                       │   CHANNEL: Direct conversation (in-person or phone)
│       │                       │   SAY: "[Employee Name/Role] has parked on the lot
│       │                       │         again after prior warning. I can't get Kevin.
│       │                       │         Vehicle is still on the lot. Flagging to you."
│       │                       │
│       │                       ├── ACTION: Update WhatsApp log.
│       │                       │   ROLE: Lot Manager / Operations Manager
│       │                       │   CHANNEL: WhatsApp group
│       │                       │   SAY: "[Employee Name/Role] repeat parking violation
│       │                       │         [date]. Vehicle not moved after direct reminder.
│       │                       │         Escalated to [Sales Manager / GM]."
│       │                       │
│       │                       └── OUTCOME: Non-compliance after direct instruction.
│       │                                   Matter escalated to Sales Manager (Kevin)
│       │                                   or Owner / General Manager. Further
│       │                                   disciplinary action is at management
│       │                                   discretion. [NEEDS_INPUT]
│       │                           END

---

## Terminal Outcomes

- **Outcome A — Resolved (first repeat):** Employee moved their vehicle after reminder. Documented. No further action.
- **Outcome B — Pattern escalated:** Employee moved their vehicle but this is a recurring pattern. Documented and escalated to Sales Manager (Kevin) for awareness and next steps.
- **Outcome C — Refusal escalated:** Employee did not move vehicle after direct reminder. Escalated to Sales Manager (Kevin) or Owner / General Manager. Documented in WhatsApp group.

---

## Notes

- Source material does not specify the escalation path beyond the initial repeat-violation reminder (for either the "moved it but keeps doing it" scenario or the "refused to move it" scenario). These branches are structured from the escalation logic confirmed throughout other protocols (Sales Manager → Owner/GM), but management must confirm specific consequences. [NEEDS_INPUT]
- Documentation in WhatsApp group is mandatory. Every parking violation — first or repeat — must be logged so that if a pattern continues, there is a record of every instance and every action taken.
- The Owner / General Manager parks on the street personally even when blocked — this is the standard the whole team is held to. Parking on the lot is never acceptable regardless of role.
- The "all sales have to park on the street" language is confirmed. Exact language for the repeat-violation reminder is not in source material — the SAY text in this tree is constructed from the established principle. [ASSUMPTION]
