const webpack = require('webpack');
const path = require('path');
const outputPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config = {
  entry: [path.join(__dirname, '/src/react/app.js')],
  // Render source-map file for final build
  devtool: 'source-map',
  output: {
    path: outputPath,
    filename: 'app.js', // Name of output file
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Minify the bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // suppresses warnings, usually from module minification
        warnings: false,
      },
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loader: 'babel-loader',
        exclude: [nodeModulesPath],
        query: {
          presets: ['es2015', 'react']
        },
      },
    ],
  },
};

module.exports = config;
