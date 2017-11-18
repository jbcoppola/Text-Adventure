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
}];

var Areas = areaData.map(area => new Area(area));
Areas.get = function (roomName) {
    return Areas.find(room => room.name === roomName);
};

module.exports = Areas;