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
yarn pm2:watch
```
