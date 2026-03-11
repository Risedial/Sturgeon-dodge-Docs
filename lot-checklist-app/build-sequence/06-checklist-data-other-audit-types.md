# BUILD PROMPT 06 — CHECKLIST DATA: OTHER AUDIT TYPES

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL (depends on 05) |
| **Depends on** | 05 |
| **Unblocks** | 10 |
| **Modifies** | `lot-checklist-app/data.js` |
| **Estimated output** | ~100 lines replacing stubs in `data.js` |

---

## STEP 1 — READ CONTEXT FILES

Read these files before doing anything else:

1. `lot-checklist-app/build-sequence/state.json` — checked in STEP 2
2. `lot-checklist-app/implementation-plan.md` — Section 3 (Checklist Data Architecture) defines the item schema and the zone field rules for morning-lot-walk items
3. `lot-checklist-app/data.js` — read to confirm Task 05 is complete and stubs for morning-lot-walk, pdi-compliance, and key-plate are present as empty arrays/objects

The source checklist files below contain the verbatim text. Read them in full:

4. `checklists/morning-lot-walk-checklist.md` → 15 items for `CHECKLISTS['morning-lot-walk']`
5. `checklists/pdi-completion-checklist.md` → 1 template item for `CHECKLISTS['pdi-compliance']`
6. `checklists/key-plate-accountability-checklist.md` → Section A (4 items), Section B (2 items), Section C (2 items) for `CHECKLISTS['key-plate']`

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Read `lot-checklist-app/build-sequence/state.json`.

**If prompt `06` has any status other than `pending`:**
STOP. Tell the user exactly:
> "Build prompt 06 has status `[current status]` — expected `pending`. Do not re-run a completed or in-progress prompt. If you need to reset, set status back to `pending` and restore `data.js` to the Task 05 output state."

**If prompt `05` has any status other than `complete`:**
STOP. Tell the user exactly:
> "Build prompt 06 cannot start — prompt 05 (checklist-data-vehicle-audits) has status `[current status]`. Wait for prompt 05 to complete, then re-send this prompt."

**If prompt `06` has status `pending` AND prompt `05` has status `complete`:**
Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
- `prompts.06.status` → `"in_progress"`
- `prompts.06.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp

Then tell the user:
> "Gate passed. Starting build prompt 06: CHECKLIST DATA — OTHER AUDIT TYPES."

---

## STEP 3 — TASK

### Context

This task fills in the three empty stubs left by Task 05 in `data.js`:
- `CHECKLISTS['morning-lot-walk']` — 15 items with zone annotations
- `CHECKLISTS['pdi-compliance']` — 1 template item
- `CHECKLISTS['key-plate']['sign-out']` — 4 items (Section A of source file)
- `CHECKLISTS['key-plate']['sign-in']` — 2 items (Section B of source file)
- `CHECKLISTS['key-plate']['periodic-audit']` — 2 items (Section C of source file)

Item text and Failure Action text are copied verbatim from the source checklist files. The zone field for morning-lot-walk items must use canonical zone names from CLAUDE.md exactly.

**Critical zone assignment rule from `implementation-plan.md` Section 3.2:**
```
zone: String|null — Zone name for morning-lot-walk items only.
Must use canonical zone names from CLAUDE.md exactly:
  "Cage"
  "East Side Fence Line"
  "West Side of Building"
  "Overflow (Temporary)"
  "Auction Area"
  "Power Sport / Quad Corner"
For all non-morning-lot-walk items (pdi-compliance, key-plate): null.
```

Items in the "LOT-LEVEL CHECKS" section (items 1–2) and "END OF WALK" section (item 15) of the morning walk source file do not correspond to a canonical zone — assign `zone: null` for these items.

**IMPORTANT NOTE for morning-lot-walk item 1:**
The source file item 1 reads "Are there any staff vehicles currently parked on the lot (not on the street)?" with `NO: Continue` and `YES — Failure Action`. This is the inverse of every other checklist item (where YES = pass and NO = fail). The item text is copied verbatim per spec — the executing session for Task 10 must handle this inversion when wiring the YES/NO buttons for this specific item if a runtime workaround is needed. The data file stores the verbatim text regardless.

### CONSTRAINTS

- **Checklist fidelity:** All item text and Failure Action text copied verbatim from source files. No rewording.
- **Offline-first:** No `fetch()`, no `import`, no external references in `data.js`.
- **No build step:** Plain JavaScript. No ES modules, no CommonJS exports.
- **Canonical zone names only:** Zone values for morning-lot-walk items must exactly match the list above. No abbreviations ("ESF" is wrong — "East Side Fence Line" is correct). No alternative names.
- **Binary responses only:** No item has a skip or N/A option. Every item is YES/NO only.
- **Exact Failure Action text:** `say` field contains the exact SAY script verbatim (or null if no scripted language in source file).
- **No Phase 2 features:** No `decisionTreeRef`, no `hasDecisionTreeRef` fields.
- **zone is null for pdi-compliance and key-plate items.**

### Instructions

Read the current content of `lot-checklist-app/data.js` from Task 05. It ends with:

```javascript
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

