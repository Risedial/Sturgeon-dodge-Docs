# BUILD PROMPT 17 — PDI COMPLIANCE REVIEW SCREEN

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL |
| **Depends on** | Build prompts 08, 10 |
| **Unblocks** | 18 (partially — 18 also requires 15 and 16) |
| **Modifies** | `lot-checklist-app/index.html`, `lot-checklist-app/app.js` |
| **Creates** | no new files |
| **Estimated output** | ~70 lines added across `index.html` and `app.js` |

---

## STEP 1 — READ CONTEXT FILES

Read these files completely before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in Step 2
2. `lot-checklist-app/styling-spec.md` — color tokens (`--color-success`, `--color-warning`, `--color-destructive`), button specs, glass classes, spacing
3. `lot-checklist-app/implementation-plan.md` — Task 17 scope, Section 3 (`CHECKLISTS['pdi-compliance']` key), Section 5 (screen routing for `pdi-compliance-view`), Section 8 (constraints)
4. `lot-checklist-app/blueprint.md` — PDIComplianceReview screen inventory entry, navigation flow
5. `lot-checklist-app/index.html` — the file as modified by Tasks 07–14; read before any modification
6. `lot-checklist-app/app.js` — the file as modified by Tasks 08–14; read before any modification

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`. Check the `status` fields for build prompts `08` (label: `home-audit-type-select`) and `10` (label: `checklist-view-yes-no-logic`).

**If build prompt 08 has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 17 cannot start — build prompt 08 (home-audit-type-select) has status `[current status]`.
> Wait for build prompt 08 to complete, then re-send this prompt."

**If build prompt 10 has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 17 cannot start — build prompt 10 (checklist-view-yes-no-logic) has status `[current status]`.
> Wait for build prompt 10 to complete, then re-send this prompt."

**If both 08 and 10 have status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts["17"].status` → `"in_progress"`
- `prompts["17"].started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Build prompts 08 and 10 are complete. Starting build prompt 17: PDI COMPLIANCE REVIEW SCREEN."

---

## STEP 3 — TASK

### Context

This task fills in the `#pdi-compliance-view` screen (scaffolded in Task 07 as an empty `<div class="screen">`), wires its button events in `app.js`, and fixes the audit type routing so that selecting "PDI Compliance Review" routes to `pdi-compliance-view`.

The PDI Compliance Review screen allows a lot manager to enter a VIN and vehicle arrival date, compute how many days have elapsed since arrival, and display the Stellantis compliance status. If the status is acceptable, the user can begin the PDI checklist (`CHECKLISTS['pdi-compliance']`).

**Three status states — exact labels and colors required:**

| Days Elapsed | Status Label | CSS Color Token |
|---|---|---|
| 0 or 1 day | `ON TIME` | `var(--color-success)` — #34C759 light / #30D158 dark |
| Exactly 1 day with no PDI | `DAY 1 OVERDUE` | `var(--color-warning)` — #FF9F0A light / #FFD60A dark |
| 2 or more days with no PDI | `DAY 2+ OVERDUE — CRITICAL` | `var(--color-destructive)` — #FF3B30 light / #FF453A dark |

**Note on day boundary logic:** The spec defines the threshold as `Math.floor((today - arrivalDate) / 86400000)` days. 0 days = same calendar day = ON TIME. 1 day = next calendar day = DAY 1 OVERDUE. 2+ days = DAY 2+ OVERDUE — CRITICAL. The "with no PDI" qualifier is implicit — the checklist is the PDI; if the user has not yet tapped "Begin PDI Checklist," no PDI has been recorded.

---

### index.html — Fill `#pdi-compliance-view` Screen

Locate `<div class="screen" id="pdi-compliance-view">` in `index.html`. It should be empty (added in Task 07). Replace its content with:

