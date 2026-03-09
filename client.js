const WebSocket = require('ws');

const ws = new WebSocket('wss://127.0.0.1:8443', {
    rejectUnauthorized: false
});

ws.on('open', () => {
    console.log("✅ Conectado al servidor WebSocket seguro");
    ws.send("Hola desde el cliente");
});

ws.on('message', (data) => {
    console.log("📨 Recibido:", data.toString());
});

ws.on('error', (err) => {
    console.error("❌ Error:", err.message);
});

ws.on('close', () => {
    console.log("🔌 Desconectado");
});

setTimeout(() => {
    ws.close();
    process.exit(0);
}, 10000);
