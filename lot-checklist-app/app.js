// ============================================================
// LOT CHECKLIST APP — app.js
// Sturgeon Dodge Edmonton Office
// Vanilla JS, no framework, no build step.
// data.js (CHECKLISTS constant) must load before this file.
// ============================================================

// ------------------------------------------------------------
// APP STATE — single source of truth for the current session
// ------------------------------------------------------------
const appState = {
  screen: 'home',          // Current screen ID — matches id of visible .screen div
  auditType: null,         // 'vehicle-audit' | 'morning-lot-walk' | 'pdi-compliance' | 'key-plate'
  vehicleVIN: null,        // 17-char string | null (vehicle audits only)
  vehicleCategory: null,   // 'NEW' | 'FLR' | 'SOLD' | 'BND' | 'RECON' | null
  keyPlateSubType: null,   // 'sign-out' | 'sign-in' | 'periodic-audit' | null
  checklist: [],           // Active checklist items array (reference into CHECKLISTS)
  currentItemIndex: 0,     // Zero-based index of the currently displayed item
  responses: [],           // Array of response objects, one per answered item
  sessionStartTime: null,  // ISO 8601 timestamp when session began
  taskList: null           // Array of task objects | null (set by generateTaskList())
};

// ------------------------------------------------------------
// SHOW SCREEN — hides all screens, shows the target screen
// Does NOT render content. Callers render before or after.
// ------------------------------------------------------------
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(function(el) {
    el.style.display = 'none';
  });
  var target = document.getElementById(screenId);
  if (target) {
    target.style.display = 'block';
  }
  appState.screen = screenId;
  persistState();
}

// ------------------------------------------------------------
// PERSIST STATE — serializes appState to localStorage
// Called after every response is recorded.
// ------------------------------------------------------------
function persistState() {
  // Only persist when an audit is actively in progress.
  // Prevents false resume modal on next load when there is no real session to resume,
  // and ensures localStorage is clear after "Start Fresh" resets auditType to null.
  if (!appState.auditType) {
    return;
  }
  localStorage.setItem(
    'lot-checklist-app-session-in-progress',
    JSON.stringify(appState)
  );
}

// ------------------------------------------------------------
// INIT FRESH SESSION — resets all appState fields to defaults
// ------------------------------------------------------------
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
  appState.taskList = null;
}

// ------------------------------------------------------------
// RESUME CHECK — checks localStorage for in-progress session
// Called on DOMContentLoaded before anything else.
// Algorithm: implementation-plan.md Section 6.1
// ------------------------------------------------------------
function resumeCheck() {
  var storedValue = localStorage.getItem('lot-checklist-app-session-in-progress');

  // CASE A — no stored session
  if (storedValue === null || storedValue === undefined) {
    initFreshSession();
    showScreen('home');
    return;
  }

  // CASE B — stored value exists; attempt parse
  var restoredState;
  try {
    restoredState = JSON.parse(storedValue);
  } catch (e) {
    // CASE B-1 — corrupt data
    localStorage.removeItem('lot-checklist-app-session-in-progress');
    initFreshSession();
    showScreen('home');
    return;
  }

  // CASE B-2 — valid parsed state; show resume modal
  var modal = document.getElementById('resume-modal');
  modal.style.display = 'flex';

  // Wire Resume button
  document.getElementById('btn-resume').addEventListener('click', function () {
    modal.style.display = 'none';

    // Copy all fields from restoredState into appState
    Object.assign(appState, restoredState);

    // Restore checklist array reference from CHECKLISTS constant
    // (JSON round-trip produces a copy, not the original reference — content is identical)
    if (appState.auditType === 'vehicle-audit' && appState.vehicleCategory) {
      appState.checklist = CHECKLISTS['vehicle-audit'][appState.vehicleCategory];
    } else if (appState.auditType === 'morning-lot-walk') {
      appState.checklist = CHECKLISTS['morning-lot-walk'];
    } else if (appState.auditType === 'pdi-compliance') {
      appState.checklist = CHECKLISTS['pdi-compliance'];
    } else if (appState.auditType === 'key-plate' && appState.keyPlateSubType) {
      appState.checklist = CHECKLISTS['key-plate'][appState.keyPlateSubType];
    }

    // Navigate to the screen where the session was interrupted
    showScreen(appState.screen);

    // Re-render content for stateful screens
    if (appState.screen === 'checklist-view') {
      renderChecklistItem(appState.currentItemIndex);
    } else if (appState.screen === 'failure-action-view') {
      renderFailureAction(appState.currentItemIndex);
    }
  });

  // Wire Start Fresh button
  document.getElementById('btn-start-fresh').addEventListener('click', function () {
    modal.style.display = 'none';
    localStorage.removeItem('lot-checklist-app-session-in-progress');
    initFreshSession();
    showScreen('home');
  });
}

