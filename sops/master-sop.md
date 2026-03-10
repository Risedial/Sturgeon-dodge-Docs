# Master Standard Operating Procedure
# Sturgeon Dodge — Edmonton Office Lot Operations
**Version:** 1.0
**Date:** 2026-03-09
**Status:** [COMPLETE]
**Audience:** All lot, sales, service, and management staff at the Edmonton Office

---

## Section 1 — Purpose and Scope

### 1.1 Purpose

This Master SOP eliminates decision fatigue for all lot, sales, service, and management staff at the Edmonton Office. Every scenario a staff member will encounter on the lot has a pre-decided path. No employee should ever need to improvise a response to a lot situation — the answer is in this document or in the decision tree it references.

**Operating principle:** "Inspect what you expect." Standards only hold through daily, consistent enforcement. Not through one-time announcements.

### 1.2 Scope

**In scope:** Edmonton Office lot and all vehicles on it — inventory, sold, BND, recon, trade-ins, customer vehicles, and seasonal units.

**Out of scope:** Sturgeon/Legal (AB | STURGEON DODGE) is a separate location. It is referenced in this SOP only as the mandatory destination for non-prime vehicles.

### 1.3 Authority

This SOP is authoritative. Verbal instructions from any individual that contradict this SOP do not override it. Manufacturer requirements (Stellantis) that are stricter than this SOP take precedence over this SOP. Internal convenience does not.

---

## Section 2 — Zone Map and Rules

The Edmonton Office lot has seven zones. Every zone has a defined purpose, defined allowed vehicles, and defined prohibited vehicles. Placing a vehicle in the wrong zone is a compliance failure.

**Canonical zone names — use ONLY these exact names in all communication:**
- Cage
- East Side Fence Line
- West Side of Building
- Overflow (Temporary)
- Power Sport / Quad Corner
- Auction Area
- Staff Parking

---

### 2.1 Cage

**Canonical Name:** Cage
**Slot Count:** 20 fixed slots — C01 through C20
**Purpose:** Primary customer-facing display area. The front-line showroom. This is where customers walk to view available inventory.

**Allowed vehicles:**
- NEW vehicles (KM ≤ 1,000) — ONLY if all front-line conditions below are met
- FLR (Front-Line Ready) vehicles (Airtable status: `AVAILABLE` or `DEMO`) — ONLY if all front-line conditions below are met

**Prohibited vehicles — NEVER place these in the Cage:**
- Any vehicle that has NOT completed PDI (marked in the manufacturer system by the technician)
- Any vehicle that has NOT been fully detailed
- Vehicles with stickers anywhere on the exterior or interior
- Vehicles with tape anywhere
- Vehicles without a stock-in tag (white, bottom-right corner of windshield)
- SOLD vehicles
- BND (Booked Not Delivered) vehicles
- RECON vehicles
- Auction Bound vehicles
- Non-prime / Division One vehicles (STOCK HOLDER = NON PRIME DIVISION)
- Any vehicle where doors cannot fully open for customers and staff

**Required front-line conditions — ALL must be met simultaneously:**

| Condition | Standard |
|---|---|
| PDI complete | Technician has marked PDI complete in the manufacturer system — not verbal, not assumed |
| Fully detailed | Full vehicle detail completed by DHD (external vendor) — not a quick wash |
| No stickers | All manufacturer/transport stickers removed |
| No tape | All tape removed (seals, transport labels, etc.) |
| Stock-in tag | White tag placed in the bottom-right corner of the windshield |
| Facing outward | Vehicle faces toward customers at all times |
| Door spacing | Adequate spacing — doors must fully open for customers and staff to enter and exit |

**Capacity rules:**
- Show variety: different colors where possible; mix of cars, trucks, and SUVs representing current inventory
- Oldest stock (highest days-in-stock) gets priority placement

**Slot priority order — for placement decisions:**

| Slot(s) | Category | Model/Body Type Rules |
|---|---|---|
| C01 | NEW only | Compass or Wrangler only. If none available: slot stays EMPTY — do not fill with another vehicle. |
| C02–C03 | NEW only | SUV preferred (non-Durango). Fallback: NEW Van or Truck if no qualifying SUV. If no fallback: slot stays empty. |
| C04–C07 | NEW only | All body types eligible — remaining NEW vehicles after C01–C03 are filled. |
| C12–C13 | NEW or FLR | Trucks preferred. Fallback: any remaining NEW or FLR vehicle. |
| C08–C11, C14–C20 | NEW or FLR | All remaining NEW and FLR vehicles not assigned to earlier slots. |

**Brand priority (tiebreaker for competing vehicles):**
1. Jeep (highest — placed first)
2. Ram
3. Chrysler
4. Dodge
5. All other makes (lowest)

**Body type priority (secondary tiebreaker within same brand):**
1. SUV (highest)
2. Van
3. Truck
4. Sedan (lowest — sedans overflow out of Cage first when capacity is reached)

**Sedan overflow rule:** Sedans are the first body type displaced from the Cage when all slots are needed for higher-priority inventory. Overflow sedans route to the East Side Fence Line.

---

### 2.2 East Side Fence Line

**Canonical Name:** East Side Fence Line
**Physical Description:** The fence line along the right side of the building.
**Slot Count:** 5 fixed slots — F1 through F5
**Purpose:** Holding area for sold units, BND vehicles, and FLR sedan overflow.

**Allowed vehicles:**
- SOLD vehicles (Airtable status: `SIGNED DEAL` or `WHOLESALE | SOLD`) — fill FIRST
- BND vehicles (Airtable status: `BOOKED | NOT DELIVERED`) — fill SECOND
- FLR sedan overflow (sedans displaced from the Cage) — fill THIRD

