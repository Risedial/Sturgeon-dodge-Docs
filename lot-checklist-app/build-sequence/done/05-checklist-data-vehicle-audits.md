# BUILD PROMPT 05 — CHECKLIST DATA: VEHICLE AUDITS

| Field | Value |
|---|---|
| **Parallel Group** | A (parallel with 02 — both depend only on 01) |
| **Depends on** | 01 |
| **Unblocks** | 06 |
| **Modifies** | `lot-checklist-app/data.js` |
| **Estimated output** | ~120 lines replacing the `CHECKLISTS = {}` stub in `data.js` |

---

## STEP 1 — READ CONTEXT FILES

Read these files before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in STEP 2
2. `lot-checklist-app/implementation-plan.md` — Section 3 (Checklist Data Architecture) defines the exact schema every item object must conform to; Sections 3.1–3.3 define the key structure, item schema, and ID prefix table
3. `lot-checklist-app/data.js` — read to confirm Task 01 scaffold stub `const CHECKLISTS = {};` is present

The source checklist files below contain the verbatim item text and Failure Action text that must be copied exactly into data.js. Read them in full:

4. `checklists/vehicle-audit-new.md` → 7 items for `CHECKLISTS['vehicle-audit']['NEW']`
5. `checklists/vehicle-audit-flr.md` → 8 items for `CHECKLISTS['vehicle-audit']['FLR']`
6. `checklists/vehicle-audit-sold.md` → 3 items for `CHECKLISTS['vehicle-audit']['SOLD']`
7. `checklists/vehicle-audit-bnd.md` → 4 items for `CHECKLISTS['vehicle-audit']['BND']`
8. `checklists/vehicle-audit-recon.md` → 6 items for `CHECKLISTS['vehicle-audit']['RECON']`

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If prompt `05` has any status other than `pending`:**
STOP. Tell the user exactly:
> "Build prompt 05 has status `[current status]` — expected `pending`. Do not re-run a completed or in-progress prompt. If you need to reset, set status back to `pending` and restore `data.js` to the scaffold stub `const CHECKLISTS = {};`."

**If prompt `01` has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 05 cannot start — prompt 01 (project-scaffold) has status `[current status]`. Wait for prompt 01 to complete, then re-send this prompt."

**If prompt `05` has status `pending` AND prompt `01` has status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.05.status` → `"in_progress"`
- `prompts.05.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting build prompt 05: CHECKLIST DATA — VEHICLE AUDITS."

---

## STEP 3 — TASK

### Context

This task populates `CHECKLISTS['vehicle-audit']` in `data.js` for all 5 vehicle status categories: NEW, FLR, SOLD, BND, and RECON. Item text and Failure Action text are copied verbatim from the source checklist files — no rewording, no summarization, no punctuation changes.

The existing file contains only:
```javascript
const CHECKLISTS = {};
```

This task replaces that stub with the full CHECKLISTS structure (vehicle-audit populated; other keys as empty stubs for Task 06 to fill in).

**Critical schema rule from `implementation-plan.md` Section 3.4:**
No function in `app.js` may transform item text at render time. `renderChecklistItem()` and `renderFailureAction()` output strings directly with `.textContent = item.text` and `.textContent = item.failureAction.say`. The data file is the single source of truth — text must be correct here.

**Critical schema from `implementation-plan.md` Section 3.2:**
Every item object must conform to:
```javascript
{
  id:            String,   // "[prefix]-[NN]" — e.g., "va-new-01"
  text:          String,   // Verbatim from source checklist file
  zone:          null,     // null for ALL vehicle audit items (zone is Morning Lot Walk only)
  failureAction: {
    role:            String,  // Responsible role exactly as in source file
    channel:         String,  // Communication channel ("via WhatsApp" | "in person")
    say:             String|null,  // Exact SAY script or null if none specified
    responsibleTeam: String   // "Lot" | "Sales" | "Service"
  }
}
```

### CONSTRAINTS

- **Checklist fidelity:** Item text and Failure Action text must match source files exactly. No rewording.
- **Offline-first:** `data.js` contains no `fetch()` calls, no `import` statements, no async code, no CDN references. Plain synchronous JavaScript only.
- **No build step:** `data.js` is a plain `.js` file. No ES modules (`export`), no CommonJS (`module.exports`). The `const CHECKLISTS` declaration is the only export mechanism — it is available globally when `data.js` is loaded before `app.js` via `<script>` tags.
- **Binary responses only:** The `failureAction` data supports only the YES/NO response model. No item has a third response option.
- **Exact Failure Action text:** The `say` field must be the exact SAY script from the source file, including all punctuation, as a JavaScript string. Multi-line scripts (e.g., the 3-strike protocol) are represented as a single string with `\n` line breaks between strike levels.
- **No Phase 2 features:** No `decisionTreeRef`, no `hasDecisionTreeRef`, no `overdueDays`, no Phase 2 fields on any item object.
- **zone is null for all vehicle audit items:** Do not assign zone values to any vehicle audit item.

