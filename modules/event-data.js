var Event = require('./classes/Event.js');

var eventData = [{
    "name": "bus burned",
    "location": {
        "name": "Bus outside",
        "removeExit": "Bus inside"
    },
    {
    "name": "took battery",
    "location": {
        "name": "Bus inside",
        "removeItem": ""
        }
}
]

var Events = eventData.map(area => new Event(event));
Events.get = function (eventName) {
    return Events.find(event => event.name === eventName);
};

module.exports = Events;