# EXECUTION PLAN — Sturgeon Dodge Edmonton Office Lot Operations SOP Project

---

## Section 1: Project Overview

### Objective
The Edmonton Office lot currently lacks standardized processes across every stage of the vehicle lifecycle — from arrival and PDI through display, sale, and delivery. The result: vehicles sitting in wrong zones, PDI compliance at 80% and dropping, key/plate financial losses, sold vehicles with no signage, and a service department running at near-zero utilization. This project produces a complete, zero-ambiguity SOP system that eliminates decision fatigue for all lot, sales, service, and management staff at the Edmonton Office.

### End Deliverables
1. **12 Knowledge Files** — structured extraction of every rule, role, zone, process, penalty, and standard from source material
2. **3 Systems Analysis Files** — cause-effect mapping, failure mode analysis, financial impact analysis
3. **25 Decision Trees** — zero-ambiguity handling for every identified scenario (every branch terminates in a defined action)
4. **5 SOPs** — Master SOP + team-specific SOPs for Lot Team, Sales Team, Service Department, and Management
5. **8 Checklists** — vehicle audit checklists (by status) + operational checklists with binary pass/fail criteria
6. **1 App Specification** — product requirements document for the future lot checklist app
7. **Formatted .docx outputs** — distribution-ready documents for all SOPs and checklists

---

## Section 2: File Structure

Every file that will exist at project completion:

```
dealership-sop-project/
├── CLAUDE.md                                          ← Session instructions (read first, every session)
├── EXECUTION_PLAN.md                                  ← This file (read second, every session)
│
├── knowledge/                                         ← Phase 1 outputs
│   ├── personnel-registry.md
│   ├── zone-definitions.md
│   ├── vehicle-statuses-and-transitions.md
│   ├── lot-placement-rules.md
│   ├── signage-and-tagging-standards.md
│   ├── key-cafe-protocol.md
│   ├── compliance-requirements.md
│   ├── financial-penalties.md
│   ├── daily-operations-workflow.md
│   ├── communication-and-escalation-protocols.md
│   ├── service-department-utilization.md
│   └── external-vendors.md
│
├── systems-analysis/                                  ← Phase 2 outputs
│   ├── cause-effect-map.md
│   ├── failure-modes.md
│   ├── financial-impact-analysis.md
│   └── decision-trees/                               ← Phase 3 outputs (25 files)
│       ├── vehicle-arrival-new-standard.md
│       ├── vehicle-arrival-ship-mode.md
│       ├── vehicle-arrival-dealer-trade.md
│       ├── vehicle-pdi-routing.md
│       ├── vehicle-pdi-compliance-deadline.md
│       ├── vehicle-detailing-routing.md
│       ├── vehicle-categorization.md
│       ├── vehicle-placement-cage.md
│       ├── vehicle-sold-processing.md
│       ├── vehicle-trade-in-processing.md
│       ├── vehicle-customer-on-lot.md
│       ├── vehicle-bnd-handling.md
│       ├── vehicle-recon-routing.md
│       ├── vehicle-auction-routing.md
│       ├── vehicle-non-prime-identification.md
│       ├── vehicle-seasonal-power-sport.md
│       ├── vehicle-status-unknown.md
│       ├── key-plate-sign-out.md
│       ├── key-plate-sign-in.md
│       ├── key-plate-lost-response.md
│       ├── staff-parking-new-employee.md
│       ├── staff-parking-repeat-violation.md
│       ├── sold-sign-missing-enforcement.md
│       ├── morning-lot-walk.md
│       └── accountability-agreement-onboarding.md
│
├── sops/                                              ← Phase 4 outputs
│   ├── master-sop.md
│   ├── team-lot.md
│   ├── team-sales.md
│   ├── team-service.md
│   └── team-management.md
│
├── checklists/                                        ← Phase 5 outputs
│   ├── vehicle-audit-new.md
│   ├── vehicle-audit-flr.md
│   ├── vehicle-audit-sold.md
│   ├── vehicle-audit-bnd.md
│   ├── vehicle-audit-recon.md
│   ├── morning-lot-walk-checklist.md
│   ├── pdi-completion-checklist.md
│   └── key-plate-accountability-checklist.md
│
├── app-spec/                                          ← Phase 6 outputs
│   └── lot-checklist-app-requirements.md
│
└── outputs/                                           ← Phase 7 outputs
    ├── master-sop.docx
    ├── team-lot.docx
    ├── team-sales.docx
    ├── team-service.docx
    ├── team-management.docx
    ├── vehicle-audit-checklists.docx
    └── operational-checklists.docx
```

---

## Section 3: Phase Sequence

### Phase 1 — Knowledge Extraction
**Purpose:** Transform the raw source documents into clean, structured reference files. Every fact, rule, role, zone, penalty, and process is extracted and organized by topic. These files become the authoritative source of truth for all downstream phases — no downstream phase should re-read the original source documents.

**Depends on:** Source documents (`context-lot-walkthrough.md`, `LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md`)

**Outputs:** 12 files in `knowledge/`

**Why first:** All downstream phases reference knowledge files, not the originals. Extraction quality gates everything.

---

### Phase 2 — Systems Analysis
**Purpose:** Map the operational system as a whole — identify where failures cascade, where financial loss occurs, and where the root causes of current problems lie. This analysis ensures the SOPs address causes, not just symptoms.

**Depends on:** All 12 `knowledge/` files

**Outputs:** `cause-effect-map.md`, `failure-modes.md`, `financial-impact-analysis.md`

**Why second:** Decision trees need to know failure modes to define the correct branches. SOPs need to understand root causes to set the right standards.

---

### Phase 3 — Decision Trees
**Purpose:** For every identified operational scenario, produce a zero-ambiguity decision tree where every branch terminates in a defined action. No branch may end in "use judgment" or "discuss with manager" — every path has a pre-decided outcome.

**Depends on:** All `knowledge/` files + all `systems-analysis/` files (not including decision-trees/)

**Outputs:** 25 files in `systems-analysis/decision-trees/`

**Why third:** SOPs reference decision trees. Decision trees must exist before SOPs are written.

---

### Phase 4 — SOP Generation
**Purpose:** Produce the actual Standard Operating Procedures — one master SOP covering all lot operations, plus four role-filtered team SOPs that contain only what each role needs to execute. Team SOPs are fully self-contained.

**Depends on:** All `knowledge/` files + all 25 decision tree files

**Outputs:** `master-sop.md`, `team-lot.md`, `team-sales.md`, `team-service.md`, `team-management.md`

**Why fourth:** SOPs synthesize all prior work into executable instructions. They can only be written accurately after all decision trees are complete.

---

### Phase 5 — Checklists
**Purpose:** Produce executable audit checklists for each vehicle status category and operational checklists for daily workflows. All criteria must be binary (Yes/No — no subjective assessments).

**Depends on:** All `sops/` files + relevant `knowledge/` files

**Outputs:** 8 files in `checklists/`

**Why fifth:** Checklists operationalize the SOPs. They can only specify correct criteria after SOPs define what "correct" means for each status.

---

### Phase 6 — App Specification
**Purpose:** Define the product requirements for the future lot checklist app — what it needs to do, the user flows, screen descriptions, and feature list. Non-technical document suitable for a product manager or developer briefing.

**Depends on:** All `checklists/` files + all 25 decision tree files

