# BUILD PROMPT 12 — AUDIT SUMMARY + TASK LIST GENERATION

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL (depends on 11) |
| **Depends on** | 11 |
| **Unblocks** | 13 |
| **Creates/Modifies** | `lot-checklist-app/index.html`, `lot-checklist-app/app.js` |
| **Estimated output** | ~100 lines added across index.html and app.js |

---

## STEP 1 — READ CONTEXT FILES

Read these files before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in STEP 2
2. `lot-checklist-app/styling-spec.md` — Section 7h (TaskCard — used for visual reference on what generateTaskList() must produce); Section 4 (spacing: `--card-padding`, `--section-gap`); Section 2 (colors: `--color-audit-yes`, `--color-audit-resolved`, `--color-audit-flagged`)
3. `lot-checklist-app/implementation-plan.md` — Section 7 Task 12 (exact scope: renderAuditSummary, generateTaskList, taskList field on appState), Section 4.1 (appState object — taskList field must be added), Section 4.2 (response object schema: response values 'yes'|'done'|'needs-followup'), Section 3.2 (checklist item schema: id, text, zone, failureAction), Section 5.2 (screen IDs: `audit-summary`, `task-list`), Section 8 (Constraints)
4. `lot-checklist-app/blueprint.md` — Section 1 (AuditSummary screen: trigger, description, "Generate Task List" button always present), Section 5 (AuditSummaryCard component props: totalItems, passed, resolved, flagged)
5. `lot-checklist-app/index.html` — read existing structure; locate `<div id="audit-summary" class="screen">` to fill
6. `lot-checklist-app/app.js` — read existing structure; locate `advanceChecklist()` (Task 10) — this function calls `showScreen('audit-summary')` when all items are answered; this task must also add a `renderAuditSummary()` call at that point

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If prompt `12` has any status other than `pending`:**
STOP. Tell the user exactly:
> "Build prompt 12 has status `[current status]` — expected `pending`. Do not re-run a completed or in-progress prompt. If you need to reset, set status back to `pending` and restore output files to their pre-run state."

**If prompt `12` has status `pending`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.12.status` → `"in_progress"`
- `prompts.12.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting build prompt 12: AUDIT SUMMARY + TASK LIST GENERATION."

---

## STEP 3 — TASK

### Context

This task fills the `#audit-summary` screen in `index.html` and adds three things to `app.js`:

1. **`renderAuditSummary()`** — counts responses by type and updates the summary stat display.
2. **`generateTaskList()`** — iterates `appState.responses`, collects all non-YES responses, builds a structured task array, and stores it as `appState.taskList`.
3. **A call to `renderAuditSummary()`** at the end of `advanceChecklist()` (Task 10), at the point where the code transitions to `audit-summary`.

The AuditSummary screen always shows the "Generate Task List" button regardless of how many items passed or failed. Even a perfect audit with zero failures shows the button (it will produce an empty task list — that is the correct behavior).

### Instructions

#### Modification 1 of 3: `lot-checklist-app/index.html`

Locate the `<div id="audit-summary" class="screen">` container. Fill it with the following HTML. Do not modify any other element in `index.html`.

```html
<div id="audit-summary" class="screen">

  <nav class="glass-nav">
    <span class="nav-title">Audit Complete</span>
  </nav>

  <div class="content-area">

    <!-- Summary stats card -->
    <div class="glass-card audit-summary-card">

      <p class="audit-summary-heading">Summary</p>

      <!-- Total items -->
      <div class="audit-stat-row">
        <span class="audit-stat-label">Total Items</span>
        <span class="audit-stat-value" id="summary-total">0</span>
      </div>

      <!-- Items passed (YES responses) — color: var(--color-audit-yes) -->
      <div class="audit-stat-row">
        <span class="audit-stat-label">Passed</span>
        <span class="audit-stat-value audit-stat-passed" id="summary-passed">0</span>
      </div>

      <!-- Items resolved (Done responses after NO) — color: var(--color-audit-resolved) -->
      <div class="audit-stat-row">
        <span class="audit-stat-label">Resolved</span>
        <span class="audit-stat-value audit-stat-resolved" id="summary-resolved">0</span>
      </div>

      <!-- Items flagged (Needs Follow-Up responses) — color: var(--color-audit-flagged) -->
      <div class="audit-stat-row">
        <span class="audit-stat-label">Needs Follow-Up</span>
        <span class="audit-stat-value audit-stat-flagged" id="summary-flagged">0</span>
      </div>

    </div>

    <!-- Generate Task List button — ALWAYS present (blueprint.md Section 1: "button is always present regardless of pass/fail count") -->
    <button id="btn-generate-tasks" class="btn-primary btn-generate-tasks">
      Generate Task List
    </button>

  </div>

</div>
```

**CSS class reference (from `styling-spec.md`):**

