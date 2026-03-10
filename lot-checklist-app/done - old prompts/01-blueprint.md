# PROMPT 01: GENERATE APP BLUEPRINT

| Field | Value |
|---|---|
| **Parallel Group** | A |
| **Depends on** | 00 |
| **Unblocks** | 04 |
| **Writes to** | `lot-checklist-app/blueprint.md` |
| **Estimated output** | ~250–350 lines |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `lot-checklist-app/state.json` — you will check this in Step 2
2. `CLAUDE.md` — read this before all other content files; contains canonical zone names, domain glossary, and project conventions
3. `app-spec/lot-checklist-app-requirements.md` — full product requirements; your primary source for all screen names, user flows, data models, and checklist content

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Check `lot-checklist-app/state.json`. Find the entry for prompt `"00"`.

**If prompt `"00"` has status `"in_progress"`:**
STOP. Tell the user exactly:
> "Prompt 01 cannot start — prompt 00 (initialize-state) is currently running in another chat.
> Wait for that chat to complete, then re-send this prompt in a new chat."

**If prompt `"00"` has status `"pending"` or `"failed"`:**
STOP. Tell the user exactly:
> "Prompt 00 (initialize-state) must complete before this prompt can run.
> Please send the MASTER-APP-BOOTSTRAP-PROMPT.md in a fresh chat first."

