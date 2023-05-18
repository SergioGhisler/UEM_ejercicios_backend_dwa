const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Página principal');
});

app.get('/acerca', (req, res) => {
  res.send('Página acerca de nosotros');
});

app.get('/usuario/:nombre', (req, res) => {
  res.send(`Hola ${req.params.nombre}`);
});

app.get('/post/:categoria/:id', (req, res) => {
  res.send(`Categoría: ${req.params.categoria}, ID: ${req.params.id}`);
});


app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
