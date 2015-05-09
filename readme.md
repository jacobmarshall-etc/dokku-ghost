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