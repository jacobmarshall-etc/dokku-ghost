// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    url = require('url'),
    env = process.env,
    database,
    mail,
    config,
    paths;

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

if (env.MAIL_DRIVER) {
    switch (env.MAIL_DRIVER) {
        case 'mailgun':
            mail = {
                transport: 'SMTP',
                options: {
                    service: 'Mailgun',
                    auth: {
                        user: env.MAIL_USER,
                        pass: env.MAIL_PASSWORD
                    }
                }
            };
            break;
        case 'ses':
            if (env.MAIL_AWS_ACCESS_KEY && env.MAIL_AWS_SECRET_KEY) {
                mail = {
                    transport: 'SES',
                    options: {
                        AWSAccessKeyID: env.MAIL_AWS_ACCESS_KEY,
                        AWSSecretKey: env.MAIL_AWS_SECRET_KEY
                    }
                };
            } else {
                mail = {
                    transport: 'SMTP',
                    options: {
                        service: 'SES',
                        host: env.MAIL_SERVER,
                        port: env.MAIL_PORT || 465,
                        auth: {
                            user: env.MAIL_USER,
                            pass: env.MAIL_PASSWORD
                        }
                    }
                };
            }
            break;
        case 'gmail':
            mail = {
                transport: 'SMTP',
                options: {
                    service: 'Gmail',
                    auth: {
                        user: env.MAIL_USER,
                        pass: env.MAIL_PASSWORD
                    }
                }
            };
            break;
        default:
            throw new Error('Unknown mail driver "' + env.MAIL_DRIVER + '"');
    }
} else {
    mail = {
        // Default mail configuration, nothing...
    };
}

// Configure the from address (mail config)
mail.from = env.MAIL_FROM;

// Turn off database debug mode
database.debug = false;

// Configure the content path (seeing as it's a mount)
paths = {
    contentPath: path.join(__dirname, 'content')
};

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: env.SITE_URL || 'http://my-ghost-blog.com',
        mail: mail,
        database: database,
        paths: paths,
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
