# BUILD PROMPT 14 — SHARE FUNCTION

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL (depends on 13) |
| **Depends on** | 13 |
| **Unblocks** | 15 |
| **Creates/Modifies** | `lot-checklist-app/app.js` |
| **Estimated output** | ~60 lines added to app.js |

---

## STEP 1 — READ CONTEXT FILES

Read these files before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in STEP 2
2. `lot-checklist-app/implementation-plan.md` — Section 7 Task 14 (exact scope and export text format), Section 1.5 (Technology Decision: Web Share API + clipboard fallback; no Telegram, no WhatsApp-specific integration), Section 8 (Constraints — especially Constraint 2: offline-first, no CDN)
3. `lot-checklist-app/app.js` — read existing structure; verify `appState.taskList`, `appState.taskListGrouped`, `appState.vehicleVIN`, `appState.auditType`, `appState.sessionStartTime` are defined; locate `.toast` element usage pattern; verify `shareTaskList()` is already referenced in the `btn-share-tasks` click handler (added in Task 13)

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If prompt `14` has any status other than `pending`:**
STOP. Tell the user exactly:
> "Build prompt 14 has status `[current status]` — expected `pending`. Do not re-run a completed or in-progress prompt. If you need to reset, set status back to `pending` and restore output files to their pre-run state."

**If prompt `14` has status `pending`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.14.status` → `"in_progress"`
- `prompts.14.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting build prompt 14: SHARE FUNCTION."

---

## STEP 3 — TASK

### Context

This task defines `shareTaskList()` in `app.js`. The function is already wired to the `#btn-share-tasks` button click handler added in Task 13 — this task implements the function body.

`shareTaskList()` builds a plain-text export string from `appState.taskList` and `appState.taskListGrouped`, then attempts to share it via the native Web Share API (`navigator.share()`). If the Web Share API is unavailable or the user dismisses the share sheet, it falls back to the Clipboard API (`navigator.clipboard.writeText()`). Both success and error paths use the `.toast` element to give the user feedback.

**Technology decision (implementation-plan.md Section 1.5):**
- `navigator.share()` triggers the native mobile share sheet — the user can send to any app they have installed (Messages, WhatsApp, Slack, email, etc.). No platform-specific integration code is required.
- The Clipboard API fallback covers desktop browsers and mobile browsers without Web Share API support.
- No Telegram integration. No WhatsApp deep-link. No platform-specific share targets of any kind. These are excluded by the requirements document.

### Export Text Format

The exact plain-text export format is specified in `implementation-plan.md` Section 7 Task 14 and in Section 3 Step 9 of the requirements document. Reproduce this format exactly:

```
LOT AUDIT — [Date] [Time] — [Audit Type] — [VIN if applicable]
Audited by: [User name/role]

--- LOT TEAM TASKS ---
[Task entries for Lot group, or "(none)" if empty]

--- SALES TEAM TASKS ---
[Task entries for Sales group, or "(none)" if empty]

--- SERVICE DEPARTMENT TASKS ---
[Task entries for Service group, or "(none)" if empty]

Items marked [FOLLOW-UP] require attention — action could not be completed during the walk.
```

**Mapping values:**
- `[Date]` — date portion of `appState.sessionStartTime`, formatted as `YYYY-MM-DD`
- `[Time]` — time portion of `appState.sessionStartTime`, formatted as `HH:MM`
- `[Audit Type]` — human-readable label mapped from `appState.auditType`:
  - `'vehicle-audit'` → `"Vehicle Audit"`
  - `'morning-lot-walk'` → `"Morning Lot Walk"`
  - `'pdi-compliance'` → `"PDI Compliance Review"`
  - `'key-plate'` → `"Key/Plate Accountability Check"`
- `[VIN if applicable]` — `appState.vehicleVIN` if non-null, otherwise omit this segment (including the ` — ` separator)
- `[User name/role]` — `"Lot Staff"` as the default value in Phase 1 (no user identity screen in Phase 1)

