# BUILD PROMPT 13 — TASK LIST SCREEN

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL (depends on 12) |
| **Depends on** | 12 |
| **Unblocks** | 14 |
| **Creates/Modifies** | `lot-checklist-app/index.html`, `lot-checklist-app/app.js` |
| **Estimated output** | ~120 lines added across index.html and app.js |

---

## STEP 1 — READ CONTEXT FILES

Read these files before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in STEP 2
2. `lot-checklist-app/styling-spec.md` — Section 7g (TeamGroupHeader: exact label strings "LOT TEAM" / "SALES TEAM" / "SERVICE DEPARTMENT", height 36px, glass-card, footnote 700 uppercase); Section 7h (TaskCard: glass-card, field rows VEHICLE/ITEM/ACTION/TEAM/STATUS, FOLLOW-UP variant with left border var(--color-needs-followup), Resolved variant with var(--color-success) badge); Section 7i (ShareButton: Heroicons share icon, position in nav, aria-label, color var(--color-accent)); Section 6 (task-list-appear animation: opacity 0→1, translateY 12px→0, 50ms stagger per card via --card-index CSS var); Section 2 (colors: --color-needs-followup orange, --color-success green)
3. `lot-checklist-app/implementation-plan.md` — Section 7 Task 13 (exact scope: renderTaskList, team grouping Lot→Sales→Service, FOLLOW-UP highlighting, ShareButton wired to shareTaskList()); Section 5.2 (screen ID `task-list`); Section 8 (Constraints)
4. `lot-checklist-app/blueprint.md` — Section 1 (TaskList screen: trigger, description, task groups, "Share Task List" button); Section 5 (TaskListGroup, TeamGroupHeader, TaskCard, ShareButton component specs)
5. `lot-checklist-app/index.html` — read existing structure; locate `<div id="task-list" class="screen">` to fill
6. `lot-checklist-app/app.js` — read existing structure; verify `appState.taskList` and `appState.taskListGrouped` exist (set by `generateTaskList()` in Task 12); locate where `renderTaskList()` is called from (`btn-generate-tasks` handler in Task 12)

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If prompt `13` has any status other than `pending`:**
STOP. Tell the user exactly:
> "Build prompt 13 has status `[current status]` — expected `pending`. Do not re-run a completed or in-progress prompt. If you need to reset, set status back to `pending` and restore output files to their pre-run state."

**If prompt `13` has status `pending`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.13.status` → `"in_progress"`
- `prompts.13.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting build prompt 13: TASK LIST SCREEN."

---

## STEP 3 — TASK

### Context

This task fills the `#task-list` screen in `index.html` and adds `renderTaskList()` to `app.js`.

The TaskList screen displays all non-YES checklist responses as actionable task cards, grouped by the responsible team. The task data is already in `appState.taskListGrouped` (set by `generateTaskList()` in Task 12). `renderTaskList()` reads this data and dynamically builds the DOM: a `.team-header` element followed by `.task-card` elements for each group, in order Lot → Sales → Service. Groups with zero tasks are omitted.

Each task card shows: VIN (if a vehicle audit), zone (if a Morning Lot Walk item), the checklist item text, and the failure action details (role, channel, say). Cards where `response === 'needs-followup'` receive the `.task-card--follow-up` CSS class and a left orange border. Cards where `response === 'done'` receive a green Resolved badge. All text fields are output verbatim with no transformation.

The "Share Task List" button is placed in the nav bar of this screen (not below the task list, to keep it always accessible). It wires to `shareTaskList()` which is implemented in Task 14.

The `task-list-appear` stagger animation (`styling-spec.md` Section 6) is applied to each `.task-card` using a `--card-index` CSS custom property set inline on each card element.

### Instructions

#### Modification 1 of 2: `lot-checklist-app/index.html`

Locate the `<div id="task-list" class="screen">` container. Fill it with the following HTML. Do not modify any other element in `index.html`.

```html
<div id="task-list" class="screen">

  <!-- Nav bar with Share button in top-right (styling-spec.md Section 7i) -->
  <nav class="glass-nav task-list-nav">
    <span class="nav-title">Task List</span>
    <!-- ShareButton: icon + label, color var(--color-accent), min 44×44px tap target -->
    <button id="btn-share-tasks" class="btn-share" aria-label="Share task list">
      <!-- Heroicons "share" icon — references SVG sprite symbol defined in Task 07 -->
      <svg aria-hidden="true" width="24" height="24">
        <use href="#icon-share" />
      </svg>
      <span class="btn-share-label">Share</span>
    </button>
  </nav>

  <!-- Scrollable task list container — populated by renderTaskList() -->
  <div class="content-area">
    <div id="task-list-container" class="task-list-container">
      <!-- Task groups injected here by renderTaskList() in app.js:
           Structure per group:
             <div class="team-group">
               <div class="team-header">LOT TEAM</div>   ← TeamGroupHeader
               <div class="task-card glass-card [task-card--follow-up]" style="--card-index: N;">
                 ... task card fields ...
               </div>
             </div>
      -->
    </div>
  </div>

</div>
```

