const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

const HOST = '127.0.0.1';
const PORT = 8443;

const server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
});

const wss = new WebSocket.Server({ server });

console.log(`🚀 Servidor WebSocket seguro iniciado en wss://${HOST}:${PORT}`);

const generarDatos = () => {
    const nombres = ["Sensor_Alfa", "Sensor_Beta", "Sensor_Gamma", "Sensor_Delta"];
    return JSON.stringify({
        id: Math.floor(Math.random() * 1000),
        nombre: nombres[Math.floor(Math.random() * nombres.length)],
        temperatura: (Math.random() * (40 - 20) + 20).toFixed(2) + "°C",
        timestamp: new Date().toISOString()
    });
};

wss.on('connection', (ws) => {
    console.log("✅ Cliente conectado");

    const intervalo = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(generarDatos());
        }
    }, 2000);

    ws.on('message', (message) => {
        console.log("📨 Mensaje recibido:", message.toString());
        ws.send(`Echo: ${message}`);
    });

    ws.on('close', () => {
        console.log("❌ Cliente desconectado");
        clearInterval(intervalo);
    });
});

server.listen(PORT, HOST, () => {
    console.log(`🔒 Servidor HTTPS escuchando en https://${HOST}:${PORT}`);
});
