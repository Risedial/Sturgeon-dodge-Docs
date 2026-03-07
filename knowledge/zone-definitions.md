# Zone Definitions
**Status:** [COMPLETE]
**Source:** context-lot-walkthrough.md Sections 5, 1; LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md Sections 7–9

---

## Overview

The Edmonton Office lot is divided into seven physical zones. Three zones have fixed slot counts. One zone is unlimited overflow staging. The remaining three are purpose-specific areas.

**Canonical zone names** — use ONLY these names in all documents:
- **Cage** (front-line display area)
- **East Side Fence Line** (sold row / BND holding)
- **West Side of Building** (recon / BND overflow)
- **Overflow (Temporary)** (unlimited overflow staging)
- **Power Sport / Quad Corner**
- **Auction Area**
- **Staff Parking**

---

## Zone 1: Cage

**Canonical Name:** Cage
**Physical Description:** The main enclosed front-line display area of the lot. The primary customer-facing showroom on wheels — the area customers walk through when being shown inventory.
**Slot Count:** 20 fixed slots (C01 through C20)
**Purpose:** Customer-facing vehicle display. All vehicles here are actively available for sale or are new inventory ready for sale.

### Allowed Vehicles
- NEW vehicles (KM ≤ 1,000) that have completed PDI and full detail
- FLR (Front-Line Ready) vehicles (Airtable status: `AVAILABLE` or `DEMO`) that have completed PDI and full detail

### Prohibited Vehicles
- Division One / non-prime / stockholder vehicles (different insurance, different operation)
- Any vehicle that has NOT completed PDI
- Any vehicle that has NOT been fully detailed
- Any vehicle without a stock-in tag
- Vehicles that are SOLD, BND, RECON, or Auction Bound
- Vehicles parked so close together that doors cannot open

### Required Vehicle Conditions (ALL must be met before placement)
- PDI complete (marked by technician in manufacturer system)
- Fully detailed (no exceptions)
- No stickers anywhere on the vehicle
- No tape anywhere on the vehicle
- Stock-in tag placed in bottom-right corner of windshield
- Facing outward toward customers
- Adequate spacing — doors must be able to fully open for customers and staff to enter/exit

### Capacity Rules
- All 20 stalls must be full at all times
- Maximum of ONE empty stall is permitted, and only if that vehicle was just sold
- Oldest stock (highest days-in-stock) gets priority placement
- Show variety: different colors where possible; mix of cars, trucks, and SUVs representing inventory

### Slot Priority Order (from placement system — used for understanding, not for manual overrides)
Slots are processed in this order: C01 → C02–C03 → C04–C07 → C12–C13 → C08–C11, C14–C20

**C01:** Compass or Wrangler (NEW only); if none available, slot remains empty
**C02–C03:** NEW SUVs (non-Durango); fallback to NEW Van or Truck if no qualifying SUV
**C04–C07:** Remaining NEW vehicles (all body types)
**C12–C13:** Trucks preferred (NEW or FLR); fallback to any remaining NEW or FLR
**C08–C11, C14–C20:** Remainder — all remaining NEW and FLR vehicles

### Brand Priority (for slot competition tiebreaking)
Jeep (1) → Ram (2) → Chrysler (3) → Dodge (4) → all others (5)

### Body Type Priority (within same brand tier)
SUV (1) → Van (2) → Truck (3) → Sedan (4)
Sedans are the first body type to overflow out of the Cage when capacity is reached.

---

## Zone 2: East Side Fence Line

**Canonical Name:** East Side Fence Line
**Physical Description:** The fence line along the right side of the building.
**Slot Count:** 5 fixed slots (F1 through F5)
**Purpose:** Holding area for confirmed sold units, book-not-delivered vehicles, and FLR sedan overflow.

### Allowed Vehicles
- SOLD vehicles (Airtable status: `SIGNED DEAL` or `WHOLESALE | SOLD`) — fill first
- BND vehicles (Airtable status: `BOOKED | NOT DELIVERED`) — fill second
- FLR sedan overflow (sedans that did not fit in the Cage) — fill last

### Prohibited Vehicles
- Vehicles without appropriate status signage (sold sign, trade-in banner, customer sign)
- Division One / non-prime vehicles
- Recon or unprocessed vehicles

### Required Vehicle Conditions
- Every SOLD vehicle must have a sold sign with customer name visible
- Every trade-in must have a trade-in banner
- Every customer vehicle must have a sign: "Customer's car, picking up [date]"
- A vehicle in this zone without any sign = unknown status = creates confusion for all staff

### Fill Order
1. SOLD vehicles (first priority)
2. BND vehicles (second priority)
3. FLR sedan overflow (third priority)

### Overflow Behavior
When all 5 slots are full and additional SOLD or BND vehicles remain, those vehicles route to West Side of Building or to Overflow (Temporary).

---

## Zone 3: West Side of Building

**Canonical Name:** West Side of Building
**Physical Description:** The parking area along the left side of the building.
**Slot Count:** 5 fixed slots (L1 through L5)
**Purpose:** BND overflow, RECON vehicles undergoing preparation work, SOLD overflow.

### Allowed Vehicles
- BND overflow (BND vehicles that did not fit in the East Side Fence Line) — fill first
- RECON vehicles (undergoing reconditioning/mechanical work) — fill second
- SOLD overflow (SOLD vehicles that did not fit in the East Side Fence Line) — fill last

