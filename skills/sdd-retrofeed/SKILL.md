---
name: sdd-retrofeed
description: Analyzes post-launch telemetry and user feedback against the specification baseline to generate traceable gap proposals without mutating source code.
---

# SDD Retrofeed (Continuous Feedback Loop)

Produces a post-launch gap and proposal report comparing runtime reality against specification baselines. Operates strictly in read-only mode on codebase and source specifications.

---

## 🚦 Output Gates & Rules
- Operates strictly read-only on repository source code.
- Telemetry must record `value`, `baseline`, `period`, `source`, and `quality` (`high|med|low`).
- Never invent metrics; missing data points must be tagged `NO DATA`.
- Gaps and Proposals must be strictly traceable: `GAP-NN` -> `PROP-NN`.

---

## 🛠️ Step-by-Step Workflow

1. **Extract Baseline**: Retrieve acceptance criteria and target metrics from the original feature specification (`specs/XXXX-spec.md`).
2. **Normalize Telemetry**: Ingest real metrics, error rates, latency percentiles, and qualitative user feedback.
3. **Trigger Evaluation**:
   - *Trigger 1*: Target metric missed.
   - *Trigger 2*: Unexpected edge-case behavior in production.
   - *Trigger 3*: New user segment or workload volume.
   - *Trigger 4*: Usability friction or qualitative findings.
4. **Formulate Proposals**: Generate traceable proposals (`PROP-NN`) addressing specific gaps (`GAP-NN`).
5. **Output Report**: Save to `docs/retrofeed/RR-{NN}.md`.
