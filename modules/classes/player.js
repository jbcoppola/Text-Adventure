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
            if (value.some(name => name === object)) {
                return true;
            }
        }
        return false;
    }
    getAlias(object) {
        for (let [key, value] of this.location.aliases.entries()) {
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
        this.inventory.splice(this.inventory.indexOf(object), 1);
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
            if (newObject.takeable) {
                this.add(object);
                this.location.removeItem(object);
                newObject.onGround = false;
                return `Got ${object}.`;
            }
            else { return `Can't take ${object}.`; }
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
                if (item.breaks.newDesc) {
                    this.location.changeDesc(item.breaks.oldDesc, item.breaks.newDesc);
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
                if (item.breaks.newDesc) {
                    this.location.changeDesc(item.breaks.oldDesc, item.breaks.newDesc);
                }
                return item.breaks.text;
            }
            return `You attempt to smash the ${object} to no effect.`
        }
        return `I don't see a ${object} here.`
    }
    use(object, secondObject) {
        //check if first object is present
        if (this.check(object) || this.check(object, this.location)) {
            // using object "on" something
            if (secondObject) {
                return this.checkObjectUse(object, secondObject)
            }
            // using object by itself
            else {
                //check for using object with player
                return this.checkObjectUse(object, "player")
            }
        }
        else {
            return `There is no ${object} here.`;
        }
    }
    checkObjectUse(checkedObject, useOn) {
        let used = Items.get(checkedObject).use(useOn);
        let inLocation = this.check(checkedObject, this.location);
        let inInv = this.check(checkedObject);
        if (used) {
            if (used.creates) {
                if (inLocation) {
                    this.location.addItem(used.creates);
                }
                else if (inInv) {
                    this.add(used.creates);
                }
            }
            //object is destroyed unless specified
            if (used.destroy !== false) {
                if (inLocation) {
                    this.location.removeItem(checkedObject);
                }
                else if (inInv) {
                    this.remove(checkedObject)
                }
            }
            if (used.move) {
                this.transport(used.move);
            }
            if (used.text) {
                return used.text;
            }
        }
        if (useOn === "player") {
            return `Can't use ${checkedObject} on self.`;
        }
        else if (useOn) {
            return `Can't use ${checkedObject} on ${useOn}.`;
        }
        else {
            return `There is no ${checkedObject} here.`;
        }
    }
}



module.exports = Player;