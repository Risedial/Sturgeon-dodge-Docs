# Decision Tree: Customer Vehicle On Lot
**File:** vehicle-customer-on-lot.md
**Status:** [COMPLETE]
**Cross-references:** vehicle-status-unknown.md

---

## Trigger
A customer's personal vehicle arrives on or is found on the Edmonton Office lot for any reason (waiting during service, dropping off for work, picking up later). This vehicle is NOT dealership inventory.

## Responsible Role
Lot Attendant or Lot Manager

---

## Decision Tree

START
│
├── Q: Has a customer's personal vehicle arrived on the lot or been identified on the lot?
│   │
│   └── YES:
│       │
│       ├── ACTION: Place customer vehicle sign on the vehicle immediately — before any other step.
│       │   ROLE: Lot Attendant (or Lot Manager if attendant unavailable)
│       │   Content: "Customer's car, picking up [date]" — write the expected pickup date on the sign
│       │   Location: Sign placed visibly on or in the vehicle so it is readable from outside
│       │
│       └── THEN: → Determine parking location
│
├── Q: Is there an available slot in the East Side Fence Line (F1–F5)?
│   │
│   ├── YES:
│   │   │
│   │   ├── ACTION: Park the customer's vehicle in an available East Side Fence Line slot.
│   │   │   ROLE: Lot Attendant
│   │   │
│   │   └── THEN: → OUTCOME A (vehicle signed and parked in East Side Fence Line)
│   │
│   └── NO (East Side Fence Line is full):
│       │
│       ├── ACTION: Park the customer's vehicle in the Overflow (Temporary) area at the East Side Fence Line.
│       │   ROLE: Lot Attendant
│       │   Note: Annotate the vehicle's location in team chat so all staff are aware.
│       │   CHANNEL: WhatsApp group
│       │   SAY: "Customer vehicle on lot — [make/model/plate if known], picking up [date]. Parked in Overflow at East Side Fence Line."
│       │
│       └── THEN: → OUTCOME B (vehicle signed and parked in Overflow)

---

## Morning Lot Walk — Customer Vehicle Check

During every morning lot walk, the Lot Manager or Lot Attendant checks for unsigned vehicles:

START — Morning Lot Walk
│
├── Q: Is there a vehicle on the lot with no identification sign that may be a customer's vehicle?
│   │
│   ├── YES — a vehicle without a sign is found, and the owner/status is unknown:
│   │   │
│   │   └── → SEE: vehicle-status-unknown.md
│   │       (Do not guess the vehicle's status. Do not move it. Escalate via the unknown-vehicle tree.)
│   │
│   ├── YES — a vehicle with a customer sign is found but the sign has no pickup date:
│   │   │
│   │   ├── ACTION: Contact the salesperson or service department associated with that customer to confirm the pickup date.
│   │   │   ROLE: Lot Manager
│   │   │   CHANNEL: WhatsApp group or direct contact (in person/phone)
│   │   │   SAY: "There is a customer vehicle on the lot — [description]. The sign is missing a pickup date. Please confirm when the customer is picking up."
│   │   │
│   │   └── THEN: Update the sign with the confirmed date immediately. → OUTCOME C
│   │
│   └── NO — all customer vehicles are signed with a pickup date:
│       │
│       └── THEN: → OUTCOME D (no action needed; continue lot walk)

---

## Terminal Outcomes

- **Outcome A:** Customer vehicle signed with exact text "Customer's car, picking up [date]" and parked in an East Side Fence Line slot. No further action until customer retrieves vehicle.
- **Outcome B:** Customer vehicle signed with exact text "Customer's car, picking up [date]" and parked in Overflow (Temporary) at East Side Fence Line. Team notified via WhatsApp. No further action until customer retrieves vehicle.
- **Outcome C:** Customer vehicle sign updated with confirmed pickup date during morning lot walk. Vehicle status confirmed and no further action needed.
- **Outcome D:** Morning lot walk confirms all customer vehicles properly signed. No action required.
- **Unknown vehicle escalation:** → SEE: vehicle-status-unknown.md

---

## Notes

- The Kia Incident is the canonical example of why signs are mandatory: a vehicle with no identification sat on the lot for 6 weeks completely idle, with no one able to determine its status or take any action. [COMPLETE — sourced from signage-and-tagging-standards.md]
- Customer vehicles are NOT inventory. They must never be moved, detailed, or processed as dealership property.
- [NEEDS_INPUT] If the East Side Fence Line is full AND no Overflow space exists, the designated parking area for customer vehicles is not specified in source material. Resolution: park in the nearest safe, accessible area and document in team chat.
- [ASSUMPTION] The Lot Attendant is the default responsible role for placing the sign when a customer vehicle arrives. If no Lot Attendant is present, the Lot Manager assumes this responsibility.
