# MASTER BOOTSTRAP PROMPT — Lot Checklist App Build System

> **How to use:** Send this entire file to a fresh Claude Code chat.
> Claude Code will research Apple design specs, create the folder structure,
> and generate all four micro-prompt files. It will NOT build the app itself.

---

## YOUR ROLE

You are a **Build System Architect**. Your only job in this session is to create a set of self-contained micro-prompt files that future Claude Code sessions will execute to build the Lot Checklist App. You will not write any app code. You will not build any screens. You will only produce the execution system.

---

## STEP 1 — READ THESE FILES FIRST

Read all four files completely before doing anything else. Do not skip any.

1. `CLAUDE.md` — Project conventions, domain glossary, canonical names, quality rules
2. `app-spec/lot-checklist-app-requirements.md` — Full product requirements for the app
3. `META-SPLIT-PROMPT.md` — The exact template every micro-prompt file must follow

After reading, proceed to Step 2.

---

## STEP 2 — RESEARCH APPLE DESIGN SPECIFICATIONS

Use `WebFetch` to retrieve styling and interaction specifications from the following sources. Extract only technical, implementable values (CSS properties, px/pt sizes, easing curves, color tokens). Do not summarize philosophy.

**Fetch these URLs:**

1. `https://developer.apple.com/design/human-interface-guidelines/typography`
   — Extract: font family stack, size scale (Large Title → Caption 2), weight values, letter-spacing, line-height

2. `https://developer.apple.com/design/human-interface-guidelines/materials`
   — Extract: blur values, saturation values, background rgba, border rgba, shadow specs for system materials (ultraThin, thin, regular, thick, ultraThick)

3. `https://developer.apple.com/design/human-interface-guidelines/layout`
   — Extract: minimum tap target size, safe area insets, standard margin values, grid unit

4. `https://developer.apple.com/design/human-interface-guidelines/designing-for-ios`
   — Extract: navigation bar height, tab bar height, status bar height, standard corner radius values

5. `https://developer.apple.com/design/human-interface-guidelines/buttons`
   — Extract: button height standards, button corner radius, label size, active/pressed state specs

6. `https://dev.to/kevinbism/recreating-apples-liquid-glass-effect-with-pure-css-3gpl`
   — Extract: the complete Liquid Glass CSS formula (backdrop-filter chain, rgba values, border, box-shadow, pseudo-element shine)

7. `https://yarinsa.medium.com/creating-liquid-glass-effects-with-css-the-art-of-digital-transparency-ebda92699993`
   — Extract: any additional Liquid Glass CSS variants or refinements not found in source 6

**Compile a working reference object** called `APPLE_SPEC` containing all extracted values. You will embed this object directly into the styling-spec micro-prompt (Step 4, File 3). It must include at minimum:

```
APPLE_SPEC = {
  fonts: { family, sizeScale{}, weightScale{}, lineHeight{}, letterSpacing{} },
  spacing: { gridUnit, tapTarget, safeAreaInsets{} },
  radius: { small, medium, large, pill },
  animation: { duration{}, easing{} },
  glass: { backdropFilter, background, border, shadow, insetShadow },
  colors: { system{}, semantic{} }
}
```

If any value cannot be fetched (JavaScript-rendered page, access error), substitute the known iOS standard value and tag it `[STANDARD]`.

Known fallback values if pages are unreachable:
- Font family: `"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif`
- Grid unit: `8px`
- Tap target: `44px × 44px`
- Corner radius: small `8px`, medium `12px`, large `20px`, pill `9999px`
- Animation duration: fast `0.15s`, standard `0.25s`, slow `0.4s`
- Animation easing: standard `cubic-bezier(0.25, 0.1, 0.25, 1.0)`, decelerate `cubic-bezier(0, 0, 0.2, 1)`, accelerate `cubic-bezier(0.4, 0, 1, 1)`
- Glass backdrop: `blur(20px) saturate(180%)`
- Glass background: `rgba(255, 255, 255, 0.72)` (light), `rgba(28, 28, 30, 0.72)` (dark)
- Glass border: `1px solid rgba(255, 255, 255, 0.3)`
- Glass shadow: `0 8px 32px rgba(0, 0, 0, 0.12)`
- Inset shine: `inset 0 1px 0 rgba(255, 255, 255, 0.5)`

