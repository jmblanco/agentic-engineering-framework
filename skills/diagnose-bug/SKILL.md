---
name: diagnose-bug
description: Procedimiento disciplinado para diagnosticar y resolver errores o comportamientos inesperados. Usar cuando el usuario reporte un bug, fallo en consola o comportamiento erróneo.
---

# Diagnosing Bugs (Ground-Truth & Repro Loop)

Inspirado en la regla de oro de **Andrej Karpathy** (verificación empírica contra la realidad) y el skill `diagnosing-bugs` de **Matt Pocock**. No intentes adivinar la causa de un fallo mirando fijamente el código.

---

## Regla Inquebrantable
> **No modifiques código de producción sin antes tener una prueba, script o comando que reproduzca el fallo (Fase Roja).**

---

## Fases del Diagnóstico

### Fase 1: Construir el Bucle de Retroalimentación (*Tight Loop*)
Construye la forma más rápida y determinista de disparar el fallo:
1. **Prueba unitaria / integración fallida** (la mejor opción): un test mínimo en Vitest/Jest que falle exactamente por el síntoma reportado.
2. **Script de reproducción mínimo**: Un archivo temporal o comando de terminal de 10 líneas que ejecute la función problemática.
3. **Comando de compilación o inspección**: Verificación de tipos con `npx.cmd tsc --noEmit` o lint.

**Criterio de éxito de la Fase 1**: Puedes invocar **un solo comando** que actualmente falla y muestra el error de forma clara.

### Fase 2: Aislar la Mutación y Causa Raíz
* Rastrea el flujo de datos desde la entrada hasta la línea donde ocurre el fallo.
* Agrega logs temporales o aserciones si es necesario para verificar hipótesis.
* No inventes explicaciones complejas: busca la causa más simple e inmediata (tipos incorrectos, mutaciones de estado, condiciones de carrera, rutas erróneas).

### Fase 3: Parche Quirúrgico Mínimo
* Aplica la modificación más pequeña y limpia posible que solucione la causa raíz.
* No realices refactorizaciones no solicitadas en el mismo cambio.

### Fase 4: Verificación Verde (*Ground Truth*)
1. Ejecuta nuevamente el bucle de la Fase 1: debe pasar en verde.
2. Ejecuta la suite de pruebas completa o el build del proyecto (`npm.cmd run build`) para garantizar que no hay regresiones.
3. Elimina cualquier log o archivo de depuración temporal.
