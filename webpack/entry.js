const path = require("path");

module.exports = function ({ isProductionMode, apps }) {

  return {
    entry: {
      weather: './src/weather.tsx',
    },
  };
}
