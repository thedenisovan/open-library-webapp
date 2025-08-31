const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    signin: './src/module/signInPage/index.js',
    main: './src/module/mainPage/index.js',
    search: './src/module/searchPage/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './src/pages/main.html',
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/signin.html',
      chunks: ['signin'],
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: './src/pages/search.html',
      chunks: ['search'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      { test: /\.html$/i, loader: 'html-loader' },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource' },
    ],
  },
};
