# Agentic Engineering Framework (AEF)

<div align="center">

![AEF Version](https://img.shields.io/badge/Version-v0.1.0-blue.svg?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)
![Standard](https://img.shields.io/badge/Architecture-Clean_%26_Deterministic-blue?style=for-the-badge)
![Philosophy](https://img.shields.io/badge/Philosophy-Karpathy_%C3%97_Pocock-black?style=for-the-badge)
![Human-in-the-Loop](https://img.shields.io/badge/HITL-Mandatory-orange?style=for-the-badge)

<p align="center">
  <b>A deterministic engineering framework to govern, orchestrate, and operate autonomous AI agent teams with Human-in-the-Loop (HITL).</b>
</p>

[Methodology](docs/METHODOLOGY.md) • [Agent Roles](docs/ROLES.md) • [Glossary](docs/GLOSSARY.md) • [Rules](rules/AGENTS.md) • [Templates](templates/) • [Skills](skills/)

</div>

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
flowchart LR
    Phase1["1. SPEC<br/>(SDD & Clarify)"] --> Phase2["2. PLAN<br/>(Atomic Tasks)"]
    Phase2 --> Phase3["3. TDD<br/>(Red-Green-Refactor)"]
    Phase3 --> Phase4["4. QA AUDIT<br/>(Automated Verification)"]
    Phase4 --> Phase5["5. SECURITY<br/>(Raptor / SAST)"]
    Phase5 --> Phase6["6. RELEASE<br/>(SemVer & Dry-Plan)"]
    
    Human((Human-in-the-Loop)) -.->|"Approves"| Phase1
    Human -.->|"Approves"| Phase2
    Human -.->|"Authorizes Deploy"| Phase6

    classDef stage fill:#f8fafc,stroke:#3b82f6,stroke-width:2px;
    classDef human fill:#fff7ed,stroke:#f97316,stroke-width:2px;
    class Phase1,Phase2,Phase3,Phase4,Phase5,Phase6 stage;
    class Human human;
```

For full details on inputs, outputs, and quality gates for every phase, refer to [`docs/METHODOLOGY.md`](docs/METHODOLOGY.md).

---

## 👥 Specialized Subagent Roles

To prevent context contamination and over-privileged operations, AEF defines 5 dedicated subagents governed by the Principle of Least Privilege (PoLP):

```mermaid
graph TD
    SA["🏗️ System Architect<br/><i>Design & ADRs</i>"]
    TI["⚡ TDD Implementer<br/><i>Code & Tests</i>"]
    QA["🧪 QA Automation Lead<br/><i>Linter & Code Review</i>"]
    SEC["🛡️ Security Auditor<br/><i>SAST & PoLP</i>"]
    REL["🚀 Release Architect<br/><i>SemVer & Dry-Plan</i>"]

    SA -->|"Spec & Contracts"| TI
    TI -->|"Surgical Code"| QA
    QA -->|"Approved Review"| SEC
    SEC -->|"Clean Audit"| REL
```

| Agent Role | Primary Responsibility | Tools & Boundaries |
| :--- | :--- | :--- |
| **System Architect** | Architectural design, ADRs, strict data contracts, and visual topology. | Read-only + docs. No destructive commands. |
| **TDD Implementer** | Test-driven implementation of logic and components. | Local unit/integration tests and minimal implementation code. |
| **QA Automation Lead** | Empirical build, linter, strict typing, and WCAG accessibility audits. | Execution of linters, compiler, and test suites. |
| **Security Auditor** | OWASP Top 10 auditing, PoLP enforcement, SAST, and container hardening. | Static analysis and dependency scanners (SCA). |
| **Release Architect** | Release orchestration, SemVer versioning, rollback strategy, and changelogs. | **Zero-execution dry plans** until explicit human authorization. |

Refer to [`docs/ROLES.md`](docs/ROLES.md) for complete role profiles and tool permissions.

---

## 🚀 Adoption and Usage Modes

AEF is designed for modular adoption across diverse development environments:

### Mode 1: Within AI Coding Assistants (Antigravity / Cursor / Claude Code)
Embed rules and skills directly into your assistant's configuration directory:
- **Project Rules**: Place [`rules/AGENTS.md`](rules/AGENTS.md) as `.agents/rules/AGENTS.md` or append to your system prompt.
- **Executable Skills**: Copy folders from [`skills/`](skills/) into your skills directory (e.g. `.agents/skills/`).

### Mode 2: Bootstrapping New Repositories
Use standard templates from [`templates/`](templates/) to establish living documentation:
```bash
# 1. Copy templates into your target project
cp -r templates/ my-new-project/templates/
cp docs/GLOSSARY.md my-new-project/docs/
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
├── docs/                   # Methodological guides and standards
│   ├── METHODOLOGY.md      # Detailed 6-phase deterministic lifecycle
│   ├── ROLES.md            # Agent catalogue and privilege matrix
│   └── GLOSSARY.md         # Ubiquitous domain language for agentic engineering
├── rules/                  # Core governance and Karpathy x Pocock principles
│   └── AGENTS.md           # Universal instructions for AI agents
├── skills/                 # Executable runbooks and workflows
│   ├── align-and-plan/     # Pre-flight alignment and interactive grilling
│   ├── diagnose-bug/       # Deterministic bug diagnosis (Repro-First)
│   ├── code-review/        # Two-axis code review
│   ├── tdd-verify/         # Test-driven development and ground-truth validation
│   └── version-bump/       # SemVer version bump and release synchronization
└── templates/              # Canonical documentation templates
    ├── adr-template.md         # Architectural Decision Record template
    ├── sdd-spec-template.md    # Technical specification template
    ├── atomic-plan-template.md # Atomic task plan template
    └── release-plan-template.md# Release plan and rollback template
```

---

## 📄 License

This project is licensed under the **MIT License**. Designed and maintained by [Jose Miguel Blanco](https://github.com/jmblanco).
