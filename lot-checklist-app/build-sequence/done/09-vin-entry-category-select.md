# BUILD PROMPT 09 — VIN ENTRY SCREEN + CATEGORY SELECT SCREEN

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL |
| **Depends on** | Build task 08 (home-audit-type-select) |
| **Unblocks** | Build task 10 |
| **Writes to** | `lot-checklist-app/index.html`, `lot-checklist-app/app.js` |
| **Estimated output** | ~80 lines added across index.html and app.js |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — check in Step 2
2. `lot-checklist-app/styling-spec.md` — VINInputField (Section 7, border-radius Section 5), CategorySelectButton, spacing (Section 4), glass classes (Section 3)
3. `lot-checklist-app/implementation-plan.md` — VIN validation regex (Section 7 Task 9), category routing to `renderChecklistItem` (Section 7 Task 9), CHECKLISTS key strings (Section 3.1), screen IDs (Section 5.2)
4. `lot-checklist-app/blueprint.md` — VINEntry screen (Section 1), CategorySelect screen (Section 1), CategorySelectButton component (Section 5), navigation flow (Section 2)
5. `lot-checklist-app/index.html` — output of build task 08; read before modifying to understand current state
6. `lot-checklist-app/app.js` — output of build task 08; read before modifying

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If build task 08 (`home-audit-type-select`) has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 09 cannot start — build task 08 (home-audit-type-select) has status `[current status]`.
> Wait for build task 08 to complete, then re-send this prompt."

**If build task 08 has status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.09.status` → `"in_progress"`
- `prompts.09.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Build task 08 complete. Starting build prompt 09: VIN ENTRY SCREEN + CATEGORY SELECT SCREEN."

---

## STEP 3 — TASK

### Context

This task fills the content of two screens — `#vin-entry` and `#category-select` — inside `index.html`, and adds the corresponding event handlers and routing logic to `app.js`. After this task: the user can enter a VIN (with format validation), see an inline error if the format is wrong, proceed to the category selector, tap a category, and trigger the checklist. The checklist render function (`renderChecklistItem`) is a stub from task 08 — calling it here is correct; the full implementation arrives in task 10.

### Instructions

#### A. Modify `lot-checklist-app/index.html`

**Fill `<div id="vin-entry" class="screen">` with:**

```html
<div id="vin-entry" class="screen">
  <nav class="glass-nav" style="position:relative;">
    <button onclick="showScreen('audit-type-select')" aria-label="Back to audit type selection" style="background:none; border:none; padding:var(--space-2); margin-left:calc(-1 * var(--space-2)); cursor:pointer; color:var(--color-accent); display:flex; align-items:center; gap:var(--space-1); min-width:44px; min-height:44px; font-size:var(--text-body-size);">
      <svg aria-hidden="true" width="20" height="20"><use href="#icon-chevron-left"/></svg>
      Back
    </button>
    <span style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary); position:absolute; left:50%; transform:translateX(-50%);">Vehicle Audit</span>
  </nav>
  <div class="content-area">
    <div style="padding-top:var(--space-6);">
      <p style="font-size:var(--text-subheadline-size); color:var(--color-label-secondary); margin:0 0 var(--space-4) 0;">Enter the vehicle VIN (17 characters).</p>
      <input
        type="text"
        id="vin-input"
        maxlength="17"
        placeholder="Enter VIN"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="characters"
        spellcheck="false"
        style="
          display:block;
          width:100%;
          box-sizing:border-box;
          height:50px;
          padding:0 var(--space-4);
          font-size:var(--text-body-size);
          font-weight:var(--text-body-weight);
          letter-spacing:0.05em;
          color:var(--color-label-primary);
          background:var(--color-bg-secondary);
          border:1px solid var(--color-separator);
          border-radius:var(--radius-medium);
          outline:none;
          font-family:var(--font-family);
          margin-bottom:var(--space-2);
        "
      >
      <p id="vin-error" style="font-size:var(--text-footnote-size); color:var(--color-destructive); margin:0 0 var(--space-4) 0; display:none;">VIN must be exactly 17 alphanumeric characters (letters A–H, J–N, P–Z and digits 0–9).</p>
      <button id="btn-vin-next" class="btn-done" style="width:100%;">Next</button>
    </div>
  </div>
</div>
```

**Fill `<div id="category-select" class="screen">` with:**

