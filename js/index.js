console.log('Inicio del loop de eventos');

Promise.resolve()
  .then(() => {
    console.log('Microtarea 1');
  })
  .then(() => {
    console.log('Microtarea 2');
  });

setTimeout(() => {
  console.log('Timeout de 0ms');
}, 0);

console.log('Fin del loop de eventos');