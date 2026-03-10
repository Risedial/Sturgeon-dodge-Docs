# Product Requirements Document: Lot Checklist App
**Project:** Sturgeon Dodge Edmonton Office — Lot Operations
**Document type:** Non-technical product requirements
**Status:** [DRAFT]
**Date:** 2026-03-09

---

## Section 1: Product Purpose

### Problem This App Solves

The Edmonton Office lot currently relies on paper-based and verbal processes for vehicle audits, morning lot walks, PDI tracking, and key/plate accountability checks. This creates four compounding problems:

1. **Decision fatigue during lot audits.** When a lot attendant finds a compliance failure — a missing sold sign, a vehicle in the wrong zone, a missing stock-in tag — they must recall the correct response from memory. Memory fails under pressure. The result is deferred action, inconsistent responses, and compliance gaps.

2. **No accountability trail for lot checks.** When a vehicle audit or morning walk is completed verbally or on paper, there is no record of who checked what, when, and what issues were found. Without this trail, there is no way to know whether the walk happened, whether issues were identified, or whether corrective actions were taken.

3. **Difficulty generating and routing task lists.** After the morning lot walk, the Lot Manager must manually compile a task list from issues identified across all zones and route each task to the correct team (Lot, Sales, Service). This takes time, introduces errors, and the resulting list is often incomplete.

4. **Staff uncertainty about what to do when a checklist item fails.** When a less-experienced lot attendant finds a non-compliant vehicle, they frequently do not know the exact required action: who to contact, what to say, on what channel, and what the consequence of inaction is. The correct response currently lives in SOP documents that are not accessible during a physical lot walk.

### Who Uses This App

**Lot Attendants** execute the app during vehicle audits and the morning lot walk. They check vehicles one item at a time, record Yes or No, and read the required Failure Action when a No is recorded.

**Lot Manager / Management** reviews completed audit results, monitors PDI compliance status, tracks outstanding tasks, and assigns follow-up items to teams.

**Admin (Jorja)** do not use this app. Their function — creating physical stock-in tags — is not digitized by this product.

### Expected Outcome

Any staff member who can operate a smartphone should be able to use this app to conduct a fully compliant vehicle audit or morning lot walk without needing to recall SOP content from memory or consult any other document. The app is the checklist and the decision guide made interactive — it is not a shortcut, it is the process.

---

## Section 2: User Roles

### Role 1: Lot Attendant

**Primary user during lot walk and vehicle audits.**

Capabilities:
- Opens the app and starts a lot audit or vehicle audit
- Progresses through checklist items one at a time — cannot skip items
- Taps YES or NO for each checklist item
- For each NO: reads the displayed Failure Action and executes it
- Taps "Done — action complete" when the required Failure Action has been completed
- Taps "Needs Follow-Up" when the Failure Action cannot be completed immediately (e.g., the required person is unavailable)
- Cannot view other users' audit results or management dashboards

**Restrictions:**
- Cannot skip checklist items
- Cannot modify checklist content
- Cannot assign tasks to team members (Phase 2 feature)

---

### Role 2: Lot Manager / Management

**Reviews audit results and manages outstanding tasks.**

Capabilities:
- All Lot Attendant capabilities
- Views completed audit results for any audit session
- Sees the auto-generated task list from each completed audit
- Monitors PDI compliance status across all vehicles currently requiring PDI
- Assigns follow-up items to teams (Phase 2 feature)
- Views historical audit results (Phase 2 feature)

---

### Role 3: Admin (Jorja)

**No app interaction required.**

The Admin role is responsible for filling out physical stock-in tags and handing them to the lot team for placement. This function is not digitized by this app. The app may surface a checklist item referencing the need for a stock-in tag, but it does not replace the physical tag or the Admin's role in creating it.

---

## Section 3: Phase 1 — Manual Checklist Mode (MVP)

This is the core product. Everything in this section must be built before Phase 2 work begins.

