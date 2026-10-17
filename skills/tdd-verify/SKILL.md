---
name: tdd-verify
description: Test-driven development workflow and empirical verification against reality. Execute to implement logical functions, utilities, state machines, or mission-critical components with high confidence.
---

# TDD & Ground-Truth Verification

Combines strict test-driven development (TDD) with **Andrej Karpathy's** core guideline: never trust theoretical assumptions; verify exclusively against the actual compiler and runtime output (*Ground Truth*).

---

## Three-Step Cycle (Red -> Green -> Refactor)

### 1. Red (Author the Failing Test)
* Define the expected contract in a test file (e.g. `*.test.ts`, `*_test.go`, `test_*.py`).
* Write a focused, readable test describing the behavior.
* Run the test runner (e.g. `npm.cmd test`, `pytest`).
* **Confirm the test fails for the exact intended reason** (and not due to test syntax errors or broken imports).

### 2. Green (Minimal Implementation)
* Write the minimal surgical code required in the implementation file to satisfy the test.
* Do not anticipate speculative future requirements in this step.
* Re-run the test: it must pass in green.

### 3. Refactor (Clean Without Altering Behavior)
* With the safety net of the green test:
  * Remove duplicate code paths.
  * Improve variable and parameter naming.
  * Simplify branching and conditionals.
* Re-run the test suite to confirm it remains green.
