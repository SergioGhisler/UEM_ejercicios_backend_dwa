
const express = require('express');
const userRouter = express.Router();
const postRouter = express.Router();
const app = express();

userRouter.get('/', (req, res) => {
  res.send('Listado de usuarios');
});

userRouter.get('/:id', (req, res) => {
  res.send(`Detalles del usuario con ID: ${req.params.id}`);
});

postRouter.get('/', (req, res) => {
  res.send('Listado de posts');
});

postRouter.get('/:id', (req, res) => {
  res.send(`Detalles del post con ID: ${req.params.id}`);
});

app.use('/usuarios', userRouter);
app.use('/posts', postRouter);


app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});