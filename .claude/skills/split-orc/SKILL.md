---
name: split-orc
description: Analyze a large prompt file and write minimal override sub-prompts to a splits/ folder — labeled as PARALLEL or SOLO. Pass a file path as the argument (e.g., /split-orc prompts/03a.md) or @mention the file.
disable-model-invocation: true
---

!`cat "${CLAUDE_SKILL_DIR}/orchestrator-instructions.md"`

---

## ARGUMENT

$ARGUMENTS
