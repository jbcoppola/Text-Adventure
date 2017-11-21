var Event = require('./classes/Event.js');

var eventData = [{
    "name": "bus burned",
    "location": {
        "name": "Bus outside",
        "removeExit": "Bus inside"
    }
}, {
        "name": "break hood",
        "text": "You manage to batter the lock open, and swing open the hood to a shower of rust.",
        "location": {
            "name": "Bus engine",
            "oldDesc": "The front of the bus is extremely rusty, especially the hood.",
            "newDesc": "The front of the bus is extremely rusty. The hood is open. The engine is spotted with rust, but you can see an intact battery hooked up.",
            "creates": "battery"
        }
},
{
    "name": "took battery",
    "text": "You carefully detach the ancient tech from the rest of the engine. You feel the engine power down as you do so.",
    "location": {
        "name": "Bus engine",
        "oldDesc": "but you can see an intact battery hooked up.",
        "newDesc": "with an empty spot where the battery used to be."
    },
    "items": [{
        "name": "battery",
        "event": "none"
    },
    {
        "name": "wires",
        "oldDesc": "and you can feel the hum of energy coming off them. Seems dangerous.",
        "newDesc": "though you can't feel any energy coming off them."
    },
    {
        "name": "bus seat",
        "used": [{
            "usedWith": "wires",
            "text": "You use your wrench to pull a bare wire to touch the exposed foam. However, nothing happens."
        }]
    }]
}];

var Events = eventData.map(event => new Event(event));
Events.get = function (eventName) {
    return Events.find(event => event.name === eventName);
};

module.exports = Events;