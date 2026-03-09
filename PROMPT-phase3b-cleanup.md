# SESSION PROMPT — Phase 3B Cleanup (Pre-Phase 4 Gate)
# Sturgeon Dodge Edmonton Office Lot Operations SOP Project

---

## OBJECTIVE

Three Phase 3B decision tree files have minor formatting defects that violate the CLAUDE.md format specification. This session fixes those defects only. No content changes. No new files. No Phase 4 work.

**Files to fix:**
1. `systems-analysis/decision-trees/staff-parking-new-employee.md`
2. `systems-analysis/decision-trees/staff-parking-repeat-violation.md`
3. `systems-analysis/decision-trees/sold-sign-missing-enforcement.md`

**Defects to fix:**
- **Defect A:** All three files wrap their ASCII decision tree content inside a markdown code fence (triple backticks). The CLAUDE.md format spec requires raw ASCII — no code fences.
- **Defect B:** `staff-parking-repeat-violation.md` has `Status: DRAFT` in the file header. It must be `**Status:** [COMPLETE]`.

---

## MANDATORY FIRST STEPS — DO THESE BEFORE ANY EDITS

Read the following files in order. Do not begin editing until all reads are complete.

1. `CLAUDE.md` — pay particular attention to Section 5 (Decision Tree Format). The format spec is the authority on what "correct" looks like.
2. `systems-analysis/decision-trees/staff-parking-new-employee.md` — read in full.
3. `systems-analysis/decision-trees/staff-parking-repeat-violation.md` — read in full.
4. `systems-analysis/decision-trees/sold-sign-missing-enforcement.md` — read in full.

---

## WHAT TO CHANGE — EXACT INSTRUCTIONS

### Fix 1: Remove code fence wrapping (all three files)

Each of the three files contains a section that looks like this:

```
```
START
│
├── ...
```
```

The opening triple-backtick line and the closing triple-backtick line must be removed. The ASCII tree content between them (the `START`, `│`, `├──`, `└──` characters, all branch lines, and all ACTION/ROLE/CHANNEL/SAY blocks) stays exactly as written — do not alter any of it. Only the fence delimiters are removed.

After the fix, the Decision Tree section must flow directly from the `## Decision Tree` heading into `START` with no code fence wrapper.

Apply this fix to all three files.

### Fix 2: Update status tag in `staff-parking-repeat-violation.md`

In the file header block at the top of `staff-parking-repeat-violation.md`, change:

```
**Status:** DRAFT
```

to:

```
**Status:** [COMPLETE]
```

No other changes to the header.

---

## WHAT NOT TO CHANGE

- Do NOT modify any content inside the decision tree branches (no rewording, no adding, no removing actions, ROLE, CHANNEL, or SAY text)
- Do NOT modify the Terminal Outcomes sections
- Do NOT modify the Notes sections
- Do NOT modify any [NEEDS_INPUT], [ASSUMPTION], or [AMBIGUOUS] tags
- Do NOT touch any other files in the project
- Do NOT begin Phase 4

---

## QUALITY GATES — VERIFY BEFORE FINISHING

After making edits, verify each of the three files:

- [ ] No triple-backtick (```) characters appear anywhere in the decision tree section
- [ ] The Decision Tree section begins with `## Decision Tree` heading followed immediately by `START` (or a blank line then `START`)
- [ ] The ASCII tree characters (│ ├── └──) are preserved exactly as they were
- [ ] All ACTION, ROLE, CHANNEL, SAY blocks are intact and unchanged
- [ ] `staff-parking-repeat-violation.md` header now reads `**Status:** [COMPLETE]`
- [ ] All three files still have all six required sections: file header, Trigger, Responsible Role, Decision Tree, Terminal Outcomes, Notes

---

## STATE UPDATE

After all three files are verified, update `prompts/state.json`:

```
phases.phase_3b.notes = append: "Formatting cleanup completed 2026-03-09: removed code fence wrappers from 3 files; updated staff-parking-repeat-violation.md status from DRAFT to [COMPLETE]. All 25 trees now fully conform to CLAUDE.md format spec."
last_updated = "2026-03-09"
```

Do not change `phase_3b.status` (it is already `"complete"`). Do not change `quality_gates_passed` (it is already `true`).

---

## STOP

After the state update, stop completely. Output a confirmation message listing:
- The three files that were modified
- Exactly which defects were fixed in each
- Confirmation that no content was changed — formatting only
- That Phase 4 is now clear to begin using `prompts/04-phase4-sop-generation.md`
