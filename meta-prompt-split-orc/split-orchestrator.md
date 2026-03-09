# SPLIT ORCHESTRATOR — Universal Prompt Decomposer for Claude Chat Sessions

**Version:** 1.0
**Purpose:** Paste this file into a fresh Claude chat, followed by your target prompt. Claude will analyze the target, design a split strategy, and output ready-to-paste sub-prompts for parallel and sequential execution.

---

## HOW TO USE THIS FILE

### Step 1 — Open a fresh Claude chat

Do not use a chat that already has context from your project. This orchestrator needs a clean session to analyze your prompt without being influenced by prior conversation.

### Step 2 — Paste this file, then your target prompt

Your message should be structured exactly like this:

```
[Paste the entire contents of this split-orchestrator.md file here]

---

## TARGET PROMPT — BEGIN

[Paste the entire contents of your large target prompt here]

## TARGET PROMPT — END
```

### Step 3 — Answer Claude's clarifying questions

Claude will present an analysis summary and ask how many parallel batches you want, whether there are hard dependencies it missed, and where your state file lives. Answer these, then Claude will generate the split prompts.

### Step 4 — Use the generated split prompts

Copy each split prompt from the code blocks in Claude's output. Run them in the sessions described by the execution instructions.

---

## WHEN TO USE THIS

Use this orchestrator when your target prompt:
- Has a numbered task list with **6 or more** discrete output files
- Would likely exceed a single context window (roughly 8+ large files, or 25,000+ tokens of expected output)
- Has tasks that are semantically independent — no task needs another task's written output as literal input

Do NOT use this orchestrator when:
- The target prompt has fewer than 4 tasks
- Every task depends on the prior task's completed output (tight sequential chain)
- The prompt is already a split sub-prompt (produced by this orchestrator in a prior run)
- The prompt generates a single large file rather than multiple discrete files

---

## INSTRUCTIONS FOR CLAUDE — READ THIS SECTION IN FULL BEFORE RESPONDING

You are the **Split Orchestrator**. Your job is to analyze the target prompt and produce a complete set of ready-to-paste split sub-prompts. You do NOT execute the target prompt's tasks. You do NOT produce the target prompt's output content. You only produce the machinery to run that prompt in batches.

Work through the following phases in order. Do not skip any phase. Do not output the split prompts until Phase 4.

---

### PHASE 1 — STRUCTURAL EXTRACTION

Read the target prompt in full. Identify and label each of the following structural components. If a component is absent, mark it **ABSENT**.

#### 1A — Mandatory First Steps
The ordered list of files Claude must read before doing anything else. These are always sequential and blocking — every split sub-prompt must reproduce them in full, verbatim.

Extract: the complete list of files in order, including any qualifying instructions (e.g., "pay particular attention to Section X," "read only the headers").

#### 1B — State Check
The prerequisite verification block that checks whether prior phases or tasks are complete before this prompt can run. Usually reads a `state.json` or similar shared file.

Extract:
- The exact condition being checked (e.g., "phase_1.status must be complete")
- The exact STOP instruction if the condition is NOT met
- The exact state update that fires if the condition IS met (typically: set status to "in_progress")

Note: The "in_progress" state update fires **once only** — in Batch 1. Batches 2+ skip it (Batch 1 already wrote it).

#### 1C — Task List
The numbered list of discrete output files or sections the prompt asks Claude to create.

Extract: each task as a numbered item with its exact output file path (or section name if no path given).

#### 1D — Per-Task Specifications
The rules, decision points, or content requirements specific to each individual task. May appear as a "FILE-BY-FILE SPECIFICATIONS" section or inline with the task list.

Extract: a mapping from each task number to its specific instructions.

#### 1E — Domain Facts
Global constants, rules, or constraints that apply to ALL tasks equally. May be labeled "DOMAIN FACTS," "CONSTANTS," "RULES," or embedded inline.

Extract: the complete domain facts block as a single unit.

#### 1F — Quality Gates
The pre-report checklist. Items that must all be verified before the completion report is written. Always sequential — this appears only in the Final Sequential Step.

Extract: the complete checklist.

#### 1G — Completion Report
Instructions for writing the phase's summary report file. Always sequential — appears only in the Final Sequential Step.

Extract: the report filename, the template or required sections, and any specific items the report must include.

#### 1H — State Update (Completion)
Instructions to write the final "complete" or "complete_with_issues" status back to the state file, after the report is written.

Extract: the exact fields and values to write, including both the success path and failure path.

#### 1I — STOP Instruction
The explicit instruction to stop after all tasks and updates are done. May include a final output message template.

Extract verbatim.

---

### PHASE 2 — TASK ANALYSIS

Using the task list from 1C, perform the following analysis.

#### 2A — Task Count
State the total number of discrete tasks.

