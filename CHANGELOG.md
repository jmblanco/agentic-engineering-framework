# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/), y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [0.1.0] - 2026-10-17

### Added
- **Núcleo de Gobernanza**: Reglas universales en [`rules/AGENTS.md`](./rules/AGENTS.md) bajo la síntesis Karpathy × Pocock.
- **Ciclo de Vida Determinista (6 Fases)**: Documentación completa en [`docs/METHODOLOGY.md`](./docs/METHODOLOGY.md) (SDD, Plan Atómico, TDD, QA, Seguridad y Release).
- **Catálogo de Subagentes**: Especificación formal de roles y matriz de permisos PoLP en [`docs/ROLES.md`](./docs/ROLES.md).
- **Vocabulario Ubicuo**: Glosario formal de ingeniería agéntica en [`docs/GLOSSARY.md`](./docs/GLOSSARY.md).
- **Suite de Skills Operativas**:
  - `align-and-plan`: Alineación técnica y grilling.
  - `diagnose-bug`: Diagnóstico estricto de errores con bucle de fallo (Repro-First).
  - `code-review`: Revisión en dos ejes (especificación y code smells).
  - `tdd-verify`: Ciclo Rojo-Verde-Refactor con validación empírica.
  - `version-bump`: Procedimiento de incremento SemVer con Dry-Plan.
- **Colección de Plantillas**:
  - `templates/adr-template.md`: Registro de decisiones arquitectónicas.
  - `templates/sdd-spec-template.md`: Plantilla de especificación SDD.
  - `templates/atomic-plan-template.md`: Plan de tareas atómicas con comandos de prueba.
  - `templates/release-plan-template.md`: Plan de release con estrategia de rollback.
