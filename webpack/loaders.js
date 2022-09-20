const path = require("path");

module.exports = function ({ isProductionMode }) {
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.(webp|png|svg|jpg|jpeg|gif|ico)$/,
          exclude: /node_modules/,
          use: [
            "file-loader",
            "webp-loader",
          ]
        },
      ]
    },
  };
}