After compiling APPLE_SPEC, proceed to Step 3.

---

## STEP 3 — CREATE THE FOLDER STRUCTURE

Create the following directory and files. Create the directory first, then each file in the order listed.

**Root folder:** `lot-checklist-app/`

**Files to create in this step:**
- `lot-checklist-app/README.md`
- `lot-checklist-app/state.json`

---

### FILE: `lot-checklist-app/README.md`

```markdown
# Lot Checklist App — Build System

## Overview
- Total micro-prompts: 4
- Estimated parallel sessions needed: 3 (prompts 01, 02, 03 run after 00; prompt 04 runs after all three complete)
- Output folder: `lot-checklist-app/`
- App type: Mobile HTML app (single-file or minimal multi-file, offline-first)
- Design system: Apple iOS / HIG — Liquid Glass aesthetic

## Execution Sequence

### Step 1 — Run First (no dependencies)
Send `00-initialize.md` in a fresh chat. Wait for completion.

### Step 2 — Parallel Group A (send simultaneously in 3 separate chats)
After Step 1 completes:
- `01-blueprint.md` — App blueprint (screens, navigation, data model)
- `02-styling-spec.md` — Apple HIG styling specification
- `03-implementation-plan.md` — Technical implementation plan

### Step 3 — Sequential (run after ALL of Step 2 completes)
Send `04-build-sequence-generator.md` in a fresh chat after 01, 02, and 03 all show `complete` in state.json.
This prompt reads the three output files and generates the full sequence of atomic build prompts.

## How to Use state.json
- `state.json` lives at: `lot-checklist-app/state.json`
- Every prompt reads it before starting and updates it when done
- Do not manually edit state.json unless a prompt has failed and you need to reset it to `pending`

## Resetting a Failed Prompt
Set the failed prompt's `status` back to `"pending"` in state.json, then re-send it in a fresh chat.
```

---

### FILE: `lot-checklist-app/state.json`

Use the current date/time as the ISO 8601 timestamp.

```json
{
  "target_prompt": "MASTER-APP-BOOTSTRAP-PROMPT.md",
  "decomposed_by": "META-SPLIT-PROMPT",
  "created": "[CURRENT_ISO_TIMESTAMP]",
  "last_updated": "[CURRENT_ISO_TIMESTAMP]",
  "overall_status": "pending",
  "prompts": {
    "00": {
      "label": "initialize-state",
      "status": "complete",
      "parallel_group": null,
      "depends_on": [],
      "unblocks": ["01", "02", "03"],
      "input_files": [],
      "output_files": [
        "lot-checklist-app/state.json",
        "lot-checklist-app/README.md"
      ],
      "started_at": "[CURRENT_ISO_TIMESTAMP]",
      "completed_at": null,
      "notes": "This prompt (MASTER-APP-BOOTSTRAP-PROMPT.md) IS prompt 00. Mark complete after all four micro-prompt files are written."
    },
    "01": {
      "label": "generate-blueprint",
      "status": "pending",
      "parallel_group": "A",
      "depends_on": ["00"],
      "unblocks": ["04"],
      "input_files": [
        "CLAUDE.md",
        "app-spec/lot-checklist-app-requirements.md",
        "lot-checklist-app/state.json"
      ],
      "output_files": ["lot-checklist-app/blueprint.md"],
      "started_at": null,
      "completed_at": null,
      "notes": ""
    },
    "02": {
      "label": "generate-styling-spec",
      "status": "pending",
      "parallel_group": "A",
      "depends_on": ["00"],
      "unblocks": ["04"],
      "input_files": [
        "CLAUDE.md",
        "app-spec/lot-checklist-app-requirements.md",
        "lot-checklist-app/state.json"
      ],
      "output_files": ["lot-checklist-app/styling-spec.md"],
      "started_at": null,
      "completed_at": null,
      "notes": ""
    },
    "03": {
      "label": "generate-implementation-plan",
      "status": "pending",
      "parallel_group": "A",
      "depends_on": ["00"],
      "unblocks": ["04"],
      "input_files": [
        "CLAUDE.md",
        "app-spec/lot-checklist-app-requirements.md",
        "lot-checklist-app/state.json"
      ],
      "output_files": ["lot-checklist-app/implementation-plan.md"],
      "started_at": null,
      "completed_at": null,
      "notes": ""
    },
    "04": {
      "label": "generate-build-sequence",
      "status": "pending",
      "parallel_group": null,
      "depends_on": ["01", "02", "03"],
      "unblocks": [],
      "input_files": [
        "CLAUDE.md",
        "app-spec/lot-checklist-app-requirements.md",
        "lot-checklist-app/state.json",
        "lot-checklist-app/blueprint.md",
        "lot-checklist-app/styling-spec.md",
        "lot-checklist-app/implementation-plan.md"
      ],
      "output_files": ["lot-checklist-app/build-sequence/"],
      "started_at": null,
      "completed_at": null,
      "notes": "Creates numbered atomic build prompts in lot-checklist-app/build-sequence/"
    }
  }
}
```

