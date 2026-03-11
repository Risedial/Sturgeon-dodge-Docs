# BUILD PROMPT 10 — CHECKLIST VIEW + YES/NO INTERACTION LOGIC

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL |
| **Depends on** | Build task 06 (checklist-data-other-audit-types) AND build task 09 (vin-entry-category-select) |
| **Unblocks** | Build task 11, Build task 16, Build task 17 |
| **Writes to** | `lot-checklist-app/index.html`, `lot-checklist-app/app.js` |
| **Estimated output** | ~120 lines added across index.html and app.js |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — check in Step 2
2. `lot-checklist-app/styling-spec.md` — YesNoButton spec (Section 7a), ChecklistProgressBar spec (Section 7d), ChecklistItem spec (Section 7e), ZoneHeader spec (Section 7f), animation system (Section 6: `checklist-item-advance`, `yes-button-tap`), glass classes (Section 3)
3. `lot-checklist-app/implementation-plan.md` — renderChecklistItem (Section 7 Task 10), advanceChecklist (Section 7 Task 10), persistState (Section 4.3), response object schema (Section 4.2), Constraint 1 (checklist fidelity), Constraint 6 (binary responses), Constraint 7 (exact failure action text)
4. `lot-checklist-app/blueprint.md` — ChecklistView screen (Section 1), YesNoButton component (Section 5), ChecklistProgressBar component (Section 5), ZoneHeader component (Section 5), ChecklistItemCard component (Section 5), data model AuditResponse (Section 3.3)
5. `lot-checklist-app/index.html` — output of build task 09; read before modifying
6. `lot-checklist-app/app.js` — output of build task 09; read before modifying
7. `lot-checklist-app/data.js` — output of build task 06; read to confirm CHECKLISTS structure is complete

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If build task 06 (`checklist-data-other-audit-types`) has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 10 cannot start — build task 06 (checklist-data-other-audit-types) has status `[current status]`.
> Wait for build task 06 to complete, then re-send this prompt."

**If build task 09 (`vin-entry-category-select`) has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 10 cannot start — build task 09 (vin-entry-category-select) has status `[current status]`.
> Wait for build task 09 to complete, then re-send this prompt."

**If both build tasks 06 AND 09 have status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.10.status` → `"in_progress"`
- `prompts.10.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Build tasks 06 and 09 both complete. Starting build prompt 10: CHECKLIST VIEW + YES/NO INTERACTION LOGIC."

---

## STEP 3 — TASK

### Context

This task fills the `#checklist-view` screen in `index.html` and replaces the `renderChecklistItem` stub in `app.js` with the full implementation. It also implements `advanceChecklist()`. After this task: the checklist flows completely for vehicle audits (NEW/FLR/SOLD/BND/RECON) and Morning Lot Walk. Tapping YES advances to the next item. Tapping NO will call `showScreen('failure-action-view')` and `renderFailureAction()` — `renderFailureAction` is still a stub (implemented in task 11). When all items are answered, `showScreen('audit-summary')` is called and localStorage is cleared.

### Instructions

#### A. Modify `lot-checklist-app/index.html`

**Fill `<div id="checklist-view" class="screen">` with:**

```html
<div id="checklist-view" class="screen">
  <!-- Navigation bar -->
  <nav class="glass-nav" style="position:relative; flex-direction:column; height:auto; padding-top:calc(var(--space-2) + env(safe-area-inset-top)); padding-bottom:var(--space-2);">
    <div style="display:flex; align-items:center; width:100%; height:44px;">
      <span id="checklist-nav-title" style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary); letter-spacing:var(--text-headline-ls);">Checklist</span>
      <span id="checklist-nav-counter" style="font-size:var(--text-subheadline-size); color:var(--color-label-secondary); margin-left:auto;"></span>
    </div>
  </nav>

  <!-- Progress bar — fixed below nav, full width -->
  <div style="position:fixed; left:0; right:0; top:calc(56px + env(safe-area-inset-top)); z-index:99; height:3px; background:var(--color-separator);">
    <div id="checklist-progress-fill" style="height:3px; background:var(--color-accent); border-radius:var(--radius-pill); width:0%; transition:width var(--duration-standard) var(--easing-standard);"></div>
  </div>

  <!-- Scrollable content area -->
  <div class="content-area" style="padding-top:calc(var(--space-6) + 3px);">

    <!-- Zone header — visible for morning-lot-walk items with a zone value; hidden otherwise -->
    <div id="zone-header-container" style="display:none; padding:var(--space-6) 0 var(--space-2) 0;">
      <span id="zone-header-text" style="font-size:var(--text-caption-2-size); font-weight:var(--text-caption-2-weight); text-transform:uppercase; letter-spacing:var(--text-caption-2-ls); color:var(--color-label-secondary);"></span>
    </div>

    <!-- Checklist item card -->
    <div class="glass-card" id="checklist-item-card" style="padding:var(--card-padding); margin-bottom:var(--space-6);">
      <p id="checklist-item-text" style="font-size:var(--text-body-size); font-weight:var(--text-body-weight); line-height:var(--text-body-lh); letter-spacing:var(--text-body-ls); color:var(--color-label-primary); margin:0;"></p>
    </div>

    <!-- YES / NO buttons — side by side, 50% width each -->
    <div style="display:flex; gap:var(--space-3);">
      <button id="btn-yes" class="btn-yes" style="flex:1; height:52px; font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:#FFFFFF; background:var(--color-audit-yes); border:none; border-radius:var(--radius-medium); cursor:pointer; padding:0 var(--space-4);">YES</button>
      <button id="btn-no" class="btn-no" style="flex:1; height:52px; font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:#FFFFFF; background:var(--color-audit-no); border:none; border-radius:var(--radius-medium); cursor:pointer; padding:0 var(--space-4);">NO</button>
    </div>

  </div>
</div>
```

