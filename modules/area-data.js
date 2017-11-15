var classes = require("./classes.js");

var areaData = [{
    "name": "Start Room",
    "description": "Starting room. Boring.",
    "exits": [{
        "cardinal": "north",
        "destination": "North Room",
        "description": "path to north room"
    }],
    "items": [{
        "name": "rock",
        "description": "A rock.",
        "onGround": true,
        "used": {
            "with": "rock 2",
            "text": "The rock explodes."
        }
    },
    {
        "name": "rock 2",
        "description": "The sequel to rock.",
        "onGround": true,
        "used": {
            "with": "rock",
            "text": "Rock 2 implodes."
        }
    },
    {
        "name": "stuck lever",
        "description": "This lever is jammed. It has dents shaped like a rock.",
        "takeable": false,
        "onGround": true,
        "used": {
            "with": "rock",
            "text": "The lever snaps off at the base."
        }
    }]
},
{
    "name": "North Room",
    "description": "The room in the north.",
    "exits": [{
        "cardinal": "south",
        "destination": "Start Room",
        "description": "path to the start"
    }],
    "items": [{
        "name": "stick",
        "description": "A stick.",
        "value": 0
    }]
}];

var Areas = areaData.map(area => new classes.Area(area));
Areas.get = function (roomName) {
    return Areas.find(room => room.name === roomName);
};

module.exports = Areas;