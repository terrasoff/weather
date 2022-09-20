const path = require('path');
const { merge } = require("webpack-merge");
const entry = require("./webpack/entry");
const loaders = require("./webpack/loaders");
const output = require("./webpack/output");
const resolveFiles = require("./webpack/resolve-files");
const devServer = require("./webpack/dev-server");
const optimization = require("./webpack/optimization");
const bundleAnalyzerPlugin = require("./webpack/bundle-analyzer-plugin");
const htmlPlugin = require("./webpack/html-plugin");

module.exports = function (env) {
  const isProductionMode = env === 'production';
  const apps = [
    {
      name: 'weather',
      baseUrl: '/',
      index: './src/weather.tsx'
    },
  ];

  const context = {
    isProductionMode,
    apps,
  };

  const config = {
    devtool: 'inline-source-map',
  };

  return merge(
    config,
    entry(context),
    loaders(context),
    output(context),
    resolveFiles(context),
    devServer(context),
    optimization(context),
    bundleAnalyzerPlugin(context),
    htmlPlugin(context),
  );
};
