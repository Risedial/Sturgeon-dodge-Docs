# Styling Specification: Lot Checklist App
**Project:** Sturgeon Dodge Edmonton Office — Lot Checklist App
**Status:** COMPLETE
**Date:** 2026-03-09
**Purpose:** Definitive design system for the Lot Checklist App. Every build prompt that produces UI code must read this file and apply these rules exactly. This file is the single source of truth for all visual decisions.

**Design system:** Apple Human Interface Guidelines with Liquid Glass aesthetic.
**Aesthetic:** Translucent layered surfaces, SF Pro typography, 8px grid, 44px tap targets, spring-feel animations.

**Web fetch results summary:**
- Apple HIG URLs (typography, materials, layout, iOS, buttons): JavaScript-rendered; returned noscript placeholders only. All values use `[STANDARD]` fallbacks.
- `dev.to/kevinbism` (Liquid Glass CSS): Retrieved successfully. CSS values extracted and used directly. Tagged `SOURCE: dev.to`.
- `yarinsa.medium.com` (Liquid Glass dark mode): HTTP 403 — blocked. `[STANDARD]` fallback values used for dark mode glass variants.

---

## 1. Typography System

### Font Stack

```css
font-family: "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
```

### CSS Custom Properties

All type scale values are defined as custom properties on `:root`. Values are `[STANDARD]` — Apple HIG pages returned noscript placeholders only.

```css
:root {
  /* Font family */
  --font-family: "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif;

  /* Large Title — 34px / 700 */
  --text-large-title-size:    34px;    /* [STANDARD] */
  --text-large-title-weight:  700;     /* [STANDARD] */
  --text-large-title-lh:      1.21;    /* [STANDARD] */
  --text-large-title-ls:      0.37px;  /* [STANDARD] */

  /* Title 1 — 28px / 700 */
  --text-title-1-size:    28px;    /* [STANDARD] */
  --text-title-1-weight:  700;     /* [STANDARD] */
  --text-title-1-lh:      1.21;    /* [STANDARD] */
  --text-title-1-ls:      0.36px;  /* [STANDARD] */

  /* Title 2 — 22px / 700 */
  --text-title-2-size:    22px;    /* [STANDARD] */
  --text-title-2-weight:  700;     /* [STANDARD] */
  --text-title-2-lh:      1.27;    /* [STANDARD] */
  --text-title-2-ls:      0.35px;  /* [STANDARD] */

  /* Title 3 — 20px / 600 */
  --text-title-3-size:    20px;    /* [STANDARD] */
  --text-title-3-weight:  600;     /* [STANDARD] */
  --text-title-3-lh:      1.25;    /* [STANDARD] */
  --text-title-3-ls:      0.38px;  /* [STANDARD] */

  /* Headline — 17px / 600 */
  --text-headline-size:    17px;     /* [STANDARD] */
  --text-headline-weight:  600;      /* [STANDARD] */
  --text-headline-lh:      1.29;     /* [STANDARD] */
  --text-headline-ls:      -0.41px;  /* [STANDARD] */

  /* Body — 17px / 400 */
  --text-body-size:    17px;     /* [STANDARD] */
  --text-body-weight:  400;      /* [STANDARD] */
  --text-body-lh:      1.29;     /* [STANDARD] */
  --text-body-ls:      -0.41px;  /* [STANDARD] */

  /* Callout — 16px / 400 */
  --text-callout-size:    16px;     /* [STANDARD] */
  --text-callout-weight:  400;      /* [STANDARD] */
  --text-callout-lh:      1.31;     /* [STANDARD] */
  --text-callout-ls:      -0.32px;  /* [STANDARD] */

  /* Subheadline — 15px / 400 */
  --text-subheadline-size:    15px;     /* [STANDARD] */
  --text-subheadline-weight:  400;      /* [STANDARD] */
  --text-subheadline-lh:      1.33;     /* [STANDARD] */
  --text-subheadline-ls:      -0.24px;  /* [STANDARD] */

  /* Footnote — 13px / 400 */
  --text-footnote-size:    13px;     /* [STANDARD] */
  --text-footnote-weight:  400;      /* [STANDARD] */
  --text-footnote-lh:      1.38;     /* [STANDARD] */
  --text-footnote-ls:      -0.08px;  /* [STANDARD] */

  /* Caption 1 — 12px / 400 */
  --text-caption-1-size:    12px;  /* [STANDARD] */
  --text-caption-1-weight:  400;   /* [STANDARD] */
  --text-caption-1-lh:      1.33;  /* [STANDARD] */
  --text-caption-1-ls:      0px;   /* [STANDARD] */

  /* Caption 2 — 11px / 400 */
  --text-caption-2-size:    11px;    /* [STANDARD] */
  --text-caption-2-weight:  400;     /* [STANDARD] */
  --text-caption-2-lh:      1.18;    /* [STANDARD] */
  --text-caption-2-ls:      0.07px;  /* [STANDARD] */
}
```

### Component Type Assignments

