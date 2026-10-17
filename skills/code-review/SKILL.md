---
name: code-review
description: Two-axis code review procedure (Specification Compliance and Engineering Quality). Execute when reviewing recent changes, PRs, or assessing code quality prior to sign-off.
---

# Two-Axis Code Review

Inspired by Matt Pocock's `code-review` skill. Changes are audited across two independent axes to prevent bias and ensure high engineering standards.

---

## Axis 1: Specification Compliance
Question: **Does the code do exactly what was requested, without omitting requirements or introducing unnecessary bloat?**

* Verify each acceptance criterion from the original task specification.
* Audit edge cases: empty inputs, network errors, boundary limits, and loading states.
* Confirm that no unsolicited features were added that increase maintenance overhead.

---

## Axis 2: Engineering Standards & Code Smell Detection
Question: **Does the code adhere to project conventions and eliminate anti-patterns?**

Evaluate Martin Fowler's canonical code smell checklist:
1. **Mysterious Name**: Cryptic variable, function, or component names that obscure intent.
2. **Duplicated Code**: Repeated logic that belongs in a shared utility or reusable component.
3. **Long Function / Component**: Functions or components exceeding 80-100 lines handling multiple concerns.
4. **Speculative Generality**: Premature abstractions, unused interface methods, or dead parameters.
5. **Type Safety Holes**: Usage of `any`, `as unknown as T`, or type-checker suppressions (`@ts-ignore`).
6. **Accessibility & Semantics**: Missing semantic HTML elements, missing image alt attributes, or contrast issues.

---

## Review Output Format
Structure the audit report into:
1. **Strengths**: Notable aspects of the implementation.
2. **Must-Fix (Blockers)**: Functional defects, broken tests, or type safety regressions.
3. **Nice-to-Have (Suggestions)**: Opportunities for readability or minor performance optimization.
