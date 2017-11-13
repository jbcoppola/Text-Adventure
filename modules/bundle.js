/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

﻿var classes = __webpack_require__(1);
var Player = __webpack_require__(5);
var Areas = __webpack_require__(4);
var newInput = __webpack_require__(2);

window.onload = function () {
    player = new Player();
    console.log(player);
    console.log(Areas);
    let output = document.querySelector(".output");
    output.innerText = `${player.location.describe()}\n\n`;
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        let input = document.querySelector("input");
        output.innerText += newInput(player, input.value);
        input.value = "";
    });
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

﻿class Item {
    constructor({ name, description, value = 0, used = {}}) {
        this.name = name;
        this.description = description;
        this.value = value;
        this.used = { with: used.With, text: used.Text };
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
        let output = `On the ground there is: `
        for (let item of this.items) {
            output += `${item.name}`
            console.log(item);
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



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

﻿var classes = __webpack_require__(1);
var player = __webpack_require__(5);
var Areas = __webpack_require__(4);

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

function newInput(player, input) {
    let output = new classes.Output(input);

    input = input.toLowerCase();
    input = input.split(" ");

    if (input[0] === "move" || input[0] === "go") {
        input.splice(0, 1);
    }

    let verb = input[0];
    input.splice(0, 1);

    if (directions.includes(verb)) {
        output.addWithBreaks(player.move(parseDirections(verb)));
        output.addWithBreaks(player.location.describe());
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
            output.addWithBreaks(player.use(noun));
        }
    }
    return output.text;
}

module.exports = newInput;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

﻿var classes = __webpack_require__(1);

var areaData = [{
    "name": "Start Room",
    "description": "Starting room. Boring.",
    "exits": [{
        "cardinal": "north",
        "destination": "North Room",
        "description": "path to north room"
    }],
    "items": [{
        "name": "Rock",
        "description": "A rock.",
        "value": 0
    },
    {
        "name": "Rock 2",
        "description": "The sequel to rock.",
        "value": 0
    }]
}, {
    "name": "North Room",
    "description": "The room in the north.",
    "exits": [{
        "cardinal": "south",
        "destination": "Start Room",
        "description": "path to the start"
    }],
    "items": [{
        "name": "Stick",
        "description": "A stick.",
        "value": 0
    }]
}];

var Areas = areaData.map(area => new classes.Area(area));
Areas.get = function (roomName) {
    return Areas.find(room => room.name === roomName);
};

module.exports = Areas;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

﻿var classes = __webpack_require__(1);
var Areas = __webpack_require__(4);

class Player {
    constructor() {
        this.inventory = [];
        this.location = Areas.get("Start Room");
    }
    printInventory() {
        for (let item of this.inventory) {
            console.log(item);
        }
    }
    transport(roomName) {
        let newRoom = Areas.get(roomName);
        if (newRoom) { this.location = newRoom; }
        else { console.log("Error: invalid room name passed to transport") };
    }
    move(direction) {
        if (this.location.exits.some(exit => exit.cardinal === direction)) {
            this.transport(this.location.exits.find(exit => exit.cardinal === direction).destination);
            return `You move ${direction}.`;
        }
        else { return `You can't go ${direction} here.`; }
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
        if (this.location.items.some(item => item.name.toLowerCase() === object)) {
            this.inventory.push(this.location.items.find(item => item.name.toLowerCase() === object));
            this.location.removeItem(this.location.items.find(item => item.name.toLowerCase() === object));
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
            if (this.location.items.some(item => item.name.toLowerCase() === secondObject) || this.inventory.some(item => item.name.toLowerCase() === secondObject)) {
                //check if player has first object
                if (this.inventory.some(item => item.name.toLowerCase() === object)) { return secondObject.use(object); }
                else { return `You don't have a ${object}.`; }
            }
            else {
                return `There is no ${secondObject} here.`;
            }
        }
        // using object by itself
        else {
            if (this.location.items.some(item => item.name.toLowerCase() === object)) {
                return this.location.items.find(item => item.name.toLowerCase() === object).use("player");
            }
            else if (this.inventory.some(item => item.name.toLowerCase() === object)) {
                return this.inventory.find(item => item.name.toLowerCase() === object).use("player");
            }
            else { return `You don't have a ${object}.`; }
        }
    }
}

module.exports = Player;

/***/ })
/******/ ]);