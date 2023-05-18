const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.get('/generar-error', (req, res, next) => {
  const error = new Error('¡Error generado intencionalmente!');
  next(error);
});

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
}

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
