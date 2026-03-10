# PROMPT 02: GENERATE APPLE HIG STYLING SPECIFICATION

| Field | Value |
|---|---|
| **Parallel Group** | A |
| **Depends on** | 00 |
| **Unblocks** | 04 |
| **Writes to** | `lot-checklist-app/styling-spec.md` |
| **Estimated output** | ~300–450 lines |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `lot-checklist-app/state.json` — you will check this in Step 2
2. `CLAUDE.md` — project conventions, canonical names, quality rules
3. `app-spec/lot-checklist-app-requirements.md` — full product requirements

Then immediately after the file reads, fetch these URLs using WebFetch and extract CSS values. Get only technical CSS values, not philosophy:

```
FETCH AND EXTRACT from each URL — get only technical CSS values, not philosophy:

1. https://developer.apple.com/design/human-interface-guidelines/typography
2. https://developer.apple.com/design/human-interface-guidelines/materials
3. https://developer.apple.com/design/human-interface-guidelines/layout
4. https://developer.apple.com/design/human-interface-guidelines/designing-for-ios
5. https://developer.apple.com/design/human-interface-guidelines/buttons
6. https://dev.to/kevinbism/recreating-apples-liquid-glass-effect-with-pure-css-3gpl
7. https://yarinsa.medium.com/creating-liquid-glass-effects-with-css-the-art-of-digital-transparency-ebda92699993

If a page is unreachable, use the fallback values listed in the APPLE_SPEC FALLBACK section at the
end of Step 3 below. Tag every fallback value with [STANDARD].
```

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Check `lot-checklist-app/state.json`:

**If prompt 00 has status `in_progress`:**
STOP. Tell the user exactly:
> "Prompt 02 cannot start — prompt 00 (initialize-state) is currently running in another chat.
> Wait for that chat to complete, then re-send this prompt in a new chat."

**If prompt 00 has status `pending` or `failed`:**
STOP. Tell the user exactly:
> "Prompt 00 (initialize-state) must complete before this prompt can run.
> Please send the MASTER-APP-BOOTSTRAP-PROMPT.md in a fresh chat first."

**If prompt 00 has status `complete`:**
Update `lot-checklist-app/state.json` in a single Write operation:
- `prompts.02.status` → `"in_progress"`
- `prompts.02.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- `overall_status` → `"in_progress"`

Then tell the user:
> "Gate passed. Starting prompt 02: GENERATE APPLE HIG STYLING SPECIFICATION."

---

## STEP 3 — TASK

### Context

This prompt produces the definitive styling specification for the Lot Checklist App — a mobile HTML app that must look and feel like a native iOS app. The spec is the single source of truth for all visual decisions. Every build prompt that creates UI code will read this file and apply these rules exactly. The design system is Apple HIG with Liquid Glass aesthetic: translucent layered surfaces, SF Pro typography, 8px grid, 44px tap targets, spring-feel animations. This file will be read by prompt 04 (build-sequence-generator) which uses it to populate every build prompt with exact CSS values.

### Instructions

Work through each numbered instruction below in order. For each section, emit the corresponding section of `lot-checklist-app/styling-spec.md` as you go. Do not draft all sections and then write — write each section to the file as it is completed.

---

**1. Typography System**

Document the complete type scale as CSS custom properties. Use this font-family stack:

```css
font-family: "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
```

Include every level from Large Title through Caption 2. If WebFetch values differ from the table below, use the fetched values and note the source. If WebFetch returned no usable data, use these [STANDARD] values:

| Style Level | CSS Property Name | Size | Weight | Line-Height | Letter-Spacing |
|---|---|---|---|---|---|
| Large Title | `--text-large-title` | 34px | 700 | 1.21 | 0.37px |
| Title 1 | `--text-title-1` | 28px | 700 | 1.21 | 0.36px |
| Title 2 | `--text-title-2` | 22px | 700 | 1.27 | 0.35px |
| Title 3 | `--text-title-3` | 20px | 600 | 1.25 | 0.38px |
| Headline | `--text-headline` | 17px | 600 | 1.29 | -0.41px |
| Body | `--text-body` | 17px | 400 | 1.29 | -0.41px |
| Callout | `--text-callout` | 16px | 400 | 1.31 | -0.32px |
| Subheadline | `--text-subheadline` | 15px | 400 | 1.33 | -0.24px |
| Footnote | `--text-footnote` | 13px | 400 | 1.38 | -0.08px |
| Caption 1 | `--text-caption-1` | 12px | 400 | 1.33 | 0px |
| Caption 2 | `--text-caption-2` | 11px | 400 | 1.18 | 0.07px |

Emit as CSS custom properties on `:root`. Also document which type level maps to which component (e.g., checklist item text uses Body, zone headers use Caption 2 uppercase, task card title uses Callout).

---

**2. Color System**

Document all colors as CSS custom properties. Define all tokens in both `[data-theme="light"]` and `[data-theme="dark"]` attribute selectors. Required tokens — use these exact values unless WebFetch returned different Apple-sourced values:

```css
/* System Blues */
--color-accent: #007AFF (light) / #0A84FF (dark)