```html
<div class="screen" id="pdi-compliance-view">
  <nav class="glass-nav">
    <button id="btn-pdi-back" aria-label="Back" style="background:none; border:none; color:var(--color-accent); font-size:var(--text-body-size); cursor:pointer; display:flex; align-items:center; gap:var(--space-1); min-width:44px; min-height:44px;">
      <svg aria-hidden="true" width="24" height="24"><use href="#icon-arrow-left" /></svg>
      Back
    </button>
    <h1 style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary); flex:1; text-align:center; letter-spacing:var(--text-headline-ls);">PDI Compliance</h1>
    <span style="min-width:44px;"></span><!-- spacer -->
  </nav>

  <div class="content-area">

    <div class="glass-card" style="padding:var(--card-padding); margin-bottom:var(--card-gap);">
      <label style="display:block; font-size:var(--text-caption-2-size); text-transform:uppercase; letter-spacing:var(--text-caption-2-ls); color:var(--color-label-secondary); margin-bottom:var(--space-2);">Vehicle VIN</label>
      <input
        type="text"
        id="pdi-vin-input"
        maxlength="17"
        placeholder="17-character VIN"
        autocomplete="off"
        style="display:block; width:100%; height:44px; border:1px solid var(--color-separator); border-radius:var(--radius-medium); padding:0 var(--space-4); font-size:var(--text-body-size); color:var(--color-label-primary); background:var(--color-bg-secondary); box-sizing:border-box; outline:none; font-family:var(--font-family);"
      />
    </div>

    <div class="glass-card" style="padding:var(--card-padding); margin-bottom:var(--card-gap);">
      <label style="display:block; font-size:var(--text-caption-2-size); text-transform:uppercase; letter-spacing:var(--text-caption-2-ls); color:var(--color-label-secondary); margin-bottom:var(--space-2);">Vehicle Arrival Date</label>
      <input
        type="date"
        id="pdi-arrival-date"
        style="display:block; width:100%; height:44px; border:1px solid var(--color-separator); border-radius:var(--radius-medium); padding:0 var(--space-4); font-size:var(--text-body-size); color:var(--color-label-primary); background:var(--color-bg-secondary); box-sizing:border-box; outline:none; font-family:var(--font-family);"
      />
    </div>

    <button id="btn-pdi-calculate" style="display:block; width:100%; height:50px; border:none; border-radius:var(--radius-medium); background:var(--color-accent); color:#FFFFFF; font-size:var(--text-callout-size); font-weight:600; cursor:pointer; margin-bottom:var(--card-gap);">Calculate Status</button>

    <div id="pdi-error-msg" style="display:none; color:var(--color-destructive); font-size:var(--text-footnote-size); margin-bottom:var(--space-3);"></div>

    <!-- Status display block — hidden until "Calculate Status" is tapped -->
    <div id="pdi-status-block" style="display:none;">
      <div class="glass-card" style="padding:var(--card-padding); margin-bottom:var(--card-gap);">
        <div style="font-size:var(--text-caption-2-size); text-transform:uppercase; letter-spacing:var(--text-caption-2-ls); color:var(--color-label-secondary); margin-bottom:var(--space-2);">Compliance Status</div>
        <div id="pdi-status-label" style="font-size:var(--text-title-2-size); font-weight:var(--text-title-2-weight); letter-spacing:var(--text-title-2-ls);"></div>
        <div id="pdi-days-elapsed" style="font-size:var(--text-footnote-size); color:var(--color-label-secondary); margin-top:var(--space-2);"></div>
      </div>

      <button id="btn-pdi-begin-checklist" style="display:block; width:100%; height:50px; border:none; border-radius:var(--radius-medium); background:var(--color-accent); color:#FFFFFF; font-size:var(--text-callout-size); font-weight:600; cursor:pointer;">Begin PDI Checklist</button>
    </div>

  </div>
</div>
```

---

### app.js — Wire PDI Compliance Review Logic

Add the following event listeners and logic inside the DOMContentLoaded handler (or at the same initialization point where other button listeners were added in Tasks 08–14):

