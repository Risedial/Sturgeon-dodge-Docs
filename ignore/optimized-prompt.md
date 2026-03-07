# Lot Placement System — Documentation Generation Prompt

## Context

You are documenting an automated vehicle lot placement system used by a car dealership. The system reads vehicle data from Airtable, applies a rule engine loaded from Google Sheets, assigns each vehicle to a physical parking slot, writes the result back to a Google Sheets "Placement Map", and sends notifications via Telegram.

There are **five files** in this directory. Read all of them before producing any output.

---

## Files to Read (in this order)

### 1. `rules for lot - rule_docs.csv`
**What it is:** Schema/dictionary for the rule engine. Defines every rule type that exists, what each rule type does, what parameters it requires, and an example.

**Columns:**
- `Rule_Type` — The rule type identifier (e.g., `CATEGORY_ASSIGN`)
- `Purpose` — Plain-English description of what this rule type does
- `Required_Params` — Parameter names that must be provided for this rule type
- `Example` — A concrete example of this rule type in use

**How to use it:** This is your reference for understanding every rule type name used in the rules file. Read this first so the rules file makes sense.

---

### 2. `rules for lot - rules.csv`
**What it is:** The actual running rule configuration. Each row is one rule. The n8n automation loads and parses these rows at runtime to govern how vehicles are categorized and where they are placed.

**Columns:**
- `Rule_ID` — Unique identifier for each rule (e.g., `CAT_001`)
- `Rule_Type` — One of the types defined in `rule_docs.csv`
- `Param_1` through `Param_5` — Rule parameters; their meaning depends on `Rule_Type` (refer to `rule_docs.csv`)
- `Enabled` — `TRUE` or `FALSE`; only `TRUE` rules are active
- `Notes` — Human-readable description of what this specific rule does

**Note:** Some cells in the `Param_2` column show `#ERROR!` — this is a Google Sheets formula error in the source data. Based on the Notes column and the rule type, these cells are actually meant to hold the string `=` (equals operator) for string equality comparisons. Treat them as `=` when documenting.

**How to use it:** This is the complete rule set. Document every enabled rule, grouped by `Rule_Type`.

---

### 3. `rules for lot - Placement Map.csv`
**What it is:** A real-world snapshot of the output the system produces — the current physical lot layout. Each row is one parking slot. This is what a human reads to know where to park each vehicle after it has been audited.

**Columns:**
- `Zone` — Physical zone of the lot: `CAGE`, `FENCE`, or `LEFT`
- `Slot` — Slot identifier within the zone (e.g., `C01`, `F3`, `L2`)
- `VIN` — Vehicle Identification Number (empty = slot is available/unoccupied)
- `Year`, `Make`, `Model`, `Color` — Vehicle details
- `Body Type` — Normalized body type: `SUV`, `Truck`, `Sedan`, `Van`
- `Category` — Assigned category: `NEW`, `FLR`, `SOLD`, `BND`, `RECON`
- `Status` — Human-readable display status (e.g., `AVAILABLE`, `SIGNED DEAL`, `BOOKED | NOT DELIVERED`, `IN RECON`)
- `Assigned` — ISO 8601 timestamp of when this slot was assigned
- `Notes` — Additional notes

**How to use it:** Use this as a concrete example of the system's output. It shows the slot naming scheme, zone layout, and what the final product looks like.

---

### 4. `n8n-workflow.json`
**What it is:** The full n8n automation workflow (JSON export). This is the system that runs the placement logic. It contains all the code, data connections, and logic that transforms raw Airtable vehicle records into the Placement Map.

**Key nodes to extract and document:**

