# BUILD PROMPT 16 — KEY/PLATE SUB-TYPE SELECTION

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL |
| **Depends on** | Build prompts 06, 10 |
| **Unblocks** | 18 (partially — 18 also requires 15 and 17) |
| **Modifies** | `lot-checklist-app/index.html`, `lot-checklist-app/app.js` |
| **Creates** | no new files |
| **Estimated output** | ~50 lines added across `index.html` and `app.js` |

---

## STEP 1 — READ CONTEXT FILES

Read these files completely before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in Step 2
2. `lot-checklist-app/styling-spec.md` — glass classes, button specs, spacing, color tokens
3. `lot-checklist-app/implementation-plan.md` — Task 16 scope, Section 3 (CHECKLISTS key strings), Section 5 (screen routing), Section 8 (constraints)
4. `lot-checklist-app/blueprint.md` — KeyPlateSubTypeSelect screen inventory entry, navigation flow
5. `lot-checklist-app/index.html` — the file as modified by Tasks 07–14; read before any modification
6. `lot-checklist-app/app.js` — the file as modified by Tasks 08–14; read before any modification
7. `lot-checklist-app/data.js` — the file as modified by Tasks 05–06; confirm `CHECKLISTS['key-plate']` keys exist

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`. Check the `status` fields for build prompts `06` (label: `checklist-data-other-audit-types`) and `10` (label: `checklist-view-yes-no-logic`).

**If build prompt 06 has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 16 cannot start — build prompt 06 (checklist-data-other-audit-types) has status `[current status]`.
> Wait for build prompt 06 to complete, then re-send this prompt."

**If build prompt 10 has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 16 cannot start — build prompt 10 (checklist-view-yes-no-logic) has status `[current status]`.
> Wait for build prompt 10 to complete, then re-send this prompt."

**If both 06 and 10 have status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts["16"].status` → `"in_progress"`
- `prompts["16"].started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Build prompts 06 and 10 are complete. Starting build prompt 16: KEY/PLATE SUB-TYPE SELECTION."

---

## STEP 3 — TASK

### Context

This task fills in the `#key-plate-subtype-select` screen (scaffolded in Task 07 as an empty `<div class="screen">`), wires its button events in `app.js`, and fixes the audit type routing in `app.js` so that selecting the "Key/Plate Accountability Check" tile routes to `key-plate-subtype-select` instead of directly to `checklist-view`.

The Key/Plate checklist data is in `CHECKLISTS['key-plate']` with three sub-arrays: `CHECKLISTS['key-plate']['sign-out']` (4 items), `CHECKLISTS['key-plate']['sign-in']` (2 items), `CHECKLISTS['key-plate']['periodic-audit']` (2 items). These keys were populated by Task 06. All three must be referenced verbatim.

---

### index.html — Fill `#key-plate-subtype-select` Screen

Locate `<div class="screen" id="key-plate-subtype-select">` in `index.html`. It should be empty (added in Task 07). Replace its content with:

