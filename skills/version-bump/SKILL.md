---
name: version-bump
description: Procedimiento disciplinado para incrementar versiones del proyecto (SemVer) sincronizando todos los ficheros de metadata, changelog y tags.
---

# Procedimiento de Incremento de Versión (Version Bump)

Este procedimiento garantiza que ante cualquier cambio de versión (mayor, menor o parche), todos los puntos de verdad del repositorio se mantengan 100% consistentes.

---

## 📋 Checklist de Ficheros a Actualizar

Cuando se incremente una versión (ej. de `0.1.0` a `0.2.0`), **ES OBLIGATORIO** actualizar en bloque los siguientes elementos:

1. **Ficheros de Versión del Proyecto**:
   - `package.json` (si aplica al repositorio destino): campo `"version": "X.Y.Z"`.
   - `package-lock.json` (si aplica).
2. **`CHANGELOG.md`**:
   - Crear una nueva sección bajo la cabecera siguiendo el estándar *Keep a Changelog*:
     ```markdown
     ## [X.Y.Z] - AAAA-MM-DD

     ### Added | Changed | Deprecated | Removed | Fixed | Security
     - Descripción concisa de cambios notables con enlaces a commits o PRs.
     ```
   - Mantener orden cronológico inverso.
3. **Plan de Release (Dry-Plan)**:
   - Redactar el documento preliminar usando [`templates/release-plan-template.md`](../../templates/release-plan-template.md).
4. **Git Tag & Release**:
   - Crear tag anotado: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`.
   - Publicar release asociada con las notas del `CHANGELOG.md`.

---

## 🧭 Criterio SemVer (Semantic Versioning)

- **MAJOR (`X.0.0`)**: Cambios incompatibles hacia atrás (breaking changes en protocolos de agentes, interfaces de skills o contratos de datos).
- **MINOR (`0.Y.0` o `1.Y.0`)**: Nuevas habilidades, plantillas o agentes retrocompatibles.
- **PATCH (`0.1.Z` o `1.0.Z`)**: Correcciones de documentación, ajustes cosméticos o mejoras de rendimiento retrocompatibles.

---

## 🛠️ Flujo de Ejecución Paso a Paso

1. **Verificar estado de Quality Gates previo**:
   - Tests en verde, linter superado y auditoría de seguridad sin alertas.
2. **Actualizar números de versión** en metadatos y `CHANGELOG.md`.
3. **Verificar consistencia**:
   - Comprobar que no queden referencias desactualizadas a versiones anteriores.
4. **Presentar Dry-Plan al Humano (HITL)** y solicitar aprobación.
5. **Crear commit y Tag**:
   ```bash
   git commit -m "chore(release): bump version to vX.Y.Z"
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   ```
