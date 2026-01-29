# 📖 Manual: Efecto de Animación 3D por Scroll en Hero Section

## ¿Qué es este efecto?

Es una técnica donde una **secuencia de imágenes** (como los fotogramas de un video) se muestra una a una según el usuario hace scroll. Esto crea la ilusión de que un objeto 3D se mueve o rota mientras navegas la página.

---

## 🎬 Paso 1: Preparar los Fotogramas

### Qué necesitas:
- Una secuencia de imágenes numeradas (ej: `frame-001.jpg`, `frame-002.jpg`, ... `frame-240.jpg`)
- Pueden venir de:
  - Una animación 3D renderizada
  - Un video convertido a imágenes
  - Herramientas como **ezgif.com** para extraer frames de un GIF/video

### Ubicación:
```
public/
  └── Frames/
      ├── ezgif-frame-001.jpg
      ├── ezgif-frame-002.jpg
      ├── ezgif-frame-003.jpg
      └── ... (240 imágenes)
```

---

## 🖼️ Paso 2: Crear el Componente Canvas (HeroSequence.jsx)

### Estructura básica:
```jsx
import React, { useEffect, useRef, useState } from 'react';

const HeroSequence = ({ frameCount = 240 }) => {
  const canvasRef = useRef(null);        // Referencia al canvas
  const imagesRef = useRef([]);          // Almacena las imágenes cargadas
  const [isLoaded, setIsLoaded] = useState(false);  // Estado de carga
```

### Por qué usamos Canvas:
- Es **mucho más rápido** que cambiar el `src` de una etiqueta `<img>`
- Permite dibujar directamente en memoria
- No causa "parpadeo" entre fotogramas

---

## 📥 Paso 3: Precargar TODAS las Imágenes

### El código:
```jsx
useEffect(() => {
  const loadImage = (index) => {
    return new Promise((resolve) => {
      const img = new Image();
      const frameNumber = (index + 1).toString().padStart(3, '0');
      img.src = `/Frames/ezgif-frame-${frameNumber}.jpg`;
      img.onload = () => resolve(img);
    });
  };

  Promise.all(
    Array.from({ length: frameCount }, (_, i) => loadImage(i))
  ).then((loadedImages) => {
    imagesRef.current = loadedImages;
    setIsLoaded(true);
  });
}, []);
```

### ¿Por qué precargar todo?
- Si no precargamos, al hacer scroll rápido las imágenes no estarían listas
- Usamos `Promise.all` para esperar que **todas** se carguen antes de mostrar

---

## 🎨 Paso 4: Función para Dibujar un Frame

### El código:
```jsx
const drawFrame = (frameIndex) => {
  const canvas = canvasRef.current;
  const img = imagesRef.current[frameIndex];
  const ctx = canvas.getContext('2d');
  
  // Ajustar tamaño del canvas a la ventana
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Limpiar el canvas anterior
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Calcular escala para cubrir toda la pantalla
  const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  const newWidth = img.width * scale;
  const newHeight = img.height * scale;
  const x = (canvas.width - newWidth) / 2;
  const y = (canvas.height - newHeight) / 2;
  
  // Dibujar la imagen centrada
  ctx.drawImage(img, x, y, newWidth, newHeight);
};
```

---

## 📜 Paso 5: Detectar el Scroll y Cambiar Frame

### El código clave:
```jsx
useEffect(() => {
  if (!isLoaded) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;                    // Posición actual del scroll
    const windowHeight = window.innerHeight;           // Altura de la ventana
    const animationScrollLength = windowHeight * 1.2;  // Distancia de scroll para completar animación
    
    // Calcular progreso (0 a 1)
    const progress = Math.min(scrollY / animationScrollLength, 1);
    
    // Calcular qué frame mostrar
    const frameIndex = Math.floor(progress * (frameCount - 1));
    
    // Dibujar el frame correspondiente
    drawFrame(frameIndex);
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Dibujar frame inicial
  
  return () => window.removeEventListener('scroll', handleScroll);
}, [isLoaded]);
```

### ¿Cómo funciona la matemática?

| Scroll Position | Progress | Frame Index (240 frames) |
|-----------------|----------|--------------------------|
| 0px (arriba)    | 0.0      | Frame 0                  |
| 50% del scroll  | 0.5      | Frame 120                |
| 100% del scroll | 1.0      | Frame 239                |

---

## 📐 Paso 6: Configurar el Layout en App.jsx

### Estructura HTML:
```jsx
<div className="relative">
  {/* Componente de animación - fijo en pantalla */}
  <HeroSequence frameCount={240} />
  
  {/* Contenido de texto - sobre la animación */}
  <div className="sticky top-0 h-screen flex items-center justify-center -mt-[100vh]">
    <h1>Equipos Perfectos.</h1>
  </div>
  
  {/* Espacio para hacer scroll */}
  <div className="h-[150vh]" />
</div>
```

### Explicación del layout:

| Elemento | Propósito |
|----------|-----------|
| `HeroSequence` (sticky) | Se queda fijo mientras haces scroll |
| Contenido (sticky, -mt-[100vh]) | Se superpone centrado sobre la animación |
| Spacer `h-[150vh]` | Crea espacio para que el scroll "funcione" |

---

## ⚙️ Paso 7: Ajustar la Velocidad

### En `HeroSequence.jsx`:
```jsx
const animationScrollLength = windowHeight * 1.2;
```

| Valor | Efecto |
|-------|--------|
| `* 0.5` | Muy rápido (animación completa en medio scroll) |
| `* 1.2` | Rápido y natural ✅ |
| `* 3.0` | Lento (necesitas mucho scroll) |

### En `App.jsx`:
```jsx
<div className="h-[150vh]" />  // Espacio de scroll disponible
```

---

## 🎯 Resumen Visual del Flujo

```
┌─────────────────────────────────────┐
│  Usuario hace SCROLL ↓              │
├─────────────────────────────────────┤
│           ↓                         │
│  window.scrollY = 500px             │
│           ↓                         │
│  progress = 500 / 1200 = 0.41       │
│           ↓                         │
│  frameIndex = 0.41 * 239 = 98       │
│           ↓                         │
│  drawFrame(98) → Dibuja frame 98    │
│           ↓                         │
│  🖼️ Canvas muestra la imagen 98    │
└─────────────────────────────────────┘
```

---

## 📁 Archivos Involucrados

| Archivo | Función |
|---------|---------|
| `public/Frames/*.jpg` | 240 imágenes de la secuencia |
| `src/components/HeroSequence.jsx` | Lógica de carga, scroll y dibujo |
| `src/App.jsx` | Layout y estructura de la página |

---

## 🛠️ Cómo Adaptar a tu Proyecto

1. **Cambia la cantidad de frames**: Modifica `frameCount={240}` en App.jsx
2. **Cambia los nombres de archivo**: Ajusta la función `getFramePath()` en HeroSequence.jsx
3. **Ajusta la velocidad**: Modifica el multiplicador `windowHeight * 1.2`
4. **Cambia la opacidad**: Modifica `opacity: isLoaded ? 0.55 : 0` en el canvas

---

## 📚 Recursos Adicionales

- **Extraer frames de video**: [ezgif.com/video-to-jpg](https://ezgif.com/video-to-jpg)
- **Crear animaciones 3D**: Blender, After Effects, Cinema 4D
- **Optimizar imágenes**: [squoosh.app](https://squoosh.app)

---

*Manual creado para el proyecto SquadGen Landing Page - Powered by JALC*