```javascript
// PDI Compliance — back button
document.getElementById('btn-pdi-back').addEventListener('click', function () {
  showScreen('audit-type-select');
});

// PDI Compliance — Calculate Status button
document.getElementById('btn-pdi-calculate').addEventListener('click', function () {
  const vinInput = document.getElementById('pdi-vin-input');
  const arrivalDateInput = document.getElementById('pdi-arrival-date');
  const errorMsg = document.getElementById('pdi-error-msg');
  const statusBlock = document.getElementById('pdi-status-block');
  const statusLabel = document.getElementById('pdi-status-label');
  const daysElapsedEl = document.getElementById('pdi-days-elapsed');

  errorMsg.style.display = 'none';
  statusBlock.style.display = 'none';

  // Validate VIN
  if (!vinInput.value || vinInput.value.trim().length === 0) {
    errorMsg.textContent = 'Please enter a VIN.';
    errorMsg.style.display = 'block';
    return;
  }

  // Validate arrival date
  if (!arrivalDateInput.value) {
    errorMsg.textContent = 'Please select an arrival date.';
    errorMsg.style.display = 'block';
    return;
  }

  // Compute days elapsed
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const arrivalDate = new Date(arrivalDateInput.value);
  arrivalDate.setHours(0, 0, 0, 0);
  const daysElapsed = Math.floor((today - arrivalDate) / 86400000);

  if (daysElapsed < 0) {
    errorMsg.textContent = 'Arrival date cannot be in the future.';
    errorMsg.style.display = 'block';
    return;
  }

  // Set status label and color per implementation-plan.md Task 17 spec
  if (daysElapsed <= 1) {
    statusLabel.textContent = 'ON TIME';
    statusLabel.style.color = 'var(--color-success)';
  } else if (daysElapsed === 1) {
    // Note: This branch is unreachable given the <= 1 check above;
    // keeping for documentation clarity. Per spec, 1 day = DAY 1 OVERDUE.
    statusLabel.textContent = 'DAY 1 OVERDUE';
    statusLabel.style.color = 'var(--color-warning)';
  } else {
    statusLabel.textContent = 'DAY 2+ OVERDUE \u2014 CRITICAL';
    statusLabel.style.color = 'var(--color-destructive)';
  }

  // Corrected logic — spec: 0 or 1 day = ON TIME, exactly 1 day no PDI = DAY 1 OVERDUE, 2+ = CRITICAL
  // Re-implement with correct thresholds:
  if (daysElapsed === 0) {
    statusLabel.textContent = 'ON TIME';
    statusLabel.style.color = 'var(--color-success)';
  } else if (daysElapsed === 1) {
    statusLabel.textContent = 'DAY 1 OVERDUE';
    statusLabel.style.color = 'var(--color-warning)';
  } else {
    statusLabel.textContent = 'DAY 2+ OVERDUE \u2014 CRITICAL';
    statusLabel.style.color = 'var(--color-destructive)';
  }

  daysElapsedEl.textContent = daysElapsed + (daysElapsed === 1 ? ' day' : ' days') + ' since arrival';

  statusBlock.style.display = 'block';
});

// PDI Compliance — Begin PDI Checklist button
document.getElementById('btn-pdi-begin-checklist').addEventListener('click', function () {
  const vinInput = document.getElementById('pdi-vin-input');

  appState.auditType = 'pdi-compliance';
  appState.vehicleVIN = vinInput.value.trim();
  appState.vehicleCategory = null;
  appState.keyPlateSubType = null;
  appState.checklist = CHECKLISTS['pdi-compliance'];
  appState.currentItemIndex = 0;
  appState.responses = [];
  appState.sessionStartTime = new Date().toISOString();

  renderChecklistItem(0);
  showScreen('checklist-view');
});
```

**Note on status logic duplication in the code block above:** The calculate handler above contains an initial conditional that is then overridden by a corrected conditional. In the actual file, write only the correct conditional:

```javascript
if (daysElapsed === 0) {
  statusLabel.textContent = 'ON TIME';
  statusLabel.style.color = 'var(--color-success)';
} else if (daysElapsed === 1) {
  statusLabel.textContent = 'DAY 1 OVERDUE';
  statusLabel.style.color = 'var(--color-warning)';
} else {
  // daysElapsed >= 2
  statusLabel.textContent = 'DAY 2+ OVERDUE \u2014 CRITICAL';
  statusLabel.style.color = 'var(--color-destructive)';
}
```

The `\u2014` is the em dash character (—) in the "DAY 2+ OVERDUE — CRITICAL" label. Write it as a Unicode escape or as the literal character `—`. Do not use a hyphen-minus (`-`).

