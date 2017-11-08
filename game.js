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