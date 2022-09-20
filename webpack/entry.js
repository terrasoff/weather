const path = require("path");

module.exports = function ({ isProductionMode, apps }) {

  const entry = {};
  apps.forEach(app => {
    entry[`app_${app.name}`] = app.index
  })

  return {
    entry,
  };
}
