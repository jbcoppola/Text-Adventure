import { Item, Coin, Area, Player, Output } from 'classes';
import { Areas } from 'area-data';


let directions = ["north", "n", "south", "s", "east", "e", "west", "w", "southwest", "sw", "northwest", "nw", "northeast", "ne", "southwest", "se"]

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
    let output = new Output(input);
    input = input.toLowerCase();
    if (directions.some(val => val === input)) {
        player.move(parseDirections(input));
        output.addWithBreaks(`You move ${input}.`);
    }
    
    return output.text;
}

export default newInput();