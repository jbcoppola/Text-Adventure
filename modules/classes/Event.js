var Items = require("./../item-data.js");
var Areas = require("./../area-data.js");

class Event {
    constructor({ name, text, addInventory, removeInventory, moveTo, location, items = [] }) {
        this.name = name;
        this.text = text;
        this.addInventory = addInventory;
        this.removeInventory = removeInventory;
        //where to move the player
        this.moveTo = moveTo;
        //where to affect the items of a location
        this.location = location;
        //items to change
        this.items = items;
    }
}

module.exports = Event;