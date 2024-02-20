const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
  dotenv.config({ path: `.env.production` });

  return {
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
        "MODE",
        "PORT",
        "DB_SERVER",
        "DB_PORT",
        "DB_USER",
        "DB_PASSWORD",
      ]),
    ],
  };
};
