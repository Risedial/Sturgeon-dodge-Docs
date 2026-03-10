# PROMPT 03: GENERATE TECHNICAL IMPLEMENTATION PLAN

| Field | Value |
|---|---|
| **Parallel Group** | A |
| **Depends on** | 00 |
| **Unblocks** | 04 |
| **Writes to** | `lot-checklist-app/implementation-plan.md` |
| **Estimated output** | ~200–300 lines |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `lot-checklist-app/state.json` — you will check this in Step 2
2. `CLAUDE.md` — project conventions, domain glossary, canonical names, quality rules
3. `app-spec/lot-checklist-app-requirements.md` — full product requirements for the app

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Check `lot-checklist-app/state.json`:

**If prompt 00 has status `in_progress`:**
STOP. Tell the user exactly:
> "Prompt 03 cannot start — prompt 00 (initialize-state) is currently running in another chat.
> Wait for that chat to complete, then re-send this prompt in a new chat."

**If prompt 00 has status `pending` or `failed`:**
STOP. Tell the user exactly:
> "Prompt 00 (initialize-state) must complete before this prompt can run.
> Please send the MASTER-APP-BOOTSTRAP-PROMPT.md in a fresh chat first."

**If prompt 00 has status `complete`:**
Update `lot-checklist-app/state.json` in a single Write operation:
- `prompts.03.status` → `"in_progress"`
- `prompts.03.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- `overall_status` → `"in_progress"`

Then tell the user:
> "Gate passed. Starting prompt 03: GENERATE TECHNICAL IMPLEMENTATION PLAN."

---

## STEP 3 — TASK

### Context

This prompt produces the technical implementation plan — the decisions about technology, file structure, build approach, and development sequence that will govern every subsequent build prompt. The Lot Checklist App is a mobile HTML app that must work offline, require no build step, and be deployable as a set of static files. The plan must be concrete enough that a future prompt can execute a specific build task without making any architectural decisions. Every choice here is final for Phase 1 (MVP).

### Instructions

1. **Technology Decisions.** Document and justify each choice:

   - **Runtime:** Vanilla HTML/CSS/JS — no framework, no bundler, no transpiler. Justify: offline-first, single-file delivery possible, no build step required, zero external runtime dependencies.
   - **Styling approach:** CSS custom properties + utility classes. No Tailwind in production. All styles in a single `styles.css` file linked from `index.html`. Justify: must work offline without CDN; CSS custom properties enable consistent theming without a preprocessor.
   - **Icons:** Heroicons SVG inline-embedded as an `<svg>` sprite block at the top of `index.html` (using `<symbol>` elements). Reference icons with `<use href="#icon-name">`. Justify: offline-first, no CDN dependency, single HTTP request.
   - **Storage:** localStorage for all session data. All checklist content hardcoded as JS constants in `data.js`. Justify: no backend required, instant offline access, data survives page reload.
   - **Sharing:** Web Share API (`navigator.share()`) with clipboard copy (`navigator.clipboard.writeText()`) as fallback. Justify: mobile-native share sheet, no platform integration required, clipboard fallback covers all browsers.

2. **File Structure.** Document the output file structure the build prompts will produce. Use option (b): `index.html` + `styles.css` + `app.js` + `data.js`. Specify exact filenames, each file's purpose, and which build prompts will create which files:

   ```
   lot-checklist-app/
   ├── index.html       — App shell: HTML structure, screen containers, SVG sprite, link tags
   ├── styles.css       — All CSS: custom properties, reset, typography, spacing, glass classes, components
   ├── app.js           — All application logic: state management, routing, checklist flow, task list generation, share
   ├── data.js          — All checklist content: CHECKLISTS constant, all item text and Failure Action text
   ├── README.md        — Build system overview (already exists)
   └── state.json       — Build execution tracker (already exists)
   ```

3. **Checklist Data Architecture.** Document how checklist content is stored in code. All content lives in `data.js` as a single `CHECKLISTS` constant. The key structure is:

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

   Each checklist item object schema:
   ```javascript
   {
     id: String,           // e.g. "va-new-01" — unique across all checklists
     text: String,         // Exact item text from source checklist file — no rewording
     zone: String|null,    // Zone name for morning-lot-walk items (canonical name from CLAUDE.md); null otherwise
     failureAction: {
       role: String,       // e.g. "Lot Attendant", "Sales Manager"
       channel: String,    // e.g. "via WhatsApp", "in person"
       say: String|null,   // Exact script from checklist file, or null if not scripted
       responsibleTeam: String  // "Lot" | "Sales" | "Service"
     }
   }
   ```

4. **State Management.** Document the in-memory app state object. All ephemeral state lives in a single `appState` object in `app.js`:

   ```javascript
   const appState = {
     screen: String,           // Current screen ID (e.g. 'home', 'audit-type-select')
     auditType: String|null,   // 'vehicle-audit' | 'morning-lot-walk' | 'pdi-compliance' | 'key-plate'
     vehicleVIN: String|null,  // VIN entered by user (Vehicle Audit only)
     vehicleCategory: String|null, // 'NEW'|'FLR'|'SOLD'|'BND'|'RECON' (Vehicle Audit only)
     keyPlateSubType: String|null, // 'sign-out'|'sign-in'|'periodic-audit' (Key/Plate only)
     checklist: Array,         // The active checklist items array (reference to CHECKLISTS entry)
     currentItemIndex: Number, // Index of the currently displayed checklist item
     responses: Array,         // Array of response objects (one per item)
     sessionStartTime: String  // ISO 8601 timestamp of session start
   };
   ```

   Each response object schema:
   ```javascript
   {
     itemId: String,       // Matches checklist item id
     response: String,     // 'yes' | 'done' | 'needs-followup'
     timestamp: String     // ISO 8601
   }
   ```

   **Persisted to localStorage (key: `lot-checklist-app-session-in-progress`):** The entire `appState` object is serialized via `JSON.stringify` and written after every response. This ensures resume-from-last-item works even if the app is force-closed mid-audit.

   **Ephemeral (not persisted):** DOM references, animation state, transition queues.

5. **Screen Routing.** The routing approach is: no hash router, no library. A single `showScreen(screenId)` function hides all screens (sets `display: none` on all `.screen` containers) and shows the target (sets `display: block`). Screen IDs must match the `id` attributes of screen container elements in `index.html`:

   | Screen ID | Screen Name |
   |---|---|
   | `home` | Home |
   | `audit-type-select` | AuditTypeSelect |
   | `vin-entry` | VINEntry |
   | `category-select` | CategorySelect |
   | `key-plate-subtype-select` | KeyPlateSubTypeSelect |
   | `checklist-view` | ChecklistView |
   | `failure-action-view` | FailureActionView |
   | `audit-summary` | AuditSummary |
   | `task-list` | TaskList |

   `showScreen()` also updates `appState.screen` and persists to localStorage.

6. **Offline Resume Logic.** The exact algorithm executed on every app load:

   ```
   1. On DOMContentLoaded, call resumeCheck()
   2. resumeCheck(): read localStorage key 'lot-checklist-app-session-in-progress'
   3. If key does not exist or value is null: call initFreshSession() → showScreen('home')
   4. If key exists and value is a valid JSON object:
      a. Parse the stored appState
      b. Display a resume prompt modal (not a screen):
         "You have an audit in progress. Resume where you left off?"
         Two buttons: "Resume" | "Start Fresh"
      c. If "Resume": restore appState from parsed object → showScreen(appState.screen)
         If appState.screen is 'checklist-view' or 'failure-action-view',
         re-render the current checklist item at appState.currentItemIndex
      d. If "Start Fresh":
         localStorage.removeItem('lot-checklist-app-session-in-progress')
         call initFreshSession() → showScreen('home')
   5. If JSON.parse throws: treat as corrupt → clear key → initFreshSession() → showScreen('home')
   ```

7. **Build Sequence.** Numbered list of every build task in execution order. Each task names the file(s) it creates or modifies, its dependencies, and its scope:

   1. **Project scaffold** — Create `index.html`, `styles.css`, `app.js`, `data.js` as empty files with correct link/script tags. Depends on: nothing. Scope: 4 files, ~30 lines total.
   2. **CSS foundation** — Write all CSS custom properties (color tokens, spacing scale, radius scale, animation durations/easings, typography scale) into `styles.css`. Write CSS reset and base body/html styles. Depends on: task 1. Scope: styles.css, ~120 lines.
   3. **Glass material classes** — Write `.glass-card`, `.glass-nav`, `.glass-modal` classes and supporting `--glass-*` custom properties into `styles.css`. Depends on: task 2. Scope: styles.css append, ~60 lines.
   4. **Component atom styles** — Write CSS for: `YesNoButton`, `ActionResponseButton`, `ChecklistProgressBar`, `ZoneHeader`, `TeamGroupHeader`, `ChecklistItem` row, `ShareButton`, `AuditTypeTile`. Depends on: tasks 2–3. Scope: styles.css append, ~150 lines.
   5. **Checklist data — vehicle audits** — Populate `data.js` with `CHECKLISTS['vehicle-audit']` for all 5 categories (NEW, FLR, SOLD, BND, RECON) with exact item text and Failure Action objects from the source checklist files. Depends on: task 1. Scope: data.js, ~120 lines.
   6. **Checklist data — other audit types** — Populate `data.js` with `CHECKLISTS['morning-lot-walk']`, `CHECKLISTS['pdi-compliance']`, and `CHECKLISTS['key-plate']` (sign-out, sign-in, periodic-audit) sections. Depends on: task 5. Scope: data.js append, ~100 lines.
   7. **App shell HTML** — Write `index.html` structure: `<head>` with meta/links, SVG sprite block with all required Heroicons, all 9 screen `<div class="screen">` containers (empty), and resume-prompt modal container. Depends on: task 1. Scope: index.html, ~80 lines.
   8. **Home screen + AuditTypeSelect screen** — Write HTML for `#home` (app title, Start Lot Audit button) and `#audit-type-select` (4 AuditTypeTile components). Write `app.js` initialization, `showScreen()`, `appState`, and navigation handlers for these two screens. Depends on: tasks 2–4, 7. Scope: index.html, app.js, ~80 lines.
   9. **VINEntry screen + CategorySelect screen** — Write HTML for `#vin-entry` (VIN input field, Next button, back button) and `#category-select` (5 category buttons). Write app.js handlers: VIN format validation (17 chars alphanumeric), category selection, navigation to `#checklist-view`. Depends on: task 8. Scope: index.html, app.js, ~80 lines.
   10. **ChecklistView screen + YES/NO interaction logic** — Write HTML for `#checklist-view` (progress bar, item text, YES button, NO button, zone header if applicable). Write app.js handlers: render current item, handle YES (record response, advance), handle NO (navigate to `#failure-action-view`). Depends on: tasks 5–6, 9. Scope: index.html, app.js, ~120 lines.
   11. **FailureActionView screen + Done/Needs Follow-Up logic** — Write HTML for `#failure-action-view` (failure action text block showing role/channel/say, "Done — action complete" button, "Needs Follow-Up" button). Write app.js handlers: render failure action from current item's `failureAction` object, record response ('done' or 'needs-followup'), advance to next item or navigate to `#audit-summary` if all items answered. Depends on: task 10. Scope: index.html, app.js, ~100 lines.
   12. **AuditSummary screen + task list generation logic** — Write HTML for `#audit-summary` (totals: passed/resolved/flagged, Generate Task List button). Write `generateTaskList()` function in app.js: iterate responses, filter for 'done' and 'needs-followup', build task list array grouped by `responsibleTeam`. Depends on: task 11. Scope: index.html, app.js, ~100 lines.
   13. **TaskList screen — display, team grouping, FOLLOW-UP highlighting** — Write HTML for `#task-list` (TeamGroupHeader per team, TaskCard per task, FOLLOW-UP variant styling). Write app.js renderer: sort tasks by team, render TaskCard for each, apply `.follow-up` class to 'needs-followup' items. Add ShareButton to screen. Depends on: task 12. Scope: index.html, app.js, ~120 lines.
   14. **Share function** — Write `shareTaskList()` in app.js: format task list as plain text matching the Section 3 Step 9 format exactly (header block, team sections, FOLLOW-UP markers), call `navigator.share()`, catch `AbortError` and all other errors, fall back to `navigator.clipboard.writeText()` with a "Copied to clipboard" toast. Depends on: task 13. Scope: app.js, ~60 lines.
   15. **Offline resume** — Write `resumeCheck()` in app.js with the full algorithm from the Offline Resume Logic section. Write `persistState()` helper called after every response write. Write `initFreshSession()` to reset appState. Write the resume-prompt modal HTML and its event handlers. Depends on: tasks 8–14. Scope: index.html, app.js, ~80 lines.
   16. **Key/Plate sub-type selection + routing logic** — Write HTML for `#key-plate-subtype-select` (3 option buttons: Sign-Out, Sign-In, Periodic Audit). Write app.js handler: set `appState.keyPlateSubType`, load correct `CHECKLISTS['key-plate'][subType]` array into `appState.checklist`, navigate to `#checklist-view`. Depends on: tasks 6, 10. Scope: index.html, app.js, ~50 lines.
   17. **PDI Compliance Review screen** — Write HTML for a dedicated `#pdi-compliance-view` screen (date input for vehicle arrival date, calculated status display: ON TIME / DAY 1 OVERDUE / DAY 2+ OVERDUE CRITICAL). Write app.js logic: calculate days since arrival date, display status with appropriate color class. Wire into checklist flow as a pre-checklist screen when audit type is 'pdi-compliance'. Depends on: tasks 8, 10. Scope: index.html, app.js, ~70 lines.
   18. **End-to-end integration test** — Open `index.html` in a mobile browser or mobile simulator. Execute all 4 audit type flows completely: (a) Vehicle Audit for each of 5 categories, answering at least one NO per flow; (b) Morning Lot Walk, all 15 items; (c) PDI Compliance Review; (d) Key/Plate Accountability for all 3 sub-types. Verify task list generation, share output format, offline resume (close tab mid-audit, reopen, confirm resume). Document any failures and fix. Depends on: tasks 1–17. Scope: no new files; test and patch.