**CSS class reference (from `styling-spec.md`):**

| Class | Key Properties |
|---|---|
| `.task-list-nav` | `display: flex`; `justify-content: space-between`; `align-items: center` — positions title left, share button right |
| `.btn-share` | Section 7i: `background: transparent`; `color: var(--color-accent)` → `#007AFF` light / `#0A84FF` dark; `display: flex`; `align-items: center`; `gap: var(--space-1)` (4px); `min-width: 44px`; `min-height: 44px`; `font-size: var(--text-callout-size)` (16px) |
| `.btn-share:active` | Section 7i: `opacity: 0.6`; `transition: opacity var(--duration-fast) var(--easing-standard)` |
| `.task-list-container` | `display: flex`; `flex-direction: column`; `gap: var(--card-gap)` (12px) |
| `.team-group` | `display: flex`; `flex-direction: column`; `gap: var(--card-gap)` (12px) |
| `.team-header` | Section 7g: `height: 36px`; `background: .glass-card`; `font-size: var(--text-footnote-size)` (13px); `font-weight: 700`; `text-transform: uppercase`; `letter-spacing: var(--text-caption-2-ls)` (0.07px); `color: var(--color-label-secondary)`; `padding: var(--space-2) var(--space-4)`; `display: flex`; `align-items: center`; `border-radius: 0` |
| `.task-card` | Section 7h: `.glass-card`; `padding: var(--card-padding)` (16px); `display: flex`; `flex-direction: column`; `gap: var(--space-2)` (8px) |
| `.task-card--follow-up` | Section 7h: `border-left: 4px solid var(--color-needs-followup)` → `#FF9500` light / `#FF9F0A` dark |
| `.task-field-row` | `display: flex`; `flex-direction: column`; `gap: 2px` |
| `.task-field-label` | Section 7h: `font-size: var(--text-caption-2-size)` (11px); `text-transform: uppercase`; `color: var(--color-label-secondary)` |
| `.task-field-vehicle` | Section 7h: `font-size: var(--text-subheadline-size)` (15px); `font-weight: var(--text-subheadline-weight)` (400); `color: var(--color-label-primary)` |
| `.task-field-item` | Section 7h: `font-size: var(--text-body-size)` (17px); `font-weight: var(--text-body-weight)` (400); `color: var(--color-label-primary)` |
| `.task-field-action` | Section 7h: `font-size: var(--text-callout-size)` (16px); `font-weight: var(--text-callout-weight)` (400); `color: var(--color-label-primary)` |
| `.task-status-badge` | Section 7h: `border-radius: var(--radius-pill)`; `padding: 2px 8px`; `font-size: var(--text-footnote-size)` (13px); `font-weight: 600`; `color: #FFFFFF`; `display: inline-block` |
| `.task-status-badge.resolved` | `background: var(--color-success)` → `#34C759` light / `#30D158` dark |
| `.task-status-badge.follow-up` | `background: var(--color-needs-followup)` → `#FF9500` light / `#FF9F0A` dark |

---

#### Modification 2 of 2: `lot-checklist-app/app.js`

Append the following block to `app.js`. Do not modify any existing code.