**If prompt `"00"` has status `"complete"`:**
Update `lot-checklist-app/state.json` in a single Write operation:
- `prompts.01.status` → `"in_progress"`
- `prompts.01.started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- `overall_status` → `"in_progress"`

Then tell the user:
> "Gate passed. Starting prompt 01: GENERATE APP BLUEPRINT."

---

## STEP 3 — TASK

### Context

This prompt produces the app blueprint — the complete structural specification of every screen, navigation path, data object, and offline storage model for the Lot Checklist App. The blueprint is the source of truth that both the styling-spec (prompt 02) and implementation-plan (prompt 03) will reference. It must be complete enough that a developer could build the app's skeleton from it alone, without reading the requirements doc. Do not invent any information not present in the source files. Do not add Phase 2 features. Do not use zone names other than the canonical names from CLAUDE.md Section 9.

### Instructions

1. **Read `app-spec/lot-checklist-app-requirements.md` in full.** Map every user flow step (Steps 1–9 in Section 3) to a named screen. Do not summarize or skip any step.

2. **Produce a Screen Inventory table.** Columns: Screen Name | Route/ID | Trigger | User Role(s) | Description. Every distinct UI state gets its own row. Include at minimum: Home, AuditTypeSelect, VINEntry, CategorySelect, ChecklistView, FailureActionView, AuditSummary, TaskList, KeyPlateSubTypeSelect. Add any screens implied by the requirements that are not explicitly named (e.g., a PDI Compliance Review screen implied by the PDI Compliance Review audit type). Do not add screens for Phase 2 features.

3. **Produce a Navigation Flow diagram** in Mermaid syntax. Show every possible path a user can take from Home through completion. Show branching at audit type selection (4 branches), at YES vs NO response, at Done vs Needs-Follow-Up response, and at Key/Plate sub-type selection (3 branches). Every path must terminate at TaskList or an explicit dead-end state. Label each edge with the trigger (button tap, auto-advance, etc.).

4. **Produce a Data Model section.** For each entity below, define: fields, types (string / number / boolean / enum / array), required/optional, and storage location (localStorage key name or in-memory only).

   Entities to define:
   - `AuditSession` — the top-level record for a single audit run
   - `ChecklistItem` — a single item from a checklist (pre-bundled, not stored in localStorage)
   - `AuditResponse` — the user's response to a single checklist item during a session
   - `TaskItem` — a generated task entry (derived from AuditResponses where response = NO)

5. **Produce an Offline Data Strategy section.** Define:
   - Which data is pre-bundled in the app (all checklist content, Failure Action text)
   - Which data is written during a session (AuditSession + AuditResponse records)
   - The localStorage key schema: list every key name as an explicit string
   - The resume-from-last-item logic: exact algorithm the app uses to detect an in-progress session on launch (check for the key `"lot-checklist-app-session-in-progress"`, if present display a resume prompt, if confirmed restore state and navigate to last incomplete item, if declined clear the key and start fresh)

6. **Produce a Component Inventory table.** Columns: Component Name | Type (screen / modal / overlay / atom) | Props/inputs | Used on screen(s). Cover all reusable pieces. Required components at minimum: YesNoButton, FailureActionCard, ChecklistProgressBar, TaskListGroup, TeamGroupHeader, ShareButton, ZoneHeader, ActionResponseButton, AuditTypeTile, TaskCard. Add any additional components clearly implied by the requirements.

7. **Produce a Checklist Content Registry table.** Columns: Audit Type | Category | Source File | Item Count | Zone Headers (if applicable). Populate using only the values from Appendix A of `app-spec/lot-checklist-app-requirements.md`. Do not invent item counts. Do not round or estimate.

   Required rows:
   - Vehicle Audit — NEW | NEW | checklists/vehicle-audit-new.md | 7 | —
   - Vehicle Audit — FLR | FLR | checklists/vehicle-audit-flr.md | 8 | —
   - Vehicle Audit — SOLD | SOLD | checklists/vehicle-audit-sold.md | 3 | —
   - Vehicle Audit — BND | BND | checklists/vehicle-audit-bnd.md | 4 | —
   - Vehicle Audit — RECON | RECON | checklists/vehicle-audit-recon.md | 6 | —
   - Morning Lot Walk | — | checklists/morning-lot-walk-checklist.md | 15 | Lot-Level Checks, Cage, East Side Fence Line, West Side of Building, Overflow (Temporary), Auction Area, Power Sport / Quad Corner, End of Walk
   - PDI Compliance Review | — | checklists/pdi-completion-checklist.md | 1 per vehicle tracked | —
   - Key/Plate — Sign-Out | Sign-Out | checklists/key-plate-accountability-checklist.md (Section A) | 4 | —
   - Key/Plate — Sign-In | Sign-In | checklists/key-plate-accountability-checklist.md (Section B) | 2 | —
   - Key/Plate — Periodic Audit | Periodic Audit | checklists/key-plate-accountability-checklist.md (Section C) | 2 | —

8. **Canonical zone names.** All zone names throughout this file must use exactly the canonical names from CLAUDE.md Section 9:
   - Cage
   - East Side Fence Line
   - West Side of Building
   - Overflow (Temporary)
   - Power Sport / Quad Corner
   - Auction Area
   - Staff Parking

   Never use abbreviations (e.g., "Fence Line" without "East Side"), never use alternative names, never invent zone names.

9. **Tag any section where requirements have a `[NEEDS_INPUT]` marker.** Do not invent values for those sections. Copy the `[NEEDS_INPUT]` tag into the blueprint and describe what information is missing.

### Output Specification

**File to create:** `lot-checklist-app/blueprint.md`
**Format:** Markdown
**Required sections in this order:**
1. Screen Inventory (table)
2. Navigation Flow (Mermaid diagram)
3. Data Model (one subsection per entity)
4. Offline Data Strategy
5. Component Inventory (table)
6. Checklist Content Registry (table)
7. Open Questions (list any `[NEEDS_INPUT]` items found; if none, write "None identified.")

---

## STEP 4 — SUCCESS CRITERIA

Verify each item before proceeding to Step 5:

- [ ] Every screen referenced in Section 3 Steps 1–9 of the requirements has a corresponding row in Screen Inventory (minimum 9 screens)
- [ ] Navigation Flow covers all 4 audit type branches (Vehicle Audit, Morning Lot Walk, PDI Compliance Review, Key/Plate Accountability) and all 3 Key/Plate sub-type branches
- [ ] Data Model defines all 4 entities: AuditSession, ChecklistItem, AuditResponse, TaskItem — with field names, types, and storage location specified
- [ ] localStorage key `"lot-checklist-app-session-in-progress"` appears as an explicit string in the Offline Data Strategy section
- [ ] Component Inventory contains at minimum: YesNoButton, FailureActionCard, ChecklistProgressBar, TaskListGroup, ShareButton, ZoneHeader, TeamGroupHeader, TaskCard, AuditTypeTile, ActionResponseButton
- [ ] All zone names in the blueprint use canonical names from CLAUDE.md (Cage, East Side Fence Line, West Side of Building, Overflow (Temporary), Power Sport / Quad Corner, Auction Area, Staff Parking)
- [ ] No invented checklist item counts — all counts match Appendix A of the requirements exactly (NEW: 7, FLR: 8, SOLD: 3, BND: 4, RECON: 6, Morning Walk: 15, Key/Plate Sign-Out: 4, Sign-In: 2, Periodic Audit: 2)
- [ ] No Phase 2 features are included in any section of the blueprint

---

## STEP 5 — POST-EXECUTION

After all success criteria pass, update `lot-checklist-app/state.json` in a single Write operation:
- `prompts.01.status` → `"complete"`
- `prompts.01.completed_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- Do NOT change `overall_status` (other parallel prompts may still be running)

Then tell the user:
> "**Prompt 01 complete.**
> Created: `lot-checklist-app/blueprint.md`
>
> **Next steps:**
> You can now send prompts 02 and 03 simultaneously in separate chats, or if they are already running, this output will be consumed by prompt 04 once all three complete."
