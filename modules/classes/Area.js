var Items = require("./../item-data.js");

class Area {
    constructor({ name, description, exits=[], items=[] }) {
        this.name = name;
        this.description = description;
        this.exits = exits;
        this.items = items;
    }
    check(item) {
        return this.items.includes(item);
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
            output += `To the ${exit.cardinal} there is a ${exit.description}.\n`;
        }
        return output;
    }
    //lists every item on ground (for items dropped by player or just lying around)
    listItems() {
        let output;
        //index of last item in area on the ground
        let onGroundItems = this.items.map(item => Items.get(item)).filter(item => item.onGround);
        let lastOnGround = onGroundItems.length - onGroundItems.slice().reverse().findIndex(item => item.onGround) - 1;

        //formatting the grammar for listed objects
        if (onGroundItems.length > 0) {
            output = `\nOn the ground there is `;
            for (let i = 0; i < onGroundItems.length; i++) {
                if (i === lastOnGround && i !== 0) {
                    output += 'and ';
                }
                output += `a ${onGroundItems[i].name}`;
                //check that the array isn't about to end and at least one item left is on ground
                if (i < lastOnGround) {
                    output += ', ';
                }
            }
            output += '.';
        }
        return output;
    }
    describe() {
        let output = `${this.description}\n\n`;
        if (this.listExits !== undefined) {
            output += `${this.listExits()}`;
        }
        if (this.listItems() !== undefined) {
            output += `${this.listItems()}`;
        }
        return output;
    }
}

module.exports = Area;