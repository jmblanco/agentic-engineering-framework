---
name: code-review
description: Revisión de código en dos ejes (Especificación y Estándares de calidad). Usar cuando el usuario pida revisar cambios recientes, un PR, o evaluar la calidad del código antes de darlo por finalizado.
---

# Two-Axis Code Review

Inspirado en el skill `code-review` de Matt Pocock. La revisión evalúa los cambios a lo largo de dos ejes independientes para evitar sesgos y mantener altos estándares de ingeniería.

---

## Eje 1: Fidelidad a la Especificación (*Spec Compliance*)
Pregunta: **¿El código hace exactamente lo que se solicitó, sin omitir requisitos ni añadir bloat innecesario?**

* Verifica cada criterio de aceptación o requerimiento de la tarea.
* Comprueba casos límite (*edge cases*): entradas vacías, errores de red, strings muy largos, estados de carga.
* Confirma que no se añadieron funcionalidades no solicitadas que aumenten la superficie de mantenimiento.

---

## Eje 2: Estándares de Ingeniería y Detección de "Code Smells"
Pregunta: **¿El código cumple las convenciones del proyecto y evita patrones problemáticos?**

Evalúa la lista base de olores de código (Martin Fowler):
1. **Mysterious Name**: Nombres de variables, funciones o componentes crípticos o que no revelan su intención.
2. **Duplicated Code**: Lógica repetida en múltiples lugares que debería ser una función o componente común.
3. **Long Function / Component**: Funciones o componentes de más de 80-100 líneas haciendo demasiadas cosas a la vez.
4. **Speculative Generality**: Código escrito "por si en el futuro lo necesitamos", interfaces vacías o parámetros no utilizados.
5. **Type Safety Holes**: Uso de `any`, aserciones de tipo `as unknown as X`, o supresiones con `@ts-ignore`.
6. **Accessibility & Semantics**: Falta de etiquetas semánticas (`<button>` vs `<div onClick>`), ausencia de `alt` en imágenes, problemas de contraste.

---

## Salida de la Revisión
Estructura el informe en:
1. **Puntos Fuertes**: Aspectos destacados de la implementación.
2. **Bloqueantes (Must-Fix)**: Errores funcionales o de tipos que impiden la entrega.
3. **Sugerencias de Limpieza (Nice-to-Have)**: Mejoras de legibilidad o rendimiento.
