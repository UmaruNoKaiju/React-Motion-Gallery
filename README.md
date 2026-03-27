<div align="center">

# ✦ React Animations — Nexus

**Una colección de animaciones UI construidas con React + Framer Motion**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)

</div>

---

## 📌 Descripción

**Nexus** es un proyecto de showcase de animaciones UI/UX desarrollado con React y Framer Motion. Incluye más de **25 animaciones únicas** organizadas en dos categorías principales: pantallas de éxito y pantallas de cierre de sesión, cada una con efectos visuales distintos y creativos.

El objetivo es demostrar el dominio de animaciones declarativas, transiciones de página, gestión de estado y arquitectura de componentes en React.

---

## 🎬 Animaciones incluidas

### 🎉 Success Screens (8 pantallas)
Pantallas de confirmación con animaciones de celebración al completar una acción.

| # | Nombre | Descripción |
|---|--------|-------------|
| 1 | Screen 1–8 | Variaciones de pantallas de éxito con efectos únicos |
| 🚀 | Rocket | Animación de cohete con partículas y cuenta regresiva |

### 🚪 Logout Screens (17 pantallas)
Animaciones de cierre de sesión con efectos visuales creativos.

| # | Nombre | Descripción |
|---|--------|-------------|
| 01 | Monitor CRT | Pantalla que se apaga como TV vieja |
| 02 | Desintegrar | Avatar que explota en partículas |
| 03 | Puerta | Dos paneles que se cierran como puerta |
| 04 | Cuenta regresiva | Anillo que se vacía, cancelable |
| 05 | Tiles | Pantalla que se rompe en mosaicos |
| 06 | Glitch | Pantalla que se corrompe y glitchea |
| 07 | Blob líquido | Ola cyan que absorbe toda la pantalla |
| 08 | Warp espacial | Zoom out al espacio con velocidad warp |
| 09 | Lluvia | Cortina de gotas que borra la pantalla |
| 10 | Papel | Tarjeta que se dobla y desaparece |
| 11 | Persianas | Tiras verticales que caen como persianas |
| 12 | Reloj | Reloj que gira y explota en confetti |
| 13 | Teletransporte | Píxeles que se dispersan al salir |
| 14 | Espiral | Vórtice que se traga la pantalla |
| 15 | Despegue | Tarjeta lanzada al espacio |
| 16 | Hielo | Copo de nieve + cristales que se expanden |
| 17 | Agua | Tarjeta que se hunde con ondas |

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|------------|-----|
| **React 18** | UI y gestión de componentes |
| **Framer Motion 11** | Animaciones declarativas y transiciones |
| **React Router 6** | Navegación SPA con `AnimatePresence` |
| **Vite 5** | Bundler y servidor de desarrollo |
| **CSS Modules** | Estilos por componente |

---

## 🚀 Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/UmaruNoKaiju/react-motion-gallery.git
cd react-motion-gallery

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Vista previa del build
```

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   └── PageWrapper.jsx       # Wrapper con animación de entrada/salida
├── context/
│   └── AuthContext.jsx       # Contexto de autenticación global
├── pages/
│   ├── logout/               # 17 animaciones de logout
│   ├── success/              # 8 pantallas de éxito + Rocket
│   ├── Landing.jsx           # Página principal con blobs animados
│   ├── Login.jsx / Register.jsx
│   ├── Dashboard.jsx
│   ├── LogoutShowcase.jsx    # Grid de selección de logout screens
│   └── SuccessShowcase.jsx   # Grid de selección de success screens
├── App.jsx                   # Rutas con AnimatePresence
└── main.jsx
```

---

## ✨ Características técnicas destacadas

- **Transiciones de página** con `AnimatePresence` en modo `wait`
- **Animaciones escalonadas** (`staggerChildren`) en grids de tarjetas
- **Gestos interactivos** con `whileHover` y `whileTap`
- **Animaciones de física** con `spring` y `easeInOut`
- **Efectos de partículas** generados dinámicamente con arrays
- **Contexto de autenticación** con React Context API

---

## 📄 Licencia

MIT © [UmaruNoKaiju](https://github.com/UmaruNoKaiju)

---

<div align="center">

Te gusto? [⭐ Dale una estrella si te gustó](https://github.com/UmaruNoKaiju/react-motion-gallery)

</div>
