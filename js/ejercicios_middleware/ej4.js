const express = require('express');
const app = express();

// Middleware personalizado para registrar el tiempo de respuesta
function responseTimeLogger(req, res, next) {
  const startTime = Date.now();
  const { method, url } = req;

  res.on('finish', () => {
    const elapsedTime = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] ${method} ${url} - Tiempo de respuesta: ${elapsedTime} ms`);
  });

  next();
}

// Aplicar el middleware a todas las rutas
app.use(responseTimeLogger);

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.send('¡Bienvenido a nuestra aplicación Express!');
});

app.get('/ejemplo', (req, res) => {
  setTimeout(() => {
    res.send('Esta es una ruta de ejemplo con un retraso artificial de 2 segundos');
  }, 2000);
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