/* System Greens */
--color-success: #34C759 (light) / #30D158 (dark)

/* System Yellows */
--color-warning: #FF9F0A (light) / #FFD60A (dark)

/* System Reds */
--color-destructive: #FF3B30 (light) / #FF453A (dark)

/* System Oranges */
--color-needs-followup: #FF9500 (light) / #FF9F0A (dark)

/* Background layers */
--color-bg-primary: #FFFFFF (light) / #000000 (dark)
--color-bg-secondary: #F2F2F7 (light) / #1C1C1E (dark)
--color-bg-tertiary: #FFFFFF (light) / #2C2C2E (dark)

/* Labels */
--color-label-primary: rgba(0,0,0,1.00) (light) / rgba(255,255,255,1.00) (dark)
--color-label-secondary: rgba(60,60,67,0.60) (light) / rgba(235,235,245,0.60) (dark)
--color-label-tertiary: rgba(60,60,67,0.30) (light) / rgba(235,235,245,0.30) (dark)

/* Separators and fills */
--color-separator: rgba(60,60,67,0.29) (light) / rgba(84,84,88,0.65) (dark)
--color-fill: rgba(120,120,128,0.20) (light) / rgba(120,120,128,0.36) (dark)

/* Semantic app tokens */
--color-audit-yes: same as --color-success
--color-audit-no: same as --color-destructive
--color-audit-resolved: same as --color-success
--color-audit-flagged: same as --color-needs-followup
```

`--color-needs-followup` must be visually distinct from `--color-destructive`. Orange vs. red.

---

**3. Glass Material System**

Document the Liquid Glass CSS formula as custom properties and reusable classes.

Source data from WebFetch (dev.to article, retrieved successfully):

```css
/* Base glass formula from dev.to/kevinbism */
backdrop-filter: blur(2px) saturate(180%);
background: rgba(255, 255, 255, 0.15);
border: 1px solid rgba(255, 255, 255, 0.8);
box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2),
            inset 0 4px 20px rgba(255, 255, 255, 0.3);

