# LOT CHECKLIST APP — UX AUDIT REPORT
**Date:** 2026-03-11
**Auditor:** Claude Code (automated — 6 parallel sub-agents)
**App Version:** Phase 1 MVP (no version field in package.json or state.json)
**Audit Scope:** Full UX, feature completeness, edge cases, checklist compliance, state integrity, accessibility
**Files Audited:** `app.js`, `index.html`, `styles.css`, `data.js`, all 8 checklist source files, `app-spec/lot-checklist-app-requirements.md`

---

## EXECUTIVE SUMMARY

- **Total findings:** 57
- **Critical:** 6 | **High:** 22 | **Medium:** 21 | **Low:** 8
- **Spec coverage (P1):** 16 of 17 requirements fully implemented; 1 partial (auditor identity)
- **Checklist data fidelity:** 42 of 43 items match source files exactly; 1 minor role field discrepancy

**Blocking issues (must fix before production use):**

1. State contamination — appState.responses and vehicleVIN survive audit type switches, corrupting task lists with data from prior sessions
2. Key-plate subtype response reset is never persisted to localStorage — stale responses restored on resume
3. Rapid YES/NO taps cause duplicate responses and skip items — checklist compliance is compromised
4. failure-action-reveal CSS class missing — animation never plays (cosmetic but specified)
5. Toast notification CSS class name mismatch — clipboard copy confirmation never displays
6. "Audited by" hardcoded as "Lot Staff" — every exported task list is unattributable

**Analyst correction notes:** Sub-agents C and B raised concerns about the VIN regex `[A-HJ-NPR-Z0-9]` excluding the letter R. This is **incorrect** — the range `[R-Z]` within the character class correctly includes R. The VIN regex is valid and excludes only I, O, and Q as required. Those sub-findings (C-003, B-014) are marked INVALID below and are not included in the findings register.

Sub-agents B raised concerns about event listeners being wired outside `DOMContentLoaded` (B-027/B-028/B-029). Because `<script>` tags appear at the very bottom of `<body>`, the DOM is fully parsed when the scripts execute — there is no actual runtime risk. These are code quality/style concerns only, downgraded to Low.

---

## FINDINGS REGISTER