#### B. Append to `lot-checklist-app/app.js`

Append the following after the existing content. This replaces the stub `renderChecklistItem` and stub `advanceChecklist` declared in task 08 — do not remove the stubs (they are function declarations and the appended `function` definitions below will shadow them; in practice, reassign using the pattern shown):

**Replace the stub implementations by appending the following full implementations.** The stubs in task 08 were written as `function renderChecklistItem(index) { /* stub */ }` — since JavaScript hoists function declarations, the last definition wins if both are `function` declarations. To avoid ambiguity, use the approach below which assigns to variables declared with `var` after the DOMContentLoaded block. However, to keep things simple and avoid scope issues, just append the full implementations as function declarations — they will override the stubs because the stubs are empty bodies and JS function declarations in the same scope with the same name produce only one function (last one wins). This is correct behavior.

```javascript
// ------------------------------------------------------------
// CHECKLIST RENDERING — replaces stub from task 08
// ------------------------------------------------------------

// renderChecklistItem — displays the item at the given index
// Reads from appState.checklist[index]. Sets zone header, item text, progress bar.
// Must not transform item.text — output verbatim per Constraint 1 and 7.
function renderChecklistItem(index) {
  var checklist = appState.checklist;
  if (!checklist || index >= checklist.length) return;

  var item = checklist[index];
  var total = checklist.length;

  // Update nav counter: "3 of 7"
  var counter = document.getElementById('checklist-nav-counter');
  if (counter) {
    counter.textContent = (index + 1) + ' of ' + total;
  }

  // Update nav title to reflect audit context
  var navTitle = document.getElementById('checklist-nav-title');
  if (navTitle) {
    if (appState.auditType === 'vehicle-audit' && appState.vehicleCategory) {
      navTitle.textContent = appState.vehicleCategory + ' Audit';
    } else if (appState.auditType === 'morning-lot-walk') {
      navTitle.textContent = 'Morning Lot Walk';
    } else if (appState.auditType === 'pdi-compliance') {
      navTitle.textContent = 'PDI Compliance';
    } else if (appState.auditType === 'key-plate') {
      navTitle.textContent = 'Key / Plate Check';
    } else {
      navTitle.textContent = 'Checklist';
    }
  }

  // Zone header — visible only for morning-lot-walk items with a non-null zone
  var zoneContainer = document.getElementById('zone-header-container');
  var zoneText = document.getElementById('zone-header-text');
  if (zoneContainer && zoneText) {
    if (item.zone) {
      // Show zone header if this is the first item in this zone
      // (zone header shows whenever the zone value is non-null)
      var prevItem = index > 0 ? checklist[index - 1] : null;
      if (!prevItem || prevItem.zone !== item.zone) {
        zoneText.textContent = item.zone;
        zoneContainer.style.display = 'block';
      } else {
        zoneContainer.style.display = 'none';
      }
    } else {
      zoneContainer.style.display = 'none';
    }
  }

  // Item text — verbatim, no transformation
  // CONSTRAINT 1 & 7: .textContent only. No trim(), toLowerCase(), substring(), or any modification.
  var itemTextEl = document.getElementById('checklist-item-text');
  if (itemTextEl) {
    itemTextEl.textContent = item.text;
  }

  // Progress bar — percentage of items answered before this one
  var progressFill = document.getElementById('checklist-progress-fill');
  if (progressFill) {
    var pct = total > 0 ? Math.round((index / total) * 100) : 0;
    progressFill.style.width = pct + '%';
  }

  // Enable YES/NO buttons (may have been disabled during failure action animation)
  var btnYes = document.getElementById('btn-yes');
  var btnNo = document.getElementById('btn-no');
  if (btnYes) btnYes.disabled = false;
  if (btnNo) btnNo.disabled = false;
}

// advanceChecklist — increments currentItemIndex and routes to next item or summary
function advanceChecklist() {
  appState.currentItemIndex += 1;
  var checklist = appState.checklist;

  if (appState.currentItemIndex < checklist.length) {
    // More items remain: render next item and stay on checklist-view
    renderChecklistItem(appState.currentItemIndex);
    showScreen('checklist-view');
  } else {
    // All items answered: navigate to audit summary, clear in-progress session
    localStorage.removeItem('lot-checklist-app-session-in-progress');
    renderAuditSummary();
    showScreen('audit-summary');
  }
}

// Wire YES and NO button handlers — append to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {

  var btnYes = document.getElementById('btn-yes');
  var btnNo = document.getElementById('btn-no');

  if (btnYes) {
    // Press animation (yes-button-tap)
    btnYes.addEventListener('pointerdown', function() {
      btnYes.style.transform = 'scale(0.95)';
      btnYes.style.transition = 'transform var(--duration-fast) var(--easing-standard)';
    });
    btnYes.addEventListener('pointerup', function() {
      btnYes.style.transform = 'scale(1)';
      btnYes.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
    btnYes.addEventListener('pointercancel', function() {
      btnYes.style.transform = 'scale(1)';
      btnYes.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });

    btnYes.addEventListener('click', function() {
      if (btnYes.disabled) return;
      var checklist = appState.checklist;
      var index = appState.currentItemIndex;
      if (!checklist || index >= checklist.length) return;

      var item = checklist[index];

      // Record YES response
      appState.responses.push({
        itemId: item.id,
        response: 'yes',
        timestamp: new Date().toISOString()
      });

      // Persist after every response — CONSTRAINT 2 (offline-first: survive app close)
      persistState();

      // Animate: current item exits left, next item enters from right
      var card = document.getElementById('checklist-item-card');
      if (card) {
        card.style.transition = 'transform var(--duration-standard) var(--easing-standard), opacity var(--duration-standard) var(--easing-standard)';
        card.style.transform = 'translateX(-100%)';
        card.style.opacity = '0';
        setTimeout(function() {
          card.style.transition = 'none';
          card.style.transform = 'translateX(100%)';
          card.style.opacity = '0';
          // Allow reflow
          void card.offsetWidth;
          card.style.transition = 'transform var(--duration-standard) var(--easing-standard), opacity var(--duration-standard) var(--easing-standard)';
          card.style.transform = 'translateX(0)';
          card.style.opacity = '1';
          advanceChecklist();
        }, 250); // var(--duration-standard) = 0.25s
      } else {
        advanceChecklist();
      }
    });
  }

  if (btnNo) {
    // Press animation
    btnNo.addEventListener('pointerdown', function() {
      btnNo.style.transform = 'scale(0.95)';
      btnNo.style.transition = 'transform var(--duration-fast) var(--easing-standard)';
    });
    btnNo.addEventListener('pointerup', function() {
      btnNo.style.transform = 'scale(1)';
      btnNo.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
    btnNo.addEventListener('pointercancel', function() {
      btnNo.style.transform = 'scale(1)';
      btnNo.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });

    btnNo.addEventListener('click', function() {
      if (btnNo.disabled) return;
      var checklist = appState.checklist;
      var index = appState.currentItemIndex;
      if (!checklist || index >= checklist.length) return;

      // Disable both buttons while failure action view is shown
      // (prevents double-tap while navigating)
      if (btnYes) btnYes.disabled = true;
      btnNo.disabled = true;

      // Navigate to failure action view — renderFailureAction implemented in task 11
      renderFailureAction(index);
      showScreen('failure-action-view');
    });
  }

});
```

