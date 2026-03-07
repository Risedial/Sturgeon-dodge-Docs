# Lot Placement System — Full Technical Documentation

---

## Table of Contents

1. [System Overview](#section-1-system-overview)
2. [Data Sources](#section-2-data-sources)
3. [Vehicle Categories](#section-3-vehicle-categories)
4. [Category Assignment Rules](#section-4-category-assignment-rules-all-enabled-rules)
5. [Value Maps](#section-5-value-maps)
6. [General Settings](#section-6-general-settings)
7. [Lot Zones and Slot Definitions](#section-7-lot-zones-and-slot-definitions)
8. [Slot Constraints (All Enabled Rules)](#section-8-slot-constraints-all-enabled-rules)
9. [Zone Priority Rules](#section-9-zone-priority-rules)
10. [Sort Rules](#section-10-sort-rules)
11. [Overflow Rules](#section-11-overflow-rules)
12. [Placement Algorithm — Step-by-Step](#section-12-placement-algorithm--step-by-step)
13. [Categorization Engine — Step-by-Step](#section-13-categorization-engine--step-by-step)
14. [Outputs](#section-14-outputs)
15. [Error Handling](#section-15-error-handling)
16. [Glossary](#section-16-glossary)

---

## Section 1: System Overview

The Lot Placement System is an automated vehicle parking assignment engine used by a car dealership. Each day, after vehicles are physically verified at the Edmonton office, the system determines exactly which parking slot every vehicle should occupy on the physical lot. It replaces a manual process of deciding where to park new arrivals, trade-ins, sold units, and vehicles in reconditioning.

The system is driven entirely by a configurable rule engine. All rules — including which vehicles go where, which makes get priority, what body types belong in which slots, and how overflow is handled — are defined in a Google Sheets spreadsheet. This means the lot layout logic can be changed without touching any code: an authorized user edits the rules sheet, and the next run picks up the new configuration automatically.

A single run of the system reads today's verified vehicle records from Airtable, parses the current rule set from Google Sheets, classifies each vehicle into a category (NEW, FLR, SOLD, BND, or RECON), assigns every vehicle to a physical parking slot according to slot-level constraints and zone fill priorities, writes the complete Placement Map back to Google Sheets, and delivers a status summary and a PDF lot map to a Telegram chat. The entire pipeline runs in seconds and requires no manual data entry.

**Who uses it and when:** The system is triggered on demand by a staff member pressing a "Run Placement" button in a Vercel web application. This is typically done after the daily vehicle audit is complete and all vehicles have been verified in Airtable for that day. The output is consumed by lot attendants and sales staff who need to know where to park or find each vehicle.

**Full pipeline, step by step:**

1. Staff presses "Run Placement" in the Vercel app, which sends an HTTP POST to the n8n webhook.
2. n8n reads the rule schema (`rule_schema` tab) and rule configuration (`rules` tab) from Google Sheets in parallel.
3. The `Generic Rule Parser` merges schema and rules, validates every rule against the schema, and compiles a structured configuration object.
4. The `Validation Gate` checks for errors. If any rule fails validation, the run aborts immediately, a Telegram error alert is sent, and no placement is written.
5. If validation passes, Airtable is queried for all vehicles verified today at the Edmonton office (up to 60 records).
6. Airtable results are split into two parallel branches: `NEW Vehicles` (KM ≤ 1000) and `USED Vehicles1` (KM ≥ 1001), then merged back together.
7. `Categorize Vehicles2` classifies every vehicle into a category using the rule engine (CATEGORY_ASSIGN rules, then CATEGORY_OVERRIDE rules). Vehicles missing VIN, make, or model are excluded.
8. `Run Placement Algorithm1` assigns each vehicle to a physical slot across CAGE (20 slots), FENCE (5 slots), LEFT (5 slots), and LOOSE overflow (unlimited), following all slot constraints and zone priorities.
9. `GSheets: Clear Placement Map2` clears rows 2–100 of the Placement Map sheet.
10. `Transform: Flatten Rows2` formats the placement data for Google Sheets.
11. `GSheets: Write Placement Map2` writes one row per slot to the Placement Map sheet.
12. In parallel from the write node: `Build Telegram Messages2` generates an HTML-formatted status message; `Code: Generate Placement HTML` generates a styled HTML table.
13. `Code: HTML to Binary` converts the HTML to a binary file.
14. `Telegram: Send Placement PDF` sends the PDF to the Telegram chat; `Send Messages` sends the text status message.
15. A `Build Webhook Response` node assembles the full JSON response, and `Respond to Webhook1` returns it to the Vercel app.

---

## Section 2: Data Sources

### Airtable

| Property | Value |
|---|---|
| Base ID | `appvPungAt7HkpYIY` |
| Base Name | `INVENTORY SYSTEMS` |
| Table ID | `tblvXuzov6af1vuhE` |
| Table Name | `MASTER INVENTORY` |
| Credential | `Inventory Team - AutoCredit` |
| Filter Formula | `AND({STOCK LOCATION} = 'AB \| EDMONTON OFFICE', DATETIME_DIFF(NOW(), {DATE \| TIME VERIFIED}, 'days') = 0)` |
| Record Limit | 60 |

**Fields pulled (exact Airtable field names):**

| Field Name | Description |
|---|---|
| `STOCK LOCATION` | Physical location of vehicle; filtered to `AB \| EDMONTON OFFICE` |
| `DATE \| TIME VERIFIED` | Timestamp of today's physical verification; used in filter |
| `V.I.N.` | Vehicle Identification Number |
| `YEAR` | Model year |
| `MAKE` | Manufacturer (e.g., Jeep, Ram, Chrysler) |
| `MODEL` | Model name (e.g., Wrangler, 1500) |
| `INVENTORY STATUS` | Current dealership status string (e.g., `AVAILABLE`, `SIGNED DEAL`) |
| `TYPE` | Raw body type string (e.g., `SUV`, `CROSSOVER`, `TRUCK`) |
| `TRIMLINE` | Trim level (pulled but not used in placement logic) |
| `COLOUR` | Exterior color |
| `KM` | Odometer reading in kilometers |

---

### Google Sheets

**Spreadsheet ID:** `14_D8ldZIxuwUPZkEm830TUQ0JsKLurqAk0Pb3Lq8cLs`
**Spreadsheet Name:** `lot-placement-engine`
**Credential:** `thealexbitar google sheets`

| Tab Name | GID | Read/Write | Purpose |
|---|---|---|---|
| `rule_schema` | `1306172711` | Read | Rule type schema and parameter definitions. Loaded by `Read Schema1`. |
| `rules` | `225626766` | Read | Active rule configuration. Loaded by `Read Rules1`. |
| `Placement Map` | `1011859554` | Write (clear + append) | Output sheet. Rows 2–100 cleared, then one row per slot written. |

**Placement Map column definitions (written by the system):**

| Column | Data Type | Source |
|---|---|---|
| `Zone` | String | `CAGE`, `FENCE`, `LEFT`, or `LOOSE` |
| `Slot` | String | e.g., `C01`, `F3`, `L2`, `LP1` |
| `VIN` | String | From Airtable `V.I.N.`; empty if slot unoccupied |
| `Year` | Integer | From Airtable `YEAR` |
| `Make` | String | From Airtable `MAKE`; empty if slot unoccupied |
| `Model` | String | From Airtable `MODEL` |
| `Color` | String | From Airtable `COLOUR` |
| `Body Type` | String | Normalized value: `SUV`, `Van`, `Truck`, or `Sedan` |
| `Category` | String | Computed: `NEW`, `FLR`, `SOLD`, `BND`, or `RECON` |
| `Status` | String | For placed vehicles: original Airtable `INVENTORY STATUS`; for LOOSE vehicles: `TEMP` |
| `Assigned` | ISO 8601 timestamp | Set to `new Date().toISOString()` at time of placement run |
| `Notes` | String | For LOOSE vehicles: destination zone annotation (e.g., `→ Cage slot`); otherwise empty |

---

## Section 3: Vehicle Categories

| Category | Meaning | How Assigned |
|---|---|---|
| `NEW` | A new unit with very low odometer — treated as a new vehicle regardless of Airtable status. | KM ≤ 1,000 (rule `CAT_001`, priority 10). Evaluated before all status-based rules. |
| `FLR` | Frontline Ready — the vehicle is available for sale and should be displayed on the lot. | Airtable `INVENTORY STATUS` is exactly `AVAILABLE` (`CAT_002`) or `DEMO` (`CAT_003`), evaluated at priority 20. |
| `SOLD` | A vehicle with a completed or signed deal. | Airtable `INVENTORY STATUS` is exactly `SIGNED DEAL` (`CAT_004`) or `WHOLESALE \| SOLD` (`CAT_005`), priority 20. |
| `BND` | Booked Not Delivered — the vehicle has an active deal but has not yet been physically handed over to the buyer. | Airtable `INVENTORY STATUS` is exactly `BOOKED \| NOT DELIVERED` (`CAT_006`), priority 20. Also assigned via override from `NEW` (rule `OVR_001`). |
| `RECON` | Reconditioning — the vehicle is undergoing preparation work before it can be sold. | Airtable `INVENTORY STATUS` is `IN RECON` (`CAT_007`), `INCOMING` (`CAT_008`), `WHOLESALE` (`CAT_009`), or `CHASE` (`CAT_010`), all at priority 20. Also assigned via override from `NEW` (rule `OVR_003`). |

---

## Section 4: Category Assignment Rules (All Enabled Rules)

### How the Two-Stage System Works

Category assignment runs in two stages:

**Stage 1 — CATEGORY_ASSIGN:** Rules are evaluated in priority order (lowest number first). The first rule whose condition matches the vehicle wins, and the vehicle is assigned that category. No further CATEGORY_ASSIGN rules are evaluated after the first match.

**Stage 2 — CATEGORY_OVERRIDE:** After Stage 1 assigns an initial category, override rules are evaluated. Each override checks whether the vehicle's current category matches `from_category` AND its `INVENTORY STATUS` matches `when_status`. If both match, the category is changed to `to_category`. Overrides allow a vehicle that qualified as NEW by KM to be reclassified based on its dealership status.

**Worked example:** A 2026 Jeep Wrangler with KM=500 and `INVENTORY STATUS` = `BOOKED | NOT DELIVERED`.

- Stage 1: KM=500 ≤ 1,000 → rule `CAT_001` matches → initial category = `NEW`
- Stage 2: current category is `NEW` + status is `BOOKED | NOT DELIVERED` → rule `OVR_001` matches → final category = `BND`

---

### CATEGORY_ASSIGN Rules (all enabled)

Rules are evaluated in ascending priority order. First match wins.

| Rule ID | Priority | Field | Operator | Value | Resulting Category | Notes |
|---|---|---|---|---|---|---|
| `CAT_001` | 10 | `KM` | `<=` | `1000` | `NEW` | Low-KM vehicles classified as NEW; evaluated before all status rules |
| `CAT_002` | 20 | `STATUS` | `=` | `AVAILABLE` | `FLR` | Available units are Frontline Ready |
| `CAT_003` | 20 | `STATUS` | `=` | `DEMO` | `FLR` | Demo units are Frontline Ready |
| `CAT_004` | 20 | `STATUS` | `=` | `SIGNED DEAL` | `SOLD` | Signed deal = Sold |
| `CAT_005` | 20 | `STATUS` | `=` | `WHOLESALE \| SOLD` | `SOLD` | Wholesale sold = Sold |
| `CAT_006` | 20 | `STATUS` | `=` | `BOOKED \| NOT DELIVERED` | `BND` | Booked not delivered |
| `CAT_007` | 20 | `STATUS` | `=` | `IN RECON` | `RECON` | In reconditioning |
| `CAT_008` | 20 | `STATUS` | `=` | `INCOMING` | `RECON` | Vehicle in transit, treated as RECON |
| `CAT_009` | 20 | `STATUS` | `=` | `WHOLESALE` | `RECON` | Wholesale (not yet sold) treated as RECON |
| `CAT_010` | 20 | `STATUS` | `=` | `CHASE` | `RECON` | Vehicle being pursued for acquisition, treated as RECON |

> **Note on `#ERROR!` in source data:** The `Param_2` column in the Google Sheets `rules` tab shows `#ERROR!` for all `CATEGORY_ASSIGN` rules where the operator is a string equality comparison. This is a Google Sheets formula parsing error. Based on the `Notes` column and rule type semantics, the intended value in all affected cells is `=` (the string equality operator). All `STATUS`-based rules above use `=` as their operator.

---

### CATEGORY_OVERRIDE Rules (all enabled)

Applied in priority order after Stage 1. All have priority 10.

| Rule ID | Priority | Starting Category | When `INVENTORY STATUS` Equals | Resulting Category | Notes |
|---|---|---|---|---|---|
| `OVR_001` | 10 | `NEW` | `BOOKED \| NOT DELIVERED` | `BND` | BND status overrides NEW category |
| `OVR_002` | 10 | `NEW` | `SIGNED DEAL` | `SOLD` | SIGNED DEAL status overrides NEW category |
| `OVR_003` | 10 | `NEW` | `IN RECON` | `RECON` | IN RECON status overrides NEW category |
| `OVR_004` | 10 | `NEW` | `VOID \| IN STOCK` | `FLR` | VOID \| IN STOCK treated as available (FLR) |

---

## Section 5: Value Maps

### BRAND_PRIORITY

Controls sort order during placement. Lower number = placed in a higher-priority slot first.

| Make (upper-cased) | Priority |
|---|---|
| `JEEP` | 1 |
| `RAM` | 2 |
| `CHRYSLER` | 3 |
| `DODGE` | 4 |
| `*` (any unlisted make) | 5 |

**Rule IDs:** `MAP_BP_001` through `MAP_BP_005`

---

### BODY_TYPE_NORM

Normalizes raw Airtable `TYPE` field values to standardized internal body type strings. Lookup is performed on the uppercased raw value.

| Raw Input (from Airtable `TYPE`) | Normalized Output |
|---|---|
| `SUV` | `SUV` |
| `CROSSOVER` | `SUV` |
| `TRUCK` | `TRUCK` |
| `SEDAN` | `SEDAN` |
| `COUPE` | `SEDAN` |
| `HATCHBACK` | `SEDAN` |
| `WAGON` | `SEDAN` |
| `CARGO VAN` | `VAN` |
| `FULL SIZE VAN` | `VAN` |
| `VAN` | `VAN` |

**Rule IDs:** `MAP_BT_001` through `MAP_BT_010`

If a raw value has no entry in this map, the raw value is used as-is.

---

### BODY_TYPE_PRIORITY

Controls sort order within a priority tier. Lower number = placed in a higher-priority slot first. Note that `SEDAN` has the lowest priority (4), meaning sedans are the first body type to overflow out of a zone when capacity is reached.

| Body Type | Priority |
|---|---|
| `SUV` | 1 |
| `VAN` | 2 |
| `TRUCK` | 3 |
| `SEDAN` | 4 |

**Rule IDs:** `MAP_BTP_001` through `MAP_BTP_004`

---

## Section 6: General Settings

All four settings are enabled.

| Rule ID | Setting | Value | Data Type | What It Controls |
|---|---|---|---|---|
| `GEN_001` | `NEW_KM_THRESHOLD` | `1000` | integer | Maximum KM reading for a vehicle to qualify for the `NEW` category. Vehicles with KM ≤ this value are categorized as NEW (before status rules). |
| `GEN_002` | `SORT_YEAR_DIR` | `DESC` | string | Sort direction for the year field when comparing vehicles for slot priority. `DESC` = newest year first. |
| `GEN_003` | `ENABLE_ADJACENCY_GROUPING` | `FALSE` | boolean | If `TRUE`, the engine would attempt to place vehicles of the same make/model in adjacent slots. Currently disabled. |
| `GEN_004` | `MIN_VERIFIED_THRESHOLD` | `0` | integer | Minimum number of verified vehicle records required before the placement run is allowed to proceed. `0` means the run proceeds even if zero vehicles are verified. |

---

## Section 7: Lot Zones and Slot Definitions

The physical lot is divided into four zones. Three zones have fixed slot counts; the fourth is unlimited overflow staging.

---

### CAGE Zone — 20 fixed slots: `C01` through `C20`

The main enclosed parking area of the lot. This is the primary display area. It holds NEW (new low-KM units) and FLR (Frontline Ready, available-for-sale) vehicles. Slots are filled in a specific priority order governed by slot constraints (see Section 8). This zone is processed first during each run.

---

### FENCE Zone — 5 fixed slots: `F1` through `F5`

The fence line along the right side of the building. This zone holds vehicles that are not actively for sale: SOLD vehicles (pending paperwork/pickup), BND vehicles (deal in progress, not yet delivered), and overflow FLR sedans that did not fit in the CAGE. Filled in priority order per ZONE_PRIORITY rules.

---

### LEFT Zone — 5 fixed slots: `L1` through `L5`

The parking area on the left side of the building. This zone holds BND overflow (vehicles that did not fit in the FENCE), RECON vehicles (undergoing preparation), and SOLD overflow (vehicles that did not fit in the FENCE). Filled in priority order per ZONE_PRIORITY rules.

---

### LOOSE Zone — Unlimited slots: `LP1`, `LP2`, `LP3`, ...

Temporary overflow staging. When all fixed slots in the appropriate zone are full and vehicles still remain unassigned, they are placed in the LOOSE zone. Each LOOSE entry is numbered sequentially (`LP1`, `LP2`, etc.) and annotated with a `destinationZone` label indicating which physical zone the vehicle should move to when a slot opens. LOOSE vehicles appear in the Placement Map with `Status = TEMP` and a `Notes` value such as `→ Cage slot`, `→ Fence line`, or `→ Left side`. They are also reported in the Telegram status message as overflow units requiring manual action.

---

## Section 8: Slot Constraints (All Enabled Rules)

Slot constraints define what types of vehicles are allowed in each slot or slot range. Multiple constraints can apply to the same slot; they are evaluated in ascending priority order (lower priority number = checked first).

---

### C01

**Rule `SLOT_001` (priority 10) — CATEGORY_LOCK: `NEW`**
Only vehicles with category `NEW` are eligible for this slot.

**Rule `SLOT_002` (priority 20) — MODEL_WHITELIST: `Compass,Wrangler`**
Of the eligible NEW vehicles, only those whose model name contains `COMPASS` or `WRANGLER` (case-insensitive substring match) qualify for C01.

**Rule `SLOT_003` (priority 30) — ALLOW_EMPTY: `TRUE`**
If no Compass or Wrangler in the NEW pool exists, the slot is left empty. It is not filled with any fallback vehicle.

**Algorithm behavior for C01:** The placement engine filters NEW vehicles for model containing "COMPASS" or "WRANGLER", sorts by brand priority → body type priority → year (DESC), and places the top result. If no qualifying vehicle exists, C01 is written as an empty slot.

---

### C02–C03

**Rule `SLOT_004` (priority 10) — CATEGORY_LOCK: `NEW`**
Only NEW vehicles are eligible.

**Rule `SLOT_005` (priority 20) — BODY_TYPE_LOCK: `SUV`**
Of the eligible NEW vehicles, only those with normalized body type `SUV` qualify.

**Rule `SLOT_006` (priority 30) — MODEL_BLACKLIST: `Durango`**
Even if a vehicle is a NEW SUV, it is excluded if the model name contains `DURANGO`.

**Rule `SLOT_007` (priority 40) — FALLBACK_BODY_TYPES: `VAN,TRUCK`**
If no qualifying NEW SUV (non-Durango) is available for a given slot in this range, the engine falls back to NEW vehicles with body type `VAN` or `TRUCK`.

**Algorithm behavior for C02–C03:** For each slot, the engine first attempts to use a NEW non-Durango SUV (sorted by priority). If the pool is exhausted, it falls back to NEW VAN or NEW TRUCK. If no fallback exists, the slot is left empty.

---

### C04–C07

**Rule `SLOT_008` (priority 10) — CATEGORY_LOCK: `NEW`**
Only NEW vehicles are eligible.

**Rule `SLOT_009` (priority 20) — ALL_TRUCK_OVERRIDE: `TRUE`**
If all remaining NEW candidates for this slot group would be trucks, the engine prefers non-truck vehicles instead. This prevents a solid row of trucks in these slots.

**Algorithm behavior for C04–C07:** The engine takes the sorted pool of remaining NEW vehicles (all body types) and assigns them sequentially to C04, C05, C06, C07. Empty slots are written for any unoccupied positions.

> **Note:** The `ALL_TRUCK_OVERRIDE` constraint is defined in the rule set but the current placement algorithm implementation assigns remaining NEW vehicles to C04–C07 in standard priority order. The override is a declared intent that influences slot planning.

---

### C12–C13

**Rule `SLOT_010` (priority 10) — BODY_TYPE_PREFER: `TRUCK`**
Trucks are preferred for these two slots due to physical fit requirements (the slots accommodate larger vehicles more easily).

**Rule `SLOT_011` (priority 20) — CATEGORY_POOL: `NEW,FLR`**
Both NEW and FLR vehicles are eligible for C12 and C13 (not just NEW).

**Algorithm behavior for C12–C13:** The engine builds a pool of trucks from both NEW and FLR categories, sorts by priority, and fills C12 and C13. If no trucks are available, it falls back to any remaining NEW or FLR vehicle.

---

### C08–C11, C14–C20

**Rule `SLOT_012` (priority 10) — CATEGORY_POOL: `NEW,FLR`**
Both NEW and FLR vehicles are eligible.

**Rule `SLOT_013` (priority 20) — IS_REMAINDER: `TRUE`**
These 11 slots are the remainder slots — they are filled last, after all earlier slot rules (C01 through C07, C12–C13) have been satisfied.

**Algorithm behavior for C08–C11, C14–C20:** The engine collects all remaining NEW and FLR vehicles that have not been assigned to any earlier slot, sorts them by priority, and fills slots sequentially. Unoccupied positions are left empty.

---

## Section 9: Zone Priority Rules

These rules define the fill order within the FENCE and LEFT zones.

### FENCE Zone Fill Order

| Rule ID | Fill Order | Category/Source | Notes |
|---|---|---|---|
| `ZONE_F_001` | 1 (first) | `SOLD` | SOLD vehicles fill FENCE slots first |
| `ZONE_F_002` | 2 | `BND` | BND vehicles fill next |
| `ZONE_F_003` | 3 (last) | `FLR_SEDAN_OVERFLOW` | FLR sedans that did not fit in the CAGE overflow to FENCE last |

When FENCE is full (5 slots occupied), any remaining SOLD vehicles go to SOLD overflow, and any remaining BND vehicles go to BND overflow. Both overflow pools feed into the LEFT zone.

---

### LEFT Zone Fill Order

| Rule ID | Fill Order | Category/Source | Notes |
|---|---|---|---|
| `ZONE_L_001` | 1 (first) | `BND_OVERFLOW` | BND vehicles that did not fit in FENCE fill LEFT first |
| `ZONE_L_002` | 2 | `RECON` | All RECON vehicles fill next |
| `ZONE_L_003` | 3 (last) | `SOLD_OVERFLOW` | SOLD vehicles that did not fit in FENCE fill last |

When LEFT is full (5 slots occupied), all remaining unassigned vehicles go to LOOSE parking.

---

## Section 10: Sort Rules

Sorting determines which vehicle gets a higher-priority slot when multiple vehicles compete for the same position. All sort rules are enabled. The engine applies them as a compound sort in ascending `sort_order` number.

| Rule ID | Sort Order | Field | Direction | Meaning |
|---|---|---|---|---|
| `SORT_001` | 1 (primary) | `BRAND` | `ASC` | Sort by brand priority number ascending. Lower priority number = placed first. Jeep (1) before Ram (2) before Chrysler (3) before Dodge (4) before any other make (5). |
| `SORT_002` | 2 (secondary) | `BODY_TYPE` | `ASC` | Sort by body type priority number ascending. Within the same brand tier: SUV (1) before VAN (2) before TRUCK (3) before SEDAN (4). |
| `SORT_003` | 3 (tertiary) | `YEAR` | `DESC` | Sort by model year descending. Newer vehicles placed before older vehicles when brand and body type are equal. |

**Implementation in code (`sortByPriority` function):**

```javascript
function sortByPriority(vehicles) {
  return [...vehicles].sort((a, b) => {
    if (a.brandPriority !== b.brandPriority) return a.brandPriority - b.brandPriority;
    if (a.typePriority !== b.typePriority)   return a.typePriority  - b.typePriority;
    return b.year - a.year;
  });
}
```

---

## Section 11: Overflow Rules

These rules control overflow behavior: which vehicles leave their primary zone first when capacity is reached, and what destination labels are applied to LOOSE vehicles.

| Rule ID | Rule Name | Value | Effect |
|---|---|---|---|
| `OVF_001` | `SEDAN_OVERFLOW_FIRST` | `TRUE` | Sedans are the first body type to be displaced from the CAGE when it reaches capacity. Because SEDAN has body type priority 4 (the highest number = lowest priority), sedans are naturally sorted to the end of the CAGE fill queue and will overflow before SUVs, Vans, or Trucks. |
| `OVF_002` | `OVERFLOW_DEST_CAGE` | `CAGE` | The destination zone label applied to FLR vehicles that overflowed out of the CAGE. In the Placement Map, LOOSE entries for these vehicles will show `Notes = → Cage slot`. |
| `OVF_003` | `OVERFLOW_DEST_FENCE` | `FENCE` | The destination zone label applied to SOLD and BND vehicles that overflowed out of the FENCE zone. Shown as `Notes = → Fence line`. |
| `OVF_004` | `OVERFLOW_DEST_LEFT` | `LEFT SIDE` | The destination zone label applied to RECON vehicles that overflowed out of the LEFT zone. Shown as `Notes = → Left side`. |

---

## Section 12: Placement Algorithm — Step-by-Step

**Node:** `Run Placement Algorithm1`

The algorithm receives the output of `Categorize Vehicles2`: a `categorized` array (all successfully classified vehicles) and an `excluded` array (vehicles skipped due to missing data). It maintains an `assignedVINs` Set to ensure no vehicle is placed twice.

---

### Phase 1 — CAGE (20 slots)

Slots are processed in this order: C01 → C02–C03 → C04–C07 → C12–C13 → C08–C11, C14–C20.

**C01 — NEW Compass or Wrangler**

1. Pull all vehicles with category `NEW` not yet assigned.
2. Filter for models whose name contains "COMPASS" or "WRANGLER" (case-insensitive).
3. Apply `sortByPriority` to filtered set.
4. If result is non-empty: assign top vehicle to C01, add VIN to `assignedVINs`.
5. If result is empty: write empty slot for C01 (ALLOW_EMPTY = TRUE per `SLOT_003`).

**C02–C03 — NEW SUVs, no Durango**

For each slot (`C02`, then `C03`):
1. Pull remaining NEW vehicles (not yet assigned).
2. Filter for `bodyType === 'SUV'` AND model does not contain "DURANGO".
3. Apply `sortByPriority`.
4. If a qualifying vehicle exists: assign next vehicle from sorted list.
5. If no qualifying SUV exists (pool exhausted): fall back to remaining NEW vehicles with `bodyType === 'VAN'` or `bodyType === 'TRUCK'`, sorted by priority; assign top result.
6. If no fallback exists: write empty slot.

**C04–C07 — Remaining NEW vehicles**

1. Pull all remaining NEW vehicles not yet assigned.
2. Apply `sortByPriority` to the full remaining NEW pool.
3. Assign sequentially to C04, C05, C06, C07.
4. Write empty slot for any position where no vehicle remains.

**C12–C13 — Trucks preferred (NEW or FLR)**

For each slot (`C12`, then `C13`):
1. Build a combined pool: NEW trucks not yet assigned + FLR trucks not yet assigned.
2. Apply `sortByPriority`.
3. If a truck exists: assign next truck from sorted list.
4. If no truck exists: fall back to any remaining NEW or FLR vehicle (any body type), sorted by priority; assign top result.
5. If no vehicle exists: write empty slot.

**C08–C11, C14–C20 — Remainder (NEW + FLR)**

1. Build a combined pool: all remaining NEW + all remaining FLR vehicles not yet assigned.
2. Apply `sortByPriority`.
3. Assign sequentially through slots: C08, C09, C10, C11, C14, C15, C16, C17, C18, C19, C20.
4. Write empty slot for any position where no vehicle remains.

After Phase 1, any NEW or FLR vehicle not placed in a CAGE slot becomes CAGE overflow.

---

### Phase 2 — FENCE (5 slots: F1–F5)

The FENCE fill proceeds strictly in zone priority order.

1. Pull all SOLD vehicles not yet assigned. Apply `sortByPriority`.
2. Pull all BND vehicles not yet assigned. Apply `sortByPriority`.
3. Pull CAGE overflow sedans (`isSedan === true` vehicles from the remaining FLR pool). Apply `sortByPriority`.

Fill order:
- First: assign SOLD vehicles to F1, F2, F3, F4, F5 in order until FENCE is full.
- Then: assign BND vehicles to remaining slots until FENCE is full.
- Then: assign FLR sedan overflow to remaining slots until FENCE is full.
- Fill any remaining FENCE slots as empty.

Any SOLD vehicles that did not fit → `fenceOverflowSold`.
Any BND vehicles that did not fit → `fenceOverflowBND`.

---

### Phase 3 — LEFT (5 slots: L1–L5)

Fill order mirrors ZONE_PRIORITY rules.

1. BND overflow (vehicles from `fenceOverflowBND`): assign to L1, L2, L3, L4, L5 in order.
2. RECON vehicles not yet assigned (sorted by priority): assign to remaining LEFT slots.
3. SOLD overflow (vehicles from `fenceOverflowSold`): assign to remaining LEFT slots.
4. Fill any remaining LEFT slots as empty.

Any vehicles from any of these pools that do not fit proceed to Phase 4.

---

### Phase 4 — LOOSE Parking (unlimited)

All vehicles in `categorized` that are not in `assignedVINs` at the end of Phase 3 are placed in LOOSE.

For each remaining vehicle:
1. Determine `destinationZone`:
   - `SOLD` → `FENCE`
   - `BND` → `FENCE`
   - `RECON` → `LEFT SIDE`
   - All others (NEW, FLR overflow) → `CAGE`
2. Create a LOOSE slot entry with slot name `LP1`, `LP2`, etc. (incrementing counter).
3. Set `status = 'TEMPORARY'`.
4. Set `notes = 'Belongs in [destZone]'`.
5. Add to `placementMap` and to `looseAssignments` list.

The `looseAssignments` list is returned in the output for use by `Build Telegram Messages2` (overflow section of the Telegram message) and `Build Webhook Response` (escalations field in the JSON response).

---

### Summary Computation

After all phases, the algorithm computes:

```
cageFilled  = count of CAGE entries with a VIN
fenceFilled = count of FENCE entries with a VIN
leftFilled  = count of LEFT entries with a VIN
looseFilled = count of LOOSE entries
```

These values populate the `summary` object returned by the node.

---

## Section 13: Categorization Engine — Step-by-Step

**Node:** `Categorize Vehicles2`

This node pulls rules directly from `Generic Rule Parser` (via `$('Generic Rule Parser').first().json`) and vehicles directly from `Airtable: Pull Verified Vehicles1` (via `$('Airtable: Pull Verified Vehicles1').all()`).

---

### Step 1: Extract Value Maps from Compiled Rules

Three maps are extracted from `rules.valueMaps`:
- `BRAND_PRIORITY` → internal `brandPriority` object
- `BODY_TYPE_NORM` → internal `bodyTypeNorm` object
- `BODY_TYPE_PRIORITY` → internal `bodyTypePriority` object

Default brand priority (for makes not in the map) = `parseInt(brandPriority['*']) || 99`

---

### Step 2: Load General Settings and Rules

- `newKmThreshold` = `rules.general.NEW_KM_THRESHOLD` (integer, default 1000)
- `categoryAssignRules` = `rules.categoryAssign` sorted ascending by `priority`
- `categoryOverrides` = `rules.categoryOverride` (or hardcoded fallback if not present)

---

### Step 3: Process Each Airtable Record

For each raw Airtable record, the following field extraction occurs:

**Airtable Field → Internal Variable Mapping:**

| Airtable Field | Internal Variable | Notes |
|---|---|---|
| `V.I.N.` | `vin` | Also checks fallback keys `VIN`, `vin`. **Required** — vehicle excluded if absent. |
| `MAKE` | `make` | Also checks fallback `make`. **Required** — vehicle excluded if absent. |
| `MODEL` | `model` | Also checks fallback `model`. **Required** — vehicle excluded if absent. |
| `YEAR` | `year` | Parsed as integer via `parseInt()`. Also checks fallback `year`. |
| `COLOUR` | `color` | Also checks fallbacks `COLOR`, `colour`, `color`. |
| `KM` | `km` | Parsed as integer via `parseInt()`. Also checks fallback `km`. |
| `TYPE` | `bodyType` (raw, then normalized) | Uppercased, then looked up in `BODY_TYPE_NORM` map. Also checks fallback `type`. |
| `INVENTORY STATUS` | `inventoryStatus` | Also checks fallback `INVENTORY_STATUS`. Used for overrides and passed through to output. |

---

### Step 4: Validate Required Fields

If `vin`, `make`, or `model` is missing (empty string or undefined), the vehicle is added to the `excluded` array with reason `'Missing required fields (VIN, make, or model)'` and processing stops for that record.

---

### Step 5: Normalize Body Type

```
rawType = TYPE field value, uppercased
bodyType = bodyTypeNorm[rawType] if found, else rawType
```

If `bodyTypeNorm` returns an object rather than a string (defensive check), the `.output` property is used.

---

### Step 6: Look Up Brand Priority

```
bPriority = brandPriority[make.toUpperCase()]
if undefined: bPriority = defaultBrandPriority (99 if '*' not in map, or map['*'])
bPriority = parseInt(bPriority) || defaultBrandPriority
```

---

### Step 7: Look Up Body Type Priority

```
tPriority = bodyTypePriority[bodyType]
if undefined: tPriority = 99
tPriority = parseInt(tPriority) || 99
```

---

### Step 8: Build Vehicle Object for Rule Evaluation

```javascript
vehicle = {
  vin, make, model, year, color, km,
  bodyType,          // normalized
  inventoryStatus,   // raw from Airtable
  isTruck: bodyType === 'TRUCK',
  isSedan: bodyType === 'SEDAN',
  brandPriority: bPriority,
  typePriority: tPriority
}
```

---

### Step 9: Evaluate CATEGORY_ASSIGN Rules (First Match Wins)

Rules are evaluated in ascending priority order. The `evaluateCondition` function:

- For `field = 'KM'` or `'YEAR'`: performs numeric comparisons (`<=`, `>=`, `<`, `>`, `=`, `!=`)
- For `field = 'STATUS'`: compares `vehicle.inventoryStatus.toUpperCase()` against the rule threshold using string operators (`=`, `!=`, `IN`, `NOT_IN`)
- For other fields (`MAKE`, `MODEL`, `TYPE`): same string comparison logic

The first matching rule's `outputCategory` is assigned. If no rule matches, the vehicle is added to `excluded` with reason `'No matching category rule'`.

---

### Step 10: Apply CATEGORY_OVERRIDE Rules

For each override rule in priority order:
```
if vehicle.category === override.fromCategory
  AND vehicle.inventoryStatus.toUpperCase() === override.whenStatus.toUpperCase():
    vehicle.category = override.toCategory
```

---

### Step 11: Output Categorized Vehicle

The final vehicle object pushed to `categorized`:

```javascript
{
  vin, make, model, year, color, km,
  bodyType,       // normalized
  category,       // final after overrides
  status,         // raw Airtable INVENTORY STATUS (direct passthrough)
  brandPriority,
  typePriority,
  isTruck,
  isSedan
}
```

---

### Step 12: Count and Return

After processing all records:

```javascript
return [{
  json: {
    categorized,      // array of successfully categorized vehicles
    excluded,         // array of skipped vehicles with reasons
    counts: {
      total,          // total Airtable records received
      categorized,    // number successfully categorized
      excluded,       // number skipped
      byCategory      // { NEW: n, FLR: n, SOLD: n, BND: n, RECON: n }
    }
  }
}]
```

---

## Section 14: Outputs

### Output 1: Google Sheets — Placement Map

**What is cleared:** Rows 2 through 100 (100 rows, preserving the header row) of the `Placement Map` tab (GID `1011859554`). Performed by `GSheets: Clear Placement Map2` using a `clear > specificRows` operation with `startIndex: 2, rowsToDelete: 100`.

**What is written:** One row per slot, in the order they appear in `placementMap`: all CAGE slots (C01–C20), then FENCE slots (F1–F5), then LEFT slots (L1–L5), then any LOOSE slots (LP1, LP2, ...). Written by `GSheets: Write Placement Map2` using an `append` operation.

**Column definitions (written values):**

| Column | Data Type | Written Value |
|---|---|---|
| `Zone` | String | `CAGE`, `FENCE`, `LEFT`, or `LOOSE` |
| `Slot` | String | Slot identifier (e.g., `C01`, `F3`, `L2`, `LP1`) |
| `VIN` | String | Vehicle VIN or empty string |
| `Year` | Integer | Model year or empty |
| `Make` | String | Make name or empty (empty if slot unoccupied) |
| `Model` | String | Model name or empty |
| `Color` | String | Color or empty |
| `Body Type` | String | Normalized: `SUV`, `Van`, `Truck`, `Sedan`, or empty |
| `Category` | String | `NEW`, `FLR`, `SOLD`, `BND`, `RECON`, or empty |
| `Status` | String | For placed vehicles: Airtable `INVENTORY STATUS`; for LOOSE: `TEMP`; for empty slots: empty |
| `Assigned` | String (ISO 8601) | Timestamp of placement run |
| `Notes` | String | For LOOSE vehicles: `→ Cage slot` / `→ Fence line` / `→ Left side`; otherwise empty |

---

### Output 2: Telegram — Status Message

**Node:** `Build Telegram Messages2` → `Send Messages`
**Format:** HTML-formatted Telegram message (`parse_mode: HTML`)
**Chat ID:** `7932435045` (Telegram Bot credential: `Sturgeon South Lot Manager`)

**Message sections (in order):**

1. **Header:** `LOT STATUS` — timestamp in Edmonton time (12-hour format, e.g., `Feb 27, 3:45 PM`)
2. **Zone Status:** Fill counts for CAGED LOT, FENCE, and LEFT SIDE OF BUILDING (format: `X/Y spots used`)
3. **Summary:** `TOTAL OVERFLOW UNITS: N`
4. **Overflow List (if overflow > 0):** For each LOOSE vehicle: VIN, make/model/year/color, and parking destination (formatted as `CAGED LOT`, `FENCE - Right side of building`, or `LEFT SIDE OF BUILDING`)
5. **Overflow confirmation (if overflow = 0):** `✅ No overflow units. All vehicles have designated spots.`
6. **Data Issues (if any):** `⚠️ N vehicle(s) skipped — missing Airtable data`
7. **Reminders:**
   - `When a unit arrives to location, please verify location in Airtable ASAP.`
   - `When moving a unit to Sturgeon (Legal), please verify new location ASAP.`

---

### Output 3: Telegram — PDF Report

**Nodes:** `Code: Generate Placement HTML` → `Code: HTML to Binary` → `Telegram: Send Placement PDF`
**Chat ID:** `7932435045`
**Caption format:** `📋 Lot Placement Map` + date/time stamp

**HTML table structure:**
- Page layout: A4 landscape, 12mm margins
- Header row: dark blue background (`#2f5496`), white text, bold
- Data rows: background color set by zone; `Category` cell color-coded by category value

**Zone row colors:**

| Zone | Row Background Color |
|---|---|
| `CAGE` | `#e2efda` (light green) |
| `FENCE` | `#fff2cc` (light yellow) |
| `LEFT` | `#fce4ec` (light pink) |
| `LOOSE` | `#e8eaf6` (light purple) |

**Category cell colors:**

| Category | Background | Text Color |
|---|---|---|
| `NEW` | `#92d050` (green) | `#000000` |
| `FLR` | `#5b9bd5` (blue) | `#000000` |
| `SOLD` | `#ff5050` (red) | `#ffffff` |
| `BND` | `#ffc000` (amber) | `#000000` |
| `RECON` | `#a6a6a6` (gray) | `#000000` |

The `Assigned` column is formatted as `en-CA` locale with time: e.g., `Feb 27, 2026, 19:42`. The HTML is converted to binary (`text/html`, filename `Lot-map.html`) and sent as a document to Telegram.

---

### Output 4: Webhook JSON Response

**Node:** `Build Webhook Response` → `Respond to Webhook1`
**Content-Type:** `application/json`
**CORS:** `Access-Control-Allow-Origin: *`

**Full response schema:**

```json
{
  "success": true,
  "summary": {
    "totalVehicles": 0,
    "totalCategorized": 0,
    "totalExcluded": 0,
    "totalPlaced": 0,
    "cageFilled": 0,
    "cageCapacity": 20,
    "fenceFilled": 0,
    "fenceCapacity": 5,
    "leftFilled": 0,
    "leftCapacity": 5,
    "looseFilled": 0,
    "looseCapacity": "unlimited",
    "stillUnplacedCount": 0,
    "byCategory": {
      "NEW": 0,
      "FLR": 0,
      "SOLD": 0,
      "BND": 0,
      "RECON": 0
    }
  },
  "placementMap": [
    {
      "zone": "CAGE",
      "slot": "C01",
      "vin": "",
      "year": "",
      "make": "",
      "model": "",
      "color": "",
      "bodyType": "",
      "category": "",
      "status": "",
      "notes": "",
      "destinationZone": ""
    }
  ],
  "escalations": [
    {
      "slot": "LP1",
      "vin": "...",
      "year": 2025,
      "make": "...",
      "model": "...",
      "color": "...",
      "category": "BND",
      "bodyType": "SUV",
      "destinationZone": "FENCE"
    }
  ],
  "excluded": [],
  "timestamp": "2026-02-27T19:42:58.284Z"
}
```

**Field descriptions:**

| Field | Description |
|---|---|
| `summary.totalVehicles` | Total Airtable records pulled (verified today) |
| `summary.totalCategorized` | Records successfully categorized |
| `summary.totalExcluded` | Records skipped due to missing fields |
| `summary.totalPlaced` | Vehicles placed in a physical slot (CAGE, FENCE, LEFT, or LOOSE) |
| `summary.cageFilled` / `fenceFilled` / `leftFilled` | Number of fixed slots occupied in each zone |
| `summary.cageCapacity` / `fenceCapacity` / `leftCapacity` | Maximum fixed slots per zone (20, 5, 5) |
| `summary.looseFilled` | Number of overflow LOOSE entries |
| `summary.looseCapacity` | String `"unlimited"` |
| `summary.byCategory` | Count of placed vehicles per category |
| `placementMap` | Array of all slot entries (fixed + LOOSE), one object per slot |
| `escalations` | Array of LOOSE-zone vehicles only; subset of `placementMap` |
| `excluded` | Array of vehicles skipped by categorization engine |
| `timestamp` | ISO 8601 timestamp of when the response was built |

---

## Section 15: Error Handling

### Rule Validation Failure

**Detection node:** `Generic Rule Parser`
**Gate node:** `Validation Gate` (If-node)

The `Validation Gate` checks `$json.validation.isValid` (a boolean). If `true`, execution continues to the placement pipeline. If `false`, execution routes to `Handle Validation Errors`.

**What `Handle Validation Errors` does:**

1. Reads `input.validation.errors` and `input.validation.warnings`.
2. Constructs a plain-text error message with the header `⚠️ RULE ENGINE VALIDATION FAILED`.
3. For each error: lists the Rule ID and error description. If a `suggestion` field exists (e.g., listing valid rule types), it is included.
4. Appends any warnings below the errors section.
5. Appends the instruction: `Fix these issues in the 'rules' sheet and re-run.`
6. Returns `{ telegramMessage, errors, warnings, abortRun: true }`.

**Where the alert is sent:** The error message is sent to Telegram via `Send Messages1` (Chat ID `7932435045`, same bot credential).

**What does NOT happen when validation fails:**
- Airtable is never queried
- No vehicles are categorized
- No placement is computed
- The Placement Map in Google Sheets is not touched
- No PDF is generated
- No webhook response with placement data is returned to the Vercel app

**Types of validation errors detected:**

| Error Type | Description |
|---|---|
| Unknown rule type | A `Rule_Type` value in the rules sheet does not match any entry in the schema |
| Missing required parameter | A rule is missing a parameter that is marked `Required: TRUE` in the schema, and no default value is defined |

**Warnings (non-fatal, logged but do not abort):**

| Warning Type | Description |
|---|---|
| Value not in valid_values list | A parameter's value is not in the schema's `Valid_Values` list (only generated for enum-type parameters with a defined valid values list and no `*` wildcard) |

---

## Section 16: Glossary

| Term | Definition |
|---|---|
| `FLR` | Frontline Ready — vehicle is available for sale and display on the lot. Assigned when `INVENTORY STATUS` is `AVAILABLE` or `DEMO`. |
| `BND` | Booked Not Delivered — vehicle has a pending/active deal but has not yet been physically delivered to the buyer. Assigned when `INVENTORY STATUS` is `BOOKED \| NOT DELIVERED`, or when a NEW vehicle has that status (via override). |
| `RECON` | Reconditioning — vehicle is undergoing preparation work (detailing, mechanical, etc.) before it can be offered for sale. Assigned when `INVENTORY STATUS` is `IN RECON`, `INCOMING`, `WHOLESALE`, or `CHASE`. |
| `NEW` | Vehicle with ≤ 1,000 KM, treated as a new unit for placement priority purposes regardless of its Airtable status. Assigned by rule `CAT_001`. |
| `SOLD` | Vehicle with a completed or signed deal. Assigned when `INVENTORY STATUS` is `SIGNED DEAL` or `WHOLESALE \| SOLD`. Also assigned via override from `NEW`. |
| `CAGE` | Main enclosed parking area of the lot. 20 fixed slots (`C01`–`C20`). Holds NEW and FLR vehicles. |
| `FENCE` | Right-side fence line parking area. 5 fixed slots (`F1`–`F5`). Holds SOLD, BND, and FLR sedan overflow. |
| `LEFT` | Left side of the building parking area. 5 fixed slots (`L1`–`L5`). Holds BND overflow, RECON, and SOLD overflow. |
| `LOOSE` | Temporary overflow staging. No fixed slot count. Slots numbered `LP1`, `LP2`, etc. Used when all fixed slots in the appropriate zone are full. |
| `VIN` | Vehicle Identification Number. Unique identifier for each vehicle. Pulled from Airtable field `V.I.N.`. Required field — vehicles without a VIN are excluded from placement. |
| `KM` | Odometer reading in kilometers. Pulled from Airtable field `KM`. Determines whether a vehicle qualifies as NEW (≤ 1,000 KM). |
| `INVENTORY STATUS` | Raw status string from the Airtable `INVENTORY STATUS` field. Exact strings used in rules: `AVAILABLE`, `DEMO`, `SIGNED DEAL`, `WHOLESALE \| SOLD`, `BOOKED \| NOT DELIVERED`, `IN RECON`, `INCOMING`, `WHOLESALE`, `CHASE`, `VOID \| IN STOCK`. Comparisons are case-insensitive (uppercased at evaluation). |
| `Category` | Computed classification assigned by this system's rule engine. Not the same as the Airtable status. One of: `NEW`, `FLR`, `SOLD`, `BND`, `RECON`. |
| `Overflow` | A vehicle that could not be placed in its primary zone due to capacity constraints. Placed in the LOOSE zone with a `destinationZone` annotation. |
| `Escalation` | Synonym for overflow in the context of the webhook JSON response and Telegram message. Vehicles in the LOOSE zone are listed as escalations requiring manual action (physically moving the vehicle when a slot opens). |
| `Brand Priority` | Numeric rank assigned to a vehicle's make via the `BRAND_PRIORITY` value map. Controls which makes get higher-priority slots: Jeep=1, Ram=2, Chrysler=3, Dodge=4, all others=5. Lower number = higher priority. |
| `Body Type Priority` | Numeric rank assigned to a vehicle's normalized body type via the `BODY_TYPE_PRIORITY` value map. Controls which body types get higher-priority slots within a brand tier: SUV=1, VAN=2, TRUCK=3, SEDAN=4. Lower number = higher priority. |
| `destinationZone` | A label on LOOSE-zone vehicles indicating which physical zone the vehicle belongs in and should be moved to when a slot opens. Values: `CAGE`, `FENCE`, `LEFT SIDE`. |
| `rule_schema` | The Google Sheets tab (GID `1306172711`) containing the schema definition for the rule engine: one row per rule type parameter, defining data types, required status, valid values, and defaults. |
| `rules` | The Google Sheets tab (GID `225626766`) containing the live rule configuration: one row per rule instance. Edited by authorized users to change placement behavior. |
| `Placement Map` | The Google Sheets tab (GID `1011859554`) that is the primary output of the system: one row per slot, showing the current vehicle assignment for each physical parking position. |
| `n8n` | The workflow automation platform running the placement pipeline. |
| `Validation Gate` | The If-node in the n8n workflow that routes execution either to the placement pipeline (if rules are valid) or to the error handler (if rules are invalid). |
| `Generic Rule Parser` | The n8n Code node that reads the schema and rules from Google Sheets, validates every rule, and compiles a structured configuration object consumed by all downstream nodes. |
| `ALLOW_EMPTY` | Slot constraint type. When set to `TRUE` for a slot, the slot is left unoccupied if no qualifying vehicle exists, rather than filling it with a fallback vehicle. |
| `CATEGORY_LOCK` | Slot constraint type. Restricts a slot to vehicles of a specific category only. |
| `MODEL_WHITELIST` | Slot constraint type. Restricts a slot to vehicles whose model name matches one of the listed values (substring match). |
| `MODEL_BLACKLIST` | Slot constraint type. Excludes vehicles whose model name matches any listed value from a slot. |
| `BODY_TYPE_LOCK` | Slot constraint type. Restricts a slot to vehicles of a specific normalized body type. |
| `FALLBACK_BODY_TYPES` | Slot constraint type. Defines body types to use as fallback candidates if the primary body type constraint cannot be satisfied. |
| `ALL_TRUCK_OVERRIDE` | Slot constraint type. When `TRUE`, if all remaining candidates for a slot range would be trucks, the engine prefers non-truck vehicles instead. |
| `BODY_TYPE_PREFER` | Slot constraint type. Expresses a preference (not a hard lock) for a specific body type in a slot. |
| `CATEGORY_POOL` | Slot constraint type. Defines which categories are eligible to fill a slot (e.g., `NEW,FLR` means both NEW and FLR vehicles compete for that slot). |
| `IS_REMAINDER` | Slot constraint type. Marks a slot or slot range as "fill last" — only filled after all earlier slot rules have been satisfied. |