// ------------------------------------------------------------
// AUDIT TYPE ROUTING — called when user taps an AuditTypeTile
// Routes to the appropriate next screen for each audit type.
// ------------------------------------------------------------
function handleAuditTypeSelect(auditType) {
  appState.auditType = auditType;
  switch (auditType) {
    case 'vehicle-audit':
      showScreen('vin-entry');
      break;
    case 'morning-lot-walk':
      appState.checklist = CHECKLISTS['morning-lot-walk'];
      appState.currentItemIndex = 0;
      appState.sessionStartTime = new Date().toISOString();
      renderChecklistItem(0);
      showScreen('checklist-view');
      break;
    case 'pdi-compliance':
      showScreen('pdi-compliance-view');
      break;
    case 'key-plate':
      showScreen('key-plate-subtype-select');
      break;
  }
}

// ------------------------------------------------------------
// DOM READY — entry point
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {

  // Run resume check first — may show resume modal or go straight to home
  resumeCheck();

  // Wire "Start Lot Audit" button on Home screen
  var btnStartAudit = document.getElementById('btn-start-audit');
  if (btnStartAudit) {
    btnStartAudit.addEventListener('click', function() {
      showScreen('audit-type-select');
    });
  }

  // Wire AuditTypeTile buttons on AuditTypeSelect screen
  var tiles = document.querySelectorAll('.audit-type-tile');
  tiles.forEach(function(tile) {
    tile.addEventListener('click', function() {
      var auditType = tile.getAttribute('data-audit-type');
      if (auditType) {
        handleAuditTypeSelect(auditType);
      }
    });
    // Press animation: scale down on pointerdown, spring back on pointerup
    tile.addEventListener('pointerdown', function() {
      tile.style.transform = 'scale(0.97)';
      tile.style.transition = 'transform var(--duration-fast) var(--easing-standard)';
    });
    tile.addEventListener('pointerup', function() {
      tile.style.transform = 'scale(1)';
      tile.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
    tile.addEventListener('pointercancel', function() {
      tile.style.transform = 'scale(1)';
      tile.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
  });

});

// ------------------------------------------------------------
// PLACEHOLDER STUBS — implemented by later build tasks
// Declared here so routing calls in handleAuditTypeSelect do not
// throw ReferenceErrors before those tasks are complete.
// ------------------------------------------------------------
function renderChecklistItem(index) {
  var checklist = appState.checklist;
  if (!checklist || index >= checklist.length) return;

  var item = checklist[index];
  var total = checklist.length;

  // Update nav counter: "3 of 7"
  var counter = document.getElementById('checklist-nav-counter');
  if (counter) {
    counter.textContent = (index + 1) + ' of ' + total;
  }

  // Update nav title to reflect audit context
  var navTitle = document.getElementById('checklist-nav-title');
  if (navTitle) {
    if (appState.auditType === 'vehicle-audit' && appState.vehicleCategory) {
      navTitle.textContent = appState.vehicleCategory + ' Audit';
    } else if (appState.auditType === 'morning-lot-walk') {
      navTitle.textContent = 'Morning Lot Walk';
    } else if (appState.auditType === 'pdi-compliance') {
      navTitle.textContent = 'PDI Compliance';
    } else if (appState.auditType === 'key-plate') {
      navTitle.textContent = 'Key / Plate Check';
    } else {
      navTitle.textContent = 'Checklist';
    }
  }

  // Zone header — visible only for morning-lot-walk items with a non-null zone
  var zoneContainer = document.getElementById('zone-header-container');
  var zoneText = document.getElementById('zone-header-text');
  if (zoneContainer && zoneText) {
    if (item.zone) {
      // Show zone header if this is the first item in this zone
      var prevItem = index > 0 ? checklist[index - 1] : null;
      if (!prevItem || prevItem.zone !== item.zone) {
        zoneText.textContent = item.zone;
        zoneContainer.style.display = 'block';
      } else {
        zoneContainer.style.display = 'none';
      }
    } else {
      zoneContainer.style.display = 'none';
    }
  }

  // Item text — verbatim, no transformation
  // CONSTRAINT 1 & 7: .textContent only. No trim(), toLowerCase(), substring(), or any modification.
  var itemTextEl = document.getElementById('checklist-item-text');
  if (itemTextEl) {
    itemTextEl.textContent = item.text;
  }

  // Progress bar — percentage of items answered before this one
  var progressFill = document.getElementById('checklist-progress-fill');
  if (progressFill) {
    var pct = total > 0 ? Math.round((index / total) * 100) : 0;
    progressFill.style.width = pct + '%';
  }

  // Enable YES/NO buttons (may have been disabled during failure action)
  var btnYes = document.getElementById('btn-yes');
  var btnNo = document.getElementById('btn-no');
  if (btnYes) btnYes.disabled = false;
  if (btnNo) btnNo.disabled = false;
}

// ============================================================
// Task 11 — FailureActionView: renderFailureAction + response handlers
// ============================================================

/**
 * renderFailureAction(index)
 * Reads appState.checklist[index].failureAction and populates the
 * failure-action-view screen fields verbatim. Hides the SAY block when
 * failureAction.say is null. Called by the NO button handler (Task 10).
 *
 * Constraint 7 (implementation-plan.md Section 8): NO string transformation
 * on role, channel, or say. Use .textContent assignment only.
 */
function renderFailureAction(index) {
  var item = appState.checklist[index];
  var fa = item.failureAction;

  // Verbatim output — no trim(), toLowerCase(), substring(), or template modification
  document.getElementById('failure-action-role').textContent = fa.role;
  document.getElementById('failure-action-channel').textContent = fa.channel;

  var sayBlock = document.getElementById('failure-action-say-block');
  var sayEl = document.getElementById('failure-action-say');
  if (fa.say !== null && fa.say !== undefined && fa.say !== '') {
    sayEl.textContent = fa.say;  // verbatim — no transformation
    sayBlock.style.display = 'block';
  } else {
    sayEl.textContent = '';
    sayBlock.style.display = 'none';
  }

  // Trigger failure-action-reveal animation (styling-spec.md Section 6)
  // Card starts at translateY(100%); adding 'revealed' class on next frame plays transition
  var card = document.getElementById('failure-action-card');
  if (card) {
    card.classList.remove('revealed');
    requestAnimationFrame(function () {
      card.classList.add('revealed');
    });
  }
}

// "Done — action complete" button handler
// Records response 'done', persists state, advances checklist.
// advanceChecklist() handles all navigation internally (checklist-view or audit-summary).
document.getElementById('btn-done').addEventListener('click', function () {
  var item = appState.checklist[appState.currentItemIndex];
  appState.responses.push({
    itemId: item.id,
    response: 'done',                          // schema: implementation-plan.md Section 4.2
    timestamp: new Date().toISOString()
  });
  persistState();      // REQUIRED — must be called after every response push (Section 4.3)
  advanceChecklist();  // increment currentItemIndex; navigate if all items answered
});

// "Needs Follow-Up" button handler
// Records response 'needs-followup', persists state, advances checklist.
// advanceChecklist() handles all navigation internally (checklist-view or audit-summary).
document.getElementById('btn-follow-up').addEventListener('click', function () {
  var item = appState.checklist[appState.currentItemIndex];
  appState.responses.push({
    itemId: item.id,
    response: 'needs-followup',                // schema: implementation-plan.md Section 4.2
    timestamp: new Date().toISOString()
  });
  persistState();      // REQUIRED — must be called after every response push (Section 4.3)
  advanceChecklist();  // increment currentItemIndex; navigate if all items answered
});

// NOTE: There is no back button handler for failure-action-view.
// The user must tap one of the two buttons above to proceed.
// This is enforced by the HTML structure (no back button element in #failure-action-view).

function advanceChecklist() {
  appState.currentItemIndex += 1;
  var checklist = appState.checklist;

  if (appState.currentItemIndex < checklist.length) {
    // More items remain: render next item and stay on checklist-view
    renderChecklistItem(appState.currentItemIndex);
    showScreen('checklist-view');
  } else {
    // All items answered: navigate to audit summary, clear in-progress session
    localStorage.removeItem('lot-checklist-app-session-in-progress');
    renderAuditSummary();
    showScreen('audit-summary');
  }
}

// ============================================================
// Task 12 — AuditSummary: renderAuditSummary + generateTaskList
// ============================================================

/**
 * renderAuditSummary()
 * Counts responses by type and updates the audit-summary screen stat display.
 * Called by advanceChecklist() when all checklist items have been answered.
 *
 * Response values (implementation-plan.md Section 4.2):
 *   'yes'            → counted as passed
 *   'done'           → counted as resolved
 *   'needs-followup' → counted as flagged
 */
function renderAuditSummary() {
  var total    = appState.checklist.length;
  var passed   = appState.responses.filter(function (r) { return r.response === 'yes'; }).length;
  var resolved = appState.responses.filter(function (r) { return r.response === 'done'; }).length;
  var flagged  = appState.responses.filter(function (r) { return r.response === 'needs-followup'; }).length;

  document.getElementById('summary-total').textContent    = total;
  document.getElementById('summary-passed').textContent   = passed;
  document.getElementById('summary-resolved').textContent = resolved;
  document.getElementById('summary-flagged').textContent  = flagged;
}

/**
 * generateTaskList()
 * Iterates appState.responses, collects all non-YES responses (done + needs-followup),
 * retrieves the corresponding checklist item for each, and builds a structured task array.
 * Stores the result as appState.taskList.
 *
 * Task object fields (implementation-plan.md Section 7 Task 12):
 *   itemId       — from checklist item id
 *   itemText     — from item.text (verbatim — no transformation)
 *   zone         — from item.zone (null for non-morning-lot-walk items)
 *   failureAction — the complete failureAction object {role, channel, say, responsibleTeam}
 *   response     — 'done' or 'needs-followup'
 *   timestamp    — from the response record
 *   vehicleVIN   — from appState.vehicleVIN (null for non-vehicle audits)
 *
 * Grouping: tasks are grouped by failureAction.responsibleTeam value:
 *   'Lot'     → LOT TEAM group
 *   'Sales'   → SALES TEAM group
 *   'Service' → SERVICE DEPARTMENT group
 * (Grouping is consumed by renderTaskList() in Task 13)
 */
function generateTaskList() {
  var tasks = [];

  appState.responses.forEach(function (response) {
    // Only collect non-YES responses — 'done' and 'needs-followup'
    if (response.response === 'yes') {
      return;
    }

    // Find the matching checklist item by itemId
    var item = null;
    for (var i = 0; i < appState.checklist.length; i++) {
      if (appState.checklist[i].id === response.itemId) {
        item = appState.checklist[i];
        break;
      }
    }
    if (!item) {
      return; // itemId not found — skip (should not occur in normal flow)
    }

    tasks.push({
      itemId:       item.id,
      itemText:     item.text,          // verbatim — Constraint 1 (implementation-plan.md Section 8)
      zone:         item.zone,          // null for non-morning-lot-walk items
      failureAction: item.failureAction, // {role, channel, say, responsibleTeam}
      response:     response.response,  // 'done' or 'needs-followup'
      timestamp:    response.timestamp,
      vehicleVIN:   appState.vehicleVIN // null for non-vehicle audits
    });
  });

  // Store on appState — consumed by renderTaskList() in Task 13
  appState.taskList = tasks;

  // Group by responsibleTeam for renderTaskList()
  // Order: Lot → Sales → Service
  appState.taskListGrouped = {
    lot:     tasks.filter(function (t) { return t.failureAction.responsibleTeam === 'Lot'; }),
    sales:   tasks.filter(function (t) { return t.failureAction.responsibleTeam === 'Sales'; }),
    service: tasks.filter(function (t) { return t.failureAction.responsibleTeam === 'Service'; })
  };
}

// Wire "Generate Task List" button
document.getElementById('btn-generate-tasks').addEventListener('click', function () {
  generateTaskList();
  renderTaskList();  // defined in Task 13
  showScreen('task-list');
});

// ============================================================
// Task 13 — TaskList: renderTaskList
// ============================================================

/**
 * renderTaskList()
 * Reads appState.taskListGrouped (set by generateTaskList() in Task 12).
 * Builds the task list DOM inside #task-list-container.
 * Groups displayed in order: LOT TEAM → SALES TEAM → SERVICE DEPARTMENT.
 * Groups with zero tasks are omitted entirely.
 *
 * FOLLOW-UP variant (response === 'needs-followup'):
 *   - Applies .task-card--follow-up class (left orange border)
 *   - STATUS badge: background var(--color-needs-followup), label "FOLLOW-UP"
 *
 * Resolved variant (response === 'done'):
 *   - No left border variant
 *   - STATUS badge: background var(--color-success), label "Resolved"
 *
 * task-list-appear animation (styling-spec.md Section 6):
 *   Each .task-card gets style="--card-index: N" where N is the card's
 *   position in the flattened list (0-based). CSS uses this to stagger
 *   animation-delay: calc(var(--card-index) * 50ms).
 */
function renderTaskList() {
  var container = document.getElementById('task-list-container');
  container.innerHTML = ''; // clear previous render

  var grouped = appState.taskListGrouped;
  var groups = [
    { key: 'lot',     label: 'LOT TEAM' },
    { key: 'sales',   label: 'SALES TEAM' },
    { key: 'service', label: 'SERVICE DEPARTMENT' }
  ];

  var cardIndex = 0; // global card index for stagger animation

  groups.forEach(function (group) {
    var tasks = grouped[group.key];
    if (!tasks || tasks.length === 0) {
      return; // omit groups with no tasks
    }

    // Create team group wrapper
    var groupEl = document.createElement('div');
    groupEl.className = 'team-group';

    // TeamGroupHeader (styling-spec.md Section 7g)
    var headerEl = document.createElement('div');
    headerEl.className = 'team-header glass-card';
    headerEl.textContent = group.label; // exactly: "LOT TEAM" | "SALES TEAM" | "SERVICE DEPARTMENT"
    groupEl.appendChild(headerEl);

    // Task cards
    tasks.forEach(function (task) {
      var isFollowUp = task.response === 'needs-followup';

      // Card element — applies glass-card and conditionally task-card--follow-up
      var cardEl = document.createElement('div');
      cardEl.className = 'task-card glass-card' + (isFollowUp ? ' task-card--follow-up' : '');
      // Set --card-index for task-list-appear stagger animation (styling-spec.md Section 6)
      cardEl.style.setProperty('--card-index', cardIndex);
      cardIndex++;

      // VEHICLE field — shown only for vehicle audits (vehicleVIN is non-null)
      if (task.vehicleVIN) {
        var vehicleRow = document.createElement('div');
        vehicleRow.className = 'task-field-row';
        vehicleRow.innerHTML =
          '<span class="task-card__field-label">VEHICLE</span>' +
          '<span class="task-card__field-value--vehicle">' + escapeHtml(task.vehicleVIN) + '</span>';
        cardEl.appendChild(vehicleRow);
      }

      // ZONE field — shown only for Morning Lot Walk items (zone is non-null)
      if (task.zone) {
        var zoneRow = document.createElement('div');
        zoneRow.className = 'task-field-row';
        zoneRow.innerHTML =
          '<span class="task-card__field-label">ZONE</span>' +
          '<span class="task-card__field-value--item">' + escapeHtml(task.zone) + '</span>';
        cardEl.appendChild(zoneRow);
      }

      // ITEM field — checklist item text (verbatim — Constraint 1)
      var itemRow = document.createElement('div');
      itemRow.className = 'task-field-row';
      itemRow.innerHTML =
        '<span class="task-card__field-label">ITEM</span>' +
        '<span class="task-card__field-value--item">' + escapeHtml(task.itemText) + '</span>';
      cardEl.appendChild(itemRow);

      // ACTION field — failure action role + channel + say (verbatim — Constraint 7)
      var actionText = task.failureAction.role + ' — ' + task.failureAction.channel;
      if (task.failureAction.say) {
        actionText += ': ' + task.failureAction.say; // verbatim say script
      }
      var actionRow = document.createElement('div');
      actionRow.className = 'task-field-row';
      actionRow.innerHTML =
        '<span class="task-card__field-label">ACTION</span>' +
        '<span class="task-card__field-value--action">' + escapeHtml(actionText) + '</span>';
      cardEl.appendChild(actionRow);

      // STATUS badge — FOLLOW-UP (orange) or Resolved (green)
      var statusRow = document.createElement('div');
      statusRow.className = 'task-field-row';
      var badgeClass = isFollowUp ? 'task-card__status-badge task-card__status-badge--followup' : 'task-card__status-badge task-card__status-badge--resolved';
      var badgeLabel = isFollowUp ? 'FOLLOW-UP' : 'Resolved';
      statusRow.innerHTML =
        '<span class="task-card__field-label">STATUS</span>' +
        '<span class="' + badgeClass + '">' + badgeLabel + '</span>';
      cardEl.appendChild(statusRow);

      groupEl.appendChild(cardEl);
    });

    container.appendChild(groupEl);
  });

  // If no tasks at all, show an empty state message
  if (cardIndex === 0) {
    var emptyEl = document.createElement('p');
    emptyEl.className = 'task-list-empty';
    emptyEl.textContent = 'All items passed. No tasks to action.';
    container.appendChild(emptyEl);
  }
}

/**
 * escapeHtml(str)
 * Escapes user-visible strings before inserting via innerHTML.
 * Prevents XSS from checklist data that could contain special characters.
 * Used only for display — .textContent is preferred where innerHTML is not needed.
 */
function escapeHtml(str) {
  if (str === null || str === undefined) { return ''; }
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Wire Share button — implementation added in Task 14
document.getElementById('btn-share-tasks').addEventListener('click', function () {
  shareTaskList(); // defined in Task 14
});

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

// ------------------------------------------------------------
// VIN ENTRY — validation and routing to CategorySelect
// Wired inside DOMContentLoaded in the section added below.
// ------------------------------------------------------------

// VIN format: exactly 17 chars, uppercase A-H, J-N, P-Z, 0-9
// (excludes I, O, Q which are not valid VIN characters)
var VIN_REGEX = /^[A-HJ-NPR-Z0-9]{17}$/i;

function handleVINNext() {
  var vinInput = document.getElementById('vin-input');
  var vinError = document.getElementById('vin-error');
  if (!vinInput) return;

  var vin = vinInput.value.trim().toUpperCase();

  if (!VIN_REGEX.test(vin)) {
    // Show inline error — no alert()
    if (vinError) vinError.style.display = 'block';
    vinInput.focus();
    return;
  }

  // Valid VIN: clear error, store, route to category select
  if (vinError) vinError.style.display = 'none';
  appState.vehicleVIN = vin;

  // Display VIN on category select screen
  var vinDisplay = document.getElementById('category-vin-display');
  if (vinDisplay) {
    vinDisplay.textContent = 'VIN: ' + vin;
  }

  showScreen('category-select');
}

function handleCategorySelect(category) {
  // category: 'NEW' | 'FLR' | 'SOLD' | 'BND' | 'RECON'
  appState.vehicleCategory = category;
  appState.checklist = CHECKLISTS['vehicle-audit'][category];
  appState.currentItemIndex = 0;
  appState.sessionStartTime = new Date().toISOString();
  renderChecklistItem(0);
  showScreen('checklist-view');
}

// Wire VIN and Category handlers — append to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {

  // VIN Next button
  var btnVinNext = document.getElementById('btn-vin-next');
  if (btnVinNext) {
    btnVinNext.addEventListener('click', handleVINNext);
  }

  // VIN input: submit on Enter key
  var vinInput = document.getElementById('vin-input');
  if (vinInput) {
    vinInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        handleVINNext();
      }
    });
    // Clear error on input change
    vinInput.addEventListener('input', function() {
      var vinError = document.getElementById('vin-error');
      if (vinError) vinError.style.display = 'none';
    });
  }

  // Category buttons
  var categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var category = btn.getAttribute('data-category');
      if (category) {
        handleCategorySelect(category);
      }
    });
    // Press animation
    btn.addEventListener('pointerdown', function() {
      btn.style.transform = 'scale(0.97)';
      btn.style.transition = 'transform var(--duration-fast) var(--easing-standard)';
    });
    btn.addEventListener('pointerup', function() {
      btn.style.transform = 'scale(1)';
      btn.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
    btn.addEventListener('pointercancel', function() {
      btn.style.transform = 'scale(1)';
      btn.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
  });

});