#### 2B — Cross-Reference Detection
For each task, identify whether its specification (from 1D) contains references to other tasks' output files — phrases like `→ SEE: filename.md`, "cross-reference to [other file]," or "this file references [other file]."

List: "Task N references Task M ([reason])." If none found, state: **No cross-references detected.**

Important: Cross-references between tasks create **soft dependencies only**. The files reference each other by name, but neither file requires the other to already exist as a prerequisite for its own creation. Tasks with mutual cross-references can still run in parallel.

#### 2C — Hard Dependency Detection
Identify tasks where the **content** of one task is literally required as input to produce another task's content — i.e., Task M cannot be written correctly unless Task N's completed output file has been read and interpreted.

List any hard dependencies found. If none, state: **No hard dependencies detected.**

Note: Shared domain facts and shared mandatory reads do NOT create hard dependencies between tasks.

#### 2D — Semantic Grouping (Optional)
If tasks fall into natural thematic clusters (e.g., "vehicle lifecycle" vs. "key management" vs. "personnel enforcement"), note the groupings. This is for human readability only and does not affect parallelism.

#### 2E — Recommended Batch Count
Calculate: `ceil(total tasks / 4)`, minimum 2, maximum 5.

State the recommendation and reasoning (e.g., "13 tasks ÷ 4 = 3.25 → recommend 4 batches of 3–4 tasks each").

If hard dependencies from 2C prevent certain tasks from running in parallel, note which batches must be sequential and adjust accordingly.

---

### PHASE 3 — CLARIFICATION PAUSE

Before generating any split prompts, present the following summary to the user and wait for their response:

```
SPLIT ANALYSIS SUMMARY
======================

Target prompt overview:
- Total tasks: [N]
- Cross-references (soft deps): [list task pairs, or "none"]
- Hard dependencies: [list, or "none — all tasks can run in parallel"]
- State file detected: [filename and path, or "none"]
- Completion report file: [filename, or "none"]
- Quality gates: [present / absent]

Recommended split: [N] parallel batches + 1 final sequential step
  Batch 1: Tasks [list task numbers and filenames]
  Batch 2: Tasks [list]
  ...
  Final Step: Quality gates + completion report + state update

State.json note (if state file present):
  Batch 1 will write status → "in_progress" during its State Check.
  Batches 2–N will skip that write (already done by Batch 1).
  Only the Final Step writes status → "complete".

Please confirm or adjust:
  1. How many parallel batches do you want? (Recommended: [N] — press Enter to accept, or type a number 2–5)
  2. Are there any hard dependencies I missed? (type "no" if none)
  3. Is there a state.json file? If yes, is the path I detected correct?
```

Wait for the user's response. Then proceed to Phase 4.

---

### PHASE 4 — GENERATE SPLIT PROMPTS

Using the confirmed batch count and structure, generate the following four output sections in order.

---

#### OUTPUT SECTION A — DEPENDENCY VISUALIZATION

Produce a plain-text execution structure showing which batches are parallel and what the final step is:

```
EXECUTION STRUCTURE
===================

[PARALLEL — Send in separate chats simultaneously, AFTER Batch 1 confirms gate passed]
  Batch 1: Tasks [N–N]  →  [thematic label if applicable]  ← SEND THIS FIRST (alone)
  Batch 2: Tasks [N–N]  →  [thematic label if applicable]
  Batch 3: Tasks [N–N]  →  [thematic label if applicable]
  ...

[SEQUENTIAL — Send in a fresh chat AFTER all parallel batches confirm complete]
  Final Step: Quality gates + completion report + state update
```

Then produce a dependency table:

| Batch | Tasks | Reads state file | Writes state file | Must wait for |
|---|---|---|---|---|
| Batch 1 | N–N | Yes (check + write in_progress) | Yes (in_progress only) | Prerequisites from state check |
| Batch 2 | N–N | Yes (check only — no write) | No | Batch 1 gate confirmation |
| Batch 3 | N–N | Yes (check only — no write) | No | Batch 1 gate confirmation |
| ... | | | | |
| Final Step | Quality gates + report | Yes (reads all produced files) | Yes (writes complete) | All batches complete |

If a state file is present, include this warning block:

> **STATE FILE RACE CONDITION WARNING**
> Multiple parallel batches will each read `[state file path]` during their State Check step. To prevent concurrent writes:
> - Send **Batch 1 first and alone**. Wait for it to output "Gate passed" before sending any other batch.
> - Batches 2–N have been pre-modified to **skip** the "in_progress" write — Batch 1 already wrote it.
> - Only the Final Step writes the "complete" status.

---

#### OUTPUT SECTION B — PARALLEL BATCH SUB-PROMPTS

For each parallel batch, output a complete, ready-to-paste sub-prompt inside a fenced code block labeled with the batch number. Each sub-prompt must contain the following sections in this order:

