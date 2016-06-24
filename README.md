# teenytest-promise

This is a teenytest plugin that allows you to return a promise from any test
hook or function, and the plugin will wait until the promise is fulfilled or
rejected before continuing, reporting the success or failure to teenytest itself.

## Setup

```
$ npm i -S teenytest-promise
```

Then add this to your package.json:

``` json
"teenytest": {
  "plugins": [
    "teenytest-promise"
  ]
}
```

You can also specify the plugin with teenytest's command line:

```
$ teenytest --plugin teenytest-promise "**/*-test.js"
```

Which should work fine when run in any directory where
`require('teenytest-promise')` will resolve without error.
