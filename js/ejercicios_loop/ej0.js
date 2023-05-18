console.time('miTemporizador1');
console.time('miTemporizador2');

setTimeout(() => {
  console.log('setTimeout1');
  console.timeEnd('miTemporizador1');
}, 1000);

console.log('Hola');

setTimeout(() => {
  console.log('setTimeout2');
  console.timeEnd('miTemporizador2');
}, 1000);
