# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-24

### Added
- **Repository Documentation Synchronizer (`skills/doc-sync`)**: Automated skill that scans the repository and keeps `README.md`, `rules/AGENTS.md`, and diagrams synchronized with zero documentation drift.
- **Node.js Cross-Platform Validation Script (`scripts/validate-skills.mjs`)**: High-speed, dependency-free validator for skills auditing YAML frontmatter, naming, structure, safety, and Mermaid diagrams.
- **Developer Tooling Suite**:
  - `skills/skill-creator`: Guided workflow for creating and onboarding compliant agent skills.
  - `skills/skill-validator`: Quality and safety auditor for agent skills.

### Changed
- **Radical Simplification to Lean Core**: Streamlined the framework into a sharp, focused suite:
  - Phase 1: `sdd-spec` (incorporating upfront interactive grilling and acceptance criteria).
  - Phase 2: `sdd-plan` (atomic task breakdown with empirical verification commands).
  - Phase 3: `tdd-verify` & `diagnose-bug` (TDD execution and deterministic repro-first debugging).
  - Phase 4: `code-review` (independent two-axis review).
  - Phase 5: `security-audit` (SCA, SAST, PoLP container hardening, OWASP Top 10).
  - Phase 6: `version-bump` (Conventional Commits, Keep a Changelog sync, Dry-Plans).
  - Master Orchestrator: `agentic-lifecycle` (coordinates the 6 phases with 3 HITL gates).
- **Updated Documentation & Diagrams**: Re-architected `README.md` and `rules/AGENTS.md` to reflect the lean catalogue.

### Removed
- **Redundant & High-Friction Skills**:
  - Removed `align-and-plan` (consolidated and superseded by `sdd-spec`).
  - Removed `sdd-validate` and `sdd-retrofeed` (pruned to keep the v1.0 core zero-friction and focused).

---

## [0.2.0] - 2026-10-18

### Added
- Master Orchestrator (`skills/agentic-lifecycle`) with 3 mandatory HITL gates.
- Specification-Driven Development suite (`sdd-spec`, `sdd-plan`, `sdd-validate`, `sdd-retrofeed`).
- Security Audit skill (`skills/security-audit`) covering SCA, SAST, PoLP, and OWASP.

---

## [0.1.0] - 2026-10-17

### Added
- Core Governance Model and 6-phase deterministic lifecycle documentation.
- Initial agent roles (`docs/ROLES.md`) and ubiquitous domain glossary (`docs/GLOSSARY.md`).
- Canonical templates for ADRs, SDD specs, atomic plans, and release plans.
