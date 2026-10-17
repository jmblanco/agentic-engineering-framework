# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
