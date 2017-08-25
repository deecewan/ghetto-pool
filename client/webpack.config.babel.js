import { join } from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv';

dotenv.config({ path: '../server/.env' })

const DEBUG = process.env.NODE_ENV === 'development'

export default {
  entry: "./src/index.jsx",
  output: {
    path: join(__dirname, 'out'),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [["env", { modules: false }], "react"],
          plugins: ["transform-object-rest-spread"]
        }
      }]
    }]
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './src/index.html' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.FACEBOOK_APP_ID': DEBUG ? process.env.DEV_FACEBOOK_APP_ID : process.env.FACEBOOK_APP_ID,
    })
  ]
}
