require('../ignore.js')();
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
import { findTreeData, getEv } from '@/utils';
import * as baseInitState from '../baseInitState/index';
import path, { resolve } from 'path';
import fs from 'fs';
const absolutePath = resolve('./');
let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
    COMPILER_ENV,
} = getEv(); // 环境参数

// 如果是中间件编译
const isCompile = COMPILER_ENV === 'middleware';
//    是否是生产环境
const isEnvProduction = NODE_ENV === 'production';
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === 'development';

const CreateApp = require('@/App').default;
// 创建 store
const store = createStore({});

// 中间件
class ClientRouter {
    constructor(ctx, next) {
        this.context = {
            ctx,
            next,
        };
        this.init();
    }
    //      初始化
    async init() {
        const { ctx, next } = this.context;
        let html = fs.readFileSync(
            path.join(
                path.join(absolutePath, isCompile ? '/client/public' : 'dist/web'),
                'index.html'
            ),
            'utf-8'
        );

        let isMatchRoute = this.getMatch(routesComponent, ctx.req.url);
        if (isMatchRoute) {
            let data = null;
            let initState = this.findInitData(
                routesConfig,
                isMatchRoute.name,
                'name'
            );
            let baseInitStateData = {};
            for (let key in baseInitState) {
                baseInitStateData[key] = await baseInitState[key]();
            }

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

            // 渲染html
            let renderedHtml = await this.makeup(
                ctx,
                store,
                CreateApp,
                html,
                isMatchRoute
            );

            ctx.body = renderedHtml;
        }
        next();
    }
    // 查找初始化数据
    findInitData(routesConfig, value, key) {
        return (findTreeData(routesConfig, value, key) || {}).initState;
    }

    // 创建标签
    createTags(modules) {
        const stats = require(path.join(
            absolutePath,
            '/dist/web/react-loadable.json'
        ));
        let bundles = getBundles(stats, modules);
        // if (isCompile) {
        //     bundles.push({
        //         file: '/static/js/main.js',
        //     });
        // }

        let scriptfiles = bundles.filter((bundle) =>
            bundle.file.endsWith('.js')
        );
        let stylefiles = bundles.filter((bundle) =>
            bundle.file.endsWith('.css')
        );
        let scripts = scriptfiles
            .map((script) => `<script src="/${script.file}"></script>`)
            .join('\n');

        let styles = stylefiles
            .map((style) => `<link href="/${style.file}" rel="stylesheet"/>`)
            .join('\n');
        return { scripts, styles };
    }
    // 解析html
    prepHTML(data, { html, head, rootString, scripts, styles, initState }) {
        // rootString = rootString;
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
    }
    // 获取路由
    getMatch(routesArray, url) {
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
    }
    // 创建react文本
    makeup(ctx, store, CreateApp, html, isMatchRoute) {
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

        let { scripts, styles } = this.createTags(modules);

        const helmet = Helmet.renderStatic();
        let renderedHtml = this.prepHTML(html, {
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
    }
}

export const serverRenderer = ({ clientStats, serverStats, foo } = {}) => {
    return async (ctx, next) => {
        await new Promise((reslove, reject) => {
            new ClientRouter(ctx, reslove);
        });

        await next();
    };
};

export default serverRenderer;
