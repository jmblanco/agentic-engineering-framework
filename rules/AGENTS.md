# AGENTS.md — Universal Rules for Agentic Engineering Framework (AEF)

This document establishes the governance model, engineering standards, and execution constraints for any AI assistant operating within the **Agentic Engineering Framework (AEF)**.

Rooted in the synthesis of **Andrej Karpathy** (radical simplicity, tight feedback loops, empirical ground-truth verification) and **Matt Pocock** (upfront interactive alignment, ubiquitous language, strict typing, and two-axis review).

---

## 1. Core Principles (Karpathy × Pocock)

### A. Radical Simplicity (Occam's Razor / Karpathy Style)
* **Avoid premature over-engineering**: Do not introduce complex abstractions, factories, or multi-layered architectures for tasks solved cleanly in minimal code.
* **Self-contained and modular files**: Favor files readable from top to bottom with atomic responsibilities.
* **Zero blind "Vibe Coding"**: Speculative code generation without empirical validation or clear architectural purpose is strictly prohibited.

### B. Tight Feedback Loops
* **Ground-Truth Verification**: Never assume code works simply because it compiles mentally. Always execute automated test suites, linters, or verification commands before marking a task complete.
* **Repro-First Bug Diagnosis**: Before modifying any production code to fix a bug, build a unit test, script, or command that reproduces the failure (**Red phase**). If you cannot reproduce the bug deterministically, do not guess the solution.

### C. Upfront Alignment (*Grilling before Coding*)
* **Ask before assuming**: When a requirement, data contract, or UX expectation is ambiguous, initiate structured interactive questions before writing code.
* **Ubiquitous Language**: Consult and maintain synchronization with [`docs/GLOSSARY.md`](../docs/GLOSSARY.md). Do not invent divergent terminology when a formal definition exists.

---

## 2. Agent Governance & Operational Boundaries (PoLP)

All autonomous agent operations are governed by the **Principle of Least Privilege (PoLP)** and mandatory **Human-in-the-Loop (HITL)** checkpoints:

```mermaid
flowchart TD
    subgraph Governance["Agent Governance (AEF)"]
        A["User Input / Feature Request"] --> B{"Ambiguous Requirement?"}
        B -- Yes --> C["HITL Alignment (Grilling / SDD Spec)"]
        B -- No --> D["Verifiable Atomic Plan"]
        C --> D
        D --> E["TDD (Red -> Green -> Refactor)"]
        E --> F["QA Audit & Type Check"]
        F --> G["Security Audit (PoLP / SAST)"]
        G --> H{"Destructive Mutation / Deploy?"}
        H -- Yes --> I["Dry-Plan & Mandatory HITL Approval"]
        H -- No --> J["Execution Completed"]
        I --> J
    end
```

### Inviolable Security Rules
1. **Read-Only by Default**: Architectural and auditing agents operate without write or destructive permissions on production systems.
2. **No Unattended Destructive Operations**: Commands such as `rm -rf`, `DROP TABLE`, direct production deploys, or branch deletions require explicit human approval via a transparent *Dry-Plan*.
3. **Secure Secret Management**: API keys, credentials, and sensitive tokens must never appear in plaintext code or logs; use environment variables and secret managers.

---

## 3. Operational Skills Catalogue

Agents must execute standardized skills located in `skills/`:

### 🎯 Orchestration & Lifecycle
* **`agentic-lifecycle`**: Master orchestrator for the 6-phase deterministic engineering lifecycle with 3 mandatory HITL gates.

### 📐 Specification & Planning (SDD)
* **`sdd-spec`**: Converts requests into closed, unambiguous technical specifications with Given/When/Then acceptance criteria.
* **`align-and-plan`**: Pre-flight alignment, interactive grilling, and initial feature scoping.
* **`sdd-plan`**: Decomposes closed specifications into atomic, TDD-sequenced tasks paired with empirical verification commands.
* **`sdd-validate`**: Independent read-only quality auditor evaluating specs and plans against strict objective criteria (`PASS | WARN | FAIL`).
* **`sdd-retrofeed`**: Analyzes post-launch telemetry against specification baselines to generate traceable improvement proposals.

### ⚡ Implementation & Quality
* **`tdd-verify`**: Test-driven development cycle with ground-truth verification against the active runtime.
* **`diagnose-bug`**: Deterministic bug diagnosis workflow (reproduction loop -> mutation isolation -> minimal patch -> green verification).
* **`code-review`**: Independent two-axis evaluation (Specification Compliance + Code Smell Detection).

### 🛡️ Security & Release
* **`security-audit`**: Pre-release security audit covering SAST, SCA dependency vulnerability scanning, container/PoLP hardening, and OWASP Top 10.
* **`version-bump`**: Semantic versioning increment protocol based on Conventional Commits, multi-ecosystem manifest sync, Dry-Plans, and GitHub Flow PR drafting.

### 🛠️ Framework & Skill Operations
* **`skill-creator`**: Guides the design, creation, and onboarding of compliant production-grade agent skills into AEF.
* **`skill-validator`**: Deterministic quality auditor that evaluates skills against frontmatter integrity, actionable workflows, Ground Truth, and safety constraints.

---

## 4. Canonical Repository Structure

```text
agentic-engineering-framework/
├── README.md               # Framework manifesto and visual guide
├── CHANGELOG.md            # Release history following Keep a Changelog
├── LICENSE                 # MIT License
├── .agents/
│   └── AGENTS.md           # Instructions for AI agents operating on AEF itself
├── .gemini/
│   └── GEMINI.md           # Workspace instructions for Gemini / Antigravity
├── rules/
│   └── AGENTS.md           # Universal instructions for AI agents
├── docs/
│   ├── METHODOLOGY.md      # Detailed 6-phase deterministic lifecycle
│   ├── ROLES.md            # Agent catalogue and privilege matrix
│   └── GLOSSARY.md         # Ubiquitous domain language
├── scripts/
│   └── validate-skills.mjs # Automated Node.js skill auditor script
├── skills/                 # Executable runbooks and workflows
│   ├── agentic-lifecycle/  # Master 6-phase orchestrator
│   ├── sdd-spec/           # Spec-Driven Development authoring
│   ├── align-and-plan/     # Pre-flight alignment and grilling
│   ├── sdd-plan/           # Atomic task planning
│   ├── sdd-validate/       # Independent spec & plan auditor
│   ├── sdd-retrofeed/      # Post-launch continuous feedback
│   ├── tdd-verify/         # TDD Red-Green-Refactor
│   ├── diagnose-bug/       # Deterministic bug diagnosis
│   ├── code-review/        # Two-axis code review
│   ├── security-audit/     # SAST, SCA, and PoLP security audit
│   ├── version-bump/       # Conventional commits release and Dry-Plan
│   ├── skill-creator/      # Creation and onboarding guide for skills
│   └── skill-validator/    # Quality and safety validator for skills
└── templates/              # Standardized documentation templates
    ├── adr-template.md
    ├── sdd-spec-template.md
    ├── atomic-plan-template.md
    └── release-plan-template.md
```
