# BUILD PROMPT 11 — FAILURE ACTION VIEW

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL (depends on 10) |
| **Depends on** | 10 |
| **Unblocks** | 12 |
| **Creates/Modifies** | `lot-checklist-app/index.html`, `lot-checklist-app/app.js` |
| **Estimated output** | ~100 lines added across index.html and app.js |

---

## STEP 1 — READ CONTEXT FILES

Read these files before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in STEP 2
2. `lot-checklist-app/styling-spec.md` — Sections 7b (FailureActionCard spec: glass-modal class, left accent border, typography for role/channel/say/label, animation) and 7c (ActionResponseButton spec: btn-done and btn-follow-up colors, height, border-radius, font)
3. `lot-checklist-app/implementation-plan.md` — Section 7 Task 11 (exact scope), Section 3.2 (failureAction object schema: role, channel, say, responsibleTeam), Section 4.2 (response object schema: itemId, response, timestamp), Section 5.2 (screen ID `failure-action-view`), Section 8 (Constraints — especially Constraint 7: exact Failure Action text)
4. `lot-checklist-app/blueprint.md` — Section 1 (FailureActionView screen row: trigger, description, no-skip rule), Section 5 (FailureActionCard and ActionResponseButton component specs)
5. `lot-checklist-app/index.html` — read existing structure; locate `<div id="failure-action-view" class="screen">` to fill
6. `lot-checklist-app/app.js` — read existing structure; locate where `renderFailureAction` is called (from NO button handler in Task 10) and where to append new functions

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If prompt `11` has any status other than `pending`:**
STOP. Tell the user exactly:
> "Build prompt 11 has status `[current status]` — expected `pending`. Do not re-run a completed or in-progress prompt. If you need to reset, set status back to `pending` and restore output files to their pre-run state."

**If prompt `11` has status `pending`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.11.status` → `"in_progress"`
- `prompts.11.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting build prompt 11: FAILURE ACTION VIEW."

---

## STEP 3 — TASK

### Context

This task fills the `#failure-action-view` screen in `index.html` and appends `renderFailureAction()` plus the Done/Needs Follow-Up button handlers to `app.js`.

The FailureActionView is displayed whenever the user taps NO on a checklist item. It shows the failed item's `failureAction` object fields — role, channel, SAY script — verbatim with zero text transformation. The SAY block is conditionally hidden when `failureAction.say` is `null`.

**The user cannot leave this screen without responding.** There is no back button, no dismiss gesture, no skip. The only valid exit paths are tapping "Done — action complete" or "Needs Follow-Up". Both paths record a response and call `advanceChecklist()` before navigating back to `checklist-view`.

The NO button handler (added in Task 10) already calls both `renderFailureAction(appState.currentItemIndex)` and `showScreen('failure-action-view')`. This task implements the function body and wires the two response buttons.

### Instructions

#### Modification 1 of 2: `lot-checklist-app/index.html`

Locate the `<div id="failure-action-view" class="screen">` container. Fill it with the following HTML. Do not modify any other element in `index.html`.

```html
<div id="failure-action-view" class="screen">

  <!-- Nav bar — no back button on this screen (implementation-plan.md Task 11 Enforcement) -->
  <nav class="glass-nav">
    <span class="nav-title">Action Required</span>
  </nav>

  <!-- Failure action card — slides up via failure-action-reveal animation -->
  <div class="content-area">
    <div class="glass-modal failure-action-card" id="failure-action-card">

      <!-- "FAILURE ACTION" label — caption 2, uppercase (styling-spec.md Section 7b) -->
      <p class="failure-action-label">FAILURE ACTION</p>

      <!-- Role line — footnote size, secondary color (styling-spec.md Section 7b) -->
      <p class="failure-action-role-line" id="failure-action-role"></p>

      <!-- Channel line — footnote size, secondary color (styling-spec.md Section 7b) -->
      <p class="failure-action-channel-line" id="failure-action-channel"></p>

      <!-- SAY block — hidden when failureAction.say is null; callout size, italic (styling-spec.md Section 7b) -->
      <div class="failure-action-say-block" id="failure-action-say-block">
        <p class="failure-action-say" id="failure-action-say"></p>
      </div>

      <!-- Response buttons — stacked vertically (styling-spec.md Section 7c) -->
      <div class="failure-action-buttons">
        <!-- "Done — action complete" — background: var(--color-audit-resolved) → #34C759 light / #30D158 dark -->
        <button id="btn-done" class="btn-done">Done — action complete</button>
        <!-- "Needs Follow-Up" — background: var(--color-audit-flagged) → #FF9500 light / #FF9F0A dark -->
        <button id="btn-follow-up" class="btn-follow-up">Needs Follow-Up</button>
      </div>

    </div>
  </div>

</div>
```

**CSS class reference (from `styling-spec.md`):**

