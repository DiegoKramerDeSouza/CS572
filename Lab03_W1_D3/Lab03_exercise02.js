const eventEmiter = require('events');
/**
 * ES6
 */
class Gym extends eventEmiter{
    constructor(){
        super();
        setInterval(_ => this.emit('boom'), 1000);
    }
}

let gym = new Gym();
gym.on('boom', _ => console.log('Athlete is working out'));
