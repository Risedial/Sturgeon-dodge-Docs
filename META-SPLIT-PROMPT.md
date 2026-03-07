# META-SPLIT-PROMPT — Universal Prompt Decomposer for Claude Code

> **Usage:** In a fresh chat, tag this file followed by your oversized prompt file:
> ```
> @META-SPLIT-PROMPT.md @your-large-prompt.md
> ```
> Claude Code will analyze the target prompt and generate a complete folder of atomic, tracked micro-prompts.

---

## What This Does

Decomposes any prompt that would exceed Claude Code's 32,000 output token limit into:
- Numbered micro-prompts, each producing ≤ 15,000 tokens of output
- A JSON state file that tracks execution status across all chats
- Clear parallel group labels so independent prompts can run simultaneously in separate chats
- Per-prompt conflict detection so prompts refuse to run if their dependencies aren't complete

---

## Instructions for Claude Code

When this file is tagged alongside a target prompt, you are the **Decomposition Engine**. Your job is to analyze the target and produce a complete execution system. Do not begin writing the target prompt's content — only build the system that will produce that content in future sessions.

---

### PHASE 1: PLAN (present for approval before creating any files)

Read the target prompt file completely. Then plan the following:

#### 1A — Identify the Core Objective
One sentence: what is the final desired output of the target prompt?

#### 1B — Enumerate Discrete Work Units
List every distinct piece of output the target prompt requires:
- Separate files → separate prompts (one output file per prompt)
- Large sections within a single file → separate prompts if combined output > 15,000 tokens
- Trivially small co-dependent pieces (< 200 lines combined, tightly coupled) → may share a prompt

#### 1C — Map Dependencies
For each work unit, identify:
- **Input files**: files that must exist and be read before this unit can execute
- **Output files**: files this unit will create or modify
- **Depends on**: which other work units produce this unit's input files

#### 1D — Assign Parallel Groups
Apply these rules strictly:
| Condition | Assignment |
|---|---|
| No dependencies on other prompts' output, no shared output files | Same parallel group (A, B, C...) |
| Depends on output of one or more other prompts | SEQUENTIAL — list exact prompt numbers |
| Two prompts write to the same file | SEQUENTIAL — second depends on first |
| Two prompts read the same file but neither writes it | Parallel-safe |
| Prompt creates state.json or a config file others need | Prompt 01, no parallel group |

Maximum 5 prompts per parallel group. Split into A1/A2 if exceeded.

#### 1E — Define the Assembly Prompt
The final prompt (numbered 99 or the highest number) assembles all generated section files into the final unified output. It depends on every other prompt completing.

#### 1F — Present the Plan
Show the user:
- Total prompt count
- Dependency graph (text diagram or table)
- Parallel groups and which prompts are in each
- Starting sequence: "Begin with [01], then simultaneously send [A group], then [B group], etc."
- Output folder name: `split-prompts/[target-filename-without-extension]/`

**Wait for user approval before proceeding to Phase 2.**

---

### PHASE 2: EXECUTE (after plan approval)

Create the output folder and all files.

---

#### FILE: `split-prompts/[name]/README.md`

Contents:
```
# [Target Prompt Name] — Execution Guide

## Overview
- Total prompts: [N]
- Estimated parallel chat sessions needed: [minimum sessions]
- Output folder: split-prompts/[name]/

## Execution Sequence

### Step 1 — Run First (no dependencies)
Send prompt 01 in a fresh chat. Wait for it to complete.

### Step 2 — Parallel Group A (send simultaneously in separate chats)
Send these prompts each in their own fresh chat at the same time:
- [prompt number] — [label]
- [prompt number] — [label]

### Step 3 — [continue per dependency graph]

### Final Step — Assembly
Send prompt 99 after ALL other prompts show status: "complete" in state.json.

## How to Use state.json
- state.json lives at: split-prompts/[name]/state.json
- Every prompt reads it before starting and updates it when done
- If a prompt tells you to stop, check state.json for the blocking prompt's status
- Do not manually edit state.json unless a prompt has failed and you need to reset it

## Resetting a Failed Prompt
If a prompt fails mid-execution, manually set its status back to "pending" in state.json,
then re-send it in a fresh chat.
```

---

#### FILE: `split-prompts/[name]/state.json`

Initial state. Populate all prompts based on your analysis:

```json
{
  "target_prompt": "[original filename]",
  "decomposed_by": "META-SPLIT-PROMPT",
  "created": "[ISO 8601 timestamp]",
  "last_updated": "[ISO 8601 timestamp]",
  "overall_status": "pending",
  "prompts": {
    "01": {
      "label": "[descriptive label matching the filename]",
      "status": "pending",
      "parallel_group": null,
      "depends_on": [],
      "unblocks": ["02", "03"],
      "input_files": [],
      "output_files": ["split-prompts/[name]/state.json"],
      "started_at": null,
      "completed_at": null,
      "notes": ""
    },
    "02": {
      "label": "[descriptive label]",
      "status": "pending",
      "parallel_group": "A",
      "depends_on": ["01"],
      "unblocks": ["99"],
      "input_files": ["split-prompts/[name]/state.json"],
      "output_files": ["[output file path]"],
      "started_at": null,
      "completed_at": null,
      "notes": ""
    }
  }
}
```

**Status values:** `pending` | `in_progress` | `complete` | `failed` | `skipped`

---

#### FILES: `split-prompts/[name]/[NN]-[label].md` (one per micro-prompt)

Naming: zero-padded two-digit number + hyphenated descriptive label.
Examples: `01-initialize-state.md`, `02-generate-section-one.md`, `99-assemble-final-output.md`

Each file must use this exact template:

---

```markdown
# PROMPT [NN]: [DESCRIPTIVE LABEL IN ALL CAPS]

| Field | Value |
|---|---|
| **Parallel Group** | [A / B / C / SEQUENTIAL] |
| **Depends on** | [prompt numbers, or "none"] |
| **Unblocks** | [prompt numbers, or "none"] |
| **Writes to** | [output file paths] |
| **Estimated output** | [~X lines] |

---

## STEP 1 — READ CONTEXT FILES

Read these files in order before doing anything else:

1. `split-prompts/[name]/state.json` — you will check this in Step 2
2. [List every file required for this task, exact path from project root]
3. [If CLAUDE.md exists in the project root: `CLAUDE.md` — read first, before all others]

---

## STEP 2 — PRE-EXECUTION GATE

**Execute this gate before any task work. Do not skip.**

Check `split-prompts/[name]/state.json`:

**If any prompt listed in "Depends on" has status `in_progress`:**
STOP. Tell the user exactly:
> "Prompt [NN] cannot start — prompt [XX] ([label]) is currently running in another chat.
> Wait for that chat to complete, then re-send this prompt in a new chat."

**If any prompt listed in "Depends on" has status `pending` or `failed`:**
STOP. Tell the user exactly:
> "Prompt [XX] ([label]) must complete before this prompt can run.
> Please send prompt [XX] in a fresh chat first."

**If all dependencies have status `complete` (or depends_on is empty):**
Update `split-prompts/[name]/state.json` in a single Write operation:
- `prompts.[NN].status` → `"in_progress"`
- `prompts.[NN].started_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- `overall_status` → `"in_progress"`

Then tell the user:
> "Gate passed. Starting prompt [NN]: [LABEL]."

---

## STEP 3 — TASK

### Context
[2–4 sentences explaining what this step accomplishes within the larger project. Include the final goal and why this specific piece is needed.]

### Instructions

[Numbered, specific instructions. No ambiguity. Each instruction must be actionable without external context beyond the listed files.]

1. [Instruction referencing exact file paths, field names, formats, and constraints]
2. ...

### Output Specification

**File to create/modify:** `[exact path from project root]`
**Format:** [markdown / JSON / plain text / etc.]
**Required structure:**
[Describe required headings, fields, schema, or format constraints]

---

## STEP 4 — SUCCESS CRITERIA

Verify each item before proceeding to Step 5:

- [ ] [Specific, objectively verifiable criterion — no subjective language]
- [ ] [Output file exists at the correct path]
- [ ] [Required fields/sections are present]
- [ ] [No placeholder text or [NEEDS_INPUT] tags remain unless explicitly required]

---

## STEP 5 — POST-EXECUTION

After all success criteria pass, update `split-prompts/[name]/state.json` in a single Write operation:
- `prompts.[NN].status` → `"complete"`
- `prompts.[NN].completed_at` → current ISO 8601 timestamp
- `last_updated` → current ISO 8601 timestamp
- If ALL prompts now show `complete`: set `overall_status` → `"complete"`

