var classes = require("./classes.js");
var Areas = require("./area-data.js");

class Player {
    constructor() {
        this.inventory = [];
        this.location = Areas.get("Start Room");
    }
    listInventory() {
        let output = `You have: `;
        for (let item of this.inventory) {
            output += item.name;
        }
        return output;
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
        return this.location.describe();
    }
    examine(object) {
        if (this.inventory.some(item => item.name === object)) {
            return this.inventory.find(item => item.name === object).description;
        }
        else if (this.location.items.some(item => item.name === object)) {
            return this.location.items.find(item => item.name === object).description;
        }
        else {
            return `I don't see that here.`;
        }
    }
    take(object) {
        if (this.location.items.some(item => item.name.toLowerCase() === object)) {
            if (this.location.items.find(item => item.name === object).takeable) {
                this.inventory.push(this.location.items.find(item => item.name.toLowerCase() === object));
                this.location.removeItem(this.location.items.find(item => item.name.toLowerCase() === object));
                return `Got ${object}.`;
            }
            else {return `Can't take ${object}.`}
        }
        else {
            return `I don't see that here.`;
        }
    }
    drop(object) {
        if (this.inventory.find(item => item.name.toLowerCase() === object)) {
            this.location.addItem(this.inventory.find(item => item.name.toLowerCase() === object));
            this.location.find(item => item.name.toLowerCase() === object).onGround = true;
            return `Dropped ${object}.`;
        }
        return `You don't have a ${object}.`;
    }
    use(object, secondObject) {
        //check if player has first object
        if (this.inventory.some(item => item.name.toLowerCase() === object)) {
            // using object "on" something
            if (secondObject) {
                //check if second object is in area
                if (this.location.items.some(item => item.name.toLowerCase() === secondObject)) {
                    return this.location.items.find(item => item.name.toLowerCase() === secondObject).use(object);
                }
                //...or in inventory
                else if (this.inventory.some(item => item.name.toLowerCase() === secondObject)) {
                    return this.inventory.find(item => item.name.toLowerCase() === secondObject).use(object);
                }
                else {
                    return `There is no ${secondObject} here.`;
                }
            }
            // using object by itself
            else {
                //check if object is in area
                if (this.location.items.some(item => item.name.toLowerCase() === object)) {
                    return this.location.items.find(item => item.name.toLowerCase() === object).use("player");
                }
                //...or in inventory
                else if (this.inventory.some(item => item.name.toLowerCase() === object)) {
                    return this.inventory.find(item => item.name.toLowerCase() === object).use("player");
                }
                else { return `You don't have a ${object}.`; }
            }
        }
        else { return `You don't have a ${object}.`; }
    }
}

module.exports = Player;