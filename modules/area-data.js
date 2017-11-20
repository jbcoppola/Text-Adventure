var Area = require('./classes/Area.js');

var areaData = [{
    "name": "Start Room",
    "description": "Starting room. Boring.",
    "exits": [{
        "cardinal": "north",
        "destination": "North Room",
        "description": "path to north room"
    }],
    "items": ["rock", "rock 2"]
},
{
    "name": "North Room",
    "description": "The room in the north.",
    "exits": [{
        "cardinal": "south",
        "destination": "Start Room",
        "description": "path to the start"
    }],
    "items": ["stick", "stuck lever"]
},
{
    "name": "Bus outside",
    "description": "A large rusted bus in at the north of a small clearing in the garbage. It has a door near the front that appears to be stuck open. You can see a hulking metal golem through the thick windshield where the driver's seat would normally be. The side of the hood has a black card scanner attached.",
    "exits": [{
        "cardinal": "north",
        "destination": "Bus inside",
        "description": "door into the bus"
    },
    {
        "cardinal": "northeast",
        "destination": "Bus engine",
        "description": "the front of the bus"
    }],
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
    "description": "The inside of the bus has rows of seats decayed by dry rot, watched over by the golem driver in front. The glass windows are still intact and have bars over them. The walls next to the seat are covered with metal panels. The roof has nozzles pointing down at the seats. Water doesn't seem to have gotten into this area. The midsection and rear have fire escapes.",
    "items": ["gum", "panel", "nozzles"],
    "exits": [{
        "cardinal": "front",
        "destination": "Bus outside",
        "description": "the door at the front of the bus"
    }]
}
];

var Areas = areaData.map(area => new Area(area));
Areas.get = function (roomName) {
    return Areas.find(room => room.name === roomName);
};

module.exports = Areas;