### Instructions

Replace the entire content of `lot-checklist-app/data.js` with the content shown below. The comment header from Task 01 is preserved; the stub `const CHECKLISTS = {};` is replaced with the full populated structure.

**Before writing, re-read each source checklist file to verify the item text you are about to write matches the source exactly.** The text provided below is synthesized from those files — confirm it matches verbatim before writing.

---

#### Complete content for `lot-checklist-app/data.js` (after this task):

```javascript
/* Lot Checklist App — data.js
   All checklist content. Pre-bundled — no fetch calls, no async loading.
   Available offline immediately on page load.

   Exact key structure (implementation-plan.md Section 3.1):
     CHECKLISTS['vehicle-audit']['NEW']          — 7 items (Task 05)
     CHECKLISTS['vehicle-audit']['FLR']          — 8 items (Task 05)
     CHECKLISTS['vehicle-audit']['SOLD']         — 3 items (Task 05)
     CHECKLISTS['vehicle-audit']['BND']          — 4 items (Task 05)
     CHECKLISTS['vehicle-audit']['RECON']        — 6 items (Task 05)
     CHECKLISTS['morning-lot-walk']              — 15 items (Task 06)
     CHECKLISTS['pdi-compliance']               — 1 template item (Task 06)
     CHECKLISTS['key-plate']['sign-out']         — 4 items (Task 06)
     CHECKLISTS['key-plate']['sign-in']          — 2 items (Task 06)
     CHECKLISTS['key-plate']['periodic-audit']   — 2 items (Task 06)
*/

const CHECKLISTS = {

  'vehicle-audit': {

    /* ---- NEW (7 items) — source: checklists/vehicle-audit-new.md ---- */
    'NEW': [
      {
        id: 'va-new-01',
        text: 'Is ship mode cleared? (battery reconnected AND software reset performed)',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'via WhatsApp',
          say: 'Ship mode not cleared on [VIN]. Battery needs reconnection and software reset before PDI can begin.',
          responsibleTeam: 'Service'
        }
      },
      {
        id: 'va-new-02',
        text: 'Is the PDI scheduled or already complete? (verify in manufacturer system — verbal confirmation is not sufficient)',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'via WhatsApp',
          say: 'PDI needed for [VIN]. Stellantis 2-day window is running from [arrival date]. Please schedule and assign today.',
          responsibleTeam: 'Service'
        }
      },
      {
        id: 'va-new-03',
        text: 'Is the Airtable system status set to \u201cPending PDI\u201d (NOT \u201cIN RECON\u201d or any other incorrect status)?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'via WhatsApp',
          say: 'Status corrected for [VIN] \u2014 was incorrectly set to [wrong status], corrected to Pending PDI.',
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-new-04',
        text: 'Is the stock-in tag filled out and placed in the bottom-right corner of the windshield?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-new-05',
        text: 'Are all manufacturer and transport stickers removed from the vehicle (all exterior panels and glass)?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-new-06',
        text: 'Is all tape removed from the vehicle (all surfaces \u2014 body, glass, trim)?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-new-07',
        text: 'Is the vehicle free of visible dirt, dust, and debris on all exterior panels?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'via WhatsApp',
          say: 'Vehicle [VIN] routed to DHD for full detail \u2014 exterior not clean to standard.',
          responsibleTeam: 'Lot'
        }
      }
    ],

    /* ---- FLR (8 items) — source: checklists/vehicle-audit-flr.md ---- */
    'FLR': [
      {
        id: 'va-flr-01',
        text: 'Is PDI marked complete in the manufacturer system by the assigned technician? (verify in manufacturer system \u2014 verbal confirmation is not sufficient)',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'via WhatsApp',
          say: 'Vehicle [VIN] in Cage / scheduled for Cage does not have PDI marked complete in manufacturer system. This vehicle needs PDI before it can be on the front line.',
          responsibleTeam: 'Service'
        }
      },
      {
        id: 'va-flr-02',
        text: 'Is the vehicle free of visible dirt, dust, and debris on all exterior panels?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'via WhatsApp',
          say: 'Vehicle [VIN] routed to DHD for full detail \u2014 exterior not clean to Cage standard.',
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-flr-03',
        text: 'Are all stickers removed from the vehicle (all exterior panels, glass, and trim)?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-flr-04',
        text: 'Is all tape removed from the vehicle (all surfaces \u2014 body, glass, trim)?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-flr-05',
        text: 'Is the stock-in tag present in the bottom-right corner of the windshield (white tag, placed by lot team after PDI and detail are complete)?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-flr-06',
        text: 'Is the vehicle facing outward (toward the street / customer-facing direction)?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-flr-07',
        text: 'Is there adequate spacing on both sides of the vehicle so that both doors can fully open for a customer to enter and exit?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-flr-08',
        text: 'Is the vehicle parked in the correct Cage slot per placement priority rules (C01\u2013C20)?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'via WhatsApp',
          say: null,
          responsibleTeam: 'Lot'
        }
      }
    ],

    /* ---- SOLD (3 items) — source: checklists/vehicle-audit-sold.md ---- */
    'SOLD': [
      {
        id: 'va-sold-01',
        text: 'Is a sold sign present in the vehicle with the customer\u2019s name written on it?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'in person',
          say: 'Strike 1: \u201cHey, Kevin, do you mind getting your guys to put a sold sign in there?\u201d\nStrike 2 (if not resolved after Strike 1): \u201cHey, Kevin, do you mind?\u201d\nStrike 3 (if not resolved after Strike 2): \u201cKev, killing me, buddy. Can you just tell me the stuff and I\u2019ll do it, because we have to be organized.\u201d',
          responsibleTeam: 'Sales'
        }
      },
      {
        id: 'va-sold-02',
        text: 'Is the vehicle parked in the East Side Fence Line (F1\u2013F5) or West Side of Building (L1\u2013L5) \u2014 NOT in the Cage or any front-line zone?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-sold-03',
        text: 'Is PDI confirmed complete in the manufacturer system before the vehicle is delivered to the customer?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'via WhatsApp',
          say: 'PDI for [VIN] has not been marked complete in the manufacturer system. Delivery cannot proceed. Stellantis requires PDI completion within 2 days of vehicle arrival. Please prioritize PDI now.',
          responsibleTeam: 'Service'
        }
      }
    ],

    /* ---- BND (4 items) — source: checklists/vehicle-audit-bnd.md ---- */
    'BND': [
      {
        id: 'va-bnd-01',
        text: 'Is a sold sign present in the vehicle with the customer\u2019s name written on it?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'in person',
          say: 'Strike 1: \u201cHey, Kevin, do you mind getting your guys to put a sold sign in there?\u201d\nStrike 2 (if not resolved after Strike 1): \u201cHey, Kevin, do you mind?\u201d\nStrike 3 (if not resolved after Strike 2): \u201cKev, killing me, buddy. Can you just tell me the stuff and I\u2019ll do it, because we have to be organized.\u201d',
          responsibleTeam: 'Sales'
        }
      },
      {
        id: 'va-bnd-02',
        text: 'Is the vehicle parked in the East Side Fence Line (F1\u2013F5) or West Side of Building (L1\u2013L5) \u2014 NOT in the Cage?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-bnd-03',
        text: 'Is the expected delivery date for this vehicle documented in the WhatsApp team chat?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'via WhatsApp',
          say: 'What is the expected delivery date for [VIN / customer name]? We need this documented in team chat so the lot team can manage the space and track PDI timing.',
          responsibleTeam: 'Sales'
        }
      },
      {
        id: 'va-bnd-04',
        text: 'Is PDI confirmed complete in the manufacturer system?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'via WhatsApp',
          say: 'PDI not yet confirmed complete in manufacturer system for BND vehicle [VIN]. Stellantis 2-day window from arrival date [date]. Please assign and prioritize.',
          responsibleTeam: 'Service'
        }
      }
    ],

    /* ---- RECON (6 items) — source: checklists/vehicle-audit-recon.md ---- */
    'RECON': [
      {
        id: 'va-recon-01',
        text: 'Is the Airtable system status correct for a RECON vehicle \u2014 one of: IN RECON, INCOMING, WHOLESALE, or CHASE \u2014 and NOT \u201cPending PDI\u201d unless it is a new arrival whose PDI revealed mechanical issues?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'via WhatsApp',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-recon-02',
        text: 'Is the vehicle parked in the West Side of Building (slots L1\u2013L5)?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-recon-03',
        text: 'Is a stock-in tag (white) present in the bottom-right corner of the vehicle windshield?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'va-recon-04',
        text: 'Is there an active work order or recon task assigned to this vehicle in the service department?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'via WhatsApp',
          say: 'No work order assigned for RECON vehicle [VIN]. Please assign a work order immediately.',
          responsibleTeam: 'Service'
        }
      },
      {
        id: 'va-recon-05',
        text: 'If RECON work is complete: is PDI also confirmed complete in the manufacturer system (not verbal \u2014 check system)?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'via WhatsApp',
          say: 'RECON is complete for [VIN] but PDI is not yet marked complete in the manufacturer system. Route to PDI immediately \u2014 do not move vehicle to Cage until PDI is complete.',
          responsibleTeam: 'Service'
        }
      },
      {
        id: 'va-recon-06',
        text: 'If both RECON and PDI are complete: is full detail (DHD, $60) also confirmed complete before moving to the Cage?',
        zone: null,
        failureAction: {
          role: 'Lot Attendant',
          channel: 'via WhatsApp',
          say: null,
          responsibleTeam: 'Lot'
        }
      }
    ]
  },

  /* ---- Stubs for Task 06 ---- */
  'morning-lot-walk': [],   /* Task 06 populates this — 15 items */
  'pdi-compliance':   [],   /* Task 06 populates this — 1 template item */
  'key-plate': {
    'sign-out':       [],   /* Task 06 populates this — 4 items */
    'sign-in':        [],   /* Task 06 populates this — 2 items */
    'periodic-audit': []    /* Task 06 populates this — 2 items */
  }

};
```

