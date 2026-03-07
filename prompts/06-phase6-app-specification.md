# SESSION PROMPT — Phase 6: App Specification
# Sturgeon Dodge Edmonton Office Lot Operations SOP Project

---

## MANDATORY FIRST STEPS — DO THESE BEFORE ANYTHING ELSE

Read the following files in this exact order. Do not skip any file. Do not begin the STATE CHECK until all reads are complete.

1. Read `CLAUDE.md` — all rules, conventions, quality gates, domain glossary.
2. Read `EXECUTION_PLAN.md` — read the Phase 6 meta-prompt in Section 4 in full.
3. Read `prompts/state.json` — the shared state file.
4. Read all 8 checklist files:
   - `checklists/vehicle-audit-new.md`
   - `checklists/vehicle-audit-flr.md`
   - `checklists/vehicle-audit-sold.md`
   - `checklists/vehicle-audit-bnd.md`
   - `checklists/vehicle-audit-recon.md`
   - `checklists/morning-lot-walk-checklist.md`
   - `checklists/pdi-completion-checklist.md`
   - `checklists/key-plate-accountability-checklist.md`
5. Scan the titles of all 25 decision trees in `systems-analysis/decision-trees/` (you need to understand what decision trees exist to describe how the app will embed them — you do not need to read their full content).
6. Read the Phase 5 report: `checklists/_PHASE_5_REPORT.md`

All reads must complete before you proceed.

---

## STATE CHECK — ABORT IF PREREQUISITES ARE NOT MET

After reading `prompts/state.json`, check:

**Required:**
- `phases.phase_5.status` must be `"complete"` OR `"complete_with_issues"`
- `phases.phase_3a.status` must be `"complete"` OR `"complete_with_issues"`
- `phases.phase_3b.status` must be `"complete"` OR `"complete_with_issues"`

If any prerequisite is NOT met:
- **STOP immediately.**
- Do not create any files.
- Output: "ABORT: Prerequisites not met. phases phase_3a, phase_3b, and phase_5 must all be complete before Phase 6 can begin. Missing: [list which phases are not complete]."
- Take no further action.

If prerequisites are met, continue.

**Before writing any files, update `prompts/state.json`:**
- Set `phases.phase_6.status` to `"in_progress"`
- Set `phases.phase_6.started_at` to today's date (YYYY-MM-DD)
- Set `last_updated` to today's date

---

## YOUR TASK — PHASE 6: APP SPECIFICATION

Create one product requirements document and one completion report. The `app-spec/` directory must be created if it does not exist.

**File 1:** `app-spec/lot-checklist-app-requirements.md`
**File 2:** `app-spec/_PHASE_6_REPORT.md` (completion report — written last)

---

## CRITICAL CONSTRAINTS — READ BEFORE WRITING ANYTHING

**This is a NON-TECHNICAL product requirements document.** It describes what the app needs to do, who uses it, and what each feature must accomplish. It does NOT include:
- Code of any kind
- API design or endpoints
- Database schemas or data models
- Technical architecture decisions
- Server infrastructure or hosting choices
- Framework or language choices

This document is suitable to hand to a product manager or developer as a briefing. They should be able to understand exactly what to build without any clarification.

**The app is NOT a Telegram bot.** Do not include Telegram or any messaging platform integration.

**The existing automated placement engine (n8n/Airtable/Google Sheets) is a separate system.** This app is for physical lot audit and task workflow only. It does not replace, duplicate, or interfere with the existing automation.

**App must NOT replace Key Cafe.** Key and plate accountability is handled by Key Cafe only. The app does not manage keys or plates.

---

## DOCUMENT STRUCTURE — Follow Exactly

### Section 1: Product Purpose

Write a concise statement covering:
- **What problem this app solves:** decision fatigue during lot audits, no accountability trail for lot checks, difficulty generating and routing task lists, staff uncertainty about what to do when a checklist item fails
- **Who uses it:** Lot Attendants (executing), Lot Manager / Management (reviewing and overseeing)
- **What the expected outcome is:** any staff member following app instructions alone should be able to achieve full lot compliance; the app is not a shortcut — it is the checklist and decision tree made interactive

---

### Section 2: User Roles

Define exactly three roles:

**Lot Attendant**
- Primary user during lot walk
- Executes checklist items one by one
- Marks items Yes or No
- For each No: reads the Failure Action and executes it
- Flags items as "Needs Follow-Up" if Failure Action cannot be completed immediately
- Cannot skip checklist items