| Node Name | Purpose |
|---|---|
| `Webhook: Run Placement1` | HTTP trigger that starts the workflow |
| `Read Schema1` | Reads rule schema from Google Sheets |
| `Read Rules1` | Reads rules from Google Sheets |
| `Generic Rule Parser` | Parses and validates rules; builds structured config |
| `Validation Gate` | If-node: aborts on rule errors, continues on success |
| `Airtable: Pull Verified Vehicles1` | Pulls today's verified vehicles from Airtable |
| `NEW Vehicles` | Filters vehicles with KM ≤ 1000 |
| `USED Vehicles1` | Filters vehicles with KM ≥ 1001 |
| `Categorize Vehicles2` | Assigns each vehicle a category using rules |
| `Run Placement Algorithm1` | Core engine: assigns vehicles to slots |
| `GSheets: Clear Placement Map2` | Clears old placement data |
| `Transform: Flatten Rows2` | Formats placement data for Google Sheets |
| `GSheets: Write Placement Map2` | Writes final placement to Google Sheets |
| `Build Telegram Messages2` | Builds Telegram notification text |
| `Code: Generate Placement HTML` | Generates HTML table for PDF report |
| `Code: HTML to Binary` | Converts HTML to binary for PDF delivery |
| `Telegram: Send Placement PDF` | Sends PDF report to Telegram |
| `Handle Validation Errors` | Formats error alerts on rule failures |

**Read the full JavaScript code inside each Code node. Do not summarize or skip any logic.**

---

## Output Instructions

Produce a single, comprehensive documentation file covering the entire system. Structure it with the following sections:

---

### Section 1: System Overview
- What the system does in plain English (2–3 paragraphs)
- Who uses it and when (what triggers a run)
- The full pipeline, step by step, from webhook trigger to final output

---

### Section 2: Data Sources
Document every external data source:
- **Airtable:** Base ID, Table ID, filter formula (exact Airtable formula string), fields pulled (exact field names from Airtable), record limit
- **Google Sheets:** Spreadsheet ID, each sheet tab (GID and name), what is read vs written, column definitions

---

### Section 3: Vehicle Categories
Define every category a vehicle can be assigned, what it means, and how a vehicle qualifies:

| Category | Meaning | How Assigned |
|---|---|---|
| NEW | ... | ... |
| FLR | ... | ... |
| SOLD | ... | ... |
| BND | ... | ... |
| RECON | ... | ... |

---

### Section 4: Category Assignment Rules (All Enabled Rules)
Document every `CATEGORY_ASSIGN` rule. For each rule:
- Rule ID
- The condition (field, operator, value)
- The resulting category
- Priority order (lower number = evaluated first)

Then document every `CATEGORY_OVERRIDE` rule. For each rule:
- Rule ID
- Starting category + triggering status string → resulting category
- Priority

Explain clearly: category assignment runs first, then overrides are applied. Give a worked example: a vehicle with KM=500 and status "BOOKED | NOT DELIVERED" starts as NEW, then gets overridden to BND.

---

### Section 5: Value Maps
Document all `VALUE_MAP` rules grouped by `map_name`:

**BRAND_PRIORITY** — Controls sort order; lower number = placed first:

| Make | Priority |
|---|---|
| Jeep | 1 |
| Ram | 2 |
| ... | ... |
| (any unlisted make) | 5 |

**BODY_TYPE_NORM** — Normalizes raw Airtable body type strings to standard values:

| Raw Input | Normalized Output |
|---|---|
| CROSSOVER | SUV |
| COUPE | SEDAN |
| ... | ... |

**BODY_TYPE_PRIORITY** — Controls sort order within a priority tier; lower number = placed first:

| Body Type | Priority |
|---|---|
| SUV | 1 |
| VAN | 2 |
| ... | ... |

---

### Section 6: General Settings
Document every `GENERAL_SETTING` rule:

| Setting | Value | Type | What It Controls |
|---|---|---|---|
| NEW_KM_THRESHOLD | 1000 | integer | Max KM for NEW category |
| SORT_YEAR_DIR | DESC | string | Year sort direction |
| ENABLE_ADJACENCY_GROUPING | FALSE | boolean | Whether same make/model are grouped |
| MIN_VERIFIED_THRESHOLD | 0 | integer | Minimum records before placement runs |

---

### Section 7: Lot Zones and Slot Definitions
Describe the physical lot layout:

**CAGE Zone (20 slots: C01–C20)**
- The main enclosed parking area
- Holds NEW and FLR (Frontline Ready) vehicles

