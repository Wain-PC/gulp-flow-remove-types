gulp-flow-remove-types
==========================
[![Build Status](https://travis-ci.org/Wain-PC/gulp-flow-remove-types.svg?branch=master)](https://travis-ci.org/Wain-PC/gulp-flow-remove-types)
[![Coverage Status](https://coveralls.io/repos/github/Wain-PC/gulp-flow-remove-types/badge.svg?branch=master)](https://coveralls.io/github/Wain-PC/gulp-flow-remove-types?branch=master)

Gulp plugin for [flow-remove-types](https://github.com/flowtype/flow-remove-types).

## Installation

Install the package:

- npm `npm install --save gulp-flow-remove-types`
- yarn `yarn add gulp-flow-remove-types`

## Usage

```javascript
var gulp = require('gulp'),
    flowRemoveTypes = require('gulp-flow-remove-types');


gulp.src('file.js')
    .pipe(flowRemoveTypes())
    .pipe(gulp.dest('dist'));
```


## Options
By default, [flow-remove-types](https://github.com/flowtype/flow-remove-types) replaces Flow type definitions with whitespaces.

Pass `{pretty: true}` if you want more condensed output (no whitespaces).  

```javascript
gulp.src('file.js')
    .pipe(flowRemoveTypes({
        pretty: true
    }))
    .pipe(gulp.dest('dist'));
```