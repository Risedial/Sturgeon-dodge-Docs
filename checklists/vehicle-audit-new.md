# Vehicle Audit Checklist — NEW
**Category:** NEW (KM ≤ 1,000) — vehicles that have not yet reached front-line status
**Used by:** Lot Attendant or Lot Manager during morning walk or arrival processing
**Status:** [COMPLETE]

---

## Purpose

This checklist verifies that a NEW vehicle meets all pre-front-line standards before it can be moved toward Cage placement. All items are binary pass/fail. Every No has a Failure Action with a named responsible role.

---

## Checklist Items

---

[ ] **1. Is ship mode cleared? (battery reconnected AND software reset performed)**
    YES: Continue
    NO — Failure Action: ROLE: Lot Attendant → do not attempt to move or drive the vehicle; notify service department immediately via WhatsApp: "Ship mode not cleared on [VIN]. Battery needs reconnection and software reset before PDI can begin." Do not move vehicle to Cage or deliver to customer; do not proceed to any other checklist item until service department confirms ship mode is cleared.

---

[ ] **2. Is the PDI scheduled or already complete? (verify in manufacturer system — verbal confirmation is not sufficient)**
    YES: Continue
    NO — Failure Action: ROLE: Lot Manager → contact Service Department Lead via WhatsApp immediately. SAY: "PDI needed for [VIN]. Stellantis 2-day window is running from [arrival date]. Please schedule and assign today." Document the request and the arrival date in the WhatsApp team chat.

---

[ ] **3. Is the Airtable system status set to "Pending PDI" (NOT "IN RECON" or any other incorrect status)?**
    YES: Continue
    NO — Failure Action: ROLE: Lot Manager → correct Airtable status to the appropriate pre-PDI status immediately; do NOT use "IN RECON" for a new arrival — this hides the vehicle from the sales inventory system; document the correction in the WhatsApp team chat: "Status corrected for [VIN] — was incorrectly set to [wrong status], corrected to Pending PDI."

---

[ ] **4. Is the stock-in tag filled out and placed in the bottom-right corner of the windshield?**
    YES: Continue
    NO — Failure Action: ROLE: Lot Attendant → go to Admin — Stock Tags (Jorja) or Admin/Tech — Stock Tags + Service (Giselle) immediately; obtain the completed white stock-in tag; place it in the bottom-right corner of the windshield; do not use yellow tags (yellow tags look like AutoWorld tags and cause identification confusion).

---

[ ] **5. Are all manufacturer and transport stickers removed from the vehicle (all exterior panels and glass)?**
    YES: Continue
    NO — Failure Action: ROLE: Lot Attendant → remove all manufacturer and transport stickers from the vehicle before any further processing.

---

[ ] **6. Is all tape removed from the vehicle (all surfaces — body, glass, trim)?**
    YES: Continue
    NO — Failure Action: ROLE: Lot Attendant → remove all tape from the vehicle before any further processing.

---

[ ] **7. Is the vehicle free of visible dirt, dust, and debris on all exterior panels?**
    YES: Continue
    NO — Failure Action: ROLE: Lot Attendant → route vehicle to DHD for full detail ($60 per vehicle); notify DHD via [NEEDS_INPUT: DHD contact method]; document routing in WhatsApp team chat: "Vehicle [VIN] routed to DHD for full detail — exterior not clean to standard." Do not place vehicle in Cage until detail is confirmed complete and vehicle is re-inspected.

---

## Pass Criteria

Vehicle passes this checklist only when all 7 items are answered YES. A vehicle with any NO item outstanding is NOT eligible for Cage placement until the Failure Action for that item has been completed and re-verified.

---

## Notes

- `[NEEDS_INPUT]`: DHD contact method — the specific contact (phone, WhatsApp, other) for routing vehicles to DHD for detailing is not confirmed in source material.
- Airtable status terminology: "Pending PDI" is the correct conceptual status; confirm exact Airtable label in use at this dealership.
- The 2-day PDI window (Stellantis requirement) runs from the vehicle's arrival date at the Edmonton Office — not from the date ship mode is cleared or the date this checklist is run.
