const path = require("path");

module.exports = function ({ isProductionMode }) {
  return {
    resolve: {
      alias: {
        "@Assets": path.resolve("./assets/"),
        "@Infrastructure": path.resolve("./infrastructure/"),
        "@App": path.resolve("./src/App/"),
        "@Components": path.resolve("./src/Components/"),
        "@Config": path.resolve("./src/Config/"),
        "@Container": path.resolve("./src/Container/"),
        "@Layout": path.resolve("./src/Layout/"),
        "@Stores": path.resolve("./src/Stores/"),
        "@ServiceProviders": path.resolve("./src/ServiceProviders/"),
      },
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
    },
  };
}
