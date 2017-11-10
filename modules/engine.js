import { Item, Coin, Area, Player, Output } from './classes.js';
import Areas from './area-data.js';

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

export default function newInput(input) {
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