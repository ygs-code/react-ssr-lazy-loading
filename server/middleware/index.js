import staticCache from "koa-static-cache";
import cors from "koa2-cors";
import path, { resolve } from "path";

let {
  NODE_ENV, // 环境参数
  target // 环境参数
} = process.env; // 环境参数
// 是否是ssr
const isSsr = target === "ssr";
//    是否是生产环境
const isEnvProduction = NODE_ENV === "production";
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === "development";
export default class Middleware {
  constructor(app) {
    this.app = app;
    this.init();
  }
  init() {
    this.addMiddleware();
  }

  addStaticCacheMiddleware() {
    this.app.use(
      staticCache(path.join(resolve("./"), "/dist/client"), {
        maxAge: 365 * 24 * 60 * 60,
        gzip: true
      })
    );
  }
  addClientRouterMiddleware() {
    const clientRouter = require("./clientRouter").default;
    this.app.use(clientRouter());
  }
  addCorsMiddleware() {
    this.app.use(cors());
  }

  async addWebpackHotMiddleware() {
    // 把这个代码注释掉
    const webpackHotPromise = await import("./webpackHot");
    const WebpackHot = webpackHotPromise.default;
    new WebpackHot(this.app);
  }

  addMiddleware() {
    this.addCorsMiddleware();
    if (isEnvDevelopment) {
      // 如果是生产不在这里编译
      this.addWebpackHotMiddleware();
    } else if (isSsr) {
      this.addStaticCacheMiddleware();
      this.addClientRouterMiddleware();
    }
  }
}
