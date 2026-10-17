---
name: align-and-plan
description: Procedimiento de alineación previa y especificación técnica. Usar cuando el usuario pida diseñar o implementar una nueva funcionalidad, página o refactorización significativa, antes de comenzar a escribir código.
---

# Align and Plan (Grilling & Spec)

Inspirado en el skill `/grill-me` y `/grill-with-docs` de Matt Pocock. La causa principal de errores en el desarrollo asistido por IA es la desalineación de expectativas. Este procedimiento asegura que tanto el usuario como el agente compartan exactamente la misma visión antes de tocar código.

---

## Proceso

### 1. Detectar Ambigüedades
Examina la solicitud del usuario e identifica:
* **Decisiones de diseño visual o UX**: ¿Cómo debe comportarse en móvil? ¿Qué tipografía o paleta? ¿Hay estados vacíos o de carga?
* **Modelo de datos**: ¿Qué campos y tipos se esperan? ¿Dónde se almacenan los datos?
* **Límites y dependencias**: ¿Se debe añadir un paquete nuevo o usar lo que ya existe? ¿Cómo impacta al resto de la aplicación?

### 2. Formular Preguntas Precisas (Grilling)
* Haz preguntas concretas, directas y con opciones recomendadas.
* Utiliza la herramienta de preguntas interactivas (`ask_question`) de Antigravity cuando sea posible para no abrumar al usuario con texto disperso.
* Proporciona siempre una recomendación por defecto con el prefijo `(Recommended)`.

### 3. Crear o Actualizar el Registro de Decisión (ADR)
Si la decisión arquitectónica o de diseño es relevante y persistente:
* Crea un archivo en `docs/adr/XXXX-<nombre-decision>.md`.
* Documenta: Contexto, Decisión tomada, Consecuencias y Alternativas descartadas.

### 4. Definir un Plan de Tareas Mínimo y Verificable
Elabora una lista de pasos pequeños e incrementales:
* Cada paso debe ser **verificable de forma independiente**.
* Señala el comando de verificación asociado a cada paso (ejemplo: `npm.cmd run build` o pruebas).
