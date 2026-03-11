# BUILD PROMPT 01 — PROJECT SCAFFOLD

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL (runs first, no group) |
| **Depends on** | none |
| **Unblocks** | 02, 05 |
| **Creates** | `lot-checklist-app/index.html`, `lot-checklist-app/styles.css`, `lot-checklist-app/app.js`, `lot-checklist-app/data.js` |
| **Estimated output** | ~30 lines total across 4 files |

---

## STEP 1 — READ CONTEXT FILES

Read these files before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in STEP 2
2. `lot-checklist-app/implementation-plan.md` — technology decisions, file structure, script load order (Section 2)

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If prompt `01` has any status other than `pending`:**
STOP. Tell the user exactly:
> "Build prompt 01 has status `[current status]` — expected `pending`. Do not re-run a completed or in-progress prompt. If you need to reset, set status back to `pending` and restore output files to their pre-run state."

**If prompt `01` has status `pending`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.01.status` → `"in_progress"`
- `prompts.01.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting build prompt 01: PROJECT SCAFFOLD."

---

## STEP 3 — TASK

### Context

This task creates the four source files that constitute the Lot Checklist App. Each file is initialized with minimal valid stub content only. No functional logic, no CSS rules, no checklist data are added in this task — those are added by Tasks 2–17. The file structure, script load order, and initial HTML attributes defined here must be preserved by all subsequent tasks.

**Key requirement from `implementation-plan.md` Section 2 — Script load order:**
```html
<script src="data.js"></script>   <!-- Must load BEFORE app.js -->
<script src="app.js"></script>    <!-- Reads CHECKLISTS from data.js on DOMContentLoaded -->
```
Reversing this order breaks the app. `data.js` must always appear first.

**Key requirement from `styling-spec.md` Section 2 — Theme attribute:**
The `<html>` element must carry `data-theme="light"` as its default. All color tokens in `styles.css` are scoped to `[data-theme="light"]` and `[data-theme="dark"]` attribute selectors on this element.

**Key requirement from `styling-spec.md` Section 9 — Safe area insets:**
The viewport meta tag must include `viewport-fit=cover` to enable `env(safe-area-inset-*)` CSS values used in the app shell and nav bar layout.

### CONSTRAINTS

- **Offline-first:** No `<link>` or `<script>` tag in `index.html` may point to any CDN URL, external origin, or remote resource of any kind. `styles.css`, `data.js`, and `app.js` are local files only.
- **No build step:** No npm, no bundler, no transpiler, no framework. Files are plain HTML, CSS, and JavaScript only.
- **Script load order is mandatory:** `<script src="data.js">` must appear before `<script src="app.js">` at the bottom of `<body>`. This is an architectural invariant — do not change it in any subsequent task.
- **Binary responses only:** The checklist flow enforces YES/NO responses only. No free-text entry on any checklist screen.
- **Exact Failure Action text:** Failure Action text (role, channel, SAY script) is rendered verbatim — no string transformation.
- **No Phase 2 features:** No routes, screens, or fields for Phase 2 features (task completion tracking, decision tree links, overdue thresholds, lot map) in any Phase 1 file.

### Instructions

Create or overwrite the following four files. Write the exact content shown below — no additions, no omissions.

---

#### File 1 of 4: `lot-checklist-app/index.html`

Write this exact content:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>Lot Checklist</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="app-shell">

  <!-- SVG sprite block — Heroicons inline symbols added in Task 07 -->

  <!-- Screen containers — one per screen ID.
       Required IDs (implementation-plan.md Section 5.2):
         home, audit-type-select, vin-entry, category-select,
         key-plate-subtype-select, checklist-view, failure-action-view,
         audit-summary, task-list, pdi-compliance-view
       Content added in Tasks 07–17. -->

  <!-- Resume modal — content added in Task 07 -->

  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

---

#### File 2 of 4: `lot-checklist-app/styles.css`

Write this exact content:

```css
/* Lot Checklist App — styles.css
   Design tokens (CSS custom properties), CSS reset, glass material classes,
   and component atom styles.

   Task 02 adds: all :root custom properties (typography, spacing, border-radius,
                 animation), color tokens ([data-theme] selectors), CSS reset,
                 base html/body/.app-shell/.screen/.content-area styles.
   Task 03 adds: glass custom properties on :root; .glass-card, .glass-nav,
                 .glass-modal classes with @supports fallbacks.
   Task 04 adds: component atom styles (.btn-yes, .btn-no, .btn-done,
                 .btn-follow-up, .progress-bar, .zone-header, .team-header,
                 .checklist-item, .btn-share, .audit-type-tile, .task-card,
                 .toast, .modal-overlay, .modal-box).
*/
```

---

