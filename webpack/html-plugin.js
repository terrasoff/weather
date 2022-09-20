const HtmlWebpackPlugin = require('html-webpack-plugin');

function getAppName(app) {
  return `app_${app.name}`;
}

function getOtherApps(apps, app) {
  const list = apps.slice();

  let appItemIndex = list.indexOf(app);

  if (appItemIndex > -1) {
    list.splice(appItemIndex, 1);
  }

  return list;
}

module.exports = function ({ isProductionMode, apps }) {

  // @see https://gist.github.com/pglazkov/715003ff0dd603b91b82327aa05599c0

  const plugins = apps.map(function (app) {
    const otherApps = getOtherApps(apps, app);

    const pluginOptions = {
      template: './public/index.html',
      title: app.name,
      filename: `${app.name}_index.html`,
      excludeChunks: otherApps.map(getAppName),
      chunks: ['vendor', 'shared', getAppName(app)],
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
