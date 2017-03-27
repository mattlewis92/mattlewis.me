import * as path from 'path';
import * as webpack from 'webpack';
import { AotPlugin } from '@ngtools/webpack';

export default {
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
      loader: '@ngtools/webpack'
    }, {
      test: /\.html$/,
      loader: 'raw-loader',
    }]
  },
  node: {
    __dirname: true
  },
  plugins: [
    new webpack.DefinePlugin({
      HTMLElement: JSON.stringify(''),
      IS_SERVER: JSON.stringify(true),
      navigator: JSON.stringify({userAgent: ''})
    }),
    new AotPlugin({
      tsConfigPath: path.join(__dirname, '..', 'tsconfig-ngc.json'),
      entryModule: path.join(__dirname, '..', 'src/app/app.browser.module#AppModule')
    })
  ]
};