var Items = require("./../item-data.js");
var Areas = require("./../area-data.js");

class Event {
    constructor(name, addInventory, removeInventory, moveTo, location) {
        this.name = name;
        this.addInventory = addInventory;
        this.removeInventory = removeInventory;
        this.moveTo = moveTo;
        this.location = location;
    }
}

module.exports = Event;