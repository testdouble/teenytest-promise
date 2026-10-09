# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/2.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
The versioned interface is the plugin's behavior as loaded by teenytest and the
Node.js versions it supports.

## [Unreleased]

## [2.0.0] - 2026-10-09

### Added

- Declared `teenytest@^6.0.0` as a peer dependency.
- Support for Node.js 14, 16, 18, 22, and 24, plus the current release.

### Removed

- **Breaking:** Support for teenytest 5. Upgrade to teenytest 6.
- **Breaking:** Support for Node.js 0.10, 4, 6, and 8. Use Node.js 14 or later.

## [1.0.0] - 2016-06-24

### Added

- teenytest plugin that lets tests and test hooks return a promise. teenytest
  waits for the promise to settle and reports a rejection as a failure.

[Unreleased]: https://github.com/testdouble/teenytest-promise/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/testdouble/teenytest-promise/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/testdouble/teenytest-promise/releases/tag/v1.0.0
