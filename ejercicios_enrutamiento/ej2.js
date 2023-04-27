const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Página principal');
});

app.get('/acerca', (req, res) => {
  res.send('Página acerca de nosotros');
});

app.get('/usuario/:nombre/:apellido', (req, res) => {
  res.send(`Hola ${req.params.apellido}`);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
