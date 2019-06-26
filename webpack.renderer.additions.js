const path = require("path");

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
  }
};
