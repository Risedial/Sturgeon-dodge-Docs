instead of making assumptions on any information within the @context-lot-walkthrough.md file. always have option A as your default best assumption based on what you can interpret and see. ask me multiple choice questions so you are 95% confident before executing this prompt

# Meta-Prompt: Generate Dealership Lot Operations SOP Project Scaffold

## Your Role

You are a **Systems Engineer and SOP Architect**. Your job is to read all provided source documents, extract every fact, rule, process, role, zone, standard, penalty, decision, and operational detail, then produce two project scaffold files that will orchestrate the full SOP generation project across multiple Claude Code sessions.

You are NOT writing the SOPs themselves. You are creating the **execution plan and project instructions** that a future Claude Code instance (with no memory of this conversation) will follow to systematically generate the complete SOP system.

---

## Source Documents

Read and fully process ALL of the following documents before generating anything. These contain the complete operational context — walkthrough transcripts, lot placement rules, vehicle standards, zone definitions, personnel responsibilities, compliance requirements, and enforcement protocols.

@LOT_PLACEMENT_SYSTEM_DOCUMENTATION.md
@context-lot-walkthrough.md

> Add or remove `@{{document_N}}` lines as needed. Tag every relevant file. The more context provided, the more complete and accurate the scaffold will be.

---

## What You Must Extract From the Documents

Before writing either output file, build an internal working model that captures ALL of the following. If a category has no information in the source documents, note it as a gap.

### Entities
- **People:** Every named individual, their role, their responsibilities, who they report to
- **Zones:** Every defined area on the lot — name, purpose, boundaries, rules, what's allowed/prohibited
- **Vehicle Statuses:** Every state a vehicle can be in (ship mode, pending PDI, front-line ready, sold, trade-in, customer vehicle, recon, etc.) and the transitions between them
- **Tools & Systems:** Key Cafe, signage types, tagging systems, inventory systems, communication channels, external vendors
- **Documents & Artifacts:** Stock-in tags, sold signs, trade-in banners, customer signs, accountability agreements

### Rules & Standards
- **Lot placement rules:** Exact rules for where each vehicle type goes, spacing, facing direction, priority ordering, prohibited placements
- **Vehicle condition standards:** What "front-line ready" means, detailing requirements, sticker/tape removal, PDI completion
- **Compliance requirements:** Manufacturer (Stellantis) mandates, deadlines, current compliance percentages, penalty thresholds
- **Financial penalties:** Every penalty with exact dollar amounts, who pays, how enforced, precedent examples
- **Behavioral rules:** Staff parking, Key Cafe protocol, communication requirements, escalation procedures

### Processes & Workflows
- **Vehicle lifecycle:** Every step from arrival to customer delivery, including all branching paths
- **Daily operations:** Morning lot walk, ongoing policing, end-of-day procedures
- **Escalation protocols:** The exact progression from first ask to enforcement, including language/tone guidance
- **New employee onboarding:** How rules are communicated to new staff
- **Cross-team coordination:** How lot team, sales team, service department, and management interact

### Cause & Effect Patterns
- **Positive patterns:** When X happens consistently → Y good outcome results
- **Negative patterns:** When X is skipped/forgotten → Y bad outcome results (with specific examples from the documents if provided)
- **Financial impacts:** Where money is being lost or wasted due to process failures
- **Compliance impacts:** Where non-compliance creates manufacturer risk

### Gaps & Ambiguities
- **Contradictions:** Where documents say conflicting things
- **Missing information:** Where a process is referenced but not fully defined
- **Assumptions required:** Where you'll need to infer standard industry practice because the documents don't specify

---

## Output File 1: EXECUTION_PLAN.md

Generate a comprehensive execution plan with the following structure. Every section must be populated based on what you extracted from the source documents — not generic templates.

### Required Sections

**1. Project Overview**
- Objective statement derived from the actual operational problems described in the documents
- List of all end deliverables

**2. File Structure**
A complete directory tree covering:
```
dealership-sop-project/
├── CLAUDE.md
├── EXECUTION_PLAN.md
├── knowledge/                    # Phase 1: Extracted & structured source data
├── systems-analysis/             # Phase 2: Systems thinking analysis
│   └── decision-trees/           # Phase 3: Every scenario's decision tree
├── sops/                         # Phase 4: Master + team SOPs
├── checklists/                   # Phase 5: Audit & operational checklists
├── app-spec/                     # Phase 6: Digital tool specification
└── outputs/                      # Phase 7: Final .docx deliverables
```

Within each directory, list EVERY specific file that will be created. File names should be derived from the actual processes, scenarios, and teams identified in the source documents — not generic placeholders.

**Decision trees specifically:** Create a named file for EVERY distinct scenario you identified in the source documents. If the documents describe 15 scenarios, there should be 15 decision tree files listed. Common categories include but are not limited to:
- Vehicle arrival scenarios (new, dealer trade, ship mode, etc.)
- Vehicle routing/placement scenarios
- Status change scenarios (sold, trade-in, customer vehicle)
- Key/plate management scenarios
- Compliance scenarios (PDI deadlines, manufacturer requirements)
- Enforcement/escalation scenarios
- Signage/tagging scenarios
- Daily operational scenarios (morning walk, ongoing policing)
- Personnel scenarios (new employee, parking violations, non-compliance)
- Service routing scenarios (detailing, mechanical, PDI)

**3. Phase Sequence (7 Phases)**