**Outputs:** `lot-checklist-app-requirements.md`

**Why sixth:** The app digitizes the checklists and embeds the decision trees. Both must be finalized before specifying how an app should present them.

---

### Phase 7 — Document Generation
**Purpose:** Format all SOPs and checklists into distribution-ready documents. Apply consistent styling, headers, cover pages, and table of contents. Output as Markdown-formatted .docx-ready files (or actual .docx if tooling permits).

**Depends on:** All `sops/` files + all `checklists/` files

**Outputs:** 7 files in `outputs/`

**Why last:** Formatting is applied to finalized content only. Changes to content after formatting require re-formatting.

---

## Section 4: Meta-Prompts

> Each prompt below is a complete, copy-paste-ready instruction for a fresh Claude Code session. Each session must read CLAUDE.md and EXECUTION_PLAN.md before executing the prompt.

---

### META-PROMPT — PHASE 1: KNOWLEDGE EXTRACTION

```
Read CLAUDE.md and EXECUTION_PLAN.md before starting.

Then read both source documents in full:
- context-lot-walkthrough.md
- LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md

Your task is to extract and structure all operational knowledge from these documents into 12 separate files inside the `knowledge/` directory. Do not invent any information. If something is unclear or missing from the source documents, mark it [NEEDS_INPUT] or [AMBIGUOUS] using the tags defined in CLAUDE.md.

All named individuals (Pat, Andy, Tracy, etc.) should be treated as [AMBIGUOUS] for their names — document their responsibilities under their role title. The two confirmed admin names are Jorja and Giselle.

The existing automated placement engine (n8n/Airtable/Google Sheets) described in LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md is BACKGROUND CONTEXT ONLY. Use it to understand placement logic for edge cases — do not include technical automation details in the knowledge files.

---

USE THESE CANONICAL ZONE NAMES throughout all files (do not use any other names):
- **Cage** — front-line display area, 20 fixed slots (C01–C20)
- **East Side Fence Line** — sold row / BND holding, 5 fixed slots (F1–F5)
- **West Side of Building** — recon / BND overflow, 5 fixed slots (L1–L5)
- **Overflow (Temporary)** — unlimited overflow staging, no fixed slot count

---

Create the following 12 files with the exact content described:

**1. knowledge/personnel-registry.md**
- Table: every role title, responsibilities, team they belong to, who they coordinate with
- Do NOT use personal names as primary identifiers (role title is primary; note [AMBIGUOUS] for any uncertain names)
- Roles to include: General Manager (Owner), Lot Manager, Sales Manager (Kevin), Admin - Stock Tags (Jorja), Admin/Tech - Stock Tags + Service (Giselle), Service Department Lead (Pat role), Service Department Lead (Andy role — [AMBIGUOUS]), Shop Foreman (Tracy role), Technicians (Arn role, Rob role), Sales Staff
- Note: total service department headcount = 9 staff, ~$3,000/day combined labor cost

**2. knowledge/zone-definitions.md**
- One section per zone with: canonical name, physical description, purpose, slot count, what vehicles are allowed, what vehicles are prohibited, required vehicle conditions, capacity rules
- Zones: Cage, East Side Fence Line, West Side of Building, Overflow (Temporary), Power Sport / Quad Corner, Auction Area, Staff Parking (street only)
- Include: CAGE priority rules (oldest stock = highest days-in-stock gets priority, all stalls must be full, max one empty stall only if just sold), spacing rules (doors must open), facing direction rules

**3. knowledge/vehicle-statuses-and-transitions.md**
- Table: every vehicle state, its definition, correct system status label, what triggers entry into that state, what triggers exit
- States: Ship Mode, Pending PDI, PDI In Progress, PDI Complete, Detailing, Front-Line Ready, On Display (Front Line), Sold, Book-Not-Delivered (BND), Trade-In, Customer Vehicle, Recon, Dealer Trade Incoming, Auction Bound, Non-Prime / Division One
- State transition diagram (text-based): show the valid paths from arrival → front-line → sold → delivered
- Critical rules: new arrivals NEVER get "recon" status — they get "Pending PDI"; ship mode vehicles MUST have PDI before anything else

**4. knowledge/lot-placement-rules.md**
- Vehicle placement categories: NEW (KM ≤ 1,000), FLR (AVAILABLE or DEMO status), SOLD (SIGNED DEAL or WHOLESALE|SOLD), BND (BOOKED|NOT DELIVERED), RECON (IN RECON, INCOMING, WHOLESALE, CHASE)
- Cage fill rules: C01 = Compass or Wrangler (NEW only); C02–C03 = NEW SUV non-Durango (fallback: VAN or TRUCK); C04–C07 = remaining NEW; C12–C13 = trucks preferred (NEW or FLR); C08–C11 / C14–C20 = remaining NEW + FLR
- East Side Fence Line fill order: SOLD first → BND second → FLR sedan overflow last
- West Side of Building fill order: BND overflow first → RECON second → SOLD overflow last
- Brand priority for placement: Jeep (1), Ram (2), Chrysler (3), Dodge (4), all others (5)
- Body type priority: SUV (1), Van (2), Truck (3), Sedan (4) — sedans overflow first
- Overflow (Temporary) rule: vehicle is labeled temporary with a destination zone annotation; it physically stays at East Side Fence Line until a slot opens
- Non-prime identification: check Airtable STOCK HOLDER column — "NON PRIME DIVISION" = send to Legal (AB | STURGEON DODGE); "STURGEON DODGE" = allowed on this lot

**5. knowledge/signage-and-tagging-standards.md**
- Stock-in tags: who creates them (Jorja and Giselle), process (fill out → hand to lot team → lot team places on vehicle), placement location (bottom-right corner of windshield), color (white — NOT yellow), current status (process not active — needs immediate activation), rule (every vehicle on lot must have one)
- Sold signs: location of supplies (upstairs, with Sharpies), when placed (immediately when sold), content (customer name written on sign), who places (salesperson or lot team)
- Trade-in banners: when placed (when trade-in is received), purpose (distinguishes from inventory/sold/customer)
- Customer vehicle signs: content ("Customer's car, picking up [date]"), when placed (when customer's personal vehicle is on lot)
- Consequence of missing signage: include the Kia incident — sat 6 weeks with no identification, nobody knew its status

**6. knowledge/key-cafe-protocol.md**
- Rule: ALL keys and dealer plates signed out AND signed back in through Key Cafe only
- No peer-to-peer transfers — exact process if someone asks for your plate directly: "No — go back to Key Cafe, I'll check mine in, you sign it out"
- Every transaction logged: employee name + timestamp
- Key Cafe = single source of truth for all key/plate custody
- GPS key tags: every key set has one, cost to reprogram if lost = $25, must stay attached at all times
- Accountability agreement: every employee must sign before any key/plate access; without signing = cannot take a plate, cannot drive a dealership vehicle
- Penalties: dealer plate lost = $500 (enforced — confirmed precedent), key tag = $25, keys = ~half replacement cost
- Enforcement logic: "You signed it out" = you are responsible until signed back in through Key Cafe

**7. knowledge/compliance-requirements.md**
- Stellantis PDI requirement: final PDI must be completed within 2 days of vehicle delivery to dealership
- Compliance tracked by: technician entries in manufacturer system
- Current compliance rate: 80% — entering red zone where fines and docking begin
- Consequences of non-compliance: manufacturer financial fines, potential docking
- Dealer trade PDI: same 2-day window applies
- What "PDI complete" means: technician has marked it complete in system
- Ship mode protocol: battery must be reconnected, software reset performed, THEN PDI — vehicle may not be delivered to customer or placed on front line until PDI is complete
- Never-skip rule: a vehicle was delivered in ship mode → car died next day → required tow back → complete rework — this confirms PDI cannot be skipped under any circumstances

**8. knowledge/financial-penalties.md**
- Table: item, penalty amount, who pays, enforcement status, notes
- Dealer plate (lost): $500, employee who signed it out, ENFORCED (confirmed precedent)
- GPS key tag (lost): $25 to reprogram, employee who lost it, ENFORCED
- Keys (lost): approximately half of replacement cost, employee who lost them, ENFORCED
- Service department daily labor: ~$3,000/day for 9 staff, underutilization is a direct financial loss
- DHD detailing: $60 per vehicle for full detail (external vendor)
- Battery issues (ship mode left too long): 2 days to recharge — prevention prevents this cost
- Stellantis non-compliance: fines and docking (exact amounts not specified in source)

**9. knowledge/daily-operations-workflow.md**
- Morning lot walk: mandatory, timing (30 min after arriving + handling immediate fires), duration (~30 min), full physical walk of every zone and every vehicle, output = task list
- Per-vehicle check during morning walk: status matches zone, signage present and correct, cleanliness acceptable, positioning correct (facing out, adequate spacing), stock-in tag in place (bottom-right windshield), no unauthorized personal vehicles, no compliance gaps
- Task list generation: after walk → route vehicles to service, request sold signs, coordinate with sales, flag issues
- Communication: all issues documented in team chats for accountability trail
- Ongoing lot policing: monitor throughout day for staff parking on lot, vehicles moved without authorization, new arrivals not processed
- Staff vehicle inventory: compile list of all staff personal vehicles (name, make, model, plate number) to distinguish from inventory/customer vehicles — one-time setup, maintained ongoing
- Service department routing: route all internal vehicle work (PDIs, inspections, detailing coordination) to service to justify $3,000/day overhead

**10. knowledge/communication-and-escalation-protocols.md**
- Before moving any vehicle: check with assigned salesperson — "Whose is this? What's the status? When is delivery?"
- If salesperson says delivery imminent: expedite through PDI/detail — do NOT skip the process
- If salesperson says "it's good to go" / tries to skip PDI: push back with: "Stellantis requires final PDI within 2 days. We're at 80% compliance, in the red zone. It needs to go through."
- Communication channels: direct conversation + team chats for documentation
- 3-strike escalation protocol:
  - Strike 1: "Hey [Name], do you mind getting your guys to put a sold sign in there?"
  - Strike 2: "Hey [Name], do you mind?" (slightly more emphasis)
  - Strike 3: "[Name], killing me, buddy. Can you just tell me the stuff and I'll do it, because we have to be organized."
  - Expected result at Strike 3: self-correction, "No, no, buddy, I'm coming down myself."
- Key principle: "Inspect what you expect" — standards only hold through daily, consistent enforcement
- New employee parking (first violation): welcoming, respectful explanation — "Hey, welcome aboard. All sales have to park on the street — limited space, landlord parking, big trucks coming through." Frame as standard practice, not criticism.

**11. knowledge/service-department-utilization.md**
- Headcount: 9 service staff total
- Daily labor cost: ~$3,000/day
- Utilization on day of walkthrough: 1 customer (critically underutilized)
- Solution: route all internal vehicle work to service — PDIs, inspections, detailing coordination
- Effect of routing internal work: turns 1 customer worth of utilization into 2+ and justifies overhead
- Roles in service: Department Lead (Pat role), Department Lead (Andy role — [AMBIGUOUS]), Shop Foreman (Tracy role), Technicians (Arn role, Rob role, Giselle role — also handles admin)
- PDI execution: performed by technicians, marked complete in system by the technician

**12. knowledge/external-vendors.md**
- DHD: full vehicle detailing, $60 per vehicle, primary detail vendor
- No alternative vendor for detailing at this time
- All detailing routed through DHD unless otherwise specified

---

After creating all 12 files, write a Phase 1 Completion Report following the template in CLAUDE.md.
```

