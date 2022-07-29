require('./ignore.js')();
import React from 'react';
import axios from 'axios';
import { renderToString } from 'react-dom/server';
import {
    createMemoryHistory,
    createBrowserHistory,
    createHashHistory,
} from 'history';
import { getBundles } from 'react-loadable/webpack';
import Helmet from 'react-helmet';
import { matchPath } from 'react-router-dom';
import createStore from '@/redux';
import routesComponent from '@/router/routesComponent';
import routesConfig from '@/router/routesConfig';
import { findTreeData } from '@/utils';
import * as baseInitState from './baseInitState/index';
import path from 'path';
import fs from 'fs';
import stats from '../../web/react-loadable.json';

const CreateApp = require('@/App').default;
// 创建 store
const store = createStore({});

// 获取组件初始化数据
const findInitData = (routesConfig, value, key) => {
    return (findTreeData(routesConfig, value, key) || {}).initState;
};

// 创建script link 标签 添加js和css
const createTags = (modules) => {
    let bundles = getBundles(stats, modules);
    let scriptfiles = bundles.filter((bundle) => bundle.file.endsWith('.js'));
    let stylefiles = bundles.filter((bundle) => bundle.file.endsWith('.css'));
    let scripts = scriptfiles
        .map((script) => `<script src="/${script.file}"></script>`)
        .join('\n');
    let styles = stylefiles
        .map((style) => `<link href="/${style.file}" rel="stylesheet"/>`)
        .join('\n');
    return { scripts, styles };
};

// 解析html
const prepHTML = (
    data,
    { html, head, rootString, scripts, styles, initState }
) => {
    rootString = rootString;
    data = data.replace('<html', `<html ${html}`);
    data = data.replace('</head>', `${head} \n ${styles}</head>`);
    data = data.replace(
        '<div id="root"></div>',
        `<div id="root"><div>${rootString}</div></div>`
    );
    data = data.replace(
        '</head>',
        `</head> \n <script>window.__INITIAL_STATE__ =${JSON.stringify(
            initState
        )}</script>`
    );
    data = data.replace('</body>', `${scripts}</body>`);
    return data;
};

// 匹配路由
const getMatch = (routesArray, url) => {
    for (let router of routesArray) {
        let $router = matchPath(url, {
            path: router.path,
            exact: router.exact,
        });

        if ($router) {
            return {
                ...router,
                ...$router,
            };
        }
    }
};

const makeup = (ctx, store, CreateApp, html, isMatchRoute) => {
    let initState = store.getState();

    let history = createMemoryHistory({ initialEntries: [ctx.req.url] });
    history = {
        ...history,
        ...isMatchRoute,
    };

    let modules = [];
    let context = [];
    let location = ctx.req.url;

    let rootString = renderToString(
        CreateApp({ store, context, history, modules, location })
    );

    let { scripts, styles } = createTags(modules);

    const helmet = Helmet.renderStatic();
    let renderedHtml = prepHTML(html, {
        html: helmet.htmlAttributes.toString(),
        head:
            helmet.title.toString() +
            helmet.meta.toString() +
            helmet.link.toString(),
        rootString,
        scripts,
        styles,
        initState,
    });
    return renderedHtml;
};

// 中间件
const clientRouter =()=> async (ctx, next) => {
    let html = fs.readFileSync(
        path.join(path.resolve(__dirname, '../../web'), 'index.html'),
        'utf-8'
    );
    let isMatchRoute = getMatch(routesComponent, ctx.req.url);
    if (isMatchRoute) {
        let data = null;
        let initState = findInitData(routesConfig, isMatchRoute.name, 'name');
        let baseInitStateData = {};
        for (let key in baseInitState) {
            baseInitStateData[key] = await baseInitState[key]();
        }
       console.log('baseInitStateData====',baseInitStateData)
        if (Object.keys(baseInitState).length) {
            store.dispatch['baseInitState'].setInitState(baseInitStateData);
        }

        if (initState) {
            // 拉去请求或者查询sql等操作
            data = await initState();
            store.dispatch[isMatchRoute.name].setInitState({
                initState: data,
            });
        }
        console.log('store===',store.getState())
        // 渲染html
        let renderedHtml = await makeup(
            ctx,
            store,
            CreateApp,
            html,
            isMatchRoute
        );
        ctx.body = renderedHtml;
    }
    await next();
};

export default clientRouter;
