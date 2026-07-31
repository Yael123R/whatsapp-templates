# 📱 Gestor de Plantillas para WhatsApp

Aplicación web moderna, modular y reactiva construida con **JavaScript (ES6+ ESM)** y **Tailwind CSS**.

Permite crear, personalizar, filtrar y ordenar plantillas de mensajes de WhatsApp con sustitución dinámica de variables y almacenamiento local persistente.

[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-emerald?style=for-the-badge&logo=github)](https://yael123r.github.io/whatsapp-templates/)
[![Repo](https://img.shields.io/badge/Repositorio-GitHub-blue?style=for-the-badge&logo=github)](https://github.com/Yael123R/whatsapp-templates)

---

# ⚡ Características Principales

- 📝 **Gestión Completa de Plantillas (CRUD)**
  - Crea, edita y elimina plantillas.
  - Elimina todas las plantillas mediante confirmación de seguridad.

- 🔄 **Sustitución Dinámica de Variables**
  - Reemplaza automáticamente `{nombre}` y `{producto}`.
  - Copia el mensaje generado al portapapeles con un clic.

- 🔍 **Filtrado y Búsqueda Reactiva**
  - Búsqueda instantánea por título, contenido o `#hashtag`.
  - Botón de limpieza rápida (`✕`).

- 🔀 **Ordenamiento Avanzado**
  - Más recientes.
  - Más antiguas.
  - Orden alfabético A-Z utilizando `localeCompare` para respetar tildes y caracteres del español.

- 📊 **Métricas y Estadísticas**
  - Contador total de plantillas.
  - Conteo dinámico por `#hashtag`.

- 🎨 **Experiencia de Usuario (UX)**
  - Diseño limpio y responsivo.
  - Modales interactivos con cierre al hacer clic fuera.
  - Retroalimentación visual al copiar mensajes.

---

# 🏗️ Arquitectura Modular (ES Modules)

La aplicación sigue el patrón de **Separación de Responsabilidades (SoC)** mediante módulos nativos de ES6 (`import` / `export`), logrando un código desacoplado, mantenible y escalable.

```text
whatsapp-templates/
│
├── index.html
│   └── Estructura principal de la aplicación con Tailwind CSS
│
└── js/
    ├── app.js
    │   └── Punto de entrada (Entry Point)
    │
    ├── state.js
    │   └── Estado centralizado y funciones puras de filtrado y ordenamiento
    │
    ├── storage.js
    │   └── Persistencia de datos mediante localStorage
    │
    ├── ui.js
    │   └── Renderizado reactivo, eventos y manipulación del DOM
    │
    └── models/
        └── Template.js
            └── Clase modelo de las plantillas
```

---

# 🧩 Responsabilidades por Módulo

| Módulo                    | Responsabilidad                                                                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **js/app.js**             | Carga inicial del estado y orquesta el arranque de la aplicación.                                                                                         |
| **js/state.js**           | Mantiene el estado reactivo (`plantillas`, `filtro`, `orden`, `editandoId`). Implementa inmutabilidad al ordenar datos sin modificar el arreglo original. |
| **js/storage.js**         | Capa de persistencia. Administra lecturas y escrituras en `localStorage`, además del manejo de métricas.                                                  |
| **js/ui.js**              | Gestiona la interfaz, renderizado reactivo, eventos, modales y sustitución dinámica de variables.                                                         |
| **js/models/Template.js** | Define la clase `Template` para crear instancias uniformes de plantillas.                                                                                 |

---

# 💾 Persistencia de Datos y Resiliencia

El módulo **storage.js** implementa mecanismos para garantizar la tolerancia a fallos.

### 🔄 Sincronización Automática

Cada cambio realizado en la aplicación se guarda automáticamente en `localStorage`:

- Agregar plantillas.
- Editar plantillas.
- Eliminar plantillas.
- Vaciar el listado.
- Cambios de filtro y orden.

### 🛡️ Manejo Seguro de Excepciones

La lectura de datos utiliza `try...catch` para evitar que datos corruptos impidan el funcionamiento de la aplicación.

Si `JSON.parse()` falla:

- Se captura la excepción.
- Se restablece el estado a un valor seguro.
- La aplicación continúa funcionando sin bloquear la interfaz.

---

# 🛠️ Herramientas para Desarrolladores

Puedes exportar todas las plantillas desde la consola del navegador.

```javascript
// Ejecuta en la consola (F12)

exportarPlantillas();
```