// ------------------------------------------------------------
// KEY/PLATE SUB-TYPE BUTTON HANDLERS
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {

  // Back button — returns to audit-type-select
  document.getElementById('btn-kp-back').addEventListener('click', function () {
    showScreen('audit-type-select');
  });

  // Sign-Out
  document.getElementById('btn-kp-sign-out').addEventListener('click', function () {
    appState.keyPlateSubType = 'sign-out';
    appState.checklist = CHECKLISTS['key-plate']['sign-out'];
    appState.currentItemIndex = 0;
    appState.responses = [];
    appState.sessionStartTime = new Date().toISOString();
    renderChecklistItem(0);
    showScreen('checklist-view');
  });

  // Sign-In
  document.getElementById('btn-kp-sign-in').addEventListener('click', function () {
    appState.keyPlateSubType = 'sign-in';
    appState.checklist = CHECKLISTS['key-plate']['sign-in'];
    appState.currentItemIndex = 0;
    appState.responses = [];
    appState.sessionStartTime = new Date().toISOString();
    renderChecklistItem(0);
    showScreen('checklist-view');
  });

  // Periodic Audit
  document.getElementById('btn-kp-periodic').addEventListener('click', function () {
    appState.keyPlateSubType = 'periodic-audit';
    appState.checklist = CHECKLISTS['key-plate']['periodic-audit'];
    appState.currentItemIndex = 0;
    appState.responses = [];
    appState.sessionStartTime = new Date().toISOString();
    renderChecklistItem(0);
    showScreen('checklist-view');
  });

});

