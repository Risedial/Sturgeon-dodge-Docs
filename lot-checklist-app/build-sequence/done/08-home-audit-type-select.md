# BUILD PROMPT 08 — HOME SCREEN + AUDITYPESELECT SCREEN

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL |
| **Depends on** | Build task 07 (app-shell-html) |
| **Unblocks** | Build task 09 |
| **Writes to** | `lot-checklist-app/index.html`, `lot-checklist-app/app.js` |
| **Estimated output** | ~80 lines added across index.html and app.js |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — check in Step 2
2. `lot-checklist-app/styling-spec.md` — AuditTypeTile spec (Section 7j), glass classes (Section 3), typography (Section 1), spacing (Section 4), animation (Section 6), ShareButton not needed here
3. `lot-checklist-app/implementation-plan.md` — appState object (Section 4.1), showScreen() (Section 5.1), screen ID registry (Section 5.2), initFreshSession() (Section 4.4), routing logic (Section 5.3)
4. `lot-checklist-app/blueprint.md` — Home screen (Section 1), AuditTypeSelect screen (Section 1), AuditTypeTile component (Section 5), navigation flow (Section 2)
5. `lot-checklist-app/index.html` — output of build task 07; read to understand existing structure before modifying
6. `lot-checklist-app/app.js` — output of build task 01 scaffold; read before modifying

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If build task 07 (`app-shell-html`) has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 08 cannot start — build task 07 (app-shell-html) has status `[current status]`.
> Wait for build task 07 to complete, then re-send this prompt."

**If build task 07 has status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.08.status` → `"in_progress"`
- `prompts.08.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Build task 07 complete. Starting build prompt 08: HOME SCREEN + AUDITTYPESELECT SCREEN."

---

## STEP 3 — TASK

### Context

This task fills the content of two screens — `#home` and `#audit-type-select` — inside `index.html`, and replaces the `DOMContentLoaded` stub in `app.js` with the full initialization sequence. After this task, the app can launch, display the home screen, display the audit type selector, and route to the correct next screen for each audit type. The routing targets for vehicle audit (VINEntry), morning lot walk (ChecklistView), PDI compliance (PDI view), and key/plate (KeyPlateSubTypeSelect) are wired here even though those screens are filled in by later tasks.

### Instructions

#### A. Modify `lot-checklist-app/index.html`

**Fill `<div id="home" class="screen">` with:**

```html
<div id="home" class="screen">
  <nav class="glass-nav">
    <span style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary); letter-spacing:var(--text-headline-ls);">Lot Checklist</span>
  </nav>
  <div class="content-area" style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:calc(100vh - 56px - env(safe-area-inset-top));">
    <div style="text-align:center; padding:var(--space-6) var(--page-margin);">
      <h1 style="font-size:var(--text-large-title-size); font-weight:var(--text-large-title-weight); letter-spacing:var(--text-large-title-ls); color:var(--color-label-primary); margin:0 0 var(--space-2) 0;">Lot Checklist</h1>
      <p style="font-size:var(--text-body-size); color:var(--color-label-secondary); line-height:var(--text-body-lh); margin:0 0 var(--space-8) 0;">Sturgeon Dodge Edmonton Office</p>
      <button id="btn-start-audit" class="btn-done" style="width:100%; max-width:320px; font-size:var(--text-headline-size); font-weight:var(--text-headline-weight);">Start Lot Audit</button>
    </div>
  </div>
</div>
```

**Fill `<div id="audit-type-select" class="screen">` with:**