---

### User Flow — Step by Step

**Step 1: Open app → tap "Start Lot Audit"**

The user opens the app and taps the primary action button. No login friction for field use — if authentication is required, it must complete in one step before the audit begins.

---

**Step 2: Select audit type**

The user selects one of four audit types:

| Audit Type | Description | Who Uses It |
|---|---|---|
| Vehicle Audit | For a specific vehicle — select by VIN and category | Lot Attendant, Lot Manager |
| Morning Lot Walk | Full zone-by-zone walk of all 7 zones | Lot Manager |
| PDI Compliance Review | Track PDI completion status for all pending vehicles | Lot Manager |
| Key/Plate Accountability Check | Sign-out checks, sign-in checks, or periodic audit | Lot Manager, anyone handling Key Cafe transactions |

Each audit type launches a different checklist flow. The four types are entirely separate — the user does not combine them in a single session.

---

**Step 3 (Vehicle Audit only): Enter VIN**

After selecting Vehicle Audit, the user enters the VIN for the vehicle being audited.

- **Primary method in MVP:** Manual text entry — user types the VIN
- **Optional enhancement (Phase 2):** Barcode or QR code scan to populate VIN automatically

The VIN field must accept standard 17-character alphanumeric VINs. No validation beyond format is required in MVP (live Airtable lookup is Phase 2).

---

**Step 4 (Vehicle Audit only): Select vehicle status category**

After entering the VIN, the user selects the vehicle's current status category:

- **NEW** — vehicle with KM ≤ 1,000, not yet front-line ready
- **FLR** — Front-Line Ready; currently in or being placed in the Cage
- **SOLD** — active deal, signed; Airtable status SIGNED DEAL or WHOLESALE|SOLD
- **BND** — Booked Not Delivered; deal signed, customer has not taken possession
- **RECON** — vehicle in reconditioning; Airtable status IN RECON, INCOMING, WHOLESALE, or CHASE

In MVP, the user selects the category manually. In Phase 2, this field is auto-populated by an Airtable lookup using the VIN entered in Step 3.

---

**Step 5: App displays the checklist for the selected category or audit type**

The app displays checklist items in the exact order they appear in the corresponding source checklist file. Item text must match the checklist files exactly — no rewording, no summarization, no omitted items.

**Checklists displayed per audit type:**

| Audit Type / Category | Checklist File | Items |
|---|---|---|
| Vehicle Audit — NEW | vehicle-audit-new.md | 7 items |
| Vehicle Audit — FLR | vehicle-audit-flr.md | 8 items |
| Vehicle Audit — SOLD | vehicle-audit-sold.md | 3 items |
| Vehicle Audit — BND | vehicle-audit-bnd.md | 4 items |
| Vehicle Audit — RECON | vehicle-audit-recon.md | 6 items |
| Morning Lot Walk | morning-lot-walk-checklist.md | 15 items across 7 zones |
| PDI Compliance Review | pdi-completion-checklist.md | 1 item per vehicle tracked |
| Key/Plate Accountability | key-plate-accountability-checklist.md | 4 items (sign-out), 2 items (sign-in), 2 items (audit) |

The morning lot walk checklist is displayed with zone headers matching the zones in the source file (Lot-Level Checks, Cage, East Side Fence Line, West Side of Building, Overflow Temporary, Auction Area, Power Sport / Quad Corner, End of Walk). These headers are display groupings only — every item under every header must still be completed.

The Key/Plate Accountability audit launches with a sub-selection prompt: "What is the reason for this check?" The user selects one of: Sign-Out, Sign-In, or Periodic Audit. This determines which section(s) of the checklist are displayed.

---

**Step 6: For each checklist item, user taps YES or NO**

For each item displayed:

**If YES:** Item is marked complete. App advances to the next item automatically.

