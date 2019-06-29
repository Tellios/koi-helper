const path = require("path");
const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = {
  resolve: {
    alias: {
      app: path.join(__dirname, "src", "renderer", "app")
    }
  },
  module: {
    rules: [
      //   {
      //     test: /\.css$/,
      //     use: ["style-loader", "css-loader"],
      //     include: [/node_modules/]
      //   }
    ]
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /\.js$|node_modules|Entity\.ts$/,
      failOnError: true,
      cwd: process.cwd()
    })
  ]
};
