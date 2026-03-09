# Decision Tree: Key or Dealer Plate — Sign-Out
**File:** key-plate-sign-out.md
**Status:** [COMPLETE]
**Cross-references:** accountability-agreement-onboarding.md, key-plate-sign-in.md, key-plate-lost-response.md

---

## Trigger
An employee needs to sign out a vehicle key set or a dealer plate for any reason (test drive, vehicle move, delivery preparation, etc.).

## Responsible Role
Lot Manager (administers Key Cafe access); Employee (executes sign-out at Key Cafe)

---

## Decision Tree

START
│
├── Q: Does the requesting employee have a signed Accountability Agreement on file?
│   │
│   ├── NO:
│   │   │
│   │   ├── ACTION: Do not issue the key or plate under any circumstances
│   │   │   ROLE: Lot Manager
│   │   │
│   │   ├── ACTION: Inform the employee
│   │   │   ROLE: Lot Manager
│   │   │   CHANNEL: Direct conversation
│   │   │   SAY: "You need to sign the accountability agreement before I can issue any keys or
│   │   │         plates. See [Sales Manager (Kevin) / General Manager] to complete that."
│   │   │
│   │   └── THEN: → Employee directed to sign Accountability Agreement before any access is
│   │             granted → SEE: accountability-agreement-onboarding.md
│   │             [OUTCOME A: No access until agreement signed]
│   │
│   └── YES:
│       │
│       ├── ACTION: Employee proceeds to Key Cafe (3rd floor, by Jorja's desk)
│       │   ROLE: Employee
│       │
│       ├── Q: Is the requested item currently available in Key Cafe (not signed out to anyone)?
│       │   │
│       │   ├── YES:
│       │   │   │
│       │   │   ├── ACTION: Employee signs out the item at Key Cafe under their own name
│       │   │   │   ROLE: Employee
│       │   │   │   LOG: Employee name + timestamp — recorded for every transaction, no exceptions
│       │   │   │
│       │   │   └── THEN: Employee takes the item — employee now holds full liability for this
│       │   │             item until it is checked back in through Key Cafe by that employee
│       │   │             personally → SEE: key-plate-sign-in.md
│       │   │             [OUTCOME B: Item signed out; employee has custody and liability]
│       │   │
│       │   └── NO (item is currently signed out to another employee):
│       │       │
│       │       ├── ACTION: Do NOT conduct a peer-to-peer transfer — do not ask the other
│       │       │   employee to hand the item over directly
│       │       │   ROLE: Lot Manager
│       │       │   CHANNEL: Direct conversation with requesting employee
│       │       │   SAY: "That item is signed out to [Employee Name]. You cannot receive it
│       │       │         directly — they need to check it back in through Key Cafe first, then
│       │       │         you sign it out under your name."
│       │       │
│       │       ├── Q: Can the requesting employee wait for the item to be returned through
│       │       │       Key Cafe?
│       │       │   │
│       │       │   ├── YES:
│       │       │   │   │
│       │       │   │   ├── ACTION: Contact the employee who currently has the item and ask
│       │       │   │   │   them to return it to Key Cafe
│       │       │   │   │   ROLE: Requesting Employee or Lot Manager
│       │       │   │   │   CHANNEL: Direct conversation or WhatsApp
│       │       │   │   │   SAY: "[Name], can you check [the key/plate] back in through Key
│       │       │   │   │         Cafe when you're done? Someone else needs it."
│       │       │   │   │
│       │       │   │   └── THEN: When item is returned and checked in → requesting employee
│       │       │   │             proceeds to Key Cafe and signs it out under their own name
│       │       │   │             → LOG: employee name + timestamp
│       │       │   │             [OUTCOME C: Item signed out after wait; proper chain maintained]
│       │       │   │
│       │       │   └── NO (requesting employee cannot wait — urgent situation):
│       │       │       │
│       │       │       ├── ACTION: Requesting employee escalates to Lot Manager
│       │       │       │   ROLE: Requesting Employee
│       │       │       │   CHANNEL: Direct conversation
│       │       │       │   SAY: "I need [key/plate] urgently. The one I need is signed out to
│       │       │       │         [Name]. Can you help sort this out?"
│       │       │       │
│       │       │       ├── ACTION: Lot Manager contacts the employee who holds the item and
│       │       │       │   requests immediate return to Key Cafe — does not accept the item
│       │       │       │   directly or facilitate a hand-off outside Key Cafe
│       │       │       │   ROLE: Lot Manager
│       │       │       │   CHANNEL: Direct conversation or WhatsApp
│       │       │       │   SAY: "[Name], I need you to check [item] back in through Key Cafe
│       │       │       │         right now — we have an urgent situation."
│       │       │       │
│       │       │       └── THEN: Item checked in through Key Cafe by current holder →
│       │       │                 requesting employee signs it out under their own name →
│       │       │                 LOG: employee name + timestamp
│       │       │                 [OUTCOME D: Priority resolved; chain maintained through Key Cafe]

---

## Terminal Outcomes

- **Outcome A — No Access:** Employee does not have a signed Accountability Agreement. Key or plate is not issued. Employee directed to sign agreement before any access is granted. → SEE: accountability-agreement-onboarding.md
- **Outcome B — Item Signed Out (Available):** Requested item was available. Employee signed it out through Key Cafe under their name with timestamp. Employee holds full liability until they personally check it back in.
- **Outcome C — Item Signed Out (After Wait):** Requested item was signed out to another employee. Proper return through Key Cafe was facilitated. Requesting employee then signed item out under their own name. Chain of custody maintained.
- **Outcome D — Priority Escalated and Resolved:** Urgent situation required Lot Manager to coordinate immediate return and re-issue. All transactions still executed through Key Cafe only. Chain of custody maintained.

---

## Notes

**[CRITICAL RULE — NO EXCEPTIONS]:** Peer-to-peer transfers of keys and dealer plates are prohibited under all circumstances. If the item is signed out to another employee, the only correct action is to have that employee return it through Key Cafe. No one may hand a plate or key directly to another person. If a peer-to-peer transfer occurs, the Key Cafe log still shows the original signer as responsible — if the plate or key is then lost, the original signer pays the penalty ($500 for a plate, $25 for a GPS key tag reprogram, ~50% for keys) even though they no longer have the item.

**[ASSUMPTION]:** The Lot Manager is the designated administrator of Key Cafe access at the Edmonton Office. Specific confirmation of who manages Key Cafe access beyond the protocol itself is not stated in source material.

**[NEEDS_INPUT]:** What happens if no item of the required type is available (e.g., all dealer plates are signed out and urgently needed)? Escalation path beyond Lot Manager for plate shortage is not specified in source material.
