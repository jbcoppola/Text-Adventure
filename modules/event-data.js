var Event = require('./classes/Event.js');

var eventData = [
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
    "text": "You use your wrench to pull a bare wire to touch the exposed foam. Within moments it catches alight. However, the sprinklers on the roof shoot out a white powder that instantly smothers the flames.\n\nThe golem booms 'DO NOT START FIRES ON THE BUS.'"
},
{
    "name": "lit fire success",
    "text": "You use your wrench to pull a bare wire to touch the exposed foam. Within moments it catches alight. After a few seconds the golem booms `OUT OF CONTROL FIRE DETECTED. EXIT THE BUS THROUGH EMERGENCY EXITS IMMEDIATELY.`",
    "location": [{
        "name": "Bus inside",
        "oldDesc": "The inside of the bus has rows of seats decayed by dry rot, watched over by the golem driver in front.",
        "newDesc": "The inside of the bus has rows of seats decayed by dry rot, one of which is ablaze. The golem driver in front is repeating its instructions to use the fire escape.",
        "creates": ["flaming bus seat"],
        "destroys": ["bus seat"],
        "changeExit": [{
            "cardinal": "east",
            "event": "bus golem stop fire"
        }]
    }],
    "items": [{
        "name": "fire escape",
        "used": [{
            "usedWith": "player",
            "event": "fire escape used success"
        }]
    }]
},
{
    "name": "fire escape used success",
    "text": "You pull the lever and the door falls off, leaving a hole you clamber though back into the clearing.",
    "moveTo": "Bus outside",
    "location": [{
        "name": "Bus outside",
        "oldDesc": "A large rusted bus in at the north of a small clearing in the garbage. It has a door near the front that appears to be stuck open. You can see a hulking metal golem through the thick windshield where the driver's seat would normally be. The side of the hood has a black card scanner attached.",
        "newDesc": "A flaming bus is in the north of a small clearing in the garbage. You hear the metallic screaming of the golem through the melted windshield.",
        "removeExit": ["north"]
    }]
},
{
    "name": "fire escape used failure",
    "text": "You start to pull the fire escape lever, but the golem points its arm at you. The device on the end glows threateningly. 'DO NOT USE FIRE ESCAPE IN NON-EMERGENCY CIRCUMSTANCES.'\n\nYou step away."
},
{
    "name": "bus golem stop",
    "text": "You attempt to leave the bus, only for the golem to place its arm to bar your path. `REMAIN SEATED ON BUS UNTIL WE ARE AT SCHOOL, CHILD.`"
},
{
    "name": "bus golem stop fire",
    "text": "You attempt to leave the bus, only for the golem to place its arm to bar your path. `USE FIRE ESCAPE WHILE FIRE IS PRESENT.`"
},
    {
        "name": "desk open",
        "text": "You open the desk. Inside is blah blah blah",
        "location": [{
            "name": "office",
            "oldDesc": "a metal desk",
            "newDesc": "an open metal desk"
        }],
        "items": [{
            "name": "desk",
            "used": [{
                "usedWith": "player",
                "text": "The desk is already open.",
                "event": "none"
            }]
        }]
}];

var Events = eventData.map(event => new Event(event));
Events.get = function (eventName) {
    return Events.find(event => event.name === eventName);
};

module.exports = Events;