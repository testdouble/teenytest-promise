var spawn = require('child_process').spawn
var assert = require('assert')
var _ = require('lodash')

module.exports = function thePromisePluginWorks(done) {
  run('./node_modules/.bin/teenytest',
      ['--plugin', 'index.js',
       '--timeout', '250',
       'example.test.js'],
      function (er, code, log) {
    try {
      log = log.split('\n')
      assert.strictEqual(code, 1)
      _.each([
        'TAP version 13',
        '1..3',
        'not ok 1 - "failing" - test #1 in `example.test.js`',
        '  ---',
        '  message: 42 == 41',
        '  stacktrace: AssertionError: 42 == 41',
        /at/,
        /at/,
        '  ...',
        'ok 2 - "passing" - test #2 in `example.test.js`',
        'not ok 3 - "timedOut" - test #3 in `example.test.js`',
        '  ---',
        '  message: Test timed out! (timeout: 250ms)',
        '  stacktrace: Error: Test timed out! (timeout: 250ms)',
        /at/,
        /at/,
        '  ...'
      ], function (line, i) {
        if (_.isString(line)) {
          assert.equal(log[i], line)
        } else if (_.isRegExp(line)) {
          assert(log[i].match(line), 'expected \n\n"' + log[i] +
                                     '"\n\n to match \n\n' + line + '\n')
        } else {
          throw 'expected line was not a string or a regex'
        }
      })
    } catch (e) {
      console.error('Test failed. Actual output:')
      console.error('---')
      console.error(log)
      console.error('---')
      throw e
    }
    done(er)
  })
}

function run (cmd, args, cb) {
  var test = spawn(cmd, args)

  var log = ''
  test.stdout.on('data', function (text) {
    log += text.toString()
  })
  test.stderr.on('data', function (text) {
    log += text.toString()
  })

  test.on('close', function (code) {
    cb(null, code, log)
  })
}
