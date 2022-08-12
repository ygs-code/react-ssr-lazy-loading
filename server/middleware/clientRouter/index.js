// require('../../ignore.js')()
import React from "react";
import axios from "axios";
import { renderToString } from "react-dom/server";
import {
  createMemoryHistory,
  createBrowserHistory,
  createHashHistory
} from "history";
// import { getBundles } from 'react-loadable/webpack';
import { getBundles } from "react-loadable-ssr-addon";
import Helmet from "react-helmet";
import { matchPath } from "react-router-dom";
import createStore from "@/redux";
import routesComponent, { routesConfigs } from "@/router/routesComponent";
import { findTreeData, getBaseInitState } from "@/utils";
import CreateApp from "@/App";
import otherModules from "./otherModules";
import path, { resolve } from "path";
import fs from "fs";
const absolutePath = resolve("./");
let {
  NODE_ENV, // 环境参数
  WEB_ENV, // 环境参数
  target, // 环境参数
  htmlWebpackPluginOptions = ""
} = process.env; // 环境参数

//    是否是生产环境
const isEnvProduction = NODE_ENV === "production";
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === "development";

// const CreateApp = require("@/App").default;
// 创建 store
const store = createStore({});

const { dispatch, getState } = store;

// 中间件
class ClientRouter {
  constructor(ctx, next, options = {}, compiler) {
    this.context = {
      ctx,
      next
    };

    this.options = options;
    this.init();
  }

