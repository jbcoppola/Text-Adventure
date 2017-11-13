var classes = require("./classes.js");
var Areas = require("./area-data.js");

class Player {
    constructor() {
        this.inventory = [];
        this.location = Areas.get("Start Room");
    }
    printInventory() {
        for (let item of this.inventory) {
            console.log(item);
        }
    }
    transport(roomName) {
        let newRoom = Areas.get(roomName);
        if (newRoom) { this.location = newRoom; }
        else { console.log("Error: invalid room name passed to transport") };
    }
    move(direction) {
        if (this.location.exits.some(exit => exit.cardinal === direction)) {
            this.transport(this.location.exits.find(exit => exit.cardinal === direction).destination);
            return `You move ${direction}.`;
        }
        else { return `You can't go ${direction} here.`; }
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
        if (this.location.items.some(item => item.name.toLowerCase() === object)) {
            this.inventory.push(this.location.items.find(item => item.name.toLowerCase() === object));
            this.location.removeItem(this.location.items.find(item => item.name.toLowerCase() === object));
            return `Got ${object}.`;
        }
        else {
            return `I don't see that here.`;
        }
    }
    use(object, secondObject) {
        // using object "on" something
        if (secondObject) {
            //check if second object is in area or on player
            if (this.location.items.some(item => item.name.toLowerCase() === secondObject) || this.inventory.some(item => item.name.toLowerCase() === secondObject)) {
                //check if player has first object
                if (this.inventory.some(item => item.name.toLowerCase() === object)) { return secondObject.use(object); }
                else { return `You don't have a ${object}.`; }
            }
            else {
                return `There is no ${secondObject} here.`;
            }
        }
        // using object by itself
        else {
            if (this.location.items.some(item => item.name.toLowerCase() === object)) {
                return this.location.items.find(item => item.name.toLowerCase() === object).use("player");
            }
            else if (this.inventory.some(item => item.name.toLowerCase() === object)) {
                return this.inventory.find(item => item.name.toLowerCase() === object).use("player");
            }
            else { return `You don't have a ${object}.`; }
        }
    }
}

module.exports = Player;