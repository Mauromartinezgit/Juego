# 🎮 Piedra, Papel o Tijera - Multijugador

Juego interactivo de Piedra, Papel o Tijera con modo multijugador en tiempo real, desarrollado con TypeScript, HTML y CSS.

## 🚀 Demo en vivo

[**Jugar ahora →**](https://juego-pearl.vercel.app)

## 🎯 Características

- ✅ Modo multijugador en tiempo real
- ✅ Salas de juego con códigos únicos de 6 caracteres
- ✅ Sistema de espera sincronizado (ambos jugadores deben presionar "¡Jugar!")
- ✅ Contador de 3 segundos para elegir
- ✅ Sistema de puntuación (mejor de 3 partidas, cada partida al mejor de 5 puntos)
- ✅ Nombres de jugadores en pantallas de resultado
- ✅ Diseño responsive (mobile y desktop)
- ✅ Animaciones fluidas
- ✅ TypeScript para código más seguro

## 🛠️ Tecnologías

### Frontend
- TypeScript
- HTML5
- CSS3
- Parcel (bundler)
- Vercel (deployment)

### Backend
- Node.js + Express
- TypeScript
- Firebase Firestore (base de datos)
- Render (deployment)

## 🎮 Cómo jugar

1. **Crear sala:** Ingresa tu nombre y presiona "Nuevo Juego" → comparte el código con tu oponente
2. **Unirse:** El oponente ingresa su nombre, presiona "Ingresar a una sala" y escribe el código
3. **Jugar:** Ambos jugadores presionan "¡Jugar!" para comenzar
4. **Elegir:** Selecciona piedra, papel o tijera antes de que pasen los 3 segundos
5. **Ganar:** El primero en ganar 2 partidas (cada una al mejor de 5 puntos) gana el juego

## 📦 Instalación local
```bash
# Clonar el repositorio
git clone git@github.com:Mauromartinezgit/Juego.git

# Entrar al directorio
cd juego

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

## 🌐 Deployment

### Frontend (Vercel)
El proyecto frontend está desplegado en Vercel:
```bash
git push origin main  # Vercel despliega automáticamente
```

### Backend (Render)
El backend está desplegado en Render:
```bash
git push origin main  # Render despliega automáticamente
```

## 🔗 URLs

- **Frontend:** https://juego-pearl.vercel.app
- **Backend:** https://juego-backend-5uex.onrender.com

---

Desarrollado como proyecto educativo 🎓