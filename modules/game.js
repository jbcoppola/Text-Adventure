window.onload = function () {
    player = new Player();
    console.log(player);
    let output = document.querySelector(".output");
    output.innerText = player.location.description;
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        let input = document.querySelector("input").value;
        output.innerText += newInput(input.value);
    });
}


class Item {
    constructor(name, description, value = 0, usedWith = "", usedText = "") {
        this.name = name;
        this.description = description;
        this.value = value;
        this.use = { with: usedWith, text: usedText };
    }
    print() {
        return `Name: ${this.name}; Description: ${this.description}; Value: ${this.value}`;
    }
    use(object) {
        if (object.name === this.use.usedWith) {
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
        this.location = Areas.get("Start");
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
        // using object "on" something
        if (secondObject) {
            //check if second object is in area or on player
            if (Area.items.some(name === secondObject) || this.inventory.some(name === secondObject)) {
                //check if player has first object
                if (this.inventory.some(name === object)) { return secondObject.use(object); }
                else { return `You don't have a ${object}.`; }
            }
            else {
                return `There is no ${secondObject} here.`;
            }
        }
        // using object by itself
        else {
            if (Area.items.some(name === object) || this.inventory.some(name === object)) {
                object.use("player");
            }
            else { return `You don't have a ${object}.`; }
        }
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

var areaData = [{
    "name": "Start",
    "description": "Starting room. Boring.",
    "exits": [{
        "cardinal": "North",
        "destination": "North Room",
        "description": "Path to north room"
    }],
    "items": [{
        "name": "Rock",
        "description": "A rock.",
        "value": 0
    }]
}, {
    "name": "North Room",
    "description": "The room in the north.",
    "exits": [{
        "cardinal": "South",
        "destination": "Start Room",
        "description": "Path to start"
    }],
    "items": [{
        "name": "Stick",
        "description": "A stick.",
        "value": 0
    }]
}];

var Areas = areaData.map(area => new Area(area));
Areas.get = function (roomName) {
    return Areas.find(room => room.name === roomName);
};

let directions = ["north", "n", "south", "s", "east", "e", "west", "w", "southwest", "sw", "northwest", "nw", "northeast", "ne", "southwest", "se"];
let take = ["get", "take", "steal", "grab"];

function parseDirections(input) {
    switch (input) {
        case "n":
        case "north":
            input = "north";
            break;
        case "s":
        case "south":
            input = "south";
            break;
        case "e":
        case "east":
            input = "east";
            break;
        case "w":
        case "west":
            input = "west";
            break;
        case "nw":
        case "northwest":
            input = "northwest";
            break;
        case "sw":
        case "southwest":
            input = "southwest";
            break;
        case "se":
        case "southeast":
            input = "southeast";
            break;
        case "ne":
        case "northeast":
            input = "northeast";
            break;
    }
    return input;
}

function newInput(input) {
    console.log("running");
    let output = new Output(input);

    input = input.toLowerCase();
    input = input.split(" ");

    if (input[0] === "move" || input[0] === "go") {
        input.splice(0, 1);
    }

    let verb = input[0];
    input.splice(0, 1);

    if (directions.includes(verb)) {
        player.move(parseDirections(input));
        output.addWithBreaks(`You move ${input}.`);
        return output.text;
    }

    if (verb === "look") {
        if (input[0] === "at") {
            verb = "examine";
            input.splice(0, 1);
        }
        else if (input[0] === undefined) {
            output.addWithBreaks(player.look());
        }
        else {
            output.addWithBreaks(player.examine(input[0]));
        }
    }

    if (input.includes("on")) {
        let onPos = indexOf("on");
        let noun = input.slice(0, onPos - 1).join(" ");
        let secondNoun = input.slice(onPos + 1, input.length);
    }
    else {
        let noun = input.join(" ");

        if (verb === "examine") {
            output.addWithBreaks(player.examine(noun));
        }
        else if (take.includes(verb)) {
            output.addWithBreaks(player.take(noun));
        }
        else if (verb === "use") {
            output.addWithBreaks(player.use(noun, secondNoun));
        }
    }
    return output.text;
}


/*
GAMEPLAY LOOP:

Everything is created
Waits for input
User inputs text
Parses text
Updates conditions
Outputs text
Waits for input

*/