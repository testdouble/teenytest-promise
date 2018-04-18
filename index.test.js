var spawn = require('child_process').spawn
var assert = require('assert')
var _ = require('lodash')

module.exports = function thePromisePluginWorks (done) {
  run('./node_modules/.bin/teenytest',
      ['--plugin', 'index.js',
       '--timeout', '250',
       'example.test.js'],
  function (er, code, log) {
    try {
      assert.strictEqual(code, 1)
      assertLines(log, [
        'TAP version 13',
        '1..3',
        'not ok 1 - "failing" - test #1 in `example.test.js`',
        '  ---',
        '  message: 42 == 41',
        /stacktrace: AssertionError( \[ERR_ASSERTION\])?: 42 == 41/,
        '  ...',
        'ok 2 - "passing" - test #2 in `example.test.js`',
        'not ok 3 - "timedOut" - test #3 in `example.test.js`',
        '  ---',
        '  message: Test timed out! (timeout: 250ms)',
        '  stacktrace: Error: Test timed out! (timeout: 250ms)',
        '  ...'
      ])
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

function assertLines (actual, lines) {
  var actualLines = _.reject(actual.split('\n'), function (line) {
    return _.startsWith(line, '    at')
  })
  _.each(lines, function (line, i) {
    if (_.isString(line)) {
      assert.equal(actualLines[i], line)
    } else if (_.isRegExp(line)) {
      assert(actualLines[i].match(line), 'expected \n\n"' + actualLines[i] +
                                 '"\n\n to match \n\n' + line + '\n')
    } else {
      throw new Error('expected line was not a string or a regex')
    }
  })
}

