import { join } from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';

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
  ]
}