Replace the stub block above (from `/* ---- Stubs for Task 06 ---- */` through the closing `};`) with the populated content shown below. All vehicle-audit content from Task 05 above that point must remain untouched.

**Before writing, re-read each source checklist file to verify item text matches the source verbatim.**

---

#### Replacement content for the stub block in `lot-checklist-app/data.js`:

```javascript
  /* ---- Morning Lot Walk (15 items) — source: checklists/morning-lot-walk-checklist.md ---- */
  /* Zone assignments:
       Items 1–2 (LOT-LEVEL CHECKS): zone null — not a canonical zone
       Items 3–7 (Cage): zone "Cage"
       Items 8–9 (East Side Fence Line): zone "East Side Fence Line"
       Items 10–11 (West Side of Building): zone "West Side of Building"
       Item 12 (Overflow): zone "Overflow (Temporary)"
       Item 13 (Auction Area): zone "Auction Area"
       Item 14 (Power Sport / Quad Corner): zone "Power Sport / Quad Corner"
       Item 15 (END OF WALK): zone null — not a canonical zone
  */
  'morning-lot-walk': [
    {
      id: 'mlw-01',
      text: 'Are there any staff vehicles currently parked on the lot (not on the street)?',
      zone: null,
      failureAction: {
        role: 'Lot Manager',
        channel: 'in person',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-02',
      text: 'Is the staff vehicle list up to date \u2014 does it include name, make, model, and plate number for every current staff member?',
      zone: null,
      failureAction: {
        role: 'Lot Manager',
        channel: 'in person',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-03',
      text: 'Is every vehicle in the Cage an FLR or NEW category vehicle \u2014 specifically, are there no SOLD, BND, or RECON vehicles in the Cage?',
      zone: 'Cage',
      failureAction: {
        role: 'Lot Attendant',
        channel: 'via WhatsApp',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-04',
      text: 'Does every vehicle in the Cage have the correct signage \u2014 specifically, a white stock-in tag placed in the bottom-right corner of the windshield?',
      zone: 'Cage',
      failureAction: {
        role: 'Lot Attendant',
        channel: 'in person',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-05',
      text: 'Is every vehicle in the Cage confirmed PDI complete (marked in manufacturer system) AND fully detailed (no stickers, no tape, no visible dirt or debris)?',
      zone: 'Cage',
      failureAction: {
        role: 'Lot Manager',
        channel: 'via WhatsApp',
        say: null,
        responsibleTeam: 'Service'
      }
    },
    {
      id: 'mlw-06',
      text: 'Are all Cage vehicles facing outward (toward customers/street) with adequate spacing on both sides so that both doors can fully open?',
      zone: 'Cage',
      failureAction: {
        role: 'Lot Attendant',
        channel: 'in person',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-07',
      text: 'Is there a maximum of one empty Cage stall \u2014 and only if the vehicle in that stall was just sold?',
      zone: 'Cage',
      failureAction: {
        role: 'Lot Manager',
        channel: 'via WhatsApp',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-08',
      text: 'Does every vehicle in the East Side Fence Line have correct signage for its status \u2014 specifically: a sold sign with customer name (for SOLD vehicles), or a sold sign with customer name (for BND vehicles), or a stock-in tag (for FLR sedan overflow)?',
      zone: 'East Side Fence Line',
      failureAction: {
        role: 'Lot Manager',
        channel: 'via WhatsApp',
        say: null,
        responsibleTeam: 'Sales'
      }
    },
    {
      id: 'mlw-09',
      text: 'Is every vehicle in the East Side Fence Line correctly categorized for this zone \u2014 specifically: SOLD, BND, or FLR sedan overflow only (no RECON, no unprocessed, no non-prime vehicles)?',
      zone: 'East Side Fence Line',
      failureAction: {
        role: 'Lot Attendant',
        channel: 'via WhatsApp',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-10',
      text: 'Is every vehicle in the West Side of Building correctly categorized \u2014 specifically: BND overflow, RECON vehicles, or SOLD overflow only (no NEW vehicles, no FLR vehicles, no non-prime vehicles)?',
      zone: 'West Side of Building',
      failureAction: {
        role: 'Lot Attendant',
        channel: 'via WhatsApp',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-11',
      text: 'Does every RECON vehicle in the West Side of Building have an active work order assigned in the service department?',
      zone: 'West Side of Building',
      failureAction: {
        role: 'Lot Manager',
        channel: 'via WhatsApp',
        say: 'No work order assigned for RECON vehicle [VIN] in West Side of Building. Please assign a work order immediately.',
        responsibleTeam: 'Service'
      }
    },
    {
      id: 'mlw-12',
      text: 'Does every vehicle currently staged in Overflow (Temporary) have a destination zone annotation \u2014 specifically, a documented destination in Airtable and/or WhatsApp team chat indicating which permanent zone the vehicle belongs in?',
      zone: 'Overflow (Temporary)',
      failureAction: {
        role: 'Lot Manager',
        channel: 'via WhatsApp',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-13',
      text: 'Are all vehicles in the Auction Area correctly designated as auction-bound in Airtable \u2014 specifically, is there no retail inventory, FLR, or SOLD vehicle that has been incorrectly staged in the Auction Area?',
      zone: 'Auction Area',
      failureAction: {
        role: 'Lot Manager',
        channel: 'via WhatsApp',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-14',
      text: 'Does the Power Sport / Quad Corner contain only power sport vehicles, boats, or seasonal Hysen units \u2014 specifically, are there no retail vehicles (inventory, SOLD, BND, RECON) in this zone?',
      zone: 'Power Sport / Quad Corner',
      failureAction: {
        role: 'Lot Attendant',
        channel: 'via WhatsApp',
        say: null,
        responsibleTeam: 'Lot'
      }
    },
    {
      id: 'mlw-15',
      text: 'Has a task list been compiled from all identified issues and posted in WhatsApp team chat, with tasks grouped by responsible team (Lot Team, Sales Team, Service Department)?',
      zone: null,
      failureAction: {
        role: 'Lot Manager',
        channel: 'via WhatsApp',
        say: null,
        responsibleTeam: 'Lot'
      }
    }
  ],

  /* ---- PDI Compliance (1 template item) — source: checklists/pdi-completion-checklist.md ---- */
  /* This is a single template item repeated once per vehicle in the PDI compliance review.
     Per-vehicle repetition and VIN/arrival-date tracking is handled in app.js (Task 17).
     The failureAction.say branches by computed status (ON TIME / DAY 1 OVERDUE / DAY 2+ OVERDUE CRITICAL).
     Task 17 renders the correct status message based on calculated days elapsed.
  */
  'pdi-compliance': [
    {
      id: 'pdi-01',
      text: 'Has the PDI been marked complete in the manufacturer system by the assigned technician?',
      zone: null,
      failureAction: {
        role: 'Lot Manager',
        channel: 'via WhatsApp',
        say: 'DAY 1 OVERDUE: \u201cPDI for [VIN] is now overdue by 1 day. Stellantis compliance window has passed. Please prioritize this PDI today.\u201d\nDAY 2+ OVERDUE (CRITICAL \u2014 also escalate to General Manager): \u201cPDI for [VIN] is [X] days overdue. We are at risk of a Stellantis compliance fine and potential docking. This needs to be resolved today.\u201d',
        responsibleTeam: 'Service'
      }
    }
  ],

  /* ---- Key/Plate Accountability ---- */
  /* source: checklists/key-plate-accountability-checklist.md
     Section A → sign-out (4 items: items 1–4 in source)
     Section B → sign-in (2 items: items 5–6 in source)
     Section C → periodic-audit (2 items: items 7–8 in source)
  */
  'key-plate': {

    /* Section A — SIGN-OUT CHECKS (4 items) */
    'sign-out': [
      {
        id: 'kp-out-01',
        text: 'Is the employee\u2019s signed Accountability Agreement on file?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'in person',
          say: 'I can\u2019t issue keys or plates until you\u2019ve signed the accountability agreement. See [Sales Manager/General Manager] to complete that before returning.',
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'kp-out-02',
        text: 'Is this sign-out being conducted through Key Cafe (not a peer-to-peer handoff)?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'in person',
          say: 'You need to check it out through Key Cafe yourself \u2014 I can\u2019t accept it from you.',
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'kp-out-03',
        text: 'Is the transaction being logged with the employee\u2019s name and timestamp before the item is released?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'kp-out-04',
        text: 'Is the requested item currently available \u2014 specifically, is it not currently signed out to another employee?',
        zone: null,
        failureAction: {
          role: 'Requesting employee',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      }
    ],

    /* Section B — SIGN-IN CHECKS (2 items) */
    'sign-in': [
      {
        id: 'kp-in-01',
        text: 'Is the item being returned directly to Key Cafe by the employee who signed it out \u2014 specifically, is it NOT being handed to a coworker to return on their behalf?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'in person',
          say: 'You need to return it through Key Cafe yourself \u2014 you\u2019re responsible for it until you check it in there.',
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'kp-in-02',
        text: 'Is the return transaction being logged with the employee\u2019s name and timestamp before the item is marked as available?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      }
    ],

    /* Section C — PERIODIC AUDIT CHECKS (2 items) */
    'periodic-audit': [
      {
        id: 'kp-audit-01',
        text: 'Does the Key Cafe log account for all items that should currently be signed out \u2014 specifically, can every currently-signed-out item be matched to a log entry with an employee name and sign-out timestamp?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'via WhatsApp',
          say: null,
          responsibleTeam: 'Lot'
        }
      },
      {
        id: 'kp-audit-02',
        text: 'Are all GPS key tags physically attached to their key sets?',
        zone: null,
        failureAction: {
          role: 'Lot Manager',
          channel: 'in person',
          say: null,
          responsibleTeam: 'Lot'
        }
      }
    ]
  }

};
```

