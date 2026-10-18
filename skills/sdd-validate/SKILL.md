---
name: sdd-validate
description: Read-only independent auditor that evaluates an SDD spec or plan against strict criteria, emitting PASS, WARN, or FAIL with concrete line evidence.
---

# SDD Validate (Independent Quality Gate)

Evaluates the target file (`$ARGUMENTS`: spec or plan path) in read-only mode. Never modifies target artifacts.

---

## 🚦 Output Gates & Rules
- Arguments must specify type (`spec | plan`) and a valid relative or absolute file path.
- Reports each criterion check in order with exact section and line evidence.
- Calculates `gates_failed`. Any failed gate check triggers an overall **FAIL** verdict.

---

## 🔍 Validation Checklists

### For Specifications (`sdd-validate spec <path>`):
1. **[GATE] Status**: Is it `status: closed`? (If `status: clarify`, fails with WARN/FAIL).
2. **[GATE] Acceptance Criteria**: Are all `AC-NN` formulated in Given/When/Then format?
3. **[GATE] Traceability**: Does every `AC-NN` map to a source requirement?
4. **Data Contracts**: Are data models and interfaces explicitly typed without ambiguous placeholders?
5. **NFRs**: Are Security, Performance, and Accessibility addressed?

### For Plans (`sdd-validate plan <path>`):
1. **[GATE] AC Coverage**: Does the plan cover 100% of the spec's `AC-NN`?
2. **[GATE] Empirical Verification**: Does every task contain an executable terminal command (`verify_cmd`)?
3. **[GATE] TDD Sequence**: Is there a clear Red -> Green progression?
4. **Dependency Integrity**: Are task dependencies acyclic and feasible?

---

## 📋 Verdict Output Format

```text
# sdd-validate {type} — {path}
Verdict: PASS | WARN | FAIL
gates_failed: {N}

| Check | Gate | Result | Evidence |
| :--- | :--- | :--- | :--- |
| {Check ID} | Yes/No | PASS/WARN/FAIL | {section/line — quote} |
```
