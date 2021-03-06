﻿var Area = require('./classes/Area.js');

var areaData = [
{
        "name": "death room",
        "description": "You are dead. Refresh the page to try again."
},
{
        "name": "Bus outside",
        "description": "A large rusted bus is at the north of a small clearing in the garbage. It has a door near the front that appears to be stuck open. You can see a hulking metal golem through the thick windshield where the driver's seat would normally be. The side of the hood has a black card scanner attached.",
        "exits": [{
            "cardinal": "north",
            "destination": "Bus inside",
            "description": "the door into the bus"
        },
        {
            "cardinal": "northeast",
            "destination": "Bus engine",
            "description": "the front of the bus"
        },
        {
            "cardinal": "south",
            "destination": "office",
            "description": "a door to a huge cement block"
        }]
},
{
    "name": "Bus engine",
    "description": "The front of the bus is extremely rusty, especially the hood. The only semi-clear spot is the black scanner next to the hood.",
    "items": ["scanner", "hood"],
    "exits": [{
        "cardinal": "southeast",
        "destination": "Bus outside",
        "description": "the center of the clearing"
    }]
},
{
    "name": "Bus inside",
    "description": "The inside of the bus has rows of seats decayed by dry rot, watched over by the golem driver in front. The glass windows are still intact and have bars over them. The walls next to the seats are covered with metal panels. The roof has nozzles pointing down at the seats. Water doesn't seem to have gotten into this area. The midsection and rear have fire escapes.",
    "items": ["gum", "panel", "nozzles", "fire escape", "windows", "bag", "bus seat", "golem"],
    "exits": [{
        "cardinal": "east",
        "event": "bus golem stop",
        "description": "the door at the front of the bus"
    }]
},
{
    "name": "office",
    "description": "You are in a tackily decorated, garish green office. The back wall is entirely a window which has long since shattered. Near the back is a metal desk with a comfortable looking leather office chair, and a lidded trashcan next to it. The left wall has a faded painting in a thick frame. You see official-looking paperwork taped to the door.",
    "items": ["office window", "desk", "office chair", "trashcan", "painting", "paperwork"],
    "exits": [{
        "cardinal": "north",
        "destination": "Bus outside",
        "description": "the door to the bus clearing"
    },
    {
        "cardinal": "south",
        "destination": "dump",
        "description": "a path outside the shattered window"
    }]
},
{
    "name": "dump",
    "description": "You are in what looks like a factory dumping area. Magic powders have soaked into the ground, and mutated insects scurry around. A large bin on the ground is completely rusty except for under one jar. Next to the bin, glowing goop continually seeps out of a tipped bucket. A nearby container has some kind of black powder inside it.",
    "items": ["bucket", "jar", "nest", "bin", "goop", "powder"],
    "exits": [{
        "cardinal": "north",
        "destination": "office",
        "description": "a broken window into a fancy room"
    },
    {
        "cardinal": "south",
        "destination": "golem",
        "description": "a field with a large golem in the center"
    }]
},
{
    "name": "golem",
    "description": "Several corpses lie on the ground around a large immobile golem. The corpses are only lightly decayed, suggesting they died relatively recently. The golem has no legs and has a large device attached to its head that looks like a telescope. Its neck seems to be designed to be highly flexible. A pamphlet lies on the ground.",
    "items": ["scanner", "pamphlet", "corpses"],
    "exits": [{
        "cardinal": "north",
        "destination": "dump",
        "description": "a dumping area for magic trash"
    }]
}
];

var Areas = areaData.map(area => new Area(area));
Areas.get = function (roomName) {
    return Areas.find(room => room.name === roomName);
};

module.exports = Areas;