After writing these two files, proceed to Step 4.

---

## STEP 4 — CREATE THE FOUR MICRO-PROMPT FILES

Create all four files using the exact META-SPLIT-PROMPT template structure (Steps 1–5 per file). Instructions for each file follow.

---

### FILE: `lot-checklist-app/01-blueprint.md`

This file must follow the META-SPLIT-PROMPT template exactly. Populate each section as follows:

**Header metadata:**
- Prompt number: 01
- Label: GENERATE APP BLUEPRINT
- Parallel Group: A
- Depends on: 00
- Unblocks: 04
- Writes to: `lot-checklist-app/blueprint.md`
- Estimated output: ~250–350 lines

**STEP 1 — READ CONTEXT FILES** must list:
1. `lot-checklist-app/state.json`
2. `CLAUDE.md`
3. `app-spec/lot-checklist-app-requirements.md`

**STEP 2 — PRE-EXECUTION GATE** must use the standard META-SPLIT-PROMPT gate language checking prompt 00.

**STEP 3 — TASK** must contain:

*Context:* This prompt produces the app blueprint — the complete structural specification of every screen, navigation path, data object, and offline storage model. The blueprint is the source of truth that both the styling-spec (02) and implementation-plan (03) will reference. It must be complete enough that a developer could build the app's skeleton from it alone, without reading the requirements doc.

*Instructions:*

1. Read `app-spec/lot-checklist-app-requirements.md` in full. Map every user flow step (Steps 1–9 in Section 3) to a named screen.

2. Produce a **Screen Inventory** table. Columns: Screen Name | Route/ID | Trigger | User Role(s) | Description. Every distinct UI state gets its own row. Include: Home, AuditTypeSelect, VINEntry, CategorySelect, ChecklistView, FailureActionView, AuditSummary, TaskList, KeyPlateSubTypeSelect. Add any screens implied by the requirements that are not explicitly named.

3. Produce a **Navigation Flow** diagram in ASCII or Mermaid syntax. Show every possible path a user can take from Home through completion. Show branching (audit type splits, YES vs NO response splits). Every path must terminate at TaskList or an explicit dead-end.

4. Produce a **Data Model** section. For each entity (AuditSession, ChecklistItem, AuditResponse, TaskItem), define: fields, types, required/optional, and storage location (localStorage key name).

5. Produce an **Offline Data Strategy** section. Define: which data is pre-bundled (all checklist content), which data is written during a session (AuditSession + AuditResponse records), the localStorage key schema, and the resume-from-last-item logic (how the app detects an in-progress session on launch).

6. Produce a **Component Inventory** table. Columns: Component Name | Type (screen/modal/overlay/atom) | Props/inputs | Used on screen(s). Cover all reusable pieces: YesNoButton, FailureActionCard, ChecklistProgressBar, TaskListGroup, TeamGroupHeader, ShareButton, ZoneHeader.

7. Produce a **Checklist Content Registry** table. Columns: Audit Type | Category | Source File | Item Count | Zone Headers (if applicable). Populate from Appendix A of the requirements doc.

8. All zone names must use the canonical names from CLAUDE.md Section 9: Cage, East Side Fence Line, West Side of Building, Overflow (Temporary), Power Sport / Quad Corner, Auction Area, Staff Parking.

9. Tag any section where requirements have a `[NEEDS_INPUT]` marker. Do not invent values for those sections.

