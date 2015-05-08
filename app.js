var path = require('path'),
    ghost = require('ghost'),
    contentPath = path.join(__dirname, 'content'),
    configFile = path.join(__dirname, 'config.js');

var app = ghost({
    config: configFile,
    paths: {
        contentPath: contentPath
    }
});

app.then(function (server) {
    server.start();
});
