var Items = require("./../item-data.js");

class Area {
    constructor({ name, description, exits=[], items=[], aliases=[] }) {
        this.name = name;
        this.description = description;
        this.exits = exits;
        this.items = items;
        this.aliases = new Map();
        for (let item of this.items) {
            item = Items.get(item);
            this.aliases.set(item.name, item.aliases);
        }
    }
    check(item) {
        return this.items.includes(item);
    }
    addItem(item) {
        this.items.push(item);
        item = Items.get(item);
        this.aliases.set(item.name, item.aliases);
        return this;
    }
    addItems(...items) {
        items.forEach(item => addItem(item));
        return this;
    }
    removeItem(item) {
        var i = this.items.indexOf(item);
        this.items.splice(i, 1);
        this.aliases.delete(item);
        return this;
    }
    removeItems(...items) {
        items.forEach(item => removeItem(item));
        return this;
    }
    changeDesc(oldDesc, newDesc) {
        this.description = this.description.replace(oldDesc, newDesc);
    }
    listExits() {
        let output = "<li>";
        for (let exit of this.exits) {
            output += `<ul>To the ${exit.cardinal} there is ${exit.description}.</ul>`;
        }
        output += "</li>"
        return output;
    }
    //lists every item on ground (for items dropped by player or just lying around)
    listItems() {
        let output;
        //index of last item in area on the ground
        let onGroundItems = this.items.map(item => Items.get(item)).filter(item => item.onGround);

        //formatting the grammar for listed objects
        if (onGroundItems.length > 0) {
            output = `On the ground there is `;
            for (let i = 0; i < onGroundItems.length; i++) {
                if (i === onGroundItems.length - 1 && i !== 0) {
                    output += 'and ';
                }
                output += `a ${onGroundItems[i].name}`;
                //check that the array isn't about to end and at least one item left is on ground
                if (i < onGroundItems.length - 1) {
                    output += ', ';
                }
            }
            output += '.';
        }
        return output;
    }
    describe() {
        let output = `${this.description}`;
        if (this.listExits !== undefined) {
            output += `${this.listExits()}`;
        }
        if (this.listItems() !== undefined) {
            output += `</p><p>${this.listItems()}`;
        }
        return output;
    }
}

module.exports = Area;