| Class | Spec Section | Key Properties |
|---|---|---|
| `.glass-modal` | Section 3 | `background: rgba(255,255,255,0.92)` light; `backdrop-filter: blur(40px) saturate(200%)`; `border-radius: var(--radius-large) var(--radius-large) 0 0` |
| `.failure-action-card` | Section 7b | Left accent: `border-left: 4px solid var(--color-destructive)`; `padding: var(--space-6)` |
| `.failure-action-label` | Section 7b | `font-size: var(--text-caption-2-size)` (11px); `text-transform: uppercase`; `letter-spacing: var(--text-caption-2-ls)` (0.07px); `color: var(--color-label-secondary)` |
| `.failure-action-role-line` | Section 7b | `font-size: var(--text-footnote-size)` (13px); `color: var(--color-label-secondary)` |
| `.failure-action-channel-line` | Section 7b | `font-size: var(--text-footnote-size)` (13px); `color: var(--color-label-secondary)` |
| `.failure-action-say` | Section 7b | `font-size: var(--text-callout-size)` (16px); `font-style: italic`; `color: var(--color-label-primary)` |
| `.btn-done` | Section 7c | `background: var(--color-audit-resolved)`; `color: #FFFFFF`; `height: 50px`; `border-radius: var(--radius-medium)` (12px); `font-size: var(--text-callout-size)`; `font-weight: 600` |
| `.btn-follow-up` | Section 7c | `background: var(--color-audit-flagged)`; `color: #FFFFFF`; same height/radius/font as btn-done |
| `.failure-action-buttons` | Section 7c | `display: flex`; `flex-direction: column`; `gap: var(--space-3)` (12px) |

**`failure-action-reveal` animation (from `styling-spec.md` Section 6):**

The `.failure-action-card` slides up from the bottom of the screen when the NO button is tapped. The animation is driven by a CSS transition on the card element. The JS side sets an initial transform before showing the screen, then removes it on the next animation frame:

```css
/* In styles.css — add if not present from Task 04 */
.failure-action-card {
  transform: translateY(100%);
  transition: transform var(--duration-standard) var(--easing-decelerate);
  /* --duration-standard: 0.25s — styling-spec.md Section 6 */
  /* --easing-decelerate: cubic-bezier(0, 0, 0.2, 1) — styling-spec.md Section 6 */
}
.failure-action-card.revealed {
  transform: translateY(0);
}
```

The JS trigger (added in Modification 2 below) adds class `revealed` on the next animation frame after `showScreen('failure-action-view')` is called, allowing the transition to play.

---

#### Modification 2 of 2: `lot-checklist-app/app.js`

Append the following block to `app.js`. Do not modify any existing code.

```javascript
// ============================================================
// Task 11 — FailureActionView: renderFailureAction + response handlers
// ============================================================

/**
 * renderFailureAction(index)
 * Reads appState.checklist[index].failureAction and populates the
 * failure-action-view screen fields verbatim. Hides the SAY block when
 * failureAction.say is null. Called by the NO button handler (Task 10).
 *
 * Constraint 7 (implementation-plan.md Section 8): NO string transformation
 * on role, channel, or say. Use .textContent assignment only.
 */
function renderFailureAction(index) {
  var item = appState.checklist[index];
  var fa = item.failureAction;

  // Verbatim output — no trim(), toLowerCase(), substring(), or template modification
  document.getElementById('failure-action-role').textContent = fa.role;
  document.getElementById('failure-action-channel').textContent = fa.channel;

  var sayBlock = document.getElementById('failure-action-say-block');
  var sayEl = document.getElementById('failure-action-say');
  if (fa.say !== null && fa.say !== undefined && fa.say !== '') {
    sayEl.textContent = fa.say;  // verbatim — no transformation
    sayBlock.style.display = 'block';
  } else {
    sayEl.textContent = '';
    sayBlock.style.display = 'none';
  }

  // Trigger failure-action-reveal animation (styling-spec.md Section 6)
  // Card starts at translateY(100%); adding 'revealed' class on next frame plays transition
  var card = document.getElementById('failure-action-card');
  if (card) {
    card.classList.remove('revealed');
    requestAnimationFrame(function () {
      card.classList.add('revealed');
    });
  }
}

// "Done — action complete" button handler
// Records response 'done', persists state, advances checklist, returns to checklist-view
document.getElementById('btn-done').addEventListener('click', function () {
  var item = appState.checklist[appState.currentItemIndex];
  appState.responses.push({
    itemId: item.id,
    response: 'done',                          // schema: implementation-plan.md Section 4.2
    timestamp: new Date().toISOString()
  });
  persistState();      // REQUIRED — must be called after every response push (Section 4.3)
  advanceChecklist();  // increment currentItemIndex; navigate if all items answered
  showScreen('checklist-view');
});

// "Needs Follow-Up" button handler
// Records response 'needs-followup', persists state, advances checklist, returns to checklist-view
document.getElementById('btn-follow-up').addEventListener('click', function () {
  var item = appState.checklist[appState.currentItemIndex];
  appState.responses.push({
    itemId: item.id,
    response: 'needs-followup',                // schema: implementation-plan.md Section 4.2
    timestamp: new Date().toISOString()
  });
  persistState();      // REQUIRED — must be called after every response push (Section 4.3)
  advanceChecklist();  // increment currentItemIndex; navigate if all items answered
  showScreen('checklist-view');
});

// NOTE: There is no back button handler for failure-action-view.
// The user must tap one of the two buttons above to proceed.
// This is enforced by the HTML structure (no back button element in #failure-action-view).
```

