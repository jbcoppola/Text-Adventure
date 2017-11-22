var Event = require('./classes/Event.js');

var eventData = [{
    "name": "bus burned",
    "location": [{
        "name": "Bus outside",
        "removeExit": "Bus inside"
    }]
},
{
    "name": "break hood",
    "text": "The hood is so rusted your wrench completely destroys it. The engine underneath is somewhat less rusted, and you can see an ancient battery attached. It feels like the engine is still powered.",
    "location": [{
        "name": "Bus engine",
        "oldDesc": "The front of the bus is extremely rusty, especially the hood.",
        "newDesc": "The front of the bus is extremely rusty. The hood is open. The engine is spotted with rust, but you can see an intact battery hooked up.",
        "creates": ["battery"]
    }]
},
{
    "name": "clog nozzles",
    "text": "You stick the gum into the nozzles, clogging them completely.",
    "items": [{
        "name": "bus seat",
        "used": [{
            "usedWith": "live wires",
            "event": "lit fire success"
        }],
    }]
},
{
    "name": "scan faculty ID",
    "text": "You wave the faculty ID in front of the scanner, and a green light flashes. You hear a click and the hood pops open.",
    "location": [{
        "name": "Bus engine",
        "oldDesc": "The front of the bus is extremely rusty, especially the hood.",
        "newDesc": "The front of the bus is extremely rusty. The hood is open. The engine is spotted with rust, but you can see an intact battery hooked up.",
        "creates": ["battery"]
    }],
    "items": {
        "name": "scanner",
        "event": "none"
    }
},
{
    "name": "took battery",
    "text": "You carefully detach the ancient tech from the rest of the engine. You feel the engine power down as you do so.",
    "location": [{
        "name": "Bus engine",
        "oldDesc": "but you can see an intact battery hooked up.",
        "newDesc": "with an empty spot where the battery used to be."
    }],
    "items": [{
        "name": "battery",
        "event": "none"
    },
    {
        "name": "panel",
        "breaks": {
            "creates": ["dead wires"]
    },
    }]
},
{
    "name": "lit fire failure",
    "text": "You use your wrench to pull a bare wire to touch the exposed foam. Within moments it catches alight. However, the sprinklers on the roof start blaring and shoot out a white powder that instantly smothers the flames.\n\nThe golem booms 'DO NOT START FIRES ON THE BUS.'",
},
{
    "name": "lit fire success",
    "text": "You use your wrench to pull a bare wire to touch the exposed foam. Within moments it catches alight. After a few seconds the golem booms `OUT OF CONTROL FIRE DETECTED. EXIT THE BUS THROUGH EMERGENCY EXITS IMMEDIATELY.`",
    "creates": "flaming bus seat"
},
{
    "name": "fire escape used",
    "text": "You pull the lever and the door falls off, leaving a hole you clamber though back into the clearing.",
    "moveTo": "Bus outside"

}];

var Events = eventData.map(event => new Event(event));
Events.get = function (eventName) {
    return Events.find(event => event.name === eventName);
};

module.exports = Events;