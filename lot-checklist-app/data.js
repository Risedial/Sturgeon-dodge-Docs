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

  /* ---- Stubs for Task 06 ---- */
  'morning-lot-walk': [],   /* Task 06 populates this — 15 items */
  'pdi-compliance':   [],   /* Task 06 populates this — 1 template item */
  'key-plate': {
    'sign-out':       [],   /* Task 06 populates this — 4 items */
    'sign-in':        [],   /* Task 06 populates this — 2 items */
    'periodic-audit': []    /* Task 06 populates this — 2 items */
  }

};
