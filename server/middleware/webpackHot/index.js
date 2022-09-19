import webpack from "webpack";
import fs from "fs";
import path from "path";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import ReactLoadableSSRAddon from "react-loadable-ssr-addon";
import { createProxyMiddleware } from "http-proxy-middleware";
import koaProxy from "koa2-proxy-middleware";
import bodyparser from "koa-bodyparser";
import historyApiFallback from "koa-history-api-fallback";
// import connectHistoryApiFallback from "connect-history-api-fallback";
import { compiler, config } from "@/webpack";
import { writeFile } from "@/webpack/utils";

let {
  NODE_ENV, // 环境参数
  target // 环境参数
} = process.env; // 环境参数

const isSsr = target === "ssr";
//    是否是生产环境
const isEnvProduction = NODE_ENV === "production";
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === "development";

class WebpackHot {
  constructor(app) {
    this.app = app;
    this.compilerOptions = {};
    this.init();
  }
  async init() {
    var _this = this;

    for (let [index, item] of config[0].plugins.entries()) {
      if (item instanceof ReactLoadableSSRAddon) {
        item.apply = function apply(compiler) {
          const PLUGIN_NAME = "ReactLoadableSSRAddon";
          // 写入文件
          writeFile(this.options.filename, "{}");
          // fs.writeFileSync(this.options.filename, "{}");
          compiler.hooks.emit.tapAsync(PLUGIN_NAME, this.handleEmit.bind(this));
        };
        item.writeAssetsFile = function () {
          const filePath = this.manifestOutputPath;
          const fileDir = path.dirname(filePath);
          const json = JSON.stringify(this.manifest, null, 2);
          try {
            if (!fs.existsSync(fileDir)) {
              fs.mkdirSync(fileDir, { recursive: true });
            }
          } catch (err) {
            if (err.code !== "EEXIST") {
              throw err;
            }
          }
          _this.compilerOptions.assetsManifest = json;
          fs.writeFileSync(filePath, json);
        };
        config[0].plugins[index] = item;
        break;
      }
    }
    // 编译
    this.compiler = webpack(isSsr ? config : config[0]);
    this.addMiddleware();
  }
  addMiddleware() {
    if (!isSsr) {
      // handle fallback for HTML5 history API
      // 通过指定的索引页面中间件代理请求，用于单页应用程序，利用HTML5 History API。
      // 这个插件是用来解决单页面应用，点击刷新按钮和通过其他search值定位页面的404错误
      this.setConnectHistoryApiFallback();
    }

    // 开启代理
    this.setProxyMiddleware();
    // dev服务器
    this.addWebpackDevMiddleware();

    if (isSsr) {
      this.addWebpackHotServerMiddleware();
    }
  }
  addWebpackDevMiddleware() {
    const _this = this;
    const { devServer = {} } = config[0];

    this.app.use(
      _this.koaDevware(
        webpackDevMiddleware(_this.compiler, {
          ...devServer
          // noInfo: true,
          // serverSideRender: true // 是否是服务器渲染

          // //设置允许跨域
          // headers: () => {
          //   return {
          //     // "Last-Modified": new Date(),
          //     "Access-Control-Allow-Origin": "*",
          //     "Access-Control-Allow-Headers": "content-type",
          //     "Access-Control-Allow-Methods": "DELETE,PUT,POST,GET,OPTIONS"
          //   };
          // }

          // publicPath: "/"
          // writeToDisk: true //是否写入本地磁盘
        }),
        _this.compiler
      )
    );
  }

