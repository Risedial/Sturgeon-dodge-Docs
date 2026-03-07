PASTE THIS ENTIRE BLOCK AS YOUR MESSAGE IN A FRESH CLAUDE CODE SESSION.
Run this ONLY after the knowledge/ folder has been fully audited and corrected.

---

# META-PROMPT: Knowledge-to-Prompt Alignment Pass
# Sturgeon Dodge Edmonton Office Lot Operations SOP Project

## PURPOSE

The `knowledge/` folder has been audited and corrected. All 12 files in `knowledge/` are
now the authoritative source of truth. Your task is to:

1. Read every corrected knowledge file and every existing prompt file.
2. Identify every misalignment between the knowledge files and the prompts + CLAUDE.md.
3. Update every misaligned file so the full `prompts/` sequence reflects the corrected
   knowledge exactly.
4. Produce an alignment report.

After this session, `CLAUDE.md` + `prompts/state.json` + `prompts/01–07` will form a
self-consistent, zero-ambiguity build system for phases 1–7.

---

## MANDATORY READS — COMPLETE ALL BEFORE ANY ANALYSIS

Read every file below in this exact order. Do not skip any. Do not begin analysis
until all reads are complete.

### Tier 1: Global Rules
1. `CLAUDE.md`
2. `EXECUTION_PLAN.md`

### Tier 2: Corrected Knowledge Files (all 12 + report)
3.  `knowledge/personnel-registry.md`
4.  `knowledge/zone-definitions.md`
5.  `knowledge/vehicle-statuses-and-transitions.md`
6.  `knowledge/lot-placement-rules.md`
7.  `knowledge/signage-and-tagging-standards.md`
8.  `knowledge/key-cafe-protocol.md`
9.  `knowledge/compliance-requirements.md`
10. `knowledge/financial-penalties.md`
11. `knowledge/daily-operations-workflow.md`
12. `knowledge/communication-and-escalation-protocols.md`
13. `knowledge/service-department-utilization.md`
14. `knowledge/external-vendors.md`
15. `knowledge/_PHASE_1_REPORT.md`

### Tier 3: Existing Prompts (all 10)
16. `prompts/state.json`
17. `prompts/00-README.md`
18. `prompts/01-phase1-knowledge-extraction.md`
19. `prompts/02-phase2-systems-analysis.md`
20. `prompts/03a-phase3a-decision-trees-1-13.md`
21. `prompts/03b-phase3b-decision-trees-14-25.md`
22. `prompts/04-phase4-sop-generation.md`
23. `prompts/05-phase5-checklists.md`
24. `prompts/06-phase6-app-specification.md`
25. `prompts/07-phase7-document-generation.md`

All 25 reads must complete before you begin analysis.

---

## ANALYSIS PHASE — BUILD YOUR ALIGNMENT MAP

After reading everything, build an internal alignment map before touching any file.
For each category below, identify every specific conflict between what the knowledge
files now say and what the prompts / CLAUDE.md currently contain.

### Category A — Vendor Names and Details
- What is the confirmed primary detailing vendor name? (DHG or DHD or other?)
- What is their confirmed per-vehicle cost?
- What is the confirmed secondary wash vendor name and cost?
- Do CLAUDE.md glossary or any prompt files use the incorrect name?

### Category B — Personnel Names and Roles
- What is the confirmed name for Admin - Stock Tags? (Jorja or Georgia or other?)
- Are confirmed role titles now documented for Scott, Don, and Alex?
- Is the "two Andys in service" question resolved?
- Does CLAUDE.md Section 4 and the glossary reflect confirmed names?
- Do any prompt files hardcode names that now conflict?

### Category C — Zone and Slot Counts
- What is the confirmed slot count for Power Sport / Quad Corner?
- What is the confirmed slot count for the Auction Area?
- Do any prompt files reference these counts incorrectly?

### Category D — Financial Penalty Amounts
- Are exact Stellantis fine amounts now confirmed in compliance-requirements.md?
- Is the compliance threshold where fines begin confirmed?
- Is the $275 rework cost attribution confirmed (who pays)?
- Is the exact tow cost from the ship mode incident confirmed?
- Do any prompt files cite specific amounts that conflict?