| Class | Key Properties |
|---|---|
| `.glass-card` | Section 3: glass card with `backdrop-filter`, white/dark translucent background, `border-radius: var(--radius-large)` (20px) |
| `.audit-summary-card` | `padding: var(--card-padding)` (16px); `display: flex`; `flex-direction: column`; `gap: var(--space-3)` (12px) |
| `.audit-stat-row` | `display: flex`; `justify-content: space-between`; `align-items: center`; `min-height: var(--list-item-height)` (44px) |
| `.audit-stat-label` | `font-size: var(--text-body-size)` (17px); `color: var(--color-label-secondary)` |
| `.audit-stat-value` | `font-size: var(--text-title-2-size)` (22px); `font-weight: var(--text-title-2-weight)` (700) |
| `.audit-stat-passed` | `color: var(--color-audit-yes)` → `#34C759` light / `#30D158` dark |
| `.audit-stat-resolved` | `color: var(--color-audit-resolved)` → `#34C759` light / `#30D158` dark |
| `.audit-stat-flagged` | `color: var(--color-audit-flagged)` → `#FF9500` light / `#FF9F0A` dark (ORANGE — not red) |
| `.btn-primary` | Large tap-target primary action button; `background: var(--color-accent)`; `color: #FFFFFF`; `height: 52px`; `border-radius: var(--radius-medium)` (12px); `width: 100%` |
| `.btn-generate-tasks` | `margin-top: var(--section-gap)` (24px) |

---

#### Modification 2 of 3: `lot-checklist-app/app.js` — update `advanceChecklist()`

Locate the `advanceChecklist()` function (added in Task 10). Find the branch that handles the case where all items have been answered — the code that calls `showScreen('audit-summary')` and clears localStorage. Add a call to `renderAuditSummary()` **before** `showScreen('audit-summary')`.

The existing branch should look approximately like:
```javascript
// existing Task 10 code (approximately)
localStorage.removeItem('lot-checklist-app-session-in-progress');
showScreen('audit-summary');
```

Update it to:
```javascript
// updated — add renderAuditSummary() call before screen transition
localStorage.removeItem('lot-checklist-app-session-in-progress');
renderAuditSummary();   // <-- ADD THIS LINE
showScreen('audit-summary');
```

`renderAuditSummary()` is defined in Modification 3 below (appended to `app.js`). The function must exist in `app.js` before `advanceChecklist()` is called at runtime — since both are in the same `app.js` file and loaded together, this is satisfied as long as both are present in the file when it loads.

---

#### Modification 3 of 3: `lot-checklist-app/app.js` — append `renderAuditSummary()` and `generateTaskList()`

Append the following block to `app.js`. Do not modify any existing code other than the `advanceChecklist()` update in Modification 2.

```javascript
// ============================================================
// Task 12 — AuditSummary: renderAuditSummary + generateTaskList
// ============================================================

/**
 * renderAuditSummary()
 * Counts responses by type and updates the audit-summary screen stat display.
 * Called by advanceChecklist() when all checklist items have been answered.
 *
 * Response values (implementation-plan.md Section 4.2):
 *   'yes'            → counted as passed
 *   'done'           → counted as resolved
 *   'needs-followup' → counted as flagged
 */
function renderAuditSummary() {
  var total    = appState.checklist.length;
  var passed   = appState.responses.filter(function (r) { return r.response === 'yes'; }).length;
  var resolved = appState.responses.filter(function (r) { return r.response === 'done'; }).length;
  var flagged  = appState.responses.filter(function (r) { return r.response === 'needs-followup'; }).length;

  document.getElementById('summary-total').textContent    = total;
  document.getElementById('summary-passed').textContent   = passed;
  document.getElementById('summary-resolved').textContent = resolved;
  document.getElementById('summary-flagged').textContent  = flagged;
}

/**
 * generateTaskList()
 * Iterates appState.responses, collects all non-YES responses (done + needs-followup),
 * retrieves the corresponding checklist item for each, and builds a structured task array.
 * Stores the result as appState.taskList.
 *
 * Task object fields (implementation-plan.md Section 7 Task 12):
 *   itemId       — from checklist item id
 *   itemText     — from item.text (verbatim — no transformation)
 *   zone         — from item.zone (null for non-morning-lot-walk items)
 *   failureAction — the complete failureAction object {role, channel, say, responsibleTeam}
 *   response     — 'done' or 'needs-followup'
 *   timestamp    — from the response record
 *   vehicleVIN   — from appState.vehicleVIN (null for non-vehicle audits)
 *
 * Grouping: tasks are grouped by failureAction.responsibleTeam value:
 *   'Lot'     → LOT TEAM group
 *   'Sales'   → SALES TEAM group
 *   'Service' → SERVICE DEPARTMENT group
 * (Grouping is consumed by renderTaskList() in Task 13)
 */
function generateTaskList() {
  var tasks = [];

  appState.responses.forEach(function (response) {
    // Only collect non-YES responses — 'done' and 'needs-followup'
    if (response.response === 'yes') {
      return;
    }

    // Find the matching checklist item by itemId
    var item = null;
    for (var i = 0; i < appState.checklist.length; i++) {
      if (appState.checklist[i].id === response.itemId) {
        item = appState.checklist[i];
        break;
      }
    }
    if (!item) {
      return; // itemId not found — skip (should not occur in normal flow)
    }

    tasks.push({
      itemId:       item.id,
      itemText:     item.text,          // verbatim — Constraint 1 (implementation-plan.md Section 8)
      zone:         item.zone,          // null for non-morning-lot-walk items
      failureAction: item.failureAction, // {role, channel, say, responsibleTeam}
      response:     response.response,  // 'done' or 'needs-followup'
      timestamp:    response.timestamp,
      vehicleVIN:   appState.vehicleVIN // null for non-vehicle audits
    });
  });

  // Store on appState — consumed by renderTaskList() in Task 13
  appState.taskList = tasks;

  // Group by responsibleTeam for renderTaskList()
  // Order: Lot → Sales → Service
  appState.taskListGrouped = {
    lot:     tasks.filter(function (t) { return t.failureAction.responsibleTeam === 'Lot'; }),
    sales:   tasks.filter(function (t) { return t.failureAction.responsibleTeam === 'Sales'; }),
    service: tasks.filter(function (t) { return t.failureAction.responsibleTeam === 'Service'; })
  };
}

// Wire "Generate Task List" button
document.getElementById('btn-generate-tasks').addEventListener('click', function () {
  generateTaskList();
  renderTaskList();  // defined in Task 13
  showScreen('task-list');
});
```