```javascript
// ============================================================
// Task 13 — TaskList: renderTaskList
// ============================================================

/**
 * renderTaskList()
 * Reads appState.taskListGrouped (set by generateTaskList() in Task 12).
 * Builds the task list DOM inside #task-list-container.
 * Groups displayed in order: LOT TEAM → SALES TEAM → SERVICE DEPARTMENT.
 * Groups with zero tasks are omitted entirely.
 *
 * FOLLOW-UP variant (response === 'needs-followup'):
 *   - Applies .task-card--follow-up class (left orange border)
 *   - STATUS badge: background var(--color-needs-followup), label "FOLLOW-UP"
 *
 * Resolved variant (response === 'done'):
 *   - No left border variant
 *   - STATUS badge: background var(--color-success), label "Resolved"
 *
 * task-list-appear animation (styling-spec.md Section 6):
 *   Each .task-card gets style="--card-index: N" where N is the card's
 *   position in the flattened list (0-based). CSS uses this to stagger
 *   animation-delay: calc(var(--card-index) * 50ms).
 */
function renderTaskList() {
  var container = document.getElementById('task-list-container');
  container.innerHTML = ''; // clear previous render

  var grouped = appState.taskListGrouped;
  var groups = [
    { key: 'lot',     label: 'LOT TEAM' },
    { key: 'sales',   label: 'SALES TEAM' },
    { key: 'service', label: 'SERVICE DEPARTMENT' }
  ];

  var cardIndex = 0; // global card index for stagger animation

  groups.forEach(function (group) {
    var tasks = grouped[group.key];
    if (!tasks || tasks.length === 0) {
      return; // omit groups with no tasks
    }

    // Create team group wrapper
    var groupEl = document.createElement('div');
    groupEl.className = 'team-group';

    // TeamGroupHeader (styling-spec.md Section 7g)
    var headerEl = document.createElement('div');
    headerEl.className = 'team-header glass-card';
    headerEl.textContent = group.label; // exactly: "LOT TEAM" | "SALES TEAM" | "SERVICE DEPARTMENT"
    groupEl.appendChild(headerEl);

    // Task cards
    tasks.forEach(function (task) {
      var isFollowUp = task.response === 'needs-followup';

      // Card element — applies glass-card and conditionally task-card--follow-up
      var cardEl = document.createElement('div');
      cardEl.className = 'task-card glass-card' + (isFollowUp ? ' task-card--follow-up' : '');
      // Set --card-index for task-list-appear stagger animation (styling-spec.md Section 6)
      cardEl.style.setProperty('--card-index', cardIndex);
      cardIndex++;

      // VEHICLE field — shown only for vehicle audits (vehicleVIN is non-null)
      if (task.vehicleVIN) {
        var vehicleRow = document.createElement('div');
        vehicleRow.className = 'task-field-row';
        vehicleRow.innerHTML =
          '<span class="task-field-label">VEHICLE</span>' +
          '<span class="task-field-vehicle">' + escapeHtml(task.vehicleVIN) + '</span>';
        cardEl.appendChild(vehicleRow);
      }

      // ZONE field — shown only for Morning Lot Walk items (zone is non-null)
      if (task.zone) {
        var zoneRow = document.createElement('div');
        zoneRow.className = 'task-field-row';
        zoneRow.innerHTML =
          '<span class="task-field-label">ZONE</span>' +
          '<span class="task-field-item">' + escapeHtml(task.zone) + '</span>';
        cardEl.appendChild(zoneRow);
      }

      // ITEM field — checklist item text (verbatim — Constraint 1)
      var itemRow = document.createElement('div');
      itemRow.className = 'task-field-row';
      itemRow.innerHTML =
        '<span class="task-field-label">ITEM</span>' +
        '<span class="task-field-item">' + escapeHtml(task.itemText) + '</span>';
      cardEl.appendChild(itemRow);

      // ACTION field — failure action role + channel + say (verbatim — Constraint 7)
      var actionText = task.failureAction.role + ' — ' + task.failureAction.channel;
      if (task.failureAction.say) {
        actionText += ': ' + task.failureAction.say; // verbatim say script
      }
      var actionRow = document.createElement('div');
      actionRow.className = 'task-field-row';
      actionRow.innerHTML =
        '<span class="task-field-label">ACTION</span>' +
        '<span class="task-field-action">' + escapeHtml(actionText) + '</span>';
      cardEl.appendChild(actionRow);

      // STATUS badge — FOLLOW-UP (orange) or Resolved (green)
      var statusRow = document.createElement('div');
      statusRow.className = 'task-field-row';
      var badgeClass = isFollowUp ? 'task-status-badge follow-up' : 'task-status-badge resolved';
      var badgeLabel = isFollowUp ? 'FOLLOW-UP' : 'Resolved';
      statusRow.innerHTML =
        '<span class="task-field-label">STATUS</span>' +
        '<span class="' + badgeClass + '">' + badgeLabel + '</span>';
      cardEl.appendChild(statusRow);

      groupEl.appendChild(cardEl);
    });

    container.appendChild(groupEl);
  });

  // If no tasks at all, show an empty state message
  if (cardIndex === 0) {
    var emptyEl = document.createElement('p');
    emptyEl.className = 'task-list-empty';
    emptyEl.textContent = 'All items passed. No tasks to action.';
    container.appendChild(emptyEl);
  }
}

/**
 * escapeHtml(str)
 * Escapes user-visible strings before inserting via innerHTML.
 * Prevents XSS from checklist data that could contain special characters.
 * Used only for display — .textContent is preferred where innerHTML is not needed.
 */
function escapeHtml(str) {
  if (str === null || str === undefined) { return ''; }
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Wire Share button — implementation added in Task 14
document.getElementById('btn-share-tasks').addEventListener('click', function () {
  shareTaskList(); // defined in Task 14
});
```