**Lot Manager / Management**
- Reviews completed audit results
- Sees the auto-generated task list from each audit
- Monitors PDI compliance status
- Assigns follow-up items to teams
- Can view historical audit results

**Admin (Jorja and Giselle)**
- No app interaction required
- Their role is physical stock-in tag creation; the app does not digitize this function

---

### Section 3: Phase 1 — Manual Checklist Mode (MVP)

Describe the core user flow step by step. This is what must be built first:

**Step 1:** User opens app → taps "Start Lot Audit"

**Step 2:** User selects audit type:
- Vehicle Audit (for a specific vehicle)
- Morning Lot Walk (full zone-by-zone walk)
- PDI Compliance Review
- Key/Plate Accountability Check

**Step 3 (Vehicle Audit flow):** User inputs VIN
- Manual text entry (primary method in MVP)
- Barcode/QR scan (optional enhancement, Phase 2)

**Step 4:** User selects vehicle status category:
- NEW
- FLR
- SOLD
- BND
- RECON
(In Phase 2, this is auto-populated from Airtable; in MVP, user selects manually)

**Step 5:** App displays the checklist for that category. All items from the corresponding `checklists/vehicle-audit-[category].md` file, in order.

**Step 6:** For each checklist item, user taps:
- **YES** → next item
- **NO** → app displays the Failure Action for that item; user reads and executes; user then taps either:
  - "Done — action complete" → next item
  - "Needs Follow-Up" → item is flagged; proceed to next item

**Step 7:** After all items: "Generate Task List" button appears

**Step 8:** Task list is generated automatically. Format:
- Grouped by responsible team: Lot, Sales, Service
- Each task shows: vehicle (VIN/description), the checklist item that failed, the Failure Action required, the team responsible
- Tasks marked "Needs Follow-Up" are highlighted

**Step 9:** Task list is shareable — one tap exports it as text for posting in team chat

---

### Section 4: Phase 2 — Decision Tree Integration

Describe how decision trees are layered into the checklist experience:

For each checklist item that references a decision tree (identified by `→ SEE: filename.md` in the checklist files):
- A small "?" icon appears next to the checklist item
- Tapping "?" opens a **Decision Guide** panel
- The Decision Guide shows the decision tree for that scenario, one step at a time
- At each step: the question is shown; user taps the applicable answer; next step appears
- The tree always terminates in a specific action — the user cannot reach an undefined state
- "Back" button available to navigate to the previous step
- User can close the Decision Guide and return to the checklist item

Also in Phase 2:
- Airtable integration: when user enters a VIN, app fetches vehicle status from Airtable automatically; category is auto-selected based on Airtable data
- Task assignment: tasks in the generated task list can be assigned to a named team member (from a staff roster)
- Task completion tracking: assigned team members can mark tasks complete in the app; manager sees completion status

---

### Section 5: Feature List (Prioritized)

**P1 — Must Have for MVP (Phase 1):**
- VIN input (manual text entry)
- Vehicle status category selection (NEW, FLR, SOLD, BND, RECON — manual)
- Status-based checklist display (5 vehicle audit checklists + morning walk + PDI tracking + key/plate audit)
- Yes/No binary response for every checklist item
- Failure Action display for every No response — exact text from checklists
- "Done — action complete" and "Needs Follow-Up" response options for each No
- Task list auto-generation from all No responses in an audit
- Task list grouped by responsible team (Lot, Sales, Service)
- Task list export as text (for team chat sharing)
- Works offline during audit walk; syncs to server when connected

**P2 — After MVP:**
- Decision tree drill-down ("?" button on each checklist item that references a tree)
- Airtable integration for live vehicle status (auto-populate category from VIN lookup)
- Task assignment to team members (with staff roster)
- Task completion tracking (assignee marks done; manager sees progress)
- Historical audit log (date, who audited, results, task list)
- Morning lot walk flow with zone-by-zone navigation structure

**P3 — Future:**
- Manager dashboard: lot compliance score, overdue tasks, PDI deadline tracking
- PDI deadline alerts: Day 1 warning push notification, Day 2 critical push notification
- Stock-in tag generation workflow integration (flagging which vehicles need tags from Jorja/Giselle)
- Audit scheduling and reminders (morning walk reminder at set time)

---

### Section 6: Key Constraints

These constraints are non-negotiable and must be respected in any implementation:

