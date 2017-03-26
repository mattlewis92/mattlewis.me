import * as path from 'path';
import * as webpack from 'webpack';

module.exports = {
  entry: {
    main: path.join(__dirname, 'entry.ts')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader'
    }, {
      test: /\.html$/,
      loader: 'raw-loader',
    }]
  },
  node: {
    __filename: true,
    __dirname: true
  },
  plugins: [
    new webpack.DefinePlugin({
      HTMLElement: '""'
    })
  ]
};