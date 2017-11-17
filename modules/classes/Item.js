class Item {
    constructor({ name, description, location, value = 0, takeable = true, onGround = false, used=[] }) {
        this.name = name;
        this.description = description;
        //inventory or room
        this.location = location;
        this.value = value;
        //for listing whether item is on ground (applies to dropped objects)
        this.onGround = onGround;
        //whether the player can add the item to inventory
        this.takeable = takeable;
        this.used = [];
        //every item used on the item has different result
        for (let usedItem of used) {
            this.used.push({
                //items the item can be used with, 
                with: usedItem.with,
                //the description of what happens when used
                text: usedItem.text,
                // whether item is destroyed on use
                destroy: usedItem.destroy,
                // what the item creates after use
                creates: usedItem.creates
            });
        }
    }
    use(object) {
        if (object === this.some(item => item.used.with === object)) {
            return this.used.find(item => item.used.with === object).text;
        }
        else if (object === "player") {
            return `Use ${this.name} on what?`;
        }
        else {
            return `Can't use ${object} on ${this.name}.`;
        }
    }
    move(location) {
        this.location = location;
    }
    check(location) {
        if (location) { return this.location === location; }
        else { return this.location === "inventory"; }
    }
}

module.exports = { Item };

