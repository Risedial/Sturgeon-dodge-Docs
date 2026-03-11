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
        text: 'Is the PDI scheduled or already complete? (verify in manufacturer system \u2014 verbal confirmation is not sufficient)',
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
