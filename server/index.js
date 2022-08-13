/*
 * @Date: 2022-08-01 17:17:17
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-10 10:24:28
 * @FilePath: /react-loading-ssr/server/index.js
 * @Description:
 */
// import '@babel/polyfill';
// import "core-js/stable";
import cluster from "cluster";
import App from "./app";
import os from "os";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Worker } from "worker_threads";
// 注入环境变量
dotenv.config({ path: ".env" });

let {
  NODE_ENV, // 环境参数
  target, // 环境参数
  htmlWebpackPluginOptions 
} = process.env; // 环境参数

const isSsr = target === "ssr";
//    是否是生产环境
const isEnvProduction = NODE_ENV === "production";
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === "development";

// 开启的子进程数
const workerNum = isEnvProduction ? os.cpus().length - 1 : 1;
// 如果是主进程
if (cluster.isMaster) {
  // 创建子进程
  for (let i = 0; i < workerNum; i++) {
    // 通过cluster.fork创建子进程
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
  // 如果有子进程，就启动相关服务,这里会使用cpu多个进程来执行http服务
} else {
  new App();
}
