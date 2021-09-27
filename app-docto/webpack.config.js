const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const Dotenv = require('dotenv-webpack');

const __DEV__ = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './index.js',
  devServer: {
    port: 8080,
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
    plugins: [new TsConfigPathsPlugin(/* { configFileName, compiler } */)]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new Dotenv()
  ]
};
