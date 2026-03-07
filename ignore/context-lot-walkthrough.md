# Dealership Lot Operations — Source Document: Lot Walkthrough Transcript

> **Document Type:** Extracted and structured data from a physical lot walkthrough conducted by the dealership owner/GM with three managers (Scott, Don/Alex).
> **Purpose:** This document is a complete context file for SOP generation. Every fact, rule, name, number, process, and standard captured in the original walkthrough is preserved below. Nothing should be invented beyond what is stated here.

---

## 1. PROJECT OBJECTIVES

### What Must Be Built
- A **Master SOP** covering all lot/inventory staff, sales staff, and management
- **Team SOPs** — one per team, including management's role within that team and employee responsibilities as a whole (not per individual)
- **Decision trees** for every possible scenario with zero ambiguity — every branch terminates in a defined action
- **Vehicle audit checklists** based on inventory status with binary success criteria
- **Remediation procedures** — if a vehicle fails any success criterion, the exact SOP to bring it to standard
- **Digital execution layer** — initially a manual checklist, then a Telegram bot / app

### Core Design Principles
- Every scenario must have a decided outcome — no ambiguity, no "use judgment"
- If a process involves variable decisions (who to ask, what to ask, what to do based on the answer), every branch must have a pre-decided path
- The system must eliminate all wasted time by removing decision fatigue from employees
- Employees should be able to execute with full autonomy using only the documented instructions and decision trees

### Success Criteria Per Vehicle (Audit Checklist Basis)
These are the variables to check for each vehicle based on its inventory status:
- Does it have a sign (sold sign / trade-in banner / customer sign)?
- Does it have plastic on seats (if applicable)?
- Is it clean / detailed?
- Is it parked in the correct spot for its status?
- Is it tagged properly with stock-in tags?
- Is the stock-in tag in the correct position (bottom-right of windshield)?
- Is it facing the correct direction?
- Can doors open (adequate spacing)?
- Are stickers/tape removed?
- Is PDI complete?
- Are keys in Key Cafe?
- Is ship mode cleared (if new arrival)?

### Digital Tool Vision
**Phase 1 (Manual):**
- Walk to each vehicle → input VIN → check off success criteria boxes → submit → move to next vehicle
- Once all vehicles audited → trigger (button/Telegram command) → generates full task list

**Phase 2 (Digital App):**
- Task list shows what each vehicle needs + how to do it
- Each task has a dropdown showing the current step only (not the full SOP)
- Next to each task: buttons for "Common Issues" and "How to [task name]"
- Employee sees only the step they're executing with drill-down available
- Decision trees embedded at each step for branching scenarios
- Goal: full autonomy, zero mental energy beyond following instructions

---

## 2. CORE PROBLEM STATEMENT

The dealership lacks standardized processes across every stage of the vehicle lifecycle on the lot — from arrival and PDI through display, sale, and delivery. Specific failures identified during the walkthrough:

