var Item = require("./classes/Item.js");

var itemData = [{
    "name": "scanner",
    "description": "A black card scanner. It looks like it's attached to a lock for the hood.",
    "breaks": {
        "text": "Your wrench bounces off the scanner to no effect. It feels like it was designed to resist exactly this type of force."
    },
    "used": [{
        "usedWith": "faculty ID",
        "text": "The scanner beeps and flashes green.",
    }]
},
{
    "name": "hood",
    "description": "The bus hood looks the worse for the wear. It's pitted and has rusted through in spots.",
    "breaks": {
        "text": "You manage to batter the lock open, and swing open the hood to a shower of rust.",
        "creates": "battery"
    }
},
{
    "name": "battery",
    "description": "Your trained eye recognizes this as a self-powered battery. It can recharge itself over time using ambient magic in the area. Creating one is extremely difficult and very few people can do it in modern times. This battery has markings that identify it as an ancient artifact.",
    "takeable": true,
    "breaks": {
        "text": "You attempt to smash the ancient battery, but can't even dent it."
    }
},
{
    "name": "gum",
    "description": "An ancient rubbery mass that somehow is still sticky. They don't make it like they used to.",
    "takeable": true,
    "onGround": true,
    "breaks": {
        "text": "You think better of touching the gum with your wrench."
    }
},
{
    "name": "panel",
    "description": "A metal panel. It looks like it could be opened at one point but is now stuck shut.",
    "breaks": [{
        "text": "You lever off the panel using a moderate amount of force",
        "creates": "wires"
    }]
},
{
    "name": "nozzles",
    "description": "The nozzles stick out from the ceiling pointed towards the seats.",
    "breaks": {
        "text": "Your wrench bounces off the nozzles. Seems they were made to be child-proof."
    },
    "used": [{
        "usedWith": "gum",
        "text": "You stick the gum into the nozzles, clogging them completely.",
    }]
},
{
    "name": "wires",
    "description": "A mass of wires. Some of them are bare, and you can feel the hum of energy coming off them. Seems dangerous.",
},
{
    "name": "bus seat",
    "description": "A seat that looks like it was made for children. Dry rot has decayed some of the leather, exposing the foam underneath.",
    "used": [{
        "usedWith": "wires",
        "text": "You use your wrench to pull a bare wire to touch the exposed foam. Within moments it catches alight."
    }]
},
{
    "name": "fire escape",
    "description": "The fire escape seems largely intact. It has a lever you can pull to release the door in case of fire.",
    "used": [{
        "usedWith": "player",
        "text": "You pull the lever and the door falls off, leaving a hole you clamber though back into the clearing."
    }]
},
{
    "name": "window",
    "description": "The windows are thick and have metal mesh running through them. They don't even have a way to open them.",
    "breaks": {
        "text": "You batter the window, but the glass doesn't even crack. No wonder it's lasted all this time."
    }
}];

var Items = itemData.map(item => new Item(item));
Items.get = function (itemName) {
    return this.find(item => item.name === itemName);
};

module.exports = Items;