```html
<div id="category-select" class="screen">
  <nav class="glass-nav" style="position:relative;">
    <button onclick="showScreen('vin-entry')" aria-label="Back to VIN entry" style="background:none; border:none; padding:var(--space-2); margin-left:calc(-1 * var(--space-2)); cursor:pointer; color:var(--color-accent); display:flex; align-items:center; gap:var(--space-1); min-width:44px; min-height:44px; font-size:var(--text-body-size);">
      <svg aria-hidden="true" width="20" height="20"><use href="#icon-chevron-left"/></svg>
      Back
    </button>
    <span style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary); position:absolute; left:50%; transform:translateX(-50%);">Select Vehicle Status</span>
  </nav>
  <div class="content-area">
    <div style="padding-top:var(--space-4);">
      <p id="category-vin-display" style="font-size:var(--text-subheadline-size); color:var(--color-label-secondary); margin:0 0 var(--space-6) 0; font-family:var(--font-family);"></p>
      <div style="display:flex; flex-direction:column; gap:var(--card-gap);">

        <button class="category-btn glass-card" data-category="NEW" style="min-height:var(--list-item-height); padding:var(--space-4); display:flex; flex-direction:column; align-items:flex-start; border:none; cursor:pointer; width:100%; text-align:left; border-radius:var(--radius-large);">
          <span style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary);">NEW</span>
          <span style="font-size:var(--text-footnote-size); color:var(--color-label-secondary); margin-top:var(--space-1);">KM ≤ 1,000 — new unit standards apply</span>
        </button>

        <button class="category-btn glass-card" data-category="FLR" style="min-height:var(--list-item-height); padding:var(--space-4); display:flex; flex-direction:column; align-items:flex-start; border:none; cursor:pointer; width:100%; text-align:left; border-radius:var(--radius-large);">
          <span style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary);">FLR</span>
          <span style="font-size:var(--text-footnote-size); color:var(--color-label-secondary); margin-top:var(--space-1);">Frontline Ready — available for sale</span>
        </button>

        <button class="category-btn glass-card" data-category="SOLD" style="min-height:var(--list-item-height); padding:var(--space-4); display:flex; flex-direction:column; align-items:flex-start; border:none; cursor:pointer; width:100%; text-align:left; border-radius:var(--radius-large);">
          <span style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary);">SOLD</span>
          <span style="font-size:var(--text-footnote-size); color:var(--color-label-secondary); margin-top:var(--space-1);">Deal complete — awaiting delivery</span>
        </button>

        <button class="category-btn glass-card" data-category="BND" style="min-height:var(--list-item-height); padding:var(--space-4); display:flex; flex-direction:column; align-items:flex-start; border:none; cursor:pointer; width:100%; text-align:left; border-radius:var(--radius-large);">
          <span style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary);">BND</span>
          <span style="font-size:var(--text-footnote-size); color:var(--color-label-secondary); margin-top:var(--space-1);">Booked Not Delivered — active deal</span>
        </button>

        <button class="category-btn glass-card" data-category="RECON" style="min-height:var(--list-item-height); padding:var(--space-4); display:flex; flex-direction:column; align-items:flex-start; border:none; cursor:pointer; width:100%; text-align:left; border-radius:var(--radius-large);">
          <span style="font-size:var(--text-headline-size); font-weight:var(--text-headline-weight); color:var(--color-label-primary);">RECON</span>
          <span style="font-size:var(--text-footnote-size); color:var(--color-label-secondary); margin-top:var(--space-1);">Reconditioning — not available for sale</span>
        </button>

      </div>
    </div>
  </div>
</div>
```

#### B. Append to `lot-checklist-app/app.js`

Append the following after the existing content (after the stub declarations). Do not replace or remove anything already in `app.js`:

```javascript
// ------------------------------------------------------------
// VIN ENTRY — validation and routing to CategorySelect
// Wired inside DOMContentLoaded in the section added below.
// ------------------------------------------------------------

// VIN format: exactly 17 chars, uppercase A-H, J-N, P-Z, 0-9
// (excludes I, O, Q which are not valid VIN characters)
var VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/i;

function handleVINNext() {
  var vinInput = document.getElementById('vin-input');
  var vinError = document.getElementById('vin-error');
  if (!vinInput) return;

  var vin = vinInput.value.trim().toUpperCase();

  if (!VIN_REGEX.test(vin)) {
    // Show inline error — no alert()
    if (vinError) vinError.style.display = 'block';
    vinInput.focus();
    return;
  }

  // Valid VIN: clear error, store, route to category select
  if (vinError) vinError.style.display = 'none';
  appState.vehicleVIN = vin;

  // Display VIN on category select screen
  var vinDisplay = document.getElementById('category-vin-display');
  if (vinDisplay) {
    vinDisplay.textContent = 'VIN: ' + vin;
  }

  showScreen('category-select');
}

function handleCategorySelect(category) {
  // category: 'NEW' | 'FLR' | 'SOLD' | 'BND' | 'RECON'
  appState.vehicleCategory = category;
  appState.checklist = CHECKLISTS['vehicle-audit'][category];
  appState.currentItemIndex = 0;
  appState.sessionStartTime = new Date().toISOString();
  renderChecklistItem(0);
  showScreen('checklist-view');
}

// Wire VIN and Category handlers — append to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {

  // VIN Next button
  var btnVinNext = document.getElementById('btn-vin-next');
  if (btnVinNext) {
    btnVinNext.addEventListener('click', handleVINNext);
  }

  // VIN input: submit on Enter key
  var vinInput = document.getElementById('vin-input');
  if (vinInput) {
    vinInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        handleVINNext();
      }
    });
    // Clear error on input change
    vinInput.addEventListener('input', function() {
      var vinError = document.getElementById('vin-error');
      if (vinError) vinError.style.display = 'none';
    });
  }

  // Category buttons
  var categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var category = btn.getAttribute('data-category');
      if (category) {
        handleCategorySelect(category);
      }
    });
    // Press animation
    btn.addEventListener('pointerdown', function() {
      btn.style.transform = 'scale(0.97)';
      btn.style.transition = 'transform var(--duration-fast) var(--easing-standard)';
    });
    btn.addEventListener('pointerup', function() {
      btn.style.transform = 'scale(1)';
      btn.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
    btn.addEventListener('pointercancel', function() {
      btn.style.transform = 'scale(1)';
      btn.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
  });

});
```

