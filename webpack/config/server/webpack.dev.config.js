const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const rootPath = process.cwd();
let {
  NODE_ENV, // 环境参数
  WEB_ENV, // 环境参数
  target, // 环境参数
  htmlWebpackPluginOptions = ""
} = process.env; // 环境参数

htmlWebpackPluginOptions = (() => {
  const regex = /(?<=\{)(.+?)(?=\})/g; // {} 花括号，大括号
  htmlWebpackPluginOptions = htmlWebpackPluginOptions.match(regex);
  if (htmlWebpackPluginOptions) {
    htmlWebpackPluginOptions = htmlWebpackPluginOptions[0];
    let htmlWebpackPluginOptionsArr = htmlWebpackPluginOptions.split(",");
    htmlWebpackPluginOptions = {};
    for (let item of htmlWebpackPluginOptionsArr) {
      let [key, value] = item.split(":");
      htmlWebpackPluginOptions[`${key}`] = value;
    }
  } else {
    htmlWebpackPluginOptions = {};
  }
  return htmlWebpackPluginOptions;
})();

module.exports = {
  entry: {
    main: [
      // '@babel/polyfill',
      // "core-js/stable",
      // "regenerator-runtime/runtime",
      //添加编译缓存
      // "webpack/hot/poll?1000",
      path.join(process.cwd(), "/server/middleware/clientRouter/index.js")
    ]
  },
  devServer: {
    open: true,
    contentBase: "assets",
    hot: true,
    historyApiFallback: true,
    liveReload: true, // 编译之后是否自动刷新浏览器
    writeToDisk: true, // 写入硬盘
    port: 5000
  },
  watch: true,
  watchOptions: {
    //延迟监听时间
    aggregateTimeout: 500,
    //忽略监听文件夹
    ignored: "/node_modules/"
  },
  // context: path.join(process.cwd(), '/client'),
  devtool: "source-map",
  module: {
    rules: []
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