1. **Checklist fidelity:** All checklist criteria in the app must match the `checklists/` files exactly. No items may be added, removed, reworded, or made subjective. If the checklists are updated, the app must be updated to match.

2. **Offline-first:** The app must function without an internet connection during the lot walk. Data syncs when connectivity is restored. An audit must not fail because of a spotty WiFi signal.

3. **Zero ambiguity:** Every decision tree path embedded in the app (Phase 2) must terminate in a defined action. No "undefined" or "contact your manager" dead ends.

4. **Key Cafe is not replaced:** The app does not track keys or plates. Key/plate accountability remains with the Key Cafe system. The key/plate accountability checklist (Phase 1) is a process reminder, not a tracking system.

5. **No customer-facing features:** The app is for internal staff only. No customer data is surfaced to customers. No public-facing interface.

6. **Binary responses enforced:** The app must not allow free-text responses to checklist items. Every response is Yes or No (plus the Failure Action flow for No responses).

---

### Section 7: Out of Scope

The following are explicitly excluded from this product. Do not implement them:

- Telegram bot or any messaging platform integration
- Automated vehicle placement (handled by the existing n8n/Airtable/Google Sheets system — do not interfere with or duplicate this)
- Key or dealer plate tracking (handled by Key Cafe)
- Customer-facing features of any kind
- Financial penalty tracking or payroll integration
- Service work order management (handled by the service department's own systems)
- Real-time GPS vehicle location tracking

---

## QUALITY GATES — VERIFY BEFORE WRITING THE REPORT

Before writing `app-spec/_PHASE_6_REPORT.md`, confirm every item below.

- [ ] `app-spec/lot-checklist-app-requirements.md` exists
- [ ] Document contains no technical architecture content (no code, no database schemas, no API design, no framework/language choices)
- [ ] Document is suitable to hand to a product manager with no further explanation needed
- [ ] Phase 1 (MVP) and Phase 2 feature sets are distinct and sequenced — Phase 2 clearly builds on Phase 1, not a parallel track
- [ ] All 5 vehicle audit checklists are reflected in the MVP feature list (NEW, FLR, SOLD, BND, RECON)
- [ ] Morning walk, PDI tracking, and key/plate accountability checklists are included in MVP
- [ ] Offline-first requirement stated explicitly
- [ ] Key Cafe exclusion stated explicitly
- [ ] Telegram integration listed in Out of Scope
- [ ] Automated placement engine listed in Out of Scope
- [ ] No mention of n8n, Airtable formulas, or automation pipelines as app features
- [ ] Decision tree integration is described as Phase 2 (not MVP)
- [ ] Airtable integration is described as Phase 2 (not MVP)
- [ ] Three user roles defined: Lot Attendant, Lot Manager / Management, Admin (no-interaction)
- [ ] All `[NEEDS_INPUT]` items tagged where information is missing

---

## COMPLETION REPORT

After all quality gates pass, write `app-spec/_PHASE_6_REPORT.md` using the Phase Completion Report template from CLAUDE.md Section 8. Include:
- Status of the app spec file
- Quality gate checklist
- All `[NEEDS_INPUT]` items
- Notes for Phase 7 (anything the document generation session should know)

---

## STATE UPDATE — WRITE THIS AFTER THE REPORT IS COMPLETE

After writing `app-spec/_PHASE_6_REPORT.md`, update `prompts/state.json`:

```
phases.phase_6.status = "complete"
phases.phase_6.completed_at = [today's date, YYYY-MM-DD]
phases.phase_6.files_confirmed_created = ["app-spec/lot-checklist-app-requirements.md", "app-spec/_PHASE_6_REPORT.md"]
phases.phase_6.quality_gates_passed = true
phases.phase_6.needs_input_items = [list any [NEEDS_INPUT] items]
phases.phase_6.ambiguous_items = []
last_updated = [today's date, YYYY-MM-DD]
```

If quality gates did NOT all pass:
```
phases.phase_6.status = "complete_with_issues"
phases.phase_6.quality_gates_passed = false
phases.phase_6.notes = [description of which gates failed]
```

---

## STOP

After updating state.json, **stop completely**. Do not begin Phase 7. Do not read any output files.

Output a final message to the user:
- Phase 6 is complete
- The app specification document has been created
- How many `[NEEDS_INPUT]` items were found
- That `prompts/state.json` has been updated
- That Phase 7 can now be started using `prompts/07-phase7-document-generation.md` in a new Claude Code session
