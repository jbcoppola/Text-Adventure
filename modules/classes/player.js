var classes = require("./classes.js");
var Areas = require("./../area-data.js");
var Items = require("./../item-data.js");
var Events = require("./../event-data.js")

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
        if (this.checkAlias(object)) { object = this.getAlias(object); }
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
                if (newObject.event) {
                    return this.event(newObject.event);
                }
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
        let inLocation = this.check(object, this.location);
        let inInv = this.check(object);
        if (inLocation || inInv) {
            let item = Items.get(object);
            if (item.breaks) {
                if (!item.breaks.destroy) {
                    if (inInv) {
                        this.inventory.remove(object);
                    }
                    if (inLocation) {
                        this.location.removeItem(object);
                    }
                }
                if (item.breaks.creates) {
                    for (let createdItem of item.breaks.creates) {
                        if (inInv) {
                            this.add(createdItem);
                        }
                        if (inLocation) {
                            this.location.addItem(createdItem);
                        }
                    }
                }
                if (item.breaks.newDesc) {
                    this.location.changeDesc(item.breaks.oldDesc, item.breaks.newDesc);
                }
                if (item.breaks.event) {
                    return this.event(item.breaks.event);
                }
                return item.breaks.text;
            }
            return `You attempt to smash the ${object} to no effect.`
        }
        return `I don't see a ${object} here.`
    }
    event(eventName) {
        let event = Events.get(eventName);
        if (event.addInventory) {
            player.addInventory(event.addInventory);
        }
        if (event.removeInventory) {
            player.removeInventory(event.removeInventory);
        }
        if (event.moveTo) {
            player.transport(event.moveTo);
        }
        if (event.location) {
            for (let area of event.location) {
                let location = Areas.get(area.name);
                if (area.newDesc) {
                    location.changeDesc(event.location.oldDesc, event.location.newDesc);
                }
                if (area.creates) {
                    for (let item of area.creates) {
                        location.addItem(item);
                    }
                }
                if (area.removes) {
                    location.removeItem(event.location.removes);
                }
                if (area.removeExit) {
                    location.splice(location.exits.findIndex(exit => exit.name === event.location.removeExit), 1);
                }
                if (area.addExit) {
                    location.push(event.location.addExit);
                }
            }
        }
        if (event.items) {
            for (let item of event.items) {
                let changedItem = Items.get(item.name);
                if (item.oldDesc) {
                    //change description
                    changedItem.description.replace(item.oldDesc, item.NewDesc)
                }
                if (item.event) {
                    if (item.event === "none") {
                        changedItem.event = "";
                    }
                    else { changedItem.event = item.event; }
                }
                if (item.breaks) {
                    if (item.breaks.text) {
                        changedItem.breaks.text = item.breaks.text;
                    }
                    if (item.breaks.newDesc) {
                        changedItem.breaks.newDesc = item.breaks.newDesc;
                        changedItem.breaks.oldDesc = item.breaks.oldDesc;
                    }
                    if (item.breaks.creates) {
                        changedItem.breaks.creates = item.breaks.creates;
                    }
                    if (item.breaks.event) {
                        changedItem.breaks.event = item.breaks.event;
                    }
                }
                if (item.used) {
                    for (let usecase of item.used) {
                        //replace usecase with event usecase
                        let changedUse = changedItem.used.find(use => use.name === usecase.name);
                        if (changedUse) { changedUse = usecase; };
                    }
                }
            }
        }
        return event.text;
    }
    use(object, secondObject) {
        if (this.checkAlias(object)) { object = this.getAlias(object); }
        if (this.checkAlias(secondObject)) { secondObject = this.getAlias(secondObject); }

        //check if first object is present
        if (this.check(object) || this.check(object, this.location)) {
            // using object "on" something
            if (secondObject) {
                return this.checkObjectUse(object, secondObject)
            }
            // using object by itself
            else {
                //check for using object with player
                return this.checkObjectUse("player", object)
            }
        }
        else {
            return `There is no ${object} here.`;
        }
    }
    checkObjectUse(checkedObject, useOn) {
        let used = Items.get(useOn).use(checkedObject);
        let inLocation = this.check(useOn, this.location);
        let inInv = this.check(useOn);
        if (used) {
            if (used.creates) {
                for (let item of used.creates) {
                    if (inLocation) {
                        this.location.addItem(item);
                    }
                    else if (inInv) {
                        this.add(item);
                    }
                }
            }
            //object is destroyed unless specified
            if (used.destroy !== false) {
                if (inLocation) {
                    this.location.removeItem(checkedObject);
                }
                else if (inInv || useOn === "player") {
                    this.remove(checkedObject)
                }
            }
            if (used.move) {
                this.transport(used.move);
            }
            if (used.event) {
                return this.event(used.event);
            }
            if (used.text) {
                return used.text;
            }
        }
        if (useOn === "player") {
            return `Can't use ${checkedObject}.`;
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