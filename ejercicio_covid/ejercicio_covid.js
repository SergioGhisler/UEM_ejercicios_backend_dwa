const http = require('http');
const https = require('https');

const fetchCovidData = async () => {
  return new Promise((resolve, reject) => {
    https.get('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json', (res) => {
      let data = '';

      res.on('data', (chunk) => {
        console.log(data)
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });

    }).on('error', (err) => {
      reject(err);
    });
  });
};

const handleRequest = async (req, res) => {
  const regionName = decodeURI(req.url.substring(1));
  const covidData = await fetchCovidData();

  const regionData = covidData.find(region => region.denominazione_regione === regionName);

  if (regionData) {
    const response = {
      'Región': regionData.denominazione_regione,
      'Casos totales': regionData.totale_casi,
      'Fallecidos': regionData.deceduti,
      'Recuperados': regionData.dimessi_guariti
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response, null, 2));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Región no encontrada');
  }
};

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