---

### META-PROMPT — PHASE 2: SYSTEMS ANALYSIS

```
Read CLAUDE.md and EXECUTION_PLAN.md before starting.

Then read all 12 files in knowledge/ in this order:
1. vehicle-statuses-and-transitions.md
2. zone-definitions.md
3. daily-operations-workflow.md
4. financial-penalties.md
5. compliance-requirements.md
6. failure-modes (does not exist yet — you will create it)
7. All remaining knowledge/ files

Your task is to produce 3 systems analysis files. These files map the operational system as a whole — not individual processes, but patterns, loops, failure cascades, and financial consequences. Use systems thinking.

---

**1. systems-analysis/cause-effect-map.md**

Map every identified cause-and-effect pattern from the knowledge files. Format each entry as:

CAUSE: [what triggers the pattern]
EFFECT: [what results]
SEVERITY: [HIGH / MEDIUM / LOW]
CATEGORY: [FINANCIAL / COMPLIANCE / OPERATIONAL / SAFETY]
EXAMPLE: [real incident from source material if available]
PREVENTION: [the standard/rule that prevents this]

Patterns to map (minimum — add others identified in knowledge files):
- New vehicle miscategorized as RECON instead of Pending PDI → hidden from sales inventory → days lost waiting for a sale
- Vehicle delivered in ship mode → battery failure next day → tow + rework
- PDI skipped because salesperson said "it's good to go" → Stellantis compliance rate drops → fines/docking
- Sold vehicle has no sign → status confusion → lot team cannot identify vehicle → wrong vehicle moved
- Vehicle sits without identification → nobody knows status → paralysis (Kia incident: 6 weeks)
- Dealer plate transferred peer-to-peer → no log → employee accountability lost → $500 penalty becomes unenforceable
- Key not returned to Key Cafe → lost key → replacement cost, vehicle security risk
- Internal vehicle work not routed to service → service department underutilized → $3,000/day overhead not justified
- No morning lot walk → non-compliant vehicles not caught → problems compound → harder to fix
- Staff parking on lot → lot space consumed → customer vehicles blocked → unprofessional lot appearance
- Stock-in tag not placed → vehicle not confirmed processed → unknown processing state
- Enforcement not consistent → staff treat rules as optional → standards degrade over time

**2. systems-analysis/failure-modes.md**

Identify every failure mode — conditions under which the system breaks down or produces a bad outcome. Format:

FAILURE MODE: [name]
TRIGGER: [what causes it]
DETECTION: [how it would be noticed]
CONSEQUENCE: [what happens if undetected]
RECOVERY: [what must happen to correct it]
PREVENTION: [the specific rule/process that prevents it]
STATUS_TAG: [CONFIRMED / POTENTIAL / AMBIGUOUS]

Use CONFIRMED for failures explicitly described in the source documents (Kia incident, ship mode delivery, etc.).
Use POTENTIAL for logically inferred failure modes not explicitly described.

**3. systems-analysis/financial-impact-analysis.md**

Produce a comprehensive financial impact analysis covering:

A. Direct Costs (known amounts from source material):
- Dealer plate lost: $500 per occurrence
- GPS key tag reprogram: $25 per occurrence
- Keys lost: ~50% replacement cost
- DHD full detail: $60 per vehicle
- Service department daily labor: ~$3,000/day (9 staff)
- Stellantis non-compliance: fines/docking (exact amounts not in source material)

B. Indirect Costs (estimate basis and reasoning required):
- Vehicle days-in-stock delay from wrong categorization (hidden from inventory)
- PDI rework cost when process is skipped
- Management time spent correcting avoidable issues
- Customer satisfaction impact from mis-delivered vehicles

C. Opportunity Costs:
- Service department running at 1-customer utilization vs. full capacity
- Revenue impact of vehicles not on front line due to missing PDI/detail/tags

D. Cost Prevention Analysis:
- Table showing: process → financial risk prevented → frequency estimate → annual risk exposure

---

After creating all 3 files, write a Phase 2 Completion Report following the template in CLAUDE.md.
```