```html
<div id="audit-type-select" class="screen">
  <nav class="glass-nav">
    <button class="btn-back" onclick="showScreen('home')" aria-label="Back to home" style="background:none; border:none; padding:var(--space-2); margin-left:calc(-1 * var(--space-2)); cursor:pointer; color:var(--color-accent); display:flex; align-items:center; gap:var(--space-1); min-width:44px; min-height:44px; font-size:var(--text-body-size);">
      <svg aria-hidden="true" width="20" height="20"><use href="#icon-chevron-left"/></svg>
      Home
    </button>
    <span style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary); position:absolute; left:50%; transform:translateX(-50%);">Select Audit Type</span>
  </nav>
  <div class="content-area">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--card-gap); padding-top:var(--space-4);">

      <button class="audit-type-tile glass-card" id="tile-vehicle-audit" data-audit-type="vehicle-audit" style="min-height:100px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--space-2); padding:var(--card-padding); border:none; cursor:pointer; width:100%; background:var(--glass-bg-card-light); text-align:center;">
        <svg aria-hidden="true" width="24" height="24" style="color:var(--color-accent);"><use href="#icon-truck"/></svg>
        <span style="font-size:var(--text-subheadline-size); font-weight:var(--text-subheadline-weight); color:var(--color-label-primary); line-height:var(--text-subheadline-lh);">Vehicle Audit</span>
      </button>

      <button class="audit-type-tile glass-card" id="tile-morning-lot-walk" data-audit-type="morning-lot-walk" style="min-height:100px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--space-2); padding:var(--card-padding); border:none; cursor:pointer; width:100%; background:var(--glass-bg-card-light); text-align:center;">
        <svg aria-hidden="true" width="24" height="24" style="color:var(--color-accent);"><use href="#icon-clipboard-list"/></svg>
        <span style="font-size:var(--text-subheadline-size); font-weight:var(--text-subheadline-weight); color:var(--color-label-primary); line-height:var(--text-subheadline-lh);">Morning Lot Walk</span>
      </button>

      <button class="audit-type-tile glass-card" id="tile-pdi-compliance" data-audit-type="pdi-compliance" style="min-height:100px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--space-2); padding:var(--card-padding); border:none; cursor:pointer; width:100%; background:var(--glass-bg-card-light); text-align:center;">
        <svg aria-hidden="true" width="24" height="24" style="color:var(--color-accent);"><use href="#icon-calendar"/></svg>
        <span style="font-size:var(--text-subheadline-size); font-weight:var(--text-subheadline-weight); color:var(--color-label-primary); line-height:var(--text-subheadline-lh);">PDI Compliance</span>
      </button>

      <button class="audit-type-tile glass-card" id="tile-key-plate" data-audit-type="key-plate" style="min-height:100px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--space-2); padding:var(--card-padding); border:none; cursor:pointer; width:100%; background:var(--glass-bg-card-light); text-align:center;">
        <svg aria-hidden="true" width="24" height="24" style="color:var(--color-accent);"><use href="#icon-key"/></svg>
        <span style="font-size:var(--text-subheadline-size); font-weight:var(--text-subheadline-weight); color:var(--color-label-primary); line-height:var(--text-subheadline-lh);">Key / Plate Check</span>
      </button>

    </div>
  </div>
</div>
```

#### B. Replace `lot-checklist-app/app.js` with the full initialization content

Replace the entire file with the following. This is the permanent foundation — all later tasks append to this file:

```javascript
// ============================================================
// LOT CHECKLIST APP — app.js
// Sturgeon Dodge Edmonton Office
// Vanilla JS, no framework, no build step.
// data.js (CHECKLISTS constant) must load before this file.
// ============================================================

// ------------------------------------------------------------
// APP STATE — single source of truth for the current session
// ------------------------------------------------------------
const appState = {
  screen: 'home',          // Current screen ID — matches id of visible .screen div
  auditType: null,         // 'vehicle-audit' | 'morning-lot-walk' | 'pdi-compliance' | 'key-plate'
  vehicleVIN: null,        // 17-char string | null (vehicle audits only)
  vehicleCategory: null,   // 'NEW' | 'FLR' | 'SOLD' | 'BND' | 'RECON' | null
  keyPlateSubType: null,   // 'sign-out' | 'sign-in' | 'periodic-audit' | null
  checklist: [],           // Active checklist items array (reference into CHECKLISTS)
  currentItemIndex: 0,     // Zero-based index of the currently displayed item
  responses: [],           // Array of response objects, one per answered item
  sessionStartTime: null,  // ISO 8601 timestamp when session began
  taskList: null           // Array of task objects | null (set by generateTaskList())
};

// ------------------------------------------------------------
// SHOW SCREEN — hides all screens, shows the target screen
// Does NOT render content. Callers render before or after.
// ------------------------------------------------------------
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(function(el) {
    el.style.display = 'none';
  });
  var target = document.getElementById(screenId);
  if (target) {
    target.style.display = 'block';
  }
  appState.screen = screenId;
  persistState();
}

// ------------------------------------------------------------
// PERSIST STATE — serializes appState to localStorage
// Called after every response is recorded.
// ------------------------------------------------------------
function persistState() {
  try {
    localStorage.setItem(
      'lot-checklist-app-session-in-progress',
      JSON.stringify(appState)
    );
  } catch (e) {
    // localStorage write failed (e.g. private mode quota) — continue without persisting
  }
}

// ------------------------------------------------------------
// INIT FRESH SESSION — resets all appState fields to defaults
// ------------------------------------------------------------
function initFreshSession() {
  appState.screen = 'home';
  appState.auditType = null;
  appState.vehicleVIN = null;
  appState.vehicleCategory = null;
  appState.keyPlateSubType = null;
  appState.checklist = [];
  appState.currentItemIndex = 0;
  appState.responses = [];
  appState.sessionStartTime = null;
  appState.taskList = null;
}

// ------------------------------------------------------------
// RESUME CHECK — checks localStorage for in-progress session
// Called on DOMContentLoaded before anything else.
// Full implementation added by build task 15.
// Stub: if no session found, go home.
// ------------------------------------------------------------
function resumeCheck() {
  var stored = localStorage.getItem('lot-checklist-app-session-in-progress');
  if (!stored) {
    initFreshSession();
    showScreen('home');
    return;
  }
  // Full resume logic (parse, show modal, wire Resume/Start Fresh buttons)
  // is implemented in build task 15. Until then, treat any stored session
  // as absent and go home.
  initFreshSession();
  showScreen('home');
}

// ------------------------------------------------------------
// AUDIT TYPE ROUTING — called when user taps an AuditTypeTile
// Routes to the appropriate next screen for each audit type.
// ------------------------------------------------------------
function handleAuditTypeSelect(auditType) {
  appState.auditType = auditType;
  switch (auditType) {
    case 'vehicle-audit':
      showScreen('vin-entry');
      break;
    case 'morning-lot-walk':
      appState.checklist = CHECKLISTS['morning-lot-walk'];
      appState.currentItemIndex = 0;
      appState.sessionStartTime = new Date().toISOString();
      renderChecklistItem(0);
      showScreen('checklist-view');
      break;
    case 'pdi-compliance':
      showScreen('pdi-compliance-view');
      break;
    case 'key-plate':
      showScreen('key-plate-subtype-select');
      break;
  }
}

// ------------------------------------------------------------
// DOM READY — entry point
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {

  // Run resume check first — may show resume modal or go straight to home
  resumeCheck();

  // Wire "Start Lot Audit" button on Home screen
  var btnStartAudit = document.getElementById('btn-start-audit');
  if (btnStartAudit) {
    btnStartAudit.addEventListener('click', function() {
      showScreen('audit-type-select');
    });
  }

  // Wire AuditTypeTile buttons on AuditTypeSelect screen
  var tiles = document.querySelectorAll('.audit-type-tile');
  tiles.forEach(function(tile) {
    tile.addEventListener('click', function() {
      var auditType = tile.getAttribute('data-audit-type');
      if (auditType) {
        handleAuditTypeSelect(auditType);
      }
    });
    // Press animation: scale down on pointerdown, spring back on pointerup
    tile.addEventListener('pointerdown', function() {
      tile.style.transform = 'scale(0.97)';
      tile.style.transition = 'transform var(--duration-fast) var(--easing-standard)';
    });
    tile.addEventListener('pointerup', function() {
      tile.style.transform = 'scale(1)';
      tile.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
    tile.addEventListener('pointercancel', function() {
      tile.style.transform = 'scale(1)';
      tile.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
  });

});

// ------------------------------------------------------------
// PLACEHOLDER STUBS — implemented by later build tasks
// Declared here so routing calls in handleAuditTypeSelect do not
// throw ReferenceErrors before those tasks are complete.
// ------------------------------------------------------------
function renderChecklistItem(index) {
  // Implemented by build task 10
}

function renderFailureAction(index) {
  // Implemented by build task 11
}

function advanceChecklist() {
  // Implemented by build task 10
}

function renderAuditSummary() {
  // Implemented by build task 12
}

function generateTaskList() {
  // Implemented by build task 12
}

function renderTaskList() {
  // Implemented by build task 13
}

function shareTaskList() {
  // Implemented by build task 14
}
```

