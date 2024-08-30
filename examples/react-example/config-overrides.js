const webpack = require('webpack')

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {}

  Object.assign(fallback, {
    buffer: require.resolve('buffer/'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util/'),
    vm: require.resolve('vm-browserify'),
    'process/browser': require.resolve('process/browser'),
  })

  config.resolve.fallback = fallback
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ])
  config.module.rules.unshift({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  })

  return config
}