#### File 3 of 4: `lot-checklist-app/app.js`

Write this exact content:

```javascript
/* Lot Checklist App — app.js
   All application state and logic. Vanilla JS — no framework, no imports.

   Task 08 adds: appState object (all fields), showScreen(), initFreshSession(),
                 Home screen wiring, AuditTypeSelect screen wiring, audit type
                 routing to vin-entry / checklist-view / pdi-compliance-view /
                 key-plate-subtype-select. resumeCheck() stub (replaced in Task 15).
   Task 09 adds: VINEntry validation, CategorySelect routing.
   Task 10 adds: renderChecklistItem(), YES button handler, NO button handler,
                 advanceChecklist().
   Task 11 adds: renderFailureAction(), Done button handler, Needs Follow-Up handler.
   Task 12 adds: renderAuditSummary(), generateTaskList().
   Task 13 adds: renderTaskList(), task-card rendering with team grouping.
   Task 14 adds: shareTaskList() — Web Share API + clipboard fallback.
   Task 15 adds: resumeCheck() full implementation (replaces stub), persistState()
                 canonical definition.
   Task 16 adds: KeyPlateSubTypeSelect routing and button wiring.
   Task 17 adds: PDIComplianceView calculate-status logic and PDI checklist routing.
*/

document.addEventListener('DOMContentLoaded', function () {
  // Full initialization sequence is added in Task 08.
  // resumeCheck() — implemented in Task 15 — will be called here.
});
```

---

#### File 4 of 4: `lot-checklist-app/data.js`

Write this exact content:

```javascript
/* Lot Checklist App — data.js
   All checklist content. Pre-bundled — no fetch calls, no async loading.
   Available offline immediately on page load.

   Exact key structure (implementation-plan.md Section 3.1):
     CHECKLISTS['vehicle-audit']['NEW']          — 7 items (Task 05)
     CHECKLISTS['vehicle-audit']['FLR']          — 8 items (Task 05)
     CHECKLISTS['vehicle-audit']['SOLD']         — 3 items (Task 05)
     CHECKLISTS['vehicle-audit']['BND']          — 4 items (Task 05)
     CHECKLISTS['vehicle-audit']['RECON']        — 6 items (Task 05)
     CHECKLISTS['morning-lot-walk']              — 15 items (Task 06)
     CHECKLISTS['pdi-compliance']               — 1 template item (Task 06)
     CHECKLISTS['key-plate']['sign-out']         — 4 items (Task 06)
     CHECKLISTS['key-plate']['sign-in']          — 2 items (Task 06)
     CHECKLISTS['key-plate']['periodic-audit']   — 2 items (Task 06)
*/

const CHECKLISTS = {};
```

---

### Verification After Writing

Confirm all four files exist in `lot-checklist-app/` before proceeding to STEP 4.

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by opening (reading) the created files. All criteria are objectively verifiable without running the app.

- [ ] `lot-checklist-app/index.html` exists
- [ ] `lot-checklist-app/index.html` contains `<!DOCTYPE html>`
- [ ] `lot-checklist-app/index.html` contains `data-theme="light"` on the `<html>` element
- [ ] `lot-checklist-app/index.html` contains `viewport-fit=cover` in the viewport `<meta>` tag
- [ ] `lot-checklist-app/index.html` contains `<link rel="stylesheet" href="styles.css">`
- [ ] `lot-checklist-app/index.html` contains `<script src="data.js"></script>`
- [ ] `lot-checklist-app/index.html` contains `<script src="app.js"></script>`
- [ ] `lot-checklist-app/index.html` contains `data.js` script tag BEFORE `app.js` script tag (in document order)
- [ ] `lot-checklist-app/index.html` does NOT contain any CDN URL (no `https://cdn.`, no `unpkg.com`, no `jsdelivr.net`, no external origin)
- [ ] `lot-checklist-app/styles.css` exists
- [ ] `lot-checklist-app/app.js` exists
- [ ] `lot-checklist-app/app.js` contains `DOMContentLoaded`
- [ ] `lot-checklist-app/data.js` exists
- [ ] `lot-checklist-app/data.js` contains `const CHECKLISTS = {}`

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.01.status` → `"complete"`
   - `prompts.01.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 01 complete.**
> Created: `lot-checklist-app/index.html`, `styles.css`, `app.js`, `data.js` (scaffold stubs).
>
> **Now unblocked — send these two prompts in parallel (separate chat sessions):**
> - `02-css-foundation.md` — CSS custom properties and base styles (`styles.css`)
> - `05-checklist-data-vehicle-audits.md` — Vehicle audit checklist data (`data.js`)
>
> Both depend only on prompt 01. Send them simultaneously to two separate Claude Code sessions.