For each phase, provide:
- **Purpose:** What this phase produces and why
- **Why this order:** What it depends on from prior phases
- **Outputs:** Specific files created
- **Inputs:** What files must be read before starting

The phases are:
1. Knowledge Extraction → structured data from raw documents
2. Systems Analysis → cause-effect mapping, structure, feedback loops, failure modes
3. Decision Trees → zero-ambiguity scenario handling for every identified process
4. SOP Generation → master + role-filtered team SOPs
5. Checklists → executable audit and inspection specifications
6. App Specification → digital tool requirements for operationalizing the system
7. Document Generation → formatted .docx files for distribution

**4. Meta-Prompts (One Per Phase)**

For each phase, write a complete, copy-paste-ready prompt that a fresh Claude Code session can execute. Each prompt must:

- Instruct Claude Code to read CLAUDE.md and EXECUTION_PLAN.md first
- Specify exactly which prior-phase files to read for context
- Define every file to create with its exact structure and content requirements
- Include content requirements that are SPECIFIC to the source documents (reference actual zones, roles, vehicle types, rules, penalties, processes — not generic placeholders)
- Specify the format and conventions to follow
- Include validation criteria for the phase
- Request a completion report at the end

**The meta-prompts are the most critical output.** They must contain enough embedded domain knowledge from the source documents that a Claude Code instance with NO prior context can execute them and produce accurate, complete results. This means:
- Zone names and rules must be specified in the prompts
- Vehicle statuses and their definitions must be referenced
- Personnel roles and responsibilities must be named
- Specific dollar amounts, compliance percentages, and deadlines must be included where relevant
- Decision tree prompts must list every scenario to cover

**5. Agentic Workflow**
- Orchestration pattern (READ → GENERATE → VALIDATE → REPORT → WAIT)
- Session management strategy (which phases fit in one session, which need splitting)
- Between-session handoff protocol
- Validation checkpoints per phase with specific pass/fail criteria derived from the source material

**6. Quick-Start Command**
A single prompt the user can paste into Claude Code to initialize the project and begin Phase 1.

---

## Output File 2: CLAUDE.md

Generate persistent project instructions that Claude Code reads at the start of every session. Must include:

**1. Project Purpose**
Specific to this dealership's operational problems — not a generic SOP project description.

**2. Source Material Reference**
Where the raw data lives and how it's organized.

**3. Architecture Diagram**
The pipeline: Transcript → Knowledge → Analysis → Decision Trees → SOPs → Checklists → App Spec → Documents

**4. Execution Rules**
Numbered rules covering:
- No inventing information (everything traces to knowledge/ files)
- Zero ambiguity standard (every decision branch has a defined action)
- Role-based filtering (team SOPs are self-contained for that role)
- Atomic decision trees (one scenario per tree, cross-reference don't inline)
- Binary checklists (Yes/No only, no subjective assessments)
- Escalation chain preservation (every process has a failure path)
- Communication specifics (who, to whom, what channel, what message)

**5. Conventions**
- File format rules
- Status tags: `[COMPLETE]`, `[DRAFT]`, `[NEEDS_INPUT]`, `[NEEDS_REVIEW]`, `[ASSUMPTION]`, `[AMBIGUOUS]`
- Decision tree format (with example showing IF/THEN/ELSE branching, responsible roles, communication templates, escalation paths)
- Cross-reference syntax
- Personnel reference convention (role title primary, current name in parentheses)

**6. File Reading Order**
What to read first when starting any phase.

**7. Quality Gates**
Checklist that must pass before any phase is marked complete.

**8. Phase Completion Report Template**
Exact structure for the report Claude Code must produce after each phase.

**9. Domain Glossary**
Every domain-specific term found in the source documents with its definition. This should be comprehensive — include every acronym, industry term, vendor name, system name, zone name, and status label.

---

## Critical Requirements for Both Files

1. **Document-specific, not generic.** Every section must reflect the actual content of the source documents. If the documents describe 6 lot zones, all 6 must be named. If there are 4 team roles, all 4 must be defined. If there are specific dollar penalties, they must appear in the glossary and execution plan.

2. **Self-contained.** A Claude Code instance reading these two files with zero prior context must be able to execute the full project. The meta-prompts especially must embed enough domain knowledge to produce accurate outputs without access to the original source documents (since the knowledge extraction phase will create structured versions of that data).

3. **Traceable.** Every requirement, rule, or process referenced in the execution plan should be traceable to specific content from the source documents. If you're unsure whether something was in the documents, mark it `[VERIFY]`.

4. **Complete scenario coverage.** The decision tree file list in the execution plan must cover EVERY scenario described or implied in the source documents. Missing a scenario means a gap in the SOP system. When in doubt, create a tree for it.

5. **Practical sequencing.** The phase order and session splitting must account for Claude Code's context limits. Knowledge extraction is heavy reading. Decision trees create many files. Document generation is technically complex. Plan accordingly.

---

## Generate Now

Read all tagged source documents completely. Build your internal working model. Then generate both files in full — EXECUTION_PLAN.md first, then CLAUDE.md. Do not abbreviate, use "[...]", or leave placeholder sections. Every section must be fully populated.

After generating both files, provide a brief summary listing:
- Total scenarios identified (maps to decision tree count)
- Any gaps or ambiguities found in the source documents
- Any `[VERIFY]` tags that need user confirmation
- Recommended additional context that would improve the outputs