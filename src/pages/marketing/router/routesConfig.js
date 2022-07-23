// 路由配置
export default [
    {
        path: '/marketing',
        exact: true,
        name: 'marketing',
        // Component: <HomeRouterAddApi />,
        entry: `/pages/marketing/index.js`,
        children: [
            {
                path: '/DiscountCoupon',
                name: 'DiscountCoupon',
                // Component: <UserRouterAddApi />,
                entry: `/pages/marketing/DiscountCoupon/index.js`, 
                children: [],
            },
        ],
        
    },
 
];