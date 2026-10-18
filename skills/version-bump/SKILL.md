---
name: version-bump
description: Disciplined procedure for Semantic Versioning (SemVer) increments via Conventional Commits, multi-ecosystem metadata synchronization, Keep a Changelog updates, mandatory Dry-Plan execution, and GitHub Flow PR drafting.
---

# Version Bump & Release Procedure

This procedure coordinates the full release cycle for the **Release Architect** (AEF Phase 6), ensuring that version increments, metadata manifests, changelog entries, and Pull Request drafts remain 100% synchronized and protected by Human-in-the-Loop (HITL) authorization.

---

## 🧭 1. Conventional Commits & SemVer Derivation

Inspect git history relative to the base branch or previous tag:
```bash
git log $(git describe --tags --abbrev=0 2>/dev/null || echo "HEAD~10")..HEAD --oneline
```

- **MAJOR (`X.0.0`)**: Breaking changes in public APIs, data contracts, skill protocols, or commits containing `BREAKING CHANGE:` / `feat!:` / `fix!:`.
- **MINOR (`x.Y.0`)**: Backward-compatible new features, new skills, templates, or capabilities (`feat:`).
- **PATCH (`x.y.Z`)**: Backward-compatible bug fixes, performance improvements, documentation, or maintenance (`fix:`, `perf:`, `refactor:`, `chore:`, `docs:`).

---

## 📋 2. Multi-Ecosystem Points of Truth

Synchronize all version files corresponding to the repository stack:
* **Node.js / TypeScript**: `package.json` (`"version"`), `package-lock.json`.
* **Python**: `pyproject.toml` (`version`), `setup.cfg`.
* **Go**: `version.go` or Git tags.
* **Rust**: `Cargo.toml` (`[package].version`).
* **Cloud & Kubernetes**: `Chart.yaml` (`version` and `appVersion`), Kustomize overlays.
* **Documentation**: `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/).

---

## 📝 3. `CHANGELOG.md` Maintenance

Add a new section under the root heading in reverse chronological order:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- Concise summary of new features with PR/commit references.

### Changed
- Notable updates to existing workflows or contracts.

### Fixed
- Addressed bugs and edge-case resolutions.

### Security
- Vulnerability remediations or permission restrictions.
```

---

## 🚀 4. Step-by-Step Execution Workflow

1. **Verify Quality Gates**:
   - QA Audit (Phase 4): 100% tests passing, clean linter, and zero type errors.
   - Security Audit (Phase 5): Zero High/Critical CVEs and verified PoLP.
2. **Calculate SemVer Bump**: Analyze commit messages since last tag.
3. **Synchronize Files**: Bump version across manifests and write `CHANGELOG.md` section.
4. **Draft the Dry-Plan**: Fill [`templates/release-plan-template.md`](../../templates/release-plan-template.md) detailing exact release and rollback commands.
5. **Generate GitHub Flow PR Draft**: Prepare the PR title and description.
6. **Request HITL Confirmation**: Present the dry-plan to the human engineer.
7. **Execute Tagging & Commit (Post-Approval Only)**:
   ```bash
   git commit -m "chore(release): bump version to vX.Y.Z"
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   ```

> [!CAUTION]
> **Git Discipline**: Never execute unattended `git push`, tag publication, or `gh pr create` without explicit user sign-off.

---

## 📬 5. GitHub Flow PR Draft Format

When drafting the release pull request, format the body as follows:

```markdown
## 📦 Release vX.Y.Z

### 🎯 Overview & SemVer Increment
- **Bump Level**: MAJOR | MINOR | PATCH
- **Target Tag**: `vX.Y.Z`
- **Associated Dry-Plan**: Attached below

### 📋 Changelog Preview
[Insert markdown from CHANGELOG.md for vX.Y.Z]

### 🧪 Verification & Quality Evidence
- Unit/Integration Tests: PASS (100% green)
- Static Analysis / Types: PASS (zero warnings)
- Security & SAST Audit: PASS (zero high/crit CVEs)

### 🔄 Rollback Summary
Immediate rollback command: `[Rollback command from Dry-Plan]`
```
