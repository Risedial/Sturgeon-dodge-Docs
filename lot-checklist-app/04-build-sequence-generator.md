# PROMPT 04: GENERATE ATOMIC BUILD PROMPT SEQUENCE

| Field | Value |
|---|---|
| **Parallel Group** | SEQUENTIAL |
| **Depends on** | 01, 02, 03 |
| **Unblocks** | none — this is the final meta-prompt |
| **Writes to** | `lot-checklist-app/build-sequence/` (multiple files) |
| **Estimated output** | ~600–900 lines total across all files |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `lot-checklist-app/state.json` — you will check this in Step 2
2. `CLAUDE.md` — project conventions, domain glossary, canonical names, quality rules
3. `app-spec/lot-checklist-app-requirements.md` — full product requirements for the app
4. `lot-checklist-app/blueprint.md` — screen inventory, navigation flow, data model, component inventory
5. `lot-checklist-app/styling-spec.md` — complete Apple HIG styling specification, CSS custom properties, glass classes, component specs
6. `lot-checklist-app/implementation-plan.md` — technology decisions, file structure, data architecture, build sequence

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Check `lot-checklist-app/state.json` for the status of prompts 01, 02, and 03:

**If prompt 01 (`generate-blueprint`) has any status other than `complete`:**
STOP. Tell the user exactly:
> "Prompt 04 cannot start — prompt 01 (generate-blueprint) has status `[current status]`.
> Wait for prompt 01 to complete in its chat, then re-send this prompt."

**If prompt 02 (`generate-styling-spec`) has any status other than `complete`:**
STOP. Tell the user exactly:
> "Prompt 04 cannot start — prompt 02 (generate-styling-spec) has status `[current status]`.
> Wait for prompt 02 to complete in its chat, then re-send this prompt."

**If prompt 03 (`generate-implementation-plan`) has any status other than `complete`:**
STOP. Tell the user exactly:
> "Prompt 04 cannot start — prompt 03 (generate-implementation-plan) has status `[current status]`.
> Wait for prompt 03 to complete in its chat, then re-send this prompt."