---

### META-PROMPT — PHASE 3: DECISION TREES

```
Read CLAUDE.md and EXECUTION_PLAN.md before starting.

Then read in this order:
- knowledge/vehicle-statuses-and-transitions.md
- knowledge/zone-definitions.md
- knowledge/lot-placement-rules.md
- knowledge/communication-and-escalation-protocols.md
- knowledge/key-cafe-protocol.md
- knowledge/compliance-requirements.md
- knowledge/financial-penalties.md
- knowledge/signage-and-tagging-standards.md
- systems-analysis/failure-modes.md
- systems-analysis/cause-effect-map.md

Your task is to create 25 decision tree files in systems-analysis/decision-trees/. Every decision tree must:
- Cover exactly one scenario
- Have zero ambiguous branches — every IF leads to a THEN or an ELSE with a defined action
- Terminate every branch in a specific, actionable outcome
- Never end in "use judgment", "discuss with manager", or similar
- Include the responsible role for each action
- Include exact communication language (what to say, to whom, on what channel) wherever communication is required
- Reference cross-linked decision trees using the format: → SEE: [filename]
- Mark any gaps with [NEEDS_INPUT] and explain what information is missing

USE THESE CANONICAL ZONE NAMES: Cage, East Side Fence Line, West Side of Building, Overflow (Temporary)

DOMAIN FACTS TO APPLY THROUGHOUT:
- PDI window: 2 days from vehicle delivery — currently at 80% compliance (red zone)
- Non-prime check: Airtable STOCK HOLDER = "NON PRIME DIVISION" → route to AB | STURGEON DODGE; "STURGEON DODGE" → allowed
- Stock-in tags: bottom-right windshield, white, created by Jorja/Giselle and handed to lot team
- Sold sign: upstairs with Sharpies, written with customer name, placed immediately on sale
- Key Cafe: mandatory log, no peer-to-peer transfers
- Penalties: dealer plate $500, key tag $25, keys ~50% replacement
- Ship mode: battery disconnected → must reconnect + software reset + PDI before ANY other step
- DHD is the only detailing vendor
- Staff parking: street only, zero exceptions including managers

---

Create all 25 files using the decision tree format from CLAUDE.md. File-by-file instructions:

**1. vehicle-arrival-new-standard.md**
Scenario: A new vehicle (not in ship mode) arrives at the Edmonton Office lot.
Cover: initial check (is it ship mode? → NO in this tree), non-prime check (Airtable STOCK HOLDER), system status entry (Pending PDI — NEVER "recon"), notification to service for PDI scheduling, PDI 2-day window start, post-PDI routing to DHD for detail, post-detail tagging (stock-in tag, bottom-right windshield), placement in Cage.

**2. vehicle-arrival-ship-mode.md**
Scenario: A new vehicle arrives with battery disconnected (ship mode).
Cover: battery reconnection step, software reset step, confirm ship mode cleared, THEN route to PDI (mandatory — cannot skip), note that 2-day PDI window starts from delivery date not from when ship mode is cleared, post-PDI routing. Include the consequence of skipping (car died next day, tow back, rework).

**3. vehicle-arrival-dealer-trade.md**
Scenario: A vehicle arrives as a dealer trade from another dealer.
Cover: what "dealer trade" means, immediate routing to Legal/Service for final PDI + detail, what to do if sales says "it's good to go" (push back with Stellantis compliance language), 2-day PDI window, post-PDI routing, placement.

**4. vehicle-pdi-routing.md**
Scenario: A vehicle is ready to be routed for PDI.
Cover: who performs PDI (service technician), who marks it complete (same technician, in manufacturer system), what "PDI complete" means operationally, what happens if technician is unavailable, what happens if PDI reveals mechanical issues (→ route to West Side of Building as RECON), post-PDI-complete routing.

**5. vehicle-pdi-compliance-deadline.md**
Scenario: Tracking whether the 2-day Stellantis PDI window will be met.
Cover: when the clock starts (delivery date to dealership), who is responsible for monitoring, what to do if Day 1 passes with no PDI (escalate to service department lead), what to do if Day 2 arrives with no PDI (immediate escalation, explain financial consequences — fines, docking), what to do when PDI is completed (confirm technician has marked it in system), current compliance context (80%, entering red zone).

**6. vehicle-detailing-routing.md**
Scenario: A vehicle needs detailing.
Cover: trigger (PDI complete), vendor (DHD, $60/vehicle full detail), what lot team communicates to DHD, what to check when vehicle is returned from DHD (clean, no stickers, no tape), what if returned vehicle is not acceptably clean (return to DHD — do not accept substandard work), post-detail step (stock-in tag placement), post-detail step (placement in Cage).

**7. vehicle-categorization.md**
Scenario: Determining which category a vehicle belongs to for placement purposes.
Cover: category definitions — NEW (KM ≤ 1,000 regardless of status), FLR (AVAILABLE or DEMO), SOLD (SIGNED DEAL or WHOLESALE|SOLD), BND (BOOKED|NOT DELIVERED), RECON (IN RECON, INCOMING, WHOLESALE, CHASE); override logic — a NEW vehicle with BND status → final category is BND; a NEW vehicle with SIGNED DEAL → final category is SOLD; a NEW vehicle with IN RECON → final category is RECON; non-prime check (STOCK HOLDER field).

**8. vehicle-placement-cage.md**
Scenario: Placing a vehicle in the Cage (front-line display).
Cover: slot priority rules — C01 (Compass or Wrangler, NEW only), C02–C03 (NEW SUV non-Durango, fallback VAN or TRUCK), C04–C07 (remaining NEW), C12–C13 (trucks preferred, NEW or FLR), C08–C11 / C14–C20 (remaining NEW + FLR); what to do when Cage is full (place in Overflow Temporary, annotate with destination = Cage); brand sort order (Jeep → Ram → Chrysler → Dodge → others); body type sort within brand tier (SUV → Van → Truck → Sedan); sedans overflow first; facing direction (outward); spacing (doors must open); stock-in tag must be present.

**9. vehicle-sold-processing.md**
Scenario: A vehicle has just been sold.
Cover: immediate actions — sold sign placed immediately with customer name written on it (Sharpies upstairs); vehicle moved to East Side Fence Line; what if East Side Fence Line is full (move to West Side of Building SOLD overflow, then Overflow Temporary if still no room); trade-in coordination (if trade-in involved → SEE: vehicle-trade-in-processing.md); delivery timing communication with lot team.

**10. vehicle-trade-in-processing.md**
Scenario: A trade-in vehicle is received from a customer.
Cover: trade-in banner placement (immediately on receipt); condition assessment — if detail needed → route to DHD; if mechanical work needed → route to West Side of Building as RECON; if auction-bound → route to auction area; if front-line ready → process through standard detail + PDI flow; non-prime check (STOCK HOLDER).

**11. vehicle-customer-on-lot.md**
Scenario: A customer's personal vehicle is on the lot (for service, waiting for pickup, etc.).
Cover: sign placement immediately ("Customer's car, picking up [date]"); where to park (sold row / East Side Fence Line, or designated customer area if available); who is responsible for ensuring sign is placed; what to do if sign is missing and vehicle is unknown → SEE: vehicle-status-unknown.md.

**12. vehicle-bnd-handling.md**
Scenario: A vehicle has status Booked Not Delivered — deal in progress, not yet physically delivered.
Cover: placement (East Side Fence Line if space, West Side of Building overflow if Fence full); signage requirement (sold sign with customer name); what triggers BND status → what triggers exit from BND (physical delivery to customer); communication with sales team about delivery timeline.

**13. vehicle-recon-routing.md**
Scenario: A vehicle needs reconditioning (mechanical work).
Cover: what qualifies as RECON vs. what is just detailing; placement (West Side of Building); system status = IN RECON; who authorizes RECON work (service department); PDI overlap — if PDI reveals recon work needed, vehicle stays in West Side of Building until complete; re-routing after recon complete (→ detail → Cage).

**14. vehicle-auction-routing.md**
Scenario: A vehicle is being routed to auction.
Cover: what determines auction-bound status; placement (auction area — NOT Cage, NOT East Side Fence Line, NOT West Side of Building); signage; what to do if vehicle is mistakenly placed in front of auction area (identify + move immediately).

**15. vehicle-non-prime-identification.md**
Scenario: A vehicle on the lot may be non-prime.
Cover: how to identify (check Airtable STOCK HOLDER column); STOCK HOLDER = "NON PRIME DIVISION" → vehicle must leave this lot immediately → route to Legal (STOCK LOCATION: AB | STURGEON DODGE), notify Sales Manager; STOCK HOLDER = "STURGEON DODGE" → vehicle is allowed, continue normal processing.

**16. vehicle-seasonal-power-sport.md**
Scenario: A power sport delivery, boat delivery, or Hysen unit arrives.
Cover: correct placement (Power Sport / Quad Corner — dead space where regular vehicles cannot park); what time of year Hysen units arrive (post-snow-melt, seasonal); what is prohibited in this zone (retail vehicles under any circumstances); last usable position in the zone (edge position where you can still get out).

**17. vehicle-status-unknown.md**
Scenario: A vehicle is on the lot and nobody knows what it is (inventory, sold, trade-in, or customer).
Cover: investigation steps — check Airtable by VIN/plate, ask sales manager, check Key Cafe log; possible outcomes — vehicle is inventory (place stock-in tag, route correctly), vehicle is sold (place sold sign, move to East Side Fence Line), vehicle is trade-in (place trade-in banner, assess condition), vehicle is customer vehicle (place customer sign, notify relevant salesperson), vehicle is non-prime (→ SEE: vehicle-non-prime-identification.md); what if all investigation steps fail → escalate to General Manager immediately. Reference the Kia incident (6 weeks with no identification) as the canonical reason this tree exists.

**18. key-plate-sign-out.md**
Scenario: An employee needs to sign out a key or dealer plate.
Cover: go to Key Cafe only — no exceptions; log transaction (employee name + timestamp); what if requested item is signed out to someone else (do not ask that person for it — wait for it to be checked back in, or contact that person to check it in through Key Cafe); accountability agreement must be signed before any sign-out is permitted.

**19. key-plate-sign-in.md**
Scenario: An employee returns a key or dealer plate.
Cover: return to Key Cafe only — no peer-to-peer handoffs; log transaction (employee name + timestamp); if someone tries to hand you their key/plate to return for them: "No — you need to check it in yourself through Key Cafe".

**20. key-plate-lost-response.md**
Scenario: A key, key tag, or dealer plate is reported lost.
Cover: identify who last signed it out (Key Cafe log); that employee is financially responsible — dealer plate $500, key tag $25, keys ~50% replacement; immediate steps (search vehicle, check common areas); if not found → formal notification to General Manager; financial deduction process; replacement/reprogram process; GPS key tag: $25 to reprogram — check GPS location before declaring lost.

**21. staff-parking-new-employee.md**
Scenario: A new employee has parked on the lot (first-time violation).
Cover: welcoming, respectful approach — never confrontational; exact language: "Hey, welcome aboard. All sales staff have to park on the street — we have limited space, there's landlord parking, and big trucks come through during the day. It's standard for everyone here."; no blame, no confrontation; direct them to street parking; note this in team chat as a follow-up reminder only (not as a disciplinary note for first offense).

**22. staff-parking-repeat-violation.md**
Scenario: A known employee (including managers) parks on the lot after having been told the rule.
Cover: same rule applies to everyone — Kevin (Sales Manager), management, anyone; direct, matter-of-fact approach (not aggressive, not passive); reference that the GM personally parked on the street and walked a block when lot was blocked; if repeat after direct conversation → escalate to Sales Manager → escalate to General Manager; document in team chat.

**23. sold-sign-missing-enforcement.md**
Scenario: A sold vehicle on the lot has no sold sign.
Cover: who is responsible for noticing (lot team during morning walk or ongoing policing); who is responsible for fixing (sales team — salesperson or Sales Manager); 3-strike protocol:
- Strike 1 (first notice): "Hey [Name], do you mind getting your guys to put a sold sign in [vehicle]?"
- Strike 2 (after reasonable time with no action): "Hey [Name], do you mind?" (slightly more emphasis, same polite tone)
- Strike 3 (still not done): "[Name], killing me, buddy. Can you just tell me the stuff and I'll do it, because we have to be organized."
- Expected outcome at Strike 3: self-correction — "No, no, buddy, I'm coming down myself."
Supplies location (upstairs with Sharpies). What to write on sign (customer name). What if salesperson cannot be reached → lot team places sign after confirming customer name with Sales Manager.

**24. morning-lot-walk.md**
Scenario: Executing the mandatory daily morning lot walk.
Cover: timing (after arriving + handling immediate fires, ~30 min into day); duration (~30 min); physical walk of all zones in order; per-vehicle checks: status matches zone, signage present and correct, cleanliness acceptable, facing outward, adequate spacing (doors open), stock-in tag in place (bottom-right windshield), no unauthorized personal vehicles, no compliance gaps (PDI overdue, detail needed); task list generation after walk; documentation in team chat; routing tasks to correct teams (vehicles to service, sold signs to sales, etc.).

**25. accountability-agreement-onboarding.md**
Scenario: Onboarding a new employee who needs access to keys and dealer plates.
Cover: accountability agreement must be signed before any key/plate access; what the agreement covers (financial responsibility for lost items, Key Cafe compliance, custody chain requirements); without signing = cannot take a plate, cannot drive a dealership vehicle, cannot continue employment; Key Cafe training during onboarding.

---

After creating all 25 files, write a Phase 3 Completion Report following the template in CLAUDE.md.
```