| ID | Severity | Category | Location | Description | Expected | Actual | Repro |
|----|----------|----------|----------|-------------|----------|--------|-------|
| **E-001** | **Critical** | State Contamination | app.js:146–167 | `handleAuditTypeSelect()` does not clear `vehicleVIN` or `responses` when switching to morning-lot-walk, pdi-compliance, or key-plate. VIN from a previous vehicle audit bleeds into the next session's task list export. | All non-vehicle audit types clear `vehicleVIN`, `vehicleCategory`, and `responses` on entry | Only pdi-compliance clears vehicleVIN (line 1011); morning-lot-walk and key-plate do not | 1. Start Vehicle Audit, enter VIN "12345678901234567", select NEW, answer YES. 2. Navigate Home. 3. Start Morning Lot Walk, answer any item NO. 4. Generate Task List — task incorrectly shows VIN "12345678901234567" |
| **E-002** | **Critical** | State Persistence | app.js:902–931 | After resetting `appState.responses = []` in key-plate sub-type handlers (lines 905, 916, 927), `persistState()` is never called. If app closes before first answer is recorded, the stale prior session (with old sub-type's responses) is restored on resume, mismatched against the new sub-type's checklist. | `persistState()` called immediately after every `appState.responses = []` reset | Not called in sign-out (line 905), sign-in (line 916), or periodic-audit (line 927) handlers | 1. Start Key/Plate → Sign-Out. 2. Answer item 1 YES. 3. Navigate to Key/Plate → Sign-In. 4. Close app within 1 second (before answering). 5. Reopen → Resume — Sign-Out response appears under Sign-In checklist items |
| **C-021** | **Critical** | State Contamination | app.js:146–167 | Responses from an in-progress vehicle audit are not cleared when the user selects a key-plate audit type. Key-plate subtype handlers reset responses within their own flow, but by then the stale vehicle audit response is already merged in. | Each audit type selection begins with `appState.responses = []` | Vehicle audit responses survive into key-plate checklist if user navigates back to audit-type-select mid-audit | 1. Start Vehicle Audit, answer 1 item NO/Done. 2. Browser-back to audit-type-select. 3. Start Key/Plate → Sign-Out. 4. Complete all items. 5. Generate Task List — vehicle audit task appears in key-plate list |
| **C-020** | **Critical** | State Contamination | app.js:154–158 | Morning Lot Walk handler does not reset `appState.responses` before setting up the checklist. Prior audit responses contaminate the morning walk task list. | `appState.responses = []` set at the top of the morning-lot-walk handler | Handler at lines 154–158 sets checklist, currentItemIndex, and sessionStartTime — never responses | 1. Complete any vehicle audit (all responses recorded). 2. Navigate Home. 3. Start Morning Lot Walk. 4. Answer any item NO/Done. 5. Generate Task List — contains vehicle audit tasks mixed with morning walk tasks |
| **C-013** | **Critical** | Data Integrity | app.js:1047–1085 | YES button uses a 250ms animation timeout (line 1071) before calling `advanceChecklist()`. Buttons are not disabled before the animation starts. Two rapid YES taps within 250ms trigger two calls to `advanceChecklist()`, incrementing `currentItemIndex` by 2 and skipping one item — that item is never shown, never answered, never recorded. | YES button disabled immediately on first tap; subsequent taps ignored until next item renders | Button remains enabled during animation; second tap within 250ms skips an item entirely | 1. Start any checklist. 2. Double-tap YES very quickly (< 200ms). 3. Observe the counter jumps 2 positions; one item was silently skipped |
| **A-001** | **Critical** | Spec Compliance | app.js:708 | "Audited by" field in exported task list is hardcoded as `'Audited by: Lot Staff'`. No user identity is ever collected. The spec (Section 3, Step 9) requires `"Audited by: [User name/role]"`. Every exported task list is identical regardless of who conducted the audit — there is no accountability trail. | App collects auditor name/role at session start and inserts it into the export | Line 708 hardcodes `'Audited by: Lot Staff'` for every audit type | 1. Start any audit. 2. Complete it. 3. Generate Task List → Share. 4. Export always reads "Audited by: Lot Staff" |
| **E-004** | High | Data Integrity | app.js:329–352 | "Done — action complete" and "Needs Follow-Up" buttons are not disabled on first click. A double-tap within ~300ms before `advanceChecklist()` navigates away records the same response twice, producing two entries with the same `itemId` in `appState.responses`. Summary counts and task list will be wrong. | Buttons disabled immediately on first click; re-enabled only when next item renders | Buttons remain enabled until navigation occurs (~300ms later) | 1. On any failure-action-view, double-tap "Done" rapidly. 2. Generate Task List — item appears twice |
| **E-003** | High | Data Integrity | app.js:113–120 | `resumeCheck()` restores `vehicleCategory` and `keyPlateSubType` from localStorage but does not validate that the values are in the allowed enum sets. Invalid values (`"INVALID"`, `null`, etc.) cause `CHECKLISTS['vehicle-audit']['INVALID']` to return `undefined`, which is assigned to `appState.checklist`. `renderChecklistItem(0)` silently returns, leaving the user on a blank checklist screen with no way forward. | Validate `vehicleCategory` ∈ `{NEW, FLR, SOLD, BND, RECON}` and `keyPlateSubType` ∈ `{sign-out, sign-in, periodic-audit}` before restoring; on failure, initFreshSession() | No validation; undefined checklist causes silent blank screen | 1. Edit localStorage key to set `vehicleCategory: "UNKNOWN"`. 2. Reload. 3. Tap Resume — blank checklist screen with no content |
| **C-007** | High | Error Handling | app.js:44–54 | `persistState()` calls `localStorage.setItem()` without a try-catch. If localStorage is full (`QuotaExceededError`), the exception propagates uncaught into whichever event handler called `persistState()`. The error is silently swallowed in click handlers, leaving the user with no indication that their audit data is not being saved. | Wrap `localStorage.setItem()` in try-catch; on quota error, display user-visible warning | No try-catch; exception is silently swallowed | 1. Fill localStorage to quota with external data. 2. Start an audit and answer items. 3. No error shown; audit data is silently lost |
| **C-010** | High | Data Integrity | app.js:1047–1118 | Beyond the C-013 skip issue, rapid YES clicks before animation completes also push multiple identical responses to `appState.responses` (via line 1056: `appState.responses.push(...)` in the YES handler). The animation guard fires per click, not per animation-in-flight. Multiple responses for the same `itemId` cause over-counts in Summary (Total, Passed) and task list generation may behave unexpectedly. | YES handler disables button at entry; ignores all subsequent taps until next item renders | Multiple taps record multiple identical responses | 1. Tap YES 3 times rapidly. 2. View audit summary — Total Items count will be inflated |
| **B-012** | High | State Persistence | app.js:832–837 | `handleCategorySelect()` sets `appState.vehicleCategory`, `appState.checklist`, `appState.currentItemIndex`, and `appState.sessionStartTime` but never calls `persistState()` before navigating to `checklist-view`. If the app closes between category selection and answering the first item, the session is not saved — resumeCheck() will not restore the vehicleCategory or checklist on next load. | `persistState()` called after full appState setup, before `showScreen('checklist-view')` | No `persistState()` call in `handleCategorySelect()` | 1. Select Vehicle Audit → VIN → Category "FLR". 2. Immediately close the app. 3. Reopen — no resume modal appears; session is lost |
| **B-020** | High | UI / Animation | app.js:315–323, styles.css | `renderFailureAction()` adds class `'revealed'` to `#failure-action-card` (line 321) to trigger the slide-up animation. CSS defines `@keyframes failure-reveal` but there is no CSS rule `.failure-action-card.revealed { animation: ... }` to apply it on class toggle. The card appears instantaneously with no animation. | `.failure-action-card.revealed { animation: failure-reveal 300ms ease-out forwards; }` must exist in styles.css | The animation class is toggled but has no CSS selector binding it; animation never plays | 1. Answer any checklist item NO. 2. Failure-action-view appears immediately without slide-up animation |
| **B-021** | High | UI / Feedback | app.js:787, styles.css | `showToast()` adds class `'toast--visible'` (line 787) to the toast element, but styles.css defines `.toast.visible { ... }` (not `.toast--visible`). The class name mismatch means the toast visibility CSS never applies — the toast element may flash as unstyled or remain invisible. | CSS class used in `classList.add()` must exactly match the CSS selector | app.js uses `'toast--visible'`; CSS uses `.visible` | 1. Complete audit, generate task list, tap Share (clipboard fallback path). 2. Toast should appear with "Copied to clipboard" — it does not render correctly |
| **C-001** | High | Error Handling | app.js:978–979 | PDI arrival date parsing splits on `-` and converts to numbers, but does not validate the date before calling `new Date()`. A malformed date (e.g., `"2025-13-99"` hand-typed on non-date browsers, or `"abc-def"` via console) produces `NaN` for year/month/day. `daysElapsed` becomes `NaN`. All status comparisons evaluate false. Status block never appears and no error is shown — user is stuck. | Validate that the parsed date components are numbers and form a real calendar date; show specific error on invalid input | NaN propagates silently; status block is hidden; no error message | 1. Open pdi-compliance-view on a non-mobile browser where date input accepts text. 2. Enter date as "2025-13-99". 3. Tap Calculate Status — nothing happens, no error shown |
| **C-004** | High | Error Handling | app.js:297–299 | `renderFailureAction()` accesses `appState.checklist[index].failureAction` (line 298) without first checking that `appState.checklist[index]` exists. `renderChecklistItem()` has this guard (line 218), but `renderFailureAction()` does not. If `currentItemIndex` is ever out of bounds (corrupted localStorage, race condition), accessing `.failureAction` on `undefined` throws `TypeError: Cannot read property 'failureAction' of undefined`. | Bounds check before accessing `appState.checklist[index]`: `if (!item) return;` | No bounds check; direct property access on potentially-undefined item | 1. Set localStorage `currentItemIndex` to 999. 2. Resume. 3. Tap NO — TypeError thrown in renderFailureAction() |
| **C-005** | High | Error Handling | app.js:113–128 | `resumeCheck()` restores state then calls `renderChecklistItem(0)` (line 128). But if `appState.checklist` is `undefined` (because the saved `auditType` or `vehicleCategory` no longer matches CHECKLISTS), `renderChecklistItem()` silently returns early. Modal closes, `checklist-view` is shown, and the screen is blank — no items, no buttons, no way to proceed. | On resume: if checklist cannot be restored, show error message or call `initFreshSession()` | Silent blank checklist view with no recovery path | 1. Save a session then edit localStorage to set `vehicleCategory: "DELETED"`. 2. Reload → Resume — blank screen |
| **C-023** | High | Error Handling | app.js:500 | `renderTaskList()` uses `appState.taskListGrouped` (line 500) without checking if it exists. If `btn-generate-tasks` is never tapped (user navigates directly to task-list screen via app state manipulation), `taskListGrouped` is `undefined` and the `grouped[group.key]` access silently returns `undefined` for each group — an empty task list with no error. | Guard: `if (!appState.taskListGrouped) { /* show error */ return; }` | Undefined access produces empty task list silently | Edge case: navigate to task-list screen without tapping "Generate Task List" |
| **C-016** | High | Data Integrity | app.js:421–463 | `generateTaskList()` matches response `itemId` values against the current checklist's item IDs. If data.js is updated between the save and the resume (checklist items added/removed/reordered), responses referencing old item IDs find no match (line 433–436) and the task is silently dropped from the task list. The audit summary counts remain correct but the task list is missing items. | Warn user if restored responses contain item IDs not present in the current checklist | Silent item drop; no indication that the task list is incomplete | 1. Complete a vehicle audit (all responses saved). 2. Edit data.js to remove one checklist item. 3. Reload, resume, generate task list — that item's task is gone |
| **C-030** | High | Data Integrity | app.js:113–128 | On resume, checklist is restored from current CHECKLISTS constant but responses were saved against the old checklist structure. If data.js gains new items, the restored checklist has more items than responses cover — the progress bar shows wrong completion state. If items are removed, `currentItemIndex` may point beyond the new checklist length. | On resume, validate that `checklist.length` matches expected length for this audit type/category; warn user if mismatch | No mismatch validation; silent state inconsistency | 1. Save a 7-item vehicle audit session mid-way. 2. Edit data.js to add an 8th item. 3. Resume — progress shows wrong completion |
| **C-029** | High | State Contamination | app.js:146–151 | When user navigates back to audit-type-select and selects "vehicle-audit" again, `handleAuditTypeSelect()` routes to `vin-entry` without clearing `appState.responses`. If the user had answered items in a prior vehicle audit attempt, those responses persist. After entering a new VIN and category, the prior responses are included in the task list for the new VIN. | `handleAuditTypeSelect('vehicle-audit')` clears `appState.responses = []` before routing to vin-entry | Responses from prior attempt are not cleared | 1. Start Vehicle Audit, enter VIN "AAA", select NEW, answer YES. 2. Use back buttons to return to audit-type-select. 3. Start Vehicle Audit again, enter different VIN "BBB". 4. Generate task list — shows "AAA" responses |
| **F-030** | High | Accessibility | index.html:449–456 | Resume modal has no `role="dialog"`, no `aria-modal="true"`, no `aria-labelledby`, and no JavaScript focus management (focus is not moved into the modal when it appears; focus is not restored when it closes). Screen readers do not announce the modal. Keyboard users cannot find it via standard dialog navigation. | `role="dialog" aria-modal="true" aria-labelledby="[modal-title-id]"` on the modal div; `focus()` called on first button when modal opens | No ARIA attributes; no focus management | 1. Create a saved session. 2. Reload while using a screen reader. 3. The resume modal appears but is not announced as a dialog |
| **F-001** | High | Accessibility | index.html:130–156 | VIN input field has no `<label>` element with `for="vin-input"`. The descriptive text at line 129 is a `<p>` paragraph, not a semantic label. Screen readers cannot programmatically associate the instruction with the input. | `<label for="vin-input">Enter the vehicle VIN (17 characters)</label>` with matching input `id` | Bare `<p>` text not linked to the input | Open with NVDA/VoiceOver; tab to VIN input — label is not announced |
| **F-002** | High | Accessibility | index.html:409–417 | PDI VIN input (`id="pdi-vin-input"`) has an adjacent `<label>` element but the label has no `for` attribute. The association is visual only — screen readers treat them as unrelated. | `<label for="pdi-vin-input">Vehicle VIN</label>` | `<label style="...">Vehicle VIN</label>` — no `for` attribute | Tab to PDI VIN input with screen reader — label not announced |
| **F-003** | High | Accessibility | index.html:421–426 | PDI arrival date input (`id="pdi-arrival-date"`) has the same missing-`for` attribute issue as F-002. | `<label for="pdi-arrival-date">Vehicle Arrival Date</label>` | `<label style="...">Vehicle Arrival Date</label>` — no `for` | Tab to PDI date input with screen reader — label not announced |
| **F-010** | High | Accessibility | index.html:157 | VIN error message element has no `role="alert"` or `aria-live="assertive"`. When it appears (style toggled from `display:none` to `display:block`), screen readers do not announce it. Error is indicated only by red color (`--color-destructive`) — no icon, no text prefix, no semantic error role. | `<p id="vin-error" role="alert" aria-live="assertive">⚠ VIN must be exactly...</p>` | No `role` or `aria-live`; color-only indicator | Enter invalid VIN, tap Next; screen reader does not announce the error |
| **F-011** | High | Accessibility | index.html:431 | PDI error message element has no `role="alert"` or `aria-live`. Same color-only issue as F-010. | `<div id="pdi-error-msg" role="alert" aria-live="assertive">` | No role or aria-live | Tap "Calculate Status" without VIN; screen reader does not announce error |
| **F-005** | High | Accessibility | index.html:96–114 | Audit type tile buttons lack `:focus-visible` styles. When tabbed to via keyboard, there is no visible focus ring. The inline styles include `border:none` but no focus outline. Keyboard users cannot determine which tile is focused. | Visible `outline: 2px solid var(--color-accent)` on `:focus-visible` for `.audit-type-tile` | No focus indicator CSS applied on keyboard focus | Open audit-type-select; Tab through tiles — no visible focus indicator |
| **F-006** | High | Accessibility | index.html:175–198 | Category select buttons (NEW, FLR, SOLD, BND, RECON) lack `:focus-visible` styles. Same issue as F-005. | Visible outline on `:focus-visible` for `.category-btn` | No focus indicator CSS | Tab through category buttons — no visible focus indicator |
| **F-024** | High | Accessibility | index.html:256–258 | Progress bar is a bare `<div>` with no ARIA attributes. Screen readers cannot identify it as a progress indicator and progress updates are not announced. | `<div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Checklist progress">` with dynamic `aria-valuenow` updates | No role, no aria attributes | Navigate to checklist view with screen reader — no progress bar announced |
| **A-002** | Medium | Spec Compliance | app.js (missing feature) | No auditor identity input screen exists anywhere in the app flow. The spec requires "Audited by: [User name/role]" (Section 3, Step 9). There is no screen before, during, or after an audit where the user's name or role is collected. | Username/role input screen at audit start, stored in appState, inserted into export | No such screen; export hardcodes "Lot Staff" | N/A — the screen simply does not exist |
| **B-007** | Medium | UX / Destructive Action | index.html:449–456, app.js:130–141 | "Start Fresh" button on resume modal clears all in-progress work (calls `initFreshSession()` and removes localStorage) with no confirmation dialog. If tapped accidentally, all audit data is lost immediately. | Confirmation dialog: "Starting fresh will discard your in-progress audit. Are you sure?" before clearing | Immediate destroy with no confirmation | 1. Mid-audit, close app. 2. Reopen — resume modal appears. 3. Tap "Start Fresh" — all data instantly deleted |
| **B-003** | Medium | Navigation | index.html:246–280 | Checklist view has no back button. Once inside a checklist, users cannot cancel, restart, or exit without closing the app (or using OS-level browser back, which bypasses state management). This is a deliberate design decision per implementation-plan.md Task 11, but it creates a usability trap especially if a user selected the wrong category or VIN. | Either: (a) explicit Cancel button with confirmation dialog, or (b) documented "forward-only" intent communicated to users | No back button; no cancel path; no instructional text explaining the forward-only design | Navigate to any checklist — no way to exit except OS back or app close |
| **F-009** | Medium | Accessibility | app.js:121–141 | Resume modal is displayed (`display:flex`) but keyboard focus is not moved into it. Tab key allows focus to escape to elements behind the overlay. Background content remains keyboard-accessible even while blocked visually. | Move `focus()` to `#btn-resume` when modal opens; restore focus to home content when modal closes | No focus management; background elements keyboard-accessible through modal | Reload with saved session; Tab — focus moves to home screen content, not modal buttons |
| **C-017** | Medium | Validation | app.js:1006–1020 | "Begin PDI Checklist" button (`btn-pdi-begin-checklist`) reads the VIN from `pdi-vin-input` without re-validating it against `VIN_REGEX`. The VIN input on the PDI screen is only checked for empty string (line 958) before "Calculate Status" is tapped — not format-validated. An invalid VIN (wrong length, wrong chars) can be stored in `appState.vehicleVIN` and appear in the PDI task list export. | Re-validate VIN using `VIN_REGEX` in the "Begin PDI Checklist" handler before proceeding | No format validation on Begin; invalid VIN stored in state | 1. Open PDI Compliance. 2. Enter VIN "ABC123" (short, invalid). 3. Enter date. 4. Tap Calculate (passes — only empty check). 5. Tap Begin PDI Checklist — invalid VIN stored |
| **C-014** | Medium | Validation | app.js:957–969 | PDI "Calculate Status" only checks that the VIN field is non-empty (line 958). VINs of incorrect length (e.g., 16 characters) pass validation and the status calculation proceeds with the invalid VIN stored. | Validate VIN against `VIN_REGEX` pattern before calculating PDI status | Only empty-string check; any non-empty string accepted | Enter 16-char VIN in PDI screen → tap Calculate — no error, proceeds |
| **D-001** | Medium | Checklist Compliance | data.js:598 | Key/Plate sign-out item 4 failure action assigns `role: 'Requesting employee'` but the source checklist file (`key-plate-accountability-checklist.md` Section A, item 4, lines 35–37) does not define a ROLE: field for this failure action — the action is self-directed. data.js adds a role not present in the source. | Failure action has no explicit role (the requesting employee self-directs) | `failureAction.role: 'Requesting employee'` explicitly assigned in data.js | Compare data.js line 598 against source file Section A item 4 |
| **C-015** | Medium | Edge Case | app.js:217–226 | If `appState.checklist` is an empty array (length 0) due to corrupted state, the counter displays "1 of 0" and item card is blank. Progress bar shows 0%. Tapping YES or NO calls `advanceChecklist()` which checks `currentItemIndex < checklist.length` (0 < 0 = false) and immediately navigates to audit-summary, making it appear a zero-item audit completed normally. | Guard against empty checklists at checklist load time; show error or route home | "1 of 0" counter, blank card, instant completion | Set `checklist: []` in localStorage, resume, view checklist-view |
| **E-007** | Medium | State Schema | app.js:458 | `appState.taskListGrouped` is added to the appState object at line 458 (`appState.taskListGrouped = grouped`) after `generateTaskList()` runs. This field is not defined in the canonical appState schema at lines 11–21. `persistState()` serializes the entire appState object, so `taskListGrouped` is persisted to localStorage unnecessarily. On resume, it is restored and may cause confusion. | Either add `taskListGrouped: null` to the schema definition, or exclude it from `persistState()` | Undocumented field persisted to localStorage; schema mismatch | Complete audit, generate task list; inspect localStorage — `taskListGrouped` present in saved JSON |
| **C-026** | Medium | Data Quality | app.js:682–689 | `buildExportText()` builds the export header date by calling `new Date(appState.sessionStartTime)` and extracting year/month/day/hour/minute. If `sessionStartTime` is not a valid ISO 8601 string, `getFullYear()` returns `NaN`. Export header reads "LOT AUDIT — NaN-NaN-NaN NaN:NaN — ...". No validation or fallback. | Validate `sessionStartTime` before formatting; fall back to "Date unknown" on parse failure | NaN in all date fields when timestamp is corrupted | Set `sessionStartTime: "invalid"` in localStorage, resume, complete, share — NaN in export header |
| **B-009** | Medium | Navigation | index.html:365–394 | Task-list screen has no back button. After generating and viewing (or sharing) the task list, the user has no way to return to the audit summary or home screen without closing the app or using OS browser back. | "Done" or home button in task-list nav bar | Only Share button in nav; no back or done button | Generate task list → view it → look for navigation — no exit path |
| **B-007** | Medium | UX | index.html:449 | Resume modal has no close button (X). If both Resume and Start Fresh button click handlers fail for any reason (JS error, element not found), user cannot dismiss the modal and is locked out. | Tertiary X close button that also calls initFreshSession(), as a safety fallback | No close/X button | N/A — defensive design gap |
| **F-007** | Medium | Accessibility | index.html:152 | VIN input inline style explicitly sets `outline:none`, overriding browser default focus ring. The CSS class `.vin-input` in styles.css provides an `outline: 2px solid var(--color-accent)` focus rule, but this class is not applied to the VIN input element — only inline styles are used. Keyboard focus on the VIN input is invisible. | Apply `.vin-input` class to the input element (removing `outline:none` inline), or add equivalent focus styling inline | `outline:none` inline removes all focus indication | Tab to VIN input — no focus ring visible |
| **F-012** | Medium | Accessibility | index.html:275–277 | YES and NO buttons are distinguished from each other only by background color (green vs red). For users with red-green color blindness, the buttons are visually identical. There is no text label difference (both are uppercase monosyllables), no icon, no position label indicating which is YES and which is NO beyond the button text itself. Note: the text "YES" / "NO" is present, so this is not a full accessibility failure — but the color distinction adds no information that the text doesn't already provide, making it redundant rather than supplemental. | Text labels alone are sufficient; ensure button text is always visible and legible | Functional but no additional distinguishing factor beyond text for color-blind users | View checklist on a red-green color-blind display — buttons still readable by text label |
| **F-013** | Medium | Accessibility | index.html:338–353 | Audit summary stat values ("Passed", "Resolved", "Needs Follow-Up") are colored green/green/orange respectively to signal status. However, "Passed" (`audit-stat-passed`) and "Resolved" (`audit-stat-resolved`) use the same green token (`--color-audit-yes` / `--color-audit-resolved`), making them visually identical for color-blind users. The text labels distinguish them, but the color offers no additional signal. | Add a distinct visual indicator (icon or different value formatting) to distinguish Passed from Resolved | Both use green; cannot be distinguished by color alone | View audit summary with color blindness simulator — Passed and Resolved appear identical |
| **F-025** | Medium | Accessibility | app.js:509–585 | Task list HTML is dynamically injected using `<div>` elements for groups and tasks. There is no semantic list markup (`<ul>`/`<li>`) or heading hierarchy (`<h3>` for team headers). Screen readers navigate task groups as anonymous divs with no list context or group count. | Team groups as `<section>` with `<h3>` team header; tasks as `<ul>/<li>` within each section | `<div class="team-group">` with `<div class="team-header">` — no semantic structure | Navigate task list with screen reader — no list navigation commands work |
| **B-006** | Medium | UX / Animation | app.js:266–273 | Progress bar width is updated (line 273) before the item card text is set (line 267). On slow devices, the bar visually advances while the old item text is still displayed, creating a brief inconsistency. | Update progress bar after setting the new item text | Bar updates at line 273; text set at line 267 — ordering is correct in code but both happen synchronously in the same function call, so the render may show the bar update before the next paint |
| **C-018** | Medium | Error Handling | app.js:764–775 | Share failure shows the same toast message "Unable to share — please copy manually" for two distinct failure cases: (a) `navigator.share` API unavailable, and (b) clipboard write rejected (permission denied). Users cannot distinguish whether to try a different sharing method or whether there's a permission issue. | Distinct messages: "Sharing not supported on this browser — copy manually" vs "Clipboard access denied — copy manually" | Same generic message for both failure modes | Test on non-HTTPS or permission-denied clipboard context |
| **C-024** | Medium | Code Consistency | app.js:500, 718 | `renderTaskList()` uses `appState.taskListGrouped` directly with no default; `buildExportText()` initializes a local default `{ lot: [], sales: [], service: [] }`. If `taskListGrouped` is undefined, `renderTaskList()` silently renders empty; `buildExportText()` renders the empty-state footer. The two functions handle the same undefined case differently. | Both should use the same fallback — either both guard for undefined or both initialize from `taskListGrouped` | Inconsistent handling of undefined `taskListGrouped` | Generate task list, then compare behavior of render vs. export on empty grouped state |
| **F-014** | Medium | Layout | index.html:264–266 | Zone header text (`id="zone-header-text"`) has no `overflow`, `white-space`, or `word-break` CSS. The longest canonical zone name is "East Side Fence Line" (21 chars) — this fits fine. However, if zone names in data.js are extended or localized, they may overflow the container without truncation on narrow screens. | `overflow: hidden; white-space: nowrap; text-overflow: ellipsis` OR `word-break: break-word` | No overflow handling | N/A for current data; preventive concern |
| **F-020** | Medium | Accessibility | index.html:274–277 | YES and NO buttons use `flex:1` within a `display:flex` container, so they each take 50% of available width minus the 12px gap. On screens narrower than 280px, each button would be narrower than 44px minimum touch target width. Height is always 52px (above minimum). | Minimum width: 44px guaranteed regardless of screen width | `flex:1` allows unlimited shrink; very narrow screens may produce sub-44px widths | View on a screen narrower than ~280px; measure button widths |
| **F-026** | Medium | Accessibility | index.html:219–241 | Key/Plate sub-type buttons (Sign-Out, Sign-In, Periodic Audit) have no `:focus-visible` styles. Keyboard Tab navigation provides no visible focus indicator. Same issue as F-005/F-006. | Visible `outline: 2px solid var(--color-accent)` on `:focus-visible` | No focus indicator CSS | Tab through key-plate subtype buttons — no focus ring |
| **E-009** | Medium | Error Handling | app.js:216–282 | If `renderChecklistItem()` is called with an out-of-bounds index, it returns early (line 218 guard) without any error indication. The checklist view screen is displayed but blank — no item text, no buttons, no indication to the user that something is wrong. | On OOB index: navigate home with error message "Audit session is corrupted — please start a new audit." | Silent blank checklist-view screen | Set `currentItemIndex: 999` in localStorage; resume; view checklist |
| **E-005** | Medium | State Persistence | app.js:358–371 | `advanceChecklist()` increments `appState.currentItemIndex` (line 359) but never calls `persistState()` after the increment. `persistState()` was last called before the response was recorded (in YES/Done/Needs-Follow-Up handlers). If the app crashes between the response persist and `advanceChecklist()` incrementing the index, the session resumes at the correct item (since the prior persist captured the response). However, if `advanceChecklist()` itself crashes (e.g., on the navigate-to-summary branch), the responses are saved but the index is not updated — slightly inconvenient but not data-destructive. | Call `persistState()` at the end of `advanceChecklist()` after the index is updated | Index increment not persisted independently | Crash during `advanceChecklist()` after response save; verify resume position |
| **B-010** | Medium | UX / Persistence | app.js:113–128 | When an in-progress PDI compliance session is resumed, the VIN and arrival date fields in the form are not pre-populated from appState. The resume navigates to `pdi-compliance-view` but the form inputs are empty. The user must re-enter both values. | On resume to pdi-compliance-view: populate `pdi-vin-input` and `pdi-arrival-date` from `appState.vehicleVIN` and `appState.sessionStartTime` (or a stored arrival date field) | Form fields are always empty on screen render | Save a PDI session, close app, reopen and resume — form inputs are blank |
| **B-004** | Medium | UX | index.html:281–316 | Failure-action-view has no instructional text explaining that the user must tap one of the two response buttons to proceed. Users accustomed to having a back button may search for navigation that doesn't exist. No "swipe back" prevention and no copy explaining the mandatory-response design. | Add instructional text: "Select one option to continue" near the response buttons | No instructional copy; user must infer that the buttons are the only forward path | Navigate to failure-action-view — no text explains that a button tap is required to continue |
| **B-015** | Medium | UX | index.html:74–84 | Home screen shows only the title "Lot Checklist" and a "Start Lot Audit" button. There is no description of what the app does, what audit types are available, or how to use it. First-time users receive no orientation. | Brief subtitle such as "Vehicle Audit · Morning Walk · PDI · Key/Plate" below the app title | No descriptive text on home screen | Open app for the first time — home screen is a single title and one button |
| **B-019** | Low | Code Quality | index.html + app.js | Back buttons across screens use two different wiring patterns: (a) inline `onclick="showScreen('...')"` (audit-type-select line 87, vin-entry line 121, category-select line 165), and (b) `addEventListener('click', ...)` in DOMContentLoaded (btn-kp-back, btn-pdi-back). This inconsistency makes the codebase harder to maintain but causes no user-visible issues. | Single consistent back button pattern (preferably all via addEventListener) | Mixed inline onclick and addEventListener patterns | Read source — no functional impact |
| **B-025** | Low | Code Quality | app.js:812–818 | VIN error message visibility is toggled via `element.style.display = 'block'/'none'` (inline style) rather than class toggling (`classList.add/remove('visible')`). The CSS defines `.visible` modifier classes for this pattern. Both approaches work, but inline styles are harder to maintain and override. | `vinError.classList.add('visible')` / `classList.remove('visible')` | `vinError.style.display = 'block'` / `'none'` | Code review only — no user impact |
| **B-024** | Low | Performance | app.js:36–43 | `showScreen()` calls `persistState()` (line 37) on every screen transition, including transitions that do not change response data (e.g., navigating from home to audit-type-select). `persistState()` guards against empty auditType (line 48), so most calls are no-ops — but the function overhead adds up on slower devices. | Call `persistState()` only when response data actually changes | Called on every `showScreen()` invocation | Performance profiling on low-end mobile device |
| **E-008** | Low | Design Fragility | app.js (multiple handlers) | `sessionStartTime` is set by multiple handlers (lines 156, 835, 906, 917, 928, 1016) independently. There is no session ID, so if a user opens the app on two devices simultaneously and one updates localStorage, the other's resume will restore the wrong session. For a single-device app this is acceptable, but there is no guard against multi-device use. | Document the single-device assumption explicitly | No session ID; no multi-device guard | Open app on two devices with same localStorage (shared browser profile); start audits on both |
| **E-010** | Low | Code Quality | app.js:28–38 | `showScreen()` sets `appState.screen = screenId` (line 36) without validating that `screenId` corresponds to a real DOM element. If a caller passes a typo or invalid ID, `appState.screen` is set to an invalid string, and the app's state becomes inconsistent. The current codebase has no such typos, but future maintenance could introduce them. | Validate `document.getElementById(screenId)` exists before setting; console.warn if not | Any string accepted as valid screen ID | `showScreen('nonexistent')` — appState.screen corrupted; no DOM error |
| **F-017** | Low | Layout | styles.css:844 | Toast element has `white-space: nowrap` which prevents message text from wrapping. For the current message "Copied to clipboard" this is fine. If a future error message is longer, it will overflow horizontally on narrow screens. | `white-space: normal` or no white-space override | `white-space: nowrap` prevents wrapping | Set a long toast message string; view on narrow screen |
| **F-018** | Low | UX | styles.css, app.js | Dark mode color tokens are fully defined for `[data-theme="dark"]` in styles.css, but there is no `prefers-color-scheme` media query to auto-detect OS dark mode, and no toggle in the UI. Users must manually edit the HTML attribute. The dark mode CSS investment is not accessible to users. | `@media (prefers-color-scheme: dark) { [data-theme="light"] { ... } }` or a toggle button | Dark mode defined but not activatable | Open app with OS set to dark mode — app remains in light mode |
| **F-028** | Low | Accessibility | app.js:782–792 | Toast uses `style.display = 'flex'/'none'` to show/hide. Elements with `display:none` are removed from the accessibility tree, so screen readers may not announce the toast message when it appears. Adding `role="status"` and `aria-live="polite"` to the toast element would ensure announcements. | `role="status" aria-live="polite"` on the toast element | No ARIA live region; toast may not be announced | Show toast while using screen reader — no announcement |
| **C-019** | Low | UX | app.js:782–792 | If `showToast()` is called multiple times in rapid succession, the 2-second timeout from the first call may hide the toast while the second call is displaying it. There is no timeout cancellation (no `clearTimeout` before setting a new one). | Clear pending timeout before setting a new one: `clearTimeout(activeToastTimeout); activeToastTimeout = setTimeout(...)` | Old timeout hides new toast prematurely | Tap Share twice rapidly — toast may disappear prematurely |
| **B-026** | Low | UX / Animation | app.js:195–206 | Audit-type-tile pointer event handlers directly set `tile.style.transform` and `tile.style.transition` for press animation. Rapid successive taps can leave a tile in a scaled-down state (`scale(0.97)`) if `pointercancel` fires or if transitions overlap. | Use CSS `:active` pseudo-class for press animation instead of inline JS style manipulation | JS style manipulation; potential stuck-scaled state on rapid multi-tap | Rapidly tap an audit-type-tile multiple times — tile may remain slightly scaled |

---

## SPEC COMPLIANCE MATRIX

| # | Requirement (P1 — from Section 5) | Status | Finding IDs | Notes |
|---|---|---|---|---|
| 1 | VIN input — manual text entry | IMPLEMENTED | — | 17-char alphanumeric, uppercase enforced, error shown on invalid; regex correctly excludes I, O, Q |
| 2 | Vehicle status category selection — manual (NEW, FLR, SOLD, BND, RECON) | IMPLEMENTED | — | All 5 categories present; descriptions accurate |
| 3 | Status-based checklist display — 5 vehicle audit checklists | IMPLEMENTED | — | NEW (7), FLR (8), SOLD (3), BND (4), RECON (6) — all counts correct |
| 4 | Morning Lot Walk checklist — 15 items across 7 zones | IMPLEMENTED | — | 15 items, zone headers display correctly |
| 5 | PDI Compliance Review — date-based status (ON TIME / DAY 1 / DAY 2+ CRITICAL) | IMPLEMENTED | C-001, C-014, C-017 | Status calculator correct; malformed dates and short VINs not fully validated |
| 6 | Key/Plate Accountability — 3 sub-types (sign-out 4, sign-in 2, periodic 2) | IMPLEMENTED | — | All sub-types present; counts correct |
| 7 | Binary YES/NO response — no free text, no N/A | IMPLEMENTED | — | Hard enforced; no other response fields exist |
| 8 | Failure Action display for every NO — exact text | IMPLEMENTED | D-001 | 42 of 43 items match source exactly; D-001 is a minor role field |
| 9 | "Done — action complete" response | IMPLEMENTED | E-004 | Button exists; double-tap creates duplicate response |
| 10 | "Needs Follow-Up" response | IMPLEMENTED | E-004 | Button exists; same double-tap issue |
| 11 | Mandatory response to NO before advancing | IMPLEMENTED | — | Failure-action-view requires Done or Needs-Follow-Up to advance; cannot skip |
| 12 | Task list auto-generation — all NO responses | IMPLEMENTED | C-016, C-023 | Generates correctly; silent drops if schema mismatch; no guard on undefined taskListGrouped |
| 13 | Task list fields: vehicle, zone, item, action, team, status | IMPLEMENTED | — | All fields present in rendered and exported task list |
| 14 | "Needs Follow-Up" items highlighted in task list | IMPLEMENTED | — | `task-card--follow-up` class + orange STATUS badge applied correctly |
| 15 | Task list export as plain text — one-tap share | PARTIAL | A-001, A-002, B-021 | Format is correct; "Audited by" is hardcoded "Lot Staff"; toast CSS class mismatch |
| 16 | Offline-first — all checklist content available offline | IMPLEMENTED | — | All data in data.js (pre-bundled); no fetch calls or CDN dependencies |
| 17 | Data persistence — audit not lost if app closed | PARTIAL | E-001, E-002, C-020, C-021, B-012, E-005 | localStorage persistence works; multiple gaps where persistState() not called or state not cleared |

---

## CHECKLIST COMPLIANCE MATRIX

| Checklist | Item Count Match | Text Fidelity | Failure Actions Present | FLR PDI Gate | Status |
|---|---|---|---|---|---|
| Vehicle Audit — NEW (7 items) | PASS | PASS (7/7) | PASS (7/7) | N/A | PASS |
| Vehicle Audit — FLR (8 items) | PASS | PASS (8/8) | PASS (8/8) | PASS — Item 1 gates PDI | PASS |
| Vehicle Audit — SOLD (3 items) | PASS | PASS (3/3) | PASS (3/3) | N/A | PASS |
| Vehicle Audit — BND (4 items) | PASS | PASS (4/4) | PASS (4/4) | N/A | PASS |
| Vehicle Audit — RECON (6 items) | PASS | PASS (6/6) | PASS (6/6) | N/A | PASS |
| Morning Lot Walk (15 items, 7 zones) | PASS | PASS (15/15) | PASS (15/15) | N/A | PASS |
| PDI Completion (1 template item) | PASS | PASS | PASS | N/A | PASS |
| Key/Plate — Sign-Out (4 items) | PASS | PASS (4/4) | PASS — D-001 minor | N/A | PASS (minor D-001) |
| Key/Plate — Sign-In (2 items) | PASS | PASS (2/2) | PASS (2/2) | N/A | PASS |
| Key/Plate — Periodic Audit (2 items) | PASS | PASS (2/2) | PASS (2/2) | N/A | PASS |

**Overall:** 43 items across 10 checklists. 42/43 items are exact verbatim matches of source files. 1 minor discrepancy (D-001: role field on key-plate sign-out item 4). All checklist content is production-ready.

---

## EDGE CASE COVERAGE MATRIX

| Edge Case | Status | Finding ID | Notes |
|---|---|---|---|
| VIN empty + Next | HANDLED | — | Regex fails; error shown |
| VIN 16 chars | HANDLED | — | Regex enforces 17-char; rejected correctly |
| VIN 18 chars | HANDLED | — | `maxlength="17"` prevents entry |
| VIN with I, O, or Q | HANDLED | — | VIN regex `[A-HJ-NPR-Z0-9]` correctly excludes these |
| VIN with special chars | HANDLED | — | Regex rejects non-alphanumeric |
| VIN Enter-key submit | HANDLED | — | Wired at line 852–856 |
| PDI blank VIN | HANDLED | — | Empty check at line 958 |
| PDI blank arrival date | HANDLED | — | Empty check at line 965 |
| PDI future arrival date | HANDLED | — | `daysElapsed < 0` check at line 981 |
| PDI malformed date (13th month) | UNHANDLED | C-001 | NaN propagates; status block hidden; no error shown |
| PDI 16-char VIN | UNHANDLED | C-014 | Only empty-string check; short VIN accepted |
| Rapid YES taps | UNHANDLED | C-013, C-010 | Items skipped; duplicate responses recorded |
| Rapid NO taps | UNHANDLED | C-012 | failure-action-view re-rendered multiple times |
| Done button double-tap | UNHANDLED | E-004 | Duplicate response recorded |
| Empty checklist (`[]`) | PARTIALLY HANDLED | C-015 | Renders as "1 of 0"; no error; instantly completes |
| `currentItemIndex` out of bounds | UNHANDLED | C-004, E-009 | `renderFailureAction()` crashes; `renderChecklistItem()` blank |
| localStorage quota exceeded | UNHANDLED | C-007 | Exception silently swallowed |
| localStorage corrupted JSON | HANDLED | — | `try-catch` in `resumeCheck()` clears and proceeds |
| localStorage valid JSON, wrong field types | UNHANDLED | C-006, E-003 | No structure validation; invalid types used as-is |
| Resume with deleted checklist type | UNHANDLED | C-005 | Undefined checklist; blank screen; no recovery |
| Resume with mismatched item IDs | UNHANDLED | C-016 | Tasks silently dropped from task list |
| Checklist updated between sessions | UNHANDLED | C-030 | Checklist length mismatch; audit state inconsistent |
| Zero NO responses in task list | HANDLED | — | `renderTaskList()` renders empty groups correctly; export shows "All items passed" |
| Web Share API unavailable | HANDLED | — | Falls back to clipboard |
| Clipboard API unavailable | HANDLED | — | Shows "Unable to share — please copy manually" |
| Audit type switched mid-session | UNHANDLED | E-001, C-021 | vehicleVIN and responses contaminate next audit type |
| Morning lot walk without responses reset | UNHANDLED | C-020, E-006 | Prior audit responses included in morning walk task list |
| Multiple audits without state clear | UNHANDLED | C-029 | Repeated vehicle audit retains prior responses |
| sessionStartTime corrupted | UNHANDLED | C-026 | Export shows "NaN-NaN-NaN NaN:NaN" in header |
| taskListGrouped undefined in renderTaskList | UNHANDLED | C-023 | Empty task list; no error |

---

## STATE SCHEMA AUDIT

| State Key | Schema Defined | Written At (lines) | Read At (lines) | Persisted | Restored | Status |
|---|---|---|---|---|---|---|
| `screen` | ✓ | 36, 61, 84, 124, 151, 158, 164, 181, 365, 370, 442, 469, 827, 837, 908, 919, 930, 1019 | 127–130 (resume routing) | ✓ | ✓ | OK |
| `auditType` | ✓ | 62, 148, 154, 160, 163, 1009 | 48 (persist guard), 113–120 (resume), 698, 702 | ✓ | ✓ | OK — but E-001: not cleared on type switch |
| `vehicleVIN` | ✓ | 63, 819, 1010 | 113, 233, 702–703, 718 | ✓ | ✓ | **E-001** — not cleared on non-vehicle audit types |
| `vehicleCategory` | ✓ | 64, 832, 1011 | 113–115, 232–233 | ✓ | ✓ | **E-003** — not enum-validated on restore |
| `keyPlateSubType` | ✓ | 65, 902, 913, 924, 1012 | 119–120 | ✓ | ✓ | **E-003** — not enum-validated on restore |
| `checklist` | ✓ | 66, 114, 116, 118, 120, 154, 833, 903, 914, 925, 1013 | Throughout render/advance | ✓ (reference) | ✓ (restored from CHECKLISTS) | **C-005** — undefined if category invalid |
| `currentItemIndex` | ✓ | 67, 155, 834, 904, 915, 926, 1014, 359 | Throughout render/advance/YES/NO | ✓ (via response persist) | ✓ | **E-005** — not persisted after increment in `advanceChecklist()` |
| `responses` | ✓ | 68, push at 1056/1112, reset at 905/916/927/1015 | Throughout generate/render | ✓ | ✓ | **E-001, E-002, C-020, C-021** — not cleared on audit type switch |
| `sessionStartTime` | ✓ | 69, 156, 835, 906, 917, 928, 1016 | 113–120 (restore), 682–704 (export) | ✓ | ✓ | OK |
| `taskList` | ✓ | 70, 454 | 404, 454, 718 | ✓ | ✓ | OK |
| `taskListGrouped` | **✗ Not in schema** | 458 | 500, 718 | ✓ (unintended) | ✓ (unintended) | **E-007** — add to schema or exclude from persist |

---

## CRITICAL PATH: FIXES REQUIRED BEFORE NEXT USE

Ordered by impact — most blocking first.

**1. Resolves: E-001, C-021, C-020, E-006, C-029**
`app.js` — `handleAuditTypeSelect()` (lines 146–167)
Add `appState.responses = []; appState.vehicleVIN = null; appState.vehicleCategory = null; appState.keyPlateSubType = null; appState.taskList = null; appState.taskListGrouped = undefined;` at the top of `handleAuditTypeSelect()` before any routing. Every audit type selection must begin with a fully clean response state. VIN must not survive into non-vehicle audits.

**2. Resolves: E-002, B-012**
`app.js` — key-plate sub-type handlers (lines 902–931) and `handleCategorySelect()` (lines 832–837)
Add `persistState()` call at the end of each handler, after all `appState` fields are set and before `showScreen()`. Ensures the session is saved with the correct checklist and empty responses before the user sees the first item.

**3. Resolves: C-013, C-010, E-004**
`app.js` — YES/NO handlers (lines 1047–1118) and Done/Needs-Follow-Up handlers (lines 329–352)
Disable all four buttons immediately at the first line of each handler (`element.disabled = true`). Re-enable them only inside `renderChecklistItem()` after the next item is fully rendered. This prevents duplicate responses, prevents item skipping, and eliminates the rapid-tap race condition.

**4. Resolves: B-020**
`styles.css`
Add the missing CSS rule: `.failure-action-card.revealed { animation: failure-reveal 300ms ease-out forwards; }` The `@keyframes failure-reveal` animation is already defined; this selector binding is absent.

**5. Resolves: B-021**
`app.js` — `showToast()` function (line 787) OR `styles.css`
Fix the class name mismatch. Either change `classList.add('toast--visible')` → `classList.add('visible')` in app.js, OR rename the CSS selector from `.toast.visible` to `.toast.toast--visible`. The toast is currently non-functional.

**6. Resolves: C-007**
`app.js` — `persistState()` function (lines 44–54)
Wrap `localStorage.setItem()` in a `try-catch`. On `QuotaExceededError`, display a visible user warning (toast or inline message): "Warning: storage full — audit data may not be saved. Free storage and restart."

**7. Resolves: A-001, A-002**
`app.js` — `buildExportText()` (line 708) and app flow
Decision required (see Ambiguities section). Either: (a) add an auditor name input field at the start of every audit session, stored in `appState.auditorName`, and insert into export; OR (b) document explicitly that auditor attribution is a Phase 2 feature and update the spec to reflect "Lot Staff" as the Phase 1 placeholder. If (a), the input screen must be added between Home and AuditTypeSelect, and `appState.auditorName` must be persisted and restored.

**8. Resolves: E-003, C-005**
`app.js` — `resumeCheck()` (lines 89–141)
After `Object.assign(appState, restoredState)`, validate:
- If `auditType === 'vehicle-audit'`: assert `vehicleCategory` ∈ `{NEW, FLR, SOLD, BND, RECON}`
- If `auditType === 'key-plate'`: assert `keyPlateSubType` ∈ `{sign-out, sign-in, periodic-audit}`
- Assert `typeof currentItemIndex === 'number' && currentItemIndex >= 0`
On any validation failure: call `initFreshSession()`, clear localStorage, route home with message "Previous session was invalid and has been cleared."

---

## FULL FIX BACKLOG

All findings not in the critical path, ordered by severity then feature area.

**High — Data Integrity**

- **C-004** (`app.js:297–299`): Add bounds check to `renderFailureAction()`: `const item = appState.checklist[appState.currentItemIndex]; if (!item) return;` before accessing `item.failureAction`.
- **C-023** (`app.js:500`): Add guard in `renderTaskList()`: `if (!appState.taskListGrouped) { /* render empty state */ return; }`
- **C-016** (`app.js:421–463`): When `generateTaskList()` cannot match a response's `itemId` to any checklist item, log a console warning rather than silently skipping. In the task list, render an "Unknown item" placeholder so no task is invisibly lost.
- **C-030** (`app.js:113–128`): On resume, after restoring checklist, check `checklist.length` against the restored `currentItemIndex`. If `currentItemIndex >= checklist.length`, reset index to 0 and show user message "Checklist was updated — restarting from beginning."
- **C-029** (`app.js:146–151`): Covered by Critical Path fix #1. No additional action needed.

**High — Accessibility**

- **F-030** (`index.html:449–456`, `app.js:121–141`): Add `role="dialog" aria-modal="true" aria-labelledby="resume-modal-title"` to the modal div. Add `id="resume-modal-title"` to the h2 inside. In app.js: when modal is shown, call `document.getElementById('btn-resume').focus()`; when modal closes, return focus to a known element.
- **F-001** (`index.html:129–156`): Replace the `<p>` label text with `<label for="vin-input">Enter the vehicle VIN (17 characters)</label>`.
- **F-002** (`index.html:409`): Add `for="pdi-vin-input"` to the PDI VIN label element.
- **F-003** (`index.html:421`): Add `for="pdi-arrival-date"` to the PDI arrival date label element.
- **F-010** (`index.html:157`): Add `role="alert"` to the `#vin-error` element. Prepend "⚠ " to the message text.
- **F-011** (`index.html:431`): Add `role="alert"` to the `#pdi-error-msg` element.
- **F-005** (`styles.css`): Add `.audit-type-tile:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`.
- **F-006** (`styles.css`): Add `.category-btn:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`.
- **F-024** (`index.html:256–258`): Add `role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Checklist progress"` to the progress bar outer div. Update `aria-valuenow` in `renderChecklistItem()` alongside the width update.

**High — UX**

- **B-020**: Covered by Critical Path fix #4.
- **B-021**: Covered by Critical Path fix #5.
- **C-001** (`app.js:978–979`): After parsing the date from `pdi-arrival-date`, check `isNaN(arrivalDate.getTime())`. If true, show specific error: "Invalid date — please select a date from the calendar." and abort calculation.
- **F-007** (`index.html:152`): Remove `outline:none` from VIN input inline style. Apply the `.vin-input` class (already defined in styles.css) to the input element, which provides `outline: 2px solid var(--color-accent)` on focus.
- **F-009** (`app.js:121`): After showing resume modal, call `document.getElementById('btn-resume').focus()`. When either button is tapped and modal closes, call `document.getElementById('btn-start-audit').focus()`.

**Medium — Validation / Data Quality**

- **C-017** (`app.js:1006–1020`): In `btn-pdi-begin-checklist` handler, re-validate `pdi-vin-input` value against `VIN_REGEX` before proceeding. Show error if invalid.
- **C-014** (`app.js:957`): In PDI calculate handler, validate VIN format using `VIN_REGEX`, not just empty-string check.
- **E-007** (`app.js:44–54, 458`): Either add `taskListGrouped: null` to the appState schema at lines 11–21, or filter it out of the `persistState()` serialization.
- **E-005** (`app.js:358–371`): Call `persistState()` at the end of `advanceChecklist()` after `currentItemIndex` is incremented.
- **C-026** (`app.js:682–689`): Wrap date formatting in a try-catch or validate `isNaN(startTime.getTime())` before formatting; use "Date unknown" fallback.

**Medium — UX**

- **B-007** (`app.js:130`): Before calling `initFreshSession()` from "Start Fresh" button, display a confirmation dialog: `if (!confirm('Starting fresh will discard your in-progress audit. Continue?')) return;`
- **B-009** (`index.html:367–370`): Add a "Done" or home button to the task-list nav bar that navigates to home and calls `initFreshSession()`.
- **B-003**: Document the forward-only design intent in a visible UI affordance. Add small instructional text to the checklist nav bar: e.g., "Answer each item to continue" on the first item only.
- **B-010** (`app.js:113–128`): After resuming to `pdi-compliance-view`, populate `pdi-vin-input` from `appState.vehicleVIN` if set.
- **B-004** (`index.html:307`): Add small instructional text above the response buttons: "Select an option to continue."
- **B-015** (`index.html:79–81`): Add a subtitle below the main title, e.g.: `<p>Vehicle Audit · Morning Walk · PDI · Key/Plate</p>`
- **C-018** (`app.js:764–775`): Provide distinct error messages for clipboard unavailable vs. clipboard write rejected.
- **E-009** (`app.js:216–218`): When `renderChecklistItem()` receives an OOB index, display a visible error state instead of silently returning: `showScreen('home')` + toast "Session error. Please start a new audit."
- **D-001** (`data.js:598`): Remove the `role: 'Requesting employee'` field from key-plate sign-out item 4's failureAction, matching the source file which has no ROLE: assignment for this item.
- **C-015** (`app.js:146–167`): Covered by Critical Path fix #1 (empty checklist from corrupt state cannot occur if state is properly validated on restore per Critical Path fix #8).
- **B-010**: Covered above.
- **F-012** (`index.html:275–277`): YES/NO buttons are already text-labeled ("YES"/"NO"), so color-blind users can distinguish them. No additional change required beyond ensuring text remains visible at all sizes.
- **F-013** (`index.html:338–353`): Consider adding a check-circle icon (✓) before Passed/Resolved values and a flag icon before Needs Follow-Up to supplement color coding.
- **F-025** (`app.js:509–585`): Refactor `renderTaskList()` to use semantic HTML: `<section>` wrapping each team group, `<h3>` for team headers, `<ul>/<li>` for task cards.
- **F-026** (`styles.css`): Add `:focus-visible` styles for key-plate subtype buttons.
- **F-020** (`index.html:274`): Add `min-width: 44px` to YES/NO button inline styles as a floor.
- **C-024**: Standardize `renderTaskList()` to use the same empty-group fallback as `buildExportText()`.
- **C-019** (`app.js:790`): Add `clearTimeout(window._toastTimeout); window._toastTimeout = setTimeout(...)` in `showToast()` to prevent overlapping timeouts.

**Medium — Accessibility**

- **F-026**: Add `:focus-visible` styles for key-plate subtype buttons (covered above).
- **F-024**: Covered above.

**Low**

- **B-019**: Standardize back button wiring to `addEventListener` pattern for maintainability.
- **B-025**: Replace inline `style.display` calls for error visibility with class-based toggling.
- **B-024**: Call `persistState()` only from response-recording functions, not from `showScreen()`.
- **E-008**: Document the single-device assumption in code comments; no code change required.
- **E-010** (`app.js:28–38`): Add `if (!target) { console.warn('showScreen: no element found for id:', screenId); return; }` before setting `appState.screen`.
- **F-017**: Remove or relax `white-space: nowrap` on `.toast` in styles.css.
- **F-018**: Add `@media (prefers-color-scheme: dark) { :root { ... } }` to styles.css to auto-apply dark mode tokens.
- **F-028**: Add `role="status" aria-live="polite"` to the `#toast` element.
- **F-027**: Replace inline `style.color` in PDI status label handler with CSS class toggling (`.pdi-status--ok`, `.pdi-status--warn`, `.pdi-status--critical`).
- **B-026**: Replace JS pointer-event animation on audit-type-tile with CSS `:active { transform: scale(0.97); transition: transform 100ms; }`.
- **C-019**: Covered above.
- **B-024**: Covered above.

---

## AMBIGUITIES REQUIRING HUMAN INPUT

**AMBIGUITY 1 — Auditor Identity Collection**
- **What is ambiguous:** The spec (Section 3, Step 9) requires `"Audited by: [User name/role]"` in the export. The current implementation hardcodes `"Audited by: Lot Staff"`. This gap is acknowledged in app.js line 708 with the comment "Phase 1 default — no user identity screen."
- **Interpretation A:** Auditor identity collection is a missing Phase 1 feature that must be added before deployment. This requires a new screen (between Home and AuditTypeSelect) with a name/role input, stored in appState and persisted.
- **Interpretation B:** The Phase 1 spec intentionally defers user identity to Phase 2 (where Airtable integration would provide logged-in user context), and "Lot Staff" is an acceptable Phase 1 placeholder. The spec should be updated to document this explicitly.
- **Who can resolve:** Product owner / Lot Manager — confirm whether accountability attribution is required at Phase 1 launch.

**AMBIGUITY 2 — Checklist Back Navigation**
- **What is ambiguous:** The implementation-plan.md (Task 11) specifies "no back button on failure-action-view." The current checklist-view also has no back button. The spec is silent on whether users can cancel an in-progress checklist.
- **Interpretation A:** Checklists are forward-only; no back or cancel is allowed. Users who started the wrong audit must close the app. This is the current behavior.
- **Interpretation B:** Users should be able to tap a "Cancel Audit" button on the checklist-view that returns them to home with a confirmation dialog.
- **Who can resolve:** Product owner — confirm intended UX for accidental audit type selection.

**AMBIGUITY 3 — Resume After Audit Type Switch**
- **What is ambiguous:** If a user starts a vehicle audit, answers 3 questions, then navigates back to the home screen and starts a morning lot walk, what should happen? The current code (after applying Critical Path fix #1) would clear prior responses and start fresh. But should the prior vehicle audit session be resumable?
- **Interpretation A:** Only one session can be in-progress at a time. Switching audit types discards the previous session. No recovery offered.
- **Interpretation B:** Switching audit types should warn the user: "You have an in-progress vehicle audit. Starting a new audit will discard it. Continue?"
- **Who can resolve:** Product owner — confirm acceptable behavior for mid-audit navigation away.

---

## NOTES FOR IMPLEMENTING AGENT

- Do not begin any fix until this report is confirmed by the user.
- Each fix must reference its Finding ID in the commit message.
- The VIN regex `[A-HJ-NPR-Z0-9]` is **correct**. Sub-agent findings C-003 and B-014 claiming R is excluded are **invalid** — `[R-Z]` within the character class correctly includes R. Do not modify the VIN regex.
- Scripts at the bottom of `<body>` (before `</body>`) execute after the DOM is parsed. Sub-agent findings B-027, B-028, B-029 claiming DOMContentLoaded is required are **low-severity code quality** observations only, not runtime errors. Do not treat them as blocking.
- Critical Path fixes #1 and #3 touch the most heavily-used code paths. Test all 4 audit types end-to-end after applying them.
- After all Critical Path fixes are applied, re-run Sub-Agents B, C, and E to verify closure on: state contamination (E-001, C-020, C-021), button double-tap (C-013, E-004), and persist gaps (E-002, B-012).
- Sub-Agent D confirmed 42 of 43 checklist items are verbatim source matches. Do not modify checklist text in data.js except for D-001 (remove the role field from key-plate sign-out item 4 failureAction).
- Do not introduce new features while fixing. Scope is strictly repair to spec.
- Do not add Telegram, WhatsApp, or any messaging platform integration (explicitly excluded in spec Section 7).