  // 代理服务器
  setProxyMiddleware() {
    // proxy: { // 配置代理（只在本地开发有效，上线无效）
    //   "/x": { // 这是请求接口中要替换的标识
    //     target: "https://api.bilibili.com", // 被替换的目标地址，即把 /api 替换成这个
    //     pathRewrite: {"^/api" : ""},
    //     secure: false, // 若代理的地址是https协议，需要配置这个属性
    //   },
    //   '/api': {
    //     target: 'http://localhost:3000', // 这是本地用node写的一个服务，用webpack-dev-server起的服务默认端口是8080
    //     pathRewrite: {"/api" : ""}, // 后台在转接的时候url中是没有 /api 的
    //     changeOrigin: true, // 加了这个属性，那后端收到的请求头中的host是目标地址 target
    //   },
    // }

    // proxy: [
    //   {
    //     context: ["/api/v1/common/upload/"],
    //     target: "https://webpack.docschina.org/",
    //     changeOrigin: true,
    //     secure: false,
    //     // pathRewrite: {
    //     //   "^/api/v1/common/upload/": "/",
    //     // },
    //   },
    // ],

    const { devServer: { proxy } = {} } = config[0];
    const type = Object.prototype.toString.call(proxy).toLowerCase();
    let targets = {};
    if (proxy && type === "[object object]") {
      // 下面是代理表的处理方法， 可以使用后台,代理后台地址
      /*
            支持对象
            proxy: { // 配置代理（只在本地开发有效，上线无效）
                "/x": { // 这是请求接口中要替换的标识
                  target: "https://api.bilibili.com", // 被替换的目标地址，即把 /api 替换成这个
                  pathRewrite: {"^/api" : ""},
                  secure: false, // 若代理的地址是https协议，需要配置这个属性
                },
                '/api': {
                  target: 'http://localhost:3000', // 这是本地用node写的一个服务，用webpack-dev-server起的服务默认端口是8080
                  pathRewrite: {"/api" : ""}, // 后台在转接的时候url中是没有 /api 的
                  changeOrigin: true, // 加了这个属性，那后端收到的请求头中的host是目标地址 target
                },
            }
            */
      // Object.keys(proxy).forEach((context) => {
      //   // 下面是代理表的处理方法， 可以使用后台管理
      //   var options = proxy[context];
      //   if (typeof options === "string") {
      //     // 支持 proxy: { '/api':'http://localhost:3000' }
      //     options = { target: options };
      //   }
      //   this.app.use(context, createProxyMiddleware(options));
      // });

      // this.koaProxy
      targets = proxy;
    }

    /*
         支持数组
          支持单个
          proxy: [
            {
              context: "/api/v1/common/upload/",
              target: "https://webpack.docschina.org/",
              changeOrigin: true,
               secure: false,
              // pathRewrite: {
              //   "^/api/v1/common/upload/": "/",
              // },
            },
          ],

           或者
          proxy: [
          {
              context: ["/api/v1/common/upload/","/api/v1/scrm/upload/", ]
              target: "https://webpack.docschina.org/",
              changeOrigin: true,
               secure: false,
              // pathRewrite: {
              //   "^/api/v1/common/upload/": "/",
              // },
            },
          ],
        */

    if (proxy && type === "[object array]") {
      for (let item of proxy) {
        let { context } = item;
        delete item.context;
        if (
          Object.prototype.toString.call(context).toLowerCase() ===
          "[object array]"
        ) {
          for (let contextItem of context) {
            targets[contextItem] = item;
          }
        } else {
          targets[context] = item;
        }
      }
    }
    this.app.use(
      koaProxy({
        targets
      })
    );
    this.app.use(
      bodyparser({
        enableTypes: ["json", "form", "text"]
      })
    );
  }

  setConnectHistoryApiFallback() {
    this.app.use(historyApiFallback());
  }

  addWebpackHotServerMiddleware() {
    const _this = this;
    this.app.use(
      webpackHotServerMiddleware(_this.compiler, {
        createHandler: webpackHotServerMiddleware.createKoaHandler,
        serverRendererOptions: {
          foo: "Bar",
          options: _this.compilerOptions // 引用传参
        }
      })
    );
  }
  // // 做兼容
  hook(compiler, hookName, pluginName, fn) {
    if (arguments.length === 3) {
      fn = pluginName;
      pluginName = hookName;
    }
    if (compiler.hooks) {
      compiler.hooks[hookName].tap(pluginName, fn);
    } else {
      compiler.plugin(pluginName, fn);
    }
  }
  koaDevware(dev, compiler) {
    var _this = this;
    const waitMiddleware = () =>
      new Promise((resolve, reject) => {
        dev.waitUntilValid(() => {
          resolve(true);
        });

        _this.hook(compiler, "failed", (error) => {
          reject(error);
        });
      });

    return async (ctx, next) => {
      await waitMiddleware();
      await dev(
        ctx.req,
        {
          end(content) {
            ctx.body = content;
          },
          setHeader: ctx.set.bind(ctx),
          locals: ctx.state
        },
        next
      );
    };
  }
}

export default WebpackHot;
