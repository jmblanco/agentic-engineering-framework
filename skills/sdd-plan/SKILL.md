---
name: sdd-plan
description: Decomposes a closed technical specification into an atomic, TDD-ordered execution plan with deterministic empirical verification commands.
---

# SDD Plan (Atomic Task Planning)

Generates an atomic execution plan from an approved `status: closed` specification. Do NOT write production code.

---

## 🚦 Output Gates & Rules
- Every task card must declare `owner`, `estimate (S|M|L)`, `deps`, `covers (AC-NN)`, `files`, and `verify_cmd` with expected outcome.
- Trace table must cover **100% of the specification's `AC-NN`**. Any missing AC blocks delivery.
- **Karpathy Ground-Truth Rule**: Every task states an empirical shell command (`npm test`, `pytest`, `tsc --noEmit`, etc.) verified against actual repository tooling.
- **TDD Sequencing**: A RED test task/step must precede the implementation; GREEN minimal code; Refactor while preserving green.

---

## 🛠️ Step-by-Step Workflow

### 1. Validate Specification Status
Abort execution if the input specification is missing, unclosed, or contains unresolved blocking questions (`status: clarify`).

### 2. Architectural Decisions (ADR)
If structural choices, trade-offs, or new libraries are introduced, record them in `docs/adr/XXXX-<name>.md` using `templates/adr-template.md`.

### 3. Decompose into Atomic Tasks
Decompose work into single-responsibility atomic tasks using `templates/atomic-plan-template.md`.

### 4. Self-Audit & Plan Verification
Verify that:
- Every AC is addressed.
- Every task has an executable verification command.
- Recommend running `skills/sdd-validate plan <path>` before requesting human approval (*HITL Gate 2*).