*Output Specification:*
- File: `lot-checklist-app/blueprint.md`
- Format: Markdown
- Required sections in order: Screen Inventory, Navigation Flow, Data Model, Offline Data Strategy, Component Inventory, Checklist Content Registry, Open Questions (for any NEEDS_INPUT items)

**STEP 4 — SUCCESS CRITERIA** must include:
- [ ] Every screen referenced in the requirements user flow has a corresponding row in Screen Inventory
- [ ] Navigation Flow covers all 4 audit type branches
- [ ] Data Model defines all entities needed to generate the task list output format from Section 3 Step 8
- [ ] localStorage key names are explicit strings (not generic descriptions)
- [ ] Component Inventory contains at minimum: YesNoButton, FailureActionCard, ChecklistProgressBar, TaskListGroup, ShareButton
- [ ] All zone names use canonical names from CLAUDE.md
- [ ] No invented checklist item counts (use Appendix A values exactly)

**STEP 5 — POST-EXECUTION** must use standard META-SPLIT-PROMPT language. Next steps message must say: "You can now send prompts 02 and 03 simultaneously in separate chats, or if they are already running, this output will be consumed by prompt 04 once all three complete."

---

### FILE: `lot-checklist-app/02-styling-spec.md`

This file must follow the META-SPLIT-PROMPT template exactly.

**Header metadata:**
- Prompt number: 02
- Label: GENERATE APPLE HIG STYLING SPECIFICATION
- Parallel Group: A
- Depends on: 00
- Unblocks: 04
- Writes to: `lot-checklist-app/styling-spec.md`
- Estimated output: ~300–450 lines

**STEP 1 — READ CONTEXT FILES** must list:
1. `lot-checklist-app/state.json`
2. `CLAUDE.md`
3. `app-spec/lot-checklist-app-requirements.md`

Then immediately after the file reads, instruct the session to fetch these URLs using WebFetch and extract the CSS values. Include this exact instruction block:

```
FETCH AND EXTRACT from each URL — get only technical CSS values, not philosophy:

1. https://developer.apple.com/design/human-interface-guidelines/typography
2. https://developer.apple.com/design/human-interface-guidelines/materials
3. https://developer.apple.com/design/human-interface-guidelines/layout
4. https://developer.apple.com/design/human-interface-guidelines/designing-for-ios
5. https://developer.apple.com/design/human-interface-guidelines/buttons
6. https://dev.to/kevinbism/recreating-apples-liquid-glass-effect-with-pure-css-3gpl
7. https://yarinsa.medium.com/creating-liquid-glass-effects-with-css-the-art-of-digital-transparency-ebda92699993

If a page is unreachable, use the fallback values listed in the APPLE_SPEC FALLBACK section below.
```

**STEP 2 — PRE-EXECUTION GATE** must use standard gate language checking prompt 00.

**STEP 3 — TASK** must contain:

*Context:* This prompt produces the definitive styling specification for the Lot Checklist App — a mobile HTML app that must look and feel like a native iOS app. The spec is the single source of truth for all visual decisions. Every build prompt that creates UI code will read this file and apply these rules exactly. The design system is Apple HIG with Liquid Glass aesthetic: translucent layered surfaces, SF Pro typography, 8px grid, 44px tap targets, spring-feel animations.

*Instructions:*

1. **Typography System.** Document the complete type scale as CSS custom properties. Use `font-family: "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif`. Include every level from Large Title (34px/700) through Caption 2 (11px/400). Specify line-height and letter-spacing per level.

2. **Color System.** Document all colors as CSS custom properties with both `[data-theme="light"]` and `[data-theme="dark"]` values. Required tokens:
   - `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`
   - `--color-label-primary`, `--color-label-secondary`, `--color-label-tertiary`
   - `--color-separator`, `--color-fill`
   - `--color-accent` (system blue: `#007AFF` light / `#0A84FF` dark)
   - `--color-success` (system green), `--color-warning` (system yellow), `--color-destructive` (system red)
   - `--color-needs-followup` (the highlight color for flagged items in the task list — choose from system orange)
   - Semantic tokens for the app: `--color-audit-yes`, `--color-audit-no`, `--color-audit-resolved`, `--color-audit-flagged`

