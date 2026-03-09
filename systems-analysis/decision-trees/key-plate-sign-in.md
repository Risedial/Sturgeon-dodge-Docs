# Decision Tree: Key or Dealer Plate — Sign-In (Return)
**File:** key-plate-sign-in.md
**Status:** [COMPLETE]
**Cross-references:** key-plate-sign-out.md, key-plate-lost-response.md

---

## Trigger
An employee is done with a vehicle key set or a dealer plate and needs to return it.

## Responsible Role
Employee who signed the item out (sole responsible party for return through Key Cafe)

---

## Decision Tree

START
│
├── RULE (applies throughout this entire tree): The employee who signed the item out is
│   responsible for that item until THEY personally check it back in through Key Cafe.
│   Responsibility does NOT transfer person-to-person outside of Key Cafe.
│
├── Q: Is the employee returning the item in person at Key Cafe?
│   │
│   ├── YES:
│   │   │
│   │   ├── ACTION: Employee returns to Key Cafe (3rd floor, by Jorja's desk) and signs
│   │   │   the item back in
│   │   │   ROLE: Employee (the person who signed it out)
│   │   │   LOG: Employee name + timestamp — recorded for every return transaction, no exceptions
│   │   │
│   │   └── THEN: Item is now back in Key Cafe; employee's liability ends at the logged
│   │             timestamp of return
│   │             [OUTCOME A: Item returned; liability ended; Key Cafe record updated]
│   │
│   └── NO (employee is attempting to hand the item to another person for return):
│       │
│       ├── Q: Who is being approached for the peer hand-off?
│       │   │
│       │   ├── ANY PERSON (including managers, General Manager, reception staff,
│       │   │   lot attendants — no role is exempt):
│       │   │   │
│       │   │   ├── ACTION: Refuse the hand-off
│       │   │   │   ROLE: Person being asked to accept the item
│       │   │   │   CHANNEL: Direct conversation
│       │   │   │   SAY: "No — you need to check it in yourself through Key Cafe.
│       │   │   │         I can't accept it from you."
│       │   │   │
│       │   │   ├── Q: Does the employee comply and go to Key Cafe to check it in themselves?
│       │   │   │   │
│       │   │   │   ├── YES:
│       │   │   │   │   │
│       │   │   │   │   └── THEN: Employee proceeds to Key Cafe → signs item in under their
│       │   │   │   │             name → LOG: employee name + timestamp
│       │   │   │   │             [OUTCOME B: Peer hand-off refused; employee returned item
│       │   │   │   │              through Key Cafe; liability ended correctly]
│       │   │   │   │
│       │   │   │   └── NO (employee insists on peer hand-off or leaves item with another
│       │   │   │           person anyway):
│       │   │   │       │
│       │   │   │       ├── ACTION: Do not accept the item; escalate to Lot Manager
│       │   │   │       │   immediately
│       │   │   │       │   ROLE: Person being asked to accept
│       │   │   │       │   CHANNEL: Direct conversation with Lot Manager
│       │   │   │       │   SAY: "[Employee Name] is trying to hand me [item type] without
│       │   │   │       │         checking it in through Key Cafe. Can you intervene?"
│       │   │   │       │
│       │   │   │       ├── ACTION: Lot Manager intervenes — directs the employee to Key Cafe
│       │   │   │       │   ROLE: Lot Manager
│       │   │   │       │   CHANNEL: Direct conversation
│       │   │   │       │   SAY: "[Employee Name], I need you to check [item] in through Key
│       │   │   │       │         Cafe yourself. No one else can accept it for you. The Key Cafe
│       │   │   │       │         record still shows you as responsible until you sign it in."
│       │   │   │       │
│       │   │   │       ├── Q: Does employee comply after Lot Manager intervention?
│       │   │   │       │   │
│       │   │   │       │   ├── YES:
│       │   │   │       │   │   └── THEN: Employee proceeds to Key Cafe → signs item in →
│       │   │   │       │   │             LOG: employee name + timestamp
│       │   │   │       │   │             [OUTCOME C: Lot Manager intervention resolved the
│       │   │   │       │   │              situation; item returned correctly]
│       │   │   │       │   │
│       │   │   │       │   └── NO (employee still refuses or item location is now unknown):
│       │   │   │       │       │
│       │   │   │       │       └── ACTION: Treat as potential lost item — item may be
│       │   │   │       │               unaccounted for; Key Cafe log still shows original signer
│       │   │   │       │               as responsible
│       │   │   │       │               ROLE: Lot Manager
│       │   │   │       │               THEN: → SEE: key-plate-lost-response.md
│       │   │   │       │               [OUTCOME D: Item location unconfirmed after refused
│       │   │   │       │                hand-off — escalated as potential loss]

---

## Terminal Outcomes

- **Outcome A — Item Returned Correctly:** Employee returned to Key Cafe in person and signed the item in. Liability ended at the logged timestamp. No issues.
- **Outcome B — Hand-off Refused; Employee Complied:** Peer-to-peer hand-off was refused on first request. Employee went to Key Cafe and signed item in correctly. Liability ended correctly.
- **Outcome C — Lot Manager Resolved:** Employee initially refused to comply with Key Cafe return. Lot Manager intervened. Employee went to Key Cafe and signed item in. Liability ended correctly.
- **Outcome D — Potential Loss Escalated:** Employee refused to return item through Key Cafe and item location is now unconfirmed. Treated as a potential lost item. → SEE: key-plate-lost-response.md. Key Cafe record continues to show original signer as responsible.

---

## Notes

**[CRITICAL RULE — NO EXCEPTIONS]:** An employee's financial liability for a signed-out item does not end until that employee personally checks the item back in through Key Cafe. Handing the item to another person does NOT transfer responsibility. If a peer hand-off occurs outside Key Cafe and the item is subsequently lost, the original signer is still the responsible party and pays the applicable penalty:
- Dealer plate lost: $500 (confirmed precedent — an employee named Charlie paid this penalty)
- GPS key tag lost: $25 reprogram cost
- Vehicle keys lost: ~50% of replacement cost

**[CRITICAL RULE]:** This rule applies to all staff regardless of seniority — lot attendants, sales staff, Sales Manager (Kevin), any manager, the General Manager. No role is exempt from the Key Cafe return requirement.

**[CRITICAL RULE]:** Return must happen immediately when the employee is done with the item — not at the end of the day, not when convenient. Immediate return is the standard.
