class Item {
    constructor(name, description, value = 0) {
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
        if (this.location.items.some(name === object)) {
            this.inventory.push(this.location.items.find(name === object));
            this.location.removeItem(this.location.items.find(name === object));
            return `Got ${object}.`;
        }
        else {
            return `I don't see that here.`;
        }
    }
    use(object, secondObject) {

    }
}

class Output {
    constructor(input) {
        this.text = `> ${input}\n\n`;
    }
    add(text) {
        this.text += `${text}`
    }
    addWithBreaks(text) {
        this.text += `${text}\n\n`
    }
}

export { Item, Coin, Area, Player, Output }