3. **Glass Material System.** Document the Liquid Glass CSS formula as reusable classes and custom properties. Required:
   - `--glass-bg-light`, `--glass-bg-dark`
   - `--glass-border`
   - `--glass-backdrop-filter`
   - `--glass-shadow`
   - `--glass-inset-shine`
   - `.glass-card` — the base class combining all glass properties with `border-radius: var(--radius-large)`
   - `.glass-nav` — glass for navigation bars (slightly more opaque)
   - `.glass-modal` — glass for modal sheets (most opaque variant)

4. **Spacing System.** Document as CSS custom properties on an 8px grid: `--space-1` (4px) through `--space-12` (96px). Document standard component padding, standard page margin (16px on mobile), standard section gap (24px), list item height (44px minimum).

5. **Border Radius System.** Document: `--radius-small` (8px), `--radius-medium` (12px), `--radius-large` (20px), `--radius-pill` (9999px). Assign each to component types: buttons use medium, cards use large, chips/badges use pill.

6. **Animation System.** Document as CSS custom properties: durations (fast: 0.15s, standard: 0.25s, slow: 0.4s) and easing curves. Include the iOS spring equivalent: `cubic-bezier(0.25, 0.1, 0.25, 1.0)`. Document specific animations required by the app: checklist-item-advance (slide left + fade), failure-action-reveal (slide up from bottom), yes-button-tap (scale 0.95 + restore), task-list-appear (stagger fade-in per item).

7. **Component Specifications.** For each component listed below, document: dimensions, background, border, typography, states (default/hover/active/disabled), and any special visual treatment.

   Components to specify:
   - `YesNoButton` — large rounded buttons, YES is green, NO is red, 52px height, full width with gap
   - `FailureActionCard` — glass card, left border accent in --color-destructive, occupies full screen below header
   - `ActionResponseButton` — "Done — action complete" (green accent) and "Needs Follow-Up" (orange accent), same dimensions
   - `ChecklistProgressBar` — thin line at top of screen, accent color fill, smooth width transition
   - `ChecklistItem` — list row, 44px minimum height, chevron right, text left-aligned
   - `ZoneHeader` — section header, label secondary color, uppercase tracking, 11px
   - `TeamGroupHeader` — task list section divider, glass background, bold label
   - `TaskCard` — glass card, fields for vehicle/item/action/status, FOLLOW-UP variant has orange left border
   - `ShareButton` — SF Symbols share icon or Heroicons equivalent, tappable area 44×44px
   - `AuditTypeTile` — grid tile for audit type selection screen, glass card with icon + label

8. **Icon System.** Specify: use Heroicons (outline style, 24px default) as the icon library. List the specific icons required for each UI element: chevron-right, check-circle, x-circle, exclamation-circle, share, clipboard-list, truck, key, calendar.

9. **App-Shell Layout.** Document the structural layout: fixed header (glass-nav, 56px), scrollable content area with `padding-bottom: calc(env(safe-area-inset-bottom) + 24px)`, no bottom tab bar in Phase 1. Document iOS safe area inset handling: `padding-top: env(safe-area-inset-top)`, `padding-bottom: env(safe-area-inset-bottom)`.

10. **APPLE_SPEC FALLBACK.** At the end of the file, include the fallback values block (listed in Step 2 of this master prompt). Tag each fallback value with `[STANDARD]`.

*Output Specification:*
- File: `lot-checklist-app/styling-spec.md`
- Format: Markdown with embedded CSS code blocks
- Required sections: Typography System, Color System, Glass Material System, Spacing System, Border Radius System, Animation System, Component Specifications (one subsection per component), Icon System, App-Shell Layout, APPLE_SPEC Fallback Reference

**STEP 4 — SUCCESS CRITERIA:**
- [ ] All CSS custom properties use `--` prefix and are defined for both light and dark themes
- [ ] `--color-needs-followup` is defined and distinct from `--color-destructive`
- [ ] Glass formula produces a visually distinct frosted-glass effect (backdrop-filter, rgba bg, border, shadow all present)
- [ ] Animation easing values are cubic-bezier (not keyword `ease`)
- [ ] All 10 required components have specifications
- [ ] Safe area inset CSS is documented for both top and bottom
- [ ] Icon library is named (Heroicons) with specific icon names assigned
- [ ] No invented color values that contradict Apple system colors

**STEP 5 — POST-EXECUTION** standard language. Next steps: same as 01.

---

### FILE: `lot-checklist-app/03-implementation-plan.md`

