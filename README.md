# 🎮 Piedra, Papel o Tijera

Juego interactivo de Piedra, Papel o Tijera desarrollado con TypeScript, HTML y CSS.

## 🚀 Demo en vivo

[**Jugar ahora →**] git@github.com:Mauromartinezgit/Juego.git



## 🎯 Características

- ✅ Contador de 3 segundos para elegir
- ✅ Sistema de puntuación (mejor de 3 rondas)
- ✅ Diseño responsive (mobile y desktop)
- ✅ Animaciones fluidas
- ✅ TypeScript para código más seguro

## 🛠️ Tecnologías

- TypeScript
- HTML5
- CSS3
- Parcel (bundler)

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

El proyecto está desplegado en GitHub Pages:
```bash
npm run deploy
```

---

Desarrollado como proyecto educativo 🎓

# Cambios realizados en el frontend

## Descripción
Se realizaron modificaciones en el frontend para que el juego espere a que ambos jugadores estén conectados antes de comenzar. Esto incluye la implementación de un sistema de polling que consulta el estado de la sala en el backend.

## Cambios realizados

### 1. **Polling en `WaitingPlayerPage.ts`**
Se agregó un método de polling que consulta el estado de la sala en el backend cada 3 segundos. El juego solo avanza cuando el backend confirma que hay dos jugadores conectados.

#### Código agregado:
```typescript
private pollingIntervalId: ReturnType<typeof setInterval> | null = null;

private pollRoomStatus(): void {
    const { roomCode } = state.getState();

    this.pollingIntervalId = setInterval(async () => {
        try {
            const response = await fetch(`${API_URL}/rooms/${roomCode}/status`);
            const data = await response.json();

            if (data.players.length === 2) {
                console.log('Ambos jugadores están listos!');
                if (this.pollingIntervalId) {
                    clearInterval(this.pollingIntervalId);
                    this.pollingIntervalId = null;
                }

                // Navegar a la pantalla de juego
                void router.navigate('game-playing3');
            }
        } catch (error) {
            console.error('Error al verificar el estado de la sala:', error);
        }
    }, 3000); // Consultar cada 3 segundos
}

destroy(): void {
    // Limpiar el intervalo de polling si existe
    if (this.pollingIntervalId) {
        clearInterval(this.pollingIntervalId);
        this.pollingIntervalId = null;
    }
}

connectedCallback(): void {
    this.pollRoomStatus();
}
```

### 2. **Importación de `API_URL`**
Se agregó la constante `API_URL` desde el archivo `state.ts` para realizar las solicitudes al backend.

#### Código agregado en `WaitingPlayerPage.ts`:
```typescript
import { API_URL } from "../state";
```

### 3. **Exportación de `API_URL` en `state.ts`**
Se exportó la constante `API_URL` para que pueda ser utilizada en otros archivos.

#### Código agregado en `state.ts`:
```typescript
export { API_URL };
```

## Requerimientos para el backend

### Endpoint `/rooms/{roomCode}/status`
El backend debe proporcionar un endpoint que devuelva el estado de la sala. Este endpoint debe incluir:
- El código de la sala.
- La lista de jugadores conectados.
- Un indicador de si la sala está lista para comenzar el juego.

#### Ejemplo de respuesta esperada:
```json
{
  "roomCode": "12345",
  "players": [
    { "name": "Jugador 1", "id": "abc123" },
    { "name": "Jugador 2", "id": "def456" }
  ],
  "isReady": true
}
```

### Validaciones adicionales
- Verificar que el jugador que intenta unirse a la sala no exceda el límite de jugadores.
- Manejar errores como salas inexistentes o desconexiones de jugadores.

## Notas finales
Con estos cambios, el frontend ahora espera a que ambos jugadores estén conectados antes de avanzar al juego. Asegúrate de que el backend cumpla con los requisitos mencionados para garantizar un funcionamiento correcto.