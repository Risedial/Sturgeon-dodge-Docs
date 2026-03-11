# BUILD PROMPT 07 — APP SHELL HTML

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL |
| **Depends on** | Build task 04 (component-atom-styles) |
| **Unblocks** | Build task 08 |
| **Writes to** | `lot-checklist-app/index.html` |
| **Estimated output** | ~80 lines replacing scaffold HTML |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — check in Step 2
2. `lot-checklist-app/styling-spec.md` — SVG icon system (Section 8), app-shell layout (Section 9), glass material classes (Section 3)
3. `lot-checklist-app/implementation-plan.md` — file structure (Section 2), screen ID registry (Section 5.2), required icon set (Section 1.3)
4. `lot-checklist-app/blueprint.md` — screen inventory (Section 1), navigation flow (Section 2), offline data strategy (Section 4.3)
5. `lot-checklist-app/styles.css` — output of build task 04; confirms CSS class names available

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If build task 04 (`component-atom-styles`) has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 07 cannot start — build task 04 (component-atom-styles) has status `[current status]`.
> Wait for build task 04 to complete, then re-send this prompt."

**If build task 04 has status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.07.status` → `"in_progress"`
- `prompts.07.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Build task 04 complete. Starting build prompt 07: APP SHELL HTML."

---

## STEP 3 — TASK

### Context

This task writes the complete `index.html` app shell, replacing the minimal scaffold from task 01. The result is the permanent HTML foundation that all subsequent tasks (08–17) write their screen content into. No JavaScript logic and no screen content is written in this task — all `.screen` `<div>` elements are left empty as placeholders. Only the structural skeleton, inline SVG sprite block, resume modal, toast element, and script tags are written here.

### Instructions

Write the complete content of `lot-checklist-app/index.html`. This replaces the scaffold entirely.

#### Complete index.html content to write

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <title>Lot Checklist</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="app-shell">

  <!-- SVG SPRITE BLOCK — Heroicons outline, all icons inlined, display:none -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
    <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m4.5 12.75 6 6 9-13.5"/>
    </symbol>
    <symbol id="icon-check-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </symbol>
    <symbol id="icon-x-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 18 18 6M6 6l12 12"/>
    </symbol>
    <symbol id="icon-x-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </symbol>
    <symbol id="icon-exclamation-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
    </symbol>
    <symbol id="icon-exclamation-triangle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
    </symbol>
    <symbol id="icon-share" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"/>
    </symbol>
    <symbol id="icon-clipboard" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>
    </symbol>
    <symbol id="icon-clipboard-list" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
    </symbol>
    <symbol id="icon-truck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
    </symbol>
    <symbol id="icon-key" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z"/>
    </symbol>
    <symbol id="icon-calendar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/>
    </symbol>
    <symbol id="icon-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
    </symbol>
    <symbol id="icon-chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
    </symbol>
    <symbol id="icon-chevron-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15.75 19.5-7.5-7.5 7.5-7.5"/>
    </symbol>
    <symbol id="icon-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </symbol>
    <symbol id="icon-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
    </symbol>
    <symbol id="icon-list-bullet" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
    </symbol>
  </svg>

  <!-- SCREEN CONTAINERS — all class="screen"; only one active at a time via showScreen() -->
  <!-- Content for each screen is added by build tasks 08–17 -->
  <div id="home" class="screen"></div>
  <div id="audit-type-select" class="screen"></div>
  <div id="vin-entry" class="screen"></div>
  <div id="category-select" class="screen"></div>
  <div id="key-plate-subtype-select" class="screen"></div>
  <div id="checklist-view" class="screen"></div>
  <div id="failure-action-view" class="screen"></div>
  <div id="audit-summary" class="screen"></div>
  <div id="task-list" class="screen"></div>
  <div id="pdi-compliance-view" class="screen"></div>

  <!-- RESUME MODAL — fixed overlay; not a .screen; managed by resumeCheck() in app.js -->
  <!-- display:none by default; set to display:flex by resumeCheck() when session found -->
  <div id="resume-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; z-index:200; align-items:flex-end; justify-content:center; background:rgba(0,0,0,0.4);">
    <div class="glass-modal" style="width:100%; padding:var(--space-6); padding-bottom:calc(var(--space-6) + env(safe-area-inset-bottom));">
      <h2 style="font-size:var(--text-title-2-size); font-weight:var(--text-title-2-weight); color:var(--color-label-primary); margin:0 0 var(--space-2) 0;">Audit in Progress</h2>
      <p style="font-size:var(--text-body-size); line-height:var(--text-body-lh); color:var(--color-label-secondary); margin:0 0 var(--space-6) 0;">You have an audit in progress. Resume where you left off?</p>
      <button id="btn-resume" class="btn-done" style="width:100%; margin-bottom:var(--space-3);">Resume</button>
      <button id="btn-start-fresh" class="btn-follow-up" style="width:100%);">Start Fresh</button>
    </div>
  </div>

  <!-- TOAST — clipboard copy confirmation; not a .screen; display:none by default -->
  <div id="toast" class="toast" style="display:none;"></div>

  <!-- SCRIPT LOAD ORDER: data.js must load before app.js -->
  <!-- app.js reads CHECKLISTS from data.js on DOMContentLoaded -->
  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

