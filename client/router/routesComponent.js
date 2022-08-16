/*
 * @Date: 2022-08-11 09:41:40
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-16 19:23:02
 * @FilePath: /react-ssr-lazy-loading/client/router/routesComponent.js
 * @Description:
 */
// 按需加载插件
// import React from "react";
import loadable from "client/component/Loadable";
import Loading from "client/component/Loading";
import pagesMarketingRouterRoutesconfig from "client/pages/marketing/router/routesConfig.js";
import routerRoutesconfig from "client/router/routesConfig.js";

// 路由组件引入
const LoadableDiscountcoupon = loadable({
  loader: () => import("client/pages/marketing/pages/DiscountCoupon/index.js"),
  loading: Loading
});
// 路由组件引入
const LoadableMarketing = loadable({
  loader: () => import("client/pages/marketing/index.js"),
  loading: Loading
});
// 路由组件引入
const LoadableHome = loadable({
  loader: () => import("client/pages/Home/index.js"),
  loading: Loading
});
// 路由组件引入
const LoadableUser = loadable({
  loader: () => import("client/pages/User/index.js"),
  loading: Loading
});
const routesComponentConfig = [
  {
    path: "/marketing/discount-coupon",
    exact: false,
    name: "DiscountCoupon",
    entry: "/pages/marketing/pages/DiscountCoupon/index.js",
    Component: LoadableDiscountcoupon,
    syncComponent: "",
    level: 2,
    routesConfigPath:
      "K:/react-loading-ssr/client/pages/marketing/router/routesConfig.js"
  },
  {
    path: "/marketing",
    exact: true,
    name: "marketing",
    entry: "/pages/marketing/index.js",
    Component: LoadableMarketing,
    level: 2,
    routesConfigPath:
      "K:/react-loading-ssr/client/pages/marketing/router/routesConfig.js"
  },
  {
    path: "/",
    exact: true,
    name: "home",
    entry: "/pages/Home/index.js",
    Component: LoadableHome,
    level: 1,
    routesConfigPath: "K:/react-loading-ssr/client/router/routesConfig.js"
  },
  {
    path: "/user",
    exact: false,
    name: "user",
    entry: "/pages/User/index.js",
    Component: LoadableUser,
    level: 1,
    routesConfigPath: "K:/react-loading-ssr/client/router/routesConfig.js"
  }
];

export const routesConfigs = [
  ...pagesMarketingRouterRoutesconfig,
  ...routerRoutesconfig
];

export default routesComponentConfig;