**Notes on `task-list-appear` animation:**
The `--card-index` CSS custom property is set as an inline style on each `.task-card` element. The CSS (written in Task 04 or Task 03) must apply:

```css
/* In styles.css — ensure this is present from Task 04 */
.task-card {
  opacity: 0;
  transform: translateY(12px);
  animation: task-list-appear var(--duration-standard) var(--easing-decelerate) forwards;
  animation-delay: calc(var(--card-index, 0) * 50ms);
}
@keyframes task-list-appear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

If this animation CSS is not already in `styles.css` from a prior task, add it at the end of `styles.css` now.

### CONSTRAINTS

- **Offline-first:** No CDN URLs. The Heroicons `<use href="#icon-share" />` references the inline SVG sprite in `index.html` (set up in Task 07) — no external icon library fetch (implementation-plan.md Section 8 Constraint 2).
- **Checklist fidelity:** `task.itemText` and `task.failureAction` fields are output verbatim. The `escapeHtml()` helper is used for safe DOM insertion via `innerHTML` but does not alter the semantic content of the strings. No summarization, truncation, or rewording (implementation-plan.md Section 8 Constraints 1 and 7).
- **Color semantics — orange vs. red:** FOLLOW-UP badge uses `var(--color-needs-followup)` (ORANGE: `#FF9500` light / `#FF9F0A` dark). It must NOT use `var(--color-destructive)` (RED: `#FF3B30` light / `#FF453A` dark). Follow-up items are deferred actions, not failures (styling-spec.md Section 2 critical distinction).
- **Team group order fixed:** Always render Lot → Sales → Service. This order is specified in `implementation-plan.md` Section 7 Task 13. Do not sort by task count or any other criterion.
- **Team group label strings exact:** Use exactly `"LOT TEAM"`, `"SALES TEAM"`, `"SERVICE DEPARTMENT"` — no other casing, no abbreviations (styling-spec.md Section 7g).
- **Groups with zero tasks omitted:** A group that has no tasks is not rendered at all — no empty header. Only groups with at least one task are shown.
- **Binary responses only:** The only response values in `appState.taskList` are `'done'` and `'needs-followup'`. There is no 'yes' value in the task list (filtered out by `generateTaskList()` in Task 12). The status badge renders one of exactly two states: "Resolved" or "FOLLOW-UP".
- **No Phase 2 features:** No decision tree links, no `→ SEE:` hyperlink rendering, no task completion UI, no overdue marking.

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading the modified files. All criteria are objectively verifiable without running the app.

**`index.html` checks:**
- [ ] Contains `id="task-list"` on a `.screen` div
- [ ] Contains `id="task-list-container"` inside `#task-list`
- [ ] Contains `id="btn-share-tasks"` inside `#task-list`
- [ ] `#btn-share-tasks` has `aria-label="Share task list"`
- [ ] `#btn-share-tasks` contains `<use href="#icon-share" />` referencing the inline SVG sprite
- [ ] `#btn-share-tasks` has `class="btn-share"`

**`app.js` checks:**
- [ ] Contains `function renderTaskList`
- [ ] `renderTaskList` defines `groups` array containing keys `'lot'`, `'sales'`, `'service'` in that order
- [ ] `renderTaskList` uses team labels exactly: `'LOT TEAM'`, `'SALES TEAM'`, `'SERVICE DEPARTMENT'`
- [ ] `renderTaskList` applies class `task-card--follow-up` when `task.response === 'needs-followup'`
- [ ] `renderTaskList` sets `style="--card-index: N"` (or `style.setProperty('--card-index', ...)`) on each `.task-card`
- [ ] `renderTaskList` skips groups with zero tasks (no empty `.team-header` rendered)
- [ ] `btn-share-tasks` click handler calls `shareTaskList()`
- [ ] Contains `function escapeHtml`
- [ ] `renderTaskList` does NOT use `.toLowerCase()`, `.trim()`, or `.substring()` on task text fields

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.13.status` → `"complete"`
   - `prompts.13.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 13 complete.**
> Modified: `lot-checklist-app/index.html` (TaskList screen filled with nav, share button, task list container), `lot-checklist-app/app.js` (`renderTaskList()` and `escapeHtml()` added; share button wired to `shareTaskList()`).
>
> **Now unblocked:**
> - `14-share-function.md` — send this next
