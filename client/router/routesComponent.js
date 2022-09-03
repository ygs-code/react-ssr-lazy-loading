// 按需加载插件
import { lazy } from "client/router/react-router-dom";
import pagesMarketingRouterRoutesconfig from "client/pages/marketing/router/routesConfig.js";
import routerRoutesconfig from "client/router/routesConfig.js";

let routesComponentConfig = [
  {
    path: "/marketing/discount-coupon",
    exact: false,
    name: "DiscountCoupon",
    entry: "/pages/marketing/pages/DiscountCoupon/index.js",
    Component: lazy(() =>
      import(
        /* webpackChunkName:"DiscountCoupon" */ "client/pages/marketing/pages/DiscountCoupon/index.js"
      )
    ),
    level: 2,
    routesConfigPath:
      "K:/react-ssr-lazy-loading/client/pages/marketing/router/routesConfig.js"
  },
  {
    path: "/marketing",
    exact: true,
    name: "marketing",
    entry: "/pages/marketing/index.js",
    Component: lazy(() =>
      import(
        /* webpackChunkName:"marketing" */ "client/pages/marketing/index.js"
      )
    ),
    level: 2,
    routesConfigPath:
      "K:/react-ssr-lazy-loading/client/pages/marketing/router/routesConfig.js"
  },
  {
    path: "/",
    exact: true,
    name: "home",
    entry: "/pages/Home/index.js",
    Component: lazy(() =>
      import(/* webpackChunkName:"home" */ "client/pages/Home/index.js")
    ),
    level: 1,
    routesConfigPath: "K:/react-ssr-lazy-loading/client/router/routesConfig.js"
  },
  {
    path: "/user",
    exact: false,
    name: "user",
    entry: "/pages/User/index.js",
    Component: lazy(() =>
      import(/* webpackChunkName:"user" */ "client/pages/User/index.js")
    ),
    level: 1,
    routesConfigPath: "K:/react-ssr-lazy-loading/client/router/routesConfig.js"
  }
];

export const routesConfigs = [
  ...pagesMarketingRouterRoutesconfig,
  ...routerRoutesconfig
];

export default routesComponentConfig;
