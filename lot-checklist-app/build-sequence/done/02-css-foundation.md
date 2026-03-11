# BUILD PROMPT 02 — CSS FOUNDATION

| Field | Value |
|---|---|
| **Parallel Group** | A (can run in parallel with 05) |
| **Depends on** | 01 |
| **Unblocks** | 03 |
| **Modifies** | `lot-checklist-app/styles.css` |
| **Estimated output** | ~140 lines appended to `styles.css` |

---

## STEP 1 — READ CONTEXT FILES

Read these files before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in STEP 2
2. `lot-checklist-app/styling-spec.md` — complete Apple HIG styling specification; authoritative source for all CSS custom property names, values, and color tokens used in this task
3. `lot-checklist-app/implementation-plan.md` — Section 2 (file structure), Section 8 (constraints)
4. `lot-checklist-app/styles.css` — current file state (should be the comment-header stub from Task 01)

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If prompt `01` has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 02 cannot start — prompt 01 (project-scaffold) has status `[current status]`.
> Wait for prompt 01 to complete, then re-send this prompt."

**If prompt `02` has any status other than `pending`:**
STOP. Tell the user exactly:
> "Build prompt 02 has status `[current status]` — expected `pending`. Do not re-run a completed or in-progress prompt."

**If prompt `01` is `complete` AND prompt `02` is `pending`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.02.status` → `"in_progress"`
- `prompts.02.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting build prompt 02: CSS FOUNDATION."

---

## STEP 3 — TASK

### Context

This task writes the complete CSS design-token foundation into `styles.css`. It covers:

1. All CSS custom properties on `:root` — typography scale, spacing scale, border-radius scale, animation tokens
2. Color tokens on `[data-theme="light"]` and `[data-theme="dark"]` — using attribute selectors on the `<html>` element (which carries `data-theme="light"` by default, set in Task 01)
3. A CSS reset (box-sizing, margin/padding zeroing)
4. Base element styles for `html`, `body`, `.app-shell`, `.screen`, `.screen.active`, and `.content-area`

All property names, values, and color hex codes below are taken verbatim from `lot-checklist-app/styling-spec.md`. Do not invent or substitute values.

**This task does NOT add:**
- Glass material classes (`.glass-card`, `.glass-nav`, `.glass-modal`) — added in Task 03
- Component atom styles — added in Task 04
- Any HTML or JavaScript

### CONSTRAINTS

- **Offline-first:** No `@import url(...)` pointing to any external CDN or remote resource. No Google Fonts import. The font stack uses `-apple-system` and `BlinkMacSystemFont` as system font fallbacks — no font file fetch.
- **No CDN:** `styles.css` may not reference any external URL in any CSS rule.
- **Binary responses only:** No styling for free-text input areas on checklist screens.
- **Exact Failure Action text:** No style rule may truncate, clip, or hide text that could contain Failure Action content.
- **No Phase 2 features:** No styles for Phase 2 screens or components.

### Instructions

**Read `lot-checklist-app/styles.css` first.** It currently contains only the comment block written in Task 01. You will **append** the following CSS to the end of the existing file. Do not overwrite or remove the existing comment block.

Append the following complete CSS exactly as written below, in this exact order:

---

#### Section A — Typography custom properties (`:root`)

Source: `lot-checklist-app/styling-spec.md`, Section 1.

```css
/* ============================================================
   TYPOGRAPHY SYSTEM
   Source: styling-spec.md Section 1
   All values: [STANDARD] Apple HIG type scale
   ============================================================ */

:root {
  --font-family: "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif;

  /* Large Title — 34px / 700 */
  --text-large-title-size:   34px;
  --text-large-title-weight: 700;
  --text-large-title-lh:     1.21;
  --text-large-title-ls:     0.37px;

  /* Title 1 — 28px / 700 */
  --text-title-1-size:   28px;
  --text-title-1-weight: 700;
  --text-title-1-lh:     1.21;
  --text-title-1-ls:     0.36px;

  /* Title 2 — 22px / 700 */
  --text-title-2-size:   22px;
  --text-title-2-weight: 700;
  --text-title-2-lh:     1.27;
  --text-title-2-ls:     0.35px;

  /* Title 3 — 20px / 600 */
  --text-title-3-size:   20px;
  --text-title-3-weight: 600;
  --text-title-3-lh:     1.25;
  --text-title-3-ls:     0.38px;

  /* Headline — 17px / 600 */
  --text-headline-size:   17px;
  --text-headline-weight: 600;
  --text-headline-lh:     1.29;
  --text-headline-ls:     -0.41px;

  /* Body — 17px / 400 */
  --text-body-size:   17px;
  --text-body-weight: 400;
  --text-body-lh:     1.29;
  --text-body-ls:     -0.41px;

  /* Callout — 16px / 400 */
  --text-callout-size:   16px;
  --text-callout-weight: 400;
  --text-callout-lh:     1.31;
  --text-callout-ls:     -0.32px;

  /* Subheadline — 15px / 400 */
  --text-subheadline-size:   15px;
  --text-subheadline-weight: 400;
  --text-subheadline-lh:     1.33;
  --text-subheadline-ls:     -0.24px;

  /* Footnote — 13px / 400 */
  --text-footnote-size:   13px;
  --text-footnote-weight: 400;
  --text-footnote-lh:     1.38;
  --text-footnote-ls:     -0.08px;

  /* Caption 1 — 12px / 400 */
  --text-caption-1-size:   12px;
  --text-caption-1-weight: 400;
  --text-caption-1-lh:     1.33;
  --text-caption-1-ls:     0px;

  /* Caption 2 — 11px / 400 */
  --text-caption-2-size:   11px;
  --text-caption-2-weight: 400;
  --text-caption-2-lh:     1.18;
  --text-caption-2-ls:     0.07px;
}
```

