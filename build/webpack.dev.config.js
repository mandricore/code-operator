// path, webpack
const { base, merge, path } = require('./webpack.base.config')

module.exports = merge(base, {
  devtool: 'cheap-module-eval-source-map',
  entry: ['./src/index'], // file extension after index is optional for .js files
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  }
})

