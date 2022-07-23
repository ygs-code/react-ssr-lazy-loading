// 按需加载插件
import Loadable from 'react-loadable';
import routePaths from '@/router/routePaths';
import React, { useEffect } from 'react';
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Navigate, // 重定向
    useSearchParams,
    useNavigate,
    useLocation,
    useParams,
} from 'react-router-dom';

import { default as RoutesConfig } from './routesConfig';
import { firstToUpper } from '@/utils';

//Loading组件提示
const Loading = (props) => {
    return <div>Loading...</div>;
};

const RouterAddApi = (props) => {
    const { Component } = props;
    let params = useParams();
    let [queryParams, setQueryParams] = useSearchParams();
    let navigate = useNavigate();
    let location = useLocation();
    // params = {}, //地址传参
    // query = {}, //get 传参
    let api = {
        params,
        queryParams,
        navigate,
        location,
        setQueryParams,
        push: navigate,
    };

    // params.getAll("brand")
    console.log('queryParams=', queryParams.getAll('id'));
    return <Component {...api} />;
};

// 路由组件引入
const LoadableHome = Loadable({
    loader: () => import(/* webpackChunkName: 'Home' */ '@/pages/Home'),
    loading: Loading,
});
const LoadableUser = Loadable({
    loader: () => import(/* webpackChunkName: 'User' */ '@/pages/User'),
    loading: Loading,
});

new Function('LoadableHome', 'return ' + 'LoadableHome')();

new Function('a', 'b', 'return a + b');

const routesComponent = (routesConfig, parentPath = '') => {
    return routesConfig.map((item) => {
        const { path, name, entry, exact, children = [] } = item;

        return {
            path: parentPath ? parentPath + path : path,
            name,
            entry,
            exact,
            Component: <RouterAddApi Component={LoadableHome} />,
            children: children.length ? routesComponent(children, path) : [],
        };
    });
};

console.log(JSON.stringify(RoutesConfig));

console.log('routesComponent=', routesComponent(RoutesConfig));

const routesConfig = routesComponent(RoutesConfig);
// // 路由配置
// const routesConfig = [
//     {
//         path: '/',
//         exact: true,
//         name: 'home',
//         Component: <RouterAddApi Component={LoadableHome} />,
//         // thunk: homeThunk,
//     },
//     {
//         path: '/user',
//         name: 'user',
//         Component: <RouterAddApi Component={LoadableUser} />,
//         children: [
//             {
//                 path: '/:id',
//                 name: 'userDetails',
//                 Component: <RouterAddApi Component={LoadableUser} />,
//                 children: [],
//             },
//         ],
//         // thunk: ()=>{},
//     },
// ];

// const getRoutePaths = (routesConfig, parentPath = '', routePaths = {}) => {
//     return routesConfig.reduce((routePaths, item) => {
//         const { children, path, name } = item;
//         if (children && children.length) {
//             routePaths = {
//                 ...routePaths,
//                 ...getRoutePaths(children, path, routePaths),
//             };
//         }
//         return {
//             ...routePaths,
//             [name]: parentPath + path,
//         };
//     }, routePaths);
// };

// const routePaths = getRoutePaths(routesConfig);

export default routesConfig;
