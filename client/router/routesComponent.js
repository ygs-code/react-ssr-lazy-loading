
// 按需加载插件
import loadable from 'react-loadable';
import Loading from '@/component/Loading';
import RouterAddApi from '@/router/RouterAddApi';
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
                     level:2
                   },
                    {  
                     path: '/marketing',
                     exact: true,
                     name:'marketing',
                     entry:'/pages/marketing/index.js',
                     Component:LoadableMarketing,
                     level:2
                   },
                    {  
                     path: '/',
                     exact: true,
                     name:'home',
                     entry:'/pages/Home/index.js',
                     Component:LoadableHome,
                     level:1
                   },
                    {  
                     path: '/user',
                     exact: false,
                     name:'user',
                     entry:'/pages/User/index.js',
                     Component:LoadableUser,
                     level:1
                   },
    ]

export const routesConfigs = [
  ...pagesMarketingRouterRoutesconfig,
  ...routerRoutesconfig,
];     

export default routesComponentConfig;
        