const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
  watchFiles: ['./src/pages/**/*.html'],
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: '/login.html' },
    ],
  },
}
});