---

### META-PROMPT — PHASE 4: SOP GENERATION

```
Read CLAUDE.md and EXECUTION_PLAN.md before starting.

Read all files in knowledge/ and all 25 files in systems-analysis/decision-trees/.

Your task is to create 5 SOP files in sops/. Each SOP must:
- Reference decision trees by filename for all branching scenarios (do not inline full trees into SOPs)
- Be written for the specific audience of each team SOP (team SOPs are self-contained — that team's members should not need to read other team SOPs to do their job)
- Use role titles as primary identifiers (names in parentheses where confirmed — all names currently [AMBIGUOUS] except Jorja and Giselle for admin roles)
- Contain zero ambiguous instructions
- State penalties explicitly where relevant
- Include communication templates (what to say, to whom, on what channel)

ZONE NAMES: Cage, East Side Fence Line, West Side of Building, Overflow (Temporary)

---

**1. sops/master-sop.md — Master Standard Operating Procedure**

Structure:
1. Purpose and Scope (Edmonton Office lot only)
2. Zone Map and Rules (all 7 zones: Cage, East Side Fence Line, West Side of Building, Overflow Temporary, Power Sport/Quad Corner, Auction Area, Staff Parking)
3. Vehicle Lifecycle (all states and transitions — reference knowledge/vehicle-statuses-and-transitions.md)
4. Lot Placement Rules (summary — full detail in knowledge/lot-placement-rules.md)
5. Signage Standards (all 4 signage types + stock-in tags)
6. Key Cafe Protocol (full protocol — this section may not be shortened; accountability is non-negotiable)
7. PDI Compliance (Stellantis 2-day window, current 80% compliance, consequences)
8. Daily Operations Overview (morning walk → ongoing policing → task routing)
9. Escalation Protocol (3-strike system with exact language)
10. Financial Penalties (all penalties table)
11. Cross-Reference Index (links to all 25 decision trees by scenario name)

**2. sops/team-lot.md — Lot Team SOP**

Audience: Lot attendants / lot team staff
Include only: what lot team does, when, how, and who to contact
Sections:
- Morning lot walk (how to execute — reference decision-trees/morning-lot-walk.md)
- Vehicle arrival processing (ship mode, standard, dealer trade — reference relevant trees)
- Stock-in tag placement (process, position, who gives them the tags)
- Vehicle movement and placement (Cage rules, zone placement, facing direction, spacing)
- Signage duties (placing sold signs when requested, trade-in banners, customer signs)
- Key Cafe responsibilities (sign-out/sign-in, accountability agreement, no peer-to-peer)
- Detailing coordination (routing to DHD, checking returned vehicles)
- Reporting issues (team chat, escalation to Sales Manager for sold signs)
- What lot team does NOT do (does not perform PDI, does not make sales decisions)

**3. sops/team-sales.md — Sales Team SOP**

Audience: Sales staff and Sales Manager
Include only: what sales team does regarding lot operations
Sections:
- Sold sign responsibility (immediate placement when vehicle is sold — supplies upstairs, Sharpies, customer name)
- Vehicle status communication (communicating delivery dates/times to lot team)
- PDI cooperation (never telling lot team to skip PDI — exact pushback language if they try: "Stellantis requires final PDI within 2 days. We're at 80% compliance, in the red zone.")
- Staff parking (street only — no exceptions including Sales Manager)
- Trade-in handoff (communicating trade-in vehicle details to lot team)
- BND vehicle communication (communicating expected delivery date when deal is signed)
- Accountability agreement (required before any key/plate access)

**4. sops/team-service.md — Service Department SOP**

Audience: Service department staff (leads, foreman, technicians — all roles [AMBIGUOUS] by name)
Include only: service department's lot-facing responsibilities
Sections:
- PDI execution (who performs, what "PDI complete" means, how to mark complete in manufacturer system, 2-day window)
- PDI compliance monitoring (technician responsibility to complete and log within 2 days)
- Dealer trade PDI (same 2-day window, even if sales says it's good)
- Internal vehicle work (all internal work — PDIs, inspections — routed here to justify $3,000/day overhead)
- Detailing coordination (service routes vehicles to/from DHD)
- PDI failure routing (if PDI reveals mechanical issues → vehicle stays in West Side of Building as RECON)
- Communication with lot team (when PDI is complete → notify lot team immediately for tagging + placement)
- Admin tag duties (Giselle's dual role: stock-in tag creation for vehicles + service work)

**5. sops/team-management.md — Management SOP**

Audience: General Manager, Lot Manager, Sales Manager
Include only: management's operational duties and enforcement responsibilities
Sections:
- Daily oversight responsibilities (morning lot walk is mandatory for lot manager; Sales Manager ensures sold signs)
- Enforcement philosophy ("inspect what you expect" — daily consistent enforcement, not one-time announcements)
- 3-strike escalation (management is both the enforcer and the recipient of escalation at Strike 3)
- Staff vehicle inventory (compile and maintain list of all staff vehicles: name, make, model, plate)
- Financial accountability (penalties are enforced — confirmed precedents; accountability agreements are mandatory)
- PDI compliance ownership (management owns the 80% → 100% recovery; escalate to service lead if Day 1 passes)
- Non-prime vehicle response (if Division One / non-prime vehicle appears → notify General Manager → route to AB | STURGEON DODGE)
- New employee onboarding protocol (welcoming approach, rules explained with context on Day 1)
- Key Cafe oversight (all employees signed on agreement, logs reviewed if item is lost)

---

After creating all 5 files, write a Phase 4 Completion Report following the template in CLAUDE.md.
```

