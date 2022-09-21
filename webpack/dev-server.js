const path = require("path");

module.exports = function ({ isProductionMode }) {
  if (isProductionMode) {
    return false;
  }

  return {
    devServer: {
      allowedHosts: 'all',
      static: {
        directory: "./public",
      },
      compress: true,
      port: 9000,
    },
  };
}