### Prohibited Vehicles
- NEW vehicles — new arrivals go to Cage (after PDI/detail), not to West Side of Building
- FLR vehicles — must go to Cage
- Division One / non-prime vehicles

### Fill Order
1. BND overflow (first priority)
2. RECON vehicles (second priority)
3. SOLD overflow (third priority)

### Status Note
**CRITICAL:** New vehicle arrivals MUST NOT be placed here with a "RECON" status. New arrivals are "Pending PDI," not "RECON." Placing new arrivals in this zone with a RECON status hides them from the sales inventory system.

---

## Zone 4: Overflow (Temporary)

**Canonical Name:** Overflow (Temporary)
**Physical Description:** Unlimited overflow staging physically located at the East Side Fence Line area.
**Slot Count:** Unlimited (labeled LP1, LP2, LP3, etc. in the placement system)
**Purpose:** Temporary staging when all fixed slots in the appropriate zone are full.

### How It Works
- A vehicle in Overflow (Temporary) is labeled with a destination zone annotation (e.g., "Belongs in Cage," "Belongs in Fence line")
- The vehicle physically stays at the East Side Fence Line area until a permanent slot opens in its destination zone
- Once a slot opens, the vehicle must be moved to its correct permanent zone immediately

### Vehicle Status in Placement Map
- Status = `TEMPORARY`
- Notes field shows destination zone (e.g., "→ Cage slot", "→ Fence line", "→ Left side")

### Applicable Vehicle Types
Any vehicle that cannot be placed in its correct zone due to capacity may temporarily be here:
- Cage overflow (NEW and FLR that could not fit)
- Sold/BND overflow (vehicles that could not fit in East Side Fence Line or West Side of Building)
- Recon overflow

---

## Zone 5: Power Sport / Quad Corner

**Canonical Name:** Power Sport / Quad Corner
**Physical Description:** Dead space on the lot where it is physically impossible to park regular vehicles because doors cannot open due to proximity to walls or structures.
**Slot Count:** No vehicles. Should have full access to move powersports vehicles in and out of the parking lot corner. Vehicles in the Cage must be parked with enough space away from the far back right of the Cage for this access. [COMPLETE]
**Purpose:** Seasonal and specialty vehicle storage only.

### Allowed Vehicles
- Power sport deliveries
- Boat deliveries
- Hysen units (seasonal — after snow melts)

### Prohibited Vehicles
- Retail vehicles under any circumstances
- Any vehicle requiring door access for customers or staff to enter

### Seasonal Note
Hysen units and boats are stored here post-snow-melt. Timing is seasonal and determined by weather/business conditions.

---

## Zone 6: Auction Area

**Canonical Name:** Auction Area
**Physical Description:** Designated area at the front of the lot for auction-bound vehicles. Note: this zone may be renamed to "Cage" or "Cage area" in future documentation updates.
**Slot Count:** 19–20 vehicles [COMPLETE]
**Purpose:** Vehicles routed to auction, not available for retail sale.

### Allowed Vehicles
- Auction Bound vehicles only

### Prohibited Vehicles
- Any vehicle available for sale
- Retail inventory
- New or FLR vehicles

### Common Problem
Vehicles routed incorrectly sometimes end up sitting in or in front of the Auction Area. If a vehicle is here and should not be, identify it and move it to the correct zone immediately.

---

## Zone 7: Staff Parking

**Canonical Name:** Staff Parking
**Physical Location:** Street ONLY — not on the lot itself
**Purpose:** All staff personal vehicles park on the street, never on the dealership lot.

### Rules (No Exceptions)
- All staff park on the street at all times
- No exceptions for "just two minutes"
- No exceptions for "big trucks are in the way"
- No exceptions for managers, sales staff, or any other role
- The Owner/GM personally parks on the street and walks when the lot is blocked — this sets the standard for everyone
- Kevin (Sales Manager) and all leadership are held to the same standard

### First Violation Protocol
When a new employee parks on the lot without knowing the rule:
- Approach: welcoming and respectful — not confrontational
- Explanation: "Hey, welcome aboard. All sales have to park on the street — limited space, landlord parking, big trucks coming through."
- Frame as: standard practice, not personal criticism
- This is a one-time education moment; repeat violations escalate differently

---

## Zone Summary Table

| Zone | Canonical Name | Slots | Primary Content | Zone Type |
|---|---|---|---|---|
| 1 | Cage | 20 (C01–C20) | NEW + FLR vehicles | Fixed |
| 2 | East Side Fence Line | 5 (F1–F5) | SOLD + BND + FLR sedan overflow | Fixed |
| 3 | West Side of Building | 5 (L1–L5) | BND overflow + RECON + SOLD overflow | Fixed |
| 4 | Overflow (Temporary) | Unlimited (LP1+) | Any overflow vehicles | Temporary |
| 5 | Power Sport / Quad Corner | No vehicles — access-only zone | Power sport, boats, Hysen (seasonal) | Specialty |
| 6 | Auction Area | 19–20 vehicles | Auction Bound vehicles only | Designated |
| 7 | Staff Parking | N/A | Street only — staff personal vehicles | Off-lot |

---

