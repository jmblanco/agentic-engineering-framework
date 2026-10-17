---
name: tdd-verify
description: Flujo de desarrollo guiado por pruebas y verificación empírica. Usar para implementar funciones lógicas, utilidades, hooks de estado o componentes críticos con alta confiabilidad.
---

# TDD & Ground-Truth Verification

Combina la metodología TDD con la insistencia de **Andrej Karpathy** en no confiar en suposiciones, sino en la salida real del compilador y el entorno de ejecución.

---

## Ciclo de Tres Pasos (Rojo -> Verde -> Refactor)

### 1. Rojo (Escribir la prueba que falla)
* Define el comportamiento esperado en un archivo `.test.ts` o `.spec.tsx`.
* Escribe una prueba pequeña y legible que describa el caso de uso.
* Ejecuta la prueba con el corredor correspondiente (ejemplo: `npx.cmd vitest run <ruta-test>`).
* **Verifica que falle por la razón correcta** (y no por un error de sintaxis en el archivo de prueba).

### 2. Verde (Implementación mínima)
* Escribe la cantidad mínima de código necesaria en el archivo de implementación para que la prueba pase.
* No intentes anticipar casos futuros ni agregar abstracciones en este paso.
* Vuelve a ejecutar la prueba: debe pasar en verde.

### 3. Refactor (Limpieza sin alterar el comportamiento)
* Con la seguridad de la prueba en verde:
  * Elimina duplicidades.
  * Mejora los nombres de variables y parámetros.
  * Simplifica bifurcaciones y condicionales.
* Reejecuta la prueba para confirmar que sigue en verde.
