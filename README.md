# Agentic Engineering Framework (AEF)

<div align="center">

![AEF Version](https://img.shields.io/badge/Version-v1.0.0-blue.svg?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)
![Standard](https://img.shields.io/badge/Architecture-Clean_%26_Deterministic-blue?style=for-the-badge)
![Philosophy](https://img.shields.io/badge/Philosophy-Karpathy_%C3%97_Pocock-black?style=for-the-badge)
![Human-in-the-Loop](https://img.shields.io/badge/HITL-Mandatory-orange?style=for-the-badge)

<p align="center">
  <b>A lean, deterministic engineering framework to govern, orchestrate, and operate autonomous AI agent teams with Human-in-the-Loop (HITL).</b>
</p>

[Methodology](docs/METHODOLOGY.md) • [Agent Roles](docs/ROLES.md) • [Glossary](docs/GLOSSARY.md) • [Rules](rules/AGENTS.md) • [Templates](templates/) • [Skills](skills/)

</div>

---

## 💡 Intellectual Origins & Core Philosophy

**Agentic Engineering Framework (AEF)** was conceived to solve the fundamental reliability problem of generative AI in software engineering. Rather than relying on unguided autocomplete or speculative prompt generation (*"vibe coding"*), AEF synthesizes the practical engineering philosophies of two pioneers:

### 1. Andrej Karpathy: Radical Simplicity & Empirical Ground Truth
- **Occam's Razor for Code**: Radical rejection of premature over-engineering, monolithic abstractions, and ceremonial layers.
- **Tight Feedback Loops**: Sub-second execution cycles verifying every code delta against actual runtime environments.
- **Repro-First Rule**: Zero tolerance for guessing root causes. A failing test case or deterministic reproduction script must exist before touching production code.
- **Empirical Ground Truth**: Never trust code because it "looks right" or compiles mentally; validation exists only when verified by compilers, linters, and test runners.

### 2. Matt Pocock: Upfront Grilling, Strict Contracts & Two-Axis Auditing
- **Interactive Grilling (*Grill Me*)**: The primary source of failure in AI-assisted development is unaligned assumptions. AEF agents actively interrogate developers upfront with targeted questions and explicit `(Recommended)` defaults to resolve ambiguities before planning.
- **Ubiquitous Language & Strict Contracts**: Type-safe domain models, explicit interfaces, and shared glossary definitions preventing semantic drift.
- **Two-Axis Code Review**: Independent evaluation separating specification compliance (did we build what was asked?) from engineering standards (did we introduce code smells or technical debt?).

---

## 🎯 Why This Framework?

Unstructured generative AI software development (*"vibe coding"*) introduces critical systemic risks:
1. **Non-deterministic code with speculative architecture**: Hallucinations and invalid assumptions across domain models.
2. **Accelerated technical debt**: Code that "appears to work" but lacks empirical ground-truth verification against reality.
3. **Security vulnerabilities and over-privileged execution**: Agents operating with unrestricted write/execution access without quality gates or least privilege policies.

**Agentic Engineering Framework (AEF)** transitions AI agents from naive autocomplete tools into **specialized, governed engineering teams**, where each agent operates within strict execution boundaries while human engineers retain strategic control (*Human-in-the-Loop*).

---

## 🏛️ Deterministic Lifecycle (6 Immutable Phases)

```mermaid
flowchart TD
    P1["1. SPEC: SDD & Grilling"] --> P2["2. PLAN: Atomic Tasks"]
    P2 --> P3["3. TDD: Red-Green-Refactor"]
    P3 --> P4["4. QA AUDIT: Automated Verification"]
    P4 --> P5["5. SECURITY: SAST & PoLP"]
    P5 --> P6["6. RELEASE: SemVer & Dry-Plan"]

    H1["Human-in-the-Loop Gate 1"] -.->|"Approves Spec"| P1
    H2["Human-in-the-Loop Gate 2"] -.->|"Approves Plan"| P2
    H3["Human-in-the-Loop Gate 3"] -.->|"Authorizes Deploy"| P6
```

For full details on inputs, outputs, and quality gates for every phase, refer to [`docs/METHODOLOGY.md`](docs/METHODOLOGY.md) and execute via [`skills/agentic-lifecycle`](skills/agentic-lifecycle/SKILL.md).

---

## 👥 Specialized Subagent Roles

To prevent context contamination and over-privileged operations, AEF defines 5 dedicated subagents governed by the Principle of Least Privilege (PoLP):

```mermaid
flowchart TD
    SA["System Architect: Design & ADRs"]
    TI["TDD Implementer: Code & Tests"]
    QA["QA Automation Lead: Linter & Code Review"]
    SEC["Security Auditor: SAST & PoLP"]
    REL["Release Architect: SemVer & Dry-Plan"]

    SA -->|"Spec & Contracts"| TI
    TI -->|"Surgical Code"| QA
    QA -->|"Approved Review"| SEC
    SEC -->|"Clean Audit"| REL
```

| Agent Role | Primary Responsibility | Primary Skills | Tools & Boundaries |
| :--- | :--- | :--- | :--- |
| **System Architect** | Architecture, ADRs, strict data contracts, and visual topology. | `sdd-spec`, `sdd-plan` | Read-only on code + docs. No destructive commands. |
| **TDD Implementer** | Test-driven implementation of logic and components. | `tdd-verify`, `diagnose-bug` | Local unit/integration tests and minimal surgical code. |
| **QA Automation Lead** | Empirical build, linter, strict typing, and independent auditing. | `code-review` | Execution of linters, compiler, and test suites. |
| **Security Auditor** | OWASP Top 10 auditing, PoLP enforcement, SAST, and container hardening. | `security-audit` | Static analysis, dependency scanners (SCA), and secret recon. |
| **Release Architect** | Release orchestration, SemVer versioning, rollback strategy, and changelogs. | `version-bump` | **Zero-execution dry plans** until explicit human authorization. |

Refer to [`docs/ROLES.md`](docs/ROLES.md) for complete role profiles and tool permissions.

---

## 🧰 Lean Skills Catalogue

AEF provides a lean, focused collection of executable runbooks organized into the Core Lifecycle and Repository Tooling:

```mermaid
flowchart TD
    subgraph Orchestration["Orchestrator"]
        AL["agentic-lifecycle"]
    end

    subgraph CoreLifecycle["Core Lifecycle Skills"]
        SS["sdd-spec: Phase 1 Spec & Grilling"]
        SP["sdd-plan: Phase 2 Atomic Tasks"]
        TV["tdd-verify: Phase 3 TDD Cycle"]
        DB["diagnose-bug: Phase 3 Repro-First"]
        CR["code-review: Phase 4 Two-Axis QA"]
        SEC["security-audit: Phase 5 Security"]
        VB["version-bump: Phase 6 Release"]
    end

    subgraph RepoOps["Repository & Dev Ops"]
        SC["skill-creator"]
        SV["skill-validator"]
        DS["doc-sync"]
    end

    AL --> SS
    AL --> SP
    AL --> TV
    AL --> CR
    AL --> SEC
    AL --> VB
    TV -.-> DB
    SC --> SV
    SC --> DS
```

---

## 🚀 Adoption and Usage Modes

AEF is designed for modular adoption across diverse development environments:

### Mode 1: Within AI Coding Assistants (Antigravity / Cursor / Claude Code)
Embed rules and skills directly into your assistant's configuration directory:
- **Project Rules**: Place [`rules/AGENTS.md`](rules/AGENTS.md) as `.agents/rules/AGENTS.md` or append to your system prompt.
- **Agent Directives**: Keep [`.agents/AGENTS.md`](.agents/AGENTS.md) and [`.gemini/GEMINI.md`](.gemini/GEMINI.md) for assistant-specific execution guidelines.
- **Executable Skills**: Copy folders from [`skills/`](skills/) into your skills directory (e.g. `.agents/skills/`).

### Mode 2: Automated Skill Validation
Verify the health and compliance of all skills in your project using the deterministic validation suite:
```bash
npm run validate
# Or directly:
node scripts/validate-skills.mjs
```

### Mode 3: Daily Engineering Workflow
```mermaid
sequenceDiagram
    autonumber
    actor Dev as Human Engineer
    participant Agent as AEF Agent
    participant Env as Environment / Tooling

    Dev->>Agent: "Implement OAuth2 Authentication"
    Agent->>Dev: Grilling: Auth providers? Session persistence strategy?
    Dev->>Agent: Answers confirmed
    Agent->>Env: Draft templates/sdd-spec-template.md
    Agent->>Env: Execute TDD (Red -> Green -> Refactor)
    Agent->>Env: Execute Two-Axis review & SAST scan
    Agent->>Dev: Present Release Dry-Plan
    Dev->>Agent: Authorize Deployment (HITL)
```

---

## 📂 Framework Structure

```text
agentic-engineering-framework/
├── README.md               # Framework overview and visual guide
├── CHANGELOG.md            # Version history following Keep a Changelog
├── LICENSE                 # MIT License
├── package.json            # Tooling and validation scripts
├── .agents/
│   └── AGENTS.md           # Instructions for AI agents operating on AEF itself
├── .gemini/
│   └── GEMINI.md           # Workspace instructions for Gemini / Antigravity
├── docs/                   # Methodological guides and standards
│   ├── METHODOLOGY.md      # Detailed 6-phase deterministic lifecycle
│   ├── ROLES.md            # Agent catalogue and privilege matrix
│   └── GLOSSARY.md         # Ubiquitous domain language for agentic engineering
├── rules/                  # Core governance and Karpathy x Pocock principles
│   └── AGENTS.md           # Universal instructions for AI agents
├── scripts/                # Automated audit and validation scripts
│   └── validate-skills.mjs # Cross-platform Node.js skill auditor
├── skills/                 # Lean executable runbooks
│   ├── agentic-lifecycle/  # Master 6-phase orchestrator
│   ├── sdd-spec/           # Spec authoring & interactive grilling (Phase 1)
│   ├── sdd-plan/           # Atomic task planning & verification commands (Phase 2)
│   ├── tdd-verify/         # TDD Red-Green-Refactor (Phase 3)
│   ├── diagnose-bug/       # Deterministic bug diagnosis (Phase 3 troubleshooting)
│   ├── code-review/        # Independent two-axis code review (Phase 4)
│   ├── security-audit/     # SAST, SCA, and PoLP security audit (Phase 5)
│   ├── version-bump/       # SemVer release & Dry-Plan (Phase 6)
│   ├── skill-creator/      # Onboarding guide for new agent skills
│   ├── skill-validator/    # Quality and safety validator for skills
│   └── doc-sync/           # Automated repository documentation synchronizer
└── templates/              # Canonical documentation templates
    ├── adr-template.md         # Architectural Decision Record template
    ├── sdd-spec-template.md    # Technical specification template
    ├── atomic-plan-template.md # Atomic task plan template
    └── release-plan-template.md# Release plan and rollback template
```

---

## 📄 License & Attribution

This project is open-source software licensed under the **MIT License**.

Conceived and designed as an open engineering framework synthesizing the insights of **Andrej Karpathy** (Autonomous Agent design, Tight Feedback Loops, Ground Truth verification) and **Matt Pocock** (Spec-Driven Development, Interactive Grilling, Two-Axis Code Review, Strict Type Systems).