| Component | Type Level | CSS Properties Used |
|---|---|---|
| Screen title (nav bar center) | Headline | `--text-headline-size` / `--text-headline-weight` |
| YesNoButton label | Headline | `--text-headline-size` / `--text-headline-weight` (600) |
| ChecklistItem text | Body | `--text-body-size` / `--text-body-weight` |
| FailureActionCard body text | Body | `--text-body-size` / `--text-body-weight` |
| FailureActionCard SAY: text | Callout | `--text-callout-size` / `--text-callout-weight` |
| ActionResponseButton label | Callout | `--text-callout-size`, weight 600 |
| TaskCard ITEM field value | Body | `--text-body-size` / `--text-body-weight` |
| TaskCard ACTION field value | Callout | `--text-callout-size` / `--text-callout-weight` |
| TaskCard field labels (VEHICLE, ITEM, etc.) | Caption 2 uppercase | `--text-caption-2-size`, `text-transform: uppercase` |
| TaskCard VIN | Subheadline | `--text-subheadline-size` / `--text-subheadline-weight` |
| TaskCard STATUS badge | Footnote | `--text-footnote-size` / `--text-footnote-weight` |
| ZoneHeader | Caption 2 uppercase | `--text-caption-2-size`, `text-transform: uppercase`, `--text-caption-2-ls` |
| TeamGroupHeader | Footnote uppercase | `--text-footnote-size`, weight 700, `text-transform: uppercase` |
| AuditTypeTile label | Subheadline | `--text-subheadline-size` / `--text-subheadline-weight` |
| ShareButton label | Callout | `--text-callout-size` / `--text-callout-weight` |
| FailureActionCard "FAILURE ACTION" label | Caption 2 uppercase | `--text-caption-2-size`, `text-transform: uppercase` |
| FailureActionCard role / channel lines | Footnote | `--text-footnote-size` / `--text-footnote-weight` |

---

## 2. Color System

All color tokens are defined in both `[data-theme="light"]` and `[data-theme="dark"]` attribute selectors. Apply `data-theme="light"` or `data-theme="dark"` on the root `<html>` element. All values are `[STANDARD]` Apple system colors — Apple HIG pages returned noscript placeholders only.

```css
[data-theme="light"] {
  /* System Blues */
  --color-accent: #007AFF;  /* [STANDARD] */

  /* System Greens */
  --color-success: #34C759;  /* [STANDARD] */

  /* System Yellows */
  --color-warning: #FF9F0A;  /* [STANDARD] */

  /* System Reds */
  --color-destructive: #FF3B30;  /* [STANDARD] */

  /* System Oranges — MUST remain visually distinct from --color-destructive (orange vs. red) */
  --color-needs-followup: #FF9500;  /* [STANDARD] */

  /* Background layers */
  --color-bg-primary:   #FFFFFF;  /* [STANDARD] */
  --color-bg-secondary: #F2F2F7;  /* [STANDARD] */
  --color-bg-tertiary:  #FFFFFF;  /* [STANDARD] */

  /* Labels */
  --color-label-primary:   rgba(0, 0, 0, 1.00);      /* [STANDARD] */
  --color-label-secondary: rgba(60, 60, 67, 0.60);   /* [STANDARD] */
  --color-label-tertiary:  rgba(60, 60, 67, 0.30);   /* [STANDARD] */

  /* Separators and fills */
  --color-separator: rgba(60, 60, 67, 0.29);          /* [STANDARD] */
  --color-fill:      rgba(120, 120, 128, 0.20);       /* [STANDARD] */

  /* Semantic app tokens — map to system tokens above */
  --color-audit-yes:      #34C759;  /* = --color-success */
  --color-audit-no:       #FF3B30;  /* = --color-destructive */
  --color-audit-resolved: #34C759;  /* = --color-success */
  --color-audit-flagged:  #FF9500;  /* = --color-needs-followup — orange, NOT red */
}

[data-theme="dark"] {
  /* System Blues */
  --color-accent: #0A84FF;  /* [STANDARD] */

  /* System Greens */
  --color-success: #30D158;  /* [STANDARD] */

  /* System Yellows */
  --color-warning: #FFD60A;  /* [STANDARD] */

  /* System Reds */
  --color-destructive: #FF453A;  /* [STANDARD] */

  /* System Oranges — MUST remain visually distinct from --color-destructive (orange vs. red) */
  --color-needs-followup: #FF9F0A;  /* [STANDARD] */

  /* Background layers */
  --color-bg-primary:   #000000;  /* [STANDARD] */
  --color-bg-secondary: #1C1C1E;  /* [STANDARD] */
  --color-bg-tertiary:  #2C2C2E;  /* [STANDARD] */

  /* Labels */
  --color-label-primary:   rgba(255, 255, 255, 1.00);   /* [STANDARD] */
  --color-label-secondary: rgba(235, 235, 245, 0.60);   /* [STANDARD] */
  --color-label-tertiary:  rgba(235, 235, 245, 0.30);   /* [STANDARD] */

  /* Separators and fills */
  --color-separator: rgba(84, 84, 88, 0.65);             /* [STANDARD] */
  --color-fill:      rgba(120, 120, 128, 0.36);          /* [STANDARD] */

  /* Semantic app tokens — map to system tokens above */
  --color-audit-yes:      #30D158;  /* = --color-success */
  --color-audit-no:       #FF453A;  /* = --color-destructive */
  --color-audit-resolved: #30D158;  /* = --color-success */
  --color-audit-flagged:  #FF9F0A;  /* = --color-needs-followup — orange, NOT red */
}
```

