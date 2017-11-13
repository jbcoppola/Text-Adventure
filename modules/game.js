var classes = require("./classes");
var Player = require("./player");
var Areas = require("./area-data");
var newInput = require("./engine");

window.onload = function () {
    player = new Player();
    console.log(player);
    let output = document.querySelector(".output");
    output.innerText = `${player.location.describe()}\n\n`;
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        let input = document.querySelector("input");
        output.innerText += newInput(player, input.value);
        input.value = "";
    });
}