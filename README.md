# 🌐 Novyxx — Agencia de Automatización con Inteligencia Artificial

[![Netlify Status](https://api.netlify.com/api/v1/badges/00000000-0000-0000-0000-000000000000/deploy-status)](https://app.netlify.com/sites/tu-sitio/deploys)  
*Sitio web oficial de Novyxx — Transformando empresas mediante inteligencia artificial ética, eficiente y accesible.*

---

## 🎯 Propósito

Este repositorio contiene el **sitio web institucional estático** de **Novyxx**, una agencia y escuela especializada en:

- Automatización de procesos empresariales con IA
- Consultoría en implementación responsable de inteligencia artificial
- Formación técnica y estratégica en herramientas de IA

El sitio está diseñado para comunicar claramente el valor, la visión y los servicios de la marca, cumpliendo con normativas europeas de privacidad y accesibilidad.

---

## 🛠️ Características Técnicas

### ✅ Rendimiento y Experiencia de Usuario
- **Single-page application (SPA) estática** sin dependencias de frameworks
- **Animaciones fluidas** con [GSAP](https://greensock.com/gsap/) y ScrollTrigger
- **Efectos 3D en tiempo real** con [Three.js](https://threejs.org/)
- **Diseño responsive** optimizado para móvil, tablet y escritorio
- **Carga diferida implícita** (sin JS pesado innecesario)
- **Sin build required** — listo para desplegar tal cual

### 📱 Accesibilidad y UX
- Navegación por teclado (soporte `ESC` para cerrar modales)
- Etiquetas ARIA en modales legales
- Colores con suficiente contraste (WCAG compliant)
- Texto legible con tipografía sistemática (`Inter`)

### 🛡️ Cumplimiento Legal (RGPD/LOPDGDD)
- Política de cookies con gestión activa de consentimiento
- Modales para:  
  - Aviso Legal  
  - Política de Privacidad  
  - Términos y Condiciones  
  - Uso Ético de la IA  
- Almacenamiento de preferencias en `localStorage`
- Sin cookies de terceros sin consentimiento explícito

### 🌍 SEO y Buenas Prácticas
- Metadatos SEO completos (`description`, `keywords`, `og:title` implícito)
- Estructura semántica HTML5 (`<header>`, `<section>`, `<footer>`)
- Títulos jerárquicos correctos (`h1` → `h2` → `h3`)
- Enlaces internos anclados con scroll suave

---

## 📦 Tecnologías Utilizadas

| Capa | Tecnología |
|------|-----------|
| **Markup** | HTML5 |
| **Estilos** | CSS3 puro (sin preprocesadores), variables CSS, `@import` para fuentes |
| **Interactividad** | JavaScript Vanilla (ES6+) |
| **Animaciones** | GSAP 3 + ScrollTrigger + ScrollToPlugin |
| **3D / WebGL** | Three.js r128 |
| **Fuentes** | Google Fonts (`Inter`) |
| **Íconos** | Font Awesome 6.5 |
| **Hosting** | Netlify (optimizado para sitios estáticos) |

> ⚠️ **Sin frameworks pesados** (React, Vue, etc.) → carga instantánea y rendimiento óptimo.

---

## ▶️ Instrucciones de Desarrollo

### Requisitos previos
- Editor de código (recomendado: [VS Code](https://code.visualstudio.com/))
- Extensión **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**

### Ejecución local
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/novyxx-web.git
   cd novyxx-web