---

### META-PROMPT — PHASE 5: CHECKLISTS

```
Read CLAUDE.md and EXECUTION_PLAN.md before starting.

Read all 5 files in sops/ and these knowledge files:
- knowledge/vehicle-statuses-and-transitions.md
- knowledge/signage-and-tagging-standards.md
- knowledge/compliance-requirements.md
- knowledge/key-cafe-protocol.md
- knowledge/zone-definitions.md

Your task is to create 8 checklist files in checklists/. All checklist items must be binary — Yes or No only. No subjective assessments (e.g., do not write "Is the car clean enough?" — write "Is the vehicle free of visible dirt, dust, and debris on all exterior panels? Yes / No"). Each checklist must include a Failure Action for every item that can fail — the exact step to take if the answer is No.

---

**1. checklists/vehicle-audit-new.md — NEW Vehicle Audit Checklist**
For: vehicles with category NEW (KM ≤ 1,000), not yet on front line
Items to check:
- Is ship mode cleared? (battery reconnected, software reset performed) Yes / No → Failure: reconnect battery, perform software reset, schedule PDI
- Is PDI scheduled or complete? Yes / No → Failure: route to service department immediately; note 2-day Stellantis window
- Is the system status "Pending PDI" (not "Recon")? Yes / No → Failure: correct system status to Pending PDI
- Is the stock-in tag filled out and placed in bottom-right windshield? Yes / No → Failure: request tag from Jorja or Giselle, place in bottom-right windshield
- Are all stickers removed? Yes / No → Failure: remove all manufacturer/transport stickers
- Is all tape removed? Yes / No → Failure: remove all tape
- Is the vehicle clean? Yes / No → Failure: route to DHD for full detail ($60)

**2. checklists/vehicle-audit-flr.md — Front-Line Ready (FLR) Vehicle Audit Checklist**
For: vehicles with category FLR (AVAILABLE or DEMO) currently in or being placed in the Cage
Items to check:
- Is PDI complete (marked in manufacturer system)? Yes / No → Failure: route to service department; do not place on front line until complete
- Is the vehicle fully detailed (clean, no dirt/debris on all exterior panels)? Yes / No → Failure: route to DHD
- Are all stickers removed? Yes / No → Failure: remove all stickers
- Is all tape removed? Yes / No → Failure: remove all tape
- Is the stock-in tag present in the bottom-right corner of the windshield? Yes / No → Failure: request tag from Jorja or Giselle, place correctly
- Is the vehicle facing outward? Yes / No → Failure: reposition vehicle to face outward
- Is there adequate spacing on both sides (can doors fully open)? Yes / No → Failure: reposition vehicle
- Is the vehicle in the correct Cage slot per placement rules? Yes / No → Failure: move to correct slot per vehicle-placement-cage.md decision tree

**3. checklists/vehicle-audit-sold.md — Sold Vehicle Audit Checklist**
For: vehicles with category SOLD (SIGNED DEAL or WHOLESALE|SOLD)
Items to check:
- Is a sold sign present with the customer's name written on it? Yes / No → Failure: get sold sign from upstairs (Sharpies available), write customer name, place in vehicle; if customer name unknown → contact Sales Manager immediately
- Is the vehicle parked in the East Side Fence Line or West Side of Building (not on front line / Cage)? Yes / No → Failure: move vehicle to East Side Fence Line; if Fence full → West Side of Building; if both full → Overflow Temporary
- Is PDI complete before delivery? Yes / No → Failure: do NOT deliver vehicle; route to service department; Stellantis 2-day window applies

**4. checklists/vehicle-audit-bnd.md — Booked Not Delivered (BND) Vehicle Audit Checklist**
For: vehicles with category BND (BOOKED|NOT DELIVERED)
Items to check:
- Is a sold sign present with the customer's name? Yes / No → Failure: same as sold vehicle — get sign upstairs, write name
- Is the vehicle parked in the East Side Fence Line or West Side of Building? Yes / No → Failure: move to East Side Fence Line; if full → West Side of Building
- Is the expected delivery date communicated to the lot team? Yes / No → Failure: contact Sales Manager for delivery timeline, document in team chat
- Is PDI complete? Yes / No → Failure: route to service; do not deliver until PDI is marked complete in system

**5. checklists/vehicle-audit-recon.md — Recon Vehicle Audit Checklist**
For: vehicles with category RECON (IN RECON, INCOMING, WHOLESALE, CHASE)
Items to check:
- Is the system status correct (IN RECON — NOT "Pending PDI" unless it is a new arrival)? Yes / No → Failure: correct system status
- Is the vehicle parked in the West Side of Building? Yes / No → Failure: move to West Side of Building
- Is there a stock-in tag on the vehicle? Yes / No → Failure: request from Jorja or Giselle, place on windshield
- Is there an active work order or recon task assigned? Yes / No → Failure: contact Service Department Lead to assign work order
- If recon is complete — is PDI and detail also complete before moving to front line? Yes / No → Failure: do not move to Cage until PDI and detail are both confirmed complete

**6. checklists/morning-lot-walk-checklist.md — Morning Lot Walk Checklist**
For: Lot Manager / management, executed every morning ~30 min after arriving
Structure: zone-by-zone walk with per-vehicle spot-checks and lot-level checks
Lot-level checks (before starting zone walk):
- Are there any staff vehicles parked on the lot? Yes / No → Failure: approach driver, direct to street parking (new employee: welcoming approach; repeat: matter-of-fact)
- Is the staff vehicle list up to date? Yes / No → Failure: update list (name, make, model, plate for all staff)
Zone-by-zone: for each zone (Cage, East Side Fence Line, West Side of Building, Overflow Temporary, Auction Area, Power Sport Corner), check:
- Is every vehicle in this zone appropriately categorized for this zone? Yes / No → Failure: move to correct zone per relevant decision tree
- Does every vehicle have the correct signage for its status? Yes / No → Failure: route sign placement task to appropriate team via team chat
- Is every vehicle's stock-in tag present and correctly placed? Yes / No → Failure: request tag from Jorja/Giselle
- Are all Cage vehicles PDI'd and detailed? Yes / No → Failure: remove from Cage, route to service or DHD
- Are all Cage slots filled (max 1 empty permitted)? Yes / No → Failure: identify next vehicle to fill gap, run placement
Output of walk: task list documented in team chat, routed to responsible teams

**7. checklists/pdi-completion-checklist.md — PDI Compliance Checklist**
For: tracking PDI completion for all vehicles on the lot
Structure: per-vehicle tracking table
For each vehicle:
- Date of arrival at Edmonton Office lot: [date]
- PDI deadline (arrival date + 2 days): [date]
- PDI status in manufacturer system: Pending / In Progress / Complete
- Today's date vs. deadline: On Time / Day 1 Overdue / Day 2+ Overdue (CRITICAL)
Actions by status:
- On Time: no action required — monitor
- Day 1 Overdue: notify Service Department Lead — "PDI for [VIN] is now overdue by 1 day. Stellantis compliance window has passed. Please prioritize."
- Day 2+ Overdue (CRITICAL): immediate escalation to General Manager — fines and docking risk

**8. checklists/key-plate-accountability-checklist.md — Key and Plate Accountability Checklist**
For: any time a key or dealer plate is signed out or in; also for periodic audits
Sign-out checks:
- Is the employee's accountability agreement on file? Yes / No → Failure: stop — do not issue key/plate until agreement is signed
- Is the item being signed out through Key Cafe (not peer-to-peer)? Yes / No → Failure: direct employee to Key Cafe; if someone is trying to hand you an item → redirect them to check in through Key Cafe themselves
- Is the transaction logged with employee name and timestamp? Yes / No → Failure: log before releasing item
Sign-in checks:
- Is the item being returned to Key Cafe directly (not handed to a coworker)? Yes / No → Failure: redirect to Key Cafe
- Is the return transaction logged? Yes / No → Failure: log before item is placed back
Periodic audit checks (use at start of each day or when an item cannot be located):
- Does Key Cafe log show all items currently signed out? Yes / No → Failure: reconcile log
- Are all GPS key tags physically attached to their key sets? Yes / No → Failure: locate tag; if lost → initiate key-plate-lost-response.md process

---

After creating all 8 files, write a Phase 5 Completion Report following the template in CLAUDE.md.
```

