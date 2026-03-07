# SESSION PROMPT — Phase 7: Document Generation
# Sturgeon Dodge Edmonton Office Lot Operations SOP Project

---

## MANDATORY FIRST STEPS — DO THESE BEFORE ANYTHING ELSE

Read the following files in this exact order. Do not skip any file. Do not begin the STATE CHECK until all reads are complete.

1. Read `CLAUDE.md` — all rules, conventions, domain glossary.
2. Read `EXECUTION_PLAN.md` — read the Phase 7 meta-prompt in Section 4 in full.
3. Read `prompts/state.json` — the shared state file.
4. Read all 5 SOP source files:
   - `sops/master-sop.md`
   - `sops/team-lot.md`
   - `sops/team-sales.md`
   - `sops/team-service.md`
   - `sops/team-management.md`
5. Read all 8 checklist source files:
   - `checklists/vehicle-audit-new.md`
   - `checklists/vehicle-audit-flr.md`
   - `checklists/vehicle-audit-sold.md`
   - `checklists/vehicle-audit-bnd.md`
   - `checklists/vehicle-audit-recon.md`
   - `checklists/morning-lot-walk-checklist.md`
   - `checklists/pdi-completion-checklist.md`
   - `checklists/key-plate-accountability-checklist.md`
6. Read the Phase 4 and Phase 5 reports:
   - `sops/_PHASE_4_REPORT.md`
   - `checklists/_PHASE_5_REPORT.md`

All reads must complete before you proceed.

---

## STATE CHECK — ABORT IF PREREQUISITES ARE NOT MET

After reading `prompts/state.json`, check:

**Required:**
- `phases.phase_4.status` must be `"complete"` OR `"complete_with_issues"`
- `phases.phase_5.status` must be `"complete"` OR `"complete_with_issues"`

If either prerequisite is NOT met:
- **STOP immediately.**
- Do not create any files.
- Output: "ABORT: Prerequisites not met. phases phase_4 and phase_5 must both be complete before Phase 7 can begin. Missing: [list which phases are not complete]."
- Take no further action.

If prerequisites are met, continue.

**Before writing any files, update `prompts/state.json`:**
- Set `phases.phase_7.status` to `"in_progress"`
- Set `phases.phase_7.started_at` to today's date (YYYY-MM-DD)
- Set `last_updated` to today's date

---

## YOUR TASK — PHASE 7: DOCUMENT GENERATION

Produce 7 formatted, distribution-ready output documents from the SOP and checklist source files. The `outputs/` directory must be created if it does not exist.

### What You Must Produce

**File 1:** `outputs/master-sop.docx` (or `outputs/master-sop.md` — see Format Note below)
**File 2:** `outputs/team-lot.docx` (or `outputs/team-lot.md`)
**File 3:** `outputs/team-sales.docx` (or `outputs/team-sales.md`)
**File 4:** `outputs/team-service.docx` (or `outputs/team-service.md`)
**File 5:** `outputs/team-management.docx` (or `outputs/team-management.md`)
**File 6:** `outputs/vehicle-audit-checklists.docx` (or `outputs/vehicle-audit-checklists.md`)
**File 7:** `outputs/operational-checklists.docx` (or `outputs/operational-checklists.md`)
**File 8:** `outputs/_PHASE_7_REPORT.md` (completion report — written last)

### Format Note

Attempt to produce `.docx` files. If `.docx` generation is not available in this environment, produce fully-formatted Markdown files with `.md` extension instead. Note the actual format used in `outputs/_PHASE_7_REPORT.md`. Do not leave files empty or stub them — every output file must contain the full, formatted content.

---

## FORMATTING STANDARDS — APPLY TO ALL 7 OUTPUT FILES

Every output document must apply all of the following formatting:

### Cover Page (first page of every document)
```
[Document Title]
Version: 1.0
Date: [today's date, written out — e.g., February 27, 2026]
Scope: Edmonton Office — Sturgeon Dodge
Prepared for: Distribution to relevant staff
```

### Table of Contents
- Immediately after the cover page
- All major sections listed with section numbers
- In Markdown: use `[Section Name](#anchor)` links where possible