**Critical enforcement rules:**
1. `persistState()` is called in **both** handlers immediately after `appState.responses.push()`. Never skip. Skipping breaks offline resume — if the session is interrupted after tapping NO but before tapping Done/Follow-Up, the response would be lost on reload.
2. `advanceChecklist()` (defined in Task 10) is called before `showScreen('checklist-view')`. This increments `appState.currentItemIndex` and determines whether more items remain.
3. Neither handler modifies `appState.currentItemIndex` directly — that is `advanceChecklist()`'s responsibility.

### CONSTRAINTS

- **Offline-first:** No CDN URLs in `index.html` or `app.js`. No external resource references of any kind (implementation-plan.md Section 8 Constraint 2).
- **Binary responses enforced:** The only response paths from FailureActionView are `response: 'done'` and `response: 'needs-followup'`. No free-text fields, no N/A, no skip, no dismiss-without-responding path exists (implementation-plan.md Section 8 Constraint 6).
- **Exact Failure Action text:** `fa.role`, `fa.channel`, and `fa.say` are set using `.textContent` assignment only. No string transformation (`trim()`, `toLowerCase()`, `substring()`, template modification, summarization, truncation). The `say` field is shown in full or hidden entirely when null — never partially shown (implementation-plan.md Section 8 Constraint 7).
- **persistState() required in both handlers:** Both Done and Needs Follow-Up handlers must call `persistState()` after pushing to `appState.responses`. This is the offline resume persistence guarantee (implementation-plan.md Section 4.3).
- **No back button on FailureActionView:** The screen has no navigation back to `checklist-view` except through a response button. This is enforced in both HTML structure and JS (no back button element, no `showScreen('checklist-view')` call without a preceding response push).
- **No Phase 2 features:** No decision tree link rendering, no `→ SEE:` hyperlink handling, no comment fields, no photo attachment.

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading the modified files. All criteria are objectively verifiable without running the app.

**`index.html` checks:**
- [ ] Contains `id="failure-action-view"` on a `.screen` div
- [ ] Contains `id="failure-action-role"` inside `#failure-action-view`
- [ ] Contains `id="failure-action-channel"` inside `#failure-action-view`
- [ ] Contains `id="failure-action-say-block"` inside `#failure-action-view`
- [ ] Contains `id="failure-action-say"` inside `#failure-action-view`
- [ ] Contains `id="btn-done"` inside `#failure-action-view`
- [ ] Contains `id="btn-follow-up"` inside `#failure-action-view`
- [ ] Contains `class="glass-modal"` on the FailureActionCard container inside `#failure-action-view`
- [ ] Contains `class="btn-done"` on the Done button
- [ ] Contains `class="btn-follow-up"` on the Needs Follow-Up button
- [ ] Does NOT contain any `<button` with a back-navigation purpose (e.g., "Back", "←", `showScreen('checklist-view')` inline) inside `#failure-action-view`

**`app.js` checks:**
- [ ] Contains `function renderFailureAction`
- [ ] `renderFailureAction` sets `failure-action-role` using `.textContent = fa.role`
- [ ] `renderFailureAction` sets `failure-action-channel` using `.textContent = fa.channel`
- [ ] `renderFailureAction` sets `failure-action-say` using `.textContent = fa.say`
- [ ] `renderFailureAction` hides `failure-action-say-block` when `fa.say` is null/undefined/empty
- [ ] `btn-done` click handler contains `response: 'done'`
- [ ] `btn-follow-up` click handler contains `response: 'needs-followup'`
- [ ] Both handlers call `persistState()` after the `appState.responses.push()` call
- [ ] Both handlers call `advanceChecklist()` before `showScreen('checklist-view')`
- [ ] Neither handler uses `.toLowerCase()`, `.trim()`, `.substring()`, or any transformation on `fa.role`, `fa.channel`, or `fa.say`

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.11.status` → `"complete"`
   - `prompts.11.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 11 complete.**
> Modified: `lot-checklist-app/index.html` (FailureActionView screen filled), `lot-checklist-app/app.js` (`renderFailureAction()`, Done handler, Needs Follow-Up handler added).
>
> **Now unblocked:**
> - `12-audit-summary-task-list-generation.md` — send this next
