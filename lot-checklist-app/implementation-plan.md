# Technical Implementation Plan: Lot Checklist App
**Project:** Sturgeon Dodge Edmonton Office — Lot Operations
**Phase:** 1 (MVP)
**Status:** COMPLETE
**Date:** 2026-03-09

---

## Table of Contents

1. [Technology Decisions](#1-technology-decisions)
2. [File Structure](#2-file-structure)
3. [Checklist Data Architecture](#3-checklist-data-architecture)
4. [State Management](#4-state-management)
5. [Screen Routing](#5-screen-routing)
6. [Offline Resume Logic](#6-offline-resume-logic)
7. [Build Sequence](#7-build-sequence)
8. [Constraints](#8-constraints)

---

## 1. Technology Decisions

Every decision below is final for Phase 1 (MVP). No choice may be revisited during Phase 1 build tasks.

---

### 1.1 Runtime: Vanilla HTML/CSS/JS

**Decision:** No framework. No bundler. No transpiler. No npm. No build step of any kind.

**Justification:**
- The app must work offline on a mobile device during a physical lot walk. No runtime dependencies means nothing can fail to load because of a missing CDN resource, a broken package registry, or a stale service worker.
- The app is deliverable as a single set of static files. No server-side rendering, no Node process, no build pipeline is required to deploy an update.
- Vanilla JS is universally supported on all modern mobile browsers without polyfills. The feature surface required (DOM manipulation, localStorage, Web Share API, clipboard) is fully supported natively.
- Future maintainers — including non-developers — can read, understand, and modify any file without a framework mental model.

**What this excludes:** React, Vue, Svelte, Angular, Next.js, Vite, Webpack, Parcel, Babel, TypeScript, Tailwind CLI, PostCSS, any npm dependency of any kind.

---

### 1.2 Styling Approach: CSS Custom Properties + Utility Classes

**Decision:** All styles in a single `styles.css` file linked from `index.html`. CSS custom properties (variables) define all design tokens. Utility classes handle spacing and typography. No Tailwind, no Sass, no CSS-in-JS.

**Justification:**
- The app must not depend on any CDN at runtime. Tailwind's CDN play script (cdn.tailwindcss.com) is not an option for an offline-first app. The Tailwind CLI build process contradicts the zero-build-step requirement.
- CSS custom properties (`--color-primary`, `--spacing-4`, etc.) provide the same theming and consistency benefits as a CSS preprocessor, with no additional tooling.
- A single `styles.css` file means one HTTP request for all styles. On a local file system (`file://` protocol), this is instantaneous.
- Any browser that supports the features used in this app also supports CSS custom properties (all major browsers, 2017+).

---

### 1.3 Icons: Heroicons SVG Sprite (Inline-Embedded)

**Decision:** All icons are Heroicons (outline variant). They are embedded directly in `index.html` as an SVG `<defs>` block using `<symbol>` elements. Each icon is referenced in HTML with `<use href="#icon-name">`.

**Justification:**
- No CDN dependency. Icons are part of the HTML file itself — they are available at the same instant as the page.
- Single HTTP request: all icons are delivered with `index.html`.
- The `<use>` reference pattern is semantically clean, avoids inline SVG repetition, and is fully supported on all mobile browsers.
- Icon styling (color, size) is controlled via CSS on the `<use>` element's parent, using `currentColor` inheritance.

**Required icon set (minimum — build tasks may add more):**
- `#icon-check` — YES response
- `#icon-x-mark` — NO response
- `#icon-chevron-right` — navigation forward
- `#icon-chevron-left` — back navigation
- `#icon-share` — share task list
- `#icon-clipboard` — clipboard copy fallback
- `#icon-exclamation-triangle` — FOLLOW-UP flag / warnings
- `#icon-clock` — PDI compliance timing
- `#icon-home` — home screen
- `#icon-list-bullet` — task list

---

### 1.4 Storage: localStorage (Session) + Hardcoded Content (data.js)

**Decision:** All checklist content is hardcoded as JS constants in `data.js`. All session state is persisted to `localStorage` with the key `lot-checklist-app-session-in-progress`. No IndexedDB, no Cache API, no server-side storage in Phase 1.

**Justification:**
- No backend required. The app is self-contained — it requires no server to function in Phase 1.
- Hardcoded content in `data.js` guarantees that checklist item text and Failure Action text are available offline immediately on load, with no fetch call, no async wait, and no failure path.
- localStorage provides synchronous read/write with no setup overhead. It survives page reloads and browser restarts. It is supported on every target device.
- Session resume (closing the app mid-audit and returning to the same item) is achievable with localStorage alone — the full `appState` object is serialized after every response.

**localStorage key:** `lot-checklist-app-session-in-progress`

**Limits:** localStorage is bounded (~5MB per origin). The serialized `appState` object is well under 1KB. No limit concern exists for Phase 1.

---

### 1.5 Sharing: Web Share API + Clipboard Fallback

**Decision:** The "Share Task List" feature calls `navigator.share()`. If the API is unavailable or the user dismisses the share sheet, the fallback is `navigator.clipboard.writeText()` with a "Copied to clipboard" toast. No third-party sharing library, no Telegram integration, no WhatsApp integration.

**Justification:**
- `navigator.share()` triggers the native mobile share sheet on iOS and Android, which includes any app the user has installed (WhatsApp, Slack, email, SMS, etc.). This requires no platform-specific integration code.
- The clipboard fallback covers all desktop browsers and any mobile browser where `navigator.share` is unavailable.
- Telegram integration is explicitly excluded in Section 7 of the requirements document. WhatsApp and any other platform integration is excluded by the same constraint.

---

## 2. File Structure

The complete set of files the app consists of. These are the only files the build prompts create. No additional files exist in Phase 1.

```
lot-checklist-app/
├── index.html          — App shell: <head>, meta tags, SVG sprite block, screen container divs,
│                         resume-prompt modal, <link> to styles.css, <script> tags for data.js and app.js
├── styles.css          — All CSS: custom properties (design tokens), reset, typography, spacing,
│                         glass material classes, component styles, screen layouts, animation keyframes
├── app.js              — All application logic: appState object, showScreen(), resumeCheck(),
│                         persistState(), initFreshSession(), all screen renderers and event handlers,
│                         generateTaskList(), shareTaskList()
├── data.js             — All checklist content: the CHECKLISTS constant with all 5 vehicle audit
│                         category item arrays, morning-lot-walk items, pdi-compliance template,
│                         and key-plate sub-type arrays
├── README.md           — Build system overview (already exists — do not overwrite)
└── state.json          — Build execution tracker (already exists — do not overwrite)
```

**Script load order in `index.html`:**
```html
<script src="data.js"></script>   <!-- Must load before app.js — app.js reads CHECKLISTS -->
<script src="app.js"></script>    <!-- Reads CHECKLISTS from data.js on DOMContentLoaded -->
```

**Which build tasks create which files:**

| File | Created by task | Modified by tasks |
|---|---|---|
| `index.html` | Task 1 (scaffold) | Tasks 7, 8, 9, 10, 11, 12, 13, 15, 16, 17 |
| `styles.css` | Task 1 (scaffold) | Tasks 2, 3, 4 |
| `app.js` | Task 1 (scaffold) | Tasks 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 |
| `data.js` | Task 1 (scaffold) | Tasks 5, 6 |

---

## 3. Checklist Data Architecture

All checklist content lives in `data.js` as a single exported constant named `CHECKLISTS`. There are no other data structures in `data.js`. No fetch calls, no async loading, no dynamic content.

### 3.1 Top-Level Key Structure

```javascript
const CHECKLISTS = {
  'vehicle-audit': {
    'NEW':  [ /* 7 items */ ],
    'FLR':  [ /* 8 items */ ],
    'SOLD': [ /* 3 items */ ],
    'BND':  [ /* 4 items */ ],
    'RECON':[ /* 6 items */ ]
  },
  'morning-lot-walk': [ /* 15 items with zone annotations */ ],
  'pdi-compliance':   [ /* 1 item template, repeated per vehicle */ ],
  'key-plate': {
    'sign-out':       [ /* 4 items */ ],
    'sign-in':        [ /* 2 items */ ],
    'periodic-audit': [ /* 2 items */ ]
  }
};
```

**Exact key strings — these must be used verbatim in all code:**
- `CHECKLISTS['vehicle-audit']['NEW']`
- `CHECKLISTS['vehicle-audit']['FLR']`
- `CHECKLISTS['vehicle-audit']['SOLD']`
- `CHECKLISTS['vehicle-audit']['BND']`
- `CHECKLISTS['vehicle-audit']['RECON']`
- `CHECKLISTS['morning-lot-walk']`
- `CHECKLISTS['pdi-compliance']`
- `CHECKLISTS['key-plate']['sign-out']`
- `CHECKLISTS['key-plate']['sign-in']`
- `CHECKLISTS['key-plate']['periodic-audit']`

### 3.2 Checklist Item Object Schema

Every item in every array conforms to this exact schema:

```javascript
{
  id: String,           // Unique across all checklists. Format: "[prefix]-[sequence]"
                        // Prefixes: "va-new", "va-flr", "va-sold", "va-bnd", "va-recon",
                        //           "mlw", "pdi", "kp-out", "kp-in", "kp-audit"
                        // Examples: "va-new-01", "mlw-03", "kp-out-02"

  text: String,         // Exact item text copied verbatim from the source checklist file.
                        // No rewording. No summarization. No punctuation changes.

  zone: String|null,    // Zone name for morning-lot-walk items only. Must use canonical zone
                        // names from CLAUDE.md exactly: "Cage", "East Side Fence Line",
                        // "West Side of Building", "Overflow (Temporary)", "Auction Area",
                        // "Power Sport / Quad Corner". For all non-morning-lot-walk items: null.

  failureAction: {
    role: String,         // The responsible role exactly as written in the checklist file.
                          // Examples: "Lot Attendant", "Lot Manager", "Sales Manager (Kevin)"
    channel: String,      // The required communication channel exactly as written.
                          // Examples: "via WhatsApp", "in person", "via phone"
    say: String|null,     // The exact SAY script from the checklist file, including quotation marks
                          // as written. null if the checklist file specifies no scripted language.
    responsibleTeam: String  // "Lot" | "Sales" | "Service"
                             // Used to group tasks in the generated task list.
  }
}
```

### 3.3 ID Prefix Reference Table

| Checklist | Prefix | Count |
|---|---|---|
| Vehicle Audit — NEW | `va-new` | va-new-01 through va-new-07 |
| Vehicle Audit — FLR | `va-flr` | va-flr-01 through va-flr-08 |
| Vehicle Audit — SOLD | `va-sold` | va-sold-01 through va-sold-03 |
| Vehicle Audit — BND | `va-bnd` | va-bnd-01 through va-bnd-04 |
| Vehicle Audit — RECON | `va-recon` | va-recon-01 through va-recon-06 |
| Morning Lot Walk | `mlw` | mlw-01 through mlw-15 |
| PDI Compliance | `pdi` | pdi-01 (single template item) |
| Key/Plate — Sign-Out | `kp-out` | kp-out-01 through kp-out-04 |
| Key/Plate — Sign-In | `kp-in` | kp-in-01 through kp-in-02 |
| Key/Plate — Periodic Audit | `kp-audit` | kp-audit-01 through kp-audit-02 |

### 3.4 Prohibition on Text Transformation

No function in `app.js` may modify item text or Failure Action text strings at render time. The rendering pipeline must output these strings directly:

```javascript
// CORRECT — verbatim output
itemTextEl.textContent = item.text;
failureRoleEl.textContent = item.failureAction.role;
failureSayEl.textContent = item.failureAction.say;

// PROHIBITED — any transformation
itemTextEl.textContent = item.text.toLowerCase();       // NEVER
itemTextEl.textContent = item.text.substring(0, 80);    // NEVER
failureSayEl.textContent = summarize(item.failureAction.say); // NEVER
```

---

## 4. State Management

### 4.1 The `appState` Object

All ephemeral application state lives in a single `appState` object declared at module scope in `app.js`. This is the single source of truth for the current session at runtime.

```javascript
const appState = {
  screen: String,             // Current screen ID. Matches the id attribute of the visible .screen
                              // container. Example: 'home', 'checklist-view', 'audit-summary'.

  auditType: String|null,     // The audit type selected in AuditTypeSelect screen.
                              // Values: 'vehicle-audit' | 'morning-lot-walk' |
                              //         'pdi-compliance' | 'key-plate'
                              // null before selection.

  vehicleVIN: String|null,    // VIN entered by the user in VINEntry screen (Vehicle Audit only).
                              // null for all other audit types.

  vehicleCategory: String|null, // Vehicle status category selected in CategorySelect screen.
                                // Values: 'NEW' | 'FLR' | 'SOLD' | 'BND' | 'RECON'
                                // null for all non-Vehicle-Audit audit types.

  keyPlateSubType: String|null, // Sub-type selected in KeyPlateSubTypeSelect screen.
                                // Values: 'sign-out' | 'sign-in' | 'periodic-audit'
                                // null for all non-Key/Plate audit types.

  checklist: Array,           // The active checklist items array. Set by reference to the
                              // appropriate CHECKLISTS entry when the checklist begins.
                              // Empty array before a checklist is started.

  currentItemIndex: Number,   // Zero-based index of the currently displayed checklist item.
                              // 0 before any item is shown. Incremented after each response.

  responses: Array,           // Array of response objects. One entry per answered item.
                              // Length equals the number of items answered so far.

  sessionStartTime: String    // ISO 8601 timestamp recorded when the session begins
                              // (when the first checklist item is displayed).
                              // Example: "2026-03-09T14:32:00.000Z"
};
```

### 4.2 Response Object Schema

Each element of `appState.responses` conforms to this schema:

```javascript
{
  itemId: String,       // The id field of the checklist item that was answered.
                        // Matches an id in the active appState.checklist array.

  response: String,     // The user's response. One of three values:
                        //   'yes'            — user tapped YES
                        //   'done'           — user tapped "Done — action complete" (after NO)
                        //   'needs-followup' — user tapped "Needs Follow-Up" (after NO)

  timestamp: String     // ISO 8601 timestamp of the moment the response was recorded.
                        // Example: "2026-03-09T14:33:47.000Z"
}
```

### 4.3 localStorage Persistence

**Key:** `lot-checklist-app-session-in-progress`

**What is persisted:** The entire `appState` object, serialized via `JSON.stringify(appState)`.

**When persistence occurs:** The `persistState()` helper function is called immediately after every response is recorded (after every `appState.responses.push(...)` call). This includes YES responses, Done responses, and Needs Follow-Up responses.

```javascript
function persistState() {
  localStorage.setItem(
    'lot-checklist-app-session-in-progress',
    JSON.stringify(appState)
  );
}
```

**When persistence is cleared:**
- When the user completes all checklist items and navigates to the AuditSummary screen: `localStorage.removeItem('lot-checklist-app-session-in-progress')`
- When the user taps "Start Fresh" on the resume prompt modal: `localStorage.removeItem('lot-checklist-app-session-in-progress')`

**What is NOT persisted:** DOM references, animation state, transition queues, event listeners. These are re-established on every page load.

### 4.4 State Reset

`initFreshSession()` resets all appState fields to their initial values:

```javascript
function initFreshSession() {
  appState.screen = 'home';
  appState.auditType = null;
  appState.vehicleVIN = null;
  appState.vehicleCategory = null;
  appState.keyPlateSubType = null;
  appState.checklist = [];
  appState.currentItemIndex = 0;
  appState.responses = [];
  appState.sessionStartTime = null;
}
```

---

## 5. Screen Routing

### 5.1 The `showScreen()` Function

There is no hash router, no URL routing library, and no browser history manipulation. Routing is handled entirely by `showScreen(screenId)`:

```javascript
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(el => {
    el.style.display = 'none';
  });
  // Show target screen
  const target = document.getElementById(screenId);
  if (target) {
    target.style.display = 'block';
  }
  // Update state and persist
  appState.screen = screenId;
  persistState();
}
```

`showScreen()` does not perform any data loading or rendering. Callers are responsible for rendering screen content before or after calling `showScreen()`.

### 5.2 Screen ID Registry

All 9 screen container elements in `index.html` use `class="screen"` and the following `id` attributes. These IDs are the only valid arguments to `showScreen()`:

| Screen ID | Screen Name | Purpose |
|---|---|---|
| `home` | Home | App entry point. "Start Lot Audit" button. |
| `audit-type-select` | AuditTypeSelect | 4 audit type tiles (Vehicle Audit, Morning Lot Walk, PDI Compliance Review, Key/Plate Accountability Check). |
| `vin-entry` | VINEntry | Manual VIN text input for Vehicle Audit. 17-character alphanumeric format. Back button. |
| `category-select` | CategorySelect | 5 category buttons: NEW, FLR, SOLD, BND, RECON. Vehicle Audit only. Back button. |
| `key-plate-subtype-select` | KeyPlateSubTypeSelect | 3 sub-type buttons: Sign-Out, Sign-In, Periodic Audit. Key/Plate only. Back button. |
| `checklist-view` | ChecklistView | One checklist item at a time. Progress bar. YES button. NO button. Zone header if morning-lot-walk. |
| `failure-action-view` | FailureActionView | Failure Action display (role, channel, say). "Done — action complete" button. "Needs Follow-Up" button. |
| `audit-summary` | AuditSummary | Totals (passed / resolved / flagged). "Generate Task List" button. |
| `task-list` | TaskList | Tasks grouped by team. FOLLOW-UP items highlighted. "Share Task List" button. |

### 5.3 Screen Flow Diagram

```
home
 └─→ audit-type-select
       ├─→ vin-entry (Vehicle Audit path)
       │     └─→ category-select
       │           └─→ checklist-view ─→ failure-action-view (on NO)
       │                 │                └─→ checklist-view (advance)
       │                 └─→ audit-summary (all items answered)
       │                       └─→ task-list
       │
       ├─→ checklist-view (Morning Lot Walk path — skip VIN/category)
       │     └─→ [same as above]
       │
       ├─→ pdi-compliance-view (PDI Compliance path)
       │     └─→ checklist-view
       │           └─→ [same as above]
       │
       └─→ key-plate-subtype-select (Key/Plate path)
             └─→ checklist-view
                   └─→ [same as above]
```

---

## 6. Offline Resume Logic

This algorithm is executed once on every page load, before any other initialization. It is the entry point of `app.js`.

### 6.1 Algorithm

```
1. Register DOMContentLoaded listener → calls resumeCheck() when DOM is ready.

2. resumeCheck():
   a. Read localStorage.getItem('lot-checklist-app-session-in-progress')
   b. Store result in variable: storedValue

3. Branch on storedValue:

   CASE A — storedValue is null or undefined:
   → No in-progress session exists.
   → Call initFreshSession()
   → Call showScreen('home')
   → DONE

   CASE B — storedValue is a non-null string:
   → Attempt JSON.parse(storedValue)

   CASE B-1 — JSON.parse throws SyntaxError (corrupt data):
   → Treat as no session.
   → Call localStorage.removeItem('lot-checklist-app-session-in-progress')
   → Call initFreshSession()
   → Call showScreen('home')
   → DONE

   CASE B-2 — JSON.parse succeeds, returns a valid object:
   → Store parsed object as: restoredState
   → Display resume-prompt modal (NOT a screen — overlays on top of whatever screen is visible):
       Modal content:
         Heading: "Audit in Progress"
         Body: "You have an audit in progress. Resume where you left off?"
         Button 1: "Resume"
         Button 2: "Start Fresh"

   CASE B-2-RESUME — user taps "Resume":
   → Dismiss modal
   → Copy all fields from restoredState into appState:
       Object.assign(appState, restoredState)
   → Restore CHECKLISTS reference:
       appState.checklist must be re-set from CHECKLISTS using the restored
       auditType, vehicleCategory, and keyPlateSubType values (because
       JSON round-trip loses the array reference identity, though content is preserved)
   → Call showScreen(appState.screen)
   → If appState.screen === 'checklist-view':
       Re-render the checklist item at appState.currentItemIndex
   → If appState.screen === 'failure-action-view':
       Re-render the failure action for the item at appState.currentItemIndex
   → DONE

   CASE B-2-START-FRESH — user taps "Start Fresh":
   → Dismiss modal
   → Call localStorage.removeItem('lot-checklist-app-session-in-progress')
   → Call initFreshSession()
   → Call showScreen('home')
   → DONE
```

### 6.2 CHECKLISTS Reference Restoration

Because `JSON.stringify` / `JSON.parse` produces a deep copy of `appState.checklist` (not a reference to the original `CHECKLISTS` array), the restored `appState.checklist` contains the correct item objects but is a new array in memory. This is acceptable — `app.js` may use the restored checklist array directly. There is no requirement to re-point to the original `CHECKLISTS` reference; the content is identical.

### 6.3 Resume Modal

The resume-prompt modal is a separate `<div id="resume-modal">` element in `index.html`. It is not a `.screen` element and is not managed by `showScreen()`. It uses CSS `position: fixed`, `z-index` above all screen content, and `display: none` by default. `resumeCheck()` sets it to `display: flex` when a restorable session is found and hides it again after the user makes a choice.

---

## 7. Build Sequence

18 numbered tasks in execution order. Each task is atomic — it produces a defined, complete output. No task depends on any task numbered higher than itself.

---

**Task 1 — Project scaffold**
- **Creates:** `index.html`, `styles.css`, `app.js`, `data.js`
- **Depends on:** nothing
- **Scope:** Each file is created with minimal valid content: `index.html` gets a valid `<!DOCTYPE html>` shell with `<link>` to `styles.css` and `<script>` tags for `data.js` (before) and `app.js` (after); `styles.css` gets a single comment header; `app.js` gets a DOMContentLoaded listener stub; `data.js` gets `const CHECKLISTS = {};` stub.
- **Output size:** ~30 lines total across 4 files.

---

**Task 2 — CSS foundation**
- **Creates/modifies:** `styles.css`
- **Depends on:** Task 1
- **Scope:** Write all CSS custom properties into `:root {}`: color tokens (`--color-bg`, `--color-surface`, `--color-primary`, `--color-danger`, `--color-success`, `--color-warning`, `--color-text-primary`, `--color-text-secondary`, `--color-border`), spacing scale (`--space-1` through `--space-10`), border-radius scale (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`), animation tokens (`--duration-fast`, `--duration-normal`, `--ease-out`), typography scale (`--text-xs` through `--text-2xl`, `--font-weight-normal`, `--font-weight-medium`, `--font-weight-bold`). Write CSS reset (box-sizing, margin/padding zeroing, inherit font). Write base `html`, `body`, and `.screen` styles.
- **Output size:** ~120 lines added to `styles.css`.

---

**Task 3 — Glass material classes**
- **Creates/modifies:** `styles.css`
- **Depends on:** Task 2
- **Scope:** Write `.glass-card`, `.glass-nav`, `.glass-modal` classes. Each uses `backdrop-filter: blur()`, `background: rgba(...)`, `border: 1px solid rgba(...)`. Write supporting `--glass-bg`, `--glass-border`, `--glass-blur` custom properties. Write `@supports` fallback for browsers without backdrop-filter support (solid background fallback, no blur).
- **Output size:** ~60 lines appended to `styles.css`.

---

**Task 4 — Component atom styles**
- **Creates/modifies:** `styles.css`
- **Depends on:** Tasks 2, 3
- **Scope:** Write CSS for every UI component used in checklist flow:
  - `.btn-yes`, `.btn-no` — large tap-target YES/NO buttons with color tokens
  - `.btn-done`, `.btn-follow-up` — Failure Action sub-response buttons
  - `.progress-bar`, `.progress-bar__fill` — ChecklistProgressBar
  - `.zone-header` — zone label for morning-lot-walk groupings
  - `.team-header` — task list team group header
  - `.checklist-item` — item text container in ChecklistView
  - `.btn-share` — ShareButton
  - `.audit-type-tile` — AuditTypeSelect tile grid items
  - `.task-card`, `.task-card--follow-up` — TaskList entries with FOLLOW-UP variant
  - `.toast` — clipboard copy confirmation toast
  - `.modal-overlay`, `.modal-box` — resume-prompt modal
- **Output size:** ~150 lines appended to `styles.css`.

---

**Task 5 — Checklist data: vehicle audits**
- **Creates/modifies:** `data.js`
- **Depends on:** Task 1
- **Scope:** Populate `CHECKLISTS['vehicle-audit']` for all 5 categories. Read item text and Failure Action text verbatim from source checklist files:
  - `checklists/vehicle-audit-new.md` → `CHECKLISTS['vehicle-audit']['NEW']` (7 items)
  - `checklists/vehicle-audit-flr.md` → `CHECKLISTS['vehicle-audit']['FLR']` (8 items)
  - `checklists/vehicle-audit-sold.md` → `CHECKLISTS['vehicle-audit']['SOLD']` (3 items)
  - `checklists/vehicle-audit-bnd.md` → `CHECKLISTS['vehicle-audit']['BND']` (4 items)
  - `checklists/vehicle-audit-recon.md` → `CHECKLISTS['vehicle-audit']['RECON']` (6 items)

  Each item object must conform to the schema in Section 3.2. Item IDs assigned using prefix table in Section 3.3. `zone` field is `null` for all vehicle audit items.
- **Output size:** ~120 lines replacing the `CHECKLISTS = {}` stub in `data.js`.

---

**Task 6 — Checklist data: other audit types**
- **Creates/modifies:** `data.js`
- **Depends on:** Task 5
- **Scope:** Populate the remaining three top-level CHECKLISTS keys by reading source checklist files verbatim:
  - `checklists/morning-lot-walk-checklist.md` → `CHECKLISTS['morning-lot-walk']` (15 items). Zone annotations extracted from section headers in source file. Canonical zone names from CLAUDE.md glossary used verbatim.
  - `checklists/pdi-completion-checklist.md` → `CHECKLISTS['pdi-compliance']` (1 template item — per-vehicle repetition is handled in app.js for Phase 1).
  - `checklists/key-plate-accountability-checklist.md` → `CHECKLISTS['key-plate']['sign-out']` (4 items), `CHECKLISTS['key-plate']['sign-in']` (2 items), `CHECKLISTS['key-plate']['periodic-audit']` (2 items). Section A/B/C of source file maps to these three arrays.
- **Output size:** ~100 lines appended to `data.js`.

---

**Task 7 — App shell HTML**
- **Creates/modifies:** `index.html`
- **Depends on:** Task 1
- **Scope:** Write the complete `index.html` structure:
  - `<head>`: charset, viewport meta, title ("Lot Checklist"), `<link rel="stylesheet" href="styles.css">`
  - SVG sprite block: `<svg xmlns="..." style="display:none">` containing `<defs>` with all `<symbol>` elements for the required icon set (Section 1.3)
  - 9 screen `<div class="screen" id="[screen-id]">` containers — all empty (content added by later tasks)
  - `<div id="pdi-compliance-view" class="screen">` — the PDI screen (added here, content by Task 17)
  - `<div id="resume-modal" ...>` — resume-prompt modal container with heading, body text, Resume and Start Fresh buttons
  - `<script src="data.js"></script>` then `<script src="app.js"></script>` at bottom of `<body>`
- **Output size:** ~80 lines replacing the scaffold HTML in `index.html`.

---

**Task 8 — Home screen + AuditTypeSelect screen**
- **Creates/modifies:** `index.html`, `app.js`
- **Depends on:** Tasks 2, 3, 4, 7
- **Scope:**
  - `index.html`: Fill `#home` div content: app title ("Lot Checklist"), tagline, "Start Lot Audit" primary button. Fill `#audit-type-select` div content: 4 `.audit-type-tile` elements (Vehicle Audit, Morning Lot Walk, PDI Compliance Review, Key/Plate Accountability Check), each with icon and label. Back button on audit-type-select.
  - `app.js`: Replace DOMContentLoaded stub with full initialization sequence: call `resumeCheck()` (stub — implemented in Task 15). Define `appState` object with all fields initialized. Define `showScreen()`. Define `initFreshSession()`. Wire "Start Lot Audit" click → `showScreen('audit-type-select')`. Wire each AuditTypeTile click → set `appState.auditType`, then route to appropriate next screen.
- **Output size:** ~80 lines added across `index.html` and `app.js`.

---

**Task 9 — VINEntry screen + CategorySelect screen**
- **Creates/modifies:** `index.html`, `app.js`
- **Depends on:** Task 8
- **Scope:**
  - `index.html`: Fill `#vin-entry` content: label, `<input type="text" id="vin-input" maxlength="17" placeholder="Enter VIN" autocomplete="off">`, Next button, back button (→ `audit-type-select`). Fill `#category-select` content: heading "Select Vehicle Status", 5 category buttons (NEW, FLR, SOLD, BND, RECON), each with a brief descriptor, back button (→ `vin-entry`).
  - `app.js`: VIN validation on Next click: value must be exactly 17 characters, alphanumeric only (`/^[A-HJ-NPR-Z0-9]{17}$/i` — standard VIN character set). Invalid input shows inline error message (no alert()). Valid input stores to `appState.vehicleVIN` → `showScreen('category-select')`. Category button click → sets `appState.vehicleCategory` → sets `appState.checklist = CHECKLISTS['vehicle-audit'][appState.vehicleCategory]` → sets `appState.currentItemIndex = 0` → sets `appState.sessionStartTime` → calls `renderChecklistItem()` → `showScreen('checklist-view')`.
- **Output size:** ~80 lines added across `index.html` and `app.js`.

---

**Task 10 — ChecklistView screen + YES/NO interaction logic**
- **Creates/modifies:** `index.html`, `app.js`
- **Depends on:** Tasks 5, 6, 9
- **Scope:**
  - `index.html`: Fill `#checklist-view` content: `.zone-header` container (hidden by default, visible when item.zone is non-null), `.progress-bar` container with `.progress-bar__fill` child, `.checklist-item` container for item text, `.btn-yes` button ("YES"), `.btn-no` button ("NO").
  - `app.js`: Define `renderChecklistItem(index)`: reads `appState.checklist[index]`, sets zone header text and visibility, sets item text (verbatim — no transformation), updates progress bar fill width as `(index / checklist.length * 100)%`. Wire YES button click: push `{itemId, response: 'yes', timestamp}` to `appState.responses`, call `persistState()`, call `advanceChecklist()`. Wire NO button click: `showScreen('failure-action-view')` then call `renderFailureAction(appState.currentItemIndex)`. Define `advanceChecklist()`: increments `appState.currentItemIndex`; if `currentItemIndex < checklist.length`, calls `renderChecklistItem(currentItemIndex)` and stays on checklist-view; if all items answered, calls `showScreen('audit-summary')` and clears localStorage.
- **Output size:** ~120 lines added across `index.html` and `app.js`.

---

**Task 11 — FailureActionView screen + Done/Needs Follow-Up logic**
- **Creates/modifies:** `index.html`, `app.js`
- **Depends on:** Task 10
- **Scope:**
  - `index.html`: Fill `#failure-action-view` content: heading "Action Required", `.failure-action-role` span, `.failure-action-channel` span, `.failure-action-say` block (conditionally shown — hidden if `failureAction.say` is null), `.btn-done` button ("Done — action complete"), `.btn-follow-up` button ("Needs Follow-Up").
  - `app.js`: Define `renderFailureAction(index)`: reads `appState.checklist[index].failureAction`, sets role/channel/say fields verbatim. Hides say block if `failureAction.say` is null. Wire Done button: push `{itemId, response: 'done', timestamp}`, call `persistState()`, call `advanceChecklist()`, call `showScreen('checklist-view')`. Wire Needs Follow-Up button: push `{itemId, response: 'needs-followup', timestamp}`, call `persistState()`, call `advanceChecklist()`, call `showScreen('checklist-view')`.

  **Enforcement:** Neither Done nor Needs Follow-Up navigates away without recording a response. There is no "back" button on the FailureActionView screen — the user must tap one of the two response buttons to proceed.
- **Output size:** ~100 lines added across `index.html` and `app.js`.

---

**Task 12 — AuditSummary screen + task list generation logic**
- **Creates/modifies:** `index.html`, `app.js`
- **Depends on:** Task 11
- **Scope:**
  - `index.html`: Fill `#audit-summary` content: heading "Audit Complete", summary stats block (total items, items passed, items resolved, items flagged), "Generate Task List" button.
  - `app.js`: Define `renderAuditSummary()`: counts responses by type, sets stat display values. Wire "Generate Task List" button: call `generateTaskList()`, call `showScreen('task-list')`. Define `generateTaskList()`: iterates `appState.responses`, filters for `response === 'done'` and `response === 'needs-followup'`, retrieves the corresponding item from `appState.checklist` by itemId match, builds a task object array with fields: `{itemId, itemText, zone, failureAction, response, timestamp, vehicleVIN}`. Stores result as `appState.taskList` (add this field to appState). Groups tasks by `failureAction.responsibleTeam` ("Lot" | "Sales" | "Service").
- **Output size:** ~100 lines added across `index.html` and `app.js`.

---

**Task 13 — TaskList screen: display, team grouping, FOLLOW-UP highlighting**
- **Creates/modifies:** `index.html`, `app.js`
- **Depends on:** Task 12
- **Scope:**
  - `index.html`: Fill `#task-list` content: heading "Task List", scrollable task list container, "Share Task List" button.
  - `app.js`: Define `renderTaskList()`: iterates task groups in order Lot → Sales → Service. For each group, renders a `.team-header` element then a `.task-card` for each task in the group. Each task card shows: VIN, zone (if present), checklist item text, failure action role + channel + say, resolution status ("Resolved" or "FOLLOW-UP"). Applies `.task-card--follow-up` CSS class to cards where `response === 'needs-followup'`. "Share Task List" button wires to `shareTaskList()` (implemented in Task 14).
- **Output size:** ~120 lines added across `index.html` and `app.js`.

---

**Task 14 — Share function**
- **Creates/modifies:** `app.js`
- **Depends on:** Task 13
- **Scope:** Define `shareTaskList()`:
  1. Build plain-text export string. Exact format (from Section 3, Step 9 of requirements doc):
     ```
     LOT AUDIT — [Date] [Time] — [Audit Type] — [VIN if applicable]
     Audited by: [User name/role]

     --- LOT TEAM TASKS ---
     [Task entries]

     --- SALES TEAM TASKS ---
     [Task entries]

     --- SERVICE DEPARTMENT TASKS ---
     [Task entries]

     Items marked [FOLLOW-UP] require attention — action could not be completed during the walk.
     ```
     Each task entry includes checklist item text, failure action, and `[FOLLOW-UP]` marker if applicable.
  2. Call `navigator.share({ title: 'Lot Audit Task List', text: exportString })`.
  3. Catch cases:
     - `AbortError`: user dismissed share sheet — do nothing.
     - `navigator.share` is undefined (browser does not support Web Share API): fall through to clipboard.
     - Any other error: fall through to clipboard.
  4. Clipboard fallback: call `navigator.clipboard.writeText(exportString)`. On success: show `.toast` element with text "Copied to clipboard" for 2 seconds then hide. On clipboard error: show `.toast` with "Unable to share — please copy manually."
- **Output size:** ~60 lines added to `app.js`.

---

**Task 15 — Offline resume**
- **Creates/modifies:** `index.html`, `app.js`
- **Depends on:** Tasks 8–14
- **Scope:**
  - `index.html`: Ensure `#resume-modal` div (added in Task 7) has correct child elements: heading, body paragraph, `#btn-resume` button, `#btn-start-fresh` button.
  - `app.js`: Replace `resumeCheck()` stub with full implementation per the algorithm in Section 6. Wire `#btn-resume` click: restore state from parsed JSON, call `showScreen(appState.screen)`, re-render current checklist item or failure action as needed, hide modal. Wire `#btn-start-fresh` click: remove localStorage item, call `initFreshSession()`, call `showScreen('home')`, hide modal. Define `persistState()` (if not already defined in earlier tasks — this is the canonical definition). Ensure `persistState()` is called in all response-recording paths added in Tasks 10 and 11.
- **Output size:** ~80 lines added across `index.html` and `app.js`.

---

**Task 16 — Key/Plate sub-type selection + routing logic**
- **Creates/modifies:** `index.html`, `app.js`
- **Depends on:** Tasks 6, 10
- **Scope:**
  - `index.html`: Fill `#key-plate-subtype-select` content: heading "What is the reason for this check?", 3 option buttons (Sign-Out, Sign-In, Periodic Audit), back button (→ `audit-type-select`).
  - `app.js`: Wire each sub-type button click: set `appState.keyPlateSubType` to the corresponding key string (`'sign-out'`, `'sign-in'`, `'periodic-audit'`), set `appState.checklist = CHECKLISTS['key-plate'][appState.keyPlateSubType]`, set `appState.currentItemIndex = 0`, set `appState.sessionStartTime`, call `renderChecklistItem(0)`, call `showScreen('checklist-view')`. Wire audit type routing in Task 8: when `auditType === 'key-plate'`, route to `key-plate-subtype-select` instead of directly to checklist-view.
- **Output size:** ~50 lines added across `index.html` and `app.js`.

---

**Task 17 — PDI Compliance Review screen**
- **Creates/modifies:** `index.html`, `app.js`
- **Depends on:** Tasks 8, 10
- **Scope:**
  - `index.html`: Fill `#pdi-compliance-view` screen content: heading "PDI Compliance Review", vehicle VIN field (text input), vehicle arrival date field (`<input type="date">`), "Calculate Status" button, status display block (initially hidden): shows computed status as one of three labeled states with corresponding CSS color class:
    - "ON TIME" (green — `--color-success`) — 0 or 1 day since arrival
    - "DAY 1 OVERDUE" (amber — `--color-warning`) — exactly 1 day since arrival with no PDI recorded
    - "DAY 2+ OVERDUE — CRITICAL" (red — `--color-danger`) — 2 or more days since arrival with no PDI

    "Begin PDI Checklist" button (routes to `checklist-view` with `CHECKLISTS['pdi-compliance']` loaded). Back button (→ `audit-type-select`).
  - `app.js`: Wire "Calculate Status" button: read arrival date value, compute `Math.floor((today - arrivalDate) / 86400000)` days, set status display text and CSS class accordingly. Wire "Begin PDI Checklist": set `appState.checklist = CHECKLISTS['pdi-compliance']`, set `appState.currentItemIndex = 0`, set `appState.vehicleVIN` from VIN input, set `appState.sessionStartTime`, call `renderChecklistItem(0)`, call `showScreen('checklist-view')`. Wire audit type routing in Task 8: when `auditType === 'pdi-compliance'`, route to `pdi-compliance-view`.
- **Output size:** ~70 lines added across `index.html` and `app.js`.

---

**Task 18 — End-to-end integration test**
- **Creates:** no new files
- **Modifies:** any files with defects found during testing
- **Depends on:** Tasks 1–17
- **Scope:** Open `index.html` directly in a mobile browser (or browser DevTools mobile viewport). Execute all flows completely:

  1. **Vehicle Audit — all 5 categories:** For each of NEW, FLR, SOLD, BND, RECON: enter a test VIN, select the category, answer all items. For each category, answer at least one item NO, then tap Done for one and Needs Follow-Up for another. Verify: all items display, failure actions display verbatim, task list generates correctly, FOLLOW-UP items are highlighted, share output matches required format exactly.

  2. **Morning Lot Walk:** Complete all 15 items. Verify zone headers appear for items with zone annotations. Answer at least 3 items NO across different zones. Verify task list groups by responsible team.

  3. **PDI Compliance Review:** Enter a VIN and arrival dates spanning all 3 status states (today, 1 day ago, 2+ days ago). Verify correct status label and color for each. Proceed to checklist, complete the PDI item.

  4. **Key/Plate Accountability — all 3 sub-types:** Complete Sign-Out (4 items), Sign-In (2 items), Periodic Audit (2 items) as separate sessions. Answer at least one NO per session.

  5. **Offline resume test:** Start any audit, answer 3–4 items, close the browser tab completely, reopen `index.html`. Verify resume-prompt modal appears. Tap "Resume." Verify app returns to the correct screen and correct item index. Tap NO on the current item, verify FailureActionView appears. Tap "Start Fresh" in a second test. Verify app returns to home screen.

  6. **Share output:** Complete an audit with at least 2 NO responses. Tap "Share Task List." Verify share sheet appears (or clipboard copy succeeds). Verify the exported text exactly matches the format specified in Section 3 Step 9 of the requirements document.

  Document every defect found. Fix each defect in the appropriate source file before marking this task complete.

---

## 8. Constraints

These constraints are non-negotiable in every build task. No exception may be made in Phase 1. They map directly to Section 6 of `app-spec/lot-checklist-app-requirements.md`.

---

| # | Constraint | Code-Level Mechanism | What Breaks if Violated |
|---|---|---|---|
| 1 | **Checklist fidelity** — item text and Failure Action text must match source files exactly, no rewording | `data.js` is populated by copying item text and `failureAction` field values verbatim from source checklist files. No text transformation functions exist in the rendering pipeline. `renderChecklistItem()` and `renderFailureAction()` output strings directly with `.textContent = item.text` and `.textContent = item.failureAction.say`. | Staff see incorrect instructions. Compliance failures go unaddressed because Failure Actions are vague, incomplete, or have the wrong role/channel. Accountability trail is broken. |
| 2 | **Offline-first** — app must function without internet during lot walk | All checklist content hardcoded in `data.js` — no fetch calls, no API calls for content. localStorage only for session data. No `<link>` or `<script>` tags pointing to any CDN URL. No service worker required — the app works as static files with no registration needed. | App fails mid-walk when WiFi drops. Data loss on audit records. Audit cannot complete. |
| 3 | **Zero ambiguity in decision trees** — Phase 2 only | Every decision tree path embedded in the app in Phase 2 must terminate in a defined action node. No path may end in an undefined state. | (Phase 2 constraint — not applicable to Phase 1 build tasks.) |
| 4 | **Key Cafe is not replaced** | No key custody tracking fields in `appState`. No sign-out records, no plate location data stored. Key/Plate checklist items are display-only process reminders. No API calls to Key Cafe. | Parallel tracking system conflicts with Key Cafe. Custody records become unreliable. |
| 5 | **No customer-facing features** | No routes, screens, or data fields exist for customer access. No customer data entry in any screen. No public-facing interface. | Customer data exposure. Privacy and legal risk. |
| 6 | **Binary responses enforced** — YES or NO only, no free text, no N/A | No `<input type="text">` or `<textarea>` exists on any checklist screen. No N/A option exists. The only interactive elements in the checklist flow are: YES button, NO button, Done button, Needs Follow-Up button. No comment fields. No partial answers. | Users skip or partially document failures. Accountability trail is broken. Task list is incomplete. |
| 7 | **Exact Failure Action text** — role, channel, SAY script shown verbatim | `failureAction.role`, `failureAction.channel`, and `failureAction.say` values are rendered with `.textContent` assignment only. No string transformation (`trim()`, `toLowerCase()`, `substring()`, template modification) is applied to these fields. The `say` field is rendered in full or hidden entirely (when null) — it is never summarized or truncated. | Staff receive edited or summarized instructions. Wrong person is contacted, wrong channel is used, wrong script is delivered. Compliance failure escalations fail. |

---

*This implementation plan is the authoritative technical reference for all Phase 1 build tasks. All architectural decisions documented here are final. Build task prompts must not introduce any architecture, file, or dependency not described in this document.*