**Prohibited vehicles:**
- Vehicles without appropriate status signage (every sold vehicle needs a sold sign; every trade-in needs a trade-in banner; every customer vehicle needs a customer sign)
- Non-prime / Division One vehicles
- RECON or unprocessed vehicles
- NEW vehicles (new arrivals go to Cage after PDI/detail, not here)

**Required signage in this zone:**
- Every SOLD vehicle: sold sign with customer name visible
- Every trade-in: trade-in banner ("TRADE IN")
- Every customer vehicle: "Customer's car, picking up [date]"
- A vehicle in this zone without any sign = unknown status = all staff are blocked from acting

**Fill order (strictly in this sequence):**
1. SOLD vehicles fill slots F1–F5 first
2. BND vehicles fill remaining slots
3. FLR sedan overflow fills any remaining slots

**When full:** Additional SOLD or BND vehicles route to West Side of Building or Overflow (Temporary).

---

### 2.3 West Side of Building

**Canonical Name:** West Side of Building
**Physical Description:** The parking area along the left side of the building.
**Slot Count:** 5 fixed slots — L1 through L5
**Purpose:** BND overflow, RECON vehicles undergoing preparation work, and SOLD overflow.

**Allowed vehicles:**
- BND overflow — vehicles that could not fit in the East Side Fence Line — fill FIRST
- RECON vehicles (Airtable status: `IN RECON`, `INCOMING`, `WHOLESALE`, or `CHASE`) — fill SECOND
- SOLD overflow — vehicles that could not fit in the East Side Fence Line — fill THIRD

**Prohibited vehicles:**
- NEW vehicles — new arrivals go to Cage (after PDI/detail), not here
- FLR vehicles — must go to Cage
- Non-prime / Division One vehicles

**CRITICAL RULE:** New vehicle arrivals MUST NOT be placed here with a "RECON" status. New arrivals are "Pending PDI" — not "RECON." Placing new arrivals here with a RECON status hides them from the sales inventory system. Sales staff cannot see them, cannot sell them, and they generate zero revenue while occupying a slot.

**Fill order (strictly in this sequence):**
1. BND overflow (first priority)
2. RECON vehicles (second priority)
3. SOLD overflow (third priority)

---

### 2.4 Overflow (Temporary)

**Canonical Name:** Overflow (Temporary)
**Physical Location:** East Side Fence Line area
**Slot Count:** Unlimited
**Purpose:** Temporary staging when all fixed slots in the appropriate zone are full.

**How it works:**
- Every vehicle in Overflow (Temporary) must be labeled with a destination zone annotation stating which zone it belongs in (e.g., "Belongs in Cage," "Belongs in East Side Fence Line")
- The vehicle physically stays at the East Side Fence Line area until a permanent slot opens in its destination zone
- **When a slot opens in the vehicle's destination zone: move it immediately** — do not leave it in overflow any longer than necessary

**Which vehicles can be here:** Any vehicle from any zone that cannot be placed in its correct zone due to capacity — Cage overflow, Sold/BND overflow, RECON overflow.

---

### 2.5 Power Sport / Quad Corner

**Canonical Name:** Power Sport / Quad Corner
**Physical Description:** Dead space on the lot where it is physically impossible to park regular vehicles — doors cannot open due to proximity to walls or structures.
**Purpose:** Seasonal and specialty vehicle storage only.

**Allowed vehicles:**
- Power sport deliveries
- Boat deliveries
- Hysen units (seasonal — after snow melts)

**Prohibited vehicles:**
- Retail vehicles under any circumstances
- Any vehicle requiring door access for customers or staff to enter

**Access requirement:** Vehicles in the Cage must be parked with adequate spacing from the far back right of the Cage to ensure access to this corner for moving powersports vehicles in and out.

---

### 2.6 Staff Parking

**Canonical Name:** Staff Parking
**Physical Location:** Street ONLY — not on the lot itself
**Purpose:** All staff personal vehicles park on the street, never on the dealership lot.

**Rules — no exceptions:**
- All staff park on the street at all times
- No exceptions for "just two minutes"
- No exceptions for "big trucks are in the way"
- No exceptions for managers, sales staff, or any other role — including the Sales Manager (Kevin)
- The Owner/General Manager personally parks on the street and walks when the lot is blocked — this sets the standard for everyone

**First violation — new employee:** → SEE: staff-parking-new-employee.md

**Repeat violation:** → SEE: staff-parking-repeat-violation.md

---

### 2.7 Zone Summary

