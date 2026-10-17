---
name: align-and-plan
description: Pre-flight alignment and technical specification procedure. Execute when requested to design or implement a feature, page, or refactor before writing production code.
---

# Align and Plan (Grilling & Spec)

Inspired by Matt Pocock's `/grill-me` and `/grill-with-docs` skills. The leading cause of failure in agentic software engineering is misalignment of assumptions. This procedure ensures the developer and AI agent share the exact same mental model before authoring code.

---

## Workflow

### 1. Identify Ambiguities
Review the user prompt and isolate:
* **UX and Visual Decisions**: Responsive behavior, theme adaptation, empty states, loading states.
* **Data Contracts**: Fields, strict types, nullability, and storage layers.
* **Dependencies & Boundaries**: Third-party packages vs native implementations, blast radius on existing components.

### 2. Formulate Concise Questions (Grilling)
* Ask direct, actionable questions with explicit recommended defaults.
* Leverage interactive tooling (`ask_question`) where available to prevent noisy chat output.
* Always prefix the default choice with `(Recommended)`.

### 3. Record Architecture Decision (ADR)
When the decision has a lasting architectural impact:
* Create an entry in `docs/adr/XXXX-<decision-name>.md` using [`templates/adr-template.md`](../../templates/adr-template.md).
* Document: Context, Decision, Consequences, and Rejected Alternatives.

### 4. Produce a Verifiable Atomic Plan
Break down the implementation into incremental steps:
* Each step must be **independently verifiable**.
* Pair every step with its corresponding verification command (e.g. test command, build check, type check).
