// 按需加载插件
import Loadable from 'react-loadable';
import Loading from '@/component/Loading';
import RouterAddApi from '@/router/RouterAddApi';
import React, { useEffect } from 'react';
import pagesMarketingRouterRoutesconfig from '@/pages/marketing/router/routesConfig.js';
import routerRoutesconfig from '@/router/routesConfig.js';

// 路由组件引入
const LoadableDiscountcoupon = Loadable({
    loader: () => import('@/pages/marketing/DiscountCoupon/index.js'),
    loading: Loading,
});

// 路由组件引入
const LoadableMarketing = Loadable({
    loader: () => import('@/pages/marketing/index.js'),
    loading: Loading,
});

// 路由组件引入
const LoadableHemo = Loadable({
    loader: () => import('@/pages/Home/index.js'),
    loading: Loading,
});

// 路由组件引入
const LoadableUserdetails = Loadable({
    loader: () => import('@/pages/User/index.js'),
    loading: Loading,
});

// 路由组件引入
const LoadableUser = Loadable({
    loader: () => import('@/pages/User/index.js'),
    loading: Loading,
});
let routesComponentConfig = [
    {
        path: '/marketing/DiscountCoupon',
        exact: false,
        name: 'DiscountCoupon',
        entry: '/pages/marketing/DiscountCoupon/index.js',
        Component: LoadableDiscountcoupon,
    },
    {
        path: '/marketing',
        exact: true,
        name: 'marketing',
        entry: '/pages/marketing/index.js',
        Component: <LoadableMarketing />,
    },
    {
        path: '/',
        exact: true,
        name: 'hemo',
        entry: '/pages/Home/index.js',
        Component: LoadableHemo,
    },
    {
        path: '/user/:id',
        exact: false,
        name: 'userDetails',
        entry: '/pages/User/index.js',
        Component: LoadableUserdetails,
    },
    {
        path: '/user',
        exact: false,
        name: 'user',
        entry: '/pages/User/index.js',
        Component: LoadableUser,
    },
];

export default routesComponentConfig;