**Each task entry format:**
```
ITEM: [checklist item text]
ACTION: [failureAction.role] — [failureAction.channel]: [failureAction.say]
[FOLLOW-UP]
```
Notes:
- The `SAY:` line (failureAction.say) is appended to the ACTION line after a colon if non-null. If `failureAction.say` is null, the ACTION line is: `[failureAction.role] — [failureAction.channel]` with no trailing colon.
- `[FOLLOW-UP]` marker is included as its own line only when `task.response === 'needs-followup'`. It is omitted for `response === 'done'` tasks.
- A blank line separates each task entry within a group.

### Instructions

#### Modification 1 of 1: `lot-checklist-app/app.js`

Append the following block to `app.js`. Do not modify any existing code.

```javascript
// ============================================================
// Task 14 — Share Function: shareTaskList
// ============================================================

/**
 * shareTaskList()
 * Builds a plain-text export of the current task list and shares it
 * via the Web Share API, falling back to clipboard copy if unavailable.
 *
 * Called by the #btn-share-tasks click handler (Task 13).
 *
 * Technology decision (implementation-plan.md Section 1.5):
 *   - navigator.share() triggers native share sheet (iOS/Android)
 *   - Clipboard fallback for desktop / browsers without Web Share API
 *   - No Telegram, no WhatsApp-specific integration, no external service
 */
function shareTaskList() {
  var exportText = buildExportText();

  // Attempt Web Share API (native share sheet)
  if (navigator.share) {
    navigator.share({
      title: 'Lot Audit Task List',
      text: exportText
    }).catch(function (err) {
      // AbortError: user dismissed the share sheet — do nothing (expected behavior)
      if (err.name === 'AbortError') {
        return;
      }
      // Any other error: fall through to clipboard fallback
      copyToClipboard(exportText);
    });
  } else {
    // Web Share API unavailable — use clipboard fallback directly
    copyToClipboard(exportText);
  }
}

/**
 * buildExportText()
 * Constructs the plain-text export string from appState.
 *
 * Export format (implementation-plan.md Section 7 Task 14):
 *
 *   LOT AUDIT — YYYY-MM-DD HH:MM — [Audit Type] — [VIN if applicable]
 *   Audited by: Lot Staff
 *
 *   --- LOT TEAM TASKS ---
 *   [task entries]
 *
 *   --- SALES TEAM TASKS ---
 *   [task entries]
 *
 *   --- SERVICE DEPARTMENT TASKS ---
 *   [task entries]
 *
 *   Items marked [FOLLOW-UP] require attention — action could not be completed during the walk.
 */
function buildExportText() {
  // --- Header line ---
  var startTime = appState.sessionStartTime ? new Date(appState.sessionStartTime) : new Date();
  // Format date as YYYY-MM-DD
  var dateStr = startTime.getFullYear() + '-' +
    String(startTime.getMonth() + 1).padStart(2, '0') + '-' +
    String(startTime.getDate()).padStart(2, '0');
  // Format time as HH:MM
  var timeStr = String(startTime.getHours()).padStart(2, '0') + ':' +
    String(startTime.getMinutes()).padStart(2, '0');

  // Audit type human-readable label (implementation-plan.md Section 7 Task 14 mapping)
  var auditTypeLabels = {
    'vehicle-audit':    'Vehicle Audit',
    'morning-lot-walk': 'Morning Lot Walk',
    'pdi-compliance':   'PDI Compliance Review',
    'key-plate':        'Key/Plate Accountability Check'
  };
  var auditTypeLabel = auditTypeLabels[appState.auditType] || appState.auditType || 'Lot Audit';

  // Header line — VIN appended only if vehicle audit
  var headerLine = 'LOT AUDIT \u2014 ' + dateStr + ' ' + timeStr + ' \u2014 ' + auditTypeLabel;
  if (appState.vehicleVIN) {
    headerLine += ' \u2014 ' + appState.vehicleVIN;
  }

  var lines = [];
  lines.push(headerLine);
  lines.push('Audited by: Lot Staff'); // Phase 1 default — no user identity screen
  lines.push('');

  // --- Task groups ---
  var groups = [
    { key: 'lot',     sectionHeader: '--- LOT TEAM TASKS ---' },
    { key: 'sales',   sectionHeader: '--- SALES TEAM TASKS ---' },
    { key: 'service', sectionHeader: '--- SERVICE DEPARTMENT TASKS ---' }
  ];

  var grouped = appState.taskListGrouped || { lot: [], sales: [], service: [] };

  groups.forEach(function (group) {
    lines.push(group.sectionHeader);

    var tasks = grouped[group.key] || [];
    if (tasks.length === 0) {
      lines.push('(none)');
    } else {
      tasks.forEach(function (task, idx) {
        // ITEM line — checklist item text verbatim (Constraint 1)
        lines.push('ITEM: ' + task.itemText);

        // ACTION line — role — channel: say (verbatim — Constraint 7)
        var actionLine = 'ACTION: ' + task.failureAction.role + ' \u2014 ' + task.failureAction.channel;
        if (task.failureAction.say !== null && task.failureAction.say !== undefined && task.failureAction.say !== '') {
          actionLine += ': ' + task.failureAction.say; // verbatim say script
        }
        lines.push(actionLine);

        // [FOLLOW-UP] marker — only for needs-followup responses
        if (task.response === 'needs-followup') {
          lines.push('[FOLLOW-UP]');
        }

        // Blank line between task entries (not after the last one in the group)
        if (idx < tasks.length - 1) {
          lines.push('');
        }
      });
    }

    lines.push(''); // blank line after each group section
  });

  // Footer line
  lines.push('Items marked [FOLLOW-UP] require attention \u2014 action could not be completed during the walk.');

  return lines.join('\n');
}

/**
 * copyToClipboard(text)
 * Clipboard fallback for browsers without Web Share API support.
 * Shows .toast element with status message for 2 seconds.
 */
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      showToast('Copied to clipboard');
    }).catch(function () {
      showToast('Unable to share \u2014 please copy manually.');
    });
  } else {
    // navigator.clipboard not available (non-HTTPS context on older browsers)
    showToast('Unable to share \u2014 please copy manually.');
  }
}

/**
 * showToast(message)
 * Displays the .toast element with a message for 2000ms then hides it.
 * The .toast element must exist in index.html (added in Task 04 CSS / Task 07 HTML).
 */
function showToast(message) {
  var toast = document.querySelector('.toast');
  if (!toast) { return; }
  toast.textContent = message;
  toast.style.display = 'flex';
  toast.classList.add('toast--visible');
  setTimeout(function () {
    toast.classList.remove('toast--visible');
    toast.style.display = 'none';
  }, 2000);
}
```