/* Shine pseudo-element */
.glass::after {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: inherit;
  backdrop-filter: blur(1px);
  box-shadow: inset -10px -8px 0px -11px rgba(255, 255, 255, 1),
              inset 0px -9px 0px -8px rgba(255, 255, 255, 1);
  opacity: 0.6;
  z-index: -1;
  filter: blur(1px) drop-shadow(10px 4px 6px black) brightness(115%);
}
```

Augment with [STANDARD] values for dark mode and navigation variants. Define all of the following:

**Custom properties:**
```css
--glass-bg-light: rgba(255, 255, 255, 0.72)    /* [STANDARD] */
--glass-bg-dark: rgba(28, 28, 30, 0.72)         /* [STANDARD] */
--glass-bg-card-light: rgba(255, 255, 255, 0.15) /* from dev.to source */
--glass-bg-card-dark: rgba(28, 28, 30, 0.25)    /* [STANDARD] */
--glass-border: 1px solid rgba(255, 255, 255, 0.8) /* from dev.to source */
--glass-border-dark: 1px solid rgba(255, 255, 255, 0.15) /* [STANDARD] */
--glass-backdrop-filter: blur(20px) saturate(180%)  /* [STANDARD] — HIG standard; dev.to uses blur(2px) for extreme transparency */
--glass-backdrop-filter-subtle: blur(2px) saturate(180%) /* from dev.to source */
--glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.2), inset 0 4px 20px rgba(255, 255, 255, 0.3) /* from dev.to source */
--glass-shadow-dark: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1) /* [STANDARD] */
--glass-inset-shine: inset 0 1px 0 rgba(255, 255, 255, 0.5) /* [STANDARD] */
```

**Reusable classes — define each with full CSS:**

- `.glass-card` — base glass card. Uses `--glass-backdrop-filter`, `var(--glass-bg-card-light)` / `var(--glass-bg-card-dark)`, `--glass-border`, `--glass-shadow`, `border-radius: var(--radius-large)`. Include `::after` shine pseudo-element as documented in dev.to source. `position: relative; overflow: hidden; isolation: isolate;`

- `.glass-nav` — navigation bar glass. Slightly more opaque than card: `rgba(255,255,255,0.82)` light / `rgba(28,28,30,0.82)` dark. `backdrop-filter: blur(20px) saturate(180%)` [STANDARD]. `border-bottom: 0.5px solid var(--color-separator)`. Height: 56px.

- `.glass-modal` — modal sheet glass. Most opaque variant: `rgba(255,255,255,0.92)` light / `rgba(28,28,30,0.92)` dark. `backdrop-filter: blur(40px) saturate(200%)` [STANDARD]. `border-radius: var(--radius-large) var(--radius-large) 0 0` (sheet style, rounded top corners only).

Apply `[data-theme="dark"]` overrides for all three classes.

---

**4. Spacing System**

Document as CSS custom properties on `:root` using an 8px grid:

```css
--space-1:  4px   /* half-unit */
--space-2:  8px   /* 1 grid unit */
--space-3:  12px
--space-4:  16px  /* standard page margin */
--space-5:  20px
--space-6:  24px  /* standard section gap */
--space-7:  28px
--space-8:  32px
--space-9:  36px
--space-10: 40px
--space-11: 44px  /* minimum tap target height */
--space-12: 96px
```

Also document these named spacing constants:
```
--page-margin: 16px          /* standard horizontal margin from screen edge */
--section-gap: 24px          /* vertical gap between content sections */
--list-item-height: 44px     /* minimum — must never go below this */
--card-padding: 16px         /* internal padding for .glass-card */
--card-gap: 12px             /* gap between stacked cards */
```

---

**5. Border Radius System**

Document as CSS custom properties:

```css
--radius-small:  8px    /* [STANDARD] — chips, badges, small tags */
--radius-medium: 12px   /* [STANDARD] — buttons */
--radius-large:  20px   /* [STANDARD] — cards, modals */
--radius-pill:   9999px /* [STANDARD] — pill-shaped elements */
```

Component-to-radius assignments (include this mapping in the file):
- Buttons: `var(--radius-medium)` — 12px
- Cards (`.glass-card`): `var(--radius-large)` — 20px
- Progress bars: `var(--radius-pill)`
- Badges and status chips: `var(--radius-pill)`
- Modal sheets (`.glass-modal`): `var(--radius-large)` top corners only
- Input fields: `var(--radius-medium)` — 12px
- Zone header pills (if any): `var(--radius-pill)`

---

**6. Animation System**

Document as CSS custom properties:

```css
--duration-fast:     0.15s  /* [STANDARD] — micro-interactions, button tap feedback */
--duration-standard: 0.25s  /* [STANDARD] — screen transitions, element reveals */
--duration-slow:     0.40s  /* [STANDARD] — complex animations, sheet presentations */

--easing-standard:    cubic-bezier(0.25, 0.1, 0.25, 1.0)  /* [STANDARD] — iOS standard spring equivalent */
--easing-decelerate:  cubic-bezier(0, 0, 0.2, 1)           /* [STANDARD] — element entering screen */
--easing-accelerate:  cubic-bezier(0.4, 0, 1, 1)           /* [STANDARD] — element leaving screen */
--easing-spring:      cubic-bezier(0.34, 1.56, 0.64, 1)    /* spring overshoot for YES/NO tap feedback */
```

Document these named animations required by the app:

```
checklist-item-advance:
  trigger: after YES tap or after "Done"/"Needs Follow-Up" tap
  effect: current item slides left + fades out; next item slides in from right
  duration: var(--duration-standard)
  easing: var(--easing-standard)
  CSS: transform: translateX(-100%) + opacity: 0

