# BUILD PROMPT 03 — GLASS MATERIAL CLASSES

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL (depends on 02) |
| **Depends on** | 02 |
| **Unblocks** | 04 |
| **Modifies** | `lot-checklist-app/styles.css` |
| **Estimated output** | ~60 lines appended to `styles.css` |

---

## STEP 1 — READ CONTEXT FILES

Read these files before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in STEP 2
2. `lot-checklist-app/styling-spec.md` — Section 3 (Glass Material System) is the authoritative source for all values in this task
3. `lot-checklist-app/styles.css` — read to confirm Task 02 output exists before appending

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If prompt `03` has any status other than `pending`:**
STOP. Tell the user exactly:
> "Build prompt 03 has status `[current status]` — expected `pending`. Do not re-run a completed or in-progress prompt. If you need to reset, set status back to `pending` and restore `styles.css` to its pre-run state."

**If prompt `02` has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 03 cannot start — prompt 02 (css-foundation) has status `[current status]`. Wait for prompt 02 to complete, then re-send this prompt."

**If prompt `03` has status `pending` AND prompt `02` has status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.03.status` → `"in_progress"`
- `prompts.03.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting build prompt 03: GLASS MATERIAL CLASSES."

---

## STEP 3 — TASK

### Context

This task appends the glass material CSS system to `styles.css`. Task 02 wrote all CSS custom properties (`:root` block with typography, color, spacing, animation tokens) and the base reset and layout styles. This task adds:

1. Glass-specific custom properties added to a new `:root` block
2. `.glass-card` reusable class (the base glass surface used for checklist item containers, TaskCards, AuditTypeTiles)
3. `.glass-card::after` shine pseudo-element
4. `.glass-nav` reusable class (fixed navigation bar glass)
5. `.glass-modal` reusable class (full-screen sheet glass — used for FailureActionView, resume-prompt modal)
6. Dark mode variants for all three classes
7. `@supports` fallback for browsers that do not support `backdrop-filter`

All values are sourced from `styling-spec.md` Section 3. Values marked `SOURCE: dev.to` were extracted from a live web fetch; values marked `[STANDARD]` are Apple HIG conventions; values marked `[STANDARD — dark]` are Apple system dark color derivations.

**Do not modify any existing content in `styles.css`.** All content from Task 02 must remain untouched. Append only.

### CONSTRAINTS

- **Offline-first:** No CDN URLs anywhere in `styles.css`. No external `@import`. No remote font references.
- **No build step:** Plain CSS only. No Sass, no PostCSS, no variables outside CSS custom properties.
- **Binary responses only:** These classes are used in the checklist UI. No styling for free-text input on checklist screens.
- **Exact Failure Action text:** Not applicable to CSS — but note that `.glass-modal` is used for FailureActionView, and its background must meet the opacity spec so that text is legible.
- **No Phase 2 features:** No CSS for Phase 2 screens, decision tree panels, or overdue-highlighting not specified in `styling-spec.md`.
- **`@supports` fallback is mandatory:** The app must remain usable on browsers without backdrop-filter support. The fallback uses solid (opaque) backgrounds.

### Instructions

Open `lot-checklist-app/styles.css`. Verify that `:root { --font-family: ... }` and `[data-theme="light"] { ... }` blocks from Task 02 are present. Then append the following content exactly to the end of the file.

---

#### Content to append to `lot-checklist-app/styles.css`:

