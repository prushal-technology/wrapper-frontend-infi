const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Change the entry to your widget entry file
      webpackConfig.entry = path.resolve(__dirname, "src/widget-entry.jsx");

      // Output single JS file named widget.js
      webpackConfig.output = {
        ...webpackConfig.output,
        filename: "widget.js",
        library: "InfiWidget",
        libraryTarget: "umd",
        clean: true,
      };

      // Disable code splitting
      webpackConfig.optimization = {
        splitChunks: { cacheGroups: {} },
      };

      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) => plugin.constructor.name !== "HtmlWebpackPlugin"
      );

      return webpackConfig;
    },
  },
};
