# 🛠️ Inventario Tecnológico y Documentación de Desarrollo

Este documento detalla cada tecnología, lenguaje y herramienta utilizada en la creación de la Landing Page de **SquadGen**, explicando su propósito específico dentro del proyecto.

---

## 🏗️ Núcleo del Proyecto (Arquitectura)

### 1. **React 19 (JavaScript / JSX)**
- **Para qué:** Es el motor principal de la aplicación. Se utilizó para crear una interfaz de usuario componentizada y reactiva.
- **Uso clave:** Gestión de estados (carga de imágenes, progreso) y manejo de eventos de scroll mediante *Hooks* (`useEffect`, `useRef`, `useState`).

### 2. **Vite 7**
- **Para qué:** Funciona como el entorno de desarrollo y empaquetador (bundler).
- **Uso clave:** Permite una recarga ultra-rápida en caliente (HMR) y una compilación de producción optimizada para que la web cargue en milisegundos.

### 3. **HTML5 Semántico**
- **Para qué:** Estructura base del sitio.
- **Uso clave:** Definición de la jerarquía de la página (`main`, `section`, `nav`, `footer`) y configuración de metadatos para SEO y PWA en el `index.html`.

---

## 🎨 Estética y Diseño (Styling)

### 4. **Tailwind CSS v4**
- **Para qué:** Framework de CSS basado en utilidades para el diseño visual.
- **Uso clave:** Implementación del **Glassmorphism** (fondos con brillo y desenfoque), diseño **Responsive** (adaptación a móviles) y manejo de colores (`Slate-950` y `Blue-600`).

### 5. **PostCSS**
- **Para qué:** Procesador que transforma el CSS con JavaScript.
- **Uso clave:** Automatizar la compatibilidad entre navegadores (Autoprefixer) y permitir que Tailwind v4 funcione correctamente.

### 6. **Lucide React (Iconografía)**
- **Para qué:** Biblioteca de iconos vectoriales ligeros.
- **Uso clave:** Proporcionar iconos modernos y consistentes para las características (cerebro, balanza, escudo).

---

## 🎬 Animación y Multimedia

### 7. **HTML5 Canvas (JavaScript API)**
- **Para qué:** Dibujo de gráficos 2D de alto rendimiento.
- **Uso clave:** Esta es la tecnología detrás de la **animación 3D del Hero**. En lugar de usar videos pesados, el Canvas dibuja 240 imágenes de forma secuencial según la posición del scroll.

### 8. **Secuencia de Imágenes (JPEG)**
- **Para qué:** Actúan como los fotogramas de la animación.
- **Uso clave:** 240 archivos en `/public/Frames` que representan la rotación 3D de la aplicación.

---

## 📱 Capacidades Avanzadas (PWA)

### 9. **JSON (Web Manifest)**
- **Para qué:** Archivo de configuración `manifest.json`.
- **Uso clave:** Define cómo se comporta la web cuando se instala en un móvil (nombre, iconos, colores de barra de estado).

### 10. **Service Workers (JavaScript)**
- **Para qué:** Scripts que corren en un hilo separado del navegador.
- **Uso clave:** Implementar la **funcionalidad offline** y la estrategia de cacheo, permitiendo que la web abra incluso sin internet.

---

## 📦 Inventario de Herramientas de Desarrollo

- **NPM (Node Package Manager)**: Gestión de todas las bibliotecas y librerías.
- **Lucide Icons**: Diccionario de iconos vectoriales.
- **Google Fonts (Inter)**: Tipografía sans-serif moderna para un look deportivo/tecnológico.

---
*Documentación generada para SquadGen - Powered by JALC*