### Category E — Key Cafe Details
- Is the Accountability Agreement physical location confirmed?
- Is the physical location of Key Cafe on the premises confirmed?
- Are key replacement costs confirmed?
- Do any prompt files reference [NEEDS_INPUT] for these that are now resolved?

### Category F — Process and Platform Details
- Is the team chat platform name confirmed?
- Is the morning lot walk tool/format confirmed?
- Is the end-of-day review process confirmed (or confirmed to not exist)?
- Do any prompt files reference incorrect or placeholder values for these?

### Category G — state.json Phase 1 NEEDS_INPUT Items
For each item in `phases.phase_1.needs_input_items` in state.json:
- Is the answer now present in the knowledge files?
- Build a list: RESOLVED (value now confirmed) vs STILL_OPEN (still [NEEDS_INPUT])
- For each RESOLVED item, note the exact confirmed value

### Category H — Prompt 05 Inline Checklist Content (highest risk)
Prompt 05 contains specific checklist item text and Failure Actions written inline.
- For every checklist item that references a domain value (vendor name, zone name,
  personnel name, dollar amount), verify it against the knowledge files.
- Are all canonical zone names used? (Cage, East Side Fence Line, West Side of Building,
  Overflow (Temporary)) — no abbreviations, no "Sold Row", no "LEFT"
- Any wording that conflicts with the corrected knowledge files?

### Category I — Prompts 03a and 03b Per-Tree Instructions
Prompts 03a and 03b contain specific per-tree instructions with inline domain values.
- Do any inline values (vendor names, personnel names, zone names, platform name,
  penalty amounts) conflict with the corrected knowledge files?

### Category J — CLAUDE.md Domain Glossary
- Does the DHD / DHG glossary entry reflect the confirmed vendor name?
- Does the Jorja / Georgia entry reflect the confirmed name?
- Are any other glossary entries now factually incorrect given the corrected knowledge?
- Are any new confirmed terms or role titles from the knowledge files missing?

---

## UPDATE PHASE — APPLY ALL CORRECTIONS

Apply corrections in this exact order. Make only targeted, factual edits.
Do NOT change structure, process logic, quality gates, or formatting conventions —
only fix values that are factually wrong relative to the corrected knowledge files.

### Step 1: Update CLAUDE.md
- Fix any incorrect vendor names in the glossary (Section 9)
- Fix any incorrect or now-confirmed personnel names in Section 4 and the glossary
- Add any newly confirmed role titles (Scott, Don, Alex) to Section 4 if confirmed
- Add any new confirmed terms to the glossary if missing
- Do NOT change Section 1 (Purpose), Section 3 (Architecture), Section 5 (Conventions),
  Section 6 (File Reading Order), Section 7 (Quality Gates), or Section 8 (Report Template)

### Step 2: Update prompts/state.json
- In `phases.phase_1.needs_input_items`: for each RESOLVED item, replace the item
  text with: `"[RESOLVED] [original question] — CONFIRMED: [value]"`
- Leave STILL_OPEN items unchanged
- Update `last_updated` to today's date
- Do NOT change any phase statuses, do NOT add or remove phases

### Step 3: Update prompts/01-phase1-knowledge-extraction.md
- Phase 1 is already complete and will not be re-run
- Fix any factual domain values that are now known to be wrong (vendor names, etc.)
- Only edit if something is factually incorrect — do not change structure or process

### Step 4: Update prompts/02-phase2-systems-analysis.md
- Fix any hardcoded domain values (vendor names, personnel names, penalty amounts)
  that conflict with knowledge files
- Verify the quality gate checklist items are still appropriate

### Step 5: Update prompts/03a-phase3a-decision-trees-1-13.md
- Review each per-tree instruction for inline domain values
- Fix any that conflict with the corrected knowledge files
- Priority checks: vendor name in detailing routing tree, personnel names in
  specific instructions, platform name in communication trees

### Step 6: Update prompts/03b-phase3b-decision-trees-14-25.md
- Same process as Step 5
- Priority checks: exact 3-strike language (verify vs communication-and-escalation-protocols.md),
  staff parking tone language, key replacement costs

### Step 7: Update prompts/04-phase4-sop-generation.md
- Fix hardcoded vendor names, personnel names, or financial figures that conflict
- Verify that the master SOP penalty table instruction lists all confirmed penalties
- Verify callout blocks reference the correct compliance percentages and window durations

