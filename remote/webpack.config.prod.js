const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const copyStackblitzReadmePlugin = {
  apply: (compiler) => {
    compiler.hooks.afterEmit.tap(
      'copyStackblitzReadmePlugin',
      async (compilation) => {
        await fs.promises.cp(
          './STACKBLITZ_README.md',
          './local/dist/README.md'
        );
      }
    );
  },
};

module.exports = {
  mode: 'production',
  entry: './remote/src/index.js',
  output: {
    clean: true,
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './remote/src/index.html',
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    copyStackblitzReadmePlugin,
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/i,
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
    ],
  },
};
