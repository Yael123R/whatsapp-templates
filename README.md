# 📱 Gestor de Plantillas para WhatsApp

Aplicación web desarrollada con JavaScript (ES6+) y Tailwind CSS para crear, administrar y personalizar plantillas de mensajes con variables dinámicas, filtrado en tiempo real y almacenamiento local.

---

## 🚀 Características Principales

- **Gestión de Plantillas (CRUD):** Permite crear, editar, eliminar y vaciar plantillas de mensajes.
- **Sustitución Dinámica:** Reemplazo en tiempo real de etiquetas como `{nombre}` y `{producto}`.
- **Filtrado Flexible:** Búsqueda instantánea por título, contenido o `#hashtag`.
- **Persistencia de Datos:** Guardado automático de plantillas, historial de búsquedas y contador de visitas mediante `localStorage`.
- **Registro de Cambios:** Traza la última fecha de modificación de las plantillas editadas.
- **Herramientas para Desarrolladores:** Función de exportación de datos en formato JSON formateado desde la consola (`exportarPlantillas()`).

---

## 💾 Persistencia de Estado y Resiliencia

La aplicación utiliza un módulo de almacenamiento dedicado para mantener el estado entre sesiones:

- **Sincronización:** Cada cambio en el estado central o en los filtros de búsqueda se serializa automáticamente en `localStorage`.
- **Manejo Seguro de Datos (`try/catch`):** La lectura de datos desde el almacenamiento local está protegida dentro de un bloque `try/catch`. En caso de que los datos almacenados estén corruptos o contengan un formato JSON no válido, la aplicación captura la excepción, notifica en consola y reinicia la estructura de datos de forma segura, garantizando que la interfaz siga funcionando sin interrupciones.

---

## 🔗 Enlaces de Interés

- **Repositorio en GitHub:** [https://github.com/Yael123R/whatsapp-templates](https://github.com/Yael123R/whatsapp-templates)
- **Demostración en Vivo (GitHub Pages):** [https://yael123r.github.io/whatsapp-templates/](https://yael123r.github.io/whatsapp-templates/)