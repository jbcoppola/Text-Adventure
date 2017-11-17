var classes = require("./classes/Item.js");

var itemData = [{
    "name": "rock",
    "description": "A rock.",
    "onGround": true,
    "break": {
        "text": "The rock cracks and shatters.",
        "creates": "rock dust"
    },
    "used": [{
        "with": "rock 2",
        "text": "The rock explodes into powder.",
        "creates": "rock dust"
    }]
},
{
    "name": "rock dust",
    "description": "The remains of the rock.",
    "onGround": true
},
{
    "name": "rock 2",
    "description": "The sequel to rock.",
    "onGround": true,
    "break": {
        "text": "You smash rock 2, but can't even chip it."
    },
    "used": [{
        "with": "rock",
        "text": "Rock 2 is impervious to force.",
        "destroy": false
    }]
},
{
    "name": "stuck lever",
    "description": "This lever is jammed. It has dents shaped like a rock.",
    "takeable": false,
    "onGround": true,
    "used": [{
        "with": "rock",
        "text": "The lever snaps off at the base.",
        "creates": "snapped lever"
    }]
},
{
    "name": "snapped lever",
    "description": "The unusable base of the snapped lever.",
    "active": false,
    "takeable": false,
    "onGround": true
},
{
    "name": "stick",
    "description": "A stick.",
    "value": 0
}];

var Items = itemData.map(item => new classes.Item(item));
Items.get = function (itemName) {
    return this.find(item => item.name === itemName);
};

module.exports = Items;