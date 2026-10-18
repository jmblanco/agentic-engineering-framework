# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2026-10-18

### Added
- **Master Orchestrator (`skills/agentic-lifecycle`)**: End-to-end execution workflow coordinating the 6 deterministic phases across the 5 specialized subagents with 3 mandatory Human-in-the-Loop (HITL) gates.
- **Specification-Driven Development Suite (SDD)**:
  - `skills/sdd-spec`: Structured requirement capture featuring `status: clarify` vs `status: closed` modes, interactive grilling, and Given/When/Then acceptance criteria.
  - `skills/sdd-plan`: Atomic task decomposition guaranteeing 100% acceptance criteria coverage, TDD order, and empirical verification commands.
  - `skills/sdd-validate`: Independent, read-only quality auditor evaluating specs and plans against strict objective criteria emitting `PASS | WARN | FAIL` verdicts.
  - `skills/sdd-retrofeed`: Post-launch feedback analyzer comparing telemetry and runtime signals against specification baselines to produce traceable improvement proposals (`GAP-NN` -> `PROP-NN`).
- **Official Security Audit Skill (`skills/security-audit`)**: Fulfills Phase 5 and the `Security Auditor` role across 4 pillars:
  - Software Composition Analysis (SCA) dependency scans.
  - Static Application Security Testing (SAST) and Sonar Clean Code rules.
  - Container and Infrastructure Hardening (PoLP non-root execution, OWASP HTTP headers, K8s securityContext).
  - Secret reconnaissance and OWASP Top 10 mitigation.

### Changed
- **Enhanced Release Workflow (`skills/version-bump`)**: Upgraded to automatically derive SemVer increments from Conventional Commits (`git log`), support multi-stack manifests (Node, Python, Go, Rust, Helm), maintain Keep a Changelog entries, generate mandatory Dry-Plans with rollbacks, and draft GitHub Flow PR release notes.
- **Rules & Governance Synchronization (`rules/AGENTS.md`)**: Updated the operational skills catalogue and repository hierarchy to reflect the unified 11-skill suite.
- **Documentation & Visuals (`README.md`)**: Added the Canonical Skills Catalogue visual diagram, updated role capability matrices, and bumped framework version to `v0.2.0`.

---

## [0.1.0] - 2026-10-17

### Added
- **Core Governance Model**: Universal agent operating rules in [`rules/AGENTS.md`](./rules/AGENTS.md) based on the Karpathy × Pocock synthesis.
- **Deterministic 6-Phase Lifecycle**: Comprehensive guide in [`docs/METHODOLOGY.md`](./docs/METHODOLOGY.md) (SDD, Atomic Plan, TDD, QA Audit, Security/SAST, and Release Dry-Plan).
- **Subagent Catalogue**: Formal roles and Principle of Least Privilege (PoLP) boundary matrix in [`docs/ROLES.md`](./docs/ROLES.md).
- **Ubiquitous Domain Glossary**: Formal agentic engineering terminology and Mermaid domain mindmap in [`docs/GLOSSARY.md`](./docs/GLOSSARY.md).
- **Operational Skills Suite**:
  - `align-and-plan`: Pre-flight alignment and interactive grilling before coding.
  - `diagnose-bug`: Deterministic bug diagnosis with tight feedback repro loop (Repro-First).
  - `code-review`: Independent two-axis code review (specification compliance and code smell detection).
  - `tdd-verify`: Test-driven development with empirical runtime verification (*Ground Truth*).
  - `version-bump`: Semantic versioning increment protocol with Dry-Plan and changelog sync.
- **Canonical Template Collection**:
  - `templates/adr-template.md`: Architectural Decision Records.
  - `templates/sdd-spec-template.md`: Spec-Driven Development technical specifications.
  - `templates/atomic-plan-template.md`: Atomic task planning with verification commands.
  - `templates/release-plan-template.md`: Release Dry-Plan with explicit rollback strategies.