This file must follow the META-SPLIT-PROMPT template exactly.

**Header metadata:**
- Prompt number: 03
- Label: GENERATE TECHNICAL IMPLEMENTATION PLAN
- Parallel Group: A
- Depends on: 00
- Unblocks: 04
- Writes to: `lot-checklist-app/implementation-plan.md`
- Estimated output: ~200–300 lines

**STEP 1 — READ CONTEXT FILES:**
1. `lot-checklist-app/state.json`
2. `CLAUDE.md`
3. `app-spec/lot-checklist-app-requirements.md`

**STEP 2 — PRE-EXECUTION GATE** standard, checking prompt 00.

**STEP 3 — TASK** must contain:

*Context:* This prompt produces the technical implementation plan — the decisions about technology, file structure, build approach, and development sequence that will govern every subsequent build prompt. The plan must be concrete enough that a future prompt can execute a specific task without needing to make architectural decisions.

*Instructions:*

1. **Technology Decisions.** Document and justify each choice:
   - Runtime: Vanilla HTML/CSS/JS (no framework). Justify: offline-first, single-file delivery, no build step required, zero external dependencies at runtime.
   - Styling approach: CSS custom properties + utility classes (no Tailwind in production, use inline `<style>` block or single `styles.css`). Justify: must work offline without CDN.
   - Icons: Heroicons SVG inlined or embedded as `<symbol>` sprite. Justify: offline-first, no CDN dependency.
   - Storage: localStorage for session data, hardcoded JS objects for checklist content. Justify: no backend required, instant offline access.
   - Sharing: Web Share API with clipboard fallback. Justify: mobile-native share sheet, no integration required.

2. **File Structure.** Document the output file structure the build prompts will produce. Options: (a) single `index.html` with embedded CSS and JS, or (b) `index.html` + `styles.css` + `app.js` + `data.js`. Choose option (b) for maintainability. Specify exact filenames, purpose of each file, and which build prompts will create which files.

3. **Checklist Data Architecture.** Document how checklist content is stored in code. Specify: a single `CHECKLISTS` constant object in `data.js`, keyed by audit type and category. Include the exact key structure: `CHECKLISTS['vehicle-audit']['NEW']`, `CHECKLISTS['morning-lot-walk']`, etc. Document the schema for each checklist item: `{ id, text, failureAction: { role, channel, say, responsibleTeam } }`.

4. **State Management.** Document the in-memory app state object shape: `{ currentAudit: {...}, responses: [], screen: string }`. Document which state is persisted to localStorage (session in progress) and which is ephemeral (screen transition state).

5. **Screen Routing.** Document the routing approach: no hash router, no library. Single `showScreen(screenId)` function that hides all screens and shows the target. List all screen IDs matching the blueprint.

6. **Offline Resume Logic.** Document the exact algorithm: on app load, check localStorage for `lot-checklist-app-session-in-progress`. If found, display resume prompt. If confirmed, restore state and navigate to last incomplete item. If declined, clear and start fresh.

7. **Build Sequence.** Produce a numbered list of every build task in the order it must be executed. Each task must name: what file(s) it creates or modifies, what it depends on, and its approximate scope. Use this as the source for prompt 04 to generate the atomic build prompts.

   Suggested sequence (expand each with specific sub-tasks):
   1. Project scaffold: create file structure, empty files, link tags
   2. CSS foundation: custom properties, reset, typography, spacing
   3. Glass material classes: .glass-card, .glass-nav, .glass-modal
   4. Component atoms: buttons, progress bar, zone header, team group header
   5. Checklist data: `data.js` with all 5 vehicle audit checklists
   6. Checklist data: morning lot walk, PDI compliance, key/plate accountability
   7. App shell: index.html structure, screen containers, nav bar
   8. Home screen + audit type selection screen
   9. VIN entry screen + category selection screen
   10. Checklist view screen + YES/NO interaction logic
   11. Failure action display + Done/Needs Follow-Up response logic
   12. Audit summary screen + task list generation logic
   13. Task list screen: display, team grouping, FOLLOW-UP highlighting
   14. Share function: Web Share API + clipboard fallback + formatted text output
   15. Offline resume: localStorage session persistence + resume prompt
   16. Key/plate sub-type selection + routing logic
   17. PDI compliance review screen
   18. End-to-end integration test: all 4 audit types, all branches, share output

