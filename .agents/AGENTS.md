# AGENTS.md — Agent Operating Rules for Agentic Engineering Framework (AEF)

Welcome to the **Agentic Engineering Framework (AEF)** repository. This repository itself is developed and maintained using the very agentic engineering principles it defines.

---

## 1. Operating Rules for This Repository

When working on AEF itself as an AI agent:
1. **Repository Language**: All documentation, skill definitions, templates, commit messages, and PRs must be written in **English**.
2. **Ground Truth & Validation**: Always validate modified files. For skills, verify YAML frontmatter, naming conventions, and execute `skills/skill-validator` when adding or modifying skills.
3. **Determinism over Vibes**: No speculative code or untraced skills. Every skill must define explicit triggers, inputs, outputs, and quality gates.
4. **Documentation Synchronization**: When adding, modifying, or removing skills or templates, invoke `skills/doc-sync` to ensure `README.md`, `rules/AGENTS.md`, and diagrams remain in 100% sync.
5. **Human-in-the-Loop (HITL)**: Any structural change to the 6 lifecycle phases, core subagents, or release versions (`version-bump`) requires explicit user confirmation.
6. **Keep a Changelog**: All user-facing or architectural changes must be registered in `CHANGELOG.md` following SemVer.

---

## 2. Directory Structure & Conventions

* `rules/AGENTS.md`: Universal rules and guidance for the framework.
* `docs/`: In-depth methodological and architectural specifications (`METHODOLOGY.md`, `ROLES.md`, `GLOSSARY.md`).
* `skills/`: The canonical collection of executable skills. Each folder contains a `SKILL.md`.
* `templates/`: Living markdown templates used across lifecycle phases.
* `scripts/`: Deterministic validation and automation scripts.

---

## 3. Creating & Validating Skills

When adding or updating skills in this repository:
- Use `skills/skill-creator` to guide the creation process.
- Run `skills/skill-validator` (or `node scripts/validate-skills.mjs` / `npm run validate`) to ensure compliance with AEF standards:
  - Exact folder and frontmatter `name` match (`kebab-case`).
  - Clear, trigger-focused `description`.
  - Defined input/output gates and actionable step-by-step workflow.
  - Zero plaintext secrets or dangerous unvetted bash commands.
- Run `skills/doc-sync` to update framework documentation.
