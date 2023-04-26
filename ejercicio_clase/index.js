const http = require('http');

const server = http.createServer((req, res) => {
  const path = req.url;
  const method = req.method;

  if (path === '/hora' && method === 'GET') {
    const currentTime = new Date().toISOString();
    const responseObject = {
      mensaje: "La hora actual del servidor es:",
      hora: currentTime
    };

    const responseJSON = JSON.stringify(responseObject);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(responseJSON);
  } else if (path === '/hora' && method != 'GET') {
    res.writeHead(405);
    res.end('Método no permitido');
  }
  else {
    res.writeHead(404);
    res.end('Ruta no encontrada');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
