import { Area } from 'Classes';

var areaData = [{
    "name": "Start",
    "description": "Starting room. Boring.",
    "exits": [{
        "cardinal": "North",
        "destination": "North Room",
        "description": "Path to north room"
    }],
    "items": [{
        "name": "Rock",
        "description": "A rock.",
        "value": 0
    }]
}, {
    "name": "North Room",
    "description": "The room in the north.",
    "exits": [{
        "cardinal": "South",
        "destination": "Start Room",
        "description": "Path to start"
    }],
    "items": [{
        "name": "Stick",
        "description": "A stick.",
        "value": 0
    }]
}];

var Areas = areaData.map(area => new Area({ name, description, exits, items }));
Areas.get = function (roomName) {
    return Areas.find(name == roomName);
}

export { Areas }