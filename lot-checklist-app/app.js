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
  try {
    localStorage.setItem(
      'lot-checklist-app-session-in-progress',
      JSON.stringify(appState)
    );
  } catch (e) {
    // localStorage write failed (e.g. private mode quota) — continue without persisting
  }
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
// Full implementation added by build task 15.
// Stub: if no session found, go home.
// ------------------------------------------------------------
function resumeCheck() {
  var stored = localStorage.getItem('lot-checklist-app-session-in-progress');
  if (!stored) {
    initFreshSession();
    showScreen('home');
    return;
  }
  // Full resume logic (parse, show modal, wire Resume/Start Fresh buttons)
  // is implemented in build task 15. Until then, treat any stored session
  // as absent and go home.
  initFreshSession();
  showScreen('home');
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
  // Implemented by build task 10
}

function renderFailureAction(index) {
  // Implemented by build task 11
}

function advanceChecklist() {
  // Implemented by build task 10
}

function renderAuditSummary() {
  // Implemented by build task 12
}

function generateTaskList() {
  // Implemented by build task 12
}

function renderTaskList() {
  // Implemented by build task 13
}

function shareTaskList() {
  // Implemented by build task 14
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
