// 路由配置
export default [
  // {
  //     path: '/',
  //     exact: true,
  //     name: 'home',
  //     entry: `/pages/marketing/index.js`,
  //     level: 2,
  //  },
  {
    path: "/marketing",
    exact: true,
    name: "marketing",
    entry: "/pages/marketing/index.js",
    level: 2,
    children: [
      {
        path: "/discount-coupon/:id",
        name: "DiscountCoupon",
        entry: "/pages/marketing/pages/DiscountCoupon/index.js",
        level: 2,
        children: []
      }
    ]
  }
];
