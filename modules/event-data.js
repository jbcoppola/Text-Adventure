var Event = require('./classes/Event.js');

var eventData = [{
    "name": "bus burned",
    "location": {
        "name": "Bus outside",
        "removeExit": "Bus inside"
    }
},
{
    "name": "took battery",
    "text": "You carefully detach the ancient tech from the rest of the engine. You feel the engine power down as you do so.",
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

var Events = eventData.map(area => new Event(event));
Events.get = function (eventName) {
    return Events.find(event => event.name === eventName);
};

module.exports = Events;