class Item {
    constructor(name, description, value=0) {
        this.name = name;
        this.description = description;
        this.value = value;
    }

    print() {
        return `Name: ${this.name}; Description: ${this.description}; Value: ${this.value}`;
    }
}

class Coin extends Item {
    constructor(amt) {
        this.amt = amt;
        super("Coin", "An assortment of coins and precious metals.", this.amt);
    }
}

class Path {
    constructor(cardinal, destination, description) {
        this.cardinal = cardinal;
        this.destination = destination;
        this.description = description;
    }
}

class Area {
    constructor(name, description, exits = [], items = []) {
        this.name = name;
        this.description = description;
        this.exits = exits;
        this.items = items;
    }
    addItem(item) {
        this.items.push(item);
        return this;
    }
    addItems(...items) {
        items.forEach(item => addItem(item));
        return this;
    }
    removeItem(item) {
        var i = this.items.indexOf(item);
        this.items.splice(i, 1);
        return this;
    }
    removeItems(...items) {
        items.forEach(item => removeItem(item));
        return this;
    }
}

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

class Player {
    constructor() {
        this.inventory = [];
        this.location = Areas.go("Start Room");
    }
    printInventory() {
        for (let item of this.inventory) {
            console.log(item);
        }
    }
    transport(roomName) {
        this.location = Areas.get(roomName);
    }
    move(direction) {
        if (this.location.exits.some(cardinal === direction)) {
            this.transport(exits.find(cardinal === direction).destination);
        }
    }
    look() {
        return this.location.description;
    }
    examine(object) {
        if (this.inventory.some(name === object)) {
            return this.inventory.find(name === object).description;
        }
        else if (this.location.items.some(name === object)) {
            return this.location.items.find(name === object).description;
        }
        else {
            return `I don't see that here.`;
        }
    }
    take(object) {
       
    }
}