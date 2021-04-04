# Flarum Badge API

This is a super simple API that can create badges for your Flarum extensions READMEs.

This is hosted on my home internet on a Raspberry Pi, so 100% uptime is not guaranteed (though it should come pretty close!).

## Suggestions

If you want to suggest a new badge, open an issue and explain *clearly* what the badge could contain/show.

## Using the badges

The documentation in this README is not exhaustive. Please read the documentation found below for all possible badges, options, and information.

[Read the full documentation](https://flarum-badge-api.davwheat.dev/v1)

### Compatible with latest Flarum

This badge shows whether your extension is compatible with the latest version of Flarum.

Make a call to `https://flarum-badge-api.davwheat.dev/v1/compat-latest/<vendor/package>` (replacing `<vendor/package>` with your extension's package name).

Example badge for `FoF/Formatting`:

![](https://flarum-badge-api.davwheat.dev/v1/compat-latest/fof/formatting)

## Installing and running

Normal people don't need to do this. This is for development purposes only.

1. Create a `.env` file:

```
# .env
EXTIVERSE_TOKEN=<your Extiverse API token>
BASE_URL=<URL to the API root (no trailing slash>
PORT=<optional port to run on; defaults to 3000>
```

<!-- This is not a typo. It's a joke. -->
2. Install deps && start the Express server:

```sh
yarn

# In one terminal...
yarn dev

# In another terminal...
yarn start
```

### Running permanently on a server

```sh
npm i -g pm2
yarn build
yarn pm2:watch
```
