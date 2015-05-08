var fs = require('fs-extra'),
    path = require('path'),
    ghost = require('ghost'),
    contentPath = path.join(__dirname, 'content'),
    ghostContentPath = path.join(__dirname, 'node_modules/ghost/content'),
    configFile = path.join(__dirname, 'config.js');

fs.stat(contentPath, function (err) {
    if (err) {
        fs.copy(ghostContentPath, contentPath, function (err) {
            if (err) throw new Error('Failed to copy ghost content folder. ' + err);
            start();
        });
    } else {
        start();
    }
});

function start () {
    ghost({
        config: configFile,
        paths: {
            contentPath: contentPath
        }
    }).then(function (server) {
        server.start();
    });
}
