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

We will use [aster](https://github.com/asterjs) repos from [aster@kristianmandrup](https://github.com/kristianmandrup?utf8=%E2%9C%93&tab=repositories&q=aster)
or when updated dependencies are merged into origins.

## Grasp - refactoring code (search/replace AST)

Grasp is usd internally by [aster](https://github.com/asterjs/aster) see below.

[use as library](http://www.graspjs.com/docs/lib/)
[code replacement](http://www.graspjs.com/docs/replace/)
[squery](http://www.graspjs.com/docs/squery/)
[equery](http://www.graspjs.com/docs/equery/)
[concepts](http://www.graspjs.com/docs/concepts/)

```js
const grasp = require('grasp')
const replacer = grasp.replace('equery', '__ + __', '{{.l}} - {{.r}}')
const processedCode = replacer(code)
```

### Search

search takes a string choosing a query engine (squery or equery), a string selector, and a string input, and produces an array of nodes. Eg.

```js
const nodes = grasp.search('squery', 'if', code);
```

### Replace

replace takes a string choosing a query engine (squery or equery), a string selector, a string replacement, and a string input, and produces a string of the processed code. Eg.

```js
const processedCode = grasp.replace('squery', 'if.test', '!({{}})', code);
```

Instead of providing a replacement pattern as a string, you can pass in a function which produces a string, and this string will be used as the replacement.

```js
var processedCode = grasp.replace('squery', 'call[callee=#require]', function(getRaw, node, query) {
    var req = query(".args")[0];
    return "import " + camelize(path.basename(req.value, ".js")) + " from " + getRaw(req);
}, code);
```

## Esquery (Example query)

`if(__){ __ }` matches any if statement with any test, and one statement in its body.
`function __(__) { __ }` matches a function with any name, one parameter of any identifier, and a body with one statement.

You can also give the wildcard a name which can be used to refer to it during replacement.
`$name` will match any expression, statement, or identifier, and during replacement the matched node can be
accessed using its name, eg. `{{name}}`. If you use a name more than once, then the values for both must match
- eg. `$a + $a` will match `2 + 2`, but not `2 + 1`.

You can use `_$`, which matches zero or more elements. Modifying our previous example,
`function __(_$) { _$ }` matches a function with any name, any amount of parameters, and any amount of statements.

### Replace

First, the text `{{}}` will be replaced with the source of the matched node.

For instance, the replacement text `f({{}})` would result in each match being replaced with a call to the function `f` with the match as its argument.

```
$ cat file.js
if (y < 2) {
  window.x = y + z;
}
$ grasp '[left=#y]' --replace 'f({{}})' file.js
if (f(y < 2)) {
  window.x = f(y + z);
}
```

Second, the text `{{selector}}` will be replaced with the first result of querying the matched node with the specified selector.
The query engine used to process the selector will be the same as you used for searching, eg.
if you used equery to search for matches (with the -e, --equery flag), then the replacement selector will also use equery.

An example:

```
$ cat file.js
if (y < 2) {
  window.x = y + z;
}
$ grasp if --replace 'while ({{.test}}) {\n  f(++{{assign bi.left}});\n}' file.js
while (y < 2) {
  f(++y);
}
```

See [Syntax](http://www.graspjs.com/docs/syntax-js/) for full overview of Javascript syntax you can use to query AST.

## Aster

Perhaps better and easier to use [aster](https://github.com/asterjs)
Even has [ES6 support](https://github.com/asterjs/aster-parse-esnext)

```js
const aster = require('aster');
aster.src.registerParser('.js', require('aster-parse-esnext'));
```

*aster* is reactive builder specialized for code processing and transformations. It's built with debugging in mind and makes building JavaScript code more reliable and faster.

[aster-equery](https://www.npmjs.com/package/aster-equery)

```js
var aster = require('aster');
var equery = require('aster-equery');

aster.src('src/**/*.js')
.map(equery({
  'if ($cond) return $expr1; else return $expr2;': 'return <%= cond %> ? <%= expr1 %> : <%= expr2 %>'
  // , ...
}))
.map(aster.dest('dist'))
.subscribe(aster.runner);
```

Alternatively

```js
var aster = require('aster');
var equery = require('aster-equery');

aster.src('src/**/*.js')
.map(equery({
  'if[then=return][else=return]': 'return <%= test %> ? <%= consequent.argument %> : <%= alternate.argument %>'
  // , ...
}))
.map(aster.dest('dist'))
.subscribe(aster.runner);
```

You can also use a custom [Observable](http://reactivex.io/documentation/observable.html) to feed `aster.src`

```js
function srcObserver(options) {
  return Rx.Observable.of(options.sources);
}

const sources = ['var a = 1', 'var b = a + 2']

// alternatively:
// const srcObserver = Rx.Observable.of(options.sources);

aster.src({
  srcObserver,
  sources,
})
```

Aster libs to be used for code transformation pipeline:

- [aster runner](https://github.com/kristianmandrup/aster-runner)
- [aster dest](https://github.com/kristianmandrup/aster-dest)
- [aster src](https://github.com/kristianmandrup/aster-src)
- [aster generate](https://github.com/kristianmandrup/aster-generate)
- [aster squery](https://github.com/kristianmandrup/aster-squery)
- [aster equery](https://github.com/kristianmandrup/aster-equery)
- [aster traverse](https://github.com/kristianmandrup/aster-traverse)
- [aster parse](https://github.com/kristianmandrup/aster-parse)
- [aster parse js](https://github.com/kristianmandrup/aster-parse-js)

Note: To remove an AST node such as a function with a specific indentifier, find it via selector and replace with an empty string!!

Full customized example:

```js
function srcObserver(options) {
  return Rx.Observable.of(options.sources);
}

const sources = ['var a = 1', 'var b = a + 2']

function destinator() {
  return function (sources) {
    sources = options.generate(sources);
    sources.flatMap(function (source) {
      console.log(source)
    }
  }
}

function generator() {
	return function(sources) {
		return sources.flatMap(function (source) {
			var result = escodegen.generate(source.program, options);
			return Rx.Observable.fromArray(result);
    }
  }
}

aster.src({
  srcObserver,
  sources,
})
.map(equery({
  'if[then=return][else=return]': 'return <%= test %> ? <%= consequent.argument %> : <%= alternate.argument %>'
  // , ...
}))
.map(aster.dest({
  generator,
  destinator
}))
.subscribe(aster.runner({
  onSuccess: (item) => {
    console.log('success', item);
  }
}));
```

[Aster](https://github.com/asterjs/aster) looks like the best option!

Only problem is that aster is currently outdated, but likely just by updating
[dependencies](https://github.com/asterjs/aster-parse-js/blob/master/package.json) to latest esprima (`4.0.0-dev`) it should work
for modern javascript

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

