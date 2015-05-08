// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    url = require('url'),
    database,
    config;

if (process.env.DATABASE_URL) {
    var dbUrl = url.parse(process.env.DATABASE_URL),
        dbAuth = dbUrl.auth && dbUrl.auth.split(':'),
        db = {
            driver: dbUrl.protocol.slice(0, -1),
            host: dbUrl.host,
            user: dbAuth && dbAuth[0],
            password: dbAuth && dbAuth[1],
            name: dbUrl.path.substring(1)
        };

    switch (db.driver) {
        case 'mysql':
        case 'postgres':
            database = {
                client: db.driver,
                connection: {
                    host: db.host,
                    user: db.user,
                    password: db.password,
                    database: db.name,
                    charset: 'utf8'
                }
            };
            break;
        default:
            throw new Error('Unsupported database driver "' + db.driver + '".');
    }
} else {
    // Fallback to sqlite by default
    database = {
        client: 'sqlite3',
        connection: {
            filename: path.join(__dirname, '/content/data/ghost.db')
        }
    };
}

// Turn off database debug mode
database.debug = false;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: process.env.SITE_URL,
        mail: {},
        database: database,
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: process.env.PORT
        }
    }
};

// Export config
module.exports = config;
