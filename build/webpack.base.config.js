const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
 
const base = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc. 
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules\//,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: [
          'transform-runtime',
          'add-module-exports',
          'transform-decorators-legacy',
        ],
        presets: ['es2015', 'react', 'stage-1'],
      },
    }
  ]
}

module.exports = {
  base,
  merge
}