import newInput from './engine.js';

window.onload = function () {
    console.log("started");
    let player = new Player();
    let output = document.querySelector(".output");
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("working");
        let input = document.querySelector(input).value;
        output.innerText += newInput(input.value);
    });
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