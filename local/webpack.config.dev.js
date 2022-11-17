const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('../package.json');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './local/src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './local/src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ca]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /index\.html$/,
        loader: 'string-replace-loader',
        options: {
          multiple: [
            {
              search: 'remote_window_url',
              replace: 'http://localhost:5000',
            },
            {
              search: 'local_window_title',
              replace: packageJson.localTitle,
            },
          ],
        },
      },
    ],
  },
};