---

#### Section B — Spacing custom properties (`:root`)

Source: `lot-checklist-app/styling-spec.md`, Section 4.

```css
/* ============================================================
   SPACING SYSTEM — 8px grid base
   Source: styling-spec.md Section 4 — all values [STANDARD]
   ============================================================ */

:root {
  --space-1:  4px;    /* half-unit */
  --space-2:  8px;    /* 1 grid unit */
  --space-3:  12px;
  --space-4:  16px;   /* standard page margin */
  --space-5:  20px;
  --space-6:  24px;   /* standard section gap */
  --space-7:  28px;
  --space-8:  32px;
  --space-9:  36px;
  --space-10: 40px;
  --space-11: 44px;   /* minimum tap target height */
  --space-12: 96px;

  --page-margin:      16px;  /* standard horizontal margin from screen edge */
  --section-gap:      24px;  /* vertical gap between content sections */
  --list-item-height: 44px;  /* minimum tap target — must never go below this */
  --card-padding:     16px;  /* internal padding for .glass-card */
  --card-gap:         12px;  /* gap between stacked cards */
}
```

---

#### Section C — Border radius custom properties (`:root`)

Source: `lot-checklist-app/styling-spec.md`, Section 5.

```css
/* ============================================================
   BORDER RADIUS SYSTEM
   Source: styling-spec.md Section 5 — all values [STANDARD]
   ============================================================ */

:root {
  --radius-small:  8px;     /* chips, badges, small tags */
  --radius-medium: 12px;    /* buttons, input fields */
  --radius-large:  20px;    /* cards, modals */
  --radius-pill:   9999px;  /* pill-shaped elements, progress bars, status badges */
}
```

---

#### Section D — Animation custom properties (`:root`)

Source: `lot-checklist-app/styling-spec.md`, Section 6.

```css
/* ============================================================
   ANIMATION SYSTEM
   Source: styling-spec.md Section 6 — all values [STANDARD]
   No ease/linear keywords — cubic-bezier() only.
   ============================================================ */

:root {
  --duration-fast:     0.15s;  /* micro-interactions, button tap feedback */
  --duration-standard: 0.25s;  /* screen transitions, element reveals */
  --duration-slow:     0.40s;  /* complex animations, sheet presentations */

  --easing-standard:   cubic-bezier(0.25, 0.1, 0.25, 1.0);  /* iOS standard */
  --easing-decelerate: cubic-bezier(0, 0, 0.2, 1);           /* element entering screen */
  --easing-accelerate: cubic-bezier(0.4, 0, 1, 1);           /* element leaving screen */
  --easing-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);    /* spring overshoot for tap feedback */
}
```

---

#### Section E — Color tokens — light theme (`[data-theme="light"]`)

Source: `lot-checklist-app/styling-spec.md`, Section 2.