failure-action-reveal:
  trigger: after NO tap
  effect: failure action panel slides up from bottom of screen
  duration: var(--duration-standard)
  easing: var(--easing-decelerate)
  CSS: transform: translateY(0) from translateY(100%)

yes-button-tap:
  trigger: pointer down on YES or NO button
  effect: scale down to 0.95, spring back to 1.0 on release
  duration: var(--duration-fast) down, var(--duration-standard) up
  easing: var(--easing-spring) on return
  CSS: transform: scale(0.95) → scale(1.0)

task-list-appear:
  trigger: task list screen loads
  effect: each TaskCard fades in with upward translate, staggered 50ms per card
  duration: var(--duration-standard) per card
  easing: var(--easing-decelerate)
  CSS: opacity: 0 + translateY(12px) → opacity: 1 + translateY(0)
```

---

**7. Component Specifications**

For each component below, document: dimensions, background, border, typography tokens, states, and any special visual treatment. Use the exact custom property names defined in sections 1–6 above.

---

**7a. YesNoButton**

```
Purpose: Primary YES/NO binary response buttons on ChecklistView screen
Layout: Two buttons side-by-side with var(--space-3) gap between them; each full 50% minus gap
Height: 52px [STANDARD — slightly taller than minimum tap target for primary action emphasis]
Border-radius: var(--radius-medium) — 12px
Typography: var(--text-headline) — 17px / 600
Padding: var(--space-4) horizontal
Color — YES:
  background: var(--color-audit-yes) → #34C759 light / #30D158 dark
  color: #FFFFFF
  border: none
Color — NO:
  background: var(--color-audit-no) → #FF3B30 light / #FF453A dark
  color: #FFFFFF
  border: none
State — default: as above
State — active/pressed: transform: scale(0.95), easing: var(--easing-spring), duration: var(--duration-fast)
State — disabled: opacity: 0.4, pointer-events: none (used while failure action panel is animating)
```

---

**7b. FailureActionCard**

```
Purpose: Full-screen panel that appears after NO tap; shows the Failure Action text
Layout: Occupies full content area below the nav bar header; slides up from bottom
Background: .glass-modal (most opaque variant)
Left accent border: 4px solid var(--color-destructive) on left edge
Border-radius: var(--radius-large) on top corners; 0 on bottom corners
Padding: var(--space-6) all sides
Typography:
  - "FAILURE ACTION" label: var(--text-caption-2), uppercase, letter-spacing: 0.07px, color: var(--color-label-secondary)
  - Role line: var(--text-footnote), color: var(--color-label-secondary)
  - Failure Action text body: var(--text-body) — 17px/400
  - SAY: text (exact communication): var(--text-callout) with monospace fallback or italic treatment, color: var(--color-label-primary)
  - Channel line: var(--text-footnote), color: var(--color-label-secondary)
Animation: failure-action-reveal (slide up from bottom)
```

---

**7c. ActionResponseButton**

```
Purpose: "Done — action complete" and "Needs Follow-Up" buttons inside FailureActionCard
Layout: Stacked vertically, full width, var(--space-3) gap between them
Height: 50px
Border-radius: var(--radius-medium) — 12px
Typography: var(--text-callout) — 16px / 600

"Done — action complete":
  background: var(--color-audit-resolved) — green
  color: #FFFFFF