**If all three (01, 02, 03) have status `complete`:**
Update `lot-checklist-app/state.json` in a single Write operation:
- `prompts.04.status` → `"in_progress"`
- `prompts.04.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- `overall_status` → `"in_progress"`

Then tell the user:
> "Gate passed. All dependencies complete. Starting prompt 04: GENERATE ATOMIC BUILD PROMPT SEQUENCE."

---

## STEP 3 — TASK

### Context

This is the final meta-prompt in the build system. It reads the blueprint, styling spec, and implementation plan produced by prompts 01–03 and generates a complete sequence of self-contained atomic build prompts — each one producing a specific piece of the Lot Checklist App. These build prompts are what a developer will actually send to Claude Code to construct the app. Each build prompt must be detailed enough to execute without reading the source requirements doc. Every architectural decision has already been made; the build prompts only execute decisions, never create them.

### Instructions

1. Read `lot-checklist-app/blueprint.md`, `lot-checklist-app/styling-spec.md`, and `lot-checklist-app/implementation-plan.md` completely before creating any files.

2. Derive the complete build task list from `lot-checklist-app/implementation-plan.md`'s Build Sequence section. Each numbered task in that section becomes exactly one atomic build prompt file. Do not merge, split, or reorder them.

3. Create the output folder: `lot-checklist-app/build-sequence/`

4. Create `lot-checklist-app/build-sequence/state.json` following the same structure as `lot-checklist-app/state.json`. Populate one entry per build prompt. All build prompts start at status `pending`. The `target_prompt` field should be `"lot-checklist-app/implementation-plan.md (Build Sequence)"`. Include the `depends_on` and `unblocks` relationships per the parallel group assignments in Instruction 8 below.

5. Create `lot-checklist-app/build-sequence/README.md` with:
   - An overview section (total build prompts, output folder, app type)
   - A full execution sequence section organized by parallel group, showing which prompts run first, which run in parallel, and which are sequential
   - Instructions for how to use `build-sequence/state.json`
   - Instructions for resetting a failed prompt

6. For each build task from `implementation-plan.md`'s Build Sequence (tasks 1–18), create a file named `lot-checklist-app/build-sequence/[NN]-[label].md` following the META-SPLIT-PROMPT template (Steps 1–5 exactly). Number from `01` upward. Use `18` for the end-to-end integration test. Do not use `99` — there is no assembly step; the integration test is the final task.

7. **Each build prompt file must:**

   a. **STEP 1** must list as context files:
      - `lot-checklist-app/build-sequence/state.json`
      - `lot-checklist-app/styling-spec.md` (for any task that touches `styles.css` or any HTML component)
      - `lot-checklist-app/implementation-plan.md` (for any task that touches `app.js` or `data.js`)
      - `lot-checklist-app/blueprint.md` (for any task that builds a screen or component)
      - The output files of any `depends_on` build task (so the executing session can read what already exists)

   b. **STEP 3 Task** must contain:
      - The complete, exact content to write — not "implement the button" but the full CSS or HTML or JS for that component, synthesized from the spec files. Every CSS rule, every custom property reference, every function signature must be spelled out.
      - References to exact CSS custom property names as defined in `styling-spec.md` (e.g., `var(--color-accent)`, `var(--glass-backdrop-filter)`, `var(--radius-large)`)
      - References to exact data key strings as defined in `implementation-plan.md` (e.g., `CHECKLISTS['vehicle-audit']['NEW']`)
      - References to exact screen IDs as defined in `implementation-plan.md` (e.g., `showScreen('vin-entry')`)
      - A CONSTRAINTS block that repeats the relevant constraints from `implementation-plan.md`'s Constraints section. At minimum: offline-first (no CDN), binary responses only, exact Failure Action text.

   c. **STEP 4 Success Criteria** must be objectively verifiable without running the app (can open the file and check): file exists, required class names are present, required function names are present, required screen `id` values are present.

   d. **STEP 5 Post-Execution** must update `lot-checklist-app/build-sequence/state.json` for the completed prompt and tell the user which prompts are now unblocked.

   e. No build prompt may require the executing session to make an architectural decision not already documented in `styling-spec.md`, `implementation-plan.md`, or `blueprint.md`.

8. **Parallel group assignments for build prompts.** Assign groups based on the dependency structure from `implementation-plan.md`'s Build Sequence:

   | Build Task | File | Parallel Group |
   |---|---|---|
   | 01 — Project scaffold | index.html, styles.css, app.js, data.js (empty files) | SEQUENTIAL (runs first, no group) |
   | 02 — CSS foundation | styles.css | A |
   | 03 — Glass material classes | styles.css | SEQUENTIAL (depends on 02) |
   | 04 — Component atom styles | styles.css | SEQUENTIAL (depends on 03) |
   | 05 — Checklist data — vehicle audits | data.js | A (parallel with 02, both depend only on 01) |
   | 06 — Checklist data — other audit types | data.js | SEQUENTIAL (depends on 05) |
   | 07 — App shell HTML | index.html | SEQUENTIAL (depends on 04) |
   | 08 — Home + AuditTypeSelect screens | index.html, app.js | SEQUENTIAL (depends on 07) |
   | 09 — VINEntry + CategorySelect screens | index.html, app.js | SEQUENTIAL (depends on 08) |
   | 10 — ChecklistView + YES/NO logic | index.html, app.js | SEQUENTIAL (depends on 06, 09) |
   | 11 — FailureActionView + Done/Needs Follow-Up | index.html, app.js | SEQUENTIAL (depends on 10) |
   | 12 — AuditSummary + task list generation | index.html, app.js | SEQUENTIAL (depends on 11) |
   | 13 — TaskList screen display | index.html, app.js | SEQUENTIAL (depends on 12) |
   | 14 — Share function | app.js | SEQUENTIAL (depends on 13) |
   | 15 — Offline resume | index.html, app.js | SEQUENTIAL (depends on 14) |
   | 16 — Key/Plate sub-type selection | index.html, app.js | SEQUENTIAL (depends on 10) |
   | 17 — PDI Compliance Review screen | index.html, app.js | SEQUENTIAL (depends on 10) |
   | 18 — End-to-end integration test | no new files | SEQUENTIAL (depends on 15, 16, 17) |

   Note: Tasks 02 and 05 are the only parallel-safe pair (Parallel Group A). All other tasks are sequential due to file-write dependencies.

9. After creating all build prompt files and both `state.json` and `README.md` in `lot-checklist-app/build-sequence/`, update `lot-checklist-app/state.json`:
   - `prompts.04.status` → `"complete"`
   - `prompts.04.completed_at` → current ISO 8601 timestamp
   - `overall_status` → `"complete"`
   - `last_updated` → current ISO 8601 timestamp

### Output Specification

**Folder:** `lot-checklist-app/build-sequence/`
**Files:**
- `README.md` — human-readable execution guide
- `state.json` — build prompt tracker (all build prompts at `pending`)
- `01-project-scaffold.md` through `18-integration-test.md` — one `.md` file per build task

**Format of each build prompt:** META-SPLIT-PROMPT template exactly (Steps 1–5 present in every file)

**Naming convention:** `NN-label.md` where NN is zero-padded two-digit number and label matches the build task (e.g., `01-project-scaffold.md`, `02-css-foundation.md`, `03-glass-material-classes.md`, `04-component-atom-styles.md`, `05-checklist-data-vehicle-audits.md`, `06-checklist-data-other-audit-types.md`, `07-app-shell-html.md`, `08-home-audit-type-select.md`, `09-vin-entry-category-select.md`, `10-checklist-view-yes-no-logic.md`, `11-failure-action-view.md`, `12-audit-summary-task-list-generation.md`, `13-task-list-screen.md`, `14-share-function.md`, `15-offline-resume.md`, `16-key-plate-subtype-select.md`, `17-pdi-compliance-review.md`, `18-integration-test.md`)

---

## STEP 4 — SUCCESS CRITERIA

Verify each item before proceeding to Step 5:

- [ ] Every build task from `implementation-plan.md`'s Build Sequence (tasks 1–18) has a corresponding `.md` file in `lot-checklist-app/build-sequence/`
- [ ] `lot-checklist-app/build-sequence/state.json` exists with entries for all 18 build prompts, all at status `pending`
- [ ] `lot-checklist-app/build-sequence/README.md` gives a human-readable execution sequence
- [ ] Every build prompt's STEP 1 lists `lot-checklist-app/styling-spec.md` and/or `lot-checklist-app/implementation-plan.md` as input files (whichever is relevant to that task)
- [ ] No build prompt requires the executing session to make an architectural decision not already made in the spec files
- [ ] Every build prompt's STEP 3 contains a CONSTRAINTS block referencing the relevant constraints from `implementation-plan.md`
- [ ] Every build prompt's STEP 4 success criteria are objectively verifiable (file exists, named class/function/id present — not subjective)
- [ ] Parallel group assignments respect the CSS-before-screens dependency (tasks producing styles.css complete before tasks consuming those styles)
- [ ] `lot-checklist-app/state.json` shows prompt 04 as `complete` and `overall_status` as `complete` after this prompt runs
- [ ] No Phase 2 features appear in any build prompt
- [ ] No CDN URLs appear in any build prompt
- [ ] All canonical zone names used in any content references match CLAUDE.md: Cage, East Side Fence Line, West Side of Building, Overflow (Temporary), Power Sport / Quad Corner, Auction Area, Staff Parking

---

## STEP 5 — POST-EXECUTION

After all success criteria pass:

1. Update `lot-checklist-app/state.json` in a single Write operation:
   - `prompts.04.status` → `"complete"`
   - `prompts.04.completed_at` → current ISO 8601 timestamp
   - `last_updated` → current ISO 8601 timestamp
   - `overall_status` → `"complete"`

2. Tell the user:

> **Prompt 04 complete.**
> Created: `lot-checklist-app/build-sequence/` with 18 atomic build prompts.
>
> **The entire build system is now ready.**
> Open `lot-checklist-app/build-sequence/README.md` for the execution sequence.
> Send each build prompt in the sequence to construct the Lot Checklist App.