**If NO:** App immediately displays the **Failure Action** for that item — the exact text from the checklist file, including the responsible role, the required action, and the required communication (if applicable). The user reads the Failure Action and executes it. The user then taps one of two responses:
- **"Done — action complete"** — the Failure Action was executed; item is marked as resolved; app advances to the next item
- **"Needs Follow-Up"** — the Failure Action could not be completed immediately (e.g., required person unavailable, vehicle cannot be moved right now); item is flagged as outstanding; app advances to the next item

**Critical rule:** The app must not allow the user to advance past a NO item without tapping either "Done — action complete" or "Needs Follow-Up." The user cannot mark a NO item and skip it silently.

**Critical rule:** The app must not allow free-text responses to checklist items. Every response is YES or NO only (with the Failure Action sub-flow for NO responses). No comment fields, no partial answers, no "N/A" option.

---

**Step 7: After all items are answered — "Generate Task List" button appears**

When every item in the checklist has received a YES, "Done — action complete," or "Needs Follow-Up" response, the app displays a summary screen showing:
- Total items: [N]
- Items passed (YES): [N]
- Items resolved (Done — action complete): [N]
- Items flagged (Needs Follow-Up): [N]

A "Generate Task List" button appears on this screen. The button is always available — even if all items passed.

---

**Step 8: Task list is auto-generated**

Tapping "Generate Task List" produces a task list from the audit results. The task list includes one entry for every NO response (whether resolved or flagged as Needs Follow-Up).

