var fs = require('fs-extra'),
    path = require('path'),
    ghost = require('ghost'),
    contentPath = path.join(__dirname, 'content'),
    contentFolders = ['apps', 'data', 'images', 'themes'],
    ghostContentPath = path.join(__dirname, 'node_modules/ghost/content'),
    configFile = path.join(__dirname, 'config.js');

function copy () {
    fs.copy(ghostContentPath, contentPath, function (err) {
        if (err) throw new Error('Failed to copy ghost content folder. ' + err);
        start();
    });
}

function contains (arr, items) {
    return items.every(function (item) {
        return arr.indexOf(item) !== -1;
    });
}

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

fs.stat(contentPath, function (err) {
    if (err) {
        copy();
    } else {
        fs.readdir(contentPath, function (err, files) {
            if (files && contains(files, contentFolders)) return start();
            copy();
        });
    }
});