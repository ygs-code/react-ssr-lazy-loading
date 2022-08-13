const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const rootPath = process.cwd();
let {
  NODE_ENV, // 环境参数
  target // 环境参数
} = process.env; // 环境参数

module.exports = {
  entry: {
    index: [
      // '@babel/polyfill',
      // "core-js/stable",
      // "regenerator-runtime/runtime",
      //添加编译缓存
      // "webpack/hot/poll?1000",
      path.join(process.cwd(), "/server/index.js")
    ]
  },
  watch: false,
  // context: path.join(process.cwd(), '/client'),
  devtool: "source-map",
  module: {
    rules: []
  },
  plugins: []
};