**Task list format — each entry includes:**
- **Vehicle:** VIN and vehicle description (Year / Make / Model if available — in MVP, whatever was entered manually)
- **Zone / Location:** If the morning lot walk, the zone where the issue was found
- **Checklist item:** The exact checklist item that returned NO
- **Failure Action:** The exact Failure Action text for that item
- **Responsible team:** Lot, Sales, or Service (as specified in the checklist's Failure Action)
- **Status:** Resolved (Done — action complete) or Needs Follow-Up

**Task list is grouped by responsible team:** All Lot Team tasks appear together, all Sales Team tasks appear together, all Service Department tasks appear together. Within each group, tasks are listed in the order they were identified during the audit.

Items marked "Needs Follow-Up" are visually highlighted within their team group.

---

**Step 9: Task list is shareable**

After the task list is generated, the user sees a "Share Task List" button. Tapping it exports the task list as plain text formatted for posting in a team chat channel. One tap — no additional steps.

The exported text format:
```
LOT AUDIT — [Date] [Time] — [Audit Type] — [VIN if applicable]
Audited by: [User name/role]

--- LOT TEAM TASKS ---
[Task entries]

--- SALES TEAM TASKS ---
[Task entries]

--- SERVICE DEPARTMENT TASKS ---
[Task entries]

Items marked [FOLLOW-UP] require attention — action could not be completed during the walk.
```

---

### Offline Requirement

**The app must function without an internet connection during the lot walk.** All checklist content (item text, Failure Action text, zone groupings) must be available offline at all times. Data entered during the walk (responses, flags, task list) must be stored locally on the device and synced to the server when connectivity is restored.

An audit session must never fail, pause, or lose data because of a spotty or absent WiFi signal. Connectivity is required only for the sync after the audit is complete.

---

## Section 4: Phase 2 — Decision Tree Integration

Phase 2 builds on the completed MVP. No Phase 2 feature should be started until Phase 1 is fully deployed and validated in the field.

---

### Decision Tree Drill-Down

Several checklist items reference a decision tree for more complex scenarios. These references appear in the checklist files as `→ SEE: [filename].md`. In Phase 2, each such reference is surfaced in the app as an interactive Decision Guide.

**How it works:**

For each checklist item that contains a `→ SEE:` reference, a small "?" icon appears next to the item text. The "?" icon is visible whether or not the user tapped YES or NO.

Tapping "?" opens a **Decision Guide** panel. The Decision Guide presents the referenced decision tree interactively:
- One question is shown at a time
- The question is exactly as written in the decision tree file
- The user taps the applicable answer (the options are those defined in the tree — binary YES/NO or categorical)
- The next step appears based on the answer selected
- This continues until the tree reaches a terminal outcome
- The terminal outcome is displayed as the final step: a specific, named action the user must take

**Navigation within the Decision Guide:**
- A "Back" button is always available to return to the previous step in the tree
- A "Close" button is always available to exit the Decision Guide and return to the checklist item (the user's YES/NO response to the checklist item is preserved)
- The user cannot reach an undefined state — every path through every tree terminates in a specific action

**Decision trees embedded in Phase 2:**

The following trees are referenced by the checklist files and must be embedded in Phase 2:

| Checklist File | Tree Referenced | Filename |
|---|---|---|
| vehicle-audit-flr.md | Cage slot assignment | vehicle-placement-cage.md |
| vehicle-audit-sold.md | Sold sign enforcement | sold-sign-missing-enforcement.md |
| vehicle-audit-sold.md | PDI compliance deadline | vehicle-pdi-compliance-deadline.md |
| vehicle-audit-bnd.md | Sold sign enforcement | sold-sign-missing-enforcement.md |
| vehicle-audit-recon.md | Vehicle categorization | vehicle-categorization.md |
| vehicle-audit-recon.md | RECON routing | vehicle-recon-routing.md |
| vehicle-audit-recon.md | PDI compliance deadline | vehicle-pdi-compliance-deadline.md |
| vehicle-audit-recon.md | Detailing routing | vehicle-detailing-routing.md |
| vehicle-audit-recon.md | Cage placement | vehicle-placement-cage.md |
| morning-lot-walk-checklist.md | Staff parking — new employee | staff-parking-new-employee.md |
| morning-lot-walk-checklist.md | Staff parking — repeat violation | staff-parking-repeat-violation.md |
| morning-lot-walk-checklist.md | Vehicle categorization | vehicle-categorization.md |
| morning-lot-walk-checklist.md | Cage placement | vehicle-placement-cage.md |
| morning-lot-walk-checklist.md | Vehicle status unknown | vehicle-status-unknown.md |
| morning-lot-walk-checklist.md | Sold sign enforcement | sold-sign-missing-enforcement.md |
| pdi-completion-checklist.md | PDI compliance deadline | vehicle-pdi-compliance-deadline.md |
| pdi-completion-checklist.md | Ship mode arrival | vehicle-arrival-ship-mode.md |
| pdi-completion-checklist.md | Dealer trade arrival | vehicle-arrival-dealer-trade.md |
| key-plate-accountability-checklist.md | Lost key/plate response | key-plate-lost-response.md |
| key-plate-accountability-checklist.md | Sign-out process | key-plate-sign-out.md |
| key-plate-accountability-checklist.md | Sign-in process | key-plate-sign-in.md |
| key-plate-accountability-checklist.md | Accountability agreement | accountability-agreement-onboarding.md |

---

### Airtable Integration (Phase 2)

In Phase 2, when a user enters a VIN on the Vehicle Audit screen, the app queries Airtable (Base: INVENTORY SYSTEMS, Table: MASTER INVENTORY) to retrieve:
- Vehicle description (Year / Make / Model)
- Current Airtable status
- STOCK HOLDER field value

From this data, the app:
- **Auto-populates the vehicle category** (NEW, FLR, SOLD, BND, or RECON) based on the vehicle's current Airtable status
- **Flags non-prime vehicles** if the STOCK HOLDER field = "NON PRIME DIVISION" — displays an alert: "This vehicle is NON PRIME DIVISION and must not be on this lot. Route immediately to AB | STURGEON DODGE." The non-prime vehicle alert must appear before any checklist is launched for that vehicle.
- **Auto-populates vehicle description** in the audit record so the task list includes make, model, and year

The user retains the ability to override the auto-populated category in cases where Airtable data is stale or incorrect. An override must be logged (user name + timestamp + original vs. override value).

---

### Task Assignment (Phase 2)

After a task list is generated, the Lot Manager may assign each task to a named team member. Assignments are drawn from a staff roster maintained in the app (list of names and roles — maintained by Management).

The assignee sees the task in their app view. The Lot Manager sees whether each assigned task has been marked complete.

---

### Task Completion Tracking (Phase 2)

An assignee who receives a task taps "Mark Complete" when the task is resolved. The Lot Manager sees the completion status of every task generated from every audit session. Overdue tasks (not resolved within [NEEDS_INPUT: management-defined time threshold]) are highlighted.

---

### Historical Audit Log (Phase 2)

Every completed audit session is saved to the historical audit log. The log stores:
- Date and time of the audit
- Audit type
- VIN (if vehicle audit)
- User who conducted the audit
- All item responses (YES / NO / Done / Needs Follow-Up)
- Task list generated
- Task assignment and completion status (if applicable)

The log is viewable by Lot Manager / Management only.

---

### Morning Lot Walk — Zone Navigation (Phase 2)

In Phase 2, the morning lot walk presents each zone as a distinct step with a zone summary header, a map thumbnail showing the zone's position on the lot [NEEDS_INPUT: lot map image required], and a "Zone Complete" confirmation before advancing to the next zone. The zone-by-zone navigation structure mirrors the zone order in the morning-lot-walk-checklist.md source file.

---

## Section 5: Feature List (Prioritized)

### P1 — Must Have for MVP (Phase 1)

These features define the MVP. The app is not ready for field use without all P1 features.

| # | Feature | Notes |
|---|---|---|
| 1 | VIN input — manual text entry | Required for Vehicle Audit type |
| 2 | Vehicle status category selection — manual (NEW, FLR, SOLD, BND, RECON) | Auto-populated from Airtable in Phase 2 |
| 3 | Status-based checklist display — 5 vehicle audit checklists | NEW (7 items), FLR (8 items), SOLD (3 items), BND (4 items), RECON (6 items) |
| 4 | Morning Lot Walk checklist — 15 items across 7 zones | Zone headers displayed as groupings |
| 5 | PDI Compliance Review checklist — per-vehicle tracking with date-based status calculation | ON TIME / DAY 1 OVERDUE / DAY 2+ OVERDUE CRITICAL |
| 6 | Key/Plate Accountability checklist — three sub-types (sign-out, sign-in, periodic audit) | Sub-type selected at launch |
| 7 | Binary YES/NO response for every checklist item — no free text, no N/A | Hard enforced — no exceptions |
| 8 | Failure Action display for every NO response — exact text from checklist files | No rewording or summarizing |
| 9 | "Done — action complete" response after NO | Marks item resolved |
| 10 | "Needs Follow-Up" response after NO | Flags item as outstanding |
| 11 | Mandatory response to NO before advancing — user cannot skip a failed item | Hard enforced |
| 12 | Task list auto-generation — all NO responses compiled into one list | Grouped by responsible team (Lot, Sales, Service) |
| 13 | Task list includes: vehicle, zone, checklist item, Failure Action, responsible team, resolution status | Per the format defined in Section 3 |
| 14 | "Needs Follow-Up" items highlighted in task list | Visually distinct from resolved items |
| 15 | Task list export as plain text | One-tap share; formatted for team chat |
| 16 | Offline-first operation during audit walk | All checklist content available offline; syncs when connected |
| 17 | Data persistence — audit data not lost if app is closed or device loses power mid-audit | Resume from last completed item |

---

### P2 — After MVP (Phase 2)

These features extend the MVP. Phase 2 development begins only after Phase 1 is deployed and validated.

| # | Feature | Notes |
|---|---|---|
| 1 | Decision tree drill-down — "?" icon on each item with a `→ SEE:` reference | Opens Decision Guide panel; tree traversal one step at a time |
| 2 | Decision Guide — interactive decision tree presentation, step by step | All paths terminate in a defined action; Back and Close navigation |
| 3 | Airtable integration — VIN lookup auto-populates vehicle category and description | Override allowed; override logged |
| 4 | Non-prime vehicle alert — auto-flagged when STOCK HOLDER = "NON PRIME DIVISION" | Displayed before any checklist launches |
| 5 | Task assignment — tasks assigned to named team members via staff roster | Roster maintained by Management |
| 6 | Task completion tracking — assignees mark tasks done; Manager views completion status | Overdue tasks highlighted |
| 7 | Historical audit log — all completed audit sessions stored and viewable by management | Includes date, user, VIN, all responses, task list |
| 8 | Morning lot walk zone navigation — zone-by-zone structure with zone summary and confirmation | Zone map thumbnail requires lot map image input |
| 9 | VIN barcode/QR scan — scan to populate VIN rather than typing | Optional enhancement to Step 3 |

---

### P3 — Future

These features are out of scope for the current development cycle but are listed so they are not forgotten:

| # | Feature | Notes |
|---|---|---|
| 1 | Manager dashboard — lot compliance score, overdue tasks, PDI deadline tracking at a glance | Requires historical data from P2 audit log |
| 2 | PDI deadline push notifications — Day 1 warning, Day 2 critical | Requires push notification capability |
| 3 | Stock-in tag workflow integration — flags which vehicles need tags from Jorja/Giselle | Does not replace physical tag; only flags the need |
| 4 | Audit scheduling and reminders — morning walk reminder at a set daily time | Configurable per user or per role |

---

## Section 6: Key Constraints

These constraints are non-negotiable and must be respected in any implementation of this product.

**1. Checklist fidelity.**
All checklist item text and all Failure Action text in the app must match the corresponding `checklists/` source files exactly. No items may be added, removed, reworded, or made subjective. No Failure Action may be simplified or paraphrased. If the checklists are updated, the app must be updated to match before the next audit session is conducted.

**2. Offline-first.**
The app must function without an internet connection during the lot walk. All checklist content is pre-loaded on the device. Data entered during the walk is stored locally and synced when connectivity is restored. A lost WiFi signal must not interrupt, fail, or cause data loss in any active audit session.

**3. Zero ambiguity in decision trees.**
Every decision tree path embedded in the app (Phase 2) must terminate in a defined, actionable outcome. No path may end in an undefined state, a "contact your manager" catch-all, or a blank screen. The terminal outcomes are those defined in the decision tree source files.

**4. Key Cafe is not replaced.**
This app does not track keys or dealer plates. Key and plate custody, sign-out, sign-in, and accountability records are all managed through the Key Cafe system. The Key/Plate Accountability checklist in this app is a process reminder and compliance audit tool — it does not create, modify, or read Key Cafe records.

**5. No customer-facing features.**
This app is for internal staff only. No customer data is surfaced to customers. There is no customer-facing view, no customer login, and no public-facing interface of any kind.

**6. Binary responses enforced.**
Every checklist item response is YES or NO. The app must not offer a free-text response field, a comment box, an "N/A" option, or any other response type for checklist items. The only additional responses available are "Done — action complete" and "Needs Follow-Up," and these appear only as sub-responses to a NO.

**7. Exact Failure Action text.**
When a NO response triggers a Failure Action display, the text shown to the user must be the exact language from the checklist source file — including the role specification (ROLE:), the channel (via WhatsApp), and the exact communication language (SAY: "..."). This language was written to be read and used as-is. It must not be edited in the app.

---

## Section 7: Out of Scope

The following are explicitly excluded from this product. Do not implement them.

| Excluded Feature | Reason |
|---|---|
| **Telegram bot or any messaging platform integration** | The app generates shareable text for manual posting in team chat. It does not integrate with Telegram, WhatsApp, or any other messaging platform programmatically. |
| **Automated vehicle placement** | Vehicle placement is handled by the existing n8n/Airtable/Google Sheets automation system. This app does not interact with, duplicate, or replace that system in any way. |
| **Key or dealer plate tracking** | Key and plate custody is handled by Key Cafe. This app does not track custody, sign-out records, or plate locations. |
| **Customer-facing features of any kind** | This is an internal staff tool only. |
| **Financial penalty tracking or payroll integration** | Penalties are enforced through existing HR/payroll processes. The app surfaces penalty amounts in Failure Action text (as written in the checklist files) but does not record, calculate, or submit penalty charges. |
| **Service work order management** | Work orders are managed through the service department's own systems. The app may surface a Failure Action requiring a work order to be created, but it does not create or interact with work orders. |
| **Real-time GPS vehicle location tracking** | Vehicle locations are managed physically on the lot. The app does not track GPS coordinates of inventory vehicles. (GPS key tag location check — done via the Key Cafe / GPS tag system — is referenced in a checklist item but the app does not directly interface with the GPS system.) |
| **Replacement of the existing n8n/Airtable/Google Sheets placement automation** | The existing automated placement engine is a separate, independent system. This app does not replace it, reconfigure it, or consume its output beyond the Airtable integration described in Phase 2 (VIN lookup for vehicle status). |

---

## Appendix A: Checklist Item Count Summary

| Checklist | Items | Source File |
|---|---|---|
| Vehicle Audit — NEW | 7 | checklists/vehicle-audit-new.md |
| Vehicle Audit — FLR | 8 | checklists/vehicle-audit-flr.md |
| Vehicle Audit — SOLD | 3 | checklists/vehicle-audit-sold.md |
| Vehicle Audit — BND | 4 | checklists/vehicle-audit-bnd.md |
| Vehicle Audit — RECON | 6 | checklists/vehicle-audit-recon.md |
| Morning Lot Walk | 15 | checklists/morning-lot-walk-checklist.md |
| PDI Compliance Review | 1 (per vehicle tracked) | checklists/pdi-completion-checklist.md |
| Key/Plate Accountability — Sign-Out | 4 | checklists/key-plate-accountability-checklist.md (Section A) |
| Key/Plate Accountability — Sign-In | 2 | checklists/key-plate-accountability-checklist.md (Section B) |
| Key/Plate Accountability — Periodic Audit | 2 | checklists/key-plate-accountability-checklist.md (Section C) |

---

## Appendix B: Decision Trees Available in Phase 2

All 25 decision trees exist as source documents and are available for embedding in Phase 2. The trees referenced by checklist items (and therefore the priority set for Phase 2) are identified in Section 4. The full tree list is:

**Vehicle Lifecycle Trees (13):**
vehicle-arrival-new-standard.md, vehicle-arrival-ship-mode.md, vehicle-arrival-dealer-trade.md, vehicle-pdi-routing.md, vehicle-pdi-compliance-deadline.md, vehicle-detailing-routing.md, vehicle-categorization.md, vehicle-placement-cage.md, vehicle-sold-processing.md, vehicle-trade-in-processing.md, vehicle-customer-on-lot.md, vehicle-bnd-handling.md, vehicle-recon-routing.md

**Operational, Personnel, and Compliance Trees (12):**
vehicle-auction-routing.md, vehicle-non-prime-identification.md, vehicle-seasonal-power-sport.md, vehicle-status-unknown.md, key-plate-sign-out.md, key-plate-sign-in.md, key-plate-lost-response.md, staff-parking-new-employee.md, staff-parking-repeat-violation.md, sold-sign-missing-enforcement.md, morning-lot-walk.md, accountability-agreement-onboarding.md

---

*This document is the authoritative product requirements reference for the Sturgeon Dodge Edmonton Office Lot Checklist App. Any implementation questions about what to build or how a feature should behave should be resolved by reference to this document and, where this document references checklist or decision tree source files, to those source files directly.*
