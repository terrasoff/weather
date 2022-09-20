const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function ({ isProductionMode }) {
  if (!isProductionMode) {
    return false;
  }

  return {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
      }),
    ],
  };
}
