var classes = require("./classes.js");
var Areas = require("./../area-data.js");
var Items = require("./../item-data.js");

class Player {
    constructor() {
        this.inventory = [];
        this.location = Areas.get("Bus engine");
    }
    listInventory() {
        let output;
        if (this.inventory.length > 0) {
            output = `You have: `;
            for (let i = 0; i < this.inventory.length; i++) {
                if (i > 0 && i + 1 === this.inventory.length) {
                    output += "and ";
                }
                output += `${this.inventory[i]}`;
                if (i + 1 !== this.inventory.length) {
                    output += ", ";
                }
            }
            output += ".";
        }

        else { output = `Your inventory is empty.`; }
        return output;
    }
    checkAlias(object) {
        for (let [key, value] of this.location.aliases.entries()) {
            console.log(value);
            if (value.some(name => name === object)) {
                console.log("returning true");
                return true;
            }
        }
        console.log("returning false");
        return false;
    }
    getAlias(object) {
        for (let [key, value] of this.location.aliases.entries()) {
            console.log(key);
            if (value.some(name => name === object)) { return key; }
        }
    }
    check(object, location) {
        if (location) {
            return this.checkAlias(object);
        }
        return this.inventory.includes(object);
    }
    remove(object) {
        let location = Items.get(object).location;
        if (location === "inventory") {
            this.inventory.splice(this.inventory.indexOf(object), 1);
        }
        else if (location === this.location.name) {
            this.location.removeItem(object);
        }
    }
    add(object) {
        this.inventory.push(object);
    }
    transport(roomName) {
        let newRoom = Areas.get(roomName);
        if (newRoom) { this.location = newRoom; }
        else { console.log("Error: invalid room name passed to transport"); }
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
        if (this.check(object) || this.check(object, this.location)) {
            return Items.get(object).description;
        }
        else {
            return `I don't see that here.`;
        }
    }
    take(object) {
        if (this.check(object, this.location)) {
            if (this.checkAlias(object)) { object = this.getAlias(object); }
            let newObject = Items.get(object);
            console.log(newObject);
            if (newObject.takeable) {
                this.add(object);
                this.location.removeItem(object);
                newObject.onGround = false;
                return `Got ${object}.`;
            }
            else { return `Can't take ${object}.`;}
        }
        else {
            return `I don't see that here.`;
        }
    }
    drop(object) {
        let dropObject = Items.get(object);
        if (this.check(object)) {
            this.location.addItem(object);
            dropObject.onGround = true;
            this.remove(object);
            dropObject.location = this.location.name;
            return `Dropped ${object}.`;
        }
        return `You don't have a ${object}.`;
    }
    break(object) {
        if (this.check(object)) {
            let item = Items.get(object);
            if (item.breaks) {
                if (item.breaks.creates) {
                    this.add(item.breaks.creates);
                }
                return item.breaks.text;
            }
            return `You attempt to smash the ${object} to no effect.`
        }
        else if (this.check(object, this.location)) {
            let item = Items.get(object);
            if (item.breaks) {
                if (item.breaks.creates) {
                    this.location.addItem(item.breaks.creates);
                }
                return item.breaks.text;
            }
            return `You attempt to smash the ${object} to no effect.`
        }
        return `I don't see a ${object} here.`
    }
    use(object, secondObject) {
        console.log(object);
        console.log(this.inventory);
        console.log(this.check(object));
        //check if first object is present
        if (this.check(object) || this.check(object, this.location)) {
            // using object "on" something
            if (secondObject) {
                //check if second object is in area
                if (this.check(secondObject, this.location)) {
                    console.log(Items.get(secondObject));
                    let used = Items.get(secondObject).use(object);
                    if (used) {
                        console.log(used.creates);
                        if (used.creates) {
                            this.location.addItem(used.creates);
                        }
                        //object is destroyed unless specified
                        if (used.destroy !== false) {
                            this.location.removeItem(secondObject);
                        }
                        return used.text;
                    }
                    return `Can't use ${object} on ${secondObject}.`;
                }
                //...or in inventory
                else if (this.check(secondObject)) {
                    let used = Items.get(secondObject).use(object);
                    if (used) {
                        if (used.creates) {
                            this.add(used.creates);
                        }
                        //object is destroyed unless specified
                        if (used.destroy !== false) {
                            this.remove(secondObject);
                        }
                        return used.text;
                    }
                    return `Can't use ${object} on ${secondObject}.`;
                }
                else {
                    return `There is no ${secondObject} here.`;
                }
            }
            // using object by itself
            else {
                //check if object is in area or in inventory
                if (this.check(object) || this.check(object, this.location.name)) {
                    let used = Items.get(object).use("player");
                    if (used) {
                        if (used.creates) {
                            this.add(used.creates);
                        }
                        //object is destroyed unless specified
                        if (used.destroy !== false) {
                            this.remove(secondObject);
                        }
                        return used.description;
                    }
                    return `Can't use ${object} by itself.`;
                }
                else {
                    return `There is no ${object} here.`
                }
            }
        }
        else { return `There is no ${object} here.`; }
    }
}

module.exports = Player;