// ------------------------------------------------------------
// PDI COMPLIANCE REVIEW SCREEN HANDLERS
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {

  // PDI Compliance — back button
  document.getElementById('btn-pdi-back').addEventListener('click', function () {
    showScreen('audit-type-select');
  });

  // PDI Compliance — Calculate Status button
  document.getElementById('btn-pdi-calculate').addEventListener('click', function () {
    var vinInput = document.getElementById('pdi-vin-input');
    var arrivalDateInput = document.getElementById('pdi-arrival-date');
    var errorMsg = document.getElementById('pdi-error-msg');
    var statusBlock = document.getElementById('pdi-status-block');
    var statusLabel = document.getElementById('pdi-status-label');
    var daysElapsedEl = document.getElementById('pdi-days-elapsed');

    errorMsg.style.display = 'none';
    statusBlock.style.display = 'none';

    // Validate VIN
    if (!vinInput.value || vinInput.value.trim().length === 0) {
      errorMsg.textContent = 'Please enter a VIN.';
      errorMsg.style.display = 'block';
      return;
    }

    // Validate arrival date
    if (!arrivalDateInput.value) {
      errorMsg.textContent = 'Please select an arrival date.';
      errorMsg.style.display = 'block';
      return;
    }

    // Compute days elapsed
    // Parse date parts manually to create local-time date (avoids UTC off-by-one for
    // users in UTC-negative timezones where new Date("YYYY-MM-DD") creates UTC midnight
    // which becomes the previous local day before setHours resets it).
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var dateParts = arrivalDateInput.value.split('-');
    var arrivalDate = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
    var daysElapsed = Math.floor((today - arrivalDate) / 86400000);

    if (daysElapsed < 0) {
      errorMsg.textContent = 'Arrival date cannot be in the future.';
      errorMsg.style.display = 'block';
      return;
    }

    // Set status label and color per spec
    if (daysElapsed === 0) {
      statusLabel.textContent = 'ON TIME';
      statusLabel.style.color = 'var(--color-success)';
    } else if (daysElapsed === 1) {
      statusLabel.textContent = 'DAY 1 OVERDUE';
      statusLabel.style.color = 'var(--color-warning)';
    } else {
      // daysElapsed >= 2
      statusLabel.textContent = 'DAY 2+ OVERDUE \u2014 CRITICAL';
      statusLabel.style.color = 'var(--color-destructive)';
    }

    daysElapsedEl.textContent = daysElapsed + (daysElapsed === 1 ? ' day' : ' days') + ' since arrival';

    statusBlock.style.display = 'block';
  });

  // PDI Compliance — Begin PDI Checklist button
  document.getElementById('btn-pdi-begin-checklist').addEventListener('click', function () {
    var vinInput = document.getElementById('pdi-vin-input');

    appState.auditType = 'pdi-compliance';
    appState.vehicleVIN = vinInput.value.trim();
    appState.vehicleCategory = null;
    appState.keyPlateSubType = null;
    appState.checklist = CHECKLISTS['pdi-compliance'];
    appState.currentItemIndex = 0;
    appState.responses = [];
    appState.sessionStartTime = new Date().toISOString();

    renderChecklistItem(0);
    showScreen('checklist-view');
  });

});

