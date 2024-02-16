const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js',
  },
  target: 'node',
  plugins: [
    new webpack.EnvironmentPlugin([
      "PORT",
      "DB_SERVER",
      "DB_PORT",
      "DB_USER",
      "DB_PASSWORD",
    ]),
  ],
};