#### Icon usage pattern (for reference by later tasks)

To use an icon in screen content written by tasks 08–17:

```html
<!-- Decorative icon (aria-hidden) -->
<svg aria-hidden="true" width="24" height="24">
  <use href="#icon-truck"/>
</svg>

<!-- Interactive icon-only button (aria-label required) -->
<button aria-label="Share task list">
  <svg aria-hidden="true" width="24" height="24">
    <use href="#icon-share"/>
  </svg>
</button>
```

#### CONSTRAINTS

- **Offline-first:** No CDN URLs in any `<link>`, `<script>`, `<img>`, or `<use>` attribute. All resources are local (`styles.css`, `data.js`, `app.js`). No service worker required — the app works as static files.
- **Script load order:** `<script src="data.js">` must appear before `<script src="app.js">`. `app.js` reads `CHECKLISTS` from `data.js` on `DOMContentLoaded`. Violating this order causes a ReferenceError.
- **Screen IDs — exact strings:** Use exactly these `id` values with no variation: `home`, `audit-type-select`, `vin-entry`, `category-select`, `key-plate-subtype-select`, `checklist-view`, `failure-action-view`, `audit-summary`, `task-list`, `pdi-compliance-view`. These are the only valid arguments to `showScreen()` as defined in `implementation-plan.md` Section 5.2.
- **Resume modal:** `id="resume-modal"` is not a `.screen` element and is not managed by `showScreen()`. It must have `display:none` by default. It must contain exactly two buttons: `id="btn-resume"` and `id="btn-start-fresh"`. `resumeCheck()` in `app.js` (task 15) sets `display:flex` to show it.
- **Toast:** `id="toast"` is not a `.screen` element. `display:none` by default. `shareTaskList()` in `app.js` (task 14) toggles it.
- **SVG sprite:** All icons embedded inline — no external SVG file references. Sprite `<svg>` must have `style="display:none"` so no blank space appears.
- **data-theme attribute:** `<html>` element must have `data-theme="light"`. This is required for CSS color tokens (`[data-theme="light"]` selector) to resolve. Without it, color variables are undefined.
- **No screen content:** All screen `<div>` elements must remain empty in this task. Content is added by tasks 08–17.
- **Binary responses only:** No checklist interaction elements are created in this task.

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading `lot-checklist-app/index.html` before proceeding to Step 5:

- [ ] File exists at `lot-checklist-app/index.html` and opens as a valid HTML document with `<!DOCTYPE html>` on line 1
- [ ] `<html>` element has attribute `data-theme="light"`
- [ ] `<meta name="viewport">` content includes `viewport-fit=cover`
- [ ] `<link rel="stylesheet" href="styles.css">` is present in `<head>` — no CDN URL appears anywhere in the file
- [ ] SVG sprite `<svg>` has `style="display:none"` and contains `<symbol>` elements with all 18 IDs:
  `icon-check`, `icon-check-circle`, `icon-x-mark`, `icon-x-circle`, `icon-exclamation-circle`, `icon-exclamation-triangle`, `icon-share`, `icon-clipboard`, `icon-clipboard-list`, `icon-truck`, `icon-key`, `icon-calendar`, `icon-arrow-left`, `icon-chevron-right`, `icon-chevron-left`, `icon-clock`, `icon-home`, `icon-list-bullet`
- [ ] All 10 screen `<div>` elements present with `class="screen"` and correct `id` values:
  `home`, `audit-type-select`, `vin-entry`, `category-select`, `key-plate-subtype-select`, `checklist-view`, `failure-action-view`, `audit-summary`, `task-list`, `pdi-compliance-view`
- [ ] `<div id="resume-modal">` is present with `display:none` in its `style` attribute and contains both `id="btn-resume"` and `id="btn-start-fresh"` buttons
- [ ] `<div id="toast">` is present with `display:none` in its `style` attribute
- [ ] `<script src="data.js">` appears in the file before `<script src="app.js">`
- [ ] No `<script>` or `<link>` tag references any URL containing `cdn`, `jsdelivr`, `unpkg`, `cloudflare`, or any external domain

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.07.status` → `"complete"`
   - `prompts.07.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 07 complete.**
> Written: `lot-checklist-app/index.html` — complete app shell with inline SVG sprite (18 icons), 10 screen container divs, resume modal (`#btn-resume`, `#btn-start-fresh`), toast element, and script tags in correct load order.
>
> **Build prompt 08 is now unblocked.**
> Send `lot-checklist-app/build-sequence/08-home-audit-type-select.md` to add Home screen and AuditTypeSelect screen content.
