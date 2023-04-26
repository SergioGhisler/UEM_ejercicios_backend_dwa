const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === '/saludo' && method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hola Mundo');
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Ruta no encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
