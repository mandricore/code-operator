const { base, merge } = require('./webpack.base.config')

const test = merge(base, {
  devtool: 'cheap-module-eval-source-map'
})

module.exports = test
