# BUILD PROMPT 18 — END-TO-END INTEGRATION TEST

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL |
| **Depends on** | Build prompts 01–17 (all prior build prompts) |
| **Unblocks** | nothing — this is the final build task |
| **Modifies** | any files with defects found during testing |
| **Creates** | no new files |
| **Estimated output** | defect fixes only (zero new lines if no defects found) |

---

## STEP 1 — READ CONTEXT FILES

Read these files completely before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in Step 2
2. `lot-checklist-app/implementation-plan.md` — Task 18 scope (the 6 test flows), Section 8 (constraints), Section 6 (offline resume algorithm), Section 5 (screen routing), Section 3 (data key strings)
3. `lot-checklist-app/blueprint.md` — screen inventory (all 10 screens), navigation flow, component inventory
4. `lot-checklist-app/index.html` — the complete built file; read fully before testing
5. `lot-checklist-app/app.js` — the complete built file; read fully before testing
6. `lot-checklist-app/data.js` — the complete built file; confirm all CHECKLISTS keys and item counts
7. `lot-checklist-app/styles.css` — the complete built file; confirm all CSS custom properties and class definitions

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`. Check the `status` fields for build prompts `15` (label: `offline-resume`), `16` (label: `key-plate-subtype-select`), and `17` (label: `pdi-compliance-review`).

**If build prompt 15 has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 18 cannot start — build prompt 15 (offline-resume) has status `[current status]`.
> Wait for build prompt 15 to complete, then re-send this prompt."

**If build prompt 16 has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 18 cannot start — build prompt 16 (key-plate-subtype-select) has status `[current status]`.
> Wait for build prompt 16 to complete, then re-send this prompt."

**If build prompt 17 has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 18 cannot start — build prompt 17 (pdi-compliance-review) has status `[current status]`.
> Wait for build prompt 17 to complete, then re-send this prompt."

**If all three (15, 16, 17) have status `complete`:**
Verify all prior prompts 01–14 also have status `complete`. If any do not, stop and report which are incomplete before proceeding.

Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts["18"].status` → `"in_progress"`
- `prompts["18"].started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. All 17 prior build prompts are complete. Starting build prompt 18: END-TO-END INTEGRATION TEST."

---

## STEP 3 — TASK

### Context

This task executes all specified test flows against the built app. The app is opened as static files (`lot-checklist-app/index.html`) directly in a browser — no server, no build step. All testing is performed in a mobile viewport (DevTools mobile emulation, or a physical iOS/Android device).

For each test flow, execute the flow exactly as described. Document every defect. Fix each defect in the appropriate source file before proceeding to the next test flow. Re-test the repaired flow after fixing. Do not mark this task complete until all 6 flows pass without uncorrected defects.

**Defect documentation format:**
> DEFECT [N]: [Screen / component]. [Observed behavior]. [Expected behavior per spec file : section]. [File and line where fix applied].

---

### Pre-Test Verification Checklist

Before executing any test flows, verify the following statically (read the files — no browser required):

**data.js verification:**
- [ ] `CHECKLISTS['vehicle-audit']['NEW']` contains exactly 7 items
- [ ] `CHECKLISTS['vehicle-audit']['FLR']` contains exactly 8 items
- [ ] `CHECKLISTS['vehicle-audit']['SOLD']` contains exactly 3 items
- [ ] `CHECKLISTS['vehicle-audit']['BND']` contains exactly 4 items
- [ ] `CHECKLISTS['vehicle-audit']['RECON']` contains exactly 6 items
- [ ] `CHECKLISTS['morning-lot-walk']` contains exactly 15 items
- [ ] `CHECKLISTS['pdi-compliance']` contains at least 1 item
- [ ] `CHECKLISTS['key-plate']['sign-out']` contains exactly 4 items
- [ ] `CHECKLISTS['key-plate']['sign-in']` contains exactly 2 items
- [ ] `CHECKLISTS['key-plate']['periodic-audit']` contains exactly 2 items
- [ ] Every item in every array has: `id`, `text`, `zone`, `failureAction` fields
- [ ] Every `failureAction` has: `role`, `channel`, `say`, `responsibleTeam` fields
- [ ] `zone` is `null` for all non-morning-lot-walk items
- [ ] `zone` uses only canonical names: `"Cage"`, `"East Side Fence Line"`, `"West Side of Building"`, `"Overflow (Temporary)"`, `"Auction Area"`, `"Power Sport / Quad Corner"` — for morning-lot-walk items that have a zone

**index.html verification:**
- [ ] All 9 `.screen` div IDs are present: `home`, `audit-type-select`, `vin-entry`, `category-select`, `key-plate-subtype-select`, `checklist-view`, `failure-action-view`, `audit-summary`, `task-list`
- [ ] `pdi-compliance-view` screen div is present (added in Task 07)
- [ ] `resume-modal` div is present with `btn-resume` and `btn-start-fresh` children
- [ ] `<script src="data.js"></script>` appears before `<script src="app.js"></script>`
- [ ] No `<link>` or `<script>` tags reference any CDN URL (no `cdn.`, no `unpkg.`, no `jsdelivr.`, no `cdnjs.`)
- [ ] SVG sprite block is present at the top of `<body>` containing required icons

**app.js verification:**
- [ ] `function resumeCheck()` is defined
- [ ] `function initFreshSession()` is defined
- [ ] `function showScreen(screenId)` is defined
- [ ] `function persistState()` is defined
- [ ] `function renderChecklistItem(index)` is defined
- [ ] `function renderFailureAction(index)` is defined
- [ ] `function renderAuditSummary()` is defined
- [ ] `function generateTaskList()` is defined
- [ ] `function renderTaskList()` is defined
- [ ] `function shareTaskList()` is defined

**styles.css verification:**
- [ ] `:root` block defines all `--space-*`, `--radius-*`, `--duration-*`, `--easing-*`, `--text-*`, `--page-margin`, `--section-gap`, `--list-item-height`, `--card-padding`, `--card-gap` custom properties
- [ ] `[data-theme="light"]` and `[data-theme="dark"]` blocks define all color tokens
- [ ] `.glass-card`, `.glass-nav`, `.glass-modal` classes are defined
- [ ] `.btn-yes`, `.btn-no`, `.btn-done`, `.btn-follow-up` classes are defined
- [ ] `.progress-bar`, `.progress-bar__fill` classes are defined
- [ ] `.task-card`, `.task-card--follow-up` classes are defined
- [ ] `.toast` class is defined
- [ ] `.screen` class has `display: none` as default
- [ ] `html` element has `data-theme="light"` attribute set

---

### Test Flow 1 — Vehicle Audit: All 5 Categories

Execute this flow for each of the 5 categories: NEW, FLR, SOLD, BND, RECON.

**For each category:**

1. Open `lot-checklist-app/index.html` in a mobile viewport (375px wide, 812px tall — iPhone X profile).
2. Verify: Home screen displays. "Start Lot Audit" button is visible.
3. Tap "Start Lot Audit." Verify: AuditTypeSelect screen displays with 4 tiles.
4. Tap "Vehicle Audit" tile. Verify: VINEntry screen displays with VIN input field.
5. Enter a test VIN: `1HGBH41JXMN109186` (this is a valid 17-char alphanumeric VIN). Tap "Next."
6. Verify: CategorySelect screen displays with 5 category buttons.
7. Tap the category button for the current test category (e.g., "NEW").
8. Verify: ChecklistView displays the first item for that category. Progress bar shows 0% (or 1/N).
9. Answer items as follows:
   - Item 1: tap YES. Verify: advances to item 2.
   - Item 2: tap NO. Verify: FailureActionView displays with role, channel, and (if applicable) SAY text verbatim from source.
   - On FailureActionView: tap "Done — action complete." Verify: advances to item 3.
   - Item 3: tap NO. On FailureActionView: tap "Needs Follow-Up." Verify: advances to item 4.
   - All remaining items: tap YES.
10. Verify: After last item, AuditSummary screen displays with correct counts:
    - Passed: count of YES responses
    - Resolved: 1 (the "Done" response)
    - Flagged: 1 (the "Needs Follow-Up" response)
11. Tap "Generate Task List." Verify: TaskList screen displays.
12. Verify: Task cards are grouped by team (LOT TEAM / SALES TEAM / SERVICE DEPARTMENT headers present).
13. Verify: The "Needs Follow-Up" task card has left border in orange (`--color-needs-followup`), distinct from red.
14. Verify: The "Done" task card shows "RESOLVED" status badge (green).
15. Verify: Each task card displays VIN, item text (verbatim), failure action role, channel, and say text (verbatim). No truncation. No rewording.

**Pass criteria for Flow 1:** All 5 categories complete without error. All item texts and failure actions display verbatim. Task list generates correctly for all categories.

---

### Test Flow 2 — Morning Lot Walk

1. Open `index.html`. Tap "Start Lot Audit." Tap "Morning Lot Walk" tile.
2. Verify: ChecklistView displays immediately (no VINEntry, no CategorySelect, no sub-type select).
3. Verify: Progress bar shows 0% (0 of 15 items answered).
4. Verify: First item displays its text verbatim.
5. For every item that has a `zone` value: verify the ZoneHeader appears above the item text, displaying the canonical zone name exactly (e.g., "Cage", "East Side Fence Line").
6. Answer items as follows:
   - Items 1–5: tap YES.
   - Items 6–8: tap NO, then "Done — action complete" on FailureActionView.
   - Items 9–11: tap NO, then "Needs Follow-Up" on FailureActionView.
   - Items 12–15: tap YES.
7. Verify: AuditSummary displays. Passed: 9. Resolved: 3. Flagged: 3.
8. Tap "Generate Task List."
9. Verify: TaskList groups tasks by team. All 6 NO tasks appear (3 Resolved, 3 Flagged).
10. Verify: Flagged tasks are highlighted in orange; Resolved tasks show green badge.
11. Verify: Zone names appear on task cards where the item has a zone annotation. Verify canonical zone names only.

**Pass criteria for Flow 2:** All 15 items display and advance correctly. Zone headers appear at correct positions. Task list groups by team. No zone name uses an abbreviation or alternative name.

---

### Test Flow 3 — PDI Compliance Review

1. Open `index.html`. Tap "Start Lot Audit." Tap "PDI Compliance Review" tile (calendar icon).
2. Verify: `pdi-compliance-view` screen displays with VIN input, date input, and "Calculate Status" button.
3. Enter VIN: `1HGBH41JXMN109186`. Enter today's date in the arrival date field.
4. Tap "Calculate Status." Verify: status block appears. Status label reads "ON TIME" in green (`--color-success`).
5. Change arrival date to yesterday. Tap "Calculate Status." Verify: status label reads "DAY 1 OVERDUE" in amber (`--color-warning`).
6. Change arrival date to 3 days ago. Tap "Calculate Status." Verify: status label reads "DAY 2+ OVERDUE — CRITICAL" in red (`--color-destructive`). Verify the em dash (—) is correct — not a hyphen.
7. With the 3-days-ago date selected, tap "Begin PDI Checklist."
8. Verify: ChecklistView displays the first PDI compliance item.
9. Answer all PDI items (1 item per the `pdi-compliance` template).
10. Verify: AuditSummary appears after the item is answered.

**Pass criteria for Flow 3:** All 3 status states display correctly with correct labels and colors. Day arithmetic produces correct day counts. "Begin PDI Checklist" loads `CHECKLISTS['pdi-compliance']`.

---

### Test Flow 4 — Key/Plate Accountability: All 3 Sub-Types

Execute this flow for each sub-type: Sign-Out (4 items), Sign-In (2 items), Periodic Audit (2 items).

**For each sub-type:**

1. Open `index.html`. Tap "Start Lot Audit." Tap "Key / Plate Check" tile.
2. Verify: `key-plate-subtype-select` screen displays with 3 sub-type buttons and back button.
3. Tap the sub-type button for the current test (e.g., "Sign-Out").
4. Verify: ChecklistView displays the first item for that sub-type. No VIN entry. No category selection.
5. Verify: item count matches the expected count for that sub-type (4, 2, or 2).
6. Answer at least one item NO and tap "Done" on FailureActionView.
7. Answer all remaining items YES.
8. Verify: AuditSummary appears with correct counts.
9. Tap "Generate Task List." Verify: task list generates and displays.

**Pass criteria for Flow 4:** All 3 sub-types load the correct item counts. No VIN/category screens appear in the Key/Plate flow. Task list generates for each sub-type.

---

### Test Flow 5 — Offline Resume

**Part A — Resume:**

1. Open `index.html`. Tap "Start Lot Audit." Tap "Vehicle Audit." Enter VIN: `1HGBH41JXMN109186`. Select "FLR" category.
2. On ChecklistView: answer items 1 through 3. After answering item 3, close the browser tab completely (not just refresh — close the tab).
3. Open a new tab and navigate to `index.html` again (or reopen the file).
4. Verify: Resume-prompt modal appears with heading "Audit in Progress" and body text "You have an audit in progress. Resume where you left off?"
5. Tap "Resume." Verify: app navigates to ChecklistView. Verify: the current item is item 4 (not item 1). Verify: progress bar shows 3 of 8 items complete.
6. Tap NO on item 4. Verify: FailureActionView slides up from bottom.
7. Tap "Needs Follow-Up." Verify: advances to item 5 on ChecklistView.
8. Continue and complete the remaining items. Verify: AuditSummary appears with 3 passed (items 1–3), 1 flagged (item 4).

**Part B — Start Fresh:**

1. Repeat steps 1–3 from Part A.
2. When the resume modal appears, tap "Start Fresh."
3. Verify: modal dismisses. Home screen displays. No prior session data visible.
4. Verify: localStorage key `lot-checklist-app-session-in-progress` is no longer present (check in browser DevTools → Application → Local Storage).

**Pass criteria for Flow 5:** Resume restores correct screen, correct item index, and correct response count. Start Fresh clears localStorage and returns to Home. No data corruption in either path.

---

### Test Flow 6 — Share Task List

1. Open `index.html`. Complete a Vehicle Audit (any category) with at least 2 NO responses — one "Done," one "Needs Follow-Up."
2. On AuditSummary, tap "Generate Task List."
3. On TaskList, tap "Share Task List."
4. Verify one of two outcomes:
   - **If Web Share API is available:** Native share sheet appears. Dismiss it. Verify no error state is shown.
   - **If Web Share API is not available (desktop browser):** Toast notification appears with text "Copied to clipboard." Toast disappears after approximately 2 seconds.
5. In either case, retrieve the exported text (from clipboard or by inspecting the `exportString` variable in DevTools).
6. Verify the exported text matches this exact format (from `implementation-plan.md` Task 14):
   ```
   LOT AUDIT — [Date] [Time] — [Audit Type] — [VIN if applicable]
   Audited by: [User name/role]

   --- LOT TEAM TASKS ---
   [Task entries for Lot team]

   --- SALES TEAM TASKS ---
   [Task entries for Sales team]

   --- SERVICE DEPARTMENT TASKS ---
   [Task entries for Service team]

   Items marked [FOLLOW-UP] require attention — action could not be completed during the walk.
   ```
7. Verify: The "Needs Follow-Up" task entry contains `[FOLLOW-UP]` marker.
8. Verify: The "Done" task entry does NOT contain `[FOLLOW-UP]` marker.
9. Verify: Task entry text includes checklist item text (verbatim), failure action role, channel, and say text (verbatim). No truncation. No rewording.

**Pass criteria for Flow 6:** Share sheet appears or clipboard copy succeeds. Exported text exactly matches required format. `[FOLLOW-UP]` markers present only on flagged items. All item and failure action text is verbatim.

---

### Defect Fix Protocol

For each defect found:

1. Record the defect in the format:
   > DEFECT [N]: [Screen / component]. [Observed behavior]. [Expected behavior per spec]. [File to fix].

2. Locate the defect in the appropriate source file (`index.html`, `app.js`, `data.js`, or `styles.css`).

3. Apply the minimum fix needed to correct the observed behavior to match the spec. Do not refactor surrounding code. Do not add features not required by the spec.

4. Re-execute the test flow that exposed the defect. Confirm the defect is resolved.

5. Proceed to the next test flow.

---

### CONSTRAINTS

The following constraints from `implementation-plan.md` Section 8 apply to this task:

| Constraint | Requirement |
|---|---|
| **Checklist fidelity** | During testing, if any item text or failure action text does not exactly match the source checklist files (`checklists/` directory), treat this as a DEFECT and fix it in `data.js`. No text transformation is permitted in the rendering pipeline. |
| **Offline-first** | During testing, verify no network requests are made for app content. Open browser DevTools → Network tab. Confirm no `cdn.`, `unpkg.`, `jsdelivr.`, or external URLs appear while using any feature. |
| **Binary responses enforced** | Verify no free-text input fields exist on any checklist screen (`checklist-view` or `failure-action-view`). The only interactive elements on these screens must be YES, NO, Done, and Needs Follow-Up buttons. |
| **Exact Failure Action text** | Failure action role, channel, and say text must appear verbatim. If any field shows truncated, transformed, or summarized text, treat this as a DEFECT. |
| **No Phase 2 features** | If any screen, button, or function is present that is not defined in `implementation-plan.md` Phase 1 scope, treat it as a defect and remove it. |
| **No CDN URLs** | If any `<link>` or `<script>` tag or `fetch()` call references an external URL, treat this as a critical defect and remove it immediately. |

---

## STEP 4 — SUCCESS CRITERIA

All success criteria must be verified before marking this task complete. No criterion may be skipped.

- [ ] Test Flow 1 (Vehicle Audit — all 5 categories): all 5 categories pass without uncorrected defects
- [ ] Test Flow 2 (Morning Lot Walk — all 15 items): zone headers display correctly, task list groups by team
- [ ] Test Flow 3 (PDI Compliance Review — all 3 status states): all 3 status labels and colors correct
- [ ] Test Flow 4 (Key/Plate — all 3 sub-types): all 3 sub-types load correct item counts
- [ ] Test Flow 5 (Offline resume — both Resume and Start Fresh paths): resume restores correct state, Start Fresh clears correctly
- [ ] Test Flow 6 (Share task list): exported text matches required format exactly
- [ ] No console errors in browser DevTools during any test flow
- [ ] No CDN URLs in any source file
- [ ] No Phase 2 features present
- [ ] All defects found during testing are documented and fixed
- [ ] All fixed defects are re-tested and confirmed resolved

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts["18"].status` → `"complete"`
   - `prompts["18"].completed_at` → current ISO 8601 timestamp
   - `overall_status` → `"complete"`
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 18 complete. The Lot Checklist App is fully built and tested.**
>
> **Build sequence complete.** All 18 build prompts have been executed.
>
> The app is at `lot-checklist-app/index.html`. Open it in a mobile browser to use it.
>
> **Defects found and fixed:** [list each defect resolved, or "None — all 6 flows passed on first run."]
>
> The app is ready for deployment. No server required — it runs as static files.
