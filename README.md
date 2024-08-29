# dico-topo-vue

So far, only compatible with Node <= 16

## Project install

```
yarn
```

### Compiles and hot-reloads for development

```
yarn serve
```

This will read `.env.development` config values

### Compiles and minifies for production

For a production server, reads `.env.production` variables:

```
yarn build:prod
```

For a development server (preproduction), reads `.env.staging` variables:

```
yarn build:staging
```

### Lints and fixes files

```
yarn lint
yarn lint-fix
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
