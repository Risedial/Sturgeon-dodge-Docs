# Decision Tree: Staff Parking — New Employee Violation
**File:** staff-parking-new-employee.md
**Status:** COMPLETE
**Cross-references:** staff-parking-repeat-violation.md

---

## Trigger
A vehicle belonging to a new employee is found parked on the dealership lot (not on the street) during the morning lot walk or at any point during the day. The employee was not informed of the parking rule before arriving.

## Responsible Role
Lot Manager / Operations Manager

---

## Decision Tree

START
│
├── Q: Is the vehicle parked on the dealership lot (not on the street)?
│   │
│   ├── NO:
│   │   └── OUTCOME: No violation. No action required.
│   │       END
│   │
│   └── YES:
│       │
│       ├── Q: Is this employee new (not previously informed of the street-parking rule)?
│       │   │
│       │   ├── NO (employee knew the rule):
│       │   │   └── THEN: → SEE: staff-parking-repeat-violation.md
│       │   │
│       │   └── YES (new employee — rule was not communicated before arrival):
│       │       │
│       │       ├── ACTION: Approach the employee directly, in person.
│       │       │   ROLE: Lot Manager / Operations Manager
│       │       │   CHANNEL: In-person, face-to-face
│       │       │   SAY: "Hey, welcome aboard. All sales have to park on the street —
│       │       │         limited space, landlord parking, big trucks coming through."
│       │       │
│       │       │   FRAMING NOTES (do NOT deviate from this approach):
│       │       │   - Tone is welcoming and respectful — NOT confrontational
│       │       │   - NOT personal criticism of the employee
│       │       │   - Frame as standard practice: this is how it works here
│       │       │   - Do NOT imply the employee did anything wrong — they were not told
│       │       │
│       │       └── THEN: → Q: Does the employee move their vehicle to the street
│       │                        immediately after being informed?
│       │                   │
│       │                   ├── YES:
│       │                   │   └── OUTCOME: Violation resolved. Rule is now established
│       │                   │              with this employee. No further action.
│       │                   │              Log in WhatsApp group:
│       │                   │              "Parking rule communicated to [Employee Name/Role]
│       │                   │               on [date]. Vehicle moved to street."
│       │                   │       END
│       │                   │
│       │                   └── NO (employee does not comply after being told):
│       │                       │
│       │                       ├── ACTION: This is no longer a new-employee education moment
│       │                       │          — it is now a refusal to comply after instruction.
│       │                       │
│       │                       ├── ACTION: Escalate immediately to Sales Manager (Kevin).
│       │                       │   ROLE: Lot Manager / Operations Manager
│       │                       │   CHANNEL: Direct conversation (in-person or phone)
│       │                       │   SAY: "I told [Employee Name/Role] they need to park on
│       │                       │         the street. They haven't moved. I need you to
│       │                       │         address it."
│       │                       │
│       │                       ├── ACTION: Document the non-compliance in WhatsApp group.
│       │                       │   ROLE: Lot Manager / Operations Manager
│       │                       │   CHANNEL: WhatsApp group
│       │                       │   SAY: "Parking rule communicated to [Employee Name/Role]
│       │                       │         on [date]. Vehicle not moved after instruction.
│       │                       │         Escalated to Sales Manager (Kevin)."
│       │                       │
│       │                       └── OUTCOME: Matter in hands of Sales Manager (Kevin).
│       │                                   → SEE: staff-parking-repeat-violation.md
│       │                           END

---

## Terminal Outcomes

- **Outcome A — Complied:** Employee was informed kindly and moved their vehicle to the street. Rule is established. Logged.
- **Outcome B — Escalated:** Employee did not comply after instruction. Escalated to Sales Manager (Kevin). Documented in WhatsApp group. Proceeds as repeat violation.

---

## Notes

- The referenced example in source material is "Chris's son" — a new hire who parked on the lot because no one told him the rule. The correct response is the welcoming education in Outcome A.
- The Owner / General Manager personally parks on the street even when the lot is blocked. This standard applies to all roles, including leadership.
- "All sales have to park on the street" — this is the standard phrasing. Do not modify the language.
- A new employee who parks on the lot has not done anything wrong — they were not told. The violation is informational, not disciplinary, until they have been informed and choose not to comply.
- If an employee complies immediately, no further action is needed beyond the WhatsApp log entry for documentation.
- [NEEDS_INPUT] First violation protocol for existing employees (employees who knew the rule but park on the lot for the first time after being informed) — source material does not specify. If that scenario arises, use → SEE: staff-parking-repeat-violation.md as the closest applicable tree.
```
