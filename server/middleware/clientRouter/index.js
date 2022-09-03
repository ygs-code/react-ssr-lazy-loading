import { renderToString } from "react-dom/server";
import { getBundles } from "react-loadable-ssr-addon";
import Helmet from "react-helmet";
import { matchPath } from "react-lazy-router-dom";
import store from "client/redux";
import routesComponent from "client/router/routesComponent";
import { getMemoryHistory } from "client/router/history";
import { findTreeData, getBaseInitState } from "client/utils";
import createApp from "client/App";
import { stringToObject } from "client/utils";
// import otherModules from "./otherModules";
import path, { resolve } from "path";
import fs from "fs";
import ejs from "ejs";

const absolutePath = resolve("./");
let {
  NODE_ENV, // 环境参数
  // target, // 环境参数
  htmlWebpackPluginOptions
} = process.env; // 环境参数

//    是否是生产环境
// const isEnvProduction = NODE_ENV === "production";
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === "development";

// const createApp = require("client/App").default;
// 创建 store
// const store = createStore({});

const { dispatch, getState } = store;

// 中间件
class ClientRouter {
  constructor(
    ctx,
    next,
    options = {}
    // compiler
  ) {
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
    let template = fs.readFileSync(
      path.join(
        path.join(
          absolutePath,
          isEnvDevelopment ? "/client/public" : "dist/client"
        ),
        "index.html"
      ),
      "utf-8"
    );

    let isMatchRoute = this.getMatch(
      routesComponent,
      ctx.req._parsedUrl.pathname
    );

    if (isMatchRoute) {
      const { Component } = isMatchRoute;
      /* eslint-disable   */
      const routeComponent = await Component();
      /* eslint-enable   */
      const { WrappedComponent: { getInitPropsState, getMetaProps } = {} } =
        routeComponent;

      let data = null;

      await getBaseInitState(dispatch, getState());

      if (getInitPropsState) {
        // 拉去请求或者查询sql等操作
        data = await getInitPropsState();
        await dispatch[isMatchRoute.name].setInitState({
          initState: data
        });
      }

      // 渲染html
      let renderedHtml = await this.makeup({
        ctx,
        store,
        template,
        isMatchRoute,
        modules,
        routeComponent
      });

      renderedHtml = ejs.render(renderedHtml, {
        htmlWebpackPlugin: {
          options: {
            ...stringToObject(htmlWebpackPluginOptions),
            ...(getMetaProps ? getMetaProps() : {})
          }
        }
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
  async createTags({ modules, isMatchRoute }) {
    let { assetsManifest } = this.options;

    if (assetsManifest) {
      assetsManifest = JSON.parse(assetsManifest);
    } else {
      // 变成一个js去引入
      assetsManifest = await import("@/dist/client/assets-manifest.json");
    }

    const modulesToBeLoaded = [
      ...assetsManifest.entrypoints,
      "client" + isMatchRoute.entry,
      ...Array.from(modules)
    ];

    let bundles = getBundles(assetsManifest, modulesToBeLoaded);
    let { css = [], js = [] } = bundles;

    let scripts = js
      .map((script) => `<script src="/${script.file}"></script>`)
      .join("\n");

    let styles = css
      .map((style) => `<link href="/${style.file}" rel="stylesheet"/>`)
      .join("\n");

    return { scripts, styles };
  }
  // 解析html
  prepHTML(
    template,
    {
      html,
      // head,
      rootString,
      scripts,
      styles,
      initState
    }
  ) {
    template = template.replace("<html", `<html ${html}`);
    template = template.replace("</head>", `${styles}</head>`);

    template = template.replace(
      '<div id="root">',
      `<div id="root">${rootString}`
    );
    template = template.replace(
      "</head>",
      `</head> \n <script>window.__INITIAL_STATE__ =${JSON.stringify(
        initState
      )}</script>`
    );
    template = template.replace("</body>", `${scripts}</body>`);
    return template;
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
  async makeup({
    ctx,
    store,
    template,
    isMatchRoute,
    modules,
    routeComponent
  }) {
    let initState = store.getState();

    let history = getMemoryHistory({ initialEntries: [ctx.req.url] });
    history = {
      ...history,
      ...isMatchRoute
    };

    let context = [];
    let location = ctx.req.url;

    let rootString = renderToString(
      createApp({
        store,
        context,
        history,
        modules,
        location,
        routesComponent: [
          {
            ...isMatchRoute,
            Component: routeComponent
          }
        ]
      })
    );
    let { scripts, styles } = await this.createTags({ modules, isMatchRoute });

    const helmet = Helmet.renderStatic();
    let renderedHtml = this.prepHTML(template, {
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

export const serverRenderer = ({ clientStats, serverStats, options } = {}) => {
  return async (ctx, next) => {
    await new Promise((reslove, reject) => {
      new ClientRouter(ctx, reslove, options);
    });

    await next();
  };
};

export default serverRenderer;
