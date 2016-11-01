const { base, merge, webpack } = require('./webpack.base.config')

module.exports = merge(base, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
})
