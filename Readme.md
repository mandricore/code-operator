[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Code Operator

Utility to make efficient code operations using the Javascript AST.
Toolset:

- [estools](https://github.com/estools)

- [esprima](https://github.com/jquery/esprima)
- [escode](https://github.com/estools/escodegen) - code generator

- [estraverse](https://www.npmjs.com/package/estraverse)
- [merge-estraverse-visitors](https://www.npmjs.com/package/merge-estraverse-visitors)

- [esquery](https://github.com/estools/esquery)
- [esdispatch](https://github.com/estools/esdispatch)

- [escope](https://github.com/estools/escope)
- [esutils](https://github.com/estools/esutils)
- [estemplate](https://github.com/estools/estemplate) - templating using AST
- [esvalid](https://github.com/estools/esvalid)

## Grasp - refactorind code

[use as library](http://www.graspjs.com/docs/lib/)
[code replacement](http://www.graspjs.com/docs/replace/)
[squery](http://www.graspjs.com/docs/squery/)
[equery](http://www.graspjs.com/docs/equery/)
[concepts](http://www.graspjs.com/docs/concepts/)

```js
var grasp = require('grasp');
var replacer = grasp.replace('equery', '__ + __', '{{.l}} - {{.r}}');
var processedCode = replacer(code);
```

### Search

search takes a string choosing a query engine (squery or equery), a string selector, and a string input, and produces an array of nodes. Eg.

```js
var grasp = require('grasp');
var nodes = grasp.search('squery', 'if', code);
```

### Replace

replace takes a string choosing a query engine (squery or equery), a string selector, a string replacement, and a string input, and produces a string of the processed code. Eg.

```js
var grasp = require('grasp');
var processedCode = grasp.replace('squery', 'if.test', '!({{}})', code);
```

Instead of providing a replacement pattern as a string, you can pass in a function which produces a string, and this string will be used as the replacement.

```js
var processedCode = grasp.replace('squery', 'call[callee=#require]', function(getRaw, node, query) {
    var req = query(".args")[0];
    return "import " + camelize(path.basename(req.value, ".js")) + " from " + getRaw(req);
}, code);
```

## Tutorials

[esprima tutorial](http://sevinf.github.io/blog/2012/09/29/esprima-tutorial/)

## Tools of the trade

This library was created using the guides:

- [moving-to-webpack-2](http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/)
- [webpack usage](https://webpack.github.io/docs/usage.html)
- [WebpackTutorial 1 & 2](https://github.com/AriaFallah/WebpackTutorial)
- [how-to-write-a-good-npm-module.html](http://www.kochan.io/javascript/how-to-write-a-good-npm-module.html)
- [code-coverage-with-instanbul-and-coveralls](http://codeheaven.io/javascript-code-coverage-with-instanbul-and-coveralls/)
- [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md)
- [webpack testing](https://webpack.github.io/docs/testing.html)
- [mocha-webpack](https://www.npmjs.com/package/mocha-webpack)
- [es7-decorators-babel6](http://technologyadvice.github.io/es7-decorators-babel6/)

### Libs used

- [babel-loader](https://github.com/babel/babel-loader)
- [babel-preset-latest-minimal](https://www.npmjs.com/package/babel-preset-latest-minimal)
- [npm-install-webpack-plugin](https://www.npmjs.com/package/npm-install-webpack-plugin)

### Testing

- [debugging-mocha-unit-tests-in-visual-studio-code](https://scottaddie.com/2015/10/22/debugging-mocha-unit-tests-in-visual-studio-code/)

```
$ mocha --debug-brk
Debugger listening on 127.0.0.1:5858
```

Configure `.launch.json` file in root with this host and port.

### Code coverage

Use [cross-env](https://www.npmjs.com/package/cross-env) and [nyc](https://github.com/istanbuljs/nyc) interface

`npm i nyc --save-dev`

- [babel-plugin-__coverage__](https://www.npmjs.com/package/babel-plugin-__coverage__)
- [es6-code-coverage-with-babel-plugin](http://dev.topheman.com/es6-code-coverage-with-babel-plugin/)
- [node-mocha-travis-istanbul-coveralls](http://dsernst.com/2015/09/02/node-mocha-travis-istanbul-coveralls-unit-tests-coverage-for-your-open-source-project/)

"Using a babel plugin for coverage is a no-brainer." - @kentcdodds

Even better:

- [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul)

`npm install --save-dev babel-plugin-istanbul`

### Decorator

- [lodash-decorators](https://www.npmjs.com/package/lodash-decorators)
- [core-decorators](https://www.npmjs.com/package/core-decorators)

### Documentation

- [documentation.js](https://github.com/documentationjs/documentation)

### Karma

- [karma-mocha-reporter](https://www.npmjs.com/package/karma-mocha-reporter)

### Flowtype

- [flowtype](https://flowtype.org/)

### Plato reports

`npm-run plato -r -d reports ./`

### Code style

- [xo](https://github.com/sindresorhus/xo)
- [standard](http://standardjs.com/) - javascript standard code style

`eslint --init` to configure and initialize ESlint

```json
{
    "extends": "standard",
    "installedESLint": true,
    "plugins": [
        "standard",
        "promise"
    ]
}
```

- [eslint-and-mocha](https://robots.thoughtbot.com/testing-your-style-with-eslint-and-mocha)

### Babel plugins

List current plugins needed according to the version of node:

`npm-run babel-node-list-required`

```
[ 'transform-es2015-duplicate-keys',
  'transform-es2015-modules-commonjs',
  'syntax-trailing-function-commas',
  'transform-async-to-generator' ]
```

`npm i babel-plugin-transform-es2015-duplicate-keys babel-plugin-transform-es2015-modules-commonjs babel-plugin-syntax-trailing-function-commas babel-plugin-transform-async-to-generator --save-dev`

## For Vue projects

`npm install --save-dev eslint-config-vue eslint-plugin-vue`

- [eslint-config-vue](https://github.com/vuejs/eslint-config-vue)
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)

## Objectives

Read project directory as stream of files
- pass through filter (add metadata for type of file basd on location/context and file name + extension)
- operate on file
- send to output stream, writing it back or sending file to new location

## API

### Create new file

```js
operator({
  model: 'person'
})
.extends('base')
.constructor(['name'])
.async.fun('speak', ['text'])
.fun('walk', ['distance'])
```

Creates file `src\models\person.js`

```js
import Base from './base'

export default class Person {
  constructor(name) {
    super()
    this.name = name
  }

  async speak(text) {
  }

  walk(distance) {
  }
}
```

Note: Could also be performed on multiple files!

### Modify existing file

Change `speak` to not be async and remove function `walk`

```js
operator({
  model: 'person'
})
.fun('speak', ['text'])
.remove('walk')
```

Note: Could also be performed on multiple files!

### Delete existing file

```js
operator({
  model: 'person',
  view: 'person'
})
.delete()
```

Multiple delete

```js
operator({
  models: ['person', 'account'],
  views: ['person', 'account']
})
.delete()
```

Delete all domain files of the given names except the `test` files:

```js
operator({
  domains: ['person', 'account']
  exceptFor: ['test']
})
.delete()
```

