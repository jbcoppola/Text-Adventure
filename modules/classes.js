class Item {
    constructor(name, description, value = 0, usedWith = "", usedText = "") {
        this.name = name;
        this.description = description;
        this.value = value;
        this.used = { with: usedWith, text: usedText };
    }
    print() {
        return `Name: ${this.name}; Description: ${this.description}; Value: ${this.value}`;
    }
    use(object) {
        if (object === this.use.usedWith) {
            return this.use.text;
        }
        else if (object === "player") {
            return `Use ${this.name} on what?`;
        }
        else {
            return `Can't use ${object.name} on ${this.name}.`;
        }
    }
}

class Coin extends Item {
    constructor(amt) {
        this.amt = amt;
        super("Coin", "An assortment of coins and precious metals.", this.amt);
    }
}

class Area {
    constructor({ name, description, exits = [], items = [] }) {
        this.name = name;
        this.description = description;
        this.exits = exits;
        this.items = [];
        for (let item of items) {
            let newItem = new Item(item);
            this.items.push(newItem);
        }
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
    listExits() {
        let output = "";
        for (let exit of this.exits) {
            output += `To the ${exit.cardinal} there is a ${exit.description}.\n`
        }
        return output;
    }
    listItems() {
        let output = `On the ground there is: `
        for (let item of this.items) {
            output += `${item.name}`;
        }
        output += '.';
        return output;
    }
    describe() {
        return `${this.description}\n\n${this.listExits()}\n${this.listItems()}`;
    }
}

class Output {
    constructor(input) {
        this.text = `> ${input}\n\n`;
    }
    add(text) {
        this.text += `${text}`;
    }
    addWithBreaks(text) {
        this.text += `${text}\n\n`;
    }
}

module.exports = { Item, Coin, Area, Output };