// ------------------------------------------------------------
// CHECKLIST YES/NO BUTTON HANDLERS
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {

  var btnYes = document.getElementById('btn-yes');
  var btnNo = document.getElementById('btn-no');

  if (btnYes) {
    // Press animation (yes-button-tap)
    btnYes.addEventListener('pointerdown', function() {
      btnYes.style.transform = 'scale(0.95)';
      btnYes.style.transition = 'transform var(--duration-fast) var(--easing-standard)';
    });
    btnYes.addEventListener('pointerup', function() {
      btnYes.style.transform = 'scale(1)';
      btnYes.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
    btnYes.addEventListener('pointercancel', function() {
      btnYes.style.transform = 'scale(1)';
      btnYes.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });

    btnYes.addEventListener('click', function() {
      if (btnYes.disabled) return;
      var checklist = appState.checklist;
      var index = appState.currentItemIndex;
      if (!checklist || index >= checklist.length) return;

      var item = checklist[index];

      // Record YES response
      appState.responses.push({
        itemId: item.id,
        response: 'yes',
        timestamp: new Date().toISOString()
      });

      // Persist after every response — CONSTRAINT 2 (offline-first: survive app close)
      persistState();

      // Animate: current item exits left, next item enters from right
      var card = document.getElementById('checklist-item-card');
      if (card) {
        card.style.transition = 'transform var(--duration-standard) var(--easing-standard), opacity var(--duration-standard) var(--easing-standard)';
        card.style.transform = 'translateX(-100%)';
        card.style.opacity = '0';
        setTimeout(function() {
          card.style.transition = 'none';
          card.style.transform = 'translateX(100%)';
          card.style.opacity = '0';
          // Allow reflow
          void card.offsetWidth;
          card.style.transition = 'transform var(--duration-standard) var(--easing-standard), opacity var(--duration-standard) var(--easing-standard)';
          card.style.transform = 'translateX(0)';
          card.style.opacity = '1';
          advanceChecklist();
        }, 250); // var(--duration-standard) = 0.25s
      } else {
        advanceChecklist();
      }
    });
  }

  if (btnNo) {
    // Press animation
    btnNo.addEventListener('pointerdown', function() {
      btnNo.style.transform = 'scale(0.95)';
      btnNo.style.transition = 'transform var(--duration-fast) var(--easing-standard)';
    });
    btnNo.addEventListener('pointerup', function() {
      btnNo.style.transform = 'scale(1)';
      btnNo.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });
    btnNo.addEventListener('pointercancel', function() {
      btnNo.style.transform = 'scale(1)';
      btnNo.style.transition = 'transform var(--duration-standard) var(--easing-spring)';
    });

    btnNo.addEventListener('click', function() {
      if (btnNo.disabled) return;
      var checklist = appState.checklist;
      var index = appState.currentItemIndex;
      if (!checklist || index >= checklist.length) return;

      // Disable both buttons while failure action view is shown
      if (btnYes) btnYes.disabled = true;
      btnNo.disabled = true;

      // Navigate to failure action view — renderFailureAction implemented in task 11
      renderFailureAction(index);
      showScreen('failure-action-view');
    });
  }

});
