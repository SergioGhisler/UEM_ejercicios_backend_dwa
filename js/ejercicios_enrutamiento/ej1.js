const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Página principal');
});

app.get('/acerca', (req, res) => {
  res.send('Página acerca de nosotros');
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
