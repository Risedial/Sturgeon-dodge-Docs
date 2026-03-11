# BUILD PROMPT 04 — COMPONENT ATOM STYLES

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL (depends on 03) |
| **Depends on** | 03 |
| **Unblocks** | 07 |
| **Modifies** | `lot-checklist-app/styles.css` |
| **Estimated output** | ~150 lines appended to `styles.css` |

---

## STEP 1 — READ CONTEXT FILES

Read these files before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in STEP 2
2. `lot-checklist-app/styling-spec.md` — Section 7 (Component Specifications) is the authoritative source for all component values in this task. Also consult Sections 4, 5, 6 for spacing, radius, and animation tokens.
3. `lot-checklist-app/implementation-plan.md` — Section 7 Task 04 scope lists the exact class names required
4. `lot-checklist-app/styles.css` — read to confirm Tasks 02 and 03 output exists before appending

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If prompt `04` has any status other than `pending`:**
STOP. Tell the user exactly:
> "Build prompt 04 has status `[current status]` — expected `pending`. Do not re-run a completed or in-progress prompt. If you need to reset, set status back to `pending` and restore `styles.css` to its pre-run state."

**If prompt `03` has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 04 cannot start — prompt 03 (glass-material-classes) has status `[current status]`. Wait for prompt 03 to complete, then re-send this prompt."

**If prompt `04` has status `pending` AND prompt `03` has status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.04.status` → `"in_progress"`
- `prompts.04.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting build prompt 04: COMPONENT ATOM STYLES."

---

## STEP 3 — TASK

### Context

This task appends all UI component atom styles to `styles.css`. Tasks 02 and 03 have already written the design tokens and glass material classes. This task writes the CSS for every interactive and display component used in the checklist flow. These classes are referenced by the HTML added in Tasks 07–17 and by JavaScript in `app.js`.

All values are derived from `styling-spec.md` Sections 4–7. Every CSS custom property reference must use a variable already defined in Tasks 02–03. No new design tokens are introduced here — only component rules that consume existing tokens.

**Do not modify any existing content in `styles.css`.** All content from Tasks 02 and 03 must remain untouched. Append only.

### CONSTRAINTS

- **Offline-first:** No CDN URLs, no external resources. Plain CSS only.
- **No build step:** No Sass, no PostCSS, no framework classes.
- **Binary responses only:** `.btn-yes` and `.btn-no` are the only interactive elements in the checklist flow. No `.btn-skip`, no `.btn-na`, no `.btn-comment`. Do not add any component for text input on checklist screens.
- **Exact Failure Action text:** `.failure-action-say` renders verbatim italic text — no truncation, no overflow:hidden that would hide content.
- **No Phase 2 features:** Do not add CSS for decision tree panels, overdue-threshold badges, lot map overlays, or any feature not in the Phase 1 component list below.
- **44px minimum tap target:** All interactive elements (buttons, tiles) must meet `min-height: 44px` or use an explicit height ≥ 44px.

### Instructions

Open `lot-checklist-app/styles.css`. Confirm `.glass-card {`, `.glass-nav {`, and `.glass-modal {` are present from Task 03. Then append the following content exactly to the end of the file.

---

#### Content to append to `lot-checklist-app/styles.css`:

```css
/* ============================================================
   TASK 04 — COMPONENT ATOM STYLES
   Source: lot-checklist-app/styling-spec.md Section 7
   All custom property references resolve to tokens from Tasks 02–03.
   ============================================================ */

/* ----- Animation keyframes ----- */

/* checklist-item-advance: current item exits left, next enters from right */
@keyframes item-exit {
  to { transform: translateX(-100%); opacity: 0; }
}
@keyframes item-enter {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

/* failure-action-reveal: card slides up from bottom on NO tap */
@keyframes failure-reveal {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

/* task-list-appear: each TaskCard fades in with upward translate, staggered */
@keyframes task-list-appear {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ----- YesNoButton (styling-spec.md Section 7a) ----- */
/* Container: two buttons side-by-side with var(--space-3) gap */
.yes-no-buttons {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
}

.btn-yes,
.btn-no {
  flex: 1;
  height: 52px;                          /* [STANDARD] — taller than 44px min for primary emphasis */
  border: none;
  border-radius: var(--radius-medium);   /* 12px */
  font-family: var(--font-family);
  font-size: var(--text-headline-size);  /* 17px */
  font-weight: 600;
  letter-spacing: var(--text-headline-ls);
  padding-inline: var(--space-4);
  cursor: pointer;
  transition: transform var(--duration-fast) var(--easing-standard);
}

.btn-yes {
  background: var(--color-audit-yes);    /* #34C759 light / #30D158 dark */
  color: #FFFFFF;
}

.btn-no {
  background: var(--color-audit-no);     /* #FF3B30 light / #FF453A dark */
  color: #FFFFFF;
}

.btn-yes:active {
  transform: scale(0.95);
  transition: transform var(--duration-fast) var(--easing-standard);
}
.btn-yes:not(:active) {
  transition: transform var(--duration-standard) var(--easing-spring);
}

.btn-no:active {
  transform: scale(0.95);
  transition: transform var(--duration-fast) var(--easing-standard);
}
.btn-no:not(:active) {
  transition: transform var(--duration-standard) var(--easing-spring);
}

.btn-yes:disabled,
.btn-no:disabled {
  opacity: 0.4;
  pointer-events: none;
}

/* ----- ActionResponseButton (styling-spec.md Section 7c) ----- */
/* Container: buttons stacked vertically, full width */
.action-response-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.btn-done,
.btn-follow-up {
  display: block;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: var(--radius-medium);    /* 12px */
  font-family: var(--font-family);
  font-size: var(--text-callout-size);    /* 16px */
  font-weight: 600;
  letter-spacing: var(--text-callout-ls);
  cursor: pointer;
  transition: transform var(--duration-fast) var(--easing-standard);
}

.btn-done {
  background: var(--color-audit-resolved);  /* #34C759 light / #30D158 dark */
  color: #FFFFFF;
}

.btn-follow-up {
  background: var(--color-audit-flagged);   /* #FF9500 light / #FF9F0A dark — ORANGE, not red */
  color: #FFFFFF;
}

.btn-done:active,
.btn-follow-up:active {
  transform: scale(0.97);
}

/* ----- FailureActionCard (styling-spec.md Section 7b) ----- */
/* Uses .glass-modal as background class. Add .failure-action-card for layout. */
.failure-action-card {
  padding: var(--space-6);
  border-left: 4px solid var(--color-destructive);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.failure-action-label {
  font-size: var(--text-caption-2-size);    /* 11px */
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: var(--text-caption-2-ls); /* 0.07px */
  color: var(--color-label-secondary);
}

.failure-action-role,
.failure-action-channel {
  font-size: var(--text-footnote-size);    /* 13px */
  font-weight: var(--text-footnote-weight);
  line-height: var(--text-footnote-lh);
  letter-spacing: var(--text-footnote-ls);
  color: var(--color-label-secondary);
}

.failure-action-body {
  font-size: var(--text-body-size);        /* 17px */
  font-weight: var(--text-body-weight);
  line-height: var(--text-body-lh);
  letter-spacing: var(--text-body-ls);
  color: var(--color-label-primary);
}

.failure-action-say {
  font-size: var(--text-callout-size);     /* 16px */
  font-weight: var(--text-callout-weight);
  font-style: italic;
  line-height: var(--text-callout-lh);
  letter-spacing: var(--text-callout-ls);
  color: var(--color-label-primary);
  /* Never truncate or hide — must render full verbatim text */
}

/* ----- ChecklistProgressBar (styling-spec.md Section 7d) ----- */
/* Fixed below nav bar, full screen width */
.progress-bar {
  position: fixed;
  top: calc(56px + env(safe-area-inset-top));
  left: 0;
  right: 0;
  width: 100%;
  height: 3px;
  background: var(--color-separator);
  border-radius: var(--radius-pill);
  z-index: 99;
}

.progress-bar__fill {
  height: 3px;
  background: var(--color-accent);         /* #007AFF light / #0A84FF dark */
  border-radius: var(--radius-pill);
  width: 0%;
  transition: width var(--duration-standard) var(--easing-standard);
}

/* ----- ChecklistItem (styling-spec.md Section 7e) ----- */
.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  min-height: var(--list-item-height);     /* 44px minimum */
  border-bottom: 0.5px solid var(--color-separator);
}

.checklist-item:last-child {
  border-bottom: none;
}

.checklist-item__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-label-tertiary);
}

.checklist-item__text {
  font-size: var(--text-body-size);        /* 17px */
  font-weight: var(--text-body-weight);    /* 400 */
  line-height: var(--text-body-lh);
  letter-spacing: var(--text-body-ls);
  color: var(--color-label-primary);
  flex: 1;
}

/* ----- ZoneHeader (styling-spec.md Section 7f) ----- */
/* Section divider for Morning Lot Walk zone groupings */
.zone-header {
  font-size: var(--text-caption-2-size);    /* 11px */
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: var(--text-caption-2-ls); /* 0.07px */
  color: var(--color-label-secondary);
  background: transparent;
  padding: var(--space-6) var(--space-4) var(--space-2);
  border: none;
  width: 100%;
  display: block;
}

/* ----- TeamGroupHeader (styling-spec.md Section 7g) ----- */
/* Section divider in Task List screen. Team label strings: "LOT TEAM" | "SALES TEAM" | "SERVICE DEPARTMENT" */
.team-header {
  display: flex;
  align-items: center;
  height: 36px;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-footnote-size);    /* 13px */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: var(--text-caption-2-ls);
  color: var(--color-label-secondary);
  background: var(--glass-bg-card-light);
  backdrop-filter: var(--glass-backdrop-filter);
  -webkit-backdrop-filter: var(--glass-backdrop-filter);
  border-radius: 0;                        /* spans full width — no rounded corners */
  width: 100%;
}

[data-theme="dark"] .team-header {
  background: var(--glass-bg-card-dark);
}

/* ----- AuditTypeTile (styling-spec.md Section 7j) ----- */
/* Grid layout: 2-column grid with var(--space-3) gap */
.audit-type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  padding: var(--space-4);
}

.audit-type-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 100px;
  padding: var(--card-padding);             /* 16px */
  border-radius: var(--radius-large);       /* 20px */
  cursor: pointer;
  background: none;
  border: none;
  transition: transform var(--duration-fast) var(--easing-spring);
  -webkit-tap-highlight-color: transparent;
}

.audit-type-tile:active {
  transform: scale(0.97);
}

.audit-type-tile__icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent);
}

.audit-type-tile__label {
  font-size: var(--text-subheadline-size);  /* 15px */
  font-weight: var(--text-subheadline-weight);
  letter-spacing: var(--text-subheadline-ls);
  color: var(--color-label-primary);
  text-align: center;
}

/* ----- TaskCard (styling-spec.md Section 7h) ----- */
.task-card {
  padding: var(--card-padding);             /* 16px */
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  animation: task-list-appear var(--duration-standard) var(--easing-decelerate) both;
  animation-delay: calc(var(--card-index, 0) * 50ms);  /* stagger per card */
}

/* FOLLOW-UP variant: left accent border in orange (NOT red) */
.task-card--follow-up {
  border-left: 4px solid var(--color-needs-followup);  /* #FF9500 light / #FF9F0A dark */
}

.task-card__field-label {
  font-size: var(--text-caption-2-size);    /* 11px */
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: var(--text-caption-2-ls);
  color: var(--color-label-secondary);
}

.task-card__field-value--vehicle {
  font-size: var(--text-subheadline-size);  /* 15px */
  font-weight: var(--text-subheadline-weight);
  letter-spacing: var(--text-subheadline-ls);
  color: var(--color-label-primary);
}

.task-card__field-value--item {
  font-size: var(--text-body-size);         /* 17px */
  font-weight: var(--text-body-weight);
  line-height: var(--text-body-lh);
  color: var(--color-label-primary);
}

.task-card__field-value--action {
  font-size: var(--text-callout-size);      /* 16px */
  font-weight: var(--text-callout-weight);
  line-height: var(--text-callout-lh);
  color: var(--color-label-primary);
}

.task-card__status-badge {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-pill);
  padding: 2px 8px;
  font-size: var(--text-footnote-size);     /* 13px */
  font-weight: 600;
  color: #FFFFFF;
}

.task-card__status-badge--resolved {
  background: var(--color-success);         /* #34C759 light / #30D158 dark */
}

.task-card__status-badge--followup {
  background: var(--color-needs-followup);  /* #FF9500 light / #FF9F0A dark — ORANGE */
}

/* ----- ShareButton (styling-spec.md Section 7i) ----- */
.btn-share {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  background: transparent;
  border: none;
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  font-family: var(--font-family);
  font-size: var(--text-callout-size);      /* 16px */
  font-weight: var(--text-callout-weight);
  color: var(--color-accent);               /* #007AFF light / #0A84FF dark */
  transition: opacity var(--duration-fast) var(--easing-standard);
  padding: 0;
}

.btn-share:active {
  opacity: 0.6;
}

.btn-share__icon {
  width: 24px;
  height: 24px;
}

/* ----- Toast (clipboard copy confirmation) ----- */
.toast {
  position: fixed;
  bottom: calc(env(safe-area-inset-bottom) + var(--space-6));
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-bg-secondary);
  color: var(--color-label-primary);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-pill);
  font-family: var(--font-family);
  font-size: var(--text-footnote-size);     /* 13px */
  font-weight: var(--text-footnote-weight);
  z-index: 200;
  display: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}

.toast.visible {
  display: block;
}

/* ----- Modal overlay and box (resume-prompt modal) ----- */
/* #resume-modal uses modal-overlay as its class. .modal-box uses .glass-modal for glass treatment. */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 150;
  display: none;
  align-items: flex-end;
  justify-content: center;
}

.modal-overlay.visible {
  display: flex;
}

.modal-box {
  width: 100%;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.modal-box__title {
  font-size: var(--text-title-2-size);      /* 22px */
  font-weight: var(--text-title-2-weight);
  letter-spacing: var(--text-title-2-ls);
  color: var(--color-label-primary);
}

.modal-box__body {
  font-size: var(--text-body-size);
  font-weight: var(--text-body-weight);
  line-height: var(--text-body-lh);
  color: var(--color-label-secondary);
}

/* ----- Audit Summary stats ----- */
.audit-summary-stats {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
}

.audit-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  min-height: var(--list-item-height);
  border-bottom: 0.5px solid var(--color-separator);
}

.audit-stat:last-child {
  border-bottom: none;
}

.audit-stat__label {
  font-size: var(--text-body-size);
  font-weight: var(--text-body-weight);
  color: var(--color-label-secondary);
}

.audit-stat__value {
  font-size: var(--text-headline-size);
  font-weight: var(--text-headline-weight);
  color: var(--color-label-primary);
}

/* ----- VIN input field ----- */
.vin-input {
  width: 100%;
  height: 44px;
  padding-inline: var(--space-4);
  border: 1px solid var(--color-separator);
  border-radius: var(--radius-medium);       /* 12px */
  font-family: var(--font-family);
  font-size: var(--text-body-size);
  color: var(--color-label-primary);
  background: var(--color-bg-tertiary);
  box-sizing: border-box;
  text-transform: uppercase;
}

.vin-input:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 0;
}

.vin-input-error {
  font-size: var(--text-footnote-size);
  color: var(--color-destructive);
  padding: var(--space-1) var(--space-4);
  display: none;
}

.vin-input-error.visible {
  display: block;
}

/* ----- Category / SubType select buttons ----- */
.select-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: var(--list-item-height);      /* 44px */
  padding: var(--space-3) var(--space-4);
  border: none;
  border-radius: var(--radius-medium);
  font-family: var(--font-family);
  font-size: var(--text-body-size);
  font-weight: var(--text-body-weight);
  color: var(--color-label-primary);
  background: var(--glass-bg-card-light);
  cursor: pointer;
  text-align: left;
  transition: transform var(--duration-fast) var(--easing-standard);
}

[data-theme="dark"] .select-button {
  background: var(--glass-bg-card-dark);
}

.select-button:active {
  transform: scale(0.98);
}

/* ----- PDI status display ----- */
.pdi-status-display {
  display: none;
  padding: var(--space-4);
  border-radius: var(--radius-medium);
  font-size: var(--text-headline-size);
  font-weight: 600;
  text-align: center;
}

.pdi-status-display.visible {
  display: block;
}

.pdi-status-display--on-time {
  background: rgba(52, 199, 89, 0.15);
  color: var(--color-success);
}

.pdi-status-display--day1-overdue {
  background: rgba(255, 159, 10, 0.15);
  color: var(--color-warning);
}

.pdi-status-display--critical {
  background: rgba(255, 59, 48, 0.15);
  color: var(--color-destructive);
}
```

