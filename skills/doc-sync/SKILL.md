---
name: doc-sync
description: Synchronizes and updates all framework documentation (README, AGENTS rules, CHANGELOG, and catalogue tables) whenever skills, templates, or architecture changes are introduced in this repository.
---

# Documentation Sync & Maintenance (doc-sync)

This skill ensures that the living documentation of the **Agentic Engineering Framework (AEF)** never drifts from the actual codebase and skill definitions. It must be executed after adding, modifying, or pruning skills, rules, or templates.

---

## 🚦 Output Gates & Rules
- **Zero Drift**: Every skill directory in `skills/` must have an exact 1:1 corresponding entry in `README.md`, `rules/AGENTS.md`, and `.agents/AGENTS.md`.
- **Mermaid Consistency**: All visual diagrams in `README.md` and `docs/` must reflect current active skills without referencing deprecated or deleted paths.
- **Changelog Integrity**: Any added, modified, or removed capability must be registered under `CHANGELOG.md` following SemVer and *Keep a Changelog*.
- **Language**: All generated documentation entries must remain in technical **English**.

---

## 🛠️ Step-by-Step Synchronization Workflow

### 1. Inventory Active Skills & Components
Scan the repository to detect current sources of truth:
```bash
# List all active skills
node -e "const fs = require('fs'); console.log(fs.readdirSync('skills'))"
```

### 2. Verify and Update README.md
* **Skills Diagram**: Update the Mermaid diagram in the *Canonical Skills Catalogue* section to match active skills only.
* **Role Mapping**: Ensure the subagent-to-skill table in `README.md` maps each active skill to its primary owner.
* **Directory Tree**: Update the `Framework Structure` ASCII tree.

### 3. Verify and Update Rules Files
* Update `rules/AGENTS.md` (Section 3: *Operational Skills Catalogue* and Section 4: *Repository Structure*).
* Update `.agents/AGENTS.md` to ensure repo-level guidelines point to the right validation commands.

### 4. Update CHANGELOG.md
Draft or amend the unreleased / latest release notes with clear categorizations:
- `Added`: New skills, scripts, or templates.
- `Changed`: Enhancements or refactors to existing capabilities.
- `Removed`: Deprecated or deleted skills.

### 5. Run Ground-Truth Validation
Run the validator to guarantee 100% compliance:
```bash
npm run validate
```