### Heading Hierarchy
- H1: Document title
- H2: Major sections (numbered)
- H3: Subsections
- H4: Sub-subsections (use sparingly)

### Critical Rules Formatting
- **Bold all critical rules** — any rule that has a financial penalty, a compliance deadline, or a "never" prohibition
- Use callout blocks for all "NEVER DO THIS" rules. Format:
  ```
  > ⚠️ NEVER: [the prohibited action and why]
  ```
- Penalty amounts in bold: **$500**, **$25**, **~50% replacement cost**

### Tables
- Use Markdown table format for all tabular data (financial penalties, vehicle status table, zone summary, etc.)
- All tables must have a header row

### Cross-Reference Links
- All references to decision trees formatted as: `→ Decision Tree: [filename.md]`
- Consistent formatting throughout the document

### Page Breaks (Markdown approximation)
- In Markdown: use `---` (horizontal rule) between major sections to simulate page breaks

---

## DOCUMENT SPECIFICATIONS

### File 1: `outputs/master-sop.docx`

Source: `sops/master-sop.md`

Apply all formatting standards. Pay particular attention to:
- **Section 6 (Key Cafe Protocol):** This section must be formatted with special prominence. All penalties in bold. All "never do this" statements as callout blocks.
- **Section 10 (Financial Penalties):** Format as a complete table with columns: Item | Penalty Amount | Who Pays | Enforcement Status | Notes
- **Section 11 (Cross-Reference Index):** Format as a numbered two-column table: Tree Number | Filename | Scenario Description

This is the master reference document. It must look authoritative and professional.

---

### File 2: `outputs/team-lot.docx`

Source: `sops/team-lot.md`

Apply all formatting standards.

Add a prominent header box on the cover page:
```
THIS DOCUMENT IS FOR: LOT TEAM STAFF ONLY
(Lot Attendants and Lot Manager)
All lot team members must read and retain this document.
```

---

### File 3: `outputs/team-sales.docx`

Source: `sops/team-sales.md`

Apply all formatting standards.

Add a prominent header box on the cover page:
```
THIS DOCUMENT IS FOR: SALES TEAM AND SALES MANAGER
All sales staff must read and retain this document.
```

Format the PDI cooperation section with a callout block:
```
> ⚠️ NEVER: Tell the lot team or service department to skip PDI.
> A vehicle may not be delivered to a customer until PDI is confirmed
> complete in the manufacturer system. We are at 80% compliance —
> in the red zone. Non-compliance results in Stellantis fines and docking.
```

---

### File 4: `outputs/team-service.docx`

Source: `sops/team-service.md`

Apply all formatting standards.

Add a prominent header box on the cover page:
```
THIS DOCUMENT IS FOR: SERVICE DEPARTMENT
(Service Leads, Shop Foreman, Technicians)
All service department staff must read and retain this document.
```

Format the 2-day PDI window section with a callout block:
```
> ⚠️ CRITICAL: PDI must be marked complete in the manufacturer system
> within 2 calendar days of vehicle delivery to the dealership.
> Current compliance: 80% — entering the red zone where fines begin.
> Verbal confirmation to the lot manager is NOT sufficient — it must
> be entered in the manufacturer system.
```

---

### File 5: `outputs/team-management.docx`

Source: `sops/team-management.md`

Apply all formatting standards.

Add a prominent header box on the cover page:
```
THIS DOCUMENT IS FOR: MANAGEMENT
(General Manager, Lot Manager, Sales Manager)
```

Format the enforcement philosophy section with a callout block:
```
> Standards only hold through daily, consistent enforcement.
> One announcement does not create a standard.
> "Inspect what you expect."
```

---

### File 6: `outputs/vehicle-audit-checklists.docx`

Source files (combined into one document):
- `checklists/vehicle-audit-new.md`
- `checklists/vehicle-audit-flr.md`
- `checklists/vehicle-audit-sold.md`
- `checklists/vehicle-audit-bnd.md`
- `checklists/vehicle-audit-recon.md`

