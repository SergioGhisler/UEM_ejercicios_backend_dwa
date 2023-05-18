const express = require('express');
const app = express();
const path = require('path');

// Configurar express.static para servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Bienvenido a nuestra aplicación Express con archivos estáticos!');
});

// Iniciar el servidor
app.listen(3000, () => {
      console.log('Servidor escuchando en el puerto 3000');
});
