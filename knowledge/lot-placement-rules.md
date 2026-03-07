# Lot Placement Rules
**Status:** [COMPLETE]
**Source:** context-lot-walkthrough.md Sections 4–5; LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md Sections 3–12

---

## Overview

This file defines every rule governing which vehicle goes where on the Edmonton Office lot. Rules apply to physical vehicle placement by lot attendants during the daily morning lot walk and when new vehicles arrive.

**Important:** The placement rules below reflect the business logic of the lot, extracted from both the walkthrough and the automated placement engine specification. The placement engine (automated system) uses these same rules in its algorithm. This file is the human-readable version — no automation or system details are included.

---

## Step 1: Non-Prime Identification — Check Before Any Placement

**Before any other placement decision, verify the vehicle is allowed on this lot.**

| Action | Check | Result |
|---|---|---|
| Open Airtable | Look up vehicle record | Find the `STOCK HOLDER` field |
| `STOCK HOLDER` = `STURGEON DODGE` | Vehicle belongs to Edmonton Office | Proceed with placement rules below |
| `STOCK HOLDER` = `NON PRIME DIVISION` | Vehicle is non-prime / Division One | Route immediately to AB \| STURGEON DODGE — DO NOT place on this lot |

**Non-prime vehicles are completely prohibited on the Edmonton Office lot.** They operate under different insurance and a different business structure. There are no exceptions.

---

## Step 2: Vehicle Categorization

Every vehicle on the lot belongs to exactly one placement category. Category determines which zone the vehicle belongs in.

| Category | Criteria | Airtable Status Values |
|---|---|---|
| **NEW** | KM ≤ 1,000 | Any status — KM reading takes priority over status for categorization |
| **FLR** | Frontline Ready — available for sale | `AVAILABLE` or `DEMO` |
| **SOLD** | Deal complete or wholesale sold | `SIGNED DEAL` or `WHOLESALE \| SOLD` |
| **BND** | Booked, not yet delivered | `BOOKED \| NOT DELIVERED` |
| **RECON** | In reconditioning or preparation | `IN RECON`, `INCOMING`, `WHOLESALE`, or `CHASE` |

### Category Override Rules
A vehicle initially classified as NEW may be reclassified based on its Airtable status:

| Initial Category | Airtable Status | Override Category |
|---|---|---|
| NEW | `BOOKED \| NOT DELIVERED` | BND |
| NEW | `SIGNED DEAL` | SOLD |
| NEW | `IN RECON` | RECON |
| NEW | `VOID \| IN STOCK` | FLR |

**Example:** A 2026 Jeep Wrangler with KM=500 and status `BOOKED | NOT DELIVERED` → initial category NEW (KM rule) → override to BND (status rule) → routes to East Side Fence Line, NOT the Cage.

---

## Step 3: Zone Assignment

### Cage — Primary display zone
- **Who goes here:** NEW and FLR vehicles that meet ALL front-line-ready conditions
- **Front-line conditions required:** PDI complete + fully detailed + no stickers + no tape + stock-in tag placed + facing outward + doors can open
- **Who does NOT go here:** SOLD, BND, RECON, Auction Bound, non-prime, any vehicle not meeting front-line conditions

### East Side Fence Line — Sold / BND holding zone
- **Who goes here:** SOLD vehicles (first), BND vehicles (second), FLR sedans that overflow from Cage (third)
- **Fill order (strictly in this sequence):**
  1. SOLD vehicles fill slots F1–F5 first
  2. BND vehicles fill remaining slots
  3. FLR sedan overflow fills any remaining slots
- **Overflow from this zone:** When full (5 slots), additional SOLD and BND vehicles route to West Side of Building or Overflow (Temporary)

### West Side of Building — Recon / BND overflow zone
- **Who goes here:** BND overflow (first), RECON vehicles (second), SOLD overflow (third)
- **Fill order (strictly in this sequence):**
  1. BND overflow (vehicles that could not fit in East Side Fence Line) fills L1–L5 first
  2. RECON vehicles fill remaining slots
  3. SOLD overflow fills any remaining slots