8. **Constraints from Requirements.** List the non-negotiable constraints from Section 6 of the requirements doc that must be enforced in code. For each: state the constraint, the code-level mechanism that enforces it, and what breaks if it is violated.

*Output Specification:*
- File: `lot-checklist-app/implementation-plan.md`
- Format: Markdown
- Required sections: Technology Decisions, File Structure, Checklist Data Architecture, State Management, Screen Routing, Offline Resume Logic, Build Sequence (numbered list), Constraints

**STEP 4 — SUCCESS CRITERIA:**
- [ ] Technology choices are explicit (not "consider using"), each justified
- [ ] File structure lists every file the app will consist of
- [ ] Checklist data key structure is documented with exact key strings
- [ ] Build sequence has at minimum 15 numbered tasks
- [ ] Constraints section covers all 7 constraints from Section 6 of requirements
- [ ] No external CDN dependencies listed (offline-first rule)
- [ ] localStorage key name is explicit: `lot-checklist-app-session-in-progress`

**STEP 5 — POST-EXECUTION** standard language. Next steps: same as 01 and 02.

---

### FILE: `lot-checklist-app/04-build-sequence-generator.md`

This file must follow the META-SPLIT-PROMPT template exactly.

**Header metadata:**
- Prompt number: 04
- Label: GENERATE ATOMIC BUILD PROMPT SEQUENCE
- Parallel Group: SEQUENTIAL
- Depends on: 01, 02, 03
- Unblocks: (none — this is the final meta-prompt)
- Writes to: `lot-checklist-app/build-sequence/` (multiple files)
- Estimated output: ~600–900 lines total across all files

**STEP 1 — READ CONTEXT FILES:**
1. `lot-checklist-app/state.json`
2. `CLAUDE.md`
3. `app-spec/lot-checklist-app-requirements.md`
4. `lot-checklist-app/blueprint.md`
5. `lot-checklist-app/styling-spec.md`
6. `lot-checklist-app/implementation-plan.md`

**STEP 2 — PRE-EXECUTION GATE** standard. Check that prompts 01, 02, AND 03 all have status `complete`. If any one is `pending`, `in_progress`, or `failed`, STOP and report which one is blocking.

**STEP 3 — TASK** must contain:

*Context:* This is the final meta-prompt in the build system. It reads the blueprint, styling spec, and implementation plan produced by prompts 01–03 and generates a complete sequence of self-contained atomic build prompts — each one producing a specific piece of the app. These build prompts are what a developer will actually send to Claude Code to construct the Lot Checklist App. Each build prompt must be detailed enough to execute without reading the source requirements doc.

*Instructions:*

1. Read all three output files (`blueprint.md`, `styling-spec.md`, `implementation-plan.md`) completely.

2. Derive the complete build task list from `implementation-plan.md`'s Build Sequence section. Each numbered task in that section becomes one atomic build prompt.

3. Create the output folder: `lot-checklist-app/build-sequence/`

4. Create a `lot-checklist-app/build-sequence/state.json` for the build sequence, following the same structure as the parent state.json. All build prompts start at status `pending`.

5. Create a `lot-checklist-app/build-sequence/README.md` with the execution sequence for the build prompts.

6. For each build task from the implementation plan's Build Sequence, create a file named `lot-checklist-app/build-sequence/[NN]-[label].md` following the META-SPLIT-PROMPT template (Steps 1–5). Number from `01` upward. Use `99` for any final integration/assembly step.

7. **Each build prompt must:**
   - List exact files to read (from the build-sequence state.json and the three spec files it depends on)
   - Contain the complete, exact content to write — not "implement the button component" but the full CSS and HTML for that component, synthesized from `styling-spec.md`
   - Reference exact CSS custom property names from `styling-spec.md`
   - Reference exact data keys from `implementation-plan.md`
   - Include a CONSTRAINTS section repeating the relevant non-negotiable rules from `implementation-plan.md`'s Constraints section
   - Have success criteria that are objectively verifiable (can open file and check)
   - Not require the executing session to make any architectural decisions

