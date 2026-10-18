---
name: security-audit
description: Comprehensive security audit procedure covering SAST, SCA dependency scanning, least privilege (PoLP) container/IaC hardening, secret leaks, and OWASP Top 10 verification.
---

# Security Audit Procedure (SAST & PoLP)

This procedure provides a deterministic security audit for the **Security Auditor** role (AEF Phase 5), enforcing static analysis, dependency health, and the **Principle of Least Privilege (PoLP)** before release sign-off.

---

## 🛡️ The 4 Security Pillars

### 1. Software Composition Analysis (SCA & Supply Chain)
Scan project manifests and dependencies for known Common Vulnerabilities and Exposures (CVEs):
* **Execution Commands**:
  - Node.js: `npm audit --json` or `pnpm audit`
  - Python: `pip-audit` or `safety check`
  - Go: `govulncheck ./...`
  - Rust: `cargo audit`
* **Quality Gate Criteria**:
  - **Zero High or Critical vulnerabilities**.
  - No unpinned floating dependencies or orphaned untrusted packages.

### 2. Static Application Security Testing (SAST & Clean Code)
Enforce rigorous static analysis and SonarQube/SonarCloud security hotspot rules:
* **Strict Typing & Boundaries**: Prohibit `any`, `as unknown as T`, or type-checker suppressions (`@ts-ignore`) in production paths.
* **Cognitive Complexity**: Reject functions with cognitive/cyclomatic complexity > 15.
* **Framework Pitfalls**:
  - Prohibit unsafe state mutations in React `useEffect` or lifecycle hooks.
  - Ban `dangerouslySetInnerHTML` unless explicitly sanitized via DOMPurify.
  - Ensure API boundaries validate runtime schemas using Zod, ArkType, or Pydantic.

### 3. Container & Infrastructure Security (PoLP & Hardening)
Audit Dockerfiles, Compose specs, Helm charts, and cloud manifests:
* **Non-Root Execution**: Container runtime images **MUST NOT** run as `root` (enforce `USER non-root` or UID `10001+`).
* **Multi-Stage Builds**: Build tooling and compilers must be decoupled from the minimal runtime image (e.g., Alpine or Distroless).
* **HTTP Security Headers (OWASP)**:
  - `Content-Security-Policy (CSP)`
  - `X-Frame-Options: SAMEORIGIN` or `frame-ancestors 'none'`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
* **Kubernetes Security Context**:
  - `readOnlyRootFilesystem: true`
  - `allowPrivilegeEscalation: false`
  - `runAsNonRoot: true`
  - `capabilities.drop: ["ALL"]`

### 4. Secret Reconnaissance & OWASP Top 10
Actively search for leaked credentials and injection surfaces:
* **Secret Detection**: Scan diffs and files for high-entropy strings, RSA/PEM private keys, JWT secrets, and hardcoded API tokens.
* **Public Environment Leaks**: Confirm no private API secrets are exposed via client-side bundles (e.g., `NEXT_PUBLIC_*` or `VITE_*`).
* **Injection & SSRF**: Verify parameterized database queries and validate external URL parameters against strict allowlists.

---

## 🛠️ Step-by-Step Execution Workflow

1. **Reconnaissance**: Identify technology stack and detect manifest files (`package.json`, `go.mod`, `Dockerfile`, etc.).
2. **Run SCA Scan**: Execute the native dependency vulnerability scanner.
3. **Execute SAST & Linter**: Run static analysis, type checks (`tsc --noEmit`), and linter rules.
4. **Audit Infrastructure & Secrets**: Inspect container definitions, permissions, and scan repository diffs for sensitive values.
5. **Issue Security Audit Report**: Categorize all findings and provide an explicit gate decision.

---

## 📋 Security Audit Report Template

```markdown
# Security & SAST Audit Report

- **Date**: YYYY-MM-DD
- **Auditor**: Security Auditor
- **Target Commit/Branch**: <hash_or_branch>
- **Final Verdict**: PASS | FAIL

### 1. Summary of Findings
| Severity | Category | Description | File / Location | Status |
| :--- | :--- | :--- | :--- | :--- |
| 🔴 Blocker | Secrets / CVE | [Critical issue description] | `path/to/file:L10` | Must-Fix |
| 🟡 Major | PoLP / Config | [Security hotspot / CSP missing] | `Dockerfile:L15` | Action Required |
| 🟢 Minor | Hardening | [Optional defense-in-depth improvement] | `server.ts:L42` | Advisory |

### 2. SCA Dependency Audit Output
- Total dependencies scanned: X
- Vulnerabilities detected: High (0), Critical (0), Medium (Y), Low (Z)

### 3. Container & PoLP Verification
- [ ] Runtime runs as non-root user.
- [ ] No secrets found in code or build args.
- [ ] Base image uses pinned minimal tag.

### 4. Gate Sign-Off
- [ ] Cleared for Phase 6 (Release & Deployment).
```