**`\u2014` is the em dash character (—).** Used in the export text header and action lines. Using the Unicode escape ensures the character is correctly encoded without depending on the source file's encoding.

**`padStart(2, '0')` zero-pads single-digit months, days, hours, and minutes.** Example: month 3 → `"03"`, hour 9 → `"09"`.

**The `.toast` element** must exist in `index.html`. It is specified as part of the component atom styles in `implementation-plan.md` Task 4 description (`.toast` style class). If it is not already present in `index.html` from a prior task, add the following element at the end of `<body>`, before the `<script>` tags:
```html
<!-- Toast notification — used by showToast() in shareTaskList() -->
<div class="toast" role="status" aria-live="polite" style="display: none;"></div>
```

### CONSTRAINTS

- **Offline-first:** No CDN URLs. No external sharing service. `navigator.share()` calls the native OS share sheet — no third-party library. The clipboard fallback uses the browser-native Clipboard API — no library (implementation-plan.md Section 8 Constraint 2).
- **No Telegram integration:** The requirements document (Section 7 — explicitly excluded features) and `implementation-plan.md` Section 1.5 both exclude Telegram integration. `shareTaskList()` must not call any Telegram URL, API, or SDK (implementation-plan.md Section 8 Constraint 2).
- **No WhatsApp-specific integration:** `navigator.share()` will allow the user to share to WhatsApp if they have it installed — this is acceptable because the native share sheet handles it. Do not hardcode any `https://wa.me/` deep links, WhatsApp API calls, or WhatsApp-specific routing.
- **Exact Failure Action text in export:** `task.itemText`, `task.failureAction.role`, `task.failureAction.channel`, and `task.failureAction.say` are concatenated into the export string verbatim — no string transformation (`toLowerCase()`, `trim()`, `substring()`, summarization, truncation) is applied to these fields (implementation-plan.md Section 8 Constraint 7).
- **`[FOLLOW-UP]` marker exact string:** The marker in the export text is `[FOLLOW-UP]` exactly as shown. No variations (lowercase, "follow up", "needs-followup", etc.).
- **Export format immutable:** The header format `LOT AUDIT — [Date] [Time] — [Audit Type] — [VIN]`, section headers `--- LOT TEAM TASKS ---`, `--- SALES TEAM TASKS ---`, `--- SERVICE DEPARTMENT TASKS ---`, and footer line are fixed strings. Do not alter casing, punctuation, or spacing.
- **AbortError is silent:** If the user dismisses the native share sheet (`AbortError`), the app does nothing — no toast, no error message. This is expected behavior (user chose not to share).
- **No Phase 2 features:** No server-side task syncing, no push notification on share, no share history logging.

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading the modified file. All criteria are objectively verifiable without running the app.