```html
<div class="screen" id="key-plate-subtype-select">
  <nav class="glass-nav">
    <button id="btn-kp-back" aria-label="Back" style="background:none; border:none; color:var(--color-accent); font-size:var(--text-body-size); cursor:pointer; display:flex; align-items:center; gap:var(--space-1); min-width:44px; min-height:44px;">
      <svg aria-hidden="true" width="24" height="24"><use href="#icon-arrow-left" /></svg>
      Back
    </button>
    <h1 style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary); flex:1; text-align:center; letter-spacing:var(--text-headline-ls);">Key / Plate Check</h1>
    <span style="min-width:44px;"></span><!-- spacer to balance back button -->
  </nav>

  <div class="content-area">
    <p style="font-size:var(--text-body-size); font-weight:var(--text-body-weight); color:var(--color-label-secondary); margin-bottom:var(--space-6); letter-spacing:var(--text-body-ls);">What is the reason for this check?</p>

    <div style="display:flex; flex-direction:column; gap:var(--card-gap);">

      <button id="btn-kp-sign-out" style="width:100%; min-height:64px; border:none; border-radius:var(--radius-large); background:var(--glass-bg-card-light); backdrop-filter:var(--glass-backdrop-filter); -webkit-backdrop-filter:var(--glass-backdrop-filter); border:var(--glass-border); box-shadow:var(--glass-shadow); padding:var(--card-padding); text-align:left; cursor:pointer; display:flex; align-items:center; gap:var(--space-4);">
        <svg aria-hidden="true" width="24" height="24" style="color:var(--color-accent); flex-shrink:0;"><use href="#icon-key" /></svg>
        <div>
          <div style="font-size:var(--text-subheadline-size); font-weight:var(--text-subheadline-weight); color:var(--color-label-primary); letter-spacing:var(--text-subheadline-ls);">Sign-Out</div>
          <div style="font-size:var(--text-footnote-size); color:var(--color-label-secondary); margin-top:2px;">4 items — signing a key or plate out of Key Cafe</div>
        </div>
      </button>

      <button id="btn-kp-sign-in" style="width:100%; min-height:64px; border:none; border-radius:var(--radius-large); background:var(--glass-bg-card-light); backdrop-filter:var(--glass-backdrop-filter); -webkit-backdrop-filter:var(--glass-backdrop-filter); border:var(--glass-border); box-shadow:var(--glass-shadow); padding:var(--card-padding); text-align:left; cursor:pointer; display:flex; align-items:center; gap:var(--space-4);">
        <svg aria-hidden="true" width="24" height="24" style="color:var(--color-accent); flex-shrink:0;"><use href="#icon-key" /></svg>
        <div>
          <div style="font-size:var(--text-subheadline-size); font-weight:var(--text-subheadline-weight); color:var(--color-label-primary); letter-spacing:var(--text-subheadline-ls);">Sign-In</div>
          <div style="font-size:var(--text-footnote-size); color:var(--color-label-secondary); margin-top:2px;">2 items — returning a key or plate to Key Cafe</div>
        </div>
      </button>

      <button id="btn-kp-periodic" style="width:100%; min-height:64px; border:none; border-radius:var(--radius-large); background:var(--glass-bg-card-light); backdrop-filter:var(--glass-backdrop-filter); -webkit-backdrop-filter:var(--glass-backdrop-filter); border:var(--glass-border); box-shadow:var(--glass-shadow); padding:var(--card-padding); text-align:left; cursor:pointer; display:flex; align-items:center; gap:var(--space-4);">
        <svg aria-hidden="true" width="24" height="24" style="color:var(--color-accent); flex-shrink:0;"><use href="#icon-list-bullet" /></svg>
        <div>
          <div style="font-size:var(--text-subheadline-size); font-weight:var(--text-subheadline-weight); color:var(--color-label-primary); letter-spacing:var(--text-subheadline-ls);">Periodic Audit</div>
          <div style="font-size:var(--text-footnote-size); color:var(--color-label-secondary); margin-top:2px;">2 items — routine accountability check of all keys and plates</div>
        </div>
      </button>

    </div>
  </div>
</div>
```

**Note on styling:** The button elements above use inline styles that replicate the `.glass-card` class properties defined in `styles.css` (Task 03). This is intentional — `<button>` elements cannot natively inherit all glass card properties. Reference exact values from `styling-spec.md` Section 3.

---

### app.js — Wire Key/Plate Sub-Type Buttons

In `app.js`, add event listeners for the three sub-type buttons. These must be added inside the DOMContentLoaded handler (or at the same initialization point where other button listeners were added in Tasks 08–14):

```javascript
// Key/Plate sub-type back button
document.getElementById('btn-kp-back').addEventListener('click', function () {
  showScreen('audit-type-select');
});

// Sign-Out
document.getElementById('btn-kp-sign-out').addEventListener('click', function () {
  appState.keyPlateSubType = 'sign-out';
  appState.checklist = CHECKLISTS['key-plate']['sign-out'];
  appState.currentItemIndex = 0;
  appState.responses = [];
  appState.sessionStartTime = new Date().toISOString();
  renderChecklistItem(0);
  showScreen('checklist-view');
});

// Sign-In
document.getElementById('btn-kp-sign-in').addEventListener('click', function () {
  appState.keyPlateSubType = 'sign-in';
  appState.checklist = CHECKLISTS['key-plate']['sign-in'];
  appState.currentItemIndex = 0;
  appState.responses = [];
  appState.sessionStartTime = new Date().toISOString();
  renderChecklistItem(0);
  showScreen('checklist-view');
});

// Periodic Audit
document.getElementById('btn-kp-periodic').addEventListener('click', function () {
  appState.keyPlateSubType = 'periodic-audit';
  appState.checklist = CHECKLISTS['key-plate']['periodic-audit'];
  appState.currentItemIndex = 0;
  appState.responses = [];
  appState.sessionStartTime = new Date().toISOString();
  renderChecklistItem(0);
  showScreen('checklist-view');
});
```

