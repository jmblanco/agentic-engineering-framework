# Atomic Task Plan: [Feature Name]

- **Associated Specification**: [`sdd-spec.md`](./sdd-spec.md)
- **Status**: In Progress | Completed

---

## 🎯 Execution Guidelines
1. Complete each atomic task sequentially before advancing.
2. Every task must declare its **empirical verification command (Ground Truth)**.
3. Code is never considered complete until the verification command passes in green.

---

## 📋 Atomic Task Checklist

### Task 1: [Task Description]
- **Scope**: Create or modify an isolated module.
- **Impacted Files**: `src/path/to/file.ts`, `tests/path/to/file.test.ts`.
- **TDD Workflow**:
  - [ ] Write failing test (Red Phase).
  - [ ] Write minimal code (Green Phase).
  - [ ] Refactor while staying green.
- **Verification Command**:
  ```bash
  npm.cmd test -- tests/path/to/file.test.ts
  ```

### Task 2: [Task Description]
- **Scope**: Integration with adjacent modules or API.
- **Impacted Files**: `src/path/to/module.ts`.
- **Verification Command**:
  ```bash
  npm.cmd run build
  ```
