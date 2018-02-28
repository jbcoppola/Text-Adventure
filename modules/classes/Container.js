var Item = require('./Item.js');

class Container extends Item {
    constructor({ name, aliases = [name], description, event, value = 0, takeable = false, breaks, onGround = false, used = [], items, locked=false }) {
        super({ name, aliases, description, event, value, takeable, breaks, onGround, used });
        this.isOpen = false;
        this.locked = locked;
        this.items = [];
        for (let item of items) {
            this.items.push(item);
        }
        
    }
    add(item) {
        this.items.push(item);
    }
    remove(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }
    describe() {
        let text = this.description;
        if (this.isOpen) {
            text += `</p><p>The ${this.name} is open. ${this.listItems()}`;
        }
        return text;
    }
    listItems() {
        let text;
        if (this.items.length > 0) {
            text = `Inside you see `;
            for (let i = 0; i < this.items.length; i++) {
                if (i + 1 === this.items.length && i !== 0) {
                    text += "and ";
                }
                text += `a ${this.items[i]}`;
                if (i + 1 < this.items.length) {
                    text += ', ';
                }
                else { text += '.'; }
            }
        }
        else { text = `There is nothing inside.`; }
        return text;
    }
}

module.exports = Container;