---

### META-PROMPT — PHASE 6: APP SPECIFICATION

```
Read CLAUDE.md and EXECUTION_PLAN.md before starting.

Read all 8 files in checklists/ and all 25 files in systems-analysis/decision-trees/.

Your task is to create one product requirements document: app-spec/lot-checklist-app-requirements.md

This is a NON-TECHNICAL product requirements document. It describes what the app needs to do, who uses it, and what each feature should accomplish. It does NOT include code, API design, database schemas, or technical architecture. It is suitable to hand to a product manager or developer as a briefing document.

The app is NOT a Telegram bot. It is a separate standalone app (web or mobile — to be decided).
The existing automated placement engine (n8n/Airtable/Google Sheets) is a separate system. This app is for the physical lot audit and task workflow only.

---

Document structure:

**1. Product Purpose**
What problem this app solves (decision fatigue, missing checklists, lack of accountability trail), who uses it (lot team, management), and what the expected outcome is (full lot compliance achievable by any staff member following app instructions alone).

**2. User Roles**
- Lot Attendant: executes checklist items, marks tasks complete, flags issues
- Lot Manager / Management: reviews results, sees task list, monitors compliance
- Admin (Jorja, Giselle): no app interaction required (their role is physical tag creation)

**3. Phase 1 — Manual Checklist Mode (MVP)**
Core user flow:
- Open app → Select "Start Lot Audit"
- Walk to first vehicle → Input VIN (manual entry or scan)
- App shows vehicle's known status (from Airtable if connected, or manual selection)
- App displays checklist for that vehicle's category (NEW, FLR, SOLD, BND, RECON)
- User taps Yes / No for each item
- For each No: app shows the Failure Action (exact step to take)
- User marks action as complete or flags as "Needs Follow-Up"
- Proceed to next vehicle
- After all vehicles audited → tap "Generate Task List"
- App outputs: list of all outstanding tasks, grouped by responsible team (Lot, Sales, Service)
- Task list can be shared via team chat

**4. Phase 2 — Decision Tree Integration**
For each checklist item that requires a decision (not just a binary fix):
- Small "?" button next to the item opens a decision tree dropdown
- Decision tree shows only the current step (not the full tree)
- At each step: next action clearly shown
- User can tap "Next Step" to advance through the tree
- Tree always terminates in a specific action — user cannot get stuck in an undefined state
- "Common Issues" button available on each step

**5. Feature List (prioritized)**
P1 (must have for MVP):
- VIN lookup / manual entry
- Status-based checklist display (5 checklists matching the 5 audit checklists)
- Yes/No binary responses only
- Failure action displayed for every No response
- Task list generation from audit results
- Task list export / share

P2 (after MVP):
- Decision tree drill-down per checklist item
- Airtable integration for live vehicle status
- Task assignment to team (lot, sales, service)
- Completion tracking per task
- Historical audit log

P3 (future):
- Manager dashboard (lot compliance score, overdue tasks, PDI deadline tracking)
- Notification when PDI deadline is approaching (Day 1 warning, Day 2 critical)
- Stock-in tag generation workflow integration

**6. Key Constraints**
- All checklist criteria must match the checklists/ files exactly — no divergence
- App must work without internet connection for the audit walk (sync when connected)
- Zero ambiguity requirement: every decision tree path in the app must terminate in a defined action
- App must not replace Key Cafe — key/plate accountability is handled by Key Cafe only

**7. Out of Scope**
- Telegram bot integration
- Automated vehicle placement (handled by existing n8n system)
- Customer-facing features
- Financial penalty tracking (handled separately)

---

After creating the file, write a Phase 6 Completion Report following the template in CLAUDE.md.
```

