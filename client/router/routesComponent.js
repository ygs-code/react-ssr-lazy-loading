// 按需加载插件
import lazy from "client/component/lazy";
import Loading from "client/component/Loading";
import pagesMarketingRouterRoutesconfig from "client/pages/marketing/router/routesConfig.js";
import routerRoutesconfig from "client/router/routesConfig.js";

let routesComponentConfig = [
  {
    path: "/marketing/discount-coupon",
    exact: false,
    name: "DiscountCoupon",
    entry: "/pages/marketing/pages/DiscountCoupon/index.js",
    Component: lazy({
      loader: () =>
        import(
          /* webpackChunkName:"DiscountCoupon" */ "client/pages/marketing/pages/DiscountCoupon/index.js"
        ),
      loading: Loading
    }),
    level: 2,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/pages/marketing/router/routesConfig.js"
  },
  {
    path: "/marketing",
    exact: true,
    name: "marketing",
    entry: "/pages/marketing/index.js",
    Component: lazy({
      loader: () =>
        import(
          /* webpackChunkName:"marketing" */ "client/pages/marketing/index.js"
        ),
      loading: Loading
    }),
    level: 2,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/pages/marketing/router/routesConfig.js"
  },
  {
    path: "/",
    exact: true,
    name: "home",
    entry: "/pages/Home/index.js",
    Component: lazy({
      loader: () =>
        import(/* webpackChunkName:"home" */ "client/pages/Home/index.js"),
      loading: Loading
    }),
    level: 1,
    routesConfigPath:
      "/Users/admin/Documents/code/react-ssr-lazy-loading/client/router/routesConfig.js"
  },
  {
    path: "/user",
    exact: false,
    name: "user",
    entry: "/pages/User/index.js",
    Component: lazy({
      loader: () =>
        import(/* webpackChunkName:"user" */ "client/pages/User/index.js"),
      loading: Loading
    }),
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