**Notes on `appState.taskList` and `appState.taskListGrouped`:**
- `appState.taskList` is a flat array of all non-YES tasks. Not defined on `appState` before this runs; it is added here dynamically. This is correct — the implementation plan (Section 4.1) states to add this field when generated.
- `appState.taskListGrouped` is a convenience object with three arrays (lot, sales, service) consumed by `renderTaskList()` in Task 13. It is set alongside `appState.taskList` in the same `generateTaskList()` call.

### CONSTRAINTS

- **Offline-first:** No CDN URLs in `index.html` or `app.js`. No external resource references (implementation-plan.md Section 8 Constraint 2).
- **Checklist fidelity:** `item.text` and `item.failureAction` fields are stored in task objects verbatim — no transformation. `generateTaskList()` must not call `.toLowerCase()`, `.trim()`, `.substring()`, or any other string transformation on checklist item content (implementation-plan.md Section 8 Constraint 1).
- **"Generate Task List" button always present:** The button must be present in the HTML regardless of pass/fail counts. Even an audit with all YES responses must show the button. The blueprint.md Section 1 states: "Button is always present regardless of pass/fail count."
- **Color semantics — orange vs. red:** `#summary-flagged` uses `var(--color-audit-flagged)` → `#FF9500` light / `#FF9F0A` dark (ORANGE). It must NOT use `var(--color-destructive)` (RED). Follow-up items are deferred actions, not failures. This distinction is critical per `styling-spec.md` Section 2.
- **No Phase 2 features:** No task completion tracking, no overdue threshold calculation, no decision tree links.

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading the modified files. All criteria are objectively verifiable without running the app.

**`index.html` checks:**
- [ ] Contains `id="audit-summary"` on a `.screen` div
- [ ] Contains `id="summary-total"` inside `#audit-summary`
- [ ] Contains `id="summary-passed"` inside `#audit-summary`
- [ ] Contains `id="summary-resolved"` inside `#audit-summary`
- [ ] Contains `id="summary-flagged"` inside `#audit-summary`
- [ ] Contains `id="btn-generate-tasks"` inside `#audit-summary`
- [ ] Contains `class="glass-card"` on the summary stats container inside `#audit-summary`
- [ ] `#btn-generate-tasks` is present unconditionally (not inside any conditional block)

**`app.js` checks:**
- [ ] `advanceChecklist()` contains a call to `renderAuditSummary()` at the point where `showScreen('audit-summary')` is called
- [ ] Contains `function renderAuditSummary`
- [ ] `renderAuditSummary` reads `appState.responses` and filters by `r.response === 'yes'`, `r.response === 'done'`, `r.response === 'needs-followup'`
- [ ] `renderAuditSummary` sets `summary-total`, `summary-passed`, `summary-resolved`, `summary-flagged` elements
- [ ] Contains `function generateTaskList`
- [ ] `generateTaskList` skips responses where `response.response === 'yes'`
- [ ] `generateTaskList` finds matching checklist item using `item.id === response.itemId`
- [ ] `generateTaskList` stores result as `appState.taskList`
- [ ] `generateTaskList` includes `vehicleVIN: appState.vehicleVIN` in each task object
- [ ] `btn-generate-tasks` click handler calls `generateTaskList()` then `renderTaskList()` then `showScreen('task-list')`
- [ ] `generateTaskList` does NOT use `.toLowerCase()`, `.trim()`, or any string transformation on `item.text` or `item.failureAction` fields

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.12.status` → `"complete"`
   - `prompts.12.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 12 complete.**
> Modified: `lot-checklist-app/index.html` (AuditSummary screen filled), `lot-checklist-app/app.js` (`renderAuditSummary()` and `generateTaskList()` added; `advanceChecklist()` updated to call `renderAuditSummary()`).
>
> **Now unblocked:**
> - `13-task-list-screen.md` — send this next
