
// 按需加载插件
import loadable from 'react-loadable';
import Loading from '@/component/Loading';
import React, { useEffect } from 'react';
import pagesMarketingRouterRoutesconfig from '@/pages/marketing/router/routesConfig.js';
import routerRoutesconfig from '@/router/routesConfig.js';

// 路由组件引入
const LoadableDiscountcoupon = loadable({
    loader: () => import('@/pages/marketing/pages/DiscountCoupon/index.js'),
    loading: Loading,
}); 
// 路由组件引入
const LoadableMarketing = loadable({
    loader: () => import('@/pages/marketing/index.js'),
    loading: Loading,
}); 
// 路由组件引入
const LoadableHome = loadable({
    loader: () => import('@/pages/Home/index.js'),
    loading: Loading,
}); 
// 路由组件引入
const LoadableUser = loadable({
    loader: () => import('@/pages/User/index.js'),
    loading: Loading,
}); 
let routesComponentConfig=[
                    {  
                     path: '/marketing/discount-coupon',
                     exact: false,
                     name:'DiscountCoupon',
                     entry:'/pages/marketing/pages/DiscountCoupon/index.js',
                     Component:LoadableDiscountcoupon,
                     level:2,
                     routesConfigPath:'/Users/admin/Documents/code/react-loading-ssr/client/pages/marketing/router/routesConfig.js'
                   },
                    {  
                     path: '/marketing',
                     exact: true,
                     name:'marketing',
                     entry:'/pages/marketing/index.js',
                     Component:LoadableMarketing,
                     level:2,
                     routesConfigPath:'/Users/admin/Documents/code/react-loading-ssr/client/pages/marketing/router/routesConfig.js'
                   },
                    {  
                     path: '/',
                     exact: true,
                     name:'home',
                     entry:'/pages/Home/index.js',
                     Component:LoadableHome,
                     level:1,
                     routesConfigPath:'/Users/admin/Documents/code/react-loading-ssr/client/router/routesConfig.js'
                   },
                    {  
                     path: '/user',
                     exact: false,
                     name:'user',
                     entry:'/pages/User/index.js',
                     Component:LoadableUser,
                     level:1,
                     routesConfigPath:'/Users/admin/Documents/code/react-loading-ssr/client/router/routesConfig.js'
                   },
    ]

export const routesConfigs = [
  ...pagesMarketingRouterRoutesconfig,
  ...routerRoutesconfig,
];     

export default routesComponentConfig;
        