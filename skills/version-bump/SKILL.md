---
name: version-bump
description: Disciplined procedure for Semantic Versioning (SemVer) increments, synchronizing metadata files, changelogs, and release tags.
---

# Version Bump Procedure

This procedure ensures that during any version increment (Major, Minor, or Patch), all sources of truth across the repository remain 100% consistent.

---

## 📋 Checklist of Files to Update

When bumping a version (e.g. from `0.1.0` to `0.2.0`), **YOU MUST** update the following components together:

1. **Project Version Manifests**:
   - `package.json` (if applicable to the target project): `"version": "X.Y.Z"`.
   - `package-lock.json` (if applicable).
2. **`CHANGELOG.md`**:
   - Create a new entry under the header following the *Keep a Changelog* standard:
     ```markdown
     ## [X.Y.Z] - YYYY-MM-DD

     ### Added | Changed | Deprecated | Removed | Fixed | Security
     - Concise description of notable changes with links to commits or PRs.
     ```
   - Maintain reverse chronological order.
3. **Release Plan (Dry-Plan)**:
   - Draft the pre-flight plan using [`templates/release-plan-template.md`](../../templates/release-plan-template.md).
4. **Git Tag & Release**:
   - Create an annotated tag: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`.
   - Publish a GitHub Release referencing the corresponding `CHANGELOG.md` section.

---

## 🧭 SemVer Guidelines (Semantic Versioning)

- **MAJOR (`X.0.0`)**: Incompatible breaking changes (breaking changes in agent communication protocols, skill signatures, or data contracts).
- **MINOR (`0.Y.0` or `1.Y.0`)**: Backward-compatible new features, skills, templates, or agent profiles.
- **PATCH (`0.1.Z` or `1.0.Z`)**: Backward-compatible bug fixes, documentation adjustments, or minor optimizations.

---

## 🛠️ Step-by-Step Execution Workflow

1. **Verify Quality Gates**:
   - 100% test pass rate, clean linter execution, and zero security warnings.
2. **Update Version Numbers** in metadata files and `CHANGELOG.md`.
3. **Verify Consistency**:
   - Ensure no stale references to previous versions remain.
4. **Present Dry-Plan to Human (HITL)** and request explicit confirmation.
5. **Commit and Tag**:
   ```bash
   git commit -m "chore(release): bump version to vX.Y.Z"
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   ```
