const path = require('path')
const slsw = require('serverless-webpack')
const Dotenv = require('dotenv-webpack')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const stageName = slsw.lib.options.stage || 'development'
const envFile = path.join(__dirname, `.env.${stageName}`)

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  externals: !slsw.lib.webpack.isLocal ? [nodeExternals()] : [],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack')
          ]
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new Dotenv({
      path: envFile
    })
  ]
}
