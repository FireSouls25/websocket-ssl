# WebSocket con SSL/TLS

Servidor WebSocket seguro que utiliza certificados SSL autofirmados generados con OpenSSL.

## Requisitos

- Node.js
- OpenSSL (para generar certificados)

## Estructura de archivos

- `server.js` - Servidor WebSocket con cifrado TLS
- `client.js` - Cliente de prueba
- `key.pem` - Clave privada
- `cert.pem` - Certificado autofirmado
- `package.json` - Dependencias

## Generar certificados

Los certificados ya estan incluidos. Si necesitas regenerarlos:

```bash
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"
```

## Ejecutar el servidor

```bash
npm install
npm start
```

El servidor iniciara en `wss://127.0.0.1:8443`.

## Probar la conexion

En otra terminal, ejecuta el cliente:

```bash
node client.js
```

Deberias ver mensajes de datos aleatorios cada 2 segundos.

## Como funciona

1. Se crea un servidor HTTPS con los certificados SSL
2. Se attacha el servidor WebSocket al servidor HTTPS
3. Las conexiones utilizan wss:// (WebSocket Secure) que cifra todo con TLS
4. El handshake es identico a HTTPS: primero TLS, luego upgrade a WebSocket

## Advertencia

El certificado es autofirmado, por lo que los navegadores no lo aceptaran directamente. Usa el cliente de prueba (`client.js`) o herramientas como `wscat` para conectar.