8. **Parallel group assignment for build prompts:**
   - CSS foundation tasks (no JS dependency): Parallel Group A
   - Data file tasks (no UI dependency): Parallel Group A (with CSS)
   - Screen tasks that depend on CSS and data: Parallel Group B
   - Logic tasks that depend on screens: SEQUENTIAL
   - Integration/share tasks: SEQUENTIAL, after all screens complete

9. After creating all build prompt files, update `lot-checklist-app/state.json`: set prompt 04 status to `complete`, set `overall_status` to `complete`.

*Output Specification:*
- Folder: `lot-checklist-app/build-sequence/`
- Files: `README.md`, `state.json`, and one `.md` file per build task
- Format of each build prompt: META-SPLIT-PROMPT template exactly
- Naming: `01-project-scaffold.md`, `02-css-foundation.md`, etc.

**STEP 4 — SUCCESS CRITERIA:**
- [ ] Every build task from `implementation-plan.md`'s Build Sequence has a corresponding file
- [ ] No build prompt requires the executing session to make an architectural decision not already made in the spec files
- [ ] Every build prompt's STEP 1 lists `styling-spec.md` and/or `implementation-plan.md` as input files
- [ ] `build-sequence/state.json` exists with all build prompts at `pending`
- [ ] `build-sequence/README.md` gives a human-readable execution sequence
- [ ] Parallel group assignments respect the CSS-before-screens dependency

**STEP 5 — POST-EXECUTION:**
Update `lot-checklist-app/state.json`: prompt 04 → `complete`, `overall_status` → `complete`.

Tell the user:
> "**Prompt 04 complete.**
> Created: `lot-checklist-app/build-sequence/` with [N] atomic build prompts.
>
> **The entire build system is now ready.**
> Open `lot-checklist-app/build-sequence/README.md` for the execution sequence.
> Send each build prompt in the sequence to construct the Lot Checklist App."

---

## STEP 5 — FINALIZE STATE AND CONFIRM

After all four micro-prompt files are written:

1. Update `lot-checklist-app/state.json`:
   - `prompts.00.status` → `"complete"`
   - `prompts.00.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Verify the following before reporting success:
   - [ ] `lot-checklist-app/README.md` exists
   - [ ] `lot-checklist-app/state.json` exists with all 5 prompt entries (00–04)
   - [ ] `lot-checklist-app/01-blueprint.md` exists and follows the META-SPLIT-PROMPT template (has Steps 1–5)
   - [ ] `lot-checklist-app/02-styling-spec.md` exists and follows the template (has the WebFetch instruction block and APPLE_SPEC fallback section)
   - [ ] `lot-checklist-app/03-implementation-plan.md` exists and follows the template
   - [ ] `lot-checklist-app/04-build-sequence-generator.md` exists and follows the template
   - [ ] APPLE_SPEC research was completed and extracted values are embedded in `02-styling-spec.md`'s task instructions

3. Tell the user:

> **Bootstrap complete.**
> Created: 6 files in `lot-checklist-app/`
>
> **Execution sequence:**
> 1. Prompt 00 is this session — already complete.
> 2. Open three fresh chats simultaneously. Send one of these to each:
>    - `lot-checklist-app/01-blueprint.md`
>    - `lot-checklist-app/02-styling-spec.md`
>    - `lot-checklist-app/03-implementation-plan.md`
> 3. After all three show `complete` in `lot-checklist-app/state.json`, send:
>    - `lot-checklist-app/04-build-sequence-generator.md`
>
> After step 3 completes, you will have a full sequence of atomic build prompts ready to construct the app.

---

## CONSTRAINTS FOR THIS SESSION

- Do not write any app code (HTML, CSS, JavaScript). This session only produces the build system.
- Do not invent checklist item counts, zone names, or product requirements. Use only what is in `app-spec/lot-checklist-app-requirements.md` and `CLAUDE.md`.
- All zone names must use canonical forms from CLAUDE.md: Cage, East Side Fence Line, West Side of Building, Overflow (Temporary), Power Sport / Quad Corner, Auction Area, Staff Parking.
- Every micro-prompt file must follow the META-SPLIT-PROMPT template with all five steps present.
- The APPLE_SPEC fallback values listed in Step 2 of this file are authoritative if web fetches fail. Do not substitute other values.
- Do not add a Phase 2 build scope. All build prompts cover Phase 1 (MVP) features only, as defined in Section 3 and the P1 feature list of the requirements doc.