- Vehicles sitting in wrong zones
- New cars miscategorized as "recon" instead of "pending PDI" (hides them from sales inventory)
- Cars delivered to customers in ship mode (battery disconnected, not PDI'd, not detailed)
- Sold vehicles have no signage identifying their status
- Service department critically underutilized: 9 staff at ~$3,000/day served only 1 customer while vehicles needing work sit idle
- No consistent daily enforcement of any operational standard
- Key/plate management causing financial losses from untracked movements
- A Kia sat on the lot for 6 weeks with no one knowing if it was inventory, sold, a trade-in, or a customer's car

---

## 3. PERSONNEL REGISTRY

### Management / Leadership
| Person | Role | Responsibilities |
|--------|------|-----------------|
| GM (unnamed in transcript, conducting the walkthrough) | Owner / General Manager | Sets all standards, conducts walkthrough, establishes enforcement philosophy |
| Scott | Manager | Vehicle placement, lot organization oversight, zoom-level tracking |
| Don / Alex | Manager(s) | Compile staff vehicle list (make, model, plate numbers), daily lot policing, identify every personal vehicle on lot |
| Kevin | Sales Manager | Sales team oversight, responsible for ensuring sold signs are placed, coordinates vehicle status with lot team, manages deliveries |

### Administrative / Tags
| Person | Role | Responsibilities |
|--------|------|-----------------|
| Georgia | Admin | Fill out stock-in tags, hand to lot team for placement (process not currently active — needs immediate activation) |
| Giselle | Admin / Tech | Fill out stock-in tags, hand to lot team for placement; also listed in service team |

### Service Department
| Person | Role | Responsibilities |
|--------|------|-----------------|
| Pat | Service (department lead alongside Andy) | PDIs, inspections, internal service work |
| Andy | Service (department lead alongside Pat) | PDIs, inspections, internal service work |
| Larry | Service staff | Internal service work |
| Arn | Technician | PDI execution, marks PDI complete in system |
| Andy (tech) | Technician | Service work (note: different Andy than service lead, or same — ambiguous in transcript) |
| Rob | Technician | Service work |
| Giselle | Technician (also admin) | Service work + stock-in tag duties |
| Tracy | Shop Foreman | Oversees service shop operations |

### External Vendors
| Vendor | Service | Cost | Notes |
|--------|---------|------|-------|
| DHG | Full vehicle detailing | $60 per vehicle | Primary detail vendor |
| Hughes | Quick wash-through | Not specified | Alternative for fast turnaround |

### Other Personnel
| Person | Role | Notes |
|--------|------|-------|
| Charlie | Employee (unspecified) | Paid the $500 lost dealer plate penalty — confirmed enforcement precedent |
| Chris H. | Vehicle purchasing | Works with Max/DHD; his acquisitions can be "peeled out" of standard lot flow |
| Chris's son | New employee | Referenced as example for kind onboarding — nobody told him the parking rules |

### Staff Count: Service Department
- **9 total service staff** at approximately **$3,000/day** total labor cost
- On the day of walkthrough: served **only 1 customer**
- Internal vehicle work (PDIs, inspections, detailing routing) must be directed to service to justify overhead

---

## 4. VEHICLE LIFECYCLE — EVERY STATE AND TRANSITION

### State Definitions
| State | Definition | Correct System Status |
|-------|-----------|----------------------|
| Ship Mode | Factory transport state — battery disconnected, software in low-power mode | Should not appear in system as "recon" |
| Pending PDI | New vehicle arrived, awaiting Pre-Delivery Inspection | "Pending PDI" or "PDI" — NEVER "recon" |
| PDI In Progress | Being inspected by service technician | "PDI" |
| PDI Complete | Inspection done, technician marked complete in system | Updated by technician |
| Detailing | Being cleaned/detailed by DHG ($60) or Hughes (wash-through) | In service flow |
| Front-Line Ready | Fully PDI'd + detailed + no stickers/tape + stock-in tag placed | Ready for display |
| On Display (Front Line) | Parked in customer-facing display area | Active retail inventory |
| Sold | Customer has purchased; awaiting delivery or delivered | Needs sold sign with customer name |
| Book-Not-Delivered | Sold on paper but not yet physically delivered to customer | Sold row or overflow (5 spots) |
| Trade-In | Vehicle received from customer as part of a deal | Needs trade-in banner |
| Customer Vehicle | Customer's personal vehicle on the lot (awaiting pickup, service, etc.) | Needs sign: "Customer's car, picking up [date]" |
| Recon | Vehicle needing reconditioning/mechanical work | ONLY for vehicles actually needing repair — never for new arrivals |
| Dealer Trade Incoming | Vehicle arriving from another dealer | Must go to Legal/Service for final PDI + detail immediately |
| Auction Bound | Vehicle routed to auction | Should be in auction area, not display or sold row |

### Critical Routing Rules
- **New arrival in ship mode →** Battery reconnection → Software reset → Route to PDI (NOT recon)
- **New arrival (not ship mode) →** Route to PDI immediately
- **Dealer trade arrival →** Legal/Service for final PDI + detail → THEN placement (even if sales says "it's good to go")
- **PDI complete →** Route to detailing (DHG or Hughes) → Then front-line ready
- **Vehicle sold →** Sold sign placed immediately with customer name → Move to sold row
- **Trade-in received →** Trade-in banner placed → Route based on condition (detail/recon/auction)
- **Customer vehicle on lot →** Sign placed: "Customer's car, picking up [date]"

### What NEVER Happens
- New vehicles categorized as "recon" (hides from inventory, wrong status)
- Vehicles skip PDI and go directly to display or customer delivery
- Vehicles delivered to customers in ship mode (confirmed failure: car died next day, cost $275 + tow + rework)
- Vehicles sit on front line without PDI + detail + tag
- Vehicles sit anywhere without identification signage appropriate to their status
- Detail gets skipped ($275 cost to redo when skipped)

### Stellantis Compliance Requirements
- Initial PDI is done at the factory/origin
- **Final PDI must be completed within 2 days of vehicle delivery to the dealership**
- Manufacturer tracks compliance through technician system entries
- **Current compliance: 80%** — entering the "red zone" where fines and docking begin
- Non-compliance triggers manufacturer penalties (financial fines, potential docking)
- Every dealer trade also requires final PDI within the 2-day window

---

## 5. LOT ZONES — COMPLETE RULES

### Zone 1: Front-Line Display Area
**Purpose:** Customer-facing showroom on wheels — the "walking out a customer" area

**What's Allowed:**
- ONLY fully inspected, detailed, PDI'd, front-line-ready vehicles
- One unit per model on display
- Show different colors where possible
- Mix of cars, trucks, SUVs — good variety representing inventory

**Priority Rules:**
- Oldest stock (highest days-in-stock) gets priority placement
- All stalls must be full at all times
- Maximum one empty stall permitted (only if that unit was just sold)

**Vehicle Condition Requirements:**
- Fully PDI'd
- Fully detailed (no exceptions)
- No stickers anywhere
- No tape anywhere
- Stock-in tag placed in bottom-right corner of windshield
- Facing outward
- Adequate spacing — doors must be able to open so customers/staff can get in and out

**What's Prohibited:**
- Division One vehicles (different insurance, different operation)
- Non-prime vehicles
- Stockholder vehicles
- Any vehicle not fully inspected AND detailed
- Any vehicle without a stock-in tag
- Vehicles parked too close together (can't open doors)

### Zone 2: Sold Row
**Purpose:** Holding area for confirmed sold units and book-not-delivered vehicles ONLY

**Requirements:**
- Every vehicle MUST have a sold sign with customer name visible
- Trade-ins get trade-in banners
- Customer vehicles get a sign: "Customer's car, picking up [date/time]"
- If a vehicle is in the sold row without a sign → status is unknown → creates confusion for everyone

**Capacity:**
- Main sold row + 5 overflow spaces on the other side for trades and book-not-delivered

### Zone 3: Recon / Service Routing Area
**Purpose:** Vehicles needing any work — inspection, PDI, detail, mechanical

**Routing Logic:**
- All vehicles needing work go to Legal/Service
- This feeds the underutilized service department (9 staff, ~$3,000/day, 1 customer)
- Routing internal work there turns 1 customer into 2+ and justifies overhead

**Status Rules:**
- New vehicles must NOT sit in recon status — they need "pending PDI" status
- Only vehicles genuinely needing reconditioning/repair get "recon" status

### Zone 4: Power Sport / Quad Corner
**Purpose:** Dead space — physically impossible to park regular vehicles here (can't open doors due to proximity to walls/structures)

**What Goes Here:**
- Power sport deliveries
- Boat deliveries
- Hysen units (seasonal, post-snow-melt)
- Last parkable spot is the edge position where you can still get out

**What Does NOT Go Here:**
- Retail vehicles under any circumstances

### Zone 5: Auction Area (Front)
**Common Problem:** Vehicles routed incorrectly end up sitting in front of the auction area
**Rule:** If a vehicle is here and shouldn't be → identify it → move to correct zone immediately

### Zone 6: Overflow / Fence Area
**Purpose:** Limited overflow parking
**Capacity:** 5 spaces on "the other side" for trades and book-not-delivered
**Also:** Fence area can hold overflow cars

### Zone 7: Staff Parking
**Location:** Street ONLY — not on the lot
**Exceptions:** NONE
- No "just two minutes"
- No "big truck is in the way"
- No special rules for managers
- The GM personally parked on the street and walked a block when the lot was blocked
- Enforced universally — Kevin, leadership, everyone
- New employees get a polite, welcoming explanation, not confrontation

---

## 6. SIGNAGE, TAGGING & IDENTIFICATION SYSTEMS

### Stock-In Tags
- **Who creates them:** Georgia and Giselle fill out the tags
- **Process:** They fill out tag → hand to lot team → lot team places in vehicle
- **Current status:** This process has NOT been happening — needs immediate activation
- **Placement:** Bottom-right corner of windshield — consistent across ALL vehicles, no exceptions
- **Color:** White for this operation (not yellow — "looks like AutoWorld")
- **Originally wanted:** Blue for Division One, white for main lot
- **Rule:** Every vehicle on the lot must have a stock-in tag — no tag = hasn't been processed

### Sold Signs
- **Location of supplies:** Upstairs, with Sharpies
- **When placed:** Immediately when a vehicle is sold
- **Content:** Customer name written on the sign
- **Who places:** Salesperson or lot team (can be requested via team chat: "Hey, please go put a sold sign in [vehicle]")
- **Purpose:** Anyone walking the lot can instantly identify: "Sold, sold, trade-in, customer car"

### Trade-In Banners
- **When placed:** When a trade-in is received
- **Purpose:** Distinguishes trade-ins from inventory, sold, and customer vehicles

### Customer Vehicle Signs
- **Content:** "Customer's car, picking up [date]" or similar instruction
- **When placed:** When a customer's personal vehicle is on the lot for any reason

### Key Tags (GPS-Enabled)
- **Every set of keys** has a GPS-enabled key tag
- **Cost to reprogram if lost:** $25 charged to the employee who lost it
- **Tags must stay attached** to the key set at all times

### Consequences of Missing Signage
- Without signage, no one can tell if a vehicle is inventory, sold, a trade-in, or a customer's car
- Confirmed example: A Kia sat on the lot for **6 weeks** with no identification — nobody knew what it was

---

## 7. KEY CAFE & ACCOUNTABILITY PROTOCOL

### Key Cafe Rules (Non-Negotiable)
- ALL keys and dealer plates must be signed out AND signed back in through Key Cafe
- **No peer-to-peer transfers** — if someone says "Hey, I need that plate," the answer is: "No — go back to Key Cafe, I'll check mine in, you sign it out"
- Every transaction is logged: employee name + timestamp
- Key Cafe is the **single source of truth** for key/plate custody at all times

### Financial Penalties (All Enforced — Not Theoretical)
| Item Lost | Penalty | Enforcement Precedent |
|-----------|---------|----------------------|
| Dealer plate | $500 | Charlie paid it — confirmed enforced |
| Key tag (GPS) | $25 | Cost to reprogram |
| Set of keys | ~Half the replacement cost | Employee pays |

### Accountability Agreement
- **Every employee must sign** a formal accountability agreement
- **Without signing:** Cannot take a plate, cannot drive a dealership vehicle, cannot continue employment at the dealership
- **Agreement covers:** Financial responsibility for lost items, Key Cafe compliance, custody chain requirements

### Enforcement Logic
- "You signed it out" = you are responsible, period
- No "I gave it to Alex" defense — the signer owns liability until the item is checked back in through Key Cafe
- Dealer plates + keys = equivalent of carrying $500 cash
- This protocol eliminates "thousands of dollars getting lost" from untracked movements

---

## 8. COMMUNICATION & ESCALATION PROTOCOLS

### Before Moving Any Vehicle
1. Check with the assigned salesperson: "Whose is this? What's the status? When is delivery?"
2. IF salesperson says delivery is imminent → Expedite through PDI/detail → Do NOT skip the process
3. IF salesperson says "don't worry about it, it's good to go" → Push back: "Stellantis requires final PDI within 2 days. We're at 80% compliance, in the red zone. It needs to go through."
4. Communication channels: Direct conversation + team chats for documentation

### Escalation for Non-Compliance (3-Strike Approach)
| Strike | Action | Example Language |
|--------|--------|-----------------|
| 1st | Polite, helpful request | "Hey, Kevin, do you mind getting your guys to put a sold sign in there?" |
| 2nd | Reminder after reasonable time | "Hey, Kevin, do you mind?" (slightly more emphasis) |
| 3rd | Direct accountability conversation | "Kev, killing me, buddy. Can you just tell me the stuff and I'll do it, because we have to be organized" |
| Expected result at 3rd | Self-correction | "No, no, buddy, I'm coming down myself. I'll do it myself." |

**Key Principle:** "Inspect what you expect" — standards only hold through daily, consistent enforcement. Not one-time announcements.

### New Employee Onboarding (Lot Rules)
- **Approach:** Welcoming and respectful — "Hey, welcome aboard"
- **Never:** Confrontational or aggressive about first-time violations
- **Explain with context:** "All sales have to park on the street — limited space, landlord parking, big trucks coming through"
- **Frame as:** Standard practice, not personal criticism
- **Example referenced:** Chris's son (new, trying to get into the industry) — nobody told him the rules, so inform him kindly

---

## 9. DAILY OPERATIONS WORKFLOW

### Morning Lot Walk
- **Status:** Mandatory
- **Timing:** After arriving, settling in, and putting out immediate fires (~30 minutes into the day)
- **Duration:** Approximately 30 minutes
- **Process:** Physical walk of the entire lot, every zone, every vehicle
- **What to check per vehicle:**
  - Vehicle status matches its zone
  - Signage present and correct for status
  - Cleanliness acceptable
  - Positioning correct (facing out, adequate spacing)
  - Stock-in tag in place (bottom-right windshield)
  - No unauthorized personal vehicles on lot
  - No compliance gaps (PDI overdue, detail needed)
- **Output:** Task list generated from the walk — route vehicles to service, request sold signs, coordinate with sales, flag issues
- **Communication:** Issues documented in team chats for accountability trail

### Staff Vehicle Inventory (One-Time Setup + Maintenance)
- **Who:** Don or Alex compiles the list
- **Data needed:** Every staff member's personal vehicle — employee name, make, model, plate number
- **Purpose:** Instantly identify which vehicles on the lot are staff vs. inventory vs. customer
- **Status at time of recording:** Don/Alex reported starting this process that morning

### Ongoing Lot Policing (Throughout the Day)
- Monitor for: Staff parking on lot, vehicles moved without authorization, new arrivals not processed
- Enforce consistently — same standard for managers as for new employees
- Document issues in team chats for accountability trail

### Service Department Utilization
- **Problem:** 9 staff at ~$3,000/day with only 1 customer on the day of the walkthrough
- **Solution:** Route all internal vehicle work to service — PDIs, inspections, detailing coordination
- **Effect:** Turns 1 customer into 2+ and justifies the $3,000/day overhead
- **Who routes:** Lot team routes vehicles; service team (Pat, Andy's department) performs the work

---

## 10. FINANCIAL IMPACTS & COST DATA

| Item | Cost / Value | Context |
|------|-------------|---------|
| Dealer plate (lost) | $500 penalty | Enforced — Charlie paid it |
| Key tag GPS (lost) | $25 penalty | Cost to reprogram |
| Keys (lost) | ~Half replacement cost | Employee pays |
| Skipped detail (rework) | $275 | Confirmed incident: vehicle delivered without detail, had to be redone |
| Tow back (ship mode delivery failure) | Cost of tow | Vehicle died next day after delivery in ship mode |
| Service department daily labor | ~$3,000/day | 9 staff |
| Service department utilization (day of walk) | 1 customer | Critically underutilized |
| DHG detailing | $60/vehicle | External vendor |
| Battery recharge (ship mode left too long) | 2 days to charge | Prevention is critical — don't let batteries sit |
| Stellantis non-compliance | Fines + docking | Currently at 80% compliance, entering red zone |

---

## 11. EQUIPMENT & TOOLS

| Item | Details | Use Case |
|------|---------|----------|
| Key Cafe | Centralized key/plate management system with electronic logging | All key + dealer plate sign-out/sign-in |
| GPS key tags | Attached to every key set; $25 to reprogram if lost | Key tracking |
| Stock-in tags (white) | Filled out by Georgia/Giselle, placed by lot team | Vehicle identification on windshield |
| Sold signs | Located upstairs with Sharpies | Customer name written, placed on sold vehicles |
| Trade-in banners | Located upstairs | Placed on trade-in vehicles |
| Customer vehicle signs | Handwritten or pre-printed | "Customer's car, picking up [date]" |
| Pressure washer | Wireless/electric, fill with water | Quick touch-ups on display vehicles (spring/summer primarily) |
| Team chat system | Platform unspecified | Communication channel for task coordination, documentation, accountability |

---

## 12. SPECIAL CASES & EDGE SCENARIOS

### Chris H.'s Acquisitions
- Chris H. purchases vehicles working with Max/DHD
- His acquisitions can be "peeled out" of standard lot flow
- Implication: separate process may apply to his vehicle purchases — needs clarification on whether they bypass standard PDI/detail or follow a modified path

### Division One Separation
- Division One / non-prime / stockholder vehicles are **completely prohibited** on this lot
- Different insurance policy, different operation entirely
- Not covered under this lot's policies
- Must be stored/managed separately

### Seasonal Items (Power Sport Corner)
- Hysen units, boats, power sport deliveries are seasonal
- Post-snow-melt timing for Hysens
- These use the quad corner dead space that can't hold regular retail vehicles

### The Kia Incident
- A Kia sat on the lot for **6 weeks** with no identification
- Nobody knew if it was inventory, sold, a trade-in, or a customer vehicle
- This is the canonical example of why every vehicle must have status signage at all times

### Ship Mode Delivery Failure
- A vehicle was delivered to a customer in ship mode (battery disconnected, not PDI'd, not detailed)
- The car died the next day
- Required towing back to the dealership
- Cost: $275 (skipped detail) + tow cost + complete rework
- This is the canonical example of why PDI/detail cannot be skipped under any circumstances
