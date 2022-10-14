// 按需加载插件
import { lazy } from "client/router/react-lazy-router-dom";
import pagesMarketingRouterRoutesconfig from "client/pages/marketing/router/routesConfig.js";
import routerRoutesconfig from "client/router/routesConfig.js";

import Discountcoupon from "client/pages/marketing/pages/DiscountCoupon/index.js";
import Marketing from "client/pages/marketing/index.js";
import Home from "client/pages/Home/index.js";
import User from "client/pages/User/index.js";

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
    syncComponent: Discountcoupon,
    level: 2,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/pages/marketing/router/routesConfig.js"
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
    syncComponent: Marketing,
    level: 2,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/pages/marketing/router/routesConfig.js"
  },
  {
    path: "/",
    exact: true,
    name: "home",
    entry: "/pages/Home/index.js",
    Component: lazy(() =>
      import(/* webpackChunkName:"home" */ "client/pages/Home/index.js")
    ),
    syncComponent: Home,
    level: 1,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/router/routesConfig.js"
  },
  {
    path: "/user",
    exact: false,
    name: "user",
    entry: "/pages/User/index.js",
    Component: lazy(() =>
      import(/* webpackChunkName:"user" */ "client/pages/User/index.js")
    ),
    syncComponent: User,
    level: 1,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/router/routesConfig.js"
  }
];

export const routesConfigs = [
  ...pagesMarketingRouterRoutesconfig,
  ...routerRoutesconfig
];

export default routesComponentConfig;