---

### Verification After Writing

1. Open `lot-checklist-app/styles.css`
2. Confirm all required class names are present (see success criteria)
3. Confirm no content from Tasks 02–03 was modified
4. Confirm no `@import` or CDN URL was introduced

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading `lot-checklist-app/styles.css`. All criteria are objectively verifiable without running the app.

- [ ] `lot-checklist-app/styles.css` contains `.btn-yes {`
- [ ] `lot-checklist-app/styles.css` contains `.btn-no {`
- [ ] `lot-checklist-app/styles.css` contains `.btn-done {`
- [ ] `lot-checklist-app/styles.css` contains `.btn-follow-up {`
- [ ] `lot-checklist-app/styles.css` contains `.progress-bar {`
- [ ] `lot-checklist-app/styles.css` contains `.progress-bar__fill {`
- [ ] `lot-checklist-app/styles.css` contains `.zone-header {`
- [ ] `lot-checklist-app/styles.css` contains `.team-header {`
- [ ] `lot-checklist-app/styles.css` contains `.checklist-item {`
- [ ] `lot-checklist-app/styles.css` contains `.btn-share {`
- [ ] `lot-checklist-app/styles.css` contains `.audit-type-tile {`
- [ ] `lot-checklist-app/styles.css` contains `.task-card {`
- [ ] `lot-checklist-app/styles.css` contains `.task-card--follow-up {`
- [ ] `lot-checklist-app/styles.css` contains `.toast {`
- [ ] `lot-checklist-app/styles.css` contains `.modal-overlay {`
- [ ] `lot-checklist-app/styles.css` contains `.modal-box {`
- [ ] `lot-checklist-app/styles.css` contains `@keyframes task-list-appear`
- [ ] `lot-checklist-app/styles.css` contains `var(--color-audit-yes)` in `.btn-yes`
- [ ] `lot-checklist-app/styles.css` contains `var(--color-audit-no)` in `.btn-no`
- [ ] `lot-checklist-app/styles.css` contains `var(--color-audit-flagged)` in `.btn-follow-up`
- [ ] `lot-checklist-app/styles.css` contains `var(--color-needs-followup)` in `.task-card--follow-up`
- [ ] `.task-card--follow-up` uses `border-left` (orange/needs-followup accent), NOT `border-left` with `--color-destructive` (red)
- [ ] `.btn-yes` height is `52px` (per styling-spec.md Section 7a — taller than 44px minimum)
- [ ] `lot-checklist-app/styles.css` does NOT contain any CDN URL or external `@import`
- [ ] `lot-checklist-app/styles.css` still contains `.glass-card {` (Task 03 output not overwritten)
- [ ] `lot-checklist-app/styles.css` still contains `[data-theme="light"] {` (Task 02 output not overwritten)
- [ ] No Phase 2 feature CSS present (no `.decision-tree`, no `.overdue-badge`, no `.lot-map`)

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.04.status` → `"complete"`
   - `prompts.04.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 04 complete.**
> Modified: `lot-checklist-app/styles.css` — component atom styles for all Phase 1 UI components appended. CSS is now complete for all tasks.
>
> **Now unblocked:**
> - `07-app-shell-html.md` — app shell HTML structure (`index.html`) — send next in sequence
>
> Note: `06-checklist-data-other-audit-types.md` is also a prerequisite for task 10, but it depends on task 05. If task 05 is already complete, send task 06 in parallel with task 07.
