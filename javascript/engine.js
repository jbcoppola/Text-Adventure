import { Item, Coin, Area, Player, Output } from 'classes';
import { Areas } from 'area-data';

let directions = ["north", "n", "south", "s", "east", "e", "west", "w", "southwest", "sw", "northwest", "nw", "northeast", "ne", "southwest", "se"]
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
    let output = new Output(input);

    input = input.toLowerCase();
    input = input.split("");
    let verb = input[0];

    if (verb === "move" || verb === "go") {
        verb = input[1];
    }
    if (directions.includes(verb)) {
        player.move(parseDirections(input));
        output.addWithBreaks(`You move ${input}.`);
        return output.text;
    }
    
    if (verb === "look") {
        if (input[1] === "at") {
            verb = "examine";
            input.splice(1, 1);
        }
        else if (input[1] === undefined) {
            output.addWithBreaks(player.look());
        }
        else {
            output.addWithBreaks(`I don't know what ${input[1]} is.`);
        }
    };

    if (verb === "examine" || verb) { };
    else if (take.includes(verb)) { };
    else if () { };
    
    return output.text;
}

export default newInput();