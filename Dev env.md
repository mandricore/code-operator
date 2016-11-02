## Dev environment 2016-2017

## Style guide linter

- linting: [xo](https://github.com/sindresorhus/xo) using [eslint]()
- testing: [ava](https://github.com/ava/ava)
- BDD: [ava-spec]()
- test doubles: [testdouble.js]()
- browser testing: [browser-env]()
- code coverage: [nyc](https://github.com/istanbuljs/nyc) with [coveralls.io](https://www.npmjs.com/package/coveralls)
- E2E: [cypress] or [nightwatch]
- Bundling [webpack]()
- Complexity analysis [plato]
- 

## Recipe

For ava tips, read [this recipe](https://github.com/kentcdodds/react-ava-workshop)

`yarn i babel-cli -g`

*create package*
- `yarn init`

*babel*
- `yarn add babel-register babel-polyfill babel-plugin-transform-runtime --D`
- `yarn add babel-preset-latest-minimal --save-dev`

*webpack*
- `yarn add webpack webpack-node-externals --D`

*testing*
- `yarn add ava ava-spec testdouble --D`

*coverage*
- `yarn add nyc coveralls --D`

*lint styleing*
- `yarn add xo  --D`

*complexity analysis*
- `yarn add plato --D`

*browser testing (for modules used in web apps only)*
`yarn i add browser-env --D`

*CI*

`.travis.yml`

```
after_success:
    - './node_modules/.bin/nyc report --reporter=text-lcov | ./node_modules/.bin/coveralls'
```
## Tools of the trade

This library was created using the guides:

- [moving-to-webpack-2](http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/)
- [webpack usage](https://webpack.github.io/docs/usage.html)
- [WebpackTutorial 1 & 2](https://github.com/AriaFallah/WebpackTutorial)
- [how-to-write-a-good-npm-module.html](http://www.kochan.io/javascript/how-to-write-a-good-npm-module.html)
- [code-coverage-with-instanbul-and-coveralls](http://codeheaven.io/javascript-code-coverage-with-instanbul-and-coveralls/)
- [babel handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md)
- [webpack testing](https://webpack.github.io/docs/testing.html)
- [es7-decorators-babel6](http://technologyadvice.github.io/es7-decorators-babel6/)

### Libs used

- [babel-loader](https://github.com/babel/babel-loader)
- [babel-preset-latest-minimal](https://www.npmjs.com/package/babel-preset-latest-minimal)
- [npm-install-webpack-plugin](https://www.npmjs.com/package/npm-install-webpack-plugin)

### Testing

- [test double vs sinon](http://blog.testdouble.com/posts/2016-03-13-testdouble-vs-sinon.html)

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