---

### app.js — Fix AuditType Routing for PDI Compliance

In Task 08, the AuditTypeTile routing was established. Locate the handler for the "PDI Compliance Review" tile. Confirm or update it so that when `auditType === 'pdi-compliance'`, it routes to `pdi-compliance-view`:

```javascript
// Inside the AuditTypeTile click handler for PDI Compliance:
appState.auditType = 'pdi-compliance';
showScreen('pdi-compliance-view');
```

Do not change the other audit type routings.

---

### CONSTRAINTS

The following constraints from `implementation-plan.md` Section 8 apply to this task:

| Constraint | Requirement |
|---|---|
| **Offline-first** | No CDN URLs. No fetch calls. All PDI checklist content read from `CHECKLISTS['pdi-compliance']` in `data.js`. Date arithmetic is computed locally using `new Date()` and arithmetic — no API. |
| **Exact status labels** | Status label strings must be exactly `ON TIME`, `DAY 1 OVERDUE`, and `DAY 2+ OVERDUE — CRITICAL`. These strings appear verbatim in the UI and in the share output. No variation. |
| **Exact color tokens** | `var(--color-success)` for ON TIME; `var(--color-warning)` for DAY 1 OVERDUE; `var(--color-destructive)` for DAY 2+ OVERDUE — CRITICAL. No hex values may be hardcoded in this logic; use the CSS custom property references. |
| **Binary responses enforced** | No free-text fields on the PDI checklist itself. The VIN and arrival date inputs are on the `pdi-compliance-view` pre-checklist screen (not on `checklist-view`). Once the user taps "Begin PDI Checklist," standard YES/NO binary flow applies. |
| **No Phase 2 features** | The PDI screen in Phase 1 shows computed status only. No vehicle list, no persistent PDI log, no server sync. The "per-vehicle repetition" for multiple vehicles is a Phase 2 feature. |
| **Checklist fidelity** | `CHECKLISTS['pdi-compliance']` is set verbatim from `data.js`. No transformation of item text or failure action text during rendering. |

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by opening `lot-checklist-app/index.html` and `lot-checklist-app/app.js` and checking for exact strings:

- [ ] `index.html` contains `id="pdi-compliance-view"`
- [ ] `index.html` contains `id="pdi-vin-input"` within `#pdi-compliance-view`
- [ ] `index.html` contains `type="date"` input with `id="pdi-arrival-date"` within `#pdi-compliance-view`
- [ ] `index.html` contains `id="btn-pdi-calculate"` within `#pdi-compliance-view`
- [ ] `index.html` contains `id="pdi-status-block"` within `#pdi-compliance-view`
- [ ] `index.html` contains `id="pdi-status-label"` within `#pdi-compliance-view`
- [ ] `index.html` contains `id="btn-pdi-begin-checklist"` within `#pdi-compliance-view`
- [ ] `index.html` contains `id="btn-pdi-back"` within `#pdi-compliance-view`
- [ ] `app.js` contains `Math.floor` and `86400000` (day-in-milliseconds constant)
- [ ] `app.js` contains `'ON TIME'` as a status label string
- [ ] `app.js` contains `'DAY 1 OVERDUE'` as a status label string
- [ ] `app.js` contains `OVERDUE` and `CRITICAL` in the same string (for the DAY 2+ label)
- [ ] `app.js` contains `var(--color-success)` assigned to `statusLabel.style.color`
- [ ] `app.js` contains `var(--color-warning)` assigned to `statusLabel.style.color`
- [ ] `app.js` contains `var(--color-destructive)` assigned to `statusLabel.style.color`
- [ ] `app.js` contains `CHECKLISTS['pdi-compliance']` (in the Begin PDI Checklist handler)
- [ ] `app.js` contains `showScreen('pdi-compliance-view')` (in the audit type routing)

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts["17"].status` → `"complete"`
   - `prompts["17"].completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 17 complete.** PDI Compliance Review screen implemented with date arithmetic and status display.
>
> **Now unblocked (partially):** Build prompt 18 (integration-test) — but it also requires prompts 15 and 16 to complete first.
> If prompts 15 and 16 are also complete, send `18-integration-test.md` next.
