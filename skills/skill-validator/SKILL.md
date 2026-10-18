---
name: skill-validator
description: Deterministic auditor that validates skills against AEF agentic principles, YAML frontmatter standards, naming consistency, input/output gates, and safety constraints. Emits PASS, WARN, or FAIL.
---

# Skill Validator

This skill independently evaluates existing or newly authored skills against **Agentic Engineering Framework (AEF)** standards. It operates in read-only mode, providing concrete line-level feedback and a definitive pass/fail verdict.

---

## 🚦 Verification Gates

A valid AEF skill must satisfy 5 foundational gates:

### Gate 1: Frontmatter & Naming Integrity (GATE)
- Must begin with valid YAML frontmatter delimiter (`---`).
- `name`: Must match the parent directory name exactly in lowercase `kebab-case`.
- `description`: Must be concise, actionable, and state both **what** the skill does and the **precise trigger situations** when it should be executed.

### Gate 2: Structural Determinism & Workflow (GATE)
- Must include a clear Markdown title (`# Skill Title`).
- Must define explicit **Output Gates / Quality Gates** (criteria that declare when the task is done).
- Must define an actionable, step-by-step **Workflow** (avoid vague advice like "write good code").

### Gate 3: Philosophy Alignment (Karpathy × Pocock)
- **Empirical Ground Truth**: If the skill involves code or verification, it must require actual tool/command execution rather than theoretical assumptions.
- **Upfront Alignment (Pocock)**: If the skill handles ambiguous tasks, it must enforce interactive grilling or clarifying questions before code mutation.

### Gate 4: Principle of Least Privilege (PoLP) & Safety
- **No Unvetted Dangerous Commands**: Warn or fail on unrestricted wildcards (e.g. destructive recursion, dropping databases, unchecked curl-to-bash).
- **Zero Secrets**: No hardcoded API keys, tokens, or plaintext credentials.
- **Explicit HITL Gates**: If the skill causes mutations on remote environments or releases, human sign-off must be declared as a mandatory blocker.

### Gate 5: Language & Formatting Standards
- Entire document must be written in clear technical **English**.
- Mermaid diagrams (if present) must use standard, validated flowchart, sequenceDiagram, or classDiagram syntax without unsupported experimental keywords.

---

## 🛠️ Step-by-Step Validation Workflow

1. **Locate Target Skill**: Receive target path via `$ARGUMENTS` (e.g., `skills/my-new-skill/SKILL.md` or `skills/my-new-skill/`).
2. **Execute Automated Script** (if in local workspace):
   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File scripts/validate-skills.ps1 -SkillPath "<path>"
   ```
3. **Manual / Semantic Inspection**:
   - Check description trigger specificity.
   - Audit steps for clarity, determinism, and lack of "vibe coding" ambiguity.
4. **Emit Formal Audit Report**:
   - Return structured verdict table with exact line quotes.

---

## 📋 Audit Report Format

```markdown
# Skill Audit Report: {skill-name}

- **Path**: `skills/{skill-name}/SKILL.md`
- **Verdict**: PASS | WARN | FAIL
- **Gates Failed**: {N}

| Gate ID | Category | Status | Evidence / Recommendation |
| :--- | :--- | :--- | :--- |
| G1 | Naming & Frontmatter | PASS | `name: my-skill` matches directory `my-skill` |
| G2 | Actionable Workflow | PASS | Clear 4-step execution flow with output gates |
| G3 | Karpathy Ground Truth | PASS | Requires execution of `npm test` before green status |
| G4 | Safety & PoLP | PASS | No destructive commands or plaintext credentials |
| G5 | English & Formatting | PASS | English language, valid Mermaid syntax |

### Conclusion
[Cleared for merging into AEF / Action items required]
```
