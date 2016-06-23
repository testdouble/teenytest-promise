var callbackify = require('callbackify')

module.exports = {
  name: 'teenytest-promise',
  translators: {
    userFunction: function (runUserFunction, metadata, cb) {
      runUserFunction(function (er, result) {
        if (typeof result.value === 'object' &&
            typeof result.value['then'] === 'function') {
          result.value.then(
            function promiseFulfilled (value) {
              cb(er, value)
            },
            function promiseRejected (reason) {
              cb(reason, null)
            }
          )
        } else {
          cb(er)
        }
      })
    }
  }
}
