## Dokku(-alt) Ghost Blog

### Configuration

Create the application in Dokku...

```
git clone https://bitbucket.org/jacobmarshall/dokku-ghost.git
git remote add dokku dokku@dokku.me:ghost-blog
git push dokku master
```

**or**

```
dokku create ghost-blog
```

#### Database Setup (optional)

```
dokku mariadb:create ghost-blog
dokku mariadb:link ghost-blog ghost-blog
```

#### Volume Setup

If you're not using a database, you must configure a volume, otherwise every time you restart the container, you will lose your database.

```
dokku volume:create ghost-blog /app/content
dokku volume:link ghost-blog ghost-blog
```

#### Node Setup

```
dokku config:set ghost-blog NODE_ENV=production
```

#### Website Setup

```
dokku config:set ghost-blog SITE_URL=http://example.com
```

#### Email Setup

Remember to set a from address... (regardless of the driver you choose)

```
dokku config:set ghost-blog MAIL_FROM=ghost@example.com
```

**Mailgun**

```
dokku config:set ghost-blog MAIL_DRIVER=mailgun
dokku config:set ghost-blog MAIL_USER=ghost@example.com
dokku config:set ghost-blog MAIL_PASSWORD=(the mailgun password)
```

**SES**

```
dokku config:set ghost-blog MAIL_DRIVER=ses
dokku config:set ghost-blog MAIL_AWS_ACCESS_KEY=(the aws access key)
dokku config:set ghost-blog MAIL_AWS_SECRET_KEY=(the aws secret key)
```

**SES (alternative)**

```
dokku config:set ghost-blog MAIL_DRIVER=ses
dokku config:set ghost-blog MAIL_SERVER=ses.example.com
dokku config:set ghost-blog MAIL_PORT=465
dokku config:set ghost-blog MAIL_USER=ghost@example.com
dokku config:set ghost-blog MAIL_PASSWORD=(the ses email password)
```

**Gmail**

```
dokku config:set ghost-blog MAIL_DRIVER=gmail
dokku config:set ghost-blog MAIL_USER=ghost@gmail.com
dokku config:set ghost-blog MAIL_PASSWORD=(your gmail password)
```