**Critical distinction from styling-spec.md Section 2:**
`--color-needs-followup` (#FF9500) is ORANGE. `--color-destructive` (#FF3B30) is RED.
These must never be conflated. Follow-up items are not failures — the visual difference enforces this semantically.

```css
/* ============================================================
   COLOR SYSTEM — LIGHT THEME
   Source: styling-spec.md Section 2 — all values [STANDARD]
   Applied via data-theme="light" attribute on <html> element.
   ============================================================ */

[data-theme="light"] {
  /* System Blues */
  --color-accent: #007AFF;

  /* System Greens */
  --color-success: #34C759;

  /* System Yellows */
  --color-warning: #FF9F0A;

  /* System Reds */
  --color-destructive: #FF3B30;

  /* System Oranges — MUST remain visually distinct from --color-destructive (orange vs. red) */
  --color-needs-followup: #FF9500;

  /* Background layers */
  --color-bg-primary:   #FFFFFF;
  --color-bg-secondary: #F2F2F7;
  --color-bg-tertiary:  #FFFFFF;

  /* Labels */
  --color-label-primary:   rgba(0, 0, 0, 1.00);
  --color-label-secondary: rgba(60, 60, 67, 0.60);
  --color-label-tertiary:  rgba(60, 60, 67, 0.30);

  /* Separators and fills */
  --color-separator: rgba(60, 60, 67, 0.29);
  --color-fill:      rgba(120, 120, 128, 0.20);

  /* Semantic audit tokens */
  --color-audit-yes:      #34C759;  /* = --color-success */
  --color-audit-no:       #FF3B30;  /* = --color-destructive */
  --color-audit-resolved: #34C759;  /* = --color-success */
  --color-audit-flagged:  #FF9500;  /* = --color-needs-followup — ORANGE, not red */
}
```

---

#### Section F — Color tokens — dark theme (`[data-theme="dark"]`)

Source: `lot-checklist-app/styling-spec.md`, Section 2.

```css
/* ============================================================
   COLOR SYSTEM — DARK THEME
   Source: styling-spec.md Section 2 — all values [STANDARD]
   Applied via data-theme="dark" attribute on <html> element.
   ============================================================ */

[data-theme="dark"] {
  /* System Blues */
  --color-accent: #0A84FF;

  /* System Greens */
  --color-success: #30D158;

  /* System Yellows */
  --color-warning: #FFD60A;

  /* System Reds */
  --color-destructive: #FF453A;

  /* System Oranges — MUST remain visually distinct from --color-destructive (orange vs. red) */
  --color-needs-followup: #FF9F0A;

  /* Background layers */
  --color-bg-primary:   #000000;
  --color-bg-secondary: #1C1C1E;
  --color-bg-tertiary:  #2C2C2E;

  /* Labels */
  --color-label-primary:   rgba(255, 255, 255, 1.00);
  --color-label-secondary: rgba(235, 235, 245, 0.60);
  --color-label-tertiary:  rgba(235, 235, 245, 0.30);

  /* Separators and fills */
  --color-separator: rgba(84, 84, 88, 0.65);
  --color-fill:      rgba(120, 120, 128, 0.36);

  /* Semantic audit tokens */
  --color-audit-yes:      #30D158;  /* = --color-success */
  --color-audit-no:       #FF453A;  /* = --color-destructive */
  --color-audit-resolved: #30D158;  /* = --color-success */
  --color-audit-flagged:  #FF9F0A;  /* = --color-needs-followup — ORANGE, not red */
}
```

---

#### Section G — CSS reset

Source: `lot-checklist-app/styling-spec.md`, Section 9 (base intent); standard CSS reset convention.

```css
/* ============================================================
   CSS RESET
   ============================================================ */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

---

#### Section H — Base element styles

Source: `lot-checklist-app/styling-spec.md`, Sections 1 and 9.

```css
/* ============================================================
   BASE ELEMENT STYLES
   Source: styling-spec.md Sections 1 and 9
   ============================================================ */

html {
  font-family: var(--font-family);
  font-size: var(--text-body-size);       /* 17px */
  line-height: var(--text-body-lh);       /* 1.29 */
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  background-color: var(--color-bg-secondary);
  color: var(--color-label-primary);
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
```

---

#### Section I — App shell and safe area inset handling

Source: `lot-checklist-app/styling-spec.md`, Section 9.

```css
/* ============================================================
   APP SHELL — iOS Safe Area Inset Handling
   Source: styling-spec.md Section 9 — values [STANDARD]
   env(safe-area-inset-*) requires viewport-fit=cover in <meta> viewport tag.
   ============================================================ */

.app-shell {
  padding-top:    env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left:   env(safe-area-inset-left);
  padding-right:  env(safe-area-inset-right);
}
```

---

#### Section J — Screen containers

Source: `lot-checklist-app/styling-spec.md`, Section 9; `lot-checklist-app/implementation-plan.md`, Section 5.

```css
/* ============================================================
   SCREEN CONTAINERS
   Source: styling-spec.md Section 9; implementation-plan.md Section 5
   Only the .active screen is visible. showScreen() adds/removes .active.
   ============================================================ */

.screen {
  display: none;
  min-height: 100vh;
}

.screen.active {
  display: block;
}
```

---

#### Section K — Content area

Source: `lot-checklist-app/styling-spec.md`, Section 9.
The `margin-top` accounts for the fixed `.glass-nav` bar height (56px) plus the iOS safe area inset at the top.

```css
/* ============================================================
   CONTENT AREA
   Source: styling-spec.md Section 9 — values [STANDARD]
   Sits below the fixed .glass-nav bar. Scrollable.
   ============================================================ */

.content-area {
  margin-top:     calc(56px + env(safe-area-inset-top));
  padding-bottom: calc(env(safe-area-inset-bottom) + var(--section-gap));
  padding-inline: var(--page-margin);
  overflow-y:     auto;
  -webkit-overflow-scrolling: touch;
}
```

---

### Final check before writing

Confirm you are **appending** these sections to the existing `styles.css` (which contains only the Task 01 comment block). Do not replace or remove the existing comment block.

The final `styles.css` file after this task should contain, in order:
1. The Task 01 comment block (already present)
2. Section A — Typography custom properties on `:root`
3. Section B — Spacing custom properties on `:root`
4. Section C — Border radius custom properties on `:root`
5. Section D — Animation custom properties on `:root`
6. Section E — Color tokens `[data-theme="light"]`
7. Section F — Color tokens `[data-theme="dark"]`
8. Section G — CSS reset
9. Section H — Base element styles (`html`, `body`)
10. Section I — App shell (`.app-shell`)
11. Section J — Screen containers (`.screen`, `.screen.active`)
12. Section K — Content area (`.content-area`)

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading `lot-checklist-app/styles.css`. All criteria are objectively verifiable without running the app.

- [ ] `lot-checklist-app/styles.css` exists
- [ ] `styles.css` contains `--font-family` property on `:root`
- [ ] `styles.css` contains `--text-headline-size` property on `:root`
- [ ] `styles.css` contains `--text-body-size` property on `:root`
- [ ] `styles.css` contains `--text-caption-2-size` property on `:root`
- [ ] `styles.css` contains `--text-caption-2-ls` property on `:root`
- [ ] `styles.css` contains `--space-11` (44px) on `:root`
- [ ] `styles.css` contains `--page-margin` on `:root`
- [ ] `styles.css` contains `--card-padding` on `:root`
- [ ] `styles.css` contains `--radius-small` on `:root`
- [ ] `styles.css` contains `--radius-medium` on `:root`
- [ ] `styles.css` contains `--radius-large` on `:root`
- [ ] `styles.css` contains `--radius-pill` on `:root`
- [ ] `styles.css` contains `--duration-fast` on `:root`
- [ ] `styles.css` contains `--easing-spring` on `:root`
- [ ] `styles.css` contains `[data-theme="light"]` selector
- [ ] `styles.css` contains `--color-accent` in `[data-theme="light"]` with value `#007AFF`
- [ ] `styles.css` contains `--color-needs-followup` in `[data-theme="light"]` with value `#FF9500`
- [ ] `styles.css` contains `--color-destructive` in `[data-theme="light"]` with value `#FF3B30`
- [ ] `styles.css` contains `--color-audit-flagged` in `[data-theme="light"]` with value `#FF9500` (ORANGE — NOT `#FF3B30` red)
- [ ] `styles.css` contains `[data-theme="dark"]` selector
- [ ] `styles.css` contains `--color-accent` in `[data-theme="dark"]` with value `#0A84FF`
- [ ] `styles.css` contains `--color-needs-followup` in `[data-theme="dark"]` with value `#FF9F0A`
- [ ] `styles.css` contains `box-sizing: border-box` CSS reset rule
- [ ] `styles.css` contains `.screen` class with `display: none`
- [ ] `styles.css` contains `.screen.active` class with `display: block`
- [ ] `styles.css` contains `.content-area` class
- [ ] `styles.css` contains `env(safe-area-inset-top)` at least once
- [ ] `styles.css` does NOT contain any external URL (no `https://`, no CDN reference)

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.02.status` → `"complete"`
   - `prompts.02.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 02 complete.**
> Appended to: `lot-checklist-app/styles.css` — all CSS custom properties, color tokens, CSS reset, and base element styles.
>
> **Now unblocked:**
> - `03-glass-material-classes.md` — `.glass-card`, `.glass-nav`, `.glass-modal` classes (`styles.css`)
>
> Note: If prompt 05 (checklist-data-vehicle-audits) is still running in another session, that is expected — it runs in parallel with this prompt. Wait for both 02 and 05 to complete before checking their downstream dependencies.
