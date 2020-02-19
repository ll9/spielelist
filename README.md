# spielelist

## Docs

/docs

## Project setup

Copy `.env.dummy` to `.env` and enter your credentials there.

```
npm install
npm i -g local-cors-proxy
```

## Startup

```
# run proxy and dev server simultaneously
$ npm run concurrently
```

## Proxy

Due to CORS Issues you will have to run `npm run proxy` before executing any other scripts

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