---

### Verification After Writing

1. Open `lot-checklist-app/data.js`
2. Confirm `'morning-lot-walk'` array now has 15 item objects (not an empty array `[]`)
3. Confirm `'pdi-compliance'` array has exactly 1 item object
4. Confirm `'key-plate'['sign-out']` has 4 items
5. Confirm `'key-plate'['sign-in']` has 2 items
6. Confirm `'key-plate'['periodic-audit']` has 2 items
7. Confirm zone values for morning-lot-walk items: Cage items have `zone: 'Cage'`, East Side Fence Line items have `zone: 'East Side Fence Line'`, etc. — only canonical names are used
8. Confirm all vehicle-audit content from Task 05 is untouched above the morning-lot-walk block

---

## STEP 4 — SUCCESS CRITERIA

Verify each item by reading `lot-checklist-app/data.js`. All criteria are objectively verifiable without running the app.

- [ ] `lot-checklist-app/data.js` contains `id: 'mlw-01'`
- [ ] `lot-checklist-app/data.js` contains `id: 'mlw-15'` (15th and final morning-lot-walk item)
- [ ] `lot-checklist-app/data.js` contains `id: 'pdi-01'`
- [ ] `lot-checklist-app/data.js` contains `id: 'kp-out-01'`
- [ ] `lot-checklist-app/data.js` contains `id: 'kp-out-04'` (4th and final sign-out item)
- [ ] `lot-checklist-app/data.js` contains `id: 'kp-in-01'`
- [ ] `lot-checklist-app/data.js` contains `id: 'kp-in-02'` (2nd and final sign-in item)
- [ ] `lot-checklist-app/data.js` contains `id: 'kp-audit-01'`
- [ ] `lot-checklist-app/data.js` contains `id: 'kp-audit-02'` (2nd and final periodic-audit item)
- [ ] `lot-checklist-app/data.js` contains `zone: 'Cage'` (for morning-lot-walk cage items)
- [ ] `lot-checklist-app/data.js` contains `zone: 'East Side Fence Line'` (for morning-lot-walk fence items)
- [ ] `lot-checklist-app/data.js` contains `zone: 'West Side of Building'` (for morning-lot-walk west items)
- [ ] `lot-checklist-app/data.js` contains `zone: 'Overflow (Temporary)'` (for morning-lot-walk overflow item)
- [ ] `lot-checklist-app/data.js` contains `zone: 'Auction Area'` (for morning-lot-walk auction item)
- [ ] `lot-checklist-app/data.js` contains `zone: 'Power Sport / Quad Corner'` (for morning-lot-walk quad item)
- [ ] `lot-checklist-app/data.js` does NOT contain `'morning-lot-walk': []` (stub replaced with populated array)
- [ ] `lot-checklist-app/data.js` does NOT contain `'pdi-compliance': []` (stub replaced)
- [ ] `lot-checklist-app/data.js` does NOT contain `'sign-out': []` (stub replaced)
- [ ] `lot-checklist-app/data.js` still contains `id: 'va-new-01'` (Task 05 content not overwritten)
- [ ] `lot-checklist-app/data.js` still contains `id: 'va-recon-06'` (Task 05 content not overwritten)
- [ ] All pdi-compliance and key-plate items have `zone: null`
- [ ] No item uses non-canonical zone names (no "ESF", no "West", no "Overflow Temp", etc.)
- [ ] No Phase 2 fields present (no `decisionTreeRef`, no `hasDecisionTreeRef`)

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/build-sequence/state.json` in a single Write operation:
   - `prompts.06.status` → `"complete"`
   - `prompts.06.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp

2. Tell the user:

> **Build prompt 06 complete.**
> Modified: `lot-checklist-app/data.js` — all checklist data is now complete. Morning Lot Walk (15 items with zone annotations), PDI Compliance (1 template item), and Key/Plate Accountability (sign-out: 4 items, sign-in: 2 items, periodic-audit: 2 items) have been populated. The `CHECKLISTS` constant is now fully defined.
>
> **Now unblocked:**
> - `10-checklist-view-yes-no-logic.md` — depends on both task 06 and task 09 (which depends on 08, which depends on 07). Check which tasks in the 07→08→09 chain are already complete. If 09 is complete, send 10 next.