```css
/* ============================================================
   TASK 03 — GLASS MATERIAL CLASSES
   Source: lot-checklist-app/styling-spec.md Section 3
   Values tagged [SOURCE: dev.to] from dev.to/kevinbism (retrieved).
   Values tagged [STANDARD] from Apple HIG conventions.
   Values tagged [STANDARD — dark] derived from Apple dark system colors.
   ============================================================ */

/* ----- Glass custom properties (appended to :root) ----- */
:root {
  --glass-bg-light:               rgba(255, 255, 255, 0.72);   /* [STANDARD] */
  --glass-bg-dark:                rgba(28, 28, 30, 0.72);      /* [STANDARD — dark] */
  --glass-bg-card-light:          rgba(255, 255, 255, 0.15);   /* SOURCE: dev.to */
  --glass-bg-card-dark:           rgba(28, 28, 30, 0.25);      /* [STANDARD — dark] */
  --glass-border:                 1px solid rgba(255, 255, 255, 0.8);   /* SOURCE: dev.to */
  --glass-border-dark:            1px solid rgba(255, 255, 255, 0.15);  /* [STANDARD — dark] */
  --glass-backdrop-filter:        blur(20px) saturate(180%);   /* [STANDARD] */
  --glass-backdrop-filter-subtle: blur(2px) saturate(180%);    /* SOURCE: dev.to */
  --glass-shadow:                 0 8px 32px rgba(31, 38, 135, 0.2),
                                  inset 0 4px 20px rgba(255, 255, 255, 0.3);  /* SOURCE: dev.to */
  --glass-shadow-dark:            0 8px 32px rgba(0, 0, 0, 0.4),
                                  inset 0 1px 0 rgba(255, 255, 255, 0.1);    /* [STANDARD — dark] */
  --glass-inset-shine:            inset 0 1px 0 rgba(255, 255, 255, 0.5);    /* [STANDARD] */
}

/* ----- .glass-card ----- */
/* Base glass surface. Used for: checklist item containers, TaskCards, AuditTypeTiles. */
.glass-card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: var(--glass-bg-card-light);        /* rgba(255,255,255,0.15) — SOURCE: dev.to */
  backdrop-filter: var(--glass-backdrop-filter); /* blur(20px) saturate(180%) — [STANDARD] */
  -webkit-backdrop-filter: var(--glass-backdrop-filter);
  border: var(--glass-border);                   /* 1px solid rgba(255,255,255,0.8) — SOURCE: dev.to */
  border-radius: var(--radius-large);            /* 20px — [STANDARD] */
  box-shadow: var(--glass-shadow);               /* SOURCE: dev.to */
}

/* Shine pseudo-element — SOURCE: dev.to/kevinbism */
.glass-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: inherit;
  backdrop-filter: blur(1px);
  box-shadow: inset -10px -8px 0px -11px rgba(255, 255, 255, 1),
              inset 0px -9px 0px -8px rgba(255, 255, 255, 1);
  opacity: 0.6;
  z-index: -1;
  filter: blur(1px) drop-shadow(10px 4px 6px black) brightness(115%);
  pointer-events: none;
}

[data-theme="dark"] .glass-card {
  background: var(--glass-bg-card-dark);   /* rgba(28,28,30,0.25) — [STANDARD — dark] */
  border: var(--glass-border-dark);        /* [STANDARD — dark] */
  box-shadow: var(--glass-shadow-dark);    /* [STANDARD — dark] */
}

/* @supports fallback — solid background for browsers without backdrop-filter */
@supports not (backdrop-filter: blur(1px)) {
  .glass-card {
    background: rgba(255, 255, 255, 0.95);
  }
  [data-theme="dark"] .glass-card {
    background: rgba(28, 28, 30, 0.95);
  }
}

/* ----- .glass-nav ----- */
/* Fixed navigation bar. Slightly more opaque than .glass-card. [STANDARD] */
.glass-nav {
  background: rgba(255, 255, 255, 0.82);         /* [STANDARD] */
  backdrop-filter: blur(20px) saturate(180%);    /* [STANDARD] */
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 0.5px solid var(--color-separator);
  display: flex;
  align-items: center;
  padding-inline: var(--page-margin);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding-top: env(safe-area-inset-top);          /* [STANDARD] */
  height: calc(56px + env(safe-area-inset-top));  /* [STANDARD] */
}

[data-theme="dark"] .glass-nav {
  background: rgba(28, 28, 30, 0.82);  /* [STANDARD — dark] */
}

@supports not (backdrop-filter: blur(1px)) {
  .glass-nav {
    background: rgba(255, 255, 255, 1.0);
  }
  [data-theme="dark"] .glass-nav {
    background: rgba(28, 28, 30, 1.0);
  }
}

/* ----- .glass-modal ----- */
/* Modal sheet. Most opaque variant. Used for FailureActionView, resume-prompt modal. [STANDARD] */
.glass-modal {
  background: rgba(255, 255, 255, 0.92);         /* [STANDARD] */
  backdrop-filter: blur(40px) saturate(200%);    /* [STANDARD] */
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border-radius: var(--radius-large) var(--radius-large) 0 0;  /* top corners only — sheet style */
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .glass-modal {
  background: rgba(28, 28, 30, 0.92);  /* [STANDARD — dark] */
}

@supports not (backdrop-filter: blur(1px)) {
  .glass-modal {
    background: rgba(255, 255, 255, 1.0);
  }
  [data-theme="dark"] .glass-modal {
    background: rgba(28, 28, 30, 1.0);
  }
}
```

---

### Verification After Writing

1. Open `lot-checklist-app/styles.css`
2. Confirm all three class names are present: `.glass-card`, `.glass-nav`, `.glass-modal`
3. Confirm `.glass-card::after` is present
4. Confirm `@supports not (backdrop-filter: blur(1px))` blocks are present (3 of them — one per class)
5. Confirm no content from Task 02 was modified (`:root` custom properties and `[data-theme]` blocks from Task 02 must still be intact)

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading `lot-checklist-app/styles.css`. All criteria are objectively verifiable without running the app.

- [ ] `lot-checklist-app/styles.css` contains `.glass-card {`
- [ ] `lot-checklist-app/styles.css` contains `.glass-card::after {`
- [ ] `lot-checklist-app/styles.css` contains `[data-theme="dark"] .glass-card {`
- [ ] `lot-checklist-app/styles.css` contains `.glass-nav {`
- [ ] `lot-checklist-app/styles.css` contains `[data-theme="dark"] .glass-nav {`
- [ ] `lot-checklist-app/styles.css` contains `.glass-modal {`
- [ ] `lot-checklist-app/styles.css` contains `[data-theme="dark"] .glass-modal {`
- [ ] `lot-checklist-app/styles.css` contains `--glass-backdrop-filter:`
- [ ] `lot-checklist-app/styles.css` contains `--glass-bg-card-light:`
- [ ] `lot-checklist-app/styles.css` contains `--glass-shadow:`
- [ ] `lot-checklist-app/styles.css` contains `@supports not (backdrop-filter: blur(1px))` (at least 3 occurrences — one per class)
- [ ] `lot-checklist-app/styles.css` contains `var(--radius-large)` in `.glass-card` rule
- [ ] `lot-checklist-app/styles.css` does NOT contain any CDN URL or external `@import`
- [ ] `lot-checklist-app/styles.css` still contains `:root { --font-family:` (Task 02 output not overwritten)
- [ ] `lot-checklist-app/styles.css` still contains `[data-theme="light"] {` (Task 02 output not overwritten)

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.03.status` → `"complete"`
   - `prompts.03.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 03 complete.**
> Modified: `lot-checklist-app/styles.css` — glass custom properties and `.glass-card`, `.glass-nav`, `.glass-modal` classes with dark mode variants and `@supports` fallbacks appended.
>
> **Now unblocked:**
> - `04-component-atom-styles.md` — component atom styles (`styles.css`) — send next in sequence
