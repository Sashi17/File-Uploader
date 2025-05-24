const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    path: require.resolve('path-browserify'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util'),
    assert: require.resolve('assert'),
    buffer: require.resolve('buffer'),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  );
  return config;
};