  //      初始化
  async init() {
    const { ctx, next } = this.context;
    const modules = new Set();
    let html = fs.readFileSync(
      path.join(
        path.join(
          absolutePath,
          isEnvDevelopment ? "/client/public" : "dist/client"
        ),
        "index.html"
      ),
      "utf-8"
    );

    let isMatchRoute = this.getMatch(routesComponent, ctx.req.url);

    if (isMatchRoute) {
      let data = null;
      let initState = this.findInitData(
        routesConfigs,
        isMatchRoute.name,
        "name"
      );

      await getBaseInitState(dispatch, getState());

      if (initState) {
        // 拉去请求或者查询sql等操作
        data = await initState();

        dispatch[isMatchRoute.name].setInitState({
          initState: data
        });
      }

      // 渲染html
      let renderedHtml = await this.makeup({
        ctx,
        store,
        CreateApp,
        html,
        isMatchRoute,
        modules
      });

      ctx.body = renderedHtml;
    }
    next();
  }
  // 查找初始化数据
  findInitData(routesConfigs, value, key) {
    return (findTreeData(routesConfigs, value, key) || {}).initState;
  }
  // 转换路径
  transformPath(path) {
    let reg = /(\\\\)|(\\)/g;
    return path.replace(reg, "/");
  }
  // 创建标签
  async createTags(modules) {
    let { assetsManifest } = this.options;

    if (assetsManifest) {
      assetsManifest = JSON.parse(assetsManifest);
    } else {
      // 变成一个js去引入
      assetsManifest = await import(
        this.transformPath(
          path.join(absolutePath + "/dist/client/assets-manifest.json")
        )
      );
    }

    // assetsManifest = {
    //   entrypoints: ["client", "vendors"],
    //   origins: {
    //     0: [1, 2, 3, 0],
    //     "@/pages/Home/index.js": [0, 1],
    //     "@/pages/User/index.js": [0, 2],
    //     "@/pages/marketing/pages/DiscountCoupon/index.js": [0, 3],
    //     "@/pages/marketing/index.js": [4],
    //     client: ["client"],
    //     vendors: ["vendors"]
    //   },
    //   assets: {
    //     0: {
    //       js: [
    //         {
    //           file: "static/js/0.899c453b.chunk.js",
    //           hash: "5ec8d96755cdbf990be5",
    //           publicPath: "/static/js/0.899c453b.chunk.js"
    //         }
    //       ],
    //       "js.map": [
    //         {
    //           file: "static/js/0.899c453b.chunk.js.map",
    //           hash: "5ec8d96755cdbf990be5",
    //           publicPath: "/static/js/0.899c453b.chunk.js.map"
    //         }
    //       ]
    //     },
    //     1: {
    //       css: [
    //         {
    //           file: "static/css/1.301ef22d.chunk.css",
    //           hash: "0c15b1bd6cbb6ea644df",
    //           publicPath: "/static/css/1.301ef22d.chunk.css"
    //         }
    //       ],
    //       js: [
    //         {
    //           file: "static/js/1.899c453b.chunk.js",
    //           hash: "0c15b1bd6cbb6ea644df",
    //           publicPath: "/static/js/1.899c453b.chunk.js"
    //         }
    //       ],
    //       "css.map": [
    //         {
    //           file: "static/css/1.301ef22d.chunk.css.map",
    //           hash: "0c15b1bd6cbb6ea644df",
    //           publicPath: "/static/css/1.301ef22d.chunk.css.map"
    //         }
    //       ],
    //       "js.map": [
    //         {
    //           file: "static/js/1.899c453b.chunk.js.map",
    //           hash: "0c15b1bd6cbb6ea644df",
    //           publicPath: "/static/js/1.899c453b.chunk.js.map"
    //         }
    //       ]
    //     },
    //     2: {
    //       css: [
    //         {
    //           file: "static/css/2.465fd62a.chunk.css",
    //           hash: "3d6aeee78431022d08f0",
    //           publicPath: "/static/css/2.465fd62a.chunk.css"
    //         }
    //       ],
    //       js: [
    //         {
    //           file: "static/js/2.899c453b.chunk.js",
    //           hash: "3d6aeee78431022d08f0",
    //           publicPath: "/static/js/2.899c453b.chunk.js"
    //         }
    //       ],
    //       "css.map": [
    //         {
    //           file: "static/css/2.465fd62a.chunk.css.map",
    //           hash: "3d6aeee78431022d08f0",
    //           publicPath: "/static/css/2.465fd62a.chunk.css.map"
    //         }
    //       ],
    //       "js.map": [
    //         {
    //           file: "static/js/2.899c453b.chunk.js.map",
    //           hash: "3d6aeee78431022d08f0",
    //           publicPath: "/static/js/2.899c453b.chunk.js.map"
    //         }
    //       ]
    //     },
    //     3: {
    //       css: [
    //         {
    //           file: "static/css/3.447ff964.chunk.css",
    //           hash: "3715ea8c92c6ecf58c31",
    //           publicPath: "/static/css/3.447ff964.chunk.css"
    //         }
    //       ],
    //       js: [
    //         {
    //           file: "static/js/3.899c453b.chunk.js",
    //           hash: "3715ea8c92c6ecf58c31",
    //           publicPath: "/static/js/3.899c453b.chunk.js"
    //         }
    //       ],
    //       "css.map": [
    //         {
    //           file: "static/css/3.447ff964.chunk.css.map",
    //           hash: "3715ea8c92c6ecf58c31",
    //           publicPath: "/static/css/3.447ff964.chunk.css.map"
    //         }
    //       ],
    //       "js.map": [
    //         {
    //           file: "static/js/3.899c453b.chunk.js.map",
    //           hash: "3715ea8c92c6ecf58c31",
    //           publicPath: "/static/js/3.899c453b.chunk.js.map"
    //         }
    //       ]
    //     },
    //     4: {
    //       js: [
    //         {
    //           file: "static/js/4.899c453b.chunk.js",
    //           hash: "0f01940299d9e4c1d781",
    //           publicPath: "/static/js/4.899c453b.chunk.js"
    //         }
    //       ],
    //       "js.map": [
    //         {
    //           file: "static/js/4.899c453b.chunk.js.map",
    //           hash: "0f01940299d9e4c1d781",
    //           publicPath: "/static/js/4.899c453b.chunk.js.map"
    //         }
    //       ]
    //     },
    //     client: {
    //       css: [
    //         {
    //           file: "static/css/client.01d554c2.css",
    //           hash: "437df4dbdd68a2953f41",
    //           publicPath: "/static/css/client.01d554c2.css"
    //         }
    //       ],
    //       js: [
    //         {
    //           file: "static/js/client.899c453b.js",
    //           hash: "437df4dbdd68a2953f41",
    //           publicPath: "/static/js/client.899c453b.js"
    //         }
    //       ],
    //       "css.map": [
    //         {
    //           file: "static/css/client.01d554c2.css.map",
    //           hash: "437df4dbdd68a2953f41",
    //           publicPath: "/static/css/client.01d554c2.css.map"
    //         }
    //       ],
    //       "js.map": [
    //         {
    //           file: "static/js/client.899c453b.js.map",
    //           hash: "437df4dbdd68a2953f41",
    //           publicPath: "/static/js/client.899c453b.js.map"
    //         }
    //       ]
    //     },
    //     vendors: {
    //       js: [
    //         {
    //           file: "static/js/vendors.899c453b.js",
    //           hash: "9efbfd0b63e651cfbeb3",
    //           publicPath: "/static/js/vendors.899c453b.js"
    //         }
    //       ],
    //       "js.map": [
    //         {
    //           file: "static/js/vendors.899c453b.js.map",
    //           hash: "9efbfd0b63e651cfbeb3",
    //           publicPath: "/static/js/vendors.899c453b.js.map"
    //         }
    //       ]
    //     }
    //   }
    // };

    

    // assetsManifest = assetsManifest
    //   ? JSON.parse(assetsManifest)
    //   : require(
    //       path.join(absolutePath, '/dist/client/assets-manifest.json'),
    //     )

    const modulesToBeLoaded = [
      ...assetsManifest.entrypoints,
      ...otherModules,
      ...Array.from(modules)
    ];

    let bundles = getBundles(assetsManifest, modulesToBeLoaded);
    const {
      css = [],
      js = [
        // {
        //   file: './static/js/client.js',
        // },
        // {
        //   file: './static/js/vendors.js',
        // },
      ]
    } = bundles;

    let scripts = js
      .map((script) => `<script src="/${script.file}"></script>`)
      .join("\n");

    let styles = css
      .map((style) => `<link href="/${style.file}" rel="stylesheet"/>`)
      .join("\n");

    return { scripts, styles };
  }
  // 解析html
  prepHTML(data, { html, head, rootString, scripts, styles, initState }) {
    // rootString = rootString;
    data = data.replace("<html", `<html ${html}`);
    data = data.replace("</head>", `${head} \n ${styles}</head>`);
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root"><div>${rootString}</div></div>`
    );
    data = data.replace(
      "</head>",
      `</head> \n <script>window.__INITIAL_STATE__ =${JSON.stringify(
        initState
      )}</script>`
    );
    data = data.replace("</body>", `${scripts}</body>`);
    return data;
  }
  // 获取路由
  getMatch(routesArray, url) {
    for (let router of routesArray) {
      let $router = matchPath(url, {
        path: router.path,
        exact: router.exact
      });

      if ($router) {
        return {
          ...router,
          ...$router
        };
      }
    }
  }
  // 创建react文本
  async makeup({ ctx, store, CreateApp, html, isMatchRoute, modules }) {
    let initState = store.getState();

    let history = createMemoryHistory({ initialEntries: [ctx.req.url] });
    history = {
      ...history,
      ...isMatchRoute
    };

    let context = [];
    let location = ctx.req.url;

    let rootString = renderToString(
      CreateApp({ store, context, history, modules, location })
    );

    let { scripts, styles } = await this.createTags(modules);

    const helmet = Helmet.renderStatic();
    let renderedHtml = this.prepHTML(html, {
      html: helmet.htmlAttributes.toString(),
      head:
        helmet.title.toString() +
        helmet.meta.toString() +
        helmet.link.toString(),
      rootString,
      scripts,
      styles,
      initState
    });
    return renderedHtml;
  }
}

export const serverRenderer = ({
  clientStats,
  serverStats,
  foo,
  options
} = {}) => {
  return async (ctx, next) => {
    await new Promise((reslove, reject) => {
      new ClientRouter(ctx, reslove, options);
    });

    await next();
  };
};

export default serverRenderer;
