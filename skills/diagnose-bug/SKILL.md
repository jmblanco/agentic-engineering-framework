---
name: diagnose-bug
description: Disciplined procedure for diagnosing and fixing defects. Execute whenever a bug, console error, or unexpected behavior is reported.
---

# Diagnosing Bugs (Ground-Truth & Repro Loop)

Rooted in **Andrej Karpathy's** golden rule (empirical verification against reality) and **Matt Pocock's** `diagnosing-bugs` workflow. Never guess the root cause of a defect by staring at static code.

---

## Non-Negotiable Rule
> **Never modify production code without first establishing a reproducible test, script, or command that reproduces the failure (Red Phase).**

---

## Diagnostic Phases

### Phase 1: Build the Tight Feedback Loop
Construct the fastest, most deterministic trigger for the defect:
1. **Failing Unit / Integration Test** (Primary choice): A minimal test in Vitest/Jest/pytest capturing the reported symptom.
2. **Minimal Repro Script**: A 10-line standalone script or terminal command executing the problematic code path.
3. **Compilation or Linter Command**: Type check validation (`tsc --noEmit`) or lint command when relevant.

**Phase 1 Success Criterion**: You can run **a single command** that reliably fails and demonstrates the defect.

### Phase 2: Isolate Root Cause & Mutation Path
* Trace data flow from user input to the failing line.
* Add temporary assertion statements or debug logs to validate hypotheses.
* Avoid overly complex explanations: inspect the simplest point of failure (incorrect types, state mutations, race conditions, invalid paths).

### Phase 3: Minimal Surgical Patch
* Apply the smallest, cleanest modification that resolves the root cause.
* Do not perform unrelated refactoring in the same patch.

### Phase 4: Ground-Truth Green Verification
1. Re-run the Phase 1 loop: it must pass in green.
2. Run the complete test suite or project build (`npm.cmd test`, `npm.cmd run build`) to ensure zero regressions.
3. Remove temporary debug artifacts and logs.
