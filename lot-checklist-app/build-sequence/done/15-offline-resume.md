# BUILD PROMPT 15 — OFFLINE RESUME

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL |
| **Depends on** | Build prompts 08, 09, 10, 11, 12, 13, 14 |
| **Unblocks** | 18 (partially — 18 also requires 16 and 17) |
| **Modifies** | `lot-checklist-app/index.html`, `lot-checklist-app/app.js` |
| **Creates** | no new files |
| **Estimated output** | ~80 lines added across `index.html` and `app.js` |

---

## STEP 1 — READ CONTEXT FILES

Read these files completely before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in Step 2
2. `lot-checklist-app/styling-spec.md` — glass classes, spacing, color tokens
3. `lot-checklist-app/implementation-plan.md` — Section 6 (Offline Resume Logic) is the authoritative algorithm spec
4. `lot-checklist-app/blueprint.md` — screen inventory, navigation flow, data model
5. `lot-checklist-app/index.html` — the file as modified by Tasks 07–14; read before any modification
6. `lot-checklist-app/app.js` — the file as modified by Tasks 08–14; read before any modification

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`. Check the `status` field for build prompt `14` (label: `share-function`).

**If build prompt 14 has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 15 cannot start — build prompt 14 (share-function) has status `[current status]`.
> Wait for build prompt 14 to complete, then re-send this prompt."

**If build prompt 14 has status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts["15"].status` → `"in_progress"`
- `prompts["15"].started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Build prompt 14 is complete. Starting build prompt 15: OFFLINE RESUME."

---

## STEP 3 — TASK

### Context

This task implements the offline resume system. Prior tasks (08–14) added a `resumeCheck()` stub call at app initialization. This task replaces that stub with the full algorithm defined in `implementation-plan.md` Section 6. It also ensures `persistState()` is properly defined and confirms the `#resume-modal` HTML structure is complete.

The resume-prompt modal was scaffolded in Task 07 (`index.html`). Verify it exists with the correct child element IDs before writing. If the modal structure is incomplete or missing, write it now.

---

### index.html — Resume Modal Structure

Locate `<div id="resume-modal">` in `index.html`. It must contain exactly these child elements (verify existing structure matches; add any missing elements):

```html
<div id="resume-modal" style="display:none; position:fixed; inset:0; z-index:1000; align-items:center; justify-content:center; background:rgba(0,0,0,0.5);">
  <div class="glass-modal" style="max-width:360px; width:calc(100% - 32px); padding:var(--space-6); border-radius:var(--radius-large);">
    <h2 style="font-size:var(--text-title-2-size); font-weight:var(--text-title-2-weight); color:var(--color-label-primary); margin-bottom:var(--space-3);">Audit in Progress</h2>
    <p style="font-size:var(--text-body-size); color:var(--color-label-secondary); margin-bottom:var(--space-6);">You have an audit in progress. Resume where you left off?</p>
    <button id="btn-resume" style="display:block; width:100%; height:50px; border:none; border-radius:var(--radius-medium); background:var(--color-accent); color:#FFFFFF; font-size:var(--text-callout-size); font-weight:600; margin-bottom:var(--space-3); cursor:pointer;">Resume</button>
    <button id="btn-start-fresh" style="display:block; width:100%; height:50px; border:none; border-radius:var(--radius-medium); background:var(--color-fill); color:var(--color-label-primary); font-size:var(--text-callout-size); font-weight:600; cursor:pointer;">Start Fresh</button>
  </div>
</div>
```

The modal uses `.glass-modal` which is defined in `styles.css` (written in Task 03). Its `display` is `none` by default; `resumeCheck()` sets it to `flex` when a restorable session is found.

---

### app.js — Define `persistState()`

Locate `persistState()` in `app.js`. It must be defined as the canonical implementation below. If a stub or partial version exists from a prior task, replace it entirely with:

```javascript
function persistState() {
  localStorage.setItem(
    'lot-checklist-app-session-in-progress',
    JSON.stringify(appState)
  );
}
```

Verify that every call site where a response is recorded — in `renderChecklistItem()` YES handler (Task 10), in FailureActionView Done handler (Task 11), and in FailureActionView Needs Follow-Up handler (Task 11) — calls `persistState()` immediately after `appState.responses.push(...)`. If any call site is missing `persistState()`, add it.

---

### app.js — Implement `resumeCheck()`

Locate the `resumeCheck()` stub that was inserted by Task 08. Replace it entirely with the full implementation below. This implementation follows the algorithm defined verbatim in `implementation-plan.md` Section 6.1:

```javascript
function resumeCheck() {
  const storedValue = localStorage.getItem('lot-checklist-app-session-in-progress');

  // CASE A — no stored session
  if (storedValue === null || storedValue === undefined) {
    initFreshSession();
    showScreen('home');
    return;
  }

  // CASE B — stored value exists; attempt parse
  let restoredState;
  try {
    restoredState = JSON.parse(storedValue);
  } catch (e) {
    // CASE B-1 — corrupt data
    localStorage.removeItem('lot-checklist-app-session-in-progress');
    initFreshSession();
    showScreen('home');
    return;
  }

  // CASE B-2 — valid parsed state; show resume modal
  const modal = document.getElementById('resume-modal');
  modal.style.display = 'flex';

  // Wire Resume button
  document.getElementById('btn-resume').addEventListener('click', function () {
    modal.style.display = 'none';

    // Copy all fields from restoredState into appState
    Object.assign(appState, restoredState);

    // Restore checklist array reference from CHECKLISTS constant
    // (JSON round-trip produces a copy, not the original reference — content is identical)
    if (appState.auditType === 'vehicle-audit' && appState.vehicleCategory) {
      appState.checklist = CHECKLISTS['vehicle-audit'][appState.vehicleCategory];
    } else if (appState.auditType === 'morning-lot-walk') {
      appState.checklist = CHECKLISTS['morning-lot-walk'];
    } else if (appState.auditType === 'pdi-compliance') {
      appState.checklist = CHECKLISTS['pdi-compliance'];
    } else if (appState.auditType === 'key-plate' && appState.keyPlateSubType) {
      appState.checklist = CHECKLISTS['key-plate'][appState.keyPlateSubType];
    }

    // Navigate to the screen where the session was interrupted
    showScreen(appState.screen);

    // Re-render content for stateful screens
    if (appState.screen === 'checklist-view') {
      renderChecklistItem(appState.currentItemIndex);
    } else if (appState.screen === 'failure-action-view') {
      renderFailureAction(appState.currentItemIndex);
    }
  });

  // Wire Start Fresh button
  document.getElementById('btn-start-fresh').addEventListener('click', function () {
    modal.style.display = 'none';
    localStorage.removeItem('lot-checklist-app-session-in-progress');
    initFreshSession();
    showScreen('home');
  });
}
```

**Important:** `resumeCheck()` is called from the DOMContentLoaded handler that was established in Task 08. Do not add a second DOMContentLoaded listener. The call sequence in the existing listener must be:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  resumeCheck();  // this is the entry point — all other initialization follows from resumeCheck
});
```

---

### app.js — Verify `showScreen()` Calls `persistState()`

`showScreen()` was defined in Task 08. Per `implementation-plan.md` Section 5.1, it must call `persistState()` at the end. Verify the existing `showScreen()` function contains:

```javascript
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(function(el) {
    el.style.display = 'none';
  });
  const target = document.getElementById(screenId);
  if (target) {
    target.style.display = 'block';
  }
  appState.screen = screenId;
  persistState();
}
```

If `persistState()` is missing from the end of `showScreen()`, add it.

---

### CONSTRAINTS

The following constraints from `implementation-plan.md` Section 8 apply to this task:

| Constraint | Requirement |
|---|---|
| **Offline-first** | No CDN URLs. No fetch calls. `persistState()` uses `localStorage.setItem` only. No network calls in the resume flow. |
| **Binary responses enforced** | The resume modal buttons ("Resume" and "Start Fresh") are the only interactive elements in the modal. No text input in the modal. |
| **Checklist fidelity** | When restoring state, `appState.checklist` is re-pointed to the original `CHECKLISTS` array using the restored `auditType`, `vehicleCategory`, and `keyPlateSubType` values. The content of the restored array is identical to the original — no transformation occurs. |
| **No architectural decisions** | `resumeCheck()` implements only the algorithm defined in `implementation-plan.md` Section 6.1. No behavior may be added, removed, or modified from that spec. |
| **localStorage key** | The exact key `'lot-checklist-app-session-in-progress'` must be used for all `getItem`, `setItem`, and `removeItem` calls. No variation in key name is permitted. |

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by opening `lot-checklist-app/app.js` and `lot-checklist-app/index.html` and checking for exact strings:

- [ ] `app.js` contains the function declaration `function resumeCheck()`
- [ ] `app.js` contains `localStorage.getItem('lot-checklist-app-session-in-progress')`
- [ ] `app.js` contains `localStorage.removeItem('lot-checklist-app-session-in-progress')`
- [ ] `app.js` contains `Object.assign(appState, restoredState)`
- [ ] `app.js` contains `function persistState()`
- [ ] `app.js` contains `localStorage.setItem('lot-checklist-app-session-in-progress', JSON.stringify(appState))`
- [ ] `app.js` contains `CHECKLISTS['vehicle-audit'][appState.vehicleCategory]` (inside the resume branch)
- [ ] `app.js` contains `renderChecklistItem(appState.currentItemIndex)` (inside the resume branch)
- [ ] `app.js` contains `renderFailureAction(appState.currentItemIndex)` (inside the resume branch)
- [ ] `index.html` contains `id="resume-modal"`
- [ ] `index.html` contains `id="btn-resume"`
- [ ] `index.html` contains `id="btn-start-fresh"`
- [ ] `index.html` contains text content "Audit in Progress"
- [ ] `index.html` contains text content "Resume where you left off?"

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts["15"].status` → `"complete"`
   - `prompts["15"].completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 15 complete.** Offline resume implemented.
>
> **Now unblocked (partially):** Build prompt 18 (integration-test) — but it also requires prompts 16 and 17 to complete first.
> If prompts 16 and 17 are also complete, send `18-integration-test.md` next.
