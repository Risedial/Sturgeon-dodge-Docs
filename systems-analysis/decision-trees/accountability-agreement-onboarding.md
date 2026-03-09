# Decision Tree: Accountability Agreement Onboarding
**File:** accountability-agreement-onboarding.md
**Status:** [COMPLETE]
**Cross-references:** key-plate-sign-out.md, key-plate-sign-in.md, key-plate-lost-response.md

---

## Trigger
A new employee is being onboarded and requires access to keys and/or dealer plates at the Edmonton Office. This tree also activates if an existing employee attempts to sign out a key or dealer plate and the accountability agreement is not on file.

## Responsible Role
Lot Manager or designated trainer.

---

## Decision Tree

START
│
├── Q: Is the accountability agreement already on file for this employee?
│   │
│   ├── YES — agreement is on file:
│   │   │
│   │   ACTION: Confirm record in Key Cafe system before granting any access
│   │   ROLE: Lot Manager
│   │   │
│   │   └── THEN: → Employee may proceed to Key Cafe for sign-out → SEE: key-plate-sign-out.md
│   │       [TERMINAL OUTCOME A — Access Granted]
│   │
│   └── NO — agreement is NOT on file:
│       │
│       ├── Q: Is the employee attempting to take a key or dealer plate right now?
│       │   │
│       │   ├── YES — attempting immediate access:
│       │   │   │
│       │   │   ACTION: Stop the transaction immediately. Do not issue any key or plate.
│       │   │   ROLE: Lot Manager
│       │   │   CHANNEL: direct conversation
│       │   │   SAY: "You need to sign the accountability agreement before I can issue any keys or plates. See [Sales Manager (Kevin) / General Manager] to complete that first."
│       │   │   │
│       │   │   └── THEN: → Begin accountability agreement signing process below (Q1a)
│       │   │
│       │   └── NO — this is standard onboarding (new employee, proactive):
│       │       └── THEN: → Begin accountability agreement signing process below (Q1a)
│
├── Q1a: Is the accountability agreement document available to present to the employee?
│   │
│   ├── YES — document is available:
│   │   └── THEN: → Proceed to Step 1: Agreement Review
│   │
│   └── NO — document is not available / cannot be located:
│       │
│       ACTION: Escalate to Sales Manager (Kevin) or General Manager to obtain document
│       ROLE: Lot Manager
│       CHANNEL: direct conversation
│       SAY: "I need to onboard [employee name/role] for key and plate access but I don't have the accountability agreement document. Can you provide it?"
│       │
│       └── THEN: → Do not grant any key or plate access until document is obtained and signed
│           [HOLD — no access until document obtained]
│
├── STEP 1: Agreement Review — Walk Employee Through the Document
│   │
│   ACTION: Present the accountability agreement to the employee
│   ROLE: Lot Manager or designated trainer
│   │
│   Explain the following sections (in order):
│   │
│   ├── SECTION A: Financial Responsibility
│   │   │
│   │   SAY: "If a dealer plate is lost, the penalty is $500 — charged to the last person who signed it out through Key Cafe. That's you if you signed it out. This has been enforced before — one employee paid the full $500."
│   │   │
│   │   SAY: "If a GPS key tag is lost, it costs $25 to reprogram — charged to you."
│   │   │
│   │   SAY: "If a set of keys is lost, you are responsible for approximately half the replacement cost. The exact amount depends on the vehicle model."
│   │   │
│   │   └── THEN: → Proceed to Section B
│   │
│   ├── SECTION B: Key Cafe Compliance
│   │   │
│   │   SAY: "Every single sign-out and sign-in must go through Key Cafe. Every transaction is logged with your name and timestamp. There are no exceptions."
│   │   │
│   │   SAY: "You cannot take a key or plate from another employee directly. You cannot pass your key or plate to another employee directly. This is called a peer-to-peer transfer and it is prohibited. If someone asks you for the plate you have signed out, the answer is: 'No — go back to Key Cafe, I'll check mine in, you sign it out.' That is the only acceptable response."
│   │   │
│   │   └── THEN: → Proceed to Section C
│   │
│   └── SECTION C: Custody Chain — "You Signed It Out"
│       │
│       SAY: "The moment you sign something out through Key Cafe, you are financially responsible for it until you personally sign it back in through Key Cafe. Responsibility does not transfer to another person if you hand it to them informally. 'I gave it to someone else' is not a valid defense. The log shows you signed it out. The log is the only thing that matters."
│       │
│       └── THEN: → Proceed to Step 2: Signing
│
├── STEP 2: Employee Signs the Accountability Agreement
│   │
│   ACTION: Present the physical agreement document for the employee's signature
│   ROLE: Lot Manager or designated trainer
│   │
│   ├── Employee signs the agreement:
│   │   │
│   │   ACTION: File the signed agreement; update the employee's record to show agreement is on file
│   │   ROLE: Lot Manager
│   │   CHANNEL: inform Sales Manager (Kevin) or General Manager: "I've completed the accountability agreement with [employee name/role] — it's on file."
│   │   │
│   │   └── THEN: → Proceed to Step 3: Key Cafe Training
│   │
│   └── Employee refuses to sign the agreement:
│       │
│       ACTION: Do not proceed with Key Cafe access or any key/plate issuance
│       ROLE: Lot Manager
│       CHANNEL: direct conversation to Sales Manager (Kevin) or General Manager
│       SAY: "[Employee name/role] has declined to sign the accountability agreement. I cannot issue keys or dealer plates without it. Please advise."
│       │
│       └── TERMINAL OUTCOME B — No Access: Employee cannot take any dealer plate, cannot drive any dealership vehicle, cannot use Key Cafe for sign-out. Employment implications are a management decision outside the scope of this tree.
│
├── STEP 3: Key Cafe Training
│   │
│   ACTION: Walk employee to Key Cafe (located on 3rd floor, by Jorja's desk)
│   ROLE: Lot Manager or designated trainer
│   │
│   ├── TRAINING STEP 3a: Show employee Key Cafe location
│   │   │
│   │   SAY: "This is Key Cafe. This is the only place where keys and plates are signed in and out. You will never do a transaction anywhere else."
│   │   │
│   │   └── THEN: → Proceed to Training Step 3b
│   │
│   ├── TRAINING STEP 3b: Demonstrate sign-out process
│   │   │
│   │   ACTION: Walk employee through signing out a key or plate
│   │   SAY: "To sign out a key or plate: come to Key Cafe, find the item you need, sign it out under your name. The system logs your name and the timestamp. That log is now your responsibility."
│   │   │
│   │   └── THEN: → Proceed to Training Step 3c
│   │
│   ├── TRAINING STEP 3c: Demonstrate sign-in process
│   │   │
│   │   ACTION: Walk employee through signing back in
│   │   SAY: "When you are done with a key or plate, you come back here and sign it back in immediately — not at the end of the day, not when it's convenient. Immediately. Your liability ends when you sign it back in here."
│   │   │
│   │   └── THEN: → Proceed to Training Step 3d
│   │
│   └── TRAINING STEP 3d: Reinforce peer-to-peer prohibition
│       │
│       SAY: "One more time: if anyone asks you to hand off a key or plate directly to them, the answer is no. They go to Key Cafe, you check yours in, they sign out theirs. No exceptions — not for managers, not for anyone."
│       │
│       └── THEN: → Proceed to Step 4: Confirmation
│
└── STEP 4: Onboarding Confirmation
    │
    ├── Q: Has the employee signed the agreement AND completed Key Cafe training?
    │   │
    │   ├── YES — both complete:
    │   │   │
    │   │   ACTION: Record onboarding as complete in team chat
    │   │   ROLE: Lot Manager
    │   │   CHANNEL: team chat (WhatsApp)
    │   │   SAY: "Key Cafe onboarding complete for [employee name/role] — agreement signed, training done."
    │   │   │
    │   │   └── THEN: → Employee may now sign out keys and dealer plates through Key Cafe
    │   │       [TERMINAL OUTCOME A — Access Granted]
    │   │
    │   └── NO — one or both steps incomplete:
    │       │
    │       ACTION: Do not grant access until both steps are complete
    │       ROLE: Lot Manager
    │       │
    │       └── THEN: → Return to the incomplete step; complete it before proceeding
    │           [HOLD — no access until both steps complete]

---

## Terminal Outcomes

- **Outcome A — Access Granted:** Employee has signed the accountability agreement AND completed Key Cafe training. Employee may now sign out keys and dealer plates through Key Cafe. Record is confirmed on file.
- **Outcome B — No Access (Refused to Sign):** Employee has declined to sign the accountability agreement. No key or plate access is granted. No Key Cafe access is granted. Management has been notified to advise on employment implications.
- **Outcome C — No Access (Document Unavailable):** Accountability agreement document cannot be located. Access is withheld pending document retrieval. Sales Manager (Kevin) or General Manager has been alerted to obtain the document.
- **Outcome D — No Access (Agreement Not on File — Existing Employee Caught at Sign-Out):** An existing employee attempted to sign out a key or plate without an accountability agreement on file. Transaction was stopped. Employee directed to complete the agreement before any access is granted.

---

## Notes

**[COMPLETE]** Key Cafe physical location: 3rd floor by Jorja's desk.

**[COMPLETE]** Agreement requirement: No grace period. The accountability agreement must be signed before any access is granted — this rule has no exceptions, not even for managers.

**[COMPLETE]** Financial penalties stated in this tree are confirmed enforced figures:
- Dealer plate lost: $500 (confirmed precedent — one employee paid this)
- GPS key tag lost: $25 to reprogram
- Vehicle keys lost: ~50% of replacement cost (exact amount varies by model)

**[NEEDS_INPUT]** Physical location and custody of the accountability agreement document — who stores it and who administers it was not confirmed in source material. Lot Manager is designated as the role who conducts onboarding, but the specific document storage location and administrative owner is unknown.

**[NEEDS_INPUT]** Whether Key Cafe training is logged formally anywhere (beyond the WhatsApp team chat post). No formal training record system was identified in source material.

**[ASSUMPTION]** "Lot Manager or designated trainer" is the role for onboarding. Source material specifies the Lot Manager role owns lot operations but does not explicitly assign onboarding to that role. This is inferred from operational context.

**[ASSUMPTION]** Employment implications of refusal to sign are a management-level decision. Source material does not specify what happens if an employee refuses. The tree escalates to Sales Manager / General Manager but does not determine outcomes.