### Step 8: Update prompts/05-phase5-checklists.md  <- HIGHEST PRIORITY
- This prompt contains specific checklist item text inline — most likely to have conflicts
- For every checklist item referencing a domain value, verify against knowledge files
- Fix any vendor names, personnel names, zone names, dollar amounts that conflict
- Verify all canonical zone names are correct (no abbreviations)

### Step 9: Update prompts/06-phase6-app-specification.md
- Verify the three user roles section still matches the confirmed personnel
- Verify checklist categories (NEW, FLR, SOLD, BND, RECON) are still the correct 5
- Low-risk file — only edit if something is factually wrong

### Step 10: Update prompts/07-phase7-document-generation.md
- Verify any specific callout blocks that quote domain values match the knowledge files
- Verify the compliance percentage (80%) is still the correct stated figure
- Low-risk file — only edit if something is factually wrong

### Step 11: Update prompts/00-README.md
- If any Phase 1 summary values were corrected, update the README summary to match
- No structural changes needed

---

## VERIFICATION PASS

After completing all updates, perform this consistency check:

1. Select 5 specific corrected values from your alignment map (e.g., confirmed vendor
   name, confirmed name for Admin - Stock Tags, confirmed penalty amounts).
2. For each value, confirm it now appears consistently across:
   - The relevant `knowledge/` file (the source)
   - `CLAUDE.md` glossary (if a glossary entry exists for that term)
   - Every `prompts/` file that references that value
3. If any inconsistency is found, fix it before writing the report.

---

## ALIGNMENT REPORT

After all updates are verified, write `prompts/ALIGNMENT_REPORT.md`:

```markdown
# Alignment Report — Knowledge-to-Prompt Alignment Pass
**Date:** [today's date]
**Status:** [COMPLETE / COMPLETE_WITH_OPEN_ITEMS]

---

## Summary
[1–2 sentences: what was aligned, how many changes were made, overall outcome]

---

## Changes Made

### CLAUDE.md
[List each change: what was wrong → what it was changed to → source knowledge file]
[Or: "No changes required"]

### prompts/state.json
[List each needs_input_items entry marked RESOLVED, with confirmed value]
[List count of items that remain STILL_OPEN]

### prompts/01 through prompts/07 and prompts/00-README.md
[For each file: list each change made, or state "No changes required"]

---

## Resolved Items (Full List)
[Every Phase 1 NEEDS_INPUT item that is now confirmed, with the confirmed value]

---

## Still-Open Items (Full List)
[Every item that remains [NEEDS_INPUT] in the knowledge files]
[These will flow into phases 2–7 as [NEEDS_INPUT] tags — human must resolve before
 final SOPs can be distributed]

---

## Consistency Verification
[List the 5 values spot-checked, and confirm consistency across all files]

---

## Phase Sequence Ready to Execute

Execute phases in this order in separate Claude Code sessions:

1. Phase 2  -> prompts/02-phase2-systems-analysis.md
2. Phase 3A -> prompts/03a-phase3a-decision-trees-1-13.md  (requires Phase 2)
3. Phase 3B -> prompts/03b-phase3b-decision-trees-14-25.md (requires Phase 2 + 3A)
4. Phase 4  -> prompts/04-phase4-sop-generation.md          (requires Phase 2 + 3A + 3B)
5. Phase 5  -> prompts/05-phase5-checklists.md              (requires Phase 4)
6. Phase 6  -> prompts/06-phase6-app-specification.md       (requires Phase 3A + 3B + 5)
7. Phase 7  -> prompts/07-phase7-document-generation.md     (requires Phase 4 + 5)

[Note any phases that contain still-open [NEEDS_INPUT] items requiring human input]
```

---

## STOP

After writing `prompts/ALIGNMENT_REPORT.md`, stop completely.

Output a final message to the user:
- How many prompt files were updated vs required no changes
- How many Phase 1 NEEDS_INPUT items are now RESOLVED vs STILL_OPEN
- Confirm the full phase sequence (02 -> 03a -> 03b -> 04 -> 05 -> 06 -> 07) is ready
- List any still-open items that will require human input during phases 2–7
- Remind the user: start with `prompts/02-phase2-systems-analysis.md` in a fresh
  Claude Code session
