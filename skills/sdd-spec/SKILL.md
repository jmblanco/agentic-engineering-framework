---
name: sdd-spec
description: Converts user requests, issue briefs, or PRDs into an unambiguous technical specification. Uses clarify mode to grill assumptions and close mode to freeze contracts prior to planning.
---

# SDD Spec (Specification-Driven Development)

Authors a single technical specification. Do NOT generate execution plans, task decompositions, or production code.

---

## 🚦 Output Gates & Rules
- A `closed` spec **MUST** declare explicit Given/When/Then Acceptance Criteria (`AC-NN`) and an exhaustive Trace table (`AC-NN -> source_ref`).
- Blocking ambiguities retain `status: clarify` with an assigned `owner`. Never emit `status: closed` with unresolved blockers.
- A clarify prompt and a closed artifact are mutually exclusive.

---

## 🛠️ Step-by-Step Workflow

### 1. Analyze Context & Interactive Grilling
* Inspect repository architecture, schemas, and adjacent code.
* Ask concise, interactive clarifying questions with explicit `(Recommended)` defaults:
  - **UX & State**: Transitions, error states, empty views.
  - **Data Contracts**: Strict typing, storage, nullability.
  - **Blast Radius**: Impact on existing systems.

### 2. Define Boundaries & Contracts
* Problem statement, explicit IN/OUT scope, data models, error handling.
* Non-Functional Requirements (NFRs): Security, performance, and accessibility (use `N/A - [reason]` if non-applicable).

### 3. Traceability & Complexity Sizing
* Trace all `AC-NN` to source requests or user statements.
* Assign relative complexity (`S | M | L | XL`) based on architectural blast radius and risk.

### 4. Author Specification
* Write using `templates/sdd-spec-template.md`.
* Recommend running `skills/sdd-validate spec <path>` before requesting final human sign-off (*HITL Gate 1*).
