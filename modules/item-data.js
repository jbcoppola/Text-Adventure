﻿var Item = require("./classes/Item.js");

var itemData = [{
    "name": "scanner",
    "aliases": ["scanner", "black scanner", "card scanner", "hood scanner", "bus scanner"],
    "description": "A black card scanner. It looks like it's attached to a lock for the hood.",
    "breaks": {
        "text": "Your wrench bounces off the scanner to no effect. It feels like it was designed to resist exactly this type of force."
    },
    "used": [{
        "usedWith": "faculty ID",
        "event": "scan faculty ID"
    }]
},
{
    "name": "hood",
    "aliases": ["hood", "bus hood", "engine hood", "car hood"],
    "description": "The bus hood looks the worse for the wear. It's pitted and has rusted through in spots.",
    "breaks": {
        "event": "break hood"
    }
    },
{
    "name": "engine",
    "aliases": ["engine", "bus engine", "car engine"],
    "description": "What isn't covered with rust is blackened by oil, save for the area around the battery casing."
    },
{
    "name": "battery",
    "aliases": ["battery", "engine battery", "battery casing"],
    "description": "Your trained eye recognizes this as a self-powered battery. It can recharge itself over time using ambient magic in the area. Creating one is extremely difficult and very few people can do it in modern times. This battery has markings that identify it as an ancient artifact.",
    "takeable": true,
    "event": "took battery",
    "breaks": {
        "text": "You attempt to smash the ancient battery, but can't even dent it."
    }
},
{
    "name": "golem",
    "aliases": ["golem", "driver", "bus golem", "bus driver", "machine"],
    "description": "The golem is attached to the floor at the front of the bus. It is a hulking metal machine, apparently powered by a glowing crystal in its chest. Its head is a domed helmet with glowing eyes. It has two enormous arms, one which ends in a humanoid hand, and the other ending in a complicated device you can't identify the function of.\n\nThe golem is watching you with a blank stare.",
    "breaks": {
        "text": "You swing your wrench at the golem, but it effortlessly catches the wrench in its hand and flings you back.\n\n'TAKE A SEAT UNTIL WE ARRIVE AT SCHOOL, PRECOCIOUS YOUNGSTER.'"
    }
},
{
    "name": "gum",
    "aliases": ["gum", "chewing gum", "floor gum"],
    "description": "An ancient rubbery mass that somehow is still sticky. They don't make it like they used to.",
    "takeable": true,
    "onGround": true,
    "breaks": {
        "text": "You think better of touching the gum with your wrench."
    }
},
{
    "name": "bag",
    "aliases": ["bag", "satchel", "floor bag"],
    "description": "What looks to be a leather satchel lying on the ground. Its material is snagged under the seat. It's lumpy enough that you think something must be inside it.",
    "onGround": true,
    "breaks": {
        "text": "The bag is under the seat and out of reach of your wrench."
    },
    "used": [{
        "usedWith": "player",
        "text": "You open the bag. Inside you see an ID and a book.",
        "creates": ["faculty ID", "textbook"]
    }]
},
{
    "name": "faculty ID",
    "aliases": ["faculty ID", "faculty card", "ID", "card", "faculty id", "id", "Id", "faculty Id"],
    "takeable": true,
    "onGround": true,
    "description": "A faded glossy square of official-looking text. You can't read it, but it looks like identification."
},
{
    "name": "textbook",
    "aliases": ["textbook", "book", "magic book", "bag book"],
    "takeable": true,
    "onGround": true,
    "description": "Though you can't read the text, this book has several diagrams throughout that seem to indicate it's a teacher's book to help teach concepts of ancient magical theory to students. This is a valuable find!",
    "value": 1000
},
{
    "name": "panel",
    "aliases": ["panel", "panels", "metal panel", "wall panel", "cover panel"],
    "description": "A metal panel. It looks like it could be opened at one point but is now stuck shut.",
    "breaks": {
        "text": "You lever off the panel using a moderate amount of force. The section behind is filled with wires.",
        "oldDesc": "The walls next to the seats are covered with metal panels.",
        "newDesc": "The walls next to the seats are covered with metal panels, one of which is open, revealing exposed wires.",
        "creates": ["live wires"]
    }
},
{
    "name": "nozzles",
    "aliases": ["nozzle", "nozzles", "ceiling nozzles", "fire nozzles", "sprinkler", "sprinklers"],
    "description": "The nozzles stick out from the ceiling pointed towards the seats.",
    "breaks": {
        "text": "Your wrench bounces off the nozzles. Seems they were made to be child-proof."
    },
    "used": [{
        "usedWith": "gum",
        "event": "clog nozzles",
    }]
},
{
    "name": "live wires",
    "aliases": ["live wires", "live wire", "wire", "wires", "electric wires", "bare wire", "bare wires"],
    "description": "A mass of wires. Some of them are bare, and you can feel the hum of energy coming off them. Seems dangerous.",
    "destroy": false
},
{
    "name": "dead wires",
    "aliases": ["dead wires", "dead wire", "wire", "wires", "electric wires", "bare wire", "bare wires"],
    "description": "A mass of wires. Some of them are bare, but you can't feel any energy.",
},
{
    "name": "bus seat",
    "aliases": ["seat", "seats", "bus seat", "leather seat"],
    "description": "A seat that looks like it was made for children. Dry rot has decayed some of the leather, exposing the foam underneath.",
    "used": [{
        "usedWith": "live wires",
        "event": "lit fire failure",
        "destroy": false
    },
    {
        "usedWith": "dead wires",
        "text": "You use your wrench to pull a wire to touch the bare foam of the seat, but nothing happens. Seems like there's no power."
    }
    ]
},
{
    "name": "flaming bus seat",
    "aliases": ["seat", "seats", "bus seat", "leather seat", "flaming seat", "on fire seat", "firey seat", "burning seat"],
    "description": "The seat is blazing, spewing acrid smoke into the air. Some unscrupulous person appears to have set it on fire."
},
{
    "name": "fire escape",
    "aliases": ["escape", "fire escape", "exit", "fire exit", "fire door"],
    "description": "The fire escape seems largely intact. It has a lever you can pull to release the door in case of fire.",
    "breaks": {
        "text": "You attempt to smash through, but the fire escape is remarkably sturdy for something made to allow people to escape in an emergency."
    },
    "used": [{
        "usedWith": "player",
        "event": "fire escape used failure"
    }]
},
{
    "name": "windows",
    "aliases": ["windows", "window", "bus window", "bus windows", "side windows"],
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