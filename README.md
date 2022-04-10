# Thread Ripper

A small web app that allows one to compose Twitter tweet threads both as brand
new threads and also in reply to a tweet. Supports automatic breaking into
multiple numbered tweets.

## Running locally

- Install [Node.js](https://nodejs.org/en/).
- Install [Yarn](https://yarnpkg.com/).
- Clone this repo somewhere and CD into it from a terminal.
- Sign up for a [Twitter API developer account](https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api) and create an app configured with OAuth 2.0 authentication. More information on how to do that can be found on [Twitter developer docs](https://developer.twitter.com/en/docs/authentication/oauth-2-0/authorization-code). This shouldn't take long and at the end of it you should have with you a _client ID_ and a _client secret_. Note this down some place safe.
- Create a file called `.env.local` in the root of the repo that looks like this.

  ```env
  TWITTER_CLIENT_ID=<CLIENT ID HERE>
  TWITTER_CLIENT_SECRET=<CLIENT SECRET HERE>
  NEXTAUTH_SECRET=<RANDOM PASSWORD STRING>
  NEXTAUTH_URL=http://localhost:3000
  ```

  These end up becoming environment variables when you run the app locally. When deploying to production make sure you set these environment variables up properly. Also, make sure you replace the stuff in `<>` above. Finally, before deploying to production, you'll want to update the value of `NEXTAUTH_URL` to show the actual production URL.
- Run `yarn`.
- Run `yarn dev`.

That's it. Now you should be able to browse the app at http://localhost:3000/.

## Deploying to production

I used Docker to build a container and then host it on a VM using Docker Compose. There's a `Dockerfile` at the root of the repo that you can use to build, well, docker images. Here's one way to do it:

```bash
docker build -t thread-ripper:0.1 .
```

I use [Caddy](https://caddyserver.com/) to do TLS termination and automatic TLS server cert acquisition/renewal from [Let's Encrypt](https://letsencrypt.org/) and install it as the gateway that reverse proxies to the docker container that's running the app. Here's what my `Caddyfile` looks like:

```
threadripper.nerdworks.dev {
  reverse_proxy thread-ripper:3000
}
```

You will, of course, want to use your own domain name instead of `threadripper.nerdworks.dev`. And here's what my `docker-compose.yml` file looks like:

```yaml
version: "3"

services:
  caddy:
    image: caddy:2.4.6
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - $PWD/Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config

  thread-ripper:
    image: avranju/thread-ripper:0.3
    container_name: thread-ripper
    restart: unless-stopped
    environment:
      - TWITTER_CLIENT_ID=<CLIENT ID HERE>
      - TWITTER_CLIENT_SECRET=<CLIENT SECRET HERE>
      - NEXTAUTH_SECRET=<RANDOM PASSWORD STRING>
      - NEXTAUTH_URL=https://threadripper.nerdworks.dev

volumes:
  caddy_data:
  caddy_config:

```

With all that in place, you can spin the thing up by running:

```bash
docker-compose up -d
```

That's it!