#### CONSTRAINTS

- **Offline-first:** No CDN URLs. No fetch calls. `CHECKLISTS` is read from the already-loaded `data.js` constant.
- **Binary responses only:** No text input fields on Home or AuditTypeSelect. The only interactive elements are: "Start Lot Audit" button, 4 AuditTypeTile buttons, and back button.
- **Exact screen IDs:** `showScreen()` calls must use only: `'home'`, `'audit-type-select'`, `'vin-entry'`, `'checklist-view'`, `'pdi-compliance-view'`, `'key-plate-subtype-select'`. No other screen ID strings.
- **No alert():** Do not use `window.alert()` anywhere in `app.js`. All user feedback is rendered into DOM elements.
- **CHECKLISTS key strings:** When routing Morning Lot Walk, use `CHECKLISTS['morning-lot-walk']` exactly as documented in `implementation-plan.md` Section 3.1.
- **No architectural decisions:** `showScreen()`, `appState`, `initFreshSession()`, `persistState()` signatures are defined in `implementation-plan.md` Sections 4 and 5 and must not be changed.
- **Placeholder stubs:** `renderChecklistItem`, `renderFailureAction`, `advanceChecklist`, `renderAuditSummary`, `generateTaskList`, `renderTaskList`, `shareTaskList` must be declared as empty stubs so later tasks can fill them without ReferenceErrors.

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading `lot-checklist-app/index.html` and `lot-checklist-app/app.js` before proceeding to Step 5:

- [ ] `<div id="home" class="screen">` contains element with `id="btn-start-audit"`
- [ ] `<div id="audit-type-select" class="screen">` contains exactly 4 elements with class `audit-type-tile`
- [ ] The 4 `.audit-type-tile` elements have `data-audit-type` attributes with values: `vehicle-audit`, `morning-lot-walk`, `pdi-compliance`, `key-plate`
- [ ] Each `.audit-type-tile` contains an `<svg>` with a `<use>` referencing one of: `#icon-truck`, `#icon-clipboard-list`, `#icon-calendar`, `#icon-key`
- [ ] `app.js` declares `const appState` with all required fields: `screen`, `auditType`, `vehicleVIN`, `vehicleCategory`, `keyPlateSubType`, `checklist`, `currentItemIndex`, `responses`, `sessionStartTime`, `taskList`
- [ ] `app.js` defines function `showScreen(screenId)`
- [ ] `app.js` defines function `persistState()`
- [ ] `app.js` defines function `initFreshSession()`
- [ ] `app.js` defines function `resumeCheck()`
- [ ] `app.js` defines function `handleAuditTypeSelect(auditType)` with a `switch` statement covering all 4 audit types
- [ ] `app.js` registers a `DOMContentLoaded` listener that calls `resumeCheck()` and wires the `btn-start-audit` click handler
- [ ] `app.js` contains stub declarations for: `renderChecklistItem`, `renderFailureAction`, `advanceChecklist`, `renderAuditSummary`, `generateTaskList`, `renderTaskList`, `shareTaskList`
- [ ] No `window.alert()` call appears in `app.js`
- [ ] No CDN URL appears in either file

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.08.status` → `"complete"`
   - `prompts.08.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 08 complete.**
> Written: Home screen (`#btn-start-audit`), AuditTypeSelect screen (4 tiles with routing), and full `app.js` foundation (`appState`, `showScreen`, `persistState`, `initFreshSession`, `resumeCheck`, `handleAuditTypeSelect`, stub declarations).
>
> **Build prompt 09 is now unblocked.**
> Send `lot-checklist-app/build-sequence/09-vin-entry-category-select.md` to add the VINEntry and CategorySelect screens.
