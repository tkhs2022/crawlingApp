const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const DEV_PORT = process.env.PORT || 3000;
const DEV_PORT = process.env.PORT || 8080;

// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "development";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
// const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: './src/index.jsx',
  // entry: {
  //   app: ['./src/index.jsx'],
  // },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader', options: {presets: ['@babel/preset-env', '@babel/react']}}]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader', options: {presets: ['@babel/preset-env', '@babel/react']}}]
      },
      {
        test: /\.css$/,
        use: ['style-loader', {loader: 'css-loader', options: {url: false, sourceMap: enabledSourceMap}}],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },    
  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: '/js/',
    filename: 'bundle.js',
    // filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
  ],  
  devServer: {
    contentBase: path.join(__dirname, 'build/'),
    port: DEV_PORT,
    hot: true,
    // host: 'localhost',
  }
};