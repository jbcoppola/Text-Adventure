﻿var classes = require("./classes/classes.js");
var Areas = require("./area-data.js");

let directions = ["north", "n", "south", "s", "east", "e", "west", "w", "southwest", "sw", "northwest", "nw", "northeast", "ne", "southwest", "se"];
let take = ["get", "take", "steal", "grab"];
let inventory = ["i", "inventory"];

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
            input = "northeast";a
            break;
    }
    return input;
}

function newInput(player, input) {
    let output = new classes.Output(input);

    input = input.toLowerCase();
    input = input.split(" ");

    if (player.location.name === "death room") {
        return player.look();
    }

    if (inventory.includes(input[0])) {
        output.add(player.listInventory());
        return output.text;
    }

    if (input[0] === "move" || input[0] === "go") {
        input.splice(0, 1);
    }

    let verb = input[0];
    input.splice(0, 1);

    if (directions.includes(verb)) {
        output.add(player.move(parseDirections(verb)));
        return output.text;
    }

    if (verb === "look") {
        if (input[0] === "at") {
            input.splice(0, 1);
            let noun = input.join(" ");
            output.add(player.examine(noun));
        }
        else if (input[0] === undefined) {
            output.add(player.look());
        }
        else {
            let noun = input.join(" ");
            output.add(player.examine(noun));
        }
    }
    else if (verb === "examine") {
        let noun = input.join(" ");
        output.add(player.examine(noun));
    }
    else if (take.includes(verb)) {
        let noun = input.join(" ");
        output.add(player.take(noun));
    }
    else if (verb === "drop") {
        let noun = input.join(" ");
        output.add(player.drop(noun));
    }
    else if (verb === "break") {
        let noun = input.join(" ");
        output.add(player.break(noun));
    }
    else if (verb === "use") {
        let noun;
        let secondNoun;
        if (input.includes("on")) {
            let onPos = input.indexOf("on");
            noun = input.slice(0, onPos).join(" ");
            secondNoun = input.slice(onPos + 1, input.length).join(" ");
        }
        else {
            noun = input.join(" ");
        }
        output.add(player.use(noun, secondNoun));
    }
    else {
        output.add(`Unrecognized command: ${verb}`);
    }
    return output.text;
}

module.exports = newInput;