Then tell the user:
> "**Prompt [NN] complete.**
> Created: [list files created]
>
> **Next steps:**
> [ONE of the following, based on what's now unblocked:]
> - You can now send the following prompts simultaneously in separate chats: [list with labels]
> - Send prompt [NN+1] ([label]) next in a fresh chat.
> - All prompts are complete. Send prompt 99 to assemble the final output."
```

---

### Prompt 01: Initialize State

Prompt 01 must always be the state initialization prompt. Its task is:
1. Confirm the output folder exists (create it if not)
2. Write the initial `state.json` with all prompts at status `pending`
3. Write `README.md`

Prompt 01 has no dependencies and no parallel group.

---

### Prompt 99: Assemble Final Output

The assembly prompt must:
1. Depend on every other prompt
2. Read all generated section files
3. Combine them into the single final output file the original prompt intended to produce
4. Apply consistent formatting across the assembled document
5. Update `overall_status` to `"complete"` in state.json

---

## Decomposition Quality Rules

Apply to every micro-prompt before finalizing:

1. **No ambiguity.** No prompt may contain "use your judgment," "assess the situation," or any equivalent. Every instruction terminates in a specific action.

2. **No memory dependencies.** Each prompt assumes no session history. All required context must come from named files. If a prompt needs output from a previous prompt, it must list that output file under "Read Context Files."

3. **No shared output files between parallel prompts.** If two prompts in the same parallel group would write to the same file, make the second depend on the first.

4. **Explicit format specifications.** Every output file has an explicit format requirement — markdown heading levels, JSON schema, or specific structure.

5. **Role/persona inheritance.** If the original prompt establishes a role, persona, or set of constraints (e.g., from CLAUDE.md), every micro-prompt must re-state those constraints in its Context section.

6. **State file is always first.** state.json is always the first read in every prompt's context list, after CLAUDE.md (if present).

7. **One responsibility per prompt.** If a prompt's label requires the word "and," split it.

8. **Fail loudly, never silently.** Every prompt must check its gate. No prompt may proceed without verifying dependencies. Failure output must be explicit and human-readable.

---

## Parallelization Anti-Patterns to Avoid

Do NOT assign parallel group to prompts that:
- Both modify state.json (all prompts modify state.json — this is fine because they only modify their own `prompts.[NN]` key; document this to reassure Claude)
- Produce content that feeds into a shared template or header section
- Require knowing the total count or structure of sibling sections
- Generate cross-references to each other's output

---

## State File Conflict Model

The state.json file prevents race conditions across chats:

```
Chat A reads state → sets [02] to in_progress → works
Chat B reads state → sees [02] is in_progress → STOPS and tells user
User finishes Chat A → [02] marked complete
User re-sends Chat B → now [02] is complete → Chat B proceeds
```

Note on simultaneous state.json writes: True atomic writes are not possible across parallel chats on a filesystem. The design mitigates this by:
- Parallel-group prompts write to different `prompts.[NN]` keys, not the same key
- The only shared fields are `last_updated` and `overall_status`, which are informational only
- If a rare write collision occurs, the user can manually correct state.json using the README instructions

---

## Final Output Checklist

Before presenting the plan (Phase 1), verify:
- [ ] Every output unit from the original prompt is covered by at least one micro-prompt
- [ ] No two parallel-group prompts write to the same non-state file
- [ ] Every prompt's dependencies are correctly reflected in state.json
- [ ] Prompt 01 initializes state.json and README.md
- [ ] Prompt 99 (assembly) depends on every other prompt
- [ ] Every prompt file follows the exact template (Steps 1–5)
- [ ] README.md gives a human-readable execution sequence

---

## Constraints

- Do not write any content from the target prompt into the micro-prompt files. The micro-prompts contain *instructions for how to produce* that content — not the content itself.
- Do not invent information not present in the target prompt. Tag gaps with `[NEEDS_INPUT]`.
- Do not create more prompts than necessary. If two small tasks have identical dependencies and combined output < 10,000 tokens, merge them.
- The number 99 is reserved for the assembly prompt. Use 01–98 for all other prompts. If more than 98 prompts are needed, the decomposition is too granular — merge small prompts.
