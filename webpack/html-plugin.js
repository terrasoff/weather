const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function ({ isProductionMode, apps }) {

  // @see https://gist.github.com/pglazkov/715003ff0dd603b91b82327aa05599c0

  const plugins = apps.map(function (app) {
    const pluginOptions = {
      template: './public/index.html',
      title: app.name,
      filename: `index.html`,
      chunks: ['vendor', 'shared', app.name],
      chunksSortMode: 'manual',
      inject: true,
      publicPath: "/",
      metadata: {
        baseUrl: app.baseUrl
      },
      favicon: './public/favicon.ico',
    };

    if (isProductionMode) {
      pluginOptions.minilfy = {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }

    return new HtmlWebpackPlugin(pluginOptions);
  });

  return {
    plugins,
  };
}