8. **Constraints from Requirements.** Non-negotiable constraints from Section 6 of `app-spec/lot-checklist-app-requirements.md`:

   | # | Constraint | Code-Level Mechanism | What Breaks if Violated |
   |---|---|---|---|
   | 1 | **Checklist fidelity** — item text and Failure Action text must match source files exactly, no rewording | `data.js` is populated by copying text verbatim from source checklist files; no text transformation functions allowed in the rendering pipeline | Users see incorrect instructions; compliance failures go unaddressed because actions are vague |
   | 2 | **Offline-first** — app must function without internet during lot walk | All checklist content in `data.js` (bundled, no fetch calls for content); localStorage for all session data; no CDN dependencies in production | App fails mid-walk when WiFi drops; data loss on audit records |
   | 3 | **Zero ambiguity in decision trees** (Phase 2) | Every tree path terminates in a defined action node; no catch-all "see manager" leaves | User reaches a dead end in a Phase 2 Decision Guide; compliance action undefined |
   | 4 | **Key Cafe not replaced** | App has no key/plate custody tracking, no sign-out records, no plate location data; Key/Plate checklist is display-only | Parallel tracking system conflicts with Key Cafe; custody records become unreliable |
   | 5 | **No customer-facing features** | No public routes, no customer login flow, no customer data fields in any screen | Customer data exposed; privacy/legal risk |
   | 6 | **Binary responses enforced** — YES or NO only, no free text, no N/A | NO free-text `<input>` or `<textarea>` on any checklist screen; only YES button, NO button, Done button, Needs Follow-Up button exist in the checklist flow; these four are the only interactive elements in the flow | Users skip or partially document failures; accountability trail is broken |
   | 7 | **Exact Failure Action text** — role, channel, SAY script shown verbatim | `failureAction` object values are rendered with a template string that outputs each field label + value; no string transformation on `failureAction.say` | Staff receive edited/summarized instructions; wrong person contacted, wrong channel used, wrong script delivered |

