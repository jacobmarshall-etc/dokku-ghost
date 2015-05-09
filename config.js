// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    url = require('url'),
    env = process.env,
    database,
    config;

if (env.DATABASE_URL) {
    var dbUrl = url.parse(env.DATABASE_URL),
        dbAuth = dbUrl.auth && dbUrl.auth.split(':'),
        db = {
            driver: dbUrl.protocol.slice(0, -1),
            host: dbUrl.hostname,
            port: dbUrl.port,
            user: dbAuth && dbAuth[0],
            password: dbAuth && dbAuth[1],
            name: dbUrl.path.substring(1)
        },
        driver = ({
            mysql2: 'mysql'
        }[db.driver]) || db.driver;

    switch (driver) {
        case 'mysql':
        case 'postgres':
            database = {
                client: driver,
                connection: {
                    host: db.host,
                    port: db.port,
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
        url: env.SITE_URL || 'http://my-ghost-blog.com',
        mail: {},
        database: database,
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '0.0.0.0',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: env.PORT
        }
    }
};

// Export config
module.exports = config;