---

### META-PROMPT — PHASE 7: DOCUMENT GENERATION

```
Read CLAUDE.md and EXECUTION_PLAN.md before starting.

Read all files in sops/ and checklists/.

Your task is to produce 7 formatted output documents in outputs/. These documents are formatted for distribution to staff. Apply consistent structure and professional formatting.

For each output, format the Markdown source into a clean, distribution-ready document:
- Title page (document title, date, version: 1.0, scope: Edmonton Office)
- Table of contents (auto-linked to sections)
- Consistent heading hierarchy
- Tables where data is tabular
- Bold for all critical rules (penalties, non-negotiable standards, compliance requirements)
- Callout blocks for "NEVER DO THIS" rules
- Cross-reference links to decision trees (by filename)

Documents to generate:
1. outputs/master-sop.docx — from sops/master-sop.md
2. outputs/team-lot.docx — from sops/team-lot.md
3. outputs/team-sales.docx — from sops/team-sales.md
4. outputs/team-service.docx — from sops/team-service.md
5. outputs/team-management.docx — from sops/team-management.md
6. outputs/vehicle-audit-checklists.docx — combined from all 5 vehicle-audit-*.md files, one checklist per section
7. outputs/operational-checklists.docx — from morning-lot-walk-checklist.md, pdi-completion-checklist.md, key-plate-accountability-checklist.md

Note: If .docx generation is not available in this environment, generate fully-formatted Markdown files with .md extension and note the format in the Phase 7 Completion Report.

After creating all 7 files, write a Phase 7 Completion Report following the template in CLAUDE.md.
```

---

## Section 5: Agentic Workflow

### Orchestration Pattern (Each Session)
```
READ CLAUDE.md
READ EXECUTION_PLAN.md
READ prior phase outputs (as specified in the phase's meta-prompt)
EXECUTE meta-prompt for current phase
VALIDATE outputs against quality gates in CLAUDE.md
GENERATE completion report
WAIT — do not start next phase without explicit user approval
```

### Session Management
| Phase | Estimated Session Size | Notes |
|---|---|---|
| Phase 1 | 1 session | Heavy reading (2 source docs); 12 file writes |
| Phase 2 | 1 session | Light reading (12 files); 3 file writes |
| Phase 3 | 1–2 sessions | 25 file writes — may need to split at tree 13 if context fills |
| Phase 4 | 1 session | 5 file writes — each SOP is large |
| Phase 5 | 1 session | 8 file writes |
| Phase 6 | 1 session | 1 file write |
| Phase 7 | 1 session | 7 file writes + formatting |

### Phase 3 Split Protocol (if needed)
If context fills during Phase 3, split at the natural midpoint:
- Session 3A: trees 1–13 (vehicle lifecycle trees)
- Session 3B: trees 14–25 (operational/personnel/compliance trees)

### Between-Session Handoff
At the end of each session, the Completion Report (written to the relevant output directory as `_PHASE_N_REPORT.md`) serves as the handoff document. The next session reads it to understand what was completed, what was marked [NEEDS_INPUT], and what outstanding issues exist.

### Validation Checkpoints
| Phase | Pass Criteria |
|---|---|
| Phase 1 | All 12 knowledge files exist; no invented facts; all [AMBIGUOUS] items tagged |
| Phase 2 | Kia incident and ship mode failure appear in failure-modes.md; financial impact table populated |
| Phase 3 | All 25 tree files exist; every branch terminates in a defined action; no "use judgment" endings |
| Phase 4 | All 5 SOP files exist; team SOPs are self-contained; master SOP has complete cross-reference index |
| Phase 5 | All 8 checklists exist; all items are binary Yes/No; every No has a Failure Action |
| Phase 6 | App spec exists; no technical architecture (PRD only); matches checklists exactly |
| Phase 7 | All 7 output files exist; consistent formatting applied |

---

## Section 6: Quick-Start Command

Paste the following into a fresh Claude Code session to initialize the project and begin Phase 1:

```
I need you to execute Phase 1 of a multi-phase SOP project for a car dealership.

First, read these two files in full:
- CLAUDE.md
- EXECUTION_PLAN.md

Then execute the Phase 1 meta-prompt exactly as written in Section 4 of EXECUTION_PLAN.md.

Source documents are in the same directory:
- context-lot-walkthrough.md
- LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md

Do not skip any file. Do not invent any information. Tag all ambiguities with [AMBIGUOUS] or [NEEDS_INPUT] as defined in CLAUDE.md. When Phase 1 is complete, write a completion report and stop — do not begin Phase 2 without explicit instruction.
```