### Output Specification

**File to create:** `lot-checklist-app/implementation-plan.md`
**Format:** Markdown
**Required sections in order:** Technology Decisions, File Structure, Checklist Data Architecture, State Management, Screen Routing, Offline Resume Logic, Build Sequence (numbered list 1–18), Constraints

---

## STEP 4 — SUCCESS CRITERIA

Verify each item before proceeding to Step 5:

- [ ] Technology choices are explicit (not "consider using") — each has a stated justification
- [ ] File structure lists every file the app will consist of (`index.html`, `styles.css`, `app.js`, `data.js`)
- [ ] Checklist data key structure is documented with exact key strings: `CHECKLISTS['vehicle-audit']['NEW']`, `CHECKLISTS['morning-lot-walk']`, `CHECKLISTS['key-plate']['sign-out']`, `CHECKLISTS['key-plate']['sign-in']`, `CHECKLISTS['key-plate']['periodic-audit']`
- [ ] State Management section defines the `appState` object with all fields
- [ ] localStorage key name is explicit: `lot-checklist-app-session-in-progress`
- [ ] Screen Routing section lists all 9 screen IDs as exact HTML `id` attribute strings
- [ ] Offline Resume Logic section specifies the exact algorithm (JSON.parse, corrupt-data fallback, Resume vs. Start Fresh paths)
- [ ] Build Sequence has at minimum 15 numbered tasks (this spec has 18)
- [ ] Constraints section covers all 7 constraints from Section 6 of requirements doc
- [ ] No external CDN dependencies listed anywhere in the plan
- [ ] No Phase 2 features included in the build sequence

---

## STEP 5 — POST-EXECUTION

After all success criteria pass, update `lot-checklist-app/state.json` in a single Write operation:
- `prompts.03.status` → `"complete"`
- `prompts.03.completed_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- (Do NOT change `overall_status` — other prompts in Parallel Group A may still be running)

Then tell the user:
> "**Prompt 03 complete.**
> Created: `lot-checklist-app/implementation-plan.md`
>
> **Next steps:**
> You can now send prompts 01 and 02 simultaneously in separate chats, or if they are already running, this output will be consumed by prompt 04 once all three complete.
> After prompts 01, 02, and 03 all show `complete` in `lot-checklist-app/state.json`, send `lot-checklist-app/04-build-sequence-generator.md`."