**Critical distinction:** `--color-needs-followup` (#FF9500 light / #FF9F0A dark) is orange. `--color-destructive` (#FF3B30 light / #FF453A dark) is red. These must never be conflated. Follow-up items are not failures — they are deferred actions. The visual difference enforces this semantically.

---

## 3. Glass Material System

### Source Attribution

Values marked `SOURCE: dev.to` were extracted from `dev.to/kevinbism` (retrieved successfully). Values marked `[STANDARD]` use Apple HIG conventions. Values marked `[STANDARD — dark]` are derived from Apple system dark backgrounds since the Medium article returned HTTP 403.

### Custom Properties

```css
:root {
  --glass-bg-light:            rgba(255, 255, 255, 0.72);   /* [STANDARD] */
  --glass-bg-dark:             rgba(28, 28, 30, 0.72);      /* [STANDARD — dark] */
  --glass-bg-card-light:       rgba(255, 255, 255, 0.15);   /* SOURCE: dev.to */
  --glass-bg-card-dark:        rgba(28, 28, 30, 0.25);      /* [STANDARD — dark] */
  --glass-border:              1px solid rgba(255, 255, 255, 0.8);   /* SOURCE: dev.to */
  --glass-border-dark:         1px solid rgba(255, 255, 255, 0.15);  /* [STANDARD — dark] */
  --glass-backdrop-filter:     blur(20px) saturate(180%);   /* [STANDARD] — HIG standard; dev.to uses blur(2px) for extreme transparency */
  --glass-backdrop-filter-subtle: blur(2px) saturate(180%); /* SOURCE: dev.to */
  --glass-shadow:              0 8px 32px rgba(31, 38, 135, 0.2),
                               inset 0 4px 20px rgba(255, 255, 255, 0.3);  /* SOURCE: dev.to */
  --glass-shadow-dark:         0 8px 32px rgba(0, 0, 0, 0.4),
                               inset 0 1px 0 rgba(255, 255, 255, 0.1);    /* [STANDARD — dark] */
  --glass-inset-shine:         inset 0 1px 0 rgba(255, 255, 255, 0.5);    /* [STANDARD] */
}
```

### Reusable Classes

#### `.glass-card`

Base glass card. Used for checklist item containers, TaskCards, AuditTypeTiles.

```css
.glass-card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: var(--glass-bg-card-light);       /* rgba(255,255,255,0.15) — SOURCE: dev.to */
  backdrop-filter: var(--glass-backdrop-filter); /* blur(20px) saturate(180%) — [STANDARD] */
  -webkit-backdrop-filter: var(--glass-backdrop-filter);
  border: var(--glass-border);                   /* 1px solid rgba(255,255,255,0.8) — SOURCE: dev.to */
  border-radius: var(--radius-large);            /* 20px */
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
  background: var(--glass-bg-card-dark);    /* rgba(28,28,30,0.25) — [STANDARD — dark] */
  border: var(--glass-border-dark);         /* [STANDARD — dark] */
  box-shadow: var(--glass-shadow-dark);     /* [STANDARD — dark] */
}
```

#### `.glass-nav`

Navigation bar glass. Slightly more opaque than card variant. `[STANDARD]`

```css
.glass-nav {
  background: rgba(255, 255, 255, 0.82);         /* [STANDARD] */
  backdrop-filter: blur(20px) saturate(180%);    /* [STANDARD] */
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 0.5px solid var(--color-separator);
  height: 56px;
  display: flex;
  align-items: center;
  padding-inline: var(--page-margin);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding-top: env(safe-area-inset-top);         /* [STANDARD] */
  height: calc(56px + env(safe-area-inset-top)); /* [STANDARD] */
}

[data-theme="dark"] .glass-nav {
  background: rgba(28, 28, 30, 0.82);  /* [STANDARD — dark] */
}
```

#### `.glass-modal`

Modal sheet glass. Most opaque variant. Used for FailureActionCard and full-screen sheet presentations.

```css
.glass-modal {
  background: rgba(255, 255, 255, 0.92);         /* [STANDARD] */
  backdrop-filter: blur(40px) saturate(200%);    /* [STANDARD] */
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border-radius: var(--radius-large) var(--radius-large) 0 0;  /* sheet style — top corners only */
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .glass-modal {
  background: rgba(28, 28, 30, 0.92);  /* [STANDARD — dark] */
}
```

---

## 4. Spacing System

All spacing values use an 8px grid base. `[STANDARD]`

```css
:root {
  --space-1:  4px;   /* half-unit */
  --space-2:  8px;   /* 1 grid unit */
  --space-3:  12px;
  --space-4:  16px;  /* standard page margin */
  --space-5:  20px;
  --space-6:  24px;  /* standard section gap */
  --space-7:  28px;
  --space-8:  32px;
  --space-9:  36px;
  --space-10: 40px;
  --space-11: 44px;  /* minimum tap target height */
  --space-12: 96px;

  /* Named spacing constants */
  --page-margin:       16px;  /* standard horizontal margin from screen edge */
  --section-gap:       24px;  /* vertical gap between content sections */
  --list-item-height:  44px;  /* minimum — must never go below this */
  --card-padding:      16px;  /* internal padding for .glass-card */
  --card-gap:          12px;  /* gap between stacked cards */
}
```

---

## 5. Border Radius System

```css
:root {
  --radius-small:  8px;     /* [STANDARD] — chips, badges, small tags */
  --radius-medium: 12px;    /* [STANDARD] — buttons, input fields */
  --radius-large:  20px;    /* [STANDARD] — cards, modals */
  --radius-pill:   9999px;  /* [STANDARD] — pill-shaped elements */
}
```

### Component-to-Radius Assignments

| Component | Border Radius |
|---|---|
| Buttons (YesNoButton, ActionResponseButton) | `var(--radius-medium)` — 12px |
| Cards (`.glass-card`) | `var(--radius-large)` — 20px |
| Progress bars (ChecklistProgressBar) | `var(--radius-pill)` |
| Badges and status chips | `var(--radius-pill)` |
| Modal sheets (`.glass-modal`) | `var(--radius-large)` top corners only; 0 bottom corners |
| Input fields (VIN entry) | `var(--radius-medium)` — 12px |
| Zone header pills (if any) | `var(--radius-pill)` |
| AuditTypeTile | `var(--radius-large)` — 20px |

---

## 6. Animation System

All easing values use `cubic-bezier()` strings. No `ease`, `ease-in`, `ease-out`, or `linear` keywords. `[STANDARD]`

```css
:root {
  --duration-fast:     0.15s;  /* [STANDARD] — micro-interactions, button tap feedback */
  --duration-standard: 0.25s;  /* [STANDARD] — screen transitions, element reveals */
  --duration-slow:     0.40s;  /* [STANDARD] — complex animations, sheet presentations */

  --easing-standard:   cubic-bezier(0.25, 0.1, 0.25, 1.0);  /* [STANDARD] — iOS standard */
  --easing-decelerate: cubic-bezier(0, 0, 0.2, 1);           /* [STANDARD] — element entering screen */
  --easing-accelerate: cubic-bezier(0.4, 0, 1, 1);           /* [STANDARD] — element leaving screen */
  --easing-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);    /* [STANDARD] — spring overshoot for tap feedback */
}
```

### Named Animations

#### `checklist-item-advance`
```
trigger:   After YES tap OR after "Done — action complete" / "Needs Follow-Up" tap
effect:    Current item slides left + fades out; next item slides in from right
duration:  var(--duration-standard)   /* 0.25s */
easing:    var(--easing-standard)
CSS (exit):  transform: translateX(-100%); opacity: 0;
CSS (enter): transform: translateX(100%) → translateX(0); opacity: 0 → 1;
```

#### `failure-action-reveal`
```
trigger:   After NO tap
effect:    FailureActionCard slides up from bottom of screen
duration:  var(--duration-standard)   /* 0.25s */
easing:    var(--easing-decelerate)
CSS:       transform: translateY(100%) → translateY(0);
           transition: transform var(--duration-standard) var(--easing-decelerate);
```

#### `yes-button-tap`
```
trigger:   pointer down on YES or NO button
effect:    Scale down to 0.95 on press; spring back to 1.0 on release
duration:  var(--duration-fast) on press; var(--duration-standard) on release
easing:    var(--easing-spring) on return
CSS:       transform: scale(0.95) → scale(1.0);
           transition (down):    transform var(--duration-fast) var(--easing-standard);
           transition (release): transform var(--duration-standard) var(--easing-spring);
```

#### `task-list-appear`
```
trigger:   Task list screen loads
effect:    Each TaskCard fades in with upward translate; staggered 50ms per card
duration:  var(--duration-standard) per card
easing:    var(--easing-decelerate)
CSS (start): opacity: 0; transform: translateY(12px);
CSS (end):   opacity: 1; transform: translateY(0);
stagger:   animation-delay: calc(var(--card-index) * 50ms);
           (set --card-index as inline CSS var on each card element)
```

---

## 7. Component Specifications

### 7a. YesNoButton

```
Purpose:    Primary YES/NO binary response buttons on ChecklistView screen
Layout:     Two buttons side-by-side; var(--space-3) gap; each 50% width minus gap
Height:     52px  [STANDARD — taller than 44px minimum for primary action emphasis]
Border-radius: var(--radius-medium) — 12px
Typography: var(--text-headline-size) / weight 600
Padding:    var(--space-4) horizontal

YES button:
  background: var(--color-audit-yes)   → #34C759 light / #30D158 dark
  color: #FFFFFF
  border: none

NO button:
  background: var(--color-audit-no)    → #FF3B30 light / #FF453A dark
  color: #FFFFFF
  border: none

States:
  default:   as above
  pressed:   transform: scale(0.95);
             transition: transform var(--duration-fast) var(--easing-standard);
             (spring return: transform var(--duration-standard) var(--easing-spring))
  disabled:  opacity: 0.4; pointer-events: none
             (applies while failure-action-reveal animation is in progress)
```

### 7b. FailureActionCard

```
Purpose:    Full-screen panel shown after NO tap; displays the Failure Action text
Layout:     Occupies full content area below nav bar; slides up from bottom via failure-action-reveal
Background: .glass-modal — rgba(255,255,255,0.92) light / rgba(28,28,30,0.92) dark
Left accent border: 4px solid var(--color-destructive) on left edge
Border-radius: var(--radius-large) top corners; 0 bottom corners
Padding:    var(--space-6) all sides

Typography:
  "FAILURE ACTION" label:   var(--text-caption-2-size); text-transform: uppercase;
                            letter-spacing: var(--text-caption-2-ls) /* 0.07px */;
                            color: var(--color-label-secondary)
  Role line:                var(--text-footnote-size); color: var(--color-label-secondary)
  Channel line:             var(--text-footnote-size); color: var(--color-label-secondary)
  Failure Action body text: var(--text-body-size) / var(--text-body-weight) /* 17px/400 */
  SAY: text (exact language): var(--text-callout-size); font-style: italic;
                              color: var(--color-label-primary)

Animation:  failure-action-reveal (slides up from bottom)
```

### 7c. ActionResponseButton

```
Purpose:    "Done — action complete" and "Needs Follow-Up" buttons inside FailureActionCard
Layout:     Stacked vertically, full width; var(--space-3) gap between them
Height:     50px
Border-radius: var(--radius-medium) — 12px
Typography: var(--text-callout-size) / weight 600

"Done — action complete":
  background: var(--color-audit-resolved)  → #34C759 light / #30D158 dark
  color: #FFFFFF

"Needs Follow-Up":
  background: var(--color-audit-flagged)   → #FF9500 light / #FF9F0A dark
  color: #FFFFFF

States:
  default:   as above
  pressed:   transform: scale(0.97);
             transition: transform var(--duration-fast) var(--easing-standard)
```

### 7d. ChecklistProgressBar

```
Purpose:    Thin progress indicator at top of ChecklistView; shows completion %
Position:   Fixed below the nav bar; full screen width; z-index above content
Height:     3px
Track:      background: var(--color-separator)
Fill:       background: var(--color-accent)  → #007AFF light / #0A84FF dark
Border-radius: var(--radius-pill)
Animation:  width transition
CSS:
  .checklist-progress-bar-fill {
    height: 3px;
    background: var(--color-accent);
    border-radius: var(--radius-pill);
    width: [N%];
    transition: width var(--duration-standard) var(--easing-standard);
  }
```

### 7e. ChecklistItem

```
Purpose:    Individual row in the checklist; tapped to reveal YES/NO buttons
Height:     min-height: var(--list-item-height) /* 44px */; auto-expands for long text
Layout:     flex row; icon left (status icon); text center; no right chevron
Background: transparent — items sit inside a .glass-card container
Separator:  0.5px solid var(--color-separator) between items; none on last item
Padding:    var(--space-4) horizontal; var(--space-3) vertical

Typography: var(--text-body-size) / var(--text-body-weight) /* 17px / 400 */
            color: var(--color-label-primary)

States:
  default:     text color: var(--color-label-primary); no left icon
  YES answered: text color: var(--color-label-secondary);
               left icon: check-circle (Heroicons), color: var(--color-success)
  NO resolved:  text color: var(--color-label-secondary);
               left icon: check-circle (Heroicons), color: var(--color-success)
  NO flagged:   text color: var(--color-label-secondary);
               left icon: exclamation-circle (Heroicons), color: var(--color-needs-followup)
```

### 7f. ZoneHeader

```
Purpose:    Section header in Morning Lot Walk checklist separating zones
Height:     auto (single text line)
Typography: var(--text-caption-2-size) /* 11px */; weight: 400;
            text-transform: uppercase;
            letter-spacing: var(--text-caption-2-ls) /* 0.07px */
Color:      var(--color-label-secondary)
Background: transparent
Padding:    var(--space-6) top; var(--space-2) bottom; var(--space-4) horizontal
Border:     none

Canonical zone names (ONLY these — no abbreviations, no alternatives):
  Cage
  East Side Fence Line
  West Side of Building
  Overflow (Temporary)
  Power Sport / Quad Corner
  Auction Area
  Staff Parking
```

### 7g. TeamGroupHeader

```
Purpose:    Section divider in Task List screen separating tasks by responsible team
Layout:     Full-width header row; sticky within its scroll group
Height:     36px
Background: .glass-card (subtle glass treatment)
Typography: var(--text-footnote-size) /* 13px */; weight: 700;
            text-transform: uppercase;
            letter-spacing: var(--text-caption-2-ls) /* 0.07px */
Color:      var(--color-label-secondary)
Padding:    var(--space-2) vertical; var(--space-4) horizontal
Border-radius: 0 — spans full width; no rounded corners

Team group label strings (exactly as shown):
  "LOT TEAM"
  "SALES TEAM"
  "SERVICE DEPARTMENT"
```

### 7h. TaskCard

```
Purpose:    Individual task item in the Task List screen
Layout:     .glass-card with structured field rows
Padding:    var(--card-padding) /* 16px */ all sides
Row gap:    var(--space-2) /* 8px */ between field rows
Animation:  task-list-appear on screen load; set --card-index as inline CSS var

Field layout (each row):
  label:  var(--text-caption-2-size); text-transform: uppercase; color: var(--color-label-secondary)
  value:  varies by field (see below)

Fields:
  VEHICLE:  value uses var(--text-subheadline-size) — displays VIN
  ITEM:     value uses var(--text-body-size) / var(--text-body-weight)
  ACTION:   value uses var(--text-callout-size) / var(--text-callout-weight)
  TEAM:     value uses var(--text-footnote-size)
  STATUS:   styled as badge (see below)

FOLLOW-UP variant:
  left border:   4px solid var(--color-needs-followup) /* #FF9500 / #FF9F0A */
  STATUS badge:  background: var(--color-needs-followup); color: #FFFFFF;
                 border-radius: var(--radius-pill); padding: 2px 8px;
                 font-size: var(--text-footnote-size); font-weight: 600

Resolved variant:
  left border:   none
  STATUS badge:  background: var(--color-success); color: #FFFFFF;
                 border-radius: var(--radius-pill); padding: 2px 8px;
                 font-size: var(--text-footnote-size); font-weight: 600
```

### 7i. ShareButton

```
Purpose:    Triggers Web Share API to export task list as plain text
Icon:       Heroicons "share" (outline, 24px)
Tappable:   min 44×44px  [STANDARD tap target]
Background: transparent
Color:      var(--color-accent) → #007AFF light / #0A84FF dark
Position:   top-right of Task List screen header, within .glass-nav
Layout:     icon (24px) + "Share" label; flex row; align-items: center; gap: var(--space-1)
Typography: var(--text-callout-size) / var(--text-callout-weight); color: var(--color-accent)
Accessibility: aria-label="Share task list" on the button element

States:
  default:   opacity: 1
  pressed:   opacity: 0.6; transition: opacity var(--duration-fast) var(--easing-standard)
```

### 7j. AuditTypeTile

```
Purpose:    Grid tile on Audit Type Selection screen; one tile per audit type
Layout:     2-column grid; var(--space-3) gap; each tile equal width
Height:     100px minimum
Background: .glass-card
Padding:    var(--card-padding) /* 16px */ all sides
Border-radius: var(--radius-large) — 20px
Content:    icon (24px, centered top) + label (centered below icon)
            flex column; align-items: center; justify-content: center; gap: var(--space-2)
Icon color: var(--color-accent)
Label:      var(--text-subheadline-size) / var(--text-subheadline-weight);
            color: var(--color-label-primary)

States:
  default:   as above
  pressed:   transform: scale(0.97);
             transition: transform var(--duration-fast) var(--easing-spring)

Tile labels and Heroicons outline icons:
  "Vehicle Audit"     → icon: truck
  "Morning Lot Walk"  → icon: clipboard-list
  "PDI Compliance"    → icon: calendar
  "Key / Plate Check" → icon: key
```

---

## 8. Icon System

**Library:** Heroicons (outline style)
**Default size:** 24×24px; 20px in dense list rows
**Stroke width:** 2px
**Rendering:** SVG symbols embedded inline as `<symbol>` elements in an SVG sprite block. No CDN dependency. No external fetch. All icons inlined into the HTML document.
**Color:** Inherits from parent via `currentColor` stroke.

### Usage Rules

- Always `aria-hidden="true"` on decorative icons (no interaction, visual only)
- Always `aria-label="[description]"` on interactive icon-only buttons (e.g., ShareButton)
- Default: 24×24px; dense list rows: 20×20px

### Required Icons

| Heroicons Name | UI Element |
|---|---|
| `chevron-right` | ChecklistItem right affordance (if used); navigation back/forward |
| `check-circle` | ChecklistItem — YES answered state; NO resolved state |
| `x-circle` | ChecklistItem — NO unresolved state |
| `exclamation-circle` | ChecklistItem — NO flagged (Needs Follow-Up) state |
| `share` | ShareButton |
| `clipboard-list` | AuditTypeTile — Morning Lot Walk |
| `truck` | AuditTypeTile — Vehicle Audit |
| `key` | AuditTypeTile — Key / Plate Check |
| `calendar` | AuditTypeTile — PDI Compliance Review |
| `arrow-left` | Navigation back button |
| `check` | Confirmation / resolved state inline |
| `exclamation-triangle` | Warning / FOLLOW-UP status indicator |

### SVG Sprite Pattern

```html
<!-- Inline SVG sprite — place at top of <body>, hidden -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-check-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <!-- Heroicons check-circle path here -->
  </symbol>
  <symbol id="icon-exclamation-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <!-- Heroicons exclamation-circle path here -->
  </symbol>
  <!-- ... all required icons ... -->
</svg>

<!-- Usage -->
<svg aria-hidden="true" width="24" height="24">
  <use href="#icon-check-circle" />
</svg>
```

---

## 9. App-Shell Layout

### Fixed Header

```css
.glass-nav {
  height: calc(56px + env(safe-area-inset-top));  /* [STANDARD] */
  padding-top: env(safe-area-inset-top);           /* [STANDARD] */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding-inline: var(--page-margin);
  /* glass styles defined in Section 3 */
}
```

### Content Area

```css
.content-area {
  margin-top: calc(56px + env(safe-area-inset-top));               /* [STANDARD] */
  padding-bottom: calc(env(safe-area-inset-bottom) + var(--section-gap));  /* [STANDARD] */
  padding-inline: var(--page-margin);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

### Screen Containers

Each screen is a `<div>` with class `screen` and a unique `id`. Only the active screen is visible.

```css
.screen {
  display: none;
  min-height: 100vh;
}
.screen.active {
  display: block;
}
```

Screen IDs used:
- `screen-home` — Audit Type Selection (AuditTypeTile grid)
- `screen-vehicle-entry` — VIN entry + category selection
- `screen-checklist` — ChecklistView with YES/NO buttons and progress bar
- `screen-summary` — Audit summary + Generate Task List button
- `screen-tasks` — Task List with TeamGroupHeaders and TaskCards

No bottom tab bar in Phase 1.

### iOS Safe Area Inset Handling

```css
/* Root element */
.app-shell {
  padding-top: env(safe-area-inset-top);       /* [STANDARD] */
  padding-bottom: env(safe-area-inset-bottom); /* [STANDARD] */
  padding-left: env(safe-area-inset-left);     /* [STANDARD] */
  padding-right: env(safe-area-inset-right);   /* [STANDARD] */
}

/* Fixed header — additional safe area handling for notch/Dynamic Island */
.glass-nav {
  padding-top: env(safe-area-inset-top);
  height: calc(56px + env(safe-area-inset-top));
}

/* Scrollable content area */
.content-area {
  padding-bottom: calc(env(safe-area-inset-bottom) + var(--section-gap));
}
```

---

## 10. APPLE_SPEC Fallback Reference

This section is the authoritative record of all values used in this file, their source, and their tag. Every value in this spec traces to an entry below.

```
APPLE_SPEC = {
  fonts: {
    family: "\"SF Pro Display\", \"SF Pro Text\", -apple-system, BlinkMacSystemFont, \"Inter\", sans-serif",
    sizeScale: {
      largeTitle:  "34px",  /* [STANDARD] */
      title1:      "28px",  /* [STANDARD] */
      title2:      "22px",  /* [STANDARD] */
      title3:      "20px",  /* [STANDARD] */
      headline:    "17px",  /* [STANDARD] */
      body:        "17px",  /* [STANDARD] */
      callout:     "16px",  /* [STANDARD] */
      subheadline: "15px",  /* [STANDARD] */
      footnote:    "13px",  /* [STANDARD] */
      caption1:    "12px",  /* [STANDARD] */
      caption2:    "11px"   /* [STANDARD] */
    },
    weightScale: {
      largeTitle:  700,  /* [STANDARD] */
      title1:      700,  /* [STANDARD] */
      title2:      700,  /* [STANDARD] */
      title3:      600,  /* [STANDARD] */
      headline:    600,  /* [STANDARD] */
      body:        400,  /* [STANDARD] */
      callout:     400,  /* [STANDARD] */
      subheadline: 400,  /* [STANDARD] */
      footnote:    400,  /* [STANDARD] */
      caption1:    400,  /* [STANDARD] */
      caption2:    400   /* [STANDARD] */
    },
    lineHeight: {
      largeTitle:  "1.21",  /* [STANDARD] */
      title1:      "1.21",  /* [STANDARD] */
      title2:      "1.27",  /* [STANDARD] */
      title3:      "1.25",  /* [STANDARD] */
      headline:    "1.29",  /* [STANDARD] */
      body:        "1.29",  /* [STANDARD] */
      callout:     "1.31",  /* [STANDARD] */
      subheadline: "1.33",  /* [STANDARD] */
      footnote:    "1.38",  /* [STANDARD] */
      caption1:    "1.33",  /* [STANDARD] */
      caption2:    "1.18"   /* [STANDARD] */
    },
    letterSpacing: {
      largeTitle:  "0.37px",   /* [STANDARD] */
      title1:      "0.36px",   /* [STANDARD] */
      title2:      "0.35px",   /* [STANDARD] */
      title3:      "0.38px",   /* [STANDARD] */
      headline:    "-0.41px",  /* [STANDARD] */
      body:        "-0.41px",  /* [STANDARD] */
      callout:     "-0.32px",  /* [STANDARD] */
      subheadline: "-0.24px",  /* [STANDARD] */
      footnote:    "-0.08px",  /* [STANDARD] */
      caption1:    "0px",      /* [STANDARD] */
      caption2:    "0.07px"    /* [STANDARD] */
    }
  },
  spacing: {
    gridUnit:  "8px",          /* [STANDARD] */
    tapTarget: "44px × 44px",  /* [STANDARD] */
    safeAreaInsets: {
      top:    "env(safe-area-inset-top)",    /* [STANDARD] */
      bottom: "env(safe-area-inset-bottom)", /* [STANDARD] */
      left:   "env(safe-area-inset-left)",   /* [STANDARD] */
      right:  "env(safe-area-inset-right)"   /* [STANDARD] */
    }
  },
  radius: {
    small:  "8px",    /* [STANDARD] */
    medium: "12px",   /* [STANDARD] */
    large:  "20px",   /* [STANDARD] */
    pill:   "9999px"  /* [STANDARD] */
  },
  animation: {
    duration: {
      fast:     "0.15s",  /* [STANDARD] */
      standard: "0.25s",  /* [STANDARD] */
      slow:     "0.40s"   /* [STANDARD] */
    },
    easing: {
      standard:   "cubic-bezier(0.25, 0.1, 0.25, 1.0)",  /* [STANDARD] */
      decelerate: "cubic-bezier(0, 0, 0.2, 1)",           /* [STANDARD] */
      accelerate: "cubic-bezier(0.4, 0, 1, 1)",           /* [STANDARD] */
      spring:     "cubic-bezier(0.34, 1.56, 0.64, 1)"     /* [STANDARD] — derived */
    }
  },
  glass: {
    /* Values from WebFetch (dev.to/kevinbism — retrieved successfully): */
    backdropFilter:       "blur(2px) saturate(180%)",         /* SOURCE: dev.to */
    backdropFilterStrong: "blur(20px) saturate(180%)",        /* [STANDARD] — HIG standard for nav/modal */
    background:           "rgba(255, 255, 255, 0.15)",        /* SOURCE: dev.to */
    backgroundDark:       "rgba(28, 28, 30, 0.25)",           /* [STANDARD — dark] */
    backgroundNav:        "rgba(255, 255, 255, 0.82)",        /* [STANDARD] */
    backgroundNavDark:    "rgba(28, 28, 30, 0.82)",           /* [STANDARD — dark] */
    border:               "1px solid rgba(255, 255, 255, 0.8)",    /* SOURCE: dev.to */
    borderDark:           "1px solid rgba(255, 255, 255, 0.15)",   /* [STANDARD — dark] */
    shadow:               "0 8px 32px rgba(31, 38, 135, 0.2), inset 0 4px 20px rgba(255, 255, 255, 0.3)",  /* SOURCE: dev.to */
    shadowDark:           "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",         /* [STANDARD — dark] */
    insetShine:           "inset 0 1px 0 rgba(255, 255, 255, 0.5)",  /* [STANDARD] */
    shinePseudo: {
      /* SOURCE: dev.to/kevinbism — full ::after pseudo-element spec */
      boxShadow: "inset -10px -8px 0px -11px rgba(255,255,255,1), inset 0px -9px 0px -8px rgba(255,255,255,1)",
      filter:    "blur(1px) drop-shadow(10px 4px 6px black) brightness(115%)",
      opacity:   "0.6"
    }
  },
  colors: {
    system: {
      blue_light:   "#007AFF",   /* [STANDARD] */
      blue_dark:    "#0A84FF",   /* [STANDARD] */
      green_light:  "#34C759",   /* [STANDARD] */
      green_dark:   "#30D158",   /* [STANDARD] */
      red_light:    "#FF3B30",   /* [STANDARD] */
      red_dark:     "#FF453A",   /* [STANDARD] */
      orange_light: "#FF9500",   /* [STANDARD] */
      orange_dark:  "#FF9F0A",   /* [STANDARD] */
      yellow_light: "#FF9F0A",   /* [STANDARD] */
      yellow_dark:  "#FFD60A"    /* [STANDARD] */
    },
    semantic: {
      auditYes:      "var(--color-success)",
      auditNo:       "var(--color-destructive)",
      auditResolved: "var(--color-success)",
      auditFlagged:  "var(--color-needs-followup)",
      needsFollowup: "#FF9500 light / #FF9F0A dark — ORANGE, distinct from destructive RED"
    }
  }
}
```

### Web Fetch Results Summary

| URL | Result |
|---|---|
| `developer.apple.com/design/human-interface-guidelines/typography` | JavaScript-rendered; noscript placeholder only. All values: `[STANDARD]` |
| `developer.apple.com/design/human-interface-guidelines/materials` | JavaScript-rendered; noscript placeholder only. All values: `[STANDARD]` |
| `developer.apple.com/design/human-interface-guidelines/layout` | JavaScript-rendered; noscript placeholder only. All values: `[STANDARD]` |
| `developer.apple.com/design/human-interface-guidelines/designing-for-ios` | JavaScript-rendered; noscript placeholder only. All values: `[STANDARD]` |
| `developer.apple.com/design/human-interface-guidelines/buttons` | JavaScript-rendered; noscript placeholder only. All values: `[STANDARD]` |
| `dev.to/kevinbism` — Liquid Glass CSS | **Retrieved successfully.** CSS formula extracted and used. Tagged `SOURCE: dev.to`. |
| `yarinsa.medium.com` — Liquid Glass CSS | HTTP 403 — blocked. Dark mode variants: `[STANDARD — dark]` |

---

*End of styling-spec.md*
