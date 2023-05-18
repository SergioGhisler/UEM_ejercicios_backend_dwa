const events = require('events');

class User extends events.EventEmitter {
    constructor(name){
        super();
        this.name = name;
        this.messageCount = 0;
    }
};

const Antonio = new User('Antonio'); 
const Maria = new User('Maria'); 
const Alfonso = new User('Alfonso');
const users = [Antonio, Maria, Alfonso];

users.forEach(user => {
    user.on('message', () => {
        user.messageCount += 1
    });
});

Antonio.emit('message');
Maria.emit('message');

console.log("Antonio ha mandado", Antonio.messageCount, "mensaje")
console.log("Maria ha mandado", Maria.messageCount, "mensaje")