---

### app.js — Fix AuditType Routing for Key/Plate

In Task 08, the AuditTypeTile routing was implemented. Locate the handler for the "Key/Plate Accountability Check" tile. It currently routes to either `audit-type-select` or an incorrect screen. Update it so that when `auditType === 'key-plate'`, it routes to `key-plate-subtype-select`:

```javascript
// Inside the AuditTypeTile click handler for Key/Plate:
appState.auditType = 'key-plate';
showScreen('key-plate-subtype-select');
```

Confirm the other audit type routings from Task 08 are still present and correct:
- `auditType = 'vehicle-audit'` → `showScreen('vin-entry')`
- `auditType = 'morning-lot-walk'` → sets checklist, calls `renderChecklistItem(0)`, `showScreen('checklist-view')`
- `auditType = 'pdi-compliance'` → `showScreen('pdi-compliance-view')` (this will be fully wired in Task 17 — do not change it here)

---

### CONSTRAINTS

The following constraints from `implementation-plan.md` Section 8 apply to this task:

| Constraint | Requirement |
|---|---|
| **Offline-first** | No CDN URLs. No fetch calls. All checklist content read from `CHECKLISTS['key-plate']` in `data.js` — no network access of any kind. |
| **Binary responses enforced** | No text input fields on the `#key-plate-subtype-select` screen. Only the three sub-type buttons and the back button exist as interactive elements. |
| **Exact key strings** | `CHECKLISTS['key-plate']['sign-out']`, `CHECKLISTS['key-plate']['sign-in']`, `CHECKLISTS['key-plate']['periodic-audit']` — these exact strings must be used. No variation. |
| **Key Cafe not replaced** | The Key/Plate checklist items are display-only process reminders. No key custody tracking fields are added to `appState`. No API calls to Key Cafe. |
| **No architectural decisions** | Screen content, button labels, and routing behavior are defined in `implementation-plan.md` Task 16. No deviation permitted. |

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by opening `lot-checklist-app/index.html` and `lot-checklist-app/app.js` and checking for exact strings:

- [ ] `index.html` contains `id="key-plate-subtype-select"`
- [ ] `index.html` contains `id="btn-kp-sign-out"` within the `#key-plate-subtype-select` div
- [ ] `index.html` contains `id="btn-kp-sign-in"` within the `#key-plate-subtype-select` div
- [ ] `index.html` contains `id="btn-kp-periodic"` within the `#key-plate-subtype-select` div
- [ ] `index.html` contains `id="btn-kp-back"` within the `#key-plate-subtype-select` div
- [ ] `index.html` contains text content "Sign-Out" inside `#key-plate-subtype-select`
- [ ] `index.html` contains text content "Sign-In" inside `#key-plate-subtype-select`
- [ ] `index.html` contains text content "Periodic Audit" inside `#key-plate-subtype-select`
- [ ] `app.js` contains `appState.keyPlateSubType = 'sign-out'`
- [ ] `app.js` contains `appState.keyPlateSubType = 'sign-in'`
- [ ] `app.js` contains `appState.keyPlateSubType = 'periodic-audit'`
- [ ] `app.js` contains `CHECKLISTS['key-plate']['sign-out']`
- [ ] `app.js` contains `CHECKLISTS['key-plate']['sign-in']`
- [ ] `app.js` contains `CHECKLISTS['key-plate']['periodic-audit']`
- [ ] `app.js` contains `showScreen('key-plate-subtype-select')` (in the audit type routing)

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts["16"].status` → `"complete"`
   - `prompts["16"].completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 16 complete.** Key/Plate sub-type selection screen implemented and routing wired.
>
> **Now unblocked (partially):** Build prompt 18 (integration-test) — but it also requires prompts 15 and 17 to complete first.
> If prompts 15 and 17 are also complete, send `18-integration-test.md` next.