"Needs Follow-Up":
  background: var(--color-audit-flagged) — orange (#FF9500 light / #FF9F0A dark)
  color: #FFFFFF

State — active/pressed: transform: scale(0.97), duration: var(--duration-fast)
```

---

**7d. ChecklistProgressBar**

```
Purpose: Thin progress indicator at the top of the ChecklistView screen showing completion %
Position: Fixed below the nav bar; full width of screen; z-index above content
Height: 3px
Background (track): var(--color-separator)
Fill: var(--color-accent) — #007AFF light / #0A84FF dark
Border-radius: var(--radius-pill)
Animation: width transition using var(--duration-standard) and var(--easing-standard)
CSS: width: [N%]; transition: width var(--duration-standard) var(--easing-standard);
```

---

**7e. ChecklistItem**

```
Purpose: Individual row in the checklist list; tapped to reveal YES/NO buttons
Height: min-height 44px (list-item-height); auto-expands for long text
Layout: flex row; icon left (optional chevron); text center; no right chevron (item is tapped for response)
Background: transparent (items sit inside a .glass-card container)
Separator: 0.5px solid var(--color-separator) between items; none on last item
Typography: var(--text-body) — 17px / 400, color: var(--color-label-primary)
State — default: as above
State — YES (answered): text color: var(--color-label-secondary); check icon var(--color-success) left side
State — NO resolved: text color: var(--color-label-secondary); check-circle icon var(--color-success) left
State — NO flagged: text color: var(--color-label-secondary); exclamation-circle icon var(--color-needs-followup) left
Padding: var(--space-4) horizontal, var(--space-3) vertical
```

---

**7f. ZoneHeader**

```
Purpose: Section header in Morning Lot Walk checklist separating zones
Height: auto (single text line)
Typography: var(--text-caption-2) — 11px / 400; text-transform: UPPERCASE; letter-spacing: 0.07px
Color: var(--color-label-secondary)
Background: transparent
Padding: var(--space-6) top, var(--space-2) bottom, var(--space-4) horizontal
Border: none
Zone names must use canonical names from CLAUDE.md Section 9:
  Cage | East Side Fence Line | West Side of Building | Overflow (Temporary) |
  Power Sport / Quad Corner | Auction Area | Staff Parking
```

---

**7g. TeamGroupHeader**

```
Purpose: Section divider in the Task List screen separating tasks by responsible team
Layout: Full-width header row; sticky positioning within its scroll group
Height: 36px
Background: .glass-card (subtle glass treatment)
Typography: var(--text-footnote) — 13px / 700; text-transform: UPPERCASE; letter-spacing: 0.07px
Color: var(--color-label-secondary)
Padding: var(--space-2) vertical, var(--space-4) horizontal
Border-radius: 0 (spans full width; no rounded corners)
Team group labels:
  "LOT TEAM" | "SALES TEAM" | "SERVICE DEPARTMENT"
```

---

**7h. TaskCard**

```
Purpose: Individual task item in the Task List screen
Layout: .glass-card with structured field rows
Padding: var(--space-4) all sides
Gap between field rows: var(--space-2)
Field layout — each row: label (var(--text-caption-2), uppercase, label-secondary) + value (var(--text-callout), label-primary)
Fields displayed:
  VEHICLE: [VIN] (var(--text-subheadline))
  ITEM: [checklist item text] (var(--text-body))
  ACTION: [failure action text] (var(--text-callout))
  TEAM: [Lot / Sales / Service] (var(--text-footnote))
  STATUS: "Resolved" | "FOLLOW-UP" (var(--text-footnote), styled as status badge)

FOLLOW-UP variant:
  left border: 4px solid var(--color-needs-followup) — #FF9500 / #FF9F0A
  STATUS badge: background var(--color-needs-followup); color #FFFFFF; border-radius: var(--radius-pill); padding: 2px 8px

Resolved variant:
  No left border accent
  STATUS badge: background var(--color-success); color #FFFFFF; border-radius: var(--radius-pill); padding: 2px 8px
```

---

**7i. ShareButton**

```
Purpose: Triggers Web Share API to export task list as plain text; share icon tappable area
Icon: Heroicons "share" (outline, 24px) or equivalent system share icon
Tappable area: min 44×44px [STANDARD tap target]
Background: transparent
Color: var(--color-accent) — #007AFF / #0A84FF
Position: top-right of Task List screen header, within .glass-nav
State — active: opacity: 0.6, transition: var(--duration-fast)
Label: "Share" (var(--text-callout), var(--color-accent)) with icon to left
```

---

**7j. AuditTypeTile**

```
Purpose: Grid tile on the Audit Type Selection screen (one per audit type)
Layout: 2-column grid, var(--space-3) gap; each tile equal width
Height: 100px minimum
Background: .glass-card
Padding: var(--space-4) all sides
Content: Icon (24px, centered top) + label (var(--text-subheadline), centered below icon)
Icon color: var(--color-accent)
Label color: var(--color-label-primary)
State — active/pressed: transform: scale(0.97), duration: var(--duration-fast), easing: var(--easing-spring)
Border-radius: var(--radius-large) — 20px

Tile labels and icons (Heroicons outline):
  "Vehicle Audit"       → icon: truck
  "Morning Lot Walk"    → icon: clipboard-list
  "PDI Compliance"      → icon: calendar
  "Key / Plate Check"   → icon: key
```

---

**8. Icon System**

Icon library: **Heroicons** (outline style, 24px default size, 2px stroke-width).

Heroicons is used as SVG symbols embedded in the HTML — no CDN dependency, no external fetch. All icons are inlined into the document as `<symbol>` elements in an SVG sprite block.

Required icons and their assigned UI elements:

| Icon Name (Heroicons) | UI Element |
|---|---|
| `chevron-right` | ChecklistItem right affordance (if used), navigation back/forward |
| `check-circle` | ChecklistItem — YES answered state |
| `x-circle` | ChecklistItem — NO flagged/unresolved state |
| `exclamation-circle` | ChecklistItem — NO flagged (Needs Follow-Up) state |
| `share` | ShareButton |
| `clipboard-list` | AuditTypeTile — Morning Lot Walk |
| `truck` | AuditTypeTile — Vehicle Audit |
| `key` | AuditTypeTile — Key / Plate Check |
| `calendar` | AuditTypeTile — PDI Compliance Review |
| `arrow-left` | Navigation back button |
| `check` | Confirmation / resolved state inline |
| `exclamation-triangle` | Warning / FOLLOW-UP status indicator |

Icon usage rules:
- Always 24px × 24px default; 20px inside dense list rows
- Always use `aria-hidden="true"` on decorative icons
- Use `aria-label` on interactive icon-only buttons (ShareButton)
- Color inherits from parent via `currentColor` stroke

---

**9. App-Shell Layout**

Document the structural layout of the application shell:

```
Fixed Header (.glass-nav):
  height: 56px
  padding-top: env(safe-area-inset-top)  [STANDARD]
  position: fixed; top: 0; left: 0; right: 0; z-index: 100
  display: flex; align-items: center; padding-horizontal: var(--page-margin)

Content Area:
  margin-top: calc(56px + env(safe-area-inset-top))
  padding-bottom: calc(env(safe-area-inset-bottom) + 24px)  [STANDARD]
  overflow-y: auto; -webkit-overflow-scrolling: touch
  padding-horizontal: var(--page-margin)

No bottom tab bar in Phase 1.

Screen container:
  Each screen is a div with class "screen" and a unique id (e.g., id="screen-home")
  display: none by default; display: block when active
  min-height: 100vh (compensate for fixed header via padding-top on content area)
```

iOS Safe Area Inset Handling:

```css
/* Applied to .app-shell root element */
padding-top: env(safe-area-inset-top);       /* [STANDARD] */
padding-bottom: env(safe-area-inset-bottom); /* [STANDARD] */
padding-left: env(safe-area-inset-left);     /* [STANDARD] */
padding-right: env(safe-area-inset-right);   /* [STANDARD] */

/* Applied to fixed header specifically */
.glass-nav {
  padding-top: env(safe-area-inset-top);
  height: calc(56px + env(safe-area-inset-top));
}

/* Applied to scrollable content area */
.content-area {
  padding-bottom: calc(env(safe-area-inset-bottom) + var(--section-gap));
}
```

---

**10. APPLE_SPEC Fallback Reference**

This section documents all fallback values used in this file. Every value tagged `[STANDARD]` above traces to the following authoritative list from the MASTER-APP-BOOTSTRAP-PROMPT. Values sourced from web fetches are noted separately.

```
APPLE_SPEC = {
  fonts: {
    family: "\"SF Pro Display\", \"SF Pro Text\", -apple-system, BlinkMacSystemFont, \"Inter\", sans-serif",
    sizeScale: {
      largeTitle:   "34px",  // [STANDARD]
      title1:       "28px",  // [STANDARD]
      title2:       "22px",  // [STANDARD]
      title3:       "20px",  // [STANDARD]
      headline:     "17px",  // [STANDARD]
      body:         "17px",  // [STANDARD]
      callout:      "16px",  // [STANDARD]
      subheadline:  "15px",  // [STANDARD]
      footnote:     "13px",  // [STANDARD]
      caption1:     "12px",  // [STANDARD]
      caption2:     "11px"   // [STANDARD]
    },
    weightScale: {
      largeTitle:   700,  // [STANDARD]
      title1:       700,  // [STANDARD]
      title2:       700,  // [STANDARD]
      title3:       600,  // [STANDARD]
      headline:     600,  // [STANDARD]
      body:         400,  // [STANDARD]
      callout:      400,  // [STANDARD]
      subheadline:  400,  // [STANDARD]
      footnote:     400,  // [STANDARD]
      caption1:     400,  // [STANDARD]
      caption2:     400   // [STANDARD]
    },
    lineHeight: {
      largeTitle:   "1.21",  // [STANDARD]
      title1:       "1.21",  // [STANDARD]
      title2:       "1.27",  // [STANDARD]
      title3:       "1.25",  // [STANDARD]
      headline:     "1.29",  // [STANDARD]
      body:         "1.29",  // [STANDARD]
      callout:      "1.31",  // [STANDARD]
      subheadline:  "1.33",  // [STANDARD]
      footnote:     "1.38",  // [STANDARD]
      caption1:     "1.33",  // [STANDARD]
      caption2:     "1.18"   // [STANDARD]
    },
    letterSpacing: {
      largeTitle:   "0.37px",   // [STANDARD]
      title1:       "0.36px",   // [STANDARD]
      title2:       "0.35px",   // [STANDARD]
      title3:       "0.38px",   // [STANDARD]
      headline:     "-0.41px",  // [STANDARD]
      body:         "-0.41px",  // [STANDARD]
      callout:      "-0.32px",  // [STANDARD]
      subheadline:  "-0.24px",  // [STANDARD]
      footnote:     "-0.08px",  // [STANDARD]
      caption1:     "0px",      // [STANDARD]
      caption2:     "0.07px"    // [STANDARD]
    }
  },
  spacing: {
    gridUnit:   "8px",          // [STANDARD]
    tapTarget:  "44px × 44px",  // [STANDARD]
    safeAreaInsets: {
      top:    "env(safe-area-inset-top)",    // [STANDARD]
      bottom: "env(safe-area-inset-bottom)", // [STANDARD]
      left:   "env(safe-area-inset-left)",   // [STANDARD]
      right:  "env(safe-area-inset-right)"   // [STANDARD]
    }
  },
  radius: {
    small:  "8px",    // [STANDARD]
    medium: "12px",   // [STANDARD]
    large:  "20px",   // [STANDARD]
    pill:   "9999px"  // [STANDARD]
  },
  animation: {
    duration: {
      fast:     "0.15s",  // [STANDARD]
      standard: "0.25s",  // [STANDARD]
      slow:     "0.40s"   // [STANDARD]
    },
    easing: {
      standard:   "cubic-bezier(0.25, 0.1, 0.25, 1.0)",  // [STANDARD]
      decelerate: "cubic-bezier(0, 0, 0.2, 1)",           // [STANDARD]
      accelerate: "cubic-bezier(0.4, 0, 1, 1)",           // [STANDARD]
      spring:     "cubic-bezier(0.34, 1.56, 0.64, 1)"     // derived standard
    }
  },
  glass: {
    // Values from WebFetch (dev.to/kevinbism — retrieved successfully):
    backdropFilter:       "blur(2px) saturate(180%)",        // SOURCE: dev.to
    backdropFilterStrong: "blur(20px) saturate(180%)",       // [STANDARD] — HIG standard for nav/modal
    background:           "rgba(255, 255, 255, 0.15)",       // SOURCE: dev.to
    backgroundDark:       "rgba(28, 28, 30, 0.25)",          // [STANDARD]
    backgroundNav:        "rgba(255, 255, 255, 0.82)",       // [STANDARD]
    backgroundNavDark:    "rgba(28, 28, 30, 0.82)",          // [STANDARD]
    border:               "1px solid rgba(255, 255, 255, 0.8)",   // SOURCE: dev.to
    borderDark:           "1px solid rgba(255, 255, 255, 0.15)",  // [STANDARD]
    shadow:               "0 8px 32px rgba(31, 38, 135, 0.2), inset 0 4px 20px rgba(255, 255, 255, 0.3)",  // SOURCE: dev.to
    shadowDark:           "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",         // [STANDARD]
    insetShine:           "inset 0 1px 0 rgba(255, 255, 255, 0.5)",  // [STANDARD]
    shinePseudo: {
      // SOURCE: dev.to/kevinbism — full ::after pseudo-element spec
      boxShadow: "inset -10px -8px 0px -11px rgba(255,255,255,1), inset 0px -9px 0px -8px rgba(255,255,255,1)",
      filter: "blur(1px) drop-shadow(10px 4px 6px black) brightness(115%)",
      opacity: "0.6"
    }
  },
  colors: {
    system: {
      blue_light:   "#007AFF",
      blue_dark:    "#0A84FF",
      green_light:  "#34C759",
      green_dark:   "#30D158",
      red_light:    "#FF3B30",
      red_dark:     "#FF453A",
      orange_light: "#FF9500",
      orange_dark:  "#FF9F0A",
      yellow_light: "#FF9F0A",
      yellow_dark:  "#FFD60A"
    },
    semantic: {
      auditYes:      "var(--color-success)",
      auditNo:       "var(--color-destructive)",
      auditResolved: "var(--color-success)",
      auditFlagged:  "var(--color-needs-followup)",
      needsFollowup: "#FF9500 (light) / #FF9F0A (dark)  — distinct from destructive red"
    }
  }
}
```

**Web fetch results summary:**
- Apple HIG pages (URLs 1–5): JavaScript-rendered; returned noscript placeholders only. All values for those pages use [STANDARD] fallbacks.
- dev.to/kevinbism (URL 6): Retrieved successfully. Liquid Glass CSS formula extracted and used above.
- yarinsa.medium.com (URL 7): HTTP 403 — blocked. [STANDARD] fallback values used for dark mode glass variants.

### Output Specification

**File to create/modify:** `lot-checklist-app/styling-spec.md`
**Format:** Markdown with embedded CSS code blocks
**Required sections in order:**
1. Typography System
2. Color System
3. Glass Material System
4. Spacing System
5. Border Radius System
6. Animation System
7. Component Specifications (one subsection per component: YesNoButton, FailureActionCard, ActionResponseButton, ChecklistProgressBar, ChecklistItem, ZoneHeader, TeamGroupHeader, TaskCard, ShareButton, AuditTypeTile)
8. Icon System
9. App-Shell Layout
10. APPLE_SPEC Fallback Reference

---

## STEP 4 — SUCCESS CRITERIA

Verify each item before proceeding to Step 5:

- [ ] All CSS custom properties use `--` prefix and are defined for both light and dark themes
- [ ] `--color-needs-followup` is defined and is orange — distinct from `--color-destructive` (red)
- [ ] Glass formula produces a visually distinct frosted-glass effect: backdrop-filter, rgba background, border, and shadow are all present
- [ ] Animation easing values are cubic-bezier strings — no keyword `ease`, `ease-in`, or `ease-out`
- [ ] All 10 required components have specifications: YesNoButton, FailureActionCard, ActionResponseButton, ChecklistProgressBar, ChecklistItem, ZoneHeader, TeamGroupHeader, TaskCard, ShareButton, AuditTypeTile
- [ ] Safe area inset CSS is documented for both top (`env(safe-area-inset-top)`) and bottom (`env(safe-area-inset-bottom)`)
- [ ] Icon library is named (Heroicons outline) with specific icon names assigned to each UI element
- [ ] No invented color values that contradict Apple system colors
- [ ] APPLE_SPEC Fallback Reference section is present at the end of the file with all values tagged [STANDARD] or SOURCE
- [ ] ZoneHeader specification uses canonical zone names from CLAUDE.md Section 9

---

## STEP 5 — POST-EXECUTION

After all success criteria pass, update `lot-checklist-app/state.json` in a single Write operation:
- `prompts.02.status` → `"complete"`
- `prompts.02.completed_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- If ALL prompts now show `complete`: set `overall_status` → `"complete"`

Then tell the user:
> "**Prompt 02 complete.**
> Created: `lot-checklist-app/styling-spec.md`
>
> **Next steps:**
> You can now send prompts 01 and 03 simultaneously in separate chats (if not already running), or if they are already running, this output will be consumed by prompt 04 once all three complete."