**FENCE Zone (5 slots: F1–F5)**
- Fence line on the right side of the building
- Holds SOLD, BND, and overflow vehicles

**LEFT Zone (5 slots: L1–L5)**
- Left side of the building
- Holds BND overflow, RECON, and SOLD overflow

**LOOSE Zone (unlimited: LP1, LP2, ...)**
- Temporary overflow staging
- Used when all fixed slots are full
- Each vehicle is annotated with its destination zone (where it should go when space opens)

---

### Section 8: Slot Constraints (All Enabled Rules)
Document every `SLOT_CONSTRAINT` rule. For each rule:
- Rule ID
- Slot(s) affected
- Constraint type and value
- Priority within that slot
- What happens if the constraint cannot be satisfied (fallback behavior)

Present this as a complete slot-by-slot breakdown:

**C01:**
- CATEGORY_LOCK: NEW only
- MODEL_WHITELIST: Compass, Wrangler only
- ALLOW_EMPTY: Yes (leave empty if no qualifying vehicle exists)

**C02–C03:**
- CATEGORY_LOCK: NEW only
- BODY_TYPE_LOCK: SUV
- MODEL_BLACKLIST: No Durango
- FALLBACK_BODY_TYPES: VAN, TRUCK (if no qualifying SUVs available)

**C04–C07:**
- CATEGORY_LOCK: NEW only
- ALL_TRUCK_OVERRIDE: If all candidates would be trucks, prefer non-trucks

**C12–C13:**
- BODY_TYPE_PREFER: TRUCK (physical fit preference)
- CATEGORY_POOL: NEW and FLR both eligible

**C08–C11, C14–C20:**
- CATEGORY_POOL: NEW and FLR both eligible
- IS_REMAINDER: Filled last, after all earlier slot rules are satisfied

---

### Section 9: Zone Priority Rules
Document every `ZONE_PRIORITY` rule defining fill order for the FENCE and LEFT zones.

**FENCE fill order:**
1. SOLD vehicles
2. BND vehicles
3. FLR Sedan overflow (sedans that did not fit in CAGE)

**LEFT fill order:**
1. BND overflow (BND vehicles that did not fit in FENCE)
2. RECON vehicles
3. SOLD overflow (SOLD vehicles that did not fit in FENCE)

---

### Section 10: Sort Rules
Document every `SORT_RULE`. Explain that sorting determines which vehicle gets a higher-priority slot when multiple vehicles compete for it.

| Sort Order | Field | Direction | Meaning |
|---|---|---|---|
| 1 (primary) | BRAND | ASC | Lower brand priority number = placed first (Jeep before Ram) |
| 2 (secondary) | BODY_TYPE | ASC | Lower body type priority number = placed first (SUV before Sedan) |
| 3 (tertiary) | YEAR | DESC | Newer vehicles placed first |

---

### Section 11: Overflow Rules
Document every `OVERFLOW_RULE`:
- `SEDAN_OVERFLOW_FIRST`: Sedans are the first body type to overflow out of the CAGE
- `OVERFLOW_DEST_CAGE`: Label applied to FLR vehicles that overflowed from CAGE (`CAGE`)
- `OVERFLOW_DEST_FENCE`: Label applied to SOLD/BND that overflowed from FENCE (`FENCE`)
- `OVERFLOW_DEST_LEFT`: Label applied to RECON that overflowed from LEFT (`LEFT SIDE`)

---

### Section 12: Placement Algorithm — Step-by-Step
Document the exact execution order of the placement engine (`Run Placement Algorithm1`):

**Phase 1 — CAGE (20 slots)**
Walk through each slot group in order, documenting the exact selection logic, fallback behavior, and sort applied.

**Phase 2 — FENCE (5 slots)**
Walk through the priority order and what happens when the zone fills before all candidates are placed.

**Phase 3 — LEFT (5 slots)**
Same as FENCE.

**Phase 4 — LOOSE PARKING (unlimited)**
Document: which vehicles end up here, how they are numbered, what `destinationZone` means, and what the system does with the overflow list.