**`app.js` checks:**
- [ ] Contains `function shareTaskList`
- [ ] `shareTaskList` calls `navigator.share` with `{ title: 'Lot Audit Task List', text: exportText }`
- [ ] `shareTaskList` handles `AbortError` by doing nothing (silent dismiss)
- [ ] `shareTaskList` falls back to `copyToClipboard(exportText)` when `navigator.share` is undefined or throws a non-AbortError
- [ ] Contains `function buildExportText`
- [ ] `buildExportText` produces a header line starting with `'LOT AUDIT'`
- [ ] `buildExportText` includes `'Audited by: Lot Staff'`
- [ ] `buildExportText` includes section headers `'--- LOT TEAM TASKS ---'`, `'--- SALES TEAM TASKS ---'`, `'--- SERVICE DEPARTMENT TASKS ---'`
- [ ] `buildExportText` includes `'[FOLLOW-UP]'` marker on a separate line for `task.response === 'needs-followup'` tasks
- [ ] `buildExportText` omits the `[FOLLOW-UP]` marker for `task.response === 'done'` tasks
- [ ] `buildExportText` appends VIN to header line only when `appState.vehicleVIN` is non-null
- [ ] `buildExportText` does NOT use `.toLowerCase()`, `.trim()`, or `.substring()` on `task.itemText`, `task.failureAction.role`, `task.failureAction.channel`, or `task.failureAction.say`
- [ ] Contains `function copyToClipboard`
- [ ] `copyToClipboard` calls `navigator.clipboard.writeText(text)`
- [ ] `copyToClipboard` calls `showToast('Copied to clipboard')` on success
- [ ] `copyToClipboard` calls `showToast('Unable to share...')` on clipboard error
- [ ] Contains `function showToast`
- [ ] `showToast` hides the toast after 2000ms (2 seconds)
- [ ] `app.js` does NOT contain any Telegram URL, `t.me`, `api.telegram.org`, `wa.me`, or WhatsApp deep-link string

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.14.status` → `"complete"`
   - `prompts.14.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 14 complete.**
> Modified: `lot-checklist-app/app.js` (`shareTaskList()`, `buildExportText()`, `copyToClipboard()`, `showToast()` added).
>
> **Now unblocked:**
> - `15-offline-resume.md` — next sequential task (depends on 14)
>
> Note: `16-key-plate-subtype-select.md` and `17-pdi-compliance-review.md` both depend on `10-checklist-view-yes-no-logic.md` only and are already unblocked. They may be running in parallel with the 11→14 chain.
