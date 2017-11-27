var classes = require("./classes/classes.js");
var Areas = require("./area-data");
var Items = require("./item-data")
var newInput = require("./engine");

window.onload = function () {
    player = new classes.Player();
    let output = document.querySelector(".output");
    output.innerHTML = `<div><p>${player.location.describe()}<p><div>`;
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        let input = document.querySelector("input");
        output.innerHTML += newInput(player, input.value);
        input.value = "";
    });
};