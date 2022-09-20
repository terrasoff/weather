const path = require("path");

module.exports = function ({ isProductionMode }) {
  return {
    output: {
      path: path.resolve('./dist'),
      filename: '[name].js',
      chunkFilename: '[name].[chunkhash].js',
    }
  };
}