- **Overflow from this zone:** When full (5 slots), remaining vehicles route to Overflow (Temporary)

### Overflow (Temporary) — When all fixed zones are full
- **Who goes here:** Any vehicle that cannot be placed in its correct zone due to capacity
- **Requirement:** Vehicle is labeled with a destination zone annotation (which zone it belongs in)
- **Physical location:** East Side Fence Line area
- **Action required:** When a slot opens in the vehicle's destination zone, move it immediately

---

## Step 4: Cage Slot-Level Rules

When multiple vehicles compete for Cage slots, these rules determine priority.

### Priority Sort (applied in this order)
1. **Brand priority** (primary sort):
   - Jeep: 1 (highest priority — placed first)
   - Ram: 2
   - Chrysler: 3
   - Dodge: 4
   - All other makes: 5 (lowest priority)

2. **Body type priority** (secondary sort, within same brand tier):
   - SUV: 1 (highest — placed first)
   - Van: 2
   - Truck: 3
   - Sedan: 4 (lowest — sedans overflow out of Cage first when capacity is reached)

3. **Year** (tertiary sort, within same brand + body type): Newer year gets higher-priority slot.

### Slot-Specific Rules

**Slot C01:**
- Category: NEW only
- Model restriction: Compass or Wrangler only
- If no Compass or Wrangler in the NEW pool: slot stays EMPTY (do not fill with another vehicle)

**Slots C02–C03:**
- Category: NEW only
- Body type: SUV preferred (non-Durango)
- Fallback: If no NEW non-Durango SUV available → fill with NEW Van or Truck
- If no fallback available: slot stays empty

**Slots C04–C07:**
- Category: NEW only
- Body type: All body types eligible (remaining NEW vehicles after C01–C03 are filled)

**Slots C12–C13:**
- Categories: NEW or FLR (both eligible)
- Body type: Trucks preferred
- Fallback: If no trucks available → any remaining NEW or FLR vehicle

**Slots C08–C11, C14–C20 (11 remainder slots):**
- Categories: NEW or FLR (both eligible)
- These are filled last with all remaining NEW and FLR vehicles not assigned to earlier slots
- Sorted by brand → body type → year

### Sedan Overflow Rule
Sedans are the first body type to be displaced from the Cage when capacity is reached. Because sedans have the lowest body type priority (4), they naturally sort to the end of the Cage fill queue. Overflow sedans route to the East Side Fence Line.

---

## Step 5: Days-in-Stock Priority

For vehicles competing for the same Cage slot type, the vehicle with the highest days-in-stock (oldest stock on the lot) gets priority placement.

**Rule:** "Oldest stock gets priority placement" — a vehicle that has been on the lot longer should be in a more prominent display position to increase its chance of sale.

---

## Step 6: Physical Display Requirements in Cage

All vehicles in the Cage must meet these conditions simultaneously:

| Requirement | Standard |
|---|---|
| Facing direction | Facing outward toward customers at all times |
| Door spacing | Adequate spacing so doors can fully open — customers and staff must be able to enter and exit |
| Variety | Different colors where possible; mix of cars, trucks, SUVs where inventory allows |
| Fullness | All 20 stalls full at all times; maximum 1 empty stall permitted (only if that vehicle was just sold) |

---

## Non-Prime / Division One — Complete Prohibition

**Any vehicle with Airtable `STOCK HOLDER` = `NON PRIME DIVISION` must leave this lot immediately.**

- These vehicles are NOT covered by this lot's insurance
- They are managed under a completely different operation
- They must be transported to AB \| STURGEON DODGE without delay
- There is no scenario in which a non-prime vehicle is allowed to remain at the Edmonton Office

---

## [NEEDS_INPUT] Items in This File

1. **Exact process for vehicles with no VIN:** Route directly to Lot Manager for manual verification before any placement. [COMPLETE]
