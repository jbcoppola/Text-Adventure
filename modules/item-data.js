var Item = require("./classes/Item.js");
var Container = require("./classes/Container.js");

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
    "items": ["faculty ID", "textbook"]
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
},
{
    "name": "office window",
    "aliases": ["window", "shattered window", "office window", "back wall"],
    "description": "The back wall was once a single window, but broke at some point. Now it's just a big frame with bits of broken glass at the edges.",
    "breaks": {
        "text": "There's nothing left to break."
    }
},
{
    "name": "desk",
    "aliases": ["desk", "office desk, metal desk, CEO desk"],
    "description": "The desk is large and imposing. It probably belonged to some bigshot.",
    "breaks": {
        "text": "You put several new dents in the desk, but its construction is too solid to destroy it outright."
    },
    "items": ["lighter", "notepad", "desk toy"]
},
{
    "name": "lighter",
    "takeable": true,
    "aliases": ["lighter"],
    "description": "A golden lighter. Looks barely used."
},
{
    "name": "notepad",
    "takeable": true,
    "aliases": ["notepad", "pad", "paper pad"],
    "description": "A paper pad for writing notes. Looks like there a few papers have been torn off."
},
{
    "name": "desk toy",
    "takeable": true,
    "aliases": ["desk toy", "toy", "decoration", "desk decoration", "metal toy"],
    "description": "Some kind of fiddly metal toy for decorating a desk. The metal is unusual and might be worth something."
},
{
    "name": "office chair",
    "aliases": ["chair", "leather chair", "office chair", "CEO chair", "big chair", "comfortable chair"],
    "description": "The chair is big, leather, and luxurious - at least, it was before time wore away at it. Now it's dingy and faded."
},
{
    "name": "trashcan",
    "aliases": ["trash", "trash can", "trashcan", "bin", "trash bin", "dustbin", "foot lever", "lever"],
    "description": "The metal trash can is rusted but intact. It has a foot lever to open the top.",
    "breaks": {
        "text": "You smash open the trash can. Foot levers are for wimps!\n\nInside you see several memos.",
        "event": "open trash can"
    },
    "used": [{
        "usedWith": "player",
        "event": "open trash can",
        "destroy": false
    }]
},
{
    "name": "painting",
    "aliases": ["painting", "big painting", "frame", "painting frame", "left wall", "left"],
    "description": "The left wall has a huge painting on it hanging crooked in a gilded frame. You can make barely make out the subject, a jowly suited man.",
    "breaks": {
        "text": "Your wrench rips apart the canvas and breaks the frame, revealing a safe behind the painting.",
        "destroy": true,
        "event": "reveal safe"
    },
    "used": [{
        "usedWith": "player",
        "event": "reveal safe"
    }]
},
{
    "name": "paperwork",
    "aliases": ["papers", "paperwork", "door papers", "door paper", "door paperwork", "taped paper"],
    "description": "The door has a paper taped to it. You can't read what it says, but it looks official.",
    "takeable": true
},
{
    "name": "memos",
    "aliases": ["memo", "memos", "trash memo", "trash paper", "trash memos"],
    "description": "Memos detailing designs.",
    "takeable": true
},
{
    "name": "safe",
    "aliases": ["safe", "wall safe", "left safe", "recessed safe", "hidden safe"],
    "description": "The safe has three seperate locks: a combination lock with numbers, a retinal scanner, and a fingerprint scanner.",
    "locked": true,
    "items": ["blueprints"]
},
{
    "name": "retina scanner",
    "aliases": ["eye scanner", "retina scanner", "retinal scanner"],
    "description": "The retina scanner is shaped for an eye. You can see a faint light indicating it still works.",
    "breaks": {
        "text": "You smash the retina scanner into uselessness.",
        "destroy": true
    },
    "used": [{
        "usedWith": "player",
        "event": "retina scan failure",
        "destroy": false
    }]
},
{
    "name": "fingerprint scanner",
    "aliases": ["fingerprint scanner", "finger scanner", "fingerprint lock", "finger lock", "thumb scanner"],
    "description": "The fingerprint scanner is a glass oval. A small light indicates it's still active.",
    "breaks": {
        "text": "You shatter the fingerprint scanner thoroughly.",
        "destroy": true
    },
    "used": [{
        "usedWith": "player",
        "event": "fingerprint scan failure",
        "destroy": false
    },
    {
        "usedWith": "lighter",
        "event": "fingerprint scan success",
        "destroy": false
    }]
},
{
    "name": "combination lock",
    "aliases": ["combo lock", "number lock", "combination lock", "numbers lock"],
    "description": "The combination lock has a turnable knob with numbers. There's the remains of a piece of paper taped next to the lock, but it's too decayed to read.",
    "breaks": {
        "text": "You attack the lock, but it's too sturdy to destroy."
    },
    "used": [{
        "usedWith": "player",
        "event": "combo lock failure",
        "destroy": false
    }]
},
{
    "name": "bucket",
    "aliases": ["bucket", "tipped bucket", "half empty bucket", "empty bucket"],
    "description": "The bucket is tipped on its side. No matter how much glowing liquid seeps out, more continues to leak - seems like it's actually producing the liquid. Buzzing insects have built a nest inside the bucket.",
    "breaks": {
        "text": "You smash the bucket. Insects swarm out of their broken nest and attack you, quickly stripping the flesh from your bones with their needle-like teeth. You are dead.",
        "destroy": true,
        "event": "death"
    },
    "used": [{
        "usedWith": "player",
        "event": "bucket failure",
        "destroy": false
    }]
}
];

var Items = itemData.map(item => {
    if (item.items === undefined) { return new Item(item); }
    else { return new Container(item); }
});
Items.get = function (itemName) {
    return this.find(item => item.name === itemName);
};

module.exports = Items;