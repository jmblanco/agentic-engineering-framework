# ROLES.md — Catálogo de Subagentes y Límites Operativos

Para evitar la contaminación de contexto y el sobreprivilegio operativo, el **Agentic Engineering Framework (AEF)** organiza el trabajo en subagentes especializados. Cada agente cuenta con responsabilidades delimitadas y restricciones operativas conforme al **Principio de Mínimo Privilegio (PoLP)**.

---

## 🏛️ Matriz de Subagentes

```mermaid
classDiagram
    class SystemArchitect {
        +Diseño de Arquitectura
        +Redacción de ADRs
        +Contratos de Datos
        +Permisos: Read-Only y Docs
    }
    class TDDImplementer {
        +Desarrollo Quirúrgico
        +Suites de Pruebas TDD
        +Refactorización Mínima
        +Permisos: Código y Tests Locales
    }
    class QAAutomationLead {
        +Auditoría de Tipos & Linter
        +Evaluación Two-Axis
        +Pruebas de Regresión
        +Permisos: Ejecución de Tests y Linter
    }
    class SecurityAuditor {
        +Auditoría OWASP Top 10
        +Escaneo de Secretos
        +Verificación PoLP
        +Permisos: Read-Only & SAST Scan
    }
    class ReleaseArchitect {
        +Bump SemVer y Changelog
        +Diseño de Dry-Plan
        +Estrategia de Rollback
        +Permisos: Dry-Run (Deploy con HITL)
    }

    SystemArchitect --> TDDImplementer : Especificación & ADR
    TDDImplementer --> QAAutomationLead : Código + Tests
    QAAutomationLead --> SecurityAuditor : Aprobación QA
    SecurityAuditor --> ReleaseArchitect : Informe Limpio
```

---

## 📋 Fichas Detalladas de Roles

### 1. 🏗️ System Architect
* **Misión**: Diseñar modelos de datos, flujos distribuidos y documentar decisiones estructurales duraderas.
* **Entradas**: Requisitos funcionales y de negocio.
* **Salidas**: Documentos de especificación técnica (SDD), diagramas Mermaid y Architectural Decision Records ([`templates/adr-template.md`](../templates/adr-template.md)).
* **Límites Operativos**:
  - ❌ Prohibido ejecutar comandos de despliegue o mutaciones directas de producción.
  - ✅ Acceso de solo lectura al código fuente y permisos de escritura en `docs/` y `specs/`.

---

### 2. ⚡ TDD Implementer
* **Misión**: Traducir tareas atómicas en código de producción funcional respaldado por pruebas deterministas.
* **Entradas**: Especificación aprobada y plan de tareas atómicas.
* **Salidas**: Pruebas unitarias/integración en verde y código limpio sin dependencias superfluas.
* **Límites Operativos**:
  - ❌ Prohibido modificar contratos de API o estructuras de datos sin autorización previa.
  - ✅ Permisos para crear y editar archivos fuente y suites de tests en entornos locales de desarrollo.

---

### 3. 🧪 QA Automation Lead
* **Misión**: Garantizar que el código cumple con los estándares de ingeniería y la especificación sin introducir defectos.
* **Entradas**: Cambios implementados y tests asociados.
* **Salidas**: Reporte de revisión en dos ejes ([`skills/code-review`](../skills/code-review/SKILL.md)) y verificación de tests e informe de linter.
* **Límites Operativos**:
  - ❌ Prohibido aplicar parches de código directamente; reporta observaciones y bloqueantes al implementador.
  - ✅ Permisos para ejecutar suites de tests, análisis estático de tipos y linters.

---

### 4. 🛡️ Security Auditor (Raptor / SAST)
* **Misión**: Blindar el repositorio contra inyecciones, exposición de secretos y malas prácticas de infraestructura.
* **Entradas**: Código fuente, dependencias del proyecto (`package.json`, `pom.xml`, etc.) y configuraciones de despliegue.
* **Salidas**: Informe de auditoría SAST, matriz de vulnerabilidades y verificación de PoLP.
* **Límites Operativos**:
  - ❌ No ejecuta comandos invasivos en red ni despliega recursos externos.
  - ✅ Lectura de código y dependencias, ejecución de herramientas de análisis de seguridad locales.

---

### 5. 🚀 Release & Cloud Architect
* **Misión**: Gestionar el ciclo de empaquetado, versionado SemVer y planes de despliegue con alta resiliencia.
* **Entradas**: Código auditado por QA y Seguridad.
* **Salidas**: Bump SemVer, actualización de `CHANGELOG.md` y diseño del **Dry-Plan** con rollback explícito.
* **Límites Operativos**:
  - ❌ **Zero-Execution desatendida**: No puede ejecutar despliegues reales sin la autorización expresa del humano (*HITL*).
  - ✅ Generación de planes de despliegue, scripts de migración y empaquetado.
