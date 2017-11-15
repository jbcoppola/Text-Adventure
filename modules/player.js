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
    check(object, str) {
        if (str === "location") {
            return this.location.items.some(item => item.name.toLowerCase() === object);
        }
        else { return this.inventory.some(item => item.name.toLowerCase() === object); }
    }
    get(object, str) {
        if (str === "location") {
            return this.location.items.find(item => item.name.toLowerCase() === object);
        }
        else { return this.inventory.find(item => item.name.toLowerCase() === object); }
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
        if (this.check(object)) {
            return this.get(object).description;
        }
        else if (this.check(object, "location")) {
            return this.get(object, "location").description;
        }
        else {
            return `I don't see that here.`;
        }
    }
    take(object) {
        if (this.check(object, "location")) {
            if (this.get(object, "location").takeable) {
                this.inventory.push(this.get(object, "location"));
                this.location.removeItem(this.get(object, "location"));
                return `Got ${object}.`;
            }
            else {return `Can't take ${object}.`}
        }
        else {
            return `I don't see that here.`;
        }
    }
    drop(object) {
        if (this.check(object)) {
            this.location.addItem(this.get(object));
            this.get(object, "location").onGround = true;
            return `Dropped ${object}.`;
        }
        return `You don't have a ${object}.`;
    }
    use(object, secondObject) {
        //check if player has first object
        if (this.check(object)) {
            // using object "on" something
            if (secondObject) {
                //check if second object is in area
                if (this.check(secondObject, "location")) {
                    return this.get(secondObject, "location").use(object);
                }
                //...or in inventory
                else if (this.check(secondObject)) {
                    return this.get(secondObject).use(object);
                }
                else {
                    return `There is no ${secondObject} here.`;
                }
            }
            // using object by itself
            else {
                //check if object is in area
                if (this.check(object, "location")) {
                    return this.get(object, "location").use("player");
                }
                //...or in inventory
                else if (this.check(object)) {
                    return this.get(object).use("player");
                }
                else { return `You don't have a ${object}.`; }
            }
        }
        else { return `You don't have a ${object}.`; }
    }
}

module.exports = Player;