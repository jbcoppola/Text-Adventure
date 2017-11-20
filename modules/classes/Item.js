var UseCase = require('./UseCase.js')

class Item {
    constructor({ name, aliases=[name], description, value = 0, takeable = false, breaks, onGround = false, used = [] }) {
        this.name = name;
        this.aliases = aliases;
        this.description = description;
        this.value = value;
        //what happens when player tries to break the object
        this.breaks = breaks;
        //for listing whether item is on ground (applies to dropped objects)
        this.onGround = onGround;
        //whether the player can add the item to inventory
        this.takeable = takeable;
        this.used = [];
        //every item used on the item has different result
        for (let useCase of used) {
            let newUseCase = new UseCase(useCase);
            this.used.push(newUseCase);
        }
    }
    use(object) {
        return this.used.find(useCase => useCase.usedwith === object);
    }
    check(location) {
        if (location) { return this.location === location; }
        else { return this.location === "inventory"; }
    }
}

module.exports = Item;

