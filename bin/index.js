/*
 * @Date: 2022-08-09 09:35:04
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-10 16:18:28
 * @FilePath: /react-loading-ssr/bin/index.js
 * @Description:
 */
import path from "path";
import { compiler } from "../webpack";
import { alias, readWriteFiles } from "../webpack/utils";
import ResolveAlias from "../webpack/definePlugin/webpack-plugin-resolve-alias";
import kill from "kill-port"; // 杀死端口包
import { execute, iSportTake } from "./cmd"; // 杀死端口包
import { stabilization } from "../client/utils";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

// 如果是开发环境 先拷贝 服务器文件到 dist
let {
  NODE_ENV, // 环境参数
  target, // 环境参数
  htmlWebpackPluginOptions = "",
  port
} = process.env; // 环境参数

const isSsr = target === "ssr";
//    是否是生产环境
const isEnvProduction = NODE_ENV === "production";
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === "development";

class Bin {
  constructor() {
    this.counter = 0;
    this.child = null;
    this.init();
  }
  init() {
    this.executeScript();
  }
  development() {
    let $ResolveAlias = new ResolveAlias({
      resolve: {
        // 路径配置
        alias
      }
    });

    readWriteFiles({
      from: [
        path.join(process.cwd(), "/server/**/*").replace(/\\/gi, "/"),
        `!${path
          .join(process.cwd(), "/server/middleware/clientRouter/index.js")
          .replace(/\\/gi, "/")}`
      ],
      to: path.join(process.cwd(), "/dist/server").replace(/\\/gi, "/"),
      transform(content, absoluteFrom) {
        let reg = /.jsx|.js$/g;
        if (reg.test(absoluteFrom)) {
          return $ResolveAlias.alias(content.toString(), "");
        }
        return content;
      },
      callback: async () => {
        if (this.child && this.child.kill) {
          this.child.kill();
        }
        if (iSportTake(port)) {
          await kill(port, "tcp");
        }
        stabilization(1500, async () => {
          this.counter = this.counter >= 10 ? 2 : this.counter + 1;
          if (this.counter === 1) {
            const cmd = isSsr
              ? "cross-env  target='ssr'  npx babel-node  -r  @babel/register    ./dist/server/index.js   -r  dotenv/config  dotenv_config_path=.env.development"
              : "cross-env target='client' npx babel-node  -r  @babel/register    ./dist/server/index.js   -r  dotenv/config  dotenv_config_path=.env.development";
            this.child = execute(cmd);
          } else {
            this.child = execute("npm run bin");
            this.counter = 0;
          }
        });
      }
    });
  }
  production() {
    compiler();
  }
  executeScript() {
    if (isEnvDevelopment) {
      this.development();
    } else {
      this.production();
    }
  }
}

new Bin();