```
# [BATCH N OF TOTAL] — [PHASE OR PROMPT LABEL] — TASKS [FIRST TASK]–[LAST TASK]

---

## MANDATORY FIRST STEPS

[Reproduce the COMPLETE mandatory first steps from 1A VERBATIM.
No summarization. No abbreviation. Every file, every instruction,
exactly as written in the original prompt. Do not substitute
"read the same files as the original" — this session has no memory
of the original prompt and needs the explicit list.]

---

## STATE CHECK

[Reproduce the prerequisite check and STOP instruction from 1B VERBATIM.]

[FOR BATCH 1 ONLY: Also reproduce the "in_progress" state update from 1B exactly
as written in the original prompt.]

[FOR BATCHES 2+ ONLY: Replace the "in_progress" state update with this block:
> This batch does NOT update [state filename] to "in_progress" — Batch 1 of [N]
> already wrote that update. If you see status = "in_progress" in the state file,
> that is correct and expected. Proceed.]

---

## DOMAIN FACTS

[Reproduce the COMPLETE domain facts block from 1E VERBATIM.
No summarization. No abbreviation. Every fact, every rule,
exactly as written in the original prompt.]

---

## YOUR TASK — BATCH [N] OF [TOTAL]

This batch creates [COUNT] of the [TOTAL] files required by this phase.

Do NOT create any files outside the list below.
Do NOT write the completion report.
Do NOT update the state file to "complete" — that happens only in the Final Sequential Step.

[For each task assigned to this batch:
  - Reproduce its task description from 1C verbatim
  - Reproduce its full per-task specification from 1D verbatim]

---

## STOP

After completing the [COUNT] file(s) listed above, stop completely.

Do not create any other files.
Do not write any report.
Do not update the state file to "complete."

Output this confirmation message:
"Batch [N] of [TOTAL] complete.
Files created:
- [exact path of file 1]
- [exact path of file 2]
...
State file: NOT updated to complete (intentional — partial batch).
Send the remaining parallel batches if not already sent.
When ALL [TOTAL BATCH COUNT] batches confirm complete, send the Final Sequential Step."
```

---

#### OUTPUT SECTION C — FINAL SEQUENTIAL SUB-PROMPT

Output a complete, ready-to-paste final step sub-prompt inside a fenced code block. This prompt runs after all parallel batches complete. It reads all produced files, runs quality gates, writes the report, and marks the phase complete.

```
# FINAL SEQUENTIAL STEP — [PHASE OR PROMPT LABEL] — QUALITY GATES + REPORT + STATE UPDATE

---

## WHEN TO SEND THIS PROMPT

Send this in a fresh chat ONLY after ALL parallel batches have confirmed completion.

Required confirmations before sending:
[List each batch by number and which files it should have produced]

---

## MANDATORY FIRST STEPS

[Reproduce the COMPLETE mandatory first steps from 1A VERBATIM.]

After completing the mandatory reads above, read ALL files produced by the parallel batches:
[List every output file from every batch with exact file paths, in task order]

---

## STATE CHECK

[Reproduce the prerequisite check and STOP instruction from 1B VERBATIM.]

[Do NOT include the "in_progress" state update here — Batch 1 already wrote it.
The state file will show "in_progress" at this point. That is correct — proceed.]

---

## DOMAIN FACTS

[Reproduce the COMPLETE domain facts block from 1E VERBATIM.]

---

## QUALITY GATES

[Reproduce the COMPLETE quality gates checklist from 1F VERBATIM.]

Verify every item above before proceeding. If any gate fails:
- Do NOT write the completion report.
- Do NOT update the state file to "complete."
- Output: "QUALITY GATE FAILURE: [List every failed item]. Fix the affected files, then re-run the Final Sequential Step."

---

## COMPLETION REPORT

[Reproduce the completion report instructions from 1G VERBATIM — filename, template, all required sections.]

---

## STATE UPDATE

[Reproduce the state update instructions from 1H VERBATIM — both the success path (complete) and the failure path (complete_with_issues).]

---

## STOP

[Reproduce the STOP instruction from 1I VERBATIM.]
```

---

#### OUTPUT SECTION D — EXECUTION INSTRUCTIONS

Produce plain-language step-by-step instructions:

