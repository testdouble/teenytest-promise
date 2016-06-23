var bluebird = require('bluebird')
var assert = require('assert')

module.exports = {
  failing: function () {
    return bluebird.promisify(function (cb) {
      setTimeout(function () {
        assert.equal(42, 21 + 20)
        cb(null)
      }, 100)
    })()
  },
  passing: function () {
    return bluebird.promisify(function (cb) {
      setTimeout(function () {
        assert.equal(42, 21 + 21)
        cb(null)
      }, 100)
    })()
  },
  timedOut: function () {
    return bluebird.promisify(function (cb) {
      setTimeout(function () {
        assert.equal(42, 21 + 21)
        cb(null)
      }, 400)
    })()
  }
}
