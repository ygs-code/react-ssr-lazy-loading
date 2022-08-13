/*
 * @Date: 2022-08-01 09:57:50
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-09 10:39:13
 * @FilePath: /react-loading-ssr/webpack/index.js
 * @Description:
 */
// chalk插件，用来在命令行中输入不同颜色的文字
const chalk = require("chalk");
const webpack = require("webpack");
const client = require("./config/client");
const server = require("./config/server");
const webpackMerge = require("webpack-merge");

require("dotenv").config({ path: ".env" });

let {
  NODE_ENV, // 环境参数
  target, // 环境参数
} = process.env; // 环境参数

const isSsr = target === "ssr";
//    是否是生产环境
const isEnvProduction = NODE_ENV === "production";
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === "development";

const compileRes = async (config) => {
  await new Promise((reslove, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        console.log("Errors:" + chalk.red(err.stack || err));
        reject(chalk.red(err.stack || err));
        if (err.details) {
          console.log("Errors:" + chalk.red(err.details));
        }
        reject(chalk.red(err.details));
      }
      if (stats.hasErrors()) {
        console.log(
          "Errors:" +
            chalk.red(
              stats.toString({
                colors: true,
                chunks: false // Makes the build much quieter
              }) + "\n\n"
            )
        );
        reject(
          chalk.red(
            stats.toString({
              colors: true,
              chunks: false // Makes the build much quieter
            }) + "\n\n"
          )
        );
      }
      reslove();
    });
  });
};

module.exports = {
  compiler: async () => {
 
    if (isEnvProduction) {
      await compileRes(client);
      if (isSsr) {
        await compileRes(server);
      }
    }
    return true;
  },
  config: isSsr ? [client, server] : [client]
};