**Important:** There will now be two `document.addEventListener('DOMContentLoaded', ...)` calls in `app.js` — the first from task 08 and this one from task 09. This is intentional and correct. Multiple `DOMContentLoaded` listeners are allowed and all will fire when the DOM is ready. Do not merge them.

#### CONSTRAINTS

- **Offline-first:** No CDN URLs. No fetch calls. `CHECKLISTS['vehicle-audit'][category]` is read from the already-loaded `data.js` constant.
- **VIN validation regex:** Use `/^[A-HJ-NPR-Z0-9]{17}$/i` exactly as documented in `implementation-plan.md` Task 9. Do not use a simpler alphanumeric regex — the exclusion of I, O, Q is required.
- **No alert():** Validation errors are shown in `#vin-error` (inline DOM element), never via `window.alert()`.
- **Binary responses only:** The VIN field is the only `<input>` on this screen — it is a required identifier, not a checklist response. Category selection is binary button tap (5 options). No free-text checklist fields exist.
- **Exact CHECKLISTS key strings:** Use `CHECKLISTS['vehicle-audit'][category]` where `category` is one of: `'NEW'`, `'FLR'`, `'SOLD'`, `'BND'`, `'RECON'` exactly as documented in `implementation-plan.md` Section 3.1.
- **renderChecklistItem stub:** Calling `renderChecklistItem(0)` before task 10 is complete is safe — the stub declared in task 08 does nothing, which is correct behavior until task 10 fills it in.
- **Exact screen IDs:** Back buttons use `showScreen('audit-type-select')` and `showScreen('vin-entry')` — these exact strings only.
- **No architectural decisions:** VIN regex, CHECKLISTS key strings, screen IDs, and `appState` fields are all defined in `implementation-plan.md` and must not be changed.

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading `lot-checklist-app/index.html` and `lot-checklist-app/app.js` before proceeding to Step 5:

- [ ] `<div id="vin-entry" class="screen">` contains `<input id="vin-input" maxlength="17">`
- [ ] `<div id="vin-entry" class="screen">` contains `<button id="btn-vin-next">`
- [ ] `<div id="vin-entry" class="screen">` contains `<p id="vin-error">` with `display:none` in its style
- [ ] `<div id="category-select" class="screen">` contains exactly 5 elements with class `category-btn`
- [ ] The 5 `.category-btn` elements have `data-category` attributes with values: `NEW`, `FLR`, `SOLD`, `BND`, `RECON`
- [ ] `<div id="category-select" class="screen">` contains `<p id="category-vin-display">`
- [ ] `app.js` declares `var VIN_REGEX` with the pattern `/^[A-HJ-NPR-Z0-9]{17}$/i`
- [ ] `app.js` defines function `handleVINNext()`
- [ ] `app.js` defines function `handleCategorySelect(category)`
- [ ] `handleCategorySelect` sets `appState.checklist = CHECKLISTS['vehicle-audit'][category]` — exact key string present
- [ ] `handleCategorySelect` sets `appState.currentItemIndex = 0` and `appState.sessionStartTime`
- [ ] `handleCategorySelect` calls `renderChecklistItem(0)` then `showScreen('checklist-view')`
- [ ] No `window.alert()` call appears anywhere in `app.js`
- [ ] No CDN URL appears in either file

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.09.status` → `"complete"`
   - `prompts.09.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 09 complete.**
> Written: VINEntry screen (`#vin-input`, `#btn-vin-next`, `#vin-error`), CategorySelect screen (5 category buttons with `data-category`), VIN validation (`VIN_REGEX`), `handleVINNext()`, `handleCategorySelect()`.
>
> **Build prompt 10 is now unblocked** (also requires build task 06 to be complete).
> Check `lot-checklist-app/build-sequence/state.json`: if both 06 and 09 are `complete`, send `lot-checklist-app/build-sequence/10-checklist-view-yes-no-logic.md`.