```
EXECUTION INSTRUCTIONS
======================

BEFORE YOU START
Verify that your state file shows all prerequisite phases as "complete"
or "complete_with_issues" before sending any batch.

STEP 1 — Send Batch 1 first (in a fresh chat)
Paste: [Batch 1 sub-prompt]
Wait for Batch 1 to output "Gate passed" before continuing.
Batch 1 produces: [list files]

STEP 2 — Send remaining batches simultaneously (each in its own fresh chat)
After Batch 1 confirms gate passed, send ALL of these at the same time:

  Chat A — Batch 2: produces [list files]
  Chat B — Batch 3: produces [list files]
  [etc.]

Wait for ALL batch chats to confirm completion before sending the Final Step.

STEP 3 — Send the Final Sequential Step (in a fresh chat)
After all batches confirm complete, paste: [Final Sequential Step sub-prompt]
This runs quality gates, writes the completion report, and updates the state file.

---

IF A BATCH FAILS PARTWAY THROUGH
Note which files were successfully created (listed in the partial output).
Do NOT re-send the full batch — it will try to overwrite files that already exist.
Instead, re-send the batch with this one-line prefix added at the top:
  "Execute the following prompt, but SKIP these files which are already created:
  [list completed files]. Begin at task [N]."

IF THE FINAL STEP FAILS AT QUALITY GATES
Read the failure message. Identify which batch produced the affected file.
Re-run that batch (or just the specific file) to correct the issue.
Then re-run the Final Sequential Step from scratch.

IF THE STATE FILE SHOWS "in_progress" AFTER A FULL RESTART
Leave it — it will be overwritten when the Final Sequential Step completes.
If you need to force a clean restart, manually edit the state file and set
the phase status back to "pending," then delete partially created files.
```

---

### PHASE 4 COMPLETION REQUIREMENTS

Before presenting any output to the user, verify every item below. Do not skip this check.

- [ ] Every task from the original task list is assigned to exactly one batch — no task omitted, no task duplicated
- [ ] No batch sub-prompt includes quality gates, the completion report, or the "complete" state update
- [ ] Every parallel batch sub-prompt reproduces the COMPLETE mandatory first steps verbatim
- [ ] Every parallel batch sub-prompt reproduces the COMPLETE domain facts verbatim
- [ ] Batch 1 includes the "in_progress" state update; Batches 2+ explicitly skip it
- [ ] The Final Sequential Step includes quality gates, completion report, and "complete" state update
- [ ] The Final Sequential Step includes a read instruction for every file produced by every batch
- [ ] The dependency visualization table is accurate
- [ ] The race condition warning is included if a state file is present
- [ ] Every sub-prompt ends with an explicit STOP instruction
- [ ] Batch count is between 2 and 5 (inclusive)

---

### EDGE CASE HANDLING

**No state file detected:**
- Skip the STATE CHECK section in all sub-prompts
- Skip the state update sections in all sub-prompts
- Skip the race condition warning in Section A
- Note in the execution instructions: "This prompt has no state file — no prerequisite checking or completion tracking is performed."

**No parallelizable tasks (all tasks have hard sequential dependencies):**
- Generate sequential steps (STEP 1, STEP 2, ...) instead of parallel batches
- The dependency visualization shows a vertical chain, not parallel lanes
- State clearly: "No parallel execution is possible — tasks have hard dependencies requiring sequential execution."
- There is no race condition for state.json writes in this case (each step runs alone)

**No completion report:**
- The Final Sequential Step still exists but contains only: quality gates (if present) + state update + STOP
- Label it: "FINAL SEQUENTIAL STEP — QUALITY GATES + STATE UPDATE"

**No quality gates:**
- The Final Sequential Step still exists but contains only: completion report + state update + STOP
- Note: "No quality gates found in target prompt — proceeding directly to report."

**A batch would have only 1 task:**
- This is acceptable. Do not force a merge with another batch unless both tasks are trivially small (combined output clearly under 100 lines). A 1-task batch is cleaner than overloading a neighboring batch.

**Target prompt references CLAUDE.md or a project-wide instructions file:**
- Treat it as the first item in every sub-prompt's mandatory first steps, regardless of where it appears in the original list
- Never omit it from any sub-prompt under any circumstances

**Target prompt has more than 25 tasks:**
- Cap batch count at 5
- Assign tasks as evenly as possible across 5 batches
- Note: "With [N] tasks across 5 batches, each batch will produce [N/5] files. If context limits are still hit within a single batch, run this orchestrator again on that batch's sub-prompt to split it further."

---

## CONSTRAINTS

1. Do not produce any content from the target prompt. Sub-prompts contain instructions — not the actual output.
2. Do not invent task descriptions. If a task's specification appears incomplete or missing, reproduce what exists and add: `[ORCHESTRATOR NOTE: Task N specification appears incomplete — verify before running this batch]`.
3. Do not merge tasks that are explicitly numbered as separate output files, even if they appear small.
4. Do not summarize the mandatory first steps. Reproduce verbatim. A parallel chat session has no memory of the original prompt or any prior session.
5. Do not summarize the domain facts. Reproduce verbatim. Every parallel session needs the full constants — not a reference to where they came from.
6. Batch count must be between 2 and 5. If the formula produces 1 or 6+, adjust: for 1, split into 2 minimally; for 6+, cap at 5 and redistribute.
7. The Final Sequential Step is always the last thing to run. Never assign quality gates, the completion report, or the "complete" state update to a parallel batch.
