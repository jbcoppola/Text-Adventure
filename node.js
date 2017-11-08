var fuse = require('fuse');
fuse.fuseFile(game.js, output.js, function (err, results) {
    // do something with the results
    // in this case a file has been generated, results.updated
});