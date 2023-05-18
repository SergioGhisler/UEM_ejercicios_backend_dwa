const { EventEmitter } = require('events');
const emitter = new EventEmitter();

emitter.on('newCon', () => {
    console.log('Hola!!')
});

emitter.on('newCon', () => {
    console.log('Registrando')
});

emitter.emit('newCon');
