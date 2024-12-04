const WebSocket = require('ws');
const express = require('express');
const app = express();

// Crea un servidor HTTP
const server = require('http').createServer(app);

// Configura WebSocket para escuchar en el servidor HTTP
const wss = new WebSocket.Server({ server });

// Cuando un cliente se conecta al WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Envía un mensaje al cliente
  ws.send('¡Conexión WebSocket exitosa!');

  // Escucha los mensajes del cliente
  ws.on('message', (message) => {
    console.log('Mensaje recibido: %s', message);
  });

  // Enviar un mensaje de saludo cada 5 segundos
  setInterval(() => {
    ws.send('Mensaje desde el servidor WebSocket');
  }, 5000);
});

// Asegúrate de tener una ruta de prueba para verificar que el servidor está corriendo
app.get('/', (req, res) => {
  res.send('Servidor HTTP activo. WebSocket también está funcionando!');
});

// Inicia el servidor HTTP en el puerto 4001
server.listen(4001, () => {
  console.log('Servidor WebSocket escuchando en http://localhost:4001');
});