---

### Verification After Writing

1. Open `lot-checklist-app/data.js`
2. Confirm `const CHECKLISTS = {` is present (not `const CHECKLISTS = {};`)
3. Confirm `CHECKLISTS['vehicle-audit']['NEW']` has 7 item objects
4. Confirm `CHECKLISTS['vehicle-audit']['FLR']` has 8 item objects
5. Confirm `CHECKLISTS['vehicle-audit']['SOLD']` has 3 item objects
6. Confirm `CHECKLISTS['vehicle-audit']['BND']` has 4 item objects
7. Confirm `CHECKLISTS['vehicle-audit']['RECON']` has 6 item objects
8. Confirm all `zone` fields in vehicle-audit items are `null`
9. Confirm `'morning-lot-walk': []` and `'pdi-compliance': []` stubs are present

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading `lot-checklist-app/data.js`. All criteria are objectively verifiable without running the app.

- [ ] `lot-checklist-app/data.js` exists
- [ ] `lot-checklist-app/data.js` contains `const CHECKLISTS = {`
- [ ] `lot-checklist-app/data.js` contains `'vehicle-audit':`
- [ ] `lot-checklist-app/data.js` contains `'NEW':`
- [ ] `lot-checklist-app/data.js` contains `'FLR':`
- [ ] `lot-checklist-app/data.js` contains `'SOLD':`
- [ ] `lot-checklist-app/data.js` contains `'BND':`
- [ ] `lot-checklist-app/data.js` contains `'RECON':`
- [ ] `lot-checklist-app/data.js` contains `id: 'va-new-01'`
- [ ] `lot-checklist-app/data.js` contains `id: 'va-new-07'` (7th and final NEW item)
- [ ] `lot-checklist-app/data.js` contains `id: 'va-flr-01'`
- [ ] `lot-checklist-app/data.js` contains `id: 'va-flr-08'` (8th and final FLR item)
- [ ] `lot-checklist-app/data.js` contains `id: 'va-sold-01'`
- [ ] `lot-checklist-app/data.js` contains `id: 'va-sold-03'` (3rd and final SOLD item)
- [ ] `lot-checklist-app/data.js` contains `id: 'va-bnd-01'`
- [ ] `lot-checklist-app/data.js` contains `id: 'va-bnd-04'` (4th and final BND item)
- [ ] `lot-checklist-app/data.js` contains `id: 'va-recon-01'`
- [ ] `lot-checklist-app/data.js` contains `id: 'va-recon-06'` (6th and final RECON item)
- [ ] `lot-checklist-app/data.js` contains `responsibleTeam: 'Sales'` (for sold-sign items)
- [ ] `lot-checklist-app/data.js` contains `responsibleTeam: 'Service'` (for PDI/work-order items)
- [ ] `lot-checklist-app/data.js` contains `'morning-lot-walk': []` (stub for Task 06)
- [ ] `lot-checklist-app/data.js` contains `'pdi-compliance': []` (stub for Task 06)
- [ ] `lot-checklist-app/data.js` contains `'key-plate':` with nested stubs (stub for Task 06)
- [ ] `lot-checklist-app/data.js` does NOT contain any `fetch(`, `import `, `require(`, or CDN URL
- [ ] `lot-checklist-app/data.js` does NOT contain `export` keyword (not an ES module)
- [ ] No vehicle-audit item has a non-null `zone` field (all `zone: null`)
- [ ] The 3-strike SAY script is present in `va-sold-01` and `va-bnd-01` `failureAction.say` fields
- [ ] No Phase 2 fields present (no `decisionTreeRef`, no `hasDecisionTreeRef`, no `overdueDays`)

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.05.status` → `"complete"`
   - `prompts.05.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 05 complete.**
> Modified: `lot-checklist-app/data.js` — vehicle audit checklist data populated for all 5 categories (NEW: 7 items, FLR: 8 items, SOLD: 3 items, BND: 4 items, RECON: 6 items). Stubs in place for Task 06.
>
> **Now unblocked:**
> - `06-checklist-data-other-audit-types.md` — morning-lot-walk, PDI compliance, and key/plate data (`data.js`) — send next in sequence
