import { newInput } from 'engine';

document.onload = function () {
    let player = new Player();
    let input = document.querySelector(input);
    let output = document.querySelector(".output");

    input.addEventListener("submit", function () {
        while(true) {
            output.innerText += newInput(input.value);
        }
    })
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