#### CONSTRAINTS

- **Checklist fidelity (Constraint 1):** `renderChecklistItem` must output `item.text` using `.textContent = item.text` only. No string transformation of any kind (`trim()`, `toLowerCase()`, `substring()`, template modification, summarization). This applies identically to every checklist type (vehicle audit, morning lot walk, PDI, key/plate).
- **Exact failure action text (Constraint 7):** `renderFailureAction` (task 11) must receive the unmodified item index. Do not pre-process or summarize `item.failureAction` in this task.
- **Binary responses only (Constraint 6):** The only interactive elements on `#checklist-view` are `#btn-yes` and `#btn-no`. No free text, no N/A, no skip, no comment fields exist.
- **Offline-first (Constraint 2):** `persistState()` is called immediately after every `appState.responses.push(...)`. This ensures a mid-audit browser close loses at most one item response.
- **No alert():** No `window.alert()` call anywhere in the YES/NO handler logic.
- **Zone header display:** Zone headers are shown only for `morning-lot-walk` items where `item.zone` is non-null AND the zone changes from the previous item. For all other audit types, `item.zone` is `null` and the zone header container stays hidden.
- **Session clear on completion:** When `advanceChecklist()` determines all items are answered (`currentItemIndex >= checklist.length`), it must call `localStorage.removeItem('lot-checklist-app-session-in-progress')` before navigating to audit-summary. This is required by `implementation-plan.md` Section 4.3.
- **No CDN URLs:** No external resources referenced in any new HTML or JS.
- **Exact custom property names:** CSS references must use exact names from `styling-spec.md`:
  - `var(--color-audit-yes)` for YES button background
  - `var(--color-audit-no)` for NO button background
  - `var(--color-accent)` for progress bar fill
  - `var(--color-separator)` for progress bar track
  - `var(--radius-medium)` for button border-radius (12px)
  - `var(--radius-pill)` for progress bar border-radius
  - `var(--duration-fast)` / `var(--duration-standard)` for animations
  - `var(--easing-standard)` / `var(--easing-spring)` for easing curves

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading `lot-checklist-app/index.html` and `lot-checklist-app/app.js` before proceeding to Step 5:

- [ ] `<div id="checklist-view" class="screen">` exists and contains `<button id="btn-yes">` and `<button id="btn-no">`
- [ ] `<div id="checklist-view" class="screen">` contains `<div id="checklist-progress-fill">`
- [ ] `<div id="checklist-view" class="screen">` contains `<p id="checklist-item-text">`
- [ ] `<div id="checklist-view" class="screen">` contains `<div id="zone-header-container">` with `display:none` in its style
- [ ] `<div id="checklist-view" class="screen">` contains `<span id="zone-header-text">`
- [ ] `<div id="checklist-view" class="screen">` contains `<span id="checklist-nav-counter">`
- [ ] `app.js` defines function `renderChecklistItem(index)` with a body that is NOT empty (not just a comment)
- [ ] `renderChecklistItem` sets `checklist-item-text` using `.textContent = item.text` — verbatim assignment, no transformation
- [ ] `renderChecklistItem` updates `checklist-progress-fill` width as a percentage
- [ ] `app.js` defines function `advanceChecklist()` with a body that is NOT empty
- [ ] `advanceChecklist` calls `localStorage.removeItem('lot-checklist-app-session-in-progress')` when all items are answered
- [ ] `advanceChecklist` calls `renderAuditSummary()` and `showScreen('audit-summary')` when all items are answered
- [ ] YES button click handler pushes `{itemId, response: 'yes', timestamp}` to `appState.responses`
- [ ] YES button click handler calls `persistState()` after the push
- [ ] YES button click handler calls `advanceChecklist()`
- [ ] NO button click handler calls `renderFailureAction(index)` then `showScreen('failure-action-view')`
- [ ] NO button click handler disables both YES and NO buttons before navigating
- [ ] No `window.alert()` call appears in the YES/NO handler code
- [ ] CSS uses `var(--color-audit-yes)` for YES button and `var(--color-audit-no)` for NO button
- [ ] No CDN URL appears in either file

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.10.status` → `"complete"`
   - `prompts.10.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 10 complete.**
> Written: ChecklistView screen (`#checklist-view` with `#btn-yes`, `#btn-no`, `#checklist-item-text`, `#checklist-progress-fill`, `#zone-header-container`), full `renderChecklistItem(index)` implementation, full `advanceChecklist()` implementation, YES/NO click handlers with persistence and press animations.
>
> **Three build prompts are now unblocked:**
> - **Build prompt 11** — send `lot-checklist-app/build-sequence/11-failure-action-view.md`
> - **Build prompt 16** — send `lot-checklist-app/build-sequence/16-key-plate-subtype-select.md` (can run in parallel with 11 if desired, but 11 must complete before 12)
> - **Build prompt 17** — send `lot-checklist-app/build-sequence/17-pdi-compliance-review.md` (can run in parallel with 11)
>
> The critical path continues with **build prompt 11** first.
