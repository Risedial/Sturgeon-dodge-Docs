Begin Phase 2 (Systems Analysis) by creating the systems-analysis/ directory and generating three files: cause-effect-map.md, failure-modes.md, and financial-impact-analysis.md — all sourced only from the knowledge/ files.

Begin Phase 3 (Decision Trees) after Phase 2 is complete — create systems-analysis/decision-trees/ and generate all 25 tree files, one scenario per file, following the exact format in CLAUDE.md.

Begin Phase 4 (SOPs) after Phase 3 — create sops/ and generate the master SOP plus 4 team-specific SOPs (lot, sales, service, management).

Begin Phase 5 (Checklists) after Phase 4 — create checklists/ and generate all 8 binary Yes/No checklist files.

Begin Phase 6 (App Spec) after Phase 5 — create app-spec/lot-checklist-app-requirements.md as a product requirements document only (no technical architecture).

Begin Phase 7 (Document Generation) last — create outputs/ and generate 7 formatted distribution-ready documents.




execute @prompts/zzz-03b-prompts/Prompt-1.md in full

execute @prompts/zzz-03b-prompts/Prompt-2.md in full

execute @prompts/zzz-03b-prompts/Prompt-3.md in full

execute @prompts/zzz-03b-prompts/Prompt-4.md in full

execute @prompts/zzz-03b-prompts/Prompt-5.md in full



what was removed from @sops/master-sop.md :

- All 20 stalls must be full at all times
- Maximum of ONE empty stall is permitted — and only when that vehicle was just sold and a replacement has not yet been sourced


### 2.6 Auction Area

**Canonical Name:** Auction Area
**Physical Description:** Designated area at the front of the lot for auction-bound vehicles.
**Slot Count:** 19–20 vehicles
**Purpose:** Vehicles routed to auction. These are not available for retail sale.

**Allowed vehicles:**
- Auction Bound vehicles only

**Prohibited vehicles:**
- Any vehicle available for retail sale
- Retail inventory
- NEW or FLR vehicles

**Common problem:** Vehicles routed incorrectly sometimes end up sitting in or in front of the Auction Area. If a vehicle is here and should not be, identify it and move it to the correct zone immediately.


 and dealer plate custody