| Zone | Slot Count | Primary Content | Zone Type |
|---|---|---|---|
| Cage | 20 (C01–C20) | NEW + FLR (PDI'd, detailed, tagged) | Fixed |
| East Side Fence Line | 5 (F1–F5) | SOLD + BND + FLR sedan overflow | Fixed |
| West Side of Building | 5 (L1–L5) | BND overflow + RECON + SOLD overflow | Fixed |
| Overflow (Temporary) | Unlimited | Any overflow — labeled with destination | Temporary |
| Power Sport / Quad Corner | Access only | Power sport, boats, Hysen (seasonal) | Specialty |
| Staff Parking | N/A — street only | Staff personal vehicles (off-lot) | Off-lot |

---

## Section 3 — Vehicle Lifecycle

Every vehicle on the Edmonton Office lot is in exactly one state at all times. The correct state determines where the vehicle is parked, what signage it carries, and what action is next.

### 3.1 State Definitions

| State | Definition | Airtable Status | Zone |
|---|---|---|---|
| Ship Mode | Factory transport state — battery disconnected, software in low-power mode. Vehicle cannot be driven normally or delivered. | No specific Airtable label — do NOT enter as RECON | Off-display until cleared |
| Pending PDI | New vehicle arrived, awaiting Pre-Delivery Inspection. In the system but not yet inspected. | `AVAILABLE` (or as explicitly set) — NEVER `IN RECON` | Awaiting service routing |
| PDI In Progress | Being actively inspected by a service technician. | Not tracked separately in Airtable — internal service flow | Service department |
| PDI Complete | Inspection done. Technician has marked complete in the manufacturer system. | Updated in manufacturer system by technician | Ready for detailing |
| Detailing | Vehicle being cleaned/detailed by DHD or quick wash by Hughes. | Service/detailing flow | Off-lot at DHD or Hughes |
| Front-Line Ready (FLR) | Fully PDI'd + fully detailed + no stickers/tape + stock-in tag placed. Ready for display. | `AVAILABLE` or `DEMO` in Airtable | Cage |
| On Display | Vehicle physically in the Cage. Actively available for customer viewing and sale. | `AVAILABLE` or `DEMO` | Cage |
| Sold | Customer has purchased the vehicle. Vehicle is awaiting delivery. | `SIGNED DEAL` or `WHOLESALE \| SOLD` | East Side Fence Line |
| Booked Not Delivered (BND) | Deal is active on paper but the vehicle has not yet been handed over to the buyer. | `BOOKED \| NOT DELIVERED` | East Side Fence Line (or West Side overflow) |
| Trade-In | Vehicle received from a customer as part of a deal. Belongs to the dealership. Destination TBD. | Varies by routing decision | Varies by condition |
| Customer Vehicle | A customer's personal vehicle on the lot for any reason. Does NOT belong to the dealership. | Not an inventory item — must be signed | Designated area; signed |
| Recon | Vehicle undergoing reconditioning or mechanical work before retail sale. | `IN RECON`, `INCOMING`, `WHOLESALE`, or `CHASE` | West Side of Building |
| Dealer Trade Incoming | Vehicle arriving from another dealership. Requires final PDI + full detail before placement. | `AVAILABLE` (applied immediately on arrival) | Awaiting service routing |
| Auction Bound | Vehicle routed to auction rather than retail sale. | Not tracked with a specific Airtable status label | Cage |
| Non-Prime / Division One | Vehicle identified as belonging to the Non-Prime division. Prohibited on this lot. | Airtable `STOCK HOLDER` = `NON PRIME DIVISION` | Must be removed immediately |

### 3.2 State Transition Summary

```
VEHICLE ARRIVES ON LOT
   │
   ├── STOCK HOLDER = "NON PRIME DIVISION"? → Route to AB | STURGEON DODGE immediately [TERMINAL]
   │
   └── STOCK HOLDER = "STURGEON DODGE" → Continue
          │
          ├── Is it in Ship Mode? → [SHIP MODE]
          │     Battery reconnect + software reset → [PENDING PDI]
          │
          ├── Is it a Dealer Trade? → [DEALER TRADE INCOMING]
          │     Route to Service → [PDI IN PROGRESS] → [PDI COMPLETE]
          │                               → [DETAILING] → [FLR] → [CAGE]
          │
          ├── Is it a new vehicle (KM ≤ 1,000)? → [PENDING PDI]
          │     Route to Service → [PDI IN PROGRESS] → [PDI COMPLETE]
          │                              → [DETAILING] → [FLR] → [CAGE]
          │
          ├── Is it a Trade-In? → [TRADE-IN] — Trade-in banner placed immediately
          │     → Needs detail only: DHD → [DETAILING] → [FLR] → [CAGE]
          │     → Needs mechanical work: West Side of Building → [RECON]
          │     → Auction-bound: Auction Area → [AUCTION BOUND]
          │
          └── Is it a customer's personal vehicle? → [CUSTOMER VEHICLE]
                Customer sign placed immediately
                Customer retrieves vehicle → Off lot [TERMINAL]

[ON DISPLAY — CAGE]
   │
   └── Vehicle is SOLD
         Sold sign placed immediately with customer name
         → [SOLD] — Move to East Side Fence Line
               │
               ├── Deal booked, delivery not yet occurred → [BND]
               │     Stays at East Side Fence Line until delivery
               │
               └── Delivery occurs → Customer takes vehicle [TERMINAL — off lot]
```

### 3.3 Critical Rules — Never Violate

**RULE 1: New arrivals are NEVER given "Recon" status.**
A new vehicle that arrives and needs PDI is "Pending PDI" — NOT "RECON." Classifying a new arrival as RECON hides it from the sales inventory system. Sales staff cannot see it, cannot sell it, and it generates zero revenue while occupying a slot.

**RULE 2: Ship mode vehicles must be fully cleared before anything else.**
A vehicle in ship mode must have: (1) battery reconnected AND (2) software reset performed AND (3) PDI completed — BEFORE it can be placed on the front line OR delivered to a customer. No exceptions. → SEE: vehicle-arrival-ship-mode.md

**RULE 3: PDI cannot be skipped for dealer trades.**
Even if the originating dealership says the vehicle is already inspected and ready, the Edmonton Office must perform its own final PDI. This is a Stellantis requirement. → SEE: vehicle-arrival-dealer-trade.md

**RULE 4: Non-prime vehicles leave immediately.**
Any vehicle with Airtable `STOCK HOLDER` = `NON PRIME DIVISION` must be routed to AB | STURGEON DODGE immediately. No exceptions. → SEE: vehicle-non-prime-identification.md

---

## Section 4 — Lot Placement Rules

### 4.1 Step 1 — Non-Prime Check (Before Any Placement Decision)

**Before any other placement decision: verify the vehicle is allowed on this lot.**

| Airtable STOCK HOLDER Value | Action |
|---|---|
| `STURGEON DODGE` | Vehicle belongs to Edmonton Office — proceed with placement rules below |
| `NON PRIME DIVISION` | Route immediately to AB \| STURGEON DODGE — DO NOT place on this lot — DO NOT delay |

Non-prime vehicles are completely prohibited on the Edmonton Office lot. They operate under different insurance and a different business structure. There are no exceptions.

→ SEE: vehicle-non-prime-identification.md

### 4.2 Step 2 — Vehicle Categorization

Every vehicle belongs to exactly one placement category. The category determines which zone it belongs in.

| Category | Criteria | Airtable Status Values |
|---|---|---|
| **NEW** | KM ≤ 1,000 | Any status — KM reading takes priority for initial categorization |
| **FLR** | Frontline Ready — available for sale, fully prepared | `AVAILABLE` or `DEMO` |
| **SOLD** | Deal complete or wholesale sold | `SIGNED DEAL` or `WHOLESALE \| SOLD` |
| **BND** | Booked, not yet delivered | `BOOKED \| NOT DELIVERED` |
| **RECON** | In reconditioning or preparation work | `IN RECON`, `INCOMING`, `WHOLESALE`, or `CHASE` |

**Category override rules:** A vehicle initially classified as NEW may be reclassified based on its Airtable status:

| Initial Category | Airtable Status | Override Category | Zone |
|---|---|---|---|
| NEW | `BOOKED \| NOT DELIVERED` | BND | East Side Fence Line |
| NEW | `SIGNED DEAL` | SOLD | East Side Fence Line |
| NEW | `IN RECON` | RECON | West Side of Building |
| NEW | `VOID \| IN STOCK` | FLR | Cage |

**Example:** A 2026 Jeep Wrangler, KM=500, status `BOOKED | NOT DELIVERED` → initially NEW (KM rule) → override to BND (status rule) → routes to East Side Fence Line, NOT the Cage.

→ SEE: vehicle-categorization.md

### 4.3 Step 3 — Zone Assignment

| Category | Primary Zone | Overflow Zone |
|---|---|---|
| NEW (front-line conditions met) | Cage | Overflow (Temporary) labeled "→ Cage" |
| FLR (front-line conditions met) | Cage | East Side Fence Line (sedan overflow only) |
| SOLD | East Side Fence Line | West Side of Building → Overflow (Temporary) |
| BND | East Side Fence Line | West Side of Building → Overflow (Temporary) |
| RECON | West Side of Building | Overflow (Temporary) labeled "→ West Side" |

**East Side Fence Line fill order (strictly in this sequence):**
1. SOLD vehicles (F1–F5 first)
2. BND vehicles (remaining slots)
3. FLR sedan overflow (any remaining slots)

**West Side of Building fill order (strictly in this sequence):**
1. BND overflow (L1–L5 first)
2. RECON vehicles (remaining slots)
3. SOLD overflow (any remaining slots)

### 4.4 Step 4 — Cage Slot-Level Priority

For vehicles competing for Cage slots, apply priority in this order:

1. **Brand priority (primary sort):** Jeep (1) → Ram (2) → Chrysler (3) → Dodge (4) → All others (5)
2. **Body type priority (secondary sort within same brand):** SUV (1) → Van (2) → Truck (3) → Sedan (4)
3. **Year (tertiary sort):** Newer model year gets higher-priority slot
4. **Days-in-stock (final tiebreaker):** Oldest stock (highest days-in-stock) gets priority placement

→ SEE: vehicle-placement-cage.md

---

## Section 5 — Signage Standards

**Core principle:** Any person walking the lot must be able to instantly identify the status of every vehicle without asking anyone. Signage makes this possible. A vehicle without correct signage creates operational paralysis.

### 5.1 Stock-In Tags

**What:** A white identification tag confirming the vehicle has been received, processed, and entered into inventory.

**Who creates:** Admin — Stock Tags (Jorja) and Admin/Tech — Stock Tags. Both fill out tags and hand completed tags to the lot team.

**Who places:** Lot team. Immediately after receiving the tag from Jorja.

**Placement:** Bottom-right corner of the windshield — always, on every vehicle, no exceptions.

**Color:** White. Do NOT use yellow.

**Tag content:** Year (model year), Make (manufacturer), Model (model name).

**Rule:** Every vehicle on the Edmonton Office lot must have a stock-in tag at all times.
- No tag = vehicle has not been formally processed
- No tag = vehicle should not be in any active zone
- Vehicle found without a tag during morning lot walk: flag it immediately and route for tagging before any other action

### 5.2 Sold Signs

**What:** A sign identifying a vehicle that has been sold. Allows anyone on the lot to immediately recognize a sold vehicle and avoid moving it, re-selling it, or confusing its status.

**When placed:** **IMMEDIATELY when a vehicle is sold.** Not at end of day. Not when paperwork is finalized. Not when the customer picks it up. The moment a sale is completed, the sold sign goes in the vehicle.

**Who places:** The salesperson who completed the deal. If requested via team chat: lot team places it.

**Content:** Customer name written on the sign with a Sharpie. Sign is placed visibly inside the vehicle.

**Supplies:** Upstairs (in the dealership building). Sharpies are kept with the sold signs.

**Enforcement when missing:** → SEE: sold-sign-missing-enforcement.md (3-strike escalation protocol)

### 5.3 Trade-In Banners

**What:** A banner ("TRADE IN") placed on a trade-in vehicle immediately upon receipt. Distinguishes the trade-in from inventory, sold vehicles, and customer vehicles.

**When placed:** Immediately when a trade-in is received from a customer.

**Who places:** Lot team.

**Supplies:** Upstairs (same location as sold sign supplies).

### 5.4 Customer Vehicle Signs

**What:** A sign identifying a customer's personal vehicle on the lot for any reason (service waiting, pickup, etc.). This vehicle does NOT belong to the dealership.

**Content:** "Customer's car, picking up [date]" — include the expected pickup date.

**When placed:** Immediately when a customer's personal vehicle arrives on the lot.

**Who places:** Lot team.

### 5.5 The Kia Incident — The Canonical Example of What Happens Without Signage

> **CONFIRMED REAL INCIDENT — This happened at the Edmonton Office lot.**

A Kia sat on the Edmonton Office lot for **6 weeks** with no identification signage of any kind. During those 6 weeks: no staff member could determine whether the Kia was an inventory vehicle, a sold vehicle, a trade-in, or a customer's personal car. No one moved it, processed it, or made any decision about it. The vehicle sat completely idle. No revenue was generated. No action was taken because no one knew what action was appropriate.

**This is the result of missing signage on a single vehicle: 6 weeks of total paralysis.**

The absence of a single tag or sign resulted in 6 weeks of immobilization for that vehicle. Every vehicle without a sign creates the same risk.

### 5.6 Signage Summary Table

| Sign Type | Applies To | When Applied | Who Creates | Who Places | Content | Placement |
|---|---|---|---|---|---|---|
| Stock-In Tag | All vehicles | On arrival (immediately) | Admin (Jorja/Giselle) | Lot team | Year, Make, Model | Bottom-right corner of windshield |
| Sold Sign | Sold / SIGNED DEAL vehicles | Immediately when sold | N/A — blank sign filled by salesperson | Salesperson (or lot team on request) | Customer name (Sharpie) | Inside vehicle, visibly placed |
| Trade-In Banner | Trade-in vehicles | Immediately when received | Pre-printed ("TRADE IN") | Lot team | "TRADE IN" | On vehicle exterior |
| Customer Vehicle Sign | Customer's personal car | Immediately when arrives | Handwritten | Lot team | "Customer's car, picking up [date]" | On or in vehicle, visibly placed |

---

## Section 6 — Key Cafe Protocol

**This section must not be shortened. All rules here are non-negotiable.**

### 6.1 Key Cafe — The Only System of Record

**Key Cafe is the single source of truth for all keys.** Every key set and every dealer plate must flow through Key Cafe for every transaction — no exceptions, no shortcuts.

**Physical location:** 3rd floor by Jorja's desk.

At any moment, Key Cafe must accurately reflect: which keys are currently signed out, who signed them out, and when they were signed out. If the location of a key or plate cannot be determined from Key Cafe, that is a compliance failure requiring immediate investigation.

### 6.2 Accountability Agreement — Required Before Any Access

Every employee must sign the Accountability Agreement before they can access any key or dealer plate.

**An employee who has NOT signed the Accountability Agreement:**
- Cannot take any dealer plate
- Cannot drive any dealership vehicle
- Cannot access Key Cafe for sign-out
- Cannot continue employment at the dealership without signing

**There is no grace period.** The agreement must be signed before any access is granted — on Day 1, before any key or plate is touched. → SEE: accountability-agreement-onboarding.md

### 6.3 Sign-Out Process

1. Employee goes to Key Cafe (3rd floor by Jorja's desk)
2. Employee signs out the key or plate under their name
3. Transaction is logged in the system
4. Employee takes the item

**No exceptions:**
- No sign-outs without a logged entry
- No one takes a key or plate and "settles up later"
- No informal borrowing

### 6.4 Sign-In Process

Keys and dealer plates must be signed back in through Key Cafe **immediately** when the employee is done with them — not at the end of the day, not when convenient. Immediately.

1. Employee returns to Key Cafe with the key or plate
2. Employee signs the item back in
3. Transaction is logged: employee name + timestamp

→ SEE: key-plate-sign-out.md
→ SEE: key-plate-sign-in.md

### 6.5 No Peer-to-Peer Transfers — Absolute Rule

**No employee may pass a key or dealer plate directly to another employee — under any circumstances, for any reason.**

If another employee asks you for a plate or key you currently have signed out, the response is always:

> **"No — go back to Key Cafe, I'll check mine in, you sign it out."**

This is the exact language. There are no alternative acceptable responses.

**Why this rule exists:** If an employee passes a plate to another employee without going through Key Cafe:
- The Key Cafe record still shows the first employee as responsible
- If the plate is lost, the first employee owns the $500 penalty — even though they no longer have the plate
- There is no way to assign accountability to the correct person
- The custody chain is permanently broken

Peer-to-peer transfers destroy accountability. They are prohibited under all circumstances.

### 6.6 Key Cafe Key Tags

Every set of keys at the Edmonton Office has a tag attached.

**Rules:**
- Key Cafe key tags must remain attached to the key set at all times
- Tags must not be removed, damaged, or lost
- If a tag is separated from the key set: report it immediately

**Cost if lost:** $25 — charged to the responsible employee (enforced).

### 6.7 Enforcement Logic

| Scenario | Outcome |
|---|---|
| Employee signed a plate out | That employee owns liability until it is signed back in through Key Cafe |
| Employee says "I gave it to someone else" | Not a valid defense — the last signer still owns liability |
| Employee says "I don't know where it is" | Penalty applies to the last signer |
| Plate is found after penalty is paid | Penalty is not reversed |

**"You signed it out" is the complete and final determination of liability.** The Key Cafe log is the only evidence that matters.

**Equivalence principle:** Dealer plates and keys are the equivalent of carrying $500 cash. Treat them with the same level of care and accountability.

### 6.8 Key Cafe Protocol Summary

| Situation | Correct Action |
|---|---|
| Need a key or plate | Go to Key Cafe. Sign it out under your name. |
| Done with a key or plate | Return to Key Cafe. Sign it back in immediately. |
| Another employee asks for your plate | Say: "No — go back to Key Cafe, I'll check mine in, you sign it out." |
| Key or plate is missing | Report immediately. Last signer is accountable. |
| GPS tag is missing from a key set | Report immediately. $25 penalty if lost. |
| New employee needs key/plate access | Accountability Agreement signed first. No exceptions. |

→ SEE: key-plate-lost-response.md

---

## Section 7 — PDI Compliance

### 7.1 The Stellantis 2-Day Requirement

**Every vehicle delivered to the Edmonton Office must have its final PDI completed within 2 calendar days of delivery.**

| Parameter | Value |
|---|---|
| Requirement type | Stellantis (manufacturer) mandate |
| Deadline | 2 calendar days from vehicle delivery to dealership |
| Applies to | All new vehicles arriving at the dealership |
| Applies to | All dealer trades arriving at the dealership |
| Tracked by | Technician entries in the manufacturer system |
| Responsibility | Service technician performs PDI; technician marks complete in manufacturer system |

### 7.2 Current Compliance Status

**Current rate: 80% — ENTERING THE RED ZONE.**

At 80% compliance, the Edmonton Office is at or near the threshold where Stellantis begins applying financial penalties (fines and docking). This is not a future risk — it is the current state. Every PDI missed pushes the rate lower. Recovery requires completing every PDI within the 2-day window without exception.

### 7.3 What "PDI Complete" Means

PDI is complete **only when:**
1. A service technician has physically performed the Pre-Delivery Inspection
2. The technician has marked the PDI complete in the **manufacturer system**

**A vehicle is NOT PDI complete if:**
- The PDI was done at the factory (that is the initial PDI — the final PDI at the dealership is still required)
- Someone "checked it over" informally without marking it in the system
- The salesperson says it is "good to go"
- Verbal confirmation was given to the lot manager

The manufacturer system entry by the technician is the only valid evidence of PDI completion.

### 7.4 Who Performs PDI

- Performed by: service technician (Technician role within the service department)
- Marked complete by: the same technician, in the manufacturer system
- Assigned by: Service Department Lead

### 7.5 Ship Mode — Must Be Cleared Before PDI

If a vehicle arrives in ship mode, the following steps must be completed **in sequence** before PDI begins:

1. **Battery reconnection** — physical reconnection of the battery
2. **Software reset** — manufacturer-specified software reset procedure
3. **PDI** — only after steps 1 and 2 are complete

The 2-day PDI window begins at vehicle delivery — ship mode does not extend the deadline. Complete ship mode clearance and PDI within the same 2-day window.

→ SEE: vehicle-arrival-ship-mode.md

**The ship mode delivery failure (confirmed incident):** A vehicle was delivered to a customer while still in ship mode. The battery was disconnected. The car died the next day. The vehicle had to be towed back to the dealership.

### 7.6 Dealer Trade PDI

The same 2-day window applies to dealer trades. Even if the originating dealership certifies the vehicle as ready, the Edmonton Office must perform its own final PDI within 2 days of the vehicle arriving on this lot.

→ SEE: vehicle-arrival-dealer-trade.md

### 7.7 Pushback Language for Salesperson Override Attempts

Sales staff may pressure lot staff to skip PDI or rush delivery before PDI is complete. This pressure must be resisted every time.

**If a salesperson says "it's good to go" or "don't worry about it" — respond with exactly:**
> "Stellantis requires final PDI within 2 days. We're at 80% compliance, in the red zone. It needs to go through."

**If delivery is imminent (customer is waiting):** Expedite through PDI — go to the service department immediately and request priority processing. The customer waits. The PDI happens first. Do NOT skip the PDI.

→ SEE: vehicle-pdi-routing.md
→ SEE: vehicle-pdi-compliance-deadline.md

### 7.8 PDI Failure Routing

If PDI reveals mechanical issues: the vehicle does NOT return to the Cage. Update Airtable status to IN RECON. Move vehicle to West Side of Building. Assign a recon work order. Notify lot team.

→ SEE: vehicle-recon-routing.md

---

## Section 8 — Daily Operations Overview

### 8.1 Morning Lot Walk

**The morning lot walk is mandatory.** It does not get skipped because the day is busy.

**Who conducts it:** Lot Manager / Operations Manager (or designee).

**Timing:**
1. Arrive at work
2. Handle immediate fires (urgent issues that cannot wait)
3. Begin lot walk approximately 30 minutes after arriving
4. Duration: approximately 30 minutes

**Zone walk order:**
1. Cage (all 20 slots)
2. East Side Fence Line (all 5 slots + any Overflow vehicles)
3. West Side of Building (all 5 slots)
4. Overflow (Temporary) area
5. Power Sport / Quad Corner
6. Staff Parking (confirm no staff vehicles are on the lot)

**Per-vehicle checks (apply to every vehicle in every zone):**

| Check | Standard | Action if Failing |
|---|---|---|
| Correct zone for vehicle status | Category matches zone | Flag for repositioning — route to correct zone immediately |
| Signage present and correct | Stock-in tag, sold sign, trade-in banner, or customer sign as appropriate | Request correct sign placement immediately |
| Clean and detailed | No dirt, grime, or visible detailing defects | Route to DHD for full detail |
| Positioning correct | Facing outward; adequate door-opening spacing | Reposition vehicle |
| Stock-in tag present | White tag in bottom-right corner of windshield | Flag — route for tagging |
| No unauthorized personal vehicles | All vehicles are accounted for | Identify via staff vehicle inventory list; address with owner |
| No compliance gaps | PDI complete if on front line; ship mode cleared if new arrival | Flag and route to service for immediate PDI |

**Output:** Task list. Every issue discovered becomes a task. All tasks documented in WhatsApp group.

→ SEE: morning-lot-walk.md

### 8.2 Task Routing from Morning Lot Walk

| Issue Identified | Route to | Action |
|---|---|---|
| PDI needed | Service Department Lead | Request priority processing — provide VIN, stock number, PDI deadline |
| Detailing needed (full) | DHD (external vendor) | Route vehicle for full detail ($60/vehicle) |
| Quick wash needed | Hughes (external vendor) | Route vehicle for quick wash |
| Sold sign missing | Sales Manager (Kevin) | 3-strike escalation — → SEE: sold-sign-missing-enforcement.md |
| Vehicle in wrong zone | Lot team | Move vehicle to correct zone immediately |
| Vehicle without stock-in tag | Admin — Stock Tags (Jorja) / Admin/Tech (Giselle) | Route vehicle for tagging |
| Staff vehicle on lot | Lot Manager / Management | Address with employee — → SEE: staff-parking-repeat-violation.md |
| PDI deadline at risk | Service Department Lead | Alert with vehicle info and deadline date |
| Unknown vehicle | Lot Manager | → SEE: vehicle-status-unknown.md |

### 8.3 Staff Vehicle Inventory

Management must maintain a complete list of all staff personal vehicles:
- Employee name
- Vehicle make
- Vehicle model
- Plate number

**Purpose:** The lot team must be able to identify every vehicle on the lot at a glance. Without this list, it is impossible to distinguish inventory from a staff member's personal car parked illegally on the lot.

**Maintenance:** Update whenever a staff member joins, changes vehicles, or leaves the dealership. Review at least monthly.

### 8.4 Ongoing Lot Policing — Throughout the Day

The morning lot walk is not the only time standards are enforced. Standards require daily, consistent policing throughout the day.

| Situation | Action |
|---|---|
| Staff vehicle parked on lot | Address immediately — → SEE: staff-parking-repeat-violation.md |
| Vehicle moved without authorization | Investigate who moved it; correct the placement |
| New arrival not processed | Check STOCK HOLDER in Airtable immediately; route through correct arrival process |
| Sold vehicle without sign | 3-strike escalation — → SEE: sold-sign-missing-enforcement.md |
| Vehicle without stock-in tag | Flag and route for tagging |
| Cage slot opened | Check inventory — is there a vehicle ready to fill that slot? |

### 8.5 End-of-Day Review

Lot Manager / Operations Manager conducts a walk around all zones at end of day. Photos of the lot are sent to the WhatsApp group to document the day's final state.

### 8.6 Service Department Routing — Throughout the Day

Every vehicle that needs work must be routed to the service department. This is both a compliance requirement (PDI within 2 days) and a financial requirement.

**What to route to service:**
- New arrivals requiring PDI
- Dealer trades requiring final PDI
- Vehicles requiring mechanical inspection before retail sale
- Any vehicle flagged during the morning lot walk as needing mechanical attention

**How to route:** Lot Manager communicates to Service Department Lead via direct communication + WhatsApp group documentation. Provide: vehicle stock number, VIN, work needed, deadline (PDI: 2 days from arrival date).

---

## Section 9 — Escalation Protocol

### 9.1 3-Strike Sold Sign Escalation

When a vehicle is identified as sold but does not have a sold sign with the customer name, the Lot Manager escalates using this exact protocol directed at the Sales Manager (Kevin/Jesse).

**Strike 1 — Polite, helpful request**
- Initiated when: sold sign is missing and a reasonable amount of time has passed
- Channel: Direct conversation (in-person or phone) or WhatsApp group
- Language: **"Hey, Kevin, do you mind getting your guys to put a sold sign in there?"**
- Expected response: Sales team places the sign.

**Strike 2 — Reminder with slightly more emphasis**
- Initiated when: reasonable time has passed since Strike 1 with no action
- Channel: Direct conversation or WhatsApp group
- Language: **"Hey, Kevin, do you mind?"**
- *(Same request; tone conveys this is a second ask, not a first)*
- Expected response: Sales team places the sign.

**Strike 3 — Direct accountability conversation**
- Initiated when: Strike 2 produced no result; the missing sign is now a persistent issue
- Channel: Direct, in-person conversation preferred
- Language: **"Kev, killing me, buddy. Can you just tell me the stuff and I'll do it, because we have to be organized."**
- Expected result: Self-correction. Sales Manager takes personal ownership.
- Confirmed response pattern: "No, no, buddy, I'm coming down myself. I'll do it myself."

**After Strike 3 with no result:** Escalate to General Manager for direct intervention. [NEEDS_INPUT: formal escalation action and consequence after Strike 3 fails is not specified in source material]

→ SEE: sold-sign-missing-enforcement.md

### 9.2 Escalation Targets by Role

| Situation | First Escalation | Second Escalation | Final Escalation |
|---|---|---|---|
| Missing sold sign | Sales Manager (Kevin) via 3-strike | General Manager | — |
| PDI approaching Day 1 without completion | Service Department Lead (immediate) | — | — |
| PDI passing Day 2 without completion | Service Department Lead (immediate) | General Manager (immediate) | — |
| Staff parking violation (new employee) | Lot Manager explains rule | — | — |
| Staff parking violation (repeat) | Lot Manager → Sales Manager / General Manager | General Manager | — |
| Non-prime vehicle on lot | General Manager (notify immediately) | — | — |
| Unknown vehicle status | Lot Manager investigates | Sales Manager or General Manager | — |

### 9.3 Before Moving Any Vehicle — Pre-Move Check

Before any vehicle is moved for any reason, the lot team must verify its status.

1. Identify the assigned salesperson for the vehicle
2. Ask: **"Whose is this? What's the status? When is delivery?"**

- **Delivery is imminent:** Expedite through PDI and detail. Contact service department immediately with stock number, VIN, and delivery date. Request priority processing. PDI still happens. Customer waits.
- **Salesperson says "good to go" or attempts to skip PDI:** Respond: **"Stellantis requires final PDI within 2 days. We're at 80% compliance, in the red zone. It needs to go through."**
- **Salesperson confirms vehicle is not ready:** Process normally through PDI → detail → placement.

### 9.4 Documentation Standard

All compliance issues, escalations, and task assignments must be documented in the WhatsApp group. Direct (in-person) conversations about compliance must be followed up with a WhatsApp message summarizing what was communicated and what action was agreed upon.

**Why:** If an issue recurs after being communicated, the documentation proves it was raised and allows management to hold the appropriate party accountable.

---

## Section 10 — Financial Penalties

All penalties below are enforced — not theoretical. Where a confirmed precedent exists (a real incident where a real employee paid the penalty), it is noted.

| Item | Penalty Amount | Who Pays | Enforcement Status | Notes |
|---|---|---|---|---|
| Dealer plate (lost) | $500 | Employee who last signed it out through Key Cafe | **ENFORCED — CONFIRMED PRECEDENT** | An employee paid this penalty in full. It was not forgiven. |
| GPS key tag (lost or not returned) | $25 | Employee who lost or failed to return it | **ENFORCED** | Cost of reprogramming the GPS tag. |
| Vehicle keys (lost) | ~50% of replacement cost | Employee who lost them | **ENFORCED** | Exact amount varies by vehicle model. |
| Skipped detail (rework cost) | $275 | Not confirmed — who bears this cost is not confirmed | **CONFIRMED COST** | Confirmed incident: vehicle delivered without detail; rework required. |
| Tow-back (ship mode delivery failure) | Tow cost — exact amount not specified | Not confirmed | **CONFIRMED COST** | Confirmed incident: vehicle delivered in ship mode, died next day, tow required. |
| Battery downtime (ship mode too long) | 2 days of vehicle downtime | Operational loss — no direct charge specified | **OPERATIONAL RISK** | If a vehicle sits in ship mode too long without battery reconnection, battery takes ~2 days to fully recharge. Delays PDI and placement. |
| Stellantis non-compliance fines | Not specified [NEEDS_INPUT] | Dealership | **ENFORCED BY MANUFACTURER** | Currently at 80% compliance — in the red zone. Exact fine amounts not available. |
| Stellantis docking | Not specified [NEEDS_INPUT] | Dealership | **ENFORCED BY MANUFACTURER** | Mechanism and amounts not specified in source material. |

**Enforcement principle:** "You signed it out" is the complete and final determination of liability for key/plate items. The Key Cafe log is the only evidence that matters. No alternative defense is accepted.

---

## Section 11 — Cross-Reference Index

This section is the navigation index for the complete decision tree library. All 25 decision trees are listed. When a scenario in this SOP or in operations references a decision tree, find the applicable tree below and follow it.

### Vehicle Lifecycle — Arrival (Trees 1–3)

| # | Filename | Scenario |
|---|---|---|
| 1 | `vehicle-arrival-new-standard.md` | New Vehicle Arrival — Standard (Not Ship Mode) |
| 2 | `vehicle-arrival-ship-mode.md` | New Vehicle Arrival — Ship Mode |
| 3 | `vehicle-arrival-dealer-trade.md` | Vehicle Arrival — Dealer Trade |

### Vehicle Lifecycle — PDI and Detailing (Trees 4–6)

| # | Filename | Scenario |
|---|---|---|
| 4 | `vehicle-pdi-routing.md` | Vehicle PDI Routing |
| 5 | `vehicle-pdi-compliance-deadline.md` | Vehicle PDI Compliance Deadline Monitoring |
| 6 | `vehicle-detailing-routing.md` | Vehicle Detailing Routing |

### Vehicle Lifecycle — Categorization and Placement (Trees 7–8)

| # | Filename | Scenario |
|---|---|---|
| 7 | `vehicle-categorization.md` | Vehicle Categorization |
| 8 | `vehicle-placement-cage.md` | Vehicle Placement — Cage |

### Vehicle Lifecycle — Sales and Delivery (Trees 9–12)

| # | Filename | Scenario |
|---|---|---|
| 9 | `vehicle-sold-processing.md` | Vehicle Sold Processing |
| 10 | `vehicle-trade-in-processing.md` | Vehicle Trade-In Processing |
| 11 | `vehicle-customer-on-lot.md` | Customer Vehicle On Lot |
| 12 | `vehicle-bnd-handling.md` | BND (Booked Not Delivered) Vehicle Handling |

### Vehicle Lifecycle — Recon and Special Status (Trees 13–17)

| # | Filename | Scenario |
|---|---|---|
| 13 | `vehicle-recon-routing.md` | Vehicle Recon Routing |
| 14 | `vehicle-auction-routing.md` | Vehicle Auction Routing |
| 15 | `vehicle-non-prime-identification.md` | Vehicle Non-Prime Identification |
| 16 | `vehicle-seasonal-power-sport.md` | Seasonal / Power Sport Vehicle Placement |
| 17 | `vehicle-status-unknown.md` | Vehicle Status Unknown |

### Key and Dealer Plate Management (Trees 18–20)

| # | Filename | Scenario |
|---|---|---|
| 18 | `key-plate-sign-out.md` | Key or Dealer Plate — Sign-Out |
| 19 | `key-plate-sign-in.md` | Key or Dealer Plate — Sign-In (Return) |
| 20 | `key-plate-lost-response.md` | Key, GPS Key Tag, or Dealer Plate — Lost Item Response |

### Personnel and Compliance (Trees 21–25)

| # | Filename | Scenario |
|---|---|---|
| 21 | `staff-parking-new-employee.md` | Staff Parking — New Employee Violation |
| 22 | `staff-parking-repeat-violation.md` | Staff Parking — Repeat Violation |
| 23 | `sold-sign-missing-enforcement.md` | Sold Sign Missing — Enforcement |
| 24 | `morning-lot-walk.md` | Morning Lot Walk |
| 25 | `accountability-agreement-onboarding.md` | Accountability Agreement Onboarding |

---

*End of Master Standard Operating Procedure — Edmonton Office Lot Operations*
*All decision trees referenced above are located in: `systems-analysis/decision-trees/`*
