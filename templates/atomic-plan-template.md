# Plan de Tareas Atómicas: [Nombre de la Funcionalidad]

- **Especificación Asociada**: [`sdd-spec.md`](./sdd-spec.md)
- **Estado**: En Progreso | Completado

---

## 🎯 Directrices de Ejecución
1. Cada tarea debe completarse antes de pasar a la siguiente.
2. Cada tarea incluye obligatoriamente su **comando de validación real (Ground Truth)**.
3. El código no se considera finalizado hasta que el comando de validación se ejecute en verde.

---

## 📋 Lista de Tareas Atómicas

### Tarea 1: [Descripción de la Tarea]
- **Objetivo**: Crear o modificar un módulo acotado.
- **Ficheros Afectados**: `src/path/to/file.ts`, `tests/path/to/file.test.ts`.
- **Fase TDD**:
  - [ ] Escribir prueba que falla (Fase Roja).
  - [ ] Implementar código mínimo (Fase Verde).
  - [ ] Refactorización si aplica.
- **Comando de Verificación**:
  ```bash
  npm.cmd test -- tests/path/to/file.test.ts
  ```

### Tarea 2: [Descripción de la Tarea]
- **Objetivo**: Integración con componentes adyacentes o API.
- **Ficheros Afectados**: `src/path/to/module.ts`.
- **Comando de Verificación**:
  ```bash
  npm.cmd run build
  ```