Document structure:
- Cover page: "Vehicle Audit Checklists — Edmonton Office"
- Table of contents listing all 5 checklists
- Each checklist begins on a new section (use `---` in Markdown)
- Each checklist section has a header: "Checklist: [Category Name] Vehicle Audit"
- Subheader: "For use by: Lot Attendant or Lot Manager"
- Subheader: "Vehicle category: [definition — e.g., KM ≤ 1,000]"
- Checklist items formatted for field use:
  ```
  [ ] [Item question]
      YES: ✓ Continue
      NO:  → Failure Action: [action text]
  ```
- Each Failure Action on its own line, indented

This document will be printed and used in the field. Formatting must be clean and scannable.

---

### File 7: `outputs/operational-checklists.docx`

Source files (combined into one document):
- `checklists/morning-lot-walk-checklist.md`
- `checklists/pdi-completion-checklist.md`
- `checklists/key-plate-accountability-checklist.md`

Document structure:
- Cover page: "Operational Checklists — Edmonton Office"
- Table of contents
- Each checklist begins on a new section
- Morning lot walk checklist: formatted with zone sections clearly delineated; per-vehicle check items in a scannable format
- PDI compliance checklist: formatted as a tracking table with blank fields for: VIN, delivery date, PDI deadline, current status, action required
- Key/plate accountability checklist: formatted with three clear sub-sections (Sign-Out Checks, Sign-In Checks, Periodic Audit Checks)

---

## QUALITY GATES — VERIFY BEFORE WRITING THE REPORT

Before writing `outputs/_PHASE_7_REPORT.md`, confirm every item below.

- [ ] All 7 output files exist in `outputs/`
- [ ] All output files contain complete content (no stubs or placeholders)
- [ ] Every output file has a cover page with version, date, scope
- [ ] Every output file has a table of contents
- [ ] All critical rules are bolded in every document
- [ ] All "NEVER DO THIS" rules use the callout block format
- [ ] Financial penalty amounts appear in bold where referenced
- [ ] All tables use Markdown table format with header rows
- [ ] Cross-reference links use consistent `→ Decision Tree: filename.md` format
- [ ] `outputs/vehicle-audit-checklists.docx` contains all 5 vehicle audit checklists
- [ ] `outputs/operational-checklists.docx` contains all 3 operational checklists
- [ ] Format note in `outputs/_PHASE_7_REPORT.md` states whether .docx or .md format was used
- [ ] Content in output files matches source files exactly (no edits to substance)
- [ ] Formatting is consistent across all 7 documents (same heading hierarchy, same table style, same callout format)

---

## COMPLETION REPORT

After all quality gates pass, write `outputs/_PHASE_7_REPORT.md` using the Phase Completion Report template from CLAUDE.md Section 8. Include:
- List of all 7 output files with their status
- **Format used:** state whether .docx or .md format was produced for each file
- Quality gate checklist
- Any formatting issues encountered
- Final project status note: which phases are complete, which (if any) have unresolved `[NEEDS_INPUT]` items that require human input before the project is finalized

---

## STATE UPDATE — WRITE THIS AFTER THE REPORT IS COMPLETE

After writing `outputs/_PHASE_7_REPORT.md`, update `prompts/state.json`:

```
phases.phase_7.status = "complete"
phases.phase_7.completed_at = [today's date, YYYY-MM-DD]
phases.phase_7.files_confirmed_created = [list all 8 files including report]
phases.phase_7.quality_gates_passed = true
phases.phase_7.needs_input_items = []
phases.phase_7.notes = "Format used: [docx / md — state which]"
last_updated = [today's date, YYYY-MM-DD]
```

If quality gates did NOT all pass:
```
phases.phase_7.status = "complete_with_issues"
phases.phase_7.quality_gates_passed = false
phases.phase_7.notes = [description of which gates failed]
```

---

## STOP

After updating state.json, **stop completely**. This is the final phase.

Output a final message to the user:
- Phase 7 is complete
- All 7 output documents have been created (list their filenames and format — .docx or .md)
- The full SOP project is complete
- All 8 phases have been executed
- Summary of outstanding `[NEEDS_INPUT]` items across the entire project (pulled from phase reports) that require human review before the documents can be finalized for distribution
- Location of all deliverables: `knowledge/`, `systems-analysis/`, `sops/`, `checklists/`, `app-spec/`, `outputs/`