---

### Section 13: Categorization Engine — Step-by-Step
Document how `Categorize Vehicles2` processes each vehicle:
1. Extract raw fields from Airtable (exact field name mappings)
2. Validate required fields (VIN, make, model) — excluded if missing
3. Normalize body type using `BODY_TYPE_NORM` map
4. Look up brand priority using `BRAND_PRIORITY` map (default = 5 for unlisted makes)
5. Look up body type priority using `BODY_TYPE_PRIORITY` map
6. Evaluate category assignment rules in priority order (first match wins)
7. Apply category overrides based on Airtable INVENTORY STATUS
8. Output categorized vehicle object with all fields

Provide the full field mapping from Airtable field names → internal variable names:

| Airtable Field | Internal Variable | Notes |
|---|---|---|
| `V.I.N.` | `vin` | Required |
| `MAKE` | `make` | Required |
| `MODEL` | `model` | Required |
| `YEAR` | `year` | Parsed as integer |
| `COLOUR` | `color` | |
| `KM` | `km` | Parsed as integer |
| `TYPE` | `bodyType` (raw) | Normalized via VALUE_MAP |
| `INVENTORY STATUS` | `inventoryStatus` | Used for overrides and output |

---

### Section 14: Outputs
Document every output the system produces:

**Output 1: Google Sheets — Placement Map**
- What is cleared (rows 2–100)
- What is written (one row per slot, all 20+5+5+overflow rows)
- Column definitions with data type and source

**Output 2: Telegram — Status Message**
- What is included (zone fill levels, overflow list, data warnings, reminders)
- Format (HTML-formatted Telegram message)

**Output 3: Telegram — PDF Report**
- Styled HTML table converted to PDF
- Zone and category color codes

**Output 4: Webhook JSON Response**
- Full JSON schema of the response object returned to the caller
- Include all fields in `summary`, `placementMap`, and `escalations`

---

### Section 15: Error Handling
Document what happens when rule validation fails:
- Which node detects the error (`Validation Gate`)
- What information is in the error alert (rule ID, error description, suggestion)
- Where the alert is sent (Telegram)
- What does NOT happen (placement algorithm never runs)

---

### Section 16: Glossary
Define every term, abbreviation, and status value used anywhere in the system:

| Term | Definition |
|---|---|
| FLR | Frontline Ready — vehicle is available for sale and display |
| BND | Booked Not Delivered — vehicle has a pending deal but has not been delivered to buyer |
| RECON | Reconditioning — vehicle is undergoing prep work before sale |
| NEW | Vehicle with ≤ 1,000 KM, treated as new unit |
| SOLD | Vehicle with a completed/signed deal |
| CAGE | Main enclosed parking lot (20 slots) |
| FENCE | Right-side fence line parking (5 slots) |
| LEFT | Left side of building parking (5 slots) |
| LOOSE | Temporary overflow parking, no fixed slot |
| VIN | Vehicle Identification Number |
| KM | Odometer reading in kilometers |
| INVENTORY STATUS | Raw status field from Airtable (exact string from dealership system) |
| Category | Computed classification assigned by this system's rule engine |
| Overflow | A vehicle that could not be placed in its primary zone due to capacity |
| Escalation | Synonym for overflow; vehicles in LOOSE zone flagged for manual action |
| Brand Priority | Numeric rank controlling which makes get higher-priority slots |
| Body Type Priority | Numeric rank controlling which body types get higher-priority slots |

---

## Output Format Requirements

- Use Markdown with headers, tables, and code blocks
- All tables must have headers
- All rule IDs must be cited (e.g., `CAT_001`)
- Slot constraints must be documented slot-by-slot, not just as a list of rules
- Every variable name, field name, and status string must be presented exactly as it appears in the source files (case-sensitive)
- Do not omit any enabled rule
- Do not paraphrase rule logic — describe it precisely
- Where the source data contains `#ERROR!` in `Param_2` for `CATEGORY_ASSIGN` rules, document the intended value as `=` (string equality operator) based on context from the Notes column
