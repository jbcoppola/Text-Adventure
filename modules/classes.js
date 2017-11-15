class Item {
    constructor({ name, description, value = 0, takeable = true, used = {}}) {
        this.name = name;
        this.description = description;
        this.value = value;
        this.takeable = takeable;
        this.used = { with: used.with, text: used.text };
    }
    print() {
        return `Name: ${this.name}; Description: ${this.description}; Value: ${this.value}`;
    }
    use(object) {
        if (object === this.used.with) {
            return this.used.text;
        }
        else if (object === "player") {
            return `Use ${this.name} on what?`;
        }
        else {
            return `Can't use ${object} on ${this.name}.`;
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
    constructor({ name, description, exits=[], items=[] }) {
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
        let output;
        if (this.items.length !== 0) {
            output = `On the ground there is `
            for (let i = 0; i < this.items.length; i++) {
                output += `a ${this.items[i].name}`
                if (i + 1 !== this.items.length) {
                    output += ', ';
                    if (i + 2 === this.items.length) {
                        output += 'and ';
                    }
                }
            }
            output += '.';
        }
        return output;
    }
    describe() {
        let output = `${this.description}\n\n`;
        if (this.listExits !== undefined) {
            output += `${this.listExits()}\n`;
        }
        if (this.listItems() !== undefined) {
            output += `${this.listItems()}`;
        }
        return output;
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

